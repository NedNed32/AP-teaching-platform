/* AP Biology Unit 6: Gene Expression and Regulation. */
export const lessons = [
  {
    id: "dna-and-rna-structure",
    obj: ["Compare how DNA is organized in prokaryotes and eukaryotes, and relate nucleic acid structure to heredity."],
    terms: [
      ["Plasmid", "A small circular DNA molecule found in bacteria, separate from the chromosome."],
      ["Chromatin", "DNA wound around histone proteins in eukaryotic chromosomes."],
    ],
    checks: [
      ["How does prokaryotic DNA differ from eukaryotic DNA?", "Prokaryotes usually have one circular chromosome (plus plasmids); eukaryotes have multiple linear chromosomes with histones in a nucleus."],
      ["What evidence showed that DNA is the genetic material?", "Experiments in which DNA, not protein, transformed bacteria or entered cells infected by viruses."],
    ],
    body: String.raw`
DNA, and in some viruses RNA, is the hereditary material.

| | Prokaryotes | Eukaryotes |
| --- | --- | --- |
| chromosomes | usually one, circular | several, linear |
| location | nucleoid | nucleus |
| packaging | fewer proteins | wrapped around histones |
| extra DNA | plasmids | mitochondrial and chloroplast DNA |

Base pairing (A–T, G–C; A–U in RNA) allows information to be copied and read. Plasmids can carry genes, such as antibiotic resistance, that pass between bacteria.
`,
    note: ["Purines and pyrimidines", "Every base pair joins a two-ring purine (A, G) with a one-ring pyrimidine (C, T, U), keeping the helix a constant width."],
    ex: ["Complementary strand", "Write the complementary DNA strand for 5′-AGGTCA-3′.", ["Pair each base: A–T, G–C.", "Reverse the direction so it reads 5′ to 3′."], "5′-TGACCT-3′."],
  },
  {
    id: "replication",
    obj: ["Describe semiconservative replication and the roles of key enzymes."],
    terms: [
      ["Semiconservative replication", "Each new DNA molecule contains one original strand and one new strand."],
      ["DNA polymerase", "The enzyme that adds nucleotides to the 3′ end of a growing strand."],
      ["Okazaki fragments", "Short DNA pieces made on the lagging strand, later joined by ligase."],
    ],
    checks: [
      ["Why is one strand made in fragments?", "DNA polymerase adds only to the 3′ end, so the lagging strand is built away from the fork in pieces."],
      ["What does helicase do?", "Unwinds the double helix by breaking hydrogen bonds between bases."],
    ],
    body: String.raw`
Before a cell divides, its DNA is copied so each daughter cell receives a complete set.

## Enzymes

| Enzyme | Role |
| --- | --- |
| helicase | unwinds the helix |
| topoisomerase | relieves twisting ahead of the fork |
| primase | lays down an RNA primer |
| DNA polymerase | adds nucleotides 5′ to 3′; proofreads |
| ligase | joins Okazaki fragments |

## Leading and lagging strands

The strands are antiparallel and polymerase works only 5′ to 3′. The **leading strand** is built continuously toward the fork; the **lagging strand** is built in **Okazaki fragments** away from it.
`,
    note: ["Semiconservative evidence", "Meselson and Stahl grew bacteria in heavy nitrogen, then switched to light nitrogen. After one generation all DNA was intermediate in density: each molecule had one old and one new strand."],
    ex: ["Density after two generations", "In a Meselson–Stahl experiment, what DNA densities appear after two generations in light nitrogen?", ["Generation 1: all hybrid (heavy/light).", "Generation 2: each hybrid gives one hybrid and one light molecule."], "half hybrid, half light."],
  },
  {
    id: "transcription-and-rna-processing",
    obj: ["Describe transcription and eukaryotic RNA processing."],
    terms: [
      ["RNA polymerase", "The enzyme that builds RNA from a DNA template, 5′ to 3′."],
      ["Intron", "A noncoding segment removed from pre-mRNA."],
      ["Exon", "A segment that remains in mature mRNA and is usually translated."],
      ["Alternative splicing", "Joining different combinations of exons to make different mRNAs from one gene."],
    ],
    checks: [
      ["Which DNA strand does RNA polymerase read?", "The template strand, read 3′ to 5′."],
      ["What three modifications occur to eukaryotic pre-mRNA?", "A 5′ cap, a poly-A tail, and splicing out of introns."],
    ],
    body: String.raw`
## Transcription

RNA polymerase binds the **promoter**, unwinds the DNA and builds RNA complementary to the **template strand**. The RNA matches the coding strand, with U in place of T.

## RNA processing (eukaryotes)

- A **5′ cap** (modified guanine) is added.
- A **poly-A tail** is added to the 3′ end.
- **Splicing** removes introns and joins exons.

The cap and tail protect the mRNA and help it leave the nucleus and bind ribosomes. **Alternative splicing** lets one gene encode several proteins.

Prokaryotes do not process mRNA this way; translation can begin while transcription is still underway.
`,
    note: ["Kinds of RNA", "mRNA carries the code; tRNA brings amino acids; rRNA forms the core of ribosomes. Some RNAs also regulate genes."],
    ex: ["Transcribe", "The template strand reads 3′-TACGGA-5′. What is the mRNA?", ["Pair each base: T→A, A→U, C→G, G→C.", "The mRNA is antiparallel to the template."], "5′-AUGCCU-3′."],
  },
  {
    id: "translation",
    obj: ["Describe translation and use a codon table to predict amino acid sequences."],
    terms: [
      ["Codon", "A sequence of three mRNA bases that specifies an amino acid or a stop signal."],
      ["Anticodon", "The three tRNA bases that pair with a codon."],
      ["Start codon", "AUG, which codes for methionine and begins translation."],
    ],
    checks: [
      ["How many amino acids does a 300-nucleotide coding region (excluding the stop codon) encode?", "100."],
      ["Why is the genetic code called nearly universal?", "Almost all organisms use the same codons, evidence of common ancestry."],
    ],
    body: String.raw`
Ribosomes translate mRNA into a polypeptide.

1. **Initiation**: the ribosome assembles at the start codon AUG with a methionine-carrying tRNA.
2. **Elongation**: tRNAs with matching anticodons bring amino acids; peptide bonds form; the ribosome moves along one codon at a time (5′ to 3′).
3. **Termination**: a stop codon (UAA, UAG, UGA) causes release of the polypeptide.

The code is **redundant**: most amino acids have more than one codon. It is nearly **universal**, which is why bacteria can make human proteins from inserted genes.

| Codon | Amino acid | Codon | Amino acid |
| --- | --- | --- | --- |
| AUG | Met (start) | UUU | Phe |
| GCU | Ala | AAA | Lys |
| UGG | Trp | GGC | Gly |
| CCU | Pro | UAA | stop |
`,
    note: ["Viruses", "Retroviruses such as HIV use reverse transcriptase to make DNA from their RNA genome, which is then inserted into the host's DNA."],
    ex: ["Translate", "Using the table, translate the mRNA 5′-AUGGCUAAAUGGUAA-3′.", ["Codons: AUG GCU AAA UGG UAA.", "Met, Ala, Lys, Trp, stop."], "Met–Ala–Lys–Trp."],
  },
  {
    id: "regulation-of-gene-expression",
    obj: ["Explain how operons, transcription factors and epigenetic changes regulate gene expression."],
    terms: [
      ["Operon", "A cluster of prokaryotic genes under the control of one promoter and operator."],
      ["Repressor", "A protein that binds the operator and blocks transcription."],
      ["Transcription factor", "A protein that binds DNA and helps start or block transcription."],
      ["Epigenetic change", "A heritable change in gene expression without a change in DNA sequence, such as DNA methylation."],
    ],
    checks: [
      ["What turns on the lac operon?", "Lactose (allolactose) binds the repressor, releasing it from the operator."],
      ["How does DNA methylation usually affect expression?", "It tightens chromatin and reduces transcription."],
    ],
    body: String.raw`
Cells express only the genes they need.

## Prokaryotes: operons

- **lac operon (inducible)**: normally off. When lactose is present, it binds the repressor, which releases the operator, and the genes for lactose digestion are transcribed.
- **trp operon (repressible)**: normally on. When tryptophan is abundant, it activates the repressor, which shuts the operon off.

## Eukaryotes

- **Transcription factors** and enhancers control when genes are transcribed.
- **Chromatin**: acetylation of histones loosens DNA (more expression); **methylation** of DNA tightens it (less expression).
- After transcription: RNA processing, mRNA stability, small regulatory RNAs.
`,
    note: ["Two genes, one switch", "In eukaryotes, genes that must be expressed together often share the same regulatory sequences, so the same transcription factors control them."],
    ex: ["A mutant repressor", "A lac repressor mutation prevents it from binding lactose. What happens when lactose is present?", ["The repressor stays bound to the operator.", "The genes cannot be transcribed."], "the operon stays off even with lactose."],
  },
  {
    id: "gene-expression-and-cell-specialization",
    obj: ["Explain how differential gene expression produces specialized cells."],
    terms: [["Differential gene expression", "Different cells expressing different subsets of the same genome."]],
    checks: [
      ["Do a nerve cell and a liver cell from one person have the same DNA?", "Yes; they differ in which genes are expressed."],
      ["What determines which genes a cell expresses?", "The combination of transcription factors and signals present in that cell."],
    ],
    body: String.raw`
Every cell in an organism (with few exceptions) has the same DNA, yet cells are very different. The difference lies in which genes they **express**.

- Each cell type has a particular set of **transcription factors**.
- Signals from neighboring cells and the environment turn genes on or off during development.
- Small RNAs and chromatin changes fine-tune expression.

In development, cascades of regulatory genes (such as homeotic genes) control body plan and the timing of cell differentiation. **Apoptosis** shapes structures, for example separating fingers and toes.
`,
    note: ["Stem cells", "Stem cells have not yet committed to one pattern of gene expression, so they can become many cell types."],
    ex: ["Explaining specialization", "Insulin is made in pancreas cells but not skin cells, though both contain the insulin gene. Explain.", ["Pancreatic beta cells have the transcription factors that activate the insulin gene.", "Skin cells lack them, so the gene is not transcribed."], "differential gene expression controlled by transcription factors."],
  },
  {
    id: "mutations",
    obj: ["Predict the effects of point mutations and frameshifts on proteins.", "Explain how mutations and horizontal gene transfer create variation."],
    terms: [
      ["Substitution", "Replacement of one base with another; may be silent, missense or nonsense."],
      ["Frameshift", "An insertion or deletion not a multiple of three, shifting the reading frame."],
      ["Horizontal gene transfer", "Movement of genes between organisms other than by reproduction: transformation, transduction, conjugation."],
    ],
    checks: [
      ["Why does a single-base deletion usually have a larger effect than a substitution?", "It shifts the reading frame, changing every codon after it."],
      ["What is a silent mutation?", "A substitution that does not change the amino acid, because of code redundancy."],
    ],
    body: String.raw`
Mutations are changes in DNA. They are random with respect to whether they help the organism; the environment determines whether a mutation is beneficial, harmful or neutral.

| Mutation | Effect on protein |
| --- | --- |
| silent | none (same amino acid) |
| missense | one amino acid changed |
| nonsense | early stop codon; shortened protein |
| frameshift | all following codons change |

Causes include errors in replication, radiation and chemical mutagens.

## Sources of variation in prokaryotes

- **Transformation**: taking up DNA from the environment.
- **Transduction**: viruses carrying DNA between cells.
- **Conjugation**: transfer of plasmids through a pilus.

Viruses also have high mutation rates, allowing rapid evolution.
`,
    note: ["Mutations are not targeted", "Antibiotics do not cause resistance mutations; they select for bacteria that already carry them."],
    ex: ["Classify", "The codon UGG (Trp) mutates to UGA. What kind of mutation is this?", ["UGA is a stop codon."], "a nonsense mutation, producing a shortened protein."],
  },
  {
    id: "biotechnology",
    obj: ["Describe gel electrophoresis, PCR, bacterial transformation and DNA sequencing, and interpret results."],
    terms: [
      ["Gel electrophoresis", "Separation of DNA fragments by size in an electric field; smaller fragments move farther."],
      ["PCR", "Polymerase chain reaction: copying a DNA region many times by cycles of heating and cooling."],
      ["Transformation", "Introducing a plasmid or other DNA into a cell."],
    ],
    checks: [
      ["Why does DNA move toward the positive electrode?", "Its phosphate groups are negatively charged."],
      ["How many copies of a DNA region exist after 10 PCR cycles starting from one?", "2¹⁰ = 1,024."],
    ],
    body: String.raw`
## Gel electrophoresis

DNA is negatively charged and moves through a gel toward the positive end. **Small fragments move farther**. Comparing band patterns is used in forensics and paternity testing.

## PCR

1. Heat to separate strands.
2. Cool so primers bind.
3. Heat-stable DNA polymerase extends the primers.

Each cycle doubles the target DNA: after $$n$$ cycles, $$2^n$$ copies.

## Transformation and cloning

A gene is inserted into a plasmid, often with an antibiotic resistance gene; bacteria take up the plasmid. Growing them on antibiotics selects transformed cells, which can make the inserted protein (such as human insulin).

## Sequencing

DNA sequencing determines the order of bases, allowing comparison of genes and genomes.
`,
    note: ["Reading a gel", "A child's bands must each match a band from one parent. A crime-scene sample matches a suspect only if every band lines up."],
    ex: ["Fragment sizes", "A 1,000 base pair plasmid is cut at two sites, 300 base pairs apart. Which bands appear, and which moves farthest?", ["Two pieces: 300 bp and 700 bp.", "Smaller fragments travel farther."], "bands at 700 and 300 bp; the 300 bp band moves farthest."],
  },
];
