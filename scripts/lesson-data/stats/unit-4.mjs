/* AP Statistics (revised 2026-27), Units 4–5: Inference for Means; Regression Analysis. */
const R = String.raw;
export const lessons = [
  {
    id: "sampling-distributions-for-sample-means",
    obj: ["Describe the sampling distribution of a sample mean and when it is approximately normal."],
    terms: [["Standard error of the mean", "s/√n, an estimate of σ/√n."]],
    checks: [
      ["σ = 12 and n = 36. What is σx̄?", "2."],
      ["When is the sampling distribution of x̄ approximately normal?", "When the population is normal or n ≥ 30 (central limit theorem)."],
    ],
    body: R`
$$\mu_{\bar x} = \mu \qquad \sigma_{\bar x} = \frac{\sigma}{\sqrt n}$$

Shape: normal if the population is normal; approximately normal for $$n \ge 30$$ by the central limit theorem; for small samples from unknown populations, check a graph of the sample data for strong skew or outliers.

Because σ is usually unknown, inference for means uses $$s$$ and the **t distribution**.
`,
    note: ["Why t?", "Replacing σ with s adds variability, so t distributions have heavier tails than the normal. As degrees of freedom grow, t approaches z."],
    ex: ["Probability", "Battery life is normal with μ = 40 h, σ = 5 h. Find P(x̄ ≥ 42) for samples of 16.", [R`$$\sigma_{\bar x} = 5/4 = 1.25$$.`, R`$$z = 2/1.25 = 1.6$$.`], "about 0.055."],
  },
  {
    id: "constructing-a-confidence-interval-for-a-population-mean-or-population-mean-difference",
    obj: ["Construct one-sample t intervals for a mean, including paired differences."],
    terms: [
      ["t interval", "x̄ ± t* · s/√n with df = n − 1."],
      ["Paired data", "Two measurements on the same or matched units; analyze the differences."],
    ],
    checks: [
      ["What are the degrees of freedom for a sample of 20?", "19."],
      ["How do you analyze before-and-after measurements on the same people?", "Compute each person's difference and do a one-sample t procedure on the differences."],
    ],
    body: R`
$$\bar x \pm t^*\frac{s}{\sqrt n} \qquad df = n - 1$$

**Conditions**: random, 10%, and normal/large sample ($$n \ge 30$$, or the population is normal, or the sample data show no strong skew or outliers).

**Paired data**: compute differences $$d$$, then use $$\bar x_d \pm t^*\frac{s_d}{\sqrt n}$$.

t* is larger than z* for the same confidence level, especially for small samples.
`,
    note: ["Check the graph", "With small samples, sketch or describe a dotplot or boxplot of the data to justify the normality condition."],
    ex: ["Construct", "A random sample of 25 students sleeps x̄ = 6.8 h with s = 1.2 h. Find a 95% interval for μ (t* = 2.064).", [R`SE = $$1.2/5 = 0.24$$.`, R`$$6.8 \pm 2.064(0.24) = 6.8 \pm 0.495$$.`], "(6.31, 7.30) hours."],
  },
  {
    id: "justifying-a-claim-based-on-a-confidence-interval-for-a-population-mean-or-population-mean-difference",
    obj: ["Interpret t intervals and use them to evaluate claims about a mean or mean difference."],
    terms: [["Plausible value", "A value inside the confidence interval."]],
    checks: [
      ["A 95% interval for μ is (12.1, 14.3). Is 15 plausible?", "No."],
      ["For paired differences, what does an interval entirely above 0 suggest?", "Convincing evidence that the mean difference is positive."],
    ],
    body: R`
Interpret: "We are C% confident that the interval from a to b captures the true mean [context, with units]."

Claims: a claimed value outside the interval is not plausible. For paired differences, check whether 0 is in the interval.

Increasing n narrows the interval; increasing the confidence level widens it.
`,
    note: ["Not about individuals", "A confidence interval for μ estimates the population mean, not the range of individual values."],
    ex: ["Paired claim", "A 95% interval for the mean improvement (after − before) is (1.8, 5.4) points. Does the program help?", ["0 is not in the interval; all plausible values are positive."], "yes: convincing evidence of a positive mean improvement, about 1.8 to 5.4 points."],
  },
  {
    id: "setting-up-a-test-for-a-population-mean-or-population-mean-difference",
    obj: ["Write hypotheses and check conditions for a one-sample (or paired) t test."],
    terms: [["One-sample t test", "A test of H₀: μ = μ₀ using t = (x̄ − μ₀)/(s/√n)."]],
    checks: [
      ["State hypotheses to test whether a mean differs from 50.", "H₀: μ = 50, Hₐ: μ ≠ 50."],
      ["For paired data, what is μ_d under H₀ usually?", "0."],
    ],
    body: R`
$$H_0: \mu = \mu_0 \qquad H_a: \mu > \mu_0,\ \mu < \mu_0,\ \text{or}\ \mu \ne \mu_0$$

For paired data: $$H_0: \mu_d = 0$$, with $$\mu_d$$ defined as the true mean difference (specify the order).

**Conditions**: random, 10%, normal/large sample.
`,
    note: ["Define μ in context", "Say what μ is: 'μ = the true mean weight, in grams, of all bags filled by this machine.'"],
    ex: ["Hypotheses", "A cereal box should contain 368 g. An inspector suspects underfilling. State hypotheses.", ["μ = true mean fill weight."], R`$$H_0: \mu = 368$$, $$H_a: \mu < 368$$.`],
  },
  {
    id: "carrying-out-a-test-for-a-population-mean-or-population-mean-difference",
    obj: ["Carry out a one-sample or paired t test and conclude in context."],
    terms: [["t statistic", "t = (x̄ − μ₀)/(s/√n), with df = n − 1."]],
    checks: [
      ["n = 16, x̄ = 52, s = 8, μ₀ = 50. What is t?", "1.0."],
      ["What does a t statistic measure?", "How many standard errors the sample mean is from the hypothesized mean."],
    ],
    body: R`
$$t = \frac{\bar x - \mu_0}{s/\sqrt n} \qquad df = n - 1$$

Find the p-value from the t distribution (tcdf), compare with α, and conclude in context.
`,
    note: ["Same four steps", "State, plan, do, conclude: the structure is the same for every significance test."],
    ex: ["Test", "n = 25, x̄ = 365.2 g, s = 6 g. Test H₀: μ = 368 vs Hₐ: μ < 368 at α = 0.05.", [R`$$t = (365.2 - 368)/(6/5) = -2.33$$, df = 24.`, R`p-value ≈ 0.014.`], "reject H₀: convincing evidence that the true mean fill is less than 368 g."],
  },
  {
    id: "sampling-distributions-for-the-difference-between-two-sample-means",
    obj: ["Describe the sampling distribution of x̄₁ − x̄₂."],
    terms: [["Difference of means", "x̄₁ − x̄₂, which estimates μ₁ − μ₂."]],
    checks: [
      ["What is the standard deviation of x̄₁ − x̄₂?", "√(σ₁²/n₁ + σ₂²/n₂)."],
      ["Can you use two-sample procedures for paired data?", "No; use a paired (one-sample) procedure on the differences."],
    ],
    body: R`
$$\mu_{\bar x_1 - \bar x_2} = \mu_1 - \mu_2 \qquad \sigma_{\bar x_1 - \bar x_2} = \sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}$$

Approximately normal when both sampling distributions are approximately normal (normal populations or large samples). The two samples must be **independent**.
`,
    note: ["Paired or two-sample?", "If each value in one group is naturally linked to one value in the other (same person, twins, before and after), the data are paired."],
    ex: ["Standard deviation", "σ₁ = 10, n₁ = 25; σ₂ = 12, n₂ = 36. Find the SD of x̄₁ − x̄₂.", [R`$$\sqrt{100/25 + 144/36} = \sqrt{4 + 4}$$.`], "about 2.83."],
  },
  {
    id: "constructing-a-confidence-interval-for-the-difference-between-two-population-means",
    obj: ["Construct a two-sample t interval for μ₁ − μ₂."],
    terms: [["Two-sample t interval", "(x̄₁ − x̄₂) ± t* √(s₁²/n₁ + s₂²/n₂)."]],
    checks: [
      ["Which degrees of freedom are used?", "Technology's (Welch) df, or conservatively the smaller of n₁ − 1 and n₂ − 1."],
      ["What conditions are needed?", "Independent random samples (or random assignment), 10%, and normal/large samples in both groups."],
    ],
    body: R`
$$(\bar x_1 - \bar x_2) \pm t^*\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$$

Degrees of freedom come from technology (the Welch approximation) or conservatively $$\min(n_1 - 1, n_2 - 1)$$.

Follow the four steps and interpret in context with units.
`,
    note: ["Do not pool", "AP Statistics uses unpooled standard errors for means."],
    ex: ["Construct", "Group 1: n = 30, x̄ = 78, s = 8. Group 2: n = 35, x̄ = 72, s = 10. Find SE.", [R`$$\sqrt{64/30 + 100/35} = \sqrt{2.133 + 2.857}$$.`], "SE ≈ 2.23; the interval is 6 ± t*(2.23)."],
  },
  {
    id: "justifying-a-claim-based-on-a-confidence-interval-for-the-difference-between-two-population-means",
    obj: ["Use intervals for μ₁ − μ₂ to evaluate claims."],
    terms: [["Interval and difference", "Whether 0 lies in the interval for μ₁ − μ₂ shows whether a difference is plausible."]],
    checks: [
      ["An interval for μ₁ − μ₂ is (−4.2, −0.6). Which mean is larger?", "μ₂."],
      ["An interval is (−1.5, 3.0). Is there convincing evidence of a difference?", "No; 0 is plausible."],
    ],
    body: R`
- Interval entirely above 0: evidence that $$\mu_1 > \mu_2$$.
- Entirely below 0: evidence that $$\mu_1 < \mu_2$$.
- Contains 0: no convincing evidence of a difference.

With random assignment in an experiment, a difference can be attributed to the treatment.
`,
    note: ["State both the direction and the size", "A good conclusion says which group is larger and by how much, plausibly."],
    ex: ["Evaluate", "A 95% interval for (new method − old method) mean scores is (2.1, 9.7) in a randomized experiment. Conclusion?", ["All plausible differences are positive; random assignment."], "convincing evidence the new method causes higher mean scores, by about 2 to 10 points."],
  },
  {
    id: "setting-up-a-test-for-the-difference-between-two-population-means",
    obj: ["Write hypotheses and check conditions for a two-sample t test."],
    terms: [["Two-sample t test", "A test of H₀: μ₁ − μ₂ = 0 with independent samples."]],
    checks: [
      ["State H₀ for comparing two means.", "H₀: μ₁ − μ₂ = 0."],
      ["Why is the 10% condition skipped in experiments?", "Units are randomly assigned, not sampled from a population."],
    ],
    body: R`
$$H_0: \mu_1 - \mu_2 = 0 \qquad H_a: \mu_1 - \mu_2 > 0,\ < 0,\ \text{or} \ne 0$$

Define both parameters and the order of subtraction.

**Conditions**: two independent random samples or two groups from random assignment; 10% (for samples); normal/large sample for each group.
`,
    note: ["Order matters for the alternative", "If you write μ₁ − μ₂, a claim that group 2 is larger becomes Hₐ: μ₁ − μ₂ < 0."],
    ex: ["Hypotheses", "Does a new fertilizer (1) produce taller plants than the standard (2)?", ["Define μ₁ and μ₂ as true mean heights."], R`$$H_0: \mu_1 - \mu_2 = 0$$, $$H_a: \mu_1 - \mu_2 > 0$$.`],
  },
  {
    id: "carrying-out-a-test-for-the-difference-between-two-population-means",
    obj: ["Carry out a two-sample t test and conclude in context."],
    terms: [["Two-sample t statistic", "t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂)."]],
    checks: [
      ["What does the p-value tell you in a two-sample t test?", "The probability of a difference in sample means at least as extreme as observed, if the population means are equal."],
      ["With p = 0.003 and α = 0.01, what is the decision?", "Reject H₀."],
    ],
    body: R`
$$t = \frac{(\bar x_1 - \bar x_2) - 0}{\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}}$$

Use technology for df and the p-value. Conclude in context; with random assignment, the conclusion can be causal.

**Choosing a procedure**: one or two samples? Proportions or means? Paired or independent? Interval (estimate) or test (claim)?
`,
    note: ["Selecting procedures", "Read for the parameter (proportion or mean), the number of groups, and whether data are paired. That decides the procedure."],
    ex: ["Test", "x̄₁ − x̄₂ = 6 with SE = 2.23 (from the previous lesson). Find t and conclude for Hₐ: μ₁ − μ₂ > 0.", [R`$$t = 6/2.23 = 2.69$$.`, R`With df ≈ 62, p-value ≈ 0.005.`], "reject H₀: convincing evidence that μ₁ is greater than μ₂."],
  },
  {
    id: "graphical-representations-between-two-quantitative-variables",
    obj: ["Construct and describe scatterplots: direction, form, strength and unusual features."],
    terms: [
      ["Explanatory variable", "The variable that may explain or predict changes in the response; on the x-axis."],
      ["Response variable", "The outcome measured; on the y-axis."],
    ],
    checks: [
      ["What four features describe a scatterplot?", "Direction, form, strength and unusual features (outliers, clusters)."],
      ["What does a negative association mean?", "Larger values of x tend to go with smaller values of y."],
    ],
    body: R`
Describe a scatterplot in context:

- **Direction**: positive or negative.
- **Form**: linear or nonlinear (curved).
- **Strength**: how closely points follow the form.
- **Unusual features**: outliers, clusters.

Example: "There is a strong, positive, linear relationship between study hours and exam score, with one student who studied 10 hours but scored only 55."
`,
    note: ["Association is not causation", "A strong association in observational data does not mean x causes y."],
    ex: ["Describe", "A scatterplot of car age (x) vs. price (y) slopes downward, follows a curve that flattens for older cars, and points are tightly clustered. Describe it.", ["Direction negative; form curved; strong."], "a strong, negative, nonlinear (curved) relationship between age and price."],
  },
  {
    id: "correlation",
    obj: ["Interpret the correlation coefficient and its limitations."],
    terms: [["Correlation r", "A number from −1 to 1 measuring the direction and strength of a linear relationship."]],
    checks: [
      ["Does r = 0 mean no relationship?", "No linear relationship; there could be a strong curved one."],
      ["Does changing units change r?", "No."],
    ],
    body: R`
- $$-1 \le r \le 1$$; sign gives direction, magnitude gives strength of the **linear** relationship.
- r has no units and does not change when units change or x and y are swapped.
- r is **not resistant**: outliers can strongly change it.
- r measures linear association only; always look at the scatterplot.

$$r = \frac{1}{n-1}\sum z_x z_y$$
`,
    note: ["Correlation and causation", "High correlation alone never proves causation."],
    ex: ["Interpret", "r = −0.82 for daily temperature and heating-oil use. Interpret.", ["Negative and strong."], "there is a strong, negative linear relationship: warmer days tend to have lower heating-oil use."],
  },
  {
    id: "linear-regression-models",
    obj: ["Use a regression line to make predictions and interpret the slope and intercept."],
    terms: [
      ["Regression line", "ŷ = a + bx, which predicts the response from the explanatory variable."],
      ["Extrapolation", "Predicting outside the range of the observed x values; unreliable."],
    ],
    checks: [
      ["Interpret a slope of 3.2 for ŷ = predicted score and x = hours studied.", "For each additional hour studied, the predicted score increases by about 3.2 points."],
      ["Why is extrapolation risky?", "The pattern may not continue outside the observed data."],
    ],
    body: R`
$$\hat y = a + bx$$

- **Slope b**: "For each 1-unit increase in x, the predicted y increases (or decreases) by b units."
- **Intercept a**: the predicted y when x = 0 (may not make sense in context).
- Use **ŷ** (predicted), not y.

Avoid **extrapolation**: predictions far outside the observed x values are unreliable.
`,
    note: ["Predicted, not actual", "Interpretations should say 'predicted' because individual values vary around the line."],
    ex: ["Predict", "ŷ = 12 + 4.5x predicts weekly earnings (in tens of dollars) from hours worked. Predict for x = 10.", [R`$$12 + 4.5(10) = 57$$.`], "57 (that is, $570) predicted."],
  },
  {
    id: "residuals",
    obj: ["Calculate and interpret residuals and use residual plots to assess fit."],
    terms: [
      ["Residual", "Actual y minus predicted y: y − ŷ."],
      ["Residual plot", "A scatterplot of residuals against x (or ŷ)."],
    ],
    checks: [
      ["A residual is −4. Is the point above or below the line?", "Below: the line overpredicted by 4."],
      ["What does a curved pattern in a residual plot indicate?", "A linear model is not appropriate."],
    ],
    body: R`
$$\text{residual} = y - \hat y$$

- Positive residual: the actual value is **above** the line (underprediction).
- Negative: **below** the line (overprediction).

A good linear model has a residual plot with **no pattern**, scattered randomly around 0. A curve means a nonlinear model may fit better; a fan shape means variability changes with x.
`,
    note: ["Residuals sum to zero", "For the least-squares line, the residuals always add to 0."],
    ex: ["Compute", "ŷ = 20 + 3x. A point has x = 5 and y = 31. Find and interpret the residual.", [R`$$\hat y = 35$$; residual = $$31 - 35 = -4$$.`], "−4: the actual value is 4 units below what the model predicts."],
  },
  {
    id: "least-squares-regression",
    obj: ["Compute the least-squares line from summary statistics and interpret r² and s."],
    terms: [
      ["Least-squares regression line", "The line that minimizes the sum of squared residuals."],
      ["Coefficient of determination r²", "The proportion of variation in y explained by the linear model with x."],
      ["Standard deviation of residuals s", "The typical prediction error of the model."],
    ],
    checks: [
      ["r = 0.8, sx = 2, sy = 10. What is the slope?", "b = 0.8 × 10/2 = 4."],
      ["Interpret r² = 0.64.", "64% of the variation in y is explained by the linear model with x."],
    ],
    body: R`
$$b = r\frac{s_y}{s_x} \qquad a = \bar y - b\bar x$$

The line always passes through $$(\bar x, \bar y)$$.

- **r²**: "About r² of the variation in y is accounted for by the linear model relating y to x."
- **s**: "The actual y values typically differ from the predicted values by about s units."

**Influential points** (often with extreme x values) can change the slope substantially; outliers in y have large residuals.
`,
    note: ["Read computer output", "In regression output, the slope is the coefficient next to the x variable's name; the intercept is the 'Constant'."],
    ex: ["Build the line", "Hours studied: x̄ = 5, sx = 2. Score: ȳ = 75, sy = 8. r = 0.6. Find the LSRL.", [R`$$b = 0.6(8/2) = 2.4$$.`, R`$$a = 75 - 2.4(5) = 63$$.`], R`$$\hat y = 63 + 2.4x$$.`],
  },
];
