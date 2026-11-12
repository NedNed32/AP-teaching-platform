/*
 * AP Psychology multiple choice.
 * - Concept questions come from term groups (psych-terms-u1..u5).
 * - Research-methods and data questions are built from hypothetical studies (psych-studies).
 * - A few statistics questions are computed.
 */
import type { Rng } from "./lib";
import { cap, g, groupTemplates, type Group } from "./psych-lib";
import { CORRELATIONS, EXPERIMENTS, type Correlation, type Experiment } from "./psych-studies";
import { psychU1 } from "./psych-terms-u1";
import { psychU2 } from "./psych-terms-u2";
import { psychU3 } from "./psych-terms-u3";
import { psychU4 } from "./psych-terms-u4";
import { psychU5 } from "./psych-terms-u5";
import { Retry, correct, wrong, type Choice, type McqDraft, type McqTemplate, type StimulusDraft } from "./types";

type Q = (r: Rng) => McqDraft;
const q = (stimulus: StimulusDraft, stem: string, right: [string, string], wrongs: [string, string][]): McqDraft => ({
  stimulus,
  stem,
  correct: correct(right[0], right[1]),
  wrong: wrongs.map(([t, w]): Choice => wrong(t, w)),
  explanation: right[1],
});

export const describe = (e: Experiment) =>
  `Researchers investigated ${e.question}. They recruited ${e.who} and randomly assigned each one to one of two conditions. ${e.aText} ${e.bText} The researchers then recorded ${e.measure}.`;

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function resultsTable(e: Experiment, significant: boolean): StimulusDraft {
  const a = significant ? e.va : Math.round((e.vb + (e.va - e.vb) * 0.08) * 10) / 10;
  return {
    text: `${describe(e)} The results are shown in the table. The difference between the two groups had a p value of ${significant ? "0.01" : "0.41"}.`,
    table: {
      caption: "Results of the study",
      columns: [
        { key: "group", label: "Group" },
        { key: "value", label: e.stat },
      ],
      rows: [
        { group: cap(e.aGroup), value: fmt(a) },
        { group: cap(e.bGroup), value: fmt(e.vb) },
      ],
    },
  };
}

function experimentQuestions(e: Experiment): Q[] {
  const s: StimulusDraft = { text: describe(e) };
  const subj = e.kind === "animal" ? "the animals" : e.kind === "child" ? "the children" : "the participants";
  const out: Q[] = [
    () => q(s, "What is the independent variable in this study?", [cap(e.iv), "The independent variable is the factor the researchers changed between the two conditions."], [[cap(e.dv), "This was measured, not manipulated: it is the dependent variable."], [`The number of ${e.kind === "animal" ? "animals" : "participants"} in the study`, "This is the sample size, not a variable the researchers changed."], ["Random assignment", "This is a procedure for forming the groups, not a variable."]]),
    () => q(s, "What is the dependent variable in this study?", [cap(e.dv), "The dependent variable is the outcome that the researchers measured."], [[cap(e.iv), "This was manipulated by the researchers: it is the independent variable."], ["The condition to which each one was assigned", "This describes the independent variable."], ["The hypothesis", "A hypothesis is a prediction, not a variable."]]),
    () => q(s, "Which of the following is the operational definition of the dependent variable?", [cap(e.measure), "An operational definition states exactly how a variable is measured."], [[cap(e.dv), "This names the variable but does not say how it was measured."], [cap(e.iv), "This is the independent variable."], ["The random assignment of each one to a condition", "This is a control procedure, not a definition of a variable."]]),
    () => q(s, `Why did the researchers assign ${subj} to the two conditions at random?`, ["So that the two groups would be similar at the start, and any difference could be attributed to the independent variable", "Random assignment spreads individual differences evenly across the conditions."], [["So that the results could be generalized to the whole population", "That is the purpose of random sampling, not random assignment."], ["So that nobody would know the hypothesis", "That describes a blind procedure."], ["So that the study would have more participants", "Random assignment does not change the sample size."]]),
    () => q(s, "Which group served as the control group?", [cap(e.bGroup), "The control group is the comparison group that does not receive the treatment being tested."], [[cap(e.aGroup), "This group received the treatment being tested: it is the experimental group."], ["Both groups", "Only the comparison group is the control group."], ["Neither group, because the study had no comparison condition", "The second condition is the comparison."]]),
    () => q(s, "Which of the following would be a confounding variable in this study?", [e.confound, "It differs between the groups along with the independent variable, so it could explain the results instead."], [[`One group differed from the other in ${e.iv}`, "That is the independent variable itself."], [`The two groups differed in ${e.dv} at the end of the study`, "That is the dependent variable, the result being measured."], ["Each one was assigned to a condition at random", "Random assignment reduces confounding; it is not a confound."]]),
    () => q(s, `${e.result} The difference was statistically significant. Which conclusion is justified?`, [`${cap(e.iv)} caused the difference in ${e.dv}`, "With random assignment and a manipulated variable, an experiment supports a conclusion about cause and effect."], [[`${cap(e.iv)} and ${e.dv} are related, but no cause can be inferred`, "That limit applies to correlational studies; this was an experiment."], ["The same result would be found in every group of people or animals", "The sample limits how far the result can be generalized."], ["The hypothesis has been proved, so the study need not be repeated", "Findings must be replicated; one study does not prove a hypothesis."]]),
    () => q(resultsTable(e, true), "Which statement about the results is best supported?", ["The difference between the groups is statistically significant, so it is unlikely to be due to chance", "A p value below 0.05 means a difference this large would rarely occur by chance alone."], [["The difference between the groups is probably due to chance", "A p value of 0.01 is below 0.05, so chance is an unlikely explanation."], ["The two groups had the same average result", "The table shows different averages."], ["The results prove that every individual in the first group differed from every individual in the second", "The table reports group averages, not individual scores."]]),
    () => q(resultsTable(e, false), "Which statement about the results is best supported?", ["The difference between the groups is not statistically significant, so it could easily be due to chance", "A p value above 0.05 means a difference this size would often occur by chance alone."], [["The difference between the groups is statistically significant", "A p value of 0.41 is far above 0.05."], ["The independent variable had a large effect", "The averages are close and the difference is not significant."], ["The study shows that the two conditions always give identical results", "A non-significant result does not show that there is no effect at all."]]),
    () => q(s, `All of the subjects in this study were drawn from one group: ${e.who}. What does this most limit?`, ["How far the findings can be generalized to other populations", "A sample that does not represent the wider population limits generalizability."], [["Whether a cause-and-effect conclusion can be drawn", "Random assignment, not the sample, allows the causal conclusion."], ["Whether the dependent variable was operationally defined", "The measure was clearly defined."], ["Whether the study had a control group", "The study had a comparison condition."]]),
    () => q(s, "Another research team repeats this study with new subjects and obtains the same result. What is this called?", ["Replication", "Replication is repeating a study to see whether the finding holds."], [["Random assignment", "That is how subjects are placed in conditions."], ["A case study", "That is an in-depth study of one individual."], ["Debriefing", "That is explaining the study to participants afterward."]]),
  ];
  if (e.kind === "adult") {
    out.push(
      () => q(s, "Before taking part, each participant was told what the study would involve and what the risks were, and then agreed to take part. Which ethical guideline does this meet?", ["Informed consent", "Participants must agree to take part after being told what the study involves."], [["Debriefing", "Debriefing happens after the study."], ["Confidentiality", "Confidentiality is keeping participants' data private."], ["Random assignment", "That is a research procedure, not an ethical guideline."]]),
      () => q(s, "After the study, the researchers explained its full purpose to every participant and answered their questions. What is this called?", ["Debriefing", "Debriefing explains the study, including any deception, once it is over."], [["Informed consent", "Consent is obtained before the study."], ["Replication", "Replication is repeating a study."], ["A placebo", "A placebo is an inactive treatment."]]),
      () => q(s, "Neither the participants nor the assistants who recorded the results knew which condition each participant was in. What is this procedure called?", ["A double-blind procedure", "Keeping both participants and researchers unaware of the conditions reduces bias from expectations."], [["A single-blind procedure", "In a single-blind procedure only the participants are unaware."], ["Random sampling", "Random sampling is how participants are chosen from a population."], ["Counterconditioning", "That is a therapy technique, not a research control."]]),
    );
  } else if (e.kind === "child") {
    out.push(
      () => q(s, "As well as obtaining permission from the parents, the researchers asked each child whether he or she was willing to take part. What is the child's agreement called?", ["Informed assent", "Minors cannot give legal consent, so they give assent and their parents give consent."], [["Debriefing", "Debriefing happens after the study."], ["Confidentiality", "Confidentiality is keeping data private."], ["Deception", "Deception is misleading participants about the study."]]),
      () => q(s, "Before the study could begin, a committee at the university reviewed the plan to make sure the children would be protected from harm. What is this committee called?", ["An institutional review board", "An institutional review board must approve research with human participants."], [["A control group", "That is a comparison condition."], ["A focus group", "That is a discussion group used to collect opinions."], ["A confederate", "A confederate is someone who secretly works for the researcher."]]),
    );
  } else {
    out.push(() => q(s, "Which ethical requirement applies to this study?", ["The animals must be treated humanely, and the plan must be approved by a committee that reviews animal research", "Research with animals requires humane care and approval by a review committee."], [["Each animal must give informed consent", "Animals cannot give consent."], ["The animals must be debriefed after the study", "Debriefing applies to human participants."], ["No ethical rules apply to research with animals", "Animal research is governed by ethical guidelines."]]));
  }
  return out;
}

const describeCorr = (c: Correlation) => `Researchers collected data from ${c.who}. For each one, they recorded ${c.x} and ${c.y}. The correlation between the two measures was r = ${c.r > 0 ? "+" : "−"}${Math.abs(c.r).toFixed(2)}.`;

function correlationQuestions(c: Correlation): Q[] {
  const s: StimulusDraft = { text: describeCorr(c) };
  const up = c.r > 0;
  const stronger = up ? -(Math.abs(c.r) + 0.2) : Math.abs(c.r) + 0.2;
  const sv = `${stronger > 0 ? "+" : "−"}${Math.abs(stronger).toFixed(2)}`;
  return [
    () => q(s, "What does the correlation show?", [`Higher values of the first measure tend to go with ${up ? "higher" : "lower"} values of the second`, `A ${up ? "positive" : "negative"} correlation means the two measures tend to move in ${up ? "the same direction" : "opposite directions"}.`], [[`Higher values of the first measure tend to go with ${up ? "lower" : "higher"} values of the second`, `That would be a ${up ? "negative" : "positive"} correlation.`], ["The two measures are unrelated", "A correlation of zero would show no relationship."], ["The first measure causes the second", "A correlation does not show cause and effect."]]),
    () => q(s, `Can the researchers conclude that ${c.x} causes a change in ${c.y}?`, ["No, because a correlation does not show cause and effect", "Without manipulating a variable and assigning subjects at random, other explanations cannot be ruled out."], [["Yes, because the correlation is not zero", "Any nonzero correlation still leaves the cause unknown."], ["Yes, because the sample was large", "A large sample does not turn a correlation into evidence of causation."], ["No, because correlations can only be calculated in experiments", "Correlations are calculated in non-experimental studies."]]),
    () => q(s, "Which of the following is a possible third variable that could explain the correlation?", [cap(c.third), "A third variable could influence both measures and so produce the correlation."], [[cap(c.x), "This is one of the two variables that were measured."], [cap(c.y), "This is one of the two variables that were measured."], ["The correlation coefficient", "This is the statistic, not a variable."]]),
    () => q(s, "Which statement describes the directionality problem in this study?", [`It is unclear whether the first measure influences the second or the second influences the first`, "A correlation cannot show which variable, if either, comes first."], [["It is unclear whether the correlation is positive or negative", "The sign of r shows the direction of the relationship."], ["It is unclear how many people took part", "The sample size is stated."], ["It is unclear whether the two measures were recorded", "Both measures were recorded."]]),
    () => q(s, "Which research method did the researchers use?", ["A correlational study", "The researchers measured two variables and examined their relationship without manipulating anything."], [["An experiment", "No variable was manipulated and there was no random assignment."], ["A case study", "A case study examines one individual in depth."], ["A meta-analysis", "A meta-analysis combines the results of many studies."]]),
    () => q(s, "Why is this study not an experiment?", ["The researchers did not manipulate a variable or randomly assign anyone to conditions", "An experiment requires a manipulated independent variable and random assignment."], [["The researchers used numbers", "Experiments also use numerical data."], ["The sample was too large", "Sample size does not determine the research method."], ["The researchers stated a hypothesis", "Experiments also test hypotheses."]]),
    () => q(s, `A second study of a different pair of measures finds r = ${sv}. Which relationship is stronger?`, ["The relationship in the second study, because its coefficient is farther from zero", "The strength of a correlation is its distance from zero, whatever the sign."], [["The relationship in the first study, because its coefficient is closer to zero", "A coefficient closer to zero shows a weaker relationship."], [`The relationship with the ${up ? "positive" : "negative"} sign, whatever its size`, "The sign shows direction, not strength."], ["Neither, because relationships with different signs cannot be compared", "Strength can be compared by distance from zero."]]),
    () => q(s, "If the data were shown on a scatterplot, what pattern would the points form?", [`A loose band that slopes ${up ? "upward" : "downward"} from left to right`, `A moderate ${up ? "positive" : "negative"} correlation appears as a band of points sloping ${up ? "upward" : "downward"}.`], [[`A loose band that slopes ${up ? "downward" : "upward"} from left to right`, `That would show a ${up ? "negative" : "positive"} correlation.`], ["A perfectly straight line", "Only a correlation of +1.00 or −1.00 gives a perfect line."], ["A shapeless cloud with no slope", "That would show a correlation near zero."]]),
  ];
}

const studyTemplate = (key: string, unit: number, topic: string, skill: string, questions: Q[]): McqTemplate => ({
  key,
  unit,
  topics: [topic],
  skills: [skill],
  difficulty: 2,
  calc: false,
  gen: (r) => r.pick(questions)(r),
});

// ---------------------------------------------------------------------------
// Computed statistics questions
// ---------------------------------------------------------------------------

const centralTendency: McqTemplate = {
  key: "psy-stats-central",
  unit: 2,
  topics: ["intelligence-and-achievement"],
  skills: ["3"],
  difficulty: 2,
  calc: false,
  gen(r) {
    const base = r.int(4, 9);
    const mode = base + r.int(1, 3);
    const scores = [base - r.int(1, 3), base, mode, mode, mode + r.int(1, 2), mode + r.int(3, 4), mode + r.int(8, 14)].sort((a, b) => a - b);
    const sum = scores.reduce((a, b) => a + b, 0);
    if (sum % 7 !== 0) throw new Retry();
    const mean = sum / 7;
    const median = scores[3]!;
    const range = scores[6]! - scores[0]!;
    if (new Set([mean, median, range, scores[6]]).size < 4) throw new Retry();
    const what = r.pick(["mean", "median", "mode", "range"] as const);
    const value = { mean, median, mode, range }[what];
    const why = { mean: `Add the scores (${sum}) and divide by 7.`, median: "Put the scores in order and take the middle one, the fourth of seven.", mode: "The mode is the score that occurs most often.", range: "Subtract the lowest score from the highest." }[what];
    const others = [...new Set([mean, median, mode, range, scores[6]!, scores[0]!])].filter((v) => v !== value).slice(0, 3);
    if (others.length < 3) throw new Retry();
    const label = (v: number) => (v === mean ? "That is the mean." : v === median ? "That is the median." : v === mode ? "That is the mode." : v === range ? "That is the range." : v === scores[6] ? "That is the highest score." : "That is the lowest score.");
    return {
      stem: `Seven students took a memory test. Their scores were ${r.shuffle(scores).join(", ")}. What is the ${what} of the scores?`,
      correct: correct(String(value), why),
      wrong: others.map((v) => wrong(String(v), label(v))),
      explanation: `In order, the scores are ${scores.join(", ")}. ${why} The one very high score pulls the mean (${mean}) above the median (${median}), so the distribution is positively skewed.`,
      ordered: true,
    };
  },
};

const normalCurve: McqTemplate = {
  key: "psy-stats-normal",
  unit: 2,
  topics: ["intelligence-and-achievement"],
  skills: ["3"],
  difficulty: 3,
  calc: false,
  gen(r) {
    const sd = r.pick([10, 15, 20]);
    const mean = r.pick([100, 500, 70]);
    const cases: [string, string, string][] = [
      [`between ${mean - sd} and ${mean + sd}`, "68%", "About 68% of scores fall within one standard deviation of the mean."],
      [`between ${mean - 2 * sd} and ${mean + 2 * sd}`, "95%", "About 95% of scores fall within two standard deviations of the mean."],
      [`above ${mean}`, "50%", "A normal distribution is symmetrical, so half the scores lie above the mean."],
      [`above ${mean + sd}`, "16%", "68% lie within one standard deviation, leaving 32% outside, half of which (16%) is above."],
      [`above ${mean + 2 * sd}`, "2.5%", "95% lie within two standard deviations, leaving 5% outside, half of which (2.5%) is above."],
      [`below ${mean - sd}`, "16%", "68% lie within one standard deviation, leaving 32% outside, half of which (16%) is below."],
    ];
    const [range, answer, why] = r.pick(cases);
    const all = ["2.5%", "16%", "34%", "50%", "68%", "95%"].filter((p) => p !== answer);
    return {
      stem: `Scores on a test are normally distributed with a mean of ${mean} and a standard deviation of ${sd}. About what percentage of scores are ${range}?`,
      correct: correct(answer, why),
      wrong: r.sample(all, 3).map((p) => wrong(p, "This does not match the 68–95 rule for a normal distribution.")),
      explanation: `${why} (${mean - sd} and ${mean + sd} are one standard deviation from the mean; ${mean - 2 * sd} and ${mean + 2 * sd} are two.)`,
      ordered: true,
    };
  },
};

const strongestCorrelation: McqTemplate = {
  key: "psy-stats-strongest-r",
  unit: 3,
  topics: ["themes-and-methods-in-developmental-psychology"],
  skills: ["3"],
  difficulty: 2,
  calc: false,
  gen(r) {
    const mags = r.sample([5, 12, 20, 28, 35, 44, 52, 61, 70, 78, 86, 93], 4).sort((a, b) => b - a);
    const signs = [-1, r.sign(), r.sign(), 1];
    const vals = mags.map((m, i) => (signs[i]! * m) / 100);
    const show = (v: number) => `${v > 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}`;
    const weakest = r.next() < 0.4;
    const pick = weakest ? vals[3]! : vals[0]!;
    return {
      stem: `Four studies of child development report these correlation coefficients: ${r.shuffle(vals).map(show).join(", ")}. Which coefficient shows the ${weakest ? "weakest" : "strongest"} relationship?`,
      correct: correct(show(pick), `Strength is the distance from zero, whatever the sign; ${show(pick)} is ${weakest ? "closest to" : "farthest from"} zero.`),
      wrong: vals.filter((v) => v !== pick).map((v) => wrong(show(v), `${show(v)} is ${Math.abs(v) > Math.abs(pick) ? "farther from" : "closer to"} zero.`)),
      explanation: `The sign of a correlation shows its direction; its distance from zero shows its strength. ${show(pick)} is ${weakest ? "closest to" : "farthest from"} zero.`,
    };
  },
};

// ---------------------------------------------------------------------------
// Research-methods vocabulary, taught in every unit
// ---------------------------------------------------------------------------

const researchGroups: Record<number, Group[]> = {
  1: [
    g("research-designs", "interaction-of-heredity-and-environment", [
      ["an experiment", "the research method in which a researcher manipulates a variable and randomly assigns participants, which allows conclusions about cause and effect", "A researcher gives one randomly chosen group a vitamin and another group a sugar pill, then compares their memory scores. Which research method is this?"],
      ["a correlational study", "the research method that measures two variables to see how they are related, without manipulating either", "A researcher records how many hours of sleep 200 students get and their test scores, then checks whether the two are related. Which research method is this?"],
      ["naturalistic observation", "the research method of watching and recording behavior in its natural setting without interfering", "A researcher sits quietly in a playground and records how often children share toys. Which research method is this?"],
      ["a survey", "the research method of collecting self-reported attitudes or behaviors from a sample by asking questions", "A researcher sends a questionnaire about sleep habits to 2,000 adults. Which research method is this?"],
      ["a hypothesis", "a testable prediction about the relationship between variables", "Before collecting any data, a researcher writes, 'Students who sleep eight hours will score higher than students who sleep five.' This statement is which of the following?"],
      ["an operational definition", "a statement of exactly how a variable is measured or manipulated in a study", "A researcher states that 'aggression' will mean the number of times a child pushes another child in ten minutes. This statement is which of the following?"],
      ["replication", "the repeating of a study with different participants to see whether the finding holds", "A second laboratory repeats a famous memory study with new participants to check the result. This is an example of which of the following?"],
      ["falsifiability", "the quality of a claim that it could be shown to be wrong by evidence", "A scientific hypothesis must be stated so that some possible observation could show it to be false. What is this requirement called?"],
    ]),
  ],
  2: [
    g("statistics", "intelligence-and-achievement", [
      ["the mean", "the arithmetic average of a set of scores", "A teacher adds up all the test scores and divides by the number of students. Which statistic has she calculated?"],
      ["the median", "the middle score when the scores are placed in order", "Because a few very high incomes distort the average, a report gives the income that falls exactly in the middle of the list. Which statistic is this?"],
      ["the mode", "the score that occurs most often", "On a quiz, more students scored 8 than any other score. The score of 8 is which statistic?"],
      ["the range", "the difference between the highest and lowest scores", "The highest score on a test is 98 and the lowest is 41, giving a value of 57. Which statistic is this?"],
      ["the standard deviation", "the measure of how much scores vary around the mean", "Two classes have the same average score, but in one class the scores are tightly bunched and in the other they are widely spread. Which statistic would show this difference?"],
      ["the normal curve", "the symmetrical, bell-shaped distribution in which most scores fall near the mean", "When the intelligence scores of a large population are graphed, they form a symmetrical bell shape. What is this shape called?"],
      ["a positive skew", "a distribution with a few extremely high scores, which pull the mean above the median", "In a town where most people earn modest incomes and a few earn millions, the mean income is far above the median. Which shape does the distribution have?"],
      ["a negative skew", "a distribution with a few extremely low scores, which pull the mean below the median", "On a very easy test, most students score near 100 but a few score very low, so the mean is below the median. Which shape does the distribution have?"],
      ["a percentile rank", "the percentage of scores in a distribution that fall at or below a given score", "Lena is told that she scored as well as or better than 90 percent of the students who took a test. Which statistic is this?"],
    ]),
  ],
  3: [
    g("sampling", "themes-and-methods-in-developmental-psychology", [
      ["random sampling", "the selecting of participants so that every member of the population has an equal chance of being chosen", "To choose 500 students for a survey, a researcher uses a computer to pick names from the list of all students in the country. Which procedure is this?"],
      ["random assignment", "the placing of participants in experimental conditions by chance", "A researcher flips a coin to decide whether each volunteer goes into the treatment group or the control group. Which procedure is this?"],
      ["a representative sample", "a sample whose characteristics match those of the population it is drawn from", "A survey's sample has the same proportions of ages, incomes and regions as the whole country. Which term describes this sample?"],
      ["a convenience sample", "a sample made up of whoever is easiest for the researcher to reach", "A professor studies memory by testing only the students in her own class. Which kind of sample is this?"],
      ["sampling bias", "a flaw in selecting participants that makes the sample unlike the population", "A poll about internet use is carried out only online, so people without internet access cannot take part. Which problem is this?"],
      ["generalizability", "the extent to which the findings of a study apply to people beyond the sample", "A study tested only male university students, so critics doubt that its findings apply to older adults or to women. Which quality of the study are they questioning?"],
    ]),
    g("correlation", "themes-and-methods-in-developmental-psychology", [
      ["a positive correlation", "a relationship in which two variables rise and fall together", "The more hours children spend reading, the larger their vocabularies tend to be. Which kind of relationship is this?"],
      ["a negative correlation", "a relationship in which one variable rises as the other falls", "The more hours children spend watching television, the lower their grades tend to be. Which kind of relationship is this?"],
      ["the correlation coefficient", "the number from −1.00 to +1.00 that shows the direction and strength of a relationship", "A researcher reports that two variables are related, with r = +0.62. What is this number called?"],
      ["a scatterplot", "a graph in which each point shows one individual's values on two variables", "A graph shows a dot for each child, placed according to the child's age and vocabulary size. Which kind of graph is this?"],
      ["the directionality problem", "the difficulty in a correlational study of knowing which variable influences the other", "Children with high self-esteem get better grades, but researchers cannot tell whether self-esteem raises grades or grades raise self-esteem. Which problem is this?"],
      ["the third variable problem", "the possibility that an unmeasured factor causes the relationship between two correlated variables", "Ice cream sales and drownings rise together, but both are caused by hot weather. Which problem does this illustrate?"],
    ]),
  ],
  4: [
    g("research-ethics", "psychology-of-social-situations", [
      ["informed consent", "the agreement of participants to take part after they have been told what a study involves", "Before a study begins, each adult volunteer reads a description of the procedures and risks and signs a form agreeing to take part. Which ethical requirement is this?"],
      ["informed assent", "the agreement of a minor to take part in a study, given in addition to a parent's consent", "A nine-year-old is asked whether she is willing to take part in a study after her parents have given permission. What is her agreement called?"],
      ["debriefing", "the explaining of a study's purpose, and any deception, to participants after it ends", "After a study in which participants were misled about its purpose, the researcher explains what was really being studied. Which ethical requirement is this?"],
      ["confidentiality", "the keeping private of participants' identities and data", "A researcher stores survey answers under code numbers so that no answer can be linked to a name. Which ethical requirement is this?"],
      ["deception", "the misleading of participants about the true purpose of a study, allowed only when necessary and followed by debriefing", "Participants are told a study is about memory when it is really about obedience. Which research practice is this?"],
      ["a confederate", "a person who seems to be a participant but is secretly working for the researcher", "In a conformity study, six of the seven people at the table are actors who give wrong answers on purpose. Each actor is which of the following?"],
      ["protection from harm", "the requirement that researchers keep the physical and psychological risks to participants as low as possible", "A committee refuses to approve a study that would cause participants severe distress. Which ethical requirement is the committee enforcing?"],
      ["an institutional review board", "the committee that reviews research plans to make sure participants are treated ethically", "Before collecting any data, a researcher must have her plan approved by a university committee that checks its ethics. What is this committee called?"],
    ]),
    g("research-biases", "attitude-formation-and-attitude-change", [
      ["social desirability bias", "the tendency of participants to answer in a way that makes them look good", "In a survey, people report donating to charity far more often than records show. Which bias best explains this?"],
      ["self-report bias", "the inaccuracy that arises when people describe their own behavior or feelings", "Asked how many hours they slept last week, people give estimates that differ widely from what their sleep trackers recorded. Which bias is this?"],
      ["experimenter bias", "the influence of a researcher's expectations on the results of a study", "A researcher who expects a drug to work smiles more at the patients who receive it and rates their improvement more generously. Which bias is this?"],
      ["hindsight bias", "the tendency, after learning an outcome, to believe one would have predicted it", "After the election result is announced, Tom says, 'I knew all along that she would win,' although he had predicted the opposite. Which bias is this?"],
      ["overconfidence", "the tendency to be more certain than correct about one's own judgments", "Students are 90 percent sure of answers that turn out to be right only 60 percent of the time. Which tendency is this?"],
    ]),
  ],
  5: [
    g("experiment-terms", "treatment-of-psychological-disorders", [
      ["the experimental group", "the group in an experiment that receives the treatment being tested", "In a drug trial, half of the patients receive the new medication. This half is which of the following?"],
      ["the control group", "the group in an experiment that does not receive the treatment and is used for comparison", "In a drug trial, half of the patients receive no active medication so that their results can be compared with the others. This half is which of the following?"],
      ["a placebo", "an inactive substance or treatment that looks like the real one", "In a drug trial, some patients receive a sugar pill that looks exactly like the real medication. The sugar pill is which of the following?"],
      ["the placebo effect", "an improvement that results from a person's expectation of a treatment rather than from the treatment itself", "Patients given a sugar pill report less pain simply because they believe they have taken a painkiller. This best illustrates which of the following?"],
      ["a single-blind procedure", "a procedure in which the participants do not know which condition they are in", "In a drug trial, the patients do not know whether they are receiving the drug or a sugar pill, but the doctors do. Which procedure is this?"],
      ["a double-blind procedure", "a procedure in which neither the participants nor the researchers who deal with them know who is in which condition", "In a drug trial, neither the patients nor the doctors who assess them know who is receiving the drug. Which procedure is this?"],
      ["a confounding variable", "a factor other than the independent variable that differs between groups and could explain the results", "In a therapy study, the treated group also happened to exercise more than the untreated group, so exercise might explain their improvement. Exercise is which of the following?"],
      ["statistical significance", "the conclusion that a result is unlikely to have occurred by chance, usually when p is below 0.05", "A researcher reports that the difference between two groups would occur by chance less than 5 times in 100. Which term describes this result?"],
      ["effect size", "the measure of how large the difference or relationship found in a study is", "A new therapy produces a statistically significant improvement, but the improvement is tiny. Which statistic shows how large the improvement is?"],
    ]),
  ],
};

const conceptGroups: Record<number, Group[]> = { 1: psychU1, 2: psychU2, 3: psychU3, 4: psychU4, 5: psychU5 };
const computed: Record<number, McqTemplate[]> = { 2: [centralTendency, normalCurve], 3: [strongestCorrelation] };

/** Every multiple-choice template for one unit. */
export function psychUnit(unit: number): McqTemplate[] {
  return [
    ...groupTemplates(unit, conceptGroups[unit]!),
    ...groupTemplates(unit, researchGroups[unit]!).map((t) => ({ ...t, skills: ["2"] })),
    ...EXPERIMENTS.filter((e) => e.unit === unit).map((e) => studyTemplate(`psy-exp-${e.id}`, unit, e.topic, "2", experimentQuestions(e))),
    ...CORRELATIONS.filter((c) => c.unit === unit).map((c) => studyTemplate(`psy-corr-${c.id}`, unit, c.topic, "3", correlationQuestions(c))),
    ...(computed[unit] ?? []),
  ];
}
