/**
 * npm run content:check
 * Validates every course (schemas, references, math, assets), compiles every lesson,
 * and reports what's missing. Exits with 1 when there are errors, which also fail the build.
 */
import path from "node:path";
import { formatIssue, loadContent, type ContentIssue } from "../src/lib/content/load";
import { lessonIssues } from "../src/lib/content/mdx";

async function main() {
  const root = path.join(process.cwd(), "content");
  const catalog = loadContent(root);
  const issues: ContentIssue[] = [...catalog.issues];
  for (const course of catalog.courses) issues.push(...(await lessonIssues(course)));

  const useColor = process.stdout.isTTY;
  const paint = (code: number, text: string) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text);
  const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

  for (const course of catalog.courses) {
    const topics = course.units.flatMap((unit) => unit.topics);
    console.log(
      `${paint(1, course.id)} (${course.status}) · ${plural(course.units.length, "unit")} · ${plural(topics.length, "topic")} · ` +
        `${course.lessons.size} with lessons · ${plural(course.questions.length, "question")}`,
    );
  }
  if (catalog.courses.length === 0) console.log("No courses yet. Add one under content/courses/ (see docs/CONTENT.md).");

  const errors = issues.filter((issue) => issue.level === "error");
  const warnings = issues.filter((issue) => issue.level === "warning");
  if (issues.length) console.log("");
  for (const issue of [...errors, ...warnings]) {
    console.log(formatIssue(issue).replace(/  (error|warning)  /, (_, level: string) => `  ${paint(level === "error" ? 31 : 33, level)}  `));
  }
  console.log("");
  if (errors.length) {
    console.log(paint(31, `✖ ${plural(errors.length, "error")}, ${plural(warnings.length, "warning")}`));
    process.exit(1);
  }
  console.log(paint(32, `✔ No errors`) + (warnings.length ? ` (${plural(warnings.length, "warning")}: gaps to fill, not blockers)` : ""));
}

void main();
