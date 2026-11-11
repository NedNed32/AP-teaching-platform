import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { parse as parseYaml, YAMLParseError } from "yaml";
import type { z } from "zod";
import { mathProblems } from "./rich-text";
import {
  courseFileSchema,
  lessonFrontmatterSchema,
  questionFileSchema,
  RESERVED_UNIT_IDS,
  type CourseFile,
  type LessonFrontmatter,
  type MockSection,
  type Question,
  type Stimulus,
  type TopicFile,
} from "./schema";

/*
 * Reads every course under <root>/courses, validates it and resolves references.
 * Never throws for bad content: every problem becomes an issue, so one run reports
 * all of them. The app refuses to build with errors; `npm run content:check` lists them.
 * Plain Node (no Next.js or React), so scripts and tests can use it directly.
 */

export interface ContentIssue {
  level: "error" | "warning";
  /** Relative to the project, e.g. "content/courses/ap-biology/course.json". */
  file: string;
  line?: number | undefined;
  column?: number | undefined;
  message: string;
}

export interface Topic extends TopicFile {
  unitId: string;
  hasLesson: boolean;
  questionCount: number;
}

export interface Unit {
  id: string;
  /** 1-based position in the course. */
  number: number;
  title: string;
  examWeight?: readonly [number, number] | undefined;
  topics: readonly Topic[];
}

export interface LessonEntry {
  topicId: string;
  /** Absolute path. */
  path: string;
  /** Relative to the project, for messages. */
  file: string;
  frontmatter: LessonFrontmatter;
  /** The MDX body. Frontmatter lines are blanked, not removed, so line numbers still match the file. */
  body: string;
}

export interface ExamSection extends MockSection {
  questionIds: readonly string[];
}

/** A full practice exam: one questions/exam-NN.json file, laid out like the course's mock sections. */
export interface Exam {
  /** 1-based, from the file name. */
  number: number;
  /** URL segment, e.g. "1". */
  slug: string;
  sections: readonly ExamSection[];
}

export interface Course extends Omit<CourseFile, "$schema" | "units"> {
  /** Absolute path of the course folder. */
  dir: string;
  units: readonly Unit[];
  lessons: ReadonlyMap<string, LessonEntry>;
  questions: readonly Question[];
  stimuli: ReadonlyMap<string, Stimulus>;
  exams: readonly Exam[];
}

export interface Catalog {
  courses: readonly Course[];
  issues: readonly ContentIssue[];
}

export function loadContent(root: string): Catalog {
  const project = path.dirname(root);
  const issues: ContentIssue[] = [];
  const coursesDir = path.join(root, "courses");
  if (!existsSync(coursesDir)) return { courses: [], issues };

  const courses: Course[] = [];
  for (const name of listDir(coursesDir)) {
    const dir = path.join(coursesDir, name);
    if (!statSync(dir).isDirectory()) continue;
    const course = loadCourse(dir, name, project, issues);
    if (course) courses.push(course);
  }
  return { courses: courses.sort((a, b) => a.title.localeCompare(b.title)), issues };
}

/** `content/courses/x/course.json:12:3  error  message` */
export function formatIssue(issue: ContentIssue): string {
  const where = issue.line ? `${issue.file}:${issue.line}${issue.column ? `:${issue.column}` : ""}` : issue.file;
  return `${where}  ${issue.level}  ${issue.message}`;
}

// ---------------------------------------------------------------------------

function loadCourse(dir: string, folder: string, project: string, issues: ContentIssue[]): Course | null {
  const rel = (file: string) => path.relative(project, file).split(path.sep).join("/");
  const report = (level: ContentIssue["level"], file: string, message: string, line?: number, column?: number) =>
    issues.push({ level, file: rel(file), message, line, column });
  const error = (file: string, message: string, line?: number, column?: number) => report("error", file, message, line, column);
  const warn = (file: string, message: string) => report("warning", file, message);

  const courseFile = path.join(dir, "course.json");
  if (!existsSync(courseFile)) {
    error(dir, "Missing course.json.");
    return null;
  }
  const data = readJson(courseFile, error);
  if (data === undefined) return null;
  const parsed = courseFileSchema.safeParse(data);
  if (!parsed.success) {
    zodIssues(parsed.error, (message) => error(courseFile, message), data);
    return null;
  }
  const file = parsed.data;
  checkMath(file, (message) => error(courseFile, message));

  if (file.id !== folder) error(courseFile, `id "${file.id}" must match the folder name "${folder}".`);
  const unitIds = new Set<string>();
  const topicIds = new Set<string>();
  for (const unit of file.units) {
    if (unitIds.has(unit.id)) error(courseFile, `Unit id "${unit.id}" is used twice.`);
    if ((RESERVED_UNIT_IDS as readonly string[]).includes(unit.id)) {
      error(courseFile, `Unit id "${unit.id}" is reserved for a course page; choose another.`);
    }
    unitIds.add(unit.id);
    for (const topic of unit.topics) {
      if (topicIds.has(topic.id)) error(courseFile, `Topic id "${topic.id}" is used twice (topic ids are unique per course).`);
      topicIds.add(topic.id);
    }
  }
  const skillCodes = new Set(file.skills?.map((skill) => skill.code));
  if (file.skills && skillCodes.size !== file.skills.length) error(courseFile, "Skill codes must be unique.");

  // Questions and stimuli, from every questions/*.json file.
  const questions: Question[] = [];
  const stimuli = new Map<string, Stimulus>();
  const questionFiles = new Map<string, string>();
  const usedStimuli = new Set<string>();
  const questionsDir = path.join(dir, "questions");
  const pending: { question: Question; file: string }[] = [];
  for (const name of existsSync(questionsDir) ? listDir(questionsDir) : []) {
    const qFile = path.join(questionsDir, name);
    if (!name.endsWith(".json")) {
      error(qFile, "Only .json files belong in questions/.");
      continue;
    }
    const raw = readJson(qFile, error);
    if (raw === undefined) continue;
    const result = questionFileSchema.safeParse(raw);
    if (!result.success) {
      zodIssues(result.error, (message) => error(qFile, message), raw);
      continue;
    }
    checkMath(result.data, (message) => error(qFile, message));
    for (const stimulus of result.data.stimuli) {
      if (stimuli.has(stimulus.id)) error(qFile, `Stimulus id "${stimulus.id}" is already used in this course.`);
      stimuli.set(stimulus.id, stimulus);
      for (const asset of [stimulus.image?.src, stimulus.audio?.src]) {
        if (asset && !existsSync(path.join(dir, asset))) error(qFile, `Stimulus "${stimulus.id}": ${asset} doesn't exist.`);
      }
    }
    for (const question of result.data.questions) {
      if (questionFiles.has(question.id)) error(qFile, `Question id "${question.id}" is already used in ${questionFiles.get(question.id)}.`);
      questionFiles.set(question.id, name);
      pending.push({ question, file: qFile });
    }
  }
  // References are checked once every file is read, so a question may use a stimulus from another file.
  for (const { question, file: qFile } of pending) {
    const label = `Question "${question.id}"`;
    for (const topic of question.topics) {
      if (!topicIds.has(topic)) error(qFile, `${label}: unknown topic "${topic}".`);
    }
    for (const stimulus of question.stimuli ?? []) {
      if (!stimuli.has(stimulus)) error(qFile, `${label}: unknown stimulus "${stimulus}".`);
      usedStimuli.add(stimulus);
    }
    for (const skill of question.skills ?? []) {
      if (!file.skills) error(qFile, `${label} tags skill "${skill}", but course.json lists no skills.`);
      else if (!skillCodes.has(skill)) error(qFile, `${label}: unknown skill "${skill}".`);
    }
    questions.push(question);
  }
  for (const id of stimuli.keys()) {
    if (!usedStimuli.has(id)) warn(questionsDir, `Stimulus "${id}" isn't used by any question.`);
  }

  // Lessons: one MDX file per topic, named after the topic id.
  const lessons = new Map<string, LessonEntry>();
  const lessonsDir = path.join(dir, "lessons");
  for (const name of existsSync(lessonsDir) ? listDir(lessonsDir) : []) {
    const lessonPath = path.join(lessonsDir, name);
    if (!name.endsWith(".mdx")) {
      error(lessonPath, "Only .mdx files belong in lessons/.");
      continue;
    }
    const topicId = name.slice(0, -".mdx".length);
    if (!topicIds.has(topicId)) {
      error(lessonPath, `No topic "${topicId}" in course.json. Lesson files are named after a topic id.`);
      continue;
    }
    const lesson = readLesson(lessonPath, topicId, rel(lessonPath), error);
    if (lesson) lessons.set(topicId, lesson);
  }

  // Mock exam: enough questions of each kind? Sections drawing the same kind add up.
  const needed = new Map<string, { type: "mcq" | "frq"; format?: string | undefined; count: number }>();
  for (const section of file.mock?.sections ?? []) {
    const format = section.type === "frq" ? section.format : undefined;
    const key = `${section.type}:${format ?? ""}`;
    const entry = needed.get(key) ?? { type: section.type, format, count: 0 };
    entry.count += section.count;
    needed.set(key, entry);
  }
  for (const { type, format, count } of needed.values()) {
    const available = questions.filter((q) => q.type === type && (!format || (q.type === "frq" && q.format === format))).length;
    if (available < count) {
      const kind = type === "mcq" ? "multiple-choice" : `free-response${format ? ` (${format})` : ""}`;
      warn(courseFile, `The mock exam needs ${count} ${kind} questions; the bank has ${available}.`);
    }
  }

  // Practice exams: questions/exam-NN.json files, in section order (each section takes the next questions of its type).
  const exams: Exam[] = [];
  const byFile = new Map<string, Question[]>();
  for (const { question, file: qFile } of pending) {
    const name = path.basename(qFile);
    byFile.set(name, [...(byFile.get(name) ?? []), question]);
  }
  for (const [name, inFile] of byFile) {
    const match = /^exam-(\d+)\.json$/.exec(name);
    if (!match) continue;
    const examFile = path.join(questionsDir, name);
    if (!file.mock) {
      error(examFile, "Exam files need a mock section layout in course.json.");
      continue;
    }
    const queues = { mcq: inFile.filter((q) => q.type === "mcq"), frq: inFile.filter((q) => q.type === "frq") };
    const sections: ExamSection[] = [];
    let ok = true;
    for (const section of file.mock.sections) {
      const taken = queues[section.type].splice(0, section.count);
      if (taken.length < section.count) {
        error(examFile, `Needs ${section.count} more ${section.type} questions to fill the exam's sections.`);
        ok = false;
      }
      sections.push({ ...section, questionIds: taken.map((q) => q.id) });
    }
    if (queues.mcq.length || queues.frq.length) warn(examFile, "Has more questions than the exam's sections use.");
    if (ok) exams.push({ number: Number(match[1]), slug: String(Number(match[1])), sections });
  }
  exams.sort((a, b) => a.number - b.number);

  const questionCount = new Map<string, number>();
  for (const question of questions) {
    for (const topic of new Set(question.topics)) questionCount.set(topic, (questionCount.get(topic) ?? 0) + 1);
  }
  const units: Unit[] = file.units.map((unit, index) => ({
    id: unit.id,
    number: index + 1,
    title: unit.title,
    examWeight: unit.examWeight,
    topics: unit.topics.map((topic) => ({
      ...topic,
      unitId: unit.id,
      hasLesson: lessons.has(topic.id),
      questionCount: questionCount.get(topic.id) ?? 0,
    })),
  }));

  const allTopics = units.flatMap((unit) => unit.topics);
  const noLesson = allTopics.filter((topic) => !topic.hasLesson).length;
  const noQuestions = allTopics.filter((topic) => topic.questionCount === 0).length;
  if (noLesson) warn(dir, `${noLesson} of ${allTopics.length} topics have no lesson yet.`);
  if (noQuestions) warn(dir, `${noQuestions} of ${allTopics.length} topics have no practice questions yet.`);
  for (const lesson of lessons.values()) {
    if (!lesson.frontmatter.sources?.length) warn(lesson.path, "No sources listed. Add where the facts were checked.");
    if (file.status === "live" && !lesson.frontmatter.reviewed) warn(lesson.path, "This course is live, but the lesson isn't marked reviewed.");
  }

  return { ...file, dir, units, lessons, questions, stimuli, exams };
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

function readLesson(
  file: string,
  topicId: string,
  relFile: string,
  error: (file: string, message: string, line?: number, column?: number) => void,
): LessonEntry | null {
  const source = readFileSync(file, "utf8");
  const match = FRONTMATTER.exec(source);
  let data: unknown = {};
  if (match) {
    try {
      data = parseYaml(match[1]!) ?? {};
    } catch (failure) {
      const position = failure instanceof YAMLParseError ? failure.linePos?.[0] : undefined;
      // +1: the YAML starts on the line after the opening ---.
      error(file, `Frontmatter: ${failure instanceof Error ? failure.message.split("\n")[0] : String(failure)}`, position ? position.line + 1 : undefined, position?.col);
      return null;
    }
  }
  const parsed = lessonFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    zodIssues(parsed.error, (message) => error(file, `Frontmatter: ${message}`), data);
    return null;
  }
  let ok = true;
  checkMath(parsed.data, (message) => {
    ok = false;
    error(file, `Frontmatter: ${message}`);
  });
  if (!ok) return null;
  const body = match ? "\n".repeat(match[0].split("\n").length - 1) + source.slice(match[0].length) : source;
  return { topicId, path: file, file: relFile, frontmatter: parsed.data, body };
}

function readJson(file: string, error: (file: string, message: string, line?: number, column?: number) => void): unknown {
  const source = readFileSync(file, "utf8");
  try {
    return JSON.parse(source);
  } catch (failure) {
    const message = failure instanceof Error ? failure.message : String(failure);
    // V8 reports "... at position N (line L column C)".
    const at = /line (\d+) column (\d+)/.exec(message);
    error(file, `Invalid JSON: ${message.replace(/ in JSON at position.*$/, "").replace(/\s*\(line \d+ column \d+\)$/, "")}`, at ? Number(at[1]) : undefined, at ? Number(at[2]) : undefined);
    return undefined;
  }
}

/** `units[0].topics[2].id: Must not be empty.`, naming the item by its id where there is one. */
function zodIssues(error: z.ZodError, report: (message: string) => void, data?: unknown): void {
  for (const issue of error.issues) {
    let where = "";
    let node: unknown = data;
    for (const key of issue.path) {
      if (typeof key === "number") {
        node = Array.isArray(node) ? node[key] : undefined;
        const id = node && typeof node === "object" && "id" in node && typeof node.id === "string" ? node.id : null;
        where += id ? `[${key} "${id}"]` : `[${key}]`;
      } else {
        node = node && typeof node === "object" ? (node as Record<PropertyKey, unknown>)[key] : undefined;
        where += where ? `.${String(key)}` : String(key);
      }
    }
    report(where ? `${where}: ${issue.message}` : issue.message);
  }
}

/** Validates $$math$$ in every string of a parsed file. */
function checkMath(value: unknown, report: (message: string) => void, where = ""): void {
  if (typeof value === "string") {
    for (const problem of mathProblems(value)) report(where ? `${where}: ${problem}` : problem);
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => checkMath(item, report, `${where}[${index}]`));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) checkMath(item, report, where ? `${where}.${key}` : key);
  }
}

/** Directory entries in a stable order, skipping hidden files. */
function listDir(dir: string): string[] {
  return readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .sort();
}
