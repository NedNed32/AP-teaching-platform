/* AP Chemistry Units 3–4. */
const R = String.raw;
const L = (id, obj, terms, checks, body, note, ex) => ({ id, obj, terms, checks, body, note, ex });
export const lessons = [
  L("intermolecular-and-interparticle-forces", ["Identify London dispersion, dipole–dipole, hydrogen bonding and ion–dipole forces and rank their strength."],
    [["London dispersion forces", "Attractions from temporary dipoles; present in all molecules and larger for bigger, more polarizable electron clouds."], ["Hydrogen bonding", "A strong dipole attraction when H bonded to N, O or F is attracted to a lone pair on N, O or F."]],
    [["Why does I₂ have a higher boiling point than F₂?", "I₂ has a larger, more polarizable electron cloud, so stronger dispersion forces."], ["Which molecules can hydrogen bond?", "Those with H directly bonded to N, O or F (such as H₂O, NH₃, HF)."]],
    R`
| Force | Present in | Relative strength |
| --- | --- | --- |
| London dispersion | all molecules | grows with size and polarizability |
| dipole–dipole | polar molecules | moderate |
| hydrogen bonding | H bonded to N, O or F | strong for an IMF |
| ion–dipole | ions in polar solvents | strong |

Stronger intermolecular forces mean higher boiling points, higher viscosity, lower vapor pressure.

Large nonpolar molecules can have stronger total dispersion forces than small polar ones.
`,
    ["IMFs are between molecules", "Boiling breaks intermolecular forces, not covalent bonds within molecules."],
    ["Rank boiling points", "Rank CH₄, CH₃OH and C₈H₁₈ from lowest to highest boiling point.", ["CH₄: small, dispersion only.", "CH₃OH: hydrogen bonding.", "C₈H₁₈: large, strong dispersion."], "CH₄, CH₃OH, C₈H₁₈ (octane boils at about 126 °C, methanol at 65 °C)."]),
  L("properties-of-solids", ["Compare ionic, molecular, covalent network and metallic solids."],
    [["Covalent network solid", "Atoms joined by a continuous network of covalent bonds, such as diamond or SiO₂."], ["Molecular solid", "Molecules held together by intermolecular forces."]],
    [["Which type of solid has the highest melting points?", "Covalent network solids."], ["Why do molecular solids have low melting points?", "Only weak intermolecular forces must be overcome."]],
    R`
| Solid | Particles | Forces | Properties |
| --- | --- | --- | --- |
| ionic | ions | ionic bonds | high mp, brittle, conducts when melted |
| molecular | molecules | IMFs | low mp, soft, nonconducting |
| covalent network | atoms | covalent bonds | very high mp, hard |
| metallic | cations and electrons | metallic bonds | conducts, malleable |

Crystalline solids have ordered structures; amorphous solids (glass) do not.
`,
    ["Graphite", "Graphite is a covalent network solid that conducts electricity because of delocalized electrons within its layers."],
    ["Classify", "A substance melts at 1700 °C, does not conduct electricity in any state and is very hard. What type of solid is it?", ["Very high mp and hard, but no mobile charges."], "a covalent network solid (like SiO₂)."]),
  L("solids-liquids-and-gases", ["Explain the properties of the three states using particle arrangement and motion."],
    [["Vapor pressure", "The pressure of a vapor in equilibrium with its liquid; higher with weaker IMFs."]],
    [["Why are gases compressible?", "Their particles are far apart, with mostly empty space."], ["Does a liquid with strong IMFs have high or low vapor pressure?", "Low."]],
    R`
| State | Arrangement | Motion |
| --- | --- | --- |
| solid | ordered, close | vibrate in place |
| liquid | disordered, close | move past each other |
| gas | far apart | move freely and rapidly |

Particle diagrams should show this spacing. Phase changes involve overcoming or forming intermolecular forces, not breaking covalent bonds.
`,
    ["Vapor pressure and boiling", "A liquid boils when its vapor pressure equals the external pressure."],
    ["Compare liquids", "Liquid A has a higher vapor pressure than liquid B at 25 °C. Which has stronger IMFs?", ["Weaker IMFs let molecules escape more easily."], "liquid B."]),
  L("ideal-gas-law", ["Apply the ideal gas law and Dalton's law of partial pressures."],
    [["Ideal gas law", "PV = nRT."], ["Partial pressure", "The pressure a gas in a mixture would exert alone; total pressure is the sum."]],
    [["What volume does 1.00 mol of gas occupy at 273 K and 1.00 atm?", "22.4 L."], ["A mixture has 0.25 mole fraction O₂ at 2.0 atm. What is P(O₂)?", "0.50 atm."]],
    R`
$$PV = nRT \qquad R = 0.08206\ \text{L·atm/(mol·K)}$$

Temperature must be in kelvins. Combined forms: $$\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}$$.

**Dalton's law**: $$P_{total} = P_A + P_B + \cdots$$, and $$P_A = X_A P_{total}$$ where $$X_A$$ is the mole fraction.

Molar mass from gas data: $$M = \frac{mRT}{PV}$$.
`,
    ["Kelvin always", "Add 273 to °C. Using Celsius gives wrong (sometimes negative) answers."],
    ["Moles of gas", "How many moles of gas are in a 5.00 L flask at 2.00 atm and 27 °C?", [R`$$n = PV/RT = (2.00)(5.00)/(0.08206 \times 300)$$.`], "0.406 mol."]),
  L("kinetic-molecular-theory", ["Explain gas behavior using kinetic molecular theory and Maxwell–Boltzmann distributions."],
    [["Kinetic molecular theory", "Gas particles are in constant random motion, with negligible volume and no attractions; average kinetic energy is proportional to temperature."], ["Maxwell–Boltzmann distribution", "The spread of particle speeds in a gas at a given temperature."]],
    [["At the same temperature, which moves faster on average, He or Ar?", "He (lighter particles move faster at the same kinetic energy)."], ["What happens to the speed distribution when temperature rises?", "It flattens and shifts to higher speeds."]],
    R`
Average kinetic energy depends only on temperature: $$KE_{avg} \propto T$$.

At the same temperature, lighter gases move faster ($$KE = \tfrac12 mv^2$$).

Maxwell–Boltzmann curves: higher temperature or lower molar mass gives a broader curve shifted to higher speeds; the area under each curve stays the same.
`,
    ["Same temperature, same energy", "Different gases at the same temperature have the same average kinetic energy, not the same average speed."],
    ["Compare", "Gases H₂ and O₂ are at the same temperature. Compare their average kinetic energies and speeds.", ["Same temperature: same average KE.", "H₂ is lighter, so faster."], "equal average KE; H₂ moves faster."]),
  L("deviation-from-ideal-gas-law", ["Explain when and why real gases deviate from ideal behavior."],
    [["Real gas", "A gas whose particles have volume and attractions, causing deviations from PV = nRT."]],
    [["Under what conditions do gases behave least ideally?", "High pressure and low temperature."], ["Which deviates more, He or NH₃?", "NH₃, because of stronger intermolecular attractions."]],
    R`
Real gases deviate when:

- **High pressure**: particle volume is a significant fraction of the container.
- **Low temperature**: attractions slow particles and reduce collisions with walls.

Attractions make the measured pressure **lower** than predicted; particle volume makes the real volume **larger** than predicted.

Small, nonpolar gases (He, H₂) behave most ideally.
`,
    ["Two effects", "Attractions lower pressure; finite particle volume raises volume. Name the one that matches the question."],
    ["Predict", "Which gas has the largest deviation at the same conditions: Ne, CH₄ or H₂O(g)?", ["H₂O has hydrogen bonding, the strongest attractions."], "H₂O(g)."]),
  L("solutions-and-mixtures", ["Calculate molarity and perform dilutions."],
    [["Molarity", "Moles of solute per liter of solution (mol/L)."], ["Dilution", "Adding solvent lowers concentration while moles of solute stay constant: M₁V₁ = M₂V₂."]],
    [["What is the molarity of 0.50 mol NaCl in 250 mL of solution?", "2.0 M."], ["How much 6.0 M HCl is needed to make 300 mL of 1.5 M HCl?", "75 mL."]],
    R`
$$M = \frac{n_{solute}}{V_{solution}\ (\text{L})} \qquad M_1V_1 = M_2V_2$$

Solutions are homogeneous mixtures; suspensions and colloids are heterogeneous.

To prepare a solution: weigh the solute, dissolve in less solvent, then dilute to the mark in a volumetric flask.
`,
    ["Ions in solution", "1.0 M CaCl₂ contains 1.0 M Ca²⁺ and 2.0 M Cl⁻."],
    ["Dilution", "25.0 mL of 2.00 M NaOH is diluted to 100.0 mL. What is the new concentration?", [R`$$(2.00)(25.0) = M_2(100.0)$$.`], "0.500 M."]),
  L("representations-of-solutions", ["Draw particle diagrams of solutions showing solute–solvent interactions."],
    [["Solvation", "Surrounding solute particles with solvent molecules."]],
    [["In a diagram of NaCl in water, which end of water faces Na⁺?", "The oxygen (partially negative) end."], ["Which end faces Cl⁻?", "The hydrogen (partially positive) ends."]],
    R`
Particle diagrams should show:

- correct ratios of ions (for $$\ce{CaCl2}$$, twice as many $$\ce{Cl-}$$ as $$\ce{Ca^{2+}}$$);
- water molecules oriented with O toward cations and H toward anions;
- solute particles spread evenly (homogeneous).
`,
    ["Count carefully", "Diagrams are graded on correct particle ratios and orientations."],
    ["Draw", "Describe a particle diagram for 0.1 M K₂SO₄.", ["Twice as many K⁺ as SO₄²⁻.", "Water's O toward K⁺; H toward SO₄²⁻."], "K⁺ and SO₄²⁻ in a 2 : 1 ratio, each surrounded by correctly oriented water molecules."]),
  L("separation-of-solutions-and-mixtures", ["Explain separation techniques: chromatography, distillation and filtration."],
    [["Chromatography", "Separates components based on different attractions to a stationary and a mobile phase."], ["Distillation", "Separates liquids by differences in boiling point (volatility)."]],
    [["In paper chromatography with a polar solvent, which component travels farther?", "The more polar component (more attracted to the mobile phase)."], ["What property does distillation exploit?", "Differences in boiling point, from differences in IMFs."]],
    R`
| Technique | Separates by |
| --- | --- |
| filtration | particle size (solid from liquid) |
| distillation | boiling point |
| chromatography | relative attraction to stationary vs mobile phase |

$$R_f = \frac{\text{distance traveled by component}}{\text{distance traveled by solvent}}$$
`,
    ["Like attracts like", "A component travels farther if it is more attracted to the mobile phase than to the stationary phase."],
    ["Interpret", "In chromatography with a nonpolar solvent on polar paper, which travels farther: a polar or a nonpolar dye?", ["Nonpolar dye is more attracted to the nonpolar mobile phase."], "the nonpolar dye."]),
  L("solubility", ["Explain solubility using intermolecular forces: like dissolves like."],
    [["Like dissolves like", "Polar substances dissolve in polar solvents; nonpolar in nonpolar."]],
    [["Why does oil not dissolve in water?", "Oil is nonpolar; water's strong hydrogen bonds are not replaced by comparable attractions."], ["Which is more soluble in hexane: I₂ or NaCl?", "I₂."]],
    R`
A substance dissolves if solute–solvent attractions are comparable to the solute–solute and solvent–solvent attractions they replace.

- Polar and ionic solutes dissolve in polar solvents such as water.
- Nonpolar solutes dissolve in nonpolar solvents such as hexane.

Alcohols with long carbon chains are less water-soluble: the nonpolar part dominates.
`,
    ["Use IMF language", "Explain solubility by naming the specific interactions formed (for example, ion–dipole, hydrogen bonds) and broken."],
    ["Compare", "Which is more soluble in water, CH₃OH or C₆H₁₃OH?", ["Both hydrogen bond, but C₆H₁₃OH has a long nonpolar chain."], "CH₃OH."]),
  L("spectroscopy-and-the-electromagnetic-spectrum", ["Relate regions of the electromagnetic spectrum to molecular and electronic transitions."],
    [["Electromagnetic spectrum", "Radiation ranging from radio waves (low energy) to gamma rays (high energy)."]],
    [["Which region causes electronic transitions?", "Ultraviolet and visible."], ["Which region causes molecular vibrations?", "Infrared."]],
    R`
| Region | Effect on molecules |
| --- | --- |
| microwave | rotations |
| infrared | vibrations |
| visible / ultraviolet | electronic transitions |

Higher frequency means higher energy and shorter wavelength.
`,
    ["Identify the transition", "Questions often describe the absorbed radiation; match it to rotation, vibration or electronic change."],
    ["Match", "A molecule absorbs infrared radiation. What happens?", ["IR matches vibrational energy levels."], "its bonds vibrate more (vibrational transition)."]),
  L("properties-of-photons", ["Calculate photon energy, frequency and wavelength."],
    [["Photon energy", "E = hν, with h = 6.626 × 10⁻³⁴ J·s."], ["Wave relationship", "c = λν, with c = 3.00 × 10⁸ m/s."]],
    [["Which photon has more energy, red or blue light?", "Blue (shorter wavelength, higher frequency)."], ["If wavelength doubles, what happens to energy?", "It halves."]],
    R`
$$E = h\nu \qquad c = \lambda\nu \qquad E = \frac{hc}{\lambda}$$

An electron transition between energy levels absorbs or emits a photon whose energy equals the energy difference.
`,
    ["Units", "Convert nm to m (1 nm = 10⁻⁹ m) before using c = λν."],
    ["Photon energy", "Find the energy of a photon with a wavelength of 500 nm.", [R`$$E = \frac{(6.626 \times 10^{-34})(3.00 \times 10^8)}{500 \times 10^{-9}}$$.`], R`$$3.98 \times 10^{-19}$$ J.`]),
  L("beer-lambert-law", ["Use the Beer–Lambert law to relate absorbance and concentration."],
    [["Beer–Lambert law", "A = εbc: absorbance is proportional to concentration."], ["Calibration curve", "A graph of absorbance against known concentrations, used to find unknowns."]],
    [["If concentration doubles, what happens to absorbance?", "It doubles."], ["Why measure at the wavelength of maximum absorbance?", "For the greatest sensitivity."]],
    R`
$$A = \varepsilon b c$$

- $$\varepsilon$$: molar absorptivity (depends on the substance and wavelength)
- $$b$$: path length (cm)
- $$c$$: concentration (M)

A calibration curve of known standards gives a straight line; read the unknown's concentration from its absorbance.

Errors: fingerprints or bubbles in the cuvette raise measured absorbance, making calculated concentration too high.
`,
    ["Error analysis", "Think about whether an error makes absorbance read high or low, then how that affects the calculated concentration."],
    ["Find concentration", "A solution has absorbance 0.45 in a 1.0 cm cell; ε = 150 M⁻¹cm⁻¹. Find c.", [R`$$c = A/(\varepsilon b) = 0.45/150$$.`], R`$$3.0 \times 10^{-3}$$ M.`]),
  L("introduction-for-reactions", ["Distinguish physical and chemical processes and evidence of reactions."],
    [["Chemical reaction", "A process in which substances are transformed by breaking and forming chemical bonds."]],
    [["Name evidence of a chemical change.", "Gas formation, a precipitate, color change, or temperature change not caused by heating."], ["Is dissolving sugar a chemical change?", "No; it is a physical change."]],
    R`
Chemical reactions rearrange atoms by breaking and forming bonds; new substances form. Evidence includes:

- formation of a gas or precipitate;
- color change;
- temperature change or light emission.

No single observation proves a chemical change; boiling also produces gas, for example.
`,
    ["Conservation", "Atoms are conserved in every reaction, so equations must be balanced."],
    ["Classify", "Mixing two clear solutions produces a yellow solid. What does this suggest?", ["A new insoluble substance (precipitate) formed."], "a chemical reaction (precipitation)."]),
  L("net-ionic-equations", ["Write balanced molecular, complete ionic and net ionic equations."],
    [["Spectator ion", "An ion present on both sides of an ionic equation, unchanged by the reaction."], ["Net ionic equation", "The equation showing only species that actually change."]],
    [["Write the net ionic equation for AgNO₃(aq) + NaCl(aq).", "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)."], ["Which compounds are written as ions?", "Soluble strong electrolytes (soluble ionic compounds, strong acids and bases) in solution."]],
    R`
1. Write the balanced molecular equation.
2. Split strong electrolytes in solution into ions.
3. Cancel spectator ions.

Example: $$\ce{Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)}$$

Net ionic: $$\ce{Pb^{2+}(aq) + 2I^-(aq) -> PbI2(s)}$$

Solids, liquids, gases and weak electrolytes are written as whole formulas. All sodium, potassium, ammonium and nitrate salts are soluble.
`,
    ["Weak acids stay together", "Write acetic acid as CH₃COOH, not as separate ions, because it is a weak acid."],
    ["Net ionic", "Write the net ionic equation for HCl(aq) + NaOH(aq).", ["Na⁺ and Cl⁻ are spectators."], R`$$\ce{H+(aq) + OH-(aq) -> H2O(l)}$$.`]),
  L("representations-of-reactions", ["Represent reactions with balanced equations and particle diagrams."],
    [["Balanced equation", "An equation with equal numbers of each type of atom on both sides."]],
    [["Balance: H₂ + O₂ → H₂O.", "2H₂ + O₂ → 2H₂O."], ["What must be equal on both sides of a balanced equation?", "Atoms of each element (and total charge)."]],
    R`
Balanced equations show the ratio of particles that react. Particle diagrams should match the equation: for $$\ce{2H2 + O2 -> 2H2O}$$, two H₂ molecules react with one O₂ molecule to make two H₂O molecules.

Excess reactant particles appear unchanged in the product diagram.
`,
    ["Limiting reactant in diagrams", "Count molecules in the 'before' picture to find which reactant runs out."],
    ["Diagram", "A diagram shows 4 H₂ and 3 O₂ molecules reacting completely. What remains?", ["4 H₂ need 2 O₂.", "4 H₂O form; 1 O₂ is left."], "4 H₂O molecules and 1 O₂ molecule."]),
  L("physical-and-chemical-changes", ["Classify processes as physical or chemical based on bonds broken."],
    [["Physical change", "A change that does not form new substances, such as melting or dissolving."]],
    [["Is the dissolution of NaCl in water physical or chemical?", "Often classified as physical, though ionic bonds are broken; the AP course treats it as a process that can be either."], ["Is burning methane physical or chemical?", "Chemical."]],
    R`
- **Physical**: intermolecular forces change; chemical identity stays the same (melting, boiling, dissolving molecular solids).
- **Chemical**: covalent or ionic bonds break and form, producing new substances.

Some processes, such as dissolving an ionic solid, break ionic bonds and can be argued either way; explain using bonds and interactions.
`,
    ["Justify with bonds", "Explain your classification by what is broken and formed: intermolecular forces or chemical bonds."],
    ["Classify", "Water boils at 100 °C. Physical or chemical? Why?", ["Hydrogen bonds between molecules break; H₂O molecules remain intact."], "physical."]),
  L("stoichiometry", ["Use mole ratios to calculate amounts of reactants and products, including limiting reactants and percent yield."],
    [["Limiting reactant", "The reactant used up first, which determines the amount of product."], ["Percent yield", "Actual yield divided by theoretical yield, times 100%."]],
    [["2 mol H₂ react with 2 mol O₂ to form water. Which is limiting?", "H₂."], ["Theoretical yield 10.0 g, actual 8.5 g. Percent yield?", "85%."]],
    R`
Grams of A → moles of A → (mole ratio) → moles of B → grams of B.

**Limiting reactant**: compute the product each reactant could make; the smaller amount wins.

$$\text{percent yield} = \frac{\text{actual}}{\text{theoretical}} \times 100\%$$
`,
    ["Mole ratio is the bridge", "Coefficients relate moles, never grams, so always convert to moles first."],
    ["Limiting reactant", "4.0 g H₂ reacts with 16.0 g O₂ to form water. How much water forms?", ["H₂: 2.0 mol → 2.0 mol H₂O. O₂: 0.50 mol → 1.0 mol H₂O.", "O₂ is limiting."], "1.0 mol H₂O, 18.0 g."]),
  L("introduction-to-titration", ["Use titration data to find an unknown concentration."],
    [["Titration", "Adding a solution of known concentration to react completely with an analyte."], ["Equivalence point", "When stoichiometrically equivalent amounts have reacted."]],
    [["What does an indicator show?", "The endpoint, which approximates the equivalence point."], ["25.0 mL of HCl is neutralized by 20.0 mL of 0.100 M NaOH. Find [HCl].", "0.0800 M."]],
    R`
At the equivalence point, moles of titrant relate to moles of analyte by the balanced equation.

For a 1 : 1 reaction: $$M_aV_a = M_bV_b$$.

Sources of error: overshooting the endpoint (too much titrant, overestimating the analyte), or not rinsing the buret with titrant (diluted titrant, more volume needed).
`,
    ["Check the ratio", "For H₂SO₄ with NaOH the ratio is 1 : 2, so M_aV_a ≠ M_bV_b."],
    ["Diprotic titration", "20.0 mL of H₂SO₄ requires 30.0 mL of 0.200 M NaOH. Find [H₂SO₄].", [R`mol NaOH = 0.00600; mol $$\ce{H2SO4}$$ = 0.00300.`], "0.150 M."]),
  L("types-of-chemical-reactions", ["Classify reactions as precipitation, acid–base or redox."],
    [["Precipitation reaction", "Two solutions form an insoluble solid."], ["Combustion", "A redox reaction with oxygen, producing CO₂ and H₂O from hydrocarbons."]],
    [["What type is 2Na + Cl₂ → 2NaCl?", "Redox (synthesis)."], ["What type is HCl + NaOH → NaCl + H₂O?", "Acid–base (neutralization)."]],
    R`
| Type | Key feature |
| --- | --- |
| precipitation | an insoluble product forms |
| acid–base | proton (H⁺) transfer |
| oxidation–reduction | electron transfer; oxidation numbers change |

Combustion, single replacement and many synthesis and decomposition reactions are redox reactions.
`,
    ["Oxidation numbers decide", "If any oxidation number changes, the reaction is redox."],
    ["Classify", "Classify Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).", ["Zn goes from 0 to +2; Cu from +2 to 0."], "redox."]),
  L("introduction-to-acid-base-reactions", ["Identify Brønsted–Lowry acids, bases and conjugate pairs."],
    [["Brønsted–Lowry acid", "A proton (H⁺) donor."], ["Conjugate base", "The species formed when an acid donates a proton."]],
    [["What is the conjugate base of H₂O?", "OH⁻."], ["In NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, which is the acid?", "H₂O."]],
    R`
$$\ce{HA + B <=> A- + HB+}$$

The acid (HA) donates H⁺ and becomes its conjugate base (A⁻); the base (B) accepts H⁺ and becomes its conjugate acid (HB⁺).

Water is **amphoteric**: it can act as an acid or a base.
`,
    ["Pairs differ by one H⁺", "A conjugate pair differs by exactly one proton."],
    ["Identify", "In HCO₃⁻ + H₂O ⇌ CO₃²⁻ + H₃O⁺, identify the acid and its conjugate base.", ["HCO₃⁻ loses H⁺ to become CO₃²⁻."], "acid HCO₃⁻, conjugate base CO₃²⁻."]),
  L("oxidation-reduction-redox-reactions", ["Assign oxidation numbers and balance redox half-reactions."],
    [["Oxidation", "Loss of electrons (oxidation number increases)."], ["Reduction", "Gain of electrons (oxidation number decreases)."]],
    [["What is the oxidation number of S in SO₄²⁻?", "+6."], ["In a redox reaction, is the oxidizing agent oxidized or reduced?", "Reduced."]],
    R`
**Oxidation number rules**: elements = 0; monatomic ions = charge; O usually −2; H usually +1; the sum equals the overall charge.

"OIL RIG": Oxidation Is Loss, Reduction Is Gain (of electrons).

Balance redox reactions by splitting into half-reactions, balancing atoms and charge (with electrons), then equalizing electrons.
`,
    ["Agents", "The oxidizing agent is reduced; the reducing agent is oxidized."],
    ["Balance", "Balance Al + Cu²⁺ → Al³⁺ + Cu.", ["Al → Al³⁺ + 3e⁻ (×2); Cu²⁺ + 2e⁻ → Cu (×3)."], R`$$\ce{2Al + 3Cu^{2+} -> 2Al^{3+} + 3Cu}$$.`]),
];
