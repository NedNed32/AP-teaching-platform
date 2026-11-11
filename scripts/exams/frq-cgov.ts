/*
 * AP Comparative Government and Politics free response, in exam order:
 * Q1 Conceptual Analysis (10 min), Q2 Quantitative Analysis (20 min),
 * Q3 Comparative Analysis (20 min), Q4 Argument Essay (40 min).
 */
import { Retry, type FrqTemplate } from "./types";

type C = "China" | "Iran" | "Mexico" | "Nigeria" | "Russia" | "United Kingdom";

const CONCEPTS = [
  {
    name: "political legitimacy",
    def: "Citizens' belief that a government has the right to rule.",
    sustain: "Holding free and fair elections, delivering economic growth, or appealing to nationalism or religion.",
    threat: "Corruption scandals or economic decline can reduce trust, leading to protests or lower turnout.",
    effect: "Low legitimacy can push a regime to rely more on coercion, which is costly and can provoke further unrest.",
  },
  {
    name: "civil society",
    def: "Voluntary organizations outside the state, such as NGOs, religious groups and unions.",
    sustain: "Democracies protect freedom of association, letting groups form and lobby.",
    threat: "Authoritarian regimes restrict civil society with registration rules, 'foreign agent' labels or arrests.",
    effect: "A strong civil society can hold governments accountable and support democratization.",
  },
  {
    name: "judicial independence",
    def: "Courts' ability to rule without pressure from the executive, legislature or ruling party.",
    sustain: "Secure tenure for judges and appointment processes that limit political control.",
    threat: "Executives may pack courts, remove judges or ignore rulings.",
    effect: "Weak judicial independence undermines the rule of law and protection of civil liberties.",
  },
  {
    name: "devolution",
    def: "The transfer of powers from a central government to regional governments.",
    sustain: "Creating regional legislatures with authority over policies such as education or health.",
    threat: "Devolution can strengthen demands for full independence.",
    effect: "It can reduce conflict by giving distinct groups self-government, as with Scotland in the UK.",
  },
  {
    name: "rentier state",
    def: "A state that earns much of its revenue from natural resources rather than taxation.",
    sustain: "Using resource revenue to fund subsidies and public jobs that build support.",
    threat: "Falling world prices cut revenue and can force unpopular spending cuts.",
    effect: "Because the state relies less on taxes, citizens may have less leverage to demand accountability.",
  },
];

export const cgovQ1: FrqTemplate = {
  key: "frq-cgov-conceptual",
  topics: ["political-legitimacy", "civil-society", "independent-judiciaries", "change-in-power-and-authority", "impact-of-natural-resources"],
  skills: ["1"],
  difficulty: 2,
  calc: false,
  format: "conceptual-analysis",
  minutes: 10,
  gen(r) {
    const c = r.pick(CONCEPTS);
    return {
      title: `Conceptual analysis: ${c.name}`,
      stimulus: { text: `Answer parts A, B, C and D about ${c.name}.` },
      parts: [
        { prompt: `Define ${c.name}.`, rubric: [{ criterion: "An accurate definition.", example: c.def }] },
        { prompt: `Describe one way a government can strengthen or use ${c.name}.`, rubric: [{ criterion: "An accurate description.", example: c.sustain }] },
        { prompt: `Explain one way ${c.name} can be weakened or create challenges for a government.`, rubric: [{ criterion: "An accurate explanation.", example: c.threat }] },
        { prompt: `Explain how ${c.name} can affect political stability or accountability.`, rubric: [{ criterion: "A logical explanation linking the concept to stability or accountability.", example: c.effect }] },
      ],
    };
  },
};

export const cgovQ2: FrqTemplate = {
  key: "frq-cgov-quantitative",
  topics: ["forces-that-impact-political-participation", "electoral-systems-and-rules", "political-legitimacy"],
  skills: ["3", "1"],
  difficulty: 3,
  calc: false,
  format: "quantitative-analysis",
  minutes: 20,
  gen(r) {
    const years = [2007, 2011, 2015, 2019, 2023];
    const urban: number[] = [];
    const rural: number[] = [];
    let u = r.int(55, 70);
    let ru = r.int(60, 75);
    const ud = r.pick([-1, 1]);
    for (let i = 0; i < 5; i++) {
      urban.push(u);
      rural.push(ru);
      u += ud * r.int(1, 5);
      ru -= r.int(2, 6);
    }
    const last = 4;
    const higher = urban[last]! > rural[last]! ? "urban" : "rural";
    if (urban[last] === rural[last]) throw new Retry();
    return {
      title: "Voter turnout by region",
      stimulus: {
        text: "The table shows hypothetical turnout in national elections in a developing democracy, by urban and rural voters.",
        table: { caption: "Turnout (%)", columns: [{ key: "y", label: "Year" }, { key: "u", label: "Urban voters" }, { key: "r", label: "Rural voters" }], rows: years.map((y, i) => ({ y, u: urban[i]!, r: rural[i]! })) },
      },
      parts: [
        { prompt: "Using the data, identify the group with the higher turnout in 2023.", rubric: [{ criterion: "Correct identification with data.", example: `${higher === "urban" ? "Urban" : "Rural"} voters: ${higher === "urban" ? urban[last] : rural[last]}% vs ${higher === "urban" ? rural[last] : urban[last]}%.` }] },
        { prompt: "Describe the trend in rural turnout from 2007 to 2023.", rubric: [{ criterion: "Accurate trend with values.", example: `Rural turnout fell from ${rural[0]}% to ${rural[last]}%.` }] },
        { prompt: "Define political participation and describe one factor that could explain the trend in rural turnout.", rubric: [
          { criterion: "Definition.", example: "Actions citizens take to influence government, such as voting." },
          { criterion: "A plausible factor.", example: "Insecurity, distance to polling places, distrust in the fairness of elections, or migration of young people to cities." },
        ] },
        { prompt: "Draw a conclusion about how the trends could affect the legitimacy of elected governments, and explain your reasoning.", rubric: [{ criterion: "A conclusion supported by the data and reasoning.", example: "Falling participation among a large group can weaken the perceived legitimacy of winners, who are chosen by a smaller share of citizens." }] },
      ],
    };
  },
};

interface Comp {
  concept: string;
  def: string;
  info: Partial<Record<C, string>>;
  reason: string;
}
const COMPS: Comp[] = [
  {
    concept: "executive term limits",
    def: "Legal limits on how long or how many times a leader may hold office.",
    info: { Mexico: "The president serves a single six-year term with no re-election.", Nigeria: "The president may serve two four-year terms.", Russia: "2020 amendments reset the incumbent's terms, allowing longer rule.", China: "Presidential term limits were removed in 2018.", Iran: "The president may serve two consecutive four-year terms; the Supreme Leader has no term limit." },
    reason: "Democracies use term limits to prevent concentration of power; authoritarian leaders remove or bypass them to stay in power.",
  },
  {
    concept: "federalism",
    def: "A system that constitutionally divides power between national and regional governments.",
    info: { Mexico: "Federal, with 32 federal entities that have their own governments.", Nigeria: "Federal, with 36 states; debates over control of oil revenue.", Russia: "Formally federal, but power has been recentralized in Moscow.", "United Kingdom": "Unitary, but with devolved legislatures in Scotland, Wales and Northern Ireland.", China: "Unitary, with provinces subordinate to the center." },
    reason: "Large, diverse states often adopt federalism to manage regional and ethnic differences; authoritarian regimes may limit it to keep control.",
  },
  {
    concept: "electoral systems for the legislature",
    def: "The rules that translate votes into legislative seats.",
    info: { "United Kingdom": "Single-member-district plurality for the House of Commons.", Nigeria: "Single-member-district plurality for the House of Representatives.", Mexico: "Mixed: 300 district seats and 200 proportional seats in the Chamber of Deputies.", Russia: "Mixed: 225 district and 225 proportional Duma seats with a 5% threshold." },
    reason: "Countries choose rules to balance stable majorities with fair representation, or, in authoritarian systems, to advantage ruling parties.",
  },
  {
    concept: "restrictions on civil society",
    def: "Limits states place on independent organizations outside government.",
    info: { Russia: "'Foreign agent' and 'undesirable organization' laws restrict NGOs and media.", China: "Independent organizing is tightly limited; the state permits groups that serve its goals.", Iran: "Activists and organizations face arrest and surveillance, especially during protests.", "United Kingdom": "Civil society is largely free and independent.", Mexico: "Civil society is active but activists and journalists face violence." },
    reason: "Authoritarian regimes restrict civil society because independent groups can organize opposition; democracies protect freedom of association.",
  },
];

export const cgovQ3: FrqTemplate = {
  key: "frq-cgov-comparative",
  topics: ["executive-term-limits", "federal-and-unitary-systems", "electoral-systems-and-rules", "civil-society"],
  skills: ["2", "1"],
  difficulty: 3,
  calc: false,
  format: "comparative-analysis",
  minutes: 20,
  gen(r) {
    const c = r.pick(COMPS);
    const [a, b] = r.sample(Object.keys(c.info) as C[], 2) as [C, C];
    return {
      title: `Comparative analysis: ${c.concept}`,
      stimulus: { text: `Answer parts A, B and C, comparing ${a} and ${b}.` },
      parts: [
        { prompt: `Define ${c.concept}.`, rubric: [{ criterion: "Accurate definition.", example: c.def }] },
        { prompt: `Describe ${c.concept} in ${a} and in ${b}.`, rubric: [
          { criterion: `Accurate description for ${a}.`, example: c.info[a]! },
          { criterion: `Accurate description for ${b}.`, example: c.info[b]! },
        ] },
        { prompt: `Explain a reason for the difference (or similarity) between ${a} and ${b} with respect to ${c.concept}.`, rubric: [{ criterion: "A reason linked to regime type, history or political goals.", example: c.reason }] },
      ],
    };
  },
};

const ESSAYS = [
  {
    prompt: "Develop an argument as to whether federal or unitary systems are more effective at managing ethnic and regional diversity.",
    thesis: "Federal systems are more effective because they give distinct groups self-government, reducing pressure on the central state.",
    ev: ["Nigeria uses federalism and the federal character principle to share power among its many ethnic groups.", "The UK, though unitary, used devolution to Scotland and Wales to accommodate national identities, showing the value of shared power.", "China's unitary approach in Xinjiang relies on coercion rather than accommodation."],
    alt: "Critics argue federalism can entrench divisions and fuel separatism; but without it, groups may turn to more radical demands.",
  },
  {
    prompt: "Develop an argument as to whether elections in authoritarian regimes strengthen or weaken those regimes.",
    thesis: "Controlled elections strengthen authoritarian regimes by providing a claim to legitimacy and information about public opinion.",
    ev: ["Russia holds regular elections dominated by United Russia, which the regime uses to claim popular support.", "Iran's Guardian Council vets candidates, keeping elections within limits set by the regime."],
    alt: "Elections can also create focal points for protest, as with disputed results that sparked mass demonstrations; yet regimes usually survive by managing candidates and media.",
  },
  {
    prompt: "Develop an argument as to whether economic liberalization promotes democratization.",
    thesis: "Economic liberalization does not necessarily promote democratization; regimes can liberalize markets while keeping political control.",
    ev: ["China's market reforms since 1978 produced rapid growth while the CCP maintained one-party rule.", "Mexico's economic opening in the 1980s and 1990s coincided with growing political competition and the PRI's 2000 defeat."],
    alt: "Some argue a growing middle class demands rights, as in Mexico; but China shows performance legitimacy can sustain authoritarian rule.",
  },
];

export const cgovQ4: FrqTemplate = {
  key: "frq-cgov-argument",
  topics: ["federal-and-unitary-systems", "democratization", "policies-and-economic-liberalization", "challenges-from-political-and-social-cleavages"],
  skills: ["5", "2"],
  difficulty: 4,
  calc: false,
  format: "argument-essay",
  minutes: 40,
  gen(r) {
    const e = r.pick(ESSAYS);
    return {
      title: "Argument essay",
      stimulus: { text: `${e.prompt}\n\nIn your response, you should do the following: respond with a defensible claim or thesis that establishes a line of reasoning; support your claim with at least two pieces of specific and relevant evidence from one or more course countries; use reasoning to explain why your evidence supports your claim; and respond to an opposing or alternative perspective using refutation, concession or rebuttal.` },
      parts: [
        { prompt: "Write your essay.", rubric: [
          { criterion: "Thesis: a defensible claim that establishes a line of reasoning (1 point).", example: e.thesis },
          { criterion: "Evidence: two pieces of specific, relevant evidence from course countries (up to 2 points).", example: e.ev.join(" ") },
          { criterion: "Reasoning: explains why the evidence supports the claim (1 point).", example: "Connects each example back to the thesis rather than just describing it." },
          { criterion: "Alternative perspective: responds with refutation, concession or rebuttal (1 point).", example: e.alt },
        ] },
      ],
    };
  },
};
