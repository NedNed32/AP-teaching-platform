import { coef, dec, derivative, F, Frac, graphSvg, integrate, joinTerms, m, poly, polyAt, roots, shift, signed, type Rng } from "./lib";
import { pwlIntegral } from "./mcq-units-6-8";
import { Retry, type FrqTemplate } from "./types";

const t = String.raw;

/** Integral of a piecewise-linear function (integer-x vertices) between two rational points. */
function pwlIntegralAt(ys: number[], a: Frac, b: Frac): Frac {
  const at = (x: Frac): Frac => {
    const i = Math.min(Math.floor(x.value), ys.length - 2);
    const s = ys[i + 1]! - ys[i]!;
    return F(ys[i]!).add(x.sub(i).mul(s));
  };
  const sign = a.value <= b.value ? 1 : -1;
  const [lo, hi] = sign === 1 ? [a, b] : [b, a];
  const cuts: Frac[] = [lo];
  for (let k = Math.ceil(lo.value); k <= Math.floor(hi.value); k++) if (k > lo.value && k < hi.value) cuts.push(F(k));
  cuts.push(hi);
  let total = F(0);
  for (let i = 0; i < cuts.length - 1; i++) {
    const x0 = cuts[i]!;
    const x1 = cuts[i + 1]!;
    total = total.add(x1.sub(x0).mul(at(x0).add(at(x1))).div(2));
  }
  return sign === 1 ? total : total.neg();
}

/** Zeros of the piecewise-linear function, with the direction it crosses. */
function pwlZeros(ys: number[]): { x: Frac; dir: "up" | "down" | "touch" }[] {
  const out: { x: Frac; dir: "up" | "down" | "touch" }[] = [];
  for (let i = 0; i < ys.length - 1; i++) {
    const y0 = ys[i]!;
    const y1 = ys[i + 1]!;
    if (y0 !== 0 && y1 !== 0 && y0 * y1 < 0) out.push({ x: F(i).add(F(y0, y0 - y1)), dir: y0 > 0 ? "down" : "up" });
    if (y1 === 0 && i + 1 < ys.length - 1) {
      const y2 = ys[i + 2]!;
      const dir = y0 > 0 && y2 < 0 ? "down" : y0 < 0 && y2 > 0 ? "up" : "touch";
      out.push({ x: F(i + 1), dir });
    }
  }
  return out;
}

const list = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

// ---------------------------------------------------------------------------
// Calculator-active free response (Part A)
// ---------------------------------------------------------------------------

const rateInOut: FrqTemplate = {
  key: "frq-rate-in-out",
  topics: ["accumulation-in-context", "ftc-definite-integrals", "candidates-test"],
  skills: ["1", "3", "4"],
  difficulty: 3,
  calc: true,
  gen(r) {
    const p = r.int(10, 18);
    const q = r.int(3, 6);
    const s = r.int(2, 4);
    const k = r.int(4, 7);
    const W0 = r.int(60, 150);
    const T = 8;
    const E = (x: number) => p + q * Math.sin(x / s);
    const L = (x: number) => k * Math.sqrt(x + 1);
    const net = (x: number) => E(x) - L(x);
    const entered = integrate(E, 0, T);
    const t1 = r.int(2, 6);
    const rate = net(t1);
    if (Math.abs(rate) < 0.05) throw new Retry();
    const zs = roots(net, 0, T);
    const W = (x: number) => W0 + integrate(net, 0, x);
    const cands = [0, ...zs, T].map((x) => ({ x, w: W(x) }));
    const best = cands.reduce((a, b) => (b.w > a.w ? b : a));
    if (zs.length === 0) throw new Retry();
    return {
      title: "Water in a tank",
      stimulus: {
        text: t`Water enters a tank at a rate modeled by ${m(t`E(t) = ${p} + ${q}\sin\left(\frac{t}{${s}}\right)`)} gallons per hour and leaves the tank at a rate modeled by ${m(t`L(t) = ${k}\sqrt{t + 1}`)} gallons per hour, for ${m(t`0 \leq t \leq ${T}`)}. At time ${m("t = 0")} the tank contains ${W0} gallons of water.`,
      },
      parts: [
        {
          prompt: t`How many gallons of water enter the tank during the time interval ${m(t`0 \leq t \leq ${T}`)}?`,
          rubric: [
            { criterion: "Writes a definite integral of $$E$$ over the interval.", example: t`${m(t`\int_0^{${T}} E(t)\,dt`)}` },
            { criterion: "Gives the correct value.", example: `${dec(entered)} gallons` },
          ],
        },
        {
          prompt: t`Is the amount of water in the tank increasing or decreasing at time ${m(t`t = ${t1}`)}? Give a reason for your answer.`,
          rubric: [
            {
              criterion: "Concludes correctly, with a reason that compares $$E$$ and $$L$$ (or uses the sign of $$E - L$$).",
              example: t`${m(t`E(${t1}) - L(${t1}) \approx ${dec(rate)}`)}, which is ${rate > 0 ? "positive, so the amount is increasing" : "negative, so the amount is decreasing"}.`,
            },
          ],
        },
        {
          prompt: t`At what time ${m("t")}, for ${m(t`0 \leq t \leq ${T}`)}, is the amount of water in the tank greatest? Justify your answer.`,
          rubric: [
            { criterion: "Sets $$E(t) - L(t) = 0$$ to find the critical points.", example: `${list(zs.map((z) => m(t`t \approx ${dec(z)}`)))}` },
            { criterion: "Evaluates the amount at the critical points and the endpoints (Candidates Test).", example: cands.map((c) => m(t`W(${dec(c.x)}) \approx ${dec(c.w)}`)).join(", ") },
            { criterion: "Gives the correct time with justification.", example: t`The amount is greatest at ${m(t`t \approx ${dec(best.x)}`)}.` },
          ],
        },
        {
          prompt: t`How many gallons of water are in the tank at time ${m(t`t = ${T}`)}?`,
          rubric: [
            { criterion: "Uses the initial amount plus the integral of the net rate.", example: t`${m(t`${W0} + \int_0^{${T}} (E(t) - L(t))\,dt`)}` },
            { criterion: "Gives the correct value.", example: `${dec(W(T))} gallons` },
          ],
        },
      ],
    };
  },
};

const particleCalc: FrqTemplate = {
  key: "frq-particle-calc",
  topics: ["straight-line-motion", "motion-with-integrals"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: true,
  gen(r) {
    const a = r.int(2, 5);
    const b = r.int(2, 6);
    const c = r.pick([0.5, 1, 1.5]);
    const T = r.int(4, 6);
    const x0 = r.int(-4, 6);
    const v = (x: number) => a * Math.sin(x * x / b) - c;
    const k = r.int(1, T - 1) + 0.5;
    const vk = v(k);
    const ak = derivative(v, k);
    if (Math.abs(vk) < 0.05 || Math.abs(ak) < 0.05) throw new Retry();
    const speeding = vk * ak > 0;
    const xT = x0 + integrate(v, 0, T);
    const dist = integrate((x) => Math.abs(v(x)), 0, T, 8000);
    const zs = roots(v, 0, T);
    if (zs.length === 0) throw new Retry();
    return {
      title: "A particle in motion",
      stimulus: {
        text: t`A particle moves along the x-axis. Its velocity is given by ${m(t`v(t) = ${a}\sin\left(\frac{t^2}{${b}}\right) - ${c}`)} for ${m(t`0 \leq t \leq ${T}`)}. At time ${m("t = 0")} the particle is at position ${m(t`x = ${x0}`)}.`,
      },
      parts: [
        {
          prompt: t`Find the acceleration of the particle at time ${m(t`t = ${k}`)}. Is the speed of the particle increasing or decreasing at that time? Give a reason.`,
          rubric: [
            { criterion: "Gives the correct acceleration.", example: t`${m(t`a(${k}) = v'(${k}) \approx ${dec(ak)}`)}` },
            {
              criterion: "Concludes about the speed by comparing the signs of velocity and acceleration.",
              example: t`${m(t`v(${k}) \approx ${dec(vk)}`)}. Velocity and acceleration have ${speeding ? "the same sign, so the speed is increasing" : "opposite signs, so the speed is decreasing"}.`,
            },
          ],
        },
        {
          prompt: t`Find the position of the particle at time ${m(t`t = ${T}`)}.`,
          rubric: [
            { criterion: "Uses the initial position plus the integral of velocity.", example: t`${m(t`x(${T}) = ${x0} + \int_0^{${T}} v(t)\,dt`)}` },
            { criterion: "Gives the correct position.", example: m(dec(xT)) },
          ],
        },
        {
          prompt: t`Find the total distance traveled by the particle over ${m(t`0 \leq t \leq ${T}`)}.`,
          rubric: [
            { criterion: "Integrates the absolute value of velocity (or splits at the sign changes).", example: t`${m(t`\int_0^{${T}} |v(t)|\,dt`)}` },
            { criterion: "Gives the correct distance.", example: m(dec(dist)) },
          ],
        },
        {
          prompt: t`At what times in the interval ${m(t`0 < t < ${T}`)} does the particle change direction? Justify your answer.`,
          rubric: [
            {
              criterion: "Identifies the times where $$v$$ changes sign, with justification.",
              example: `$$v(t)$$ changes sign at ${list(zs.map((z) => m(t`t \approx ${dec(z)}`)))}, so the particle changes direction there.`,
            },
          ],
        },
      ],
    };
  },
};

const areaVolumeCalc: FrqTemplate = {
  key: "frq-area-volume-calc",
  topics: ["area-between-curves-x", "washer-method-other-axes", "cross-sections-squares-rectangles"],
  skills: ["1", "2"],
  difficulty: 4,
  calc: true,
  gen(r) {
    const k = r.int(2, 4);
    const c = r.int(1, 2);
    const f = (x: number) => k * Math.cos(x / 2);
    const g = (x: number) => x * x - c;
    const xs = roots((x) => f(x) - g(x), -4, 4);
    if (xs.length !== 2) throw new Retry();
    const [a, b] = xs as [number, number];
    const line = -(c + 1);
    const area = integrate((x) => f(x) - g(x), a, b);
    const vol = Math.PI * integrate((x) => (f(x) - line) ** 2 - (g(x) - line) ** 2, a, b);
    const sq = integrate((x) => (f(x) - g(x)) ** 2, a, b);
    return {
      title: "Area and volume",
      stimulus: {
        text: t`Let ${m("R")} be the region enclosed by the graphs of ${m(t`f(x) = ${k}\cos\left(\frac{x}{2}\right)`)} and ${m(t`g(x) = x^2 - ${c}`)}.`,
      },
      parts: [
        {
          prompt: t`Find the area of ${m("R")}.`,
          rubric: [
            { criterion: "Finds the limits of integration (the intersection points).", example: t`${m(t`x \approx ${dec(a)}`)} and ${m(t`x \approx ${dec(b)}`)}` },
            { criterion: "Writes the integral of top minus bottom.", example: t`${m(t`\int_{${dec(a)}}^{${dec(b)}} (f(x) - g(x))\,dx`)}` },
            { criterion: "Gives the correct area.", example: m(dec(area)) },
          ],
        },
        {
          prompt: t`Find the volume of the solid generated when ${m("R")} is revolved about the horizontal line ${m(t`y = ${line}`)}.`,
          rubric: [
            { criterion: "Uses the washer method with radii measured from the line.", example: t`${m(t`\pi\int_{${dec(a)}}^{${dec(b)}} \left[(f(x) + ${-line})^2 - (g(x) + ${-line})^2\right]dx`)}` },
            { criterion: "Gives the correct volume.", example: m(dec(vol)) },
          ],
        },
        {
          prompt: t`The region ${m("R")} is the base of a solid. Cross sections perpendicular to the x-axis are squares. Find the volume of the solid.`,
          rubric: [
            { criterion: "Writes the integral of the side length squared.", example: t`${m(t`\int_{${dec(a)}}^{${dec(b)}} (f(x) - g(x))^2\,dx`)}` },
            { criterion: "Gives the correct volume.", example: m(dec(sq)) },
          ],
        },
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// No-calculator free response (Part B)
// ---------------------------------------------------------------------------

const graphAccumulation: FrqTemplate = {
  key: "frq-graph-accumulation",
  topics: ["ftc-accumulation-functions", "accumulation-functions-behavior", "first-derivative-test", "concavity"],
  skills: ["2", "3"],
  difficulty: 3,
  calc: false,
  gen(r) {
    const xs = [0, 1, 2, 3, 4, 5, 6];
    const ys = xs.map(() => r.int(-3, 3));
    if (ys[0] === 0 || ys[6] === 0) throw new Retry();
    const zeros = pwlZeros(ys);
    if (!zeros.some((z) => z.dir !== "touch")) throw new Retry();
    const base = 2;
    const g = (x: Frac) => pwlIntegralAt(ys, F(base), x);
    const k = r.pick([0.5, 1.5, 2.5, 3.5, 4.5, 5.5]);
    const j = Math.floor(k);
    const gp = F(ys[j]! + ys[j + 1]!, 2);
    const gpp = ys[j + 1]! - ys[j]!;
    const maxima = zeros.filter((z) => z.dir === "down");
    const cands = [F(0), ...zeros.filter((z) => z.dir !== "touch").map((z) => z.x), F(6)];
    const vals = cands.map((x) => ({ x, g: g(x) }));
    const top = vals.reduce((a, b) => (b.g.value > a.g.value ? b : a));
    const svg = graphSvg(xs.map((x, i) => [x, ys[i]!] as [number, number]), { xMin: 0, xMax: 6, yMin: -3, yMax: 3, label: "f" });
    return {
      title: "An accumulation function from a graph",
      stimulus: {
        text: t`The continuous function ${m("f")} is defined on ${m(t`0 \leq x \leq 6`)}. Its graph consists of line segments, as shown. Let ${m(t`g(x) = \int_{${base}}^{x} f(t)\,dt`)}.`,
        svg,
        alt: `Graph of f: line segments through ${xs.map((x, i) => `(${x}, ${ys[i]})`).join(", ")}.`,
      },
      parts: [
        {
          prompt: t`Find ${m("g(0)")} and ${m("g(6)")}.`,
          rubric: [
            { criterion: "Finds $$g(0)$$, reversing the limits correctly.", example: t`${m(t`g(0) = -\int_0^{${base}} f(t)\,dt = ${g(F(0)).tex()}`)}` },
            { criterion: "Finds $$g(6)$$.", example: t`${m(t`g(6) = ${g(F(6)).tex()}`)}` },
          ],
        },
        {
          prompt: t`Find ${m(t`g'(${k})`)} and ${m(t`g''(${k})`)}.`,
          rubric: [
            { criterion: "Uses $$g' = f$$.", example: t`${m(t`g'(${k}) = f(${k}) = ${gp.tex()}`)}` },
            { criterion: "Uses $$g'' = f'$$, the slope of the segment.", example: t`${m(t`g''(${k}) = f'(${k}) = ${gpp}`)}` },
          ],
        },
        {
          prompt: t`On the open interval ${m("0 < x < 6")}, find all values of ${m("x")} at which ${m("g")} has a relative maximum. Justify your answer.`,
          rubric: [
            {
              criterion: "Identifies the correct values (or that there are none).",
              example: maxima.length ? m(t`x = ${maxima.map((z) => z.x.tex()).join(", ")}`) : "There are none.",
            },
            {
              criterion: "Justifies using a sign change of $$g' = f$$ from positive to negative.",
              example: maxima.length ? "$$g' = f$$ changes from positive to negative there." : "$$f$$ never changes from positive to negative on the interval.",
            },
          ],
        },
        {
          prompt: t`Find the absolute maximum value of ${m("g")} on ${m(t`0 \leq x \leq 6`)}. Justify your answer.`,
          rubric: [
            { criterion: "Considers the endpoints and every critical point (Candidates Test).", example: vals.map((v) => m(t`g(${v.x.tex()}) = ${v.g.tex()}`)).join(", ") },
            { criterion: "Gives the correct maximum value.", example: t`The absolute maximum is ${m(top.g.tex())}, at ${m(t`x = ${top.x.tex()}`)}.` },
          ],
        },
      ],
    };
  },
};

const tableRates: FrqTemplate = {
  key: "frq-table",
  topics: ["estimating-derivatives", "riemann-sums", "mean-value-theorem", "intermediate-value-theorem"],
  skills: ["2", "3", "4"],
  difficulty: 3,
  calc: false,
  gen(r) {
    const ts = [0, 3, 5, 9, 12];
    const vs = ts.map(() => r.int(20, 80));
    vs[3] = vs[1]!;
    if (vs[2] === vs[1]) throw new Retry();
    const i = 2;
    const est = F(vs[3]! - vs[1]!, ts[3]! - ts[1]!);
    const est2 = F(vs[2 + 1]! - vs[2 - 1]!, 6);
    void est2;
    const d = F(vs[i + 1]! - vs[i]!, ts[i + 1]! - ts[i]!);
    const widths = ts.slice(1).map((x, j) => x - ts[j]!);
    const trap = widths.reduce((s, w, j) => s.add(F(w * (vs[j]! + vs[j + 1]!), 2)), F(0));
    const lo = Math.min(vs[0]!, vs[1]!);
    const hi = Math.max(vs[0]!, vs[1]!);
    if (hi - lo < 2) throw new Retry();
    const target = r.int(lo + 1, hi - 1);
    void est;
    return {
      title: "Rate of people entering a park",
      stimulus: {
        text: "People enter an amusement park at a rate modeled by a differentiable function $$P$$, where $$P(t)$$ is measured in people per minute and $$t$$ is measured in minutes. Selected values are shown.",
        table: {
          caption: "Values of P(t)",
          columns: [{ key: "t", label: "$$t$$ (minutes)" }, { key: "p", label: "$$P(t)$$ (people per minute)" }],
          rows: ts.map((x, j) => ({ t: x, p: vs[j]! })),
        },
      },
      parts: [
        {
          prompt: t`Use the data to estimate ${m(t`P'(${(ts[i]! + ts[i + 1]!) / 2})`)}. Show the computations and indicate units.`,
          rubric: [
            { criterion: "Uses a difference quotient on the interval containing the time.", example: t`${m(t`\frac{P(${ts[i + 1]}) - P(${ts[i]})}{${ts[i + 1]} - ${ts[i]}} = ${d.tex()}`)}` },
            { criterion: "Gives correct units.", example: "people per minute per minute" },
          ],
        },
        {
          prompt: t`Use a trapezoidal sum with the four subintervals shown in the table to approximate ${m(t`\int_0^{12} P(t)\,dt`)}. Explain the meaning of this integral in the context of the problem.`,
          rubric: [
            { criterion: "Sets up the trapezoidal sum with unequal widths.", example: widths.map((w, j) => t`\frac{${w}}{2}(${vs[j]} + ${vs[j + 1]})`).map((s) => m(s)).join(" + ") },
            { criterion: "Gives the correct value.", example: m(trap) },
            { criterion: "Interprets the integral with units.", example: "The total number of people who enter the park during the first 12 minutes." },
          ],
        },
        {
          prompt: t`Must there be a time ${m("c")}, for ${m(t`${ts[1]} < c < ${ts[3]}`)}, such that ${m("P'(c) = 0")}? Justify your answer.`,
          rubric: [
            {
              criterion: "Answers yes, citing the Mean Value Theorem (or Rolle's Theorem) with its conditions.",
              example: t`Yes. ${m("P")} is differentiable (so continuous), and ${m(t`P(${ts[1]}) = P(${ts[3]}) = ${vs[1]}`)}. By the Mean Value Theorem there is a ${m("c")} with ${m(t`P'(c) = \frac{${vs[1]} - ${vs[1]}}{${ts[3]! - ts[1]!}} = 0`)}.`,
            },
          ],
        },
        {
          prompt: t`Must there be a time ${m("t")}, for ${m(t`0 < t < ${ts[1]}`)}, at which ${m(t`P(t) = ${target}`)}? Justify your answer.`,
          rubric: [
            {
              criterion: "Answers yes, citing the Intermediate Value Theorem and continuity.",
              example: t`Yes. ${m("P")} is continuous, and ${m(target)} is between ${m(t`P(0) = ${vs[0]}`)} and ${m(t`P(${ts[1]}) = ${vs[1]}`)}, so the IVT guarantees such a ${m("t")}.`,
            },
          ],
        },
      ],
    };
  },
};

const diffEq: FrqTemplate = {
  key: "frq-differential-equation",
  topics: ["sketching-slope-fields", "particular-solutions", "separation-of-variables", "local-linearity"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  gen(r) {
    const k = r.pick([2, 4]);
    const c = r.int(-2, 3);
    const y1 = c + r.nz(-3, 3);
    // dy/dx = kx(y - c), through (1, y1). Solution: y = c + (y1 - c)e^{k(x^2 - 1)/2}.
    const slope = (x: number, y: number) => k * x * (y - c);
    const pts: [number, number][] = [[-1, c + 1], [0, c + 2], [1, c - 1], [2, c]];
    const m1 = slope(1, y1);
    const approx = F(y1).add(F(m1, 5));
    const conc = k * (y1 - c) * (1 + k);
    const half = k / 2;
    const expo = half === 1 ? "x^2 - 1" : t`${half}(x^2 - 1)`;
    const yc = c === 0 ? "y" : `y ${signed(-c)}`;
    return {
      title: "A differential equation",
      stimulus: {
        text: t`Consider the differential equation ${m(t`\frac{dy}{dx} = ${k}x(${yc})`)}. Let ${m("y = f(x)")} be the particular solution with ${m(t`f(1) = ${y1}`)}.`,
      },
      parts: [
        {
          prompt: `Find the slope of the slope-field segment at each of the points ${list(pts.map(([x, y]) => m(t`(${x}, ${y})`)))}.`,
          rubric: [{ criterion: "Gives all four slopes correctly.", example: pts.map(([x, y]) => m(t`(${x}, ${y}): ${slope(x, y)}`)).join("; ") }],
        },
        {
          prompt: t`Write an equation for the line tangent to the graph of ${m("f")} at ${m("x = 1")}, and use it to approximate ${m("f(1.2)")}.`,
          rubric: [
            { criterion: "Finds the slope at the point and writes the tangent line.", example: t`${m(t`\frac{dy}{dx}\Big|_{(1, ${y1})} = ${m1}`)}; ${m(t`y = ${y1} ${signed(m1)}(x - 1)`)}` },
            { criterion: "Gives the approximation.", example: m(t`f(1.2) \approx ${dec(approx.value, 1)}`) },
          ],
        },
        {
          prompt: t`Find ${m(t`\frac{d^2y}{dx^2}`)} in terms of ${m("x")} and ${m("y")}. Is the approximation in part (b) an overestimate or an underestimate? Explain.`,
          rubric: [
            { criterion: "Finds the second derivative.", example: t`${m(t`\frac{d^2y}{dx^2} = ${k}(${yc}) + ${k}x\frac{dy}{dx} = ${k}(${yc})(1 + ${k}x^2)`)}` },
            {
              criterion: "Uses the sign of the second derivative at the point to conclude.",
              example: t`At ${m(t`(1, ${y1})`)}, ${m(t`\frac{d^2y}{dx^2} = ${conc}`)}${conc > 0 ? ", so f is concave up and the tangent line lies below the curve: an underestimate." : ", so f is concave down and the tangent line lies above the curve: an overestimate."}`,
            },
          ],
        },
        {
          prompt: t`Find the particular solution ${m("y = f(x)")} with ${m(t`f(1) = ${y1}`)}.`,
          rubric: [
            { criterion: "Separates the variables.", example: t`${m(t`\frac{dy}{${yc}} = ${k}x\,dx`)}` },
            { criterion: "Antidifferentiates both sides.", example: t`${m(t`\ln|${yc}| = ${coef(half, "x^2")} + C`)}` },
            { criterion: "Uses the initial condition.", example: t`${m(t`C = \ln${Math.abs(y1 - c)} - ${half}`)}` },
            { criterion: "Solves for $$y$$.", example: m(t`y = ${joinTerms([c === 0 ? "" : String(c), coef(y1 - c, t`e^{${expo}}`)])}`) },
          ],
        },
      ],
    };
  },
};

const implicitCurve: FrqTemplate = {
  key: "frq-implicit-curve",
  topics: ["implicit-differentiation", "implicit-relations-behavior", "higher-order-derivatives"],
  skills: ["1", "3"],
  difficulty: 4,
  calc: false,
  gen(r) {
    const kk = r.pick([1, -1]);
    const pts: [number, number, number][] = [];
    for (let p = -4; p <= 4; p++) {
      for (let q = -4; q <= 4; q++) {
        const C = p * p + kk * p * q + q * q;
        const mm = Math.sqrt(C / 3);
        if (C > 0 && Number.isInteger(mm) && kk * p + 2 * q !== 0 && 2 * p + kk * q !== 0) pts.push([p, q, mm]);
      }
    }
    const [p, q, mm] = r.pick(pts);
    const C = p * p + kk * p * q + q * q;
    const N = 2 * p + kk * q;
    const D = kk * p + 2 * q;
    const yp = F(-N, D);
    const Np = F(kk).mul(yp).add(2);
    const Dp = F(2).mul(yp).add(kk);
    const ypp = Np.mul(D).sub(Dp.mul(N)).div(D * D).neg();
    const mid = kk === 1 ? "+ xy" : "- xy";
    const yh = -2 * kk; // horizontal tangents where y = -2x/kk
    return {
      title: "An implicitly defined curve",
      stimulus: { text: t`Consider the curve given by ${m(t`x^2 ${mid} + y^2 = ${C}`)}.` },
      parts: [
        {
          prompt: t`Show that ${m(t`\frac{dy}{dx} = -\frac{2x ${kk === 1 ? "+" : "-"} y}{${kk === 1 ? "" : "-"}x + 2y}`)}.`,
          rubric: [
            { criterion: "Differentiates implicitly, using the product rule on the $$xy$$ term.", example: t`${m(t`2x ${kk === 1 ? "+" : "-"} \left(y + x\frac{dy}{dx}\right) + 2y\frac{dy}{dx} = 0`)}` },
            { criterion: "Solves for $$\\frac{dy}{dx}$$ to reach the given expression.", example: t`${m(t`\frac{dy}{dx}(${kk === 1 ? "" : "-"}x + 2y) = -(2x ${kk === 1 ? "+" : "-"} y)`)}` },
          ],
        },
        {
          prompt: t`Write an equation for the line tangent to the curve at the point ${m(t`(${p}, ${q})`)}.`,
          rubric: [{ criterion: "Finds the slope and writes the line.", example: t`${m(t`\frac{dy}{dx} = ${yp.tex()}`)}, so ${m(t`y ${signed(-q)} = ${yp.tex()}${shift("x", p)}`)}` }],
        },
        {
          prompt: t`Find the coordinates of every point on the curve at which the tangent line is horizontal.`,
          rubric: [
            { criterion: "Sets the numerator equal to zero.", example: t`${m(t`2x ${kk === 1 ? "+" : "-"} y = 0`)}, so ${m(t`y = ${coef(yh, "x")}`)}` },
            { criterion: "Substitutes into the curve and solves.", example: t`${m(t`3x^2 = ${C}`)}, so ${m(t`x = \pm ${mm}`)}` },
            { criterion: "Gives both points.", example: t`${m(t`(${mm}, ${yh * mm})`)} and ${m(t`(${-mm}, ${-yh * mm})`)}` },
          ],
        },
        {
          prompt: t`Find ${m(t`\frac{d^2y}{dx^2}`)} at the point ${m(t`(${p}, ${q})`)}.`,
          rubric: [
            { criterion: "Differentiates $$\\frac{dy}{dx}$$ with the quotient rule, treating $$y$$ as a function of $$x$$.", example: t`${m(t`\frac{d^2y}{dx^2} = -\frac{(2 ${kk === 1 ? "+" : "-"} y')(${kk === 1 ? "" : "-"}x + 2y) - (2x ${kk === 1 ? "+" : "-"} y)(${kk === 1 ? "" : "-"}1 + 2y')}{(${kk === 1 ? "" : "-"}x + 2y)^2}`)}` },
            { criterion: "Gives the correct value.", example: m(ypp) },
          ],
        },
      ],
    };
  },
};

const functionAnalysis: FrqTemplate = {
  key: "frq-function-analysis",
  topics: ["first-derivative-test", "concavity", "candidates-test", "lhospitals-rule"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  gen(r) {
    const p = r.int(-2, 1);
    const q = p + r.pick([2, 3, 4]);
    const d = r.int(-5, 5);
    const c = [2, -3 * (p + q), 6 * p * q, d];
    const L = p - r.int(1, 2);
    const R = q + r.int(0, 1);
    const f = (x: number) => polyAt(c, x);
    const cands = [L, p, q, R];
    const vals = cands.map(f);
    const best = Math.max(...vals);
    const where = cands.filter((x, i) => vals[i] === best);
    const infl = F(p + q, 2);
    return {
      title: "Analyzing a function",
      stimulus: { text: t`Let ${m(t`f(x) = ${poly(c)}`)}.` },
      parts: [
        {
          prompt: t`Find the x-coordinates of all relative extrema of ${m("f")}, and classify each as a relative maximum or relative minimum. Justify your answer.`,
          rubric: [
            { criterion: "Finds the critical points.", example: t`${m(t`f'(x) = 6${shift("x", p)}${shift("x", q)} = 0`)} at ${m(t`x = ${p}`)} and ${m(t`x = ${q}`)}` },
            { criterion: "Classifies both with a sign-change justification.", example: t`${m("f'")} changes from positive to negative at ${m(p)} (relative maximum) and from negative to positive at ${m(q)} (relative minimum).` },
          ],
        },
        {
          prompt: t`On what intervals is the graph of ${m("f")} concave down? Give a reason.`,
          rubric: [{ criterion: "Gives the interval with a reason based on $$f''$$.", example: t`${m(t`f''(x) = ${poly([12, -6 * (p + q)])} < 0`)} for ${m(t`x < ${infl.tex()}`)}` }],
        },
        {
          prompt: t`Find the absolute maximum value of ${m("f")} on the closed interval ${m(t`[${L}, ${R}]`)}. Justify your answer.`,
          rubric: [
            { criterion: "Evaluates $$f$$ at the critical points and endpoints.", example: cands.map((x, i) => m(t`f(${x}) = ${vals[i]}`)).join(", ") },
            { criterion: "Gives the absolute maximum value.", example: t`${m(best)}, at ${m(t`x = ${where.join(", ")}`)}` },
          ],
        },
        {
          prompt: t`Find ${m(t`\lim_{x \to ${p}} \frac{f(x) - f(${p})}{(x ${p < 0 ? "+" : "-"} ${Math.abs(p)})^2}`)}.`.replace("(x - 0)^2", "x^2").replace("(x + 0)^2", "x^2"),
          rubric: [
            { criterion: "Recognizes the form 0/0 and applies L'Hospital's Rule (twice, or once with $$f'(" + p + ") = 0$$).", example: t`${m(t`\lim \frac{f'(x)}{2${shift("x", p)}} = \lim \frac{f''(x)}{2}`)}` },
            { criterion: "Gives the correct value.", example: m(t`\frac{f''(${p})}{2} = ${3 * (p - q)}`) },
          ],
        },
      ],
    };
  },
};

const particlePoly: FrqTemplate = {
  key: "frq-particle-polynomial",
  topics: ["straight-line-motion", "motion-with-integrals"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  gen(r) {
    const p = r.int(1, 2);
    const q = p + r.pick([2, 4]);
    const x0 = r.int(-6, 6);
    const T = q + r.int(1, 2);
    const vc = [3, -3 * (p + q), 3 * p * q]; // v = 3(t-p)(t-q)
    const xc = [F(1), F(-3 * (p + q), 2), F(3 * p * q), F(x0)];
    const X = (x: number) => polyAt(xc.map((f) => f.value), x);
    const k = r.int(0, T);
    const vk = polyAt(vc, k);
    const ak = 6 * k - 3 * (p + q);
    if (vk === 0 || ak === 0) throw new Retry();
    const pos = (x: number) => {
      const v = X(x);
      return Number.isInteger(v) ? String(v) : F(Math.round(v * 2), 2).tex();
    };
    const dist = Math.abs(X(p) - X(0)) + Math.abs(X(q) - X(p)) + Math.abs(X(T) - X(q));
    const distTex = Number.isInteger(dist) ? String(dist) : F(Math.round(dist * 2), 2).tex();
    return {
      title: "Particle motion without a calculator",
      stimulus: { text: t`A particle moves along the x-axis with velocity ${m(t`v(t) = ${poly(vc, "t")}`)} for ${m(t`t \geq 0`)}. At time ${m("t = 0")} the particle is at ${m(t`x = ${x0}`)}.` },
      parts: [
        {
          prompt: "At what times does the particle change direction? Justify your answer.",
          rubric: [{ criterion: "Gives both times with a sign-change justification.", example: t`${m(t`v(t) = 3${shift("t", p)}${shift("t", q)}`)} changes sign at ${m(t`t = ${p}`)} and ${m(t`t = ${q}`)}.` }],
        },
        {
          prompt: t`Is the speed of the particle increasing or decreasing at time ${m(t`t = ${k}`)}? Give a reason.`,
          rubric: [
            { criterion: "Finds the velocity and acceleration at the time.", example: t`${m(t`v(${k}) = ${vk}`)}, ${m(t`a(${k}) = ${ak}`)}` },
            { criterion: "Concludes from the signs.", example: vk * ak > 0 ? "Same signs, so the speed is increasing." : "Opposite signs, so the speed is decreasing." },
          ],
        },
        {
          prompt: t`Find the position of the particle at time ${m(t`t = ${T}`)}.`,
          rubric: [
            { criterion: "Uses the initial position and an antiderivative of $$v$$.", example: t`${m(t`x(t) = ${poly(xc, "t")}`)}` },
            { criterion: "Gives the correct position.", example: m(t`x(${T}) = ${pos(T)}`) },
          ],
        },
        {
          prompt: t`Find the total distance traveled by the particle from ${m("t = 0")} to ${m(t`t = ${T}`)}.`,
          rubric: [
            { criterion: "Splits the motion at the turning points.", example: t`${m(t`|x(${p}) - x(0)| + |x(${q}) - x(${p})| + |x(${T}) - x(${q})|`)}` },
            { criterion: "Gives the correct distance.", example: m(distTex) },
          ],
        },
      ],
    };
  },
};

export const frqCalc: FrqTemplate[] = [rateInOut, particleCalc, areaVolumeCalc];
export const frqNoCalc: FrqTemplate[] = [graphAccumulation, tableRates, diffEq, implicitCurve, functionAnalysis, particlePoly];

export { joinTerms, pwlIntegral };
export type { Rng };
