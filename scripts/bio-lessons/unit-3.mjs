/* AP Biology Unit 3: Cellular Energetics. */
export const lessons = [
  {
    id: "enzyme-structure",
    obj: ["Explain how the shape and chemistry of an enzyme's active site determine its substrate specificity."],
    terms: [
      ["Enzyme", "A biological catalyst, usually a protein, that speeds up a reaction without being consumed."],
      ["Active site", "The region of an enzyme where the substrate binds and the reaction occurs."],
      ["Substrate", "The reactant an enzyme acts on."],
    ],
    checks: [
      ["Why does each enzyme act on only one or a few substrates?", "The shape and charge of its active site must be complementary to the substrate."],
      ["Is an enzyme changed by the reaction it catalyzes?", "No; it can be used again."],
    ],
    body: String.raw`
Enzymes are proteins (a few are RNA) whose shape lets them catalyze specific reactions.

The **active site** has a particular shape and arrangement of R groups (charged, polar, nonpolar). A substrate binds only if its shape and charges are **complementary**. Binding causes the enzyme to change shape slightly to fit more snugly (**induced fit**).

Changing the active site's shape or charge, by mutation or by changes in conditions, changes the enzyme's ability to bind its substrate.
`,
    note: ["Names", "Many enzyme names end in -ase and describe their substrate: lactase breaks down lactose, DNA polymerase builds DNA."],
    ex: ["A mutation", "A mutation replaces a positively charged amino acid in an active site with a nonpolar one. The substrate is negatively charged. Predict the effect.", ["The ionic attraction that held the substrate is lost.", "The substrate binds less well."], "enzyme activity decreases."],
  },
  {
    id: "enzyme-catalysis",
    obj: ["Explain how enzymes lower activation energy and interpret reaction-rate data."],
    terms: [
      ["Activation energy", "The energy needed to start a reaction."],
      ["Reaction rate", "The amount of product formed, or substrate used, per unit time."],
    ],
    checks: [
      ["Does an enzyme change the overall energy released by a reaction?", "No; it lowers only the activation energy."],
      ["How can the initial reaction rate be found from a graph of product over time?", "From the slope of the curve at the start."],
    ],
    body: String.raw`
Enzymes speed up reactions by **lowering the activation energy**, for example by bringing substrates together in the correct orientation or straining bonds.

On an energy diagram, the catalyzed reaction has a lower hill, but the starting and ending energies (and so ΔG) are the same.

## Measuring activity

Rate is the change in product (or substrate) over time: the **slope** of a product-versus-time graph. The curve levels off when substrate runs out.

$$\text{rate} = \frac{\Delta \text{product}}{\Delta t}$$
`,
    note: ["Controls", "Enzyme experiments compare with a control without enzyme (or with boiled enzyme) to show that the enzyme causes the change."],
    ex: ["Rate from data", "Product rises from 0.4 mM at 2 min to 1.6 mM at 6 min. What is the average rate?", ["Δproduct = 1.2 mM; Δt = 4 min."], "0.3 mM per minute."],
  },
  {
    id: "environmental-impacts-on-enzyme-function",
    obj: ["Predict how temperature, pH, substrate concentration and inhibitors affect enzyme activity."],
    terms: [
      ["Denaturation", "Disruption of an enzyme's shape, reducing or eliminating activity."],
      ["Competitive inhibitor", "A molecule that binds the active site, competing with the substrate."],
      ["Noncompetitive (allosteric) inhibitor", "A molecule that binds elsewhere, changing the enzyme's shape."],
    ],
    checks: [
      ["Why does activity drop sharply above the optimum temperature?", "The enzyme denatures."],
      ["How can a competitive inhibitor's effect be overcome?", "By increasing substrate concentration."],
    ],
    body: String.raw`
Each enzyme has optimal conditions.

- **Temperature**: rate rises with temperature (more collisions) up to an optimum, then falls as the enzyme denatures.
- **pH**: changes in H⁺ concentration alter charges on R groups, disrupting shape. Pepsin works best near pH 2; most cytoplasmic enzymes near pH 7.
- **Substrate concentration**: rate increases, then levels off when all active sites are occupied (saturation).
- **Enzyme concentration**: more enzyme, faster rate (if substrate is plentiful).

## Inhibitors

| Type | Binds | Overcome by more substrate? |
| --- | --- | --- |
| competitive | active site | yes |
| noncompetitive | allosteric site | no |

Low temperature slows enzymes without denaturing them; warming restores activity.
`,
    note: ["Reversible or not", "Cooling is reversible; denaturation by high heat usually is not."],
    ex: ["Identify the inhibitor", "An inhibitor reduces reaction rate at low substrate levels, but at very high substrate levels the rate reaches the same maximum as without inhibitor. What type is it?", ["Excess substrate outcompetes it."], "a competitive inhibitor."],
  },
  {
    id: "cellular-energy",
    obj: ["Explain how cells use energy coupling, ATP and metabolic pathways to maintain order."],
    terms: [
      ["ATP", "Adenosine triphosphate; its hydrolysis to ADP and phosphate releases energy used to power cell work."],
      ["Energy coupling", "Using an energy-releasing reaction to drive an energy-requiring one."],
    ],
    checks: [
      ["Why must organisms take in energy constantly?", "Maintaining order requires energy, and energy transformations always lose some as heat."],
      ["What happens to an organism that cannot meet its energy needs?", "It loses mass, and ultimately dies."],
    ],
    body: String.raw`
Living systems are highly ordered, and maintaining that order requires a constant input of energy.

## Energy coupling

Reactions that release energy (exergonic, like ATP hydrolysis) are coupled to reactions that require energy (endergonic, like building polymers or pumping ions). Often ATP transfers a phosphate to another molecule, making it more reactive.

## Pathways

Metabolic pathways are sequences of enzyme-catalyzed steps; the product of one is the substrate of the next. They allow energy to be captured in small, controlled amounts.

Energy conversions are never 100 percent efficient: some energy is always released as heat.
`,
    note: ["Order and the environment", "Cells increase their own order by releasing heat and simple molecules (such as CO₂ and water) to their surroundings."],
    ex: ["Coupling", "Joining glutamic acid and ammonia requires energy. How does the cell drive it?", ["ATP hydrolysis releases energy.", "The phosphate is transferred to glutamic acid, making the reaction favorable."], "by coupling it to ATP hydrolysis."],
  },
  {
    id: "photosynthesis",
    obj: ["Describe the light-dependent reactions and the Calvin cycle and where they occur."],
    terms: [
      ["Light-dependent reactions", "Reactions in the thylakoid membranes that use light to make ATP and NADPH and release O₂ from water."],
      ["Calvin cycle", "Reactions in the stroma that use ATP and NADPH to fix CO₂ into sugar."],
      ["Photosystems", "Complexes of pigment and protein that capture light energy (photosystems I and II)."],
    ],
    checks: [
      ["Where does the oxygen released in photosynthesis come from?", "The splitting of water in photosystem II."],
      ["What two products of the light reactions does the Calvin cycle use?", "ATP and NADPH."],
    ],
    body: String.raw`
$$6\,\text{CO}_2 + 6\,\text{H}_2\text{O} + \text{light} \rightarrow \text{C}_6\text{H}_{12}\text{O}_6 + 6\,\text{O}_2$$

## Light-dependent reactions (thylakoids)

1. Pigments in **photosystem II** absorb light, exciting electrons.
2. Water is split to replace them, releasing O₂ and H⁺.
3. Electrons pass along an **electron transport chain**, which pumps H⁺ into the thylakoid space.
4. **Photosystem I** re-energizes the electrons, which reduce NADP⁺ to NADPH.
5. H⁺ flows back through **ATP synthase**, making ATP.

## Calvin cycle (stroma)

The enzyme rubisco fixes CO₂ to a five-carbon sugar. ATP and NADPH reduce the products to a three-carbon sugar used to build glucose and other molecules.
`,
    note: ["Evolutionary history", "Photosynthesis first evolved in prokaryotes (cyanobacteria), whose oxygen production changed Earth's atmosphere. Chloroplasts descend from such bacteria."],
    ex: ["Blocking the light reactions", "A chemical blocks electron flow from photosystem II. What happens to the Calvin cycle?", ["No electron flow means no H⁺ gradient, so no ATP, and no NADPH.", "The Calvin cycle needs both."], "it slows and stops, even though CO₂ is available."],
  },
  {
    id: "cellular-respiration",
    obj: ["Describe glycolysis, pyruvate oxidation, the Krebs cycle and oxidative phosphorylation.", "Compare aerobic respiration and fermentation."],
    terms: [
      ["Glycolysis", "Breakdown of glucose to two pyruvate in the cytoplasm, producing a small amount of ATP and NADH."],
      ["Oxidative phosphorylation", "ATP synthesis powered by the electron transport chain and a proton gradient across the inner mitochondrial membrane."],
      ["Fermentation", "Anaerobic regeneration of NAD⁺ from NADH, allowing glycolysis to continue without oxygen."],
    ],
    checks: [
      ["What is the final electron acceptor in aerobic respiration?", "Oxygen, which forms water."],
      ["Why does fermentation make so little ATP?", "Only glycolysis produces ATP; the rest of the energy stays in the products like lactate or ethanol."],
    ],
    body: String.raw`
$$\text{C}_6\text{H}_{12}\text{O}_6 + 6\,\text{O}_2 \rightarrow 6\,\text{CO}_2 + 6\,\text{H}_2\text{O} + \text{energy}$$

| Stage | Location | Main products |
| --- | --- | --- |
| glycolysis | cytoplasm | 2 pyruvate, 2 ATP (net), 2 NADH |
| pyruvate oxidation | mitochondrial matrix | acetyl-CoA, CO₂, NADH |
| Krebs cycle | matrix | CO₂, ATP, NADH, FADH₂ |
| electron transport and chemiosmosis | inner membrane | most of the ATP; water |

NADH and FADH₂ deliver electrons to the **electron transport chain**. As electrons pass along it, H⁺ is pumped into the intermembrane space. Oxygen accepts the electrons at the end. H⁺ flows back through **ATP synthase**, producing ATP.

## Without oxygen

Fermentation regenerates NAD⁺ so glycolysis can continue: **lactic acid** fermentation (muscle, bacteria) or **alcohol** fermentation (yeast, releasing CO₂).
`,
    note: ["Uncouplers", "Some substances make the inner membrane leaky to H⁺. Electron transport continues, but energy is released as heat instead of ATP. Brown fat uses this to generate heat."],
    ex: ["Cyanide", "Cyanide blocks the last protein of the electron transport chain. Predict the effects.", ["Electrons cannot reach oxygen, so the chain stops.", "No H⁺ gradient forms, so ATP synthase stops.", "NADH builds up, so the Krebs cycle also stops."], "ATP production collapses to what glycolysis and fermentation can provide."],
  },
  {
    id: "fitness",
    obj: ["Explain how variation in molecules and metabolic pathways affects an organism's fitness."],
    terms: [["Fitness", "An organism's ability to survive and reproduce in its environment."]],
    checks: [
      ["Why might having several forms of an enzyme be an advantage?", "Different forms may work best under different conditions, such as temperature."],
      ["How can variation in a population's molecules aid survival?", "It increases the chance that some individuals can cope with environmental change."],
    ],
    body: String.raw`
Variation at the molecular level contributes to how well organisms survive and reproduce.

## Examples

- **Chlorophyll variants**: different photosynthetic pigments absorb different wavelengths, letting organisms use the light available in their habitat.
- **Enzyme variants**: organisms in cold environments have enzymes that work at low temperature.
- **Membrane lipids**: organisms in cold climates have more unsaturated fatty acids, keeping membranes fluid.
- **Hemoglobin variants**: fetal hemoglobin binds oxygen more tightly than adult hemoglobin.

Populations with more molecular variation are more likely to include individuals that survive when the environment changes.
`,
    note: ["Link to evolution", "Molecular variation is raw material for natural selection (Unit 7)."],
    ex: ["Membranes and temperature", "Fish living in icy water have membranes rich in unsaturated fatty acids. Explain why this increases fitness.", ["Unsaturated tails have kinks that prevent tight packing.", "Membranes stay fluid at low temperatures, so transport and signaling still work."], "it keeps membranes functional in the cold."],
  },
];
