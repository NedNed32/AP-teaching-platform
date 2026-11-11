import "server-only";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import { formatIssue, loadContent, type Catalog, type Course, type Topic, type Unit } from "@/lib/content/load";
import { compileLesson, runLesson } from "@/lib/content/mdx";

const CONTENT_ROOT = path.join(/*turbopackIgnore: true*/ process.cwd(), "content");
const production = process.env.NODE_ENV === "production";

/** Draft courses are visible in development, and in production only with SHOW_DRAFTS=1. */
export const showDrafts = () => !production || process.env.SHOW_DRAFTS === "1";

function load(): Catalog {
  const catalog = loadContent(CONTENT_ROOT);
  const errors = catalog.issues.filter((issue) => issue.level === "error");
  if (errors.length) {
    const shown = errors.slice(0, 20).map(formatIssue).join("\n");
    const more = errors.length > 20 ? `\n…and ${errors.length - 20} more.` : "";
    throw new Error(`The content has ${errors.length} error(s). Run \`npm run content:check\` for the full list.\n${shown}${more}`);
  }
  return catalog;
}

let memo: Catalog | undefined;
// In development content is re-read on every request, so edits show on reload.
const loadPerRequest = cache(load);

function catalog(): Catalog {
  return production ? (memo ??= load()) : loadPerRequest();
}

export function getCourses(): readonly Course[] {
  const drafts = showDrafts();
  return catalog().courses.filter((course) => drafts || course.status !== "draft");
}

export function getCourse(courseId: string): Course | undefined {
  return getCourses().find((course) => course.id === courseId);
}

export function getUnit(course: Course, unitId: string): Unit | undefined {
  return course.units.find((unit) => unit.id === unitId);
}

export function getTopic(unit: Unit, topicId: string): Topic | undefined {
  return unit.topics.find((topic) => topic.id === topicId);
}

/** Every [course, unit, topic] route, for generateStaticParams. */
export function topicRoutes() {
  return getCourses().flatMap((course) =>
    course.units.flatMap((unit) => unit.topics.map((topic) => ({ course: course.id, unit: unit.id, topic: topic.id }))),
  );
}

const compiled = new Map<string, Promise<MDXContent | null>>();

async function compileAndRun(course: Course, topicId: string): Promise<MDXContent | null> {
  const lesson = course.lessons.get(topicId);
  if (!lesson) return null;
  const result = await compileLesson(lesson, course.dir);
  if (!result.ok) {
    const details = result.problems.map((p) => formatIssue({ level: "error", file: lesson.file, ...p })).join("\n");
    throw new Error(`Lesson ${lesson.file} doesn't compile:\n${details}`);
  }
  return runLesson(result.code);
}

/** The lesson for a topic as a component, or null when the topic has no lesson yet. */
export function getLessonContent(course: Course, topicId: string): Promise<MDXContent | null> {
  if (!production) return compileAndRun(course, topicId);
  const key = `${course.id}/${topicId}`;
  let entry = compiled.get(key);
  if (!entry) {
    entry = compileAndRun(course, topicId);
    compiled.set(key, entry);
  }
  return entry;
}
