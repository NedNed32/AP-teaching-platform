import "server-only";
import type { Course, Exam } from "@/lib/content/load";
import type { Question, Stimulus } from "@/lib/content/schema";
import { DEFAULT_CUTOFFS, type ExamData, type QuestionData, type StimulusData } from "@/lib/exam/types";

const ROMAN = ["I", "II", "III", "IV"];

function stimulusData(course: Course, stimulus: Stimulus): StimulusData {
  return {
    id: stimulus.id,
    title: stimulus.title,
    text: stimulus.text,
    table: stimulus.table,
    source: stimulus.source,
    // scripts/sync-assets.ts serves content/courses/<id>/assets/ at /courses/<id>/.
    image: stimulus.image
      ? { url: `/courses/${course.id}/${stimulus.image.src.slice("assets/".length)}`, alt: stimulus.image.alt, caption: stimulus.image.caption }
      : undefined,
  };
}

function unitsOf(course: Course, topics: readonly string[]): number[] {
  const units = new Set<number>();
  for (const unit of course.units) if (unit.topics.some((t) => topics.includes(t.id))) units.add(unit.number);
  return [...units].sort((a, b) => a - b);
}

export function questionData(course: Course, question: Question): QuestionData {
  const stimuli = (question.stimuli ?? []).map((id) => course.stimuli.get(id)).filter((s): s is Stimulus => !!s).map((s) => stimulusData(course, s));
  const base = { id: question.id, units: unitsOf(course, question.topics), topics: [...question.topics], stimuli };
  if (question.type === "mcq") {
    return { ...base, type: "mcq", stem: question.stem, options: question.options, answer: question.answer, explanation: question.explanation };
  }
  return {
    ...base,
    type: "frq",
    title: question.title,
    minutes: question.minutes,
    parts: question.parts.map((part) => {
      const rubric = part.rubric.map((row) =>
        row.kind === "point"
          ? { id: row.id, criterion: row.criterion, example: row.example, max: 1 }
          : { id: row.id, criterion: row.criterion, max: row.max, levels: row.levels },
      );
      const total = rubric.reduce((sum, row) => sum + row.max, 0);
      return { id: part.id, prompt: part.prompt, rubric, maxPoints: part.maxPoints ?? total };
    }),
  };
}

export function getExam(course: Course, slug: string): Exam | undefined {
  return course.exams.find((exam) => exam.slug === slug);
}

export function examData(course: Course, exam: Exam): ExamData {
  const byId = new Map(course.questions.map((q) => [q.id, q]));
  // Section labels follow the AP exam: Section I is multiple choice, Section II free response, each in parts.
  const partCounts = { mcq: 0, frq: 0 };
  // Only name parts when a section has more than one (calculus does; most courses do not).
  const typeTotals = { mcq: 0, frq: 0 };
  for (const s of exam.sections) typeTotals[s.type]++;
  return {
    courseId: course.id,
    courseTitle: course.title,
    number: exam.number,
    total: course.exams.length,
    unitTitles: Object.fromEntries(course.units.map((u) => [u.number, u.title])),
    cutoffs: course.mock?.cutoffs ?? DEFAULT_CUTOFFS,
    sections: exam.sections.map((section) => {
      const part = String.fromCharCode(65 + partCounts[section.type]++);
      const roman = section.type === "mcq" ? ROMAN[0] : ROMAN[1];
      return {
        label: typeTotals[section.type] > 1 ? `Section ${roman}, Part ${part}` : `Section ${roman}`,
        type: section.type,
        minutes: section.minutes,
        calculator: section.calculator,
        weight: section.weight ?? 0,
        questions: section.questionIds.map((id) => questionData(course, byId.get(id)!)),
      };
    }),
  };
}

/** A topic's multiple-choice questions, for practice on the topic page. */
export function topicPractice(course: Course, topicId: string, limit = 40): QuestionData[] {
  const matches = course.questions.filter((q) => q.type === "mcq" && q.topics.includes(topicId));
  // Spread the picks across exams rather than taking the first file's questions.
  const step = Math.max(1, Math.floor(matches.length / limit));
  return matches.filter((_, i) => i % step === 0).slice(0, limit).map((q) => questionData(course, q));
}
