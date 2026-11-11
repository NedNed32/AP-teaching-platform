/* AP Biology Unit 1: Chemistry of Life. Bodies use String.raw so TeX backslashes survive. */
export const lessons = [
  {
    id: "structure-of-water-and-hydrogen-bonding",
    obj: ["Explain how hydrogen bonds between polar water molecules give water its properties."],
    terms: [
      ["Polar covalent bond", "A covalent bond in which electrons are shared unequally, giving the atoms partial charges."],
      ["Hydrogen bond", "A weak attraction between a partially positive hydrogen and a partially negative atom (such as O or N) of another molecule."],
      ["Cohesion", "Attraction between molecules of the same substance, such as water to water."],
      ["Adhesion", "Attraction between molecules of different substances, such as water to the walls of a xylem vessel."],
    ],
    checks: [
      ["Why is a water molecule polar?", "Oxygen is more electronegative, so it carries a partial negative charge and the hydrogens partial positive charges."],
      ["Which property of water lets it move up a narrow tube against gravity?", "Cohesion and adhesion together (capillary action)."],
    ],
    body: String.raw`
Life depends on water, and water's unusual behavior comes from **hydrogen bonding**.

## A polar molecule

In water, oxygen pulls shared electrons more strongly than hydrogen does. The oxygen end carries a partial negative charge and the hydrogen ends partial positive charges. Opposite partial charges on neighboring molecules attract: these are **hydrogen bonds**.

## Properties that follow

| Property | Why it matters for life |
| --- | --- |
| cohesion and surface tension | water columns in plants hold together; insects can walk on water |
| adhesion | water clings to cell walls, aiding transport in xylem |
| high specific heat | oceans and bodies resist temperature change |
| high heat of vaporization | sweating cools organisms |
| ice is less dense than liquid water | ice floats and insulates lakes |
| excellent solvent for polar and ionic substances | dissolves nutrients and ions in cells and blood |
`,
    note: ["Weak alone, strong together", "Each hydrogen bond is weak and constantly breaking and re-forming, but the huge number of them gives water its cohesion and high specific heat."],
    ex: ["Transpiration", "Explain how water moves from roots to leaves in a tall tree.", ["Water evaporates from leaves, pulling on the water column behind it.", "Cohesion (hydrogen bonds between water molecules) keeps the column continuous.", "Adhesion to the xylem walls helps the column resist gravity."], "hydrogen bonding provides the cohesion and adhesion that let evaporation pull water upward."],
  },
  {
    id: "elements-of-life",
    obj: ["Describe how living systems use the elements carbon, hydrogen, oxygen, nitrogen, phosphorus and sulfur to build molecules."],
    terms: [
      ["Macromolecule", "A large molecule, such as a protein or nucleic acid, built from smaller subunits."],
      ["Nitrogen-containing molecules", "Proteins (in amino groups) and nucleic acids (in nitrogenous bases)."],
    ],
    checks: [
      ["Which two classes of macromolecules contain nitrogen?", "Proteins and nucleic acids."],
      ["Which element is found in nucleic acids and phospholipids but not in carbohydrates?", "Phosphorus."],
    ],
    body: String.raw`
Organisms constantly exchange matter with their environment to obtain the atoms they need to grow, reproduce and maintain organization.

## Where the elements go

| Element | Used to build |
| --- | --- |
| carbon | the backbone of all organic molecules |
| hydrogen, oxygen | all macromolecules |
| nitrogen | proteins (amino acids) and nucleic acids (bases) |
| phosphorus | nucleic acids (phosphate groups), phospholipids, ATP |
| sulfur | some amino acids (such as cysteine), allowing disulfide bridges |

Carbon can form four covalent bonds, so it builds long chains, branches and rings: the skeletons of biological molecules.

## Matter cycles

Plants take in carbon dioxide; nitrogen and phosphorus come from the soil, often recycled by decomposers. Animals obtain these elements by eating.
`,
    note: ["Tracing atoms", "Radioactive or heavy isotopes of elements like phosphorus and sulfur let scientists track which molecules contain them. That is how experiments showed DNA, which has phosphorus, is the genetic material."],
    ex: ["Labeling experiment", "Bacteria are grown with radioactive phosphorus. Which molecules will become labeled?", ["Phosphorus is in phosphate groups.", "Phosphate groups occur in DNA, RNA, ATP and phospholipids."], "nucleic acids, ATP and phospholipids, but not most proteins or carbohydrates."],
  },
  {
    id: "introduction-to-biological-macromolecules",
    obj: ["Describe how dehydration synthesis and hydrolysis build and break polymers."],
    terms: [
      ["Monomer", "A small subunit that can bond to others to form a polymer."],
      ["Dehydration synthesis", "A reaction that links two monomers by removing a water molecule."],
      ["Hydrolysis", "A reaction that breaks a bond between monomers by adding a water molecule."],
    ],
    checks: [
      ["How many water molecules are released when 10 amino acids join into a chain?", "9, one for each new bond."],
      ["Which reaction does digestion of food mostly use?", "Hydrolysis."],
    ],
    body: String.raw`
Most biological macromolecules are **polymers**: chains of similar **monomers**.

| Polymer | Monomer | Bond |
| --- | --- | --- |
| polysaccharide | monosaccharide | glycosidic linkage |
| protein | amino acid | peptide bond |
| nucleic acid | nucleotide | phosphodiester bond |

Lipids are not true polymers, but fats are also built by dehydration synthesis (glycerol plus fatty acids).

## Building and breaking

- **Dehydration synthesis** joins monomers and releases water. It requires energy.
- **Hydrolysis** adds water to break the bond and releases energy.

Enzymes speed up both reactions.
`,
    note: ["Counting waters", "Joining n monomers in a straight chain forms n − 1 bonds and releases n − 1 water molecules."],
    ex: ["A polysaccharide", "A starch chain of 500 glucose units is completely hydrolyzed. How many water molecules are used?", ["The chain has 499 glycosidic bonds.", "Each bond needs one water to break."], "499 water molecules."],
  },
  {
    id: "properties-of-biological-macromolecules",
    obj: ["Describe the structure and properties of carbohydrates, lipids, proteins and nucleic acids."],
    terms: [
      ["R group", "The side chain that distinguishes each amino acid; it may be nonpolar, polar or charged."],
      ["Saturated fatty acid", "A fatty acid with no carbon–carbon double bonds; straight chains pack tightly and are solid at room temperature."],
      ["Phospholipid", "A lipid with a hydrophilic phosphate head and two hydrophobic fatty acid tails."],
    ],
    checks: [
      ["Why are unsaturated fats usually liquid at room temperature?", "Double bonds create kinks that keep the chains from packing tightly."],
      ["What determines an amino acid's chemical properties?", "Its R group."],
    ],
    body: String.raw`
Each class of macromolecule has a characteristic structure that determines its function.

## Carbohydrates

Sugars (monosaccharides) link into polysaccharides. **Starch** and **glycogen** store energy; **cellulose** (plants) and **chitin** (fungi, arthropods) provide structure.

## Lipids

Nonpolar and hydrophobic. **Fats** (triglycerides) store energy. **Saturated** fatty acids have no double bonds; **unsaturated** ones have double bonds that kink the chain. **Phospholipids** are amphipathic: polar heads, nonpolar tails, so they form bilayers. **Steroids** like cholesterol have four fused rings.

## Proteins

Amino acids share an amino group, a carboxyl group and a central carbon, and differ in their **R groups**. R-group chemistry (nonpolar, polar, acidic, basic) determines how a protein folds.

## Nucleic acids

Nucleotides (sugar, phosphate, base) form DNA and RNA, which store and transmit information.
`,
    note: ["Directionality", "Polymers have ends that differ: proteins have an amino (N) terminus and a carboxyl (C) terminus; nucleic acids have 5′ and 3′ ends. New monomers are always added to a specific end."],
    ex: ["Classify a molecule", "A molecule contains C, H and O only, is hydrophobic, and has three long hydrocarbon chains attached to a three-carbon backbone. What is it?", ["Hydrophobic with hydrocarbon chains: a lipid.", "Three chains on glycerol: a triglyceride."], "a fat (triglyceride)."],
  },
  {
    id: "structure-and-function-of-biological-macromolecules",
    obj: ["Explain how the levels of protein structure determine function and how changes in structure change function."],
    terms: [
      ["Primary structure", "The sequence of amino acids in a polypeptide."],
      ["Secondary structure", "Alpha helices and beta pleated sheets held by hydrogen bonds in the backbone."],
      ["Tertiary structure", "The overall 3D shape of a polypeptide, determined by R-group interactions."],
      ["Quaternary structure", "The arrangement of multiple polypeptide subunits."],
      ["Denaturation", "Loss of a protein's shape, and usually its function, due to heat, pH or chemicals."],
    ],
    checks: [
      ["Which level of structure is determined directly by the gene?", "Primary structure, the amino acid sequence."],
      ["Why can a single amino acid change alter a protein's function?", "It can change R-group interactions, and therefore the protein's folding and shape."],
    ],
    body: String.raw`
A protein's function depends on its **shape**, and its shape depends on its amino acid sequence.

| Level | What holds it |
| --- | --- |
| primary | peptide bonds (sequence) |
| secondary | hydrogen bonds between backbone atoms |
| tertiary | R-group interactions: hydrophobic clustering, hydrogen bonds, ionic bonds, disulfide bridges |
| quaternary | interactions between subunits (as in hemoglobin) |

In water, hydrophobic R groups tend to cluster inside the protein while polar and charged groups face outward.

## Other macromolecules

- Starch's helical shape suits storage; cellulose's straight, hydrogen-bonded chains suit structural strength.
- DNA's double helix and base pairing suit storing and copying information.
`,
    note: ["Structure predicts function", "On the exam, if a question changes a molecule's structure (an amino acid substitution, a high temperature, a pH change), predict the change in shape first, then the change in function."],
    ex: ["Sickle-cell hemoglobin", "A substitution replaces a charged amino acid with a nonpolar one on hemoglobin's surface. Predict the effect.", ["The nonpolar R group is now exposed to water.", "Hydrophobic patches on different hemoglobin molecules stick together.", "The proteins form fibers that deform red blood cells."], "a single change in primary structure alters how the proteins interact, changing function."],
  },
  {
    id: "nucleic-acids",
    obj: ["Compare the structure of DNA and RNA and explain base pairing."],
    terms: [
      ["Nucleotide", "A monomer of nucleic acids: a five-carbon sugar, a phosphate group and a nitrogenous base."],
      ["Antiparallel", "The two strands of DNA run in opposite 5′ to 3′ directions."],
      ["Complementary base pairing", "A pairs with T (or U in RNA) and G pairs with C, by hydrogen bonds."],
    ],
    checks: [
      ["A DNA sample is 30 percent adenine. What percentage is guanine?", "20 percent: A = T = 30, leaving 40 for G and C equally."],
      ["Name two structural differences between DNA and RNA.", "DNA has deoxyribose and thymine and is usually double-stranded; RNA has ribose and uracil and is usually single-stranded."],
    ],
    body: String.raw`
Nucleic acids store and transmit hereditary information.

## Structure

Each nucleotide has a sugar, a phosphate and a base. The sugar of one nucleotide bonds to the phosphate of the next, forming a **sugar-phosphate backbone** with a 5′ end and a 3′ end.

| | DNA | RNA |
| --- | --- | --- |
| sugar | deoxyribose | ribose |
| bases | A, T, G, C | A, U, G, C |
| strands | usually two, antiparallel | usually one |

Purines (A, G) have two rings; pyrimidines (C, T, U) have one. Each base pair joins a purine and a pyrimidine, so the helix has a uniform width. G–C pairs form three hydrogen bonds; A–T pairs form two.

## Chargaff's rule

In double-stranded DNA, %A = %T and %G = %C.
`,
    note: ["Writing the complement", "The complementary strand is antiparallel. If one strand reads 5′-ATGC-3′, its partner reads 3′-TACG-5′, which is written 5′-GCAT-3′."],
    ex: ["Base composition", "A double-stranded DNA molecule is 22 percent cytosine. What percentage is thymine?", ["G = C = 22 percent, totaling 44.", "The remaining 56 percent is split equally between A and T."], "28 percent."],
  },
];
