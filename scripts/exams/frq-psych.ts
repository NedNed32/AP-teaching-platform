/*
 * AP Psychology free response.
 * - Article Analysis Question (AAQ): one summarized study; six parts, 7 points.
 * - Evidence-Based Question (EBQ): three summarized sources; a claim, evidence and reasoning, 7 points.
 * All studies and sources are hypothetical and written for practice.
 */
import { cap } from "./psych-lib";
import { EXPERIMENTS, type Experiment } from "./psych-studies";
import type { FrqTemplate } from "./types";

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function article(e: Experiment): string {
  const people = e.kind === "animal" ? "animals" : e.kind === "child" ? "children" : "participants";
  const ethics = e.kind === "animal" ? "The plan was approved by a committee that reviews research with animals, and the animals were housed and treated humanely." : e.kind === "child" ? "Parents gave informed consent, each child gave assent, and the plan was approved by an institutional review board. Families could withdraw at any time." : "All participants gave informed consent, were told they could withdraw at any time, and were debriefed afterward. The plan was approved by an institutional review board.";
  return [
    `**Introduction.** Researchers investigated ${e.question}. They hypothesized that ${e.iv} would affect ${e.dv}.`,
    `**Participants.** The sample was ${e.who}, recruited from one city. ${ethics}`,
    `**Method.** The ${people} were randomly assigned to one of two conditions. ${e.aText} ${e.bText} The researchers recorded ${e.measure}.`,
    `**Results.** ${cap(e.aGroup)}: ${e.stat.toLowerCase()} = ${fmt(e.va)}. ${cap(e.bGroup)}: ${e.stat.toLowerCase()} = ${fmt(e.vb)}. The difference was statistically significant (p = 0.01).`,
  ].join("\n\n");
}

function aaq(unit: number): FrqTemplate {
  const studies = EXPERIMENTS.filter((e) => e.unit === unit);
  return {
    key: `frq-psych-aaq-u${unit}`,
    topics: studies.map((e) => e.topic),
    skills: ["2", "3", "4"],
    difficulty: 3,
    calc: false,
    format: "article-analysis",
    minutes: 25,
    gen(r) {
      const e = r.pick(studies);
      const ethic = e.kind === "animal" ? "Humane treatment of animals and approval by a review committee: the plan was approved and the animals were treated humanely." : e.kind === "child" ? "Informed consent and assent: parents consented and each child agreed to take part. (Also acceptable: approval by an institutional review board; the right to withdraw.)" : "Informed consent: participants agreed to take part after being told about the study. (Also acceptable: debriefing; the right to withdraw; approval by an institutional review board.)";
      return {
        title: `Article analysis: a study of ${e.dv}`,
        stimulus: { text: `Read the summary of a hypothetical study, then answer parts A to F.\n\n${article(e)}` },
        parts: [
          { prompt: "Identify the research method used in the study.", rubric: [{ criterion: "Identifies the method as an experiment.", example: "The study is an experiment: the researchers manipulated a variable and randomly assigned the subjects to conditions." }] },
          { prompt: `State the operational definition of ${e.dv}.`, rubric: [{ criterion: "States how the variable was measured in this study.", example: `${cap(e.dv)} was defined as ${e.measure}.` }] },
          { prompt: "Describe the meaning of the difference between the two group averages.", rubric: [{ criterion: "Accurately describes which group scored higher or lower and what that means for the variable measured.", example: `${e.result} On average, the value was ${fmt(e.va)} for ${e.aGroup} and ${fmt(e.vb)} for ${e.bGroup}, and a p value of 0.01 means a difference this large is unlikely to be due to chance.` }] },
          { prompt: "Identify at least one ethical guideline applied by the researchers.", rubric: [{ criterion: "Identifies an ethical guideline that the summary shows was followed.", example: ethic }] },
          { prompt: "Explain the extent to which the research findings may or may not be generalizable, using specific and relevant evidence from the study.", rubric: [{ criterion: "Explains a limit (or strength) of generalizability with reference to the sample.", example: `The sample was ${e.who} from one city, so the findings may not apply to people of other ages, cultures or backgrounds. Because the sample was not randomly selected from a wider population, it may not be representative.` }] },
          {
            prompt: "Explain how at least one of the research findings supports or refutes the researchers' hypothesis.",
            rubric: [
              { criterion: "Uses a specific finding from the study as evidence.", example: `${e.result} (${fmt(e.va)} compared with ${fmt(e.vb)}).` },
              { criterion: "Explains how the finding supports the hypothesis, using a psychological concept.", example: `This supports the hypothesis that ${e.iv} affects ${e.dv}. Because subjects were randomly assigned, the difference can be attributed to ${e.iv}. The finding illustrates ${e.concept}.` },
            ],
          },
        ],
      };
    },
  };
}

interface Ebq {
  id: string;
  topics: string[];
  question: string;
  sources: [string, string, string];
  claim: string;
  first: [string, string];
  second: [string, string];
}

const EBQS: Ebq[] = [
  {
    id: "sleep-memory",
    topics: ["sleep", "storing-memories"],
    question: "Does sleep improve memory?",
    sources: [
      "**Source A.** In an experiment, 60 students learned a list of word pairs at 9 p.m. Half were randomly assigned to sleep normally and half to stay awake all night. Twelve hours later, the sleep group recalled a mean of 31 pairs out of 40 and the awake group recalled a mean of 22 (p = 0.01).",
      "**Source B.** Researchers recorded the brain activity of 25 adults in a sleep laboratory after they had learned a maze. The more slow-wave (NREM stage 3) sleep a participant had, the faster that participant completed the maze the next morning (r = +0.55).",
      "**Source C.** A survey of 900 high school students found that those who reported sleeping fewer than six hours on school nights had lower average grades than those who slept eight hours or more. The researchers noted that students who slept less also reported more stress and more hours of paid work.",
    ],
    claim: "Sleep improves memory because memories are consolidated during sleep.",
    first: ["In Source A, students who slept recalled a mean of 31 of 40 word pairs, compared with 22 for students who stayed awake.", "This supports the claim through memory consolidation: during sleep, the hippocampus and cortex strengthen newly encoded memories, so the sleep group stored the word pairs better. Because the study was an experiment with random assignment, sleep can be said to have caused the difference."],
    second: ["In Source B, participants who had more slow-wave sleep completed the maze faster the next morning (r = +0.55).", "This supports the claim because NREM stage 3 sleep is linked to strengthening the neural connections formed during learning (long-term potentiation), so more deep sleep goes with better retention of the maze."],
  },
  {
    id: "rewards",
    topics: ["motivation", "operant-conditioning"],
    question: "Do rewards increase motivation?",
    sources: [
      "**Source A.** In an experiment, 60 preschool children who liked drawing were randomly assigned to draw for a promised certificate or to draw with no reward. A week later, during free play, the rewarded children chose to draw for a mean of 6.5 minutes and the unrewarded children for 13.8 minutes (p = 0.01).",
      "**Source B.** In a study of 200 call-center workers, half were randomly assigned to receive a bonus for each sale. Over a month, the bonus group made a mean of 41 sales and the comparison group a mean of 33 (p = 0.02). When the bonus ended, the bonus group's sales fell to a mean of 30.",
      "**Source C.** A survey of 500 university students found that students who said they studied mainly because they found their subject interesting had higher grades and reported less burnout than students who said they studied mainly for grades or money (r = +0.40 between interest and grades).",
    ],
    claim: "Rewards increase a behavior while they last, but they can reduce intrinsic motivation, so the behavior falls when the rewards stop.",
    first: ["In Source A, children promised a certificate later chose to draw for 6.5 minutes, compared with 13.8 minutes for children who were not rewarded.", "This supports the claim through intrinsic and extrinsic motivation: the reward gave the children an external reason for drawing, which weakened their desire to draw for its own sake."],
    second: ["In Source B, workers paid a bonus made more sales (41 compared with 33), but their sales fell to 30 when the bonus ended.", "This supports the claim through operant conditioning: the bonus acted as positive reinforcement, which increased the behavior, and when reinforcement stopped the behavior declined (extinction)."],
  },
  {
    id: "social-media",
    topics: ["selection-of-categories-of-psychological-disorders", "attribution-theory-and-person-perception"],
    question: "Does heavy social media use harm the well-being of teenagers?",
    sources: [
      "**Source A.** A survey of 1,200 teenagers found a correlation of r = +0.28 between hours of social media use per day and scores on a depression questionnaire. Teenagers who reported feeling lonely tended both to use social media more and to have higher depression scores.",
      "**Source B.** In an experiment, 140 university students were randomly assigned either to limit social media use to 30 minutes a day for three weeks or to continue as usual. At the end, the limited group had a mean loneliness score of 38 and the usual-use group a mean of 45 (p = 0.03).",
      "**Source C.** Researchers interviewed 40 teenagers about their experiences online. Many described feeling worse about themselves after viewing images of peers who seemed more attractive or popular; others described feeling supported by online friends who shared their interests.",
    ],
    claim: "Heavy social media use can harm teenagers' well-being, especially when it leads them to compare themselves with others.",
    first: ["In Source B, students who limited social media to 30 minutes a day had lower loneliness scores (38) than students who continued as usual (45).", "This supports the claim because the study was an experiment with random assignment, so reducing social media use can be said to have caused the lower loneliness. Less time online leaves more time for face-to-face contact, which supports well-being."],
    second: ["In Source C, many teenagers said they felt worse about themselves after viewing images of peers who seemed more attractive or popular.", "This supports the claim through upward social comparison and relative deprivation: comparing oneself with people who seem better off lowers self-esteem and satisfaction."],
  },
  {
    id: "study-methods",
    topics: ["encoding-memories", "retrieving-memories"],
    question: "Which study methods lead to the best long-term learning?",
    sources: [
      "**Source A.** In an experiment, 90 students were randomly assigned to study 40 vocabulary words either in six ten-minute sessions on different days or in one sixty-minute session. One month later, the spaced group recalled a mean of 27 words and the single-session group a mean of 16 (p = 0.01).",
      "**Source B.** In an experiment, 120 students read a passage and were randomly assigned either to take three practice quizzes or to reread the passage three times. On a test one week later, the quiz group scored a mean of 68 percent and the rereading group 49 percent (p = 0.01).",
      "**Source C.** In a survey of 600 students, 71 percent said that rereading notes was their main study method, and most rated it as highly effective. Only 12 percent said that they regularly tested themselves.",
    ],
    claim: "Spacing study sessions and testing oneself lead to better long-term learning than cramming or rereading.",
    first: ["In Source A, students who spread their study over six days recalled 27 of 40 words a month later, compared with 16 for students who studied in one session.", "This supports the claim through the spacing effect: distributed practice gives repeated chances to encode and consolidate the material, so it is retained longer than with massed practice."],
    second: ["In Source B, students who took practice quizzes scored 68 percent a week later, compared with 49 percent for students who reread the passage.", "This supports the claim through the testing effect: retrieving information from memory strengthens the memory and its retrieval cues more than rereading does."],
  },
  {
    id: "bystanders",
    topics: ["psychology-of-social-situations", "attitude-formation-and-attitude-change"],
    question: "Why do people sometimes fail to help in an emergency?",
    sources: [
      "**Source A.** In an experiment, 80 students were randomly assigned to be alone or with four other people when smoke began to enter the room. Participants who were alone reported the smoke after a mean of 58 seconds; those in groups took a mean of 196 seconds (p = 0.01), and many never reported it.",
      "**Source B.** In interviews after a staged emergency, participants who had not helped often said that they 'assumed someone else had already called for help' or that 'nobody else looked worried, so it could not be serious.'",
      "**Source C.** Researchers observed 300 staged incidents in which a person dropped a bag of shopping in the street. Help was offered in 82 percent of incidents on quiet streets and in 41 percent of incidents on crowded streets.",
    ],
    claim: "People are less likely to help when others are present, because each person feels less responsible and looks to others to decide how to act.",
    first: ["In Source A, participants who were alone reported smoke after 58 seconds, but those in groups of five took 196 seconds.", "This supports the claim through the bystander effect and diffusion of responsibility: when others are present, each person feels less personal responsibility to act."],
    second: ["In Source B, participants said that 'nobody else looked worried, so it could not be serious.'", "This supports the claim through informational social influence: in an unclear situation, people use the behavior of others as evidence of what is happening, so if nobody reacts, each person concludes there is no emergency."],
  },
  {
    id: "stress",
    topics: ["introduction-to-health-psychology", "positive-psychology"],
    question: "How does long-term stress affect health, and what reduces its effects?",
    sources: [
      "**Source A.** In a study of 350 adults, the number of stressful life events in the past year correlated with the number of colds in that year (r = +0.33). Adults who reported sleeping less tended to report both more stress and more colds.",
      "**Source B.** In an experiment, 84 office workers were randomly assigned to practice mindfulness meditation or to listen to an audiobook for twenty minutes a day. After eight weeks, the meditation group had a mean cortisol level of 9.8 nmol/L and the audiobook group 13.5 nmol/L (p = 0.02).",
      "**Source C.** Researchers followed 500 people for a year after a major flood. Those who reported strong support from family and friends had fewer symptoms of illness and depression than those who reported little support.",
    ],
    claim: "Long-term stress harms health, but coping strategies and social support reduce its effects.",
    first: ["In Source A, people with more stressful life events had more colds in the same year (r = +0.33).", "This supports the claim through the general adaptation syndrome: prolonged stress keeps the body in the resistance phase and eventually exhausts it, which suppresses the immune system and makes illness more likely."],
    second: ["In Source B, workers who practiced mindfulness meditation had lower cortisol levels (9.8) than workers who listened to an audiobook (13.5).", "This supports the claim through emotion-focused coping: meditation manages the emotional and physical reaction to stress, which lowers the body's stress-hormone response."],
  },
];

function ebq(e: Ebq): FrqTemplate {
  return {
    key: `frq-psych-ebq-${e.id}`,
    topics: e.topics,
    skills: ["4", "3"],
    difficulty: 3,
    calc: false,
    format: "evidence-based",
    minutes: 45,
    gen() {
      return {
        title: `Evidence-based question: ${e.question}`,
        stimulus: { text: `Use the three hypothetical sources to answer the question: **${e.question}**\n\n${e.sources.join("\n\n")}` },
        parts: [
          { prompt: "Propose a specific and defensible claim, based in psychological science, that responds to the question.", rubric: [{ criterion: "States a claim that answers the question and can be supported by the sources.", example: e.claim }] },
          {
            prompt: "(i) Support your claim using at least one piece of specific and relevant evidence from one of the sources. (ii) Explain how the evidence supports your claim, using a psychological perspective, theory, concept or research finding learned in AP Psychology.",
            rubric: [
              { criterion: "Uses specific, relevant evidence from one source and names the source.", example: e.first[0] },
              { criterion: "Explains how the evidence supports the claim.", example: e.first[1] },
              { criterion: "Correctly applies a psychological concept in the explanation.", example: "The concept must be named and applied correctly, as in the model explanation." },
            ],
          },
          {
            prompt: "(i) Support your claim using an additional piece of specific and relevant evidence from a different source. (ii) Explain how this evidence supports your claim, using a different psychological perspective, theory, concept or research finding.",
            rubric: [
              { criterion: "Uses specific, relevant evidence from a different source and names the source.", example: e.second[0] },
              { criterion: "Explains how the evidence supports the claim.", example: e.second[1] },
              { criterion: "Correctly applies a different psychological concept from the one used in part B.", example: "The concept must differ from the one used in part B and be applied correctly." },
            ],
          },
        ],
      };
    },
  };
}

export const psychAaq: FrqTemplate[] = [1, 2, 3, 4, 5].map(aaq);
export const psychEbq: FrqTemplate[] = EBQS.map(ebq);
