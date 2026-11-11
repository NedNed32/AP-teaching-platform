/* Helpers for AP Physics C templates: number formatting with units, and numeric options. */
import { options } from "./csa-lib";
import type { McqTemplate } from "./types";
import { Retry } from "./types";

export const G = 9.8;
export const K = 8.99e9;
export const MU0 = 4 * Math.PI * 1e-7;
export const EPS0 = 8.85e-12;
export const E_CHARGE = 1.6e-19;

/** TeX for a number to `sig` significant figures, switching to scientific notation for very large or small values. */
export function num(x: number, sig = 3): string {
  if (!Number.isFinite(x)) throw new Retry();
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e4 || a < 1e-2) {
    let e = Math.floor(Math.log10(a));
    let m = Number((x / 10 ** e).toPrecision(sig));
    if (Math.abs(m) >= 10) {
      m /= 10;
      e++;
    }
    return `${m} \\times 10^{${e}}`;
  }
  return String(Number(x.toPrecision(sig)));
}

/** A quantity with units as display math, e.g. q(9.81, "m/s^2"). */
export const q = (x: number, unit: string, sig = 3) => `$$${num(x, sig)}\\ \\mathrm{${unit}}$$`;
/** Inline math. */
export const m = (tex: string | number) => `$$${tex}$$`;

/**
 * Options for a numeric answer: the right value and wrong values built from
 * specific mistakes, all formatted with the same unit. Values that round to the
 * same text as another are dropped.
 */
export function numOptions(right: number, why: string, wrongs: [number, string][], unit: string) {
  return options([q(right, unit), why], wrongs.filter(([v]) => Number.isFinite(v) && v !== 0).map(([v, w]) => [q(v, unit), w]));
}

export const tpl = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({
  key,
  unit,
  topics,
  skills,
  difficulty,
  calc: true,
  gen,
});

export const deg = (d: number) => (d * Math.PI) / 180;
