/*
 * AP Chemistry free response: three long questions (10 points, ~23 min) and four
 * short questions (4 points, ~9 min). Data are randomized; rubric answers computed.
 */
import { ce, E0, FARADAY, molarMass, R_GAS } from "./chem-lib";
import { num } from "./phys-lib";
import { Retry, type FrqTemplate } from "./types";

const f2 = (x: number) => x.toFixed(2);
const long = { calc: true, minutes: 23, format: "long" } as const;
const short = { calc: true, minutes: 9, format: "short" } as const;

/* ---------- Long 1: gas stoichiometry and structure ---------- */
export const chemLong1: FrqTemplate = {
  ...long,
  key: "frq-chem-gas-stoich",
  topics: ["stoichiometry", "ideal-gas-law", "lewis-diagrams", "vsepr-and-hybridization"],
  skills: ["1", "5", "6"],
  difficulty: 3,
  gen(r) {
    const gCaCO3 = r.int(20, 120) / 10;
    const T = r.int(290, 320);
    const P = r.int(95, 105) / 100;
    const n = gCaCO3 / molarMass("CaCO3");
    const V = (n * R_GAS * T) / P;
    const actualV = Number((V * r.int(80, 97) / 100).toFixed(3));
    return {
      title: "Decomposing calcium carbonate",
      stimulus: { text: `A student heats ${gCaCO3} g of $$\\ce{CaCO3(s)}$$, which decomposes completely: $$\\ce{CaCO3(s) -> CaO(s) + CO2(g)}$$. The $$\\ce{CO2}$$ is collected at ${T} K and ${P} atm.` },
      parts: [
        { prompt: "Calculate the number of moles of CO₂ produced.", rubric: [{ criterion: "Correct moles using molar mass 100.09 g/mol and the 1:1 ratio.", example: `${gCaCO3} ÷ 100.09 = ${num(n)} mol` }] },
        { prompt: "Calculate the volume of CO₂ expected.", rubric: [{ criterion: "Correct use of PV = nRT.", example: `V = nRT/P = (${num(n)})(0.08206)(${T})/${P} = ${num(V)} L` }] },
        { prompt: `The student measures ${actualV} L of gas. Calculate the percent yield, and give one experimental reason the yield could be less than 100%.`, rubric: [
          { criterion: "Percent yield.", example: `${actualV} ÷ ${num(V)} × 100% = ${num((actualV / V) * 100)}%` },
          { criterion: "A valid reason.", example: "Incomplete decomposition (not heated long enough) or gas leaking from the apparatus." },
        ] },
        { prompt: "Draw (describe) a complete Lewis diagram for CO₂, and identify its molecular geometry and the hybridization of carbon.", rubric: [
          { criterion: "Correct Lewis diagram.", example: "O=C=O with two lone pairs on each O (16 valence electrons)." },
          { criterion: "Linear geometry, sp hybridization.", example: "Two electron domains on C." },
        ] },
        { prompt: "Explain why CO₂ is nonpolar even though C=O bonds are polar.", rubric: [{ criterion: "Linear symmetry makes the bond dipoles cancel.", example: "Equal and opposite dipoles at 180°." }] },
        { prompt: "CaO is an ionic solid. Explain, using Coulomb's law, why CaO has a higher melting point than KCl.", rubric: [
          { criterion: "Larger ion charges in CaO (2+/2−) than in KCl (1+/1−).", example: "Charges are double." },
          { criterion: "Greater electrostatic attraction (and smaller ions) means more energy is needed to separate the ions.", example: "Attraction ∝ q₁q₂/r²." },
        ] },
      ],
    };
  },
};

/* ---------- Long 2: kinetics ---------- */
export const chemLong2: FrqTemplate = {
  ...long,
  key: "frq-chem-kinetics",
  topics: ["introduction-to-rate-law", "concentration-changes-over-time", "reaction-mechanism-and-rate-law", "catalysis"],
  skills: ["4", "5", "6"],
  difficulty: 4,
  gen(r) {
    const order = r.pick([1, 2]);
    const k = order === 1 ? r.int(10, 90) / 1000 : r.int(5, 50) / 100;
    const A0 = r.int(5, 20) / 10;
    const times = [0, 10, 20, 30, 40];
    const conc = times.map((t) => (order === 1 ? A0 * Math.exp(-k * t) : 1 / (1 / A0 + k * t)));
    const half = order === 1 ? 0.693 / k : 1 / (k * A0);
    return {
      title: "Kinetics of a decomposition",
      stimulus: {
        text: "The decomposition of compound X was monitored at constant temperature.",
        table: { caption: "Concentration of X over time", columns: [{ key: "t", label: "Time (s)" }, { key: "c", label: "[X] (M)" }, { key: "ln", label: "ln[X]" }, { key: "inv", label: "1/[X] (M⁻¹)" }], rows: times.map((t, i) => ({ t, c: num(conc[i]!), ln: f2(Math.log(conc[i]!)), inv: f2(1 / conc[i]!) })) },
      },
      parts: [
        { prompt: "Calculate the average rate of disappearance of X between 0 and 20 s.", rubric: [{ criterion: "Correct value with units.", example: `(${num(conc[0]!)} − ${num(conc[2]!)})/20 = ${num((conc[0]! - conc[2]!) / 20)} M/s` }] },
        { prompt: "Determine the order of the reaction with respect to X. Justify your answer using the data.", rubric: [
          { criterion: `Order ${order}.`, example: order === 1 ? "ln[X] decreases linearly with time." : "1/[X] increases linearly with time." },
          { criterion: "Justification from the table.", example: order === 1 ? "Equal time intervals give equal changes in ln[X]." : "Equal time intervals give equal changes in 1/[X]." },
        ] },
        { prompt: "Write the rate law and determine the rate constant, with units.", rubric: [
          { criterion: "Rate law.", example: `rate = k[X]${order === 2 ? "²" : ""}` },
          { criterion: "Value and units of k.", example: `k = ${num(k)} ${order === 1 ? "s⁻¹" : "M⁻¹s⁻¹"} (from the slope)` },
        ] },
        { prompt: "Calculate the half-life of the reaction (for the initial concentration).", rubric: [{ criterion: "Correct half-life.", example: order === 1 ? `t½ = 0.693/k = ${num(half)} s` : `t½ = 1/(k[X]₀) = ${num(half)} s` }] },
        { prompt: `A proposed mechanism has a slow first step: ${order === 1 ? "X → Y + Z" : "2X → X₂"}. Is the mechanism consistent with the rate law? Explain.`, rubric: [{ criterion: "Yes; the slow step's elementary rate law matches the observed rate law.", example: order === 1 ? "rate = k[X]" : "rate = k[X]²" }] },
        { prompt: "A catalyst is added. Explain its effect on the rate and on the rate constant, using activation energy.", rubric: [
          { criterion: "Rate and k increase.", example: "The catalyst provides a new pathway." },
          { criterion: "Lower activation energy means a larger fraction of collisions are successful.", example: "ΔH is unchanged." },
        ] },
      ],
    };
  },
};

/* ---------- Long 3: weak acid titration ---------- */
export const chemLong3: FrqTemplate = {
  ...long,
  key: "frq-chem-titration",
  topics: ["acid-base-titrations", "weak-acid-and-base-equilibria", "henderson-hasselbalch-equation", "properties-of-buffers"],
  skills: ["2", "5", "6"],
  difficulty: 4,
  gen(r) {
    const Ka = r.pick([1.8e-5, 6.3e-5, 1.4e-4, 3.0e-5]);
    const pKa = -Math.log10(Ka);
    const Va = r.int(20, 40);
    const Ma = r.int(8, 20) / 100;
    const Mb = r.int(8, 20) / 100;
    const Veq = (Va * Ma) / Mb;
    const x = Math.sqrt(Ka * Ma);
    const pH0 = -Math.log10(x);
    const molA = (Va * Ma) / 1000;
    const Vtot = (Va + Veq) / 1000;
    const Cb = molA / Vtot;
    const Kb = 1e-14 / Ka;
    const pHeq = 14 + Math.log10(Math.sqrt(Kb * Cb));
    return {
      title: "Titration of a weak acid",
      stimulus: { text: `A student titrates ${Va}.0 mL of ${Ma} M weak monoprotic acid HA (Ka = ${num(Ka)}) with ${Mb} M NaOH.` },
      parts: [
        { prompt: "Write the net ionic equation for the titration reaction.", rubric: [{ criterion: "Correct equation.", example: "HA(aq) + OH⁻(aq) → A⁻(aq) + H₂O(l)" }] },
        { prompt: "Calculate the initial pH of the acid solution.", rubric: [
          { criterion: "Ka expression set up with x = [H₃O⁺].", example: `${num(Ka)} = x²/${Ma}` },
          { criterion: "Correct pH.", example: `x = ${num(x)} M; pH = ${f2(pH0)}` },
        ] },
        { prompt: "Calculate the volume of NaOH needed to reach the equivalence point.", rubric: [{ criterion: "Correct volume.", example: `${Va}(${Ma})/${Mb} = ${num(Veq)} mL` }] },
        { prompt: "What is the pH at the half-equivalence point? Justify.", rubric: [{ criterion: "pH = pKa because [HA] = [A⁻].", example: `pH = ${f2(pKa)}` }] },
        { prompt: "Calculate the pH at the equivalence point.", rubric: [
          { criterion: "Uses Kb = Kw/Ka and the diluted [A⁻].", example: `[A⁻] = ${num(Cb)} M; Kb = ${num(Kb)}` },
          { criterion: "Correct pH (greater than 7).", example: `pH ≈ ${f2(pHeq)}` },
        ] },
        { prompt: "Choose an appropriate indicator from: methyl orange (pKa 3.7), bromothymol blue (pKa 7.0), phenolphthalein (pKa 9.3). Justify.", rubric: [{ criterion: "Indicator whose pKa is closest to the equivalence pH.", example: pHeq > 8 ? "Phenolphthalein." : "Bromothymol blue." }] },
        { prompt: "Explain why the solution at the half-equivalence point resists pH change when a small amount of HCl is added.", rubric: [{ criterion: "A⁻ reacts with added H⁺ to form HA (buffer).", example: "A⁻ + H₃O⁺ → HA + H₂O, so the ratio [A⁻]/[HA] changes only slightly." }] },
      ],
    };
  },
};

/* ---------- Short 1: calorimetry ---------- */
export const chemShort1: FrqTemplate = {
  ...short,
  key: "frq-chem-calorimetry",
  topics: ["heat-capacity-and-calorimetry", "endothermic-and-exothermic-processes"],
  skills: ["2", "5"],
  difficulty: 3,
  gen(r) {
    const salt = r.pick([["NH4NO3", 80.04, -1], ["CaCl2", 110.98, 1], ["KNO3", 101.1, -1], ["NaOH", 40.0, 1]] as const);
    const g = r.int(20, 100) / 10;
    const m = r.int(50, 150);
    const dT = r.int(20, 120) / 10;
    const q = (m + g) * 4.18 * dT;
    const n = g / salt[1];
    const dH = (-salt[2] * q) / 1000 / n;
    return {
      title: "Dissolving a salt",
      stimulus: { text: `${g} g of ${ce(salt[0])} dissolves in ${m} g of water in a coffee-cup calorimeter. The temperature ${salt[2] > 0 ? "rises" : "falls"} by ${dT} °C. Assume the solution's specific heat is 4.18 J/(g·°C).` },
      parts: [
        { prompt: "Is the dissolution endothermic or exothermic? Justify.", rubric: [{ criterion: "Correct with reasoning.", example: salt[2] > 0 ? "Exothermic: the solution warmed, so energy was released." : "Endothermic: the solution cooled, so energy was absorbed." }] },
        { prompt: "Calculate the heat absorbed or released by the solution.", rubric: [{ criterion: "q = mcΔT with total mass.", example: `(${m + g})(4.18)(${dT}) = ${num(q)} J` }] },
        { prompt: "Calculate ΔH of dissolution in kJ/mol.", rubric: [{ criterion: "Correct value and sign.", example: `${num(n)} mol; ΔH = ${num(dH)} kJ/mol` }] },
        { prompt: "If some heat escaped to the surroundings, would the magnitude of the calculated ΔH be too large or too small? Explain.", rubric: [{ criterion: "Too small, because the measured temperature change is smaller than the true change.", example: "Less ΔT → smaller q." }] },
      ],
    };
  },
};

/* ---------- Short 2: electrochemistry ---------- */
export const chemShort2: FrqTemplate = {
  ...short,
  key: "frq-chem-galvanic",
  topics: ["galvanic-voltaic-and-electrolytic-cells", "cell-potential-and-free-energy", "cell-potential-under-nonstandard-conditions"],
  skills: ["1", "5", "6"],
  difficulty: 3,
  gen(r) {
    const [a, b] = r.sample(E0.filter((x) => x.n === 2), 2) as [(typeof E0)[number], (typeof E0)[number]];
    const cat = a.e > b.e ? a : b;
    const an = a.e > b.e ? b : a;
    if (cat.e === an.e) throw new Retry();
    const E = cat.e - an.e;
    const dG = (-2 * FARADAY * E) / 1000;
    return {
      title: "A galvanic cell",
      stimulus: { text: `A galvanic cell is made of a ${an.metal} electrode in 1.0 M ${ce(an.ion)} and a ${cat.metal} electrode in 1.0 M ${ce(cat.ion)}. Standard reduction potentials: ${ce(`${an.ion} + 2e- -> ${an.metal}`)} E° = ${an.e} V; ${ce(`${cat.ion} + 2e- -> ${cat.metal}`)} E° = ${cat.e} V.` },
      parts: [
        { prompt: "Write the balanced net ionic equation for the cell reaction.", rubric: [{ criterion: "Correct equation.", example: `${an.metal}(s) + ${cat.ion.replace("^{2+}", "²⁺")}(aq) → ${an.metal}²⁺(aq) + ${cat.metal}(s)` }] },
        { prompt: "Calculate E°cell.", rubric: [{ criterion: "Correct value.", example: `${cat.e} − (${an.e}) = ${f2(E)} V` }] },
        { prompt: "Calculate ΔG° for the cell reaction.", rubric: [{ criterion: "ΔG° = −nFE° with n = 2.", example: `−(2)(96485)(${f2(E)}) = ${num(dG)} kJ` }] },
        { prompt: `The concentration of ${an.metal}²⁺ is increased to 2.0 M. Predict the effect on the cell potential and justify.`, rubric: [{ criterion: "E decreases because Q increases (a product's concentration rises).", example: "Q greater than 1 → E less than E°." }] },
      ],
    };
  },
};

/* ---------- Short 3: solubility equilibrium ---------- */
export const chemShort3: FrqTemplate = {
  ...short,
  key: "frq-chem-ksp",
  topics: ["introduction-to-solubility-equilibria", "common-ion-effect", "ph-and-solubility"],
  skills: ["5", "6"],
  difficulty: 3,
  gen(r) {
    const s = r.pick([["CaF2", 3.9e-11, "F⁻"], ["PbI2", 7.1e-9, "I⁻"], ["Mg(OH)2", 5.6e-12, "OH⁻"]] as const);
    const sol = Math.cbrt(s[1] / 4);
    const c = r.pick([0.01, 0.05, 0.1]);
    const solC = s[1] / (c * c);
    return {
      title: "Solubility of a slightly soluble salt",
      stimulus: { text: `The Ksp of ${ce(s[0])} is ${num(s[1])} at 25 °C.` },
      parts: [
        { prompt: "Write the Ksp expression.", rubric: [{ criterion: "Correct expression.", example: `Ksp = [M²⁺][${s[2]}]²` }] },
        { prompt: "Calculate the molar solubility in pure water.", rubric: [{ criterion: "4s³ = Ksp.", example: `s = (${num(s[1])}/4)^(1/3) = ${num(sol)} M` }] },
        { prompt: `Calculate the molar solubility in a solution containing ${c} M ${s[2]} (from a soluble salt).`, rubric: [{ criterion: "Common-ion calculation.", example: `s = Ksp/(${c})² = ${num(solC)} M` }] },
        { prompt: s[2] === "I⁻" ? "Would lowering the pH significantly change the solubility? Explain." : "Explain how lowering the pH affects the solubility.", rubric: [{ criterion: "Correct reasoning about whether the anion is basic.", example: s[2] === "I⁻" ? "No: I⁻ is the conjugate base of a strong acid, so H⁺ does not remove it." : `Solubility increases: H⁺ reacts with ${s[2]} (a base), shifting the equilibrium toward dissolving.` }] },
      ],
    };
  },
};

/* ---------- Short 4: PES and periodicity ---------- */
export const chemShort4: FrqTemplate = {
  ...short,
  key: "frq-chem-pes",
  topics: ["photoelectron-spectroscopy", "periodic-trends", "atomic-structure-and-electron-configuration"],
  skills: ["1", "4", "6"],
  difficulty: 3,
  gen(r) {
    const pair = r.pick([["Na", "Mg", 11, 12], ["Mg", "Al", 12, 13], ["N", "O", 7, 8], ["C", "N", 6, 7], ["Si", "P", 14, 15]] as const);
    return {
      title: "Photoelectron spectra",
      stimulus: { text: `The photoelectron spectra of ${pair[0]} (Z = ${pair[2]}) and ${pair[1]} (Z = ${pair[3]}) are compared.` },
      parts: [
        { prompt: `Write the electron configuration of ${pair[1]}.`, rubric: [{ criterion: "Correct configuration.", example: { 12: "1s² 2s² 2p⁶ 3s²", 13: "1s² 2s² 2p⁶ 3s² 3p¹", 8: "1s² 2s² 2p⁴", 7: "1s² 2s² 2p³", 15: "1s² 2s² 2p⁶ 3s² 3p³" }[pair[3]] ?? "" }] },
        { prompt: `Explain why the 1s peak of ${pair[1]} has a higher binding energy than the 1s peak of ${pair[0]}.`, rubric: [{ criterion: `${pair[1]} has more protons, so 1s electrons are attracted more strongly (Coulomb's law).`, example: `${pair[3]} vs ${pair[2]} protons.` }] },
        { prompt: `Describe one difference in the number or relative height of peaks between the two spectra.`, rubric: [{ criterion: "A valid difference based on configurations.", example: `${pair[1]} has one more electron, so its outermost peak is taller or an extra peak appears.` }] },
        { prompt: `Which element has the larger atomic radius? Justify using Coulomb's law.`, rubric: [{ criterion: `${pair[0]}: fewer protons with similar shielding, so valence electrons are held less tightly.`, example: "Same period; effective nuclear charge increases across." }] },
      ],
    };
  },
};
