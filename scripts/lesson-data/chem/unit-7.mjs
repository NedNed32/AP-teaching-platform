/* AP Chemistry Units 7–9. */
const R = String.raw;
const L = (id, obj, terms, checks, body, note, ex) => ({ id, obj, terms, checks, body, note, ex });
export const lessons = [
  L("introduction-to-equilibrium", ["Describe dynamic equilibrium."],
    [["Dynamic equilibrium", "Forward and reverse reaction rates are equal, so concentrations stay constant."]],
    [["At equilibrium, do reactions stop?", "No; forward and reverse reactions continue at equal rates."], ["Are concentrations equal at equilibrium?", "Not necessarily; they are constant."]],
    R`
In a closed system, a reversible reaction reaches **equilibrium** when the forward and reverse rates are equal. Concentrations stop changing but are not usually equal.

On a concentration–time graph, curves level off; on a rate–time graph, forward and reverse rates meet.
`,
    ["Constant, not equal", "The most common mistake is to think reactant and product concentrations become equal."],
    ["Recognize equilibrium", "Concentrations of A and B stop changing after 40 s, with [A] = 0.3 M and [B] = 0.7 M. Is the system at equilibrium?", ["Constant concentrations in a closed system."], "yes; forward and reverse rates are equal."]),
  L("direction-of-reversible-reactions", ["Predict how a reversible reaction proceeds toward equilibrium."],
    [["Reversible reaction", "A reaction that can proceed in both directions."]],
    [["If only reactants are present initially, which rate is larger at first?", "The forward rate."], ["What happens to the forward rate as equilibrium is approached?", "It decreases until it equals the reverse rate."]],
    R`
Starting from reactants only, the forward rate is initially large and falls; the reverse rate starts at zero and rises. They become equal at equilibrium.

Equilibrium can be approached from either direction and reaches the same state for the same total composition and temperature.
`,
    ["Rates versus concentrations", "Rates depend on concentrations; as reactants are used up, the forward rate falls."],
    ["Describe", "A reaction starts with only products. Describe the rates over time.", ["Reverse rate is high initially and falls; forward rate rises from zero."], "they converge until equal at equilibrium."]),
  L("reaction-quotient-and-equilibrium-constant", ["Write expressions for Q and K, including Kc and Kp."],
    [["Equilibrium constant K", "The ratio of product to reactant concentrations (each raised to its coefficient) at equilibrium."], ["Reaction quotient Q", "The same ratio at any moment."]],
    [["Are pure solids and liquids included in K?", "No."], ["Write Kc for N₂ + 3H₂ ⇌ 2NH₃.", "[NH₃]² / ([N₂][H₂]³)."]],
    R`
For $$\ce{aA + bB <=> cC + dD}$$:

$$K_c = \frac{[\ce{C}]^c[\ce{D}]^d}{[\ce{A}]^a[\ce{B}]^b} \qquad K_p \text{ uses partial pressures}$$

Pure solids and liquids are omitted. Q uses the same expression with current (not necessarily equilibrium) values.
`,
    ["Products over reactants", "Always products in the numerator, each raised to its coefficient."],
    ["Write K", R`Write Kc for $$\ce{CaCO3(s) <=> CaO(s) + CO2(g)}$$.`, ["Solids are omitted."], R`$$K_c = [\ce{CO2}]$$.`]),
  L("calculating-the-equilibrium-constant", ["Calculate K from equilibrium concentrations or partial pressures."],
    [["Equilibrium concentrations", "The concentrations present once the system has reached equilibrium."]],
    [["At equilibrium [A] = 0.50 M, [B] = 0.20 M for A ⇌ 2B. Find K.", "0.080."], ["Does K have units in AP Chemistry?", "It is treated as unitless."]],
    R`
Substitute equilibrium values into the K expression. If given initial values and one equilibrium value, use an ICE table to find the others first.
`,
    ["Use equilibrium values only", "Initial concentrations do not go into K unless the system started at equilibrium."],
    ["ICE to K", "1.00 M H₂ and 1.00 M I₂ react; at equilibrium [HI] = 1.56 M. Find K for H₂ + I₂ ⇌ 2HI.", ["x = 0.78; [H₂] = [I₂] = 0.22 M.", R`$$K = 1.56^2/(0.22)^2$$.`], "about 50."]),
  L("magnitude-of-the-equilibrium-constant", ["Interpret the magnitude of K."],
    [["Large K", "Products are favored at equilibrium (K much greater than 1)."]],
    [["K = 1 × 10⁻⁸. Are reactants or products favored?", "Reactants."], ["Does a large K mean the reaction is fast?", "No; K says nothing about rate."]],
    R`
| K | At equilibrium |
| --- | --- |
| much greater than 1 | mostly products |
| about 1 | significant amounts of both |
| much less than 1 | mostly reactants |

K describes extent, not speed.
`,
    ["Extent, not rate", "A reaction can have a huge K and still be extremely slow."],
    ["Interpret", "For a reaction, K = 4.5 × 10⁵. Describe the equilibrium mixture.", ["K is very large."], "mostly products."]),
  L("properties-of-the-equilibrium-constant", ["Manipulate K when reactions are reversed, multiplied or added."],
    [["Combining K values", "Adding reactions multiplies their K values."]],
    [["If K = 4 for A ⇌ B, what is K for B ⇌ A?", "0.25."], ["If a reaction is doubled, what happens to K?", "It is squared."]],
    R`
| Change to equation | New K |
| --- | --- |
| reverse | $$1/K$$ |
| multiply by n | $$K^n$$ |
| add reactions | $$K_1 \times K_2$$ |
`,
    ["Different from ΔH", "ΔH adds and multiplies by n; K multiplies and is raised to the power n."],
    ["Combine", "K₁ = 2.0 for A ⇌ B, K₂ = 5.0 for B ⇌ C. Find K for 2A ⇌ 2C.", [R`A ⇌ C: 2.0 × 5.0 = 10.`, R`Doubled: $$10^2$$.`], "100."]),
  L("calculating-equilibrium-concentrations", ["Use ICE tables and K to calculate equilibrium concentrations."],
    [["ICE table", "Initial, Change, Equilibrium rows used to organize equilibrium calculations."], ["Small-x approximation", "When K is very small, x is negligible compared with initial concentrations."]],
    [["When is the small-x approximation valid?", "When x is less than about 5% of the initial concentration."], ["What variable represents the change?", "x, multiplied by each species' coefficient."]],
    R`
1. Write initial concentrations.
2. Express changes in terms of x, using coefficients.
3. Write equilibrium concentrations.
4. Substitute into K and solve.

If K is small, assume $$[\ce{A}]_0 - x \approx [\ce{A}]_0$$, then check the assumption.
`,
    ["Check the 5% rule", "After solving, compare x with the initial concentration to confirm the approximation."],
    ["Small K", "A ⇌ 2B with K = 4.0 × 10⁻⁶ and [A]₀ = 0.25 M. Find [B].", [R`$$K = (2x)^2/0.25 \approx 4x^2/0.25$$.`, R`$$x^2 = 2.5 \times 10^{-7}$$; x = 5.0 × 10⁻⁴.`], R`$$[\ce{B}] = 1.0 \times 10^{-3}$$ M.`]),
  L("representations-of-equilibrium", ["Interpret particle diagrams and graphs of equilibrium systems."],
    [["Particle diagram at equilibrium", "A diagram showing reactant and product particles in proportions consistent with K."]],
    [["How can you tell from diagrams that a system has reached equilibrium?", "The numbers of each particle stop changing over time."], ["How do you estimate K from a particle diagram?", "Count particles, treat counts as concentrations, and substitute into K."]],
    R`
Use particle counts as relative concentrations. If successive diagrams show the same composition, the system is at equilibrium. Compare $$Q$$ from a diagram with $$K$$ to predict the direction of change.
`,
    ["Same volume", "Particle counts can stand in for concentrations only if all diagrams represent the same volume."],
    ["From a diagram", "A diagram for A ⇌ B shows 3 A and 9 B at equilibrium. Estimate K.", [R`$$K = 9/3$$.`], "3."]),
  L("introduction-to-le-chateliers-principle", ["Predict shifts in equilibrium using Le Châtelier's principle."],
    [["Le Châtelier's principle", "A system at equilibrium that is disturbed shifts to partially counteract the disturbance."]],
    [["Increasing pressure by reducing volume shifts toward which side?", "The side with fewer moles of gas."], ["Raising temperature for an exothermic reaction shifts which way?", "Toward reactants (and K decreases)."]],
    R`
| Stress | Shift |
| --- | --- |
| add reactant / remove product | toward products |
| add product / remove reactant | toward reactants |
| decrease volume (gases) | toward fewer gas moles |
| raise temperature | in the endothermic direction (K changes) |
| add catalyst or inert gas at constant volume | no shift |

Only temperature changes K.
`,
    ["Heat as a reactant", "Treat heat as a product for exothermic reactions and as a reactant for endothermic ones."],
    ["Predict", R`For $$\ce{N2 + 3H2 <=> 2NH3}$$ (ΔH negative), predict the effect of reducing volume and of heating.`, ["Fewer gas moles on the right: shifts right.", "Exothermic: heating shifts left."], "smaller volume shifts toward NH₃; heating shifts toward N₂ and H₂."]),
  L("reaction-quotient-and-le-chateliers-principle", ["Use Q versus K to explain shifts."],
    [["Q versus K", "If Q is less than K, the reaction proceeds forward; if greater, it proceeds in reverse."]],
    [["After adding product, how do Q and K compare?", "Q is greater than K, so the reaction shifts toward reactants."], ["Does adding reactant change K?", "No; it changes Q."]],
    R`
Le Châtelier's principle can be explained quantitatively:

- **Q less than K**: too few products; the forward reaction proceeds.
- **Q greater than K**: too many products; the reverse reaction proceeds.
- **Q = K**: at equilibrium.

Concentration and pressure changes change Q; temperature changes K.
`,
    ["Explain with Q", "Strong answers say what happens to Q and why the system must change to restore Q = K."],
    ["Direction", "For a reaction with K = 10, a mixture has Q = 2.5. Which way does it proceed?", ["Q is less than K."], "forward, toward products."]),
  L("introduction-to-solubility-equilibria", ["Write Ksp expressions and calculate molar solubility."],
    [["Solubility product Ksp", "The equilibrium constant for dissolving a slightly soluble ionic solid."], ["Molar solubility", "Moles of solid that dissolve per liter of saturated solution."]],
    [["Write Ksp for PbI₂.", "[Pb²⁺][I⁻]²."], ["Which is more soluble, a salt with Ksp 10⁻⁵ or 10⁻¹⁰ (same formula type)?", "The one with Ksp 10⁻⁵."]],
    R`
$$\ce{AgCl(s) <=> Ag+ + Cl-} \qquad K_{sp} = [\ce{Ag+}][\ce{Cl-}] = s^2$$

For $$\ce{MX2}$$: $$K_{sp} = s(2s)^2 = 4s^3$$.

Compare solubilities using Ksp only for salts with the same ion ratio; otherwise calculate s.
`,
    ["Same formula type", "Ksp values compare solubility directly only when salts produce the same number of ions."],
    ["Molar solubility", "Ksp of AgCl is 1.8 × 10⁻¹⁰. Find its molar solubility.", [R`$$s = \sqrt{1.8 \times 10^{-10}}$$.`], R`$$1.3 \times 10^{-5}$$ M.`]),
  L("common-ion-effect", ["Explain and calculate the decrease in solubility caused by a common ion."],
    [["Common-ion effect", "Adding an ion already in a solubility equilibrium decreases the salt's solubility."]],
    [["Is AgCl more or less soluble in 0.10 M NaCl than in water?", "Less soluble."], ["Why?", "Added Cl⁻ shifts the equilibrium toward solid AgCl."]],
    R`
Adding a common ion raises Q above Ksp, so the solid precipitates until Q = Ksp again.

In 0.10 M NaCl: $$K_{sp} = s(0.10)$$, so $$s = K_{sp}/0.10$$.
`,
    ["Approximate", "The common ion's concentration is usually much larger than s, so treat it as constant."],
    ["Calculate", "Find the molar solubility of AgCl (Ksp 1.8 × 10⁻¹⁰) in 0.010 M NaCl.", [R`$$s = 1.8 \times 10^{-10}/0.010$$.`], R`$$1.8 \times 10^{-8}$$ M.`]),
  L("introduction-to-acids-and-bases", ["Use Kw, pH and pOH relationships."],
    [["pH", "pH = −log[H₃O⁺]."], ["Kw", "[H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 25 °C."]],
    [["What is the pH of a solution with [H₃O⁺] = 1 × 10⁻³ M?", "3."], ["What is pH + pOH at 25 °C?", "14."]],
    R`
$$\text{pH} = -\log[\ce{H3O+}] \qquad \text{pOH} = -\log[\ce{OH-}] \qquad \text{pH} + \text{pOH} = 14 \ (25\,^\circ\text{C})$$

Water autoionizes: $$\ce{2H2O <=> H3O+ + OH-}$$, $$K_w = 1.0 \times 10^{-14}$$. Kw increases with temperature, so neutral pH is below 7 at higher temperatures.
`,
    ["Neutral is not always 7", "Neutral means [H₃O⁺] = [OH⁻]; that is pH 7 only at 25 °C."],
    ["Find pH", "[OH⁻] = 2.0 × 10⁻⁴ M. Find the pH.", [R`pOH = −log(2.0 × 10⁻⁴) = 3.70.`], "pH = 10.30."]),
  L("ph-and-poh-of-strong-acids-and-bases", ["Calculate pH for strong acids and bases."],
    [["Strong acid", "An acid that ionizes completely in water (HCl, HBr, HI, HNO₃, HClO₄, H₂SO₄ first proton)."]],
    [["What is the pH of 0.010 M HNO₃?", "2.00."], ["What is the pH of 0.050 M Ba(OH)₂?", "13.00 ([OH⁻] = 0.10 M)."]],
    R`
Strong acids and bases ionize completely:

- $$[\ce{H3O+}] = [\text{acid}]$$ for monoprotic strong acids.
- $$[\ce{OH-}] = n \times [\text{base}]$$ for bases like $$\ce{Ba(OH)2}$$ (n = 2).

A tenfold dilution raises the pH of a strong acid by 1.
`,
    ["Count hydroxides", "Group 2 hydroxides release two OH⁻ per formula unit."],
    ["Strong base", "Find the pH of 0.020 M NaOH.", [R`pOH = −log(0.020) = 1.70.`], "pH = 12.30."]),
  L("weak-acid-and-base-equilibria", ["Calculate pH and percent ionization of weak acids and bases."],
    [["Ka", "The acid ionization constant: [H₃O⁺][A⁻]/[HA]."], ["Percent ionization", "[H₃O⁺] at equilibrium ÷ initial [HA] × 100%."]],
    [["Does a larger Ka mean a stronger or weaker acid?", "Stronger."], ["What happens to percent ionization when a weak acid is diluted?", "It increases."]],
    R`
$$\ce{HA + H2O <=> H3O+ + A-} \qquad K_a = \frac{[\ce{H3O+}][\ce{A-}]}{[\ce{HA}]}$$

With $$x = [\ce{H3O+}]$$: $$K_a \approx \frac{x^2}{C}$$, so $$x = \sqrt{K_aC}$$.

For weak bases: $$K_b$$, $$[\ce{OH-}] = \sqrt{K_bC}$$. For a conjugate pair, $$K_aK_b = K_w$$.
`,
    ["Strength versus concentration", "A strong acid ionizes completely; a concentrated acid has lots of solute. These are different ideas."],
    ["Weak acid pH", "Find the pH of 0.10 M acetic acid (Ka = 1.8 × 10⁻⁵).", [R`$$x = \sqrt{1.8 \times 10^{-6}} = 1.34 \times 10^{-3}$$.`], "pH = 2.87."]),
  L("acid-base-reactions-and-buffers", ["Predict the products and pH of acid–base reactions, and describe buffers."],
    [["Buffer", "A solution of a weak acid and its conjugate base (or weak base and conjugate acid) that resists pH change."]],
    [["Does mixing equal moles of a weak acid and a strong base give an acidic, basic or neutral solution?", "Basic, because the conjugate base remains."], ["Name a buffer pair.", "Acetic acid and acetate, or NH₃ and NH₄⁺."]],
    R`
Strong acid + strong base: neutral at equivalence. Weak acid + strong base: basic at equivalence. Strong acid + weak base: acidic.

A **buffer** contains comparable amounts of a weak acid and its conjugate base. Added $$\ce{H+}$$ reacts with $$\ce{A-}$$; added $$\ce{OH-}$$ reacts with $$\ce{HA}$$.

A buffer can be made by partially neutralizing a weak acid with a strong base.
`,
    ["Reaction first, equilibrium second", "When a strong acid or base is added, first do the complete neutralization (stoichiometry), then the equilibrium."],
    ["Buffer reaction", "Write the reaction when HCl is added to an acetate buffer.", ["H⁺ reacts with the base component."], R`$$\ce{H+ + CH3COO- -> CH3COOH}$$.`]),
  L("acid-base-titrations", ["Interpret titration curves, including equivalence and half-equivalence points."],
    [["Equivalence point", "Moles of added base equal initial moles of acid."], ["Half-equivalence point", "Halfway to equivalence; for a weak acid, pH = pKa."]],
    [["What is the pH at the equivalence point of a weak acid–strong base titration?", "Greater than 7."], ["How can Ka be found from a titration curve?", "Read the pH at the half-equivalence point: pH = pKa."]],
    R`
| Titration | Equivalence pH |
| --- | --- |
| strong acid + strong base | 7 |
| weak acid + strong base | above 7 |
| weak base + strong acid | below 7 |

At the half-equivalence point of a weak acid, $$[\ce{HA}] = [\ce{A-}]$$ so $$\text{pH} = \text{p}K_a$$. Polyprotic acids show multiple equivalence points.

Choose an indicator whose color change (pKa) is near the equivalence pH.
`,
    ["Buffer region", "The flat region before equivalence is where the solution acts as a buffer."],
    ["Read a curve", "A weak acid titration curve reaches equivalence at 24.0 mL; at 12.0 mL the pH is 4.20. Find Ka.", ["12.0 mL is half-equivalence: pKa = 4.20."], R`$$K_a = 10^{-4.20} = 6.3 \times 10^{-5}$$.`]),
  L("molecular-structure-of-acids-and-bases", ["Explain acid strength using molecular structure."],
    [["Electronegativity effect", "More electronegative atoms near the acidic H stabilize the conjugate base, increasing acidity."]],
    [["Which is the stronger acid, HClO or HClO₄?", "HClO₄ (more oxygens stabilize the conjugate base)."], ["Why is HI a stronger acid than HF?", "The H–I bond is weaker (I is larger), and I⁻ is a more stable, larger anion."]],
    R`
Acid strength increases when the conjugate base is more stable:

- **Binary acids (HX)**: down a group, bonds weaken: HF weakest, HI strongest.
- **Oxyacids**: more oxygen atoms or a more electronegative central atom withdraw electron density, stabilizing the anion.
- **Resonance**: carboxylate anions are stabilized by resonance.
`,
    ["Explain via the conjugate base", "The best explanations focus on how the structure stabilizes the negative charge of the conjugate base."],
    ["Rank", "Rank HClO, HClO₂, HClO₃ from weakest to strongest acid.", ["More O atoms stabilize the conjugate base."], "HClO, HClO₂, HClO₃."]),
  L("ph-and-pka", ["Use the relationship between pH and pKa to determine the predominant species."],
    [["pKa", "pKa = −log Ka; lower pKa means a stronger acid."]],
    [["If pH is less than pKa, which form dominates?", "The protonated acid form HA."], ["If pH = pKa, how do [HA] and [A⁻] compare?", "They are equal."]],
    R`
| Condition | Predominant species |
| --- | --- |
| pH less than pKa | HA (protonated) |
| pH = pKa | equal HA and A⁻ |
| pH greater than pKa | A⁻ (deprotonated) |

This is useful for indicators: an indicator changes color when the pH passes its pKa.
`,
    ["Biological relevance", "Amino acid side chains are protonated or deprotonated depending on pH relative to their pKa."],
    ["Predict", "An acid has pKa 4.8. At pH 7.4, which form dominates?", ["pH is greater than pKa."], "the conjugate base A⁻."]),
  L("properties-of-buffers", ["Explain how buffers resist changes in pH."],
    [["Buffer action", "The weak acid neutralizes added base and the conjugate base neutralizes added acid."]],
    [["Why does adding a little strong acid barely change a buffer's pH?", "The conjugate base converts it to the weak acid, changing the [A⁻]/[HA] ratio only slightly."], ["Can a strong acid and its conjugate base form a buffer?", "No; the conjugate base of a strong acid does not react appreciably with added H⁺."]],
    R`
Buffers work because both components react: $$\ce{A- + H3O+ -> HA + H2O}$$ and $$\ce{HA + OH- -> A- + H2O}$$.

pH changes only slightly because the ratio $$[\ce{A-}]/[\ce{HA}]$$ changes slightly.
`,
    ["Particle-level explanation", "Name the species that reacts with the added acid or base, and write the reaction."],
    ["Explain", "Why does adding NaOH to an NH₃/NH₄⁺ buffer barely change the pH?", ["OH⁻ reacts with NH₄⁺ to form NH₃ and H₂O."], "the added base is consumed by NH₄⁺."]),
  L("henderson-hasselbalch-equation", ["Calculate buffer pH with the Henderson–Hasselbalch equation."],
    [["Henderson–Hasselbalch equation", "pH = pKa + log([A⁻]/[HA])."]],
    [["A buffer has [A⁻] = [HA]. What is the pH?", "pH = pKa."], ["If [A⁻]/[HA] = 10, how does pH compare with pKa?", "pH = pKa + 1."]],
    R`
$$\text{pH} = \text{p}K_a + \log\frac{[\ce{A-}]}{[\ce{HA}]}$$

After adding strong acid or base, update moles of HA and A⁻ by stoichiometry, then apply the equation (moles can replace concentrations since volume is shared).
`,
    ["Moles work too", "Because both species are in the same volume, the ratio of moles equals the ratio of concentrations."],
    ["Buffer pH", "A buffer contains 0.30 mol CH₃COO⁻ and 0.20 mol CH₃COOH (pKa 4.74). Find pH.", [R`$$4.74 + \log(0.30/0.20) = 4.74 + 0.18$$.`], "4.92."]),
  L("buffer-capacity", ["Explain how buffer capacity depends on concentrations of buffer components."],
    [["Buffer capacity", "The amount of acid or base a buffer can absorb before its pH changes significantly."]],
    [["Which buffer has greater capacity: 1.0 M or 0.10 M components at the same ratio?", "1.0 M."], ["When is a buffer most effective?", "When [A⁻] ≈ [HA], so pH ≈ pKa."]],
    R`
Capacity increases with the **amounts** of HA and A⁻. Two buffers with the same ratio have the same pH, but the more concentrated one resists change longer.

A buffer works best within about ±1 pH unit of its pKa.
`,
    ["pH versus capacity", "The ratio sets pH; the amounts set capacity."],
    ["Choose", "To make a buffer at pH 9.2, should you use acetic acid (pKa 4.7) or NH₄⁺ (pKa 9.2)?", ["Choose pKa close to the target pH."], "NH₄⁺/NH₃."]),
  L("ph-and-solubility", ["Explain how pH affects the solubility of salts with basic anions."],
    [["pH-dependent solubility", "Salts whose anions are bases dissolve more in acidic solutions."]],
    [["Is CaCO₃ more soluble in acidic or neutral water?", "Acidic."], ["Is AgCl's solubility affected by pH?", "Very little, because Cl⁻ is not a base."]],
    R`
If a salt's anion is a weak base (such as $$\ce{CO3^{2-}}$$, $$\ce{OH-}$$, $$\ce{F-}$$), added $$\ce{H+}$$ removes the anion, shifting the dissolution equilibrium toward dissolving.

Example: $$\ce{Mg(OH)2}$$ dissolves in acid because $$\ce{H+}$$ reacts with $$\ce{OH-}$$.
`,
    ["Anion of a strong acid", "Anions like Cl⁻ and NO₃⁻ are negligible bases, so their salts' solubility does not depend on pH."],
    ["Predict", "Which is more soluble in acid than in water: BaF₂ or BaCl₂ (if both were slightly soluble)?", ["F⁻ is a weak base; Cl⁻ is not."], "BaF₂."]),
  L("introduction-to-entropy", ["Predict the sign of entropy changes."],
    [["Entropy (S)", "A measure of the dispersal of matter and energy; more possible arrangements means higher entropy."]],
    [["Does entropy increase when a solid melts?", "Yes."], ["Predict ΔS for 2H₂(g) + O₂(g) → 2H₂O(l).", "Negative."]],
    R`
Entropy increases when:

- solids melt or liquids vaporize (s → l → g);
- the number of gas molecules increases;
- solids dissolve (usually);
- temperature increases.
`,
    ["Count gas moles", "Changes in moles of gas usually dominate the sign of ΔS."],
    ["Predict", "Predict ΔS for CaCO₃(s) → CaO(s) + CO₂(g).", ["A gas forms from a solid."], "positive."]),
  L("absolute-entropy-and-entropy-change", ["Calculate ΔS° from standard molar entropies."],
    [["Standard molar entropy S°", "The entropy of one mole of a substance under standard conditions."]],
    [["Formula for ΔS°rxn?", "Σ n S°(products) − Σ n S°(reactants)."], ["Is S° of an element in its standard state zero?", "No (unlike ΔH°f)."]],
    R`
$$\Delta S^\circ = \sum n S^\circ(\text{products}) - \sum n S^\circ(\text{reactants})$$

Units: J/(mol·K). Elements have nonzero S°.
`,
    ["Unit mismatch", "S° is in J, ΔH° in kJ. Convert before combining them in ΔG."],
    ["Calculate", "Find ΔS° for N₂ + 3H₂ → 2NH₃ (S°: N₂ 191.5, H₂ 130.6, NH₃ 192.5 J/(mol·K)).", [R`Products: 2(192.5) = 385.`, R`Reactants: 191.5 + 3(130.6) = 583.3.`], "−198.3 J/(mol·K)."]),
  L("gibbs-free-energy-and-thermodynamic-favorability", ["Use ΔG = ΔH − TΔS to determine thermodynamic favorability."],
    [["Gibbs free energy", "ΔG = ΔH − TΔS; negative ΔG means thermodynamically favorable."]],
    [["When is a reaction with ΔH negative and ΔS positive favorable?", "At all temperatures."], ["Above what temperature does a reaction with positive ΔH and positive ΔS become favorable?", "T greater than ΔH/ΔS."]],
    R`
$$\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$$

| ΔH | ΔS | Favorable |
| --- | --- | --- |
| − | + | always |
| + | − | never |
| − | − | at low T |
| + | + | at high T |

Crossover temperature: $$T = \Delta H/\Delta S$$.
`,
    ["Convert units", "Divide ΔS (J/K) by 1000 before combining with ΔH (kJ)."],
    ["Calculate", "ΔH° = −92 kJ, ΔS° = −0.198 kJ/K. Is the reaction favorable at 298 K?", [R`$$\Delta G = -92 - 298(-0.198) = -92 + 59 = -33$$ kJ.`], "yes, ΔG = −33 kJ."]),
  L("thermodynamic-and-kinetic-control", ["Explain why thermodynamically favorable reactions may not occur at a measurable rate."],
    [["Kinetic control", "A favorable reaction is slow because of a high activation energy."]],
    [["Diamond converting to graphite is favorable. Why doesn't it happen noticeably?", "The activation energy is very high, so the rate is negligible."], ["Does a catalyst change ΔG?", "No."]],
    R`
Thermodynamics tells **whether** a process is favorable; kinetics tells **how fast**. A reaction with negative ΔG may be kinetically hindered by a large Eₐ. Such reactions are said to be under kinetic control.
`,
    ["Two separate questions", "On the exam, if a favorable reaction does not occur, explain with activation energy, not with ΔG."],
    ["Explain", "A mixture of H₂ and O₂ can sit unchanged for years despite ΔG being very negative. Why?", ["The reaction has a high activation energy at room temperature."], "it is kinetically controlled; a spark provides energy to overcome Eₐ."]),
  L("free-energy-and-equilibrium", ["Relate ΔG° to K."],
    [["ΔG° and K", "ΔG° = −RT ln K."]],
    [["If ΔG° is negative, is K greater or less than 1?", "Greater than 1."], ["If K = 1, what is ΔG°?", "0."]],
    R`
$$\Delta G^\circ = -RT\ln K \qquad K = e^{-\Delta G^\circ/RT}$$

| ΔG° | K |
| --- | --- |
| negative | greater than 1 (products favored) |
| 0 | 1 |
| positive | less than 1 |

Use R = 8.314 J/(mol·K) with ΔG° in J/mol.
`,
    ["Sign shortcut", "Negative ΔG° always means K greater than 1."],
    ["Find K", "ΔG° = −11.4 kJ/mol at 298 K. Find K.", [R`$$\ln K = 11400/(8.314 \times 298) = 4.60$$.`], "K ≈ 99."]),
  L("free-energy-of-dissolution", ["Explain dissolution favorability using enthalpy and entropy."],
    [["Dissolution", "Breaking solute–solute and solvent–solvent interactions and forming solute–solvent interactions."]],
    [["Why can an endothermic dissolution still be favorable?", "A positive ΔS can make ΔG negative."], ["What interactions form when ionic solids dissolve in water?", "Ion–dipole interactions."]],
    R`
$$\Delta H_{soln} = (\text{energy to separate solute and solvent particles}) - (\text{energy released forming solute–solvent interactions})$$

Many salts dissolve endothermically because entropy increases enough to make ΔG negative.
`,
    ["Both terms", "Explain favorability with both ΔH (interactions) and ΔS (dispersal)."],
    ["Explain", "Ammonium nitrate dissolves spontaneously although the solution gets cold. Explain.", ["ΔH is positive.", "ΔS is positive and TΔS outweighs ΔH."], "the entropy increase makes ΔG negative."]),
  L("coupled-reactions", ["Explain how unfavorable reactions are driven by coupling."],
    [["Coupled reactions", "Combining a favorable reaction with an unfavorable one so the overall ΔG is negative."]],
    [["How does ATP hydrolysis drive biological reactions?", "Its negative ΔG is coupled to unfavorable reactions."], ["What is ΔG for the coupled overall reaction?", "The sum of the individual ΔG values."]],
    R`
An unfavorable reaction ($$\Delta G > 0$$) can proceed when coupled to a favorable one with a larger negative ΔG through a shared intermediate. Examples: ATP hydrolysis in cells; smelting metals with carbon; electrolysis driven by an external power source.
`,
    ["Add ΔG values", "As with ΔH, ΔG values add when reactions add."],
    ["Coupling", "Reaction A has ΔG = +20 kJ; reaction B has ΔG = −31 kJ. What is ΔG when they are coupled?", [R`$$20 + (-31)$$.`], "−11 kJ: favorable overall."]),
  L("galvanic-voltaic-and-electrolytic-cells", ["Describe galvanic and electrolytic cells."],
    [["Galvanic cell", "Uses a favorable redox reaction to produce electricity."], ["Anode / cathode", "Oxidation occurs at the anode; reduction at the cathode."]],
    [["In which direction do electrons flow in a galvanic cell?", "From anode to cathode through the wire."], ["What does a salt bridge do?", "Maintains charge balance by allowing ion flow."]],
    R`
| | Galvanic | Electrolytic |
| --- | --- | --- |
| ΔG | negative | positive (driven by power source) |
| E°cell | positive | negative |
| anode | oxidation, negative | oxidation, positive |

"An Ox, Red Cat": anode oxidation, reduction cathode. Anions in the salt bridge move toward the anode.
`,
    ["Mass changes", "The anode metal dissolves (loses mass); metal ions plate onto the cathode (gains mass)."],
    ["Identify", "In a Zn/Cu cell, which electrode is the anode?", ["Zn is more easily oxidized."], "zinc."]),
  L("cell-potential-and-free-energy", ["Calculate E°cell and relate it to ΔG° and K."],
    [["Standard cell potential", "E°cell = E°cathode − E°anode (using reduction potentials)."], ["ΔG and E", "ΔG° = −nFE°, with F = 96,485 C/mol."]],
    [["If E°cell is positive, is the reaction favorable?", "Yes."], ["Does multiplying a half-reaction change E°?", "No; E° is intensive."]],
    R`
$$E^\circ_{cell} = E^\circ_{cathode} - E^\circ_{anode} \qquad \Delta G^\circ = -nFE^\circ$$

Positive E°cell ↔ negative ΔG° ↔ K greater than 1.
`,
    ["Do not multiply E°", "Unlike ΔH and ΔG, reduction potentials do not change when you multiply a half-reaction."],
    ["Calculate", "Zn²⁺/Zn E° = −0.76 V; Cu²⁺/Cu E° = +0.34 V. Find E°cell and ΔG° (n = 2).", [R`$$E^\circ = 0.34 - (-0.76) = 1.10$$ V.`, R`$$\Delta G^\circ = -2(96485)(1.10)$$.`], "1.10 V; about −212 kJ."]),
  L("cell-potential-under-nonstandard-conditions", ["Predict how concentration changes affect cell potential."],
    [["Nonstandard conditions", "Concentrations other than 1 M or pressures other than 1 atm."]],
    [["If Q decreases, what happens to Ecell?", "It increases."], ["What is Ecell when a battery is dead?", "Zero (the reaction is at equilibrium)."]],
    R`
Qualitatively (Nernst relationship, $$E = E^\circ - \frac{RT}{nF}\ln Q$$):

- Q less than 1 → E greater than E°.
- Q greater than 1 → E less than E°.
- At equilibrium, Q = K and E = 0.

Concentration cells have the same electrodes but different ion concentrations.
`,
    ["Use Le Châtelier logic", "Increasing reactant concentration drives the reaction harder, raising E."],
    ["Predict", "In a Zn/Cu cell, [Cu²⁺] is increased. What happens to Ecell?", ["Cu²⁺ is a reactant, so Q decreases."], "Ecell increases."]),
  L("electrolysis-and-faradays-law", ["Calculate amounts of substance produced in electrolysis."],
    [["Faraday's law", "Charge q = It; moles of electrons = q/F."]],
    [["How many moles of electrons pass when 2.00 A flows for 965 s?", "0.0200 mol."], ["How many moles of electrons deposit 1 mol of Cu from Cu²⁺?", "2."]],
    R`
$$q = It \qquad n_{e^-} = \frac{q}{F} \qquad F = 96{,}485\ \text{C/mol}$$

Then use the half-reaction's electron ratio to find moles (and mass) of product.
`,
    ["Chain of conversions", "amps × seconds → coulombs → mol e⁻ → mol metal → grams."],
    ["Electroplating", "How many grams of Cu (63.55 g/mol) are deposited by 3.00 A for 30.0 min?", [R`$$q = 3.00 \times 1800 = 5400$$ C; 0.0560 mol e⁻.`, "0.0280 mol Cu."], "1.78 g."]),
];
