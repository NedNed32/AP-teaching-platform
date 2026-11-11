/* AP Biology Unit 4: Cell Communication and Cell Cycle. */
export const lessons = [
  {
    id: "cell-communication",
    obj: ["Describe direct contact, local (paracrine and synaptic) and long-distance (endocrine) signaling."],
    terms: [
      ["Ligand", "A signaling molecule that binds to a specific receptor."],
      ["Paracrine signaling", "Local signaling in which a cell releases molecules that affect nearby cells."],
      ["Endocrine signaling", "Long-distance signaling by hormones carried in the blood."],
    ],
    checks: [
      ["Which type of signaling uses hormones in the bloodstream?", "Endocrine signaling."],
      ["Give an example of signaling by direct contact.", "Gap junctions in animals, plasmodesmata in plants, or immune cells recognizing surface proteins."],
    ],
    body: String.raw`
Cells communicate by sending and receiving chemical signals.

| Type | Distance | Example |
| --- | --- | --- |
| direct contact | touching cells | gap junctions; immune cells checking surface molecules |
| paracrine | nearby cells | growth factors |
| synaptic | across a synapse | neurotransmitters |
| endocrine | whole body | insulin, other hormones |

Bacteria use **quorum sensing**: they release signal molecules, and when enough cells are present, the concentration triggers group behavior such as forming biofilms or glowing.
`,
    note: ["Specificity", "A cell responds only if it has the right receptor. That is why a hormone in the blood affects only its target cells."],
    ex: ["Classify a signal", "A neuron releases acetylcholine that crosses a tiny gap to a muscle cell. What type of signaling is this?", ["The signal travels only a short distance across a synapse."], "synaptic signaling, a form of local signaling."],
  },
  {
    id: "introduction-to-signal-transduction",
    obj: ["Describe the three stages of cell signaling: reception, transduction and response."],
    terms: [
      ["Reception", "Binding of a ligand to a receptor, changing the receptor's shape."],
      ["Transduction", "A series of steps that relays and amplifies the signal inside the cell."],
      ["Response", "The cellular change triggered by the signal, such as gene expression or enzyme activation."],
    ],
    checks: [
      ["Where are receptors for polar signals like peptide hormones located?", "In the plasma membrane, because polar molecules cannot cross it."],
      ["Where are receptors for steroid hormones located?", "Inside the cell, because steroids cross the membrane."],
    ],
    body: String.raw`
Signaling has three stages.

1. **Reception**: the ligand binds a receptor, which changes shape.
2. **Transduction**: the change starts a cascade of molecular interactions inside the cell, often protein phosphorylations.
3. **Response**: the cell changes its activity, such as turning on genes, opening channels or activating enzymes.

## Receptor location

- **Membrane receptors** bind hydrophilic ligands (most peptides, neurotransmitters). Examples: G protein-coupled receptors, receptor tyrosine kinases, ligand-gated ion channels.
- **Intracellular receptors** bind hydrophobic ligands (steroid hormones) that cross the membrane; the hormone–receptor complex often acts as a transcription factor.
`,
    note: ["Shape change is the message", "At every step the signal is passed along by a change in a protein's shape, often caused by binding or by adding a phosphate group."],
    ex: ["Locate the receptor", "A hormone is a small, nonpolar steroid. Where is its receptor, and what is a likely response?", ["Nonpolar molecules cross the bilayer.", "Steroid–receptor complexes often regulate transcription."], "inside the cell; it likely changes gene expression."],
  },
  {
    id: "signal-transduction",
    obj: ["Explain how second messengers and phosphorylation cascades amplify signals."],
    terms: [
      ["Second messenger", "A small molecule, such as cyclic AMP (cAMP) or Ca²⁺, that relays a signal inside the cell."],
      ["Protein kinase", "An enzyme that adds a phosphate group to a protein, often activating it."],
      ["Amplification", "Each step activates many molecules at the next, so one ligand produces a large response."],
    ],
    checks: [
      ["What turns off a phosphorylation cascade?", "Phosphatases remove the phosphate groups."],
      ["Why does a cascade amplify a signal?", "Each activated enzyme activates many molecules of the next."],
    ],
    body: String.raw`
## A G protein pathway

1. Epinephrine binds a G protein-coupled receptor.
2. The receptor activates a G protein, which activates the enzyme adenylyl cyclase.
3. Adenylyl cyclase converts ATP into many molecules of **cAMP** (second messenger).
4. cAMP activates **protein kinase A**, which starts a **phosphorylation cascade**.
5. Response: liver cells break down glycogen into glucose.

## Amplification

Because each enzyme acts many times, one hormone molecule can lead to millions of glucose molecules released.

## Turning it off

Ligands leave receptors, phosphatases remove phosphates and enzymes break down cAMP, so the cell can respond to new signals.
`,
    note: ["Same signal, different responses", "Different cells can respond differently to the same ligand because they have different receptors or different proteins downstream."],
    ex: ["Blocking cAMP breakdown", "A drug inhibits the enzyme that breaks down cAMP. Predict the effect on a liver cell exposed to epinephrine.", ["cAMP stays high after the signal.", "Protein kinase A remains active."], "glycogen breakdown continues longer than normal."],
  },
  {
    id: "changes-in-signal-transduction-pathways",
    obj: ["Predict how mutations or chemicals that alter signaling pathways affect cell responses."],
    terms: [["Constitutively active", "Always switched on, even without the signal."]],
    checks: [
      ["What happens if a receptor is mutated so it cannot bind its ligand?", "The cell no longer responds to the signal."],
      ["How can a mutation in a growth-factor pathway lead to cancer?", "If a component becomes constitutively active, the cell divides without the signal."],
    ],
    body: String.raw`
Changes in any part of a pathway change the response.

- **Receptor that cannot bind**: no response (some forms of insulin resistance).
- **Protein stuck in its active form**: response continues without signal. Mutations that permanently activate growth pathways (such as some Ras mutations) can cause uncontrolled cell division.
- **Blocked second messenger or kinase**: response is reduced.
- **Chemicals and toxins** can mimic or block signals. Cholera toxin keeps a G protein active, causing cells in the intestine to secrete water and salts.

Many medicines work by blocking or activating specific signaling proteins.
`,
    note: ["Work through the chain", "When a question changes one step, follow the pathway forward: what is now too active or not active enough, and what happens to the response?"],
    ex: ["A stuck G protein", "A mutation prevents a G protein from hydrolyzing GTP, so it stays active. Predict the effect on cAMP levels.", ["The G protein keeps adenylyl cyclase active.", "cAMP is produced continuously."], "cAMP stays high and the response continues without the ligand."],
  },
  {
    id: "feedback",
    obj: ["Distinguish negative and positive feedback and explain their roles in homeostasis."],
    terms: [
      ["Negative feedback", "A response that reverses a change, returning a variable toward its set point."],
      ["Positive feedback", "A response that amplifies a change, moving the system further from its starting point."],
    ],
    checks: [
      ["Give an example of negative feedback.", "Blood glucose regulation by insulin and glucagon, or body temperature regulation."],
      ["Give an example of positive feedback.", "Oxytocin during childbirth, blood clotting, or fruit ripening by ethylene."],
    ],
    body: String.raw`
Organisms keep internal conditions within limits (**homeostasis**) mainly by negative feedback.

## Negative feedback

A change triggers a response that counteracts it.

- Blood glucose rises after a meal; the pancreas releases **insulin**; cells take up glucose; glucose falls.
- Glucose falls; **glucagon** is released; the liver releases glucose.

## Positive feedback

A change triggers a response that amplifies it, until a final event ends the loop.

- During childbirth, contractions cause oxytocin release, which causes stronger contractions.
- In plants, ripening fruit releases ethylene, which speeds ripening of nearby fruit.
`,
    note: ["Disruptions", "Diseases often involve broken feedback loops. In type 1 diabetes, insulin is not produced, so blood glucose stays high."],
    ex: ["Identify the loop", "When blood calcium falls, a hormone is released that raises blood calcium. Positive or negative feedback?", ["The response reverses the change."], "negative feedback."],
  },
  {
    id: "cell-cycle",
    obj: ["Describe interphase, mitosis and cytokinesis, and the outcome of mitotic division."],
    terms: [
      ["Interphase", "The G1, S and G2 phases, when the cell grows and replicates its DNA."],
      ["Mitosis", "Division of the nucleus that produces two genetically identical nuclei."],
      ["Cytokinesis", "Division of the cytoplasm into two daughter cells."],
    ],
    checks: [
      ["In which phase is DNA replicated?", "S phase."],
      ["How do daughter cells from mitosis compare to the parent?", "They are genetically identical, with the same chromosome number."],
    ],
    body: String.raw`
The cell cycle produces new cells for growth, repair and asexual reproduction.

## Phases

- **G1**: growth; normal functions. Cells may exit to **G0**, a non-dividing state.
- **S**: DNA replication; each chromosome becomes two sister chromatids.
- **G2**: preparation for division.
- **Mitosis**: prophase (chromosomes condense), metaphase (line up at the middle), anaphase (sister chromatids separate), telophase (nuclei re-form).
- **Cytokinesis**: a cleavage furrow (animals) or cell plate (plants) divides the cell.

## DNA content

If a G1 cell has an amount of DNA x, a G2 cell has 2x, and each daughter cell returns to x.
`,
    note: ["Reading data", "Graphs of DNA per cell over time show a doubling in S phase and a halving at cytokinesis."],
    ex: ["Counting chromatids", "A human cell (46 chromosomes) is in metaphase of mitosis. How many chromatids does it have?", ["Each of the 46 chromosomes has two sister chromatids after S phase."], "92 chromatids."],
  },
  {
    id: "regulation-of-cell-cycle",
    obj: ["Explain how checkpoints, cyclins and CDKs regulate the cell cycle, and how failures lead to cancer or apoptosis."],
    terms: [
      ["Checkpoint", "A control point where the cell checks conditions before continuing the cycle."],
      ["Cyclin", "A protein whose concentration rises and falls during the cycle; it activates CDKs."],
      ["Cyclin-dependent kinase (CDK)", "An enzyme that, when bound to a cyclin, phosphorylates targets that move the cycle forward."],
      ["Apoptosis", "Programmed cell death."],
    ],
    checks: [
      ["What happens at the G1 checkpoint if DNA is damaged?", "The cycle pauses for repair, or the cell undergoes apoptosis."],
      ["How do tumor suppressor genes normally act?", "They slow or stop the cell cycle, for example p53 halting division when DNA is damaged."],
    ],
    body: String.raw`
## Checkpoints

- **G1**: is the cell large enough, are there growth signals, is DNA undamaged?
- **G2**: is DNA fully and correctly replicated?
- **M (spindle)**: are all chromosomes attached to the spindle?

## Cyclins and CDKs

CDKs are always present but are active only when bound to a **cyclin**. Cyclin levels rise and fall, so CDK activity is switched on at specific times, pushing the cell past checkpoints.

## When control fails

**Cancer** results from mutations in genes that control division: overactive growth genes (oncogenes) or inactive tumor suppressors. Damaged cells may otherwise undergo **apoptosis**.
`,
    note: ["Growth factors", "Many cells divide only when growth factors bind their receptors: a signaling pathway (Unit 4) feeding the cell cycle."],
    ex: ["Cyclin data", "Cyclin concentration peaks just before mitosis, then drops sharply. What would happen if cyclin could not be degraded?", ["CDK would stay active.", "The cell could not complete mitosis and reset the cycle normally."], "the cell would be stuck in or unable to exit mitosis properly."],
  },
];
