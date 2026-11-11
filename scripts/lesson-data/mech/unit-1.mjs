/* AP Physics C: Mechanics, Units 1–2. Bodies use String.raw so TeX survives. */
const R = String.raw;
export const lessons = [
  {
    id: "scalars-and-vectors-in-one-dimension",
    obj: ["Distinguish scalar and vector quantities and describe vectors in one dimension with signs."],
    terms: [
      ["Scalar", "A quantity with magnitude only, such as mass, time or speed."],
      ["Vector", "A quantity with magnitude and direction, such as displacement, velocity or force."],
    ],
    checks: [
      ["Is distance a scalar or a vector?", "A scalar; displacement is the vector."],
      ["In one dimension, how is a vector's direction shown?", "By its sign relative to a chosen positive direction."],
    ],
    body: R`
Physics quantities are either **scalars** (magnitude only) or **vectors** (magnitude and direction).

| Scalars | Vectors |
| --- | --- |
| distance, speed, mass, time, energy | displacement, velocity, acceleration, force, momentum |

In one dimension, choose a positive direction. A vector's sign then gives its direction: $$v = -3\ \text{m/s}$$ means 3 m/s in the negative direction.

Vectors add with signs: walking +5 m then −8 m gives a displacement of −3 m but a distance of 13 m.
`,
    note: ["Choose axes first", "Every problem starts with a coordinate system. The physics does not depend on the choice, but the signs of your answers do."],
    ex: ["Distance versus displacement", "A runner goes 40 m east, then 70 m west. Find the distance and the displacement (east positive).", ["Distance: 40 + 70 = 110 m.", "Displacement: +40 − 70 = −30 m."], "110 m traveled; displacement 30 m west."],
  },
  {
    id: "displacement-velocity-and-acceleration",
    obj: ["Relate position, velocity and acceleration using derivatives and integrals.", "Apply the constant-acceleration equations."],
    terms: [
      ["Velocity", "The rate of change of position: v = dx/dt."],
      ["Acceleration", "The rate of change of velocity: a = dv/dt."],
    ],
    checks: [
      ["If x(t) = 4t³ − 2t, what is v(t)?", "v = 12t² − 2."],
      ["How do you get displacement from v(t)?", "Integrate v(t) over the time interval."],
    ],
    body: R`
Calculus connects the three quantities:

$$v = \frac{dx}{dt} \qquad a = \frac{dv}{dt} = \frac{d^2x}{dt^2}$$

$$\Delta x = \int_{t_1}^{t_2} v\,dt \qquad \Delta v = \int_{t_1}^{t_2} a\,dt$$

## Constant acceleration

$$v = v_0 + at \qquad x = x_0 + v_0t + \tfrac{1}{2}at^2 \qquad v^2 = v_0^2 + 2a(x - x_0)$$

These apply **only** when acceleration is constant. When a(t) or v(t) is given as a function, use calculus.
`,
    note: ["Speeding up or slowing down", "An object speeds up when velocity and acceleration have the same sign, and slows down when they have opposite signs."],
    ex: ["Calculus kinematics", R`A particle has $$a(t) = 6t$$ m/s², with $$v(0) = 2$$ m/s and $$x(0) = 0$$. Find $$x(2)$$.`, [R`$$v(t) = 3t^2 + 2$$.`, R`$$x(t) = t^3 + 2t$$.`, R`$$x(2) = 8 + 4 = 12$$ m.`], "12 m."],
  },
  {
    id: "representing-motion",
    obj: ["Interpret position, velocity and acceleration graphs using slopes and areas."],
    terms: [
      ["Slope of x–t graph", "Velocity."],
      ["Area under v–t graph", "Displacement."],
      ["Area under a–t graph", "Change in velocity."],
    ],
    checks: [
      ["What does a horizontal line on a v–t graph mean?", "Constant velocity (zero acceleration)."],
      ["What does a negative area under a v–t graph mean?", "Displacement in the negative direction."],
    ],
    body: R`
Graphs encode the same calculus relationships.

| Graph | Slope gives | Area gives |
| --- | --- | --- |
| position vs. time | velocity | — |
| velocity vs. time | acceleration | displacement |
| acceleration vs. time | (jerk) | change in velocity |

A curved x–t graph means changing velocity. Concave up means positive acceleration.

Motion can also be shown with motion diagrams and equations; translating between these representations is a central exam skill.
`,
    note: ["Turning points", "An object momentarily stops (v = 0) where an x–t graph has a horizontal tangent, and reverses direction if v changes sign there."],
    ex: ["Area under a v–t graph", "An object's velocity rises linearly from 0 to 12 m/s in 4 s, then stays constant for 3 s. Find the displacement.", ["Triangle: ½(4)(12) = 24 m.", "Rectangle: 3 × 12 = 36 m."], "60 m."],
  },
  {
    id: "reference-frames-and-relative-motion",
    obj: ["Calculate velocities measured in different inertial reference frames."],
    terms: [["Relative velocity", "The velocity of an object as measured by an observer in a particular reference frame."]],
    checks: [
      ["A train moves at 20 m/s; a passenger walks forward at 2 m/s. What is the passenger's speed relative to the ground?", "22 m/s."],
      ["Is acceleration the same in all inertial frames?", "Yes; frames moving at constant velocity relative to each other measure the same acceleration."],
    ],
    body: R`
Motion is always measured relative to a reference frame.

$$\vec v_{A,\text{ground}} = \vec v_{A,B} + \vec v_{B,\text{ground}}$$

Two frames moving at constant velocity relative to each other are both **inertial**: they agree on accelerations and forces, though they disagree on velocities and positions.

In two dimensions, add the velocity vectors by components.
`,
    note: ["Subscript check", "Write subscripts so the inner ones match and cancel: v(A rel B) + v(B rel C) = v(A rel C)."],
    ex: ["Crossing a river", "A boat heads straight across a river at 4.0 m/s relative to the water; the current is 3.0 m/s. Find the boat's speed relative to the shore.", [R`The velocities are perpendicular.`, R`$$v = \sqrt{4.0^2 + 3.0^2} = 5.0$$ m/s.`], "5.0 m/s, angled downstream."],
  },
  {
    id: "vectors-and-motion-in-two-dimensions",
    obj: ["Resolve vectors into components and analyze projectile motion."],
    terms: [
      ["Components", "The projections of a vector on the x- and y-axes."],
      ["Projectile", "An object moving under gravity alone: constant horizontal velocity, constant vertical acceleration −g."],
    ],
    checks: [
      ["What is the vertical velocity of a projectile at its highest point?", "Zero (its horizontal velocity is unchanged)."],
      ["Which launch angle gives maximum range on level ground (no air resistance)?", "45°."],
    ],
    body: R`
Treat x and y motion independently; they share only time.

$$v_{0x} = v_0\cos\theta \qquad v_{0y} = v_0\sin\theta$$

For a projectile (no air resistance):

$$x = v_{0x}t \qquad y = v_{0y}t - \tfrac12 gt^2$$

On level ground: time of flight $$\frac{2v_0\sin\theta}{g}$$, range $$\frac{v_0^2\sin 2\theta}{g}$$.

Position vectors can also be given as functions, $$\vec r(t) = x(t)\hat i + y(t)\hat j$$; differentiate each component.
`,
    note: ["Same time, different motion", "A ball dropped and a ball thrown horizontally from the same height land at the same time: horizontal motion does not affect vertical motion."],
    ex: ["Horizontal launch", "A ball rolls off a 1.8 m table at 3.0 m/s. How far from the table does it land? (g = 9.8 m/s²)", [R`Fall time: $$1.8 = \tfrac12(9.8)t^2$$, so $$t = 0.61$$ s.`, R`$$x = 3.0 \times 0.61 = 1.8$$ m.`], "about 1.8 m."],
  },
  {
    id: "systems-and-center-of-mass",
    obj: ["Locate the center of mass of systems of particles and continuous objects."],
    terms: [["Center of mass", "The mass-weighted average position of a system; external forces accelerate it as if all mass were there."]],
    checks: [
      ["Where is the center of mass of a uniform rod?", "At its midpoint."],
      ["If no external force acts on a system, what happens to its center of mass velocity?", "It stays constant."],
    ],
    body: R`
$$x_{cm} = \frac{\sum m_i x_i}{\sum m_i} \qquad x_{cm} = \frac{1}{M}\int x\,dm$$

For a rod with linear density $$\lambda(x)$$: $$dm = \lambda\,dx$$ and $$M = \int \lambda\,dx$$.

Newton's second law for a system: $$\sum \vec F_{ext} = M\vec a_{cm}$$. Internal forces cancel in pairs, so they do not move the center of mass.
`,
    note: ["Defining the system", "Choose what is inside the system first. Forces between objects inside it are internal; everything else is external."],
    ex: ["Nonuniform rod", R`A rod from x = 0 to L has $$\lambda = kx$$. Find $$x_{cm}$$.`, [R`$$M = \int_0^L kx\,dx = \tfrac12 kL^2$$.`, R`$$\int x\,dm = \int_0^L kx^2\,dx = \tfrac13 kL^3$$.`, R`$$x_{cm} = \frac{kL^3/3}{kL^2/2} = \tfrac23 L$$.`], "two thirds of the way from the light end."],
  },
  {
    id: "forces-and-free-body-diagrams",
    obj: ["Draw free-body diagrams and identify the forces on an object."],
    terms: [
      ["Free-body diagram", "A diagram of one object showing every force exerted on it by other objects."],
      ["Normal force", "The perpendicular contact force a surface exerts on an object."],
    ],
    checks: [
      ["Should a free-body diagram show the force the object exerts on the floor?", "No; only forces exerted on the object."],
      ["Is the normal force always equal to mg?", "No; it depends on the other forces and the acceleration."],
    ],
    body: R`
A **free-body diagram** isolates one object and shows every force on it, each drawn from the object with its direction.

Common forces:

- weight $$mg$$, down;
- normal force $$F_N$$, perpendicular to the surface;
- tension $$F_T$$, along a string, away from the object;
- friction, parallel to the surface;
- spring force, toward the spring's equilibrium.

Choose axes aligned with the acceleration (often along an incline) and resolve forces into components.
`,
    note: ["No ma arrow", "Do not draw ma or a net-force arrow on a free-body diagram; it shows the individual forces only."],
    ex: ["Normal force on an incline", "A 4.0 kg block rests on a frictionless 30° incline. Find the normal force.", [R`Perpendicular to the incline: $$F_N = mg\cos 30°$$.`, R`$$F_N = 4.0(9.8)(0.866) = 34$$ N.`], "about 34 N."],
  },
  {
    id: "newtons-third-law",
    obj: ["Identify Newton's third-law force pairs."],
    terms: [["Third-law pair", "Two forces equal in magnitude and opposite in direction, exerted by two objects on each other, of the same type."]],
    checks: [
      ["A truck hits a fly. Which exerts the larger force?", "Neither; the forces are equal and opposite."],
      ["Are an object's weight and the normal force a third-law pair?", "No; they act on the same object and are different types."],
    ],
    body: R`
If object A exerts a force on B, then B exerts a force on A that is equal in magnitude and opposite in direction:

$$\vec F_{A\text{ on }B} = -\vec F_{B\text{ on }A}$$

The two forces act on **different** objects, so they never cancel in a single free-body diagram. They are always the same type (both gravitational, both contact, and so on).
`,
    note: ["Equal forces, unequal effects", "Equal forces give unequal accelerations when the masses differ: the fly accelerates far more than the truck."],
    ex: ["Pushing blocks", "You push block A (2 kg), which pushes block B (3 kg), with 10 N on a frictionless floor. What force does B exert on A?", [R`Both accelerate at $$10/5 = 2$$ m/s².`, R`Force on B: $$3 \times 2 = 6$$ N. By the third law, B pushes back on A with 6 N.`], "6 N, opposite to your push."],
  },
  {
    id: "newtons-first-law",
    obj: ["Apply Newton's first law and equilibrium conditions."],
    terms: [
      ["Inertia", "The tendency of an object to resist changes in its velocity."],
      ["Translational equilibrium", "The net force on an object is zero, so its velocity is constant."],
    ],
    checks: [
      ["Can an object moving at constant velocity have forces on it?", "Yes, as long as the net force is zero."],
      ["What is required for an object's velocity to change?", "A nonzero net force."],
    ],
    body: R`
An object's velocity stays constant (including at rest) unless a nonzero net external force acts on it. This is true only in **inertial reference frames**.

Equilibrium means $$\sum \vec F = 0$$, which requires $$\sum F_x = 0$$ and $$\sum F_y = 0$$ separately.

Example: a lamp hanging from two cables at angles. Set the horizontal components of tension equal and the vertical components equal to the weight.
`,
    note: ["Constant velocity is equilibrium", "A car cruising at constant speed in a straight line is in equilibrium: the engine's driving force balances friction and drag."],
    ex: ["Two cables", "A 10 kg sign hangs from two cables, each at 30° above the horizontal. Find the tension in each.", [R`Vertical: $$2T\sin 30° = mg = 98$$ N.`, R`$$T = 98$$ N.`], "98 N each."],
  },
  {
    id: "newtons-second-law",
    obj: ["Apply Newton's second law to single objects and connected systems."],
    terms: [["Newton's second law", "The net force on an object equals its mass times its acceleration."]],
    checks: [
      ["Two blocks connected by a string are pulled by a force F. How do you find their acceleration quickly?", "Treat them as one system: a = F divided by the total mass (ignoring friction)."],
      ["What is the tension in the string of a frictionless Atwood machine with masses m1 > m2?", "T = 2m1m2g/(m1 + m2)."],
    ],
    body: R`
$$\sum \vec F = m\vec a \qquad \text{or, more generally,} \qquad \sum \vec F = \frac{d\vec p}{dt}$$

## Strategy

1. Draw a free-body diagram for each object.
2. Choose axes along each object's acceleration.
3. Write $$\sum F = ma$$ for each, and use constraints (connected objects share acceleration magnitude).
4. Solve.

**Atwood machine**: $$a = \frac{(m_1 - m_2)g}{m_1 + m_2}$$.

When forces depend on time or velocity, the second law becomes a differential equation, such as $$m\frac{dv}{dt} = F(t)$$.
`,
    note: ["Systems shortcut", "Treating connected objects as one system gives acceleration directly; then use one object alone to find internal forces such as tension."],
    ex: ["Block and hanging mass", "A 3.0 kg block on a frictionless table is connected over a pulley to a hanging 1.0 kg mass. Find the acceleration.", [R`Net driving force: the hanging weight, $$1.0 \times 9.8 = 9.8$$ N.`, R`$$a = 9.8 / 4.0 = 2.45$$ m/s².`], "2.45 m/s²."],
  },
  {
    id: "gravitational-force",
    obj: ["Apply Newton's law of gravitation and relate g to planet mass and radius."],
    terms: [
      ["Universal gravitation", "F = Gm1m2/r², attractive, between any two masses."],
      ["Gravitational field", "Force per unit mass, g = GM/r² near a spherical body."],
    ],
    checks: [
      ["If the distance between two masses doubles, what happens to the force?", "It becomes one quarter as large."],
      ["What is g at a height equal to Earth's radius above the surface?", "One quarter of 9.8 m/s², about 2.45 m/s²."],
    ],
    body: R`
$$F_g = \frac{Gm_1m_2}{r^2} \qquad G = 6.67 \times 10^{-11}\ \text{N·m}^2/\text{kg}^2$$

The gravitational field of a spherical body of mass $$M$$ at distance $$r$$ from its center:

$$g = \frac{GM}{r^2}$$

Near Earth's surface, $$g \approx 9.8$$ m/s². Weight is $$mg$$; an object's mass does not change from place to place, but its weight does.

Inside a uniform solid sphere, $$g$$ increases linearly with $$r$$ from zero at the center.
`,
    note: ["Apparent weight", "A scale reads the normal force, not mg. In an elevator accelerating upward, the scale reads m(g + a)."],
    ex: ["Field on another planet", "A planet has twice Earth's mass and twice Earth's radius. What is g at its surface?", [R`$$g \propto M/r^2 = 2/4 = 1/2$$ of Earth's.`], "about 4.9 m/s²."],
  },
  {
    id: "kinetic-and-static-friction",
    obj: ["Apply models of static and kinetic friction."],
    terms: [
      ["Static friction", "Friction that prevents sliding; it adjusts up to a maximum of μsFN."],
      ["Kinetic friction", "Friction on a sliding object, μkFN, opposite the relative motion."],
    ],
    checks: [
      ["A box at rest is pushed with 10 N and does not move. What is the static friction force?", "10 N, opposite the push."],
      ["At what angle does a block begin to slide down an incline?", "When tan θ = μs."],
    ],
    body: R`
$$f_s \le \mu_s F_N \qquad f_k = \mu_k F_N$$

- Static friction takes whatever value (up to its maximum) keeps the surfaces from slipping.
- Kinetic friction has a fixed magnitude and opposes the relative motion.
- Usually $$\mu_k < \mu_s$$.

On an incline at angle $$\theta$$, a block slides at constant velocity when $$\tan\theta = \mu_k$$, and starts to slide when $$\tan\theta$$ exceeds $$\mu_s$$.
`,
    note: ["Not always mu times mg", "The friction force depends on the normal force, which changes when there are other vertical forces or an incline."],
    ex: ["Sliding down a ramp", "A block slides down a 30° incline with μk = 0.20. Find its acceleration.", [R`$$a = g(\sin 30° - \mu_k\cos 30°)$$.`, R`$$a = 9.8(0.500 - 0.173) = 3.2$$ m/s².`], "about 3.2 m/s² down the incline."],
  },
  {
    id: "spring-forces",
    obj: ["Apply Hooke's law to springs, including springs in series and parallel."],
    terms: [["Hooke's law", "F = −kΔx: an ideal spring exerts a restoring force proportional to its displacement from equilibrium."]],
    checks: [
      ["What is the spring constant of two identical springs (k) in parallel?", "2k."],
      ["In series?", "k/2."],
    ],
    body: R`
$$F_s = -k\Delta x$$

The negative sign shows the force points back toward equilibrium. The spring constant $$k$$ (N/m) measures stiffness: the slope of a force-versus-stretch graph.

| Arrangement | Equivalent constant |
| --- | --- |
| parallel | $$k_{eq} = k_1 + k_2$$ |
| series | $$\frac{1}{k_{eq}} = \frac{1}{k_1} + \frac{1}{k_2}$$ |

A mass hanging at rest on a spring stretches it by $$mg/k$$.
`,
    note: ["Measuring k", "Hang different masses, measure the stretch, and graph force against stretch. The slope of the best-fit line is k."],
    ex: ["Hanging mass", "A 0.50 kg mass stretches a spring 0.12 m at equilibrium. Find k.", [R`$$k = mg/x = (0.50)(9.8)/0.12$$.`], "about 41 N/m."],
  },
  {
    id: "resistive-forces",
    obj: ["Model velocity-dependent resistive forces and find terminal velocity using differential equations."],
    terms: [
      ["Resistive force", "A drag force opposite the velocity, often modeled as −bv."],
      ["Terminal velocity", "The constant velocity reached when the drag force balances the other forces."],
    ],
    checks: [
      ["For drag F = −bv on a falling object, what is the terminal speed?", "v_T = mg/b."],
      ["How long until the object reaches about 63 percent of terminal speed?", "One time constant, m/b."],
    ],
    body: R`
For a falling object with drag $$-bv$$:

$$m\frac{dv}{dt} = mg - bv$$

Separating variables and integrating with $$v(0) = 0$$:

$$v(t) = \frac{mg}{b}\left(1 - e^{-bt/m}\right)$$

The **terminal velocity** is $$v_T = \frac{mg}{b}$$ and the time constant is $$\tau = \frac{m}{b}$$. Acceleration starts at $$g$$ and decays exponentially to zero.

For an object slowed only by drag (horizontal motion), $$v = v_0e^{-bt/m}$$.
`,
    note: ["Terminal velocity without solving", "At terminal velocity the acceleration is zero, so set the net force to zero: mg = bv."],
    ex: ["Terminal speed", "A 0.20 kg object falls with drag force bv, b = 0.050 kg/s. Find v_T and τ.", [R`$$v_T = (0.20)(9.8)/0.050 = 39$$ m/s.`, R`$$\tau = 0.20/0.050 = 4.0$$ s.`], "39 m/s and 4.0 s."],
  },
  {
    id: "circular-motion",
    obj: ["Apply Newton's second law to uniform and nonuniform circular motion."],
    terms: [
      ["Centripetal acceleration", "a = v²/r, directed toward the center of the circle."],
      ["Tangential acceleration", "The rate of change of speed, along the direction of motion."],
    ],
    checks: [
      ["Is centripetal force a new kind of force?", "No; it is the net inward component of real forces such as tension, gravity or friction."],
      ["What is the minimum speed at the top of a vertical circle of radius r on a string?", "√(gr)."],
    ],
    body: R`
An object moving in a circle at speed $$v$$ accelerates toward the center:

$$a_c = \frac{v^2}{r} = \omega^2 r \qquad \sum F_{\text{in}} = \frac{mv^2}{r}$$

If speed changes, there is also a tangential acceleration $$a_t = dv/dt$$, and the total acceleration is $$\sqrt{a_c^2 + a_t^2}$$.

## Examples

- Car on a flat curve: friction provides the inward force, $$v_{max} = \sqrt{\mu_s g r}$$.
- Banked curve without friction: $$\tan\theta = \frac{v^2}{rg}$$.
- Vertical circle: at the top, $$F_T + mg = mv^2/r$$.
`,
    note: ["Period", "For uniform circular motion, v = 2πr/T."],
    ex: ["Flat curve", "A car rounds a flat curve of radius 50 m. If μs = 0.80, find the maximum speed.", [R`$$\mu_s mg = mv^2/r$$.`, R`$$v = \sqrt{0.80 \times 9.8 \times 50} = 19.8$$ m/s.`], "about 20 m/s."],
  },
];
