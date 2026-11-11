/* AP Statistics (revised 2026-27), Unit 3: Inference for Categorical Data: Proportions. */
const R = String.raw;
export const lessons = [
  {
    id: "estimators",
    obj: ["Distinguish parameters and statistics and judge estimators by bias and variability."],
    terms: [
      ["Parameter", "A number describing a population, such as p or μ."],
      ["Statistic", "A number computed from a sample, such as p̂ or x̄, used to estimate a parameter."],
      ["Unbiased estimator", "A statistic whose sampling distribution is centered at the parameter."],
    ],
    checks: [
      ["Is the sample proportion an unbiased estimator of p?", "Yes."],
      ["How can you reduce an estimator's variability?", "Increase the sample size."],
    ],
    body: R`
| | Population (parameter) | Sample (statistic) |
| --- | --- | --- |
| proportion | $$p$$ | $$\hat p$$ |
| mean | $$\mu$$ | $$\bar x$$ |
| standard deviation | $$\sigma$$ | $$s$$ |

A good estimator has **low bias** (centered on the parameter) and **low variability** (consistent from sample to sample). Think of a target: bias is missing the bullseye on average; variability is how scattered the shots are.
`,
    note: ["Bias comes from design", "Biased sampling methods produce biased estimates no matter how large the sample."],
    ex: ["Identify", "In a random sample of 400 voters, 52% support a candidate. Identify the parameter and statistic.", ["The parameter is the proportion of all voters who support the candidate (unknown).", "The statistic is 0.52."], "p = proportion of all voters; p̂ = 0.52."],
  },
  {
    id: "sampling-distributions-for-sample-proportions",
    obj: ["Describe the sampling distribution of a sample proportion and check its conditions."],
    terms: [["Large counts condition", "np ≥ 10 and n(1 − p) ≥ 10, so the sampling distribution of p̂ is approximately normal."]],
    checks: [
      ["What is the standard deviation of p̂ for n = 100, p = 0.2?", "√(0.2 × 0.8 / 100) = 0.04."],
      ["Why check the 10% condition?", "So the standard deviation formula is approximately correct when sampling without replacement."],
    ],
    body: R`
$$\mu_{\hat p} = p \qquad \sigma_{\hat p} = \sqrt{\frac{p(1-p)}{n}}$$

**Conditions**:

- **Random**: a random sample or random assignment.
- **10%**: n is less than 10% of the population (sampling without replacement).
- **Large counts**: $$np \ge 10$$ and $$n(1-p) \ge 10$$, so the shape is approximately normal.
`,
    note: ["Use p, not p̂", "For the sampling distribution, use the true (or hypothesized) p in the formulas."],
    ex: ["Probability", "40% of a large school's students walk to school. In an SRS of 150, find the probability that at least 45% walk.", [R`$$\sigma_{\hat p} = \sqrt{0.4(0.6)/150} = 0.04$$; counts 60 and 90 ≥ 10.`, R`$$z = (0.45 - 0.40)/0.04 = 1.25$$.`], "about 0.106."],
  },
  {
    id: "constructing-a-confidence-interval-for-a-population-proportion",
    obj: ["Construct a one-sample z interval for a proportion."],
    terms: [
      ["Confidence interval", "A range of plausible values for a parameter: statistic ± margin of error."],
      ["Margin of error", "Critical value × standard error."],
    ],
    checks: [
      ["What is z* for 95% confidence?", "About 1.96."],
      ["How does increasing the confidence level affect the interval?", "It makes it wider."],
    ],
    body: R`
$$\hat p \pm z^*\sqrt{\frac{\hat p(1-\hat p)}{n}}$$

| Confidence | z* |
| --- | --- |
| 90% | 1.645 |
| 95% | 1.960 |
| 99% | 2.576 |

## Four steps

1. **State** the parameter and confidence level.
2. **Plan**: name the procedure (one-sample z interval for p) and check conditions (random, 10%, large counts with $$n\hat p$$ and $$n(1-\hat p)$$).
3. **Do** the calculation.
4. **Conclude** in context.

The margin of error shrinks with larger n and lower confidence.
`,
    note: ["Sample size for a margin", "To get margin of error m, solve n ≥ (z*/m)² p̂(1 − p̂); use p̂ = 0.5 if no estimate is available."],
    ex: ["Construct", "In a random sample of 500 teens, 310 say they read for fun weekly. Construct a 95% confidence interval for p.", [R`$$\hat p = 0.62$$; SE = $$\sqrt{0.62(0.38)/500} = 0.0217$$.`, R`$$0.62 \pm 1.96(0.0217) = 0.62 \pm 0.0425$$.`], "(0.577, 0.663)."],
  },
  {
    id: "justifying-a-claim-based-on-a-confidence-interval-for-a-population-proportion",
    obj: ["Interpret confidence intervals and confidence levels and use intervals to evaluate claims."],
    terms: [["Confidence level", "The long-run proportion of intervals, from many samples, that capture the parameter."]],
    checks: [
      ["A 95% interval is (0.41, 0.49). Is a claim that p = 0.5 plausible?", "No; 0.5 is not in the interval."],
      ["Does 95% confidence mean a 95% chance that p is in this interval?", "No; it describes the method's long-run success rate."],
    ],
    body: R`
**Interpret the interval**: "We are 95% confident that the interval from 0.41 to 0.49 captures the true proportion of [context]."

**Interpret the level**: "If we took many random samples and built a 95% interval from each, about 95% of the intervals would capture the true proportion."

**Claims**: values inside the interval are plausible; values outside are not.
`,
    note: ["Plausible is not proven", "A value inside the interval is plausible, but the interval does not prove the parameter equals it."],
    ex: ["Evaluate a claim", "A company claims 60% of customers are satisfied. A 95% interval from a random sample is (0.52, 0.58). Evaluate the claim.", ["0.60 is above the interval."], "the claim is not plausible; the true proportion appears lower than 60%."],
  },
  {
    id: "setting-up-a-test-for-a-population-proportion",
    obj: ["Write hypotheses and check conditions for a one-sample z test for a proportion."],
    terms: [
      ["Null hypothesis (H₀)", "The claim of no effect or no difference, stated as p = p₀."],
      ["Alternative hypothesis (Hₐ)", "What we look for evidence of: p greater than, less than, or not equal to p₀."],
    ],
    checks: [
      ["Do hypotheses use p or p̂?", "The parameter p."],
      ["Which value of p is used in the large counts check for a test?", "The hypothesized value p₀."],
    ],
    body: R`
$$H_0: p = p_0 \qquad H_a: p > p_0,\ p < p_0,\ \text{or}\ p \ne p_0$$

Define p in context. The alternative comes from the research question, before looking at data.

**Conditions**: random, 10%, and large counts using $$np_0 \ge 10$$ and $$n(1 - p_0) \ge 10$$.

Choose a **significance level** α (often 0.05) in advance.
`,
    note: ["Hypotheses are about the population", "Never write hypotheses about the sample statistic; the sample result is already known."],
    ex: ["Write hypotheses", "A coin is suspected of landing heads more than half the time. State the hypotheses.", ["p = true proportion of flips that land heads."], R`$$H_0: p = 0.5$$, $$H_a: p > 0.5$$.`],
  },
  {
    id: "p-values",
    obj: ["Interpret p-values and compare them with a significance level."],
    terms: [["p-value", "The probability, assuming H₀ is true, of a statistic as extreme as or more extreme than the observed one."]],
    checks: [
      ["Is a p-value the probability that H₀ is true?", "No."],
      ["What does a small p-value indicate?", "The observed result would be unusual if H₀ were true, giving evidence for Hₐ."],
    ],
    body: R`
**Interpretation template**: "Assuming [H₀ in context], there is a [p-value] probability of getting a sample proportion of [observed] or [more extreme direction] by chance alone."

- p-value ≤ α: **reject** H₀; convincing evidence for Hₐ.
- p-value greater than α: **fail to reject** H₀; not convincing evidence for Hₐ.

We never "accept" H₀.
`,
    note: ["Two-sided tests", "For Hₐ: p ≠ p₀, the p-value counts extreme results in both tails, so it is twice the one-tail area."],
    ex: ["Interpret", "Testing H₀: p = 0.30 vs Hₐ: p > 0.30 gives p̂ = 0.36 and a p-value of 0.04. Interpret the p-value.", ["Assume p = 0.30."], "if 30% is the true proportion, there is a 0.04 probability of a sample proportion of 0.36 or higher by chance alone."],
  },
  {
    id: "carrying-out-a-test-for-a-population-proportion",
    obj: ["Carry out a one-sample z test for a proportion and conclude in context."],
    terms: [["Test statistic", "z = (p̂ − p₀) / √(p₀(1 − p₀)/n)."]],
    checks: [
      ["Which standard deviation is used in the test statistic?", "The one based on p₀."],
      ["With α = 0.05 and a p-value of 0.12, what is the conclusion?", "Fail to reject H₀; not convincing evidence for Hₐ."],
    ],
    body: R`
$$z = \frac{\hat p - p_0}{\sqrt{\dfrac{p_0(1-p_0)}{n}}}$$

## Four steps

1. **State** hypotheses, α and the parameter.
2. **Plan**: one-sample z test for p; check conditions.
3. **Do**: test statistic and p-value.
4. **Conclude**: compare p-value with α and state the conclusion in context.
`,
    note: ["Conclusion language", "'Because the p-value of 0.012 is less than α = 0.05, we reject H₀. There is convincing evidence that the true proportion of … is greater than …'"],
    ex: ["Test", "A school claims 80% of students have home internet. In an SRS of 200, 148 do. Test Hₐ: p < 0.80 at α = 0.05.", [R`$$\hat p = 0.74$$; SD = $$\sqrt{0.8(0.2)/200} = 0.0283$$.`, R`$$z = (0.74 - 0.80)/0.0283 = -2.12$$; p-value ≈ 0.017.`], "reject H₀: convincing evidence that fewer than 80% have home internet."],
  },
  {
    id: "potential-errors-when-performing-tests",
    obj: ["Describe Type I and Type II errors, their consequences, and power."],
    terms: [
      ["Type I error", "Rejecting H₀ when it is actually true; probability α."],
      ["Type II error", "Failing to reject H₀ when Hₐ is actually true; probability β."],
      ["Power", "The probability of correctly rejecting a false H₀: 1 − β."],
    ],
    checks: [
      ["How can power be increased?", "Larger sample size, larger α, or a larger true effect."],
      ["If a test rejects H₀, which error could have occurred?", "A Type I error."],
    ],
    body: R`
| | H₀ true | H₀ false |
| --- | --- | --- |
| reject H₀ | Type I error (α) | correct (power) |
| fail to reject H₀ | correct | Type II error (β) |

Lowering α makes Type I errors less likely but Type II errors more likely (less power). Increasing n increases power without raising α.

Describe errors **in context**, including the consequence.
`,
    note: ["Which error is worse?", "It depends on consequences. In testing a new safety device, wrongly concluding it works (Type I) might be the more serious mistake."],
    ex: ["Describe an error", "H₀: a batch's defect rate is 2%; Hₐ: greater than 2%. Describe a Type II error and its consequence.", ["Fail to reject when the defect rate really is higher."], "concluding the batch is acceptable when it actually has too many defects, so defective products are shipped."],
  },
  {
    id: "sampling-distributions-for-the-difference-between-sample-proportions",
    obj: ["Describe the sampling distribution of a difference between two sample proportions."],
    terms: [["Difference of proportions", "p̂₁ − p̂₂, which estimates p₁ − p₂."]],
    checks: [
      ["What is the mean of the sampling distribution of p̂₁ − p̂₂?", "p₁ − p₂."],
      ["Why do variances add even for a difference?", "Variability from both independent samples contributes."],
    ],
    body: R`
$$\mu_{\hat p_1 - \hat p_2} = p_1 - p_2 \qquad \sigma_{\hat p_1 - \hat p_2} = \sqrt{\frac{p_1(1-p_1)}{n_1} + \frac{p_2(1-p_2)}{n_2}}$$

**Conditions**: two independent random samples (or random assignment), 10% for each sample, and large counts in both samples.
`,
    note: ["Independence", "The two samples must be independent of each other. Paired data (the same people measured twice) need a different method."],
    ex: ["Standard deviation", "p₁ = 0.5 with n₁ = 100; p₂ = 0.4 with n₂ = 150. Find the SD of p̂₁ − p̂₂.", [R`$$\sqrt{0.25/100 + 0.24/150} = \sqrt{0.0025 + 0.0016}$$.`], "about 0.064."],
  },
  {
    id: "constructing-a-confidence-interval-for-the-difference-between-two-population-proportions",
    obj: ["Construct a two-sample z interval for p₁ − p₂."],
    terms: [["Two-sample z interval", "(p̂₁ − p̂₂) ± z* √(p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂)."]],
    checks: [
      ["Which counts must be at least 10 for the interval?", "n₁p̂₁, n₁(1 − p̂₁), n₂p̂₂ and n₂(1 − p̂₂)."],
      ["Does the order of subtraction matter?", "Only for interpretation: define which group is 1."],
    ],
    body: R`
$$(\hat p_1 - \hat p_2) \pm z^*\sqrt{\frac{\hat p_1(1-\hat p_1)}{n_1} + \frac{\hat p_2(1-\hat p_2)}{n_2}}$$

Follow the four steps: state, plan (conditions), do, conclude.
`,
    note: ["Define the difference", "Write it out: p₁ − p₂, where p₁ is the proportion of … and p₂ is the proportion of …"],
    ex: ["Construct", "In random samples, 120 of 300 city residents and 90 of 300 suburban residents use public transit weekly. Find a 95% interval for p_city − p_suburb.", [R`$$\hat p_1 = 0.40$$, $$\hat p_2 = 0.30$$; SE = $$\sqrt{0.24/300 + 0.21/300} = 0.0387$$.`, R`$$0.10 \pm 1.96(0.0387)$$.`], "(0.024, 0.176)."],
  },
  {
    id: "justifying-a-claim-based-on-a-confidence-interval-for-the-difference-between-two-population-proportions",
    obj: ["Use an interval for p₁ − p₂ to evaluate claims about a difference."],
    terms: [["Zero in the interval", "If 0 is a plausible value, there is no convincing evidence of a difference."]],
    checks: [
      ["A 95% interval for p₁ − p₂ is (−0.03, 0.08). Is there convincing evidence of a difference?", "No; 0 is in the interval."],
      ["An interval is (0.02, 0.11). Which group has the higher proportion?", "Group 1, since all plausible differences are positive."],
    ],
    body: R`
- If the entire interval is **above 0**: convincing evidence that $$p_1 > p_2$$.
- If it is **below 0**: convincing evidence that $$p_1 < p_2$$.
- If it **contains 0**: no convincing evidence of a difference.

Interpret in context: "We are 95% confident that the interval from 0.02 to 0.11 captures the true difference in the proportions of …"
`,
    note: ["Size of the difference", "An interval also shows how large the difference plausibly is, which a test alone does not."],
    ex: ["Evaluate", "A 90% interval for (new treatment − old) recovery proportions is (0.05, 0.19). What does it suggest?", ["Every plausible difference is positive."], "convincing evidence the new treatment has a higher recovery proportion, by about 5 to 19 percentage points."],
  },
  {
    id: "setting-up-a-test-for-the-difference-between-two-population-proportions",
    obj: ["Write hypotheses and check conditions for a two-sample z test for proportions, using the pooled proportion."],
    terms: [["Pooled proportion", "p̂c = (x₁ + x₂)/(n₁ + n₂), the combined proportion used when H₀: p₁ = p₂ is assumed true."]],
    checks: [
      ["Why pool for the test but not the interval?", "The test assumes p₁ = p₂, so one combined estimate is best."],
      ["State the null hypothesis for comparing two proportions.", "H₀: p₁ − p₂ = 0."],
    ],
    body: R`
$$H_0: p_1 - p_2 = 0 \qquad H_a: p_1 - p_2 > 0,\ < 0,\ \text{or} \ne 0$$

$$\hat p_c = \frac{x_1 + x_2}{n_1 + n_2}$$

**Conditions**: random (two samples or random assignment), 10% for samples, and large counts using $$\hat p_c$$: $$n_1\hat p_c$$, $$n_1(1-\hat p_c)$$, $$n_2\hat p_c$$, $$n_2(1-\hat p_c)$$ all at least 10.
`,
    note: ["Experiments", "In a randomized experiment, the 10% condition is not needed because units were assigned, not sampled."],
    ex: ["Pooled proportion", "Group 1: 45 of 150 succeed. Group 2: 30 of 150 succeed. Find p̂c.", [R`$$(45 + 30)/(150 + 150)$$.`], "0.25."],
  },
  {
    id: "carrying-out-a-test-for-the-difference-between-two-population-proportions",
    obj: ["Carry out a two-sample z test for proportions and conclude in context."],
    terms: [["Two-sample z statistic", "z = (p̂₁ − p̂₂) / √(p̂c(1 − p̂c)(1/n₁ + 1/n₂))."]],
    checks: [
      ["What standard error does the test use?", "The pooled one, √(p̂c(1 − p̂c)(1/n₁ + 1/n₂))."],
      ["If a randomized experiment rejects H₀, what can be concluded?", "The treatment caused the difference, for units like those in the experiment."],
    ],
    body: R`
$$z = \frac{(\hat p_1 - \hat p_2) - 0}{\sqrt{\hat p_c(1 - \hat p_c)\left(\dfrac{1}{n_1} + \dfrac{1}{n_2}\right)}}$$

Find the p-value from the standard normal distribution in the direction of Hₐ, compare with α, and conclude in context. With random assignment, a significant result supports a **causal** conclusion.
`,
    note: ["Statistical versus practical significance", "With large samples, tiny differences can be statistically significant but unimportant in practice."],
    ex: ["Test", "Using p̂₁ = 0.30, p̂₂ = 0.20, n₁ = n₂ = 150 (p̂c = 0.25), test Hₐ: p₁ − p₂ > 0.", [R`SE = $$\sqrt{0.25(0.75)(2/150)} = 0.05$$.`, R`$$z = 0.10/0.05 = 2.0$$; p-value ≈ 0.023.`], "reject H₀ at α = 0.05: convincing evidence that p₁ is greater than p₂."],
  },
  {
    id: "setting-up-a-chi-square-test-for-homogeneity-or-independence",
    obj: ["Choose between chi-square tests for homogeneity and independence, state hypotheses, and compute expected counts."],
    terms: [
      ["Test for homogeneity", "Compares the distribution of one categorical variable across several populations or treatments."],
      ["Test for independence", "Tests for an association between two categorical variables in one population."],
      ["Expected count", "(row total × column total) / table total."],
    ],
    checks: [
      ["What condition do expected counts need to meet?", "All expected counts at least 5."],
      ["What are the degrees of freedom for a 3 × 4 table?", "(3 − 1)(4 − 1) = 6."],
    ],
    body: R`
| Test | Data | H₀ |
| --- | --- | --- |
| homogeneity | separate samples from several populations | the distribution is the same in every population |
| independence | one sample, two variables | the two variables are independent (no association) |

$$\text{expected} = \frac{\text{row total} \times \text{column total}}{\text{table total}}$$

**Conditions**: random samples or random assignment, 10% condition, all expected counts at least 5.
`,
    note: ["Same calculation", "Both tests compute the statistic the same way; they differ in how the data were collected and how the hypotheses are worded."],
    ex: ["Expected count", "In a table of 200 people, a row total is 80 and a column total is 50. Find the expected count for that cell.", [R`$$80 \times 50 / 200$$.`], "20."],
  },
  {
    id: "carrying-out-a-chi-square-test-for-homogeneity-or-independence",
    obj: ["Compute the chi-square statistic, degrees of freedom and p-value, and conclude in context."],
    terms: [["Chi-square statistic", "χ² = Σ (observed − expected)² / expected."]],
    checks: [
      ["Is a large or small χ² evidence against H₀?", "Large."],
      ["After a significant result, how can you see which cells contribute most?", "Compare the components (O − E)²/E for each cell."],
    ],
    body: R`
$$\chi^2 = \sum \frac{(O - E)^2}{E} \qquad df = (r - 1)(c - 1)$$

The p-value is the area to the right of χ² under the chi-square distribution with those degrees of freedom. Chi-square tests are always right-tailed.

After rejecting H₀, look at the largest components to describe **how** the distributions differ.
`,
    note: ["Counts, not percents", "Chi-square calculations must use counts. Converting to percentages changes the statistic."],
    ex: ["Compute", "A 2 × 2 table has observed counts 30, 20 / 20, 30 and every expected count is 25. Find χ², df and the conclusion at α = 0.05.", [R`Each component: $$5^2/25 = 1$$; χ² = 4.`, R`df = 1; p-value ≈ 0.046.`], "reject H₀: there is convincing evidence of an association."],
  },
];
