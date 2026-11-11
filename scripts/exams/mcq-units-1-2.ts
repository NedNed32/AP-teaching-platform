import { coef, dec, derivative, F, Frac, joinTerms, m, poly, polyAt, shift, shiftBare, signed, type Rng } from "./lib";
import { correct, Retry, wrong, type McqTemplate } from "./types";

const t = String.raw;
const DNE = "The limit does not exist.";

// ---------------------------------------------------------------------------
// Unit 1: Limits and Continuity
// ---------------------------------------------------------------------------

export const unit1: McqTemplate[] = [
  {
    key: "u1-factor",
    unit: 1,
    topics: ["limits-algebraic-manipulation"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.nz(-5, 5);
      const b = r.nz(-6, 6);
      if (a === b || a - b === a + b) throw new Retry();
      const num = poly([1, -(a + b), a * b]);
      return {
        stem: `What is ${m(t`\lim_{x \to ${a}} \frac{${num}}{${shiftBare("x", a)}}`)}?`,
        correct: correct(m(a - b), t`The numerator factors as ${m(t`${shift("x", a)}${shift("x", b)}`)}. Cancel ${m(shiftBare("x", a))} and substitute: ${m(t`${a} - (${b}) = ${a - b}`)}.`),
        wrong: [
          wrong(m(0), t`Substituting gives ${m(t`\frac{0}{0}`)}, an indeterminate form, not the value 0.`),
          wrong(m(a + b), t`This adds the roots. After cancelling, the expression is ${m(shiftBare("x", b))}, which approaches ${m(a - b)}.`),
          wrong(DNE, "The expression is undefined at the point, but its outputs nearby approach a single number, so the limit exists."),
        ],
        explanation: t`Direct substitution gives ${m(t`\frac{0}{0}`)}, so factor: ${m(t`${num} = ${shift("x", a)}${shift("x", b)}`)}. For ${m(t`x \neq ${a}`)} the expression equals ${m(shiftBare("x", b))}, so the limit is ${m(t`${a} - (${b}) = ${a - b}`)}.`,
      };
    },
  },
  {
    key: "u1-rational-infinity",
    unit: 1,
    topics: ["limits-at-infinity-horizontal-asymptotes"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const p = r.nz(-6, 6);
      const s = r.int(1, 5);
      const q = r.nz(-9, 9);
      const u = r.nz(1, 9);
      const kind = r.pick(["equal", "lower", "higher"] as const);
      const lead = F(p, s);
      if (kind === "equal") {
        if (lead.equals(F(q, u))) throw new Retry();
        return {
          stem: `What is ${m(t`\lim_{x \to \infty} \frac{${poly([p, 0, q])}}{${poly([s, 0, u])}}`)}?`,
          correct: correct(m(lead), t`The degrees match, so the limit is the ratio of the leading coefficients, ${m(lead)}.`),
          wrong: [
            wrong(m(F(q, u)), "This is the ratio of the constant terms, which only matters as x approaches 0."),
            wrong(m(0), "The limit is 0 only when the denominator has the higher degree."),
            wrong(m(t`\infty`), "The outputs grow without bound only when the numerator has the higher degree."),
          ],
          explanation: t`Divide the numerator and denominator by ${m("x^2")}: the expression becomes ${m(t`\frac{${p} ${signed(q)}/x^2}{${s} + ${u}/x^2}`)}, which approaches ${m(lead)}.`,
        };
      }
      if (kind === "lower") {
        if (lead.equals(F(q, u))) throw new Retry();
        return {
          stem: `What is ${m(t`\lim_{x \to \infty} \frac{${poly([p, q])}}{${poly([s, 0, u])}}`)}?`,
          correct: correct(m(0), "The denominator has the higher degree, so it outgrows the numerator and the fraction approaches 0."),
          wrong: [
            wrong(m(lead), "Comparing leading coefficients only gives the limit when the degrees are equal."),
            wrong(m(F(q, u)), "This is the ratio of the constant terms, which only matters as x approaches 0."),
            wrong(m(t`\infty`), "The denominator grows faster than the numerator, so the fraction shrinks toward 0."),
          ],
          explanation: t`Dividing by ${m("x^2")} gives ${m(t`\frac{${p}/x ${signed(q)}/x^2}{${s} + ${u}/x^2}`)}. The numerator approaches 0 and the denominator approaches ${m(s)}, so the limit is 0.`,
        };
      }
      const pp = Math.abs(p);
      return {
        stem: `What is ${m(t`\lim_{x \to \infty} \frac{${poly([pp, 0, 0, q])}}{${poly([s, 0, u])}}`)}?`,
        correct: correct(m(t`\infty`), "The numerator has the higher degree and positive leading coefficients, so the outputs grow without bound."),
        wrong: [
          wrong(m(F(pp, s)), "Comparing leading coefficients only gives the limit when the degrees are equal."),
          wrong(m(0), "The limit is 0 only when the denominator has the higher degree."),
          wrong(m(F(q, u)), "This is the ratio of the constant terms, which only matters as x approaches 0."),
        ],
        explanation: t`For large ${m("x")} the expression behaves like ${m(t`\frac{${pp}x^3}{${s}x^2} = ${coef(F(pp, s), "x")}`)}, which grows without bound.`,
      };
    },
  },
  {
    key: "u1-piecewise",
    unit: 1,
    topics: ["defining-limits", "representations-of-limits"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.int(-3, 4);
      const m1 = r.nz(-4, 4);
      const c1 = r.int(-6, 6);
      const m2 = r.nz(-4, 4);
      const c2 = r.int(-6, 6);
      const L1 = m1 * a + c1;
      const L2 = m2 * a + c2;
      if (L1 === L2) throw new Retry();
      const def = t`f(x) = \begin{cases} ${poly([m1, c1])} & x < ${a} \\ ${poly([m2, c2])} & x \geq ${a} \end{cases}`;
      if (r.next() < 0.5) {
        const avg = F(L1 + L2, 2);
        if (avg.equals(L1) || avg.equals(L2)) throw new Retry();
        return {
          stem: `Let ${m(def)}. What is ${m(t`\lim_{x \to ${a}} f(x)`)}?`,
          correct: correct(DNE, t`The left-hand limit is ${m(L1)} and the right-hand limit is ${m(L2)}. They differ, so the two-sided limit does not exist.`),
          wrong: [
            wrong(m(L2), t`This is ${m(t`f(${a})`)} and the right-hand limit only. The left-hand limit is ${m(L1)}.`),
            wrong(m(L1), t`This is the left-hand limit only. The right-hand limit is ${m(L2)}.`),
            wrong(m(avg), "A limit is never the average of the one-sided limits. When they differ, the limit does not exist."),
          ],
          explanation: t`From the left, ${m(t`f(x) = ${poly([m1, c1])} \to ${L1}`)}. From the right, ${m(t`f(x) = ${poly([m2, c2])} \to ${L2}`)}. Since ${m(t`${L1} \neq ${L2}`)}, ${m(t`\lim_{x \to ${a}} f(x)`)} does not exist.`,
        };
      }
      return {
        stem: `Let ${m(def)}. What is ${m(t`\lim_{x \to ${a}^-} f(x)`)}?`,
        correct: correct(m(L1), t`For ${m(t`x < ${a}`)}, ${m(t`f(x) = ${poly([m1, c1])}`)}, which approaches ${m(L1)}.`),
        wrong: [
          wrong(m(L2), t`This is the right-hand limit (and ${m(t`f(${a})`)}). The left-hand limit uses the formula for ${m(t`x < ${a}`)}.`),
          wrong(DNE, "One-sided limits can exist even when the two-sided limit does not."),
          wrong(m(c1 === L1 ? L1 + m1 : c1), "This value doesn't come from substituting the approach point into the left-hand formula."),
        ],
        explanation: t`The left-hand limit uses the piece for ${m(t`x < ${a}`)}: ${m(t`${poly([m1, c1]).replace("x", `(${a})`)} = ${L1}`)}.`,
      };
    },
  },
  {
    key: "u1-continuity-k",
    unit: 1,
    topics: ["continuity-at-a-point", "removing-discontinuities"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.pick([1, 2, 3, -1, -2]);
      const k = r.nz(-5, 5);
      const d = r.int(-5, 5);
      const c = a * a + d - k * a;
      const wrongs = [F(a * a + d + c, a), F(2 * a), F(a * a + d - c)];
      const kk = F(k);
      if (wrongs.some((w) => w.equals(kk)) || new Set(wrongs.map(String)).size < 3) throw new Retry();
      return {
        stem: `Let ${m(t`f(x) = \begin{cases} kx ${signed(c)} & x < ${a} \\ ${poly([1, 0, d])} & x \geq ${a} \end{cases}`)} where ${m("k")} is a constant. For what value of ${m("k")} is ${m("f")} continuous at ${m(t`x = ${a}`)}?`,
        correct: correct(m(k), t`Continuity needs ${m(t`k(${a}) ${signed(c)} = (${a})^2 ${signed(d)}`)}, which gives ${m(t`k = ${k}`)}.`),
        wrong: [
          wrong(m(wrongs[0]!), "This comes from a sign error when moving the constant term across the equation."),
          wrong(m(wrongs[1]!), "This matches the slopes of the two pieces, which is the condition for differentiability, not continuity."),
          wrong(m(wrongs[2]!), t`This forgets to divide by ${m(a)} when solving for ${m("k")}.`),
        ],
        explanation: t`${m("f")} is continuous at ${m(a)} when the left-hand limit equals ${m(t`f(${a}) = ${a * a + d}`)}. The left-hand limit is ${m(t`${a}k ${signed(c)}`)}, so ${m(t`${a}k ${signed(c)} = ${a * a + d}`)} and ${m(t`k = ${k}`)}.`,
      };
    },
  },
  {
    key: "u1-trig-limit",
    unit: 1,
    topics: ["selecting-limit-procedures", "squeeze-theorem"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const k = r.int(2, 9);
      const n = r.int(2, 9);
      if (k === n) throw new Retry();
      const top = r.pick([t`\sin`, t`\tan`]);
      return {
        stem: `What is ${m(t`\lim_{x \to 0} \frac{${top}(${k}x)}{${n}x}`)}?`,
        correct: correct(m(F(k, n)), t`Write it as ${m(t`\frac{${k}}{${n}} \cdot \frac{${top}(${k}x)}{${k}x}`)}; the second factor approaches 1.`),
        wrong: [
          wrong(m(1), t`${m(t`\frac{${top} u}{u} \to 1`)} only when the angle and the denominator match. Here they differ by a factor of ${m(t`\frac{${k}}{${n}}`)}.`),
          wrong(m(F(n, k)), "This inverts the ratio of the coefficients."),
          wrong(m(0), t`Substitution gives ${m(t`\frac{0}{0}`)}, which is indeterminate, not 0.`),
        ],
        explanation: t`Using ${m(t`\lim_{u \to 0} \frac{${top} u}{u} = 1`)} with ${m(t`u = ${k}x`)}: ${m(t`\frac{${top}(${k}x)}{${n}x} = \frac{${k}}{${n}} \cdot \frac{${top}(${k}x)}{${k}x} \to \frac{${k}}{${n}}`)}.`,
      };
    },
  },
  {
    key: "u1-asymptote",
    unit: 1,
    topics: ["infinite-limits-vertical-asymptotes", "types-of-discontinuities"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const [a, b, c] = r.sample([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], 3) as [number, number, number];
      const num = poly([1, -(a + b), a * b]);
      const den = poly([1, -(a + c), a * c]);
      return {
        stem: `Let ${m(t`f(x) = \frac{${num}}{${den}}`)}. Which of the following lists every vertical asymptote of the graph of ${m("f")}?`,
        correct: correct(m(t`x = ${c}`), t`The factor ${m(shiftBare("x", a))} cancels, leaving a hole at ${m(t`x = ${a}`)}. Only ${m(t`x = ${c}`)} makes the simplified denominator zero.`),
        wrong: [
          wrong(m(t`x = ${a} \text{ and } x = ${c}`), t`At ${m(t`x = ${a}`)} the numerator is also zero; the common factor cancels, giving a removable discontinuity (a hole), not an asymptote.`),
          wrong(m(t`x = ${a}`), t`${m(t`x = ${a}`)} is a hole, because its factor cancels.`),
          wrong(m(t`x = ${b}`), t`${m(t`x = ${b}`)} is a zero of the numerator, so it is an x-intercept, not an asymptote.`),
        ],
        explanation: t`Factor: ${m(t`f(x) = \frac{${shift("x", a)}${shift("x", b)}}{${shift("x", a)}${shift("x", c)}}`)}. The common factor gives a hole at ${m(t`x = ${a}`)}; near ${m(t`x = ${c}`)} the denominator approaches 0 while the numerator does not, so ${m(t`x = ${c}`)} is the only vertical asymptote.`,
      };
    },
  },
  {
    key: "u1-ivt",
    unit: 1,
    topics: ["intermediate-value-theorem", "continuity-over-an-interval"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const xs = [0, 1, 2, 3, 4];
      const ys = xs.map(() => r.nz(-6, 6));
      let changes = 0;
      for (let i = 1; i < ys.length; i++) if (ys[i - 1]! * ys[i]! < 0) changes++;
      if (changes < 1 || changes > 3) throw new Retry();
      const counts = [changes - 1, changes, changes + 1, changes + 2].filter((n) => n >= 0);
      while (counts.length < 4) counts.push(counts[counts.length - 1]! + 1);
      return {
        stimulus: {
          text: "The function $$f$$ is continuous on the closed interval $$[0, 4]$$. Selected values of $$f$$ are shown in the table.",
          table: { caption: "Values of f", columns: [{ key: "x", label: "$$x$$" }, { key: "fx", label: "$$f(x)$$" }], rows: xs.map((x, i) => ({ x, fx: ys[i]! })) },
        },
        stem: `What is the least number of solutions that the equation ${m("f(x) = 0")} must have on the interval ${m("[0, 4]")}?`,
        ordered: true,
        correct: correct(m(changes), `The sign of $$f$$ changes ${changes} time${changes === 1 ? "" : "s"} between consecutive table values, and the Intermediate Value Theorem guarantees a zero in each such interval.`),
        wrong: counts.filter((n) => n !== changes).slice(0, 3).map((n) =>
          wrong(m(n), n < changes ? "This undercounts: each sign change between consecutive values guarantees its own zero." : "The IVT only guarantees zeros where the sign changes; other zeros are possible but not required."),
        ),
        explanation: `Because $$f$$ is continuous, the Intermediate Value Theorem guarantees a solution of $$f(x) = 0$$ on every interval where the values change sign. Counting the sign changes in the table gives ${changes}.`,
      };
    },
  },
  {
    key: "u1-table-limit",
    unit: 1,
    topics: ["limits-from-tables"],
    skills: ["2"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const a = r.int(-3, 5);
      const L = r.int(-6, 9);
      const disagree = r.next() < 0.35;
      const R = disagree ? L + r.pick([-3, -2, 2, 3]) : L;
      const hs = [0.1, 0.01, 0.001];
      const rows = [
        ...hs.map((h) => ({ x: Number((a - h).toFixed(3)), fx: Number((L - h).toFixed(3)) })),
        ...hs.reverse().map((h) => ({ x: Number((a + h).toFixed(3)), fx: Number((R + h).toFixed(3)) })),
      ];
      const stimulus = {
        text: `The function $$f$$ is defined for all real numbers except $$x = ${a}$$. Selected values of $$f$$ are shown.`,
        table: { caption: `Values of f near x = ${a}`, columns: [{ key: "x", label: "$$x$$" }, { key: "fx", label: "$$f(x)$$" }], rows },
      };
      const stem = `Based on the table, which of the following is the best estimate of ${m(t`\lim_{x \to ${a}} f(x)`)}?`;
      if (disagree) {
        return {
          stimulus,
          stem,
          correct: correct(DNE, `From the left the outputs approach ${L}; from the right they approach ${R}. The one-sided limits differ.`),
          wrong: [
            wrong(m(L), "This is only the left-hand trend."),
            wrong(m(R), "This is only the right-hand trend."),
            wrong(m(F(L + R, 2)), "Averaging the two sides is never how a limit is found."),
          ],
          explanation: `Read the table toward $$x = ${a}$$ from each side. The left side approaches ${L} and the right side approaches ${R}, so the two-sided limit does not exist.`,
        };
      }
      return {
        stimulus,
        stem,
        correct: correct(m(L), `Both sides close in on ${L}.`),
        wrong: [
          wrong(m(dec(L - 0.001, 3)), "This is a single table value. The limit is the value the outputs approach."),
          wrong(m(dec(L + 0.1, 1)), "This is the output farthest from the point, not the trend."),
          wrong(`The limit does not exist, because $$f(${a})$$ is undefined.`, "A limit depends on the values near the point, not at it."),
        ],
        explanation: `As $$x$$ approaches ${a} from either side, $$f(x)$$ approaches ${L}. Whether $$f(${a})$$ is defined does not matter.`,
      };
    },
  },
  {
    key: "u1-conjugate",
    unit: 1,
    topics: ["limits-algebraic-manipulation", "selecting-limit-procedures"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(1, 6);
      return {
        stem: `What is ${m(t`\lim_{x \to 0} \frac{\sqrt{x + ${a * a}} - ${a}}{x}`)}?`,
        correct: correct(m(F(1, 2 * a)), t`Rationalizing gives ${m(t`\frac{1}{\sqrt{x + ${a * a}} + ${a}}`)}, which approaches ${m(t`\frac{1}{${2 * a}}`)}.`),
        wrong: [
          wrong(m(F(1, a)), t`This forgets that the conjugate denominator is ${m(t`\sqrt{x + ${a * a}} + ${a}`)}, which approaches ${m(2 * a)}, not ${m(a)}.`),
          wrong(m(0), t`Substitution gives ${m(t`\frac{0}{0}`)}, an indeterminate form.`),
          wrong(DNE, "The expression is undefined at 0, but rationalizing shows the outputs approach a single number."),
        ],
        explanation: t`Multiply by ${m(t`\frac{\sqrt{x + ${a * a}} + ${a}}{\sqrt{x + ${a * a}} + ${a}}`)}. The numerator becomes ${m("x")}, which cancels, leaving ${m(t`\frac{1}{\sqrt{x + ${a * a}} + ${a}} \to \frac{1}{${2 * a}}`)}.`,
      };
    },
  },
  {
    key: "u1-squeeze",
    unit: 1,
    topics: ["squeeze-theorem"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const c = r.int(-3, 4);
      const L = r.int(-5, 8);
      const k = r.int(1, 4);
      if (L === c || L === 0 || 2 * L === c) throw new Retry();
      const sq = t`k(x ${c < 0 ? "+" : "-"} ${Math.abs(c)})^2`.replace("k", k === 1 ? "" : String(k));
      const sqTerm = c === 0 ? coef(k, "x^2") : sq;
      return {
        stem: `The functions ${m("f")}, ${m("g")}, and ${m("h")} satisfy ${m(t`g(x) \leq f(x) \leq h(x)`)} for all ${m("x")}, where ${m(t`g(x) = ${L} - ${sqTerm}`)} and ${m(t`h(x) = ${L} + ${sqTerm}`)}. What is ${m(t`\lim_{x \to ${c}} f(x)`)}?`,
        correct: correct(m(L), t`Both ${m("g")} and ${m("h")} approach ${m(L)} as ${m(t`x \to ${c}`)}, so the Squeeze Theorem forces ${m("f")} to approach ${m(L)} too.`),
        wrong: [
          wrong(m(c), "This is the input value being approached, not the output."),
          wrong(m(2 * L), t`This adds the limits of ${m("g")} and ${m("h")}; the squeeze gives their common value.`),
          wrong("It cannot be determined without a formula for $$f$$.", "The Squeeze Theorem determines the limit without a formula for $$f$$, because the bounds share the same limit."),
        ],
        explanation: t`${m(t`\lim_{x \to ${c}} g(x) = ${L}`)} and ${m(t`\lim_{x \to ${c}} h(x) = ${L}`)}. Since ${m("f")} is trapped between them, the Squeeze Theorem gives ${m(t`\lim_{x \to ${c}} f(x) = ${L}`)}.`,
      };
    },
  },
  {
    key: "u1-removable-calc",
    unit: 1,
    topics: ["removing-discontinuities", "limits-from-tables"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const k = r.int(2, 5);
      const n = r.int(2, 6);
      if (k === n) throw new Retry();
      // g(x) = sin(kx) / (e^{nx} - 1), limit k/n at 0.
      const value = k / n;
      return {
        stem: `The function ${m("g")} is defined by ${m(t`g(x) = \frac{\sin(${k}x)}{e^{${n}x} - 1}`)} for ${m(t`x \neq 0`)}. For what value of ${m(t`g(0)`)} is ${m("g")} continuous at ${m("x = 0")}?`,
        correct: correct(m(dec(value)), t`Evaluating ${m("g")} at inputs very close to 0 (or using the limits of ${m(t`\frac{\sin u}{u}`)} and ${m(t`\frac{e^u - 1}{u}`)}) gives ${m(t`\frac{${k}}{${n}}`)}.`),
        wrong: [
          wrong(m(dec(n / k)), "This inverts the ratio."),
          wrong(m("1.000"), "The two small quantities do not shrink at the same rate."),
          wrong(m("0.000"), t`Substitution gives ${m(t`\frac{0}{0}`)}, which is indeterminate, not 0.`),
        ],
        explanation: t`For continuity, ${m("g(0)")} must equal ${m(t`\lim_{x \to 0} g(x)`)}. Near 0, ${m(t`\sin(${k}x) \approx ${k}x`)} and ${m(t`e^{${n}x} - 1 \approx ${n}x`)}, so the limit is ${m(t`\frac{${k}}{${n}} \approx ${dec(value)}`)}. A table of values near 0 confirms it.`,
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 2: Differentiation: Definition and Fundamental Properties
// ---------------------------------------------------------------------------

const calcFunctions = [
  { tex: t`x \sin x`, f: (x: number) => x * Math.sin(x), alt: (x: number) => Math.cos(x), altWhy: "This multiplies the derivatives of the factors instead of using the product rule." },
  { tex: t`\frac{e^{x}}{1 + x^2}`, f: (x: number) => Math.exp(x) / (1 + x * x), alt: (x: number) => Math.exp(x) / (2 * x), altWhy: "This divides the derivatives of the numerator and denominator instead of using the quotient rule." },
  { tex: t`\sqrt{x}\,\cos x`, f: (x: number) => Math.sqrt(x) * Math.cos(x), alt: (x: number) => -Math.sin(x) / (2 * Math.sqrt(x)), altWhy: "This multiplies the derivatives of the factors instead of using the product rule." },
  { tex: t`\ln(x^2 + 1)`, f: (x: number) => Math.log(x * x + 1), alt: (x: number) => 1 / (x * x + 1), altWhy: "This leaves out the derivative of the inside function, 2x." },
  { tex: t`x^2 e^{-x}`, f: (x: number) => x * x * Math.exp(-x), alt: (x: number) => -2 * x * Math.exp(-x), altWhy: "This multiplies the derivatives of the factors instead of using the product rule." },
];

export const unit2: McqTemplate[] = [
  {
    key: "u2-power-at",
    unit: 2,
    topics: ["power-rule", "basic-derivative-rules"],
    skills: ["1"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const c = [r.nz(-4, 4), r.int(-5, 5), r.nz(-7, 7), r.nz(-9, 9)];
      const k = r.nz(-2, 3);
      const d = [3 * c[0]!, 2 * c[1]!, c[2]!];
      const ans = polyAt(d, k);
      const fk = polyAt(c, k);
      const noLinear = ans - c[2]!;
      const keepConst = ans + c[3]!;
      if (new Set([ans, fk, noLinear, keepConst]).size < 4) throw new Retry();
      return {
        stem: `If ${m(t`f(x) = ${poly(c)}`)}, what is ${m(t`f'(${k})`)}?`,
        correct: correct(m(ans), t`${m(t`f'(x) = ${poly(d)}`)}, so ${m(t`f'(${k}) = ${ans}`)}.`),
        wrong: [
          wrong(m(fk), t`This is ${m(t`f(${k})`)}, the value of the function, not its derivative.`),
          wrong(m(noLinear), "This drops the derivative of the linear term, which is its coefficient."),
          wrong(m(keepConst), "The derivative of a constant is 0; this keeps the constant term."),
        ],
        explanation: t`By the power rule, ${m(t`f'(x) = ${poly(d)}`)}. Substituting ${m(t`x = ${k}`)} gives ${m(ans)}.`,
      };
    },
  },
  {
    key: "u2-limit-definition",
    unit: 2,
    topics: ["defining-the-derivative"],
    skills: ["2", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const kind = r.pick(["power", "ln", "trig"] as const);
      if (kind === "power") {
        const n = r.int(2, 4);
        const a = r.int(2, 4);
        const ans = n * a ** (n - 1);
        return {
          stem: `What is ${m(t`\lim_{h \to 0} \frac{(${a} + h)^{${n}} - ${a ** n}}{h}`)}?`,
          correct: correct(m(ans), t`This is the derivative of ${m(t`x^{${n}}`)} at ${m(t`x = ${a}`)}: ${m(t`${n}(${a})^{${n - 1}} = ${ans}`)}.`),
          wrong: [
            wrong(m(a ** n), t`This is the function value ${m(t`${a}^{${n}}`)}, not the derivative.`),
            wrong(m(0), t`Substitution gives ${m(t`\frac{0}{0}`)}; the limit is the derivative, not 0.`),
            wrong(m(n * a ** n), "This multiplies by the exponent without lowering it."),
          ],
          explanation: t`The expression is ${m(t`\lim_{h \to 0} \frac{f(${a} + h) - f(${a})}{h}`)} for ${m(t`f(x) = x^{${n}}`)}, which is ${m(t`f'(${a}) = ${n} \cdot ${a}^{${n - 1}} = ${ans}`)}.`,
        };
      }
      if (kind === "ln") {
        const a = r.int(2, 7);
        return {
          stem: `What is ${m(t`\lim_{h \to 0} \frac{\ln(${a} + h) - \ln ${a}}{h}`)}?`,
          correct: correct(m(F(1, a)), t`This is the derivative of ${m(t`\ln x`)} at ${m(a)}, which is ${m(t`\frac{1}{${a}}`)}.`),
          wrong: [
            wrong(m(t`\ln ${a}`), "This is the function value, not the derivative."),
            wrong(m(0), t`Substitution gives ${m(t`\frac{0}{0}`)}, an indeterminate form.`),
            wrong(m(a), t`The derivative of ${m(t`\ln x`)} is ${m(t`\frac{1}{x}`)}, not ${m("x")}.`),
          ],
          explanation: t`By the definition of the derivative, the limit is ${m(t`f'(${a})`)} for ${m(t`f(x) = \ln x`)}, so it equals ${m(t`\frac{1}{${a}}`)}.`,
        };
      }
      const options = [
        { fn: t`\sin`, at: t`\frac{\pi}{3}`, ans: t`\frac{1}{2}`, val: t`\frac{\sqrt{3}}{2}`, neg: t`-\frac{1}{2}` },
        { fn: t`\sin`, at: t`\frac{\pi}{6}`, ans: t`\frac{\sqrt{3}}{2}`, val: t`\frac{1}{2}`, neg: t`-\frac{\sqrt{3}}{2}` },
        { fn: t`\cos`, at: t`\frac{\pi}{6}`, ans: t`-\frac{1}{2}`, val: t`\frac{\sqrt{3}}{2}`, neg: t`\frac{1}{2}` },
        { fn: t`\cos`, at: t`\frac{\pi}{3}`, ans: t`-\frac{\sqrt{3}}{2}`, val: t`\frac{1}{2}`, neg: t`\frac{\sqrt{3}}{2}` },
      ];
      const o = r.pick(options);
      return {
        stem: `What is ${m(t`\lim_{h \to 0} \frac{${o.fn}\left(${o.at} + h\right) - ${o.fn}\left(${o.at}\right)}{h}`)}?`,
        correct: correct(m(o.ans), t`The limit is the derivative of ${m(t`${o.fn} x`)} at ${m(o.at)}.`),
        wrong: [
          wrong(m(o.val), "This is the function value at the point, not the derivative."),
          wrong(m(o.neg), t`Sign error: ${m(t`\frac{d}{dx}\sin x = \cos x`)} and ${m(t`\frac{d}{dx}\cos x = -\sin x`)}.`),
          wrong(m(0), t`Substitution gives ${m(t`\frac{0}{0}`)}, an indeterminate form.`),
        ],
        explanation: t`The expression is the definition of ${m(t`f'\left(${o.at}\right)`)} for ${m(t`f(x) = ${o.fn} x`)}, which equals ${m(o.ans)}.`,
      };
    },
  },
  {
    key: "u2-product",
    unit: 2,
    topics: ["product-rule"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const n = r.int(2, 5);
      return {
        stem: `If ${m(t`f(x) = x^{${n}} e^{x}`)}, what is ${m("f'(1)")}?`,
        correct: correct(m(`${n + 1}e`), t`${m(t`f'(x) = ${n}x^{${n - 1}}e^x + x^{${n}}e^x`)}, so ${m(t`f'(1) = ${n}e + e = ${n + 1}e`)}.`),
        wrong: [
          wrong(m(`${n}e`), "This is the derivative of the first factor times the second, without the second term of the product rule."),
          wrong(m("e"), "This differentiates only the exponential factor."),
          wrong(m(n), "This multiplies the derivatives of the two factors and then drops the exponential."),
        ],
        explanation: t`By the product rule, ${m(t`f'(x) = ${n}x^{${n - 1}}e^x + x^{${n}}e^x = x^{${n - 1}}e^x(x + ${n})`)}. At ${m("x = 1")}, ${m(t`f'(1) = e(1 + ${n}) = ${n + 1}e`)}.`,
      };
    },
  },
  {
    key: "u2-quotient",
    unit: 2,
    topics: ["quotient-rule"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const [a, b, c, d] = [r.nz(-5, 5), r.int(-6, 6), r.nz(-4, 4), r.nz(-6, 6)];
      const k = r.int(-2, 2);
      const den = c * k + d;
      const det = a * d - b * c;
      if (den === 0 || det === 0) throw new Retry();
      const ans = F(det, den * den);
      const w = [F(-det, den * den), F(a, c), F(det, den)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `If ${m(t`f(x) = \frac{${poly([a, b])}}{${poly([c, d])}}`)}, what is ${m(t`f'(${k})`)}?`,
        correct: correct(m(ans), t`The quotient rule gives ${m(t`f'(x) = \frac{${det}}{(${poly([c, d])})^2}`)}, and at ${m(t`x = ${k}`)} the denominator is ${m(den * den)}.`),
        wrong: [
          wrong(m(w[0]!), "This subtracts in the wrong order: the quotient rule is (bottom · top′ − top · bottom′) / bottom²."),
          wrong(m(w[1]!), "This divides the derivative of the numerator by the derivative of the denominator, which is not the quotient rule."),
          wrong(m(w[2]!), "This forgets to square the denominator."),
        ],
        explanation: t`${m(t`f'(x) = \frac{(${poly([c, d])})(${a}) - (${poly([a, b])})(${c})}{(${poly([c, d])})^2} = \frac{${det}}{(${poly([c, d])})^2}`)}. At ${m(t`x = ${k}`)}: ${m(t`\frac{${det}}{${den * den}}`)}${ans.d === den * den ? "" : t` ${m(t`= ${ans.tex()}`)}`}.`,
      };
    },
  },
  {
    key: "u2-tangent-line",
    unit: 2,
    topics: ["defining-the-derivative", "power-rule"],
    skills: ["1", "2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const b = r.int(-5, 5);
      const c = r.int(-6, 6);
      const a = r.nz(-3, 3);
      const fa = a * a + b * a + c;
      const s = 2 * a + b;
      if (s === 0 || s === fa || fa === a) throw new Retry();
      const line = (slope: number, x0: number, y0: number) => t`y ${y0 < 0 ? "+" : "-"} ${Math.abs(y0)} = ${slope}${shift("x", x0)}`;
      return {
        stem: `Which of the following is an equation of the line tangent to the graph of ${m(t`f(x) = ${poly([1, b, c])}`)} at ${m(t`x = ${a}`)}?`,
        correct: correct(m(line(s, a, fa)), t`The point is ${m(t`(${a}, ${fa})`)} and the slope is ${m(t`f'(${a}) = ${s}`)}.`),
        wrong: [
          wrong(m(line(fa, a, fa)), t`This uses the function value ${m(fa)} as the slope.`),
          wrong(m(line(s, fa, a)), "This swaps the x- and y-coordinates of the point of tangency."),
          wrong(m(line(2 * a, a, fa)), t`This slope drops the derivative of ${m(coef(b, "x"))}.`),
        ],
        explanation: t`${m(t`f(${a}) = ${fa}`)} and ${m(t`f'(x) = ${poly([2, b])}`)}, so ${m(t`f'(${a}) = ${s}`)}. Point-slope form: ${m(line(s, a, fa))}.`,
      };
    },
  },
  {
    key: "u2-differentiability",
    unit: 2,
    topics: ["differentiability-and-continuity"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(-2, 3);
      const p = r.int(-4, 4);
      const kind = r.pick(["both", "cont-only", "neither"] as const);
      let slope = 2 * a;
      let q = a * a + p - slope * a;
      if (kind === "cont-only") {
        slope = 2 * a + r.nz(-3, 3);
        q = a * a + p - slope * a;
      } else if (kind === "neither") {
        q += r.nz(-3, 3);
      }
      const S = {
        both: "$$f$$ is continuous and differentiable at $$x = " + a + "$$.",
        cont: "$$f$$ is continuous but not differentiable at $$x = " + a + "$$.",
        diff: "$$f$$ is differentiable but not continuous at $$x = " + a + "$$.",
        neither: "$$f$$ is neither continuous nor differentiable at $$x = " + a + "$$.",
      };
      const right = poly([slope, q]);
      const stem = `Let ${m(t`f(x) = \begin{cases} ${poly([1, 0, p])} & x \leq ${a} \\ ${right} & x > ${a} \end{cases}`)}. Which of the following is true?`;
      const leftVal = a * a + p;
      const rightVal = slope * a + q;
      const reason = t`The left piece gives ${m(t`f(${a}) = ${leftVal}`)} with slope ${m(2 * a)}; the right piece approaches ${m(rightVal)} with slope ${m(slope)}.`;
      const diffWhy = wrong(S.diff, "Differentiability implies continuity, so this can never happen.");
      if (kind === "both") {
        return {
          stem,
          correct: correct(S.both, `${reason} The values and the slopes both match.`),
          wrong: [wrong(S.cont, "The one-sided slopes match, so there is no corner."), diffWhy, wrong(S.neither, "The one-sided limits match, so $$f$$ is continuous.")],
          explanation: `${reason} Matching values give continuity, and matching one-sided derivatives give differentiability.`,
        };
      }
      if (kind === "cont-only") {
        return {
          stem,
          correct: correct(S.cont, `${reason} The values match but the slopes do not, so the graph has a corner.`),
          wrong: [wrong(S.both, "The one-sided slopes differ, so $$f$$ is not differentiable."), diffWhy, wrong(S.neither, "The one-sided limits match, so $$f$$ is continuous.")],
          explanation: `${reason} The values agree (continuous), but the one-sided derivatives disagree (not differentiable).`,
        };
      }
      return {
        stem,
        correct: correct(S.neither, `${reason} The one-sided limits differ, so $$f$$ is not continuous, and therefore not differentiable.`),
        wrong: [wrong(S.both, "The one-sided limits differ, so $$f$$ has a jump."), diffWhy, wrong(S.cont, "The one-sided limits differ, so $$f$$ is not continuous.")],
        explanation: `${reason} A jump discontinuity rules out continuity, and a function that isn't continuous at a point can't be differentiable there.`,
      };
    },
  },
  {
    key: "u2-average-rate",
    unit: 2,
    topics: ["average-and-instantaneous-rates", "estimating-derivatives"],
    skills: ["2"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const ts = [0, 2, 5, 7, 10];
      const vs = ts.map(() => r.int(10, 60));
      const [i, j] = r.pick([[0, 2], [1, 3], [2, 4], [0, 3], [1, 4]] as const);
      const dv = vs[j]! - vs[i]!;
      const dt = ts[j]! - ts[i]!;
      const ans = F(dv, dt);
      const w = [F(dv), F(dt, dv === 0 ? 1 : dv), F(vs[j]! + vs[i]!, 2)];
      if (dv === 0 || w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stimulus: {
          text: "The temperature of a liquid, in degrees Celsius, is modeled by a differentiable function $$H$$ of time $$t$$, in minutes. Selected values are shown.",
          table: { caption: "Temperature H(t)", columns: [{ key: "t", label: "$$t$$ (minutes)" }, { key: "h", label: "$$H(t)$$ (°C)" }], rows: ts.map((tt, k) => ({ t: tt, h: vs[k]! })) },
        },
        stem: `What is the average rate of change of ${m("H")} over the interval ${m(t`${ts[i]} \leq t \leq ${ts[j]}`)}, in degrees Celsius per minute?`,
        correct: correct(m(ans), t`${m(t`\frac{H(${ts[j]}) - H(${ts[i]})}{${ts[j]} - ${ts[i]}} = \frac{${dv}}{${dt}}`)}.`),
        wrong: [
          wrong(m(w[0]!), "This is the total change in temperature; it still needs to be divided by the elapsed time."),
          wrong(m(w[1]!), "This divides time by temperature, which is upside down."),
          wrong(m(w[2]!), "This is the average temperature, not the average rate of change."),
        ],
        explanation: t`Average rate of change ${m(t`= \frac{H(${ts[j]}) - H(${ts[i]})}{${ts[j]} - ${ts[i]}} = \frac{${vs[j]} - ${vs[i]}}{${dt}} = ${ans.tex()}`)} degrees per minute.`,
      };
    },
  },
  {
    key: "u2-trig-derivatives",
    unit: 2,
    topics: ["derivatives-of-other-trig-functions", "derivatives-of-sin-cos-exp-ln"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const facts = [
        { f: t`\tan x`, at: t`\frac{\pi}{4}`, ans: "2", w: ["1", t`\sqrt{2}`, "-2"], d: t`\sec^2 x` },
        { f: t`\tan x`, at: t`\frac{\pi}{3}`, ans: "4", w: [t`\sqrt{3}`, "2", "-4"], d: t`\sec^2 x` },
        { f: t`\sec x`, at: t`\frac{\pi}{3}`, ans: t`2\sqrt{3}`, w: ["2", t`\sqrt{3}`, t`-2\sqrt{3}`], d: t`\sec x \tan x` },
        { f: t`\sec x`, at: t`\frac{\pi}{4}`, ans: t`\sqrt{2}`, w: ["1", "2", t`-\sqrt{2}`], d: t`\sec x \tan x` },
        { f: t`\cot x`, at: t`\frac{\pi}{4}`, ans: "-2", w: ["2", "1", "-1"], d: t`-\csc^2 x` },
        { f: t`\csc x`, at: t`\frac{\pi}{6}`, ans: t`-2\sqrt{3}`, w: [t`2\sqrt{3}`, "2", t`-\sqrt{3}`], d: t`-\csc x \cot x` },
      ];
      const o = r.pick(facts);
      return {
        stem: `If ${m(t`f(x) = ${o.f}`)}, what is ${m(t`f'\left(${o.at}\right)`)}?`,
        correct: correct(m(o.ans), t`${m(t`f'(x) = ${o.d}`)}, evaluated at ${m(o.at)}.`),
        wrong: [
          wrong(m(o.w[0]!), "This mixes up the derivative with a different trigonometric value at the point."),
          wrong(m(o.w[1]!), "This value doesn't come from the correct derivative formula."),
          wrong(m(o.w[2]!), "Check the sign: the derivatives of the co-functions (cot, csc) are negative; tan and sec are not."),
        ],
        explanation: t`${m(t`\frac{d}{dx}\left(${o.f}\right) = ${o.d}`)}. Substituting ${m(t`x = ${o.at}`)} gives ${m(o.ans)}.`,
      };
    },
  },
  {
    key: "u2-exp-ln",
    unit: 2,
    topics: ["derivatives-of-sin-cos-exp-ln", "basic-derivative-rules"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.int(2, 6);
      const b = r.nz(-6, 6);
      const c = r.nz(-4, 4);
      const tail = b + 2 * c;
      if (tail === 0 || 2 * c === 0 || b + c === tail) throw new Retry();
      const expr = (k: number) => joinTerms([coef(a, "e"), String(k)].filter((s) => s !== "0"));
      const wrong3 = a + b + 2 * c;
      return {
        stem: `If ${m(t`f(x) = ${joinTerms([coef(a, "e^{x}"), coef(b, t`\ln x`), coef(c, "x^{2}")])}`)}, what is ${m("f'(1)")}?`,
        correct: correct(m(expr(tail)), t`${m(t`f'(x) = ${joinTerms([coef(a, "e^{x}"), t`\frac{${b}}{x}`, coef(2 * c, "x")])}`)}, so ${m(t`f'(1) = ${expr(tail)}`)}.`),
        wrong: [
          wrong(m(expr(2 * c)), t`This uses ${m(t`\ln 1 = 0`)}, but the derivative of ${m(t`\ln x`)} is ${m(t`\frac{1}{x}`)}, which is 1 at ${m("x = 1")}.`),
          wrong(m(expr(b + c)), t`The derivative of ${m(coef(c, "x^2"))} is ${m(coef(2 * c, "x"))}.`),
          wrong(m(wrong3), t`The derivative of ${m("e^x")} is ${m("e^x")}, which equals ${m("e")} at 1, not 1.`),
        ],
        explanation: t`Differentiate term by term: ${m(t`f'(x) = ${joinTerms([coef(a, "e^{x}"), t`\frac{${b}}{x}`, coef(2 * c, "x")])}`)}. At ${m("x = 1")} this is ${m(expr(tail))}.`,
      };
    },
  },
  {
    key: "u2-symmetric-difference",
    unit: 2,
    topics: ["estimating-derivatives"],
    skills: ["2"],
    difficulty: 2,
    calc: true,
    gen(r) {
      const xs = [1, 3, 4, 6, 9];
      const ys = xs.map(() => r.int(-8, 20));
      const i = r.int(1, 3);
      const dx = xs[i + 1]! - xs[i - 1]!;
      const dy = ys[i + 1]! - ys[i - 1]!;
      const ans = F(dy, dx);
      const w = [F(ys[i]!, xs[i]!), F(ys[i + 1]! - ys[i]!, 1), F(dy)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stimulus: {
          text: "The function $$g$$ is differentiable. Selected values of $$g$$ are shown.",
          table: { caption: "Values of g", columns: [{ key: "x", label: "$$x$$" }, { key: "g", label: "$$g(x)$$" }], rows: xs.map((x, k) => ({ x, g: ys[k]! })) },
        },
        stem: `Using the data in the table and the values on either side of ${m(t`x = ${xs[i]}`)}, what is the best estimate of ${m(t`g'(${xs[i]})`)}?`,
        correct: correct(m(ans), t`${m(t`\frac{g(${xs[i + 1]}) - g(${xs[i - 1]})}{${xs[i + 1]} - ${xs[i - 1]}} = \frac{${dy}}{${dx}}`)}.`),
        wrong: [
          wrong(m(w[0]!), t`This divides the output by the input, which is not a rate of change.`),
          wrong(m(w[1]!), "This forgets to divide by the change in x."),
          wrong(m(w[2]!), "This is the change in g without dividing by the change in x."),
        ],
        explanation: t`The slope of the secant line through the neighboring points estimates the derivative: ${m(t`g'(${xs[i]}) \approx \frac{${ys[i + 1]} - (${ys[i - 1]})}{${dx}} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u2-calc-derivative",
    unit: 2,
    topics: ["product-rule", "quotient-rule", "estimating-derivatives"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const fn = r.pick(calcFunctions);
      const k = r.pick([0.5, 1.2, 1.5, 2, 2.5]);
      const ans = derivative(fn.f, k);
      const vals = [ans, fn.f(k), fn.alt(k), derivative(fn.f, k + 1)];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `Let ${m(t`f(x) = ${fn.tex}`)}. What is the value of ${m(t`f'(${k})`)}?`,
        correct: correct(m(dec(ans)), "Use the calculator's numerical derivative (or the correct rule) at the given input."),
        wrong: [
          wrong(m(dec(vals[1]!)), "This is the function value, not the derivative."),
          wrong(m(dec(vals[2]!)), fn.altWhy),
          wrong(m(dec(vals[3]!)), `This is the derivative at $$x = ${k + 1}$$, not at $$x = ${k}$$.`),
        ],
        explanation: t`On a graphing calculator, evaluate ${m(t`\left.\frac{d}{dx}\left(${fn.tex}\right)\right|_{x = ${k}} \approx ${dec(ans)}`)}.`,
      };
    },
  },
];

export { calcFunctions };
export type { Frac, Rng };
