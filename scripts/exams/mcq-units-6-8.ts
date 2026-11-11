import { coef, dec, F, Frac, graphSvg, integrate, joinTerms, m, par, poly, polyAtF, roots, shiftBare, signed, slopeFieldSvg, type Rng } from "./lib";
import { correct, Retry, wrong, type McqDraft, type McqTemplate } from "./types";

const t = String.raw;

/** n·π/d as TeX. */
export function piTex(f: Frac): string {
  const n = Math.abs(f.n);
  const sign = f.n < 0 ? "-" : "";
  const top = n === 1 ? t`\pi` : t`${n}\pi`;
  return f.d === 1 ? `${sign}${top}` : t`${sign}\frac{${top}}{${f.d}}`;
}

/** Signed integral of a piecewise-linear function through integer-x points, from a to b. */
export function pwlIntegral(ys: number[], a: number, b: number): Frac {
  let s = F(0);
  const [lo, hi] = a <= b ? [a, b] : [b, a];
  for (let i = lo; i < hi; i++) s = s.add(F(ys[i]! + ys[i + 1]!, 2));
  return a <= b ? s : s.neg();
}

/** Total (unsigned) area between a piecewise-linear graph and the x-axis from a to b. */
export function pwlArea(ys: number[], a: number, b: number): Frac {
  let s = F(0);
  for (let i = a; i < b; i++) {
    const y0 = ys[i]!;
    const y1 = ys[i + 1]!;
    if (y0 * y1 >= 0) s = s.add(F(Math.abs(y0 + y1), 2));
    else s = s.add(F(y0 * y0 + y1 * y1, 2 * (Math.abs(y0) + Math.abs(y1))));
  }
  return s;
}

function pwlStimulus(r: Rng, name = "f") {
  const xs = [0, 1, 2, 3, 4, 5, 6];
  const ys = xs.map(() => r.int(-3, 3));
  return {
    xs,
    ys,
    stimulus: {
      text: `The graph of the function $$${name}$$ shown consists of line segments on $$0 \\leq x \\leq 6$$.`,
      svg: graphSvg(xs.map((x, i) => [x, ys[i]!] as [number, number]), { xMin: 0, xMax: 6, yMin: -3, yMax: 3, label: name }),
      alt: `Graph of ${name}: line segments through the points ${xs.map((x, i) => `(${x}, ${ys[i]})`).join(", ")}.`,
    },
  };
}

const calcIntegrands = [
  { tex: t`\sqrt{1 + x^3}`, f: (x: number) => Math.sqrt(1 + x ** 3), lo: 0, hi: [1, 2, 3] },
  { tex: t`\sin(x^2)`, f: (x: number) => Math.sin(x * x), lo: 0, hi: [1, 1.5, 2] },
  { tex: t`e^{-x^2}`, f: (x: number) => Math.exp(-x * x), lo: 0, hi: [1, 2] },
  { tex: t`\ln(1 + x^2)`, f: (x: number) => Math.log(1 + x * x), lo: 0, hi: [1, 2, 3] },
  { tex: t`\frac{x}{1 + \cos^2 x}`, f: (x: number) => x / (1 + Math.cos(x) ** 2), lo: 0, hi: [1, 2, 3] },
];

// ---------------------------------------------------------------------------
// Unit 6: Integration and Accumulation of Change
// ---------------------------------------------------------------------------

export const unit6: McqTemplate[] = [
  {
    key: "u6-riemann-table",
    unit: 6,
    topics: ["riemann-sums", "exploring-accumulation"],
    skills: ["1", "2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const ts = [0, 2, 3, 7, 10];
      const vs = ts.map(() => r.int(1, 15));
      const widths = ts.slice(1).map((x, i) => x - ts[i]!);
      const left = widths.reduce((s, w, i) => s + w * vs[i]!, 0);
      const right = widths.reduce((s, w, i) => s + w * vs[i + 1]!, 0);
      const trap = widths.reduce((s, w, i) => s.add(F(w * (vs[i]! + vs[i + 1]!), 2)), F(0));
      const kind = r.pick(["left", "right", "trap"] as const);
      const naive = F(vs.slice(0, 4).reduce((a, b) => a + b, 0) * 2);
      const all = { left: F(left), right: F(right), trap };
      const ans = all[kind];
      const others = (["left", "right", "trap"] as const).filter((k) => k !== kind).map((k) => all[k]);
      const w = [...others, naive];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      const label = { left: "a left Riemann sum", right: "a right Riemann sum", trap: "a trapezoidal sum" }[kind];
      const names = ["left Riemann sum", "right Riemann sum", "trapezoidal sum"].filter((_, i) => ["left", "right", "trap"][i] !== kind);
      return {
        stimulus: {
          text: "Water flows into a tank at a rate of $$R(t)$$ gallons per minute, where $$R$$ is a continuous function of time $$t$$ in minutes. Selected values are shown.",
          table: { caption: "Rate of flow R(t)", columns: [{ key: "t", label: "$$t$$ (minutes)" }, { key: "r", label: "$$R(t)$$ (gallons per minute)" }], rows: ts.map((x, i) => ({ t: x, r: vs[i]! })) },
        },
        stem: `Using ${label} with the four subintervals indicated by the table, what is the approximation of ${m(t`\int_0^{10} R(t)\,dt`)}?`,
        correct: correct(m(ans), "Multiply each subinterval's width by the appropriate height and add."),
        wrong: [
          wrong(m(w[0]!), `This is the ${names[0]}.`),
          wrong(m(w[1]!), `This is the ${names[1]}.`),
          wrong(m(w[2]!), "This treats every subinterval as width 2, but the subintervals have unequal widths."),
        ],
        explanation: `The widths are ${widths.join(", ")}. ${kind === "trap" ? "Average the endpoint heights on each subinterval" : kind === "left" ? "Use the left endpoint of each subinterval" : "Use the right endpoint of each subinterval"}, multiply by the width and add: $$${ans.tex()}$$ gallons.`,
      };
    },
  },
  {
    key: "u6-poly-integral",
    unit: 6,
    topics: ["ftc-definite-integrals", "antiderivatives-basic-rules"],
    skills: ["1"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const c = [3 * r.nz(-2, 2), 2 * r.int(-3, 3), r.int(-5, 5)];
      const a = r.int(-1, 1);
      const b = a + r.int(1, 3);
      const anti = [F(c[0]!, 3), F(c[1]!, 2), F(c[2]!), F(0)];
      const ans = polyAtF(anti, b).sub(polyAtF(anti, a));
      const fb = polyAtF(c, b).sub(polyAtF(c, a));
      const w = [polyAtF(anti, b), fb, polyAtF(anti, b).add(polyAtF(anti, a))];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `What is ${m(t`\int_{${a}}^{${b}} \left(${poly(c)}\right)dx`)}?`,
        correct: correct(m(ans), t`An antiderivative is ${m(t`F(x) = ${poly(anti)}`)}; ${m(t`F(${b}) - F(${a}) = ${ans.tex()}`)}.`),
        wrong: [
          wrong(m(w[0]!), "This is F(b) only; subtract F(a) as well."),
          wrong(m(w[1]!), "This subtracts values of the integrand instead of an antiderivative."),
          wrong(m(w[2]!), "This adds F(a) instead of subtracting it."),
        ],
        explanation: t`By the Fundamental Theorem of Calculus, ${m(t`\int_{${a}}^{${b}} f(x)\,dx = F(${b}) - F(${a})`)} with ${m(t`F(x) = ${poly(anti)}`)}. That is ${m(t`${polyAtF(anti, b).tex()} - (${polyAtF(anti, a).tex()}) = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u6-ftc-chain",
    unit: 6,
    topics: ["ftc-accumulation-functions"],
    skills: ["1", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const fs = [
        { f: (u: string) => t`\cos(${u})` },
        { f: (u: string) => t`\sqrt{1 + ${u}}` },
        { f: (u: string) => t`e^{${u}}` },
        { f: (u: string) => t`\ln(1 + ${u})` },
      ];
      const o = r.pick(fs);
      const n = r.int(2, 3);
      const c = r.int(1, 3);
      const up = `x^{${n}}`;
      return {
        stem: `If ${m(t`G(x) = \int_{${c}}^{${up}} ${o.f("t")}\,dt`)}, then ${m(t`G'(x) =`)}`,
        correct: correct(m(t`${n}x^{${n - 1}}${o.f(up)}`), "By the Fundamental Theorem of Calculus with the chain rule, substitute the upper limit and multiply by its derivative."),
        wrong: [
          wrong(m(o.f(up)), t`This leaves out the derivative of the upper limit, ${m(t`${n}x^{${n - 1}}`)}.`),
          wrong(m(t`${n}x^{${n - 1}}${o.f("x")}`), "The integrand must be evaluated at the upper limit, not at x."),
          wrong(m(t`${o.f(up)} - ${o.f(String(c))}`), "This evaluates the integrand at both limits; the derivative of an accumulation function only uses the variable limit."),
        ],
        explanation: t`If ${m(t`G(x) = \int_{${c}}^{u(x)} f(t)\,dt`)}, then ${m(t`G'(x) = f(u(x))\,u'(x)`)}. Here ${m(t`u = ${up}`)}, so ${m(t`G'(x) = ${n}x^{${n - 1}}${o.f(up)}`)}.`,
      };
    },
  },
  {
    key: "u6-properties",
    unit: 6,
    topics: ["properties-of-definite-integrals"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.int(1, 4);
      const b = a + r.int(1, 4);
      const A = r.int(-6, 9);
      const B = r.int(-6, 12);
      const k = r.nz(-3, 4);
      const c = r.nz(-3, 5);
      const ans = k * (B - A) + c * (b - a);
      const vals = [ans, k * (B - A) + c, k * (B + A) + c * (b - a), B - A + c * (b - a)];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `If ${m(t`\int_0^{${a}} f(x)\,dx = ${A}`)} and ${m(t`\int_0^{${b}} f(x)\,dx = ${B}`)}, what is ${m(t`\int_{${a}}^{${b}} \left(${coef(k, "f(x)")} ${signed(c)}\right)dx`)}?`,
        correct: correct(m(ans), t`${m(t`\int_{${a}}^{${b}} f = ${B} - (${A}) = ${B - A}`)}, so the integral is ${m(t`${k}(${B - A}) + ${par(c)}(${b - a})`)}.`),
        wrong: [
          wrong(m(vals[1]!), t`The integral of the constant ${m(c)} over an interval of length ${m(b - a)} is ${m(c * (b - a))}, not ${m(c)}.`),
          wrong(m(vals[2]!), "This adds the two given integrals; the integral from a to b is their difference."),
          wrong(m(vals[3]!), t`This forgets to multiply the integral of ${m("f")} by ${m(k)}.`),
        ],
        explanation: t`${m(t`\int_{${a}}^{${b}} f(x)\,dx = \int_0^{${b}} f - \int_0^{${a}} f = ${B - A}`)}. By linearity, the requested integral is ${m(t`${k} \cdot ${par(B - A)} + ${par(c)} \cdot ${b - a} = ${ans}`)}.`,
      };
    },
  },
  {
    key: "u6-antiderivative",
    unit: 6,
    topics: ["antiderivatives-basic-rules"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const n = r.int(2, 5);
      const a = (n + 1) * r.int(1, 3);
      const b = r.nz(-5, 5);
      const k = r.int(2, 6);
      const A = a / (n + 1);
      const s = (x: string) => joinTerms(x.split("|")) + " + C";
      return {
        stem: `${m(t`\int \left(${a}x^{${n}} ${signed(b)}\cdot\frac{1}{x} + ${k}e^{x}\right)dx =`)}`,
        correct: correct(m(s(`${coef(A, `x^{${n + 1}}`)}|${coef(b, t`\ln|x|`)}|${k}e^{x}`)), "Raise the power by one and divide by the new power; the antiderivative of 1/x is ln|x|; e^x is its own antiderivative."),
        wrong: [
          wrong(m(s(`${coef(a * n, `x^{${n - 1}}`)}|${coef(-b, "x^{-2}")}|${k}e^{x}`)), "This differentiates instead of antidifferentiating."),
          wrong(m(s(`${coef(A, `x^{${n + 1}}`)}|${coef(-b, "x^{-2}")}|${k}e^{x}`)), "The antiderivative of 1/x is ln|x|, not a power of x."),
          wrong(m(s(`${coef(a, `x^{${n + 1}}`)}|${coef(b, t`\ln|x|`)}|${k}e^{x}`)), "After raising the power, divide by the new exponent."),
        ],
        explanation: t`Term by term: ${m(t`\int ${a}x^{${n}}dx = ${coef(A, `x^{${n + 1}}`)}`)}, ${m(t`\int \frac{${b}}{x}dx = ${coef(b, t`\ln|x|`)}`)}, and ${m(t`\int ${k}e^x dx = ${k}e^x`)}. Add the constant of integration.`,
      };
    },
  },
  {
    key: "u6-u-sub",
    unit: 6,
    topics: ["u-substitution"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const c = r.int(1, 2);
      const n = r.int(1, 3);
      const top = (1 + c) ** (n + 1) - c ** (n + 1);
      const ans = F(top, 2 * (n + 1));
      const w = [F(top, n + 1), F((1 + c) ** (n + 1), 2 * (n + 1)), F(1, 2 * (n + 1))];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `What is ${m(t`\int_0^{1} x\left(x^2 + ${c}\right)${n === 1 ? "" : `^{${n}}`}dx`)}?`,
        correct: correct(m(ans), t`With ${m(t`u = x^2 + ${c}`)}, ${m(t`du = 2x\,dx`)}, the integral is ${m(t`\frac{1}{2}\int_{${c}}^{${1 + c}} ${n === 1 ? "u" : `u^{${n}}`}\,du`)}.`),
        wrong: [
          wrong(m(w[0]!), t`This forgets the factor ${m(t`\frac{1}{2}`)} from ${m(t`du = 2x\,dx`)}.`),
          wrong(m(w[1]!), "This evaluates only at the upper limit."),
          wrong(m(w[2]!), "After substituting, the limits must change to u-values (from c to 1 + c), not stay 0 to 1."),
        ],
        explanation: t`${m(t`\frac{1}{2}\int_{${c}}^{${1 + c}} ${n === 1 ? "u" : `u^{${n}}`}\,du = \frac{1}{2} \cdot \frac{u^{${n + 1}}}{${n + 1}}\Big|_{${c}}^{${1 + c}} = \frac{${(1 + c) ** (n + 1)} - ${c ** (n + 1)}}{${2 * (n + 1)}} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u6-trig-ln-integral",
    unit: 6,
    topics: ["u-substitution", "ftc-definite-integrals"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const k = r.int(2, 6);
      if (r.next() < 0.5) {
        return {
          stem: `What is ${m(t`\int_0^{\pi/${k}} \sin(${k}x)\,dx`)}?`,
          correct: correct(m(F(2, k)), t`${m(t`-\frac{1}{${k}}\cos(${k}x)\Big|_0^{\pi/${k}} = -\frac{1}{${k}}(-1 - 1) = \frac{2}{${k}}`)}.`),
          wrong: [
            wrong(m(2), t`This forgets the factor ${m(t`\frac{1}{${k}}`)} from the inner function.`),
            wrong(m(0), "This makes a sign error in the cosine values; the region is entirely above the axis, so the integral is positive."),
            wrong(m(F(-2, k)), t`The antiderivative of ${m(t`\sin u`)} is ${m(t`-\cos u`)}; this drops the negative sign.`),
          ],
          explanation: t`${m(t`\int \sin(${k}x)\,dx = -\frac{1}{${k}}\cos(${k}x) + C`)}. Evaluating: ${m(t`-\frac{1}{${k}}\left[\cos\pi - \cos 0\right] = \frac{2}{${k}}`)}.`,
        };
      }
      const a = r.int(1, 3);
      const b = a * (k - 1);
      return {
        stem: `What is ${m(t`\int_0^{${b}} \frac{1}{x + ${a}}\,dx`)}?`,
        correct: correct(m(t`\ln ${k}`), t`${m(t`\ln|x + ${a}|\Big|_0^{${b}} = \ln ${a + b} - \ln ${a} = \ln ${k}`)}.`),
        wrong: [
          wrong(m(t`\ln ${a + b}`), "This forgets to subtract the value at the lower limit."),
          wrong(m(F(1, a).sub(F(1, a + b))), "This uses a power-rule-style antiderivative; the antiderivative of 1/u is ln|u|."),
          wrong(m(k - 1), "This is the ratio minus one, not a logarithm."),
        ],
        explanation: t`${m(t`\int \frac{dx}{x + ${a}} = \ln|x + ${a}| + C`)}, so the integral is ${m(t`\ln\frac{${a + b}}{${a}} = \ln ${k}`)}.`,
      };
    },
  },
  {
    key: "u6-division-square",
    unit: 6,
    topics: ["long-division-completing-square", "selecting-antidifferentiation-techniques"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const b = r.nz(-4, 4);
      if (r.next() < 0.5) {
        const c = b * b + 1;
        return {
          stem: `${m(t`\int \frac{1}{${poly([1, 2 * b, c])}}\,dx =`)}`,
          correct: correct(m(t`\arctan(${shiftBare("x", -b)}) + C`), t`Completing the square: ${m(t`${poly([1, 2 * b, c])} = (${shiftBare("x", -b)})^2 + 1`)}.`),
          wrong: [
            wrong(m(t`\ln|${poly([1, 2 * b, c])}| + C`), "The numerator is not the derivative of the denominator, so this is not a logarithm."),
            wrong(m(t`\arctan(${shiftBare("x", b)}) + C`), "Sign error when completing the square."),
            wrong(m(t`\frac{1}{${2 * b === 0 ? "" : ""}2x ${signed(2 * b)}} + C`), "This divides by the derivative of the denominator, which is not a valid antiderivative."),
          ],
          explanation: t`${m(t`x^2 ${signed(2 * b)}x + ${c} = (${shiftBare("x", -b)})^2 + 1`)}, and ${m(t`\int \frac{du}{u^2 + 1} = \arctan u + C`)}.`,
        };
      }
      const a = r.nz(-6, 6);
      const k = r.int(2, 5);
      return {
        stem: `${m(t`\int \frac{${poly([k, 0, a])}}{x}\,dx =`)}`,
        correct: correct(m(t`${coef(F(k, 2), "x^2")} ${signed(a)}\ln|x| + C`), t`Divide first: ${m(t`\frac{${poly([k, 0, a])}}{x} = ${k}x + \frac{${a}}{x}`)}.`),
        wrong: [
          wrong(m(t`\frac{${coef(F(k, 3), "x^3")} ${signed(a)}x}{\frac{1}{2}x^2} + C`), "You cannot integrate a quotient by integrating the top and bottom separately."),
          wrong(m(t`${k}x^2 ${signed(a)}\ln|x| + C`), t`The antiderivative of ${m(t`${k}x`)} is ${m(t`\frac{${k}}{2}x^2`)}.`),
          wrong(m(t`${coef(F(k, 2), "x^2")} ${signed(-a)}x^{-2} + C`), t`The antiderivative of ${m(t`\frac{1}{x}`)} is ${m(t`\ln|x|`)}.`),
        ],
        explanation: t`${m(t`\int \left(${k}x + \frac{${a}}{x}\right)dx = ${coef(F(k, 2), "x^2")} ${signed(a)}\ln|x| + C`)}.`,
      };
    },
  },
  {
    key: "u6-graph-integral",
    unit: 6,
    topics: ["accumulation-functions-behavior", "ftc-accumulation-functions", "properties-of-definite-integrals"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const { ys, stimulus } = pwlStimulus(r);
      const a = r.int(0, 2);
      const b = a + r.int(3, 6 - a);
      if (b > 6) throw new Retry();
      const ans = pwlIntegral(ys, a, b);
      const area = pwlArea(ys, a, b);
      if (r.next() < 0.5) {
        const w = [area, ans.neg(), F(ys[b]! - ys[a]!)];
        if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
        return {
          stimulus,
          stem: `What is the value of ${m(t`\int_{${a}}^{${b}} f(x)\,dx`)}?`,
          correct: correct(m(ans), "Add the areas above the x-axis and subtract the areas below it."),
          wrong: [
            wrong(m(w[0]!), "This is the total area, treating regions below the axis as positive."),
            wrong(m(w[1]!), "Sign error: regions above the axis count positive."),
            wrong(m(w[2]!), "This is f(b) − f(a), the change in f, not the integral of f."),
          ],
          explanation: `Split $$[${a}, ${b}]$$ into unit intervals and add the signed areas of the trapezoids and triangles: the result is $$${ans.tex()}$$.`,
        };
      }
      const g = (x: number) => pwlIntegral(ys, 0, x);
      const k = r.int(2, 6);
      const gk = g(k);
      const w = [F(ys[k]!), pwlArea(ys, 0, k), gk.neg()];
      if (w.some((x) => x.equals(gk)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stimulus,
        stem: `Let ${m(t`g(x) = \int_0^{x} f(t)\,dt`)}. What is ${m(t`g(${k})`)}?`,
        correct: correct(m(gk), t`${m(t`g(${k})`)} is the signed area from 0 to ${m(k)}.`),
        wrong: [
          wrong(m(w[0]!), t`This is ${m(t`f(${k}) = g'(${k})`)}, not ${m(t`g(${k})`)}.`),
          wrong(m(w[1]!), "This counts area below the axis as positive."),
          wrong(m(w[2]!), "Sign error: area above the axis counts positive."),
        ],
        explanation: `$$g(${k}) = \\int_0^{${k}} f(t)\\,dt$$, the area above the axis minus the area below it on $$[0, ${k}]$$, which is $$${gk.tex()}$$.`,
      };
    },
  },
  {
    key: "u6-numeric-integral-calc",
    unit: 6,
    topics: ["summation-and-definite-integrals", "ftc-definite-integrals"],
    skills: ["1"],
    difficulty: 2,
    calc: true,
    gen(r) {
      const o = r.pick(calcIntegrands);
      const b = r.pick(o.hi);
      const ans = integrate(o.f, o.lo, b);
      const vals = [ans, o.f(b) - o.f(o.lo), o.f(b) * b, integrate(o.f, o.lo, b / 2)];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `What is the value of ${m(t`\int_{${o.lo}}^{${b}} ${o.tex}\,dx`)}?`,
        correct: correct(m(dec(ans)), "Use the calculator's numerical integration."),
        wrong: [
          wrong(m(dec(vals[1]!)), "This is the change in the integrand, not the integral."),
          wrong(m(dec(vals[2]!)), "This is a single rectangle using the right endpoint, a rough estimate rather than the integral."),
          wrong(m(dec(vals[3]!)), "This integrates over only half of the interval."),
        ],
        explanation: t`On a graphing calculator, ${m(t`\int_{${o.lo}}^{${b}} ${o.tex}\,dx \approx ${dec(ans)}`)}.`,
      };
    },
  },
  {
    key: "u6-accumulation-calc",
    unit: 6,
    topics: ["exploring-accumulation", "ftc-definite-integrals"],
    skills: ["1", "4"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const A = r.int(50, 300);
      const p = r.int(10, 30);
      const q = r.int(3, 9);
      const R = (x: number) => p + 4 * Math.sin(x / q) * Math.sqrt(x + 1);
      const T = r.int(4, 12);
      const amt = integrate(R, 0, T);
      const vals = [A + amt, amt, A + R(T), A + R(T) * T];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `Sand is added to a pile at a rate modeled by ${m(t`R(t) = ${p} + 4\sin\left(\frac{t}{${q}}\right)\sqrt{t + 1}`)} cubic feet per hour, for ${m(t`0 \leq t \leq ${T}`)}. At time ${m("t = 0")} the pile contains ${A} cubic feet of sand. How much sand is in the pile at ${m(t`t = ${T}`)}?`,
        correct: correct(m(dec(vals[0]!)), t`${m(t`${A} + \int_0^{${T}} R(t)\,dt`)}.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This is only the sand added; include the initial amount."),
          wrong(m(dec(vals[2]!)), "This adds the rate at one instant, not the accumulated amount."),
          wrong(m(dec(vals[3]!)), "This assumes the rate stays at R(T) for the whole time."),
        ],
        explanation: t`Amount = initial amount + accumulated change = ${m(t`${A} + \int_0^{${T}} R(t)\,dt \approx ${A} + ${dec(amt)} = ${dec(vals[0]!)}`)} cubic feet.`,
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 7: Differential Equations
// ---------------------------------------------------------------------------

const slopeFields: { tex: string; f: (x: number, y: number) => number }[] = [
  { tex: "x", f: (x) => x },
  { tex: "y", f: (_x, y) => y },
  { tex: "x + y", f: (x, y) => x + y },
  { tex: "x - y", f: (x, y) => x - y },
  { tex: "y - x", f: (x, y) => y - x },
  { tex: "xy", f: (x, y) => x * y },
  { tex: "-y", f: (_x, y) => -y },
  { tex: "x^2", f: (x) => x * x },
  { tex: "1 - y", f: (_x, y) => 1 - y },
  { tex: "-x", f: (x) => -x },
];

export const unit7: McqTemplate[] = [
  {
    key: "u7-separable",
    unit: 7,
    topics: ["separation-of-variables", "particular-solutions"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(2, 6);
      const kind = r.pick(["exp", "x-over-y", "2xy"] as const);
      if (kind === "exp") {
        const k = r.nz(-3, 3);
        return {
          stem: `Which of the following is the solution to the differential equation ${m(t`\frac{dy}{dx} = ${coef(k, "y")}`)} with initial condition ${m(t`y(0) = ${a}`)}?`,
          correct: correct(m(t`y = ${a}e^{${coef(k, "x")}}`), t`Separating, ${m(t`\ln|y| = ${coef(k, "x")} + C`)}, so ${m(t`y = Ce^{${coef(k, "x")}}`)} and ${m(t`C = ${a}`)}.`),
          wrong: [
            wrong(m(t`y = e^{${coef(k, "x")}} + ${a - 1}`), "The constant multiplies the exponential; it is not added."),
            wrong(m(t`y = ${a}e^{x}`), t`The exponent must include the growth constant ${m(k)}.`),
            wrong(m(t`y = e^{${coef(k, "x")} + ${a}}`), t`At ${m("x = 0")} this gives ${m(t`e^{${a}}`)}, not ${m(a)}.`),
          ],
          explanation: t`${m(t`\frac{dy}{y} = ${k}\,dx`)}, so ${m(t`\ln|y| = ${coef(k, "x")} + C`)} and ${m(t`y = Ae^{${coef(k, "x")}}`)}. The initial condition gives ${m(t`A = ${a}`)}.`,
        };
      }
      if (kind === "x-over-y") {
        return {
          stem: `Which of the following is the solution to ${m(t`\frac{dy}{dx} = \frac{x}{y}`)} with ${m(t`y(0) = ${a}`)}?`,
          correct: correct(m(t`y = \sqrt{x^2 + ${a * a}}`), t`${m(t`y\,dy = x\,dx`)} gives ${m(t`y^2 = x^2 + C`)}; ${m(t`C = ${a * a}`)}, and the positive root matches ${m(t`y(0) = ${a}`)}.`),
          wrong: [
            wrong(m(t`y = x + ${a}`), "This would have dy/dx = 1, which is not x/y."),
            wrong(m(t`y = \sqrt{x^2 + ${a}}`), t`At ${m("x = 0")} this gives ${m(t`\sqrt{${a}}`)}, not ${m(a)}: the constant must be ${m(t`${a}^2`)}.`),
            wrong(m(t`y = -\sqrt{x^2 + ${a * a}}`), "The initial value is positive, so the positive root is needed."),
          ],
          explanation: t`Separate: ${m(t`\int y\,dy = \int x\,dx`)}, so ${m(t`\frac{y^2}{2} = \frac{x^2}{2} + C`)}. With ${m(t`y(0) = ${a}`)}, ${m(t`y^2 = x^2 + ${a * a}`)} and ${m(t`y = \sqrt{x^2 + ${a * a}}`)}.`,
        };
      }
      return {
        stem: `Which of the following is the solution to ${m(t`\frac{dy}{dx} = 2xy`)} with ${m(t`y(0) = ${a}`)}?`,
        correct: correct(m(t`y = ${a}e^{x^2}`), t`${m(t`\frac{dy}{y} = 2x\,dx`)} gives ${m(t`\ln|y| = x^2 + C`)}.`),
        wrong: [
          wrong(m(t`y = e^{x^2} + ${a - 1}`), "The constant multiplies the exponential; it is not added."),
          wrong(m(t`y = ${a}e^{2x}`), t`The antiderivative of ${m("2x")} is ${m("x^2")}, not ${m("2x")}.`),
          wrong(m(t`y = x^2 + ${a}`), "This would satisfy dy/dx = 2x, not 2xy."),
        ],
        explanation: t`${m(t`\int \frac{dy}{y} = \int 2x\,dx`)}, so ${m(t`\ln|y| = x^2 + C`)} and ${m(t`y = Ae^{x^2}`)}. ${m(t`y(0) = ${a}`)} gives ${m(t`A = ${a}`)}.`,
      };
    },
  },
  {
    key: "u7-verify",
    unit: 7,
    topics: ["verifying-solutions", "modeling-with-differential-equations"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const k = r.int(2, 5);
      if (r.next() < 0.5) {
        return {
          stem: `Which of the following functions is a solution to the differential equation ${m(t`y'' + ${k * k}y = 0`)}?`,
          correct: correct(m(t`y = \sin(${k}x)`), t`${m(t`y'' = -${k * k}\sin(${k}x)`)}, so ${m(t`y'' + ${k * k}y = 0`)}.`),
          wrong: [
            wrong(m(t`y = e^{${k}x}`), t`${m(t`y'' = ${k * k}e^{${k}x}`)}, so ${m(t`y'' + ${k * k}y = ${2 * k * k}e^{${k}x} \neq 0`)}.`),
            wrong(m(t`y = \sin x`), t`${m(t`y'' + ${k * k}y = ${k * k - 1}\sin x \neq 0`)}.`),
            wrong(m(t`y = ${k}x^2`), t`${m(t`y'' = ${2 * k}`)}, which does not cancel ${m(t`${k * k}y`)}.`),
          ],
          explanation: t`Substitute each candidate. For ${m(t`y = \sin(${k}x)`)}: ${m(t`y' = ${k}\cos(${k}x)`)}, ${m(t`y'' = -${k * k}\sin(${k}x) = -${k * k}y`)}.`,
        };
      }
      return {
        stem: `Which of the following functions is a solution to the differential equation ${m(t`\frac{dy}{dx} = ${k}y`)}?`,
        correct: correct(m(t`y = 7e^{${k}x}`), t`${m(t`y' = ${7 * k}e^{${k}x} = ${k}y`)}.`),
        wrong: [
          wrong(m(t`y = e^{${k}x} + 7`), t`${m(t`y' = ${k}e^{${k}x}`)}, but ${m(t`${k}y = ${k}e^{${k}x} + ${7 * k}`)}.`),
          wrong(m(t`y = ${k}x^2`), t`${m(t`y' = ${2 * k}x`)}, which is not ${m(t`${k}y`)}.`),
          wrong(m(t`y = e^{x/${k}}`), t`${m(t`y' = \frac{1}{${k}}y`)}, not ${m(t`${k}y`)}.`),
        ],
        explanation: t`Substitute each candidate into ${m(t`y' = ${k}y`)}. Only a constant multiple of ${m(t`e^{${k}x}`)} works.`,
      };
    },
  },
  {
    key: "u7-slope-field",
    unit: 7,
    topics: ["sketching-slope-fields", "reasoning-with-slope-fields"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const [right, ...others] = r.sample(slopeFields, 4) as [(typeof slopeFields)[number], ...(typeof slopeFields)[number][]];
      const svg = slopeFieldSvg(right.f, { xMin: -2, xMax: 2, yMin: -2, yMax: 2, width: 360 });
      return {
        stimulus: { text: "A slope field for a differential equation is shown at the points with integer coordinates.", svg, alt: "A slope field drawn on the grid from x = -2 to 2 and y = -2 to 2." },
        stem: "Which of the following differential equations could have the slope field shown?",
        correct: correct(m(t`\frac{dy}{dx} = ${right.tex}`), "Check where the segments are horizontal and where the slopes are positive or negative; this equation matches at every point."),
        wrong: others.map((o) => wrong(m(t`\frac{dy}{dx} = ${o.tex}`), "Test a few points: at some grid points this equation gives a slope with the wrong sign or steepness.")),
        explanation: t`Compare slopes at specific points. For example, at ${m("(1, 0)")} the field's segment has slope ${m(right.f(1, 0))}, and at ${m("(0, 1)")} slope ${m(right.f(0, 1))}, which matches ${m(t`\frac{dy}{dx} = ${right.tex}`)}.`,
      };
    },
  },
  {
    key: "u7-second-derivative",
    unit: 7,
    topics: ["modeling-with-differential-equations", "reasoning-with-slope-fields"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const p = r.int(-3, 3);
      const q = r.int(-3, 3);
      const d1 = p * p - q;
      const d2 = 2 * p - d1;
      const vals = [d2, d1, 2 * p, 2 * p + d1];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `Let ${m("y = f(x)")} be the solution to ${m(t`\frac{dy}{dx} = x^2 - y`)} passing through the point ${m(t`(${p}, ${q})`)}. What is ${m(t`\frac{d^2y}{dx^2}`)} at that point?`,
        correct: correct(m(d2), t`${m(t`\frac{d^2y}{dx^2} = 2x - \frac{dy}{dx}`)}, and ${m(t`\frac{dy}{dx} = ${d1}`)} at the point.`),
        wrong: [
          wrong(m(d1), "This is dy/dx, the first derivative."),
          wrong(m(2 * p), "This differentiates x² but treats y as a constant; y depends on x."),
          wrong(m(vals[3]!), "Sign error: the derivative of −y is −dy/dx."),
        ],
        explanation: t`Differentiate implicitly: ${m(t`\frac{d^2y}{dx^2} = 2x - \frac{dy}{dx} = 2x - (x^2 - y)`)}. At ${m(t`(${p}, ${q})`)}: ${m(t`${2 * p} - ${d1 < 0 ? `(${d1})` : d1} = ${d2}`)}.`,
      };
    },
  },
  {
    key: "u7-exponential",
    unit: 7,
    topics: ["exponential-models"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const P0 = r.pick([100, 200, 500, 1000, 50]);
      const T = r.int(2, 8);
      const n = r.int(2, 4);
      if (r.next() < 0.5) {
        const ans = P0 * 2 ** n;
        return {
          stem: `A population ${m("P")} grows according to ${m(t`\frac{dP}{dt} = kP`)}, and it doubles every ${T} years. If ${m(t`P(0) = ${P0}`)}, what is ${m(t`P(${n * T})`)}?`,
          correct: correct(m(ans), `$$${n * T}$$ years is ${n} doubling periods, so the population is multiplied by $$2^{${n}}$$.`),
          wrong: [
            wrong(m(P0 * (n + 1)), "This adds the original amount once per period (linear growth); exponential growth multiplies by 2 each period."),
            wrong(m(P0 * 2), "This counts only one doubling period."),
            wrong(m(P0 * 2 ** (n * T)), "This treats each year as a doubling period."),
          ],
          explanation: t`The solution is ${m(t`P(t) = ${P0} \cdot 2^{t/${T}}`)}. So ${m(t`P(${n * T}) = ${P0} \cdot 2^{${n}} = ${ans}`)}.`,
        };
      }
      return {
        stem: `A quantity ${m("y")} satisfies ${m(t`\frac{dy}{dt} = ky`)} and doubles every ${T} hours. What is the value of ${m("k")}?`,
        correct: correct(m(t`\frac{\ln 2}{${T}}`), t`${m(t`y = y_0e^{kt}`)} and ${m(t`e^{${T}k} = 2`)}.`),
        wrong: [
          wrong(m(t`\frac{2}{${T}}`), "Doubling means e^{kT} = 2; solve with a logarithm."),
          wrong(m(t`${T}\ln 2`), t`Solving ${m(t`${T}k = \ln 2`)} requires dividing by ${m(T)}.`),
          wrong(m(t`\frac{1}{${2 * T}}`), "This is not a solution of e^{kT} = 2."),
        ],
        explanation: t`${m(t`y(${T}) = 2y_0`)} means ${m(t`e^{${T}k} = 2`)}, so ${m(t`k = \frac{\ln 2}{${T}}`)}.`,
      };
    },
  },
  {
    key: "u7-tangent-approx",
    unit: 7,
    topics: ["modeling-with-differential-equations"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.int(-2, 2);
      const b = r.int(-3, 4);
      const s = a + b;
      if (s === 0) throw new Retry();
      const h = F(1, 10);
      const ans = F(b).add(h.mul(s));
      const w = [F(b + s), F(b).sub(h.mul(s)), h.mul(s)];
      if (w.some((x) => x.equals(ans))) throw new Retry();
      return {
        stem: `Let ${m("y = f(x)")} be the solution to ${m(t`\frac{dy}{dx} = x + y`)} with ${m(t`f(${a}) = ${b}`)}. Using the tangent line at ${m(t`x = ${a}`)}, what is the approximation of ${m(t`f(${dec(a + 0.1, 1)})`)}?`,
        correct: correct(m(dec(ans.value, 1)), t`Slope ${m(t`= ${a} + (${b}) = ${s}`)}; ${m(t`f(${dec(a + 0.1, 1)}) \approx ${b} + ${par(s)}(0.1)`)}.`),
        wrong: [
          wrong(m(dec(w[0]!.value, 1)), "This adds the slope without multiplying by the step 0.1."),
          wrong(m(dec(w[1]!.value, 1)), "Sign error in the step."),
          wrong(m(dec(w[2]!.value, 1)), "This is only the estimated change; add it to f(a)."),
        ],
        explanation: t`At ${m(t`(${a}, ${b})`)}, ${m(t`\frac{dy}{dx} = ${s}`)}. The tangent line gives ${m(t`f(${dec(a + 0.1, 1)}) \approx ${b} + ${par(s)}(0.1) = ${dec(ans.value, 1)}`)}.`,
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 8: Applications of Integration
// ---------------------------------------------------------------------------

export const unit8: McqTemplate[] = [
  {
    key: "u8-average-value",
    unit: 8,
    topics: ["average-value"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const p = 3 * r.nz(-2, 3);
      const q = r.int(-5, 6);
      const b = r.int(1, 4);
      const ans = F(p * b * b, 3).add(q);
      const integral = F(p * b ** 3, 3).add(q * b);
      const w = [F(p * b * b + 2 * q, 2), integral, F(p * b * b, b)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `What is the average value of ${m(t`f(x) = ${poly([p, 0, q])}`)} on the interval ${m(t`[0, ${b}]`)}?`,
        correct: correct(m(ans), t`${m(t`\frac{1}{${b}}\int_0^{${b}} f(x)\,dx = \frac{1}{${b}}\left(${integral.tex()}\right)`)}.`),
        wrong: [
          wrong(m(w[0]!), "This averages the endpoint values, which only works for linear functions."),
          wrong(m(w[1]!), "This is the integral; divide by the length of the interval."),
          wrong(m(w[2]!), "This is the average rate of change of f, not the average value."),
        ],
        explanation: t`Average value ${m(t`= \frac{1}{${b} - 0}\int_0^{${b}} (${poly([p, 0, q])})\,dx = \frac{1}{${b}}\left[${joinTerms([coef(F(p, 3), "x^3"), coef(q, "x")])}\right]_0^{${b}} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u8-distance",
    unit: 8,
    topics: ["motion-with-integrals"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const c = r.int(1, 3);
      const T = c + r.int(1, 3);
      // v(t) = t^2 - c t
      const disp = F(T ** 3, 3).sub(F(c * T * T, 2));
      const dist = disp.add(F(c ** 3, 3));
      const vT = T * T - c * T;
      if (r.next() < 0.5) {
        const w = [disp, F(vT), dist.add(F(c ** 3, 3))];
        if (w.some((x) => x.equals(dist)) || new Set(w.map(String)).size < 3) throw new Retry();
        return {
          stem: `A particle moves along a line with velocity ${m(t`v(t) = ${poly([1, -c, 0], "t")}`)}. What is the total distance traveled by the particle from ${m("t = 0")} to ${m(t`t = ${T}`)}?`,
          correct: correct(m(dist), t`Total distance is ${m(t`\int_0^{${T}} |v(t)|\,dt`)}; split at ${m(t`t = ${c}`)}, where ${m("v")} changes sign.`),
          wrong: [
            wrong(m(w[0]!), "This is the displacement; it subtracts the distance traveled backward."),
            wrong(m(w[1]!), "This is the velocity at the final time."),
            wrong(m(w[2]!), "This counts the backward part twice."),
          ],
          explanation: t`${m(t`\int_0^{${c}} -v\,dt = ${F(c ** 3, 6).tex()}`)} and ${m(t`\int_{${c}}^{${T}} v\,dt = ${disp.add(F(c ** 3, 6)).tex()}`)}. Total distance ${m(t`= ${dist.tex()}`)}.`,
        };
      }
      const x0 = r.int(-5, 5);
      const ans = disp.add(x0);
      const w = [disp, F(vT + x0), dist.add(x0)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `A particle moves along the x-axis with velocity ${m(t`v(t) = ${poly([1, -c, 0], "t")}`)}, and its position at ${m("t = 0")} is ${m(t`x(0) = ${x0}`)}. What is the position of the particle at ${m(t`t = ${T}`)}?`,
        correct: correct(m(ans), t`${m(t`x(${T}) = x(0) + \int_0^{${T}} v(t)\,dt`)}.`),
        wrong: [
          wrong(m(w[0]!), "This is the displacement; add the starting position."),
          wrong(m(w[1]!), "This adds the velocity at one instant, not the accumulated change in position."),
          wrong(m(w[2]!), "This adds the total distance, but position uses the signed displacement."),
        ],
        explanation: t`${m(t`x(${T}) = ${x0} + \int_0^{${T}} (${poly([1, -c, 0], "t")})\,dt = ${x0} + ${disp.tex()} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u8-area-between",
    unit: 8,
    topics: ["area-between-curves-x", "area-between-curves-y"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const k = r.int(1, 4);
      const ans = F(k ** 3, 6);
      const inY = r.next() < 0.4;
      const w = [F(k ** 3, 2), F(k ** 3, 3), ans.neg()];
      return {
        stem: inY
          ? `What is the area of the region enclosed by the curves ${m("x = y^2")} and ${m(t`x = ${coef(k, "y")}`)}?`
          : `What is the area of the region enclosed by the graphs of ${m("y = x^2")} and ${m(t`y = ${coef(k, "x")}`)}?`,
        correct: correct(m(ans), inY ? t`${m(t`\int_0^{${k}} (${coef(k, "y")} - y^2)\,dy`)}: right curve minus left curve.` : t`${m(t`\int_0^{${k}} (${coef(k, "x")} - x^2)\,dx`)}: top curve minus bottom curve.`),
        wrong: [
          wrong(m(w[0]!), "This is the area under the line alone."),
          wrong(m(w[1]!), "This is the area under the parabola alone."),
          wrong(m(w[2]!), "An area is never negative; this subtracts the curves in the wrong order."),
        ],
        explanation: t`The curves meet at ${m("0")} and ${m(k)}. Area ${m(t`= \int_0^{${k}} (${coef(k, "u")} - u^2)\,du = \frac{${coef(k, "u^2")}}{2} - \frac{u^3}{3}\Big|_0^{${k}} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u8-area-three-intersections",
    unit: 8,
    topics: ["area-multiple-intersections"],
    skills: ["1", "3"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const k = r.int(1, 3);
      const ans = F(k ** 4, 2);
      return {
        stem: `What is the total area of the regions enclosed by the graphs of ${m("y = x^3")} and ${m(t`y = ${coef(k * k, "x")}`)}?`,
        correct: correct(m(ans), t`The graphs meet at ${m(t`x = -${k}, 0, ${k}`)}. Each region has area ${m(F(k ** 4, 4))}.`),
        wrong: [
          wrong(m(0), "This integrates the difference across both regions at once; the signed areas cancel."),
          wrong(m(F(k ** 4, 4)), "This is only one of the two regions."),
          wrong(m(k ** 4), "This doubles the total area."),
        ],
        explanation: t`On ${m(t`[-${k}, 0]`)}, ${m("x^3")} is on top; on ${m(t`[0, ${k}]`)}, ${m(coef(k * k, "x"))} is on top. By symmetry, total area ${m(t`= 2\int_0^{${k}} (${coef(k * k, "x")} - x^3)\,dx = 2 \cdot ${F(k ** 4, 4).tex()} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u8-disc",
    unit: 8,
    topics: ["disc-method-axes"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const root = r.int(1, 3);
      const a = root * root + (root === 1 ? 3 : 0);
      if (r.next() < 0.5) {
        const s = Math.round(Math.sqrt(a)) === Math.sqrt(a) ? Math.sqrt(a) : 2;
        if (s * s !== a) throw new Retry();
        const ans = F(a * a, 2);
        return {
          stem: `The region bounded by ${m(t`y = \sqrt{x}`)}, the x-axis, and the line ${m(t`x = ${a}`)} is revolved about the x-axis. What is the volume of the resulting solid?`,
          correct: correct(m(piTex(ans)), t`${m(t`\pi\int_0^{${a}} (\sqrt{x})^2\,dx = \pi\frac{x^2}{2}\Big|_0^{${a}}`)}.`),
          wrong: [
            wrong(m(ans), t`The disc method has a factor of ${m(t`\pi`)}.`),
            wrong(m(piTex(F(2 * s ** 3, 3))), "This integrates the radius instead of the radius squared."),
            wrong(m(piTex(F(a * a))), t`This forgets to divide by 2 when integrating ${m("x")}.`),
          ],
          explanation: t`Each cross section is a disc of radius ${m(t`\sqrt{x}`)}, so ${m(t`V = \pi\int_0^{${a}} x\,dx = ${piTex(ans)}`)}.`,
        };
      }
      return disc2(r.int(1, 3));
    },
  },
  {
    key: "u8-disc-parabola",
    unit: 8,
    topics: ["disc-method-axes"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen: (r) => disc2(r.int(1, 3)),
  },
  {
    key: "u8-washer",
    unit: 8,
    topics: ["washer-method-axes"],
    skills: ["1"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const k = r.int(1, 2);
      const ans = F(2 * k ** 5, 15);
      return {
        stem: `The region enclosed by ${m(t`y = ${coef(k, "x")}`)} and ${m("y = x^2")} is revolved about the x-axis. What is the volume of the resulting solid?`,
        correct: correct(m(piTex(ans)), t`${m(t`\pi\int_0^{${k}} \left[(${coef(k, "x")})^2 - (x^2)^2\right]dx`)}: outer radius squared minus inner radius squared.`),
        wrong: [
          wrong(m(piTex(F(k ** 5, 30))), "This squares the difference of the radii instead of taking the difference of the squares."),
          wrong(m(piTex(F(k ** 5, 3))), "This uses only the outer radius (a disc instead of a washer)."),
          wrong(m(piTex(F(k ** 3, 6))), "This is π times the area of the region, not a volume of revolution."),
        ],
        explanation: t`${m(t`V = \pi\int_0^{${k}} (${coef(k * k, "x^2")} - x^4)\,dx = \pi\left(\frac{${coef(k * k, "x^3")}}{3} - \frac{x^5}{5}\right)\Big|_0^{${k}} = ${piTex(ans)}`)}.`,
      };
    },
  },
  {
    key: "u8-volume-other-axis",
    unit: 8,
    topics: ["disc-method-other-axes", "washer-method-other-axes"],
    skills: ["2"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const c = r.int(1, 4);
      if (r.next() < 0.5) {
        const k = r.int(1, 3);
        return {
          stem: `Let ${m("R")} be the region bounded by ${m("y = x^2")} and ${m(t`y = ${k * k}`)}. Which of the following gives the volume of the solid generated when ${m("R")} is revolved about the line ${m(t`y = ${k * k}`)}?`,
          correct: correct(m(t`\pi\int_{-${k}}^{${k}} (${k * k} - x^2)^2\,dx`), t`Each disc has radius ${m(t`${k * k} - x^2`)}, the distance from the curve to the axis.`),
          wrong: [
            wrong(m(t`\pi\int_{-${k}}^{${k}} (${k ** 4} - x^4)\,dx`), "This is the washer formula for revolving about the x-axis."),
            wrong(m(t`\pi\int_{-${k}}^{${k}} (x^2)^2\,dx`), "This uses the distance from the curve to the x-axis, not to the line of revolution."),
            wrong(m(t`\pi\int_{0}^{${k}} (${k * k} - x^2)\,dx`), "The radius must be squared, and the region runs from −k to k."),
          ],
          explanation: t`Revolving about ${m(t`y = ${k * k}`)}, which is the top boundary, gives discs of radius ${m(t`${k * k} - x^2`)}.`,
        };
      }
      return {
        stem: `Let ${m("R")} be the region enclosed by ${m("y = x")} and ${m("y = x^2")}. Which of the following gives the volume of the solid generated when ${m("R")} is revolved about the line ${m(t`y = -${c}`)}?`,
        correct: correct(m(t`\pi\int_0^1 \left[(x + ${c})^2 - (x^2 + ${c})^2\right]dx`), t`The radii are measured from ${m(t`y = -${c}`)}: outer ${m(t`x + ${c}`)}, inner ${m(t`x^2 + ${c}`)}.`),
        wrong: [
          wrong(m(t`\pi\int_0^1 \left[(x - ${c})^2 - (x^2 - ${c})^2\right]dx`), "This measures the radii from y = c instead of y = −c."),
          wrong(m(t`\pi\int_0^1 \left[x^2 - x^4\right]dx`), "This revolves about the x-axis."),
          wrong(m(t`\pi\int_0^1 (x - x^2)^2\,dx`), "This squares the difference of the radii instead of subtracting their squares."),
        ],
        explanation: t`Washers: ${m(t`V = \pi\int_0^1 \left[R(x)^2 - r(x)^2\right]dx`)} with ${m(t`R = x - (-${c})`)} and ${m(t`r = x^2 - (-${c})`)}.`,
      };
    },
  },
  {
    key: "u8-cross-sections",
    unit: 8,
    topics: ["cross-sections-squares-rectangles", "cross-sections-triangles-semicircles"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.pick([2, 4, 6]);
      const half = F(a * a, 2);
      const shapes = [
        { name: "squares", ans: half.tex(), how: t`side ${m(t`\sqrt{x}`)}, area ${m("x")}` },
        { name: "semicircles", ans: piTex(F(a * a, 16)), how: t`diameter ${m(t`\sqrt{x}`)}, area ${m(t`\frac{\pi}{8}x`)}` },
        { name: "equilateral triangles", ans: t`${F(a * a, 8).tex()}\sqrt{3}`, how: t`side ${m(t`\sqrt{x}`)}, area ${m(t`\frac{\sqrt{3}}{4}x`)}` },
        { name: "isosceles right triangles with a leg in the base", ans: F(a * a, 4).tex(), how: t`leg ${m(t`\sqrt{x}`)}, area ${m(t`\frac{1}{2}x`)}` },
      ];
      const [s, ...others] = r.shuffle(shapes) as [(typeof shapes)[number], ...(typeof shapes)[number][]];
      return {
        stem: `The base of a solid is the region bounded by ${m(t`y = \sqrt{x}`)}, the x-axis, and ${m(t`x = ${a}`)}. Cross sections perpendicular to the x-axis are ${s.name}. What is the volume of the solid?`,
        correct: correct(m(s.ans), `Each cross section has ${s.how}; integrate from 0 to ${a}.`),
        wrong: others.slice(0, 3).map((o) => wrong(m(o.ans), `This is the volume for cross sections that are ${o.name}.`)),
        explanation: `The cross section at $x$ has ${s.how}. Integrating from 0 to ${a} gives $${s.ans}$.`,
      };
    },
  },
  {
    key: "u8-area-calc",
    unit: 8,
    topics: ["area-between-curves-x"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const k = r.int(2, 4);
      const f = (x: number) => k * Math.cos(x / 2);
      const g = (x: number) => x * x - 1;
      const xs = roots((x) => f(x) - g(x), -4, 4);
      if (xs.length !== 2) throw new Retry();
      const [a, b] = xs as [number, number];
      const area = integrate((x) => f(x) - g(x), a, b);
      const vals = [area, integrate(f, a, b), b - a, integrate((x) => Math.abs(f(x)) + Math.abs(g(x)), a, b)];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `What is the area of the region enclosed by the graphs of ${m(t`y = ${k}\cos\left(\frac{x}{2}\right)`)} and ${m("y = x^2 - 1")}?`,
        correct: correct(m(dec(area)), t`The curves meet at ${m(t`x \approx ${dec(a)}`)} and ${m(t`x \approx ${dec(b)}`)}; integrate top minus bottom.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This is the area under the top curve only."),
          wrong(m(dec(vals[2]!)), "This is the distance between the intersection points, not an area."),
          wrong(m(dec(vals[3]!)), "This adds the absolute values of the curves instead of subtracting."),
        ],
        explanation: t`Store the intersection x-values from the calculator, then ${m(t`\int_{${dec(a)}}^{${dec(b)}} \left(${k}\cos\frac{x}{2} - (x^2 - 1)\right)dx \approx ${dec(area)}`)}.`,
      };
    },
  },
  {
    key: "u8-volume-calc",
    unit: 8,
    topics: ["washer-method-other-axes", "disc-method-other-axes"],
    skills: ["1"],
    difficulty: 4,
    calc: true,
    gen(r) {
      const c = r.int(1, 3);
      const f = (x: number) => Math.sqrt(x) * Math.exp(-x / 4) + 0.2;
      const b = r.int(2, 5);
      const V = Math.PI * integrate((x) => (f(x) + c) ** 2 - c * c, 0, b);
      const vals = [V, Math.PI * integrate((x) => f(x) ** 2, 0, b), Math.PI * integrate((x) => f(x) ** 2 + c * c, 0, b), V / Math.PI];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `Let ${m("R")} be the region bounded by ${m(t`y = \sqrt{x}\,e^{-x/4} + 0.2`)}, the x-axis, ${m("x = 0")}, and ${m(t`x = ${b}`)}. What is the volume of the solid generated when ${m("R")} is revolved about the line ${m(t`y = -${c}`)}?`,
        correct: correct(m(dec(V)), t`Washers with outer radius ${m(t`f(x) + ${c}`)} and inner radius ${m(c)}.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This revolves about the x-axis."),
          wrong(m(dec(vals[2]!)), "This adds the squared radii instead of subtracting the inner radius squared."),
          wrong(m(dec(vals[3]!)), "This leaves out the factor of π."),
        ],
        explanation: t`${m(t`V = \pi\int_0^{${b}} \left[(f(x) + ${c})^2 - ${c}^2\right]dx \approx ${dec(V)}`)}.`,
      };
    },
  },
  {
    key: "u8-distance-calc",
    unit: 8,
    topics: ["motion-with-integrals", "accumulation-in-context"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const a = r.int(2, 4);
      const T = r.int(3, 6);
      const v = (x: number) => a * Math.sin(x) * Math.exp(-x / 6) + 0.3;
      const dist = integrate((x) => Math.abs(v(x)), 0, T, 6000);
      const disp = integrate(v, 0, T);
      const vals = [dist, disp, Math.abs(v(T)), dist / T];
      if (new Set(vals.map((x) => dec(x))).size < 4) throw new Retry();
      return {
        stem: `A particle moves along a line with velocity ${m(t`v(t) = ${a}\sin(t)\,e^{-t/6} + 0.3`)}. What is the total distance the particle travels over ${m(t`0 \leq t \leq ${T}`)}?`,
        correct: correct(m(dec(dist)), t`${m(t`\int_0^{${T}} |v(t)|\,dt`)} on the calculator.`),
        wrong: [
          wrong(m(dec(disp)), "This is the displacement; backward motion subtracts from it."),
          wrong(m(dec(vals[2]!)), "This is the speed at the final time."),
          wrong(m(dec(vals[3]!)), "This is the average speed, not the distance."),
        ],
        explanation: t`Total distance ${m(t`= \int_0^{${T}} |v(t)|\,dt \approx ${dec(dist)}`)}. The displacement ${m(t`\int_0^{${T}} v(t)\,dt \approx ${dec(disp)}`)} is smaller because the particle moves backward part of the time.`,
      };
    },
  },
];

function disc2(a: number): McqDraft {
      const ans = F(a ** 5, 5);
      return {
        stem: `The region bounded by ${m("y = x^2")}, the x-axis, and the line ${m(t`x = ${a}`)} is revolved about the x-axis. What is the volume of the resulting solid?`,
        correct: correct(m(piTex(ans)), t`${m(t`\pi\int_0^{${a}} (x^2)^2\,dx = \pi\frac{x^5}{5}\Big|_0^{${a}}`)}.`),
        wrong: [
          wrong(m(ans), t`The disc method has a factor of ${m(t`\pi`)}.`),
          wrong(m(piTex(F(a ** 3, 3))), "This integrates the radius instead of the radius squared."),
          wrong(m(piTex(F(a ** 4, 4))), t`${m("(x^2)^2 = x^4")}, whose antiderivative is ${m(t`\frac{x^5}{5}`)}.`),
        ],
        explanation: t`${m(t`V = \pi\int_0^{${a}} x^4\,dx = ${piTex(ans)}`)}.`,
      };
}

export { Frac };
