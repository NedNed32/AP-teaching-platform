/* AP Statistics (revised 2026-27) multiple choice. Answers are computed with exact distribution functions. */
import { options } from "./csa-lib";
import type { Rng } from "./lib";
import { binomCdf, binomPdf, chi2Upper, fiveNum, invNorm, invT, normCdf, r2, r3, tCdf } from "./stats-lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({ key, unit, topics, skills, difficulty, calc: true, gen });
const f = (x: number, d = 3) => String(Number(x.toFixed(d)));
const nums = (right: number, why: string, wrongs: [number, string][], d = 3) => options([f(right, d), why], wrongs.filter(([v]) => Number.isFinite(v)).map(([v, w]) => [f(v, d), w]));

interface Item {
  stem: string;
  right: [string, string];
  wrong: [string, string][];
}
const pool = (key: string, unit: number, topics: string[], skills: string[], items: Item[]) =>
  t(key, unit, topics, skills, 2, (r) => {
    const it = r.pick(items);
    return { stem: it.stem, ...options(it.right, r.shuffle(it.wrong)), explanation: it.right[1] };
  });

const zStar = (c: number) => invNorm(1 - (1 - c) / 2);
const pickConf = (r: Rng) => r.pick([0.9, 0.95, 0.99]);
const CONTEXTS = [
  ["students at a large high school", "have a part-time job"],
  ["adults in a city", "use public transit weekly"],
  ["customers of an online store", "would recommend it to a friend"],
  ["registered voters in a county", "support a proposed park"],
  ["teenagers in a state", "get at least 8 hours of sleep"],
];

/* ---------------- Unit 1 ---------------- */
export const statsUnit1: McqTemplate[] = [
  t("st-outlier-fences", 1, ["summary-statistics-for-one-quantitative-variable", "graphical-representations-of-summary-statistics-for-one-quantitative-variable"], ["3"], 2, (r) => {
    const n = r.int(9, 13);
    const data = Array.from({ length: n }, () => r.int(10, 40));
    const out = Math.max(...data) + r.int(15, 40);
    data[r.int(0, n - 1)] = out;
    const s = fiveNum(data);
    const iqr = s.q3 - s.q1;
    const hi = s.q3 + 1.5 * iqr;
    if (out <= hi || iqr === 0) throw new Retry();
    return {
      stem: `The data are: ${[...data].sort((a, b) => a - b).join(", ")}. Using the 1.5 × IQR rule, which statement is correct?`,
      ...options([`Q1 = ${s.q1}, Q3 = ${s.q3}; values above ${f(hi, 1)} are outliers, so ${out} is an outlier`, `IQR = ${f(iqr, 1)}; upper fence = Q3 + 1.5·IQR = ${f(hi, 1)}.`], [
        [`Q1 = ${s.q1}, Q3 = ${s.q3}; values above ${f(s.q3 + iqr, 1)} are outliers, so ${out} is an outlier`, "The fence uses 1.5 × IQR, not 1 × IQR."],
        [`Q1 = ${s.q1}, Q3 = ${s.q3}; values above ${f(s.med + 1.5 * iqr, 1)} are outliers`, "Add 1.5·IQR to Q3, not to the median."],
        [`There are no outliers because every value is within 2 standard deviations of the mean`, "The 1.5 × IQR rule is the method asked for."],
        [`Q1 = ${s.min}, Q3 = ${s.max}; there are no outliers`, "Q1 and Q3 are quartiles, not the minimum and maximum."],
      ]),
      explanation: `Five-number summary: ${s.min}, ${s.q1}, ${s.med}, ${s.q3}, ${s.max}. Upper fence ${s.q3} + 1.5(${f(iqr, 1)}) = ${f(hi, 1)}.`,
    };
  }),
  t("st-mean-median-skew", 1, ["descriptions-for-one-quantitative-variable-distributions", "summary-statistics-for-one-quantitative-variable"], ["4"], 2, (r) => {
    const right = r.next() < 0.5;
    const ctx = r.pick(["household incomes in a city", "home prices in a county", "time spent on homework", "number of social media followers"]);
    const m = r.int(30, 80);
    const md = right ? m - r.int(5, 15) : m + r.int(5, 15);
    return {
      stem: `For a distribution of ${ctx}, the mean is ${m} and the median is ${md}. Which is the most likely shape?`,
      ...options([right ? "Skewed right" : "Skewed left", right ? "A long right tail pulls the mean above the median." : "A long left tail pulls the mean below the median."], [[right ? "Skewed left" : "Skewed right", "The mean is pulled toward the tail."], ["Symmetric", "In a symmetric distribution, the mean and median are close."], ["Uniform", "A uniform distribution is symmetric, with mean near the median."]]),
      explanation: `Mean ${m} ${right ? ">" : "<"} median ${md}: the mean is pulled toward the ${right ? "right" : "left"} tail.`,
    };
  }),
  t("st-scope", 1, ["the-investigative-question-revisited-and-data-collection", "experimental-design"], ["2"], 3, (r) => {
    const sel = r.next() < 0.5;
    const asg = r.next() < 0.5;
    const pop = r.pick(["adults in the state", "students at the school", "customers of the store"]);
    const desc = `Researchers ${sel ? `randomly selected 200 ${pop}` : `recruited 200 volunteers among ${pop}`} and ${asg ? "randomly assigned them to use one of two study apps" : "asked which of two study apps they already use"}, then compared test scores.`;
    const right = asg && sel ? "Yes to cause and effect, and yes to generalizing to all " + pop : asg ? "Yes to cause and effect, but only for the volunteers in the study" : sel ? "No to cause and effect, but the association can be generalized to all " + pop : "No to cause and effect, and no generalization beyond the volunteers";
    const all = [`Yes to cause and effect, and yes to generalizing to all ${pop}`, "Yes to cause and effect, but only for the volunteers in the study", `No to cause and effect, but the association can be generalized to all ${pop}`, "No to cause and effect, and no generalization beyond the volunteers"];
    return {
      stem: `${desc} Can the researchers conclude that the app causes higher scores, and to whom do the results apply?`,
      ...options([right, `${asg ? "Random assignment" : "No random assignment"} decides causation; ${sel ? "random selection" : "no random selection"} decides generalization.`], all.filter((x) => x !== right).map((x) => [x, "Random assignment allows causal conclusions; random selection allows generalization to the population."] as [string, string])),
      explanation: `Random assignment: ${asg ? "yes" : "no"}. Random selection: ${sel ? "yes" : "no"}.`,
    };
  }),
  pool("st-u1-concepts", 1, ["random-sampling", "potential-problems-with-sampling", "experimental-design", "variables", "graphical-representations-for-one-categorical-variable"], ["2"], [
    { stem: "A principal divides students by grade level and takes a simple random sample of 25 students from each grade. What sampling method is this?", right: ["Stratified random sampling", "SRSs within groups (strata)."], wrong: [["Cluster sampling", "Cluster sampling selects whole groups."], ["Systematic sampling", "That selects every kth individual."], ["Convenience sampling", "The selection is random."]] },
    { stem: "A radio station asks listeners to call in with their opinions about a new law. Which type of bias is most likely?", right: ["Voluntary response bias", "People with strong opinions are more likely to call."], wrong: [["Undercoverage only", "The main problem is self-selection."], ["No bias, because listeners chose freely", "Self-selection causes bias."], ["Response bias from question wording", "The question wording is not the main issue."]] },
    { stem: "Why does an experiment use random assignment?", right: ["To create treatment groups that are roughly equivalent, so differences in response can be attributed to the treatments", "Randomization balances other variables."], wrong: [["To allow generalization to a larger population", "That requires random selection."], ["To guarantee a large sample size", "Randomization does not affect size."], ["To make the experiment double-blind", "Blinding is separate."]] },
    { stem: "In an experiment on a new reading program, students are first grouped by reading level, then randomly assigned to programs within each level. What is the purpose of grouping by level?", right: ["Blocking, to reduce variability caused by reading level", "Blocking controls a known source of variation."], wrong: [["To create a placebo group", "Groups by level are not placebo groups."], ["To ensure random selection", "That is a sampling idea."], ["To make the study observational", "It remains an experiment."]] },
    { stem: "Does increasing the sample size reduce bias in a survey?", right: ["No; a larger sample reduces variability but not bias from the sampling method", "Bias is systematic."], wrong: [["Yes; large samples are always unbiased", "A biased method stays biased."], ["Yes, if the sample is over 1,000", "Size does not fix a biased method."], ["Only for voluntary response samples", "Size never fixes bias."]] },
    { stem: "Which variable is quantitative?", right: ["The number of text messages a student sends per day", "Counts are quantitative."], wrong: [["A student's zip code", "Zip codes are labels."], ["A student's favorite subject", "That is categorical."], ["Whether a student owns a car (yes or no)", "That is categorical."]] },
    { stem: "Which graph is appropriate for displaying the distribution of favorite music genres among students?", right: ["A bar chart", "Genre is categorical."], wrong: [["A histogram", "Histograms are for quantitative data."], ["A boxplot", "Boxplots are for quantitative data."], ["A scatterplot", "Scatterplots need two quantitative variables."]] },
  ]),
];

/* ---------------- Unit 2 ---------------- */
export const statsUnit2: McqTemplate[] = [
  t("st-two-way", 2, ["summary-statistics-for-two-categorical-variables", "conditional-probability"], ["3"], 2, (r) => {
    const a = [r.int(20, 80), r.int(20, 80)];
    const b = [r.int(20, 80), r.int(20, 80)];
    const rows = ["Juniors", "Seniors"];
    const cols = ["Drives to school", "Does not drive"];
    const tot = a[0]! + a[1]! + b[0]! + b[1]!;
    const pGiven = a[0]! / (a[0]! + b[0]!);
    const joint = a[0]! / tot;
    const rowGiven = a[0]! / (a[0]! + a[1]!);
    return {
      stimulus: { table: { caption: "Survey of students", columns: [{ key: "g", label: "Grade" }, { key: "d", label: cols[0]! }, { key: "n", label: cols[1]! }], rows: [{ g: rows[0]!, d: a[0]!, n: a[1]! }, { g: rows[1]!, d: b[0]!, n: b[1]! }] } },
      stem: "A student is chosen at random from those who drive to school. What is the probability the student is a junior?",
      ...nums(pGiven, "P(junior | drives) = juniors who drive ÷ all who drive.", [[joint, "That is P(junior and drives); divide by drivers only."], [rowGiven, "That is P(drives | junior)."], [(a[0]! + a[1]!) / tot, "That is P(junior) overall."]]),
      explanation: `${a[0]} ÷ (${a[0]} + ${b[0]}) = ${f(pGiven)}.`,
    };
  }),
  t("st-addition-independence", 2, ["independent-events-and-unions-of-events", "mutually-exclusive-events"], ["3"], 2, (r) => {
    const pa = r.int(2, 6) / 10;
    const pb = r.int(2, 6) / 10;
    const indep = r.next() < 0.5;
    const pab = indep ? r3(pa * pb) : r3(Math.min(pa, pb) * r.pick([0.3, 0.5, 0.8]));
    if (!indep && Math.abs(pab - pa * pb) < 0.005) throw new Retry();
    const union = pa + pb - pab;
    return {
      stem: `P(A) = ${pa}, P(B) = ${pb} and P(A and B) = ${pab}. What is P(A or B), and are A and B independent?`,
      ...options([`${f(union)}; ${indep ? "independent" : "not independent"}`, `P(A or B) = P(A) + P(B) − P(A and B); independent if P(A and B) = P(A)P(B) = ${f(pa * pb, 4)}.`], [[`${f(pa + pb)}; ${indep ? "independent" : "not independent"}`, "Subtract P(A and B) so the overlap is not counted twice."], [`${f(union)}; ${indep ? "not independent" : "independent"}`, `Compare P(A and B) with P(A)·P(B) = ${f(pa * pb, 4)}.`], [`${f(union)}; mutually exclusive`, "P(A and B) is not 0, so they are not mutually exclusive."]]),
      explanation: `${pa} + ${pb} − ${pab} = ${f(union)}. P(A)P(B) = ${f(pa * pb, 4)} ${indep ? "=" : "≠"} ${pab}.`,
    };
  }),
  t("st-binomial", 2, ["the-binomial-distribution"], ["3"], 3, (r) => {
    const n = r.int(5, 15);
    const p = r.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7]);
    const k = r.int(1, n - 1);
    const kind = r.pick(["exact", "atmost", "atleast"]);
    const val = kind === "exact" ? binomPdf(n, p, k) : kind === "atmost" ? binomCdf(n, p, k) : 1 - binomCdf(n, p, k - 1);
    const phrase = kind === "exact" ? `exactly ${k}` : kind === "atmost" ? `at most ${k}` : `at least ${k}`;
    return {
      stem: `Each of ${n} independent trials succeeds with probability ${p}. What is the probability of ${phrase} successes?`,
      ...nums(val, "Use the binomial distribution with n = " + n + " and p = " + p + ".", [[kind === "exact" ? binomCdf(n, p, k) : binomPdf(n, p, k), kind === "exact" ? "That is P(X ≤ k); the question asks for exactly k." : "That is only P(X = k)."], [kind === "atleast" ? 1 - binomCdf(n, p, k) : kind === "atmost" ? binomCdf(n, p, k - 1) : p ** k, kind === "atleast" ? "That is P(X > k); 'at least k' includes k." : kind === "atmost" ? "That is P(X < k); 'at most k' includes k." : "Include the binomial coefficient and the failures."], [kind === "exact" ? binomPdf(n, 1 - p, k) : 1 - val, kind === "exact" ? "Use p for successes, not 1 − p." : "That is the complement."]], 4),
      explanation: `X ~ Binomial(${n}, ${p}): P(X ${kind === "exact" ? "=" : kind === "atmost" ? "≤" : "≥"} ${k}) = ${f(val, 4)}.`,
    };
  }),
  t("st-expected-value", 2, ["parameters-of-random-variables", "introduction-to-random-variables-and-probability-distributions"], ["3"], 2, (r) => {
    const xs = [0, 1, 2, 3];
    const ps = [r.int(1, 4), r.int(1, 4), r.int(1, 4), r.int(1, 4)].map((x) => x / 10);
    const s = ps.reduce((a, b) => a + b, 0);
    if (s >= 1) throw new Retry();
    ps[0] = r2(ps[0]! + (1 - s));
    const mu = xs.reduce((a, x, i) => a + x * ps[i]!, 0);
    return {
      stimulus: { table: { caption: "Probability distribution of X", columns: [{ key: "x", label: "x" }, { key: "p", label: "P(X = x)" }], rows: xs.map((x, i) => ({ x, p: ps[i]! })) } },
      stem: "What is the expected value of X?",
      ...nums(mu, "μ = Σ x·P(x).", [[xs.reduce((a, b) => a + b, 0) / 4, "Weight each value by its probability."], [Math.max(...ps), "That is the largest probability, not the mean."], [xs[ps.indexOf(Math.max(...ps))]!, "That is the most likely value (mode), not the mean."]], 2),
      explanation: `${xs.map((x, i) => `${x}(${ps[i]})`).join(" + ")} = ${f(mu, 2)}.`,
    };
  }),
  t("st-combine-rv", 2, ["parameters-of-random-variables"], ["3"], 3, (r) => {
    const m1 = r.int(10, 40);
    const m2 = r.int(10, 40);
    const s1 = r.int(2, 8);
    const s2 = r.int(2, 8);
    const diff = r.next() < 0.5;
    const sd = Math.sqrt(s1 * s1 + s2 * s2);
    return {
      stem: `X and Y are independent with μX = ${m1}, σX = ${s1}, μY = ${m2}, σY = ${s2}. What are the mean and standard deviation of ${diff ? "X − Y" : "X + Y"}?`,
      ...options([`Mean ${diff ? m1 - m2 : m1 + m2}, SD ${f(sd, 2)}`, "Means add or subtract; variances add."], [[`Mean ${diff ? m1 - m2 : m1 + m2}, SD ${diff ? Math.abs(s1 - s2) : s1 + s2}`, "Standard deviations do not add; variances do."], [`Mean ${diff ? m1 + m2 : m1 - m2}, SD ${f(sd, 2)}`, "Check the sign of the mean."], [`Mean ${diff ? m1 - m2 : m1 + m2}, SD ${s1 * s1 + s2 * s2}`, "That is the variance; take the square root."]]),
      explanation: `μ = ${diff ? m1 - m2 : m1 + m2}; σ = √(${s1}² + ${s2}²) = ${f(sd, 2)}.`,
    };
  }),
  t("st-normal", 2, ["the-normal-distribution"], ["3"], 2, (r) => {
    const mu = r.int(40, 120);
    const sig = r.int(4, 20);
    if (r.next() < 0.5) {
      const x = mu + r.int(-20, 20) / 10 * sig;
      const z = (x - mu) / sig;
      const above = r.next() < 0.5;
      const p = above ? 1 - normCdf(z) : normCdf(z);
      return {
        stem: `A variable is approximately normal with mean ${mu} and standard deviation ${sig}. What proportion of values are ${above ? "greater" : "less"} than ${f(x, 1)}?`,
        ...nums(p, `z = (${f(x, 1)} − ${mu})/${sig} = ${f(z, 2)}.`, [[1 - p, "That is the other side of the boundary."], [Math.abs(z) / 10, "Use the normal distribution's area, not the z-score."], [above ? normCdf(-Math.abs(z) / 2) : normCdf(z / 2), "Divide by σ when standardizing."]], 4),
        explanation: `z = ${f(z, 2)}; area ${above ? "to the right" : "to the left"} = ${f(p, 4)}.`,
      };
    }
    const pc = r.pick([0.1, 0.2, 0.25, 0.75, 0.8, 0.9, 0.95]);
    const z = invNorm(pc);
    const x = mu + z * sig;
    return {
      stem: `A variable is approximately normal with mean ${mu} and standard deviation ${sig}. What value is at the ${pc * 100}th percentile?`,
      ...nums(x, `z = invNorm(${pc}) ≈ ${f(z, 3)}; x = μ + zσ.`, [[mu - z * sig, "Check the sign of z."], [mu + pc * sig, "Use the z-score for the percentile, not the percentile itself."], [mu + z * sig * sig, "Multiply z by σ, not σ²."]], 2),
      explanation: `x = ${mu} + ${f(z, 3)}(${sig}) = ${f(x, 2)}.`,
    };
  }),
  t("st-clt", 2, ["sampling-distributions-and-the-central-limit-theorem"], ["3"], 3, (r) => {
    const mu = r.int(20, 100);
    const sig = r.int(5, 20);
    const n = r.pick([36, 40, 49, 64, 100]);
    const se = sig / Math.sqrt(n);
    const x = Number((mu + r.int(5, 25) / 10 * se).toFixed(1));
    const p = 1 - normCdf((x - mu) / se);
    return {
      stem: `A population has mean ${mu} and standard deviation ${sig} (shape unknown). For random samples of ${n}, what is the approximate probability that the sample mean exceeds ${x}?`,
      ...nums(p, `By the CLT, x̄ is approximately normal with SD ${sig}/√${n} = ${f(se, 3)}.`, [[1 - normCdf((x - mu) / sig), "Use σ/√n for a sample mean."], [normCdf((x - mu) / se), "That is the area below."], [1 - normCdf((x - mu) / (sig / n)), "Divide σ by √n, not n."]], 4),
      explanation: `z = (${x} − ${mu})/${f(se, 3)} = ${f((x - mu) / se, 2)}; P = ${f(p, 4)}.`,
    };
  }),
  t("st-at-least-one", 2, ["introduction-to-probability", "independent-events-and-unions-of-events"], ["3"], 2, (r) => {
    const p = r.pick([0.02, 0.05, 0.08, 0.1, 0.15, 0.2]);
    const n = r.int(3, 10);
    const val = 1 - (1 - p) ** n;
    return {
      stem: `Each of ${n} independent devices fails with probability ${p}. What is the probability that at least one fails?`,
      ...nums(val, "1 − P(none fail) = 1 − (1 − p)^n.", [[n * p, "Probabilities of overlapping events cannot simply be added."], [p ** n, "That is the probability all fail."], [(1 - p) ** n, "That is the probability none fail."]], 4),
      explanation: `1 − ${1 - p}^${n} = ${f(val, 4)}.`,
    };
  }),
];

/* ---------------- Unit 3 ---------------- */
export const statsUnit3: McqTemplate[] = [
  t("st-ci-prop", 3, ["constructing-a-confidence-interval-for-a-population-proportion"], ["3"], 2, (r) => {
    const [pop, trait] = r.pick(CONTEXTS);
    const n = r.int(10, 60) * 10;
    const x = Math.round(n * (r.int(20, 80) / 100));
    const ph = x / n;
    const c = pickConf(r);
    const z = zStar(c);
    const se = Math.sqrt((ph * (1 - ph)) / n);
    const lo = ph - z * se;
    const hi = ph + z * se;
    return {
      stem: `In a random sample of ${n} ${pop}, ${x} ${trait}. Which is a ${c * 100}% confidence interval for the proportion of all ${pop} who ${trait}?`,
      ...options([`(${f(lo)}, ${f(hi)})`, `p̂ ± z*√(p̂(1 − p̂)/n) with z* = ${f(z, 3)}.`], [[`(${f(ph - z * Math.sqrt(ph * (1 - ph) / Math.sqrt(n)))}, ${f(ph + z * Math.sqrt(ph * (1 - ph) / Math.sqrt(n)))})`, "Divide by n inside the square root."], [`(${f(ph - 1.96 * se)}, ${f(ph + 1.96 * se)})`, c === 0.95 ? "Recheck." : `Use z* for ${c * 100}%, not 1.96.`], [`(${f(ph - z * ph * (1 - ph))}, ${f(ph + z * ph * (1 - ph))})`, "Use the standard error, √(p̂(1 − p̂)/n)."], [`(${f(ph - se)}, ${f(ph + se)})`, "Multiply the standard error by z*."]]),
      explanation: `p̂ = ${f(ph)}, SE = ${f(se, 4)}, margin = ${f(z * se, 4)}.`,
    };
  }),
  t("st-z-test-prop", 3, ["carrying-out-a-test-for-a-population-proportion", "p-values"], ["3"], 3, (r) => {
    const p0 = r.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7]);
    const n = r.int(8, 40) * 10;
    const ph = r2(p0 + r.pick([-1, 1]) * r.int(2, 8) / 100);
    const dir = ph > p0 ? ">" : "<";
    const z = (ph - p0) / Math.sqrt((p0 * (1 - p0)) / n);
    const pv = dir === ">" ? 1 - normCdf(z) : normCdf(z);
    const zWrong = (ph - p0) / Math.sqrt((ph * (1 - ph)) / n);
    return {
      stem: `To test H₀: p = ${p0} versus Hₐ: p ${dir} ${p0}, a random sample of ${n} gives p̂ = ${ph}. What are the test statistic and p-value?`,
      ...options([`z = ${f(z, 2)}, p-value = ${f(pv, 4)}`, "z = (p̂ − p₀)/√(p₀(1 − p₀)/n); one-sided p-value."], [[`z = ${f(zWrong, 2)}, p-value = ${f(dir === ">" ? 1 - normCdf(zWrong) : normCdf(zWrong), 4)}`, "The test's standard deviation uses p₀, not p̂."], [`z = ${f(z, 2)}, p-value = ${f(2 * pv, 4)}`, "The alternative is one-sided."], [`z = ${f(z, 2)}, p-value = ${f(1 - pv, 4)}`, "Find the area in the direction of Hₐ."]]),
      explanation: `SD = √(${p0}·${r2(1 - p0)}/${n}) = ${f(Math.sqrt((p0 * (1 - p0)) / n), 4)}; z = ${f(z, 2)}; p-value = ${f(pv, 4)}.`,
    };
  }),
  t("st-sample-size", 3, ["constructing-a-confidence-interval-for-a-population-proportion"], ["2"], 3, (r) => {
    const m = r.pick([0.02, 0.03, 0.04, 0.05]);
    const c = pickConf(r);
    const z = zStar(c);
    const n = Math.ceil((z / m) ** 2 * 0.25);
    return {
      stem: `What is the smallest sample size needed to estimate a proportion with a margin of error of at most ${m} at ${c * 100}% confidence, with no prior estimate of p?`,
      ...options([String(n), `n ≥ (z*/m)²(0.5)(0.5) with z* = ${f(z, 3)}, rounded up.`], [[String(Math.ceil((z / m) ** 2)), "Multiply by p̂(1 − p̂) = 0.25."], [String(Math.ceil((z / m) * 0.25)), "Square z*/m."], [String(Math.floor((z / m) ** 2 * 0.25)), "Always round up to guarantee the margin."], [String(Math.ceil((1.96 / m) ** 2 * 0.25)), "Use z* for the stated confidence level."]]),
      explanation: `(${f(z, 3)}/${m})² × 0.25 = ${f((z / m) ** 2 * 0.25, 1)}, so n = ${n}.`,
    };
  }),
  t("st-two-prop", 3, ["carrying-out-a-test-for-the-difference-between-two-population-proportions", "setting-up-a-test-for-the-difference-between-two-population-proportions"], ["3"], 4, (r) => {
    const n1 = r.int(8, 30) * 10;
    const n2 = r.int(8, 30) * 10;
    const x1 = Math.round(n1 * r.int(25, 65) / 100);
    const x2 = Math.round(n2 * r.int(25, 65) / 100);
    const p1 = x1 / n1;
    const p2 = x2 / n2;
    if (Math.abs(p1 - p2) < 0.02) throw new Retry();
    const pc = (x1 + x2) / (n1 + n2);
    const se = Math.sqrt(pc * (1 - pc) * (1 / n1 + 1 / n2));
    const z = (p1 - p2) / se;
    const seU = Math.sqrt((p1 * (1 - p1)) / n1 + (p2 * (1 - p2)) / n2);
    return {
      stem: `In a randomized experiment, ${x1} of ${n1} subjects improved with treatment 1 and ${x2} of ${n2} improved with treatment 2. For a test of H₀: p₁ − p₂ = 0, what is the test statistic?`,
      ...nums(z, `Pooled p̂c = ${f(pc, 4)}; z = (p̂₁ − p̂₂)/√(p̂c(1 − p̂c)(1/n₁ + 1/n₂)).`, [[(p1 - p2) / seU, "The test uses the pooled proportion, because H₀ assumes p₁ = p₂."], [(p1 - p2) / Math.sqrt(pc * (1 - pc) / (n1 + n2)), "Use (1/n₁ + 1/n₂)."], [p1 - p2, "Divide the difference by its standard error."]], 2),
      explanation: `p̂₁ = ${f(p1, 4)}, p̂₂ = ${f(p2, 4)}, SE = ${f(se, 4)}, z = ${f(z, 2)}.`,
    };
  }),
  t("st-chi-square", 3, ["carrying-out-a-chi-square-test-for-homogeneity-or-independence", "setting-up-a-chi-square-test-for-homogeneity-or-independence"], ["3"], 4, (r) => {
    const R = 2;
    const C = r.int(2, 3);
    const obs = Array.from({ length: R }, () => Array.from({ length: C }, () => r.int(10, 60)));
    const rt = obs.map((row) => row.reduce((a, b) => a + b, 0));
    const ct = Array.from({ length: C }, (_, j) => obs.reduce((s, row) => s + row[j]!, 0));
    const N = rt.reduce((a, b) => a + b, 0);
    let chi = 0;
    for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) {
      const e = (rt[i]! * ct[j]!) / N;
      chi += (obs[i]![j]! - e) ** 2 / e;
    }
    const df = (R - 1) * (C - 1);
    const pv = chi2Upper(chi, df);
    const ask = r.pick(["expected", "test"]);
    const cols = ["Option A", "Option B", "Option C"].slice(0, C);
    const stimulus = { table: { caption: "Observed counts", columns: [{ key: "g", label: "Group" }, ...cols.map((c, j) => ({ key: `c${j}`, label: c }))], rows: ["Group 1", "Group 2"].map((g, i) => ({ g, ...Object.fromEntries(obs[i]!.map((v, j) => [`c${j}`, v])) })) } };
    if (ask === "expected") {
      const e = (rt[0]! * ct[0]!) / N;
      return {
        stimulus,
        stem: "Assuming the null hypothesis of a chi-square test is true, what is the expected count for Group 1, Option A?",
        ...nums(e, "Expected = (row total × column total) / table total.", [[obs[0]![0]!, "That is the observed count."], [N / (R * C), "Expected counts depend on the row and column totals."], [(rt[0]! * ct[0]!) / (N * 2), "Divide by the table total once."]], 2),
        explanation: `${rt[0]} × ${ct[0]} / ${N} = ${f(e, 2)}.`,
      };
    }
    return {
      stimulus,
      stem: "For a chi-square test of homogeneity on these counts, what are the test statistic and degrees of freedom?",
      ...options([`χ² = ${f(chi, 2)}, df = ${df}, p-value = ${f(pv, 4)}`, "χ² = Σ(O − E)²/E with df = (rows − 1)(columns − 1)."], [[`χ² = ${f(chi, 2)}, df = ${R * C - 1}, p-value = ${f(chi2Upper(chi, R * C - 1), 4)}`, "For a two-way table, df = (r − 1)(c − 1)."], [`χ² = ${f(chi / N, 4)}, df = ${df}, p-value = ${f(chi2Upper(chi / N, df), 4)}`, "Do not divide by the total."], [`χ² = ${f(Math.sqrt(chi), 2)}, df = ${df}, p-value = ${f(chi2Upper(Math.sqrt(chi), df), 4)}`, "Do not take a square root."]]),
      explanation: `χ² = ${f(chi, 2)} with df = ${df}; p-value = ${f(pv, 4)}.`,
    };
  }),
  pool("st-u3-concepts", 3, ["p-values", "potential-errors-when-performing-tests", "justifying-a-claim-based-on-a-confidence-interval-for-a-population-proportion", "estimators"], ["4"], [
    { stem: "A test of H₀: p = 0.4 versus Hₐ: p > 0.4 gives a p-value of 0.03. Which interpretation is correct?", right: ["If p = 0.4, there is a 0.03 probability of a sample proportion at least as large as the one observed, by chance alone", "That is the definition of the p-value."], wrong: [["There is a 0.03 probability that H₀ is true", "A p-value is not the probability of a hypothesis."], ["There is a 0.97 probability that Hₐ is true", "Not a valid interpretation."], ["3% of the sample supports H₀", "Unrelated to the p-value."]] },
    { stem: "A factory tests H₀: the defect rate is 2% versus Hₐ: it is greater than 2%. What is a Type I error in this context?", right: ["Concluding the defect rate is greater than 2% when it actually is 2%", "Rejecting a true H₀."], wrong: [["Concluding the defect rate is 2% when it is actually higher", "That is a Type II error."], ["Correctly finding that the rate is higher", "That is a correct decision."], ["Taking a biased sample", "That is a sampling problem."]] },
    { stem: "Which change increases the power of a significance test, with everything else unchanged?", right: ["Increasing the sample size", "Larger samples detect real effects more often."], wrong: [["Decreasing the significance level α", "That lowers power."], ["Using a two-sided instead of a one-sided test", "For the correct direction, that lowers power."], ["Decreasing the sample size", "That lowers power."]] },
    { stem: "A 95% confidence interval for p is (0.42, 0.51). Which claim is supported?", right: ["It is plausible that fewer than half the population has the trait", "Values below 0.5 lie in the interval."], wrong: [["There is a 95% probability that p is between 0.42 and 0.51", "The probability statement applies to the method, not this interval."], ["Exactly 46.5% of the population has the trait", "The center is an estimate."], ["The population proportion must be greater than 0.5", "Most of the interval is below 0.5."]] },
    { stem: "What does '95% confident' mean for a confidence interval?", right: ["In many repeated samples, about 95% of intervals built this way would capture the true parameter", "Confidence describes the method's long-run success rate."], wrong: [["95% of the data fall within the interval", "Intervals estimate a parameter, not the data's spread."], ["The parameter is in this interval with probability 0.95", "The parameter is fixed; it is in or not."], ["95% of samples will have the same p̂", "Sample proportions vary."]] },
    { stem: "Which statistic is an unbiased estimator of the population proportion?", right: ["The sample proportion p̂ from a random sample", "Its sampling distribution is centered at p."], wrong: [["The largest proportion among several samples", "That would tend to overestimate."], ["The proportion from a voluntary response sample", "Voluntary response is biased."], ["The median of the sample values", "Not an estimator of a proportion."]] },
  ]),
];

/* ---------------- Unit 4 ---------------- */
export const statsUnit4: McqTemplate[] = [
  t("st-t-interval", 4, ["constructing-a-confidence-interval-for-a-population-mean-or-population-mean-difference"], ["3"], 3, (r) => {
    const n = r.int(10, 40);
    const xbar = r.int(200, 900) / 10;
    const s = r.int(20, 150) / 10;
    const c = pickConf(r);
    const ts = invT(1 - (1 - c) / 2, n - 1);
    const se = s / Math.sqrt(n);
    return {
      stem: `A random sample of ${n} has mean ${xbar} and standard deviation ${s}. Which is a ${c * 100}% confidence interval for the population mean?`,
      ...options([`(${f(xbar - ts * se, 2)}, ${f(xbar + ts * se, 2)})`, `x̄ ± t*·s/√n with t* = ${f(ts, 3)} (df = ${n - 1}).`], [[`(${f(xbar - zStar(c) * se, 2)}, ${f(xbar + zStar(c) * se, 2)})`, "With s estimating σ, use t*, not z*."], [`(${f(xbar - ts * s, 2)}, ${f(xbar + ts * s, 2)})`, "Divide s by √n."], [`(${f(xbar - ts * (s / n), 2)}, ${f(xbar + ts * (s / n), 2)})`, "Divide by √n, not n."]]),
      explanation: `SE = ${f(se, 3)}; margin = ${f(ts * se, 3)}.`,
    };
  }),
  t("st-t-test", 4, ["carrying-out-a-test-for-a-population-mean-or-population-mean-difference"], ["3"], 3, (r) => {
    const n = r.int(10, 40);
    const mu0 = r.int(50, 200);
    const s = r.int(5, 30);
    const xbar = Number((mu0 + r.pick([-1, 1]) * r.int(5, 30) / 10 * (s / Math.sqrt(n))).toFixed(1));
    const dir = xbar > mu0 ? ">" : "<";
    const tv = (xbar - mu0) / (s / Math.sqrt(n));
    const pv = dir === ">" ? 1 - tCdf(tv, n - 1) : tCdf(tv, n - 1);
    return {
      stem: `A random sample of ${n} gives x̄ = ${xbar} and s = ${s}. Test H₀: μ = ${mu0} versus Hₐ: μ ${dir} ${mu0}. What are the test statistic and p-value?`,
      ...options([`t = ${f(tv, 2)}, df = ${n - 1}, p-value = ${f(pv, 4)}`, "t = (x̄ − μ₀)/(s/√n) with df = n − 1."], [[`t = ${f(tv, 2)}, df = ${n - 1}, p-value = ${f(dir === ">" ? 1 - normCdf(tv) : normCdf(tv), 4)}`, "Use the t distribution, not the normal."], [`t = ${f((xbar - mu0) / s, 2)}, df = ${n - 1}, p-value = ${f(dir === ">" ? 1 - tCdf((xbar - mu0) / s, n - 1) : tCdf((xbar - mu0) / s, n - 1), 4)}`, "Divide by the standard error s/√n."], [`t = ${f(tv, 2)}, df = ${n - 1}, p-value = ${f(Math.min(1, 2 * pv), 4)}`, "The alternative is one-sided."]]),
      explanation: `t = (${xbar} − ${mu0})/(${s}/√${n}) = ${f(tv, 2)}; p-value = ${f(pv, 4)}.`,
    };
  }),
  t("st-two-sample-se", 4, ["sampling-distributions-for-the-difference-between-two-sample-means", "constructing-a-confidence-interval-for-the-difference-between-two-population-means"], ["3"], 2, (r) => {
    const n1 = r.int(15, 60);
    const n2 = r.int(15, 60);
    const s1 = r.int(3, 20);
    const s2 = r.int(3, 20);
    const se = Math.sqrt((s1 * s1) / n1 + (s2 * s2) / n2);
    return {
      stem: `Two independent random samples have n₁ = ${n1}, s₁ = ${s1} and n₂ = ${n2}, s₂ = ${s2}. What is the standard error of x̄₁ − x̄₂?`,
      ...nums(se, "√(s₁²/n₁ + s₂²/n₂).", [[Math.sqrt((s1 * s1) / n1 - (s2 * s2) / n2) || s1 / Math.sqrt(n1), "Variances add, even for a difference."], [s1 / Math.sqrt(n1) + s2 / Math.sqrt(n2), "Add variances, then take the square root; standard errors do not add."], [Math.sqrt((s1 + s2) ** 2 / (n1 + n2)), "Each sample contributes s²/n."]], 3),
      explanation: `√(${s1}²/${n1} + ${s2}²/${n2}) = ${f(se, 3)}.`,
    };
  }),
  pool("st-u4-concepts", 4, ["setting-up-a-test-for-a-population-mean-or-population-mean-difference", "setting-up-a-test-for-the-difference-between-two-population-means", "justifying-a-claim-based-on-a-confidence-interval-for-the-difference-between-two-population-means", "sampling-distributions-for-sample-means"], ["2"], [
    { stem: "Each of 20 students takes a reading test before and after a summer program. Which procedure compares the scores?", right: ["A paired t procedure on the differences (after − before)", "Two measurements on the same students are paired."], wrong: [["A two-sample t procedure", "The samples are not independent."], ["A two-proportion z procedure", "Scores are quantitative."], ["A chi-square test", "That is for categorical data."]] },
    { stem: "A sample of 12 values is used for a one-sample t interval. Which condition must be checked because the sample is small?", right: ["The sample data show no strong skewness or outliers (population approximately normal)", "Small samples need approximate normality."], wrong: [["np ≥ 10", "That is for proportions."], ["Expected counts at least 5", "That is for chi-square tests."], ["The sample size is at least 30", "That is the large-sample alternative."]] },
    { stem: "A 95% confidence interval for μ₁ − μ₂ is (−2.4, 5.1). What can be concluded?", right: ["There is no convincing evidence of a difference in population means, because 0 is in the interval", "Zero is a plausible difference."], wrong: [["μ₁ is greater than μ₂", "Negative differences are also plausible."], ["μ₂ is greater than μ₁", "Positive differences are also plausible."], ["The two means are exactly equal", "The interval does not prove equality."]] },
    { stem: "Why is the t distribution used instead of the normal distribution for inference about a mean?", right: ["Because σ is estimated by s, which adds variability", "t has heavier tails to account for it."], wrong: [["Because sample means are never normal", "They often are approximately normal."], ["Because t is used only for proportions", "It is used for means."], ["Because the sample is always biased", "Bias is unrelated."]] },
    { stem: "As degrees of freedom increase, what happens to the t distribution?", right: ["It approaches the standard normal distribution", "Tails become lighter."], wrong: [["It becomes more skewed", "t is symmetric."], ["Its tails get heavier", "They get lighter."], ["Its mean increases", "Its mean stays 0."]] },
    { stem: "If the sample size quadruples, what happens to the standard deviation of the sampling distribution of x̄?", right: ["It is cut in half", "σ/√n: √4 = 2."], wrong: [["It is cut to one quarter", "It depends on √n."], ["It doubles", "Larger samples reduce variability."], ["It does not change", "It depends on n."]] },
  ]),
];

/* ---------------- Unit 5 ---------------- */
export const statsUnit5: McqTemplate[] = [
  t("st-lsrl", 5, ["least-squares-regression"], ["3"], 3, (r) => {
    const xbar = r.int(5, 50);
    const ybar = r.int(20, 200);
    const sx = r.int(2, 15);
    const sy = r.int(5, 40);
    const rr = r.pick([-0.9, -0.75, -0.6, 0.5, 0.65, 0.8, 0.9]);
    const b = (rr * sy) / sx;
    const a = ybar - b * xbar;
    const fmtLine = (aa: number, bb: number) => `ŷ = ${f(aa, 2)} ${bb < 0 ? "−" : "+"} ${f(Math.abs(bb), 2)}x`;
    return {
      stem: `For a set of data, x̄ = ${xbar}, sx = ${sx}, ȳ = ${ybar}, sy = ${sy} and r = ${rr}. What is the least-squares regression line?`,
      ...options([fmtLine(a, b), "b = r·sy/sx and a = ȳ − b·x̄."], [[fmtLine(ybar - ((rr * sx) / sy) * xbar, (rr * sx) / sy), "The slope is r·sy/sx, not r·sx/sy."], [fmtLine(xbar - b * ybar, b), "a = ȳ − b·x̄."], [fmtLine(ybar - (sy / sx) * xbar, sy / sx), "Multiply sy/sx by r."]]),
      explanation: `b = ${rr}(${sy}/${sx}) = ${f(b, 3)}; a = ${ybar} − ${f(b, 3)}(${xbar}) = ${f(a, 2)}.`,
    };
  }),
  t("st-residual", 5, ["residuals", "linear-regression-models"], ["3"], 2, (r) => {
    const a = r.int(5, 50);
    const b = r.int(-30, 40) / 10;
    if (b === 0) throw new Retry();
    const x = r.int(2, 20);
    const yhat = a + b * x;
    const y = Number((yhat + r.pick([-1, 1]) * r.int(5, 60) / 10).toFixed(1));
    const res = y - yhat;
    return {
      stem: `The regression line is ŷ = ${a} ${b < 0 ? "−" : "+"} ${Math.abs(b)}x. An observation has x = ${x} and y = ${y}. What is its residual, and what does it mean?`,
      ...options([`${f(res, 2)}; the actual value is ${res > 0 ? "above" : "below"} the predicted value`, "Residual = y − ŷ."], [[`${f(-res, 2)}; the actual value is ${res > 0 ? "below" : "above"} the predicted value`, "Residual = actual − predicted, not predicted − actual."], [`${f(yhat, 2)}; this is the residual`, "That is the predicted value ŷ."], [`${f(res, 2)}; the actual value is ${res > 0 ? "below" : "above"} the predicted value`, "A positive residual means the point is above the line."]]),
      explanation: `ŷ = ${f(yhat, 2)}; residual = ${y} − ${f(yhat, 2)} = ${f(res, 2)}.`,
    };
  }),
  t("st-r-squared", 5, ["least-squares-regression", "correlation"], ["4"], 2, (r) => {
    const rr = r.pick([-0.9, -0.8, -0.7, 0.6, 0.7, 0.8, 0.95]);
    const ctx = r.pick([["hours studied", "exam score"], ["temperature", "ice cream sales"], ["car age", "resale price"], ["height", "arm span"]]);
    const r2v = rr * rr;
    return {
      stem: `The correlation between ${ctx[0]} and ${ctx[1]} is r = ${rr}. Which is a correct interpretation of r²?`,
      ...options([`About ${f(r2v * 100, 1)}% of the variation in ${ctx[1]} is accounted for by the linear model relating ${ctx[1]} to ${ctx[0]}`, "r² is the proportion of variation in y explained by the linear model."], [[`About ${f(Math.abs(rr) * 100, 1)}% of the variation in ${ctx[1]} is accounted for by the model`, "Square r."], [`${ctx[0]!.charAt(0).toUpperCase() + ctx[0]!.slice(1)} causes ${f(r2v * 100, 1)}% of ${ctx[1]}`, "Regression does not establish causation."], [`About ${f(r2v * 100, 1)}% of the predictions are correct`, "r² is about variation explained, not accuracy of individual predictions."]]),
      explanation: `r² = ${rr}² = ${f(r2v, 4)}.`,
    };
  }),
  pool("st-u5-concepts", 5, ["correlation", "graphical-representations-between-two-quantitative-variables", "residuals", "linear-regression-models"], ["4"], [
    { stem: "A residual plot shows a clear curved pattern. What does this indicate?", right: ["A linear model is not appropriate for the data", "Curvature in residuals means the relationship is not linear."], wrong: [["The linear model fits well", "A good fit shows no pattern."], ["The correlation is exactly zero", "Not necessarily."], ["There are no outliers", "Unrelated."]] },
    { stem: "Which statement about the correlation r is true?", right: ["r does not change if the units of x or y change", "r has no units."], wrong: [["r = 0 means there is no relationship of any kind", "There could be a nonlinear relationship."], ["r is resistant to outliers", "r is strongly affected by outliers."], ["r = 0.9 shows that x causes y", "Correlation is not causation."]] },
    { stem: "A regression of weight (kg) on height (cm) for children aged 5–10 is used to predict the weight of an adult who is 180 cm tall. What is the main problem?", right: ["Extrapolation beyond the range of the data", "The pattern may not hold for adults."], wrong: [["The correlation is negative", "Height and weight are positively related."], ["The residual is zero", "Unrelated."], ["Weight is categorical", "It is quantitative."]] },
    { stem: "The slope of a regression line predicting exam score from hours studied is 3.5. Which interpretation is correct?", right: ["For each additional hour studied, the predicted exam score increases by about 3.5 points", "Slope is the predicted change in y per unit of x."], wrong: [["Each student's score increases by exactly 3.5 points per hour", "The slope describes predicted, not actual, values."], ["A student who studies 0 hours scores 3.5", "That would be the intercept."], ["35% of the variation in scores is explained", "That is r²."]] },
    { stem: "A point with an x value far from the others noticeably changes the slope when removed. What is it?", right: ["An influential point", "Removing it changes the regression line substantially."], wrong: [["A point with a residual of 0", "Influence is about leverage, not residual size."], ["A confounding variable", "That is a variable, not a point."], ["The mean point (x̄, ȳ)", "The line always passes through it."]] },
  ]),
];

