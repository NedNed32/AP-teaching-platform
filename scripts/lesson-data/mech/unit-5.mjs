/* AP Physics C: Mechanics, Units 5–7. */
const R = String.raw;
export const lessons = [
  {
    id: "rotational-kinematics",
    obj: ["Describe rotation with angular position, velocity and acceleration."],
    terms: [
      ["Angular velocity", "ω = dθ/dt, in rad/s."],
      ["Angular acceleration", "α = dω/dt, in rad/s²."],
    ],
    checks: [
      ["How many radians are in one revolution?", "2π."],
      ["Which equation gives ω after time t with constant α?", "ω = ω0 + αt."],
    ],
    body: R`
Rotation mirrors linear motion with angular quantities:

| Linear | Angular |
| --- | --- |
| $$x$$ | $$\theta$$ |
| $$v = dx/dt$$ | $$\omega = d\theta/dt$$ |
| $$a = dv/dt$$ | $$\alpha = d\omega/dt$$ |

For constant $$\alpha$$:

$$\omega = \omega_0 + \alpha t \qquad \theta = \theta_0 + \omega_0 t + \tfrac12\alpha t^2 \qquad \omega^2 = \omega_0^2 + 2\alpha\Delta\theta$$
`,
    note: ["Radians", "Use radians in rotational equations. Convert rpm by multiplying by 2π/60."],
    ex: ["Spinning down", "A wheel spinning at 30 rad/s slows uniformly to rest in 10 s. How many revolutions does it make?", [R`$$\alpha = -3.0$$ rad/s².`, R`$$\Delta\theta = \tfrac12(30)(10) = 150$$ rad.`, R`$$150/2\pi = 23.9$$ rev.`], "about 24 revolutions."],
  },
  {
    id: "connecting-linear-and-rotational-motion",
    obj: ["Relate linear and angular quantities for points on a rotating object."],
    terms: [["Tangential speed", "v = rω for a point at distance r from the axis."]],
    checks: [
      ["Do all points on a rigid rotating disk have the same angular velocity?", "Yes; their linear speeds differ with r."],
      ["What is the centripetal acceleration of a point at radius r?", "ω²r."],
    ],
    body: R`
For a point at distance $$r$$ from the axis:

$$s = r\theta \qquad v = r\omega \qquad a_t = r\alpha \qquad a_c = \omega^2 r$$

Every point of a rigid body shares the same $$\omega$$ and $$\alpha$$, but points farther out move faster.

A string unwinding from a pulley without slipping moves at the rim speed: $$v = r\omega$$, $$a = r\alpha$$.
`,
    note: ["Total acceleration", "A point on a speeding-up wheel has both tangential and centripetal acceleration; add them as perpendicular vectors."],
    ex: ["Rim speed", "A 0.30 m radius wheel turns at 120 rpm. Find the speed of a point on the rim.", [R`$$\omega = 120 \times 2\pi/60 = 12.6$$ rad/s.`, R`$$v = 0.30 \times 12.6 = 3.8$$ m/s.`], "about 3.8 m/s."],
  },
  {
    id: "torque",
    obj: ["Calculate torque as r × F."],
    terms: [
      ["Torque", "τ = rF sin θ: the rotational effect of a force about an axis."],
      ["Lever arm", "The perpendicular distance from the axis to the line of action of the force."],
    ],
    checks: [
      ["What torque does a force directed through the axis produce?", "Zero."],
      ["How can you double the torque without changing the force?", "Double the lever arm."],
    ],
    body: R`
$$\vec\tau = \vec r \times \vec F \qquad \tau = rF\sin\theta = r_\perp F$$

Torque depends on the size of the force, where it is applied, and its direction. By convention, counterclockwise torques are positive.

Gravity acts at the center of mass, so a uniform beam's weight produces a torque as if it were concentrated at the midpoint.
`,
    note: ["Right-hand rule", "Curl the fingers of your right hand from r toward F: your thumb points in the direction of the torque vector, along the axis."],
    ex: ["Wrench", "A 40 N force is applied 0.25 m from a bolt at 60° to the wrench. Find the torque.", [R`$$\tau = 0.25 \times 40 \times \sin 60°$$.`], "about 8.7 N·m."],
  },
  {
    id: "rotational-inertia",
    obj: ["Calculate rotational inertia for point masses and continuous objects, including the parallel-axis theorem."],
    terms: [
      ["Rotational inertia", "I = Σmr² or ∫r² dm: resistance to angular acceleration."],
      ["Parallel-axis theorem", "I = I_cm + Md² for an axis a distance d from a parallel axis through the center of mass."],
    ],
    checks: [
      ["What is I for a uniform rod about its center? About its end?", "ML²/12; ML²/3."],
      ["Why does a hoop have a larger I than a disk of the same mass and radius?", "All its mass is at the maximum distance from the axis."],
    ],
    body: R`
$$I = \sum m_i r_i^2 \qquad I = \int r^2\,dm$$

| Object | Axis | I |
| --- | --- | --- |
| hoop | center | $$MR^2$$ |
| solid disk or cylinder | center | $$\tfrac12 MR^2$$ |
| solid sphere | center | $$\tfrac25 MR^2$$ |
| rod | center | $$\tfrac{1}{12}ML^2$$ |
| rod | end | $$\tfrac13 ML^2$$ |

**Parallel-axis theorem**: $$I = I_{cm} + Md^2$$. For a rod about its end: $$\tfrac{1}{12}ML^2 + M(L/2)^2 = \tfrac13 ML^2$$.
`,
    note: ["Distribution matters", "Two objects with the same mass can have very different rotational inertia, depending on how far the mass is from the axis."],
    ex: ["Integration", R`Find I for a uniform rod of mass M and length L about one end.`, [R`$$dm = (M/L)\,dx$$.`, R`$$I = \int_0^L x^2 \frac{M}{L}\,dx = \frac{M}{L}\cdot\frac{L^3}{3}$$.`], R`$$\tfrac13 ML^2$$.`],
  },
  {
    id: "rotational-equilibrium-and-newtons-first-law-in-rotational-form",
    obj: ["Apply the conditions for static equilibrium to extended objects."],
    terms: [["Static equilibrium", "Both the net force and the net torque on an object are zero."]],
    checks: [
      ["Where should you place the axis when solving an equilibrium problem?", "Anywhere; choosing it where an unknown force acts removes that force from the torque equation."],
      ["What are the two conditions for static equilibrium?", "Net force zero and net torque zero."],
    ],
    body: R`
An extended object is in equilibrium when

$$\sum \vec F = 0 \qquad \sum \tau = 0$$

about **any** axis. A rotating object with no net torque keeps a constant angular velocity (Newton's first law in rotational form).

## Strategy

1. Draw a force diagram showing where each force acts.
2. Pick an axis through an unknown force.
3. Sum torques; then sum forces.
`,
    note: ["Seesaw balance", "Two children balance when m1d1 = m2d2."],
    ex: ["Beam on supports", "A 4.0 m uniform beam weighing 200 N rests on supports at its ends. A 600 N person stands 1.0 m from the left end. Find the force from the right support.", [R`Torques about the left end: $$F_R(4.0) = 200(2.0) + 600(1.0)$$.`, R`$$F_R = 1000/4.0 = 250$$ N.`], "250 N (the left support provides 550 N)."],
  },
  {
    id: "newtons-second-law-in-rotational-form",
    obj: ["Apply τ = Iα to rotating objects and to systems with pulleys."],
    terms: [["Rotational second law", "The net torque on an object equals its rotational inertia times its angular acceleration."]],
    checks: [
      ["Why does a pulley with mass reduce the acceleration of an Atwood machine?", "Some of the net force is needed to give the pulley angular acceleration."],
      ["What is the analog of mass in rotation?", "Rotational inertia."],
    ],
    body: R`
$$\sum \tau = I\alpha$$

## A falling mass on a pulley

A mass $$m$$ hangs from a string wound on a pulley (disk of mass $$M$$, radius $$R$$):

- Mass: $$mg - T = ma$$
- Pulley: $$TR = \tfrac12 MR^2\alpha$$, with $$a = R\alpha$$

Solving: $$a = \frac{mg}{m + M/2}$$.

Tensions on either side of a massive pulley are different; their difference provides the torque.
`,
    note: ["Same strategy as forces", "Draw a diagram for each object, write ΣF = ma or Στ = Iα for each, and link them with a = rα."],
    ex: ["Hanging mass and disk", "A 2.0 kg mass hangs from a string on a 4.0 kg disk pulley. Find the acceleration.", [R`$$a = \frac{2.0(9.8)}{2.0 + 2.0}$$.`], "4.9 m/s²."],
  },
  {
    id: "rotational-kinetic-energy",
    obj: ["Calculate rotational kinetic energy and include it in energy conservation."],
    terms: [["Rotational kinetic energy", "K = ½Iω²."]],
    checks: [
      ["What is the total kinetic energy of a rolling object?", "½mv_cm² + ½I_cmω²."],
      ["Which reaches the bottom of a ramp first, a solid sphere or a hoop?", "The solid sphere; less of its energy goes into rotation."],
    ],
    body: R`
$$K_{rot} = \tfrac12 I\omega^2$$

A rotating object stores kinetic energy even if its center of mass is at rest (a flywheel). Include rotational energy whenever objects spin:

$$mgh = \tfrac12 mv^2 + \tfrac12 I\omega^2$$
`,
    note: ["Flywheels", "Flywheels store energy in rotation. Doubling the angular speed quadruples the stored energy."],
    ex: ["Rod swinging down", "A uniform rod of length L, pivoted at one end, is released from horizontal. Find ω at the bottom.", [R`The center of mass falls $$L/2$$: $$Mg\frac{L}{2} = \tfrac12\cdot\tfrac13 ML^2\omega^2$$.`, R`$$\omega = \sqrt{3g/L}$$.`], R`$$\omega = \sqrt{3g/L}$$.`],
  },
  {
    id: "torque-and-work",
    obj: ["Calculate work done by a torque and rotational power."],
    terms: [["Rotational work", "W = ∫τ dθ."]],
    checks: [
      ["What is the rotational version of the work–energy theorem?", "Net work by torques equals the change in rotational kinetic energy."],
      ["What power does a constant torque τ deliver at angular velocity ω?", "P = τω."],
    ],
    body: R`
$$W = \int_{\theta_1}^{\theta_2}\tau\,d\theta \qquad W = \tau\Delta\theta\ \text{(constant torque)} \qquad P = \tau\omega$$

The rotational work–energy theorem: $$W_{net} = \Delta K_{rot}$$.

The area under a torque–angle graph is the work done.
`,
    note: ["Engines", "Engine power is torque times angular speed. High torque at low rpm and lower torque at high rpm can give the same power."],
    ex: ["Spinning up", "A 6.0 N·m torque acts on a wheel (I = 0.50 kg·m²) at rest through 4.0 revolutions. Find ω.", [R`$$W = 6.0 \times 4.0(2\pi) = 151$$ J.`, R`$$\tfrac12(0.50)\omega^2 = 151$$, so $$\omega = 24.6$$ rad/s.`], "about 25 rad/s."],
  },
  {
    id: "angular-momentum-and-angular-impulse",
    obj: ["Calculate angular momentum for point masses and rigid bodies and relate angular impulse to its change."],
    terms: [
      ["Angular momentum", "L = Iω for a rigid body; L = r × p for a particle."],
      ["Angular impulse", "∫τ dt, equal to the change in angular momentum."],
    ],
    checks: [
      ["Can a particle moving in a straight line have angular momentum?", "Yes, about any point not on its line of motion: L = mvr⊥."],
      ["What is the rotational form of Newton's second law in terms of L?", "Στ = dL/dt."],
    ],
    body: R`
$$L = I\omega \qquad \vec L = \vec r \times \vec p \quad (L = mvr_\perp)$$

$$\sum \tau = \frac{dL}{dt} \qquad \Delta L = \int \tau\,dt$$

A particle moving in a straight line past a point has constant angular momentum about that point (if no net torque), equal to $$mv$$ times the perpendicular distance.
`,
    note: ["Direction", "Angular momentum is a vector along the axis, given by the right-hand rule."],
    ex: ["Angular impulse", "A torque of 3.0 N·m acts for 2.0 s on a disk (I = 0.40 kg·m²) initially at rest. Find ω.", [R`$$\Delta L = 3.0 \times 2.0 = 6.0$$ kg·m²/s.`, R`$$\omega = 6.0/0.40 = 15$$ rad/s.`], "15 rad/s."],
  },
  {
    id: "conservation-of-angular-momentum",
    obj: ["Apply conservation of angular momentum to rotating systems and collisions."],
    terms: [["Conservation of angular momentum", "With no net external torque, a system's angular momentum is constant."]],
    checks: [
      ["Why does a skater spin faster when pulling in her arms?", "I decreases, so ω increases to keep L constant."],
      ["Is rotational kinetic energy conserved when the skater pulls in her arms?", "No; it increases, from the work she does."],
    ],
    body: R`
If $$\sum \tau_{ext} = 0$$: $$I_i\omega_i = I_f\omega_f$$.

## Rotational collisions

A clay ball sticking to the edge of a rotating disk, or a bullet hitting a hinged rod: angular momentum about the axis is conserved (the axle's force produces no torque about the axis), but linear momentum generally is not, because the axle pushes on the system.
`,
    note: ["Kepler's second law", "A planet's angular momentum about the Sun is constant, so it moves faster when closer to the Sun."],
    ex: ["Disk collision", "A 2.0 kg disk (R = 0.50 m) spins at 10 rad/s. A 0.50 kg lump sticks to its rim. Find the new ω.", [R`$$I_i = \tfrac12(2.0)(0.25) = 0.25$$; $$I_f = 0.25 + 0.50(0.25) = 0.375$$ kg·m².`, R`$$\omega_f = 0.25(10)/0.375 = 6.7$$ rad/s.`], "about 6.7 rad/s."],
  },
  {
    id: "rolling",
    obj: ["Analyze rolling without slipping using forces, torques and energy."],
    terms: [["Rolling without slipping", "The contact point is momentarily at rest: v_cm = Rω."]],
    checks: [
      ["Does static friction do work on an object rolling without slipping?", "No; the contact point does not slide."],
      ["What is the speed of a solid sphere at the bottom of a ramp of height h?", "√(10gh/7)."],
    ],
    body: R`
Rolling without slipping: $$v_{cm} = R\omega$$, $$a_{cm} = R\alpha$$.

Energy for an object starting from rest at height $$h$$, with $$I = \beta MR^2$$:

$$Mgh = \tfrac12 Mv^2(1 + \beta) \quad\Rightarrow\quad v = \sqrt{\frac{2gh}{1 + \beta}}$$

| Object | β | Speed at bottom |
| --- | --- | --- |
| hoop | 1 | $$\sqrt{gh}$$ |
| disk | 1/2 | $$\sqrt{4gh/3}$$ |
| solid sphere | 2/5 | $$\sqrt{10gh/7}$$ |

Down an incline: $$a = \frac{g\sin\theta}{1 + \beta}$$.
`,
    note: ["Mass and radius cancel", "Every solid sphere reaches the bottom at the same speed, whatever its mass or size. Only the shape (β) matters."],
    ex: ["Cylinder on a ramp", "A solid cylinder rolls from rest down a 1.5 m high ramp. Find its speed at the bottom.", [R`$$v = \sqrt{4gh/3} = \sqrt{4(9.8)(1.5)/3}$$.`], "about 4.4 m/s."],
  },
  {
    id: "motion-of-orbiting-satellites",
    obj: ["Apply gravitation, energy and angular momentum to circular and elliptical orbits."],
    terms: [
      ["Orbital speed", "v = √(GM/r) for a circular orbit."],
      ["Kepler's third law", "T² = (4π²/GM)r³."],
    ],
    checks: [
      ["What is the total energy of a satellite in a circular orbit?", "E = −GMm/(2r)."],
      ["In an elliptical orbit, where is a satellite fastest?", "At its closest point (periapsis)."],
    ],
    body: R`
## Circular orbits

$$\frac{GMm}{r^2} = \frac{mv^2}{r} \Rightarrow v = \sqrt{\frac{GM}{r}} \qquad T^2 = \frac{4\pi^2}{GM}r^3$$

Energy: $$K = \frac{GMm}{2r}$$, $$U = -\frac{GMm}{r}$$, $$E = -\frac{GMm}{2r}$$.

## Elliptical orbits

Both energy and angular momentum (about the central body) are conserved: $$mv_1r_1 = mv_2r_2$$ at the closest and farthest points.

**Escape speed**: $$v_{esc} = \sqrt{2GM/R}$$.
`,
    note: ["Bound orbits", "A negative total energy means the satellite is bound; zero or positive total energy means it escapes."],
    ex: ["Period ratio", "Satellite B orbits at 4 times the radius of satellite A. Compare their periods.", [R`$$T \propto r^{3/2}$$.`, R`$$4^{3/2} = 8$$.`], "B's period is 8 times A's."],
  },
  {
    id: "defining-simple-harmonic-motion",
    obj: ["Identify simple harmonic motion from its restoring force and differential equation."],
    terms: [["Simple harmonic motion", "Oscillation in which the restoring force is proportional to displacement: d²x/dt² = −ω²x."]],
    checks: [
      ["What condition on the force produces SHM?", "F = −kx: proportional to displacement and directed toward equilibrium."],
      ["What is the general solution of d²x/dt² = −ω²x?", "x = A cos(ωt + φ)."],
    ],
    body: R`
SHM occurs whenever the net force is a linear restoring force:

$$F = -kx \quad\Rightarrow\quad \frac{d^2x}{dt^2} = -\frac{k}{m}x = -\omega^2 x$$

Solution: $$x(t) = A\cos(\omega t + \phi)$$, where $$A$$ is the amplitude and $$\phi$$ the phase constant set by initial conditions.

Many systems are approximately SHM for small displacements: any smooth potential energy minimum looks like a parabola near the bottom.
`,
    note: ["Identifying ω", "Rearrange the equation into d²x/dt² = −(something)x. The square root of that something is ω."],
    ex: ["From the equation", R`A system obeys $$\frac{d^2x}{dt^2} = -36x$$. Find its period.`, [R`$$\omega = 6$$ rad/s.`, R`$$T = 2\pi/6 = 1.05$$ s.`], "about 1.05 s."],
  },
  {
    id: "frequency-and-period-of-shm",
    obj: ["Calculate the period and frequency of mass–spring systems."],
    terms: [
      ["Period", "The time for one complete oscillation, T."],
      ["Angular frequency", "ω = 2π/T = 2πf."],
    ],
    checks: [
      ["Does the period of a mass–spring system depend on amplitude?", "No."],
      ["If the mass is quadrupled, what happens to the period?", "It doubles."],
    ],
    body: R`
$$\omega = \sqrt{\frac{k}{m}} \qquad T = 2\pi\sqrt{\frac{m}{k}} \qquad f = \frac{1}{T}$$

The period is independent of amplitude and of gravity: a vertical spring has the same period as a horizontal one (it oscillates about a shifted equilibrium).
`,
    note: ["Measuring k from oscillations", "Graph T² against m. The slope is 4π²/k."],
    ex: ["Spring period", "A 0.80 kg mass oscillates on a spring with k = 50 N/m. Find T.", [R`$$T = 2\pi\sqrt{0.80/50} = 2\pi(0.126)$$.`], "about 0.79 s."],
  },
  {
    id: "representing-and-analyzing-shm",
    obj: ["Interpret graphs and equations of position, velocity and acceleration in SHM."],
    terms: [["Phase", "The argument ωt + φ that sets where in its cycle an oscillator is."]],
    checks: [
      ["Where is the speed greatest in SHM?", "At equilibrium (x = 0)."],
      ["Where is the acceleration greatest?", "At the turning points (x = ±A)."],
    ],
    body: R`
$$x = A\cos(\omega t + \phi) \qquad v = -A\omega\sin(\omega t + \phi) \qquad a = -A\omega^2\cos(\omega t + \phi)$$

- Maximum speed $$v_{max} = A\omega$$ at equilibrium.
- Maximum acceleration $$a_{max} = A\omega^2$$ at the turning points.
- Acceleration is always opposite to displacement.

On graphs, velocity is a quarter cycle ahead of position, and acceleration is the mirror image of position.
`,
    note: ["Reading phase", "If x = A at t = 0, φ = 0 (cosine). If x = 0 and moving in the positive direction at t = 0, φ = −π/2 (a sine curve)."],
    ex: ["Maximum values", "x = 0.05 cos(10t) m. Find v_max and a_max.", [R`$$v_{max} = 0.05(10) = 0.50$$ m/s.`, R`$$a_{max} = 0.05(100) = 5.0$$ m/s².`], "0.50 m/s and 5.0 m/s²."],
  },
  {
    id: "energy-of-simple-harmonic-oscillators",
    obj: ["Apply energy conservation to oscillating systems."],
    terms: [["Total energy of an oscillator", "E = ½kA², constant in the absence of friction."]],
    checks: [
      ["What is the kinetic energy at x = A/2?", "Three quarters of the total energy."],
      ["If amplitude doubles, what happens to the total energy?", "It quadruples."],
    ],
    body: R`
$$E = \tfrac12 kA^2 = \tfrac12 mv^2 + \tfrac12 kx^2$$

Energy sloshes between kinetic and potential; their sum stays constant.

$$v(x) = \omega\sqrt{A^2 - x^2}$$

Kinetic and potential energy each oscillate at **twice** the frequency of the position.
`,
    note: ["Damping", "Friction or drag removes energy, so the amplitude decreases over time."],
    ex: ["Speed at a position", "A mass on a spring (ω = 4.0 rad/s) has A = 0.10 m. Find its speed at x = 0.06 m.", [R`$$v = 4.0\sqrt{0.0100 - 0.0036} = 4.0(0.080)$$.`], "0.32 m/s."],
  },
  {
    id: "simple-and-physical-pendulums",
    obj: ["Derive and apply the periods of simple and physical pendulums for small oscillations."],
    terms: [
      ["Simple pendulum", "A point mass on a massless string: T = 2π√(L/g) for small angles."],
      ["Physical pendulum", "An extended object swinging about a pivot: T = 2π√(I/(mgd))."],
    ],
    checks: [
      ["Does a simple pendulum's period depend on its mass?", "No."],
      ["What is d in the physical pendulum formula?", "The distance from the pivot to the center of mass."],
    ],
    body: R`
For small angles, $$\sin\theta \approx \theta$$, and the restoring torque becomes linear:

$$\tau = -mgd\,\theta \quad\Rightarrow\quad \frac{d^2\theta}{dt^2} = -\frac{mgd}{I}\theta$$

**Physical pendulum**: $$T = 2\pi\sqrt{\frac{I}{mgd}}$$

**Simple pendulum** ($$I = mL^2$$, $$d = L$$): $$T = 2\pi\sqrt{\frac{L}{g}}$$

Rod pivoted at one end: $$T = 2\pi\sqrt{\frac{2L}{3g}}$$.
`,
    note: ["Small-angle limit", "The formulas hold only for small amplitudes; at large angles the period grows slightly."],
    ex: ["Measuring g", "A 0.90 m pendulum has a period of 1.90 s. Find g.", [R`$$g = 4\pi^2 L/T^2 = 4\pi^2(0.90)/3.61$$.`], "about 9.84 m/s²."],
  },
];
