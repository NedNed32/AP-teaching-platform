/* AP Chemistry Units 1–2. */
const R = String.raw;
const L = (id, obj, terms, checks, body, note, ex) => ({ id, obj, terms, checks, body, note, ex });
export const lessons = [
  L("moles-and-molar-mass", ["Convert between mass, moles and number of particles using molar mass and Avogadro's number."],
    [["Mole", "6.022 × 10²³ particles (Avogadro's number)."], ["Molar mass", "The mass in grams of one mole of a substance (g/mol)."]],
    [["How many moles are in 36.0 g of water (18.0 g/mol)?", "2.00 mol."], ["How many molecules are in 0.500 mol of CO₂?", "3.01 × 10²³."]],
    R`
The mole connects the atomic scale to measurable masses.

$$n = \frac{m}{M} \qquad N = n \times N_A, \quad N_A = 6.022 \times 10^{23}\ \text{mol}^{-1}$$

The molar mass of a compound is the sum of its atoms' average atomic masses: $$\ce{H2O}$$ is $$2(1.008) + 16.00 = 18.02$$ g/mol.
`,
    ["Units guide you", "Write units on every step: g ÷ (g/mol) = mol, and mol × particles/mol = particles."],
    ["Mass to particles", R`How many molecules are in 11.0 g of $$\ce{CO2}$$ (44.0 g/mol)?`, [R`$$11.0/44.0 = 0.250$$ mol.`, R`$$0.250 \times 6.022 \times 10^{23}$$.`], R`$$1.51 \times 10^{23}$$ molecules.`]),
  L("mass-spectra-of-elements", ["Use mass spectra to identify isotopes and calculate average atomic mass."],
    [["Isotope", "Atoms of the same element with different numbers of neutrons."], ["Average atomic mass", "The weighted average of isotope masses by their relative abundance."]],
    [["Chlorine is 75.8% Cl-35 and 24.2% Cl-37. Is its average mass closer to 35 or 37?", "Closer to 35 (about 35.5)."], ["What does each peak in a mass spectrum represent?", "An isotope; its height shows relative abundance."]],
    R`
A mass spectrum plots relative abundance against mass. Each peak is an isotope.

$$\text{average mass} = \sum (\text{isotope mass} \times \text{fractional abundance})$$

The average lies closest to the most abundant isotope.
`,
    ["Percent to fraction", "Convert percentages to decimals before multiplying."],
    ["Average mass", "An element has isotopes of mass 63 (69%) and 65 (31%). Find the average atomic mass.", [R`$$63(0.69) + 65(0.31) = 43.47 + 20.15$$.`], "63.6 amu (copper)."]),
  L("elemental-composition-of-pure-substances", ["Relate empirical formulas to mass composition."],
    [["Empirical formula", "The simplest whole-number ratio of atoms in a compound."], ["Law of definite proportions", "A pure compound always has the same mass ratio of elements."]],
    [["What is the empirical formula of C₆H₁₂O₆?", "CH₂O."], ["What percent of H₂O's mass is hydrogen?", "About 11.2%."]],
    R`
$$\text{mass percent} = \frac{\text{mass of element in formula}}{\text{molar mass}} \times 100\%$$

**Finding an empirical formula**: convert mass (or percent) of each element to moles, divide by the smallest, and scale to whole numbers.
`,
    ["Molecular formula", "The molecular formula is a whole-number multiple of the empirical formula, found from the molar mass."],
    ["Empirical formula", "A compound is 40.0% C, 6.7% H and 53.3% O by mass. Find its empirical formula.", ["In 100 g: 3.33 mol C, 6.65 mol H, 3.33 mol O.", "Divide by 3.33: 1 : 2 : 1."], R`$$\ce{CH2O}$$.`]),
  L("composition-of-mixtures", ["Use elemental analysis to determine the composition of mixtures."],
    [["Mixture", "Two or more substances physically combined in variable proportions."], ["Purity", "The mass percent of the desired substance in a sample."]],
    [["Can a mixture's composition vary?", "Yes; that distinguishes it from a pure compound."], ["A 5.00 g sample contains 4.10 g of NaCl. What is its purity?", "82.0%."]],
    R`
Unlike pure substances, mixtures have variable composition. Elemental analysis can reveal how much of each component is present: if the measured mass percent of an element differs from that of the pure compound, the sample is impure or a mixture.

$$\text{percent purity} = \frac{\text{mass of pure substance}}{\text{mass of sample}} \times 100\%$$
`,
    ["Detecting impurities", "Compare measured percent composition with the theoretical value for the pure substance."],
    ["Impure sample", "Pure NaCl is 39.3% Na. A sample tests 35.0% Na, and any impurity contains no Na. What percent of the sample is NaCl?", [R`$$35.0/39.3 = 0.891$$.`], "about 89.1%."]),
  L("atomic-structure-and-electron-configuration", ["Write electron configurations and relate them to Coulomb's law."],
    [["Electron configuration", "The arrangement of electrons in orbitals, such as 1s² 2s² 2p⁶."], ["Coulomb's law", "Attraction increases with greater charge and smaller distance: F ∝ q₁q₂/r²."]],
    [["Write the configuration of sulfur (16 electrons).", "1s² 2s² 2p⁶ 3s² 3p⁴."], ["Why are core electrons harder to remove than valence electrons?", "They are closer to the nucleus and less shielded."]],
    R`
Electrons fill orbitals in order of increasing energy (aufbau): 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…

Example: $$\ce{Fe}$$ (26): $$1s^2 2s^2 2p^6 3s^2 3p^6 4s^2 3d^6$$, or $$[\ce{Ar}]\,4s^2 3d^6$$.

**Coulomb's law** explains why electrons closer to the nucleus, or attracted by more protons, are held more tightly.

For transition-metal cations, remove 4s electrons before 3d: $$\ce{Fe^{2+}}$$ is $$[\ce{Ar}]\,3d^6$$.
`,
    ["Effective nuclear charge", "Inner electrons shield outer ones from the full nuclear charge."],
    ["Configuration", "Write the configuration of Ca²⁺.", ["Ca (20): [Ar] 4s².", "Remove two 4s electrons."], R`$$[\ce{Ar}]$$, i.e. $$1s^2 2s^2 2p^6 3s^2 3p^6$$.`]),
  L("photoelectron-spectroscopy", ["Interpret photoelectron spectra (PES) in terms of electron configuration and binding energy."],
    [["Photoelectron spectroscopy", "A technique that measures the energy needed to remove electrons from each subshell."], ["Binding energy", "The energy required to remove an electron; higher for electrons closer to the nucleus."]],
    [["In PES, what does the height of a peak show?", "The relative number of electrons in that subshell."], ["Which peak has the highest binding energy?", "The 1s peak."]],
    R`
Each peak in a PES spectrum is a subshell:

- **Position** (binding energy): how strongly the electrons are held. Core electrons have high binding energies.
- **Height**: number of electrons (a 2p⁶ peak is three times a 2s² peak).

Moving across a period, binding energies for the same subshell increase because nuclear charge increases.
`,
    ["Reading the axis", "Binding energy axes often increase to the left. Check the direction before interpreting."],
    ["Identify the element", "A PES spectrum has three peaks with relative heights 2 : 2 : 3. Identify the element.", ["Peaks: 1s², 2s², 2p³."], "nitrogen."]),
  L("periodic-trends", ["Explain periodic trends in atomic radius, ionization energy, electronegativity and electron affinity."],
    [["Ionization energy", "The energy needed to remove an electron from a gaseous atom."], ["Electronegativity", "An atom's ability to attract shared electrons in a bond."]],
    [["Which is larger, Na or Cl?", "Na; across a period, radius decreases."], ["Why does ionization energy decrease down a group?", "Valence electrons are farther from the nucleus and more shielded."]],
    R`
| Trend | Across a period (left → right) | Down a group |
| --- | --- | --- |
| atomic radius | decreases | increases |
| ionization energy | increases | decreases |
| electronegativity | increases | decreases |

Explain with Coulomb's law: across a period, more protons with similar shielding pull electrons closer; down a group, electrons occupy higher shells farther from the nucleus.

Cations are smaller than their atoms; anions are larger.
`,
    ["Explain, do not just state", "AP answers need the reason: number of protons, shielding by core electrons, and distance from the nucleus."],
    ["Successive ionization energies", "An element's first three ionization energies are 738, 1451 and 7733 kJ/mol. Which group is it in?", ["The big jump is after the second electron.", "So it has 2 valence electrons."], "Group 2 (it is magnesium)."]),
  L("valence-electrons-and-ionic-compounds", ["Predict ion charges and formulas of ionic compounds from valence electrons."],
    [["Valence electrons", "Electrons in the outermost shell, which take part in bonding."], ["Ionic compound", "A compound of cations and anions held by electrostatic attraction."]],
    [["What ion does oxygen form?", "O²⁻."], ["What is the formula of aluminum oxide?", "Al₂O₃."]],
    R`
Main-group elements tend to gain or lose electrons to reach a noble-gas configuration:

| Group | Ion |
| --- | --- |
| 1 | +1 |
| 2 | +2 |
| 13 | +3 |
| 15 | −3 |
| 16 | −2 |
| 17 | −1 |

Ionic formulas balance total charge: $$\ce{Ca^{2+}}$$ and $$\ce{Cl^-}$$ give $$\ce{CaCl2}$$.

Elements in the same group form compounds with similar formulas ($$\ce{NaCl}$$, $$\ce{KCl}$$).
`,
    ["Predicting with the periodic table", "If you know one element's compound formula, others in the same group usually follow the same pattern."],
    ["Write a formula", "Write the formula of the compound formed by magnesium and nitrogen.", [R`$$\ce{Mg^{2+}}$$ and $$\ce{N^{3-}}$$.`, "3(+2) = 6 = 2(−3) in magnitude."], R`$$\ce{Mg3N2}$$.`]),
  L("types-of-chemical-bonds", ["Classify bonds as ionic, covalent or metallic using electronegativity."],
    [["Polar covalent bond", "Electrons are shared unequally between atoms of different electronegativity."], ["Metallic bond", "Cations in a sea of delocalized valence electrons."]],
    [["Which bond is more polar, H–F or H–Cl?", "H–F, because the electronegativity difference is larger."], ["What type of bonding is in a copper wire?", "Metallic."]],
    R`
| Bond | Between | Electron behavior |
| --- | --- | --- |
| ionic | metal and nonmetal | transferred |
| covalent (nonpolar or polar) | nonmetals | shared (equally or unequally) |
| metallic | metals | delocalized |

The greater the electronegativity difference, the more polar (and ionic in character) the bond. Bonding is a continuum rather than strict categories.
`,
    ["Partial charges", "In a polar bond, the more electronegative atom carries a partial negative charge (δ−)."],
    ["Rank by polarity", "Rank C–H, O–H and N–H bonds from least to most polar.", ["Electronegativity: C 2.5, N 3.0, O 3.5, H 2.1."], "C–H, N–H, O–H."]),
  L("intramolecular-force-and-potential-energy", ["Interpret potential energy curves for bond formation."],
    [["Bond length", "The distance between nuclei at the minimum of potential energy."], ["Bond energy", "The energy required to break a bond; the depth of the potential energy well."]],
    [["Which has a longer bond, a single or a double bond between the same atoms?", "A single bond."], ["Why does energy rise sharply at very short distances?", "Nucleus–nucleus and electron–electron repulsion dominate."]],
    R`
As two atoms approach, potential energy falls (attraction) until a minimum at the **bond length**, then rises sharply (repulsion).

- Deeper wells mean **stronger** bonds.
- Multiple bonds are shorter and stronger than single bonds.
- Larger atoms form longer bonds.

For ionic solids, lattice energy increases with larger ion charges and smaller ion sizes (Coulomb's law).
`,
    ["Charge beats size", "Ion charge usually affects lattice energy more than ion size: MgO has a much larger lattice energy than NaCl."],
    ["Compare lattice energies", "Which has the greater lattice energy, NaF or MgO?", ["MgO ions have charges ±2 versus ±1.", "Ions are similar in size."], "MgO."]),
  L("structure-of-ionic-solids", ["Relate the structure of ionic solids to their properties."],
    [["Crystal lattice", "A repeating three-dimensional arrangement of ions."]],
    [["Why do ionic solids conduct electricity when molten but not as solids?", "Ions can move only when melted or dissolved."], ["Why are ionic solids brittle?", "Shifting layers brings like charges together, causing repulsion."]],
    R`
Ionic solids are lattices of alternating cations and anions.

| Property | Explanation |
| --- | --- |
| high melting points | strong electrostatic attractions |
| brittle | shifted layers put like charges side by side |
| conduct when molten or dissolved | ions are free to move |
| do not conduct as solids | ions are fixed in place |
`,
    ["Particle diagrams", "Draw cations and anions alternating, with smaller cations for small ions like Na⁺ and larger anions like Cl⁻."],
    ["Explain a property", "Why does NaCl have a much higher melting point than ice?", ["NaCl: strong ionic attractions throughout the lattice.", "Ice: weaker hydrogen bonds between molecules."], "ionic bonds in NaCl are much stronger than ice's intermolecular forces."]),
  L("structure-of-metals-and-alloys", ["Explain the properties of metals and alloys using the electron-sea model."],
    [["Substitutional alloy", "Atoms of similar size replace each other in the lattice, as in brass."], ["Interstitial alloy", "Small atoms fill spaces between larger ones, as carbon in steel."]],
    [["Why are metals malleable?", "Cations can slide past each other while the electron sea holds them together."], ["Why is steel stronger than pure iron?", "Interstitial carbon atoms hinder layers from sliding."]],
    R`
Metals: cations in a sea of delocalized electrons. This explains **conductivity** (mobile electrons), **malleability** and **ductility**.

| Alloy | Structure | Example |
| --- | --- | --- |
| substitutional | similar-sized atoms swap places | brass (Cu, Zn) |
| interstitial | small atoms in gaps | steel (Fe, C) |

Interstitial alloys are usually harder and less malleable than the pure metal.
`,
    ["Model limits", "The electron-sea model explains bulk properties but not why some metals are much harder than others."],
    ["Classify", "Carbon atoms (small) are dissolved in iron. What kind of alloy forms?", ["Small atoms fit into gaps."], "an interstitial alloy (steel)."]),
  L("lewis-diagrams", ["Draw Lewis diagrams for molecules and ions."],
    [["Lewis diagram", "A drawing of valence electrons as bonds and lone pairs."], ["Octet rule", "Atoms tend to have eight valence electrons around them (two for H)."]],
    [["How many valence electrons does CO₂ have?", "16."], ["Name an exception to the octet rule.", "Boron in BF₃ (6 electrons), or expanded octets such as SF₆."]],
    R`
## Steps

1. Count total valence electrons (add for negative charge, subtract for positive).
2. Place the least electronegative atom in the center (never H).
3. Connect atoms with single bonds.
4. Complete octets on outer atoms, then the central atom.
5. Use multiple bonds if the central atom lacks an octet.

Example: $$\ce{CO2}$$ has 16 valence electrons and two double bonds: O=C=O.

Exceptions: incomplete octets (B, Be), expanded octets (period 3 and below), odd-electron species (NO).
`,
    ["Check your count", "The number of electrons drawn must equal the total valence electrons."],
    ["Draw", "Draw the Lewis diagram of NH₃.", ["5 + 3(1) = 8 electrons.", "N central with three single bonds to H.", "One lone pair on N."], "N with three N–H bonds and one lone pair."]),
  L("resonance-and-formal-charge", ["Use resonance structures and formal charge to identify the best Lewis structure."],
    [["Resonance", "When more than one valid Lewis structure exists, the actual structure is an average."], ["Formal charge", "Valence electrons − nonbonding electrons − ½ bonding electrons."]],
    [["What are the bond orders in ozone, O₃?", "1.5 for each O–O bond."], ["Which structure is preferred by formal charge?", "The one with formal charges closest to zero, with negative charge on the more electronegative atom."]],
    R`
**Resonance**: in $$\ce{NO3^-}$$, the double bond can be drawn in three positions. The real ion has three identical bonds, each with bond order $$4/3$$.

**Formal charge**:

$$FC = V - N - \tfrac12 B$$

The best structure minimizes formal charges and places negative charges on the most electronegative atoms.
`,
    ["Bond length from resonance", "Resonance bonds are intermediate in length and strength between single and double bonds."],
    ["Formal charge", "Find the formal charge on the central S in SO₂ drawn with one S=O and one S–O bond (S has one lone pair).", [R`S: $$6 - 2 - \tfrac12(6) = 1$$.`], "+1 (the singly bonded O is −1)."]),
  L("vsepr-and-hybridization", ["Predict molecular geometry, bond angles, polarity and hybridization with VSEPR."],
    [["VSEPR theory", "Electron domains around a central atom arrange to minimize repulsion."], ["Hybridization", "Mixing of atomic orbitals: sp, sp² or sp³ for 2, 3 or 4 electron domains."]],
    [["What is the shape of H₂O?", "Bent, about 104.5°."], ["Is CO₂ polar?", "No; it is linear and the bond dipoles cancel."]],
    R`
| Electron domains | Lone pairs | Shape | Angle | Hybridization |
| --- | --- | --- | --- | --- |
| 2 | 0 | linear | 180° | sp |
| 3 | 0 | trigonal planar | 120° | sp² |
| 3 | 1 | bent | under 120° | sp² |
| 4 | 0 | tetrahedral | 109.5° | sp³ |
| 4 | 1 | trigonal pyramidal | about 107° | sp³ |
| 4 | 2 | bent | about 104.5° | sp³ |
| 5 | 0 | trigonal bipyramidal | 90°, 120° | — |
| 6 | 0 | octahedral | 90° | — |

A molecule is **polar** if it has polar bonds arranged asymmetrically. Single bonds are σ bonds; double bonds have one σ and one π bond.
`,
    ["Lone pairs squeeze angles", "Lone pairs repel more than bonding pairs, so angles shrink below the ideal values."],
    ["Predict", "Predict the shape, polarity and hybridization of PCl₃.", ["P has three bonds and one lone pair: four domains.", "Trigonal pyramidal; asymmetric so polar.", "sp³."], "trigonal pyramidal, polar, sp³."]),
];
