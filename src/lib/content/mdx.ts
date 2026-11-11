import { existsSync } from "node:fs";
import path from "node:path";
import { compile, run } from "@mdx-js/mdx";
import "katex/contrib/mhchem";
import type { Root } from "mdast";
import type { MDXContent } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import type { ContentIssue, Course, LessonEntry } from "./load";

/*
 * Lessons are MDX, restricted to Markdown, $$math$$ and the components below.
 * MDX can otherwise run code (imports, {expressions}), so lesson files are
 * treated as data: anything else is an error with a line number.
 */

interface Allowed {
  required: readonly string[];
  optional: readonly string[];
}

/** The components a lesson may use, and the props each takes (all plain quoted strings). */
export const LESSON_COMPONENTS: Readonly<Record<string, Allowed>> = {
  Note: { required: [], optional: ["title"] },
  WorkedExample: { required: [], optional: ["title"] },
  Analogy: { required: ["breaksDown"], optional: [] },
  Figure: { required: ["src", "alt"], optional: ["caption"] },
  sub: { required: [], optional: [] },
  sup: { required: [], optional: [] },
};

export interface LessonProblem {
  line?: number | undefined;
  column?: number | undefined;
  message: string;
}

export type CompiledLesson = { ok: true; code: string } | { ok: false; problems: LessonProblem[] };

interface MdxNode {
  type: string;
  depth?: number;
  name?: string | null;
  attributes?: { type: string; name?: string; value?: unknown }[];
  children?: MdxNode[];
  position?: { start: { line: number; column: number } };
}

const BRACES =
  "Curly braces run code in MDX, so they aren't allowed in lessons. Write \\{ or \\} for a literal brace; math goes between $$.";

function restrictLessonSyntax(options: { courseDir: string; problems: LessonProblem[] }) {
  return (tree: Root) => {
    const problem = (node: MdxNode, message: string) =>
      options.problems.push({ line: node.position?.start.line, column: node.position?.start.column, message });

    const visit = (node: MdxNode) => {
      switch (node.type) {
        case "mdxjsEsm":
          problem(node, "import and export aren't allowed in lessons.");
          break;
        case "mdxFlowExpression":
        case "mdxTextExpression":
          problem(node, BRACES);
          break;
        case "heading":
          if (node.depth === 1) problem(node, "Start sections at ## (the topic title is the page's only # heading).");
          break;
        case "image":
          problem(node, 'Use <Figure src="assets/…" alt="…" /> for images, so every image has alt text.');
          break;
        case "mdxJsxFlowElement":
        case "mdxJsxTextElement":
          checkElement(node, problem, options.courseDir);
          break;
      }
      node.children?.forEach(visit);
    };
    visit(tree as MdxNode);
  };
}

function checkElement(node: MdxNode, problem: (node: MdxNode, message: string) => void, courseDir: string) {
  if (!node.name) {
    problem(node, "Fragments (<>…</>) aren't allowed.");
    return;
  }
  const allowed = LESSON_COMPONENTS[node.name];
  if (!allowed) {
    problem(node, `Unknown component <${node.name}>. Allowed: ${Object.keys(LESSON_COMPONENTS).map((n) => `<${n}>`).join(", ")}.`);
    return;
  }
  const props = new Map<string, string>();
  for (const attribute of node.attributes ?? []) {
    if (attribute.type !== "mdxJsxAttribute" || !attribute.name) {
      problem(node, `<${node.name}>: spread attributes aren't allowed.`);
    } else if (![...allowed.required, ...allowed.optional].includes(attribute.name)) {
      const known = [...allowed.required, ...allowed.optional];
      problem(node, `<${node.name}> has no "${attribute.name}" prop.${known.length ? ` It takes: ${known.join(", ")}.` : ""}`);
    } else if (typeof attribute.value !== "string") {
      problem(node, `<${node.name}>: give ${attribute.name} a quoted value, e.g. ${attribute.name}="…". ${BRACES}`);
    } else {
      props.set(attribute.name, attribute.value);
    }
  }
  for (const name of allowed.required) {
    if (!props.get(name)?.trim()) problem(node, `<${node.name}> needs ${name}="…".`);
  }
  const src = props.get("src");
  if (node.name === "Figure" && src) {
    if (!/^assets\/(?!.*\.\.)[A-Za-z0-9._/-]+$/.test(src)) problem(node, `<Figure> src must point into the course's assets folder, e.g. "assets/map.png".`);
    else if (!existsSync(path.join(courseDir, src))) problem(node, `<Figure> src "${src}" doesn't exist.`);
  }
}

/** Compiles a lesson to a function body, or lists everything wrong with it. */
export async function compileLesson(lesson: LessonEntry, courseDir: string): Promise<CompiledLesson> {
  const problems: LessonProblem[] = [];
  try {
    const file = await compile(
      { value: lesson.body, path: lesson.path },
      {
        outputFormat: "function-body",
        development: false,
        remarkPlugins: [remarkGfm, [remarkMath, { singleDollarTextMath: false }], [restrictLessonSyntax, { courseDir, problems }]],
        rehypePlugins: [[rehypeKatex, { strict: "ignore" }]],
      },
    );
    // rehype-katex reports bad TeX as messages instead of throwing.
    for (const message of file.messages) {
      problems.push({ line: message.line ?? undefined, column: message.column ?? undefined, message: `Math: ${message.reason}` });
    }
    return problems.length ? { ok: false, problems } : { ok: true, code: String(file) };
  } catch (failure) {
    // MDX syntax errors (an unclosed tag, a stray <) arrive here with a position.
    const { line, column, reason, message } = failure as { line?: number; column?: number; reason?: string; message?: string };
    problems.push({ line, column, message: reason ?? message ?? String(failure) });
    return { ok: false, problems };
  }
}

/** Turns compiled lesson code into a component. Only ever given code from compileLesson. */
export async function runLesson(code: string): Promise<MDXContent> {
  const module = await run(code, { ...runtime });
  return module.default;
}

/** Compiles every lesson in a course; for content checks. */
export async function lessonIssues(course: Course): Promise<ContentIssue[]> {
  const issues: ContentIssue[] = [];
  for (const lesson of course.lessons.values()) {
    const result = await compileLesson(lesson, course.dir);
    if (!result.ok) {
      for (const problem of result.problems) issues.push({ level: "error", file: lesson.file, ...problem });
    }
  }
  return issues;
}
