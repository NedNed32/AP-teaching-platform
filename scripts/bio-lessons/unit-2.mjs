/* AP Biology Unit 2: Cell Structure and Function. */
export const lessons = [
  {
    id: "subcellular-components",
    obj: ["Describe the structure and function of ribosomes, the endoplasmic reticulum, the Golgi complex, mitochondria, lysosomes, vacuoles and chloroplasts."],
    terms: [
      ["Ribosome", "A complex of rRNA and protein that synthesizes proteins; found in all cells."],
      ["Rough ER", "Endoplasmic reticulum studded with ribosomes; makes proteins for membranes and secretion."],
      ["Golgi complex", "Stacks of membranous sacs that modify, sort and package proteins."],
    ],
    checks: [
      ["Which organelle is found in both prokaryotes and eukaryotes?", "Ribosomes."],
      ["What is the path of a secreted protein?", "Rough ER, then a vesicle to the Golgi, then a vesicle to the plasma membrane."],
    ],
    body: String.raw`
Eukaryotic cells divide their work among specialized structures.

| Structure | Function |
| --- | --- |
| ribosomes | protein synthesis (free ribosomes make cytosolic proteins) |
| rough ER | synthesis and folding of secreted and membrane proteins |
| smooth ER | lipid synthesis, detoxification, calcium storage |
| Golgi complex | modifies (for example, adds sugars), sorts and ships proteins |
| mitochondria | cellular respiration; ATP production |
| lysosomes | hydrolytic enzymes digest materials; recycle organelles; apoptosis |
| vacuoles | storage and water balance; the plant central vacuole keeps cells turgid |
| chloroplasts | photosynthesis in plants and algae |

Ribosomes are not surrounded by a membrane and are found in every cell: evidence of common ancestry.
`,
    note: ["The endomembrane system", "The ER, Golgi, lysosomes, vacuoles and plasma membrane are connected by vesicles that carry proteins and lipids between them."],
    ex: ["Tracing a hormone", "A cell secretes a protein hormone. A radioactive amino acid is added. In what order does radioactivity appear?", ["Ribosomes on the rough ER make the protein.", "Transport vesicles carry it to the Golgi for modification.", "Secretory vesicles fuse with the plasma membrane."], "rough ER, Golgi, secretory vesicles, outside the cell."],
  },
  {
    id: "cell-structure-and-function",
    obj: ["Explain how the structure of organelles, such as membrane folding, relates to their function."],
    terms: [
      ["Cristae", "Folds of the inner mitochondrial membrane that increase surface area for respiration."],
      ["Thylakoids", "Membrane sacs in chloroplasts where the light reactions occur, stacked into grana."],
    ],
    checks: [
      ["Why are the inner membranes of mitochondria folded?", "Folding increases surface area for the electron transport chain and ATP synthase."],
      ["What fills the space around the thylakoids?", "The stroma, where the Calvin cycle occurs."],
    ],
    body: String.raw`
Structure fits function at every scale of the cell.

## Mitochondria

A double membrane. The inner membrane is folded into **cristae**, providing large surface area for the electron transport chain. The **matrix** holds Krebs cycle enzymes.

## Chloroplasts

A double membrane surrounds **thylakoids** (stacked into grana), where light energy is captured. The **stroma** contains the enzymes of the Calvin cycle.

## Other examples

- Cells that secrete many proteins (pancreas cells) have extensive rough ER and Golgi.
- Muscle cells have many mitochondria for high ATP demand.
- Lysosome membranes keep digestive enzymes away from the rest of the cell.
`,
    note: ["Compartments create gradients", "Membranes let organelles build up ion concentration differences, such as the proton gradient across the inner mitochondrial membrane, that drive ATP synthesis."],
    ex: ["Predicting cell features", "Cell X has abundant rough ER and Golgi; cell Y has many mitochondria. Which likely secretes digestive enzymes?", ["Secreted proteins need rough ER and Golgi."], "cell X."],
  },
  {
    id: "cell-size",
    obj: ["Calculate surface area-to-volume ratios and explain why cells are small."],
    terms: [["Surface area-to-volume ratio", "Surface area divided by volume; it decreases as an object gets larger."]],
    checks: [
      ["What is the SA:V ratio of a cube with sides of 2 µm?", "24 ÷ 8 = 3."],
      ["Why does a low SA:V ratio limit cell size?", "Exchange of materials across the membrane cannot keep up with the volume's needs."],
    ],
    body: String.raw`
Cells exchange materials (nutrients, wastes, heat) across their surface, but their needs depend on their volume.

For a cube of side $$s$$: $$SA = 6s^2$$ and $$V = s^3$$, so $$SA:V = \frac{6}{s}$$.

| Side | SA | V | SA:V |
| --- | --- | --- | --- |
| 1 | 6 | 1 | 6 |
| 2 | 24 | 8 | 3 |
| 4 | 96 | 64 | 1.5 |

As a cell grows, volume increases faster than surface area, so the SA:V ratio falls and exchange becomes less efficient.

## Adaptations

- Small size, or long, thin, flat shapes.
- Membrane folds such as microvilli on intestinal cells and root hairs on plant roots.
- In large organisms, specialized exchange organs (lungs, gills) with huge surface areas.

The exam formula sheet gives formulas for spheres, cubes and cylinders.
`,
    note: ["Organisms too", "Small animals lose heat faster than large ones because of their higher SA:V ratio, which is why small mammals have high metabolic rates."],
    ex: ["Compare two cells", "Cell A is a cube 3 µm on a side; cell B is 6 µm. Which exchanges materials more efficiently?", ["A: 54 ÷ 27 = 2.", "B: 216 ÷ 216 = 1."], "cell A, with the larger SA:V ratio."],
  },
  {
    id: "plasma-membranes",
    obj: ["Describe the fluid mosaic model and the roles of phospholipids, proteins, cholesterol and glycoproteins."],
    terms: [
      ["Fluid mosaic model", "The membrane as a fluid phospholipid bilayer with a mosaic of proteins embedded in or attached to it."],
      ["Integral protein", "A protein embedded in the membrane, often spanning it (transmembrane)."],
      ["Amphipathic", "Having both hydrophilic and hydrophobic regions."],
    ],
    checks: [
      ["Which part of a phospholipid faces the watery cytoplasm?", "The hydrophilic phosphate head."],
      ["What does cholesterol do in animal membranes?", "It regulates fluidity, keeping the membrane stable across temperatures."],
    ],
    body: String.raw`
The plasma membrane separates the cell from its environment and controls what enters and leaves.

## Components

- **Phospholipid bilayer**: hydrophilic heads face the water inside and outside; hydrophobic tails face each other.
- **Integral (transmembrane) proteins**: their hydrophobic regions sit in the bilayer and hydrophilic regions face water. They act as channels, carriers, pumps and receptors.
- **Peripheral proteins**: loosely attached to the surface.
- **Cholesterol** (animals): moderates fluidity.
- **Glycoproteins and glycolipids**: carbohydrate chains on the outer surface used for cell recognition.

Molecules move laterally within the membrane: it is fluid, not rigid.

## Cell walls

Plants (cellulose), fungi (chitin) and many prokaryotes (peptidoglycan) also have a cell wall outside the membrane, providing structure and protection against bursting.
`,
    note: ["Amphipathic proteins", "A transmembrane protein's surface pattern matches the membrane: nonpolar amino acids where it crosses the lipid tails, polar ones where it meets water."],
    ex: ["Predict a protein's position", "A protein has a stretch of 20 nonpolar amino acids flanked by polar regions. Where does it sit?", ["The nonpolar stretch is stable among the lipid tails.", "The polar ends face the water on each side."], "it spans the membrane as an integral protein."],
  },
  {
    id: "membrane-permeability",
    obj: ["Explain selective permeability and which molecules cross a membrane without help."],
    terms: [["Selective permeability", "Allowing some substances to cross a membrane more easily than others."]],
    checks: [
      ["Can oxygen cross the bilayer directly?", "Yes; small nonpolar molecules diffuse through it."],
      ["Why do ions need proteins to cross?", "Their charge keeps them from passing through the hydrophobic interior."],
    ],
    body: String.raw`
The hydrophobic core of the bilayer acts as a filter.

| Molecule type | Crosses the bilayer directly? |
| --- | --- |
| small nonpolar (O₂, CO₂, N₂) | yes, easily |
| small polar (water) | slowly; aquaporins greatly speed it up |
| large polar (glucose) | no; needs a transport protein |
| ions (Na⁺, K⁺, Cl⁻) | no; needs channels or pumps |
| hydrophobic molecules (steroid hormones) | yes |

Membrane proteins and the cell wall add further control. The cell wall is permeable to most small molecules but limits how much a plant cell can swell.
`,
    note: ["Why selectivity matters", "Selective permeability lets cells keep internal conditions different from the outside: a key part of maintaining homeostasis."],
    ex: ["Ranking", "Rank CO₂, glucose and Na⁺ by how easily they cross a pure phospholipid bilayer.", ["CO₂ is small and nonpolar.", "Glucose is large and polar.", "Na⁺ is charged."], "CO₂ crosses most easily; glucose and Na⁺ essentially cannot without proteins, with ions the least permeable."],
  },
  {
    id: "membrane-transport",
    obj: ["Distinguish passive and active transport, and describe endocytosis and exocytosis."],
    terms: [
      ["Passive transport", "Net movement of molecules down their concentration gradient, without energy input."],
      ["Active transport", "Movement against a concentration gradient, requiring energy, often from ATP."],
      ["Endocytosis", "Taking in large molecules or particles by forming vesicles from the plasma membrane."],
    ],
    checks: [
      ["Does diffusion require ATP?", "No."],
      ["How does a cell release large proteins such as hormones?", "Exocytosis: vesicles fuse with the plasma membrane."],
    ],
    body: String.raw`
## Passive transport

Molecules move from high to low concentration (down the gradient), with no energy from the cell. This includes **simple diffusion** and **facilitated diffusion**.

## Active transport

Proteins move substances **against** their gradient using energy, usually ATP. Example: the **sodium–potassium pump**, which moves 3 Na⁺ out and 2 K⁺ in per ATP, building gradients used by nerve cells.

## Bulk transport

- **Endocytosis**: the membrane folds inward to bring material in (phagocytosis for particles, pinocytosis for fluid, receptor-mediated for specific molecules).
- **Exocytosis**: vesicles fuse with the membrane to release contents.

Both use energy.
`,
    note: ["Gradients store energy", "An active pump builds a gradient; that gradient can then power other transport (cotransport) or signaling."],
    ex: ["Identify the process", "A cell's internal K⁺ concentration is 30 times higher than outside, yet it keeps taking in K⁺. When ATP production is blocked, uptake stops. What process is this?", ["K⁺ moves against its gradient.", "It depends on ATP."], "active transport."],
  },
  {
    id: "facilitated-diffusion",
    obj: ["Explain how channel and carrier proteins speed passive transport, including aquaporins."],
    terms: [
      ["Facilitated diffusion", "Passive movement of molecules across a membrane through transport proteins."],
      ["Aquaporin", "A channel protein that allows water to cross the membrane rapidly."],
    ],
    checks: [
      ["Does facilitated diffusion move substances against their gradient?", "No; it is passive and only speeds movement down the gradient."],
      ["Why does the rate of facilitated diffusion level off at high concentrations?", "The transport proteins become saturated."],
    ],
    body: String.raw`
Polar molecules and ions cross membranes through proteins, but still only **down** their gradients.

- **Channel proteins** form pores. Ion channels can be gated, opening in response to signals. **Aquaporins** let water flow quickly.
- **Carrier proteins** bind a molecule and change shape to release it on the other side (for example, glucose transporters).

Because there are a limited number of proteins, the rate rises with the concentration difference and then levels off when all carriers are busy (**saturation**). Simple diffusion shows no such plateau.
`,
    note: ["Reading a graph", "A curve that rises and then plateaus as concentration increases suggests a protein-mediated process; a straight line suggests simple diffusion."],
    ex: ["Interpret data", "Glucose uptake rises with external glucose but stops increasing above 10 mM, even though no ATP is used. Explain.", ["No ATP: passive.", "Plateau: carriers are saturated."], "facilitated diffusion through a limited number of carrier proteins."],
  },
  {
    id: "tonicity-and-osmoregulation",
    obj: ["Predict the movement of water using tonicity and water potential.", "Calculate solute potential."],
    terms: [
      ["Hypertonic", "Having a higher solute concentration than another solution."],
      ["Water potential (Ψ)", "A measure of the tendency of water to move; water flows from higher to lower water potential."],
      ["Solute potential", "Ψs = −iCRT; adding solute lowers water potential."],
    ],
    checks: [
      ["A red blood cell is placed in a hypertonic solution. What happens?", "Water leaves the cell and it shrivels."],
      ["What is the water potential of pure water at atmospheric pressure?", "0 MPa."],
    ],
    body: String.raw`
Water moves by **osmosis** across a selectively permeable membrane from lower to higher solute concentration.

| Solution outside the cell | Animal cell | Plant cell |
| --- | --- | --- |
| hypotonic | swells and may burst (lyse) | becomes turgid (healthy) |
| isotonic | normal | flaccid |
| hypertonic | shrivels | plasmolyzes |

## Water potential

$$\Psi = \Psi_P + \Psi_S \qquad \Psi_S = -iCRT$$

- $$i$$: ionization constant (1 for sucrose, 2 for NaCl)
- $$C$$: molar concentration
- $$R = 0.0831$$ L·bar/(mol·K)
- $$T$$: temperature in kelvins

Water moves from higher (less negative) to lower (more negative) water potential.

**Osmoregulation** keeps internal water and solute balance; for example, freshwater protists use contractile vacuoles to pump out excess water.
`,
    note: ["Units", "With R = 0.0831 the answer is in bars. Remember to convert °C to kelvins by adding 273."],
    ex: ["Solute potential", "Calculate the solute potential of a 0.2 M sucrose solution at 27 °C.", ["i = 1, C = 0.2, T = 300 K.", "Ψs = −(1)(0.2)(0.0831)(300) = −4.99."], "about −5.0 bars."],
  },
  {
    id: "mechanisms-of-transport",
    obj: ["Explain how cotransport and the electrochemical gradient move substances."],
    terms: [
      ["Cotransport", "Using the energy of one substance moving down its gradient to move another substance against its gradient."],
      ["Electrochemical gradient", "The combined concentration and charge difference across a membrane."],
      ["Membrane potential", "The voltage across a membrane caused by unequal distribution of ions."],
    ],
    checks: [
      ["Where does the energy for sodium–glucose cotransport come from?", "The sodium gradient, which was built by the ATP-powered sodium–potassium pump."],
      ["Is cotransport active or passive for the molecule moved against its gradient?", "Active (secondary active transport)."],
    ],
    body: String.raw`
Cells use stored gradients to do work.

## The sodium–potassium pump

Using ATP, it pumps 3 Na⁺ out and 2 K⁺ in. This builds concentration gradients and makes the inside of the cell negative: a **membrane potential**.

## Cotransport

A **cotransporter** couples the movement of one substance down its gradient to another moving against its gradient. In the small intestine, Na⁺ flowing into cells drags glucose in with it.

## Proton gradients

In mitochondria and chloroplasts, pumps build a H⁺ gradient; protons flowing back through **ATP synthase** power ATP production.
`,
    note: ["Indirect use of ATP", "Cotransport does not use ATP directly, but stops if the pump that builds the gradient stops."],
    ex: ["Poisoning the pump", "A drug blocks the sodium–potassium pump in intestinal cells. What happens to glucose absorption over time?", ["The Na⁺ gradient runs down.", "Without it, the cotransporter cannot move glucose against its gradient."], "glucose absorption decreases."],
  },
  {
    id: "cell-compartmentalization",
    obj: ["Explain how internal membranes allow eukaryotic cells to carry out incompatible reactions at the same time."],
    terms: [["Compartmentalization", "Division of a cell into membrane-bound regions with different conditions and enzymes."]],
    checks: [
      ["Why must lysosomal enzymes be kept in a compartment?", "They would digest the cell's own molecules."],
      ["How do prokaryotes compartmentalize without membrane-bound organelles?", "They use regions of the cytoplasm and infoldings of the plasma membrane."],
    ],
    body: String.raw`
Internal membranes divide eukaryotic cells into **compartments**, each with its own environment.

## Benefits

- Incompatible processes run at the same time: digestion in lysosomes, synthesis in the ER.
- Enzymes for a pathway are concentrated together, increasing efficiency.
- Membranes provide **surface area** for reactions (electron transport chains) and allow gradients to form.
- Different pH and ion conditions can be maintained (lysosomes are acidic).

Prokaryotes lack membrane-bound organelles but still localize processes: their plasma membrane carries the electron transport chain, and DNA is concentrated in a region called the nucleoid.
`,
    note: ["Surface area again", "Folded internal membranes (ER, cristae, thylakoids) greatly increase the area available for membrane-bound reactions."],
    ex: ["Explain an advantage", "Why might it help a cell to keep the enzymes of the Krebs cycle inside the mitochondrial matrix?", ["The enzymes and their substrates are concentrated in a small space.", "Products of one step are close to the next enzyme."], "compartmentalization increases reaction efficiency."],
  },
  {
    id: "origins-of-cell-compartmentalization",
    obj: ["Describe the endosymbiotic theory and the evidence supporting it."],
    terms: [["Endosymbiosis", "The theory that mitochondria and chloroplasts descended from free-living prokaryotes engulfed by an ancestral cell."]],
    checks: [
      ["Name two pieces of evidence for endosymbiosis.", "Mitochondria and chloroplasts have double membranes, their own circular DNA and prokaryote-like ribosomes, and they divide by binary fission."],
      ["Which organelle came first in the eukaryotic lineage, mitochondria or chloroplasts?", "Mitochondria; all eukaryotes have them, but only plants and algae have chloroplasts."],
    ],
    body: String.raw`
Eukaryotic cells likely evolved from a host cell that engulfed other prokaryotes.

## Endosymbiotic theory

1. An ancestral cell engulfed an aerobic bacterium, which became the **mitochondrion**.
2. Later, some of these cells engulfed photosynthetic bacteria, which became **chloroplasts**.

## Evidence

- Double membranes (the inner from the original prokaryote).
- Their own **circular DNA**, similar to bacterial DNA.
- Ribosomes resembling bacterial ribosomes.
- Reproduction by a process like binary fission.
- DNA sequences closely related to particular modern bacteria.

The nuclear envelope and endomembrane system probably arose from infoldings of the plasma membrane.
`,
    note: ["Shared evidence", "These features support both common ancestry and the origin of compartments: organelles still carry clues to their free-living past."],
    ex: ["Using evidence", "An antibiotic that targets bacterial ribosomes also slows protein synthesis inside mitochondria. What does this support?", ["Mitochondrial ribosomes resemble bacterial ribosomes."], "the endosymbiotic origin of mitochondria."],
  },
];
