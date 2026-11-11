/* AP Physics C: E&M, Units 8–10. */
const R = String.raw;
export const lessons = [
  {
    id: "electric-charge-and-electric-force",
    obj: ["Apply Coulomb's law and superposition to find electric forces."],
    terms: [
      ["Coulomb's law", "F = k|q1q2|/r², with k = 1/(4πε0) ≈ 8.99 × 10⁹ N·m²/C²."],
      ["Superposition", "The net force on a charge is the vector sum of the forces from each other charge."],
    ],
    checks: [
      ["If the distance between two charges is halved, what happens to the force?", "It becomes four times larger."],
      ["Do like charges attract or repel?", "Repel."],
    ],
    body: R`
$$F = \frac{1}{4\pi\varepsilon_0}\frac{|q_1q_2|}{r^2} \qquad k = 8.99 \times 10^9\ \text{N·m}^2/\text{C}^2$$

Like charges repel; opposite charges attract. The force acts along the line joining the charges.

With several charges, find each force separately and add them as **vectors** (components). Symmetry often cancels some components.

Charge is quantized in units of $$e = 1.60 \times 10^{-19}$$ C.
`,
    note: ["Electric versus gravitational", "The electric force between two protons is about 10³⁶ times their gravitational attraction, which is why gravity is ignored in most electrostatics problems."],
    ex: ["Two charges", R`Find the force between +2.0 µC and −3.0 µC charges 0.30 m apart.`, [R`$$F = (8.99 \times 10^9)\frac{(2.0 \times 10^{-6})(3.0 \times 10^{-6})}{0.090}$$.`], "0.60 N, attractive."],
  },
  {
    id: "conservation-of-electric-charge-and-the-process-of-charging",
    obj: ["Describe charging by friction, conduction and induction, and apply conservation of charge."],
    terms: [
      ["Conductor", "A material in which charges move freely."],
      ["Induction", "Charging an object without contact by bringing a charged object near and grounding it."],
      ["Polarization", "A separation of charge within an object caused by a nearby charge."],
    ],
    checks: [
      ["Why does a charged balloon attract a neutral wall?", "It polarizes the wall; the nearer opposite charges are attracted more strongly than the farther like charges are repelled."],
      ["Two identical conducting spheres with +6 µC and −2 µC touch. What charge does each end with?", "+2 µC each."],
    ],
    body: R`
Charge is **conserved**: it is transferred, never created or destroyed.

- **Friction**: electrons transfer between materials.
- **Conduction**: a charged object touches a conductor and shares charge. Identical conducting spheres share charge equally.
- **Induction**: a nearby charge pushes charges within a conductor; grounding then lets charge flow, leaving the conductor with the opposite sign.

Neutral objects are attracted to charged ones through **polarization**.
`,
    note: ["Ground", "Earth acts as a huge reservoir of charge: connecting a conductor to ground lets charge flow on or off until the conductor's potential is zero."],
    ex: ["Charging by induction", "A negative rod is held near a neutral metal sphere, the sphere is grounded briefly, then the ground and rod are removed. What is the sphere's charge?", ["The rod repels electrons, which flow to ground.", "With the ground removed first, the sphere keeps a deficit of electrons."], "positive."],
  },
  {
    id: "electric-fields",
    obj: ["Calculate electric fields of point charges and describe field lines."],
    terms: [
      ["Electric field", "The force per unit positive charge: E = F/q."],
      ["Field line", "A line showing the direction of E; lines start on positive and end on negative charges."],
    ],
    checks: [
      ["Which way does the field point near a negative charge?", "Toward the charge."],
      ["What does a high density of field lines indicate?", "A strong field."],
    ],
    body: R`
$$\vec E = \frac{\vec F}{q} \qquad E = \frac{1}{4\pi\varepsilon_0}\frac{|q|}{r^2}$$

The field points away from positive charges and toward negative ones. A charge $$q$$ in a field feels $$\vec F = q\vec E$$: a negative charge is pushed opposite the field.

Fields from several charges add as vectors. Between two equal like charges, the field is zero at the midpoint.
`,
    note: ["Uniform fields", "Between large parallel plates the field is uniform, so a charge accelerates with constant a = qE/m, like a projectile."],
    ex: ["Zero field", "A +4q charge is at x = 0 and a +q charge at x = 3 m. Where between them is E = 0?", [R`$$\frac{4q}{x^2} = \frac{q}{(3-x)^2}$$.`, R`$$2(3 - x) = x$$, so $$x = 2$$ m.`], "x = 2 m."],
  },
  {
    id: "electric-fields-of-charge-distributions",
    obj: ["Integrate to find the field of continuous charge distributions such as rods and rings."],
    terms: [
      ["Linear charge density", "λ = dq/dx, charge per unit length."],
      ["Surface charge density", "σ, charge per unit area."],
    ],
    checks: [
      ["What is the field at the center of a uniformly charged ring?", "Zero, by symmetry."],
      ["How does the field of a long line of charge depend on distance?", "E = λ/(2πε0r), proportional to 1/r."],
    ],
    body: R`
Break the distribution into elements $$dq$$ and integrate:

$$\vec E = \int \frac{1}{4\pi\varepsilon_0}\frac{dq}{r^2}\hat r$$

Use symmetry to cancel components first.

| Distribution | Field |
| --- | --- |
| ring (radius a) on its axis at x | $$\frac{1}{4\pi\varepsilon_0}\frac{Qx}{(x^2 + a^2)^{3/2}}$$ |
| infinite line | $$\frac{\lambda}{2\pi\varepsilon_0 r}$$ |
| infinite sheet | $$\frac{\sigma}{2\varepsilon_0}$$ |
| rod on its axis, distance d from end | $$\frac{1}{4\pi\varepsilon_0}\frac{Q}{d(d + L)}$$ |
`,
    note: ["Check limits", "Far from any distribution, its field should look like a point charge's. For a ring, when x is much larger than a, E approaches kQ/x²."],
    ex: ["Rod on its axis", R`A rod of length L and charge Q lies from x = 0 to x = L. Find E at x = L + d.`, [R`$$dE = \frac{k\lambda\,dx}{(L + d - x)^2}$$.`, R`$$E = k\lambda\left[\frac{1}{d} - \frac{1}{L + d}\right] = \frac{kQ}{d(L + d)}$$.`], R`$$\frac{kQ}{d(L+d)}$$, pointing away from the rod for positive Q.`],
  },
  {
    id: "electric-flux",
    obj: ["Calculate electric flux through surfaces."],
    terms: [["Electric flux", "Φ = ∫E·dA, a measure of the field passing through a surface."]],
    checks: [
      ["What is the flux through a surface parallel to a uniform field?", "Zero."],
      ["What is the net flux through a closed surface with no charge inside?", "Zero."],
    ],
    body: R`
$$\Phi_E = \int \vec E \cdot d\vec A \qquad \Phi_E = EA\cos\theta\ \text{(uniform field, flat surface)}$$

$$\theta$$ is the angle between $$\vec E$$ and the surface's normal. For closed surfaces, the normal points outward: field lines leaving count as positive flux, entering as negative.
`,
    note: ["Counting lines", "Flux is proportional to the number of field lines crossing a surface."],
    ex: ["Tilted surface", "A uniform field of 300 N/C passes through a 0.20 m² square whose normal is at 60° to the field. Find the flux.", [R`$$\Phi = 300(0.20)\cos 60°$$.`], "30 N·m²/C."],
  },
  {
    id: "gausss-law",
    obj: ["Apply Gauss's law to symmetric charge distributions."],
    terms: [["Gauss's law", "The net flux through a closed surface equals the enclosed charge divided by ε0."]],
    checks: [
      ["What is E inside a uniformly charged insulating sphere at distance r from the center?", "E = kQr/R³, growing linearly with r."],
      ["What is E inside a charged conducting shell?", "Zero."],
    ],
    body: R`
$$\oint \vec E \cdot d\vec A = \frac{q_{enc}}{\varepsilon_0}$$

Gauss's law always holds, but it gives E easily only when symmetry makes E constant over a chosen **Gaussian surface**:

| Symmetry | Gaussian surface | Result |
| --- | --- | --- |
| spherical | sphere | $$E = \frac{q_{enc}}{4\pi\varepsilon_0 r^2}$$ |
| cylindrical (line) | cylinder | $$E = \frac{\lambda_{enc}}{2\pi\varepsilon_0 r}$$ |
| planar (sheet) | pillbox | $$E = \frac{\sigma}{2\varepsilon_0}$$ |

Uniformly charged solid sphere (radius R): inside, $$q_{enc} = Q\frac{r^3}{R^3}$$, so $$E = \frac{Qr}{4\pi\varepsilon_0R^3}$$.

For nonuniform density $$\rho(r)$$, find $$q_{enc} = \int \rho\,4\pi r^2\,dr$$.
`,
    note: ["Shell theorem", "Outside any spherically symmetric distribution, the field is as if all the charge were at the center."],
    ex: ["Nonuniform sphere", R`A sphere of radius R has $$\rho = \rho_0 r/R$$. Find the total charge.`, [R`$$Q = \int_0^R \rho_0\frac{r}{R}4\pi r^2\,dr$$.`, R`$$Q = \frac{4\pi\rho_0}{R}\cdot\frac{R^4}{4} = \pi\rho_0R^3$$.`], R`$$\pi\rho_0R^3$$.`],
  },
  {
    id: "electric-potential-energy",
    obj: ["Calculate electric potential energy of systems of charges and the work done moving charges."],
    terms: [["Electric potential energy", "U = kq1q2/r for two point charges, zero at infinite separation."]],
    checks: [
      ["What is the sign of U for two opposite charges?", "Negative."],
      ["How much work is needed to assemble three charges?", "The sum of the potential energies of all three pairs."],
    ],
    body: R`
$$U = \frac{1}{4\pi\varepsilon_0}\frac{q_1q_2}{r} \qquad \Delta U = -W_{field}$$

For a system of charges, add $$U$$ for every pair. The work an external agent does to assemble the system equals its total potential energy.

Energy conservation: $$\Delta K = -\Delta U = -q\Delta V$$.
`,
    note: ["Sign tells the story", "Positive U (like charges) means work was needed to push them together; negative U means the system is bound."],
    ex: ["Speed from energy", R`A proton is released from rest 1.0 × 10⁻¹⁰ m from another fixed proton. Find its speed when very far away.`, [R`$$U = \frac{(8.99 \times 10^9)(1.6 \times 10^{-19})^2}{1.0 \times 10^{-10}} = 2.3 \times 10^{-18}$$ J.`, R`$$v = \sqrt{2U/m} = \sqrt{2(2.3 \times 10^{-18})/(1.67 \times 10^{-27})}$$.`], R`about $$5.2 \times 10^4$$ m/s.`],
  },
  {
    id: "electric-potential",
    obj: ["Calculate electric potential of point charges and relate it to potential energy."],
    terms: [
      ["Electric potential", "Potential energy per unit charge, V = U/q, in volts."],
      ["Potential difference", "ΔV = −∫E·dr."],
    ],
    checks: [
      ["Is potential a scalar or a vector?", "A scalar, so potentials from several charges add algebraically."],
      ["Which way do positive charges move freely?", "Toward lower potential."],
    ],
    body: R`
$$V = \frac{U}{q} \qquad V = \frac{1}{4\pi\varepsilon_0}\frac{q}{r} \qquad \Delta V = -\int \vec E \cdot d\vec r$$

Potential is a **scalar**: add the potentials of several charges with signs, no components needed.

A charge moving through potential difference $$\Delta V$$ changes its potential energy by $$q\Delta V$$. An electron accelerated through 1 V gains 1 eV = $$1.6 \times 10^{-19}$$ J.
`,
    note: ["Zero field, nonzero potential", "At the midpoint between two equal positive charges, E = 0 but V is not zero."],
    ex: ["Potential at a point", "Charges +3.0 nC and −1.0 nC are 0.20 m and 0.10 m from point P. Find V at P.", [R`$$V = 8.99 \times 10^9\left(\frac{3.0 \times 10^{-9}}{0.20} - \frac{1.0 \times 10^{-9}}{0.10}\right)$$.`, R`$$= 8.99 \times 10^9(5.0 \times 10^{-9}) = 45$$ V.`], "45 V."],
  },
  {
    id: "electric-potential-of-charge-distributions",
    obj: ["Integrate to find the potential of continuous charge distributions."],
    terms: [["Potential of a distribution", "V = ∫k dq/r, a scalar integral."]],
    checks: [
      ["What is V on the axis of a ring of charge Q and radius a at distance x?", "kQ/√(x² + a²)."],
      ["Why is potential often easier to compute than field?", "It is a scalar, so no components or cancellation are needed."],
    ],
    body: R`
$$V = \int \frac{1}{4\pi\varepsilon_0}\frac{dq}{r}$$

| Distribution | Potential |
| --- | --- |
| ring, on axis | $$\frac{kQ}{\sqrt{x^2 + a^2}}$$ |
| conducting sphere, outside | $$\frac{kQ}{r}$$ |
| conducting sphere, inside | $$\frac{kQ}{R}$$ (constant) |

Alternatively, integrate the field from a reference point: $$V(r) = -\int_\infty^r \vec E \cdot d\vec r$$.
`,
    note: ["Field from potential", "Once V is known as a function of position, E = −dV/dx gives the field."],
    ex: ["Ring field from potential", R`Use $$V(x) = \frac{kQ}{\sqrt{x^2 + a^2}}$$ to find E on the axis.`, [R`$$E = -\frac{dV}{dx} = \frac{kQx}{(x^2 + a^2)^{3/2}}$$.`], R`$$\frac{kQx}{(x^2+a^2)^{3/2}}$$, matching the direct integral.`],
  },
  {
    id: "equipotentials-and-the-electric-field",
    obj: ["Relate equipotential surfaces to field lines and use E = −dV/dx."],
    terms: [["Equipotential surface", "A surface on which the potential is constant; no work is done moving a charge along it."]],
    checks: [
      ["What angle do field lines make with equipotentials?", "90°."],
      ["Where is the field strongest on a map of equipotentials?", "Where the lines are closest together."],
    ],
    body: R`
$$E_x = -\frac{dV}{dx} \qquad \text{uniform field: } E = \frac{\Delta V}{d}$$

- Field lines are perpendicular to equipotentials.
- The field points toward **decreasing** potential.
- Closely spaced equipotentials mean a strong field.
- Moving a charge along an equipotential takes no work.
`,
    note: ["Units", "Electric field can be written in V/m, which is the same as N/C."],
    ex: ["From a graph", "V drops from 120 V to 40 V over 0.20 m in a uniform field. Find E.", [R`$$E = 80/0.20 = 400$$ V/m.`], "400 V/m, pointing toward lower potential."],
  },
  {
    id: "electrostatics-with-conductors",
    obj: ["Describe the field, charge and potential of conductors in electrostatic equilibrium."],
    terms: [["Electrostatic equilibrium", "No net motion of charge within a conductor."]],
    checks: [
      ["Where does excess charge reside on a conductor?", "On its outer surface."],
      ["What is the field just outside a conductor's surface?", "σ/ε0, perpendicular to the surface."],
    ],
    body: R`
In electrostatic equilibrium, a conductor has:

- $$E = 0$$ everywhere inside;
- all excess charge on its surface;
- the same potential throughout (an equipotential);
- a field just outside that is perpendicular to the surface with magnitude $$\sigma/\varepsilon_0$$.

Charge concentrates where the surface curves most sharply (points), so the field is strongest there.

A charge placed inside a cavity of a conducting shell induces an equal and opposite charge on the cavity's wall.
`,
    note: ["Shielding", "A closed conductor shields its interior from external fields, which is why a car is safe in a lightning strike."],
    ex: ["Shell with a charge inside", "A neutral conducting shell surrounds a +5 µC point charge. What charges appear on its inner and outer surfaces?", ["E = 0 in the metal, so the inner surface has −5 µC.", "The shell is neutral, so the outer surface has +5 µC."], "−5 µC inside, +5 µC outside."],
  },
  {
    id: "redistribution-of-charge-between-conductors",
    obj: ["Predict how charge redistributes between connected conductors."],
    terms: [["Connected conductors", "Conductors joined by a wire reach the same potential."]],
    checks: [
      ["Two conducting spheres of radii R and 2R are connected. Which gets more charge?", "The larger one: charge is proportional to radius."],
      ["Which has the larger surface charge density?", "The smaller sphere."],
    ],
    body: R`
Connected conductors share charge until their potentials are equal. For two distant spheres:

$$\frac{kQ_1}{R_1} = \frac{kQ_2}{R_2} \quad\Rightarrow\quad \frac{Q_1}{Q_2} = \frac{R_1}{R_2}$$

The smaller sphere gets less charge but a higher surface charge density (and field), since $$\sigma \propto 1/R$$.

Total charge is conserved: $$Q_1 + Q_2 = Q_{total}$$.
`,
    note: ["Lightning rods", "This is why fields are strongest at sharp points: they behave like tiny spheres at the same potential as the rest of the conductor."],
    ex: ["Sharing charge", "A sphere of radius 0.10 m with 9.0 µC is connected to an uncharged sphere of radius 0.20 m. Find the final charges.", [R`$$Q_1/Q_2 = 1/2$$ and $$Q_1 + Q_2 = 9.0$$ µC.`], "3.0 µC and 6.0 µC."],
  },
  {
    id: "capacitors",
    obj: ["Calculate capacitance, stored energy and equivalent capacitance."],
    terms: [
      ["Capacitance", "C = Q/ΔV, in farads."],
      ["Parallel-plate capacitor", "C = ε0A/d."],
    ],
    checks: [
      ["What happens to the capacitance if plate separation doubles?", "It halves."],
      ["How do capacitors combine in parallel?", "Their capacitances add."],
    ],
    body: R`
$$C = \frac{Q}{\Delta V} \qquad C = \frac{\varepsilon_0 A}{d} \qquad U = \tfrac12 C(\Delta V)^2 = \frac{Q^2}{2C}$$

| Arrangement | Equivalent |
| --- | --- |
| parallel | $$C_{eq} = C_1 + C_2$$ |
| series | $$\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2}$$ |

Capacitors in series carry the same charge; in parallel they share the same voltage.

The energy is stored in the field, with density $$u = \tfrac12\varepsilon_0E^2$$.
`,
    note: ["Connected or isolated", "If a capacitor stays connected to a battery, V is fixed. If it is disconnected, Q is fixed. Decide which before predicting changes."],
    ex: ["Pulling plates apart", "A charged capacitor is disconnected, then its plate separation is doubled. What happens to its energy?", [R`Q is fixed; C halves.`, R`$$U = Q^2/(2C)$$ doubles.`], "the energy doubles (the work done pulling the plates apart)."],
  },
  {
    id: "dielectrics",
    obj: ["Explain how dielectrics increase capacitance."],
    terms: [["Dielectric constant", "κ, the factor by which an insulator increases capacitance: C = κε0A/d."]],
    checks: [
      ["Why does a dielectric increase capacitance?", "Its molecules polarize, reducing the field and voltage for the same charge."],
      ["A dielectric is inserted into a capacitor connected to a battery. What happens to Q?", "It increases by a factor of κ."],
    ],
    body: R`
$$C = \kappa\frac{\varepsilon_0A}{d}$$

The dielectric's molecules polarize, creating an internal field that opposes the applied field. For the same charge, the field and voltage are reduced by $$\kappa$$, so capacitance rises by $$\kappa$$.

| Situation | Effect of inserting a dielectric |
| --- | --- |
| connected to battery (V fixed) | Q and U increase by κ |
| isolated (Q fixed) | V and U decrease by a factor of κ |
`,
    note: ["Breakdown", "Dielectrics also allow higher voltages before sparks jump the gap."],
    ex: ["Isolated capacitor", "An isolated 4.0 µF capacitor holds 20 µC. A dielectric with κ = 2.5 is inserted. Find the new voltage.", [R`$$C = 10$$ µF.`, R`$$V = 20/10 = 2.0$$ V.`], "2.0 V (down from 5.0 V)."],
  },
];
