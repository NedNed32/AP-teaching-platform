/* AP Biology Unit 7: Natural Selection. */
export const lessons = [
  {
    id: "introduction-to-natural-selection",
    obj: ["Describe the conditions for natural selection and how it changes populations."],
    terms: [
      ["Natural selection", "The process by which individuals with heritable traits better suited to the environment survive and reproduce more."],
      ["Adaptation", "A heritable trait that increases fitness in a particular environment."],
    ],
    checks: [
      ["Do individuals evolve?", "No; populations evolve as allele frequencies change across generations."],
      ["What are the requirements for natural selection?", "Heritable variation, overproduction of offspring and competition, and differential survival and reproduction."],
    ],
    body: String.raw`
Natural selection is a major mechanism of evolution.

## Conditions

1. Individuals in a population **vary** in their traits.
2. Some of that variation is **heritable**.
3. More offspring are produced than can survive, so there is **competition** for limited resources.
4. Individuals with traits suited to the environment **survive and reproduce more**.

Over generations, the favored heritable traits become more common in the population.

## Fitness

Evolutionary fitness is measured by **reproductive success**, not strength or size.
`,
    note: ["The environment selects", "Variation arises first, randomly, through mutation and recombination. The environment then determines which variants are favored. Selection cannot create a trait on demand."],
    ex: ["Explaining a change", "After a drought, a bird population has deeper beaks on average. Explain using natural selection.", ["Beak depth varied and was heritable.", "During drought, only large, hard seeds remained; deep-beaked birds could crack them and survived to reproduce.", "Their offspring inherited deeper beaks."], "differential survival and reproduction shifted the population's average beak depth."],
  },
  {
    id: "natural-selection",
    obj: ["Explain directional, stabilizing and disruptive selection and how environmental change affects selection."],
    terms: [
      ["Directional selection", "Selection favoring one extreme phenotype."],
      ["Stabilizing selection", "Selection favoring intermediate phenotypes."],
      ["Disruptive selection", "Selection favoring both extremes over intermediates."],
      ["Sexual selection", "Selection for traits that increase mating success."],
    ],
    checks: [
      ["Human birth weight is an example of which type of selection?", "Stabilizing: very low and very high birth weights had lower survival."],
      ["What graph shape results from disruptive selection?", "Two peaks at the extremes."],
    ],
    body: String.raw`
Selection reshapes the distribution of a trait.

| Type | Favors | Graph change |
| --- | --- | --- |
| directional | one extreme | curve shifts |
| stabilizing | the middle | curve narrows |
| disruptive | both extremes | curve splits into two peaks |

**Sexual selection** can favor traits like bright plumage that attract mates even if they reduce survival.

Environments change, so traits that are favored can change too. **Convergent evolution** produces similar traits in unrelated species facing similar selective pressures, such as the streamlined bodies of sharks and dolphins.
`,
    note: ["Selection acts on phenotypes", "Selection acts on what an organism looks like and does, but only heritable variation leads to evolution."],
    ex: ["Identify the selection", "In a habitat of light sand and dark rocks, mice of medium color are eaten most. Over time light and dark mice increase. What type of selection is this?", ["Both extremes are favored over the middle."], "disruptive selection."],
  },
  {
    id: "artificial-selection",
    obj: ["Compare artificial selection with natural selection."],
    terms: [["Artificial selection", "Humans choose which individuals breed, based on desired traits."]],
    checks: [
      ["Give an example of artificial selection.", "Dog breeds, or broccoli, cabbage and kale bred from wild mustard."],
      ["How is artificial selection similar to natural selection?", "Both change allele frequencies because some individuals reproduce more than others."],
    ],
    body: String.raw`
In **artificial selection**, humans, not the environment, determine which individuals reproduce.

- Wild mustard was bred into broccoli, cabbage, kale and cauliflower by selecting for different plant parts.
- Dogs were bred from wolves for behavior, size and appearance.
- Crops are bred for yield, pest resistance and flavor.

It shows how much variation exists in populations and how quickly selection can change them. It can also reduce genetic diversity, making populations vulnerable to disease.
`,
    note: ["Unintended selection", "Overusing antibiotics and pesticides is a kind of human-driven selection: it favors resistant bacteria and insects."],
    ex: ["Compare", "How does breeding cows for high milk production differ from natural selection?", ["The selecting agent is human choice, not environmental survival.", "The trait favored may not increase fitness in the wild."], "humans choose which individuals reproduce, based on traits useful to people."],
  },
  {
    id: "population-genetics",
    obj: ["Describe how mutation, genetic drift, gene flow and selection change allele frequencies."],
    terms: [
      ["Genetic drift", "Random changes in allele frequencies, strongest in small populations."],
      ["Bottleneck effect", "Drift after a population is drastically reduced in size."],
      ["Founder effect", "Drift when a few individuals start a new population."],
      ["Gene flow", "Movement of alleles between populations by migration."],
    ],
    checks: [
      ["Why does drift have a bigger effect in small populations?", "Chance events change a larger fraction of the alleles."],
      ["How does gene flow affect differences between populations?", "It reduces them by mixing alleles."],
    ],
    body: String.raw`
Evolution is a change in **allele frequencies** in a population's **gene pool**.

| Mechanism | Random? | Effect |
| --- | --- | --- |
| mutation | yes | source of new alleles |
| genetic drift | yes | random changes; can lose alleles, especially in small populations |
| gene flow | no | makes populations more similar |
| natural selection | no | increases alleles that improve fitness |
| nonrandom mating | no | changes genotype frequencies |

**Bottlenecks** (for example, after a natural disaster or overhunting) and **founder events** reduce genetic diversity, which can leave populations less able to adapt.
`,
    note: ["Diversity matters", "Populations with low genetic diversity are more vulnerable to disease and environmental change."],
    ex: ["Identify the mechanism", "A storm randomly kills 90 percent of a beetle population, and an allele that was rare becomes common by chance. What mechanism is this?", ["The survivors were not chosen by their traits."], "genetic drift (a bottleneck)."],
  },
  {
    id: "hardy-weinberg-equilibrium",
    obj: ["Use the Hardy–Weinberg equations to calculate allele and genotype frequencies.", "List the conditions for Hardy–Weinberg equilibrium."],
    terms: [
      ["Allele frequency", "The proportion of a particular allele in a population's gene pool."],
      ["Hardy–Weinberg equilibrium", "A state in which allele and genotype frequencies stay constant from generation to generation."],
    ],
    checks: [
      ["If 16 percent of a population shows a recessive trait, what is q?", "q = √0.16 = 0.4."],
      ["Name the five conditions for Hardy–Weinberg equilibrium.", "Large population, no migration, no mutation, random mating, no natural selection."],
    ],
    body: String.raw`
For a gene with two alleles:

$$p + q = 1 \qquad p^2 + 2pq + q^2 = 1$$

- $$p$$: frequency of the dominant allele; $$q$$: frequency of the recessive allele.
- $$p^2$$: homozygous dominant; $$2pq$$: heterozygous; $$q^2$$: homozygous recessive.

## Conditions

Frequencies stay constant only if the population is large, mating is random, and there is no mutation, migration or selection. Real populations rarely meet all five, so the model is a **null hypothesis**: if observed frequencies differ from expected, evolution is happening.

## Strategy

Start from the homozygous recessive frequency, the only genotype you can identify by phenotype: $$q = \sqrt{q^2}$$.
`,
    note: ["Chi-square with Hardy–Weinberg", "Observed genotype counts can be compared with the counts expected from p and q using a chi-square test."],
    ex: ["Carrier frequency", "In a population, 9 percent of individuals have a recessive phenotype. What percentage are heterozygous carriers?", ["q² = 0.09, so q = 0.3 and p = 0.7.", "2pq = 2(0.7)(0.3) = 0.42."], "42 percent."],
  },
  {
    id: "evidence-of-evolution",
    obj: ["Evaluate evidence for evolution from fossils, morphology, molecular biology and biogeography."],
    terms: [
      ["Homologous structures", "Structures with a shared ancestral origin but possibly different functions, such as vertebrate forelimbs."],
      ["Vestigial structure", "A reduced structure with little or no function, inherited from an ancestor."],
      ["Analogous structures", "Similar functions from different origins (convergent evolution), such as bird and insect wings."],
    ],
    checks: [
      ["Which kind of structure provides evidence of common ancestry: homologous or analogous?", "Homologous."],
      ["How can fossils be dated?", "By the layer of rock they are in (relative dating) and by radioactive decay of isotopes (absolute dating)."],
    ],
    body: String.raw`
Evolution is supported by many independent lines of evidence.

- **Fossils**: show change over time and transitional forms; dated by rock layers and radioisotopes.
- **Morphology**: homologous structures and vestigial structures reveal shared ancestry.
- **Molecular**: DNA and protein sequences; more closely related species have more similar sequences.
- **Embryology**: early embryos of related groups share features, such as pharyngeal pouches in vertebrates.
- **Biogeography**: species on islands resemble those on the nearest mainland.
`,
    note: ["Molecules are strongest", "Sequence comparisons can measure relatedness precisely, even between organisms that look nothing alike."],
    ex: ["Using sequence data", "Species A and B differ by 3 amino acids in a protein; A and C differ by 15. Which pair shares a more recent common ancestor?", ["Fewer differences suggests more recent divergence."], "A and B."],
  },
  {
    id: "common-ancestry",
    obj: ["Explain how shared features of all living things support common ancestry."],
    terms: [["Common ancestry", "The idea that all living organisms descended from a shared ancestor."]],
    checks: [
      ["Name three features shared by all living things.", "DNA as genetic material, a nearly universal genetic code, ribosomes, and core metabolic pathways like glycolysis."],
      ["What features do eukaryotes share?", "Membrane-bound organelles, linear chromosomes and genes with introns."],
    ],
    body: String.raw`
Features conserved across all life point to a single origin.

## Shared by all organisms

- DNA (or RNA) as hereditary material.
- A nearly universal genetic code.
- Ribosomes, and similar transcription and translation machinery.
- Core metabolism such as glycolysis.
- Cell membranes of phospholipids.

## Shared by eukaryotes

- Membrane-bound organelles, including the nucleus.
- Linear chromosomes.
- Genes containing introns.

These shared traits are best explained by inheritance from common ancestors rather than independent origins.
`,
    note: ["Conserved for a reason", "Core processes changed little because mutations in them are usually harmful: nearly all organisms depend on them to survive."],
    ex: ["Interpreting a feature", "A human gene works when inserted into bacteria and yeast. What does this support?", ["All three read the genetic code the same way."], "common ancestry, through a shared genetic code."],
  },
  {
    id: "continuing-evolution",
    obj: ["Describe evidence that populations continue to evolve."],
    terms: [["Antibiotic resistance", "The ability of bacteria to survive an antibiotic, often from mutations or genes acquired by horizontal transfer."]],
    checks: [
      ["Give two examples of evolution observed today.", "Antibiotic-resistant bacteria, pesticide-resistant insects, new flu strains each year."],
      ["Why do new flu vaccines have to be made every year?", "The virus evolves rapidly, so last year's antibodies may not recognize it."],
    ],
    body: String.raw`
Evolution is ongoing and can be observed.

- **Antibiotic resistance**: antibiotics kill susceptible bacteria; resistant ones survive and multiply.
- **Pesticide and herbicide resistance** in insects and weeds.
- **Viral evolution**: high mutation rates let viruses like influenza and HIV change rapidly.
- **Changing environments** drive change in populations, as with Darwin's finches during droughts.

The fossil record and genomic data show that evolution has occurred over long periods and continues.
`,
    note: ["Mutation first", "In each case, the resistant variants existed (or arose randomly) before selection. The antibiotic or pesticide only changes which survive."],
    ex: ["Resistance", "Why does stopping an antibiotic course early promote resistance?", ["The most susceptible bacteria die first.", "Partially resistant survivors are left to multiply."], "it selects for bacteria with more resistance."],
  },
  {
    id: "phylogeny",
    obj: ["Read and construct phylogenetic trees and cladograms from shared characters and molecular data."],
    terms: [
      ["Phylogenetic tree", "A diagram of hypothesized evolutionary relationships; branch lengths may show time or amount of change."],
      ["Node", "A branch point representing the most recent common ancestor of the groups beyond it."],
      ["Shared derived character", "A trait that evolved in a group's common ancestor and is shared by its descendants."],
      ["Outgroup", "A group outside the group being studied, used for comparison."],
    ],
    checks: [
      ["How do you tell which two taxa are most closely related on a tree?", "They share the most recent common ancestor (the nearest node)."],
      ["Why is molecular data often more reliable than morphology?", "Similar morphology can arise by convergent evolution."],
    ],
    body: String.raw`
Phylogenetic trees are **hypotheses** about evolutionary history, revised as new evidence appears.

## Reading trees

- Each **node** is a common ancestor.
- Taxa that share a more recent node are more closely related.
- Rotating branches around a node does not change the relationships.
- A **clade** is an ancestor and all of its descendants.

## Building trees

Group organisms by **shared derived characters**. The **outgroup** lacks the derived traits and roots the tree. Trees built from DNA sequences group species with the fewest differences together. The best tree usually requires the fewest evolutionary changes (**parsimony**).
`,
    note: ["Not a ladder", "Living species are not ancestors of each other. Humans did not evolve from chimpanzees; both share a common ancestor."],
    ex: ["Character table", "Lamprey: none of the traits. Trout: jaws. Frog: jaws, four limbs. Lizard: jaws, four limbs, amniotic egg. Which is the outgroup, and which two are most closely related?", ["The lamprey lacks all derived traits: outgroup.", "Frog and lizard share the most derived traits."], "lamprey is the outgroup; frog and lizard are most closely related among those listed."],
  },
  {
    id: "speciation",
    obj: ["Explain how reproductive isolation leads to speciation, and compare allopatric and sympatric speciation."],
    terms: [
      ["Biological species concept", "A species is a group of populations whose members can interbreed and produce fertile offspring."],
      ["Allopatric speciation", "Speciation after populations are separated geographically."],
      ["Sympatric speciation", "Speciation within the same area, for example through polyploidy or habitat differences."],
      ["Prezygotic barrier", "A barrier that prevents mating or fertilization."],
    ],
    checks: [
      ["Give an example of a postzygotic barrier.", "Hybrid sterility, as in mules, or reduced hybrid viability."],
      ["How can polyploidy cause sympatric speciation in plants?", "Polyploid offspring cannot produce fertile offspring with the parent species."],
    ],
    body: String.raw`
A new species forms when populations become **reproductively isolated**.

## Barriers

- **Prezygotic**: habitat, temporal (different breeding times), behavioral (different courtship), mechanical (incompatible parts), gametic (sperm and egg cannot fuse).
- **Postzygotic**: hybrid inviability, hybrid sterility (mules), hybrid breakdown.

## Modes

- **Allopatric**: a geographic barrier separates populations; they diverge by mutation, drift and selection.
- **Sympatric**: no physical barrier; common in plants by polyploidy.

## Tempo

**Punctuated equilibrium**: long periods of little change interrupted by rapid change. **Gradualism**: slow, steady change. Both patterns appear in the fossil record. **Adaptive radiation** occurs when many species arise rapidly to fill new niches.
`,
    note: ["Divergence after separation", "Once gene flow stops, differences accumulate. Even if the populations meet again, they may no longer interbreed."],
    ex: ["Classify the barrier", "Two frog species in the same pond breed in different months. What kind of barrier is this?", ["They never mate, so it is prezygotic.", "The difference is in timing."], "a temporal, prezygotic barrier."],
  },
  {
    id: "extinction",
    obj: ["Explain causes of extinction and how extinction affects diversity."],
    terms: [
      ["Extinction", "The disappearance of a species."],
      ["Mass extinction", "Loss of a large proportion of species in a short geological time."],
    ],
    checks: [
      ["Why do mass extinctions often lead to rapid speciation afterward?", "Surviving species can diversify into the niches left empty."],
      ["Name a human activity that increases extinction rates.", "Habitat destruction, overharvesting, pollution, introduced species or climate change."],
    ],
    body: String.raw`
Extinction has occurred throughout Earth's history. Most species that ever lived are extinct.

- **Background extinction** happens steadily.
- **Mass extinctions** (five in the fossil record) followed catastrophic events such as asteroid impacts and massive volcanic activity.
- Human activities are now raising extinction rates through habitat loss, overharvesting, pollution, invasive species and climate change.

Species diversity depends on the balance of **speciation and extinction**. Extinctions open niches that surviving lineages may fill through **adaptive radiation**, as mammals did after the dinosaurs' extinction.
`,
    note: ["Diversity as insurance", "Ecosystems with more species and more genetic diversity are generally more resilient to change."],
    ex: ["After an extinction", "Why did mammals diversify rapidly after the extinction of the non-avian dinosaurs?", ["Many niches became available.", "Mammal lineages adapted to fill them, forming many new species."], "adaptive radiation into vacant niches."],
  },
  {
    id: "variations-in-populations",
    obj: ["Explain how genetic diversity affects a population's ability to respond to environmental change."],
    terms: [["Genetic diversity", "The variety of alleles and genotypes within a population."]],
    checks: [
      ["Why were genetically uniform potato crops vulnerable to blight?", "No plants carried resistance alleles, so the disease affected nearly all of them."],
      ["What effect does a bottleneck have on diversity?", "It reduces genetic diversity."],
    ],
    body: String.raw`
Populations with more **genetic variation** are more likely to include individuals that survive a new disease, climate shift or predator.

- In the Irish potato famine, widely planted, genetically similar potatoes all succumbed to the same pathogen.
- Cheetahs have very low genetic diversity after past bottlenecks, which raises concern about disease.
- Some alleles that are harmful in one environment are advantageous in another; heterozygotes for the sickle-cell allele are more resistant to malaria.

Conservation programs try to preserve genetic diversity, for example by moving individuals between isolated populations.
`,
    note: ["Variation is not always visible", "Many alleles have no visible effect until conditions change."],
    ex: ["Predict", "Two populations of a plant face a new fungus. Population A is genetically diverse; B is a set of clones. Which is more likely to persist?", ["A probably includes some resistant individuals.", "B's plants share the same genotype and response."], "population A."],
  },
  {
    id: "origin-of-life-on-earth",
    obj: ["Describe hypotheses for the origin of life, including the RNA world."],
    terms: [
      ["Primitive Earth hypothesis", "Organic molecules formed from inorganic ones in early Earth conditions, powered by energy like lightning."],
      ["RNA world hypothesis", "Early life used RNA both to store information and to catalyze reactions."],
    ],
    checks: [
      ["Why is RNA a good candidate for the first genetic material?", "It can store information and act as a catalyst (ribozymes)."],
      ["About how old is Earth, and when did life appear?", "About 4.6 billion years; fossil evidence of life dates to about 3.5 billion years ago."],
    ],
    body: String.raw`
Earth formed about 4.6 billion years ago; evidence of life appears by about 3.5 billion years ago.

## Models

1. **Abiotic synthesis**: simple inorganic molecules formed organic monomers. Experiments simulating early-Earth conditions produced amino acids. Organic molecules may also have arrived on meteorites.
2. **Polymers**: monomers joined into polymers, perhaps on clay surfaces or near hydrothermal vents.
3. **Protocells**: lipids self-assembled into membrane-bound vesicles, separating inside from outside.
4. **Self-replication**: in the **RNA world**, RNA molecules stored information and catalyzed reactions. DNA, more stable, later took over information storage, and proteins took over most catalysis.

Ribosomes, where RNA still catalyzes peptide bonds, support this idea.
`,
    note: ["Models and evidence", "These are scientific models supported by experiments and geological evidence, and they are refined as new evidence appears."],
    ex: ["Supporting the RNA world", "Which observation best supports the RNA world hypothesis?", ["The catalytic site of the ribosome is made of RNA, not protein."], "RNA can both carry information and catalyze reactions."],
  },
];
