/*
 * AP Comparative Government and Politics multiple choice.
 * - Country comparisons are generated from a fact table of the six course countries.
 * - Data-analysis sets use clearly hypothetical countries, so no real statistics are invented.
 * - Concept questions come from written pools.
 */
import { options } from "./csa-lib";
import type { Rng } from "./lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({ key, unit, topics, skills, difficulty, calc: false, gen });

export type Country = "China" | "Iran" | "Mexico" | "Nigeria" | "Russia" | "United Kingdom";
export const COUNTRIES: Country[] = ["China", "Iran", "Mexico", "Nigeria", "Russia", "United Kingdom"];

/** Each fact: a description and the course countries it is true of. */
interface Fact {
  unit: number;
  topics: string[];
  text: string;
  yes: Country[];
  why: string;
}
export const FACTS: Fact[] = [
  { unit: 1, topics: ["federal-and-unitary-systems"], text: "has a federal system", yes: ["Mexico", "Nigeria", "Russia"], why: "Mexico, Nigeria and Russia are federal; the UK, China and Iran are unitary." },
  { unit: 1, topics: ["federal-and-unitary-systems"], text: "is a unitary state that has devolved power to regional legislatures", yes: ["United Kingdom"], why: "The UK devolved power to Scotland, Wales and Northern Ireland but remains unitary." },
  { unit: 1, topics: ["sources-of-power-and-authority"], text: "has an uncodified constitution", yes: ["United Kingdom"], why: "The UK constitution is not contained in a single document." },
  { unit: 1, topics: ["sources-of-power-and-authority", "democracy-vs-authoritarianism"], text: "is a theocratic republic in which a cleric holds the highest authority", yes: ["Iran"], why: "Iran's Supreme Leader, a senior cleric, is the highest authority." },
  { unit: 1, topics: ["democracy-vs-authoritarianism"], text: "is a one-party state in which the ruling party's leadership is written into the constitution", yes: ["China"], why: "China's constitution affirms the leadership of the Chinese Communist Party." },
  { unit: 1, topics: ["democratization"], text: "returned to civilian rule in 1999 after decades of military governments", yes: ["Nigeria"], why: "Nigeria's Fourth Republic began in 1999." },
  { unit: 1, topics: ["democratization"], text: "saw a dominant party lose the presidency in 2000 after more than 70 years in power", yes: ["Mexico"], why: "The PRI lost the presidency in 2000." },
  { unit: 1, topics: ["democracy-vs-authoritarianism"], text: "is generally classified as a consolidated liberal democracy", yes: ["United Kingdom"], why: "Among the course countries, only the UK is a consolidated liberal democracy." },
  { unit: 2, topics: ["parliamentary-presidential-and-semi-presidential-systems"], text: "has a parliamentary system in which the executive is drawn from the legislature", yes: ["United Kingdom"], why: "The UK prime minister and cabinet come from Parliament." },
  { unit: 2, topics: ["parliamentary-presidential-and-semi-presidential-systems"], text: "has a semi-presidential system with both a president and a prime minister", yes: ["Russia"], why: "Russia's president appoints a prime minister, with Duma approval." },
  { unit: 2, topics: ["parliamentary-presidential-and-semi-presidential-systems"], text: "has a presidential system in which the president is both head of state and head of government", yes: ["Mexico", "Nigeria"], why: "Mexico and Nigeria have presidential systems." },
  { unit: 2, topics: ["executive-term-limits"], text: "limits its president to a single six-year term", yes: ["Mexico"], why: "Mexico's president serves one six-year term (sexenio)." },
  { unit: 2, topics: ["executive-term-limits"], text: "removed presidential term limits in 2018", yes: ["China"], why: "China's 2018 constitutional amendment removed the two-term limit." },
  { unit: 2, topics: ["executive-term-limits"], text: "amended its constitution in 2020 in a way that reset the incumbent president's previous terms", yes: ["Russia"], why: "Russia's 2020 amendments reset the count for the incumbent." },
  { unit: 2, topics: ["executive-term-limits", "executive-systems"], text: "limits its president to a lifetime maximum of two four-year terms", yes: ["Nigeria"], why: "Nigeria's president may serve two four-year terms." },
  { unit: 2, topics: ["legislative-systems"], text: "has a unicameral national legislature", yes: ["China", "Iran"], why: "China's NPC and Iran's Majles are unicameral." },
  { unit: 2, topics: ["legislative-systems", "independent-legislatures"], text: "has an unelected council that can veto legislation and disqualify candidates", yes: ["Iran"], why: "Iran's Guardian Council vets laws and candidates." },
  { unit: 2, topics: ["legislative-systems"], text: "has an upper house whose members are appointed, hereditary or bishops rather than elected", yes: ["United Kingdom"], why: "The House of Lords is not elected." },
  { unit: 2, topics: ["judicial-systems", "independent-judiciaries"], text: "adopted a reform in 2024 to have judges, including Supreme Court justices, chosen by popular election", yes: ["Mexico"], why: "Mexico's 2024 judicial reform introduced popular election of judges." },
  { unit: 2, topics: ["judicial-systems"], text: "has courts that cannot strike down acts of the national legislature, because of legislative sovereignty", yes: ["United Kingdom"], why: "Parliamentary sovereignty means UK courts cannot overturn Acts of Parliament." },
  { unit: 2, topics: ["executive-systems", "removal-of-executives"], text: "has its highest leader chosen and formally overseen by an elected assembly of clerics", yes: ["Iran"], why: "Iran's Assembly of Experts chooses the Supreme Leader." },
  { unit: 3, topics: ["civil-society", "civil-rights-and-civil-liberties"], text: "requires many NGOs and media receiving foreign support to register as 'foreign agents'", yes: ["Russia"], why: "Russia's foreign agent laws restrict civil society." },
  { unit: 3, topics: ["political-and-social-cleavages", "challenges-from-political-and-social-cleavages"], text: "has major overlapping ethnic, religious and regional cleavages between a mainly Muslim north and a mainly Christian south", yes: ["Nigeria"], why: "Nigeria's north–south cleavage combines religion, ethnicity and region." },
  { unit: 3, topics: ["challenges-from-political-and-social-cleavages"], text: "has a constitutional 'federal character' principle requiring appointments to reflect national diversity", yes: ["Nigeria"], why: "Nigeria's federal character principle aims to balance groups." },
  { unit: 3, topics: ["political-and-social-cleavages"], text: "faced a 2014 independence referendum in one of its constituent nations", yes: ["United Kingdom"], why: "Scotland voted on independence in 2014." },
  { unit: 4, topics: ["electoral-systems-and-rules"], text: "elects its lower house entirely by single-member-district plurality", yes: ["United Kingdom", "Nigeria"], why: "The UK Commons and Nigeria's House of Representatives use first past the post." },
  { unit: 4, topics: ["electoral-systems-and-rules"], text: "uses a mixed electoral system for its lower house, combining district seats and proportional seats", yes: ["Mexico", "Russia"], why: "Mexico (300 SMD + 200 PR) and Russia (225 + 225) use mixed systems." },
  { unit: 4, topics: ["electoral-systems-and-rules", "objectives-of-election-rules"], text: "requires a winning presidential candidate to receive at least 25% of the vote in two-thirds of its states", yes: ["Nigeria"], why: "Nigeria's rule encourages broad, cross-regional support." },
  { unit: 4, topics: ["political-party-systems"], text: "has a dominant ruling party alongside 'systemic' opposition parties that rarely challenge the regime", yes: ["Russia"], why: "United Russia dominates; other Duma parties generally support the regime." },
  { unit: 4, topics: ["political-party-systems"], text: "has no formal party system, with politics organized around factions such as reformists and principlists", yes: ["Iran"], why: "Iran's politics are factional rather than party-based." },
  { unit: 4, topics: ["pluralist-and-corporatist-interests"], text: "uses a nomenklatura system in which the ruling party controls key appointments", yes: ["China"], why: "The CCP controls appointments through the nomenklatura system." },
  { unit: 5, topics: ["international-and-supranational-organizations"], text: "left the European Union in 2020", yes: ["United Kingdom"], why: "Brexit took effect in 2020." },
  { unit: 5, topics: ["international-and-supranational-organizations", "political-responses-to-global-market-forces"], text: "is a member of a free trade agreement with the United States and Canada (USMCA)", yes: ["Mexico"], why: "Mexico joined NAFTA in 1994, replaced by USMCA in 2020." },
  { unit: 5, topics: ["policies-and-economic-liberalization"], text: "began gradual market reforms in 1978 while keeping one-party rule", yes: ["China"], why: "China's reform era began in 1978." },
  { unit: 5, topics: ["impact-of-natural-resources"], text: "relies heavily on oil exports and has experienced conflict over oil revenues in its Delta region", yes: ["Nigeria"], why: "Nigeria's Niger Delta has seen conflict over oil." },
  { unit: 5, topics: ["adaptation-of-social-policies", "causes-and-effects-of-demographic-change"], text: "replaced a one-child policy with policies encouraging more births", yes: ["China"], why: "China moved to two-child (2016) and three-child (2021) policies." },
  { unit: 5, topics: ["policies-and-economic-liberalization"], text: "rapidly privatized state industries in the 1990s, creating powerful oligarchs", yes: ["Russia"], why: "Russia's 1990s privatization concentrated wealth among insiders." },
];

function factQuestion(r: Rng, unit: number) {
  const facts = FACTS.filter((f) => f.unit === unit);
  const fact = r.pick(facts);
  const right = r.pick(fact.yes);
  const wrongs = r.sample(COUNTRIES.filter((c) => !fact.yes.includes(c)), 3);
  if (wrongs.length < 3) throw new Retry();
  return {
    stem: `Which of the following course countries ${fact.text}?`,
    ...options([right, fact.why], wrongs.map((c) => [c, fact.why] as [string, string])),
    explanation: fact.why,
  };
}
const factTpl = (unit: number) => t(`cg-facts-u${unit}`, unit, [...new Set(FACTS.filter((f) => f.unit === unit).flatMap((f) => f.topics))], ["2"], 2, (r) => factQuestion(r, unit));

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

const HYP = ["Country A", "Country B", "Country C", "Country D"];

/* ---------------- Data analysis sets (hypothetical data) ---------------- */
const seatsVotes = t("cg-seats-votes", 4, ["electoral-systems-and-rules", "objectives-of-election-rules"], ["3"], 3, (r) => {
  const parties = ["Party W", "Party X", "Party Y", "Party Z"];
  const raw = [r.int(30, 45), r.int(25, 38), r.int(10, 20), r.int(5, 12)];
  const tot = raw.reduce((a, b) => a + b, 0);
  const votes = raw.map((v) => Math.round((v / tot) * 100));
  votes[0] = 100 - votes.slice(1).reduce((a, b) => a + b, 0);
  const smd = r.next() < 0.5;
  const seats = smd ? [r.int(55, 65), 0, 0, 0] : votes.map((v) => v);
  if (smd) {
    seats[1] = r.int(25, 35);
    seats[3] = r.pick([0, 1, 2]);
    seats[2] = 100 - seats[0]! - seats[1]! - seats[3]!;
    if (seats[2]! < 0) throw new Retry();
  }
  const gaps = parties.map((_, i) => seats[i]! - votes[i]!);
  const most = gaps.indexOf(Math.max(...gaps));
  const q = r.pick(["system", "benefit"]);
  const stimulus = { text: "The table shows hypothetical national election results in a legislature of 100 seats.", table: { caption: "Vote share and seat share (%)", columns: [{ key: "p", label: "Party" }, { key: "v", label: "Votes (%)" }, { key: "s", label: "Seats (%)" }], rows: parties.map((p, i) => ({ p, v: votes[i]!, s: seats[i]! })) } };
  if (q === "system") {
    return {
      stimulus,
      stem: "Which electoral system most likely produced these results?",
      ...options([smd ? "Single-member-district plurality" : "Proportional representation", smd ? "The largest party's seat share far exceeds its vote share, while smaller parties are underrepresented." : "Each party's seat share closely matches its vote share."], [[smd ? "Proportional representation" : "Single-member-district plurality", smd ? "PR would make seat shares close to vote shares." : "SMD usually gives the largest party a seat bonus."], ["A system with no elections", "These are election results."], ["A system in which seats are distributed equally among parties", "Seat shares are not equal."]]),
      explanation: smd ? `Party W won ${votes[0]}% of votes but ${seats[0]}% of seats: typical of SMD plurality.` : "Seat shares mirror vote shares, as in PR.",
    };
  }
  return {
    stimulus,
    stem: "Based on the data, which party benefited most from the electoral system?",
    ...options([parties[most]!, `It has the largest positive gap between seat share and vote share (${gaps[most]! > 0 ? "+" : ""}${gaps[most]} points).`], parties.filter((_, i) => i !== most).map((p) => [p, `Compare seats with votes for each party.`] as [string, string]).slice(0, 3)),
    explanation: `Seat minus vote share: ${parties.map((p, i) => `${p} ${gaps[i]! > 0 ? "+" : ""}${gaps[i]}`).join(", ")}.`,
  };
});

const turnout = t("cg-turnout-trend", 3, ["forces-that-impact-political-participation", "nature-and-role-of-political-participation"], ["3"], 2, (r) => {
  const years = [2008, 2012, 2016, 2020, 2024];
  const dir = r.pick(["down", "up"]);
  let v = dir === "down" ? r.int(65, 80) : r.int(40, 55);
  const vals = years.map(() => {
    const cur = v;
    v += dir === "down" ? -r.int(2, 8) : r.int(2, 8);
    return cur;
  });
  const name = r.pick(HYP);
  return {
    stimulus: { text: `The table shows voter turnout in national elections in ${name}, a hypothetical country.`, table: { caption: `Turnout in ${name}`, columns: [{ key: "y", label: "Election year" }, { key: "t", label: "Turnout (%)" }], rows: years.map((y, i) => ({ y, t: vals[i]! })) } },
    stem: "Which conclusion is best supported by the data?",
    ...options([dir === "down" ? `Turnout declined steadily, which may indicate falling trust or interest in elections in ${name}` : `Turnout rose steadily, which may indicate growing engagement or confidence in elections in ${name}`, `Turnout went from ${vals[0]}% to ${vals[4]}%.`], [[dir === "down" ? `Turnout rose steadily, showing growing confidence in elections` : `Turnout declined steadily, showing falling trust`, "Read the direction of the trend."], [`Turnout proves that ${name}'s elections are free and fair`, "Turnout alone cannot show whether elections are free and fair."], [`Turnout was stable across all elections`, `It changed by ${Math.abs(vals[4]! - vals[0]!)} points.`]]),
    explanation: `From ${vals[0]}% (2008) to ${vals[4]}% (2024): a ${dir === "down" ? "downward" : "upward"} trend.`,
  };
});

const development = t("cg-development-indicators", 5, ["impact-of-industrialization-and-economic-development"], ["3"], 3, (r) => {
  const rows = HYP.map((c) => ({ c, g: r.int(2, 45) * 1000, h: r.int(45, 93) / 100, gini: r.int(25, 55) / 100 }));
  const ask = r.pick(["gini", "hdi", "mismatch"]);
  const maxGini = rows.reduce((a, b) => (b.gini > a.gini ? b : a));
  const maxH = rows.reduce((a, b) => (b.h > a.h ? b : a));
  if (rows.filter((x) => x.gini === maxGini.gini).length > 1 || rows.filter((x) => x.h === maxH.h).length > 1) throw new Retry();
  const stimulus = { text: "The table shows hypothetical development indicators.", table: { caption: "Development indicators", columns: [{ key: "c", label: "Country" }, { key: "g", label: "GDP per capita (US$)" }, { key: "h", label: "HDI" }, { key: "gini", label: "Gini coefficient" }], rows: rows.map((x) => ({ c: x.c, g: x.g.toLocaleString("en-US"), h: x.h, gini: x.gini })) } };
  if (ask === "gini") {
    return {
      stimulus,
      stem: "Which country has the most unequal distribution of income?",
      ...options([maxGini.c, `It has the highest Gini coefficient (${maxGini.gini}).`], rows.filter((x) => x !== maxGini).map((x) => [x.c, x.g === Math.max(...rows.map((y) => y.g)) ? "The highest GDP per capita does not mean the most inequality." : "Its Gini coefficient is lower."] as [string, string])),
      explanation: `Higher Gini means more inequality: ${rows.map((x) => `${x.c} ${x.gini}`).join(", ")}.`,
    };
  }
  if (ask === "hdi") {
    return {
      stimulus,
      stem: "Which country has the highest level of human development as measured by the HDI?",
      ...options([maxH.c, `Its HDI (${maxH.h}) is highest; HDI combines health, education and income.`], rows.filter((x) => x !== maxH).map((x) => [x.c, "Its HDI is lower."] as [string, string])),
      explanation: `HDI values: ${rows.map((x) => `${x.c} ${x.h}`).join(", ")}.`,
    };
  }
  return {
    stimulus,
    stem: "Which statement about what these indicators measure is accurate?",
    ...options(["GDP per capita measures average income, while the Gini coefficient measures how unequally income is distributed", "They measure different things."], [["A higher Gini coefficient means a more equal society", "Higher Gini means more inequality."], ["HDI measures only income", "HDI also includes life expectancy and education."], ["GDP per capita shows how income is shared among citizens", "It is an average and says nothing about distribution."]]),
    explanation: "GDP per capita = average income; HDI = health, education and income; Gini = inequality (0 equal, 1 unequal).",
  };
});

/* ---------------- Unit templates ---------------- */
export const cgovUnit1: McqTemplate[] = [
  factTpl(1),
  pool("cg-u1-concepts", 1, ["defining-political-organizations", "democracy-vs-authoritarianism", "political-legitimacy", "sustaining-legitimacy", "the-practice-of-political-scientists", "political-stability"], ["1"], [
    { stem: "Which is an example of a normative statement?", right: ["The government should reduce income inequality", "It expresses a value judgment."], wrong: [["Turnout fell from 66% to 59%", "That is empirical."], ["The legislature has 450 seats", "That is a factual statement."], ["GDP grew 3% last year", "That is empirical."]] },
    { stem: "What distinguishes a regime from a government?", right: ["A regime is the set of fundamental rules and institutions; a government is the people currently in power", "Regimes outlast governments."], wrong: [["A regime is elected; a government is appointed", "Not the distinction."], ["They are the same thing", "They are different concepts."], ["A government is a type of nation", "Nations are groups of people with shared identity."]] },
    { stem: "A government relies mainly on rapid economic growth to justify its rule. What source of legitimacy is this?", right: ["Performance legitimacy", "Legitimacy based on results."], wrong: [["Traditional legitimacy", "Based on custom or religion."], ["Charismatic legitimacy", "Based on a leader's personal appeal."], ["Electoral legitimacy", "Based on winning free elections."]] },
    { stem: "Which is most characteristic of an illiberal democracy?", right: ["Elections are held, but civil liberties and independent institutions are weak", "Elections without full liberal protections."], wrong: [["Elections are banned", "That is not a democracy."], ["Strong protection of civil liberties and the rule of law", "That describes a liberal democracy."], ["Rule by a hereditary monarch with absolute power", "That is absolute monarchy."]] },
    { stem: "Which indicator would most strongly suggest declining regime legitimacy?", right: ["Sustained mass protests and falling trust in institutions", "These signal citizens no longer accept the government's right to rule."], wrong: [["A new trade agreement", "Not a legitimacy indicator."], ["A scheduled election", "Elections alone do not show declining legitimacy."], ["An increase in tourism", "Unrelated."]] },
    { stem: "Which best describes a state?", right: ["A political organization with sovereignty over a territory and population", "That is the definition of a state."], wrong: [["A group of people sharing language and culture", "That is a nation."], ["The party currently in power", "That is a government."], ["A set of political values", "That is political culture."]] },
  ]),
];
export const cgovUnit2: McqTemplate[] = [
  factTpl(2),
  pool("cg-u2-concepts", 2, ["comparing-parliamentary-presidential-and-semi-presidential-systems", "independent-legislatures", "independent-judiciaries", "removal-of-executives"], ["1"], [
    { stem: "Which is an advantage of a parliamentary system with a single-party majority?", right: ["The government can pass its legislative program efficiently", "Fusion of powers gives the majority control."], wrong: [["The executive serves a fixed term", "Parliamentary executives can fall."], ["There is strong separation of powers", "Parliamentary systems fuse powers."], ["Divided government is common", "That is more common in presidential systems."]] },
    { stem: "What is a vote of no confidence?", right: ["A legislative vote that can force a parliamentary government to resign", "It holds the executive accountable."], wrong: [["A vote to amend the constitution", "Different process."], ["A popular referendum on independence", "Unrelated."], ["A court ruling against the president", "That is judicial."]] },
    { stem: "Which feature most strengthens judicial independence?", right: ["Judges have secure tenure and cannot be easily removed for their rulings", "Security protects courts from pressure."], wrong: [["Judges are appointed and dismissed by the ruling party", "That weakens independence."], ["Courts must approve all executive decisions in advance", "Not the key feature."], ["Judges serve one-year terms", "Short terms increase pressure."]] },
    { stem: "A legislature approves nearly every bill proposed by the executive and rarely questions officials. This legislature is best described as:", right: ["A rubber-stamp legislature with little independence", "It does not check the executive."], wrong: [["A highly independent legislature", "It does not oppose the executive."], ["A judicial body", "It is legislative."], ["A supranational institution", "Unrelated."]] },
    { stem: "What does divided government mean in a presidential system?", right: ["The presidency and the legislature are controlled by different parties", "This can produce gridlock."], wrong: [["The country is split into federal states", "That is federalism."], ["The president shares power with a prime minister", "That is semi-presidentialism."], ["The judiciary is divided into several courts", "Unrelated."]] },
  ]),
];
export const cgovUnit3: McqTemplate[] = [
  factTpl(3),
  turnout,
  pool("cg-u3-concepts", 3, ["civil-society", "political-culture", "political-ideologies", "civil-rights-and-civil-liberties", "political-and-social-cleavages", "political-values-and-beliefs"], ["1"], [
    { stem: "Which is an example of civil society?", right: ["An independent environmental organization", "Voluntary groups outside the state."], wrong: [["The national legislature", "That is part of the state."], ["The army", "That is part of the state."], ["The central bank", "That is part of the state."]] },
    { stem: "Freedom of the press is best classified as:", right: ["A civil liberty", "A protection from government interference."], wrong: [["A civil right", "Civil rights concern equal treatment."], ["An electoral rule", "Unrelated."], ["A political cleavage", "Unrelated."]] },
    { stem: "Which agent of political socialization do authoritarian states most often control directly?", right: ["State media and the education system", "These shape beliefs at scale."], wrong: [["Private family conversations", "Hard to control directly."], ["Independent foreign newspapers", "Not state-controlled."], ["Opposition parties", "Not a socialization agent the state controls."]] },
    { stem: "Why are coinciding cleavages more likely to cause conflict than cross-cutting cleavages?", right: ["Divisions reinforce each other, so groups share fewer identities", "Overlapping divisions deepen conflict."], wrong: [["They are always economic", "Not necessarily."], ["They exist only in democracies", "Not true."], ["They reduce polarization", "Cross-cutting cleavages reduce polarization."]] },
    { stem: "Which ideology emphasizes free markets, privatization and reduced state intervention?", right: ["Neoliberalism", "That defines neoliberalism."], wrong: [["Communism", "Emphasizes collective ownership."], ["Socialism", "Emphasizes state action for equality."], ["Theocracy", "A form of religious rule."]] },
  ]),
];
export const cgovUnit4: McqTemplate[] = [
  factTpl(4),
  seatsVotes,
  pool("cg-u4-concepts", 4, ["political-party-systems", "role-of-political-party-systems", "pluralist-and-corporatist-interests", "impact-of-social-movements-and-interest-groups", "objectives-of-election-rules"], ["1"], [
    { stem: "According to Duverger's law, single-member-district plurality systems tend to produce:", right: ["Two-party systems", "Small parties struggle to win seats."], wrong: [["Multiparty systems", "That is associated with PR."], ["One-party states", "Elections still allow competition."], ["No parties at all", "Parties still form."]] },
    { stem: "In a corporatist system, interest groups are typically:", right: ["A limited number of officially recognized groups that work with or are controlled by the state", "That defines corporatism."], wrong: [["Many independent groups competing freely", "That is pluralism."], ["Banned entirely", "Not corporatism."], ["Formed only by foreign governments", "Unrelated."]] },
    { stem: "Why might an authoritarian government raise the vote threshold for parties to enter the legislature?", right: ["To keep small opposition parties from winning seats", "Thresholds can exclude rivals."], wrong: [["To increase the number of parties", "It reduces them."], ["To make results more proportional", "It makes them less proportional."], ["To lower the voting age", "Unrelated."]] },
    { stem: "What is patronage?", right: ["Providing jobs, contracts or benefits to supporters in exchange for loyalty", "A tool for maintaining support."], wrong: [["A type of electoral system", "Unrelated."], ["Judicial review of laws", "Unrelated."], ["A form of civil liberty", "Unrelated."]] },
    { stem: "How do proportional representation systems typically affect government formation?", right: ["They often produce multiparty legislatures and coalition governments", "Seats are spread across more parties."], wrong: [["They always produce single-party majorities", "That is more typical of SMD."], ["They eliminate the need for elections", "Elections are still held."], ["They prevent small parties from winning seats", "PR helps small parties."]] },
  ]),
];
export const cgovUnit5: McqTemplate[] = [
  factTpl(5),
  development,
  pool("cg-u5-concepts", 5, ["impact-of-natural-resources", "challenges-from-globalization", "international-and-supranational-organizations", "causes-and-effects-of-demographic-change", "policies-and-economic-liberalization"], ["1"], [
    { stem: "What is the resource curse?", right: ["The tendency of resource-rich states to experience corruption, weak institutions and slower development", "Resource wealth can undermine governance."], wrong: [["A shortage of natural resources", "It concerns abundance."], ["Environmental damage only", "It is broader."], ["A trade agreement among oil exporters", "Unrelated."]] },
    { stem: "Why is the European Union described as supranational?", right: ["Its laws and institutions can bind member states", "Members pool sovereignty."], wrong: [["It includes countries from every continent", "It is European."], ["It has no decision-making power", "It does."], ["It is a military alliance", "That is NATO."]] },
    { stem: "Which is a likely challenge for a state with a rapidly aging population?", right: ["Rising pension and health costs with fewer workers to pay taxes", "The dependency ratio rises."], wrong: [["Too many new workers entering the labor force", "That fits a young population."], ["Rapidly rising birth rates", "Aging usually follows low birth rates."], ["A shortage of schools", "That fits a young population."]] },
    { stem: "Which is an example of economic liberalization?", right: ["Selling state-owned companies to private investors", "Privatization reduces state control."], wrong: [["Nationalizing the oil industry", "That increases state control."], ["Raising tariffs on imports", "That is protectionism."], ["Imposing price controls", "That increases state intervention."]] },
    { stem: "Which is a common political backlash to globalization?", right: ["Nationalist movements seeking to restore sovereignty and limit immigration", "Brexit is an example."], wrong: [["Increased support for supranational integration", "That is the opposite."], ["Lower demand for tariffs", "Backlash often raises it."], ["Reduced attention to national identity", "Backlash emphasizes identity."]] },
  ]),
];
