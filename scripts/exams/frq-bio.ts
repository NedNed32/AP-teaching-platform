/*
 * AP Biology free-response templates in the exam's order: two long questions
 * (an experiment, and one with graphing) and four short ones (investigation,
 * conceptual analysis, model analysis, data analysis). Data are randomized and
 * the rubric answers are computed from them.
 */
import { Retry, type FrqTemplate } from "./types";

const r2 = (x: number) => Math.round(x * 100) / 100;

export const bioLongExperiment: FrqTemplate = {
  key: "frq-bio-enzyme-experiment",
  topics: ["environmental-impacts-on-enzyme-function", "enzyme-catalysis", "enzyme-structure"],
  skills: ["1", "3", "4", "6"],
  difficulty: 3,
  calc: false,
  format: "long",
  minutes: 25,
  gen(r) {
    const enzyme = r.pick([["catalase", "hydrogen peroxide", "oxygen gas"], ["amylase", "starch", "maltose"], ["lactase", "lactose", "glucose"]] as const);
    const opt = r.pick([6, 7, 8]);
    const pHs = [opt - 4, opt - 2, opt, opt + 2, opt + 4];
    const top = r.int(30, 60);
    const rates = [0.1, 0.55, 1, 0.5, 0.05].map((f) => Math.round(top * f * (0.9 + r.next() * 0.2)));
    rates[2] = top;
    const [i, j] = [2, r.pick([1, 3])];
    const change = r2(((rates[j]! - rates[i]!) / rates[i]!) * 100);
    return {
      title: "Enzyme activity and pH",
      stimulus: {
        text: `A student measured the activity of the enzyme ${enzyme[0]}, which breaks down ${enzyme[1]} and produces ${enzyme[2]}. Equal amounts of enzyme and substrate were mixed in buffers at different pH values at 25 °C, and the initial rate of product formation was recorded.`,
        table: { caption: "Initial reaction rate at each pH", columns: [{ key: "p", label: "pH" }, { key: "r", label: "Rate (µmol/min)" }], rows: pHs.map((p, k) => ({ p, r: rates[k]! })) },
      },
      parts: [
        {
          prompt: "Identify the independent variable and the dependent variable in the experiment, and identify one variable that should be held constant.",
          rubric: [
            { criterion: "Independent variable: pH.", example: "The pH of the buffer." },
            { criterion: "Dependent variable: initial reaction rate.", example: `Rate of ${enzyme[2]} production.` },
            { criterion: "A valid controlled variable.", example: "Temperature, enzyme concentration, substrate concentration or volume." },
          ],
        },
        {
          prompt: `Calculate the percent change in reaction rate when the pH changes from ${pHs[i]} to ${pHs[j]}.`,
          rubric: [{ criterion: "Correct calculation.", example: `(${rates[j]} − ${rates[i]}) ÷ ${rates[i]} × 100 = ${change}%` }],
        },
        {
          prompt: `Explain why the reaction rate is low at pH ${pHs[0]} and pH ${pHs[4]}.`,
          rubric: [
            { criterion: "Extreme pH changes the charges on amino acid R groups.", example: "H⁺ concentration alters ionic and hydrogen bonds that hold the enzyme's shape." },
            { criterion: "The active site's shape changes (denaturation), so substrate binds poorly.", example: "Fewer enzyme–substrate complexes form, lowering the rate." },
          ],
        },
        {
          prompt: `The student repeats the experiment at pH ${opt} with twice as much enzyme and the same amount of substrate. Predict the effect on the initial rate, and justify your prediction.`,
          rubric: [
            { criterion: "Predicts the initial rate increases.", example: `Higher than ${top} µmol/min, up to about double.` },
            { criterion: "Justifies with more active sites available when substrate is plentiful.", example: "More enzyme molecules can bind substrate at the same time." },
          ],
        },
        {
          prompt: "A competitive inhibitor is added to the reaction at the optimal pH. Describe how increasing the substrate concentration would affect the inhibition, and explain why.",
          rubric: [
            { criterion: "Inhibition decreases at high substrate concentration.", example: "The rate approaches the uninhibited maximum." },
            { criterion: "Explains competition for the active site.", example: "Substrate molecules outcompete the inhibitor for the active site." },
          ],
        },
      ],
    };
  },
};

export const bioLongGraphing: FrqTemplate = {
  key: "frq-bio-population-graph",
  topics: ["population-ecology", "effect-of-density-of-populations"],
  skills: ["4", "5", "6"],
  difficulty: 3,
  calc: false,
  format: "long",
  minutes: 25,
  gen(r) {
    const K = r.pick([400, 500, 600, 800]);
    const N0 = r.int(8, 20);
    const rm = r.pick([0.6, 0.7, 0.8, 0.9]);
    const days = [0, 2, 4, 6, 8, 10, 12, 14];
    const N = days.map((d) => Math.round(K / (1 + ((K - N0) / N0) * Math.exp(-rm * d))));
    const [a, b] = r.pick([[2, 4], [4, 6], [3, 5]] as const);
    const rate = r2((N[b]! - N[a]!) / (days[b]! - days[a]!));
    const org = r.pick(["yeast cells (thousands per mL)", "flour beetles", "duckweed plants", "paramecia (per mL)"]);
    return {
      title: "Population growth",
      stimulus: {
        text: `Researchers grew a population of ${org.replace(/ \(.*\)/, "")} in a container with a fixed supply of resources and counted the population every two days.`,
        table: { caption: `Population size (${org})`, columns: [{ key: "d", label: "Day" }, { key: "n", label: "Population size" }], rows: days.map((d, k) => ({ d, n: N[k]! })) },
      },
      parts: [
        {
          prompt: "Describe how you would construct an appropriate graph of the data: the type of graph, the axes and their labels, and the scale.",
          rubric: [
            { criterion: "Line or scatter graph with time on the x-axis.", example: "Day on the x-axis, population size on the y-axis." },
            { criterion: "Axes labeled with units and linear scales; points plotted accurately and connected.", example: `y-axis from 0 to at least ${N[N.length - 1]}.` },
          ],
        },
        {
          prompt: `Calculate the average rate of population growth between day ${days[a]} and day ${days[b]}.`,
          rubric: [{ criterion: "Correct calculation with units.", example: `(${N[b]} − ${N[a]}) ÷ ${days[b]! - days[a]!} = ${rate} individuals per day` }],
        },
        {
          prompt: "Identify the type of population growth shown and estimate the carrying capacity.",
          rubric: [
            { criterion: "Logistic growth.", example: "An S-shaped curve that levels off." },
            { criterion: "Carrying capacity estimate consistent with the data.", example: `About ${K}.` },
          ],
        },
        {
          prompt: "Explain why the growth rate decreases as the population approaches the carrying capacity.",
          rubric: [
            { criterion: "Identifies a density-dependent factor.", example: "Competition for limited food and space, or buildup of wastes." },
            { criterion: "Links it to lower birth rates or higher death rates.", example: "As density rises, fewer resources per individual reduce reproduction and survival." },
          ],
        },
        {
          prompt: "The researchers repeat the experiment with double the food supply. Predict the effect on the carrying capacity and justify your prediction.",
          rubric: [
            { criterion: "Predicts a higher carrying capacity.", example: `Greater than about ${K}.` },
            { criterion: "Justifies: food was a limiting resource.", example: "More resources allow the environment to support more individuals." },
          ],
        },
      ],
    };
  },
};

export const bioShortInvestigation: FrqTemplate = {
  key: "frq-bio-potato-osmosis",
  topics: ["tonicity-and-osmoregulation", "membrane-transport"],
  skills: ["3", "4", "5"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 10,
  gen(r) {
    const iso = r.pick([0.25, 0.3, 0.35, 0.4]);
    const concs = [0, 0.2, 0.4, 0.6, 0.8];
    const slope = -r.int(40, 60);
    const pct = concs.map((c) => r2(slope * (c - iso) + (r.next() - 0.5)));
    const k = concs.findIndex((c, idx) => idx > 0 && pct[idx]! < 0 && pct[idx - 1]! >= 0);
    if (k < 1) throw new Retry();
    const c0 = concs[k - 1]!;
    const c1 = concs[k]!;
    const est = r2(c0 + (pct[k - 1]! / (pct[k - 1]! - pct[k]!)) * (c1 - c0));
    const psi = r2(-1 * est * 0.0831 * 295);
    return {
      title: "Osmosis in potato tissue",
      stimulus: {
        text: "Students placed potato cores of equal mass in sucrose solutions of different concentrations at 22 °C. After 24 hours, they measured each core's percent change in mass.",
        table: { caption: "Percent change in mass", columns: [{ key: "c", label: "Sucrose (M)" }, { key: "p", label: "Change in mass (%)" }], rows: concs.map((c, idx) => ({ c, p: pct[idx]! })) },
      },
      parts: [
        {
          prompt: "Identify an appropriate control for the experiment, and explain why the students measured percent change rather than change in mass.",
          rubric: [
            { criterion: "The 0 M (distilled water) treatment, or cores with no solution change.", example: "Distilled water." },
            { criterion: "Percent change allows comparison of cores with slightly different starting masses.", example: "It standardizes for initial mass." },
          ],
        },
        {
          prompt: "Estimate the sucrose concentration that is isotonic to the potato cells, and calculate the solute potential of that solution (Ψs = −iCRT, R = 0.0831, T in kelvins).",
          rubric: [
            { criterion: "Isotonic concentration where the change in mass is zero.", example: `About ${est} M, interpolating between ${c0} and ${c1} M.` },
            { criterion: "Solute potential calculated correctly from the estimate.", example: `Ψs = −(1)(${est})(0.0831)(295) ≈ ${psi} bars.` },
          ],
        },
        {
          prompt: "Explain the change in mass of the cores in the 0.8 M solution.",
          rubric: [{ criterion: "Water moved out of the cells by osmosis toward the lower water potential of the solution.", example: "The solution is hypertonic, so the cells lost water and mass." }],
        },
      ],
    };
  },
};

const PATHWAY = [
  { part: "the receptor, so that it cannot bind epinephrine", effect: "glycogen is not broken down even when epinephrine is present", why: "the signal is never received, so no G protein, cAMP or kinase is activated" },
  { part: "the G protein, so that it stays active without a signal", effect: "glycogen breakdown continues even when epinephrine is absent", why: "adenylyl cyclase stays on, cAMP stays high, and protein kinase A stays active" },
  { part: "adenylyl cyclase, so that it cannot make cAMP", effect: "glycogen is not broken down in response to epinephrine", why: "without the second messenger, protein kinase A is not activated" },
  { part: "the enzyme that breaks down cAMP, so that it is inactive", effect: "glycogen breakdown continues longer than normal after the signal ends", why: "cAMP remains high, keeping protein kinase A active" },
];

export const bioShortConceptual: FrqTemplate = {
  key: "frq-bio-signaling",
  topics: ["signal-transduction", "changes-in-signal-transduction-pathways", "introduction-to-signal-transduction"],
  skills: ["1", "6"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 10,
  gen(r) {
    const m = r.pick(PATHWAY);
    return {
      title: "A signaling pathway",
      stimulus: {
        text: "In liver cells, the hormone epinephrine binds a G protein-coupled receptor. The activated G protein activates adenylyl cyclase, which converts ATP to cyclic AMP (cAMP). cAMP activates protein kinase A, which starts a phosphorylation cascade that leads to the breakdown of glycogen into glucose. An enzyme in the cell breaks down cAMP.",
      },
      parts: [
        {
          prompt: "Describe the role of cAMP in this pathway.",
          rubric: [{ criterion: "cAMP is a second messenger that relays and amplifies the signal inside the cell.", example: "It activates protein kinase A." }],
        },
        {
          prompt: "Explain how a single epinephrine molecule can cause the release of a large number of glucose molecules.",
          rubric: [{ criterion: "Amplification: each activated enzyme activates many molecules at the next step.", example: "One adenylyl cyclase makes many cAMP; each kinase phosphorylates many targets." }],
        },
        {
          prompt: `A mutation alters ${m.part}. Predict the effect on glycogen breakdown, and justify your prediction.`,
          rubric: [
            { criterion: "Correct prediction.", example: m.effect[0]!.toUpperCase() + m.effect.slice(1) + "." },
            { criterion: "Justification using the pathway.", example: m.why[0]!.toUpperCase() + m.why.slice(1) + "." },
          ],
        },
      ],
    };
  },
};

export const bioShortModel: FrqTemplate = {
  key: "frq-bio-hardy-weinberg-model",
  topics: ["hardy-weinberg-equilibrium", "population-genetics", "natural-selection"],
  skills: ["2", "5", "6"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 10,
  gen(r) {
    const q = r.pick([0.2, 0.3, 0.4, 0.5, 0.6]);
    const p = r2(1 - q);
    const n = r.pick([500, 800, 1000, 2000]);
    const recessive = Math.round(q * q * n);
    const trait = r.pick([["dark fur", "light fur"], ["green shells", "brown shells"], ["long wings", "short wings"]] as const);
    return {
      title: "Allele frequencies in a population",
      stimulus: {
        text: `In a population of ${n} beetles, ${trait[0]} (allele B) is dominant to ${trait[1]} (allele b). Researchers count ${recessive} beetles with ${trait[1]}. Assume the population is in Hardy–Weinberg equilibrium (p + q = 1; p² + 2pq + q² = 1).`,
      },
      parts: [
        {
          prompt: "Calculate the frequency of the b allele and the expected number of heterozygous beetles.",
          rubric: [
            { criterion: "q from the recessive phenotype frequency.", example: `q² = ${recessive}/${n} = ${r2(q * q)}, so q = ${q}.` },
            { criterion: "Expected heterozygotes.", example: `2pq × ${n} = 2(${p})(${q})(${n}) = ${Math.round(2 * p * q * n)}.` },
          ],
        },
        {
          prompt: "Identify two conditions that must be met for the population to remain in Hardy–Weinberg equilibrium.",
          rubric: [{ criterion: "Two correct conditions.", example: "A large population, random mating, no mutation, no migration, no natural selection." }],
        },
        {
          prompt: `Birds that prey on the beetles find beetles with ${trait[0]} more easily on the new background. Predict how the frequency of the b allele will change over several generations, and justify your prediction.`,
          rubric: [
            { criterion: "Predicts q increases.", example: `Beetles with ${trait[1]} (bb) survive and reproduce more.` },
            { criterion: "Justifies with differential survival and reproduction.", example: "Selection removes B alleles faster, because both BB and Bb beetles are eaten more." },
          ],
        },
      ],
    };
  },
};

export const bioShortData: FrqTemplate = {
  key: "frq-bio-chi-square-cross",
  topics: ["mendelian-genetics", "non-mendelian-genetics"],
  skills: ["4", "5", "6"],
  difficulty: 4,
  calc: false,
  format: "short",
  minutes: 10,
  gen(r) {
    const tot = r.pick([160, 320, 480, 640]);
    const exp = [9, 3, 3, 1].map((x) => (tot * x) / 16);
    const linked = r.next() < 0.5;
    const obs = linked
      ? [exp[0]! + exp[3]! * 1.2, exp[1]! * 0.45, exp[2]! * 0.45, exp[3]! * 2.2].map(Math.round)
      : exp.map((e) => Math.round(e + r.int(-4, 4)));
    obs[0] = obs[0]! + (tot - obs.reduce((a, b) => a + b, 0));
    const chi = exp.reduce((s, e, k) => s + (obs[k]! - e) ** 2 / e, 0);
    if (Math.abs(chi - 7.81) < 0.5) throw new Retry();
    const reject = chi > 7.81;
    const phen = ["tall, purple", "tall, white", "short, purple", "short, white"];
    return {
      title: "A dihybrid cross",
      stimulus: {
        text: `Two pea plants heterozygous for height (T, tall, dominant) and flower color (P, purple, dominant) were crossed, producing ${tot} offspring.`,
        table: { caption: "Offspring phenotypes", columns: [{ key: "ph", label: "Phenotype" }, { key: "n", label: "Observed" }], rows: phen.map((ph, k) => ({ ph, n: obs[k]! })) },
      },
      parts: [
        {
          prompt: "State the null hypothesis, and calculate the expected number of offspring in each category.",
          rubric: [
            { criterion: "Null hypothesis: the genes assort independently, giving a 9 : 3 : 3 : 1 ratio.", example: "Any differences are due to chance." },
            { criterion: "Expected counts.", example: exp.join(", ") },
          ],
        },
        {
          prompt: "Calculate the chi-square value and determine whether to reject the null hypothesis at p = 0.05 (critical value 7.81 for 3 degrees of freedom).",
          rubric: [
            { criterion: "Correct chi-square value.", example: `χ² ≈ ${r2(chi)}` },
            { criterion: "Correct conclusion with comparison to the critical value.", example: `${r2(chi)} is ${reject ? "greater" : "less"} than 7.81, so ${reject ? "reject" : "fail to reject"} the null hypothesis.` },
          ],
        },
        {
          prompt: "Propose an explanation for the results.",
          rubric: [{ criterion: "Explanation consistent with the conclusion.", example: reject ? "The genes are likely linked on the same chromosome, so parental combinations are inherited together more often." : "The genes assort independently; deviations are due to chance." }],
        },
      ],
    };
  },
};
