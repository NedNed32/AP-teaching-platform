/* AP Chemistry Units 5–6. */
const R = String.raw;
const L = (id, obj, terms, checks, body, note, ex) => ({ id, obj, terms, checks, body, note, ex });
export const lessons = [
  L("reaction-rates", ["Define reaction rate and explain factors that affect it."],
    [["Reaction rate", "The change in concentration of a reactant or product per unit time."]],
    [["Name three factors that increase reaction rate.", "Higher concentration, higher temperature, greater surface area, or a catalyst."], ["For 2A → B, how does the rate of disappearance of A compare with the rate of appearance of B?", "A disappears twice as fast as B appears."]],
    R`
$$\text{rate} = -\frac{1}{a}\frac{\Delta[\ce{A}]}{\Delta t} = \frac{1}{b}\frac{\Delta[\ce{B}]}{\Delta t}$$

Rates increase with concentration, temperature, surface area and catalysts. Rates are measured by tracking concentration, pressure, color (absorbance) or volume of gas over time.
`,
    ["Stoichiometry of rates", "Divide each species' rate by its coefficient to get a single reaction rate."],
    ["Relate rates", "In N₂ + 3H₂ → 2NH₃, H₂ is consumed at 0.30 M/s. How fast does NH₃ form?", [R`$$0.30 \times \tfrac{2}{3}$$.`], "0.20 M/s."]),
  L("introduction-to-rate-law", ["Determine rate laws and rate constants from initial-rate data."],
    [["Rate law", "rate = k[A]^m[B]^n, where the orders m and n are found experimentally."], ["Overall order", "The sum of the exponents in the rate law."]],
    [["Doubling [A] quadruples the rate. What is the order in A?", "2."], ["What are the units of k for a first-order reaction?", "s⁻¹."]],
    R`
$$\text{rate} = k[\ce{A}]^m[\ce{B}]^n$$

From initial rates: compare two trials in which only one concentration changes. If doubling [A] doubles the rate, the order is 1; quadruples, 2; no change, 0.

Orders come from experiment, not from coefficients (except for elementary steps).
`,
    ["Units of k", "Overall order 0: M/s; 1: s⁻¹; 2: M⁻¹s⁻¹."],
    ["Find the order", "When [A] triples with [B] constant, the rate increases ninefold. What is the order in A?", [R`$$3^m = 9$$, so $$m = 2$$.`], "second order in A."]),
  L("concentration-changes-over-time", ["Use integrated rate laws and half-life, and identify reaction order from graphs."],
    [["Half-life", "The time for a reactant's concentration to fall to half its value."], ["First-order half-life", "t½ = 0.693/k, independent of concentration."]],
    [["Which plot is linear for a first-order reaction?", "ln[A] versus time."], ["A first-order reaction has t½ = 10 min. What fraction remains after 30 min?", "1/8."]],
    R`
| Order | Linear plot | Slope | Half-life |
| --- | --- | --- | --- |
| 0 | [A] vs t | −k | depends on [A] |
| 1 | ln[A] vs t | −k | $$0.693/k$$ (constant) |
| 2 | 1/[A] vs t | +k | depends on [A] |

First order: $$\ln[\ce{A}]_t - \ln[\ce{A}]_0 = -kt$$. Radioactive decay is first order.
`,
    ["Identify order from data", "Graph [A], ln[A] and 1/[A] against time; whichever is linear gives the order."],
    ["Half-life", "A first-order reaction has k = 0.0231 min⁻¹. Find t½.", [R`$$0.693/0.0231$$.`], "30.0 min."]),
  L("elementary-reactions", ["Write rate laws for elementary steps from their molecularity."],
    [["Elementary reaction", "A single step whose rate law follows directly from its coefficients."], ["Molecularity", "The number of particles colliding in an elementary step (uni-, bi-, termolecular)."]],
    [["Write the rate law for the elementary step 2NO → N₂O₂.", "rate = k[NO]²."], ["Why are termolecular steps rare?", "Three particles rarely collide simultaneously with the right energy and orientation."]],
    R`
For an **elementary** step, the rate law uses the coefficients as exponents:

$$\ce{A + B -> C}: \quad \text{rate} = k[\ce{A}][\ce{B}]$$

This is true only for elementary steps; overall reactions must be studied experimentally.
`,
    ["Only elementary steps", "Never write a rate law from the coefficients of an overall equation unless it is stated to be elementary."],
    ["Rate law", "Write the rate law for the elementary step NO₂ + CO → NO + CO₂.", ["Bimolecular elementary step."], R`rate = $$k[\ce{NO2}][\ce{CO}]$$.`]),
  L("collision-model", ["Explain reaction rates with the collision model."],
    [["Collision model", "Reactions occur when particles collide with enough energy and the correct orientation."], ["Activation energy", "The minimum energy needed for a collision to be successful."]],
    [["Why does raising temperature increase rate?", "More collisions, and a larger fraction have energy at or above Eₐ."], ["Why does orientation matter?", "Only collisions with the right atoms in contact can form the new bonds."]],
    R`
A successful collision requires:

1. sufficient energy (at least $$E_a$$);
2. proper orientation.

Increasing temperature shifts the Maxwell–Boltzmann distribution so a larger fraction of collisions exceeds $$E_a$$; this effect matters more than the increase in collision frequency.
`,
    ["Energy distribution", "On a Maxwell–Boltzmann graph, shade the area beyond Eₐ: it grows with temperature."],
    ["Explain", "Why does a 10 °C rise often roughly double a reaction rate?", ["The fraction of collisions with energy above Eₐ increases substantially."], "many more collisions have enough energy to react."]),
  L("reaction-energy-profile", ["Interpret reaction energy profiles, including activation energy and ΔH."],
    [["Transition state (activated complex)", "The highest-energy arrangement along the reaction pathway."]],
    [["On an energy profile, where is ΔH shown?", "The difference between product and reactant energies."], ["Does a catalyst change ΔH?", "No; it lowers Eₐ."]],
    R`
An energy profile plots potential energy against reaction progress.

- **Eₐ** (forward): transition state − reactants.
- **ΔH**: products − reactants (negative for exothermic).
- Reverse Eₐ = forward Eₐ − ΔH.
`,
    ["Exothermic profile", "Products lie below reactants; the hill still has to be climbed first."],
    ["Read a profile", "Reactants are at 50 kJ, the transition state at 130 kJ, and products at 20 kJ. Find Eₐ and ΔH.", [R`$$E_a = 130 - 50 = 80$$ kJ.`, R`$$\Delta H = 20 - 50 = -30$$ kJ.`], "Eₐ = 80 kJ; ΔH = −30 kJ (exothermic)."]),
  L("introduction-to-reaction-mechanisms", ["Describe reaction mechanisms and identify intermediates and catalysts."],
    [["Reaction mechanism", "The sequence of elementary steps by which a reaction occurs."], ["Intermediate", "A species formed in one step and consumed in a later step."]],
    [["How do you tell an intermediate from a catalyst?", "An intermediate is produced then consumed; a catalyst is consumed then regenerated."], ["What must the elementary steps add up to?", "The overall balanced equation."]],
    R`
A mechanism's steps must add to the overall equation.

Example:
1. $$\ce{NO2 + NO2 -> NO3 + NO}$$ (slow)
2. $$\ce{NO3 + CO -> NO2 + CO2}$$ (fast)

Overall: $$\ce{NO2 + CO -> NO + CO2}$$. $$\ce{NO3}$$ is an intermediate.
`,
    ["Cancel carefully", "Species appearing on both sides after adding steps cancel; what remains is the overall equation."],
    ["Identify", "Step 1: A + B → C. Step 2: C + D → E + B. What is B?", ["B is consumed in step 1 and regenerated in step 2."], "a catalyst."]),
  L("reaction-mechanism-and-rate-law", ["Relate a mechanism's rate-determining step to the observed rate law."],
    [["Rate-determining step", "The slowest step, which controls the overall rate."]],
    [["If the first step is slow, what is the rate law?", "The rate law of that elementary first step."], ["Can an intermediate appear in the final rate law?", "No; it must be expressed in terms of reactants."]],
    R`
The overall rate equals the rate of the **slowest** step.

If the first step is slow, the rate law is that step's elementary rate law. In the $$\ce{NO2 + CO}$$ example, step 1 is slow, so rate = $$k[\ce{NO2}]^2$$, which explains why CO does not appear.

A mechanism is consistent with data if its predicted rate law matches the experimental one and its steps add up to the overall reaction.
`,
    ["Consistent is not proven", "Matching the rate law supports a mechanism but does not prove it."],
    ["Predict", "Mechanism: A + A → I (slow); I + B → P (fast). Predict the rate law.", ["The slow first step controls the rate."], R`rate = $$k[\ce{A}]^2$$.`]),
  L("pre-equilibrium-approximation", ["Derive rate laws when a fast equilibrium precedes the slow step."],
    [["Pre-equilibrium", "A fast, reversible first step that reaches equilibrium before the slow step."]],
    [["How is the intermediate's concentration found in a pre-equilibrium?", "From the equilibrium expression of the fast step."], ["Can the overall rate law include a reactant not in the slow step?", "Yes, through substitution from the fast equilibrium."]],
    R`
If step 1 is fast and reversible and step 2 is slow:

1. $$\ce{2NO <=> N2O2}$$ (fast): $$[\ce{N2O2}] = K[\ce{NO}]^2$$
2. $$\ce{N2O2 + O2 -> 2NO2}$$ (slow): rate = $$k_2[\ce{N2O2}][\ce{O2}]$$

Substitute: rate = $$k[\ce{NO}]^2[\ce{O2}]$$.
`,
    ["Eliminate intermediates", "Use the fast equilibrium to replace the intermediate with reactant concentrations."],
    ["Derive", "Fast equilibrium A ⇌ I; slow step I + B → P. Write the rate law.", [R`$$[\ce{I}] = K[\ce{A}]$$.`, R`rate = $$k_2K[\ce{A}][\ce{B}]$$.`], R`rate = $$k[\ce{A}][\ce{B}]$$.`]),
  L("multistep-reaction-energy-profile", ["Interpret energy profiles for multistep reactions."],
    [["Intermediate on a profile", "A local energy minimum between two transition states."]],
    [["How do you find the slow step on a profile?", "It has the highest activation energy (highest barrier from its starting point)."], ["How many transition states does a two-step mechanism have?", "Two."]],
    R`
A multistep profile has one hill per elementary step, with intermediates in the valleys between them.

The step with the largest activation energy is usually rate-determining. The overall ΔH is still products minus reactants.
`,
    ["Count the humps", "Number of humps = number of elementary steps; number of valleys between them = number of intermediates."],
    ["Read a profile", "A profile has three humps. How many steps and intermediates does the mechanism have?", ["One hump per step; intermediates lie between humps."], "three steps and two intermediates."]),
  L("catalysis", ["Explain how catalysts speed up reactions."],
    [["Catalyst", "A substance that increases reaction rate by providing a lower-activation-energy pathway, without being consumed overall."], ["Enzyme", "A biological catalyst."]],
    [["Does a catalyst change the equilibrium constant?", "No."], ["Name two ways catalysts lower Eₐ.", "By providing a new mechanism, or by orienting reactants on a surface (heterogeneous catalysis)."]],
    R`
Catalysts provide an alternative mechanism with lower activation energy. They speed up forward and reverse reactions equally, so they do not change ΔH or K.

- **Homogeneous**: same phase as reactants.
- **Heterogeneous**: different phase, often a solid surface where reactants adsorb.
- **Enzymes**: proteins with active sites.
`,
    ["Catalysts and equilibrium", "A catalyst helps a system reach equilibrium faster but does not shift it."],
    ["Explain", "How does a catalytic converter speed up the conversion of CO to CO₂?", ["Gases adsorb on a metal surface, weakening bonds and orienting molecules."], "it provides a lower-activation-energy pathway on its surface."]),
  L("endothermic-and-exothermic-processes", ["Classify processes as endothermic or exothermic."],
    [["Exothermic", "Releases energy to the surroundings (ΔH negative)."], ["Endothermic", "Absorbs energy from the surroundings (ΔH positive)."]],
    [["Is freezing exothermic or endothermic?", "Exothermic."], ["A dissolving salt makes the water colder. Is dissolving endothermic?", "Yes."]],
    R`
Energy flows between the **system** and **surroundings**.

| Process | Sign of ΔH | Surroundings |
| --- | --- | --- |
| exothermic | negative | warm up |
| endothermic | positive | cool down |

Bond breaking absorbs energy; bond forming releases energy.
`,
    ["Temperature tells you", "A temperature drop in the solution means the process absorbed energy from it: endothermic."],
    ["Classify", "When NH₄NO₃ dissolves, the solution temperature falls. Classify the process.", ["Energy flows from the water into the dissolving process."], "endothermic."]),
  L("energy-diagrams", ["Represent energy changes with energy diagrams."],
    [["Enthalpy diagram", "A diagram showing the relative enthalpies of reactants and products."]],
    [["In an exothermic diagram, are products higher or lower than reactants?", "Lower."], ["What does the vertical arrow between reactants and products represent?", "ΔH."]],
    R`
Energy diagrams show reactants and products as levels; an arrow between them shows ΔH. For exothermic reactions the arrow points down; for endothermic, up.

These diagrams can also include activation energy (see reaction energy profiles).
`,
    ["Same information, different picture", "Energy diagrams and ΔH values communicate the same thing; be able to translate between them."],
    ["Sketch", "Describe an energy diagram for a reaction with ΔH = +50 kJ.", ["Products are 50 kJ above reactants."], "an upward arrow of 50 kJ from reactants to products (endothermic)."]),
  L("heat-transfer-and-thermal-equilibrium", ["Explain heat transfer and thermal equilibrium."],
    [["Thermal equilibrium", "When objects in contact reach the same temperature and net heat transfer stops."]],
    [["Which direction does heat flow?", "From the hotter object to the colder one."], ["When does heat transfer stop?", "When both reach the same temperature."]],
    R`
Heat flows from higher to lower temperature until thermal equilibrium. In an isolated system:

$$q_{\text{lost}} = -q_{\text{gained}}$$

Particle view: faster-moving particles collide with slower ones, transferring kinetic energy.
`,
    ["Conservation of energy", "Heat lost by the hot object equals heat gained by the cold object (if no heat escapes)."],
    ["Final temperature", "50.0 g of water at 80.0 °C mixes with 50.0 g of water at 20.0 °C. Find the final temperature.", ["Equal masses of the same substance."], "50.0 °C."]),
  L("heat-capacity-and-calorimetry", ["Use q = mcΔT and calorimetry data to find enthalpy changes."],
    [["Specific heat capacity", "Energy needed to raise 1 g of a substance by 1 °C (water: 4.18 J/(g·°C))."], ["Calorimetry", "Measuring heat flow from temperature changes."]],
    [["How much heat raises 100. g of water by 5.00 °C?", "2090 J."], ["If the solution's temperature rises, what is the sign of ΔH for the reaction?", "Negative (exothermic)."]],
    R`
$$q = mc\Delta T$$

In a coffee-cup calorimeter: $$q_{rxn} = -q_{solution}$$. Then $$\Delta H = \frac{q_{rxn}}{n}$$ per mole of the limiting reactant.

Heat lost to the surroundings makes the measured $$\Delta T$$ smaller, so the calculated magnitude of ΔH is too small.
`,
    ["Sign conventions", "The solution gains the heat the reaction releases, so the two q values have opposite signs."],
    ["Calorimetry", "Mixing 0.050 mol HCl with NaOH in 100. g of solution raises the temperature by 6.8 °C. Find ΔH (c = 4.18).", [R`$$q = 100(4.18)(6.8) = 2842$$ J.`, R`$$\Delta H = -2.842\ \text{kJ}/0.050\ \text{mol}$$.`], "about −57 kJ/mol."]),
  L("energy-of-phase-changes", ["Calculate energy for phase changes and interpret heating curves."],
    [["Heat of fusion", "Energy to melt one mole (or gram) of a solid at its melting point."], ["Heat of vaporization", "Energy to vaporize one mole of a liquid."]],
    [["Why is temperature constant during melting?", "Energy goes into overcoming intermolecular forces, not raising kinetic energy."], ["Which is larger for water, ΔH_fus or ΔH_vap?", "ΔH_vap."]],
    R`
On a heating curve, sloped segments use $$q = mc\Delta T$$; flat segments use $$q = n\Delta H_{fus}$$ or $$q = n\Delta H_{vap}$$.

Vaporization requires far more energy than melting because molecules must be fully separated.
`,
    ["Flat means phase change", "Plateaus on a heating curve are phase changes at constant temperature."],
    ["Melting ice", "How much energy melts 36.0 g of ice at 0 °C (ΔH_fus = 6.01 kJ/mol)?", [R`2.00 mol × 6.01.`], "12.0 kJ."]),
  L("introduction-to-enthalpy-of-reaction", ["Relate enthalpy of reaction to stoichiometry."],
    [["Enthalpy of reaction", "The heat absorbed or released at constant pressure for the reaction as written."]],
    [["If ΔH = −890 kJ for CH₄ + 2O₂ → CO₂ + 2H₂O, how much heat is released by burning 2 mol CH₄?", "1780 kJ."], ["What happens to ΔH if the reaction is reversed?", "It changes sign."]],
    R`
ΔH refers to the reaction **as written**, in moles. Multiply by the number of moles that react:

$$q = n \times \Delta H_{rxn}$$

Reversing a reaction changes the sign; multiplying coefficients multiplies ΔH.
`,
    ["Per mole of what?", "Use the mole ratio from the equation: ΔH for 2H₂ + O₂ applies to 2 mol H₂."],
    ["Heat released", "2H₂ + O₂ → 2H₂O, ΔH = −572 kJ. How much heat is released when 8.0 g of H₂ burns?", ["8.0 g = 4.0 mol H₂ = twice the equation."], "1144 kJ released."]),
  L("bond-enthalpies", ["Estimate ΔH from bond enthalpies."],
    [["Bond enthalpy", "Average energy required to break one mole of a given bond in the gas phase."]],
    [["What is the formula for ΔH from bond enthalpies?", "Σ(bonds broken) − Σ(bonds formed)."], ["Why are bond-enthalpy estimates approximate?", "They use average values across many compounds."]],
    R`
$$\Delta H \approx \sum D_{\text{broken}} - \sum D_{\text{formed}}$$

Breaking bonds costs energy (positive); forming bonds releases energy. If the bonds formed are stronger than those broken, the reaction is exothermic.
`,
    ["Broken minus formed", "This is the reverse of the formation-enthalpy formula (products minus reactants). Do not mix them up."],
    ["Estimate", "Estimate ΔH for H₂ + Cl₂ → 2HCl (H–H 436, Cl–Cl 242, H–Cl 431 kJ/mol).", [R`Broken: 436 + 242 = 678.`, R`Formed: 2(431) = 862.`], "678 − 862 = −184 kJ."]),
  L("enthalpy-of-formation", ["Calculate ΔH°rxn from standard enthalpies of formation."],
    [["Standard enthalpy of formation", "ΔH for forming 1 mol of a compound from its elements in their standard states."]],
    [["What is ΔH°f for O₂(g)?", "0 kJ/mol (an element in its standard state)."], ["Formula for ΔH°rxn from formation values?", "Σ n ΔH°f(products) − Σ n ΔH°f(reactants)."]],
    R`
$$\Delta H^\circ_{rxn} = \sum n\,\Delta H^\circ_f(\text{products}) - \sum n\,\Delta H^\circ_f(\text{reactants})$$

Elements in their standard states have $$\Delta H^\circ_f = 0$$.
`,
    ["Multiply by coefficients", "Each ΔH°f is per mole; multiply by the coefficient in the balanced equation."],
    ["Calculate", R`Find ΔH° for $$\ce{CH4 + 2O2 -> CO2 + 2H2O(l)}$$ (ΔH°f: CH₄ −75, CO₂ −394, H₂O(l) −286 kJ/mol).`, [R`Products: −394 + 2(−286) = −966.`, R`Reactants: −75 + 0 = −75.`], "−966 − (−75) = −891 kJ."]),
  L("hesss-law", ["Use Hess's law to combine reactions and their enthalpies."],
    [["Hess's law", "ΔH for an overall reaction equals the sum of ΔH for steps that add up to it."]],
    [["If a step is multiplied by 2, what happens to its ΔH?", "It doubles."], ["Why does Hess's law work?", "Enthalpy is a state function: it depends only on initial and final states."]],
    R`
Manipulate given equations so they add up to the target:

- reverse an equation → change the sign of ΔH;
- multiply by a factor → multiply ΔH by that factor.

Then add the equations and their ΔH values.
`,
    ["Match the target", "Arrange each given equation so its substances appear on the same side as in the target equation."],
    ["Combine", "C + O₂ → CO₂ (−394 kJ); CO + ½O₂ → CO₂ (−283 kJ). Find ΔH for C + ½O₂ → CO.", ["Keep the first; reverse the second (+283)."], "−394 + 283 = −111 kJ."]),
];
