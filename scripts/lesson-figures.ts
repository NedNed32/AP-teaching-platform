/**
 * Draws the graphs used in AP Calculus AB lessons as SVG files in
 * content/courses/ap-calculus-ab/assets/lessons/. Run with `npm run lessons:figures`.
 * Lessons reference them with <Figure src="assets/lessons/<name>.svg" alt="…" />.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { slopeFieldSvg } from "./exams/lib";

const OUT = path.join(process.cwd(), "content", "courses", "ap-calculus-ab", "assets", "lessons");
mkdirSync(OUT, { recursive: true });

interface Win {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  width?: number;
}

type Item =
  | { kind: "curve"; f: (x: number) => number; from: number; to: number; color?: string; dash?: boolean; label?: string; labelAt?: number }
  | { kind: "point"; x: number; y: number; open?: boolean; color?: string }
  | { kind: "vline"; x: number; dash?: boolean; color?: string }
  | { kind: "hline"; y: number; dash?: boolean; color?: string }
  | { kind: "segment"; x1: number; y1: number; x2: number; y2: number; color?: string; dash?: boolean }
  | { kind: "fill"; top: (x: number) => number; bottom: (x: number) => number; from: number; to: number; color?: string }
  | { kind: "rect"; x: number; w: number; h: number; color?: string }
  | { kind: "text"; x: number; y: number; text: string; color?: string };

const TEAL = "#0f766e";
const ROSE = "#be123c";
const SKY = "#0369a1";

function plot(win: Win, items: Item[]): string {
  const width = win.width ?? 520;
  const unit = width / (win.xMax - win.xMin + 1);
  const height = unit * (win.yMax - win.yMin + 1);
  const pad = unit / 2;
  const X = (x: number) => pad + (x - win.xMin) * unit;
  const Y = (y: number) => pad + (win.yMax - y) * unit;
  const fs = Math.max(11, Math.min(14, unit * 0.4));
  const p: string[] = [];
  for (let x = win.xMin; x <= win.xMax; x++) p.push(`<line x1="${X(x)}" y1="${Y(win.yMin)}" x2="${X(x)}" y2="${Y(win.yMax)}" stroke="#e2e8f0"/>`);
  for (let y = win.yMin; y <= win.yMax; y++) p.push(`<line x1="${X(win.xMin)}" y1="${Y(y)}" x2="${X(win.xMax)}" y2="${Y(y)}" stroke="#e2e8f0"/>`);
  if (win.yMin <= 0 && win.yMax >= 0) p.push(`<line x1="${X(win.xMin)}" y1="${Y(0)}" x2="${X(win.xMax)}" y2="${Y(0)}" stroke="#334155" stroke-width="1.5"/>`);
  if (win.xMin <= 0 && win.xMax >= 0) p.push(`<line x1="${X(0)}" y1="${Y(win.yMin)}" x2="${X(0)}" y2="${Y(win.yMax)}" stroke="#334155" stroke-width="1.5"/>`);
  for (let x = win.xMin; x <= win.xMax; x++) if (x) p.push(`<text x="${X(x)}" y="${Y(0) + fs + 2}" font-size="${fs}" text-anchor="middle" fill="#475569">${x}</text>`);
  for (let y = win.yMin; y <= win.yMax; y++) if (y) p.push(`<text x="${X(0) - 5}" y="${Y(y) + fs / 3}" font-size="${fs}" text-anchor="end" fill="#475569">${y}</text>`);
  const clampY = (y: number) => Math.max(win.yMin - 0.5, Math.min(win.yMax + 0.5, y));
  for (const it of items) {
    const color = ("color" in it && it.color) || TEAL;
    switch (it.kind) {
      case "fill": {
        const n = 120;
        const top: string[] = [];
        const bottom: string[] = [];
        for (let i = 0; i <= n; i++) {
          const x = it.from + ((it.to - it.from) * i) / n;
          top.push(`${X(x).toFixed(1)},${Y(clampY(it.top(x))).toFixed(1)}`);
          bottom.unshift(`${X(x).toFixed(1)},${Y(clampY(it.bottom(x))).toFixed(1)}`);
        }
        p.push(`<polygon points="${[...top, ...bottom].join(" ")}" fill="${color}" fill-opacity="0.18" stroke="none"/>`);
        break;
      }
      case "rect":
        p.push(`<rect x="${X(it.x)}" y="${Math.min(Y(it.h), Y(0))}" width="${it.w * unit}" height="${Math.abs(it.h) * unit}" fill="${it.color ?? SKY}" fill-opacity="0.18" stroke="${it.color ?? SKY}" stroke-width="1.5"/>`);
        break;
      case "curve": {
        const n = 300;
        let d = "";
        let pen = false;
        for (let i = 0; i <= n; i++) {
          const x = it.from + ((it.to - it.from) * i) / n;
          const y = it.f(x);
          if (!Number.isFinite(y) || y > win.yMax + 0.5 || y < win.yMin - 0.5) {
            pen = false;
            continue;
          }
          d += `${pen ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)} `;
          pen = true;
        }
        p.push(`<path d="${d}" fill="none" stroke="${color}" stroke-width="3" ${it.dash ? 'stroke-dasharray="7 5"' : ""} stroke-linejoin="round" stroke-linecap="round"/>`);
        if (it.label) {
          const lx = it.labelAt ?? it.to - (it.to - it.from) * 0.1;
          p.push(`<text x="${X(lx) + 6}" y="${Y(clampY(it.f(lx))) - 8}" font-size="${fs + 2}" font-style="italic" fill="${color}">${it.label}</text>`);
        }
        break;
      }
      case "point":
        p.push(`<circle cx="${X(it.x)}" cy="${Y(it.y)}" r="5" fill="${it.open ? "#ffffff" : color}" stroke="${color}" stroke-width="2.5"/>`);
        break;
      case "vline":
        p.push(`<line x1="${X(it.x)}" y1="${Y(win.yMin)}" x2="${X(it.x)}" y2="${Y(win.yMax)}" stroke="${it.color ?? ROSE}" stroke-width="2" ${it.dash !== false ? 'stroke-dasharray="7 5"' : ""}/>`);
        break;
      case "hline":
        p.push(`<line x1="${X(win.xMin)}" y1="${Y(it.y)}" x2="${X(win.xMax)}" y2="${Y(it.y)}" stroke="${it.color ?? ROSE}" stroke-width="2" ${it.dash !== false ? 'stroke-dasharray="7 5"' : ""}/>`);
        break;
      case "segment":
        p.push(`<line x1="${X(it.x1)}" y1="${Y(it.y1)}" x2="${X(it.x2)}" y2="${Y(it.y2)}" stroke="${color}" stroke-width="2.5" ${it.dash ? 'stroke-dasharray="7 5"' : ""}/>`);
        break;
      case "text":
        p.push(`<text x="${X(it.x)}" y="${Y(it.y)}" font-size="${fs + 1}" fill="${it.color ?? "#0f172a"}">${it.text}</text>`);
        break;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(1)} ${height.toFixed(1)}" width="${width.toFixed(0)}" height="${height.toFixed(0)}" font-family="Arial, Helvetica, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/>${p.join("")}</svg>\n`;
}

const figures: Record<string, string> = {
  // 1.3: hole at x = -2, jump at x = 1, value at x = 3 different from limit.
  "limits-from-graph": plot({ xMin: -4, xMax: 5, yMin: -2, yMax: 5 }, [
    { kind: "curve", f: (x) => 0.5 * x + 3, from: -4, to: 1 },
    { kind: "point", x: -2, y: 2, open: true },
    { kind: "point", x: 1, y: 3.5, open: true },
    { kind: "curve", f: (x) => -((x - 3) ** 2) / 2 + 3, from: 1, to: 5 },
    { kind: "point", x: 1, y: 1, open: false },
    { kind: "point", x: 3, y: 3, open: true },
    { kind: "point", x: 3, y: 0, open: false },
  ]),
  // 1.10: removable, jump and infinite discontinuities.
  "discontinuity-types": plot({ xMin: -5, xMax: 6, yMin: -3, yMax: 5 }, [
    { kind: "curve", f: (x) => x + 2, from: -5, to: -1 },
    { kind: "point", x: -3, y: -1, open: true },
    { kind: "point", x: -3, y: 2 },
    { kind: "curve", f: () => 3, from: -1, to: 1 },
    { kind: "point", x: -1, y: 1 },
    { kind: "point", x: -1, y: 3, open: true },
    { kind: "curve", f: (x) => 1 / (x - 3), from: 1, to: 2.99 },
    { kind: "curve", f: (x) => 1 / (x - 3), from: 3.01, to: 6 },
    { kind: "point", x: 1, y: 3 },
    { kind: "vline", x: 3 },
    { kind: "text", x: -4.6, y: 4.3, text: "removable", color: TEAL },
    { kind: "text", x: -1.6, y: 4.3, text: "jump", color: TEAL },
    { kind: "text", x: 3.3, y: 4.3, text: "infinite", color: ROSE },
  ]),
  // 1.14 / 1.15: rational function with vertical and horizontal asymptotes.
  asymptotes: plot({ xMin: -6, xMax: 6, yMin: -4, yMax: 6 }, [
    { kind: "vline", x: 1 },
    { kind: "hline", y: 2 },
    { kind: "curve", f: (x) => (2 * x + 1) / (x - 1), from: -6, to: 0.97, label: "f" },
    { kind: "curve", f: (x) => (2 * x + 1) / (x - 1), from: 1.03, to: 6 },
  ]),
  // 1.16: IVT.
  ivt: plot({ xMin: -1, xMax: 6, yMin: -3, yMax: 4 }, [
    { kind: "curve", f: (x) => 0.25 * (x - 1) * (x - 2.5) * (x - 4.5) - 1 + x * 0.45, from: 0, to: 5, label: "f" },
    { kind: "hline", y: 1, color: SKY },
    { kind: "point", x: 0, y: -2.1125 },
    { kind: "point", x: 5, y: 2.375 },
  ]),
  // 2.1 / 2.2: secant and tangent lines.
  "secant-tangent": plot({ xMin: -1, xMax: 6, yMin: -1, yMax: 7 }, [
    { kind: "curve", f: (x) => 0.25 * x * x + 0.5, from: -1, to: 5.2, label: "f" },
    { kind: "segment", x1: 0, y1: -0.5, x2: 6, y2: 5.5, color: SKY, dash: true },
    { kind: "segment", x1: 0, y1: -0.5, x2: 5, y2: 7, color: ROSE },
    { kind: "point", x: 2, y: 1.5 },
    { kind: "point", x: 4, y: 4.5 },
    { kind: "text", x: 4.3, y: 6.2, text: "secant", color: ROSE },
    { kind: "text", x: 5.0, y: 3.5, text: "tangent", color: SKY },
  ]),
  // 2.4: corner, cusp and vertical tangent.
  "not-differentiable": plot({ xMin: -6, xMax: 6, yMin: -1, yMax: 4 }, [
    { kind: "curve", f: (x) => Math.abs(x + 4) + 0.5, from: -6, to: -2, label: "corner" , labelAt: -5.8},
    { kind: "curve", f: (x) => Math.abs(x) ** (2 / 3) * 1.2, from: -1.8, to: 1.8, label: "cusp", labelAt: 0.3 },
    { kind: "curve", f: (x) => Math.cbrt(x - 4) * 1.2 + 1.5, from: 2.2, to: 6, label: "vertical tangent", labelAt: 2.2 },
  ]),
  // 5.1: MVT.
  mvt: plot({ xMin: -1, xMax: 6, yMin: -1, yMax: 6 }, [
    { kind: "curve", f: (x) => -0.3 * (x - 3) ** 2 + 4, from: -0.5, to: 5.5, label: "f" },
    { kind: "segment", x1: 0, y1: 1.3, x2: 5, y2: 2.8, color: ROSE },
    { kind: "segment", x1: 0, y1: 3.13, x2: 6, y2: 4.93, color: SKY, dash: true },
    { kind: "point", x: 0, y: 1.3 },
    { kind: "point", x: 5, y: 2.8 },
    { kind: "point", x: 2.75, y: 3.98125 },
    { kind: "text", x: 2.4, y: 4.6, text: "c", color: SKY },
  ]),
  // 5.8 / 5.9: f and f'.
  "f-and-fprime": plot({ xMin: -3, xMax: 4, yMin: -3, yMax: 4 }, [
    { kind: "curve", f: (x) => (x ** 3) / 3 - x * x / 2 - 2 * x + 1, from: -3, to: 4, label: "f", labelAt: 3.2 },
    { kind: "curve", f: (x) => x * x - x - 2, from: -3, to: 4, color: ROSE, dash: true, label: "f′", labelAt: 2.6 },
    { kind: "point", x: -1, y: 0, color: ROSE },
    { kind: "point", x: 2, y: 0, color: ROSE },
  ]),
  // 6.2: left Riemann sum.
  "left-riemann": plot({ xMin: 0, xMax: 6, yMin: 0, yMax: 5 }, [
    ...[0, 1, 2, 3, 4].map((i): Item => ({ kind: "rect", x: i, w: 1, h: 0.15 * i * i + 1 })),
    { kind: "curve", f: (x) => 0.15 * x * x + 1, from: 0, to: 5.3, label: "f" },
  ]),
  // 6.5: accumulation as signed area.
  "signed-area": plot({ xMin: 0, xMax: 7, yMin: -3, yMax: 3 }, [
    { kind: "fill", top: (x) => Math.max(0, 2 * Math.sin(x)), bottom: (x) => Math.min(0, 2 * Math.sin(x)), from: 0, to: 6.28 },
    { kind: "curve", f: (x) => 2 * Math.sin(x), from: 0, to: 6.5, label: "f", labelAt: 1.2 },
    { kind: "text", x: 1.2, y: 0.6, text: "+", color: TEAL },
    { kind: "text", x: 4.5, y: -0.9, text: "−", color: TEAL },
  ]),
  // 7.3: slope field for dy/dx = x - y.
  "slope-field": slopeFieldSvg((x, y) => x - y, { xMin: -3, xMax: 3, yMin: -3, yMax: 3, width: 420 }),
  // 8.4: area between curves.
  "area-between": plot({ xMin: -1, xMax: 4, yMin: -1, yMax: 5 }, [
    { kind: "fill", top: (x) => 2 * x, bottom: (x) => x * x, from: 0, to: 2 },
    { kind: "curve", f: (x) => 2 * x, from: -0.5, to: 2.5, label: "y = 2x", labelAt: 1.6 },
    { kind: "curve", f: (x) => x * x, from: -1, to: 2.2, color: ROSE, label: "y = x²", labelAt: 2.05 },
  ]),
  // 8.9: disc.
  "disc-method": plot({ xMin: -1, xMax: 5, yMin: -3, yMax: 3 }, [
    { kind: "fill", top: (x) => Math.sqrt(x), bottom: (x) => -Math.sqrt(x), from: 0, to: 4 },
    { kind: "curve", f: (x) => Math.sqrt(x), from: 0, to: 4.5, label: "y = √x" },
    { kind: "curve", f: (x) => -Math.sqrt(x), from: 0, to: 4, dash: true },
    { kind: "segment", x1: 2.5, y1: -1.58, x2: 2.5, y2: 1.58, color: ROSE },
    { kind: "text", x: 2.65, y: 0.5, text: "r = √x", color: ROSE },
  ]),
};

// Calculus BC shares every AB figure and adds polar ones.
const bcFigures: Record<string, string> = {
  // 9.8: r = 1 + cos θ (cardioid) with the region for 0 ≤ θ ≤ π/2 shaded.
  "polar-cardioid": (() => {
    const pts = (from: number, to: number) => {
      const out: [number, number][] = [];
      for (let i = 0; i <= 200; i++) {
        const t = from + ((to - from) * i) / 200;
        const r = 1 + Math.cos(t);
        out.push([r * Math.cos(t), r * Math.sin(t)]);
      }
      return out;
    };
    const unit = 90;
    const X = (x: number) => 60 + (x + 0.6) * unit;
    const Y = (y: number) => 30 + (1.6 - y) * unit;
    const path = (p: [number, number][]) => p.map(([x, y], i) => `${i ? "L" : "M"}${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join(" ");
    const shade = [[0, 0] as [number, number], ...pts(0, Math.PI / 2), [0, 0] as [number, number]];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="400" height="320" font-family="Arial, Helvetica, sans-serif"><rect width="100%" height="100%" fill="#ffffff"/><line x1="${X(-0.6)}" y1="${Y(0)}" x2="${X(2.3)}" y2="${Y(0)}" stroke="#334155" stroke-width="1.5"/><line x1="${X(0)}" y1="${Y(1.6)}" x2="${X(0)}" y2="${Y(-1.6)}" stroke="#334155" stroke-width="1.5"/><path d="${path(shade)} Z" fill="#0f766e" fill-opacity="0.18"/><path d="${path(pts(0, 2 * Math.PI))}" fill="none" stroke="#0f766e" stroke-width="3"/><text x="${X(2) + 4}" y="${Y(0) - 6}" font-size="13" fill="#475569">2</text><text x="${X(0.9)}" y="${Y(1.25)}" font-size="15" font-style="italic" fill="#0f766e">r = 1 + cos θ</text></svg>\n`;
  })(),
};
const BC_OUT = path.join(process.cwd(), "content", "courses", "ap-calculus-bc", "assets", "lessons");
mkdirSync(BC_OUT, { recursive: true });
for (const [name, svg] of Object.entries(figures)) {
  writeFileSync(path.join(OUT, `${name}.svg`), svg);
  writeFileSync(path.join(BC_OUT, `${name}.svg`), svg);
}
for (const [name, svg] of Object.entries(bcFigures)) writeFileSync(path.join(BC_OUT, `${name}.svg`), svg);
console.log(`Wrote ${Object.keys(figures).length + Object.keys(bcFigures).length} lesson figures.`);
