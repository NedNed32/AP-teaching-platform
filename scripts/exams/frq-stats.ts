/*
 * AP Statistics (revised, May 2027) free response: four questions.
 * Q1 multi-focus on practices 1 and 2 (questions and data collection),
 * Q2 practices 3 and 4 (analyze and interpret), Q3 inference,
 * Q4 practices 2, 3 and 4 (here, regression with data collection).
 */
import { fiveNum, invT, mean, normCdf, sd } from "./stats-lib";
import { Retry, type FrqTemplate } from "./types";

const f = (x: number, d = 3) => String(Number(x.toFixed(d)));
const base = { calc: true, minutes: 22 } as const;

export const statsQ1: FrqTemplate = {
  ...base,
  key: "frq-stats-study-design",
  topics: ["the-investigative-question-revisited-and-data-collection", "experimental-design", "random-sampling", "potential-problems-with-sampling"],
  skills: ["1", "2"],
  difficulty: 3,
  format: "q1",
  gen(r) {
    const s = r.pick([
      { topic: "whether a new phone app reduces evening screen time", units: "60 volunteer students", block: "grade level (9th and 12th graders use phones differently)", resp: "average evening screen time over two weeks", trt: ["the app", "no app"] },
      { topic: "whether a brief mindfulness exercise before tests improves scores", units: "80 students in a statistics class", block: "previous test average (high or low)", resp: "score on the next unit test", trt: ["the mindfulness exercise", "a reading break"] },
      { topic: "whether a new fertilizer increases tomato yield", units: "40 garden plots", block: "sun exposure (full sun or partial shade)", resp: "total weight of tomatoes harvested", trt: ["the new fertilizer", "the standard fertilizer"] },
    ]);
    const half = Number(s.units.match(/\d+/)![0]) / 2;
    return {
      title: "Planning a study",
      stimulus: { text: `Researchers want to investigate ${s.topic}. They have ${s.units} available.` },
      parts: [
        { prompt: "Write an investigative question for this study, and identify the explanatory and response variables.", rubric: [
          { criterion: "A clear investigative question that names the population or units and the variables.", example: `"Does ${s.trt[0]} lead to a better ${s.resp} than ${s.trt[1]} for units like these?"` },
          { criterion: "Correct variables.", example: `Explanatory: treatment (${s.trt.join(" vs ")}). Response: ${s.resp}.` },
        ] },
        { prompt: "Explain why an experiment, rather than an observational study, should be used to answer the question.", rubric: [{ criterion: "Only random assignment allows a cause-and-effect conclusion; an observational study could be confounded.", example: "Units that choose a treatment may differ in other ways that affect the response." }] },
        { prompt: `Describe how to randomly assign the ${half * 2} units to the two treatments in a completely randomized design.`, rubric: [
          { criterion: "A valid random mechanism.", example: `Number units 1–${half * 2}; use a random number generator to select ${half} different numbers.` },
          { criterion: "Clear assignment.", example: `Those ${half} receive ${s.trt[0]}; the remaining ${half} receive ${s.trt[1]}.` },
        ] },
        { prompt: `The researchers consider blocking by ${s.block}. Explain how blocking would be carried out and why it could improve the experiment.`, rubric: [
          { criterion: "Form blocks and randomize within each block.", example: "Separate units into the blocks, then randomly assign half of each block to each treatment." },
          { criterion: "Benefit: reduces variability in the response due to the blocking variable, making a treatment effect easier to detect.", example: `Accounts for differences caused by ${s.block.split(" (")[0]}.` },
        ] },
      ],
    };
  },
};

export const statsQ2: FrqTemplate = {
  ...base,
  key: "frq-stats-compare-distributions",
  topics: ["comparisons-of-the-distributions-for-one-quantitative-variable", "summary-statistics-for-one-quantitative-variable", "graphical-representations-of-summary-statistics-for-one-quantitative-variable"],
  skills: ["3", "4"],
  difficulty: 3,
  format: "q2",
  gen(r) {
    const ctx = r.pick([["commute time (minutes)", "City A", "City B"], ["daily steps (thousands)", "Group 1", "Group 2"], ["reaction time (hundredths of a second)", "Morning", "Evening"]]);
    const A = Array.from({ length: 15 }, () => r.int(10, 30));
    const B = Array.from({ length: 15 }, () => r.int(14, 45));
    B[r.int(0, 14)] = r.int(60, 75);
    const sa = fiveNum(A);
    const sb = fiveNum(B);
    const iqrB = sb.q3 - sb.q1;
    const fence = sb.q3 + 1.5 * iqrB;
    const outs = B.filter((x) => x > fence);
    if (sa.q3 - sa.q1 === 0 || iqrB === 0) throw new Retry();
    return {
      title: `Comparing ${ctx[0]}`,
      stimulus: { text: `Random samples of 15 were taken from two groups. The values of ${ctx[0]} are:\n\n**${ctx[1]}:** ${[...A].sort((a, b) => a - b).join(", ")}\n\n**${ctx[2]}:** ${[...B].sort((a, b) => a - b).join(", ")}` },
      parts: [
        { prompt: "Find the five-number summary for each group.", rubric: [
          { criterion: `${ctx[1]} correct.`, example: `${sa.min}, ${sa.q1}, ${sa.med}, ${sa.q3}, ${sa.max}` },
          { criterion: `${ctx[2]} correct.`, example: `${sb.min}, ${sb.q1}, ${sb.med}, ${sb.q3}, ${sb.max}` },
        ] },
        { prompt: `Use the 1.5 × IQR rule to determine whether ${ctx[2]} has any outliers. Show your work.`, rubric: [{ criterion: "Correct fences and conclusion.", example: `IQR = ${f(iqrB, 1)}; upper fence = ${sb.q3} + 1.5(${f(iqrB, 1)}) = ${f(fence, 1)}. ${outs.length ? `Outlier(s): ${outs.join(", ")}.` : "No outliers."}` }] },
        { prompt: "Compare the distributions of the two groups (shape, center and variability) in context.", rubric: [
          { criterion: "Compares centers with values.", example: `The median for ${ctx[2]} (${sb.med}) is ${sb.med > sa.med ? "greater" : "less"} than for ${ctx[1]} (${sa.med}).` },
          { criterion: "Compares variability with values.", example: `${ctx[2]} is ${iqrB > sa.q3 - sa.q1 ? "more" : "less"} variable (IQR ${f(iqrB, 1)} vs ${f(sa.q3 - sa.q1, 1)}).` },
          { criterion: "Comments on shape or unusual features.", example: outs.length ? `${ctx[2]} has a high outlier, suggesting right skew.` : "Describes the shapes using the summaries." },
        ] },
        { prompt: `Which measure of center is more appropriate for ${ctx[2]}, the mean or the median? Explain.`, rubric: [{ criterion: "Median, because it is resistant to the outlier or skew.", example: `Mean ${f(mean(B), 1)} is pulled toward the high value; median ${sb.med} is not.` }] },
      ],
    };
  },
};

export const statsQ3: FrqTemplate = {
  ...base,
  key: "frq-stats-inference",
  topics: ["carrying-out-a-test-for-a-population-proportion", "constructing-a-confidence-interval-for-a-population-mean-or-population-mean-difference", "carrying-out-a-test-for-the-difference-between-two-population-proportions"],
  skills: ["2", "3", "4"],
  difficulty: 4,
  format: "q3",
  gen(r) {
    const kind = r.pick(["one-prop", "two-prop", "t-interval"]);
    if (kind === "one-prop") {
      const p0 = r.pick([0.3, 0.4, 0.5, 0.6]);
      const n = r.int(10, 40) * 10;
      const x = Math.round(n * (p0 + r.pick([-1, 1]) * r.int(3, 8) / 100));
      const ph = x / n;
      const dir = ph > p0 ? ">" : "<";
      const sdv = Math.sqrt((p0 * (1 - p0)) / n);
      const z = (ph - p0) / sdv;
      const pv = dir === ">" ? 1 - normCdf(z) : normCdf(z);
      return {
        title: "A test for a proportion",
        stimulus: { text: `A school district claims that ${p0 * 100}% of its students take public transit to school. A reporter suspects the true proportion is ${dir === ">" ? "higher" : "lower"}. In a random sample of ${n} students, ${x} take public transit.` },
        parts: [
          { prompt: "State the hypotheses, defining the parameter.", rubric: [{ criterion: "Correct hypotheses with the parameter defined.", example: `H₀: p = ${p0}; Hₐ: p ${dir} ${p0}, where p is the proportion of all district students who take public transit.` }] },
          { prompt: "Identify the appropriate procedure and check its conditions.", rubric: [
            { criterion: "One-sample z test for a proportion.", example: "Random sample stated." },
            { criterion: "10% and large counts checked.", example: `${n} is less than 10% of all students (assumed); np₀ = ${f(n * p0, 1)} and n(1 − p₀) = ${f(n * (1 - p0), 1)} are both at least 10.` },
          ] },
          { prompt: "Calculate the test statistic and p-value.", rubric: [
            { criterion: "Test statistic.", example: `p̂ = ${f(ph, 4)}; z = (${f(ph, 4)} − ${p0})/${f(sdv, 4)} = ${f(z, 2)}` },
            { criterion: "p-value.", example: f(pv, 4) },
          ] },
          { prompt: "State a conclusion in context at α = 0.05.", rubric: [{ criterion: "Correct decision linked to the p-value, in context.", example: pv < 0.05 ? `Because ${f(pv, 4)} is less than 0.05, reject H₀: convincing evidence that the proportion is ${dir === ">" ? "greater" : "less"} than ${p0}.` : `Because ${f(pv, 4)} is greater than 0.05, fail to reject H₀: not convincing evidence that the proportion is ${dir === ">" ? "greater" : "less"} than ${p0}.` }] },
        ],
      };
    }
    if (kind === "two-prop") {
      const n1 = r.int(8, 25) * 10;
      const n2 = r.int(8, 25) * 10;
      const x1 = Math.round(n1 * r.int(35, 65) / 100);
      const x2 = Math.round(n2 * r.int(25, 55) / 100);
      const p1 = x1 / n1;
      const p2 = x2 / n2;
      if (p1 <= p2) throw new Retry();
      const pc = (x1 + x2) / (n1 + n2);
      const se = Math.sqrt(pc * (1 - pc) * (1 / n1 + 1 / n2));
      const z = (p1 - p2) / se;
      const pv = 1 - normCdf(z);
      return {
        title: "Comparing two treatments",
        stimulus: { text: `In a randomized experiment on a new study strategy, ${x1} of ${n1} students using the new strategy passed a test, compared with ${x2} of ${n2} students using the usual strategy.` },
        parts: [
          { prompt: "State hypotheses to test whether the new strategy leads to a higher pass rate.", rubric: [{ criterion: "Correct hypotheses with parameters defined.", example: "H₀: p₁ − p₂ = 0; Hₐ: p₁ − p₂ > 0, where p₁ and p₂ are the true pass rates with the new and usual strategies." }] },
          { prompt: "Name the procedure and check the conditions.", rubric: [{ criterion: "Two-sample z test; random assignment; large counts with the pooled proportion.", example: `p̂c = ${f(pc, 4)}; ${f(n1 * pc, 1)}, ${f(n1 * (1 - pc), 1)}, ${f(n2 * pc, 1)}, ${f(n2 * (1 - pc), 1)} are all at least 10.` }] },
          { prompt: "Calculate the test statistic and p-value.", rubric: [
            { criterion: "Test statistic.", example: `z = (${f(p1, 4)} − ${f(p2, 4)})/${f(se, 4)} = ${f(z, 2)}` },
            { criterion: "p-value.", example: f(pv, 4) },
          ] },
          { prompt: "State a conclusion in context at α = 0.05, including what kind of conclusion the design allows.", rubric: [{ criterion: "Correct decision; causal language justified by random assignment.", example: pv < 0.05 ? "Reject H₀: convincing evidence that the new strategy causes a higher pass rate (random assignment)." : "Fail to reject H₀: not convincing evidence that the new strategy increases the pass rate." }] },
        ],
      };
    }
    const n = r.int(12, 30);
    const data = Array.from({ length: n }, () => r.int(60, 95) / 10);
    const xb = mean(data);
    const s = sd(data);
    const ts = invT(0.975, n - 1);
    const me = ts * (s / Math.sqrt(n));
    const claim = Number((xb + r.pick([-1, 1]) * r.pick([0.3, 1.5]) * me).toFixed(1));
    const plausible = Math.abs(claim - xb) <= me;
    return {
      title: "Estimating a mean",
      stimulus: { text: `A random sample of ${n} students at a large school reported hours of sleep on a school night: x̄ = ${f(xb, 2)} hours, s = ${f(s, 2)} hours. A dotplot of the data shows no strong skew or outliers. A health report claims students at the school sleep ${claim} hours on average.` },
      parts: [
        { prompt: "Identify the procedure and check the conditions for a 95% confidence interval for the mean.", rubric: [{ criterion: "One-sample t interval; random, 10%, and normality justified by the dotplot (n under 30).", example: `n = ${n}; the sample shows no strong skew or outliers.` }] },
        { prompt: "Construct the 95% confidence interval.", rubric: [
          { criterion: "Critical value and standard error.", example: `t* = ${f(ts, 3)} (df = ${n - 1}); SE = ${f(s / Math.sqrt(n), 4)}` },
          { criterion: "Correct interval.", example: `(${f(xb - me, 2)}, ${f(xb + me, 2)}) hours` },
        ] },
        { prompt: "Interpret the interval in context.", rubric: [{ criterion: "Confidence in capturing the population mean.", example: `We are 95% confident that the interval from ${f(xb - me, 2)} to ${f(xb + me, 2)} hours captures the true mean hours of sleep for students at the school.` }] },
        { prompt: "Does the interval support the report's claim? Explain.", rubric: [{ criterion: "Correct use of the interval.", example: plausible ? `${claim} is in the interval, so it is a plausible value; the claim is not contradicted.` : `${claim} is outside the interval, so it is not plausible; the data contradict the claim.` }] },
      ],
    };
  },
};

export const statsQ4: FrqTemplate = {
  ...base,
  key: "frq-stats-regression",
  topics: ["least-squares-regression", "residuals", "linear-regression-models", "correlation"],
  skills: ["2", "3", "4"],
  difficulty: 3,
  format: "q4",
  gen(r) {
    const ctx = r.pick([["hours studied per week", "exam score", "students"], ["outdoor temperature (°F)", "daily iced-drink sales", "days"], ["age of car (years)", "price (thousands of dollars)", "used cars"]]);
    const b = Number((ctx[1] === "price (thousands of dollars)" ? -r.int(10, 25) / 10 : r.int(15, 45) / 10).toFixed(2));
    const a = Number((r.int(100, 600) / 10).toFixed(2));
    const rsq = r.int(55, 90) / 100;
    const sres = r.int(20, 60) / 10;
    const x0 = r.int(3, 15);
    const yhat = a + b * x0;
    const y0 = Number((yhat + r.pick([-1, 1]) * r.int(10, 50) / 10).toFixed(1));
    const rr = Math.sign(b) * Math.sqrt(rsq);
    const out = ["Predictor   Coef      SE Coef", `Constant    ${a}`, `x           ${b}`, `S = ${sres}    R-Sq = ${(rsq * 100).toFixed(1)}%`].join("\n");
    return {
      title: `Predicting ${ctx[1]}`,
      stimulus: { text: `Data were collected on ${ctx[0]} (x) and ${ctx[1]} (y) for a sample of ${ctx[2]}. A scatterplot shows a linear pattern, and the residual plot shows no pattern. Computer output for the least-squares regression is shown.\n\n${"```text\n" + out + "\n```"}` },
      parts: [
        { prompt: "Write the equation of the least-squares regression line, defining the variables.", rubric: [{ criterion: "Correct equation with variables defined.", example: `ŷ = ${a} ${b < 0 ? "−" : "+"} ${Math.abs(b)}x, where ŷ is predicted ${ctx[1]} and x is ${ctx[0]}.` }] },
        { prompt: "Interpret the slope and the value of R-Sq in context.", rubric: [
          { criterion: "Slope interpretation.", example: `For each additional unit of ${ctx[0]}, the predicted ${ctx[1]} ${b < 0 ? "decreases" : "increases"} by about ${Math.abs(b)}.` },
          { criterion: "R-Sq interpretation.", example: `About ${(rsq * 100).toFixed(1)}% of the variation in ${ctx[1]} is accounted for by the linear model with ${ctx[0]}.` },
        ] },
        { prompt: `One observation has x = ${x0} and y = ${y0}. Calculate and interpret its residual. Also find the correlation r.`, rubric: [
          { criterion: "Residual and interpretation.", example: `ŷ = ${f(yhat, 2)}; residual = ${y0} − ${f(yhat, 2)} = ${f(y0 - yhat, 2)}: the actual value is ${y0 > yhat ? "above" : "below"} the prediction.` },
          { criterion: "Correlation with the correct sign.", example: `r = ${b < 0 ? "−" : ""}√${rsq} = ${f(rr, 3)}` },
        ] },
        { prompt: "The data come from a convenience sample. Explain how this affects the conclusions and describe a better data collection method.", rubric: [{ criterion: "Results may not generalize to the population; a random sample would allow generalization.", example: `Take a simple random sample of ${ctx[2]} from the population of interest. Observational data also cannot show causation.` }] },
      ],
    };
  },
};

