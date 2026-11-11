/* AP Statistics (revised 2026-27), Unit 1: Exploring One-Variable Data and Collecting Data. */
const R = String.raw;
export const lessons = [
  {
    id: "introducing-statistics-what-can-we-learn-from-data",
    obj: ["Describe the statistical investigation process and write an investigative question."],
    terms: [
      ["Statistical investigative process", "Formulate a question, collect data, analyze data, interpret results."],
      ["Investigative question", "A question that can be answered with data and anticipates variability."],
    ],
    checks: [
      ["Is 'How tall am I?' a statistical question?", "No; it has one answer with no variability."],
      ["What are the four steps of a statistical investigation?", "Formulate a question, collect data, analyze data, interpret results."],
    ],
    body: R`
Statistics is the science of learning from data in the presence of **variability**.

## The investigative process

1. **Formulate** an investigative question.
2. **Collect** data appropriate to the question.
3. **Analyze** the data with graphs and statistics.
4. **Interpret** the results in context.

A good investigative question names the **population** of interest and the **variable(s)**, and can be answered with data that vary: "What is the typical number of hours of sleep that students at our school get on school nights?"

These four steps match the four AP Statistics practices.
`,
    note: ["Context matters", "Every answer in AP Statistics should be in the context of the problem: name the variable, the units and the population."],
    ex: ["Improve a question", "Rewrite 'Do teens use phones?' as an investigative question.", ["Name the population and the variable.", "Make the answer depend on data that vary."], "\"What is the typical daily screen time, in hours, for students at our high school?\""],
  },
  {
    id: "variables",
    obj: ["Classify variables as categorical or quantitative, and quantitative variables as discrete or continuous."],
    terms: [
      ["Categorical variable", "A variable whose values are labels or categories."],
      ["Quantitative variable", "A variable whose values are numbers for which arithmetic makes sense."],
    ],
    checks: [
      ["Is a zip code categorical or quantitative?", "Categorical: averaging zip codes makes no sense."],
      ["Is height discrete or continuous?", "Continuous."],
    ],
    body: R`
| Type | Values | Examples |
| --- | --- | --- |
| categorical | labels | eye color, favorite sport, zip code |
| quantitative, discrete | countable numbers | number of siblings |
| quantitative, continuous | any value in an interval | height, time |

The type of variable decides which graphs and statistics are appropriate. Each **individual** (observational unit) in a data set has a value for each variable.
`,
    note: ["Numbers are not always quantitative", "Jersey numbers and phone numbers are labels, so they are categorical."],
    ex: ["Classify", "A survey records each student's grade level (9–12), number of AP classes and preferred lunch option. Classify each variable.", ["Grade level is a number but is often treated as a category; number of AP classes is a count; lunch option is a label."], "grade level: categorical (or discrete); AP classes: quantitative discrete; lunch option: categorical."],
  },
  {
    id: "tabular-representation-and-summary-statistics-for-one-categorical-variable",
    obj: ["Summarize one categorical variable with frequency and relative frequency tables."],
    terms: [["Relative frequency", "The proportion of observations in a category: count divided by total."]],
    checks: [
      ["In a sample of 80, 24 prefer basketball. What is the relative frequency?", "0.30, or 30%."],
      ["What must relative frequencies add to?", "1 (or 100%), up to rounding."],
    ],
    body: R`
A **frequency table** lists the count in each category; a **relative frequency table** lists proportions.

| Favorite sport | Frequency | Relative frequency |
| --- | --- | --- |
| soccer | 30 | 0.375 |
| basketball | 24 | 0.300 |
| other | 26 | 0.325 |
| total | 80 | 1.000 |

The proportion in a category, $$\hat p$$, is a summary statistic for a categorical variable. The **mode** is the most common category.
`,
    note: ["Compare with proportions", "When groups have different sizes, compare relative frequencies, not counts."],
    ex: ["Relative frequency", "Of 250 surveyed voters, 95 support a measure. Find the proportion.", [R`$$95/250 = 0.38$$.`], "0.38 (38%)."],
  },
  {
    id: "graphical-representations-for-one-categorical-variable",
    obj: ["Construct and interpret bar charts and pie charts."],
    terms: [["Bar chart", "A graph with one bar per category, its height showing frequency or relative frequency."]],
    checks: [
      ["Why must a pie chart's slices represent parts of one whole?", "The slices' areas must add to 100% of the same total."],
      ["Do the bars in a bar chart touch?", "No; gaps separate the categories."],
    ],
    body: R`
- **Bar charts** show each category's count or proportion; bars are separated, and categories can be in any order.
- **Pie charts** show parts of a whole; each slice's area is the category's relative frequency.

When describing a categorical distribution, compare the frequencies of categories: which is most and least common, and by how much.

Watch for misleading graphs: axes that do not start at zero, unequal widths or 3-D effects can exaggerate differences.
`,
    note: ["Bar chart or histogram?", "Bar charts display categorical data. Histograms display quantitative data, and their bars touch because the number line is continuous."],
    ex: ["Spot the problem", "A bar chart's vertical axis starts at 40%, making a 45% bar look three times taller than a 42% bar. What is misleading?", ["Truncating the axis exaggerates differences."], "the axis does not start at 0, so the difference looks much larger than 3 percentage points."],
  },
  {
    id: "graphical-representations-for-one-quantitative-variable",
    obj: ["Construct and interpret dotplots, stemplots and histograms."],
    terms: [
      ["Histogram", "Adjacent bars over equal-width intervals showing counts or proportions of a quantitative variable."],
      ["Stemplot", "A display that splits each value into a stem and a leaf, keeping the original data."],
    ],
    checks: [
      ["Which display keeps the individual data values?", "Dotplots and stemplots."],
      ["What does the height of a histogram bar show?", "The number (or proportion) of values in that interval."],
    ],
    body: R`
| Display | Best for |
| --- | --- |
| dotplot | small data sets; each value is a dot |
| stemplot | small to moderate data; keeps values |
| histogram | larger data sets; groups values into bins |
| cumulative relative frequency plot | percentiles |

Choice of bin width changes a histogram's appearance; too few bins hide detail, too many show noise.
`,
    note: ["Label everything", "Graphs need a title, labeled axes with units, and a key for stemplots (for example, 3 | 4 means 34)."],
    ex: ["Read a stemplot", "A stemplot has a key 4 | 2 = 42 and the row 5 | 0 3 3 8. List the values in that row.", ["Stem 5 with leaves 0, 3, 3, 8."], "50, 53, 53 and 58."],
  },
  {
    id: "descriptions-for-one-quantitative-variable-distributions",
    obj: ["Describe the shape, center, variability and unusual features of a quantitative distribution."],
    terms: [
      ["Skewed right", "A distribution with a long tail toward larger values."],
      ["Outlier", "A value that falls far from the rest of the data."],
    ],
    checks: [
      ["What four features describe a quantitative distribution?", "Shape, center, variability (spread) and unusual features (outliers, gaps, clusters)."],
      ["Income distributions are usually skewed which way?", "Right."],
    ],
    body: R`
Describe a distribution with **SOCS**, in context:

- **Shape**: symmetric, skewed left or right; unimodal, bimodal, uniform.
- **Outliers** and other unusual features: gaps, clusters.
- **Center**: a typical value (median or mean).
- **Spread** (variability): range, IQR or standard deviation.

Skew is named for the tail: a long right tail means **skewed right**.
`,
    note: ["Compare, do not just list", "When comparing distributions, use comparison words: greater than, similar to, less variable."],
    ex: ["Describe", "Commute times for 40 workers have a long tail to the right, a median of 18 minutes, an IQR of 12 minutes and one value of 95 minutes. Describe the distribution.", ["Shape: skewed right.", "Center and spread: median 18 min, IQR 12 min.", "Unusual: possible outlier at 95 min."], "commute times are skewed right with a median of 18 minutes and IQR of 12 minutes, with a possible outlier at 95 minutes."],
  },
  {
    id: "summary-statistics-for-one-quantitative-variable",
    obj: ["Calculate and interpret the mean, median, standard deviation, quartiles and IQR, and identify outliers."],
    terms: [
      ["Resistant statistic", "A statistic not strongly affected by outliers, such as the median and IQR."],
      ["1.5 × IQR rule", "A value is an outlier if it is below Q1 − 1.5·IQR or above Q3 + 1.5·IQR."],
    ],
    checks: [
      ["Which is resistant, the mean or the median?", "The median."],
      ["Q1 = 20 and Q3 = 32. Is 52 an outlier?", "Yes: the upper fence is 32 + 1.5(12) = 50."],
    ],
    body: R`
$$\bar x = \frac{\sum x_i}{n} \qquad s = \sqrt{\frac{\sum (x_i - \bar x)^2}{n - 1}}$$

- **Median**: the middle value of the ordered data.
- **Quartiles** Q1 and Q3: medians of the lower and upper halves; **IQR = Q3 − Q1**.
- **Outliers** (1.5 × IQR rule): below Q1 − 1.5·IQR or above Q3 + 1.5·IQR.

In a skewed distribution the mean is pulled toward the tail: skewed right means the mean is greater than the median.

**Interpret** the standard deviation: "the typical distance of the values from the mean is about s units."
`,
    note: ["Choose the right summary", "For skewed data or data with outliers, report the median and IQR. For roughly symmetric data, the mean and standard deviation are appropriate."],
    ex: ["Fences", "Data: Q1 = 14, Q3 = 26. Find the outlier fences.", [R`IQR = 12; 1.5 × 12 = 18.`, R`Lower: 14 − 18 = −4. Upper: 26 + 18 = 44.`], "values below −4 or above 44 are outliers."],
  },
  {
    id: "graphical-representations-of-summary-statistics-for-one-quantitative-variable",
    obj: ["Construct and interpret boxplots from the five-number summary."],
    terms: [["Five-number summary", "Minimum, Q1, median, Q3, maximum."]],
    checks: [
      ["What fraction of the data lies between Q1 and Q3?", "About half (the middle 50%)."],
      ["Can you see the shape of a bimodal distribution in a boxplot?", "No; boxplots hide modes and gaps."],
    ],
    body: R`
A **boxplot** draws the five-number summary: a box from Q1 to Q3 with a line at the median, and whiskers to the most extreme values that are not outliers. Outliers are plotted individually.

- Each section (whisker to Q1, Q1 to median, median to Q3, Q3 to whisker) contains about 25% of the data.
- A longer right whisker and box section suggest right skew.
- Boxplots are excellent for **comparing** groups side by side, but they hide details such as clusters and gaps.
`,
    note: ["Whiskers stop at non-outliers", "With an outlier, the whisker ends at the largest value that is not an outlier, not at the fence."],
    ex: ["Read a boxplot", "A boxplot shows min 3, Q1 8, median 11, Q3 20, max 29. Estimate the percentage of values above 11 and describe the shape.", ["Half the values are above the median.", "The upper half is more spread out."], "about 50%; the distribution is skewed right."],
  },
  {
    id: "comparisons-of-the-distributions-for-one-quantitative-variable",
    obj: ["Compare two or more distributions of a quantitative variable using graphs and statistics."],
    terms: [["Parallel (side-by-side) boxplots", "Boxplots drawn on the same scale to compare groups."]],
    checks: [
      ["What four features should a comparison address?", "Shape, center, variability and unusual features, using comparison words."],
      ["Why must comparison graphs share a scale?", "Otherwise differences in center and spread are misleading."],
    ],
    body: R`
To compare distributions:

1. Use the **same scale** (back-to-back stemplots, parallel boxplots, stacked dotplots or histograms).
2. Compare **shape**, **center**, **variability** and **outliers**, in context.
3. Use comparative language: "The median reaction time for the caffeine group (220 ms) is greater than for the placebo group (198 ms)."
`,
    note: ["Explicit comparisons", "Listing each group's statistics separately is not a comparison. Say which is greater, and by about how much."],
    ex: ["Compare", "Group A: median 42, IQR 10, symmetric. Group B: median 35, IQR 18, skewed right. Write a comparison.", ["Center: A greater.", "Spread: B more variable.", "Shape: A symmetric, B skewed right."], "Group A has a greater median (42 vs 35) and less variability (IQR 10 vs 18); A is roughly symmetric while B is skewed right."],
  },
  {
    id: "the-investigative-question-revisited-and-data-collection",
    obj: ["Distinguish observational studies from experiments, and populations from samples, and decide what conclusions a study supports."],
    terms: [
      ["Observational study", "Observes individuals and measures variables without imposing treatments."],
      ["Experiment", "Deliberately imposes treatments on experimental units to measure their responses."],
      ["Confounding variable", "A variable related to both the explanatory and response variables that makes it impossible to separate their effects."],
    ],
    checks: [
      ["Which type of study can show cause and effect?", "A well-designed randomized experiment."],
      ["When can results be generalized to a population?", "When the sample was randomly selected from that population."],
    ],
    body: R`
| Study | Treatments imposed? | Can show causation? |
| --- | --- | --- |
| sample survey | no | no |
| observational study | no | no (confounding possible) |
| experiment | yes, randomly assigned | yes |

## Scope of inference

| | Random assignment | No random assignment |
| --- | --- | --- |
| random selection | causation; generalize to population | association; generalize |
| no random selection | causation for the units studied | association for the units studied |

**Random selection** allows generalization; **random assignment** allows cause-and-effect conclusions.
`,
    note: ["Association is not causation", "An observational study can show that two variables are associated, but a confounding variable may explain the link."],
    ex: ["Classify", "Researchers compare test scores of students who chose to take an online prep course with those who did not. Can they conclude the course causes higher scores?", ["Students chose for themselves: observational.", "Motivated students may both take the course and score higher (confounding)."], "no; it is an observational study, so motivation could confound the results."],
  },
  {
    id: "random-sampling",
    obj: ["Describe and compare simple random, stratified, cluster and systematic sampling."],
    terms: [
      ["Simple random sample (SRS)", "Every group of n individuals has an equal chance of being selected."],
      ["Stratified random sample", "An SRS taken within each of several groups (strata) of similar individuals."],
      ["Cluster sample", "A random selection of groups (clusters), using every individual in the chosen clusters."],
    ],
    checks: [
      ["When does stratifying give better estimates than an SRS?", "When individuals within strata are similar to each other but strata differ."],
      ["Why are cluster samples used?", "They are convenient and cheaper, especially when clusters are geographically compact."],
    ],
    body: R`
| Method | How |
| --- | --- |
| simple random sample | number everyone, use a random generator |
| stratified | divide into similar groups; SRS from each |
| cluster | divide into groups; randomly pick whole groups |
| systematic | random start, then every kth individual |

**Strata** should be internally similar (homogeneous) and different from each other. **Clusters** should each look like the population (heterogeneous).

To describe an SRS: label individuals 1 to N, use a random number generator to pick n different labels, ignoring repeats, and select those individuals.
`,
    note: ["Why random?", "Random selection avoids bias from the person choosing and allows the results to be generalized to the population."],
    ex: ["Choose a method", "A school wants opinions from each grade level (9–12), expecting grades to differ. Which method fits?", ["Grades are groups of similar students that may differ from each other."], "a stratified random sample by grade."],
  },
  {
    id: "potential-problems-with-sampling",
    obj: ["Identify sources of bias in sampling and surveys."],
    terms: [
      ["Bias", "A systematic tendency to overestimate or underestimate the true value."],
      ["Undercoverage", "Some members of the population have less chance of being in the sample."],
      ["Response bias", "A pattern of inaccurate answers, often from question wording or the interviewer."],
    ],
    checks: [
      ["Does a larger sample fix bias?", "No; it only reduces variability."],
      ["Why are voluntary response samples biased?", "People with strong opinions are more likely to respond."],
    ],
    body: R`
| Problem | Description |
| --- | --- |
| convenience sample | choosing easy-to-reach individuals |
| voluntary response | people choose to respond; strong opinions overrepresented |
| undercoverage | parts of the population left out of the sampling frame |
| nonresponse | selected individuals cannot be reached or refuse |
| response bias | wording, lying, interviewer effects |

When describing bias, state the **direction**: whether the estimate is likely too high or too low, and why.
`,
    note: ["Bias versus variability", "Bias is about being off target on average; variability is about how much estimates scatter. Bigger samples reduce variability, not bias."],
    ex: ["Direction of bias", "A gym surveys members at 6 a.m. about how often they exercise. What bias is likely?", ["Early-morning gym-goers probably exercise more than typical members."], "undercoverage/convenience sampling that likely overestimates how often members exercise."],
  },
  {
    id: "experimental-design",
    obj: ["Design experiments with control, random assignment, replication and blocking."],
    terms: [
      ["Random assignment", "Using a chance process to assign experimental units to treatments."],
      ["Blocking", "Grouping similar units and randomly assigning treatments within each block."],
      ["Double-blind", "Neither the subjects nor those measuring responses know who received which treatment."],
    ],
    checks: [
      ["Why use a placebo?", "To account for the placebo effect, so differences can be attributed to the treatment."],
      ["What is the purpose of blocking?", "To reduce variability caused by a known variable, making treatment effects easier to detect."],
    ],
    body: R`
## Principles

1. **Comparison** of two or more treatments (including a control or placebo).
2. **Random assignment** to create roughly equivalent groups.
3. **Replication**: enough units in each treatment.
4. **Control** of other variables.

## Designs

- **Completely randomized**: all units randomly assigned to treatments.
- **Randomized block**: randomize within blocks of similar units (for example, by age group).
- **Matched pairs**: pairs of similar units, or each unit gets both treatments in random order.

A difference is **statistically significant** if it is too large to plausibly be explained by the chance variation of random assignment.
`,
    note: ["Describe the random assignment", "Say how: for example, put 40 names on slips, shuffle, draw 20 for treatment A; the rest get treatment B."],
    ex: ["Block or not?", "A fertilizer experiment uses plots on both sunny and shady sides of a field. How should treatments be assigned?", ["Sunlight affects growth.", "Block by sunlight, then randomly assign fertilizers within each block."], "a randomized block design, blocking by sun or shade."],
  },
];
