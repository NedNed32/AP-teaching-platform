import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SUBJECTS } from "@/lib/content/schema";
import { contrastRatio, parseOklch, type Oklch } from "./support/contrast";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

function tokensFor(selectorStart: string): Map<string, Oklch> {
  const start = css.indexOf(selectorStart);
  if (start < 0) throw new Error(`Theme block not found: ${selectorStart}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("\n}", open);
  const tokens = new Map<string, Oklch>();
  for (const [, name, value] of css.slice(open + 1, close).matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    const parsed = parseOklch(value!);
    if (parsed) tokens.set(name!, parsed);
  }
  return tokens;
}

const themes = {
  dark: tokensFor(':root,\n[data-theme="dark"]'),
  light: tokensFor('[data-theme="light"] {'),
};

const BODY_TEXT = ["fg", "fg-muted", "accent", "success", "danger", "warn", "info"];
// Every subject a course can declare needs a legible accent in both themes.
const SUBJECT_TEXT = SUBJECTS.map((subject) => `subject-${subject}`);
const GROUNDS = ["canvas", "surface"];

describe.each(Object.entries(themes))("%s theme", (_name, tokens) => {
  const get = (name: string) => {
    const value = tokens.get(name);
    if (!value) throw new Error(`Missing token --${name}`);
    return value;
  };

  it.each([...BODY_TEXT, ...SUBJECT_TEXT].flatMap((fg) => GROUNDS.map((bg) => [fg, bg] as const)))(
    "--%s on --%s meets WCAG AA (4.5:1)",
    (fg, bg) => {
      expect(contrastRatio(get(fg), get(bg))).toBeGreaterThanOrEqual(4.5);
    },
  );

  it("--fg-subtle stays legible for large or decorative text (3:1)", () => {
    for (const bg of GROUNDS) expect(contrastRatio(get("fg-subtle"), get(bg))).toBeGreaterThanOrEqual(3);
  });

  it("text on the accent button meets WCAG AA", () => {
    expect(contrastRatio(get("accent-fg"), get("accent"))).toBeGreaterThanOrEqual(4.5);
  });
});
