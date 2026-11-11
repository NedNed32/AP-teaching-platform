/* AP Physics C: E&M, Units 11–13. */
const R = String.raw;
export const lessons = [
  {
    id: "electric-current",
    obj: ["Define current and relate it to the motion of charge carriers."],
    terms: [
      ["Current", "I = dQ/dt, the rate of charge flow, in amperes."],
      ["Current density", "J = I/A = nqv_d."],
    ],
    checks: [
      ["How much charge passes in 5.0 s at 2.0 A?", "10 C."],
      ["Which way does conventional current flow?", "The direction positive charge would move: from high to low potential outside a battery."],
    ],
    body: R`
$$I = \frac{dQ}{dt} \qquad Q = \int I\,dt$$

In a metal, electrons drift slowly (millimeters per second) opposite the conventional current direction:

$$I = nqAv_d$$

where $$n$$ is the number of carriers per volume and $$v_d$$ the drift speed.
`,
    note: ["Fast signal, slow drift", "Lights turn on instantly because the electric field travels through the wire almost at the speed of light, even though each electron drifts slowly."],
    ex: ["Charge from current", R`Current through a wire is $$I(t) = 4t$$ A. How much charge passes from t = 0 to t = 3 s?`, [R`$$Q = \int_0^3 4t\,dt = 2t^2\big|_0^3$$.`], "18 C."],
  },
  {
    id: "simple-circuits",
    obj: ["Describe complete circuits and the role of emf and internal resistance."],
    terms: [
      ["Emf", "The energy per unit charge supplied by a source such as a battery."],
      ["Internal resistance", "Resistance inside a source, causing terminal voltage to drop when current flows."],
    ],
    checks: [
      ["What is the terminal voltage of a battery with emf ε and internal resistance r delivering current I?", "V = ε − Ir."],
      ["Does current get used up in a resistor?", "No; current is the same into and out of it. Energy is transferred."],
    ],
    body: R`
A circuit needs a closed path and a source of emf. Current is the same everywhere along a single loop.

$$V_{terminal} = \varepsilon - Ir$$

An ideal battery has $$r = 0$$. An ideal **ammeter** (in series) has zero resistance; an ideal **voltmeter** (in parallel) has infinite resistance.
`,
    note: ["Energy, not charge, is used", "Charge circulates; batteries supply energy that resistors convert to thermal energy."],
    ex: ["Internal resistance", "A 12 V battery with r = 0.50 Ω drives a 5.5 Ω resistor. Find the current and terminal voltage.", [R`$$I = 12/6.0 = 2.0$$ A.`, R`$$V = 12 - 2.0(0.50) = 11$$ V.`], "2.0 A and 11 V."],
  },
  {
    id: "resistance-resistivity-and-ohms-law",
    obj: ["Apply Ohm's law and calculate resistance from resistivity and geometry."],
    terms: [
      ["Resistance", "R = ΔV/I, in ohms."],
      ["Resistivity", "ρ, a material property: R = ρL/A."],
    ],
    checks: [
      ["What happens to a wire's resistance if its length doubles and its radius doubles?", "It halves: L doubles, A quadruples."],
      ["What is an ohmic material?", "One whose resistance stays constant as voltage changes."],
    ],
    body: R`
$$\Delta V = IR \qquad R = \frac{\rho L}{A}$$

Resistance rises with length and falls with cross-sectional area. Resistivity depends on the material and usually increases with temperature for metals.

For a material with varying cross section or resistivity, integrate: $$R = \int \frac{\rho\,dx}{A(x)}$$.
`,
    note: ["Graph test", "An I–V graph of an ohmic device is a straight line through the origin with slope 1/R."],
    ex: ["Copper wire", R`Find the resistance of 20 m of copper wire (ρ = 1.7 × 10⁻⁸ Ω·m) with a cross-sectional area of 1.0 × 10⁻⁶ m².`, [R`$$R = (1.7 \times 10^{-8})(20)/(1.0 \times 10^{-6})$$.`], "0.34 Ω."],
  },
  {
    id: "electric-power",
    obj: ["Calculate power dissipated in circuit elements."],
    terms: [["Electric power", "P = IΔV = I²R = (ΔV)²/R."]],
    checks: [
      ["Two bulbs in series: which glows brighter, the one with larger or smaller resistance?", "Larger resistance (same current, P = I²R)."],
      ["Two bulbs in parallel?", "The smaller resistance (same voltage, P = V²/R)."],
    ],
    body: R`
$$P = I\Delta V = I^2R = \frac{(\Delta V)^2}{R}$$

Choose the form that uses what is shared: current in series, voltage in parallel.

Energy: $$E = Pt$$. Utilities bill in kilowatt-hours: $$1\ \text{kWh} = 3.6 \times 10^6$$ J.
`,
    note: ["Brightness", "A bulb's brightness depends on the power it dissipates, not on its resistance alone."],
    ex: ["Heater", "A 120 V heater draws 12.5 A. Find its power and resistance.", [R`$$P = 120(12.5) = 1500$$ W.`, R`$$R = 120/12.5 = 9.6$$ Ω.`], "1500 W and 9.6 Ω."],
  },
  {
    id: "compound-direct-current-circuits",
    obj: ["Reduce series and parallel combinations of resistors and find currents and voltages."],
    terms: [
      ["Series", "Elements on a single path share the same current."],
      ["Parallel", "Elements across the same two nodes share the same voltage."],
    ],
    checks: [
      ["What is the equivalent of 6 Ω and 3 Ω in parallel?", "2 Ω."],
      ["Adding a resistor in parallel does what to the total resistance?", "Decreases it."],
    ],
    body: R`
$$R_{series} = R_1 + R_2 + \cdots \qquad \frac{1}{R_{parallel}} = \frac{1}{R_1} + \frac{1}{R_2} + \cdots$$

## Strategy

1. Collapse combinations step by step to find $$R_{eq}$$.
2. Find the total current from the source.
3. Work backward, using $$V = IR$$, to find each branch's current and voltage.

Parallel resistance is always smaller than the smallest branch.
`,
    note: ["Two-resistor shortcut", "For two resistors in parallel, R = R1R2/(R1 + R2)."],
    ex: ["Mixed circuit", "A 4 Ω resistor is in series with a parallel pair of 6 Ω and 3 Ω, across 18 V. Find the current in the 6 Ω resistor.", [R`$$R_{eq} = 4 + 2 = 6$$ Ω; $$I = 3$$ A.`, R`Parallel voltage: $$3 \times 2 = 6$$ V.`, R`$$I_6 = 6/6 = 1$$ A.`], "1 A."],
  },
  {
    id: "kirchhoffs-loop-rule",
    obj: ["Apply Kirchhoff's loop rule to circuits with multiple sources."],
    terms: [["Loop rule", "The sum of potential differences around any closed loop is zero (conservation of energy)."]],
    checks: [
      ["Crossing a resistor in the direction of current, does potential rise or fall?", "It falls by IR."],
      ["Crossing a battery from − to +?", "Potential rises by ε."],
    ],
    body: R`
$$\sum \Delta V = 0 \text{ around any loop}$$

Sign conventions while walking around a loop:

- Through a resistor **with** the current: $$-IR$$; against it: $$+IR$$.
- Through a battery from − to +: $$+\varepsilon$$; from + to −: $$-\varepsilon$$.

If a solved current comes out negative, it simply flows opposite the direction you assumed.
`,
    note: ["Pick directions freely", "Assume any direction for each unknown current. The algebra corrects the sign."],
    ex: ["Opposing batteries", "A 12 V and a 4 V battery oppose each other in a single loop with a total resistance of 4 Ω. Find the current.", [R`$$12 - 4 - I(4) = 0$$.`], "2 A, in the direction driven by the 12 V battery."],
  },
  {
    id: "kirchhoffs-junction-rule",
    obj: ["Apply Kirchhoff's junction rule and solve multi-loop circuits."],
    terms: [["Junction rule", "The total current into a junction equals the total current out (conservation of charge)."]],
    checks: [
      ["Currents of 3 A and 2 A enter a junction. How much leaves?", "5 A."],
      ["How many independent equations are needed for three unknown currents?", "Three: junction and loop equations together."],
    ],
    body: R`
$$\sum I_{in} = \sum I_{out}$$

## Multi-loop circuits

1. Label a current in each branch.
2. Write junction equations.
3. Write loop equations for enough independent loops.
4. Solve the system.
`,
    note: ["Checking", "Verify the answer by checking a loop you did not use."],
    ex: ["Two sources", "In a circuit, junction A has I1 entering and I2, I3 leaving. Loop equations give I2 = 1.5 A and I3 = 0.5 A. Find I1.", [R`$$I_1 = I_2 + I_3$$.`], "2.0 A."],
  },
  {
    id: "resistor-capacitor-rc-circuits",
    obj: ["Analyze charging and discharging RC circuits with differential equations."],
    terms: [["Time constant", "τ = RC, the time for a charging capacitor to reach about 63 percent of its final charge."]],
    checks: [
      ["Immediately after a switch closes, how does an uncharged capacitor behave?", "Like a wire (zero voltage)."],
      ["After a long time in a DC circuit?", "Like a break (no current through it)."],
    ],
    body: R`
**Charging** (emf ε, through R):

$$\varepsilon - IR - \frac{q}{C} = 0 \quad\Rightarrow\quad q(t) = C\varepsilon\left(1 - e^{-t/RC}\right) \qquad I(t) = \frac{\varepsilon}{R}e^{-t/RC}$$

**Discharging**:

$$q(t) = Q_0e^{-t/RC} \qquad I(t) = \frac{Q_0}{RC}e^{-t/RC}$$

After one time constant, a charging capacitor has 63% of its final charge; a discharging one has 37% left. After about 5τ, it is effectively complete.
`,
    note: ["Limits first", "At t = 0 an uncharged capacitor is a short circuit; at t = ∞ it is an open circuit. These limits answer many questions without solving the equation."],
    ex: ["Charging", "A 2.0 µF capacitor charges through 500 kΩ from a 9.0 V battery. Find τ and the voltage after 2.0 s.", [R`$$\tau = RC = 1.0$$ s.`, R`$$V = 9.0(1 - e^{-2}) = 9.0(0.865)$$.`], "τ = 1.0 s; about 7.8 V."],
  },
  {
    id: "magnetic-fields",
    obj: ["Describe magnetic fields and the field lines of magnets and currents."],
    terms: [
      ["Magnetic field", "A vector field, measured in teslas, that exerts forces on moving charges and magnetic materials."],
      ["Magnetic dipole", "A pair of poles, or a current loop, producing a characteristic field pattern."],
    ],
    checks: [
      ["Do magnetic field lines begin or end?", "No; they form closed loops."],
      ["Can a magnet have a single isolated pole?", "No; magnetic monopoles have not been observed."],
    ],
    body: R`
Magnetic fields are produced by moving charges (currents) and by magnetic materials.

- Field lines run from north to south outside a magnet and form **closed loops**.
- There are no magnetic monopoles: the net magnetic flux through any closed surface is zero.
- A current loop acts as a **magnetic dipole**, with dipole moment $$\mu = IA$$.

Earth's field is about $$5 \times 10^{-5}$$ T.
`,
    note: ["Compasses", "A compass needle aligns with the local magnetic field; its north pole points along the field direction."],
    ex: ["Dipole moment", "A 0.050 m radius loop carries 2.0 A. Find its magnetic dipole moment.", [R`$$\mu = IA = 2.0\pi(0.050)^2$$.`], R`about $$1.6 \times 10^{-2}$$ A·m².`],
  },
  {
    id: "magnetism-and-moving-charges",
    obj: ["Calculate the magnetic force on moving charges and analyze their circular motion."],
    terms: [["Magnetic force on a charge", "F = qv × B, perpendicular to both v and B."]],
    checks: [
      ["Does a magnetic force change a charge's speed?", "No; it is always perpendicular to the velocity, so it does no work."],
      ["What is the radius of a charge's circular path in a uniform field?", "r = mv/(|q|B)."],
    ],
    body: R`
$$\vec F = q\vec v \times \vec B \qquad F = |q|vB\sin\theta$$

Use the right-hand rule for positive charges; reverse it for negative charges.

In a uniform field perpendicular to the velocity, the charge moves in a circle:

$$|q|vB = \frac{mv^2}{r} \quad\Rightarrow\quad r = \frac{mv}{|q|B} \qquad T = \frac{2\pi m}{|q|B}$$

**Velocity selector**: crossed fields pass undeflected charges with $$v = E/B$$.
`,
    note: ["No work", "Because F is perpendicular to v, a magnetic field changes only the direction of motion, never the kinetic energy."],
    ex: ["Proton orbit", R`A proton moves at $$2.0 \times 10^6$$ m/s perpendicular to a 0.40 T field. Find the radius.`, [R`$$r = \frac{(1.67 \times 10^{-27})(2.0 \times 10^6)}{(1.6 \times 10^{-19})(0.40)}$$.`], "about 0.052 m."],
  },
  {
    id: "magnetic-forces-on-current-carrying-wires",
    obj: ["Calculate forces on current-carrying wires and torques on current loops."],
    terms: [["Force on a wire", "F = IL × B."]],
    checks: [
      ["Two parallel wires carry currents in the same direction. Do they attract or repel?", "Attract."],
      ["What is the torque on a current loop in a field?", "τ = μ × B, maximum when the loop's plane is parallel to the field."],
    ],
    body: R`
$$\vec F = I\vec L \times \vec B \qquad F = ILB\sin\theta$$

For a curved wire, integrate $$d\vec F = I\,d\vec l \times \vec B$$.

**Parallel wires** (distance d): $$\frac{F}{L} = \frac{\mu_0I_1I_2}{2\pi d}$$; same-direction currents attract.

**Current loop**: $$\tau = \mu B\sin\theta$$ with $$\mu = NIA$$. This torque drives electric motors.
`,
    note: ["Closed loop in a uniform field", "The net force on any closed current loop in a uniform field is zero, though there can be a torque."],
    ex: ["Force on a wire", "A 0.50 m wire carrying 3.0 A is perpendicular to a 0.20 T field. Find the force.", [R`$$F = 3.0(0.50)(0.20)$$.`], "0.30 N."],
  },
  {
    id: "biot-savart-law",
    obj: ["Use the Biot–Savart law to find magnetic fields of current distributions."],
    terms: [["Biot–Savart law", "dB = (μ0/4π) I dl × r̂ / r²."]],
    checks: [
      ["What is the field at the center of a circular loop?", "B = μ0I/(2R)."],
      ["What is the field a distance r from a long straight wire?", "B = μ0I/(2πr)."],
    ],
    body: R`
$$d\vec B = \frac{\mu_0}{4\pi}\frac{I\,d\vec l \times \hat r}{r^2} \qquad \mu_0 = 4\pi \times 10^{-7}\ \text{T·m/A}$$

| Source | Field |
| --- | --- |
| long straight wire | $$\frac{\mu_0I}{2\pi r}$$ |
| center of a loop | $$\frac{\mu_0I}{2R}$$ |
| center of an arc of angle θ | $$\frac{\mu_0I\theta}{4\pi R}$$ |

Straight segments that point directly at the field point contribute nothing (dl is parallel to r).
`,
    note: ["Right-hand rule for wires", "Point your thumb along the current: your fingers curl in the direction of the field."],
    ex: ["Loop center", "A 0.10 m radius loop carries 5.0 A. Find B at its center.", [R`$$B = \frac{(4\pi \times 10^{-7})(5.0)}{2(0.10)}$$.`], R`about $$3.1 \times 10^{-5}$$ T.`],
  },
  {
    id: "amperes-law",
    obj: ["Apply Ampère's law to symmetric current distributions."],
    terms: [["Ampère's law", "∮B·dl = μ0I_enc."]],
    checks: [
      ["What is B inside an ideal solenoid?", "B = μ0nI, uniform."],
      ["What is B inside a long wire of radius R carrying uniform current, at r less than R?", "B = μ0Ir/(2πR²)."],
    ],
    body: R`
$$\oint \vec B \cdot d\vec l = \mu_0I_{enc}$$

Like Gauss's law, it is always true but useful only with symmetry.

| Source | Amperian loop | Field |
| --- | --- | --- |
| long wire, outside | circle | $$\frac{\mu_0I}{2\pi r}$$ |
| long solid wire, inside | circle | $$\frac{\mu_0Ir}{2\pi R^2}$$ |
| solenoid ($$n$$ turns per meter) | rectangle | $$\mu_0nI$$ inside, about 0 outside |
| toroid | circle | $$\frac{\mu_0NI}{2\pi r}$$ |
`,
    note: ["Enclosed current", "For a nonuniform current density J(r), find I_enc = ∫J 2πr dr."],
    ex: ["Solenoid", "A solenoid with 2000 turns per meter carries 1.5 A. Find B inside.", [R`$$B = (4\pi \times 10^{-7})(2000)(1.5)$$.`], R`about $$3.8 \times 10^{-3}$$ T.`],
  },
  {
    id: "magnetic-flux",
    obj: ["Calculate magnetic flux through a surface."],
    terms: [["Magnetic flux", "Φ_B = ∫B·dA, in webers."]],
    checks: [
      ["What is the flux through a loop whose plane is parallel to B?", "Zero."],
      ["What is the net magnetic flux through any closed surface?", "Zero."],
    ],
    body: R`
$$\Phi_B = \int \vec B \cdot d\vec A \qquad \Phi_B = BA\cos\theta\ \text{(uniform field)}$$

For a nonuniform field, such as near a long wire, integrate over the area. A rectangle of length $$L$$ from distance $$a$$ to $$b$$ beside a wire:

$$\Phi = \int_a^b \frac{\mu_0I}{2\pi r}L\,dr = \frac{\mu_0IL}{2\pi}\ln\frac{b}{a}$$
`,
    note: ["Ways to change flux", "Flux changes if B, the area, or the angle between them changes. Each is a way to induce an emf."],
    ex: ["Flux through a coil", "A 0.30 T field passes through a 0.020 m² loop at 30° to the normal. Find the flux.", [R`$$\Phi = 0.30(0.020)\cos 30°$$.`], R`about $$5.2 \times 10^{-3}$$ Wb.`],
  },
  {
    id: "faradays-and-lenzs-laws",
    obj: ["Apply Faraday's law to find induced emf and Lenz's law to find its direction."],
    terms: [
      ["Faraday's law", "ε = −N dΦ_B/dt."],
      ["Lenz's law", "The induced current flows in the direction that opposes the change in flux."],
    ],
    checks: [
      ["A magnet's north pole approaches a loop. Which way is the loop's induced field?", "Opposing the approach: pointing back toward the magnet."],
      ["What is the emf of a rod of length L moving at v perpendicular to B?", "ε = BLv."],
    ],
    body: R`
$$\varepsilon = -N\frac{d\Phi_B}{dt}$$

The minus sign is **Lenz's law**: the induced current creates a field that opposes the change in flux (not the flux itself).

**Motional emf**: a rod of length $$L$$ sliding at speed $$v$$ on rails in a field $$B$$: $$\varepsilon = BLv$$.

A coil rotating in a field produces an alternating emf: $$\varepsilon = NBA\omega\sin\omega t$$ (a generator).
`,
    note: ["Applying Lenz's law", "Ask: is the flux increasing or decreasing? The induced field points opposite to an increase, or along a decrease."],
    ex: ["Changing field", "A 50-turn coil of area 0.040 m² sits in a field that rises from 0 to 0.50 T in 0.10 s. Find the emf.", [R`$$\varepsilon = 50 \times 0.040 \times 0.50/0.10$$.`], "10 V."],
  },
  {
    id: "induced-currents-and-magnetic-forces",
    obj: ["Analyze forces and energy in systems with induced currents."],
    terms: [["Magnetic braking", "Induced currents create forces that oppose motion, converting kinetic energy into thermal energy."]],
    checks: [
      ["A rod slides on rails in a field with a resistor connected. What happens to its speed if no force pushes it?", "It slows down exponentially."],
      ["What force is needed to move the rod at constant speed?", "F = B²L²v/R."],
    ],
    body: R`
A sliding rod (length $$L$$, speed $$v$$) on rails connected by resistance $$R$$:

$$\varepsilon = BLv \qquad I = \frac{BLv}{R} \qquad F_{mag} = ILB = \frac{B^2L^2v}{R}$$

The magnetic force opposes the motion. To keep the rod moving at constant speed, an applied force must supply power $$P = Fv = \frac{B^2L^2v^2}{R}$$, which equals the power dissipated in the resistor.

Released with speed $$v_0$$ and no applied force: $$v(t) = v_0e^{-B^2L^2t/(mR)}$$.
`,
    note: ["Energy check", "Mechanical power in always equals electrical power dissipated: energy is conserved."],
    ex: ["Constant speed", "A 0.40 m rod moves at 5.0 m/s on rails in a 0.50 T field with R = 2.0 Ω. Find the current and the force needed.", [R`$$\varepsilon = 0.50(0.40)(5.0) = 1.0$$ V; $$I = 0.50$$ A.`, R`$$F = ILB = 0.50(0.40)(0.50) = 0.10$$ N.`], "0.50 A and 0.10 N."],
  },
  {
    id: "inductance",
    obj: ["Calculate self-inductance, induced emf in inductors and stored magnetic energy."],
    terms: [
      ["Inductance", "L = NΦ/I, in henries; an inductor opposes changes in current."],
      ["Back emf", "ε = −L dI/dt."],
    ],
    checks: [
      ["What is the inductance of a solenoid?", "L = μ0N²A/ℓ."],
      ["What energy is stored in an inductor carrying current I?", "U = ½LI²."],
    ],
    body: R`
$$\varepsilon_L = -L\frac{dI}{dt} \qquad L_{solenoid} = \frac{\mu_0N^2A}{\ell} \qquad U = \tfrac12 LI^2$$

An inductor resists changes in current, the way mass resists changes in velocity. The energy is stored in the magnetic field, with density $$u = \frac{B^2}{2\mu_0}$$.
`,
    note: ["Sparks", "Suddenly breaking a circuit with an inductor makes dI/dt huge, producing a large emf that can cause a spark."],
    ex: ["Back emf", "Current in a 0.20 H inductor drops from 3.0 A to 0 in 0.050 s. Find the average emf.", [R`$$\varepsilon = 0.20 \times 3.0/0.050$$.`], "12 V."],
  },
  {
    id: "resistor-inductor-lr-circuits",
    obj: ["Analyze LR circuits with differential equations and limiting behavior."],
    terms: [["LR time constant", "τ = L/R."]],
    checks: [
      ["Immediately after a switch closes, how does an inductor behave?", "Like a break: no current through it."],
      ["After a long time?", "Like a wire."],
    ],
    body: R`
Switch closed at $$t = 0$$ (emf ε, resistance R, inductance L):

$$\varepsilon - IR - L\frac{dI}{dt} = 0 \quad\Rightarrow\quad I(t) = \frac{\varepsilon}{R}\left(1 - e^{-tR/L}\right)$$

When the source is removed, the current decays: $$I = I_0e^{-tR/L}$$.

| Time | Capacitor | Inductor |
| --- | --- | --- |
| just after switching | acts like a wire | acts like a break |
| long after | acts like a break | acts like a wire |
`,
    note: ["Continuity", "Current through an inductor cannot change instantaneously, just as voltage across a capacitor cannot."],
    ex: ["Current after one time constant", "A 12 V battery, 4.0 Ω resistor and 2.0 H inductor are connected. Find τ and I after 0.50 s.", [R`$$\tau = 2.0/4.0 = 0.50$$ s.`, R`$$I = 3.0(1 - e^{-1}) = 3.0(0.632)$$.`], "τ = 0.50 s; about 1.9 A."],
  },
  {
    id: "inductor-capacitor-lc-circuits",
    obj: ["Describe energy oscillation in LC circuits and calculate their frequency."],
    terms: [["LC oscillation", "Energy moves back and forth between a capacitor's electric field and an inductor's magnetic field at ω = 1/√(LC)."]],
    checks: [
      ["When the capacitor's charge is maximum, what is the current?", "Zero."],
      ["What mechanical system is analogous to an LC circuit?", "A mass on a spring."],
    ],
    body: R`
$$L\frac{d^2q}{dt^2} + \frac{q}{C} = 0 \quad\Rightarrow\quad q = Q_{max}\cos(\omega t + \phi) \qquad \omega = \frac{1}{\sqrt{LC}}$$

Energy is conserved:

$$\frac{Q_{max}^2}{2C} = \frac{q^2}{2C} + \frac12 LI^2 \qquad I_{max} = \omega Q_{max}$$

| Spring–mass | LC circuit |
| --- | --- |
| x | q |
| v | I |
| m | L |
| k | 1/C |
`,
    note: ["Same math, different physics", "Recognizing the same differential equation lets you reuse everything you know about simple harmonic motion."],
    ex: ["Frequency", "Find the oscillation frequency of a circuit with L = 10 mH and C = 4.0 µF.", [R`$$\omega = 1/\sqrt{(0.010)(4.0 \times 10^{-6})} = 5000$$ rad/s.`, R`$$f = 5000/2\pi$$.`], "about 800 Hz."],
  },
];
