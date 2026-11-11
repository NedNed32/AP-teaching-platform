/* Free-response templates for Calculus BC: parametric/vector motion, polar area, Taylor series. */
import { coef, dec, derivative, F, integrate, joinTerms, m, roots, shiftBare } from "./lib";
import { Retry, type FrqTemplate } from "./types";

const t = String.raw;
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));

export const parametricMotion: FrqTemplate = {
  key: "frq-bc-parametric",
  topics: ["parametric-vector-motion", "parametric-derivatives", "vector-valued-integrals", "parametric-arc-length"],
  skills: ["1", "2", "4"],
  difficulty: 4,
  calc: true,
  gen(r) {
    const a = r.int(2, 4);
    const b = r.int(2, 5);
    const c = r.pick([0.5, 1, 1.5]);
    const xp = (s: number) => a * Math.sin(s * s / b) + c;
    const yp = (s: number) => Math.cos(s) * Math.exp(s / 4);
    const x0 = r.int(-3, 3);
    const y0 = r.int(-3, 3);
    const T = r.int(3, 4);
    const k = r.int(1, T - 1) + 0.5;
    const speed = Math.hypot(xp(k), yp(k));
    const ax = derivative(xp, k);
    const ay = derivative(yp, k);
    const slope = yp(k) / xp(k);
    const X = x0 + integrate(xp, 0, T);
    const Y = y0 + integrate(yp, 0, T);
    const dist = integrate((s) => Math.hypot(xp(s), yp(s)), 0, T, 6000);
    if (Math.abs(xp(k)) < 0.05) throw new Retry();
    return {
      title: "Motion in the plane",
      stimulus: {
        text: t`A particle moves in the xy-plane so that for ${m(t`0 \leq t \leq ${T}`)}, ${m(t`\frac{dx}{dt} = ${a}\sin\left(\frac{t^2}{${b}}\right) + ${c}`)} and ${m(t`\frac{dy}{dt} = \cos(t)\,e^{t/4}`)}. At ${m("t = 0")} the particle is at ${m(t`(${x0}, ${y0})`)}.`,
      },
      parts: [
        {
          prompt: t`Find the speed of the particle and its acceleration vector at ${m(t`t = ${k}`)}.`,
          rubric: [
            { criterion: "Gives the speed.", example: m(t`\sqrt{x'(${k})^2 + y'(${k})^2} \approx ${dec(speed)}`) },
            { criterion: "Gives the acceleration vector.", example: m(t`\langle x''(${k}), y''(${k}) \rangle \approx \langle ${dec(ax)}, ${dec(ay)} \rangle`) },
          ],
        },
        {
          prompt: t`Find the slope of the line tangent to the path of the particle at ${m(t`t = ${k}`)}.`,
          rubric: [{ criterion: "Divides the velocity components.", example: m(t`\frac{dy/dt}{dx/dt} \approx ${dec(slope)}`) }],
        },
        {
          prompt: t`Find the position of the particle at ${m(t`t = ${T}`)}.`,
          rubric: [
            { criterion: "Uses the initial position with the integral of each component.", example: m(t`x(${T}) = ${x0} + \int_0^{${T}} x'(t)\,dt`) },
            { criterion: "Gives both coordinates.", example: m(t`(${dec(X)}, ${dec(Y)})`) },
          ],
        },
        {
          prompt: t`Find the total distance traveled by the particle over ${m(t`0 \leq t \leq ${T}`)}.`,
          rubric: [
            { criterion: "Integrates the speed.", example: m(t`\int_0^{${T}} \sqrt{x'(t)^2 + y'(t)^2}\,dt`) },
            { criterion: "Gives the distance.", example: m(dec(dist)) },
          ],
        },
      ],
    };
  },
};

export const polarRegion: FrqTemplate = {
  key: "frq-bc-polar",
  topics: ["polar-area-single", "polar-area-two-curves", "polar-derivatives"],
  skills: ["1", "2", "3"],
  difficulty: 4,
  calc: true,
  gen(r) {
    const a = r.int(2, 4);
    const b = r.int(1, a - 1);
    const c = a + r.pick([-0.5, 0.5]) * b;
    const R = (th: number) => a + b * Math.cos(th);
    const th0 = Math.acos((c - a) / b);
    const inside = 0.5 * integrate((th) => R(th) ** 2, 0, 2 * Math.PI);
    const between = integrate((th) => R(th) ** 2 - c * c, 0, th0); // symmetric: 2 × ½
    const k = r.pick([1, 2]);
    const rp = -b * Math.sin(k);
    const dyd = (th: number) => R(th) * Math.sin(th);
    const dxd = (th: number) => R(th) * Math.cos(th);
    const dy = derivative(dyd, k);
    const dx = derivative(dxd, k);
    if (Math.abs(dx) < 0.05) throw new Retry();
    return {
      title: "A polar region",
      stimulus: {
        text: t`The curves ${m(t`r = ${a} + ${b === 1 ? "" : b}\cos\theta`)} and ${m(t`r = ${c}`)} are drawn in the polar plane for ${m(t`0 \leq \theta \leq 2\pi`)}.`,
      },
      parts: [
        {
          prompt: t`Find the area of the region enclosed by ${m(t`r = ${a} + ${b === 1 ? "" : b}\cos\theta`)}.`,
          rubric: [
            { criterion: "Uses the polar area formula.", example: m(t`\frac{1}{2}\int_0^{2\pi} \left(${a} + ${b === 1 ? "" : b}\cos\theta\right)^2 d\theta`) },
            { criterion: "Gives the area.", example: m(dec(inside)) },
          ],
        },
        {
          prompt: t`Find the area of the region inside ${m(t`r = ${a} + ${b === 1 ? "" : b}\cos\theta`)} and outside ${m(t`r = ${c}`)}.`,
          rubric: [
            { criterion: "Finds the intersection angles.", example: m(t`\theta = \pm${dec(th0)}`) },
            { criterion: "Writes outer squared minus inner squared.", example: m(t`\frac{1}{2}\int_{-${dec(th0)}}^{${dec(th0)}} \left(r^2 - ${c}^2\right) d\theta`) },
            { criterion: "Gives the area.", example: m(dec(between)) },
          ],
        },
        {
          prompt: t`Find ${m(t`\frac{dr}{d\theta}`)} at ${m(t`\theta = ${k}`)}. Is the curve moving toward or away from the origin at that angle? Explain.`,
          rubric: [
            { criterion: "Gives the derivative.", example: m(t`\frac{dr}{d\theta} = -${b === 1 ? "" : b}\sin(${k}) \approx ${dec(rp)}`) },
            { criterion: "Interprets the sign, noting that $$r > 0$$.", example: "Since $$r > 0$$ and $$\\frac{dr}{d\\theta} < 0$$, the curve is moving toward the origin." },
          ],
        },
        {
          prompt: t`Find the slope of the line tangent to ${m(t`r = ${a} + ${b === 1 ? "" : b}\cos\theta`)} at ${m(t`\theta = ${k}`)}.`,
          rubric: [
            { criterion: "Uses $$\\frac{dy/d\\theta}{dx/d\\theta}$$ with $$x = r\\cos\\theta$$ and $$y = r\\sin\\theta$$.", example: m(t`\frac{dy/d\theta}{dx/d\theta} = \frac{${dec(dy)}}{${dec(dx)}}`) },
            { criterion: "Gives the slope.", example: m(dec(dy / dx)) },
          ],
        },
      ],
    };
  },
};

export const taylorSeriesFrq: FrqTemplate = {
  key: "frq-bc-series",
  topics: ["radius-interval-of-convergence", "representing-functions-power-series", "alternating-series-error-bound", "ratio-test"],
  skills: ["1", "3", "4"],
  difficulty: 4,
  calc: false,
  gen(r) {
    const k = r.int(2, 5);
    const x1 = 1;
    const s2 = F(1, k).sub(F(1, 2 * k * k));
    const bound = F(1, 3 * k ** 3);
    return {
      title: "A power series",
      stimulus: {
        text: t`The function ${m("f")} is defined by the power series ${m(t`f(x) = \sum_{n=1}^{\infty} \frac{(-1)^{n+1}x^n}{n\cdot ${k}^n} = \frac{x}{${k}} - \frac{x^2}{2\cdot ${k * k}} + \frac{x^3}{3\cdot ${k ** 3}} - \cdots`)} for all ${m("x")} in its interval of convergence.`,
      },
      parts: [
        {
          prompt: "Find the interval of convergence of the series. Show the work that leads to your answer.",
          rubric: [
            { criterion: "Sets up the ratio test.", example: m(t`\left|\frac{x^{n+1}}{(n + 1)${k}^{n+1}}\cdot\frac{n\,${k}^n}{x^n}\right| \to \frac{|x|}{${k}}`) },
            { criterion: "Finds the radius.", example: m(t`|x| < ${k}`) },
            { criterion: "Analyzes both endpoints with a test.", example: t`At ${m(t`x = ${k}`)}: ${m(t`\sum \frac{(-1)^{n+1}}{n}`)} converges (alternating series test). At ${m(t`x = -${k}`)}: ${m(t`-\sum \frac{1}{n}`)} diverges (harmonic).` },
            { criterion: "Gives the interval.", example: m(t`-${k} < x \leq ${k}`) },
          ],
        },
        {
          prompt: t`Find the first three nonzero terms and the general term of the Maclaurin series for ${m("f'(x)")}. Then write ${m("f'(x)")} as a rational function.`,
          rubric: [
            { criterion: "Differentiates term by term.", example: m(t`f'(x) = \frac{1}{${k}} - \frac{x}{${k * k}} + \frac{x^2}{${k ** 3}} - \cdots + \frac{(-1)^{n+1}x^{n-1}}{${k}^n} + \cdots`) },
            { criterion: "Recognizes a geometric series.", example: m(t`\frac{1/${k}}{1 + x/${k}} = \frac{1}{${k} + x}`) },
          ],
        },
        {
          prompt: t`Use the first two nonzero terms of the series to approximate ${m(t`f(${x1})`)}. Show that this approximation differs from ${m(t`f(${x1})`)} by less than ${m(dec(bound.value * 1.5 + 0.0005, 3))}.`,
          rubric: [
            { criterion: "Gives the approximation.", example: m(t`\frac{1}{${k}} - \frac{1}{${2 * k * k}} = ${s2.tex()}`) },
            {
              criterion: "Uses the alternating series error bound with justification.",
              example: t`The series at ${m("x = 1")} alternates with terms decreasing to 0, so the error is at most the third term, ${m(t`\frac{1}{3\cdot ${k ** 3}} = ${bound.tex()}`)}.`,
            },
          ],
        },
      ],
    };
  },
};

export const taylorPolynomialFrq: FrqTemplate = {
  key: "frq-bc-taylor-polynomial",
  topics: ["taylor-polynomials", "lagrange-error-bound", "taylor-maclaurin-series"],
  skills: ["1", "3"],
  difficulty: 4,
  calc: false,
  gen(r) {
    const a = r.int(1, 3);
    const d = [r.int(-4, 6), r.nz(-5, 5), r.nz(-6, 6), r.nz(-12, 12)];
    const M = r.pick([6, 12, 18, 24, 30]);
    const h = F(1, 2);
    const xa = shiftBare("x", a);
    const P3 = joinTerms([String(d[0]), coef(d[1]!, `(${xa})`), coef(F(d[2]!, 2), `(${xa})^2`), coef(F(d[3]!, 6), `(${xa})^3`)]);
    const val = F(d[0]!).add(h.mul(d[1]!)).add(h.mul(h).mul(F(d[2]!, 2))).add(h.mul(h).mul(h).mul(F(d[3]!, 6)));
    const err = F(M, 24).mul(F(1, 16));
    const Q = joinTerms([String(d[1]), coef(d[2]!, `(${xa})`), coef(F(d[3]!, 2), `(${xa})^2`)]);
    return {
      title: "A Taylor polynomial",
      stimulus: {
        text: t`A function ${m("f")} has derivatives of all orders. Selected values are ${m(t`f(${a}) = ${d[0]}`)}, ${m(t`f'(${a}) = ${d[1]}`)}, ${m(t`f''(${a}) = ${d[2]}`)} and ${m(t`f'''(${a}) = ${d[3]}`)}. For all ${m("x")}, ${m(t`|f^{(4)}(x)| \leq ${M}`)}.`,
      },
      parts: [
        {
          prompt: t`Write the third-degree Taylor polynomial for ${m("f")} about ${m(t`x = ${a}`)}.`,
          rubric: [
            { criterion: "Uses the correct coefficients, including factorials.", example: m(t`P_3(x) = ${P3}`) },
            { criterion: "Writes powers of $$(x - a)$$ correctly.", example: `Each term uses $$(${xa})^k$$.` },
          ],
        },
        {
          prompt: t`Use ${m("P_3")} to approximate ${m(t`f(${dec(a + 0.5, 1)})`)}.`,
          rubric: [{ criterion: "Evaluates the polynomial.", example: m(t`P_3(${dec(a + 0.5, 1)}) = ${val.tex()}`) }],
        },
        {
          prompt: t`Use the Lagrange error bound to show that the approximation in part (b) differs from ${m(t`f(${dec(a + 0.5, 1)})`)} by at most ${m(err.tex())}.`,
          rubric: [{ criterion: "Writes the Lagrange bound with the given M.", example: m(t`\frac{${M}}{4!}\left(\frac{1}{2}\right)^4 = ${err.tex()}`) }],
        },
        {
          prompt: t`Write the second-degree Taylor polynomial for ${m("f'")} about ${m(t`x = ${a}`)}.`,
          rubric: [{ criterion: "Differentiates $$P_3$$ (or uses the derivative values directly).", example: m(t`${Q}`) }],
        },
      ],
    };
  },
};

export { fact, roots };
