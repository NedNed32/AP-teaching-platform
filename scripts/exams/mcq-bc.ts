/* Multiple-choice templates for Calculus BC-only topics (units 6–10). */
import { coef, dec, derivative, F, Frac, integrate, joinTerms, m, par, poly, roots, shiftBare } from "./lib";
import { piTex } from "./mcq-units-6-8";
import { correct, Retry, wrong, type McqTemplate } from "./types";

const t = String.raw;
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const lnAbs = (c: number | Frac, a: number) => coef(c, t`\ln|${shiftBare("x", a)}|`);

export const bcUnit6: McqTemplate[] = [
  {
    key: "bc-parts",
    unit: 6,
    topics: ["integration-by-parts"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const a = r.int(1, 4);
        const e = a === 1 ? "e^{x}" : `e^{${a}x}`;
        const A = F(1, a);
        const B = F(1, a * a);
        return {
          stem: `${m(t`\int x${e}\,dx =`)}`,
          correct: correct(m(t`${coef(A, `x${e}`)} - ${coef(B, e)} + C`), t`Parts with ${m("u = x")} and ${m(t`dv = ${e}\,dx`)}.`),
          wrong: [
            wrong(m(t`${coef(A, `x${e}`)} + ${coef(B, e)} + C`), t`Sign error: integration by parts subtracts ${m(t`\int v\,du`)}.`),
            wrong(m(t`${coef(A, `x${e}`)} + C`), t`This is only ${m("uv")}; the term ${m(t`-\int v\,du`)} is missing.`),
            wrong(m(t`${coef(A, `\\frac{x^2}{2}${e}`)} + C`), "Integrating both factors separately and multiplying is not valid."),
          ],
          explanation: t`${m(t`u = x,\; du = dx,\; v = \frac{1}{${a}}${e}`)}. Then ${m(t`\int x${e}\,dx = \frac{x}{${a}}${e} - \int \frac{1}{${a}}${e}\,dx = ${coef(A, `x${e}`)} - ${coef(B, e)} + C`)}.`,
        };
      }
      const items = [
        { q: t`\int_1^{e} \ln x\,dx`, ans: "1", w: ["e", "e - 1", "0"], ex: t`${m(t`\left[x\ln x - x\right]_1^{e} = (e - e) - (0 - 1) = 1`)}` },
        { q: t`\int_0^{\pi} x\sin x\,dx`, ans: t`\pi`, w: ["0", t`-\pi`, "2"], ex: t`${m(t`\left[-x\cos x + \sin x\right]_0^{\pi} = \pi`)}` },
        { q: t`\int_0^{\pi/2} x\cos x\,dx`, ans: t`\frac{\pi}{2} - 1`, w: [t`\frac{\pi}{2}`, t`\frac{\pi}{2} + 1`, "1"], ex: t`${m(t`\left[x\sin x + \cos x\right]_0^{\pi/2} = \frac{\pi}{2} - 1`)}` },
        { q: t`\int_0^{1} xe^{x}\,dx`, ans: "1", w: ["e", "e - 1", t`\frac{e}{2}`], ex: t`${m(t`\left[xe^x - e^x\right]_0^1 = 0 - (-1) = 1`)}` },
      ];
      const o = r.pick(items);
      return {
        stem: `What is ${m(o.q)}?`,
        correct: correct(m(o.ans), "Integration by parts, then evaluate at both limits."),
        wrong: [
          wrong(m(o.w[0]!), "This evaluates only part of the antiderivative or only one limit."),
          wrong(m(o.w[1]!), "Sign error in the integration-by-parts formula."),
          wrong(m(o.w[2]!), "This drops the second term produced by integration by parts."),
        ],
        explanation: `Use integration by parts: ${o.ex}.`,
      };
    },
  },
  {
    key: "bc-partial-fractions",
    unit: 6,
    topics: ["partial-fractions"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const [a, b] = r.sample([-4, -3, -2, -1, 1, 2, 3, 4], 2) as [number, number];
      const A = r.nz(-4, 4);
      const B = r.nz(-4, 4);
      if (A === B) throw new Retry();
      // A/(x-a) + B/(x-b) = ((A+B)x - (Ab + Ba)) / ((x-a)(x-b))
      const num = poly([A + B, -(A * b + B * a)]);
      const den = poly([1, -(a + b), a * b]);
      if (A + B === 0) throw new Retry();
      return {
        stem: `${m(t`\int \frac{${num}}{${den}}\,dx =`)}`,
        correct: correct(m(t`${joinTerms([lnAbs(A, a), lnAbs(B, b)])} + C`), t`${m(t`\frac{${num}}{${den}} = \frac{${A}}{${shiftBare("x", a)}} + \frac{${B}}{${shiftBare("x", b)}}`)}.`),
        wrong: [
          wrong(m(t`${joinTerms([lnAbs(B, a), lnAbs(A, b)])} + C`), "The coefficients are matched to the wrong factors."),
          wrong(m(t`${joinTerms([lnAbs(A, -a), lnAbs(B, -b)])} + C`), "Sign error in the linear factors."),
          wrong(m(t`${coef(A + B, t`\ln|${den}|`)} + C`), "The numerator is not a multiple of the derivative of the denominator, so this is not a single logarithm."),
        ],
        explanation: t`Factor the denominator as ${m(t`${shiftBare("(x", a)})${shiftBare("(x", b)})`.replace(/\(\(/g, "("))}. Solve ${m(t`${num} = A${shiftBare("(x", b)}) + B${shiftBare("(x", a)})`)}: substituting ${m(t`x = ${a}`)} and ${m(t`x = ${b}`)} gives ${m(t`A = ${A}`)} and ${m(t`B = ${B}`)}. Each piece integrates to a logarithm.`,
      };
    },
  },
  {
    key: "bc-improper",
    unit: 6,
    topics: ["improper-integrals"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const kind = r.pick(["p", "exp", "root"] as const);
      if (kind === "p") {
        const p = r.int(2, 5);
        const c = r.int(1, 3);
        return {
          stem: `What is ${m(t`\int_{${c}}^{\infty} \frac{1}{x^{${p}}}\,dx`)}?`,
          correct: correct(m(F(1, (p - 1) * c ** (p - 1))), t`${m(t`\lim_{b \to \infty}\left[\frac{x^{${1 - p}}}{${1 - p}}\right]_{${c}}^{b} = \frac{1}{${p - 1}\cdot ${c}^{${p - 1}}}`)}.`),
          wrong: [
            wrong("The integral diverges.", t`A p-integral to infinity converges when ${m("p > 1")}; here ${m(t`p = ${p}`)}.`),
            wrong(m(F(1, p - 1)), t`This uses the lower limit 1 instead of ${m(c)}.`.replace(c === 1 ? "x" : "zz", "x")),
            wrong(m(F(1, (p + 1) * c ** (p + 1))), "This raises the power instead of lowering it."),
          ],
          explanation: t`Write it as a limit: ${m(t`\lim_{b \to \infty}\int_{${c}}^{b} x^{-${p}}\,dx = \lim_{b \to \infty}\left(\frac{1}{${p - 1}\cdot ${c}^{${p - 1}}} - \frac{1}{${p - 1}b^{${p - 1}}}\right)`)}.`,
        };
      }
      if (kind === "exp") {
        const k = r.int(2, 6);
        return {
          stem: `What is ${m(t`\int_0^{\infty} e^{-${k}x}\,dx`)}?`,
          correct: correct(m(F(1, k)), t`${m(t`\lim_{b \to \infty}\left[-\frac{1}{${k}}e^{-${k}x}\right]_0^b = \frac{1}{${k}}`)}.`),
          wrong: [
            wrong("The integral diverges.", "The exponential decays fast enough for the area to be finite."),
            wrong(m(k), "The antiderivative of $$e^{-kx}$$ has a factor $$\\frac{1}{k}$$, not $$k$$."),
            wrong(m(F(-1, k)), "Sign error: the integrand is positive, so the integral is positive."),
          ],
          explanation: t`${m(t`\int_0^b e^{-${k}x}dx = \frac{1}{${k}}\left(1 - e^{-${k}b}\right) \to \frac{1}{${k}}`)}.`,
        };
      }
      const a = r.pick([1, 4, 9]);
      const s = Math.sqrt(a);
      return {
        stem: `What is ${m(t`\int_0^{${a}} \frac{1}{\sqrt{x}}\,dx`)}?`,
        correct: correct(m(2 * s), t`${m(t`\lim_{t \to 0^+}\left[2\sqrt{x}\right]_t^{${a}} = ${2 * s}`)}.`),
        wrong: [
          wrong("The integral diverges.", "The integrand is unbounded at 0, but $$p = \\frac{1}{2} < 1$$, so the area is finite."),
          wrong(m(s), "This forgets the factor 2 in the antiderivative of $$x^{-1/2}$$."),
          wrong(m(F(1, 2 * s)), "This differentiates instead of integrating."),
        ],
        explanation: t`The integrand blows up at 0, so use a limit: ${m(t`\lim_{t \to 0^+}\left(2\sqrt{${a}} - 2\sqrt{t}\right) = ${2 * s}`)}.`,
      };
    },
  },
];

export const bcUnit7: McqTemplate[] = [
  {
    key: "bc-euler",
    unit: 7,
    topics: ["eulers-method"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const des = [
        { tex: "x + y", f: (x: Frac, y: Frac) => x.add(y) },
        { tex: "2x - y", f: (x: Frac, y: Frac) => x.mul(2).sub(y) },
        { tex: "xy", f: (x: Frac, y: Frac) => x.mul(y) },
        { tex: "y - x^2", f: (x: Frac, y: Frac) => y.sub(x.mul(x)) },
      ];
      const de = r.pick(des);
      const x0 = r.int(0, 2);
      const y0 = r.int(1, 4);
      const h = r.pick([F(1, 2), F(1, 10), F(1, 4)]);
      const s0 = de.f(F(x0), F(y0));
      const y1 = F(y0).add(s0.mul(h));
      const s1 = de.f(F(x0).add(h), y1);
      const y2 = y1.add(s1.mul(h));
      const sameSlope = F(y0).add(s0.mul(h).mul(2));
      const oneStep = y1;
      const bigStep = F(y0).add(s0.mul(h.mul(2)).mul(1)).add(F(0));
      const w = [sameSlope.equals(y2) ? y1.add(s0) : sameSlope, oneStep, F(y0).add(s1.mul(h.mul(2)))];
      void bigStep;
      if (w.some((v) => v.equals(y2)) || new Set(w.map(String)).size < 3) throw new Retry();
      const xEnd = F(x0).add(h.mul(2));
      const show = (f: Frac) => (f.d === 1 || [2, 4, 5, 10, 20, 25, 50, 100].includes(f.d) ? dec(f.value, f.d === 1 ? 0 : 2).replace(/\.?0+$/, "") : f.tex());
      return {
        stem: `Let ${m("y = f(x)")} be the solution to ${m(t`\frac{dy}{dx} = ${de.tex}`)} with ${m(t`f(${x0}) = ${y0}`)}. What is the approximation of ${m(t`f(${show(xEnd)})`)} found with Euler's method, using two steps of equal size?`,
        correct: correct(m(show(y2)), t`Step 1: slope ${m(show(s0))}, ${m(t`y_1 = ${show(y1)}`)}. Step 2: slope ${m(show(s1))} at ${m(t`(${show(F(x0).add(h))}, ${show(y1)})`)}.`),
        wrong: [
          wrong(m(show(w[0]!)), "This reuses the first slope for the second step; the slope must be recomputed at the new point."),
          wrong(m(show(w[1]!)), "This is only the first step."),
          wrong(m(show(w[2]!)), "This uses the second slope for the whole distance."),
        ],
        explanation: t`Step size ${m(show(h))}. ${m(t`y_1 = ${y0} + (${show(s0)})(${show(h)}) = ${show(y1)}`)}; ${m(t`y_2 = ${show(y1)} + (${show(s1)})(${show(h)}) = ${show(y2)}`)}.`,
      };
    },
  },
  {
    key: "bc-logistic",
    unit: 7,
    topics: ["logistic-models"],
    skills: ["2", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const L = r.pick([200, 500, 800, 1000, 1200, 5000]);
      const k = r.pick(["0.002", "0.0004", "0.01", "0.003"]);
      const P0 = r.int(1, 9) * (L / 20);
      if (r.next() < 0.5) {
        return {
          stem: `A population satisfies ${m(t`\frac{dP}{dt} = ${k}P(${L} - P)`)} with ${m(t`P(0) = ${P0}`)}. What is ${m(t`\lim_{t \to \infty} P(t)`)}?`,
          correct: correct(m(L), `The carrying capacity: the factor $$(${L} - P)$$ makes growth stop at $$P = ${L}$$.`),
          wrong: [
            wrong(m(L / 2), "This is where the population grows fastest, not its limit."),
            wrong(m(t`\infty`), "Logistic growth levels off; it does not grow without bound."),
            wrong(m(P0), "The population changes from its initial value; it is not constant."),
          ],
          explanation: `Since $$0 < P(0) < ${L}$$, $$\\frac{dP}{dt} > 0$$ and $$P$$ increases toward the equilibrium $$P = ${L}$$.`,
        };
      }
      return {
        stem: `A population satisfies ${m(t`\frac{dP}{dt} = ${k}P(${L} - P)`)} with ${m(t`P(0) = ${Math.min(P0, L / 4)}`)}. For what value of ${m("P")} is the population growing fastest?`,
        correct: correct(m(L / 2), "Half the carrying capacity, where the parabola $$\\frac{dP}{dt}$$ in $$P$$ has its maximum."),
        wrong: [
          wrong(m(L), "At the carrying capacity the growth rate is 0."),
          wrong(m(Math.min(P0, L / 4)), "The initial population is not where growth is fastest."),
          wrong(m(L / 4), "The maximum of $$P(L - P)$$ is at $$\\frac{L}{2}$$."),
        ],
        explanation: `$$\\frac{dP}{dt} = ${k}P(${L} - P)$$ is a downward parabola in $$P$$ with zeros at 0 and ${L}, so it is largest at $$P = ${L / 2}$$.`,
      };
    },
  },
];

const arcFns = [
  { f: "x^3", fp: "3x^2", fpVal: (x: number) => 3 * x * x, fVal: (x: number) => x ** 3 },
  { f: t`\sin x`, fp: t`\cos x`, fpVal: Math.cos, fVal: Math.sin },
  { f: "e^{2x}", fp: "2e^{2x}", fpVal: (x: number) => 2 * Math.exp(2 * x), fVal: (x: number) => Math.exp(2 * x) },
  { f: t`\ln x`, fp: t`\frac{1}{x}`, fpVal: (x: number) => 1 / x, fVal: Math.log },
];

export const bcUnit8: McqTemplate[] = [
  {
    key: "bc-arc-length-setup",
    unit: 8,
    topics: ["arc-length"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const o = r.pick(arcFns);
      const a = o.f.includes("ln") ? 1 : 0;
      const b = a + r.int(1, 3);
      return {
        stem: `Which of the following gives the length of the curve ${m(t`y = ${o.f}`)} from ${m(t`x = ${a}`)} to ${m(t`x = ${b}`)}?`,
        correct: correct(m(t`\int_{${a}}^{${b}} \sqrt{1 + \left(${o.fp}\right)^2}\,dx`), "Arc length integrates $$\\sqrt{1 + [f'(x)]^2}$$."),
        wrong: [
          wrong(m(t`\int_{${a}}^{${b}} \sqrt{1 + \left(${o.f}\right)^2}\,dx`), "This squares the function instead of its derivative."),
          wrong(m(t`\int_{${a}}^{${b}} \left(1 + ${o.fp}\right)dx`), "The integrand needs a square root and a squared derivative."),
          wrong(m(t`\int_{${a}}^{${b}} \sqrt{1 + ${o.fp}}\,dx`), "The derivative must be squared."),
        ],
        explanation: t`For ${m("y = f(x)")}, ${m(t`L = \int_a^b \sqrt{1 + [f'(x)]^2}\,dx`)}, and here ${m(t`f'(x) = ${o.fp}`)}.`,
      };
    },
  },
  {
    key: "bc-arc-length-calc",
    unit: 8,
    topics: ["arc-length"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const o = r.pick(arcFns);
      const a = o.f.includes("ln") ? 1 : 0;
      const b = a + r.pick([1, 1.5, 2]);
      const L = integrate((x) => Math.sqrt(1 + o.fpVal(x) ** 2), a, b);
      const vals = [L, integrate((x) => Math.sqrt(1 + o.fVal(x) ** 2), a, b), Math.abs(o.fVal(b) - o.fVal(a)), Math.hypot(b - a, o.fVal(b) - o.fVal(a))];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `What is the length of the curve ${m(t`y = ${o.f}`)} from ${m(t`x = ${a}`)} to ${m(t`x = ${b}`)}?`,
        correct: correct(m(dec(L)), t`${m(t`\int_{${a}}^{${b}} \sqrt{1 + \left(${o.fp}\right)^2}\,dx`)} on the calculator.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This squares the function instead of the derivative."),
          wrong(m(dec(vals[2]!)), "This is only the vertical change."),
          wrong(m(dec(vals[3]!)), "This is the straight-line distance between the endpoints, which is shorter than the curve."),
        ],
        explanation: t`${m(t`L = \int_{${a}}^{${b}} \sqrt{1 + \left(${o.fp}\right)^2}\,dx \approx ${dec(L)}`)}.`,
      };
    },
  },
];

export const bcUnit9: McqTemplate[] = [
  {
    key: "bc-parametric-slope",
    unit: 9,
    topics: ["parametric-derivatives"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.int(-3, 3);
      const b = r.int(-4, 4);
      const k = r.nz(-2, 3);
      const dx = 2 * k + a;
      const dy = 3 * k * k - b;
      if (dx === 0 || dy === 0) throw new Retry();
      const ans = F(dy, dx);
      const w = [F(dx, dy), F(dy), F(6 * k, 2)];
      if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `A curve is defined by ${m(t`x = ${poly([1, a, 0], "t")}`)} and ${m(t`y = ${poly([1, 0, -b, 0], "t")}`)}. What is ${m(t`\frac{dy}{dx}`)} at ${m(t`t = ${k}`)}?`,
        correct: correct(m(ans), t`${m(t`\frac{dy/dt}{dx/dt} = \frac{${dy}}{${dx}}`)}.`),
        wrong: [
          wrong(m(w[0]!), "This is $$\\frac{dx/dt}{dy/dt}$$, upside down."),
          wrong(m(w[1]!), "This is $$\\frac{dy}{dt}$$ alone."),
          wrong(m(w[2]!), "This divides second derivatives, which is not the slope."),
        ],
        explanation: t`${m(t`\frac{dx}{dt} = ${poly([2, a], "t")}`)} and ${m(t`\frac{dy}{dt} = ${poly([3, 0, -b], "t")}`)}. At ${m(t`t = ${k}`)}: ${m(t`\frac{${dy}}{${dx}}`)}.`,
      };
    },
  },
  {
    key: "bc-parametric-second",
    unit: 9,
    topics: ["parametric-second-derivatives"],
    skills: ["1"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const c = r.nz(-6, 6);
      const k = r.pick([1, 2, -1]);
      // x = t^2, y = t^3 + c t. dy/dx = (3t^2 + c)/(2t) = 1.5 t + c/(2t); d/dt = 1.5 - c/(2t^2); divide by 2t.
      const ddt = F(3, 2).sub(F(c, 2 * k * k));
      const ans = ddt.div(2 * k);
      const w = [F(3 * k), F(3 * k * k + c, 2 * k), ddt];
      if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `For the curve ${m("x = t^2")}, ${m(t`y = ${poly([1, 0, c, 0], "t")}`)}, what is ${m(t`\frac{d^2y}{dx^2}`)} at ${m(t`t = ${k}`)}?`,
        correct: correct(m(ans), t`Differentiate ${m(t`\frac{dy}{dx}`)} with respect to ${m("t")}, then divide by ${m(t`\frac{dx}{dt} = 2t`)}.`),
        wrong: [
          wrong(m(w[0]!), "This divides $$y''(t)$$ by $$x''(t)$$, which is not the second derivative."),
          wrong(m(w[1]!), "This is $$\\frac{dy}{dx}$$, the first derivative."),
          wrong(m(w[2]!), "This forgets to divide by $$\\frac{dx}{dt}$$."),
        ],
        explanation: t`${m(t`\frac{dy}{dx} = \frac{3t^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}}{2t} = \frac{3t}{2} ${c < 0 ? "-" : "+"} \frac{${Math.abs(c)}}{2t}`)}. Its ${m("t")}-derivative is ${m(t`\frac{3}{2} ${c < 0 ? "+" : "-"} \frac{${Math.abs(c)}}{2t^2}`)}, which is ${m(ddt.tex())} at ${m(t`t = ${k}`)}. Dividing by ${m(t`2t = ${2 * k}`)} gives ${m(ans.tex())}.`,
      };
    },
  },
  {
    key: "bc-speed",
    unit: 9,
    topics: ["parametric-vector-motion", "vector-valued-derivatives"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const [p, q] = r.pick([[3, 4], [5, 12], [6, 8], [8, 15], [4, 3], [12, 5]] as const);
      const k = r.int(1, 3);
      // x'(t) = p t / k, y'(t) = q * (t/k)^2 at t = k gives (p, q)
      const xp = F(p, k);
      const yp = F(q, k * k);
      const speed = Math.hypot(p, q);
      return {
        stem: `A particle moves in the plane with ${m(t`x'(t) = ${coef(xp, "t")}`)} and ${m(t`y'(t) = ${coef(yp, "t^2")}`)}. What is the speed of the particle at ${m(t`t = ${k}`)}?`,
        correct: correct(m(speed), t`${m(t`\sqrt{${p}^2 + ${q}^2} = ${speed}`)}.`),
        wrong: [
          wrong(m(p + q), "Speed is the magnitude of the velocity vector, not the sum of its components."),
          wrong(m(F(q, p)), "This is the slope of the path, not the speed."),
          wrong(m(p * p + q * q), "This forgets the square root."),
        ],
        explanation: t`At ${m(t`t = ${k}`)}, ${m(t`\vec{v} = \langle ${p}, ${q} \rangle`)}, so the speed is ${m(t`\sqrt{${p * p} + ${q * q}} = ${speed}`)}.`,
      };
    },
  },
  {
    key: "bc-vector-position",
    unit: 9,
    topics: ["vector-valued-integrals", "parametric-vector-motion"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.int(-3, 3);
      const b = r.int(-4, 4);
      const [p, q] = [r.int(-5, 5), r.int(-5, 5)];
      const T = r.int(1, 3);
      const X = p + T * T + a * T;
      const Y = q + T ** 3 - b * T;
      const vx = 2 * T + a;
      const vy = 3 * T * T - b;
      const opts = [`(${X}, ${Y})`, `(${X - p}, ${Y - q})`, `(${vx}, ${vy})`, `(${p + vx}, ${q + vy})`];
      if (new Set(opts).size < 4) throw new Retry();
      return {
        stem: `A particle has velocity ${m(t`\vec{v}(t) = \langle ${poly([2, a], "t")}, ${poly([3, 0, -b], "t")} \rangle`)} and position ${m(t`(${p}, ${q})`)} at ${m("t = 0")}. Where is the particle at ${m(t`t = ${T}`)}?`,
        correct: correct(m(opts[0]!), "Add the integral of each velocity component to the starting coordinate."),
        wrong: [
          wrong(m(opts[1]!), "This is the displacement; add the starting position."),
          wrong(m(opts[2]!), "This is the velocity at the final time, not the position."),
          wrong(m(opts[3]!), "This adds the final velocity instead of the accumulated change in position."),
        ],
        explanation: t`${m(t`x(${T}) = ${p} + \int_0^{${T}} (${poly([2, a], "t")})\,dt = ${X}`)} and ${m(t`y(${T}) = ${q} + \int_0^{${T}} (${poly([3, 0, -b], "t")})\,dt = ${Y}`)}.`,
      };
    },
  },
  {
    key: "bc-polar-slope",
    unit: 9,
    topics: ["polar-derivatives"],
    skills: ["1"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const a = r.int(1, 4);
      const b = r.nz(-3, 3);
      if (a === Math.abs(b)) throw new Retry();
      // r = a + b cos θ at θ = π/2: r = a, r' = -b. dy/dθ = r' sinθ + r cosθ = -b; dx/dθ = r' cosθ - r sinθ = -a.
      const ans = F(b, a);
      const w = [F(-b), F(-b, a), F(a, b)];
      if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `What is the slope of the line tangent to the polar curve ${m(t`r = ${a} ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}\cos\theta`)} at ${m(t`\theta = \frac{\pi}{2}`)}?`,
        correct: correct(m(ans), t`${m(t`\frac{dy}{d\theta} = ${-b}`)} and ${m(t`\frac{dx}{d\theta} = ${-a}`)}.`),
        wrong: [
          wrong(m(w[0]!), "This is $$\\frac{dr}{d\\theta}$$, which is not the slope."),
          wrong(m(w[1]!), "Sign error in $$\\frac{dx}{d\\theta} = r'\\cos\\theta - r\\sin\\theta$$."),
          wrong(m(w[2]!), "This is $$\\frac{dx/d\\theta}{dy/d\\theta}$$, upside down."),
        ],
        explanation: t`With ${m(t`x = r\cos\theta`)} and ${m(t`y = r\sin\theta`)}: at ${m(t`\theta = \frac{\pi}{2}`)}, ${m(t`r = ${a}`)} and ${m(t`r' = ${par(-b)}`)}. So ${m(t`\frac{dy}{d\theta} = r'\sin\theta + r\cos\theta = ${-b}`)} and ${m(t`\frac{dx}{d\theta} = r'\cos\theta - r\sin\theta = ${-a}`)}; the slope is ${m(ans.tex())}.`,
      };
    },
  },
  {
    key: "bc-polar-area",
    unit: 9,
    topics: ["polar-area-single"],
    skills: ["1", "2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const a = r.int(2, 5);
        const k = r.pick([3, 5]);
        return {
          stem: `What is the area of one petal of the rose ${m(t`r = ${a}\sin(${k}\theta)`)}?`,
          correct: correct(m(piTex(F(a * a, 4 * k))), t`${m(t`\frac{1}{2}\int_0^{\pi/${k}} ${a * a}\sin^2(${k}\theta)\,d\theta = \frac{${a * a}\pi}{${4 * k}}`)}.`),
          wrong: [
            wrong(m(piTex(F(a * a, 2 * k))), "This leaves out the factor $$\\frac{1}{2}$$ in the polar area formula."),
            wrong(m(F(a * a, 4 * k)), "The integral of $$\\sin^2$$ produces a factor of $$\\pi$$."),
            wrong(m(piTex(F(a, 4 * k))), "The radius must be squared."),
          ],
          explanation: t`One petal runs from ${m(t`\theta = 0`)} to ${m(t`\theta = \frac{\pi}{${k}}`)}, where ${m("r = 0")}. Using ${m(t`\sin^2 u = \frac{1 - \cos 2u}{2}`)}, the area is ${m(t`\frac{${a * a}}{2}\cdot\frac{\pi}{2\cdot ${k}} = ${piTex(F(a * a, 4 * k))}`)}.`,
        };
      }
      const a = r.int(2, 5);
      const b = r.int(1, a - 1);
      const fn = r.pick([t`\sin\theta`, t`\cos\theta`]);
      return {
        stem: `Which of the following gives the area of the region enclosed by the polar curve ${m(t`r = ${a} + ${b === 1 ? "" : b}${fn}`)}?`,
        correct: correct(m(t`\frac{1}{2}\int_0^{2\pi} \left(${a} + ${b === 1 ? "" : b}${fn}\right)^2 d\theta`), "Polar area is half the integral of $$r^2$$ over one full trace."),
        wrong: [
          wrong(m(t`\int_0^{2\pi} \left(${a} + ${b === 1 ? "" : b}${fn}\right)^2 d\theta`), "This leaves out the factor $$\\frac{1}{2}$$."),
          wrong(m(t`\frac{1}{2}\int_0^{2\pi} \left(${a} + ${b === 1 ? "" : b}${fn}\right) d\theta`), "The radius must be squared."),
          wrong(m(t`\frac{1}{2}\int_0^{\pi} \left(${a} + ${b === 1 ? "" : b}${fn}\right)^2 d\theta`), "Since $$r > 0$$ for every angle, the curve is traced once over $$[0, 2\\pi]$$, not $$[0, \\pi]$$."),
        ],
        explanation: t`${m(t`A = \frac{1}{2}\int_\alpha^\beta r^2\,d\theta`)}. Because ${m(t`${a} > ${b}`)}, ${m("r > 0")} for all ${m(t`\theta`)} and the curve closes after ${m(t`2\pi`)}.`,
      };
    },
  },
  {
    key: "bc-polar-area-calc",
    unit: 9,
    topics: ["polar-area-single", "polar-area-two-curves"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const a = r.int(2, 4);
      const c = r.pick([0.5, 1, 1.5]);
      const R = (th: number) => a + Math.sin(th) ** 2 * c + Math.cos(3 * th) / 2;
      const top = r.pick([Math.PI / 2, Math.PI]);
      const area = 0.5 * integrate((th) => R(th) ** 2, 0, top);
      const vals = [area, 2 * area, 0.5 * integrate(R, 0, top), area / Math.PI];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      const lim = top === Math.PI ? t`\pi` : t`\frac{\pi}{2}`;
      return {
        stem: `What is the area of the region bounded by the polar curve ${m(t`r = ${a} + ${c}\sin^2\theta + \frac{\cos 3\theta}{2}`)} and the rays ${m(t`\theta = 0`)} and ${m(t`\theta = ${lim}`)}?`,
        correct: correct(m(dec(area)), t`${m(t`\frac{1}{2}\int_0^{${lim}} r^2\,d\theta`)} on the calculator.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This leaves out the factor $$\\frac{1}{2}$$."),
          wrong(m(dec(vals[2]!)), "The radius must be squared."),
          wrong(m(dec(vals[3]!)), "This divides by $$\\pi$$, which is not part of the formula."),
        ],
        explanation: t`${m(t`A = \frac{1}{2}\int_0^{${lim}} \left(${a} + ${c}\sin^2\theta + \frac{\cos 3\theta}{2}\right)^2 d\theta \approx ${dec(area)}`)}.`,
      };
    },
  },
  {
    key: "bc-planar-distance-calc",
    unit: 9,
    topics: ["parametric-arc-length", "parametric-vector-motion"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const a = r.int(1, 3);
      const b = r.int(2, 5);
      const xp = (s: number) => a * Math.cos(s * s / 2);
      const yp = (s: number) => Math.exp(s / b);
      const T = r.int(1, 3);
      const dist = integrate((s) => Math.hypot(xp(s), yp(s)), 0, T);
      const vals = [dist, integrate(xp, 0, T) + integrate(yp, 0, T), Math.hypot(integrate(xp, 0, T), integrate(yp, 0, T)), Math.hypot(xp(T), yp(T))];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `A particle moves in the plane with ${m(t`x'(t) = ${a === 1 ? "" : a}\cos\left(\frac{t^2}{2}\right)`)} and ${m(t`y'(t) = e^{t/${b}}`)}. What is the total distance the particle travels from ${m("t = 0")} to ${m(t`t = ${T}`)}?`,
        correct: correct(m(dec(dist)), "Integrate the speed $$\\sqrt{x'(t)^2 + y'(t)^2}$$."),
        wrong: [
          wrong(m(dec(vals[1]!)), "This adds the component displacements instead of integrating the speed."),
          wrong(m(dec(vals[2]!)), "This is the straight-line distance between the start and end points."),
          wrong(m(dec(vals[3]!)), "This is the speed at the final time."),
        ],
        explanation: t`${m(t`\int_0^{${T}} \sqrt{x'(t)^2 + y'(t)^2}\,dt \approx ${dec(dist)}`)}.`,
      };
    },
  },
];

/** Known series for classification questions. */
const SERIES: { tex: string; status: "abs" | "cond" | "div"; why: string }[] = [
  { tex: t`\sum_{n=1}^{\infty} \frac{1}{n^2}`, status: "abs", why: "p-series with p = 2 > 1" },
  { tex: t`\sum_{n=1}^{\infty} \frac{1}{\sqrt{n}}`, status: "div", why: "p-series with p = 1/2 ≤ 1" },
  { tex: t`\sum_{n=1}^{\infty} \frac{1}{n}`, status: "div", why: "the harmonic series" },
  { tex: t`\sum_{n=1}^{\infty} \frac{(-1)^n}{n}`, status: "cond", why: "alternating series test, but the harmonic series diverges" },
  { tex: t`\sum_{n=1}^{\infty} \frac{(-1)^n}{n^3}`, status: "abs", why: "absolute values form a p-series with p = 3" },
  { tex: t`\sum_{n=0}^{\infty} \left(\frac{2}{3}\right)^n`, status: "abs", why: "geometric with |r| = 2/3 < 1" },
  { tex: t`\sum_{n=0}^{\infty} \left(\frac{5}{4}\right)^n`, status: "div", why: "geometric with |r| = 5/4 ≥ 1" },
  { tex: t`\sum_{n=1}^{\infty} \frac{n}{n + 1}`, status: "div", why: "terms approach 1, not 0 (nth term test)" },
  { tex: t`\sum_{n=1}^{\infty} \frac{(-1)^n}{\sqrt{n}}`, status: "cond", why: "alternating series test, but p = 1/2 for the absolute values" },
  { tex: t`\sum_{n=1}^{\infty} \frac{2^n}{n!}`, status: "abs", why: "ratio test gives L = 0" },
  { tex: t`\sum_{n=1}^{\infty} \frac{n!}{3^n}`, status: "div", why: "ratio test gives L = ∞" },
  { tex: t`\sum_{n=1}^{\infty} \frac{1}{n^2 + 4}`, status: "abs", why: "smaller than the convergent p-series with p = 2" },
  { tex: t`\sum_{n=1}^{\infty} \frac{n}{n^2 + 1}`, status: "div", why: "limit comparison with the harmonic series" },
  { tex: t`\sum_{n=1}^{\infty} \cos\left(\frac{1}{n}\right)`, status: "div", why: "terms approach 1 (nth term test)" },
];

export const bcUnit10: McqTemplate[] = [
  {
    key: "bc-geometric-sum",
    unit: 10,
    topics: ["geometric-series"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.nz(-6, 9);
      const rr = F(r.nz(-4, 4), r.int(2, 6));
      if (Math.abs(rr.value) >= 1) throw new Retry();
      const start = r.pick([0, 1]);
      const first = start === 0 ? F(a) : rr.mul(a);
      const ans = first.div(F(1).sub(rr));
      const w = [F(a).div(F(1).sub(rr)).equals(ans) ? rr.mul(a).div(F(1).sub(rr)) : F(a).div(F(1).sub(rr)), F(a).div(F(1).add(rr)), first.div(rr)];
      if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `What is the sum of ${m(t`\sum_{n=${start}}^{\infty} ${a === 1 ? "" : a === -1 ? "-" : a}\left(${rr.tex()}\right)^n`)}?`,
        correct: correct(m(ans), t`Geometric with first term ${m(first.tex())} and ratio ${m(rr.tex())}.`),
        wrong: [
          wrong(m(w[0]!), "The first term depends on the starting index; check the term for the first value of n."),
          wrong(m(w[1]!), "The formula is $$\\frac{a}{1 - r}$$, not $$\\frac{a}{1 + r}$$."),
          wrong(m(w[2]!), "This divides by $$r$$ instead of $$1 - r$$."),
        ],
        explanation: t`${m(t`|r| = \left|${rr.tex()}\right| < 1`)}, so the series converges to ${m(t`\frac{${first.tex()}}{1 - \left(${rr.tex()}\right)} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "bc-series-classify",
    unit: 10,
    topics: ["convergent-divergent-series", "harmonic-and-p-series", "comparison-tests", "nth-term-test", "ratio-test"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const picks = r.sample(SERIES, 3);
      const conv = picks.map((s) => s.status !== "div");
      const label = (mask: boolean[]) => {
        const names = ["I", "II", "III"].filter((_, i) => mask[i]);
        return names.length === 0 ? "None of them" : names.length === 3 ? "I, II, and III" : `${names.join(" and ")} only`;
      };
      const ans = label(conv);
      const masks = [[true, false, false], [false, true, false], [false, false, true], [true, true, false], [true, false, true], [false, true, true], [true, true, true], [false, false, false]];
      const others = r.shuffle(masks.map(label).filter((l) => l !== ans)).slice(0, 3);
      const list = picks.map((s, i) => `${["I", "II", "III"][i]}. ${m(s.tex)}`).join("\n\n");
      return {
        stem: `Which of the following series converge?\n\n${list}`,
        correct: correct(ans, picks.map((s, i) => `${["I", "II", "III"][i]}: ${s.status === "div" ? "diverges" : "converges"} (${s.why}).`).join(" ")),
        wrong: others.map((o) => wrong(o, "Check each series with an appropriate test: " + picks.map((s, i) => `${["I", "II", "III"][i]} ${s.status === "div" ? "diverges" : "converges"}`).join(", ") + ".")),
        explanation: picks.map((s, i) => `Series ${["I", "II", "III"][i]} ${s.status === "div" ? "diverges" : "converges"}: ${s.why}.`).join(" "),
      };
    },
  },
  {
    key: "bc-abs-conditional",
    unit: 10,
    topics: ["absolute-conditional-convergence", "alternating-series-test"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const s = r.pick(SERIES.filter((x) => x.tex.includes("(-1)")).concat(SERIES.filter((x) => x.status === "div" && x.tex.includes("n}{n + 1"))));
      const opts = { abs: "It converges absolutely.", cond: "It converges conditionally.", div: "It diverges.", none: "It converges, but to a negative sum only if the first term is negative." };
      return {
        stem: `Which of the following best describes ${m(s.tex)}?`,
        correct: correct(opts[s.status], `${s.why}.`),
        wrong: (["abs", "cond", "div", "none"] as const).filter((k) => k !== s.status).slice(0, 3).map((k) => wrong(opts[k], k === "none" ? "This statement is not a classification of convergence." : `Not this one: ${s.why}.`)),
        explanation: `Test the absolute values first, then the series itself: ${s.why}.`,
      };
    },
  },
  {
    key: "bc-radius",
    unit: 10,
    topics: ["radius-interval-of-convergence", "ratio-test"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const k = r.int(2, 6);
      const a = r.int(-3, 3);
      const xa = shiftBare("x", a);
      if (r.next() < 0.6) {
        return {
          stem: `What is the interval of convergence of ${m(t`\sum_{n=1}^{\infty} \frac{(${xa})^n}{n\cdot ${k}^n}`)}?`,
          correct: correct(m(t`${a - k} \leq x < ${a + k}`), `Ratio test gives $$|x ${a < 0 ? "+" : "-"} ${Math.abs(a)}| < ${k}$$; the left endpoint gives an alternating harmonic series (converges), the right endpoint the harmonic series (diverges).`.replace("|x - 0|", "|x|").replace("x - 0", "x")),
          wrong: [
            wrong(m(t`${a - k} < x < ${a + k}`), "The left endpoint gives $$\\sum \\frac{(-1)^n}{n}$$, which converges."),
            wrong(m(t`${a - k} < x \leq ${a + k}`), "The endpoints are reversed: the right endpoint gives the divergent harmonic series."),
            wrong(m(t`${a - 1} < x < ${a + 1}`), `The radius is ${k}, from the factor $$${k}^n$$.`),
          ],
          explanation: t`Ratio: ${m(t`\left|\frac{(${xa})^{n+1}}{(n + 1)${k}^{n+1}}\cdot\frac{n\,${k}^n}{(${xa})^n}\right| \to \frac{|${xa}|}{${k}}`)}, so ${m(t`|${xa}| < ${k}`)}. At ${m(t`x = ${a + k}`)}: ${m(t`\sum \frac{1}{n}`)} diverges. At ${m(t`x = ${a - k}`)}: ${m(t`\sum \frac{(-1)^n}{n}`)} converges.`,
        };
      }
      return {
        stem: `What is the radius of convergence of ${m(t`\sum_{n=0}^{\infty} \frac{n\,(${xa})^n}{${k}^n}`)}?`,
        correct: correct(m(k), t`The ratio test gives ${m(t`\frac{|${xa}|}{${k}} < 1`)}.`),
        wrong: [
          wrong(m(F(1, k)), "The radius is the reciprocal of this."),
          wrong(m(a === 0 ? 1 : Math.abs(a)), "The center is not the radius."),
          wrong(m(t`\infty`), "The series converges for all x only when the ratio limit is 0 for every x."),
        ],
        explanation: t`${m(t`\left|\frac{(n + 1)(${xa})^{n+1}}{${k}^{n+1}}\cdot\frac{${k}^n}{n(${xa})^n}\right| = \frac{n + 1}{n}\cdot\frac{|${xa}|}{${k}} \to \frac{|${xa}|}{${k}}`)}. Convergence needs this below 1, so ${m(t`R = ${k}`)}.`,
      };
    },
  },
  {
    key: "bc-taylor-coefficient",
    unit: 10,
    topics: ["taylor-polynomials", "taylor-maclaurin-series"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(-2, 3);
      const d = [r.int(-5, 5), r.nz(-6, 6), r.nz(-8, 8), r.nz(-12, 12)];
      const xa = a === 0 ? "x" : t`(${shiftBare("x", a)})`;
      if (r.next() < 0.5) {
        const ans = F(d[3]!, 6);
        const w = [F(d[3]!), F(d[3]!, 3), F(d[2]!, 2)];
        if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
        return {
          stem: `A function ${m("f")} has ${m(t`f(${a}) = ${d[0]}`)}, ${m(t`f'(${a}) = ${d[1]}`)}, ${m(t`f''(${a}) = ${d[2]}`)} and ${m(t`f'''(${a}) = ${d[3]}`)}. What is the coefficient of ${m(t`${xa}^3`)} in the Taylor polynomial for ${m("f")} about ${m(t`x = ${a}`)}?`,
          correct: correct(m(ans), t`${m(t`\frac{f'''(${a})}{3!} = \frac{${d[3]}}{6}`)}.`),
          wrong: [
            wrong(m(w[0]!), "This forgets to divide by $$3!$$."),
            wrong(m(w[1]!), "This divides by 3 instead of $$3! = 6$$."),
            wrong(m(w[2]!), "This is the coefficient of the squared term."),
          ],
          explanation: t`The coefficient of ${m(t`${xa}^k`)} is ${m(t`\frac{f^{(k)}(${a})}{k!}`)}; for ${m("k = 3")} it is ${m(t`\frac{${d[3]}}{6} = ${ans.tex()}`)}.`,
        };
      }
      const h = F(r.pick([1, 2, -1]), 10);
      const P2 = F(d[0]!).add(h.mul(d[1]!)).add(h.mul(h).mul(F(d[2]!, 2)));
      const w = [F(d[0]!).add(h.mul(d[1]!)).add(h.mul(h).mul(d[2]!)), F(d[0]!).add(h.mul(d[1]!)), F(d[0]!).add(h.mul(d[1]!)).add(h.mul(F(d[2]!, 2)))];
      if (w.some((v) => v.equals(P2)) || new Set(w.map(String)).size < 3) throw new Retry();
      const xv = dec(a + h.value, 1);
      return {
        stem: `A function ${m("f")} has ${m(t`f(${a}) = ${d[0]}`)}, ${m(t`f'(${a}) = ${d[1]}`)} and ${m(t`f''(${a}) = ${d[2]}`)}. Using the second-degree Taylor polynomial for ${m("f")} about ${m(t`x = ${a}`)}, what is the approximation of ${m(t`f(${xv})`)}?`,
        correct: correct(m(dec(P2.value, 3)), t`${m(t`P_2(${xv}) = ${d[0]} + (${d[1]})(${dec(h.value, 1)}) + \frac{${d[2]}}{2}(${dec(h.value, 1)})^2`)}.`),
        wrong: [
          wrong(m(dec(w[0]!.value, 3)), "This forgets to divide the second derivative by $$2!$$."),
          wrong(m(dec(w[1]!.value, 3)), "This is the tangent-line (first-degree) approximation."),
          wrong(m(dec(w[2]!.value, 3)), "The quadratic term must use $$(x - a)^2$$, not $$(x - a)$$."),
        ],
        explanation: t`${m(t`P_2(x) = ${d[0]} ${d[1]! < 0 ? "-" : "+"} ${Math.abs(d[1]!)}${xa} + \frac{${d[2]}}{2}${xa}^2`)}, evaluated at ${m(t`x = ${xv}`)}: ${m(dec(P2.value, 3))}.`,
      };
    },
  },
  {
    key: "bc-maclaurin-coefficient",
    unit: 10,
    topics: ["taylor-maclaurin-series", "representing-functions-power-series"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const k = r.int(2, 4);
      const kind = r.pick(["exp", "sin", "cos", "geo"] as const);
      let n = r.int(2, 5);
      let ans: Frac;
      let fn: string;
      if (kind === "exp") {
        fn = `e^{${k}x}`;
        ans = F(k ** n, fact(n));
      } else if (kind === "sin") {
        if (n % 2 === 0) n += 1;
        fn = t`\sin(${k}x)`;
        ans = F((-1) ** ((n - 1) / 2) * k ** n, fact(n));
      } else if (kind === "cos") {
        if (n % 2 === 1) n += 1;
        fn = t`\cos(${k}x)`;
        ans = F((-1) ** (n / 2) * k ** n, fact(n));
      } else {
        fn = t`\frac{1}{1 - ${k}x}`;
        ans = F(k ** n);
      }
      const sign = ans.n < 0 ? -1 : 1;
      const w = kind === "geo" ? [F(k ** n, fact(n)), ans.neg(), F(n * k)] : [F(sign * k ** n, n), ans.neg(), F(sign * k, fact(n))];
      if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `What is the coefficient of ${m(`x^{${n}}`)} in the Maclaurin series for ${m(`f(x) = ${fn}`)}?`,
        correct: correct(m(ans), "Substitute into the known Maclaurin series."),
        wrong: [
          wrong(m(w[0]!), kind === "geo" ? "The geometric series has no factorials." : "The denominator is $$n!$$, not $$n$$."),
          wrong(m(w[1]!), "Sign error: check the sign pattern of the series."),
          wrong(m(w[2]!), kind === "geo" ? "The coefficient is the ratio raised to the nth power." : "The constant must be raised to the same power as x."),
        ],
        explanation:
          kind === "geo"
            ? t`${m(t`\frac{1}{1 - u} = \sum u^n`)} with ${m(t`u = ${k}x`)}: the coefficient of ${m(`x^{${n}}`)} is ${m(t`${k}^{${n}} = ${ans.tex()}`)}.`
            : t`Replace ${m("x")} by ${m(t`${k}x`)} in the series for ${m(kind === "exp" ? "e^x" : kind === "sin" ? t`\sin x` : t`\cos x`)}: the ${m(`x^{${n}}`)} term is ${m(t`\frac{${ans.n < 0 ? "-" : ""}(${k}x)^{${n}}}{${n}!}`)}, so the coefficient is ${m(ans.tex())}.`,
      };
    },
  },
  {
    key: "bc-alt-error",
    unit: 10,
    topics: ["alternating-series-error-bound"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const p = r.int(1, 3);
      const N = r.int(3, 9);
      const ans = F(1, (N + 1) ** p);
      const w = [F(1, N ** p), F(1, (N + 2) ** p), F(1, (N + 1) ** (p + 1))];
      if (w.some((v) => v.equals(ans))) throw new Retry();
      return {
        stem: `The sum of ${m(t`\sum_{n=1}^{\infty} \frac{(-1)^{n+1}}{n^{${p}}}`.replace("n^{1}", "n"))} is approximated by its first ${N} terms. What is the smallest upper bound on the error given by the alternating series error bound?`,
        correct: correct(m(ans), "The error is at most the first omitted term."),
        wrong: [
          wrong(m(w[0]!), "This is the last term used, not the first one omitted."),
          wrong(m(w[1]!), "This skips a term: the bound is the very next term."),
          wrong(m(w[2]!), "The exponent stays the same as in the series."),
        ],
        explanation: t`The terms alternate, decrease in size and approach 0, so ${m(t`|S - S_{${N}}| \leq b_{${N + 1}} = \frac{1}{${N + 1}^{${p}}}`.replace(`^{1}}`, "}"))}.`,
      };
    },
  },
  {
    key: "bc-lagrange",
    unit: 10,
    topics: ["lagrange-error-bound"],
    skills: ["1"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const n = r.int(2, 4);
      const M = r.pick([2, 4, 6, 12, 24, 30]);
      const a = r.int(0, 2);
      const h = F(r.pick([1, 1, 2, 3]), r.pick([2, 10, 4]));
      const ans = F(M, fact(n + 1)).mul(F(h.n ** (n + 1), h.d ** (n + 1)));
      const w = [F(M, fact(n)).mul(F(h.n ** n, h.d ** n)), F(M).mul(F(h.n ** (n + 1), h.d ** (n + 1))), F(M, fact(n + 1)).mul(h)];
      if (w.some((v) => v.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      const xv = F(a).add(h);
      return {
        stem: `Let ${m(`P_{${n}}(x)`)} be the degree-${n} Taylor polynomial for ${m("f")} about ${m(t`x = ${a}`)}, and suppose ${m(t`|f^{(${n + 1})}(x)| \leq ${M}`)} for all ${m("x")}. What is the Lagrange error bound for ${m(t`|f(${xv.tex()}) - P_{${n}}(${xv.tex()})|`)}?`,
        correct: correct(m(ans), t`${m(t`\frac{${M}}{${n + 1}!}\left(${h.tex()}\right)^{${n + 1}}`)}.`),
        wrong: [
          wrong(m(w[0]!), "This uses the degree n instead of n + 1 for the factorial and power."),
          wrong(m(w[1]!), "This forgets to divide by $$(n + 1)!$$."),
          wrong(m(w[2]!), "The distance from the center must be raised to the power n + 1."),
        ],
        explanation: t`${m(t`|f(x) - P_{${n}}(x)| \leq \frac{M}{(${n} + 1)!}|x - ${a}|^{${n + 1}} = \frac{${M}}{${fact(n + 1)}}\left(${h.tex()}\right)^{${n + 1}} = ${ans.tex()}`)}.`,
      };
    },
  },
];

export { derivative, roots };
