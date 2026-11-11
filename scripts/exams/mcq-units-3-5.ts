import { coef, dec, derivative, F, graphSvg, joinTerms, m, par, poly, polyAt, roots, shift, shiftBare, signed } from "./lib";
import { correct, Retry, wrong, type McqTemplate } from "./types";

const t = String.raw;

// ---------------------------------------------------------------------------
// Unit 3: Composite, Implicit, and Inverse Functions
// ---------------------------------------------------------------------------

export const unit3: McqTemplate[] = [
  {
    key: "u3-chain-poly",
    unit: 3,
    topics: ["chain-rule"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.nz(-3, 3);
      const b = r.int(-4, 4);
      const n = r.int(2, 4);
      const k = r.pick([1, -1, 2]);
      const inner = a * k * k + b;
      if (inner === 0 || Math.abs(inner) > 6) throw new Retry();
      const outer = n * inner ** (n - 1);
      const pw = n - 1 === 1 ? "" : `^{${n - 1}}`;
      const ans = outer * 2 * a * k;
      const vals = [ans, outer, inner ** n, n * (2 * a * k) ** (n - 1)];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `If ${m(t`f(x) = (${poly([a, 0, b])})^{${n}}`)}, what is ${m(t`f'(${k})`)}?`,
        correct: correct(m(ans), t`${m(t`f'(x) = ${n}(${poly([a, 0, b])})${pw} \cdot (${coef(2 * a, "x")})`)}.`),
        wrong: [
          wrong(m(outer), "This differentiates the outer power but leaves out the derivative of the inside function."),
          wrong(m(inner ** n), "This is the value of the function, not its derivative."),
          wrong(m(vals[3]!), "This applies the power rule to the derivative of the inside instead of to the inside function."),
        ],
        explanation: t`Chain rule: ${m(t`f'(x) = ${n}(${poly([a, 0, b])})${pw} \cdot (${coef(2 * a, "x")})`)}. At ${m(t`x = ${k}`)}: ${m(t`${n}(${inner})${pw} \cdot (${2 * a * k}) = ${ans}`)}.`,
      };
    },
  },
  {
    key: "u3-chain-table",
    unit: 3,
    topics: ["chain-rule", "selecting-derivative-procedures"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const xs = [1, 2, 3, 4];
      const f = xs.map(() => r.int(-3, 6));
      const fp = xs.map(() => r.nz(-5, 5));
      const g = xs.map(() => r.int(1, 4));
      const gp = xs.map(() => r.nz(-4, 4));
      const k = r.int(1, 4);
      const gk = g[k - 1]!;
      const product = r.next() < 0.35;
      const stimulus = {
        text: "The table gives values of the differentiable functions $$f$$ and $$g$$ and their derivatives.",
        table: {
          caption: "Values of f, f′, g and g′",
          columns: [
            { key: "x", label: "$$x$$" },
            { key: "f", label: "$$f(x)$$" },
            { key: "fp", label: "$$f'(x)$$" },
            { key: "g", label: "$$g(x)$$" },
            { key: "gp", label: "$$g'(x)$$" },
          ],
          rows: xs.map((x, i) => ({ x, f: f[i]!, fp: fp[i]!, g: g[i]!, gp: gp[i]! })),
        },
      };
      if (product) {
        const ans = fp[k - 1]! * g[k - 1]! + f[k - 1]! * gp[k - 1]!;
        const vals = [ans, fp[k - 1]! * gp[k - 1]!, fp[k - 1]! * g[k - 1]! - f[k - 1]! * gp[k - 1]!, f[k - 1]! * g[k - 1]!];
        if (new Set(vals).size < 4) throw new Retry();
        return {
          stimulus,
          stem: `Let ${m("h(x) = f(x)g(x)")}. What is ${m(t`h'(${k})`)}?`,
          correct: correct(m(ans), t`${m(t`h'(${k}) = f'(${k})g(${k}) + f(${k})g'(${k}) = (${fp[k - 1]})(${g[k - 1]}) + (${f[k - 1]})(${gp[k - 1]})`)}.`),
          wrong: [
            wrong(m(vals[1]!), "The derivative of a product is not the product of the derivatives."),
            wrong(m(vals[2]!), "The product rule adds the two terms; subtraction belongs to the quotient rule."),
            wrong(m(vals[3]!), t`This is ${m(t`h(${k})`)}, not ${m(t`h'(${k})`)}.`),
          ],
          explanation: t`Product rule: ${m(t`h'(${k}) = f'(${k})g(${k}) + f(${k})g'(${k}) = ${ans}`)}.`,
        };
      }
      const ans = fp[gk - 1]! * gp[k - 1]!;
      const vals = [ans, fp[k - 1]! * gp[k - 1]!, fp[gk - 1]!, f[gk - 1]! * gp[k - 1]!];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stimulus,
        stem: `Let ${m("h(x) = f(g(x))")}. What is ${m(t`h'(${k})`)}?`,
        correct: correct(m(ans), t`${m(t`h'(${k}) = f'(g(${k})) \cdot g'(${k}) = f'(${gk}) \cdot (${gp[k - 1]}) = (${fp[gk - 1]})(${gp[k - 1]})`)}.`),
        wrong: [
          wrong(m(vals[1]!), t`This evaluates ${m("f'")} at ${m(k)} instead of at ${m(t`g(${k}) = ${gk}`)}.`),
          wrong(m(vals[2]!), t`This leaves out the factor ${m(t`g'(${k})`)} from the chain rule.`),
          wrong(m(vals[3]!), t`This uses ${m("f")} instead of ${m("f'")} for the outer derivative.`),
        ],
        explanation: t`Chain rule: ${m(t`h'(x) = f'(g(x))\,g'(x)`)}. Since ${m(t`g(${k}) = ${gk}`)}, ${m(t`h'(${k}) = f'(${gk})\,g'(${k}) = ${ans}`)}.`,
      };
    },
  },
  {
    key: "u3-implicit",
    unit: 3,
    topics: ["implicit-differentiation"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const [p0, q0, rr] = r.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13]] as const);
        const p = p0 * r.sign();
        const q = q0 * r.sign();
        const ans = F(-p, q);
        return {
          stem: `What is the slope of the line tangent to the curve ${m(t`x^2 + y^2 = ${rr * rr}`)} at the point ${m(t`(${p}, ${q})`)}?`,
          correct: correct(m(ans), t`${m(t`2x + 2y\frac{dy}{dx} = 0`)} gives ${m(t`\frac{dy}{dx} = -\frac{x}{y} = -\frac{${p}}{${q}}`)}.`),
          wrong: [
            wrong(m(F(p, q)), "Sign error: moving 2x to the other side makes it negative."),
            wrong(m(F(-q, p)), "This is −y/x, which inverts the correct ratio."),
            wrong(m(F(q, p)), "This is y/x. The tangent line is perpendicular to the radius, whose slope is y/x, so the tangent slope is −x/y."),
          ],
          explanation: t`Differentiate implicitly: ${m(t`2x + 2y\,y' = 0`)}, so ${m(t`y' = -\frac{x}{y}`)}. At ${m(t`(${p}, ${q})`)} this is ${m(ans)}.`,
        };
      }
      const p = r.nz(-3, 3);
      const q = r.nz(-3, 3);
      if (p + 2 * q === 0) throw new Retry();
      const C = p * p + p * q + q * q;
      const ans = F(-(2 * p + q), p + 2 * q);
      const w = [F(-p, q), F(-(2 * p + q), 2 * q), F(2 * p + q, p + 2 * q)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `For the curve ${m(t`x^2 + xy + y^2 = ${C}`)}, what is ${m(t`\frac{dy}{dx}`)} at the point ${m(t`(${p}, ${q})`)}?`,
        correct: correct(m(ans), t`${m(t`2x + y + x\frac{dy}{dx} + 2y\frac{dy}{dx} = 0`)}, so ${m(t`\frac{dy}{dx} = -\frac{2x + y}{x + 2y}`)}.`),
        wrong: [
          wrong(m(w[0]!), t`This ignores the ${m("xy")} term entirely.`),
          wrong(m(w[1]!), t`This differentiates ${m("xy")} as ${m("y")}, forgetting the product rule term ${m(t`x\frac{dy}{dx}`)}.`),
          wrong(m(w[2]!), "Sign error when solving for dy/dx."),
        ],
        explanation: t`Implicit differentiation with the product rule on ${m("xy")}: ${m(t`2x + (y + xy') + 2yy' = 0`)}. Solving, ${m(t`y' = -\frac{2x + y}{x + 2y}`)}; at ${m(t`(${p}, ${q})`)}, ${m(t`y' = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u3-inverse",
    unit: 3,
    topics: ["differentiating-inverse-functions"],
    skills: ["1", "2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(1, 5);
      const b = r.int(-5, 5);
      const k = r.pick([1, 2, -1]);
      const v = k ** 3 + a * k + b;
      const fp = 3 * k * k + a;
      const ans = F(1, fp);
      const w = [F(fp), F(1, 3 * v * v + a), F(1, k ** 3 + a * k + b === 0 ? 7 : v)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `Let ${m(t`f(x) = ${poly([1, 0, a, b])}`)}, and let ${m("g")} be the inverse function of ${m("f")}. What is ${m(t`g'(${v})`)}?`,
        correct: correct(m(ans), t`${m(t`f(${k}) = ${v}`)}, so ${m(t`g'(${v}) = \frac{1}{f'(${k})} = \frac{1}{${fp}}`)}.`),
        wrong: [
          wrong(m(w[0]!), t`This is ${m(t`f'(${k})`)}; the inverse's derivative is its reciprocal.`),
          wrong(m(w[1]!), t`This evaluates ${m("f'")} at ${m(v)} instead of at the input ${m(k)} with ${m(t`f(${k}) = ${v}`)}.`),
          wrong(m(w[2]!), t`This takes the reciprocal of a function value, not of the derivative.`),
        ],
        explanation: t`If ${m(t`f(${k}) = ${v}`)}, then ${m(t`g(${v}) = ${k}`)} and ${m(t`g'(${v}) = \frac{1}{f'(g(${v}))} = \frac{1}{f'(${k})}`)}. Since ${m(t`f'(x) = ${poly([3, 0, a])}`)}, ${m(t`f'(${k}) = ${fp}`)}.`,
      };
    },
  },
  {
    key: "u3-inverse-trig",
    unit: 3,
    topics: ["inverse-trig-derivatives"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const [a, x, root] = r.pick([[5, 3, 4], [5, 4, 3], [13, 5, 12], [13, 12, 5], [10, 6, 8], [10, 8, 6], [2, 1, 0]] as const);
        if (root === 0) {
          return {
            stem: `If ${m(t`f(x) = \arcsin\left(\frac{x}{2}\right)`)}, what is ${m("f'(1)")}?`,
            correct: correct(m(t`\frac{1}{\sqrt{3}}`), t`${m(t`f'(x) = \frac{1}{\sqrt{1 - x^2/4}} \cdot \frac{1}{2} = \frac{1}{\sqrt{4 - x^2}}`)}.`),
            wrong: [
              wrong(m(t`\frac{2}{\sqrt{3}}`), t`This leaves out the inner derivative ${m(t`\frac{1}{2}`)}.`),
              wrong(m(t`\frac{1}{2\sqrt{3}}`), "This applies the inner factor twice."),
              wrong(m(t`\frac{\pi}{6}`), t`This is ${m("f(1)")}, not ${m("f'(1)")}.`),
            ],
            explanation: t`${m(t`\frac{d}{dx}\arcsin u = \frac{u'}{\sqrt{1 - u^2}}`)}. With ${m(t`u = \frac{x}{2}`)}, ${m(t`f'(1) = \frac{1/2}{\sqrt{3/4}} = \frac{1}{\sqrt{3}}`)}.`,
          };
        }
        return {
          stem: `If ${m(t`f(x) = \arcsin\left(\frac{x}{${a}}\right)`)}, what is ${m(t`f'(${x})`)}?`,
          correct: correct(m(F(1, root)), t`${m(t`f'(x) = \frac{1}{\sqrt{${a * a} - x^2}}`)}, so ${m(t`f'(${x}) = \frac{1}{\sqrt{${a * a - x * x}}} = \frac{1}{${root}}`)}.`),
          wrong: [
            wrong(m(F(a, root)), t`This leaves out the inner derivative ${m(t`\frac{1}{${a}}`)}.`),
            wrong(m(F(1, a * root)), "This applies the inner factor twice."),
            wrong(m(F(-1, root)), "The derivative of arcsine is positive; this has a sign error."),
          ],
          explanation: t`${m(t`\frac{d}{dx}\arcsin\left(\frac{x}{${a}}\right) = \frac{1/${a}}{\sqrt{1 - x^2/${a * a}}} = \frac{1}{\sqrt{${a * a} - x^2}}`)}. At ${m(t`x = ${x}`)} this is ${m(t`\frac{1}{${root}}`)}.`,
        };
      }
      const k = r.int(2, 5);
      const c = r.pick([1, -1, 2]);
      const ans = F(k, 1 + k * k * c * c);
      const w = [F(1, 1 + k * k * c * c), F(k, 1 + k * c * c), F(k, 1 + c * c)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `If ${m(t`f(x) = \arctan(${k}x)`)}, what is ${m(t`f'(${c})`)}?`,
        correct: correct(m(ans), t`${m(t`f'(x) = \frac{${k}}{1 + ${k * k}x^2}`)}.`),
        wrong: [
          wrong(m(w[0]!), t`This leaves out the inner derivative ${m(k)}.`),
          wrong(m(w[1]!), t`The inside is squared as a whole: ${m(t`(${k}x)^2 = ${k * k}x^2`)}.`),
          wrong(m(w[2]!), t`This uses ${m(t`1 + x^2`)} in the denominator instead of ${m(t`1 + (${k}x)^2`)}.`),
        ],
        explanation: t`${m(t`\frac{d}{dx}\arctan u = \frac{u'}{1 + u^2}`)} with ${m(t`u = ${k}x`)}: ${m(t`f'(${c}) = \frac{${k}}{1 + ${k * k * c * c}} = ${ans.tex()}`)}.`,
      };
    },
  },
  {
    key: "u3-higher-order",
    unit: 3,
    topics: ["higher-order-derivatives"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const c = [r.nz(-3, 3), r.int(-4, 4), r.nz(-5, 5), r.int(-6, 6), r.int(-5, 5)];
      const k = r.nz(-2, 2);
      const second = [12 * c[0]!, 6 * c[1]!, 2 * c[2]!];
      const first = [4 * c[0]!, 3 * c[1]!, 2 * c[2]!, c[3]!];
      const ans = polyAt(second, k);
      const vals = [ans, polyAt(first, k), ans - 2 * c[2]!, polyAt([4 * c[0]!, 3 * c[1]!, 2 * c[2]!], k)];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `If ${m(t`f(x) = ${poly(c)}`)}, what is ${m(t`f''(${k})`)}?`,
        correct: correct(m(ans), t`${m(t`f''(x) = ${poly(second)}`)}.`),
        wrong: [
          wrong(m(vals[1]!), t`This is ${m(t`f'(${k})`)}, the first derivative.`),
          wrong(m(vals[2]!), "This drops the constant that comes from the quadratic term."),
          wrong(m(vals[3]!), "This lowers each exponent twice but only multiplies by the exponent once."),
        ],
        explanation: t`${m(t`f'(x) = ${poly(first)}`)} and ${m(t`f''(x) = ${poly(second)}`)}, so ${m(t`f''(${k}) = ${ans}`)}.`,
      };
    },
  },
  {
    key: "u3-select-symbolic",
    unit: 3,
    topics: ["selecting-derivative-procedures", "chain-rule"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const k = r.int(2, 5);
      const items = [
        { f: t`\sin(x^{${k}})`, ans: t`${k}x^{${k - 1}}\cos(x^{${k}})`, w: [t`\cos(x^{${k}})`, t`\cos(${k}x^{${k - 1}})`, t`-${k}x^{${k - 1}}\cos(x^{${k}})`] },
        { f: t`e^{${k}x^2}`, ans: t`${2 * k}xe^{${k}x^2}`, w: [t`e^{${k}x^2}`, t`${k}x^2e^{${k}x^2 - 1}`, t`${2 * k}xe^{${2 * k}x}`] },
        { f: t`\ln(x^2 + ${k})`, ans: t`\frac{2x}{x^2 + ${k}}`, w: [t`\frac{1}{x^2 + ${k}}`, t`\frac{1}{2x}`, t`\frac{2x}{x^2}`] },
        { f: t`\cos^{${k}} x`, ans: t`-${k}\cos^{${k - 1}} x \sin x`, w: [t`${k}\cos^{${k - 1}} x \sin x`, t`-${k}\sin^{${k - 1}} x`, t`-\sin^{${k}} x`] },
        { f: t`\sqrt{${k}x^2 + 1}`, ans: t`\frac{${k}x}{\sqrt{${k}x^2 + 1}}`, w: [t`\frac{1}{2\sqrt{${k}x^2 + 1}}`, t`\frac{${2 * k}x}{\sqrt{${k}x^2 + 1}}`, t`\frac{1}{2}(${2 * k}x)^{-1/2}`] },
      ];
      const o = r.pick(items);
      return {
        stem: `What is ${m(t`\frac{d}{dx}\left(${o.f}\right)`)}?`,
        correct: correct(m(o.ans), "This is the chain rule: the derivative of the outer function, evaluated at the inside, times the derivative of the inside."),
        wrong: [
          wrong(m(o.w[0]!), "This leaves out the derivative of the inside function."),
          wrong(m(o.w[1]!), "This differentiates the inside but then substitutes it incorrectly into the outer derivative."),
          wrong(m(o.w[2]!), "This makes a sign or coefficient error in the outer derivative."),
        ],
        explanation: t`Treat ${m(o.f)} as a composite and apply the chain rule: ${m(t`\frac{d}{dx}\left(${o.f}\right) = ${o.ans}`)}.`,
      };
    },
  },
  {
    key: "u3-inverse-calc",
    unit: 3,
    topics: ["differentiating-inverse-functions"],
    skills: ["1"],
    difficulty: 4,
    calc: true,
    gen(r) {
      const a = r.int(1, 3);
      const c = r.int(2, 6);
      const f = (x: number) => x ** 3 + a * x + Math.exp(x / c);
      const v = r.int(3, 12);
      const [x0] = roots((x) => f(x) - v, -5, 5);
      if (x0 === undefined) throw new Retry();
      const fp = derivative(f, x0);
      const ans = 1 / fp;
      const vals = [ans, fp, 1 / derivative(f, v), x0];
      if (new Set(vals.map((x) => dec(x))).size < 4) throw new Retry();
      return {
        stem: `Let ${m(t`f(x) = ${poly([1, 0, a, 0])} + e^{x/${c}}`)}, and let ${m("g")} be the inverse of ${m("f")}. What is the value of ${m(t`g'(${v})`)}?`,
        correct: correct(m(dec(ans)), t`Solve ${m(t`f(x) = ${v}`)} to get ${m(t`x \approx ${dec(x0)}`)}, then ${m(t`g'(${v}) = \frac{1}{f'(${dec(x0)})}`)}.`),
        wrong: [
          wrong(m(dec(fp)), "This is f′ at the matching input; the inverse's derivative is its reciprocal."),
          wrong(m(dec(vals[2]!)), t`This evaluates ${m("f'")} at ${m(v)} instead of at the input where ${m(t`f(x) = ${v}`)}.`),
          wrong(m(dec(x0)), t`This is ${m(t`g(${v})`)}, not ${m(t`g'(${v})`)}.`),
        ],
        explanation: t`Use the calculator to solve ${m(t`f(x) = ${v}`)}: ${m(t`x \approx ${dec(x0)}`)}, so ${m(t`g(${v}) \approx ${dec(x0)}`)}. Then ${m(t`g'(${v}) = \frac{1}{f'(g(${v}))} \approx \frac{1}{${dec(fp)}} \approx ${dec(ans)}`)}.`,
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 4: Contextual Applications of Differentiation
// ---------------------------------------------------------------------------

const contexts = [
  { f: "W", what: "the amount of water in a tank, in gallons", t: "t", tunit: "hours", unit: "gallons per hour", noun: "amount of water" },
  { f: "P", what: "the population of a town, in people", t: "t", tunit: "years", unit: "people per year", noun: "population" },
  { f: "T", what: "the temperature of a cup of coffee, in degrees Fahrenheit", t: "t", tunit: "minutes", unit: "degrees Fahrenheit per minute", noun: "temperature" },
  { f: "C", what: "the cost, in dollars, of producing x items", t: "x", tunit: "items", unit: "dollars per item", noun: "cost" },
];

export const unit4: McqTemplate[] = [
  {
    key: "u4-context",
    unit: 4,
    topics: ["derivative-in-context", "rates-in-applied-contexts"],
    skills: ["4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const c = r.pick(contexts);
      const a = r.int(2, 9);
      const v = r.nz(-8, 8);
      const dir = v > 0 ? "increasing" : "decreasing";
      const word = c.t === "x" ? `when ${a} items have been produced` : `at time $$${c.t} = ${a}$$ ${c.tunit}`;
      return {
        stem: `Let ${m(t`${c.f}(${c.t})`)} be ${c.what}${c.t === "x" ? "" : `, at time ${c.t} ${c.tunit}`}. Which of the following is the best interpretation of ${m(t`${c.f}'(${a}) = ${v}`)}?`,
        correct: correct(`The ${c.noun} is ${dir} at a rate of ${Math.abs(v)} ${c.unit} ${word}.`, "A derivative at a point is an instantaneous rate of change, with units of output per unit of input."),
        wrong: [
          wrong(`The ${c.noun} ${word} is ${v}.`, `This describes $$${c.f}(${a})$$, the value of the function, not its rate of change.`),
          wrong(`The ${c.noun} changes by ${v} over the first ${a} ${c.tunit}.`, "This describes a total change over an interval, which is an integral of the rate, not the derivative at one point."),
          wrong(`The average rate of change of the ${c.noun} over the first ${a} ${c.tunit} is ${v} ${c.unit}.`, "The derivative is an instantaneous rate at one input, not an average over an interval."),
        ],
        explanation: `$$${c.f}'(${a})$$ is the instantaneous rate of change of $$${c.f}$$ ${word}. Its sign (${v > 0 ? "positive" : "negative"}) says the ${c.noun} is ${dir}, and its units are ${c.unit}.`,
      };
    },
  },
  {
    key: "u4-motion-rest",
    unit: 4,
    topics: ["straight-line-motion"],
    skills: ["1", "2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const p = r.int(1, 4);
      const q = p + r.pick([2, 4, 6]);
      const s = [1, -1.5 * (p + q), 3 * p * q, 0];
      const k = r.int(0, q + 1);
      if (r.next() < 0.5) {
        const opts = [`$$t = ${p}$$ and $$t = ${q}$$ only`, `$$t = ${(p + q) / 2}$$ only`, `$$t = 0$$ only`, `$$t = 0$$, $$t = ${p}$$, and $$t = ${q}$$`];
        return {
          stem: `A particle moves along the x-axis so that its position at time ${m(t`t \geq 0`)} is ${m(t`x(t) = ${poly(s.map((v) => F(v * 2, 2)), "t")}`)}. At what times is the particle at rest?`,
          correct: correct(opts[0]!, t`${m(t`v(t) = 3t^2 - ${3 * (p + q)}t + ${3 * p * q} = 3(t - ${p})(t - ${q})`)}, which is zero at ${m(t`t = ${p}`)} and ${m(t`t = ${q}`)}.`),
          wrong: [
            wrong(opts[1]!, "This is where the acceleration is zero, not the velocity."),
            wrong(opts[2]!, "This is where the position is zero, not the velocity."),
            wrong(opts[3]!, t`At ${m("t = 0")} the position is 0, but the velocity is ${m(3 * p * q)}, so the particle is moving.`),
          ],
          explanation: t`The particle is at rest when ${m("v(t) = x'(t) = 0")}. ${m(t`v(t) = 3(t - ${p})(t - ${q})`)}, so ${m(t`t = ${p}`)} and ${m(t`t = ${q}`)}.`,
        };
      }
      const acc = 6 * k - 3 * (p + q);
      const vel = 3 * k * k - 3 * (p + q) * k + 3 * p * q;
      const vals = [acc, vel, 6 * k, acc + 3 * (p + q) * 2];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `A particle moves along the x-axis so that its position at time ${m(t`t \geq 0`)} is ${m(t`x(t) = ${poly(s.map((v) => F(v * 2, 2)), "t")}`)}. What is the acceleration of the particle at ${m(t`t = ${k}`)}?`,
        correct: correct(m(acc), t`${m(t`a(t) = x''(t) = 6t - ${3 * (p + q)}`)}.`),
        wrong: [
          wrong(m(vel), t`This is the velocity ${m(t`v(${k})`)}, the first derivative.`),
          wrong(m(6 * k), "This drops the constant term of the second derivative."),
          wrong(m(vals[3]!), "Sign error in the constant term of the acceleration."),
        ],
        explanation: t`${m(t`v(t) = 3t^2 - ${3 * (p + q)}t + ${3 * p * q}`)} and ${m(t`a(t) = 6t - ${3 * (p + q)}`)}, so ${m(t`a(${k}) = ${acc}`)}.`,
      };
    },
  },
  {
    key: "u4-speeding-up",
    unit: 4,
    topics: ["straight-line-motion"],
    skills: ["3"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const p = r.int(1, 3);
      const q = p + r.pick([2, 4]);
      const mid = (p + q) / 2;
      const opts = [
        `$$${p} < t < ${mid}$$ and $$t > ${q}$$`,
        `$$t > ${q}$$ only`,
        `$$${p} < t < ${q}$$`,
        `$$0 < t < ${p}$$ and $$t > ${q}$$`,
      ];
      return {
        stem: `A particle moves along a line with velocity ${m(t`v(t) = 3(t - ${p})(t - ${q})`)} for ${m(t`t \geq 0`)}. For which values of ${m("t")} is the particle speeding up?`,
        correct: correct(opts[0]!, "The particle speeds up when velocity and acceleration have the same sign."),
        wrong: [
          wrong(opts[1]!, t`This misses ${m(t`${p} < t < ${mid}`)}, where both ${m("v")} and ${m("a")} are negative.`),
          wrong(opts[2]!, "This is where the velocity is negative, which only means the particle moves left."),
          wrong(opts[3]!, t`On ${m(t`0 < t < ${p}`)} the velocity is positive but the acceleration is negative, so it is slowing down.`),
        ],
        explanation: t`${m(t`a(t) = 6t - ${3 * (p + q)}`)} changes sign at ${m(t`t = ${mid}`)}. ${m("v")} is negative on ${m(t`(${p}, ${q})`)} and positive elsewhere. Both are negative on ${m(t`(${p}, ${mid})`)} and both positive for ${m(t`t > ${q}`)}.`,
      };
    },
  },
  {
    key: "u4-related-rates",
    unit: 4,
    topics: ["introduction-to-related-rates", "solving-related-rates"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const k = r.int(2, 5);
      const R = r.int(2, 8);
      const shapes = [
        { name: "circle", varName: "radius", q: "area", ans: t`${2 * R * k}\pi`, w: [t`${R * R * k}\pi`, t`${2 * R}\pi`, t`${k}\pi`], rel: t`A = \pi r^2`, d: t`\frac{dA}{dt} = 2\pi r\frac{dr}{dt}` },
        { name: "sphere", varName: "radius", q: "volume", ans: t`${4 * R * R * k}\pi`, w: [t`${4 * R * R}\pi`, t`${4 * R * k}\pi`, t`${F(4 * R * R * R * k, 3).tex()}\pi`], rel: t`V = \frac{4}{3}\pi r^3`, d: t`\frac{dV}{dt} = 4\pi r^2\frac{dr}{dt}` },
        { name: "cube", varName: "edge length", q: "volume", ans: String(3 * R * R * k), w: [String(3 * R * R), String(R ** 3 * k), String(3 * R * k)], rel: t`V = s^3`, d: t`\frac{dV}{dt} = 3s^2\frac{ds}{dt}` },
      ];
      const s = r.pick(shapes);
      return {
        stem: `The ${s.varName} of a ${s.name} is increasing at a constant rate of ${k} centimeters per second. At the instant when the ${s.varName} is ${R} centimeters, what is the rate of change of the ${s.q}?`,
        correct: correct(m(s.ans), t`Differentiate ${m(s.rel)} with respect to ${m("t")}: ${m(s.d)}.`),
        wrong: [
          wrong(m(s.w[0]!), "This leaves out a factor from differentiating the formula with respect to time."),
          wrong(m(s.w[1]!), "This forgets to multiply by the given rate of change of the dimension."),
          wrong(m(s.w[2]!), "This substitutes into the original formula instead of its derivative."),
        ],
        explanation: t`${m(s.d)}. Substitute the dimension ${m(R)} and its rate ${m(k)} to get ${m(s.ans)} (cubic or square centimeters per second).`,
      };
    },
  },
  {
    key: "u4-ladder",
    unit: 4,
    topics: ["solving-related-rates"],
    skills: ["1", "2"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const [a, b, L] = r.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [12, 5, 13], [9, 12, 15]] as const);
      const k = r.int(1, 4);
      const ans = F(-a * k, b);
      const w = [F(a * k, b), F(-b * k, a), F(-k)];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      return {
        stem: `A ${L}-foot ladder leans against a vertical wall. The bottom of the ladder slides away from the wall at a constant rate of ${k} feet per second. How fast is the top of the ladder moving, in feet per second, when the bottom is ${a} feet from the wall?`,
        correct: correct(m(ans), t`${m(t`x^2 + y^2 = ${L * L}`)} gives ${m(t`x\frac{dx}{dt} + y\frac{dy}{dt} = 0`)}. With ${m(t`x = ${a}`)}, ${m(t`y = ${b}`)}, ${m(t`\frac{dy}{dt} = -\frac{${a}(${k})}{${b}}`)}.`),
        wrong: [
          wrong(m(w[0]!), "The top slides down, so its rate is negative."),
          wrong(m(w[1]!), "This swaps the roles of x and y."),
          wrong(m(w[2]!), "The two ends do not move at the same speed; their rates depend on the position."),
        ],
        explanation: t`Let ${m("x")} be the distance from the wall and ${m("y")} the height. ${m(t`2x x' + 2y y' = 0`)}, so ${m(t`y' = -\frac{x x'}{y} = -\frac{${a} \cdot ${k}}{${b}} = ${ans.tex()}`)} feet per second (the top is moving down).`,
      };
    },
  },
  {
    key: "u4-linearization",
    unit: 4,
    topics: ["local-linearity"],
    skills: ["1", "2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const a = r.int(2, 9);
        const d = r.nz(-3, 3);
        const N = a * a + d;
        const ans = F(a).add(F(d, 2 * a));
        const w = [F(a).add(F(d, a)), F(a).sub(F(d, 2 * a)), F(a).add(F(d, 2))];
        if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
        return {
          stem: `Using the line tangent to ${m(t`f(x) = \sqrt{x}`)} at ${m(t`x = ${a * a}`)}, what is the approximation of ${m(t`\sqrt{${N}}`)}?`,
          correct: correct(m(ans), t`${m(t`L(x) = ${a} + \frac{1}{${2 * a}}(x - ${a * a})`)}, so ${m(t`L(${N}) = ${a} + \frac{${d}}{${2 * a}}`)}.`),
          wrong: [
            wrong(m(w[0]!), t`The derivative of ${m(t`\sqrt{x}`)} is ${m(t`\frac{1}{2\sqrt{x}}`)}; this forgets the 2.`),
            wrong(m(w[1]!), "Sign error: the change in x is added, not subtracted."),
            wrong(m(w[2]!), t`This uses slope ${m(t`\frac{1}{2}`)} instead of ${m(t`f'(${a * a}) = \frac{1}{${2 * a}}`)}.`),
          ],
          explanation: t`${m(t`f(${a * a}) = ${a}`)} and ${m(t`f'(${a * a}) = \frac{1}{2\sqrt{${a * a}}} = \frac{1}{${2 * a}}`)}. So ${m(t`\sqrt{${N}} \approx ${a} + \frac{1}{${2 * a}}(${d}) = ${ans.tex()}`)}.`,
        };
      }
      const a = r.int(1, 5);
      const fa = r.int(-5, 8);
      const fp = r.nz(-6, 6);
      const h = F(r.pick([1, 2, 3, -1, -2]), 10);
      const ans = F(fa).add(h.mul(fp));
      const w = [F(fa + fp), h.mul(fp), F(fa).sub(h.mul(fp))];
      if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
      const x1 = F(a).add(h);
      const decimal = (f: typeof ans) => dec(f.value, 1);
      return {
        stem: `The function ${m("f")} is differentiable with ${m(t`f(${a}) = ${fa}`)} and ${m(t`f'(${a}) = ${fp}`)}. Using the tangent line to the graph of ${m("f")} at ${m(t`x = ${a}`)}, what is the approximation of ${m(t`f(${dec(x1.value, 1)})`)}?`,
        correct: correct(m(decimal(ans)), t`${m(t`f(${dec(x1.value, 1)}) \approx f(${a}) + f'(${a})(${dec(h.value, 1)})`)}.`),
        wrong: [
          wrong(m(decimal(w[0]!)), "This adds the whole derivative instead of the derivative times the change in x."),
          wrong(m(decimal(w[1]!)), "This is only the estimated change in f; it still needs to be added to f(a)."),
          wrong(m(decimal(w[2]!)), "Sign error in the change in x."),
        ],
        explanation: t`The tangent line is ${m(t`L(x) = ${fa} ${signed(fp)}(x - ${a})`)}. So ${m(t`L(${dec(x1.value, 1)}) = ${fa} + (${fp})(${dec(h.value, 1)}) = ${decimal(ans)}`)}.`,
      };
    },
  },
  {
    key: "u4-lhospital",
    unit: 4,
    topics: ["lhospitals-rule"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const k = r.int(2, 6);
      const n = r.int(2, 6);
      if (k === n) throw new Retry();
      const items = [
        { expr: t`\lim_{x \to 0} \frac{e^{${k}x} - 1}{${n}x}`, ans: F(k, n), w: [F(1, n), F(n, k), F(0)], d: t`\frac{${k}e^{${k}x}}{${n}}` },
        { expr: t`\lim_{x \to 0} \frac{\ln(1 + ${k}x)}{${n}x}`, ans: F(k, n), w: [F(1, n), F(n, k), F(k)], d: t`\frac{${k}/(1 + ${k}x)}{${n}}` },
        { expr: t`\lim_{x \to 0} \frac{1 - \cos(${k}x)}{x^2}`, ans: F(k * k, 2), w: [F(k, 2), F(k * k), F(0)], d: t`\frac{${k}\sin(${k}x)}{2x} \to \frac{${k * k}\cos(${k}x)}{2}` },
        { expr: t`\lim_{x \to 1} \frac{x^{${k}} - 1}{x - 1}`, ans: F(k), w: [F(k - 1), F(1), F(0)], d: t`\frac{${k}x^{${k - 1}}}{1}` },
      ];
      const o = r.pick(items);
      return {
        stem: `What is ${m(o.expr)}?`,
        correct: correct(m(o.ans), t`The limit has the form ${m(t`\frac{0}{0}`)}, so L'Hospital's Rule applies: ${m(o.d)}.`),
        wrong: [
          wrong(m(o.w[0]!), "This leaves out the chain-rule factor when differentiating the numerator."),
          wrong(m(o.w[1]!), "This differentiates the numerator and denominator but then inverts the ratio, or applies the rule incorrectly."),
          wrong(m(o.w[2]!), t`${m(t`\frac{0}{0}`)} is indeterminate; it does not mean the limit is 0.`),
        ],
        explanation: t`Direct substitution gives ${m(t`\frac{0}{0}`)}. Differentiate the numerator and denominator separately (L'Hospital's Rule): ${m(o.d)}, which gives ${m(o.ans)}.`,
      };
    },
  },
  {
    key: "u4-rate-calc",
    unit: 4,
    topics: ["rates-in-applied-contexts", "derivative-in-context"],
    skills: ["1", "4"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const A = r.int(40, 90);
      const B = r.int(5, 20);
      const c = r.int(3, 8);
      const H = (x: number) => A + B * Math.sin(x / c) * Math.exp(-x / 20);
      const k = r.int(2, 15);
      const ans = derivative(H, k);
      const avg = (H(k) - H(0)) / k;
      const vals = [ans, H(k), avg, derivative(H, k) * k];
      if (new Set(vals.map((v) => dec(v))).size < 4 || Math.abs(ans) < 0.01) throw new Retry();
      const dir = ans > 0 ? "increasing" : "decreasing";
      return {
        stem: `The temperature of a room, in degrees Fahrenheit, is modeled by ${m(t`H(t) = ${A} + ${B}\sin\left(\frac{t}{${c}}\right)e^{-t/20}`)}, where ${m("t")} is measured in hours. What is the instantaneous rate of change of the temperature at ${m(t`t = ${k}`)}, in degrees Fahrenheit per hour?`,
        correct: correct(m(dec(ans)), `The calculator's numerical derivative of $$H$$ at $$t = ${k}$$ gives ${dec(ans)}; the temperature is ${dir}.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This is the temperature itself, not its rate of change."),
          wrong(m(dec(avg)), `This is the average rate of change over $$0 \\leq t \\leq ${k}$$, not the instantaneous rate.`),
          wrong(m(dec(vals[3]!)), "This multiplies the rate by the time, which is not a rate."),
        ],
        explanation: t`The instantaneous rate of change is ${m(t`H'(${k}) \approx ${dec(ans)}`)} degrees Fahrenheit per hour, from the calculator's numerical derivative.`,
      };
    },
  },
  {
    key: "u4-motion-calc",
    unit: 4,
    topics: ["straight-line-motion"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const a = r.int(2, 4);
      const b = r.int(2, 5);
      const v = (x: number) => a * Math.cos(x * x / b) - 0.5;
      const T = r.int(2, 4);
      const rs = roots(v, 0, T);
      if (rs.length < 1) throw new Retry();
      const first = rs[0]!;
      const acc = derivative(v, T / 2 + 0.3);
      const vals = [first, v(0), acc, rs[1] ?? first + 1.1];
      if (new Set(vals.map((x) => dec(x))).size < 4) throw new Retry();
      return {
        stem: `A particle moves along the x-axis with velocity ${m(t`v(t) = ${a}\cos\left(\frac{t^2}{${b}}\right) - 0.5`)} for ${m(t`0 \leq t \leq ${T}`)}. At what time does the particle first change direction?`,
        correct: correct(m(dec(first)), `The velocity first changes sign at $$t \\approx ${dec(first)}$$, found by solving $$v(t) = 0$$ on the calculator.`),
        wrong: [
          wrong(m(dec(vals[1]!)), "This is the initial velocity, not a time."),
          wrong(m(dec(acc)), "This is an acceleration value, not a time when the velocity changes sign."),
          wrong(m(dec(vals[3]!)), "This is a later time; the question asks for the first change of direction."),
        ],
        explanation: `A particle changes direction where $$v(t)$$ changes sign. Graphing $$v$$ on the calculator, the first sign change is at $$t \\approx ${dec(first)}$$.`,
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 5: Analytical Applications of Differentiation
// ---------------------------------------------------------------------------

export const unit5: McqTemplate[] = [
  {
    key: "u5-mvt",
    unit: 5,
    topics: ["mean-value-theorem"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const b = r.int(-6, 6);
      const p = r.int(-3, 2);
      const q = p + r.pick([2, 4, 6]);
      const mid = (p + q) / 2;
      const vals = [mid, p, q, -b / 2];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `Let ${m(t`f(x) = ${poly([1, b, 0])}`)}. What value of ${m("c")} satisfies the conclusion of the Mean Value Theorem for ${m("f")} on the interval ${m(t`[${p}, ${q}]`)}?`,
        correct: correct(m(mid), t`The average rate of change is ${m(t`\frac{f(${q}) - f(${p})}{${q - p}} = ${p + q + b}`)}, and ${m(t`f'(c) = ${poly([2, b], "c")} = ${p + q + b}`)} gives ${m(t`c = ${mid}`)}.`),
        wrong: [
          wrong(m(p), "The MVT guarantees a point strictly inside the interval, and this endpoint doesn't satisfy the equation."),
          wrong(m(q), "The MVT guarantees a point strictly inside the interval, and this endpoint doesn't satisfy the equation."),
          wrong(m(F(-b, 2)), "This is where f′(c) = 0, the vertex, not where f′(c) equals the average rate of change."),
        ],
        explanation: t`${m(t`\frac{f(${q}) - f(${p})}{${q} - ${par(p)}} = ${p + q + b}`)}. Set ${m(t`f'(c) = ${poly([2, b], "c")} = ${p + q + b}`)}: ${m(t`c = ${mid}`)}, which lies in ${m(t`(${p}, ${q})`)}.`,
      };
    },
  },
  {
    key: "u5-relative-extrema",
    unit: 5,
    topics: ["first-derivative-test", "extreme-value-theorem"],
    skills: ["1", "3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const p = r.int(-3, 2);
      const q = p + r.pick([1, 2, 3, 4]);
      if (p === 0 || q === 0 || p + q === 0) throw new Retry();
      // f'(x) = 6(x - p)(x - q)
      const c = [2, -3 * (p + q), 6 * p * q, 0];
      const wantMax = r.next() < 0.5;
      const ans = wantMax ? p : q;
      const other = wantMax ? q : p;
      return {
        stem: `Let ${m(t`f(x) = ${poly(c)}`)}. At what value of ${m("x")} does ${m("f")} have a relative ${wantMax ? "maximum" : "minimum"}?`,
        correct: correct(m(ans), t`${m(t`f'(x) = 6${shift("x", p)}${shift("x", q)}`)} changes from ${wantMax ? "positive to negative" : "negative to positive"} at ${m(t`x = ${ans}`)}.`),
        wrong: [
          wrong(m(other), `At this critical point $$f'$$ changes from ${wantMax ? "negative to positive" : "positive to negative"}, which gives a relative ${wantMax ? "minimum" : "maximum"}.`),
          wrong(m(F(p + q, 2)), "This is where f″ = 0 (the inflection point), not a critical point."),
          wrong(m(0), t`${m("f(0) = 0")}, but ${m("f'(0)")} is not zero, so this is not a critical point.`),
        ],
        explanation: t`${m(t`f'(x) = 6x^2 ${signed(-6 * (p + q))}x ${signed(6 * p * q)} = 6${shift("x", p)}${shift("x", q)}`)}. Testing signs: ${m("f'")} is positive left of ${m(p)}, negative between ${m(p)} and ${m(q)}, positive right of ${m(q)}. So there is a relative maximum at ${m(p)} and a relative minimum at ${m(q)}.`,
      };
    },
  },
  {
    key: "u5-increasing",
    unit: 5,
    topics: ["increasing-decreasing"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(-4, 1);
      const b = a + r.int(2, 5);
      if (r.next() < 0.5) {
        const opts = [`$$x < ${a}$$ and $$x > ${b}$$`, `$$${a} < x < ${b}$$ only`, `$$x > ${b}$$ only`, `$$x < ${a}$$ only`];
        return {
          stem: `The derivative of a function ${m("f")} is ${m(t`f'(x) = ${shift("x", a)}${shift("x", b)}`)}. On which intervals is ${m("f")} increasing?`,
          correct: correct(opts[0]!, t`${m("f'(x) > 0")} when both factors have the same sign: ${m(t`x < ${a}`)} or ${m(t`x > ${b}`)}.`),
          wrong: [
            wrong(opts[1]!, "Between the roots the factors have opposite signs, so f′ < 0 and f is decreasing."),
            wrong(opts[2]!, `This misses $$x < ${a}$$, where both factors are negative so f′ > 0.`),
            wrong(opts[3]!, `This misses $$x > ${b}$$, where both factors are positive.`),
          ],
          explanation: t`${m("f")} increases where ${m("f'(x) > 0")}. A sign chart for ${m(t`${shift("x", a)}${shift("x", b)}`)} is positive, negative, positive across ${m(a)} and ${m(b)}.`,
        };
      }
      const opts = [`$$x > ${b}$$ only`, `$$x < ${a}$$ and $$x > ${b}$$`, `$$${a} < x < ${b}$$`, `$$x > ${a}$$`];
      return {
        stem: `The derivative of a function ${m("f")} is ${m(t`f'(x) = ${shift("x", a)}^2${shift("x", b)}`)}. On which intervals is ${m("f")} increasing?`,
        correct: correct(opts[0]!, t`The squared factor is never negative, so the sign of ${m("f'")} matches ${m(shiftBare("x", b))}.`),
        wrong: [
          wrong(opts[1]!, `The squared factor does not change sign at $$x = ${a}$$, so f′ < 0 for $$x < ${a}$$.`),
          wrong(opts[2]!, `Here f′ < 0 because $$${shiftBare("x", b)} < 0$$.`),
          wrong(opts[3]!, `On $$${a} < x < ${b}$$ the factor $$${shiftBare("x", b)}$$ is negative.`),
        ],
        explanation: t`${m(t`${shift("x", a)}^2 \geq 0`)} for all ${m("x")}, so ${m("f'(x) > 0")} exactly when ${m(t`x > ${b}`)}. Note ${m("f'")} does not change sign at ${m(a)}, so there is no extremum there.`,
      };
    },
  },
  {
    key: "u5-candidates",
    unit: 5,
    topics: ["candidates-test", "extreme-value-theorem"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const k = r.int(1, 3);
      const L = -k - r.int(0, 2);
      const R = k + r.int(0, 3);
      const d = r.int(-5, 5);
      const f = (x: number) => x ** 3 - 3 * k * k * x + d;
      const cands = [L, -k, k, R];
      const vals = cands.map(f);
      const max = Math.max(...vals);
      const min = Math.min(...vals);
      const w = [f(-k), f(R), min, f(L)].filter((v) => v !== max);
      const uniq = [...new Set(w)].slice(0, 3);
      if (uniq.length < 3) throw new Retry();
      return {
        stem: `What is the absolute maximum value of ${m(t`f(x) = ${poly([1, 0, -3 * k * k, d])}`)} on the closed interval ${m(t`[${L}, ${R}]`)}?`,
        correct: correct(m(max), t`Compare ${m("f")} at the critical points ${m(t`x = \pm ${k}`)} and the endpoints: the largest value is ${m(max)}.`),
        wrong: uniq.map((v) => wrong(m(v), v === min ? "This is the absolute minimum value." : "This is a candidate value, but not the largest one. Check every critical point and both endpoints.")),
        explanation: t`${m(t`f'(x) = 3x^2 - ${3 * k * k} = 0`)} at ${m(t`x = \pm ${k}`)}. Candidates: ${m(t`f(${L}) = ${vals[0]}`)}, ${m(t`f(${-k}) = ${vals[1]}`)}, ${m(t`f(${k}) = ${vals[2]}`)}, ${m(t`f(${R}) = ${vals[3]}`)}. The absolute maximum is ${m(max)}.`,
      };
    },
  },
  {
    key: "u5-inflection",
    unit: 5,
    topics: ["concavity", "connecting-f-fprime-fdoubleprime"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const a = r.nz(-2, 2);
      const p = r.nz(-3, 3);
      const b = -3 * a * p;
      const c = r.int(-6, 6);
      const d = r.int(-5, 5);
      const vals = [F(p), F(-p), F(3 * p, 2), F(0)];
      if (new Set(vals.map(String)).size < 4) throw new Retry();
      return {
        stem: `At what value of ${m("x")} does the graph of ${m(t`f(x) = ${poly([a, b, c, d])}`)} have a point of inflection?`,
        correct: correct(m(p), t`${m(t`f''(x) = ${poly([6 * a, 2 * b])}`)} is zero and changes sign at ${m(t`x = ${p}`)}.`),
        wrong: [
          wrong(m(-p), "Sign error when solving f″(x) = 0."),
          wrong(m(F(3 * p, 2)), "This is −b/(2a), the vertex formula for a parabola, applied to the cubic's coefficients. Set f″(x) = 0 instead."),
          wrong(m(0), "Inflection points are where f″ changes sign, not where f″ has its constant term."),
        ],
        explanation: t`${m(t`f'(x) = ${poly([3 * a, 2 * b, c])}`)} and ${m(t`f''(x) = ${poly([6 * a, 2 * b])}`)}. ${m("f''")} is linear, so it changes sign at its zero, ${m(t`x = ${p}`)}.`,
      };
    },
  },
  {
    key: "u5-second-derivative-test",
    unit: 5,
    topics: ["second-derivative-test"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const c = r.int(-4, 5);
      const s = r.pick([-1, 0, 1]) * r.int(1, 6);
      const opts = {
        max: `$$f$$ has a relative maximum at $$x = ${c}$$.`,
        min: `$$f$$ has a relative minimum at $$x = ${c}$$.`,
        infl: `$$f$$ has a point of inflection at $$x = ${c}$$.`,
        none: "There is not enough information to classify $$x = " + c + "$$.",
      };
      const stem = `A twice-differentiable function ${m("f")} satisfies ${m(t`f'(${c}) = 0`)} and ${m(t`f''(${c}) = ${s}`)}. Which of the following must be true?`;
      if (s < 0)
        return {
          stem,
          correct: correct(opts.max, "f′ = 0 and f″ < 0: the graph is concave down at a horizontal tangent."),
          wrong: [wrong(opts.min, "A minimum needs f″ > 0."), wrong(opts.infl, "f″ is not zero, so this is not a candidate for inflection."), wrong(opts.none, "The second derivative test applies because f″ ≠ 0.")],
          explanation: "By the Second Derivative Test, $$f'(c) = 0$$ with $$f''(c) < 0$$ gives a relative maximum.",
        };
      if (s > 0)
        return {
          stem,
          correct: correct(opts.min, "f′ = 0 and f″ > 0: the graph is concave up at a horizontal tangent."),
          wrong: [wrong(opts.max, "A maximum needs f″ < 0."), wrong(opts.infl, "f″ is not zero, so this is not a candidate for inflection."), wrong(opts.none, "The second derivative test applies because f″ ≠ 0.")],
          explanation: "By the Second Derivative Test, $$f'(c) = 0$$ with $$f''(c) > 0$$ gives a relative minimum.",
        };
      return {
        stem,
        correct: correct(opts.none, "When f″(c) = 0 the Second Derivative Test is inconclusive: $$x^3$$, $$x^4$$ and $$-x^4$$ all have f′(0) = f″(0) = 0."),
        wrong: [wrong(opts.max, "$$-x^4$$ has a maximum, but $$x^4$$ has a minimum with the same conditions."), wrong(opts.min, "$$x^4$$ has a minimum, but $$-x^4$$ has a maximum with the same conditions."), wrong(opts.infl, "$$x^3$$ has an inflection point there, but $$x^4$$ does not.")],
        explanation: "With $$f''(c) = 0$$ the test gives no conclusion. Use the First Derivative Test instead.",
      };
    },
  },
  {
    key: "u5-optimization",
    unit: 5,
    topics: ["introduction-to-optimization", "solving-optimization"],
    skills: ["1", "3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const P = 8 * r.int(5, 30);
        const ans = (P * P) / 8;
        const vals = [ans, (P * P) / 16, (P * P) / 9, (P * P) / 4];
        return {
          stem: `A farmer has ${P} meters of fencing to enclose a rectangular field along a straight river. No fence is needed along the river. What is the largest possible area of the field, in square meters?`,
          correct: correct(m(ans), t`With width ${m("x")} perpendicular to the river, ${m(t`A = x(${P} - 2x)`)}, maximized at ${m(t`x = ${P / 4}`)}.`),
          wrong: [
            wrong(m(vals[1]!), "This fences all four sides (a square), but the river side needs no fence."),
            wrong(m(vals[2]!), "This makes all three fenced sides equal, which is not optimal."),
            wrong(m(vals[3]!), "This doesn't account for the two equal sides perpendicular to the river."),
          ],
          explanation: t`${m(t`A(x) = x(${P} - 2x)`)}, ${m(t`A'(x) = ${P} - 4x = 0`)} at ${m(t`x = ${P / 4}`)}, and ${m("A'' = -4 < 0")}, so this is a maximum. The dimensions are ${m(P / 4)} by ${m(P / 2)}, with area ${m(ans)}.`,
        };
      }
      const s = 6 * r.int(1, 6);
      const opts = [s / 6, s / 4, s / 3, s / 2];
      return {
        stem: `An open-top box is made from a ${s}-inch by ${s}-inch square of cardboard by cutting equal squares of side ${m("x")} from each corner and folding up the sides. What value of ${m("x")} gives the box its maximum volume?`,
        correct: correct(m(s / 6), t`${m(t`V = x(${s} - 2x)^2`)}, ${m(t`V' = (${s} - 2x)(${s} - 6x) = 0`)} at ${m(t`x = ${s / 6}`)}.`),
        wrong: [
          wrong(m(opts[1]!), "This is not a critical point of the volume."),
          wrong(m(opts[2]!), "This is not a critical point of the volume."),
          wrong(m(opts[3]!), "At this cut the base has zero width, which gives volume 0 (a minimum)."),
        ],
        explanation: t`${m(t`V'(x) = (${s} - 2x)^2 - 4x(${s} - 2x) = (${s} - 2x)(${s} - 6x)`)}. On ${m(t`0 < x < ${s / 2}`)}, the only critical point is ${m(t`x = ${s / 6}`)}, where ${m("V'")} changes from positive to negative.`,
        ordered: true,
      };
    },
  },
  {
    key: "u5-fprime-graph",
    unit: 5,
    topics: ["sketching-graphs", "connecting-f-fprime-fdoubleprime", "concavity"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const xs = [0, 1, 2, 3, 4, 5, 6];
      const ys = xs.map(() => r.int(-3, 3));
      const segs = xs.slice(0, -1).map((x, i) => ({ x, slope: ys[i + 1]! - ys[i]! }));
      const svg = graphSvg(xs.map((x, i) => [x, ys[i]!] as [number, number]), { xMin: 0, xMax: 6, yMin: -3, yMax: 3, label: "f′" });
      const stimulus = {
        text: "The graph of $$f'$$, the derivative of a function $$f$$, consists of line segments on $$0 \\leq x \\leq 6$$, as shown.",
        svg,
        alt: `Graph of f′: line segments through the points ${xs.map((x, i) => `(${x}, ${ys[i]})`).join(", ")}.`,
      };
      if (r.next() < 0.5) {
        const neg = segs.filter((s) => s.slope < 0);
        const pos = segs.filter((s) => s.slope > 0);
        if (neg.length < 1 || pos.length < 3) throw new Retry();
        const right = r.pick(neg);
        const wrongs = r.sample(pos, 3);
        return {
          stimulus,
          stem: `On which of the following intervals is the graph of ${m("f")} concave down?`,
          correct: correct(m(t`(${right.x}, ${right.x + 1})`), t`${m("f'")} is decreasing there, so ${m("f'' < 0")}.`),
          wrong: wrongs.map((s) => wrong(m(t`(${s.x}, ${s.x + 1})`), "Here f′ is increasing, so f is concave up. Concavity depends on whether f′ increases or decreases, not on the sign of f′.")),
          explanation: "$$f$$ is concave down where $$f'$$ is decreasing, which on this graph means a segment sloping downward.",
        };
      }
      let maxima = 0;
      for (let i = 1; i < ys.length - 1; i++) {
        const before = ys[i - 1]!;
        const at = ys[i]!;
        const after = ys[i + 1]!;
        if (at === 0 && before > 0 && after < 0) maxima++;
        if (at === 0 && (before === 0 || after === 0)) throw new Retry();
      }
      for (let i = 0; i < ys.length - 1; i++) if (ys[i]! > 0 && ys[i + 1]! < 0) maxima++;
      if (ys.some((y, i) => y === 0 && (i === 0 || i === 6))) throw new Retry();
      const counts = [0, 1, 2, 3, 4].filter((n) => n !== maxima).slice(0, 3);
      return {
        stimulus,
        stem: `On the open interval ${m("0 < x < 6")}, at how many values of ${m("x")} does ${m("f")} have a relative maximum?`,
        ordered: true,
        correct: correct(m(maxima), "Count the places where f′ crosses the x-axis from above to below."),
        wrong: counts.map((n) => wrong(m(n), "A relative maximum of f occurs only where f′ changes from positive to negative; touching or crossing upward does not count.")),
        explanation: `$$f$$ has a relative maximum where $$f'$$ changes from positive to negative. On this graph that happens ${maxima} time${maxima === 1 ? "" : "s"}.`,
      };
    },
  },
  {
    key: "u5-implicit-tangents",
    unit: 5,
    topics: ["implicit-relations-behavior"],
    skills: ["1", "3"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const k = r.int(1, 4);
      const C = 3 * k * k;
      return {
        stem: `Consider the curve ${m(t`x^2 - xy + y^2 = ${C}`)}, for which ${m(t`\frac{dy}{dx} = \frac{y - 2x}{2y - x}`)}. At which points on the curve is the tangent line horizontal?`,
        correct: correct(m(t`(${k}, ${2 * k}) \text{ and } (${-k}, ${-2 * k})`), t`Horizontal tangents need ${m("y - 2x = 0")}. Substituting ${m("y = 2x")} gives ${m(t`3x^2 = ${C}`)}.`),
        wrong: [
          wrong(m(t`(${2 * k}, ${k}) \text{ and } (${-2 * k}, ${-k})`), "These have 2y − x = 0, where the denominator is zero: the tangent lines are vertical."),
          wrong(m(t`(${k}, ${-2 * k}) \text{ and } (${-k}, ${2 * k})`), "These points do not lie on the curve."),
          wrong(m(t`(0, \sqrt{${C}}) \text{ and } (0, -\sqrt{${C}})`), "These are the y-intercepts; there the slope is 1/2, not 0."),
        ],
        explanation: t`${m("\\frac{dy}{dx} = 0")} when ${m("y = 2x")} (and ${m(t`2y - x \neq 0`)}). Then ${m(t`x^2 - 2x^2 + 4x^2 = 3x^2 = ${C}`)}, so ${m(t`x = \pm ${k}`)}, giving ${m(t`(${k}, ${2 * k})`)} and ${m(t`(${-k}, ${-2 * k})`)}.`,
      };
    },
  },
  {
    key: "u5-extrema-count-calc",
    unit: 5,
    topics: ["first-derivative-test", "connecting-f-fprime-fdoubleprime"],
    skills: ["2", "3"],
    difficulty: 4,
    calc: true,
    gen(r) {
      const a = r.int(2, 4);
      const b = r.pick([0.5, 1, 1.5]);
      const fp = (x: number) => Math.sin(x * x / a) - b * Math.cos(x) / 2;
      const T = r.int(3, 5);
      const zs = roots(fp, 0.0001, T);
      if (zs.length < 1 || zs.length > 4) throw new Retry();
      const n = zs.length;
      const counts = [n - 1, n + 1, n + 2, n - 2].filter((c) => c >= 0).slice(0, 3);
      return {
        stem: `The derivative of a function ${m("f")} is ${m(t`f'(x) = \sin\left(\frac{x^2}{${a}}\right) - ${dec(b / 2, 2)}\cos x`)}. How many relative extrema does ${m("f")} have on the open interval ${m(t`0 < x < ${T}`)}?`,
        ordered: true,
        correct: correct(m(n), `Graphing $$f'$$ shows it changes sign ${n} time${n === 1 ? "" : "s"} on the interval.`),
        wrong: counts.map((c) => wrong(m(c), "Count the zeros of f′ where it changes sign; graph f′ on the calculator over the whole interval.")),
        explanation: `Relative extrema of $$f$$ occur where $$f'$$ changes sign. On the calculator, $$f'$$ has sign changes at ${zs.map((z) => `$$x \\approx ${dec(z)}$$`).join(", ")}, so $$f$$ has ${n} relative extrema.`,
      };
    },
  },
  {
    key: "u5-absolute-max-calc",
    unit: 5,
    topics: ["candidates-test"],
    skills: ["1"],
    difficulty: 3,
    calc: true,
    gen(r) {
      const k = r.int(2, 5);
      const p = r.pick([1, 2]);
      const f = (x: number) => x ** p * Math.exp(-x / k) + Math.sin(x) / 4;
      const R = r.int(6, 12);
      let best = 0;
      let bestX = 0;
      for (let i = 0; i <= 12000; i++) {
        const x = (R * i) / 12000;
        if (f(x) > best) {
          best = f(x);
          bestX = x;
        }
      }
      const vals = [best, bestX, f(R), f(k * p)];
      if (new Set(vals.map((v) => dec(v))).size < 4) throw new Retry();
      return {
        stem: `What is the absolute maximum value of ${m(t`f(x) = ${p === 1 ? "x" : "x^2"}e^{-x/${k}} + \frac{\sin x}{4}`)} on the interval ${m(t`[0, ${R}]`)}?`,
        correct: correct(m(dec(best)), "Graph f on the calculator and find its maximum on the interval, checking the endpoints too."),
        wrong: [
          wrong(m(dec(bestX)), "This is where the maximum occurs (the x-value), not the maximum value."),
          wrong(m(dec(vals[2]!)), "This is the value at the right endpoint, which is not the largest."),
          wrong(m(dec(vals[3]!)), "This evaluates f at the critical point of the first term alone; the sine term shifts the maximum."),
        ],
        explanation: t`On the calculator, the maximum of ${m("f")} on ${m(t`[0, ${R}]`)} occurs at ${m(t`x \approx ${dec(bestX)}`)}, where ${m(t`f(x) \approx ${dec(best)}`)}. The endpoint values are smaller.`,
      };
    },
  },
];

export { derivative, joinTerms };
