/* AP Statistics (revised 2026-27), Unit 2: Probability, Random Variables, and Probability Distributions. */
const R = String.raw;
export const lessons = [
  {
    id: "tabular-and-graphical-representations-for-the-distributions-of-two-categorical-variables",
    obj: ["Display two categorical variables with two-way tables, segmented bar charts and mosaic plots."],
    terms: [
      ["Two-way table", "A table of counts for two categorical variables, one in rows and one in columns."],
      ["Segmented bar chart", "Bars of equal height divided by the conditional distribution of one variable within each category of the other."],
    ],
    checks: [
      ["What does a mosaic plot show that a segmented bar chart does not?", "The relative sizes of the groups, through bar widths."],
      ["Where are marginal totals found in a two-way table?", "In the row and column totals."],
    ],
    body: R`
| | Plays sports | Does not | Total |
| --- | --- | --- | --- |
| 9th grade | 45 | 55 | 100 |
| 12th grade | 30 | 70 | 100 |
| total | 75 | 125 | 200 |

- **Segmented bar charts** compare conditional distributions (percent who play sports in each grade).
- **Mosaic plots** also show group sizes through bar widths.
- **Side-by-side bar charts** show counts or percents per category.
`,
    note: ["Pick the right denominator", "To compare grades, compute percents within each grade (row percents)."],
    ex: ["Read the table", "Using the table above, what proportion of all students play sports?", [R`$$75/200 = 0.375$$.`], "0.375."],
  },
  {
    id: "summary-statistics-for-two-categorical-variables",
    obj: ["Compute marginal, joint and conditional relative frequencies and use them to describe association."],
    terms: [
      ["Joint relative frequency", "A cell count divided by the table total."],
      ["Conditional relative frequency", "A cell count divided by its row or column total."],
      ["Association", "Knowing one variable's value changes the distribution of the other."],
    ],
    checks: [
      ["If conditional distributions are the same in every group, is there an association?", "No."],
      ["Using the sports table, what proportion of 12th graders play sports?", "30/100 = 0.30."],
    ],
    body: R`
| Type | Denominator |
| --- | --- |
| joint | table total |
| marginal | table total (using row or column totals) |
| conditional | a row or column total |

Two variables are **associated** if the conditional distributions differ across categories. In the sports table, 45% of 9th graders and 30% of 12th graders play sports, so grade and sports participation are associated in these data.
`,
    note: ["Association is not causation", "Even a strong association in a two-way table does not prove one variable causes the other."],
    ex: ["Conditional proportions", "Of 120 dog owners, 84 walk daily; of 80 cat owners, 20 walk daily. Is pet type associated with walking daily?", [R`Dog owners: 84/120 = 0.70.`, R`Cat owners: 20/80 = 0.25.`], "yes; the proportions differ greatly (0.70 vs 0.25)."],
  },
  {
    id: "estimating-probabilities-using-simulation",
    obj: ["Design and interpret simulations to estimate probabilities."],
    terms: [
      ["Simulation", "Imitating a random process with a model, such as random numbers, to estimate probabilities."],
      ["Law of large numbers", "As the number of trials increases, the relative frequency of an outcome approaches its true probability."],
    ],
    checks: [
      ["How do you simulate an event with probability 0.3 using random digits 0–9?", "Let 0, 1, 2 represent the event and 3–9 represent no event."],
      ["Why run many trials?", "The estimate gets closer to the true probability (law of large numbers)."],
    ],
    body: R`
## Steps

1. **State** the question.
2. **Plan**: describe how to use random numbers to imitate one trial, and what to record.
3. **Do** many trials.
4. **Conclude**: the estimated probability is the proportion of trials with the outcome.

The **law of large numbers** says long-run relative frequencies settle down to the true probability. Short-run results can be quite variable.
`,
    note: ["Specify everything", "A complete simulation plan says what each number represents, whether repeats are allowed, how many numbers make one trial, and what is recorded."],
    ex: ["Plan a simulation", "A basketball player makes 70% of free throws. Plan a simulation to estimate the probability she makes all 3 of 3 shots.", ["Digits 0–6 = make, 7–9 = miss.", "One trial: 3 random digits (repeats allowed); record whether all are 0–6.", "Repeat many times; the proportion of successes estimates the probability."], "use digits 0–6 for makes; the estimate should be close to 0.7³ = 0.343."],
  },
  {
    id: "introduction-to-probability",
    obj: ["Apply basic probability rules: sample spaces, complements and equally likely outcomes."],
    terms: [
      ["Sample space", "The set of all possible outcomes of a chance process."],
      ["Complement", "The event that A does not occur; P(not A) = 1 − P(A)."],
    ],
    checks: [
      ["What is the probability of rolling a sum of 7 with two dice?", "6/36 = 1/6."],
      ["If P(rain) = 0.35, what is P(no rain)?", "0.65."],
    ],
    body: R`
- Probabilities are between 0 and 1, and all outcomes in the sample space add to 1.
- With equally likely outcomes: $$P(A) = \frac{\text{outcomes in } A}{\text{total outcomes}}$$
- Complement rule: $$P(A^C) = 1 - P(A)$$

The probability of an event is its long-run relative frequency over many repetitions.
`,
    note: ["At least one", "For 'at least one' questions, use the complement: P(at least one) = 1 − P(none)."],
    ex: ["Complement", "The probability a part is defective is 0.04, independently. What is the probability that at least one of 5 parts is defective?", [R`$$P(\text{none}) = 0.96^5 = 0.815$$.`, R`$$1 - 0.815$$.`], "about 0.185."],
  },
  {
    id: "mutually-exclusive-events",
    obj: ["Identify mutually exclusive events and apply the addition rule for them."],
    terms: [["Mutually exclusive (disjoint)", "Events that cannot happen at the same time: P(A and B) = 0."]],
    checks: [
      ["Are 'roll a 2' and 'roll an odd number' mutually exclusive?", "Yes."],
      ["Can two mutually exclusive events with positive probability be independent?", "No; if one happens, the other cannot."],
    ],
    body: R`
For mutually exclusive events: $$P(A \text{ or } B) = P(A) + P(B)$$

Mutually exclusive is **not** the same as independent. Disjoint events are strongly dependent: knowing A happened tells you B did not.
`,
    note: ["Check before adding", "Only add probabilities directly when the events cannot overlap."],
    ex: ["Disjoint events", "A student's grade is A with probability 0.25 and B with probability 0.40. What is P(A or B)?", ["A grade cannot be both A and B."], "0.65."],
  },
  {
    id: "conditional-probability",
    obj: ["Calculate conditional probabilities from tables, tree diagrams and the multiplication rule."],
    terms: [["Conditional probability", "P(A | B) = P(A and B) / P(B): the probability of A given that B occurred."]],
    checks: [
      ["Is P(A | B) the same as P(B | A)?", "Not in general."],
      ["What is the general multiplication rule?", "P(A and B) = P(A) · P(B | A)."],
    ],
    body: R`
$$P(A \mid B) = \frac{P(A \cap B)}{P(B)} \qquad P(A \cap B) = P(A)\,P(B \mid A)$$

**Tree diagrams** organize multistage processes: multiply along branches, add across branches that lead to the same event.

A classic application: a medical test's chance of a positive result given disease differs from the chance of disease given a positive result.
`,
    note: ["Given means restrict", "'Given B' means look only at the B row or column of the table."],
    ex: ["Tree diagram", "1% of people have a condition. A test is positive for 95% of those with it and 8% of those without. Find P(condition | positive).", [R`P(positive and condition) = 0.01 × 0.95 = 0.0095.`, R`P(positive) = 0.0095 + 0.99 × 0.08 = 0.0887.`, R`0.0095 ÷ 0.0887.`], "about 0.107."],
  },
  {
    id: "independent-events-and-unions-of-events",
    obj: ["Determine whether events are independent and apply the general addition rule."],
    terms: [
      ["Independent events", "Knowing one occurred does not change the probability of the other: P(A | B) = P(A)."],
      ["General addition rule", "P(A or B) = P(A) + P(B) − P(A and B)."],
    ],
    checks: [
      ["How do you check independence from a table?", "Compare P(A | B) with P(A); equal means independent."],
      ["For independent events, what is P(A and B)?", "P(A) · P(B)."],
    ],
    body: R`
$$P(A \cup B) = P(A) + P(B) - P(A \cap B)$$

**Independent** events: $$P(A \cap B) = P(A)\,P(B)$$, equivalently $$P(A \mid B) = P(A)$$.

Subtracting $$P(A \cap B)$$ prevents counting outcomes in both events twice.
`,
    note: ["Independence is checked, not assumed", "Use data or the setup of the process to decide. Repeated coin flips are independent; drawing without replacement from a small group is not."],
    ex: ["General addition rule", "40% of students take Spanish, 30% take art, and 12% take both. What fraction take Spanish or art? Are the events independent?", [R`0.40 + 0.30 − 0.12 = 0.58.`, R`0.40 × 0.30 = 0.12 = P(both).`], "0.58; yes, they are independent."],
  },
  {
    id: "introduction-to-random-variables-and-probability-distributions",
    obj: ["Describe discrete random variables with probability distributions and cumulative probabilities."],
    terms: [
      ["Random variable", "A numerical outcome of a random process."],
      ["Probability distribution", "A list or rule giving the probability of each value of a random variable."],
    ],
    checks: [
      ["What must the probabilities in a discrete distribution add to?", "1."],
      ["How do you find P(X ≥ 2) from a table?", "Add the probabilities of the values 2 and above."],
    ],
    body: R`
| x | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| P(X = x) | 0.10 | 0.35 | 0.40 | 0.15 |

- Each probability is between 0 and 1; they add to 1.
- Probabilities of ranges come from adding: $$P(X \ge 2) = 0.40 + 0.15 = 0.55$$.

**Continuous** random variables have probabilities given by areas under a density curve.
`,
    note: ["Missing value", "If one probability is missing, find it by subtracting the others from 1."],
    ex: ["Missing probability", "P(X = 0) = 0.2, P(X = 1) = 0.5, P(X = 2) = ?, and X takes only 0, 1, 2. Find P(X = 2).", [R`1 − 0.2 − 0.5.`], "0.3."],
  },
  {
    id: "parameters-of-random-variables",
    obj: ["Calculate and interpret the mean and standard deviation of discrete random variables, including linear transformations and sums."],
    terms: [
      ["Expected value", "The mean of a random variable: μ = Σ x·P(x)."],
      ["Variance of a sum", "For independent X and Y, Var(X ± Y) = Var(X) + Var(Y)."],
    ],
    checks: [
      ["If Y = 3X + 2 and σX = 4, what is σY?", "12; adding a constant does not change spread."],
      ["For independent X and Y with σ = 3 and 4, what is σ of X − Y?", "5."],
    ],
    body: R`
$$\mu_X = \sum x\,P(x) \qquad \sigma_X = \sqrt{\sum (x - \mu_X)^2 P(x)}$$

## Transformations

For $$Y = a + bX$$: $$\mu_Y = a + b\mu_X$$ and $$\sigma_Y = |b|\sigma_X$$.

## Combining independent random variables

$$\mu_{X \pm Y} = \mu_X \pm \mu_Y \qquad \sigma_{X \pm Y} = \sqrt{\sigma_X^2 + \sigma_Y^2}$$

Variances add even for differences; standard deviations do not add.
`,
    note: ["Interpret the mean", "The expected value is the long-run average of many repetitions, not necessarily a value that can occur."],
    ex: ["Expected value", "A game pays $10 with probability 0.1, $2 with probability 0.3, and $0 otherwise. Find the expected payout.", [R`$$10(0.1) + 2(0.3) + 0 = 1.6$$.`], "$1.60 per play."],
  },
  {
    id: "the-binomial-distribution",
    obj: ["Identify binomial settings and calculate binomial probabilities, mean and standard deviation."],
    terms: [
      ["Binomial setting", "Fixed number n of independent trials, each a success or failure, with the same probability p."],
      ["Binomial probability", "P(X = k) = C(n, k) p^k (1 − p)^(n − k)."],
    ],
    checks: [
      ["What are the conditions for a binomial setting?", "Binary outcomes, Independent trials, fixed Number of trials, Same probability (BINS)."],
      ["What is the mean of a binomial with n = 20, p = 0.3?", "6."],
    ],
    body: R`
$$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}$$

$$\mu_X = np \qquad \sigma_X = \sqrt{np(1-p)}$$

When sampling without replacement, trials are approximately independent if the sample is less than 10% of the population.

A **geometric** setting counts trials until the first success: $$P(X = k) = (1-p)^{k-1}p$$.
`,
    note: ["Use technology", "For 'at least' or 'at most' questions, use cumulative binomial functions, or the complement."],
    ex: ["Binomial probability", "A quiz has 5 multiple-choice questions with 4 options each. A student guesses. Find P(exactly 2 correct).", [R`$$\binom{5}{2}(0.25)^2(0.75)^3 = 10(0.0625)(0.4219)$$.`], "about 0.264."],
  },
  {
    id: "the-normal-distribution",
    obj: ["Use z-scores and the normal distribution to find probabilities and percentiles."],
    terms: [
      ["z-score", "z = (x − μ)/σ: how many standard deviations a value is from the mean."],
      ["Empirical rule", "About 68%, 95% and 99.7% of a normal distribution lie within 1, 2 and 3 standard deviations of the mean."],
    ],
    checks: [
      ["Heights are normal with mean 66 in and SD 3 in. What z-score does 72 in have?", "2."],
      ["About what percent of a normal distribution is above z = 1?", "About 16%."],
    ],
    body: R`
$$z = \frac{x - \mu}{\sigma}$$

For a normal distribution $$N(\mu, \sigma)$$:

- **Probability from a value**: standardize, then find the area (normalcdf).
- **Value from a percentile**: find the z with that area (invNorm), then $$x = \mu + z\sigma$$.

Empirical rule: 68–95–99.7.

Show your work: name the distribution, the boundary, the area of interest, and the answer in context.
`,
    note: ["Is it normal?", "Only use normal calculations when the distribution is approximately normal, or when a sampling distribution is justified to be approximately normal."],
    ex: ["Percentile", "Test scores are N(500, 100). What score is at the 90th percentile?", [R`invNorm(0.90) gives z ≈ 1.282.`, R`$$500 + 1.282(100)$$.`], "about 628."],
  },
  {
    id: "sampling-distributions-and-the-central-limit-theorem",
    obj: ["Describe sampling distributions and apply the central limit theorem."],
    terms: [
      ["Sampling distribution", "The distribution of a statistic over all possible samples of the same size."],
      ["Central limit theorem", "For large n, the sampling distribution of the sample mean is approximately normal, whatever the population's shape."],
    ],
    checks: [
      ["How large a sample usually makes the CLT apply?", "n ≥ 30 is a common guideline."],
      ["What happens to the variability of a sampling distribution as n increases?", "It decreases."],
    ],
    body: R`
A **statistic** varies from sample to sample. Its **sampling distribution** describes that variation.

## Sample means

$$\mu_{\bar x} = \mu \qquad \sigma_{\bar x} = \frac{\sigma}{\sqrt n}$$

The shape is approximately normal if the population is normal or, by the **central limit theorem**, if $$n \ge 30$$.

Quadrupling the sample size halves the standard deviation of the sampling distribution.
`,
    note: ["Three distributions", "Keep them apart: the population distribution, the distribution of one sample's data, and the sampling distribution of a statistic."],
    ex: ["Using the CLT", "Bags of chips have mean weight 28.5 g with SD 1.2 g (shape unknown). For random samples of 36 bags, find the probability that the sample mean is under 28.2 g.", [R`$$\sigma_{\bar x} = 1.2/6 = 0.2$$; normal by the CLT (n = 36).`, R`$$z = (28.2 - 28.5)/0.2 = -1.5$$.`], "about 0.067."],
  },
];
