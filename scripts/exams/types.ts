import type { Rng } from "./lib";

export interface TableDraft {
  caption: string;
  columns: { key: string; label: string; unit?: string }[];
  rows: Record<string, string | number>[];
}

/** Shared material shown above a question. `svg` becomes an image asset. */
export interface StimulusDraft {
  text?: string;
  table?: TableDraft;
  svg?: string;
  alt?: string;
  caption?: string;
}

export interface Choice {
  text: string;
  why: string;
}

export interface McqDraft {
  stem: string;
  correct: Choice;
  /** Exactly three wrong answers, each built from a specific mistake. */
  wrong: Choice[];
  explanation: string;
  stimulus?: StimulusDraft;
  /** Keep the option order as written (e.g. counts in ascending order). */
  ordered?: boolean;
}

export interface McqTemplate {
  key: string;
  unit: number;
  topics: string[];
  skills: string[];
  difficulty: number;
  /** Written for the calculator-active section. */
  calc: boolean;
  gen(r: Rng): McqDraft;
}

export interface RubricPoint {
  criterion: string;
  example?: string;
}

export interface FrqPartDraft {
  prompt: string;
  rubric: RubricPoint[];
}

export interface FrqDraft {
  title: string;
  stimulus: StimulusDraft;
  parts: FrqPartDraft[];
}

export interface FrqTemplate {
  key: string;
  topics: string[];
  skills: string[];
  difficulty: number;
  calc: boolean;
  /** Suggested minutes; defaults to the course's frqMinutes. */
  minutes?: number;
  /** The exam's name for this kind of question, e.g. "long", "short". */
  format?: string;
  gen(r: Rng): FrqDraft;
}

/** Thrown when random parameters give a degenerate question; the generator retries. */
export class Retry extends Error {}

export const correct = (text: string, why: string): Choice => ({ text, why: `Correct. ${why}` });
export const wrong = (text: string, why: string): Choice => ({ text, why });
