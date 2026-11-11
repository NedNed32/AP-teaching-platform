/**
 * Draws the standard economics graphs used by the AP Macroeconomics and AP
 * Microeconomics lessons into each course's assets/lessons/ folder.
 * Run with `npm run lessons:econ-figures`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const W = 420;
const H = 320;
const L = 60; // left margin
const B = 270; // x-axis y position
const TOP = 25;
const RIGHT = 390;
const X = (u: number) => L + u * (RIGHT - L); // u in [0, 1]
const Y = (v: number) => B - v * (B - TOP); // v in [0, 1]

const TEAL = "#0f766e";
const ROSE = "#be123c";
const SKY = "#0369a1";
const AMBER = "#b45309";
const INK = "#334155";

type Pt = [number, number];
interface Curve {
  points: Pt[];
  label: string;
  color?: string;
  dash?: boolean;
  /** Where the label sits, as an index into points (default: last). */
  at?: number;
}

function line(p: Pt[], color: string, dash = false, width = 3) {
  const d = p.map(([u, v], i) => `${i ? "L" : "M"}${X(u).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" ${dash ? 'stroke-dasharray="7 5"' : ""} stroke-linecap="round" stroke-linejoin="round"/>`;
}

function curveFn(f: (u: number) => number, from: number, to: number, n = 60): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const u = from + ((to - from) * i) / n;
    return [u, f(u)] as Pt;
  });
}

function graph(opts: { x: string; y: string; curves: Curve[]; points?: { at: Pt; label?: string; guides?: boolean }[]; shade?: Pt[]; extra?: string }) {
  const parts: string[] = [`<rect width="100%" height="100%" fill="#ffffff"/>`];
  if (opts.shade) parts.push(`<polygon points="${opts.shade.map(([u, v]) => `${X(u).toFixed(1)},${Y(v).toFixed(1)}`).join(" ")}" fill="${SKY}" fill-opacity="0.18"/>`);
  parts.push(`<line x1="${L}" y1="${TOP - 10}" x2="${L}" y2="${B}" stroke="${INK}" stroke-width="2"/>`);
  parts.push(`<line x1="${L}" y1="${B}" x2="${RIGHT + 15}" y2="${B}" stroke="${INK}" stroke-width="2"/>`);
  parts.push(`<text x="${L - 8}" y="${TOP - 2}" font-size="13" text-anchor="end" fill="${INK}">${opts.y}</text>`);
  parts.push(`<text x="${RIGHT + 15}" y="${B + 22}" font-size="13" text-anchor="end" fill="${INK}">${opts.x}</text>`);
  for (const p of opts.points ?? []) {
    if (p.guides !== false) {
      parts.push(`<line x1="${X(p.at[0])}" y1="${Y(p.at[1])}" x2="${X(p.at[0])}" y2="${B}" stroke="#94a3b8" stroke-dasharray="4 4"/>`);
      parts.push(`<line x1="${L}" y1="${Y(p.at[1])}" x2="${X(p.at[0])}" y2="${Y(p.at[1])}" stroke="#94a3b8" stroke-dasharray="4 4"/>`);
    }
  }
  for (const c of opts.curves) {
    const color = c.color ?? TEAL;
    parts.push(line(c.points, color, c.dash));
    const [u, v] = c.points[c.at ?? c.points.length - 1]!;
    parts.push(`<text x="${X(u) + 6}" y="${Y(v) - 6}" font-size="14" font-weight="bold" fill="${color}">${c.label}</text>`);
  }
  for (const p of opts.points ?? []) {
    parts.push(`<circle cx="${X(p.at[0])}" cy="${Y(p.at[1])}" r="4.5" fill="${INK}"/>`);
    if (p.label) parts.push(`<text x="${X(p.at[0]) + 8}" y="${Y(p.at[1]) + 16}" font-size="13" fill="${INK}">${p.label}</text>`);
  }
  if (opts.extra) parts.push(opts.extra);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial, Helvetica, sans-serif">${parts.join("")}</svg>\n`;
}

/** Intersection of the lines through segments a and b. */
function meet(a: [Pt, Pt], b: [Pt, Pt]): Pt {
  const [[x1, y1], [x2, y2]] = a;
  const [[x3, y3], [x4, y4]] = b;
  const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)];
}

const text = (u: number, v: number, s: string, color = INK, size = 13) => `<text x="${X(u)}" y="${Y(v)}" font-size="${size}" fill="${color}">${s}</text>`;

const figures: Record<string, string> = {
  ppc: graph({
    x: "Good B",
    y: "Good A",
    curves: [{ points: curveFn((u) => Math.sqrt(Math.max(0, 1 - (u / 0.85) ** 2)) * 0.85, 0, 0.85), label: "PPC", at: 40 }],
    points: [
      { at: [0.45, 0.72], label: "efficient", guides: false },
      { at: [0.3, 0.35], label: "inefficient", guides: false },
      { at: [0.75, 0.75], label: "unattainable", guides: false },
    ],
  }),
  "supply-demand-shift": graph({
    x: "Quantity",
    y: "Price",
    curves: [
      { points: [[0.1, 0.9], [0.8, 0.15]], label: "D₁" },
      { points: [[0.25, 0.95], [0.95, 0.25]], label: "D₂", color: SKY, dash: true },
      { points: [[0.1, 0.12], [0.85, 0.88]], label: "S", color: ROSE },
    ],
    points: [{ at: meet([[0.1, 0.9], [0.8, 0.15]], [[0.1, 0.12], [0.85, 0.88]]), label: "E₁" }, { at: meet([[0.25, 0.95], [0.95, 0.25]], [[0.1, 0.12], [0.85, 0.88]]), label: "E₂" }],
  }),
  "ad-as": graph({
    x: "Real GDP",
    y: "Price level",
    curves: [
      { points: [[0.15, 0.9], [0.85, 0.15]], label: "AD" },
      { points: [[0.12, 0.15], [0.85, 0.85]], label: "SRAS", color: ROSE },
      { points: [[0.5, 0.02], [0.5, 0.97]], label: "LRAS", color: AMBER, at: 1 },
    ],
    points: [{ at: meet([[0.15, 0.9], [0.85, 0.15]], [[0.12, 0.15], [0.85, 0.85]]), label: "E" }],
    extra: text(0.47, -0.08, "Yf"),
  }),
  "recessionary-gap": graph({
    x: "Real GDP",
    y: "Price level",
    curves: [
      { points: [[0.1, 0.8], [0.8, 0.05]], label: "AD" },
      { points: [[0.12, 0.15], [0.85, 0.85]], label: "SRAS", color: ROSE },
      { points: [[0.62, 0.02], [0.62, 0.97]], label: "LRAS", color: AMBER, at: 1 },
    ],
    points: [{ at: meet([[0.1, 0.8], [0.8, 0.05]], [[0.12, 0.15], [0.85, 0.85]]), label: "E" }],
    extra: text(0.6, -0.08, "Yf") + text(0.4, -0.08, "Y") + text(0.43, 0.08, "gap", SKY),
  }),
  "money-market": graph({
    x: "Quantity of money",
    y: "Nominal interest rate",
    curves: [
      { points: [[0.5, 0.02], [0.5, 0.95]], label: "MS", color: ROSE, at: 1 },
      { points: [[0.12, 0.9], [0.88, 0.12]], label: "MD" },
    ],
    points: [{ at: meet([[0.5, 0.02], [0.5, 0.95]], [[0.12, 0.9], [0.88, 0.12]]), label: "i*" }],
  }),
  "loanable-funds": graph({
    x: "Quantity of loanable funds",
    y: "Real interest rate",
    curves: [
      { points: [[0.12, 0.12], [0.88, 0.88]], label: "S (supply of funds)", color: ROSE },
      { points: [[0.12, 0.88], [0.88, 0.12]], label: "D (demand for funds)" },
    ],
    points: [{ at: [0.5, 0.5], label: "r*" }],
  }),
  "phillips-curve": graph({
    x: "Unemployment rate",
    y: "Inflation rate",
    curves: [
      { points: curveFn((u) => 0.05 + 0.12 / (u + 0.05), 0.1, 0.9), label: "SRPC", at: 50 },
      { points: [[0.42, 0.02], [0.42, 0.97]], label: "LRPC", color: AMBER, at: 1 },
    ],
    extra: text(0.38, -0.08, "NRU"),
  }),
  "fx-market": graph({
    x: "Quantity of dollars",
    y: "Price of $ (euros per dollar)",
    curves: [
      { points: [[0.12, 0.12], [0.88, 0.88]], label: "S$", color: ROSE },
      { points: [[0.12, 0.88], [0.88, 0.12]], label: "D$" },
      { points: [[0.25, 0.95], [0.95, 0.25]], label: "D$₂", color: SKY, dash: true },
    ],
    points: [{ at: [0.5, 0.5], label: "E₁" }, { at: meet([[0.25, 0.95], [0.95, 0.25]], [[0.12, 0.12], [0.88, 0.88]]), label: "E₂" }],
  }),
  "cost-curves": graph({
    x: "Quantity",
    y: "Cost",
    curves: [
      { points: curveFn((u) => 0.15 + 2.2 * (u - 0.35) ** 2 + 0.02, 0.08, 0.85), label: "MC", color: ROSE, at: 55 },
      { points: curveFn((u) => 0.3 + 1.2 * (u - 0.55) ** 2 + 0.05 / (u + 0.02), 0.1, 0.95), label: "ATC", at: 60 },
      { points: curveFn((u) => 0.22 + 1.1 * (u - 0.47) ** 2, 0.1, 0.92), label: "AVC", color: SKY, at: 60 },
    ],
  }),
  monopoly: graph({
    x: "Quantity",
    y: "Price",
    curves: [
      { points: [[0, 0.9], [0.9, 0]], label: "D" },
      { points: [[0, 0.9], [0.45, 0]], label: "MR", color: SKY },
      { points: [[0.05, 0.3], [0.95, 0.3]], label: "MC = ATC", color: ROSE },
    ],
    points: [{ at: [0.3, 0.6], label: "Pm" }],
    shade: [[0.3, 0.6], [0.6, 0.3], [0.3, 0.3]],
    extra: text(0.36, 0.38, "DWL", SKY),
  }),
  externality: graph({
    x: "Quantity",
    y: "Price",
    curves: [
      { points: [[0.1, 0.9], [0.9, 0.1]], label: "D = MSB" },
      { points: [[0.1, 0.1], [0.9, 0.8]], label: "S = MPC", color: ROSE },
      { points: [[0.1, 0.3], [0.85, 0.95]], label: "MSC", color: AMBER, dash: true },
    ],
    points: [{ at: meet([[0.1, 0.9], [0.9, 0.1]], [[0.1, 0.1], [0.9, 0.8]]), label: "market" }, { at: meet([[0.1, 0.9], [0.9, 0.1]], [[0.1, 0.3], [0.85, 0.95]]), label: "efficient" }],
  }),
};

for (const course of ["ap-macroeconomics", "ap-microeconomics"]) {
  const out = path.join(process.cwd(), "content", "courses", course, "assets", "lessons");
  mkdirSync(out, { recursive: true });
  for (const [name, svg] of Object.entries(figures)) writeFileSync(path.join(out, `${name}.svg`), svg);
}
console.log(`Wrote ${Object.keys(figures).length} economics figures for 2 courses.`);
