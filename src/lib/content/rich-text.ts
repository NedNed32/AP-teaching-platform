import katex from "katex";
import "katex/contrib/mhchem";

/*
 * Strings in course.json and question files may use a little formatting:
 * **bold**, *italic*, $$math$$ (KaTeX, with \ce{} for chemistry) and blank
 * lines between paragraphs. Math uses double dollars so a single $ is just a
 * dollar sign, which economics and history text needs. Lessons (MDX) use the
 * same math convention.
 */

export type RichToken =
  | { kind: "text"; text: string }
  | { kind: "math"; tex: string }
  | { kind: "code"; text: string }
  /** A fenced ``` block; always the only token of its paragraph. */
  | { kind: "codeblock"; text: string }
  | { kind: "bold"; children: RichToken[] }
  | { kind: "italic"; children: RichToken[] };

const MATH = /\$\$([\s\S]+?)\$\$/g;
const INLINE = /\$\$([\s\S]+?)\$\$|`([^`\n]+)`|\*\*([\s\S]+?)\*\*|\*([^*\n]+?)\*/g;
const FENCE = /```[a-z]*\n([\s\S]*?)\n?```/g;

function tokenize(text: string, pattern: RegExp): RichToken[] {
  const tokens: RichToken[] = [];
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) tokens.push({ kind: "text", text: text.slice(last, match.index) });
    const [, tex, code, bold, italic] = match;
    if (tex !== undefined) tokens.push({ kind: "math", tex });
    else if (code !== undefined) tokens.push({ kind: "code", text: code });
    else if (bold !== undefined) tokens.push({ kind: "bold", children: tokenize(bold, MATH) });
    else if (italic !== undefined) tokens.push({ kind: "italic", children: tokenize(italic, MATH) });
    last = match.index + match[0].length;
  }
  if (last < text.length) tokens.push({ kind: "text", text: text.slice(last) });
  return tokens;
}

function paragraphs(text: string): RichToken[][] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => tokenize(paragraph, INLINE));
}

/** Paragraphs (split on blank lines), each a list of inline tokens. Fenced ``` blocks are kept whole. */
export function parseRichText(text: string): RichToken[][] {
  const out: RichToken[][] = [];
  let last = 0;
  for (const match of text.matchAll(FENCE)) {
    out.push(...paragraphs(text.slice(last, match.index)));
    out.push([{ kind: "codeblock", text: match[1]! }]);
    last = match.index + match[0].length;
  }
  out.push(...paragraphs(text.slice(last)));
  return out;
}

export function renderMath(tex: string, displayMode = false): string {
  return katex.renderToString(tex, { displayMode, throwOnError: false, strict: "ignore" });
}

/** Problems with the math in a string: an unclosed $$ or TeX that KaTeX can't parse. */
export function mathProblems(text: string): string[] {
  if (!text.includes("$$")) return [];
  const problems: string[] = [];
  if ((text.match(/\$\$/g)?.length ?? 0) % 2 === 1) problems.push("Unclosed $$ (math needs $$ on both sides).");
  for (const [, tex] of text.matchAll(MATH)) {
    try {
      katex.renderToString(tex!, { throwOnError: true, strict: "ignore" });
    } catch (error) {
      problems.push(`Math $$${tex}$$: ${error instanceof Error ? error.message.replace(/^KaTeX parse error: /, "") : String(error)}`);
    }
  }
  return problems;
}
