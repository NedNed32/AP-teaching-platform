/* AP Chemistry multiple choice, Units 1–4. Answers are computed from formulas and reference data. */
import { ce, configuration, EN, MASS, molarMass, NAMES, parseFormula, R_GAS, SHAPES, SYMBOLS } from "./chem-lib";
import { options } from "./csa-lib";
import { num, numOptions } from "./phys-lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({ key, unit, topics, skills, difficulty, calc: true, gen });
const COMPOUNDS = ["H2O", "CO2", "NaCl", "C6H12O6", "CaCO3", "NH3", "CH4", "H2SO4", "NaOH", "KMnO4", "Ca(OH)2", "Al2O3", "C2H5OH", "MgCl2", "NaHCO3", "Fe2O3", "CuSO4", "KCl", "HNO3", "C3H8"];

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

/* ---------------- Unit 1 ---------------- */
export const chemUnit1: McqTemplate[] = [
  t("ch-moles", 1, ["moles-and-molar-mass"], ["5"], 1, (r) => {
    const f = r.pick(COMPOUNDS);
    const M = molarMass(f);
    const g = r.int(5, 200);
    const ask = r.pick(["mol", "particles"]);
    const n = g / M;
    if (ask === "mol") {
      return {
        stem: `How many moles are in ${g} g of ${ce(f)}?`,
        ...numOptions(n, `n = m/M with M = ${num(M, 4)} g/mol.`, [[g * M, "Divide mass by molar mass."], [M / g, "The ratio is inverted."], [g / (M / 2), "Recheck the molar mass."]], "mol"),
        explanation: `${g} g ÷ ${num(M, 4)} g/mol = ${num(n)} mol.`,
      };
    }
    return {
      stem: `How many formula units or molecules are in ${g} g of ${ce(f)}?`,
      ...numOptions(n * 6.022e23, "Convert grams to moles, then multiply by Avogadro's number.", [[g * 6.022e23, "Convert grams to moles first."], [(M / g) * 6.022e23, "Moles = mass ÷ molar mass."], [n, "Multiply moles by 6.022 × 10²³."]], "particles"),
      explanation: `${num(n)} mol × 6.022 × 10²³ = ${num(n * 6.022e23)}.`,
    };
  }),
  t("ch-average-mass", 1, ["mass-spectra-of-elements"], ["5"], 2, (r) => {
    const opts = [["chlorine", 35, 37], ["copper", 63, 65], ["boron", 10, 11], ["bromine", 79, 81], ["gallium", 69, 71], ["lithium", 6, 7]] as const;
    const [name, a, b] = r.pick(opts);
    const pa = r.int(15, 85);
    const avg = (a * pa + b * (100 - pa)) / 100;
    return {
      stem: `A mass spectrum of a sample of ${name} shows two peaks: mass ${a} with relative abundance ${pa}% and mass ${b} with ${100 - pa}%. What is the average atomic mass of the sample?`,
      ...numOptions(avg, "Weight each isotope mass by its fractional abundance.", [[(a + b) / 2, "The isotopes are not equally abundant."], [(a * (100 - pa) + b * pa) / 100, "Pair each mass with its own abundance."], [a * pa + b * (100 - pa), "Convert percentages to fractions."]], "amu"),
      explanation: `${a}(${pa / 100}) + ${b}(${(100 - pa) / 100}) = ${num(avg, 4)} amu.`,
    };
  }),
  t("ch-percent-composition", 1, ["elemental-composition-of-pure-substances"], ["5"], 2, (r) => {
    const f = r.pick(COMPOUNDS);
    const [el, n] = r.pick(Object.entries(parseFormula(f)));
    const M = molarMass(f);
    const pct = ((MASS[el]! * n) / M) * 100;
    return {
      stem: `What is the mass percent of ${el} in ${ce(f)}?`,
      ...numOptions(pct, `(${n} × ${MASS[el]}) ÷ ${num(M, 4)} × 100%.`, [[(MASS[el]! / M) * 100, n > 1 ? `There are ${n} atoms of ${el} in the formula.` : "Recheck the molar mass."], [(n / Object.values(parseFormula(f)).reduce((a, b) => a + b, 0)) * 100, "Use masses, not numbers of atoms."], [100 - pct, "That is the percent of the other elements."]], "\\%"),
      explanation: `${n}(${MASS[el]}) ÷ ${num(M, 4)} = ${num(pct)}%.`,
    };
  }),
  t("ch-empirical", 1, ["elemental-composition-of-pure-substances"], ["5"], 3, (r) => {
    const cases: [string, string, string][] = [["C6H12O6", "CH2O", "glucose"], ["C2H6", "CH3", "ethane"], ["C4H10", "C2H5", "butane"], ["H2O2", "HO", "hydrogen peroxide"], ["C6H6", "CH", "benzene"], ["N2O4", "NO2", "dinitrogen tetroxide"], ["C8H18", "C4H9", "octane"], ["P4O10", "P2O5", "tetraphosphorus decoxide"]];
    const [mol, emp, name] = r.pick(cases);
    const els = parseFormula(mol);
    const M = molarMass(mol);
    const pcts = Object.entries(els).map(([el, n]) => `${num(((MASS[el]! * n) / M) * 100)}% ${el}`).join(", ");
    const wrongs = cases.filter((c) => c[1] !== emp).map((c) => c[1]);
    return {
      stem: `A compound (${name}) is ${pcts} by mass. What is its empirical formula?`,
      ...options([ce(emp), "Convert each percent (in 100 g) to moles and divide by the smallest."], [[ce(mol), "That is the molecular formula; reduce to the simplest ratio."], ...r.sample(wrongs, 3).map((w) => [ce(w), "Recompute the mole ratio."] as [string, string])]),
      explanation: `The mole ratio reduces to ${emp}; the molecular formula is ${mol}.`,
    };
  }),
  t("ch-configuration", 1, ["atomic-structure-and-electron-configuration"], ["1"], 2, (r) => {
    const z = r.pick([5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20, 22, 25, 26, 28, 30, 33, 34, 35]);
    const right = configuration(z);
    const w1 = configuration(z + 1);
    const w2 = configuration(z - 1);
    const w3 = right.replace(/4s\^\{2\}\\,3d/, "3d").replace(/3s\^\{2\}/, "3s^{1}");
    return {
      stem: `Which is the ground-state electron configuration of ${NAMES[z]} (${SYMBOLS[z]}, Z = ${z})?`,
      ...options([`$$${right}$$`, `Fill orbitals in order until ${z} electrons are placed.`], [[`$$${w1}$$`, `That has ${z + 1} electrons.`], [`$$${w2}$$`, `That has ${z - 1} electrons.`], [`$$${w3}$$`, "Fill lower-energy orbitals completely first."], [`$$${configuration(z).replace(/(\d)p\^\{(\d)\}$/, (_, a, b) => `${a}p^{${Math.min(6, Number(b) + 1)}}`)}$$`, "Count the total electrons."]]),
      explanation: `Z = ${z}: $$${right}$$.`,
    };
  }),
  t("ch-pes", 1, ["photoelectron-spectroscopy"], ["4"], 3, (r) => {
    const z = r.int(3, 20);
    const cfg = configuration(z);
    const peaks = cfg.split("\\,").map((p) => Number(p.match(/\{(\d+)\}/)![1]));
    return {
      stem: `A photoelectron spectrum shows ${peaks.length} peaks. From highest to lowest binding energy, their relative heights are ${peaks.join(" : ")}. Which element is it?`,
      ...options([`${NAMES[z]![0]!.toUpperCase() + NAMES[z]!.slice(1)}`, `The peaks correspond to $$${cfg}$$, which has ${z} electrons.`], [z - 1, z + 1, z + 2].filter((x) => x >= 1 && x <= 36).map((x) => [NAMES[x]![0]!.toUpperCase() + NAMES[x]!.slice(1), `That element has ${x} electrons.`] as [string, string])),
      explanation: `Total electrons: ${peaks.join(" + ")} = ${z}.`,
    };
  }),
  t("ch-ionization-jump", 1, ["periodic-trends"], ["4"], 3, (r) => {
    const grp = r.int(1, 3);
    const base = [r.int(450, 900)];
    for (let i = 1; i < 4; i++) base.push(Math.round(base[i - 1]! * (i === grp ? r.int(5, 9) : 1 + r.int(40, 90) / 100)));
    return {
      stem: `The first four ionization energies of an element are ${base.join(", ")} kJ/mol. In which group of the periodic table is the element most likely found?`,
      ...options([`Group ${grp === 3 ? 13 : grp}`, `The large jump comes after removing ${grp} electron${grp > 1 ? "s" : ""}, so it has ${grp} valence electron${grp > 1 ? "s" : ""}.`], [1, 2, 13, 14].filter((g) => g !== (grp === 3 ? 13 : grp)).map((g) => [`Group ${g}`, "Locate the largest jump between successive ionization energies."] as [string, string])),
      explanation: "The big jump marks the start of removing core electrons.",
    };
  }),
  pool("ch-periodic-pool", 1, ["periodic-trends", "valence-electrons-and-ionic-compounds", "atomic-structure-and-electron-configuration"], ["6"], [
    { stem: "Which best explains why the atomic radius of Cl is smaller than that of Na?", right: ["Cl has more protons with similar shielding, so its valence electrons are pulled closer", "Greater effective nuclear charge across a period."], wrong: [["Cl has more electron shells", "They are in the same period."], ["Cl is a nonmetal", "Not an explanation."], ["Cl has fewer electrons", "Cl has more electrons."]] },
    { stem: "Which has a larger first ionization energy, Mg or Ba, and why?", right: ["Mg, because its valence electrons are closer to the nucleus", "Down a group, electrons are farther away and more shielded."], wrong: [["Ba, because it has more protons", "Shielding and distance outweigh the extra protons."], ["They are equal because both are in Group 2", "They differ."], ["Ba, because it is larger", "Larger atoms lose electrons more easily."]] },
    { stem: "Why is the radius of F⁻ larger than that of F?", right: ["The added electron increases electron–electron repulsion with the same nuclear charge", "Anions are larger than their atoms."], wrong: [["F⁻ has more protons", "Protons do not change."], ["F⁻ has an additional electron shell", "Same shell."], ["F⁻ has fewer electrons", "It has one more."]] },
    { stem: "Which formula is most likely for the compound of element X (Group 2) and element Y (Group 16)?", right: [ce("XY"), "X²⁺ and Y²⁻ combine 1 : 1."], wrong: [[ce("XY2"), "That would need Y⁻."], [ce("X2Y"), "That would need X⁺."], [ce("X2Y3"), "That would need X³⁺."]] },
    { stem: "Which element has the highest electronegativity?", right: ["Fluorine", "Electronegativity increases up and to the right."], wrong: [["Cesium", "Lowest among these."], ["Oxygen", "Slightly less than fluorine."], ["Chlorine", "Less than fluorine."]] },
  ]),
];


/* ---------------- Unit 2 ---------------- */
export const chemUnit2: McqTemplate[] = [
  t("ch-vsepr", 2, ["vsepr-and-hybridization"], ["1"], 2, (r) => {
    const s = r.pick(SHAPES);
    const ask = r.pick(["shape", "hyb", "polar"]);
    if (ask === "shape") {
      const others = [...new Set(SHAPES.map((x) => x.shape))].filter((x) => x !== s.shape);
      return {
        stem: `What is the molecular geometry of ${ce(s.f)}?`,
        ...options([s.shape[0]!.toUpperCase() + s.shape.slice(1), `Count electron domains and lone pairs on the central atom.`], r.sample(others, 3).map((x) => [x[0]!.toUpperCase() + x.slice(1), "Lone pairs change the molecular shape from the electron-domain geometry."] as [string, string])),
        explanation: `${s.f}: ${s.shape}, ${s.angle}.`,
      };
    }
    if (ask === "hyb") {
      return {
        stem: `What is the hybridization of the central atom in ${ce(s.f)}?`,
        ...options([`$$${s.hyb}$$`, "Hybridization matches the number of electron domains: 2 sp, 3 sp², 4 sp³."], ["sp", "sp^2", "sp^3", "sp^3d"].filter((x) => x !== s.hyb).map((x) => [`$$${x}$$`, "Count electron domains, including lone pairs."] as [string, string])),
        explanation: `${s.f} has ${s.hyb === "sp" ? 2 : s.hyb === "sp^2" ? 3 : 4} electron domains on the central atom.`,
      };
    }
    return {
      stem: `Is ${ce(s.f)} polar or nonpolar, and why?`,
      ...options([s.polar ? "Polar, because its bond dipoles do not cancel" : "Nonpolar, because its bond dipoles cancel by symmetry", `${s.f} is ${s.shape}.`], [[s.polar ? "Nonpolar, because its bond dipoles cancel by symmetry" : "Polar, because its bond dipoles do not cancel", "Consider the molecule's shape, not only its bonds."], [s.polar ? "Nonpolar, because it has no polar bonds" : "Polar, because all its bonds are polar", "Polarity depends on both bond polarity and geometry."], ["Polar, because it contains hydrogen", "Containing H does not make a molecule polar."]]),
      explanation: `${s.f} is ${s.shape}; ${s.polar ? "the dipoles do not cancel" : "the dipoles cancel"}.`,
    };
  }),
  t("ch-lattice", 2, ["intramolecular-force-and-potential-energy", "structure-of-ionic-solids"], ["6"], 2, (r) => {
    const salts: [string, number, number][] = [["NaF", 1, 1], ["NaCl", 1, 1], ["KBr", 1, 1], ["MgO", 2, 2], ["CaO", 2, 2], ["MgF2", 2, 1], ["LiF", 1, 1], ["BaO", 2, 2]];
    const [a, b] = r.sample(salts, 2) as [[string, number, number], [string, number, number]];
    const pa = a[1] * a[2];
    const pb = b[1] * b[2];
    if (pa === pb) throw new Retry();
    const big = pa > pb ? a : b;
    const small = pa > pb ? b : a;
    return {
      stem: `Which compound has the greater lattice energy, ${ce(a[0])} or ${ce(b[0])}?`,
      ...options([`${ce(big[0])}, because its ions have larger charges`, "By Coulomb's law, attraction increases with the product of the ion charges."], [[`${ce(small[0])}, because its ions have larger charges`, "Compare the ion charges."], [`${ce(small[0])}, because it has more atoms per formula unit`, "Number of atoms does not determine lattice energy."], ["They are equal because both are ionic", "Lattice energies differ."]]),
      explanation: `${big[0]} has ion charges ${big[1]} and ${big[2]}; ${small[0]} has ${small[1]} and ${small[2]}.`,
    };
  }),
  t("ch-bond-polarity", 2, ["types-of-chemical-bonds"], ["1"], 2, (r) => {
    const atoms = ["C", "N", "O", "F", "Cl", "Br", "S", "P", "Si"];
    const pairs = r.sample(atoms, 4).map((x) => `H–${x}`);
    const diffs = pairs.map((p) => Math.abs(EN[p.split("–")[1]!]! - EN.H!));
    const max = diffs.indexOf(Math.max(...diffs));
    if (diffs.filter((d) => d === diffs[max]).length > 1) throw new Retry();
    return {
      stem: "Which bond is the most polar?",
      ...options([pairs[max]!, `It has the largest electronegativity difference (${num(diffs[max]!, 2)}).`], pairs.filter((_, i) => i !== max).map((p) => [p, `Its electronegativity difference is ${num(diffs[pairs.indexOf(p)]!, 2)}.`] as [string, string])),
      explanation: pairs.map((p, i) => `${p}: ${num(diffs[i]!, 2)}`).join("; "),
    };
  }),
  t("ch-valence-count", 2, ["lewis-diagrams"], ["1"], 2, (r) => {
    const species: [string, number][] = [["CO2", 16], ["NH3", 8], ["H2O", 8], ["CH4", 8], ["SO2", 18], ["NO3^-", 24], ["CO3^{2-}", 24], ["NH4+", 8], ["PCl3", 26], ["SO4^{2-}", 32], ["HCN", 10], ["O3", 18], ["CH2O", 12], ["BF3", 24]];
    const [f, n] = r.pick(species);
    const charge = f.includes("^-") ? 1 : f.includes("{2-}") ? 2 : f.endsWith("+") ? -1 : 0;
    return {
      stem: `How many valence electrons are shown in the Lewis structure of ${ce(f)}?`,
      ...options([String(n), "Sum the valence electrons of all atoms, then add one per negative charge (subtract one per positive charge)."], [[String(n - charge), charge ? "Account for the ion's charge." : "Recount."], [String(n + 2), "Recount each atom's valence electrons."], [String(n - 2), "Recount each atom's valence electrons."], [String(n + charge * 2 + 4), "Recount."]].filter(([v]) => v !== String(n)) as [string, string][]),
      explanation: `${f} has ${n} valence electrons.`,
    };
  }),
  pool("ch-bonding-pool", 2, ["structure-of-metals-and-alloys", "resonance-and-formal-charge", "types-of-chemical-bonds", "structure-of-ionic-solids"], ["6"], [
    { stem: "Why are metals good conductors of electricity?", right: ["Their valence electrons are delocalized and free to move", "The electron-sea model."], wrong: [["Their ions move freely in the solid", "Ions are fixed in the lattice."], ["They have strong covalent bonds", "Metallic bonding is not covalent."], ["They contain no electrons", "Untrue."]] },
    { stem: "Steel is harder than pure iron because:", right: ["Small carbon atoms in the gaps (interstitial alloy) hinder layers of iron atoms from sliding", "Interstitial atoms disrupt slipping."], wrong: [["Carbon replaces iron atoms of the same size", "That describes a substitutional alloy."], ["Steel has ionic bonds", "It is metallic."], ["Steel contains no free electrons", "It still conducts."]] },
    { stem: "The nitrate ion has three resonance structures. What is true of its N–O bonds?", right: ["All three are identical, intermediate between single and double bonds", "Resonance averages the bonds."], wrong: [["One is double and two are single at all times", "The structures are averaged."], ["All are triple bonds", "Untrue."], ["They alternate rapidly between single and double", "Resonance is not flipping."]] },
    { stem: "Why is solid NaCl a poor conductor while molten NaCl conducts?", right: ["Ions are fixed in the solid but mobile in the liquid", "Conduction needs mobile charges."], wrong: [["Molten NaCl contains free electrons", "It contains mobile ions."], ["Solid NaCl has covalent bonds", "It is ionic."], ["Melting creates new ions", "The ions are already present."]] },
    { stem: "Which Lewis structure is preferred when formal charges are considered?", right: ["The one with formal charges closest to zero and any negative charge on the most electronegative atom", "That is the formal charge criterion."], wrong: [["The one with the most double bonds", "Not the criterion."], ["The one with the largest formal charges", "Opposite."], ["The one with positive charge on the most electronegative atom", "Opposite."]] },
  ]),
];

/* ---------------- Unit 3 ---------------- */
export const chemUnit3: McqTemplate[] = [
  t("ch-ideal-gas", 3, ["ideal-gas-law"], ["5"], 2, (r) => {
    const n = r.int(10, 300) / 100;
    const T = r.int(250, 450);
    const V = r.int(2, 40);
    const P = (n * R_GAS * T) / V;
    const ask = r.pick(["P", "V", "n"]);
    if (ask === "P") return { stem: `What is the pressure of ${n} mol of gas in a ${V} L container at ${T} K?`, ...numOptions(P, "P = nRT/V.", [[(n * R_GAS * (T - 273)) / V, "Temperature is already in kelvins."], [(n * T) / V, "Include R = 0.08206 L·atm/(mol·K)."], [(n * 8.314 * T) / V, "With L and atm, use R = 0.08206."]], "atm"), explanation: `P = (${n})(0.08206)(${T})/${V} = ${num(P)} atm.` };
    if (ask === "V") return { stem: `What volume does ${n} mol of gas occupy at ${num(P)} atm and ${T} K?`, ...numOptions(V, "V = nRT/P.", [[(n * R_GAS) / (P * T), "V = nRT/P."], [n * 22.4, "22.4 L/mol applies only at 0 °C and 1 atm."], [(n * 8.314 * T) / P, "Use R = 0.08206 with atm and L."]], "L"), explanation: `V = nRT/P = ${num(V)} L.` };
    return { stem: `How many moles of gas are in a ${V} L flask at ${num(P)} atm and ${T} K?`, ...numOptions(n, "n = PV/RT.", [[P * V * R_GAS * T, "n = PV/(RT): divide by RT."], [(P * V) / T, "Include R."], [V / 22.4, "Conditions are not 0 °C and 1 atm."]], "mol"), explanation: `n = PV/RT = ${num(n)} mol.` };
  }),
  t("ch-partial-pressure", 3, ["ideal-gas-law"], ["5"], 2, (r) => {
    const a = r.int(1, 9) / 10;
    const b = r.int(1, 9) / 10;
    const c = r.int(1, 9) / 10;
    const Pt = r.int(10, 50) / 10;
    const X = a / (a + b + c);
    return {
      stem: `A gas mixture contains ${a} mol N₂, ${b} mol O₂ and ${c} mol Ar at a total pressure of ${Pt} atm. What is the partial pressure of N₂?`,
      ...numOptions(X * Pt, "P(N₂) = X(N₂) × P(total).", [[a * Pt, "Use the mole fraction, not moles."], [Pt / 3, "The gases are not present in equal amounts."], [(a / (b + c)) * Pt, "Divide by total moles."]], "atm"),
      explanation: `X = ${a}/${num(a + b + c, 3)} = ${num(X)}; P = ${num(X * Pt)} atm.`,
    };
  }),
  t("ch-dilution", 3, ["solutions-and-mixtures"], ["5"], 2, (r) => {
    const M1 = r.int(5, 120) / 10;
    const V1 = r.int(5, 100);
    const V2 = V1 + r.int(20, 400);
    const M2 = (M1 * V1) / V2;
    if (r.next() < 0.5) {
      const mol = r.int(5, 200) / 1000;
      const Vml = r.int(50, 1000);
      return { stem: `What is the molarity of a solution made by dissolving ${mol} mol of solute in enough water to make ${Vml} mL of solution?`, ...numOptions(mol / (Vml / 1000), "M = mol ÷ liters.", [[mol / Vml, "Convert mL to L."], [mol * (Vml / 1000), "Divide by volume."], [(Vml / 1000) / mol, "The ratio is inverted."]], "M"), explanation: `${mol} ÷ ${Vml / 1000} L = ${num(mol / (Vml / 1000))} M.` };
    }
    return { stem: `${V1} mL of ${M1} M solution is diluted to ${V2} mL. What is the new concentration?`, ...numOptions(M2, "M₁V₁ = M₂V₂.", [[(M1 * V2) / V1, "Dilution decreases concentration."], [M1 - (M1 * (V2 - V1)) / 1000, "Use M₁V₁ = M₂V₂."], [(M1 * V1) / (V2 - V1), "V₂ is the total final volume."]], "M"), explanation: `M₂ = (${M1})(${V1})/${V2} = ${num(M2)} M.` };
  }),
  t("ch-beer-lambert", 3, ["beer-lambert-law"], ["5"], 2, (r) => {
    const eps = r.int(50, 900);
    const b = r.pick([1, 1, 2]);
    const c = r.int(1, 30) / 10000;
    const A = eps * b * c;
    if (A > 2 || A < 0.05) throw new Retry();
    return {
      stem: `A solution has an absorbance of ${num(A)} in a ${b} cm cuvette. The molar absorptivity is ${eps} M⁻¹cm⁻¹. What is the concentration?`,
      ...numOptions(c, "c = A/(εb).", [[A * eps * b, "Divide A by εb."], [A / eps, b === 1 ? "Recheck." : "Include the path length."], [(eps * b) / A, "The ratio is inverted."]], "M"),
      explanation: `c = ${num(A)}/(${eps} × ${b}) = ${num(c)} M.`,
    };
  }),
  t("ch-photon", 3, ["properties-of-photons", "spectroscopy-and-the-electromagnetic-spectrum"], ["5"], 2, (r) => {
    const nm = r.int(150, 750);
    const E = (6.626e-34 * 3.0e8) / (nm * 1e-9);
    return {
      stem: `What is the energy of a photon with a wavelength of ${nm} nm?`,
      ...numOptions(E, "E = hc/λ, with λ in meters.", [[(6.626e-34 * 3.0e8) / nm, "Convert nm to m."], [6.626e-34 * (nm * 1e-9), "E = hc/λ."], [(6.626e-34 * nm * 1e-9) / 3.0e8, "E = hc/λ."]], "J"),
      explanation: `E = (6.626 × 10⁻³⁴)(3.00 × 10⁸)/(${nm} × 10⁻⁹) = ${num(E)} J.`,
    };
  }),
  t("ch-kmt-speed", 3, ["kinetic-molecular-theory"], ["4"], 2, (r) => {
    const gases = ["H2", "He", "CH4", "N2", "O2", "Ar", "CO2", "Cl2"];
    const g = r.sample(gases, 4);
    const Ms = g.map(molarMass);
    const fast = Ms.indexOf(Math.min(...Ms));
    return {
      stem: `Samples of ${g.map(ce).join(", ")} are all at the same temperature. Which has the highest average molecular speed?`,
      ...options([ce(g[fast]!), "At the same temperature, average kinetic energy is equal, so the lightest gas moves fastest."], g.filter((_, i) => i !== fast).map((x) => [ce(x), `${x} has a larger molar mass (${num(molarMass(x), 3)} g/mol).`] as [string, string])),
      explanation: `Molar masses: ${g.map((x, i) => `${x} ${num(Ms[i]!, 3)}`).join(", ")}.`,
    };
  }),
  pool("ch-imf-pool", 3, ["intermolecular-and-interparticle-forces", "properties-of-solids", "solubility", "separation-of-solutions-and-mixtures", "deviation-from-ideal-gas-law"], ["6"], [
    { stem: "Which substance has the highest boiling point?", right: [ce("H2O"), "Water forms extensive hydrogen bonds."], wrong: [[ce("H2S"), "No hydrogen bonding; weaker forces."], [ce("CH4"), "Only weak dispersion forces."], [ce("Ne"), "Only weak dispersion forces."]] },
    { stem: "Why does I₂ have a higher boiling point than Br₂?", right: ["I₂ has a larger, more polarizable electron cloud, so stronger London dispersion forces", "Dispersion forces grow with polarizability."], wrong: [["I₂ is polar", "Both are nonpolar."], ["I₂ forms hydrogen bonds", "No H atoms."], ["I₂ has stronger covalent bonds", "Boiling does not break covalent bonds."]] },
    { stem: "Which substance is most soluble in hexane (C₆H₁₄)?", right: [ce("C8H18"), "Nonpolar dissolves in nonpolar."], wrong: [[ce("NaCl"), "Ionic compounds dissolve in polar solvents."], [ce("CH3OH"), "Highly polar with hydrogen bonding."], [ce("KNO3"), "Ionic."]] },
    { stem: "Under which conditions does a real gas deviate most from ideal behavior?", right: ["High pressure and low temperature", "Particle volume and attractions matter most."], wrong: [["Low pressure and high temperature", "Gases behave most ideally then."], ["Low pressure and low temperature", "High pressure is also needed."], ["Standard conditions only", "Not specific."]] },
    { stem: "A solid melts at 1,710 °C, is very hard and does not conduct electricity. It is most likely:", right: ["A covalent network solid", "Strong covalent network bonds."], wrong: [["A molecular solid", "Molecular solids melt at low temperatures."], ["A metallic solid", "Metals conduct."], ["An ionic solid that conducts as a solid", "Ionic solids do not conduct as solids."]] },
    { stem: "In paper chromatography with a nonpolar solvent, which component travels farthest?", right: ["The least polar component", "It is most attracted to the nonpolar mobile phase."], wrong: [["The most polar component", "Polar components stay with the polar paper."], ["The heaviest component", "Polarity, not mass, decides."], ["All travel equally", "They separate."]] },
    { stem: "Which intermolecular force is present in all molecules?", right: ["London dispersion forces", "They arise from temporary dipoles in every electron cloud."], wrong: [["Hydrogen bonding", "Requires H bonded to N, O or F."], ["Dipole–dipole forces", "Require polar molecules."], ["Ion–dipole forces", "Require ions."]] },
  ]),
];

/* ---------------- Unit 4 ---------------- */
const REACTIONS: { eq: string; a: string; b: string; p: string; ca: number; cb: number; cp: number }[] = [
  { eq: "2H2 + O2 -> 2H2O", a: "H2", b: "O2", p: "H2O", ca: 2, cb: 1, cp: 2 },
  { eq: "N2 + 3H2 -> 2NH3", a: "N2", b: "H2", p: "NH3", ca: 1, cb: 3, cp: 2 },
  { eq: "CH4 + 2O2 -> CO2 + 2H2O", a: "CH4", b: "O2", p: "CO2", ca: 1, cb: 2, cp: 1 },
  { eq: "2Al + 3Cl2 -> 2AlCl3", a: "Al", b: "Cl2", p: "AlCl3", ca: 2, cb: 3, cp: 2 },
  { eq: "4Fe + 3O2 -> 2Fe2O3", a: "Fe", b: "O2", p: "Fe2O3", ca: 4, cb: 3, cp: 2 },
  { eq: "C3H8 + 5O2 -> 3CO2 + 4H2O", a: "C3H8", b: "O2", p: "CO2", ca: 1, cb: 5, cp: 3 },
  { eq: "2Na + Cl2 -> 2NaCl", a: "Na", b: "Cl2", p: "NaCl", ca: 2, cb: 1, cp: 2 },
];

export const chemUnit4: McqTemplate[] = [
  t("ch-limiting", 4, ["stoichiometry"], ["5"], 3, (r) => {
    const x = r.pick(REACTIONS);
    const ga = r.int(5, 100);
    const gb = r.int(5, 100);
    const na = ga / molarMass(x.a);
    const nb = gb / molarMass(x.b);
    const pa = (na * x.cp) / x.ca;
    const pb = (nb * x.cp) / x.cb;
    const prod = Math.min(pa, pb) * molarMass(x.p);
    if (Math.abs(pa - pb) / Math.max(pa, pb) < 0.1) throw new Retry();
    return {
      stem: `For ${ce(x.eq)}, ${ga} g of ${ce(x.a)} reacts with ${gb} g of ${ce(x.b)}. What mass of ${ce(x.p)} can form?`,
      ...numOptions(prod, `${pa < pb ? x.a : x.b} is the limiting reactant.`, [[Math.max(pa, pb) * molarMass(x.p), "Use the limiting reactant, which gives less product."], [ga + gb, "Not all of both reactants reacts."], [Math.min(na, nb) * molarMass(x.p), "Apply the mole ratio from the equation."]], "g"),
      explanation: `${x.a}: ${num(na)} mol → ${num(pa)} mol ${x.p}; ${x.b}: ${num(nb)} mol → ${num(pb)} mol. ${num(Math.min(pa, pb))} mol × ${num(molarMass(x.p), 4)} = ${num(prod)} g.`,
    };
  }),
  t("ch-titration", 4, ["introduction-to-titration"], ["5"], 2, (r) => {
    const acid = r.pick([["HCl", 1], ["HNO3", 1], ["H2SO4", 2]] as const);
    const Mb = r.int(50, 300) / 1000;
    const Vb = r.int(100, 450) / 10;
    const Va = r.int(100, 500) / 10;
    const Ma = (Mb * Vb) / (acid[1] * Va);
    return {
      stem: `A ${Va} mL sample of ${ce(acid[0])} is titrated to the equivalence point with ${Vb} mL of ${num(Mb)} M NaOH. What is the concentration of the acid?`,
      ...numOptions(Ma, acid[1] === 2 ? "Each H₂SO₄ reacts with two OH⁻, so divide the moles of NaOH by 2." : "Moles of acid = moles of NaOH at equivalence.", [[(Mb * Vb) / Va, acid[1] === 2 ? "H₂SO₄ is diprotic." : "Recheck."], [(Mb * Va) / Vb, "M_a = M_b V_b / V_a."], [(2 * Mb * Vb) / Va, "Check the mole ratio."]], "M"),
      explanation: `mol OH⁻ = ${num(Mb * Vb / 1000)}; mol acid = ${num((Mb * Vb) / 1000 / acid[1])}; ÷ ${Va / 1000} L = ${num(Ma)} M.`,
    };
  }),
  t("ch-oxidation-number", 4, ["oxidation-reduction-redox-reactions"], ["1"], 2, (r) => {
    const items: [string, string, number][] = [["SO4^{2-}", "S", 6], ["Cr2O7^{2-}", "Cr", 6], ["MnO4^-", "Mn", 7], ["NO3^-", "N", 5], ["NH3", "N", -3], ["H2O2", "O", -1], ["ClO3^-", "Cl", 5], ["Fe2O3", "Fe", 3], ["PO4^{3-}", "P", 5], ["SO2", "S", 4], ["CO3^{2-}", "C", 4], ["NO2", "N", 4], ["CH4", "C", -4], ["H2S", "S", -2]];
    const [sp, el, ox] = r.pick(items);
    const fmt = (x: number) => (x > 0 ? `+${x}` : String(x));
    return {
      stem: `What is the oxidation number of ${el} in ${ce(sp)}?`,
      ...options([fmt(ox), "The oxidation numbers must sum to the species' overall charge (O usually −2, H usually +1)."], [ox + 2, ox - 2, -ox, ox + 1].filter((v, i, a) => v !== ox && a.indexOf(v) === i).slice(0, 3).map((v) => [fmt(v), "Make the oxidation numbers add up to the overall charge."] as [string, string])),
      explanation: `${el} in ${sp}: ${fmt(ox)}.`,
    };
  }),
  t("ch-percent-yield", 4, ["stoichiometry"], ["5"], 1, (r) => {
    const theo = r.int(50, 400) / 10;
    const act = Number((theo * r.int(55, 98) / 100).toFixed(1));
    return {
      stem: `A reaction has a theoretical yield of ${theo} g. The actual yield is ${act} g. What is the percent yield?`,
      ...numOptions((act / theo) * 100, "Actual ÷ theoretical × 100%.", [[(theo / act) * 100, "The ratio is inverted."], [theo - act, "Divide, do not subtract."], [act / theo, "Multiply by 100%."]], "\\%"),
      explanation: `${act} ÷ ${theo} × 100% = ${num((act / theo) * 100)}%.`,
    };
  }),
  pool("ch-reactions-pool", 4, ["net-ionic-equations", "types-of-chemical-reactions", "introduction-to-acid-base-reactions", "physical-and-chemical-changes", "representations-of-reactions"], ["1"], [
    { stem: "What is the net ionic equation for mixing aqueous AgNO₃ and NaCl?", right: [ce("Ag+(aq) + Cl-(aq) -> AgCl(s)"), "Na⁺ and NO₃⁻ are spectator ions."], wrong: [[ce("AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)"), "That is the molecular equation."], [ce("Na+(aq) + NO3-(aq) -> NaNO3(s)"), "NaNO₃ is soluble."], [ce("Ag+(aq) + NO3-(aq) -> AgNO3(s)"), "AgNO₃ is soluble."]] },
    { stem: "In HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺, which species is the Brønsted–Lowry base?", right: [ce("H2O"), "Water accepts a proton."], wrong: [[ce("HCO3-"), "It donates a proton here."], [ce("CO3^{2-}"), "That is the conjugate base."], [ce("H3O+"), "That is the conjugate acid."]] },
    { stem: "Which reaction is an oxidation–reduction reaction?", right: [ce("Zn + Cu^{2+} -> Zn^{2+} + Cu"), "Oxidation numbers change."], wrong: [[ce("HCl + NaOH -> NaCl + H2O"), "No oxidation numbers change."], [ce("AgNO3 + NaCl -> AgCl + NaNO3"), "Precipitation, not redox."], [ce("CaCO3 -> CaO + CO2"), "No oxidation numbers change."]] },
    { stem: "Which is a physical change?", right: ["Water boiling at 100 °C", "Only intermolecular forces are overcome."], wrong: [["Iron rusting", "New substance forms."], ["Methane burning", "Bonds break and form."], ["Baking soda reacting with vinegar", "Gas forms from a reaction."]] },
    { stem: "How should acetic acid be written in a net ionic equation?", right: [ce("CH3COOH(aq)") + ", as a whole molecule", "It is a weak acid and mostly un-ionized."], wrong: [["As H⁺ and CH₃COO⁻ ions", "Weak acids are not split."], ["It is always omitted as a spectator", "It reacts."], ["As CH₃⁺ and COOH⁻", "Not its ions."]] },
  ]),
];
