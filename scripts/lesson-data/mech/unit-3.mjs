/* AP Physics C: Mechanics, Units 3–4. */
const R = String.raw;
export const lessons = [
  {
    id: "translational-kinetic-energy",
    obj: ["Calculate translational kinetic energy and relate it to the work done on an object."],
    terms: [["Kinetic energy", "The energy of motion, K = ½mv²; a scalar that is never negative."]],
    checks: [
      ["If an object's speed triples, by what factor does its kinetic energy change?", "9."],
      ["Does kinetic energy depend on direction of motion?", "No; it is a scalar."],
    ],
    body: R`
$$K = \tfrac12 mv^2$$

Kinetic energy depends on the square of the speed, so doubling speed quadruples $$K$$. It is a scalar, measured in joules.

The **work–energy theorem** links force and kinetic energy:

$$W_{net} = \Delta K$$

Kinetic energy also depends on the reference frame, since velocity does.
`,
    note: ["Momentum and kinetic energy", "K = p²/(2m). Two objects with equal momentum have kinetic energies inversely proportional to their masses."],
    ex: ["Stopping distance", "A car's speed doubles. By what factor does its braking distance change (same braking force)?", [R`Work by friction equals the kinetic energy: $$fd = \tfrac12 mv^2$$.`, R`$$d \propto v^2$$.`], "it increases by a factor of 4."],
  },
  {
    id: "work",
    obj: ["Calculate work done by constant and variable forces, including from force–position graphs."],
    terms: [
      ["Work", "W = ∫F·dr: the energy transferred to a system by a force acting through a displacement."],
      ["Work–energy theorem", "The net work on an object equals its change in kinetic energy."],
    ],
    checks: [
      ["What work does a centripetal force do in uniform circular motion?", "Zero, because the force is perpendicular to the displacement."],
      ["How is work found from a force–position graph?", "The area under the curve."],
    ],
    body: R`
$$W = \int_{x_1}^{x_2} F(x)\,dx \qquad W = Fd\cos\theta\ \text{(constant force)}$$

Work is positive when the force has a component along the displacement, negative when opposite, and zero when perpendicular.

**Variable force**: integrate, or find the area under an F–x graph. Stretching a spring from 0 to $$x$$ takes $$W = \tfrac12 kx^2$$.

**Work–energy theorem**: $$W_{net} = \Delta K$$.
`,
    note: ["Sign of friction work", "Kinetic friction does negative work on a sliding object, converting mechanical energy into internal (thermal) energy."],
    ex: ["Variable force", R`A force $$F(x) = 3x^2$$ N acts on an object from x = 1 m to x = 3 m. Find the work.`, [R`$$W = \int_1^3 3x^2\,dx = [x^3]_1^3$$.`, R`$$27 - 1 = 26$$ J.`], "26 J."],
  },
  {
    id: "potential-energy",
    obj: ["Relate conservative forces to potential energy using F = −dU/dx."],
    terms: [
      ["Conservative force", "A force whose work does not depend on the path, such as gravity or a spring force."],
      ["Potential energy", "Energy of a system due to the configuration of interacting objects."],
    ],
    checks: [
      ["What is the force for U(x) = 4x²?", "F = −8x."],
      ["What is the gravitational potential energy of two masses separated by r?", "U = −Gm1m2/r."],
    ],
    body: R`
For a conservative force:

$$\Delta U = -\int F\,dx \qquad F = -\frac{dU}{dx}$$

| System | Potential energy |
| --- | --- |
| object near Earth's surface | $$U = mgh$$ |
| spring | $$U = \tfrac12 kx^2$$ |
| two masses (general) | $$U = -\frac{Gm_1m_2}{r}$$ |

On a U(x) graph, the force points downhill. Minima are stable equilibria; maxima are unstable equilibria.
`,
    note: ["Zero is a choice", "Only changes in potential energy matter. For gravitation, U = 0 is chosen at infinite separation, which makes U negative."],
    ex: ["Force from potential", R`$$U(x) = 2x^3 - 6x$$ J. Find the equilibrium positions.`, [R`$$F = -\frac{dU}{dx} = -(6x^2 - 6)$$.`, R`$$F = 0$$ when $$x = \pm 1$$ m.`], "x = 1 m (stable, a minimum of U) and x = −1 m (unstable)."],
  },
  {
    id: "conservation-of-energy",
    obj: ["Apply conservation of energy, including systems with nonconservative forces."],
    terms: [["Mechanical energy", "The sum of kinetic and potential energy of a system."]],
    checks: [
      ["When is mechanical energy conserved?", "When only conservative forces do work on the system."],
      ["Where does mechanical energy go when friction acts?", "Into internal (thermal) energy."],
    ],
    body: R`
$$K_i + U_i + W_{nc} = K_f + U_f$$

If only conservative forces do work, $$W_{nc} = 0$$ and mechanical energy is constant.

## Typical problems

- Speed at the bottom of a frictionless slope: $$v = \sqrt{2gh}$$, independent of the slope's shape.
- Spring launching a block: $$\tfrac12 kx^2 = \tfrac12 mv^2$$.
- Escape speed: $$\tfrac12 mv^2 - \frac{GMm}{R} = 0$$, so $$v = \sqrt{2GM/R}$$.
- Friction: $$W_{nc} = -f_k d$$.
`,
    note: ["Energy or forces?", "Use energy when the question asks about speeds and positions. Use forces and kinematics when it asks about time or acceleration."],
    ex: ["Spring and friction", "A spring (k = 200 N/m) compressed 0.10 m launches a 0.50 kg block across a floor with μk = 0.25. How far does the block slide after leaving the spring?", [R`Spring energy: $$\tfrac12(200)(0.10)^2 = 1.0$$ J.`, R`Friction: $$0.25(0.50)(9.8) = 1.225$$ N.`, R`$$d = 1.0/1.225 = 0.82$$ m.`], "about 0.82 m (ignoring friction while in contact with the spring)."],
  },
  {
    id: "power",
    obj: ["Calculate average and instantaneous power."],
    terms: [["Power", "The rate at which work is done or energy is transferred: P = dW/dt = F·v."]],
    checks: [
      ["What is the unit of power?", "The watt, one joule per second."],
      ["A 500 N force moves a car at 20 m/s. What power does it deliver?", "10,000 W."],
    ],
    body: R`
$$P_{avg} = \frac{\Delta E}{\Delta t} \qquad P = \frac{dW}{dt} = \vec F \cdot \vec v$$

A motor lifting a load at constant speed delivers $$P = mgv$$. A car at constant speed delivers power equal to the drag force times its speed.

Energy can be found from power by integration: $$W = \int P\,dt$$.
`,
    note: ["Area under a P–t graph", "The area under a power–time graph is the energy transferred."],
    ex: ["Lifting", "A motor lifts a 200 kg load 15 m in 12 s at constant speed. Find the power.", [R`$$W = mgh = 200(9.8)(15) = 29{,}400$$ J.`, R`$$P = 29{,}400/12 = 2450$$ W.`], "about 2.5 kW."],
  },
  {
    id: "linear-momentum",
    obj: ["Calculate momentum and relate it to the velocity of a system's center of mass."],
    terms: [["Momentum", "p = mv, a vector in the direction of the velocity."]],
    checks: [
      ["What is the momentum of a system in terms of its center of mass?", "p = Mv_cm."],
      ["Can an object have kinetic energy but no momentum?", "No (a single object); but a system can have zero total momentum and nonzero kinetic energy."],
    ],
    body: R`
$$\vec p = m\vec v \qquad \vec p_{sys} = \sum m_i\vec v_i = M\vec v_{cm}$$

Momentum is a vector: in two dimensions, track x and y components separately.

Newton's second law in its general form: $$\sum \vec F = \frac{d\vec p}{dt}$$.
`,
    note: ["Exploding objects", "A system at rest that explodes still has zero total momentum: the pieces fly apart with momenta that add to zero."],
    ex: ["System momentum", "A 2.0 kg cart moves at +3.0 m/s and a 1.0 kg cart at −4.0 m/s. Find the velocity of the center of mass.", [R`$$p = 6.0 - 4.0 = 2.0$$ kg·m/s.`, R`$$v_{cm} = 2.0/3.0 = 0.67$$ m/s.`], "+0.67 m/s."],
  },
  {
    id: "change-in-momentum-and-impulse",
    obj: ["Relate impulse to change in momentum, including from force–time graphs and integrals."],
    terms: [["Impulse", "J = ∫F dt, equal to the change in momentum."]],
    checks: [
      ["Why do airbags reduce injury?", "They extend the stopping time, reducing the force for the same change in momentum."],
      ["How is impulse found from a force–time graph?", "The area under the curve."],
    ],
    body: R`
$$\vec J = \int \vec F\,dt = \Delta\vec p$$

For a constant force, $$J = F\Delta t$$. The same change in momentum over a longer time requires a smaller average force.

A ball bouncing back reverses direction, so $$\Delta p = m(v_f - v_i)$$ includes both speeds: bouncing transfers more impulse than stopping.
`,
    note: ["Watch the signs", "A ball hitting a wall at +8 m/s and rebounding at −6 m/s has Δv = −14 m/s, not −2 m/s."],
    ex: ["Variable force", R`A force $$F(t) = 12t^2$$ N acts on a 2.0 kg object at rest from t = 0 to t = 2 s. Find its final speed.`, [R`$$J = \int_0^2 12t^2\,dt = 4t^3\big|_0^2 = 32$$ N·s.`, R`$$v = 32/2.0 = 16$$ m/s.`], "16 m/s."],
  },
  {
    id: "conservation-of-linear-momentum",
    obj: ["Apply conservation of momentum to systems with no net external force."],
    terms: [["Isolated system", "A system with no net external force, so its total momentum is constant."]],
    checks: [
      ["When is momentum conserved?", "When the net external force on the system is zero (or negligible during a brief collision)."],
      ["Is momentum conserved in a direction with no external force even if other directions have one?", "Yes, component by component."],
    ],
    body: R`
If $$\sum \vec F_{ext} = 0$$:

$$\sum m_i\vec v_{i,\text{before}} = \sum m_i\vec v_{i,\text{after}}$$

During short collisions, internal forces are much larger than external ones, so momentum is approximately conserved even with friction or gravity present.

Recoil: a gun of mass $$M$$ firing a bullet of mass $$m$$ at $$v$$ recoils at $$mv/M$$.
`,
    note: ["Center of mass", "With no external force, the center of mass velocity never changes, whatever happens inside the system."],
    ex: ["Recoil", "A 60 kg skater at rest throws a 3.0 kg ball forward at 10 m/s. Find the skater's velocity.", [R`$$0 = 60v + 3.0(10)$$.`, R`$$v = -0.50$$ m/s.`], "0.50 m/s backward."],
  },
  {
    id: "elastic-and-inelastic-collisions",
    obj: ["Analyze elastic, inelastic and perfectly inelastic collisions in one and two dimensions."],
    terms: [
      ["Elastic collision", "A collision in which kinetic energy is conserved."],
      ["Perfectly inelastic collision", "The objects stick together; kinetic energy loss is maximum."],
    ],
    checks: [
      ["Is momentum conserved in an inelastic collision?", "Yes, if the system is isolated; only kinetic energy is not."],
      ["In a 1-D elastic collision of equal masses with one at rest, what happens?", "They exchange velocities."],
    ],
    body: R`
All isolated collisions conserve momentum.

| Type | Kinetic energy |
| --- | --- |
| elastic | conserved |
| inelastic | decreases |
| perfectly inelastic (stick together) | maximum decrease |

Perfectly inelastic: $$v_f = \frac{m_1v_1 + m_2v_2}{m_1 + m_2}$$.

For a 1-D elastic collision, the relative velocity reverses: $$v_1 - v_2 = -(v_1' - v_2')$$.

In two dimensions, conserve momentum separately in x and y.
`,
    note: ["Ballistic pendulum", "Use momentum for the collision (bullet embeds in block), then energy for the swing up. Energy is not conserved during the collision itself."],
    ex: ["Kinetic energy lost", "A 2.0 kg cart at 6.0 m/s hits and sticks to a 1.0 kg cart at rest. Find the kinetic energy lost.", [R`$$v_f = 12/3.0 = 4.0$$ m/s.`, R`$$K_i = 36$$ J; $$K_f = \tfrac12(3.0)(16) = 24$$ J.`], "12 J."],
  },
];
