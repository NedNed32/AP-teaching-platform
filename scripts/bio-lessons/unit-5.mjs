/* AP Biology Unit 5: Heredity. */
export const lessons = [
  {
    id: "meiosis",
    obj: ["Describe meiosis and compare it with mitosis."],
    terms: [
      ["Meiosis", "Two divisions that produce four haploid cells from one diploid cell."],
      ["Homologous chromosomes", "A pair of chromosomes, one from each parent, with the same genes in the same order."],
      ["Haploid", "Having one set of chromosomes (n)."],
    ],
    checks: [
      ["In which division do homologous chromosomes separate?", "Meiosis I."],
      ["How many chromosomes are in a human gamete?", "23."],
    ],
    body: String.raw`
Meiosis produces gametes with half the chromosome number, so fertilization restores the diploid number.

| | Mitosis | Meiosis |
| --- | --- | --- |
| divisions | one | two |
| products | 2 diploid, identical cells | 4 haploid, genetically different cells |
| homologs pair? | no | yes, in prophase I |
| purpose | growth, repair | sexual reproduction |

## The two divisions

- **Meiosis I** separates **homologous chromosomes**, halving the chromosome number.
- **Meiosis II** separates **sister chromatids**, like mitosis.
`,
    note: ["Ploidy changes in meiosis I", "After meiosis I the cells are already haploid, even though each chromosome still has two chromatids."],
    ex: ["Counting", "A cell with 2n = 8 undergoes meiosis. How many chromosomes are in each cell at the end of meiosis I and meiosis II?", ["Meiosis I separates homologs: 4 chromosomes (each with 2 chromatids).", "Meiosis II separates chromatids: 4 chromosomes (single chromatids)."], "4 and 4."],
  },
  {
    id: "meiosis-and-genetic-diversity",
    obj: ["Explain how crossing over, independent assortment and random fertilization create genetic variation."],
    terms: [
      ["Crossing over", "Exchange of segments between homologous chromosomes in prophase I."],
      ["Independent assortment", "Random orientation of homologous pairs at metaphase I, so each pair separates independently."],
    ],
    checks: [
      ["How many chromosome combinations can independent assortment produce in a cell with n = 3?", "2³ = 8."],
      ["Why is sexual reproduction an advantage in a changing environment?", "It produces genetically varied offspring, some of which may survive new conditions."],
    ],
    body: String.raw`
Sexual reproduction shuffles genes in three ways.

1. **Crossing over** (prophase I) creates new combinations of alleles on a chromosome.
2. **Independent assortment** (metaphase I): with $$n$$ pairs of chromosomes there are $$2^n$$ possible combinations. For humans, $$2^{23}$$, about 8 million.
3. **Random fertilization**: any sperm can fuse with any egg, multiplying the possibilities.

The resulting variation is the raw material for natural selection.
`,
    note: ["Linked genes", "Genes close together on a chromosome tend to be inherited together. Crossing over between them is rarer the closer they are."],
    ex: ["How many gametes?", "An organism has 2n = 10. Ignoring crossing over, how many genetically different gametes can it produce?", ["n = 5 pairs.", "2⁵ = 32."], "32."],
  },
  {
    id: "mendelian-genetics",
    obj: ["Predict offspring ratios with Punnett squares and the rules of probability.", "Use the chi-square test to compare observed and expected results."],
    terms: [
      ["Law of segregation", "The two alleles of a gene separate during gamete formation."],
      ["Law of independent assortment", "Alleles of genes on different chromosomes are inherited independently."],
      ["Chi-square test", "A statistical test comparing observed and expected counts."],
    ],
    checks: [
      ["What is the phenotype ratio of an Aa × Aa cross?", "3 dominant : 1 recessive."],
      ["What is the probability of an aabb offspring from AaBb × AaBb?", "1/4 × 1/4 = 1/16."],
    ],
    body: String.raw`
## Single-gene crosses

| Cross | Genotype ratio | Phenotype ratio |
| --- | --- | --- |
| Aa × Aa | 1 AA : 2 Aa : 1 aa | 3 : 1 |
| Aa × aa (test cross) | 1 Aa : 1 aa | 1 : 1 |

## Probability rules

- **Product rule** (independent events, "and"): multiply.
- **Sum rule** (mutually exclusive outcomes, "or"): add.

A dihybrid cross AaBb × AaBb gives a 9 : 3 : 3 : 1 phenotype ratio.

## Chi-square

$$\chi^2 = \sum \frac{(o - e)^2}{e}$$

Compare with the critical value for $$df$$ = number of categories − 1 at $$p = 0.05$$ (for example, 3.84 for df 1, 5.99 for df 2, 7.81 for df 3). If $$\chi^2$$ is less than the critical value, fail to reject the null hypothesis: the difference is likely due to chance.
`,
    note: ["Pedigrees", "Autosomal recessive traits can skip generations and appear in children of unaffected parents. Autosomal dominant traits appear in every generation in which the allele is present."],
    ex: ["Chi-square", "A cross expected to give 3 : 1 produces 290 purple and 110 white flowers. Do the data fit?", ["Expected: 300 and 100.", "χ² = 100/300 + 100/100 = 0.33 + 1.00 = 1.33.", "df = 1; critical value 3.84."], "1.33 is less than 3.84, so the data are consistent with a 3 : 1 ratio."],
  },
  {
    id: "non-mendelian-genetics",
    obj: ["Explain patterns of inheritance that do not follow simple Mendelian ratios."],
    terms: [
      ["Incomplete dominance", "Heterozygotes show an intermediate phenotype."],
      ["Codominance", "Both alleles are fully expressed in the heterozygote."],
      ["Sex-linked gene", "A gene on a sex chromosome, usually the X."],
      ["Linked genes", "Genes close together on the same chromosome, usually inherited together."],
    ],
    checks: [
      ["Why are X-linked recessive traits more common in males?", "Males have only one X, so a single recessive allele is expressed."],
      ["How is the distance between linked genes estimated?", "From the recombination frequency: 1 percent recombination equals 1 map unit."],
    ],
    body: String.raw`
| Pattern | Example | Result |
| --- | --- | --- |
| incomplete dominance | red × white snapdragons | pink heterozygotes; 1 : 2 : 1 in F₂ |
| codominance | ABO blood type IᴬIᴮ | both A and B antigens |
| multiple alleles | ABO (Iᴬ, Iᴮ, i) | more than two alleles in the population |
| polygenic traits | height, skin color | continuous variation |
| sex-linked | color blindness | more common in males |
| linked genes | genes close on a chromosome | parental combinations overrepresented |
| non-nuclear inheritance | mitochondrial genes | inherited from the mother |

## Recombination frequency

$$\text{recombination frequency} = \frac{\text{recombinant offspring}}{\text{total offspring}} \times 100$$
`,
    note: ["Spotting linkage", "If a dihybrid test cross gives far more parental types than the expected 1 : 1 : 1 : 1, the genes are probably linked."],
    ex: ["X-linked cross", "A carrier woman (XᴴXʰ) and an unaffected man (XᴴY) have a son. What is the chance he has the X-linked recessive trait?", ["Sons get Y from the father and one X from the mother.", "Half of the mother's eggs carry Xʰ."], "1/2."],
  },
  {
    id: "environmental-effects-on-phenotype",
    obj: ["Explain how the environment influences the expression of genes."],
    terms: [["Phenotypic plasticity", "The ability of one genotype to produce different phenotypes in different environments."]],
    checks: [
      ["Why are hydrangea flowers blue in some soils and pink in others?", "Soil pH changes the flower pigment's color, with the same genotype."],
      ["Give an example of temperature affecting phenotype.", "Siamese cats and Himalayan rabbits have dark fur on cooler body parts; in some reptiles, incubation temperature determines sex."],
    ],
    body: String.raw`
Genotype sets the possibilities; the environment affects which phenotype appears.

- **Soil pH** changes hydrangea flower color.
- **Temperature**: an enzyme for dark pigment in Himalayan rabbits works only at lower temperatures, so ears, nose and feet are dark. Incubation temperature determines sex in many turtles.
- **Diet**: people with phenylketonuria (PKU) develop normally on a low-phenylalanine diet.
- **Population density**: some locusts change color and behavior when crowded.

Identical twins can differ because of environmental effects on gene expression.
`,
    note: ["Not inherited changes", "Environmentally produced phenotypes are usually not passed to offspring, because the DNA sequence is unchanged."],
    ex: ["Designing a test", "How could you show that a plant's height difference is environmental rather than genetic?", ["Grow genetically identical plants (clones) in different conditions.", "Compare their heights."], "if clones differ by environment, the environment affects the phenotype."],
  },
  {
    id: "chromosomal-inheritance",
    obj: ["Explain how nondisjunction and other chromosomal changes cause disorders."],
    terms: [
      ["Nondisjunction", "Failure of chromosomes or chromatids to separate properly during meiosis."],
      ["Aneuploidy", "An abnormal number of a particular chromosome, such as trisomy 21."],
      ["Karyotype", "An ordered image of a cell's chromosomes."],
    ],
    checks: [
      ["What causes trisomy 21 (Down syndrome)?", "Nondisjunction produces a gamete with an extra chromosome 21."],
      ["How can a karyotype detect aneuploidy?", "By counting the chromosomes of each type."],
    ],
    body: String.raw`
Genes are carried on chromosomes, so changes in chromosome number or structure affect many genes at once.

## Nondisjunction

If homologs fail to separate in meiosis I, or sister chromatids in meiosis II, some gametes get an extra copy and others lack one. Fertilization produces **trisomy** (2n + 1) or **monosomy** (2n − 1).

| Condition | Chromosomes |
| --- | --- |
| Down syndrome | trisomy 21 |
| Turner syndrome | XO |
| Klinefelter syndrome | XXY |

## Other changes

Deletions, duplications, inversions and translocations alter chromosome structure. Pedigrees and karyotypes help diagnose genetic disorders.
`,
    note: ["Meiosis I versus II", "Nondisjunction in meiosis I makes all four gametes abnormal; in meiosis II, only two of the four are abnormal."],
    ex: ["Predict gametes", "Nondisjunction occurs in meiosis I for one chromosome pair in a cell with n = 4. What chromosome numbers do the gametes have?", ["One daughter of meiosis I gets both homologs, the other none.", "After meiosis II: two gametes with 5 and two with 3."], "5, 5, 3 and 3."],
  },
];
