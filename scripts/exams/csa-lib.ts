/* Helpers for AP Computer Science A templates: Java formatting and Java arithmetic. */
import type { Rng } from "./lib";
import { correct, Retry, wrong, type Choice } from "./types";

/** A fenced Java block (no blank lines inside, so it stays one paragraph). */
export const java = (src: string) => "```java\n" + src.replace(/^\n+|\s+$/g, "") + "\n```";
/** Inline code. */
export const ic = (s: string | number) => "`" + String(s) + "`";

/** Java int division truncates toward zero. */
export const idiv = (a: number, b: number) => Math.trunc(a / b);

/** How Java prints a double: always with a decimal point. */
export const jd = (x: number) => (Number.isInteger(x) ? x.toFixed(1) : String(x));

/** How Java prints an int array with an enhanced for loop that prints `x + " "`. */
export const spaced = (a: readonly (number | string)[]) => a.join(" ");
/** How Java prints an ArrayList. */
export const listStr = (a: readonly (number | string)[]) => `[${a.join(", ")}]`;
/** An array initializer list. */
export const init = (a: readonly (number | string)[]) => `{${a.join(", ")}}`;

export const tracePrompt = (code: string, q = "What is printed as a result of executing the code segment?") =>
  `Consider the following code segment.\n\n${java(code)}\n\n${q}`;

/**
 * The correct answer plus three distinct wrong answers, chosen in order from
 * candidates built from specific mistakes. Throws Retry when too few differ.
 */
export function options(right: [string, string], candidates: [string, string][]): { correct: Choice; wrong: Choice[] } {
  const seen = new Set([right[0]]);
  const out: Choice[] = [];
  for (const [text, why] of candidates) {
    if (seen.has(text) || out.length === 3) continue;
    seen.add(text);
    out.push(wrong(text, why));
  }
  if (out.length < 3) throw new Retry();
  return { correct: correct(right[0], right[1]), wrong: out };
}

export const WORDS = ["computer", "algorithm", "variable", "function", "keyboard", "document", "sandwich", "elephant", "painting", "dinosaur", "triangle", "notebook", "mountain", "umbrella", "calendar", "sunshine", "airplane", "festival"];

/** Distinct integers in [lo, hi]. */
export function distinct(r: Rng, n: number, lo: number, hi: number): number[] {
  const all: number[] = [];
  for (let x = lo; x <= hi; x++) all.push(x);
  return r.sample(all, n);
}

export const ints = (r: Rng, n: number, lo: number, hi: number) => Array.from({ length: n }, () => r.int(lo, hi));
