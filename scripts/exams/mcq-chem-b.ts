/* AP Chemistry multiple choice, Units 5–9. Answers are computed. */
import { ce, E0, FARADAY, MASS, R_J } from "./chem-lib";
import { options } from "./csa-lib";
import { num, numOptions } from "./phys-lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({ key, unit, topics, skills, difficulty, calc: true, gen });
const f2 = (x: number) => x.toFixed(2);
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

/* ---------------- Unit 5: Kinetics ---------------- */
export const chemUnit5: McqTemplate[] = [
  t("ch-rate-law", 5, ["introduction-to-rate-law"], ["5"], 3, (r) => {
    const m = r.int(0, 2);
    const n = r.int(0, 2);
    const k = r.int(1, 9) / 10;
    const A = [0.1, 0.2, 0.1];
    const B = [0.1, 0.1, 0.2];
    const rate = A.map((a, i) => k * a ** m * B[i]! ** n);
    const law = (mm: number, nn: number) => `$$\\text{rate} = k${mm ? `[\\ce{A}]${mm > 1 ? `^${mm}` : ""}` : ""}${nn ? `[\\ce{B}]${nn > 1 ? `^${nn}` : ""}` : ""}$$`;
    return {
      stimulus: { text: "Initial-rate data for A + B → products:", table: { caption: "Initial rates", columns: [{ key: "e", label: "Trial" }, { key: "a", label: "[A] (M)" }, { key: "b", label: "[B] (M)" }, { key: "r", label: "Initial rate (M/s)" }], rows: A.map((a, i) => ({ e: i + 1, a, b: B[i]!, r: num(rate[i]!) })) } },
      stem: "What is the rate law?",
      ...options([law(m, n), `Doubling [A] multiplies the rate by ${2 ** m}; doubling [B] multiplies it by ${2 ** n}.`], [[law(n, m), "Compare trials where only one concentration changes."], [law(1, 1), "Orders are found from the data, not from coefficients."], [law(Math.min(2, m + 1), n), "Recheck how the rate changes when [A] doubles."], [law(m, (n + 1) % 3), "Recheck how the rate changes when [B] doubles."]]),
      explanation: `Trials 1→2: rate ×${2 ** m}, so order ${m} in A. Trials 1→3: rate ×${2 ** n}, so order ${n} in B.`,
    };
  }),
  t("ch-half-life", 5, ["concentration-changes-over-time"], ["5"], 2, (r) => {
    const th = r.int(2, 60);
    const nhl = r.int(1, 5);
    const A0 = r.int(10, 200) / 10;
    if (r.next() < 0.5) {
      return {
        stem: `A first-order reaction has a half-life of ${th} min. Starting at ${A0} M, what is the concentration after ${th * nhl} min?`,
        ...numOptions(A0 / 2 ** nhl, `${nhl} half-lives: divide by 2^${nhl}.`, [[A0 / (2 * nhl), "Each half-life halves the concentration; it is not divided by 2n."], [A0 - A0 * 0.5 * nhl, "First-order decay is exponential."], [A0 / 2 ** (nhl + 1), "Count the half-lives."]], "M"),
        explanation: `${A0} × (1/2)^${nhl} = ${num(A0 / 2 ** nhl)} M.`,
      };
    }
    const k = 0.693 / th;
    return {
      stem: `A first-order reaction has a rate constant of ${num(k)} min⁻¹. What is its half-life?`,
      ...numOptions(th, "t½ = 0.693/k.", [[k / 0.693, "The ratio is inverted."], [1 / k, "Use ln 2 = 0.693."], [0.693 * k, "Divide by k."]], "min"),
      explanation: `t½ = 0.693/${num(k)} = ${num(th)} min.`,
    };
  }),
  t("ch-rate-relation", 5, ["reaction-rates"], ["5"], 2, (r) => {
    const rx = r.pick([["2N2O5 -> 4NO2 + O2", "N2O5", 2, "NO2", 4], ["N2 + 3H2 -> 2NH3", "H2", 3, "NH3", 2], ["2H2O2 -> 2H2O + O2", "H2O2", 2, "O2", 1], ["4NH3 + 5O2 -> 4NO + 6H2O", "O2", 5, "H2O", 6]] as const);
    const rate = r.int(1, 90) / 100;
    const ans = (rate * rx[4]) / rx[2];
    return {
      stem: `For ${ce(rx[0])}, ${ce(rx[1])} is consumed at ${rate} M/s. At what rate does ${ce(rx[3])} form?`,
      ...numOptions(ans, `Multiply by the coefficient ratio ${rx[4]}/${rx[2]}.`, [[rate, "Rates scale with the coefficients."], [(rate * rx[2]) / rx[4], "The ratio is inverted."], [rate * rx[4], "Divide by the reactant's coefficient too."]], "M/s"),
      explanation: `${rate} × ${rx[4]}/${rx[2]} = ${num(ans)} M/s.`,
    };
  }),
  t("ch-energy-profile", 5, ["reaction-energy-profile", "catalysis"], ["4"], 2, (r) => {
    const reac = r.int(20, 120);
    const ts = reac + r.int(40, 150);
    const prod = r.int(0, 180);
    if (prod === reac) throw new Retry();
    const ask = r.pick(["Ea", "dH", "rev"]);
    const val = ask === "Ea" ? ts - reac : ask === "dH" ? prod - reac : ts - prod;
    return {
      stem: `On a reaction energy profile, the reactants are at ${reac} kJ/mol, the transition state at ${ts} kJ/mol and the products at ${prod} kJ/mol. What is ${ask === "Ea" ? "the activation energy of the forward reaction" : ask === "dH" ? "ΔH for the reaction" : "the activation energy of the reverse reaction"}?`,
      ...numOptions(val, ask === "Ea" ? "Ea = transition state − reactants." : ask === "dH" ? "ΔH = products − reactants." : "Reverse Ea = transition state − products.", [[ts - reac === val ? ts - prod : ts - reac, "Measure from the correct starting point."], [prod - reac === val ? reac - prod : prod - reac, "Check the sign and direction."], [ts, "Subtract the starting energy."]], "kJ/mol"),
      explanation: `Forward Ea = ${ts - reac}, ΔH = ${prod - reac}, reverse Ea = ${ts - prod} kJ/mol.`,
    };
  }),
  pool("ch-kinetics-pool", 5, ["introduction-to-reaction-mechanisms", "reaction-mechanism-and-rate-law", "collision-model", "catalysis", "elementary-reactions"], ["6"], [
    { stem: "Mechanism: (1) NO₂ + NO₂ → NO₃ + NO (slow); (2) NO₃ + CO → NO₂ + CO₂ (fast). Which rate law is consistent with it?", right: ["$$\\text{rate} = k[\\ce{NO2}]^2$$", "The slow first step determines the rate."], wrong: [["$$\\text{rate} = k[\\ce{NO2}][\\ce{CO}]$$", "That is the overall equation, not the slow step."], ["$$\\text{rate} = k[\\ce{NO3}][\\ce{CO}]$$", "NO₃ is an intermediate."], ["$$\\text{rate} = k[\\ce{CO}]$$", "CO is not in the slow step."]] },
    { stem: "How does a catalyst increase the rate of a reaction?", right: ["It provides a pathway with a lower activation energy", "The reaction goes by a different mechanism."], wrong: [["It increases ΔH", "ΔH is unchanged."], ["It shifts equilibrium toward products", "K is unchanged."], ["It raises the temperature", "It does not."]] },
    { stem: "Why does increasing temperature increase reaction rate?", right: ["A larger fraction of collisions have energy at or above the activation energy", "The Maxwell–Boltzmann distribution shifts."], wrong: [["The activation energy decreases", "Ea is unchanged by temperature."], ["The equilibrium constant increases", "Unrelated to rate."], ["Fewer collisions occur", "More occur."]] },
    { stem: "In a mechanism, a species that is produced in one step and consumed in a later step is a(n):", right: ["Intermediate", "It does not appear in the overall equation."], wrong: [["Catalyst", "A catalyst is consumed first and regenerated later."], ["Product", "It is consumed."], ["Spectator ion", "Unrelated."]] },
    { stem: "For the elementary step 2NO + Cl₂ → 2NOCl, what is the rate law?", right: ["$$\\text{rate} = k[\\ce{NO}]^2[\\ce{Cl2}]$$", "Elementary steps use their coefficients as exponents."], wrong: [["$$\\text{rate} = k[\\ce{NO}][\\ce{Cl2}]$$", "Use the coefficient 2 for NO."], ["$$\\text{rate} = k[\\ce{NOCl}]^2$$", "Rate laws use reactants."], ["It cannot be determined without experiment", "For elementary steps it can."]] },
  ]),
];

/* ---------------- Unit 6: Thermochemistry ---------------- */
const BOND: Record<string, number> = { "H–H": 436, "Cl–Cl": 242, "H–Cl": 431, "O=O": 498, "O–H": 463, "C–H": 413, "C=O": 799, "N≡N": 945, "N–H": 391, "Br–Br": 193, "H–Br": 366, "F–F": 155, "H–F": 567 };
const BOND_RX = [
  { eq: "H2 + Cl2 -> 2HCl", broken: [["H–H", 1], ["Cl–Cl", 1]], formed: [["H–Cl", 2]] },
  { eq: "H2 + Br2 -> 2HBr", broken: [["H–H", 1], ["Br–Br", 1]], formed: [["H–Br", 2]] },
  { eq: "H2 + F2 -> 2HF", broken: [["H–H", 1], ["F–F", 1]], formed: [["H–F", 2]] },
  { eq: "2H2 + O2 -> 2H2O", broken: [["H–H", 2], ["O=O", 1]], formed: [["O–H", 4]] },
  { eq: "N2 + 3H2 -> 2NH3", broken: [["N≡N", 1], ["H–H", 3]], formed: [["N–H", 6]] },
  { eq: "CH4 + 2O2 -> CO2 + 2H2O", broken: [["C–H", 4], ["O=O", 2]], formed: [["C=O", 2], ["O–H", 4]] },
] as const;
const FORM: Record<string, number> = { CO2: -393.5, "H2O(l)": -285.8, "H2O(g)": -241.8, CH4: -74.8, C2H6: -84.7, C3H8: -103.8, NH3: -46.1, NO: 90.3, NO2: 33.2, SO2: -296.8, SO3: -395.7, CO: -110.5, "C2H5OH": -277.7 };
const FORM_RX = [
  { eq: "CH4 + 2O2 -> CO2 + 2H2O(l)", p: [["CO2", 1], ["H2O(l)", 2]], re: [["CH4", 1]] },
  { eq: "C3H8 + 5O2 -> 3CO2 + 4H2O(l)", p: [["CO2", 3], ["H2O(l)", 4]], re: [["C3H8", 1]] },
  { eq: "2SO2 + O2 -> 2SO3", p: [["SO3", 2]], re: [["SO2", 2]] },
  { eq: "2NO + O2 -> 2NO2", p: [["NO2", 2]], re: [["NO", 2]] },
  { eq: "2CO + O2 -> 2CO2", p: [["CO2", 2]], re: [["CO", 2]] },
  { eq: "C2H5OH + 3O2 -> 2CO2 + 3H2O(l)", p: [["CO2", 2], ["H2O(l)", 3]], re: [["C2H5OH", 1]] },
  { eq: "2C2H6 + 7O2 -> 4CO2 + 6H2O(g)", p: [["CO2", 4], ["H2O(g)", 6]], re: [["C2H6", 2]] },
] as const;

export const chemUnit6: McqTemplate[] = [
  t("ch-calorimetry", 6, ["heat-capacity-and-calorimetry"], ["5"], 3, (r) => {
    const m = r.int(50, 250);
    const dT = r.int(20, 150) / 10;
    const mol = r.int(10, 100) / 1000;
    const up = r.next() < 0.6;
    const qsol = m * 4.18 * dT;
    const dH = ((up ? -1 : 1) * qsol) / 1000 / mol;
    return {
      stem: `When a reaction involving ${mol} mol of limiting reactant occurs in ${m} g of solution (c = 4.18 J/(g·°C)), the temperature ${up ? "rises" : "falls"} by ${dT} °C. What is ΔH for the reaction?`,
      ...numOptions(dH, `q(solution) = mcΔT = ${num(qsol)} J; q(reaction) = −q(solution); divide by moles.`, [[-dH, "A temperature rise means the reaction is exothermic (negative ΔH)."], [(up ? -1 : 1) * qsol / 1000, "Divide by the moles of reactant."], [((up ? -1 : 1) * m * dT) / 1000 / mol, "Include the specific heat."]], "kJ/mol"),
      explanation: `q = ${m}(4.18)(${dT}) = ${num(qsol)} J; ΔH = ${num(dH)} kJ/mol.`,
    };
  }),
  t("ch-bond-enthalpy", 6, ["bond-enthalpies"], ["5"], 3, (r) => {
    const x = r.pick(BOND_RX);
    const br = x.broken.reduce((s, [b, n]) => s + BOND[b]! * n, 0);
    const fo = x.formed.reduce((s, [b, n]) => s + BOND[b]! * n, 0);
    const dH = br - fo;
    const used = [...new Set([...x.broken, ...x.formed].map(([b]) => b))];
    return {
      stimulus: { table: { caption: "Average bond enthalpies", columns: [{ key: "b", label: "Bond" }, { key: "e", label: "kJ/mol" }], rows: used.map((b) => ({ b, e: BOND[b]! })) } },
      stem: `Use the bond enthalpies to estimate ΔH for ${ce(x.eq)}.`,
      ...numOptions(dH, "ΔH ≈ Σ(bonds broken) − Σ(bonds formed).", [[-dH, "Broken minus formed, not formed minus broken."], [br + fo, "Bonds formed release energy: subtract them."], [x.broken.reduce((s, [b]) => s + BOND[b]!, 0) - x.formed.reduce((s, [b]) => s + BOND[b]!, 0), "Multiply each bond energy by the number of bonds."]], "kJ"),
      explanation: `Broken ${br} − formed ${fo} = ${dH} kJ.`,
    };
  }),
  t("ch-formation", 6, ["enthalpy-of-formation"], ["5"], 3, (r) => {
    const x = r.pick(FORM_RX);
    const P = x.p.reduce((s, [sp, n]) => s + FORM[sp]! * n, 0);
    const Rr = x.re.reduce((s, [sp, n]) => s + FORM[sp]! * n, 0);
    const dH = P - Rr;
    const used = [...new Set([...x.p, ...x.re].map(([s]) => s))];
    return {
      stimulus: { table: { caption: "Standard enthalpies of formation", columns: [{ key: "s", label: "Substance" }, { key: "h", label: "ΔH°f (kJ/mol)" }], rows: used.map((s) => ({ s, h: FORM[s]! })) } },
      stem: `Calculate ΔH° for ${ce(x.eq)}. (ΔH°f of O₂ is 0.)`,
      ...numOptions(dH, "Σ n ΔH°f(products) − Σ n ΔH°f(reactants).", [[-dH, "Products minus reactants."], [x.p.reduce((s, [sp]) => s + FORM[sp]!, 0) - x.re.reduce((s, [sp]) => s + FORM[sp]!, 0), "Multiply each ΔH°f by its coefficient."], [P + Rr, "Subtract the reactants."]], "kJ"),
      explanation: `Products ${num(P, 4)} − reactants ${num(Rr, 4)} = ${num(dH, 4)} kJ.`,
    };
  }),
  t("ch-hess", 6, ["hesss-law"], ["5"], 3, (r) => {
    const h1 = r.int(-500, -50);
    const h2 = r.int(-400, 200);
    const a = r.pick([1, 2]);
    const rev = r.next() < 0.5;
    const ans = a * h1 + (rev ? -h2 : h2);
    return {
      stem: `Reaction 1 has ΔH₁ = ${h1} kJ and reaction 2 has ΔH₂ = ${h2} kJ. A target reaction is obtained by ${a === 2 ? "doubling reaction 1" : "using reaction 1 as written"} and ${rev ? "reversing" : "adding"} reaction 2. What is ΔH for the target reaction?`,
      ...numOptions(ans, "Reverse → change sign; multiply → multiply ΔH; then add.", [[h1 + (rev ? -h2 : h2), a === 2 ? "Doubling reaction 1 doubles ΔH₁." : "Recheck."], [a * h1 + (rev ? h2 : -h2), "Reversing changes the sign of ΔH₂."], [a * h1 * (rev ? -h2 : h2), "Enthalpies add; they do not multiply."]], "kJ"),
      explanation: `${a}(${h1}) + (${rev ? -h2 : h2}) = ${ans} kJ.`,
    };
  }),
  t("ch-mixing-temp", 6, ["heat-transfer-and-thermal-equilibrium", "heat-capacity-and-calorimetry"], ["5"], 2, (r) => {
    const m1 = r.int(20, 200);
    const m2 = r.int(20, 200);
    const T1 = r.int(50, 95);
    const T2 = r.int(5, 30);
    const Tf = (m1 * T1 + m2 * T2) / (m1 + m2);
    return {
      stem: `${m1} g of water at ${T1} °C is mixed with ${m2} g of water at ${T2} °C in an insulated container. What is the final temperature?`,
      ...numOptions(Tf, "Heat lost = heat gained; for water alone, a mass-weighted average.", [[(T1 + T2) / 2, "The masses are different."], [(m2 * T1 + m1 * T2) / (m1 + m2), "Pair each mass with its own temperature."], [T1 - T2, "Compute the weighted average."]], "{}^\\circ C"),
      explanation: `(${m1}·${T1} + ${m2}·${T2})/(${m1 + m2}) = ${num(Tf)} °C.`,
    };
  }),
  pool("ch-thermo-pool", 6, ["endothermic-and-exothermic-processes", "energy-of-phase-changes", "energy-diagrams", "introduction-to-enthalpy-of-reaction"], ["6"], [
    { stem: "When a salt dissolves in water, the temperature of the solution decreases. Which is true?", right: ["The process is endothermic; energy flows from the water into the dissolving process", "The surroundings lose energy."], wrong: [["The process is exothermic", "The solution cooled."], ["No energy is transferred", "Temperature changed."], ["The water's molecules gain kinetic energy", "They lose it."]] },
    { stem: "Why does temperature remain constant while ice melts?", right: ["Added energy overcomes intermolecular forces rather than increasing kinetic energy", "Phase changes occur at constant temperature."], wrong: [["Covalent bonds in water are breaking", "Melting does not break covalent bonds."], ["No energy is being added", "Energy is added."], ["The thermometer is wrong", "Not an explanation."]] },
    { stem: "Why is the enthalpy of vaporization of water much larger than its enthalpy of fusion?", right: ["Vaporization separates molecules completely, overcoming all intermolecular forces", "Melting only loosens them."], wrong: [["Vaporization breaks O–H bonds", "It does not."], ["Melting requires breaking covalent bonds", "It does not."], ["Liquids have no intermolecular forces", "They do."]] },
    { stem: "If ΔH = −286 kJ for H₂ + ½O₂ → H₂O(l), what is ΔH for 2H₂O(l) → 2H₂ + O₂?", right: ["+572 kJ", "Reverse (change sign) and double."], wrong: [["−572 kJ", "Reversing changes the sign."], ["+286 kJ", "The reaction is doubled."], ["−143 kJ", "Double, do not halve."]] },
  ]),
];

/* ---------------- Unit 7: Equilibrium ---------------- */
export const chemUnit7: McqTemplate[] = [
  t("ch-q-vs-k", 7, ["reaction-quotient-and-equilibrium-constant", "reaction-quotient-and-le-chateliers-principle"], ["5"], 2, (r) => {
    const K = Number((r.int(1, 99) / 10).toFixed(1));
    const A = r.int(1, 9) / 10;
    const B = r.int(1, 9) / 10;
    const C = r.int(1, 9) / 10;
    const Q = (C * C) / (A * B);
    if (Math.abs(Q - K) / K < 0.15) throw new Retry();
    const dir = Q < K ? "forward, toward products" : "in reverse, toward reactants";
    return {
      stem: `For ${ce("A(g) + B(g) <=> 2C(g)")}, K = ${K}. A mixture has [A] = ${A} M, [B] = ${B} M and [C] = ${C} M. In which direction will the reaction proceed?`,
      ...options([`It proceeds ${dir}, because Q = ${num(Q)}`, `Q = [C]²/([A][B]) = ${num(Q)}, which is ${Q < K ? "less" : "greater"} than K.`], [[`It proceeds ${Q < K ? "in reverse, toward reactants" : "forward, toward products"}, because Q = ${num(Q)}`, `If Q is ${Q < K ? "less" : "greater"} than K, the reaction proceeds ${Q < K ? "forward" : "in reverse"}.`], [`It is at equilibrium, because Q = K`, `Q = ${num(Q)} ≠ ${K}.`], [`It proceeds ${dir}, because Q = ${num(C / (A * B))}`, "Square [C], since its coefficient is 2."]]),
      explanation: `Q = ${C}²/(${A}·${B}) = ${num(Q)}; K = ${K}.`,
    };
  }),
  t("ch-k-manip", 7, ["properties-of-the-equilibrium-constant"], ["5"], 2, (r) => {
    const K = r.int(2, 50);
    const op = r.pick(["reverse", "double", "half", "reverse-double"]);
    const val = op === "reverse" ? 1 / K : op === "double" ? K * K : op === "half" ? Math.sqrt(K) : 1 / (K * K);
    const desc = { reverse: "reversed", double: "multiplied by 2", half: "multiplied by ½", "reverse-double": "reversed and multiplied by 2" }[op];
    return {
      stem: `A reaction has K = ${K}. What is K for the reaction ${desc}?`,
      ...numOptions(val, "Reverse → 1/K; multiply by n → Kⁿ.", [[op.includes("double") ? K * 2 : -K, "K is raised to a power, not multiplied."], [op === "reverse" ? -K : 1 / K, "Reversing gives the reciprocal."], [op === "half" ? K / 2 : K * K * K, "Multiplying by n raises K to the nth power."]], ""),
      explanation: `K' = ${num(val)}.`,
    };
  }),
  t("ch-ksp", 7, ["introduction-to-solubility-equilibria", "common-ion-effect"], ["5"], 3, (r) => {
    const salts = [["AgCl", 1.8e-10, "1:1"], ["BaSO4", 1.1e-10, "1:1"], ["CaF2", 3.9e-11, "1:2"], ["PbI2", 7.1e-9, "1:2"], ["Mg(OH)2", 5.6e-12, "1:2"], ["AgBr", 5.0e-13, "1:1"]] as const;
    const [salt, ksp, type] = r.pick(salts);
    const common = r.next() < 0.35 && type === "1:1";
    if (common) {
      const c = r.pick([0.01, 0.05, 0.1]);
      const s = ksp / c;
      return {
        stem: `The Ksp of ${ce(salt)} is ${num(ksp)}. What is its molar solubility in a solution that already contains ${c} M of its anion?`,
        ...numOptions(s, "Ksp = s(c), so s = Ksp/c.", [[Math.sqrt(ksp), "That is the solubility in pure water."], [ksp * c, "Divide Ksp by c."], [Math.sqrt(ksp / c), "The common ion's concentration dominates; no square root."]], "M"),
        explanation: `s = ${num(ksp)}/${c} = ${num(s)} M (common-ion effect).`,
      };
    }
    const s = type === "1:1" ? Math.sqrt(ksp) : Math.cbrt(ksp / 4);
    return {
      stem: `The Ksp of ${ce(salt)} is ${num(ksp)}. What is its molar solubility in pure water?`,
      ...numOptions(s, type === "1:1" ? "Ksp = s²." : "Ksp = s(2s)² = 4s³.", [[type === "1:1" ? ksp / 2 : Math.sqrt(ksp), type === "1:1" ? "Take the square root." : "For this salt, Ksp = 4s³."], [type === "1:1" ? Math.cbrt(ksp / 4) : Math.cbrt(ksp), type === "1:1" ? "This salt gives two ions: Ksp = s²." : "Include the factor 4 from (2s)²."], [ksp, "Solve for s."]], "M"),
      explanation: `s = ${num(s)} M.`,
    };
  }),
  t("ch-ice", 7, ["calculating-the-equilibrium-constant", "calculating-equilibrium-concentrations"], ["5"], 3, (r) => {
    const A0 = r.int(5, 20) / 10;
    const B0 = r.int(5, 20) / 10;
    const x = Number((Math.min(A0, B0) * r.int(20, 80) / 100).toFixed(2));
    const K = (2 * x) ** 2 / ((A0 - x) * (B0 - x));
    return {
      stem: `For ${ce("H2(g) + I2(g) <=> 2HI(g)")}, initial [H₂] = ${A0} M and [I₂] = ${B0} M, with no HI. At equilibrium, [HI] = ${num(2 * x)} M. What is K?`,
      ...numOptions(K, `x = ${x}; [H₂] = ${num(A0 - x)}, [I₂] = ${num(B0 - x)}.`, [[(2 * x) / ((A0 - x) * (B0 - x)), "Square [HI] (coefficient 2)."], [(2 * x) ** 2 / (A0 * B0), "Use equilibrium, not initial, concentrations."], [x ** 2 / ((A0 - x) * (B0 - x)), "[HI] = 2x."]], ""),
      explanation: `K = (${num(2 * x)})²/((${num(A0 - x)})(${num(B0 - x)})) = ${num(K)}.`,
    };
  }),
  pool("ch-lechatelier-pool", 7, ["introduction-to-le-chateliers-principle", "magnitude-of-the-equilibrium-constant", "introduction-to-equilibrium", "representations-of-equilibrium"], ["6"], [
    { stem: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH negative, which change shifts the equilibrium toward NH₃?", right: ["Decreasing the volume", "The product side has fewer moles of gas."], wrong: [["Increasing the temperature", "The reaction is exothermic; heating shifts left."], ["Adding a catalyst", "Catalysts do not shift equilibrium."], ["Removing H₂", "Removing a reactant shifts left."]] },
    { stem: "Which change alters the value of K?", right: ["Changing the temperature", "Only temperature changes K."], wrong: [["Adding more reactant", "Changes Q, not K."], ["Adding a catalyst", "No effect on K."], ["Changing the volume", "Shifts the position, not K."]] },
    { stem: "A reaction has K = 2 × 10⁻¹². At equilibrium:", right: ["Reactants are greatly favored", "Very small K."], wrong: [["Products are greatly favored", "That requires large K."], ["The reaction is very slow", "K says nothing about rate."], ["Reactant and product concentrations are equal", "Not implied."]] },
    { stem: "At equilibrium, which statement is true?", right: ["Forward and reverse reaction rates are equal", "Dynamic equilibrium."], wrong: [["Reactant and product concentrations are equal", "They are constant, not necessarily equal."], ["The reactions have stopped", "Both continue."], ["K equals 1", "Not necessarily."]] },
    { stem: "Adding an inert gas to a reaction mixture at constant volume does what to the equilibrium?", right: ["Nothing; partial pressures of the reacting gases are unchanged", "Concentrations are unchanged."], wrong: [["Shifts it toward fewer gas moles", "Only if volume changes."], ["Shifts it toward more gas moles", "No."], ["Changes K", "No."]] },
  ]),
];

/* ---------------- Unit 8: Acids and bases ---------------- */
export const chemUnit8: McqTemplate[] = [
  t("ch-strong-ph", 8, ["ph-and-poh-of-strong-acids-and-bases", "introduction-to-acids-and-bases"], ["5"], 1, (r) => {
    const sp = r.pick([["HCl", 1, "acid"], ["HNO3", 1, "acid"], ["NaOH", 1, "base"], ["KOH", 1, "base"], ["Ba(OH)2", 2, "base"], ["Ca(OH)2", 2, "base"]] as const);
    const c = r.pick([0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.25]);
    const conc = c * sp[1];
    const pH = sp[2] === "acid" ? -Math.log10(conc) : 14 + Math.log10(conc);
    return {
      stem: `What is the pH of a ${c} M solution of ${ce(sp[0])} at 25 °C?`,
      ...options([f2(pH), sp[2] === "acid" ? "Strong acid: [H₃O⁺] equals its concentration." : `Strong base: [OH⁻] = ${sp[1]} × ${c} M; pH = 14 − pOH.`], [[f2(14 - pH), sp[2] === "acid" ? "That would be the pOH." : "That is the pOH; subtract from 14."], [f2(sp[2] === "acid" ? -Math.log10(c / 2) : 14 + Math.log10(c)), sp[1] === 2 ? "Each formula unit releases two OH⁻." : "Recheck the concentration."], [f2(sp[2] === "acid" ? -Math.log10(Math.sqrt(c * 1e-5)) : 14 + Math.log10(Math.sqrt(conc * 1e-5))), "Strong acids and bases ionize completely; no equilibrium is needed."], [f2(pH + 1), "Recheck the logarithm."]]),
      explanation: `pH = ${f2(pH)}.`,
    };
  }),
  t("ch-weak-ph", 8, ["weak-acid-and-base-equilibria"], ["5"], 3, (r) => {
    const acids = [["acetic acid", 1.8e-5], ["formic acid", 1.8e-4], ["hydrofluoric acid", 6.8e-4], ["benzoic acid", 6.3e-5], ["hypochlorous acid", 3.0e-8], ["nitrous acid", 4.5e-4]] as const;
    const [name, Ka] = r.pick(acids);
    const C = r.pick([0.05, 0.1, 0.2, 0.5, 1.0]);
    const x = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * C)) / 2;
    const pH = -Math.log10(x);
    return {
      stem: `What is the pH of a ${C} M solution of ${name} (Ka = ${num(Ka)})?`,
      ...options([f2(pH), "Solve Ka = x²/(C − x) for x = [H₃O⁺]."], [[f2(-Math.log10(C)), "A weak acid does not ionize completely."], [f2(-Math.log10(Ka * C)), "Take the square root: x ≈ √(KaC)."], [f2(-Math.log10(Ka)), "That is the pKa."], [f2(14 - pH), "That is the pOH."]]),
      explanation: `x = ${num(x)} M; pH = ${f2(pH)}.`,
    };
  }),
  t("ch-buffer", 8, ["henderson-hasselbalch-equation", "acid-base-reactions-and-buffers"], ["5"], 3, (r) => {
    const pKa = r.pick([3.75, 4.2, 4.74, 6.35, 7.21, 9.25]);
    const ha = r.int(5, 50) / 100;
    const a = r.int(5, 50) / 100;
    const add = r.next() < 0.5 ? 0 : r.int(1, Math.floor(Math.min(ha, a) * 50)) / 100;
    const base = r.next() < 0.5;
    const ha2 = add ? (base ? ha - add : ha + add) : ha;
    const a2 = add ? (base ? a + add : a - add) : a;
    if (ha2 <= 0 || a2 <= 0) throw new Retry();
    const pH = pKa + Math.log10(a2 / ha2);
    return {
      stem: add
        ? `A buffer contains ${ha} mol of a weak acid HA (pKa ${pKa}) and ${a} mol of its conjugate base A⁻. Then ${add} mol of ${base ? "NaOH" : "HCl"} is added. What is the pH?`
        : `A buffer contains ${ha} mol of a weak acid HA (pKa ${pKa}) and ${a} mol of A⁻. What is its pH?`,
      ...options([f2(pH), add ? `First react: ${base ? "OH⁻ converts HA to A⁻" : "H⁺ converts A⁻ to HA"}. Then pH = pKa + log([A⁻]/[HA]).` : "pH = pKa + log([A⁻]/[HA])."], [[f2(pKa + Math.log10(ha2 / a2)), "The ratio is [A⁻]/[HA]."], [f2(pKa + Math.log10(a / ha)), add ? "Update moles after the added acid or base reacts." : "Recheck."], [f2(pKa), "Only true when [A⁻] = [HA]."], [f2(pKa + Math.log10((a2 + 0.05) / ha2)), "Recompute the ratio."]]),
      explanation: `ratio = ${num(a2)}/${num(ha2)}; pH = ${pKa} + log(${num(a2 / ha2)}) = ${f2(pH)}.`,
    };
  }),
  t("ch-titration-curve", 8, ["acid-base-titrations", "ph-and-pka"], ["4"], 3, (r) => {
    const Va = r.int(10, 50);
    const Ma = r.int(5, 30) / 100;
    const Mb = r.int(5, 30) / 100;
    const Veq = (Va * Ma) / Mb;
    const pKa = r.pick([3.75, 4.2, 4.74, 4.87, 6.35]);
    const ask = r.pick(["veq", "half"]);
    if (ask === "veq") {
      return {
        stem: `${Va} mL of ${Ma} M weak acid HA is titrated with ${Mb} M NaOH. What volume of NaOH reaches the equivalence point?`,
        ...numOptions(Veq, "Moles of base = moles of acid.", [[(Va * Mb) / Ma, "V_b = M_aV_a/M_b."], [Veq / 2, "That is the half-equivalence point."], [Va, "The concentrations differ."]], "mL"),
        explanation: `${Va}(${Ma})/${Mb} = ${num(Veq)} mL.`,
      };
    }
    return {
      stem: `A weak acid (pKa ${pKa}) is titrated with NaOH; the equivalence point is reached at ${num(Veq)} mL. What is the pH after ${num(Veq / 2)} mL of NaOH has been added?`,
      ...options([f2(pKa), "At the half-equivalence point, [HA] = [A⁻], so pH = pKa."], [[f2(7), "That is only for strong acid–strong base equivalence."], [f2(14 - pKa), "pH = pKa, not pKb."], [f2(pKa / 2), "pH equals pKa at half-equivalence."]]),
      explanation: `Half-equivalence: pH = pKa = ${pKa}.`,
    };
  }),
  t("ch-predominant", 8, ["ph-and-pka", "properties-of-buffers"], ["4"], 2, (r) => {
    const pKa = r.int(30, 110) / 10;
    const pH = Number((pKa + r.pick([-1, 1]) * r.int(5, 30) / 10).toFixed(1));
    return {
      stem: `A weak acid HA has pKa = ${pKa}. In a solution at pH ${pH}, which statement is correct?`,
      ...options([pH < pKa ? "[HA] is greater than [A⁻]" : "[A⁻] is greater than [HA]", pH < pKa ? "Below the pKa, the protonated form dominates." : "Above the pKa, the deprotonated form dominates."], [[pH < pKa ? "[A⁻] is greater than [HA]" : "[HA] is greater than [A⁻]", "Compare pH with pKa."], ["[HA] equals [A⁻]", "Only at pH = pKa."], ["Only HA is present", "Both forms are present."]]),
      explanation: `pH ${pH} ${pH < pKa ? "<" : ">"} pKa ${pKa}.`,
    };
  }),
  pool("ch-acid-pool", 8, ["molecular-structure-of-acids-and-bases", "buffer-capacity", "ph-and-solubility", "acid-base-titrations"], ["6"], [
    { stem: "Which is the strongest acid?", right: [ce("HClO4"), "More oxygen atoms stabilize the conjugate base."], wrong: [[ce("HClO"), "Fewest oxygens: weakest."], [ce("HClO2"), "Fewer oxygens than HClO₄."], [ce("HClO3"), "One fewer oxygen than HClO₄."]] },
    { stem: "Why is HI a stronger acid than HF?", right: ["The H–I bond is weaker and I⁻ is larger, so H⁺ is released more easily", "Bond strength decreases down the group."], wrong: [["F is less electronegative than I", "F is more electronegative."], ["HI has more hydrogen atoms", "Both have one."], ["HF is a gas", "Not the reason."]] },
    { stem: "Two buffers have the same pH, but buffer X has ten times the concentration of each component. Which is true?", right: ["Buffer X has a greater buffer capacity", "More acid and base are available to react."], wrong: [["Buffer X has a lower pH", "The ratio, and pH, are the same."], ["Both have the same capacity", "Capacity depends on amounts."], ["Buffer X cannot resist pH changes", "It resists better."]] },
    { stem: "Which salt's solubility increases most when the solution is acidified?", right: [ce("CaCO3"), "Carbonate is a base that reacts with H⁺."], wrong: [[ce("AgCl"), "Cl⁻ is not basic."], [ce("BaSO4"), "SO₄²⁻ is a very weak base."], [ce("NaNO3"), "Already very soluble and NO₃⁻ is not basic."]] },
    { stem: "Which indicator is best for titrating acetic acid with NaOH (equivalence pH ≈ 8.7)?", right: ["Phenolphthalein (color change around pH 8–10)", "Its range includes the equivalence pH."], wrong: [["Methyl orange (pH 3–4.4)", "Changes far too early."], ["Methyl red (pH 4.4–6.2)", "Changes too early."], ["No indicator works", "Phenolphthalein works."]] },
  ]),
];

/* ---------------- Unit 9: Thermodynamics and electrochemistry ---------------- */
export const chemUnit9: McqTemplate[] = [
  t("ch-gibbs", 9, ["gibbs-free-energy-and-thermodynamic-favorability"], ["5"], 3, (r) => {
    const dH = r.pick([-1, 1]) * r.int(20, 200);
    const dS = r.pick([-1, 1]) * r.int(20, 300);
    const T = r.int(250, 1000);
    const dG = dH - (T * dS) / 1000;
    if (Math.abs(dG) < 2) throw new Retry();
    if (r.next() < 0.5 && Math.sign(dH) === Math.sign(dS)) {
      const Tc = (dH * 1000) / dS;
      return {
        stem: `A reaction has ΔH° = ${dH} kJ/mol and ΔS° = ${dS} J/(mol·K). ${dH > 0 ? "Above" : "Below"} what temperature is it thermodynamically favorable?`,
        ...numOptions(Tc, "Set ΔG = 0: T = ΔH/ΔS (with ΔH in J).", [[dH / dS, "Convert ΔH to J (or ΔS to kJ)."], [(dS / dH) * 1000, "The ratio is inverted."], [Tc - 273, "The answer is in kelvins."]], "K"),
        explanation: `T = ${dH * 1000}/${dS} = ${num(Tc)} K.`,
      };
    }
    return {
      stem: `For a reaction, ΔH° = ${dH} kJ/mol and ΔS° = ${dS} J/(mol·K). What is ΔG° at ${T} K, and is the reaction favorable?`,
      ...options([`${num(dG)} kJ/mol; ${dG < 0 ? "favorable" : "not favorable"}`, "ΔG = ΔH − TΔS, with ΔS in kJ/(mol·K)."], [[`${num(dH - T * dS)} kJ/mol; ${dH - T * dS < 0 ? "favorable" : "not favorable"}`, "Convert ΔS from J to kJ."], [`${num(dH + (T * dS) / 1000)} kJ/mol; ${dH + (T * dS) / 1000 < 0 ? "favorable" : "not favorable"}`, "ΔG = ΔH − TΔS (subtract)."], [`${num(dG)} kJ/mol; ${dG < 0 ? "not favorable" : "favorable"}`, "Negative ΔG means favorable."]]),
      explanation: `ΔG = ${dH} − ${T}(${dS / 1000}) = ${num(dG)} kJ/mol.`,
    };
  }),
  t("ch-g-k", 9, ["free-energy-and-equilibrium"], ["5"], 3, (r) => {
    const T = 298;
    const dG = r.pick([-1, 1]) * r.int(2, 40);
    const K = Math.exp((-dG * 1000) / (R_J * T));
    return {
      stem: `At 298 K, ΔG° for a reaction is ${dG} kJ/mol. What is K?`,
      ...numOptions(K, "K = e^(−ΔG°/RT), with ΔG° in J/mol and R = 8.314.", [[Math.exp((-dG) / (R_J * T)), "Convert kJ to J."], [Math.exp((dG * 1000) / (R_J * T)), "K = e^(−ΔG°/RT): check the sign."], [Math.exp((-dG * 1000) / (0.08206 * T)), "Use R = 8.314 J/(mol·K)."]], ""),
      explanation: `ln K = ${num((-dG * 1000) / (R_J * T))}; K = ${num(K)}. ${dG < 0 ? "Negative ΔG°: K greater than 1." : "Positive ΔG°: K less than 1."}`,
    };
  }),
  t("ch-cell", 9, ["cell-potential-and-free-energy", "galvanic-voltaic-and-electrolytic-cells"], ["5"], 3, (r) => {
    const [a, b] = r.sample(E0, 2) as [(typeof E0)[number], (typeof E0)[number]];
    const cat = a.e > b.e ? a : b;
    const an = a.e > b.e ? b : a;
    const E = cat.e - an.e;
    const n = (cat.n * an.n) / gcd(cat.n, an.n);
    const dG = (-n * FARADAY * E) / 1000;
    const ask = r.pick(["E", "dG", "anode"]);
    const tbl = { table: { caption: "Standard reduction potentials", columns: [{ key: "h", label: "Half-reaction" }, { key: "e", label: "E° (V)" }], rows: [a, b].map((x) => ({ h: `$$\\ce{${x.ion} + ${x.n === 1 ? "" : x.n}e- -> ${x.metal}}$$`, e: x.e })) } };
    if (ask === "anode") {
      return {
        stimulus: tbl,
        stem: `A galvanic cell is built from ${an.metal}/${ce(an.ion)} and ${cat.metal}/${ce(cat.ion)} half-cells. Which electrode is the anode?`,
        ...options([`${an.metal}, where oxidation occurs`, "The half-reaction with the lower reduction potential runs as oxidation at the anode."], [[`${cat.metal}, where oxidation occurs`, "The higher potential is reduced at the cathode."], [`${an.metal}, where reduction occurs`, "Reduction happens at the cathode."], [`${cat.metal}, where reduction occurs at the anode`, "Reduction occurs at the cathode, not the anode."]]),
        explanation: `${an.metal} (E° ${an.e} V) is oxidized at the anode; ${cat.metal} is reduced at the cathode.`,
      };
    }
    if (ask === "E") {
      return {
        stimulus: tbl,
        stem: `What is E°cell for a galvanic cell made from these half-cells?`,
        ...numOptions(E, "E°cell = E°cathode − E°anode.", [[cat.e + an.e, "Subtract the anode's potential."], [an.e - cat.e, "Cathode minus anode; a galvanic cell is positive."], [E * Math.max(cat.n, an.n), "E° does not change when half-reactions are multiplied."]], "V"),
        explanation: `${cat.e} − (${an.e}) = ${num(E)} V.`,
      };
    }
    return {
      stimulus: tbl,
      stem: `For the galvanic cell made from these half-cells, what is ΔG°? (F = 96,485 C/mol)`,
      ...numOptions(dG, `ΔG° = −nFE° with n = ${n} electrons transferred and E° = ${num(E)} V.`, [[-dG, "ΔG° is negative for a positive E°."], [(-FARADAY * E) / 1000, `n = ${n} electrons are transferred.`], [(-n * FARADAY * E), "Convert J to kJ."]], "kJ"),
      explanation: `ΔG° = −(${n})(96485)(${num(E)}) = ${num(dG)} kJ.`,
    };
  }),
  t("ch-electrolysis", 9, ["electrolysis-and-faradays-law"], ["5"], 3, (r) => {
    const metal = r.pick([["Cu", 2], ["Ag", 1], ["Zn", 2], ["Ni", 2], ["Al", 3]] as const);
    const I = r.int(5, 100) / 10;
    const tmin = r.int(5, 120);
    const mol = (I * tmin * 60) / FARADAY / metal[1];
    const g = mol * MASS[metal[0]]!;
    return {
      stem: `A current of ${I} A flows for ${tmin} minutes through a solution of ${metal[0]}${metal[1] === 1 ? "⁺" : metal[1] === 2 ? "²⁺" : "³⁺"} ions. What mass of ${metal[0]} is deposited?`,
      ...numOptions(g, `q = It; mol e⁻ = q/F; mol metal = mol e⁻ ÷ ${metal[1]}.`, [[g * metal[1], `Each ion needs ${metal[1]} electron${metal[1] > 1 ? "s" : ""}.`], [g / 60, "Convert minutes to seconds."], [(I * tmin) / FARADAY / metal[1] * MASS[metal[0]]!, "Convert minutes to seconds."]], "g"),
      explanation: `q = ${I} × ${tmin * 60} = ${I * tmin * 60} C; ${num(mol)} mol ${metal[0]}; ${num(g)} g.`,
    };
  }),
  pool("ch-entropy-pool", 9, ["introduction-to-entropy", "absolute-entropy-and-entropy-change", "thermodynamic-and-kinetic-control", "coupled-reactions", "cell-potential-under-nonstandard-conditions"], ["6"], [
    { stem: "Which process has a negative ΔS?", right: [ce("2SO2(g) + O2(g) -> 2SO3(g)"), "Fewer moles of gas."], wrong: [[ce("H2O(l) -> H2O(g)"), "Gas forms."], [ce("CaCO3(s) -> CaO(s) + CO2(g)"), "Gas forms."], ["Dissolving NaCl in water", "Usually increases entropy."]] },
    { stem: "A reaction has ΔG° = −50 kJ/mol but does not occur noticeably at room temperature. The best explanation is:", right: ["It has a high activation energy, so it is under kinetic control", "Favorable is not the same as fast."], wrong: [["It is not thermodynamically favorable", "ΔG is negative."], ["K is less than 1", "Negative ΔG° means K greater than 1."], ["It is endothermic", "Not the explanation."]] },
    { stem: "How can an unfavorable reaction (ΔG positive) be made to occur?", right: ["By coupling it to a favorable reaction so the total ΔG is negative", "Coupled reactions."], wrong: [["By adding a catalyst", "Catalysts do not change ΔG."], ["By waiting longer", "It is not favorable."], ["By lowering the activation energy", "That changes rate, not favorability."]] },
    { stem: "In a Zn/Cu galvanic cell, [Zn²⁺] is increased. What happens to the cell potential?", right: ["It decreases", "A product's concentration rises, so Q increases."], wrong: [["It increases", "Increasing a product lowers E."], ["It stays the same", "Concentration affects E."], ["It becomes exactly zero", "Only at equilibrium."]] },
    { stem: "When does a battery's cell potential reach zero?", right: ["When the reaction reaches equilibrium (Q = K)", "No net driving force remains."], wrong: [["When the electrodes become heavier", "Not the condition."], ["When Q = 1", "That gives E = E°."], ["Immediately after it is assembled", "E is positive initially."]] },
  ]),
];

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a;
}
