/* AP Biology multiple choice: computed data questions plus written concept pools. */
import { options } from "./csa-lib";
import type { Rng } from "./lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({ key, unit, topics, skills, difficulty, calc: false, gen });
const r2 = (x: number) => Math.round(x * 100) / 100;

interface Item {
  stem: string;
  right: [string, string];
  wrong: [string, string][];
}
const pool = (key: string, unit: number, topics: string[], skills: string[], items: Item[]): McqTemplate =>
  t(key, unit, topics, skills, 2, (r) => {
    const it = r.pick(items);
    return { stem: it.stem, ...options(it.right, it.wrong), explanation: it.right[1] };
  });

const COMP: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
const RNA: Record<string, string> = { A: "U", T: "A", G: "C", C: "G" };
const randDna = (r: Rng, n: number) => Array.from({ length: n }, () => r.pick(["A", "T", "G", "C"])).join("");
const CODONS: Record<string, string> = {
  AUG: "Met", UUU: "Phe", UUC: "Phe", GCU: "Ala", GCC: "Ala", AAA: "Lys", AAG: "Lys", UGG: "Trp", GGC: "Gly", GGU: "Gly",
  CCU: "Pro", CCA: "Pro", GAA: "Glu", GAG: "Glu", UCU: "Ser", AGC: "Ser", CAU: "His", UAU: "Tyr", UAA: "stop", UAG: "stop", UGA: "stop",
};
const CODON_TABLE = (used: string[]) => ({
  caption: "Selected codons",
  columns: [{ key: "c", label: "mRNA codon" }, { key: "a", label: "Amino acid" }],
  rows: [...new Set(used)].sort().map((c) => ({ c, a: CODONS[c]! })),
});

/* ---------------- Unit 1 ---------------- */
export const bioUnit1: McqTemplate[] = [
  t("bio-chargaff", 1, ["nucleic-acids"], ["4"], 2, (r) => {
    const base = r.pick(["adenine", "thymine", "guanine", "cytosine"]);
    const p = r.int(12, 38);
    const partner = { adenine: "thymine", thymine: "adenine", guanine: "cytosine", cytosine: "guanine" }[base]!;
    const other = base === "adenine" || base === "thymine" ? r.pick(["guanine", "cytosine"]) : r.pick(["adenine", "thymine"]);
    const ans = (100 - 2 * p) / 2;
    return {
      stem: `A sample of double-stranded DNA is ${p}% ${base}. What percentage of the bases are ${other}?`,
      ordered: true,
      ...options([`${ans}%`, `${partner} also makes up ${p}%; the remaining ${100 - 2 * p}% is split equally between the other two bases.`], [
        [`${p}%`, `${p}% is the amount of ${partner}, which pairs with ${base}.`],
        [`${100 - p}%`, "Both members of each base pair must be accounted for."],
        [`${100 - 2 * p}%`, "That is the total for both remaining bases together."],
        [`${ans / 2}%`, "Each remaining base is half of what is left."],
      ]),
      explanation: `By base pairing, ${base} = ${partner} = ${p}%. The other two bases share ${100 - 2 * p}%, so each is ${ans}%.`,
    };
  }),
  t("bio-dehydration-count", 1, ["introduction-to-biological-macromolecules"], ["1"], 2, (r) => {
    const n = r.int(12, 300);
    const [poly, mono] = r.pick([["polypeptide", "amino acids"], ["polysaccharide", "glucose molecules"], ["nucleic acid strand", "nucleotides"]] as const);
    const hydro = r.next() < 0.5;
    return {
      stem: hydro ? `A linear ${poly} made of ${n} ${mono} is completely hydrolyzed. How many water molecules are consumed?` : `${n} ${mono} are joined into one linear ${poly} by dehydration synthesis. How many water molecules are released?`,
      ordered: true,
      ...options([String(n - 1), `A chain of ${n} monomers has ${n - 1} bonds, and each bond involves one water molecule.`], [
        [String(n), "There is one fewer bond than monomers in a linear chain."],
        [String(n + 1), "There is one fewer bond than monomers."],
        [String(2 * (n - 1)), "Each bond involves one water molecule, not two."],
      ]),
      explanation: `Linking ${n} monomers forms ${n - 1} bonds; each ${hydro ? "is broken using" : "releases"} one water molecule.`,
    };
  }),
  pool("bio-u1-concepts", 1, ["structure-of-water-and-hydrogen-bonding", "properties-of-biological-macromolecules", "structure-and-function-of-biological-macromolecules", "elements-of-life"], ["1"], [
    { stem: "Which property of water results most directly from hydrogen bonding between water molecules?", right: ["High specific heat", "Many hydrogen bonds must be broken to raise water's temperature."], wrong: [["Water's ability to dissolve nonpolar oils", "Water does not dissolve nonpolar substances well."], ["The covalent bonds within each water molecule", "Those are within one molecule, not between molecules."], ["Water's low density as a gas", "That is not explained by hydrogen bonding."]] },
    { stem: "A researcher supplies cells with radioactive nitrogen. Which molecules will become labeled?", right: ["Proteins and nucleic acids", "Nitrogen is in amino groups and nitrogenous bases."], wrong: [["Carbohydrates and fatty acids", "These contain only C, H and O."], ["Only phospholipids", "Phospholipids contain phosphorus, but proteins and nucleic acids hold most nitrogen."], ["Only water", "Water contains no nitrogen."]] },
    { stem: "Which change would most likely disrupt the tertiary structure of a protein?", right: ["A change in pH that alters the charges on R groups", "Tertiary structure depends on R-group interactions, including ionic bonds."], wrong: [["Adding more of the same protein to the solution", "Concentration does not change folding."], ["Breaking a covalent bond within the sugar-phosphate backbone", "That is in nucleic acids, not proteins."], ["Adding a glucose molecule to the solution", "Glucose does not disrupt protein folding."]] },
    { stem: "Why are phospholipids able to form bilayers in water?", right: ["They have hydrophilic heads and hydrophobic tails", "Tails cluster away from water and heads face it."], wrong: [["They are entirely hydrophobic", "The phosphate head is hydrophilic."], ["They form peptide bonds with each other", "Peptide bonds join amino acids."], ["They are polymers of glucose", "Phospholipids are not carbohydrates."]] },
    { stem: "Cellulose and starch are both polymers of glucose, yet humans digest starch but not cellulose. Which best explains this?", right: ["The glucose monomers are linked differently, so human enzymes do not fit cellulose's bonds", "Enzyme specificity depends on bond and molecular shape."], wrong: [["Cellulose contains nitrogen", "Both contain only C, H and O."], ["Starch is a protein", "Starch is a carbohydrate."], ["Cellulose is made of amino acids", "Cellulose is made of glucose."]] },
    { stem: "Which feature allows carbon to form the backbone of diverse biological molecules?", right: ["It can form four covalent bonds, building chains, branches and rings", "Carbon's bonding versatility allows many structures."], wrong: [["It forms ionic bonds with hydrogen", "Carbon–hydrogen bonds are covalent."], ["It is the most abundant element in water", "Water contains no carbon."], ["It cannot bond with oxygen", "Carbon readily bonds with oxygen."]] },
  ]),
];

/* ---------------- Unit 2 ---------------- */
export const bioUnit2: McqTemplate[] = [
  t("bio-sa-v", 2, ["cell-size"], ["5"], 2, (r) => {
    const [a, b] = [r.int(1, 4), r.int(5, 10)];
    const ra = 6 / a;
    const rb = 6 / b;
    return {
      stem: `Two cube-shaped cells have side lengths of ${a} µm and ${b} µm. Which statement correctly compares their surface area-to-volume ratios?`,
      ...options([`The ${a} µm cell has a ratio of ${r2(ra)}, which is greater than the ${b} µm cell's ${r2(rb)}, so it exchanges materials more efficiently`, "For a cube, SA:V = 6s²/s³ = 6/s."], [
        [`The ${b} µm cell has the greater ratio, ${r2(6 * b)}, so it exchanges materials more efficiently`, "SA:V decreases as size increases."],
        [`Both cells have the same ratio, 6, because both are cubes`, "The ratio depends on side length."],
        [`The ${a} µm cell has a ratio of ${r2(ra)}, which is greater, so it exchanges materials less efficiently`, "A greater ratio means more surface per unit volume: more efficient exchange."],
      ]),
      explanation: `SA:V = 6/s: ${r2(ra)} for ${a} µm and ${r2(rb)} for ${b} µm. Smaller cells have more surface area per unit volume.`,
    };
  }),
  t("bio-solute-potential", 2, ["tonicity-and-osmoregulation"], ["5"], 3, (r) => {
    const [solute, i] = r.pick([["sucrose", 1], ["glucose", 1], ["NaCl", 2], ["CaCl₂", 3]] as const);
    const C = r.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5]);
    const Tc = r.pick([20, 22, 25, 27]);
    const T = Tc + 273;
    const v = -i * C * 0.0831 * T;
    return {
      stem: `Calculate the solute potential of a ${C} M ${solute} solution at ${Tc} °C. Use Ψs = −iCRT, with R = 0.0831 L·bar/(mol·K).`,
      ordered: true,
      ...options([`${r2(v)} bars`, `i = ${i}, T = ${T} K: −(${i})(${C})(0.0831)(${T}).`], [
        [`${r2(-i * C * 0.0831 * Tc)} bars`, "Temperature must be in kelvins (add 273)."],
        [`${r2(-C * 0.0831 * T)} bars`, `${solute} has an ionization constant of ${i}.`],
        [`${r2(-v)} bars`, "Solute potential is negative: adding solute lowers water potential."],
        [`${r2(v * 2)} bars`, "Recheck the ionization constant."],
      ]),
      explanation: `Ψs = −(${i})(${C})(0.0831)(${T}) = ${r2(v)} bars.`,
    };
  }),
  t("bio-water-movement", 2, ["tonicity-and-osmoregulation", "membrane-transport"], ["2"], 2, (r) => {
    const cell = -r2(r.int(3, 9) / 10 + r.int(0, 9) / 100);
    let sol = -r2(r.int(1, 12) / 10);
    if (sol === cell) sol = r2(sol - 0.2);
    const into = sol > cell;
    return {
      stem: `A plant cell has a water potential of ${cell} MPa. It is placed in a solution with a water potential of ${sol} MPa. Which describes the net movement of water?`,
      ...options([into ? "Into the cell, because water moves toward the lower (more negative) water potential" : "Out of the cell, because water moves toward the lower (more negative) water potential", `Water moves from ${into ? sol : cell} MPa to ${into ? cell : sol} MPa.`], [
        [into ? "Out of the cell, because the cell has the lower water potential" : "Into the cell, because the cell has the higher water potential", "Water moves from higher to lower water potential."],
        ["No net movement, because water potential does not affect osmosis", "Differences in water potential drive osmosis."],
        [into ? "Into the cell, because water moves toward higher water potential" : "Out of the cell, because water moves toward higher water potential", "Water moves toward lower water potential."],
      ]),
      explanation: `Water flows from higher to lower water potential: from ${into ? "the solution into the cell" : "the cell into the solution"}.`,
    };
  }),
  pool("bio-u2-concepts", 2, ["subcellular-components", "plasma-membranes", "membrane-permeability", "facilitated-diffusion", "mechanisms-of-transport", "origins-of-cell-compartmentalization", "cell-compartmentalization"], ["1"], [
    { stem: "A cell secretes large amounts of a digestive enzyme. Which organelles would be most abundant?", right: ["Rough endoplasmic reticulum and Golgi complex", "Secreted proteins are made on the rough ER and processed by the Golgi."], wrong: [["Smooth ER and lysosomes", "Smooth ER makes lipids."], ["Chloroplasts and central vacuoles", "Those are for photosynthesis and storage."], ["Free ribosomes only", "Free ribosomes make cytosolic proteins."]] },
    { stem: "Which molecule can diffuse directly across a phospholipid bilayer most easily?", right: ["O₂", "Small nonpolar molecules pass through the hydrophobic core."], wrong: [["Glucose", "Glucose is large and polar."], ["Na⁺", "Ions are repelled by the hydrophobic core."], ["A protein", "Proteins are too large."]] },
    { stem: "The rate of glucose uptake into a cell increases with glucose concentration but levels off at high concentrations, and no ATP is used. What explains this?", right: ["Facilitated diffusion through a limited number of carrier proteins", "Carriers become saturated."], wrong: [["Simple diffusion through the bilayer", "That would not level off."], ["Active transport by a pump", "No ATP is used."], ["Exocytosis", "That releases materials."]] },
    { stem: "Which observation supports the endosymbiotic origin of mitochondria?", right: ["Mitochondria have circular DNA and ribosomes similar to those of bacteria", "These are prokaryote-like features."], wrong: [["Mitochondria are found only in plant cells", "They are found in nearly all eukaryotes."], ["Mitochondria are made in the Golgi complex", "They divide on their own."], ["Mitochondria have a single membrane", "They have a double membrane."]] },
    { stem: "A drug blocks the sodium–potassium pump in intestinal cells. Why does glucose uptake by sodium–glucose cotransport decrease?", right: ["The sodium gradient that powers the cotransporter runs down", "Cotransport relies on the gradient built by the pump."], wrong: [["The drug directly binds glucose", "The pump is the target."], ["Glucose begins diffusing out through the bilayer", "Glucose cannot cross the bilayer."], ["The cotransporter starts using ATP instead", "Cotransporters use ion gradients."]] },
    { stem: "What is the main advantage of membrane-bound compartments in eukaryotic cells?", right: ["Different chemical reactions can occur at the same time under different conditions", "Compartments separate incompatible processes."], wrong: [["They make cells smaller", "They do not reduce size."], ["They eliminate the need for enzymes", "Enzymes are still needed."], ["They prevent all molecules from moving", "Transport still occurs between compartments."]] },
    { stem: "Which part of a transmembrane protein is most likely to be made of nonpolar amino acids?", right: ["The region that spans the hydrophobic interior of the membrane", "Nonpolar R groups interact with lipid tails."], wrong: [["The region facing the cytoplasm", "That region faces water."], ["The region facing the extracellular fluid", "That region faces water."], ["The carbohydrate chain attached to it", "Carbohydrates are polar."]] },
  ]),
];

/* ---------------- Unit 3 ---------------- */
export const bioUnit3: McqTemplate[] = [
  t("bio-enzyme-rate", 3, ["enzyme-catalysis"], ["5"], 2, (r) => {
    const rate = r.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6]);
    const times = [0, 2, 4, 6, 8, 10];
    const prod = times.map((x, i) => (i < 5 ? r2(rate * x) : r2(rate * 8 + 0.1)));
    const [a, b] = r.pick([[1, 3], [2, 4], [1, 4], [0, 3]] as const);
    const val = r2((prod[b]! - prod[a]!) / (times[b]! - times[a]!));
    return {
      stimulus: { text: "An enzyme was mixed with its substrate and the product concentration was measured.", table: { caption: "Product concentration over time", columns: [{ key: "t", label: "Time (min)" }, { key: "p", label: "Product (mM)" }], rows: times.map((x, i) => ({ t: x, p: prod[i]! })) } },
      stem: `What is the average rate of product formation between ${times[a]} and ${times[b]} minutes?`,
      ordered: true,
      ...options([`${val} mM/min`, "Rate is the change in product divided by the change in time."], [
        [`${r2(prod[b]! / times[b]!)} mM/min`, "Use the change between the two times."],
        [`${r2((prod[b]! - prod[a]!))} mM/min`, "Divide by the time elapsed."],
        [`${r2(val * 2)} mM/min`, "Recheck the time interval."],
        [`${r2((times[b]! - times[a]!) / (prod[b]! - prod[a]!))} mM/min`, "Rate is Δproduct ÷ Δtime, not the inverse."],
      ]),
      explanation: `(${prod[b]} − ${prod[a]}) ÷ (${times[b]} − ${times[a]}) = ${val} mM/min.`,
    };
  }),
  t("bio-enzyme-temp", 3, ["environmental-impacts-on-enzyme-function"], ["4"], 3, (r) => {
    const opt = r.pick([30, 35, 40, 45, 50]);
    const temps = [opt - 30, opt - 20, opt - 10, opt, opt + 10, opt + 20];
    const max = r.int(40, 80);
    const rates = [0.25, 0.5, 0.8, 1, 0.45, 0.05].map((f) => Math.round(max * f));
    return {
      stimulus: { text: "The activity of an enzyme was measured at different temperatures.", table: { caption: "Enzyme activity", columns: [{ key: "t", label: "Temperature (°C)" }, { key: "r", label: "Rate (µmol/min)" }], rows: temps.map((x, i) => ({ t: x, r: rates[i]! })) } },
      stem: `Which best explains the change in rate between ${opt} °C and ${opt + 20} °C?`,
      ...options(["High temperature disrupted the enzyme's shape, so fewer active sites could bind substrate", "Above the optimum, the enzyme denatures."], [
        ["Molecules moved more slowly, so there were fewer collisions", "Molecules move faster at higher temperatures."],
        ["The substrate was used up at high temperatures", "The drop reflects the enzyme, not the supply of substrate."],
        ["The enzyme's activation energy increased because more substrate was added", "Activation energy is not changed by adding substrate."],
      ]),
      explanation: `The rate peaks at ${opt} °C and falls sharply above it, consistent with denaturation of the enzyme.`,
    };
  }),
  pool("bio-u3-concepts", 3, ["enzyme-structure", "environmental-impacts-on-enzyme-function", "cellular-energy", "photosynthesis", "cellular-respiration", "fitness"], ["1"], [
    { stem: "An inhibitor reduces an enzyme's rate, but adding a large amount of substrate restores the maximum rate. What kind of inhibitor is it?", right: ["Competitive", "Excess substrate outcompetes an inhibitor for the active site."], wrong: [["Noncompetitive", "Extra substrate cannot overcome allosteric inhibition."], ["A denaturing agent", "Denaturation is not reversed by substrate."], ["A cofactor", "Cofactors help enzymes work."]] },
    { stem: "Where in the chloroplast is ATP made during photosynthesis?", right: ["At ATP synthase in the thylakoid membrane, as H⁺ flows out of the thylakoid space", "Chemiosmosis in the light reactions makes ATP."], wrong: [["In the stroma by the Calvin cycle", "The Calvin cycle uses ATP."], ["In the outer membrane", "ATP synthase is in the thylakoid membrane."], ["In the cytoplasm by glycolysis", "That is in respiration."]] },
    { stem: "What is the source of the O₂ released by photosynthesis?", right: ["Water split by photosystem II", "Electrons from water replace those lost by photosystem II."], wrong: [["CO₂ fixed in the Calvin cycle", "The O₂ comes from water."], ["Glucose", "Glucose is a product."], ["ATP", "ATP contains no free O₂."]] },
    { stem: "Cyanide blocks the final protein of the electron transport chain in mitochondria. Which is the most immediate effect?", right: ["The proton gradient is no longer maintained, so ATP synthase makes much less ATP", "Electrons cannot pass to oxygen, so pumping stops."], wrong: [["Glycolysis stops immediately", "Glycolysis can continue briefly."], ["More ATP is produced", "ATP production falls."], ["Oxygen consumption increases", "Oxygen is no longer reduced."]] },
    { stem: "Why can yeast continue to make some ATP without oxygen?", right: ["Fermentation regenerates NAD⁺ so glycolysis can continue", "Glycolysis needs NAD⁺ to keep running."], wrong: [["The Krebs cycle runs without oxygen", "It depends on NAD⁺ from the electron transport chain."], ["Fermentation produces more ATP than respiration", "It produces far less."], ["Yeast uses light energy", "Yeast is not photosynthetic."]] },
    { stem: "A molecule makes the inner mitochondrial membrane leaky to protons. What is the effect?", right: ["Energy from electron transport is released as heat instead of making ATP", "The gradient dissipates without passing through ATP synthase."], wrong: [["ATP production increases", "The gradient is lost."], ["Electron transport stops completely", "Electron transport can continue."], ["Glycolysis stops", "Glycolysis is unaffected directly."]] },
    { stem: "Organisms in cold environments often have membranes with more unsaturated fatty acids. How does this increase fitness?", right: ["Kinks in unsaturated tails keep membranes fluid at low temperatures", "Fluid membranes keep transport working."], wrong: [["Unsaturated fats store more energy than saturated fats", "Storage is not the reason."], ["Unsaturated fats make membranes rigid", "They make membranes more fluid."], ["Unsaturated fatty acids are proteins", "They are lipids."]] },
    { stem: "How does an enzyme speed up a reaction?", right: ["It lowers the activation energy", "Enzymes lower the energy barrier without changing ΔG."], wrong: [["It increases the energy released by the reaction", "ΔG is unchanged."], ["It is used up as a reactant", "Enzymes are not consumed."], ["It raises the temperature of the cell", "Enzymes do not heat the cell."]] },
  ]),
];

/* ---------------- Unit 4 ---------------- */
export const bioUnit4: McqTemplate[] = [
  t("bio-cell-cycle-counts", 4, ["cell-cycle"], ["5"], 2, (r) => {
    const n2 = r.pick([8, 12, 14, 16, 20, 24, 46]);
    const phase = r.pick(["G1", "G2", "metaphase of mitosis", "each daughter cell after cytokinesis"]);
    const chrom = n2;
    const chromatids = phase === "G1" || phase.startsWith("each") ? n2 : n2 * 2;
    return {
      stem: `A diploid cell has ${n2} chromosomes (2n = ${n2}). How many chromatids are present in ${phase === "each daughter cell after cytokinesis" ? phase : `the cell during ${phase}`}?`,
      ordered: true,
      ...options([String(chromatids), phase === "G1" || phase.startsWith("each") ? "Before S phase (and after division) each chromosome is a single chromatid." : "After S phase each chromosome has two sister chromatids."], [
        [String(chromatids === chrom ? chrom * 2 : chrom), "Check whether DNA has been replicated at this point."],
        [String(chrom / 2), "Mitosis does not halve the chromosome number."],
        [String(chrom * 4), "Replication doubles the chromatids only once."],
      ]),
      explanation: `${n2} chromosomes; chromatid count is ${chromatids} in ${phase}.`,
    };
  }),
  pool("bio-u4-concepts", 4, ["cell-communication", "introduction-to-signal-transduction", "signal-transduction", "changes-in-signal-transduction-pathways", "feedback", "regulation-of-cell-cycle"], ["1", "6"], [
    { stem: "A steroid hormone affects target cells but not other cells. Which best explains this?", right: ["Only target cells contain the specific intracellular receptor", "Responses require the right receptor."], wrong: [["Only target cells have a plasma membrane", "All cells do."], ["The hormone cannot cross membranes", "Steroids cross membranes."], ["Other cells destroy the hormone immediately", "Specificity comes from receptors."]] },
    { stem: "A mutation causes a G protein to remain permanently active. What is the most likely effect?", right: ["The response continues even without the signal", "Downstream steps stay switched on."], wrong: [["The cell can no longer bind the ligand", "Binding is upstream of the G protein."], ["The response is permanently off", "An active G protein turns the pathway on."], ["The cell undergoes immediate meiosis", "That is unrelated."]] },
    { stem: "How does a phosphorylation cascade amplify a signal?", right: ["Each activated kinase activates many molecules at the next step", "Each step multiplies the number of active molecules."], wrong: [["Each ligand binds many receptors", "One ligand binds one receptor."], ["Phosphatases add phosphate groups", "Phosphatases remove them."], ["The cascade produces more ligand", "It produces a response, not ligand."]] },
    { stem: "Blood glucose rises after a meal, insulin is released and glucose falls. What does this illustrate?", right: ["Negative feedback", "The response reverses the change."], wrong: [["Positive feedback", "Positive feedback amplifies a change."], ["Signal amplification only", "This is a feedback loop."], ["Quorum sensing", "That is bacterial communication."]] },
    { stem: "Which is an example of positive feedback?", right: ["Oxytocin increases contractions during childbirth, which causes more oxytocin release", "The response amplifies the stimulus."], wrong: [["Sweating when body temperature rises", "That is negative feedback."], ["Glucagon release when blood glucose falls", "That is negative feedback."], ["Shivering when body temperature falls", "That is negative feedback."]] },
    { stem: "A cell with damaged DNA is stopped at the G1 checkpoint. Which protein is most directly responsible?", right: ["A tumor suppressor such as p53", "p53 halts the cycle or triggers apoptosis when DNA is damaged."], wrong: [["A cyclin that has accumulated", "Cyclins push the cycle forward."], ["DNA polymerase", "It replicates DNA."], ["A G protein-coupled receptor", "It receives external signals."]] },
    { stem: "Why can cells divide uncontrollably when a gene for a growth-factor receptor is mutated so the receptor is always active?", right: ["The cell behaves as if it is always receiving signals to divide", "A constitutively active receptor drives division without the signal."], wrong: [["The cell can no longer replicate DNA", "Replication still occurs."], ["The receptor stops all signaling", "It is always active."], ["The cell enters G0 permanently", "It divides instead."]] },
    { stem: "Bacteria release a signaling molecule and begin forming a biofilm only when the population is dense. What is this called?", right: ["Quorum sensing", "Signals accumulate to a threshold at high density."], wrong: [["Endocrine signaling", "That uses hormones in animals."], ["Apoptosis", "That is programmed cell death."], ["Binary fission", "That is cell division."]] },
  ]),
];

/* ---------------- Unit 5 ---------------- */
const CRIT = { 1: 3.84, 2: 5.99, 3: 7.81 } as Record<number, number>;
export const bioUnit5: McqTemplate[] = [
  t("bio-cross-probability", 5, ["mendelian-genetics"], ["5"], 3, (r) => {
    const forms = [
      { stem: "AaBb × AaBb", ask: "aabb", p: [1, 16] },
      { stem: "AaBb × AaBb", ask: "A_B_ (both dominant phenotypes)", p: [9, 16] },
      { stem: "AaBb × aabb", ask: "Aabb", p: [1, 4] },
      { stem: "AaBbCc × AaBbCc", ask: "aabbcc", p: [1, 64] },
      { stem: "AaBb × Aabb", ask: "aabb", p: [1, 8] },
      { stem: "AaBb × AaBb", ask: "AaBb", p: [1, 4] },
    ];
    const f = r.pick(forms);
    const all = ["1/16", "9/16", "1/4", "1/64", "1/8", "3/16", "1/2", "3/8"];
    const right = `${f.p[0]}/${f.p[1]}`;
    return {
      stem: `Assuming independent assortment, what is the probability that a cross of ${f.stem} produces an offspring with the genotype or phenotype ${f.ask}?`,
      ...options([right, "Find the probability for each gene, then multiply (product rule)."], r.shuffle(all.filter((x) => x !== right)).map((x) => [x, "Multiply the separate probabilities for each gene."] as [string, string])),
      explanation: `Treat each gene separately, then multiply: the probability is ${right}.`,
    };
  }),
  t("bio-chi-square", 5, ["mendelian-genetics"], ["5"], 4, (r) => {
    const tot = r.pick([160, 200, 240, 320, 400]);
    const ratio = r.pick([[3, 1], [1, 1], [9, 3, 3, 1], [1, 2, 1]]);
    const sum = ratio.reduce((a, b) => a + b, 0);
    const exp = ratio.map((x) => (tot * x) / sum);
    const obs = exp.map((e) => Math.max(1, Math.round(e + r.int(-1, 1) * r.int(0, Math.ceil(e * 0.25)))));
    const diff = tot - obs.reduce((a, b) => a + b, 0);
    obs[0] = obs[0]! + diff;
    if (obs.some((x) => x <= 0)) throw new Retry();
    const chi = exp.reduce((s, e, i) => s + (obs[i]! - e) ** 2 / e, 0);
    const df = ratio.length - 1;
    const crit = CRIT[df]!;
    if (Math.abs(chi - crit) < 0.3) throw new Retry();
    const reject = chi > crit;
    return {
      stem: `A cross is expected to produce offspring in a ${ratio.join(" : ")} ratio. The observed counts are ${obs.join(", ")} (total ${tot}). Using a chi-square test at p = 0.05 (critical values: 3.84 for 1 df, 5.99 for 2 df, 7.81 for 3 df), which conclusion is correct?`,
      ...options([`χ² ≈ ${r2(chi)}; ${reject ? "reject" : "fail to reject"} the null hypothesis`, `With ${df} df the critical value is ${crit}; χ² is ${reject ? "greater" : "less"}, so ${reject ? "the deviation is unlikely to be due to chance" : "the deviation can be explained by chance"}.`], [
        [`χ² ≈ ${r2(chi)}; ${reject ? "fail to reject" : "reject"} the null hypothesis`, `Compare χ² with the critical value ${crit}.`],
        [`χ² ≈ ${r2(exp.reduce((s, e, i) => s + (obs[i]! - e) ** 2 / obs[i]!, 0) + 0.01)}; ${reject ? "reject" : "fail to reject"} the null hypothesis`, "Divide by the expected count, not the observed count."],
        [`χ² ≈ ${r2(chi)}; the data prove the hypothesis is true`, "A chi-square test cannot prove a hypothesis."],
      ]),
      explanation: `Expected counts: ${exp.map(r2).join(", ")}. χ² = Σ(o − e)²/e ≈ ${r2(chi)} with ${df} df, compared with ${crit}.`,
    };
  }),
  t("bio-gametes", 5, ["meiosis-and-genetic-diversity", "meiosis"], ["5"], 2, (r) => {
    const n = r.int(3, 8);
    return {
      stem: `An organism has a diploid number of ${2 * n}. Ignoring crossing over, how many genetically different gametes can it produce by independent assortment?`,
      ordered: true,
      ...options([String(2 ** n), `With ${n} homologous pairs, there are 2^${n} combinations.`], [
        [String(2 * n), "Combinations multiply: each pair has 2 orientations."],
        [String(2 ** (2 * n)), `The number of pairs is ${n}, not ${2 * n}.`],
        [String(n ** 2), "The count is 2 raised to the number of pairs."],
      ]),
      explanation: `n = ${n} pairs, each with two orientations at metaphase I: 2^${n} = ${2 ** n}.`,
    };
  }),
  t("bio-x-linked", 5, ["non-mendelian-genetics"], ["5"], 3, (r) => {
    const mom = r.pick(["carrier", "affected"]);
    const dad = r.pick(["affected", "unaffected"]);
    const child = r.pick(["son", "daughter"]);
    const pMomRec = mom === "carrier" ? 0.5 : 1;
    let p: number;
    if (child === "son") p = pMomRec;
    else p = dad === "affected" ? pMomRec : 0;
    const frac = p === 1 ? "1" : p === 0.5 ? "1/2" : "0";
    return {
      stem: `A recessive trait is X-linked. ${mom === "affected" ? "An" : "A"} ${mom} woman and an ${dad} man have a ${child}. What is the probability that the ${child} is affected?`,
      ...options([frac, child === "son" ? "Sons receive their X from their mother only." : "Daughters need a recessive X from each parent."], ["0", "1/4", "1/2", "1", "3/4"].filter((x) => x !== frac).map((x) => [x, "Track which X each parent can pass on."] as [string, string])),
      explanation: child === "son" ? `A son's X comes from his ${mom} mother, so the probability is ${frac}.` : `A daughter gets the father's only X (${dad === "affected" ? "recessive" : "dominant"}) and one of the mother's: probability ${frac}.`,
    };
  }),
  pool("bio-u5-concepts", 5, ["meiosis", "non-mendelian-genetics", "environmental-effects-on-phenotype", "chromosomal-inheritance"], ["1"], [
    { stem: "In which stage do homologous chromosomes separate?", right: ["Anaphase I of meiosis", "Meiosis I separates homologs."], wrong: [["Anaphase II of meiosis", "Sister chromatids separate then."], ["Anaphase of mitosis", "Sister chromatids separate in mitosis."], ["Prophase I", "Homologs pair, not separate."]] },
    { stem: "Red and white snapdragons produce pink offspring. What pattern of inheritance is this?", right: ["Incomplete dominance", "The heterozygote is intermediate."], wrong: [["Codominance", "Both traits would appear fully."], ["Sex linkage", "Not related to sex chromosomes."], ["Polygenic inheritance", "One gene with two alleles explains it."]] },
    { stem: "A dihybrid test cross produces 45% AB, 45% ab, 5% Ab and 5% aB offspring. What do these results suggest?", right: ["The genes are linked, about 10 map units apart", "Recombinants are 10% of offspring."], wrong: [["The genes assort independently", "That would give about 25% each."], ["The genes are on different chromosomes", "That gives a 1 : 1 : 1 : 1 ratio."], ["Crossing over never occurs", "Recombinants did appear."]] },
    { stem: "Hydrangeas with identical genotypes produce blue flowers in acidic soil and pink flowers in basic soil. What does this show?", right: ["The environment can affect the phenotype", "Same genotype, different phenotypes."], wrong: [["Soil pH changes the DNA sequence", "Genotype is unchanged."], ["Flower color is X-linked", "Plants here show no sex linkage."], ["The plants are different species", "They are the same."]] },
    { stem: "Nondisjunction of chromosome 21 in meiosis I produces gametes with which chromosome numbers (n = 23)?", right: ["Two with 24 and two with 22", "One cell gets both homologs and the other none."], wrong: [["All four with 23", "That is normal meiosis."], ["Two with 24 and two with 23", "That results from nondisjunction in meiosis II."], ["All four with 46", "Gametes are haploid."]] },
    { stem: "Which trait is most likely inherited only through the mother?", right: ["A trait caused by a mitochondrial gene", "Mitochondria are inherited from the egg."], wrong: [["An X-linked trait", "Fathers pass their X to daughters."], ["An autosomal dominant trait", "Either parent can pass it."], ["A Y-linked trait", "Y chromosomes come from fathers."]] },
  ]),
];

/* ---------------- Unit 6 ---------------- */
export const bioUnit6: McqTemplate[] = [
  t("bio-transcribe-translate", 6, ["transcription-and-rna-processing", "translation"], ["2"], 3, (r) => {
    const codons = ["AUG", ...r.sample(Object.keys(CODONS).filter((c) => CODONS[c] !== "stop" && c !== "AUG"), 3), r.pick(["UAA", "UAG", "UGA"])];
    const mrna = codons.join("");
    const template = mrna.split("").map((b) => ({ A: "T", U: "A", G: "C", C: "G" })[b]!).join("");
    const aa = codons.slice(0, -1).map((c) => CODONS[c]!);
    const shifted = mrna.slice(1).match(/.{3}/g)!.map((c) => CODONS[c] ?? "?").filter((x) => x !== "?");
    return {
      stimulus: { table: CODON_TABLE(codons) },
      stem: `The template strand of a DNA segment reads 3′-${template}-5′. Using the codon table, what polypeptide does it encode?`,
      ...options([aa.join("–"), "Transcribe (complementary, with U for T), then read codons from AUG."], [
        [aa.slice().reverse().join("–"), "mRNA is read 5′ to 3′, starting at AUG."],
        [aa.slice(1).join("–"), "Translation starts with the methionine of AUG."],
        [[...aa, "stop"].join("–"), "A stop codon does not add an amino acid."],
        [shifted.length >= 2 ? shifted.join("–") : `${aa[0]}–${aa[2]}`, "Read in triplets from the start codon."],
      ]),
      explanation: `mRNA: 5′-${mrna}-3′. Codons ${codons.join(" ")} give ${aa.join("–")}, then stop.`,
    };
  }),
  t("bio-complement", 6, ["dna-and-rna-structure", "replication"], ["2"], 2, (r) => {
    const s = randDna(r, 8);
    const comp = s.split("").map((b) => COMP[b]!).reverse().join("");
    return {
      stem: `One strand of DNA reads 5′-${s}-3′. What is the sequence of the complementary strand, written 5′ to 3′?`,
      ...options([`5′-${comp}-3′`, "Pair each base and reverse the direction, because strands are antiparallel."], [
        [`5′-${s.split("").map((b) => COMP[b]!).join("")}-3′`, "The complementary strand is antiparallel; written 5′ to 3′ it is reversed."],
        [`5′-${s.split("").map((b) => RNA[b]!).reverse().join("")}-3′`, "DNA contains T, not U."],
        [`5′-${s.split("").reverse().join("")}-3′`, "Each base must be paired, not just reversed."],
      ]),
      explanation: `The complement of 5′-${s}-3′ is 3′-${s.split("").map((b) => COMP[b]!).join("")}-5′, written 5′-${comp}-3′.`,
    };
  }),
  t("bio-mutation-type", 6, ["mutations"], ["1"], 3, (r) => {
    const groups: Record<string, string[]> = {};
    for (const [c, a] of Object.entries(CODONS)) (groups[a] ??= []).push(c);
    const kind = r.pick(["silent", "missense", "nonsense"]);
    let from = "";
    let to = "";
    for (let i = 0; i < 400; i++) {
      const a = r.pick(Object.keys(CODONS).filter((c) => CODONS[c] !== "stop"));
      const b = r.pick(Object.keys(CODONS));
      const oneBase = [0, 1, 2].filter((k) => a[k] !== b[k]).length === 1;
      if (!oneBase) continue;
      const k = CODONS[b] === "stop" ? "nonsense" : CODONS[b] === CODONS[a] ? "silent" : "missense";
      if (k === kind) {
        from = a;
        to = b;
        break;
      }
    }
    if (!from) throw new Retry();
    return {
      stimulus: { table: CODON_TABLE([from, to]) },
      stem: `A point mutation changes the mRNA codon ${from} to ${to}. Which type of mutation is this?`,
      ...options([kind === "silent" ? "Silent: the amino acid is unchanged" : kind === "missense" ? "Missense: one amino acid is replaced" : "Nonsense: an early stop codon shortens the protein", `${from} codes for ${CODONS[from]} and ${to} for ${CODONS[to]}.`], [
        kind === "silent" ? ["Missense: one amino acid is replaced", "Both codons code for the same amino acid."] : ["Silent: the amino acid is unchanged", "The amino acid changes."],
        kind === "nonsense" ? ["Missense: one amino acid is replaced", `${to} is a stop codon.`] : ["Nonsense: an early stop codon shortens the protein", `${to} is not a stop codon.`],
        ["Frameshift: the reading frame is shifted", "A substitution does not shift the reading frame."],
      ]),
      explanation: `${from} (${CODONS[from]}) → ${to} (${CODONS[to]}): a ${kind} mutation.`,
    };
  }),
  t("bio-biotech-calc", 6, ["biotechnology"], ["5"], 2, (r) => {
    if (r.next() < 0.5) {
      const c = r.int(5, 30);
      const start = r.pick([1, 2, 10]);
      return {
        stem: `A PCR reaction starts with ${start} copy${start > 1 ? "ies" : ""} of a target DNA sequence. Assuming each cycle doubles the DNA, how many copies are present after ${c} cycles?`,
        ...options([`${start} × 2^${c}`, "Each cycle doubles the number of copies."], [
          [`${start} × ${2 * c}`, "Copies double each cycle; they do not increase by 2."],
          [`${start} × ${c}^2`, "Growth is exponential with base 2."],
          [`${start} × 2^${c - 1}`, `There are ${c} doublings.`],
        ]),
        explanation: `After ${c} doublings: ${start} × 2^${c} copies.`,
      };
    }
    const L = r.pick([3000, 4000, 5000, 6000]);
    const a = r.int(4, 20) * 100;
    const b = r.int(Math.ceil(a / 100) + 4, Math.floor(L / 100) - 4) * 100;
    const frags = [b - a, L - (b - a)].sort((x, y) => x - y);
    return {
      stem: `A circular plasmid of ${L} base pairs is cut by a restriction enzyme at positions ${a} and ${b}. The fragments are separated by gel electrophoresis. Which bands appear, and which travels farthest?`,
      ...options([`${frags[0]} bp and ${frags[1]} bp; the ${frags[0]} bp band travels farthest`, "Two cuts in a circle give two pieces; smaller fragments move farther."], [
        [`${frags[0]} bp and ${frags[1]} bp; the ${frags[1]} bp band travels farthest`, "Smaller fragments move through the gel more easily."],
        [`${a} bp, ${b - a} bp and ${L - b} bp; the ${Math.min(a, b - a, L - b)} bp band travels farthest`, "A circular plasmid cut twice gives two fragments, not three."],
        [`One ${L} bp band`, "The plasmid is cut into pieces."],
      ]),
      explanation: `The fragments are ${b} − ${a} = ${b - a} bp and ${L} − ${b - a} = ${L - (b - a)} bp.`,
    };
  }),
  pool("bio-u6-concepts", 6, ["replication", "transcription-and-rna-processing", "regulation-of-gene-expression", "gene-expression-and-cell-specialization", "mutations"], ["1"], [
    { stem: "Why is the lagging strand synthesized as Okazaki fragments?", right: ["DNA polymerase adds nucleotides only to the 3′ end, and the strands are antiparallel", "The lagging strand must be built away from the fork."], wrong: [["Helicase works only on one strand", "Helicase unwinds both."], ["The lagging strand is made of RNA", "It is DNA, built after RNA primers."], ["Ligase cuts the strand into fragments", "Ligase joins fragments."]] },
    { stem: "In the lac operon, what happens when lactose is present and glucose is absent?", right: ["Lactose binds the repressor, which releases the operator, and the genes are transcribed", "The lac operon is inducible."], wrong: [["The repressor binds the operator more tightly", "Lactose inactivates the repressor."], ["The genes are deleted", "Regulation does not delete genes."], ["Translation stops", "Expression increases."]] },
    { stem: "A liver cell and a nerve cell from the same person have the same DNA but make different proteins. Why?", right: ["They express different genes because they have different transcription factors", "Differential gene expression."], wrong: [["They have different genes", "Their genomes are the same."], ["Nerve cells lack ribosomes", "Both have ribosomes."], ["Mutations made them different", "Development, not mutation, explains it."]] },
    { stem: "Which modification of eukaryotic pre-mRNA allows one gene to code for more than one protein?", right: ["Alternative splicing", "Different exon combinations make different mRNAs."], wrong: [["Adding a 5′ cap", "The cap protects the mRNA."], ["Adding a poly-A tail", "The tail aids stability and export."], ["DNA replication", "That copies DNA."]] },
    { stem: "Methylation of DNA in a gene's promoter usually has which effect?", right: ["It reduces transcription of the gene", "Methylation tightens chromatin."], wrong: [["It changes the gene's DNA sequence", "Methylation is epigenetic."], ["It increases transcription", "Usually the opposite."], ["It speeds up DNA replication", "It regulates expression."]] },
    { stem: "A single nucleotide is deleted near the start of a gene. Why is the effect usually severe?", right: ["It shifts the reading frame, changing every codon after it", "Frameshifts alter all downstream amino acids."], wrong: [["It changes only one amino acid", "That describes a substitution."], ["It has no effect because the code is redundant", "Redundancy does not protect against frameshifts."], ["It adds an extra amino acid", "A deletion removes a nucleotide."]] },
    { stem: "Bacteria take up a plasmid carrying an antibiotic-resistance gene from their surroundings. What is this process?", right: ["Transformation", "Uptake of DNA from the environment."], wrong: [["Transduction", "That uses viruses."], ["Conjugation", "That is direct transfer between cells."], ["Translation", "That makes proteins."]] },
  ]),
];

/* ---------------- Unit 7 ---------------- */
export const bioUnit7: McqTemplate[] = [
  t("bio-hardy-weinberg", 7, ["hardy-weinberg-equilibrium"], ["5"], 3, (r) => {
    const q = r.pick([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]);
    const p = r2(1 - q);
    const ask = r.pick(["het", "p", "domPheno"]);
    const right = ask === "het" ? r2(2 * p * q) : ask === "p" ? p : r2(p * p + 2 * p * q);
    const what = ask === "het" ? "heterozygous" : ask === "p" ? "the frequency of the dominant allele" : "showing the dominant phenotype";
    return {
      stem: `In a population in Hardy–Weinberg equilibrium, ${r2(q * q * 100)}% of individuals show a recessive phenotype. What is ${ask === "p" ? what : `the proportion of individuals ${what}`}?`,
      ordered: true,
      ...options([String(right), `q² = ${r2(q * q)}, so q = ${q} and p = ${p}.`], [
        [String(r2(1 - q * q - (ask === "het" ? p * p : 0)) === right ? r2(p * q) : r2(1 - q * q - (ask === "het" ? p * p : 0))), "Use p² + 2pq + q² = 1 with q from the square root."],
        [String(r2(1 - q * q)), ask === "domPheno" ? "Recheck: this equals p² + 2pq." : "Take the square root of q² first."],
        [String(r2(q * q)), "That is the recessive frequency itself."],
        [String(r2(p * q)), "Heterozygotes are 2pq."],
        [String(r2(1 - r2(q * q))), "Find q by taking the square root."],
      ]),
      explanation: `q = √${r2(q * q)} = ${q}; p = ${p}. p² = ${r2(p * p)}, 2pq = ${r2(2 * p * q)}, q² = ${r2(q * q)}.`,
    };
  }),
  t("bio-sequence-relatedness", 7, ["phylogeny", "evidence-of-evolution"], ["4"], 3, (r) => {
    const sp = ["W", "X", "Y", "Z"];
    const pairs: [string, string][] = [["W", "X"], ["W", "Y"], ["W", "Z"], ["X", "Y"], ["X", "Z"], ["Y", "Z"]];
    const d = distinct6(r);
    const minIdx = d.indexOf(Math.min(...d));
    const [a, b] = pairs[minIdx]!;
    return {
      stimulus: { table: { caption: "Number of amino acid differences in a protein", columns: [{ key: "p", label: "Species pair" }, { key: "d", label: "Differences" }], rows: pairs.map(([x, y], i) => ({ p: `${x} and ${y}`, d: d[i]! })) } },
      stem: `Based on the data, which two species most likely share the most recent common ancestor among species ${sp.join(", ")}?`,
      ...options([`${a} and ${b}`, `They have the fewest differences (${d[minIdx]}).`], pairs.filter((_, i) => i !== minIdx).sort(() => 0).map(([x, y]) => [`${x} and ${y}`, `They differ by ${d[pairs.findIndex((p) => p[0] === x && p[1] === y)]}, more than ${a} and ${b}.`] as [string, string]).slice(0, 3)),
      explanation: `Fewer sequence differences indicate more recent divergence: ${a} and ${b} differ by only ${d[minIdx]}.`,
    };
  }),
  pool("bio-u7-selection", 7, ["natural-selection", "introduction-to-natural-selection", "artificial-selection", "population-genetics", "continuing-evolution"], ["6"], [
    { stem: "In a population, individuals of intermediate size have the highest survival, and the range of sizes narrows over generations. What type of selection is this?", right: ["Stabilizing selection", "The intermediate phenotype is favored."], wrong: [["Directional selection", "That favors one extreme."], ["Disruptive selection", "That favors both extremes."], ["Genetic drift", "Drift is random, not based on traits."]] },
    { stem: "An antibiotic is used to treat an infection, and resistant bacteria become common. Which statement is accurate?", right: ["Resistant bacteria were present before treatment and survived to reproduce", "The antibiotic selected existing variants."], wrong: [["The antibiotic caused the mutations for resistance", "Mutations arise randomly."], ["Each bacterium learned to resist the drug", "Individuals do not adapt this way."], ["Resistance spreads only through the patient's immune system", "Resistance spreads through bacterial reproduction and gene transfer."]] },
    { stem: "A small group of birds colonizes an island, and an allele rare on the mainland becomes common there. What explains this?", right: ["The founder effect", "A few founders carried, by chance, a different set of alleles."], wrong: [["Gene flow", "Gene flow would make populations more similar."], ["Stabilizing selection", "This is chance, not selection."], ["Hardy–Weinberg equilibrium", "Allele frequencies changed."]] },
    { stem: "Which condition would cause allele frequencies to change, violating Hardy–Weinberg equilibrium?", right: ["Individuals with one allele produce more offspring than others", "That is natural selection."], wrong: [["The population is very large", "Large size is a condition for equilibrium."], ["Mating is random", "Random mating is a condition for equilibrium."], ["No individuals migrate", "No migration is a condition for equilibrium."]] },
    { stem: "Breeders produced broccoli, kale and cabbage from wild mustard. How does this differ from natural selection?", right: ["Humans chose which plants reproduced", "That is artificial selection."], wrong: [["No variation was needed", "Variation was essential."], ["The traits were not inherited", "They were heritable."], ["Mutation did not occur in any plants", "Variation came from mutations."]] },
    { stem: "Which is the best measure of an organism's evolutionary fitness?", right: ["The number of its offspring that survive to reproduce", "Fitness is reproductive success."], wrong: [["Its size", "Size does not define fitness."], ["How long it lives", "Longevity matters only if it increases reproduction."], ["Its strength", "Strength does not define fitness."]] },
  ]),
  pool("bio-u7-history", 7, ["evidence-of-evolution", "common-ancestry", "speciation", "extinction", "origin-of-life-on-earth", "phylogeny", "variations-in-populations"], ["1"], [
    { stem: "The forelimbs of humans, bats and whales have the same bone pattern but different functions. These are:", right: ["Homologous structures, evidence of common ancestry", "Shared structure from a common ancestor."], wrong: [["Analogous structures, evidence of convergent evolution", "Analogous structures have different origins."], ["Vestigial structures with no function", "They are functional."], ["Evidence against evolution", "They support evolution."]] },
    { stem: "Two populations of frogs live in the same pond but breed in different months. What type of barrier is this?", right: ["Temporal isolation, a prezygotic barrier", "They are separated by breeding time."], wrong: [["Hybrid sterility, a postzygotic barrier", "No hybrids form."], ["Geographic isolation", "They live in the same place."], ["Mechanical isolation", "Their parts are not the issue."]] },
    { stem: "Which observation best supports the RNA world hypothesis?", right: ["Some RNA molecules can catalyze reactions as well as store information", "RNA can serve both roles."], wrong: [["DNA is more stable than RNA", "That explains why DNA took over later."], ["Proteins are made of amino acids", "That does not support the hypothesis."], ["All cells have membranes", "That is not specific to RNA."]] },
    { stem: "On a phylogenetic tree, what does a node represent?", right: ["The most recent common ancestor of the lineages that branch from it", "Nodes are branch points."], wrong: [["A living species", "Tips represent living species."], ["An extinct species with no descendants", "Nodes have descendants."], ["The time of a mass extinction", "Nodes mark divergence."]] },
    { stem: "Plants often form new species within a single area when errors in meiosis double their chromosome number. This is:", right: ["Sympatric speciation by polyploidy", "Polyploids are reproductively isolated from the parent species."], wrong: [["Allopatric speciation", "No geographic barrier is involved."], ["Convergent evolution", "That produces similar traits in unrelated species."], ["Gene flow", "Gene flow prevents speciation."]] },
    { stem: "After a mass extinction, the surviving groups often diversify rapidly. Why?", right: ["Many ecological niches become available", "Adaptive radiation fills vacant niches."], wrong: [["Mutation rates stop", "Mutations continue."], ["Competition increases", "Competition decreases."], ["All survivors become one species", "They diversify."]] },
    { stem: "Which feature is shared by all living organisms, supporting common ancestry?", right: ["A nearly universal genetic code", "All organisms read codons the same way."], wrong: [["A nucleus", "Prokaryotes lack a nucleus."], ["Chloroplasts", "Only plants and algae have them."], ["Linear chromosomes with introns", "These are eukaryotic features."]] },
    { stem: "Why are genetically uniform crops vulnerable to disease?", right: ["If one plant is susceptible, nearly all are, because they share the same alleles", "Low genetic diversity reduces resilience."], wrong: [["Uniform crops grow too quickly", "Growth rate is not the issue."], ["Disease only affects diverse populations", "Diverse populations are more resilient."], ["Uniform crops cannot photosynthesize", "They can."]] },
  ]),
];

function distinct6(r: Rng) {
  for (;;) {
    const d = Array.from({ length: 6 }, () => r.int(2, 30));
    const min = Math.min(...d);
    if (d.filter((x) => x === min).length === 1) return d;
  }
}

/* ---------------- Unit 8 ---------------- */
export const bioUnit8: McqTemplate[] = [
  t("bio-energy-pyramid", 8, ["energy-flow-through-ecosystems"], ["5"], 2, (r) => {
    const e = r.pick([10000, 20000, 50000, 80000, 100000, 150000]);
    const lvl = r.int(2, 3);
    const names = ["producers", "primary consumers", "secondary consumers", "tertiary consumers"];
    const ans = e / 10 ** lvl;
    return {
      stem: `The producers in an ecosystem store ${e.toLocaleString("en-US")} kcal of energy. Assuming about 10% transfer between trophic levels, about how much energy is available to the ${names[lvl]}?`,
      ordered: true,
      ...options([`${ans.toLocaleString("en-US")} kcal`, `${lvl} transfers of 10% each.`], [
        [`${(ans * 10).toLocaleString("en-US")} kcal`, "Count the number of transfers from producers."],
        [`${(ans / 10).toLocaleString("en-US")} kcal`, "Count the number of transfers from producers."],
        [`${(e * 0.9 ** lvl).toLocaleString("en-US", { maximumFractionDigits: 0 })} kcal`, "About 10% is passed on; about 90% is lost."],
      ]),
      explanation: `Each level keeps about 10%: ${e.toLocaleString("en-US")} × 0.1^${lvl} = ${ans.toLocaleString("en-US")} kcal.`,
    };
  }),
  t("bio-logistic", 8, ["population-ecology"], ["5"], 3, (r) => {
    const rm = r.pick([0.1, 0.2, 0.3, 0.4, 0.5]);
    const K = r.pick([500, 800, 1000, 1200, 2000]);
    const N = Math.round((K * r.int(1, 9)) / 10);
    const logistic = r.next() < 0.7;
    const v = logistic ? r2((rm * N * (K - N)) / K) : r2(rm * N);
    return {
      stem: logistic
        ? `A population has a maximum per capita growth rate of ${rm} per year, a carrying capacity of ${K} and a current size of ${N}. Using dN/dt = rmaxN(K − N)/K, what is the population growth rate?`
        : `A population of ${N} has unlimited resources and a per capita growth rate of ${rm} per year. Using dN/dt = rmaxN, what is the population growth rate?`,
      ordered: true,
      ...options([`${v} individuals per year`, "Substitute into the equation."], [
        [`${r2(rm * N)} individuals per year`, "Include the (K − N)/K factor for logistic growth."],
        [`${r2((rm * N * N) / K)} individuals per year`, "The factor is (K − N)/K, not N/K."],
        [`${r2(rm * K)} individuals per year`, "Use the current size N."],
        [`${r2(v / 2)} individuals per year`, "Recheck the multiplication."],
      ]),
      explanation: logistic ? `${rm} × ${N} × (${K} − ${N})/${K} = ${v}.` : `${rm} × ${N} = ${v}.`,
    };
  }),
  t("bio-simpson", 8, ["community-ecology", "biodiversity"], ["5"], 3, (r) => {
    const counts = Array.from({ length: r.int(3, 4) }, () => r.int(1, 12));
    const N = counts.reduce((a, b) => a + b, 0);
    const sdi = 1 - counts.reduce((s, n) => s + (n / N) ** 2, 0);
    return {
      stimulus: { table: { caption: "Individuals counted in a sample", columns: [{ key: "s", label: "Species" }, { key: "n", label: "Count" }], rows: counts.map((n, i) => ({ s: String.fromCharCode(65 + i), n })) } },
      stem: "Using Simpson's diversity index, SDI = 1 − Σ(n/N)², what is the diversity of this sample?",
      ordered: true,
      ...options([r2(sdi).toFixed(2), `N = ${N}; subtract the sum of squared proportions from 1.`], [
        [r2(1 - sdi).toFixed(2), "Subtract the sum from 1."],
        [r2(1 - 1 / counts.length).toFixed(2), "The species are not equally abundant; use each species' own proportion."],
        [r2(1 - counts.reduce((s, n) => s + (n / N) ** 2, 0) / 2).toFixed(2), "Do not divide the sum."],
      ]),
      explanation: `Proportions ${counts.map((n) => r2(n / N)).join(", ")}; Σ(n/N)² = ${r2(1 - sdi)}; SDI = ${r2(sdi)}.`,
    };
  }),
  pool("bio-u8-concepts", 8, ["effect-of-density-of-populations", "community-ecology", "disruptions-to-ecosystems", "responses-to-the-environment", "energy-flow-through-ecosystems", "biodiversity"], ["1", "6"], [
    { stem: "Which factor limits population growth in a density-dependent way?", right: ["Spread of a contagious disease", "Disease spreads faster in crowded populations."], wrong: [["A sudden freeze", "Weather affects populations regardless of density."], ["A volcanic eruption", "That is density-independent."], ["A flood", "That is density-independent."]] },
    { stem: "Sea otters eat sea urchins, which eat kelp. When otters are removed, kelp forests disappear. Sea otters are best described as:", right: ["A keystone species", "Their effect on the community is far larger than their numbers."], wrong: [["A producer", "Otters are consumers."], ["An invasive species", "They are native."], ["A decomposer", "They are predators."]] },
    { stem: "Fertilizer runoff enters a lake, causing an algal bloom followed by fish deaths. What is the direct cause of the fish deaths?", right: ["Decomposers use up dissolved oxygen as the algae die", "Eutrophication depletes oxygen."], wrong: [["The algae eat the fish", "Algae are producers."], ["The fertilizer poisons fish directly", "Oxygen depletion is the main cause."], ["The water becomes too cold", "Temperature is not the cause."]] },
    { stem: "Why do invasive species often spread rapidly in new habitats?", right: ["They lack their natural predators, competitors and diseases", "Without natural controls, they grow quickly."], wrong: [["They always reproduce asexually", "Many reproduce sexually."], ["They are always larger than native species", "Size is not the reason."], ["They cannot be eaten by any organism", "Some are eaten, but less than at home."]] },
    { stem: "A relationship in which one species benefits and the other is unaffected is called:", right: ["Commensalism", "One benefits, the other is neither helped nor harmed."], wrong: [["Mutualism", "Both benefit."], ["Parasitism", "One is harmed."], ["Competition", "Both are harmed."]] },
    { stem: "Why does energy, unlike matter, not cycle in ecosystems?", right: ["At each transfer, energy is lost as heat, which organisms cannot use", "Energy flows one way."], wrong: [["Decomposers destroy energy", "Energy is not destroyed."], ["Producers store all energy permanently", "Energy moves to consumers."], ["Energy is converted into matter", "That does not occur in ecosystems."]] },
    { stem: "Pill bugs move faster and turn less in dry areas and slow down in moist areas, ending up mostly in moist areas. This behavior is:", right: ["Kinesis", "A change in speed of random movement."], wrong: [["Taxis", "Taxis is directed movement."], ["Phototropism", "That is plant growth toward light."], ["Migration", "That is long-distance seasonal movement."]] },
    { stem: "Grassland A has 25 plant species; grassland B has 4. A drought kills drought-sensitive species. Which prediction is best supported?", right: ["Grassland A will recover productivity faster because some species likely tolerate drought", "Biodiversity increases resilience."], wrong: [["Grassland B will recover faster because it has fewer species", "Low diversity reduces resilience."], ["Both will be equally affected", "Diversity changes the response."], ["Neither will be affected by drought", "Drought affects both."]] },
  ]),
];
