/*
 * Shared helpers for the practice-exam generator: a seeded random source, exact
 * fractions, TeX formatting, numeric calculus for calculator questions, and SVG
 * graphs. Everything is deterministic for a given seed, so regenerating gives
 * the same exams.
 */

// ---------------------------------------------------------------------------
// Random numbers
// ---------------------------------------------------------------------------

export class Rng {
  private state: number;
  constructor(seed: number) {
    this.state = seed >>> 0 || 1;
  }
  next(): number {
    // mulberry32
    let t = (this.state = (this.state + 0x6d2b79f5) >>> 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  /** Integer in [lo, hi]. */
  int(lo: number, hi: number): number {
    return lo + Math.floor(this.next() * (hi - lo + 1));
  }
  /** Nonzero integer in [lo, hi]. */
  nz(lo: number, hi: number): number {
    for (;;) {
      const n = this.int(lo, hi);
      if (n !== 0) return n;
    }
  }
  pick<T>(items: readonly T[]): T {
    return items[Math.floor(this.next() * items.length)]!;
  }
  sign(): 1 | -1 {
    return this.next() < 0.5 ? 1 : -1;
  }
  shuffle<T>(items: readonly T[]): T[] {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [out[i], out[j]] = [out[j]!, out[i]!];
    }
    return out;
  }
  /** `count` distinct items. */
  sample<T>(items: readonly T[], count: number): T[] {
    return this.shuffle(items).slice(0, count);
  }
}

// ---------------------------------------------------------------------------
// Exact fractions
// ---------------------------------------------------------------------------

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

export class Frac {
  readonly n: number;
  readonly d: number;
  constructor(n: number, d = 1) {
    if (d === 0) throw new Error("Zero denominator");
    if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error(`Non-integer fraction ${n}/${d}`);
    const g = gcd(n, d) || 1;
    const s = d < 0 ? -1 : 1;
    this.n = (s * n) / g;
    this.d = (s * d) / g;
  }
  static of(x: number | Frac): Frac {
    return x instanceof Frac ? x : new Frac(x);
  }
  add(o: number | Frac) {
    const b = Frac.of(o);
    return new Frac(this.n * b.d + b.n * this.d, this.d * b.d);
  }
  sub(o: number | Frac) {
    const b = Frac.of(o);
    return new Frac(this.n * b.d - b.n * this.d, this.d * b.d);
  }
  mul(o: number | Frac) {
    const b = Frac.of(o);
    return new Frac(this.n * b.n, this.d * b.d);
  }
  div(o: number | Frac) {
    const b = Frac.of(o);
    return new Frac(this.n * b.d, this.d * b.n);
  }
  neg() {
    return new Frac(-this.n, this.d);
  }
  get value() {
    return this.n / this.d;
  }
  isInt() {
    return this.d === 1;
  }
  equals(o: number | Frac) {
    const b = Frac.of(o);
    return this.n === b.n && this.d === b.d;
  }
  /** TeX: 3, -\frac{1}{2} */
  tex(): string {
    if (this.d === 1) return String(this.n);
    return `${this.n < 0 ? "-" : ""}\\frac{${Math.abs(this.n)}}{${this.d}}`;
  }
  toString() {
    return this.tex();
  }
}

export const F = (n: number, d = 1) => new Frac(n, d);

// ---------------------------------------------------------------------------
// TeX formatting
// ---------------------------------------------------------------------------

/** Wraps TeX for content strings. */
export const m = (tex: string | number | Frac) => `$$${String(tex)}$$`;

/** Coefficient times a term: (1, "x") -> "x", (-1, "x") -> "-x", (3, "x") -> "3x". */
export function coef(c: number | Frac, term: string): string {
  const f = Frac.of(c);
  if (term === "") return f.tex();
  if (f.equals(1)) return term;
  if (f.equals(-1)) return `-${term}`;
  return `${f.tex()}${term}`;
}

/** Joins signed terms: ["x^2", "-3x", "5"] -> "x^2 - 3x + 5". Zero terms should be filtered by the caller. */
export function joinTerms(terms: string[]): string {
  const parts = terms.filter((t) => t !== "" && t !== "0");
  if (!parts.length) return "0";
  return parts
    .map((t, i) => {
      if (i === 0) return t;
      return t.startsWith("-") ? ` - ${t.slice(1)}` : ` + ${t}`;
    })
    .join("");
}

/** Polynomial from coefficients, highest power first. poly([2, 0, -3, 5]) -> "2x^{3} - 3x + 5". */
export function poly(coeffs: (number | Frac)[], v = "x"): string {
  const deg = coeffs.length - 1;
  const terms: string[] = [];
  coeffs.forEach((c, i) => {
    const f = Frac.of(c);
    if (f.n === 0) return;
    const p = deg - i;
    const term = p === 0 ? "" : p === 1 ? v : `${v}^{${p}}`;
    terms.push(p === 0 ? f.tex() : coef(f, term));
  });
  return joinTerms(terms);
}

/** Evaluates a polynomial (highest power first). */
export function polyAt(coeffs: number[], x: number): number {
  return coeffs.reduce((acc, c) => acc * x + c, 0);
}

export function polyAtF(coeffs: (number | Frac)[], x: number | Frac): Frac {
  return coeffs.reduce<Frac>((acc, c) => acc.mul(x).add(c), F(0));
}

export function polyDeriv(coeffs: number[]): number[] {
  const deg = coeffs.length - 1;
  return coeffs.slice(0, -1).map((c, i) => c * (deg - i));
}

/** "(x - 3)", "(x + 2)", "x" */
export function shift(v: string, a: number): string {
  if (a === 0) return v;
  return a > 0 ? `(${v} - ${a})` : `(${v} + ${-a})`;
}

/** "x - 3", "x + 2" without parentheses. */
export function shiftBare(v: string, a: number): string {
  if (a === 0) return v;
  return a > 0 ? `${v} - ${a}` : `${v} + ${-a}`;
}

/** Signed constant for appending: 3 -> "+ 3", -3 -> "- 3". */
export const signed = (n: number | Frac) => {
  const f = Frac.of(n);
  return f.n < 0 ? `- ${f.neg().tex()}` : `+ ${f.tex()}`;
};

/** Calculator answers: three decimal places, as the AP exam asks. */
export function dec(x: number, places = 3): string {
  const r = Number(x.toFixed(places));
  return (Object.is(r, -0) ? 0 : r).toFixed(places);
}

// ---------------------------------------------------------------------------
// Numeric calculus (for calculator-active questions)
// ---------------------------------------------------------------------------

/** Composite Simpson's rule with n (even) subintervals. */
export function integrate(f: (x: number) => number, a: number, b: number, n = 2000): number {
  if (a === b) return 0;
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

export function derivative(f: (x: number) => number, x: number, h = 1e-5): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** All roots of f on [a, b], found by scanning for sign changes and bisecting. */
export function roots(f: (x: number) => number, a: number, b: number, steps = 4000): number[] {
  const out: number[] = [];
  const h = (b - a) / steps;
  let x0 = a;
  let y0 = f(a);
  for (let i = 1; i <= steps; i++) {
    const x1 = a + i * h;
    const y1 = f(x1);
    if (y0 === 0) out.push(x0);
    else if (y0 * y1 < 0) {
      let lo = x0;
      let hi = x1;
      for (let k = 0; k < 80; k++) {
        const mid = (lo + hi) / 2;
        if (f(lo) * f(mid) <= 0) hi = mid;
        else lo = mid;
      }
      out.push((lo + hi) / 2);
    }
    x0 = x1;
    y0 = y1;
  }
  if (y0 === 0) out.push(b);
  return out.filter((r, i) => i === 0 || Math.abs(r - out[i - 1]!) > 1e-7);
}

// ---------------------------------------------------------------------------
// SVG graphs
// ---------------------------------------------------------------------------

interface GraphOptions {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  /** Label for the curve, e.g. "f" or "y = f'(x)". */
  label?: string;
  width?: number;
}

function frame(o: GraphOptions) {
  const width = o.width ?? 480;
  const unit = width / (o.xMax - o.xMin + 1);
  const height = unit * (o.yMax - o.yMin + 1);
  const pad = unit / 2;
  const X = (x: number) => pad + (x - o.xMin) * unit;
  const Y = (y: number) => pad + (o.yMax - y) * unit;
  const parts: string[] = [];
  // grid
  for (let x = o.xMin; x <= o.xMax; x++) parts.push(`<line x1="${X(x)}" y1="${Y(o.yMin)}" x2="${X(x)}" y2="${Y(o.yMax)}" stroke="#e2e8f0" stroke-width="1"/>`);
  for (let y = o.yMin; y <= o.yMax; y++) parts.push(`<line x1="${X(o.xMin)}" y1="${Y(y)}" x2="${X(o.xMax)}" y2="${Y(y)}" stroke="#e2e8f0" stroke-width="1"/>`);
  // axes
  if (o.yMin <= 0 && o.yMax >= 0) parts.push(`<line x1="${X(o.xMin)}" y1="${Y(0)}" x2="${X(o.xMax)}" y2="${Y(0)}" stroke="#334155" stroke-width="1.5"/>`);
  if (o.xMin <= 0 && o.xMax >= 0) parts.push(`<line x1="${X(0)}" y1="${Y(o.yMin)}" x2="${X(0)}" y2="${Y(o.yMax)}" stroke="#334155" stroke-width="1.5"/>`);
  // tick labels
  const fs = Math.max(11, Math.min(14, unit * 0.42));
  for (let x = o.xMin; x <= o.xMax; x++) {
    if (x === 0) continue;
    parts.push(`<text x="${X(x)}" y="${Y(0) + fs + 2}" font-size="${fs}" text-anchor="middle" fill="#334155">${x}</text>`);
  }
  for (let y = o.yMin; y <= o.yMax; y++) {
    if (y === 0) continue;
    parts.push(`<text x="${X(0) - 5}" y="${Y(y) + fs / 3}" font-size="${fs}" text-anchor="end" fill="#334155">${y}</text>`);
  }
  parts.push(`<text x="${X(0) - 5}" y="${Y(0) + fs + 2}" font-size="${fs}" text-anchor="end" fill="#334155">0</text>`);
  return { width: width, height: height + unit * 0, unit, X, Y, parts, fs };
}

function wrap(width: number, height: number, parts: string[]) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(1)} ${height.toFixed(1)}" width="${width.toFixed(0)}" height="${height.toFixed(0)}" font-family="Arial, Helvetica, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/>${parts.join("")}</svg>\n`;
}

/** Piecewise-linear graph through `points` (and optional semicircle arcs given as polyline points). */
export function graphSvg(points: [number, number][], o: GraphOptions): string {
  const fr = frame(o);
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${fr.X(x).toFixed(2)},${fr.Y(y).toFixed(2)}`).join(" ");
  fr.parts.push(`<path d="${d}" fill="none" stroke="#0f766e" stroke-width="3" stroke-linejoin="round"/>`);
  const [ex, ey] = [points[0]!, points[points.length - 1]!];
  for (const [x, y] of [ex, ey]) fr.parts.push(`<circle cx="${fr.X(x)}" cy="${fr.Y(y)}" r="4" fill="#0f766e"/>`);
  if (o.label) {
    const mid = points[Math.floor(points.length / 2)]!;
    fr.parts.push(`<text x="${fr.X(mid[0]) + 6}" y="${fr.Y(mid[1]) - 8}" font-size="${fr.fs + 2}" font-style="italic" fill="#0f766e">${o.label}</text>`);
  }
  const width = (o.width ?? 480);
  return wrap(width, fr.unit * (o.yMax - o.yMin + 1), fr.parts);
}

/** Slope field for dy/dx = slope(x, y) on integer grid points. */
export function slopeFieldSvg(slope: (x: number, y: number) => number, o: GraphOptions): string {
  const fr = frame(o);
  const half = fr.unit * 0.32;
  for (let x = o.xMin; x <= o.xMax; x++) {
    for (let y = o.yMin; y <= o.yMax; y++) {
      const s = slope(x, y);
      if (!Number.isFinite(s)) continue;
      const angle = Math.atan(s);
      const dx = Math.cos(angle) * half;
      const dy = Math.sin(angle) * half;
      fr.parts.push(
        `<line x1="${(fr.X(x) - dx).toFixed(2)}" y1="${(fr.Y(y) + dy).toFixed(2)}" x2="${(fr.X(x) + dx).toFixed(2)}" y2="${(fr.Y(y) - dy).toFixed(2)}" stroke="#0f766e" stroke-width="2.2" stroke-linecap="round"/>`,
      );
    }
  }
  const width = (o.width ?? 480);
  return wrap(width, fr.unit * (o.yMax - o.yMin + 1), fr.parts);
}

/** Wraps a negative number in parentheses for substitution: -3 -> "(-3)". */
export const par = (n: number | Frac) => (Frac.of(n).n < 0 ? `(${Frac.of(n).tex()})` : Frac.of(n).tex());
