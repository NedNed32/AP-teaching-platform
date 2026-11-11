/* Shared helpers for economics question templates. */
import type { Rng } from "./lib";
import { correct, Retry, wrong, type Choice } from "./types";

export type Dir = "up" | "down" | "?";
const WORD: Record<Dir, string> = { up: "will increase", down: "will decrease", "?": "cannot be determined" };

/** "Price level: increases; Real GDP: decreases" */
export const combo = (names: readonly [string, string], d: readonly [Dir, Dir]) => `${names[0]} ${WORD[d[0]]}; ${names[1]} ${WORD[d[1]]}`;

/**
 * Options for a two-variable direction question. `answer` may contain one "?" (indeterminate)
 * for double-shift questions. Wrong options explain which variable they get wrong.
 */
export function directionChoices(r: Rng, names: readonly [string, string], answer: readonly [Dir, Dir], reason: string): { correct: Choice; wrong: Choice[] } {
  const all: [Dir, Dir][] = answer.includes("?")
    ? [
        ["up", "?"],
        ["down", "?"],
        ["?", "up"],
        ["?", "down"],
        ["up", "up"],
        ["up", "down"],
        ["down", "up"],
        ["down", "down"],
      ]
    : [
        ["up", "up"],
        ["up", "down"],
        ["down", "up"],
        ["down", "down"],
      ];
  const others = r.shuffle(all.filter((c) => c[0] !== answer[0] || c[1] !== answer[1])).slice(0, 3);
  const explain = (c: [Dir, Dir]) => {
    const bad = [0, 1].filter((i) => c[i] !== answer[i]).map((i) => `${names[i]} ${answer[i] === "?" ? "is indeterminate here, because the two effects work in opposite directions" : WORD[answer[i]!]}`);
    return `Not this one: ${bad.join(", and ")}.`;
  };
  return { correct: correct(combo(names, answer), reason), wrong: others.map((c) => wrong(combo(names, c), explain(c))) };
}

/** Picks n distinct items whose `label` values differ from `exclude`. */
export function distinctLabels<T extends { label: string }>(r: Rng, items: readonly T[], n: number, exclude: string): T[] {
  const pool = r.shuffle(items.filter((i) => i.label !== exclude));
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of pool) {
    if (seen.has(it.label)) continue;
    seen.add(it.label);
    out.push(it);
    if (out.length === n) return out;
  }
  throw new Retry();
}

/** Formats a number with thousands separators and up to 2 decimals. */
export const num = (x: number) => (Number.isInteger(x) ? x.toLocaleString("en-US") : Number(x.toFixed(2)).toLocaleString("en-US"));
/** Formats a percentage. */
export const pct = (x: number) => `${Number(x.toFixed(2))}%`;

export const COUNTRIES = ["Aldoria", "Bresk", "Corvana", "Delmar", "Estova", "Ferrin", "Galen", "Hollis", "Istra", "Juvia"];
export const CURRENCIES: Record<string, string> = {
  Aldoria: "aldo",
  Bresk: "brek",
  Corvana: "corva",
  Delmar: "delm",
  Estova: "esto",
  Ferrin: "ferro",
  Galen: "gale",
  Hollis: "holli",
  Istra: "istro",
  Juvia: "juve",
};
