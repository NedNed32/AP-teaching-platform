/*
 * AP Physics C free-response templates, one per question type on the real exam:
 * Mathematical Routines (MR), Translation Between Representations (TBR),
 * Experimental Design and Analysis (LAB) and Qualitative/Quantitative Translation (QQT).
 * Numbers are randomized; rubric answers are computed from them.
 */
import { deg, G, K, num } from "./phys-lib";
import { Retry, type FrqTemplate } from "./types";

const t = String.raw;
const n = (x: number) => num(x);
const base = { calc: true, minutes: 25 } as const;

/* ---------------- Mechanics ---------------- */

export const mechMR: FrqTemplate = {
  ...base,
  key: "frq-mech-incline-pulley",
  topics: ["newtons-second-law", "kinetic-and-static-friction", "work", "conservation-of-energy"],
  skills: ["1", "2"],
  difficulty: 3,
  format: "mr",
  gen(r) {
    const m1 = r.int(2, 6);
    const m2 = r.int(2, 8);
    const th = r.pick([20, 30, 37]);
    const mu = r.pick([0.1, 0.15, 0.2, 0.25]);
    const d = r.int(1, 4) / 2;
    const a = ((m2 - m1 * Math.sin(deg(th)) - mu * m1 * Math.cos(deg(th))) * G) / (m1 + m2);
    if (a <= 0.3) throw new Retry();
    const T = m2 * (G - a);
    const v = Math.sqrt(2 * a * d);
    const Wf = mu * m1 * G * Math.cos(deg(th)) * d;
    return {
      title: "Block on an incline with a hanging mass",
      stimulus: { text: `A block of mass ${m1} kg on a ${th}° incline is connected by a light string over a light, frictionless pulley at the top of the incline to a hanging block of mass ${m2} kg. The coefficient of kinetic friction between the block and the incline is ${mu}. The system is released from rest, and the hanging block descends.` },
      parts: [
        { prompt: `Draw (describe) a free-body diagram for the ${m1} kg block, labeling each force.`, rubric: [
          { criterion: "Weight down, normal force perpendicular to the incline, tension up the incline.", example: "mg, F_N, F_T" },
          { criterion: "Kinetic friction down the incline (opposite the motion).", example: "f_k pointing down the slope" },
        ] },
        { prompt: "Derive an expression for the acceleration of the system in terms of the masses, θ, μ and g, then calculate its value.", rubric: [
          { criterion: "Newton's second law applied to each block (or the system).", example: t`$$m_2g - T = m_2a$$, $$T - m_1g\sin\theta - \mu m_1g\cos\theta = m_1a$$` },
          { criterion: "Correct expression.", example: t`$$a = \frac{(m_2 - m_1\sin\theta - \mu m_1\cos\theta)g}{m_1 + m_2}$$` },
          { criterion: "Correct value.", example: `${n(a)} m/s²` },
        ] },
        { prompt: "Calculate the tension in the string.", rubric: [{ criterion: "Correct value.", example: `T = m₂(g − a) = ${n(T)} N` }] },
        { prompt: `Calculate the speed of the blocks after the hanging block has descended ${d} m, and the work done by friction on the incline block during that motion.`, rubric: [
          { criterion: "Speed from kinematics or energy.", example: `v = √(2ad) = ${n(v)} m/s` },
          { criterion: "Work by friction, with a negative sign.", example: `W_f = −μm₁g cos θ·d = −${n(Wf)} J` },
        ] },
      ],
    };
  },
};

export const mechTBR: FrqTemplate = {
  ...base,
  key: "frq-mech-shm-representations",
  topics: ["representing-and-analyzing-shm", "energy-of-simple-harmonic-oscillators", "frequency-and-period-of-shm"],
  skills: ["1", "2"],
  difficulty: 3,
  format: "tbr",
  gen(r) {
    const A = r.int(5, 20) / 100;
    const w = r.int(2, 12);
    const mass = r.int(2, 20) / 10;
    const k = mass * w * w;
    const T = (2 * Math.PI) / w;
    const E = 0.5 * k * A * A;
    return {
      title: "A mass on a spring",
      stimulus: { text: t`A block of mass ${mass} kg on a horizontal frictionless surface is attached to a spring. Its position is $$x(t) = ${A}\cos(${w}t)$$, with x in meters and t in seconds.` },
      parts: [
        { prompt: "Sketch (describe) graphs of position, velocity and acceleration versus time for one period, aligned vertically.", rubric: [
          { criterion: "Position is a cosine starting at +A; velocity is a negative sine starting at 0.", example: `x starts at ${A} m; v starts at 0 and goes negative.` },
          { criterion: "Acceleration starts at its negative maximum and is opposite in sign to position throughout.", example: t`$$a = -\omega^2 x$$` },
        ] },
        { prompt: "Derive expressions for v(t) and a(t), and determine the maximum speed and maximum acceleration.", rubric: [
          { criterion: "Correct derivatives.", example: t`$$v = -${n(A * w)}\sin(${w}t)$$, $$a = -${n(A * w * w)}\cos(${w}t)$$` },
          { criterion: "Correct maxima.", example: `v_max = ${n(A * w)} m/s; a_max = ${n(A * w * w)} m/s²` },
        ] },
        { prompt: "Calculate the spring constant and the period.", rubric: [
          { criterion: "Spring constant.", example: `k = mω² = ${n(k)} N/m` },
          { criterion: "Period.", example: `T = 2π/ω = ${n(T)} s` },
        ] },
        { prompt: "Calculate the total mechanical energy and describe how kinetic and potential energy vary during one period.", rubric: [
          { criterion: "Total energy.", example: `E = ½kA² = ${n(E)} J` },
          { criterion: "Energy exchange.", example: "K is maximum at x = 0 and zero at x = ±A; U is the reverse; the sum is constant. Each varies twice per period." },
        ] },
      ],
    };
  },
};

export const mechLAB: FrqTemplate = {
  ...base,
  key: "frq-mech-pendulum-lab",
  topics: ["simple-and-physical-pendulums", "frequency-and-period-of-shm"],
  skills: ["1", "2", "3"],
  difficulty: 3,
  format: "lab",
  gen(r) {
    const gTrue = r.pick([9.6, 9.7, 9.8, 9.9]);
    const Ls = [0.2, 0.4, 0.6, 0.8, 1.0];
    const Ts = Ls.map((L) => Number((2 * Math.PI * Math.sqrt(L / gTrue) * (1 + (r.next() - 0.5) * 0.02)).toFixed(2)));
    const T2 = Ts.map((x) => x * x);
    const mx = Ls.reduce((a, b) => a + b, 0) / Ls.length;
    const my = T2.reduce((a, b) => a + b, 0) / T2.length;
    const slope = Ls.reduce((s, L, i) => s + (L - mx) * (T2[i]! - my), 0) / Ls.reduce((s, L) => s + (L - mx) ** 2, 0);
    const gExp = (4 * Math.PI * Math.PI) / slope;
    return {
      title: "Measuring g with a pendulum",
      stimulus: {
        text: "Students measure the period of a simple pendulum for several string lengths, using small amplitudes.",
        table: { caption: "Pendulum data", columns: [{ key: "len", label: "Length L (m)" }, { key: "period", label: "Period T (s)" }], rows: Ls.map((L, i) => ({ len: L, period: Ts[i]! })) },
      },
      parts: [
        { prompt: "Describe a procedure the students could use to measure the period accurately, including how to reduce uncertainty.", rubric: [
          { criterion: "Time many oscillations and divide.", example: "Time 10 swings with a stopwatch and divide by 10." },
          { criterion: "Keep the amplitude small and repeat trials.", example: "Release from under about 10° and average several trials." },
        ] },
        { prompt: "Identify quantities to graph that would give a straight line, and explain how g can be found from the graph.", rubric: [
          { criterion: "Graph T² versus L.", example: t`$$T^2 = \frac{4\pi^2}{g}L$$` },
          { criterion: "g from the slope.", example: "g = 4π²/slope" },
        ] },
        { prompt: "Plot (describe) the linearized data and draw a best-fit line. Use it to calculate an experimental value of g.", rubric: [
          { criterion: "T² values computed and plotted.", example: T2.map((x) => x.toFixed(2)).join(", ") + " s²" },
          { criterion: "Slope of the best-fit line.", example: `about ${n(slope)} s²/m` },
          { criterion: "Experimental g.", example: `g = 4π²/${n(slope)} ≈ ${n(gExp)} m/s²` },
        ] },
        { prompt: "The students repeat the experiment with a much larger amplitude. Predict how the measured periods would change and explain.", rubric: [{ criterion: "Periods increase slightly; the small-angle approximation (sin θ ≈ θ) no longer holds.", example: "The restoring torque is less than proportional to θ at large angles." }] },
      ],
    };
  },
};

const ROLLERS: [string, number, string][] = [["hoop", 1, "MR²"], ["solid cylinder", 0.5, "½MR²"], ["solid sphere", 0.4, "⅖MR²"]];

export const mechQQT: FrqTemplate = {
  ...base,
  key: "frq-mech-rolling-race",
  topics: ["rolling", "rotational-kinetic-energy", "conservation-of-energy"],
  skills: ["2", "3"],
  difficulty: 3,
  format: "qqt",
  gen(r) {
    const [a, b] = r.sample(ROLLERS, 2) as [[string, number, string], [string, number, string]];
    const h = r.int(5, 30) / 10;
    const va = Math.sqrt((2 * G * h) / (1 + a[1]));
    const vb = Math.sqrt((2 * G * h) / (1 + b[1]));
    const faster = va > vb ? a : b;
    return {
      title: "A rolling race",
      stimulus: { text: `A ${a[0]} (I = ${a[2]}) and a ${b[0]} (I = ${b[2]}) of equal mass M and radius R are released from rest at the top of the same ramp of height ${h} m. Both roll without slipping.` },
      parts: [
        { prompt: "Without calculating, predict which object reaches the bottom first. Justify your prediction using energy.", rubric: [
          { criterion: `The ${faster[0]} arrives first.`, example: "It has the smaller rotational inertia per MR²." },
          { criterion: "Justification: less of its energy goes into rotation, so more is translational kinetic energy.", example: "Both convert the same mgh." },
        ] },
        { prompt: "Derive an expression for the speed at the bottom of an object with rotational inertia βMR², in terms of g, h and β.", rubric: [
          { criterion: "Energy conservation including both forms of kinetic energy, with v = Rω.", example: t`$$Mgh = \tfrac12 Mv^2 + \tfrac12\beta MR^2\left(\frac{v}{R}\right)^2$$` },
          { criterion: "Correct result.", example: t`$$v = \sqrt{\frac{2gh}{1 + \beta}}$$` },
        ] },
        { prompt: "Calculate the speed of each object at the bottom.", rubric: [{ criterion: "Both speeds correct.", example: `${a[0]}: ${n(va)} m/s; ${b[0]}: ${n(vb)} m/s` }] },
        { prompt: "Explain whether your derived expression is consistent with your prediction in part (a), and why neither speed depends on M or R.", rubric: [
          { criterion: "Smaller β gives larger v, consistent with the prediction.", example: `β = ${n(faster[1])} for the ${faster[0]}.` },
          { criterion: "M and R cancel in the energy equation.", example: "Only the shape factor β matters." },
        ] },
      ],
    };
  },
};

/* ---------------- Electricity and magnetism ---------------- */

export const emMR: FrqTemplate = {
  ...base,
  key: "frq-em-gauss-sphere",
  topics: ["gausss-law", "electric-potential-of-charge-distributions", "electric-potential"],
  skills: ["1", "2"],
  difficulty: 4,
  format: "mr",
  gen(r) {
    const Q = r.int(1, 9);
    const R = r.int(5, 20) / 100;
    const ri = Number((R / 2).toFixed(3));
    const ro = Number((2 * R).toFixed(3));
    const Qc = Q * 1e-9;
    const Ein = (K * Qc * ri) / R ** 3;
    const Eout = (K * Qc) / (ro * ro);
    const Vs = (K * Qc) / R;
    const V0 = (3 * K * Qc) / (2 * R);
    return {
      title: "A uniformly charged insulating sphere",
      stimulus: { text: `A solid insulating sphere of radius R = ${R} m has a total charge Q = +${Q} nC distributed uniformly throughout its volume.` },
      parts: [
        { prompt: "Using Gauss's law, derive expressions for the electric field magnitude inside (r < R) and outside (r > R) the sphere.", rubric: [
          { criterion: "Spherical Gaussian surface; enclosed charge inside is Q(r/R)³.", example: t`$$E(4\pi r^2) = \frac{Q r^3}{\varepsilon_0 R^3}$$` },
          { criterion: "Correct inside expression.", example: t`$$E = \frac{Qr}{4\pi\varepsilon_0 R^3}$$` },
          { criterion: "Correct outside expression.", example: t`$$E = \frac{Q}{4\pi\varepsilon_0 r^2}$$` },
        ] },
        { prompt: `Calculate the field magnitude at r = ${ri} m and at r = ${ro} m.`, rubric: [{ criterion: "Both values correct.", example: `${n(Ein)} N/C and ${n(Eout)} N/C` }] },
        { prompt: "Sketch (describe) a graph of E versus r from 0 to 3R.", rubric: [{ criterion: "Linear increase from 0 to a maximum at R, then 1/r² decrease.", example: `Peak value kQ/R² = ${n((K * Qc) / (R * R))} N/C at r = R.` }] },
        { prompt: "Calculate the electric potential at the surface and at the center (V = 0 at infinity).", rubric: [
          { criterion: "Surface potential.", example: `V(R) = kQ/R = ${n(Vs)} V` },
          { criterion: "Center potential by integrating the inside field.", example: t`$$V(0) = \frac{3kQ}{2R}$$ = ${n(V0)} V` },
        ] },
      ],
    };
  },
};

export const emTBR: FrqTemplate = {
  ...base,
  key: "frq-em-rc-representations",
  topics: ["resistor-capacitor-rc-circuits", "capacitors"],
  skills: ["1", "2"],
  difficulty: 3,
  format: "tbr",
  gen(r) {
    const emf = r.int(6, 24);
    const Rk = r.int(1, 20) * 10;
    const C = r.int(1, 20);
    const tau = Rk * 1e3 * C * 1e-6;
    const I0 = emf / (Rk * 1e3);
    const Q = C * 1e-6 * emf;
    const U = 0.5 * C * 1e-6 * emf * emf;
    return {
      title: "Charging a capacitor",
      stimulus: { text: `An initially uncharged ${C} µF capacitor, a ${Rk} kΩ resistor, an ideal ${emf} V battery and an open switch are connected in series. The switch is closed at t = 0.` },
      parts: [
        { prompt: "Write the loop equation for the circuit and solve it to find q(t).", rubric: [
          { criterion: "Correct differential equation.", example: t`$$\varepsilon - R\frac{dq}{dt} - \frac{q}{C} = 0$$` },
          { criterion: "Correct solution.", example: t`$$q(t) = C\varepsilon\left(1 - e^{-t/RC}\right)$$` },
        ] },
        { prompt: "Calculate the time constant, the initial current and the final charge on the capacitor.", rubric: [
          { criterion: "Time constant.", example: `τ = RC = ${n(tau)} s` },
          { criterion: "Initial current.", example: `I₀ = ε/R = ${n(I0)} A` },
          { criterion: "Final charge.", example: `Q = Cε = ${n(Q)} C` },
        ] },
        { prompt: "Sketch (describe) graphs of the capacitor's voltage and the current versus time.", rubric: [
          { criterion: "Capacitor voltage rises from 0 toward ε, concave down.", example: `Approaches ${emf} V.` },
          { criterion: "Current decays exponentially from I₀ toward 0.", example: `About 37% of I₀ at t = τ.` },
        ] },
        { prompt: "Calculate the energy stored in the capacitor after a long time, and compare it with the energy supplied by the battery.", rubric: [
          { criterion: "Stored energy.", example: `U = ½Cε² = ${n(U)} J` },
          { criterion: "The battery supplies Qε, twice as much; half is dissipated in the resistor.", example: `${n(Q * emf)} J supplied` },
        ] },
      ],
    };
  },
};

export const emLAB: FrqTemplate = {
  ...base,
  key: "frq-em-resistivity-lab",
  topics: ["resistance-resistivity-and-ohms-law", "simple-circuits"],
  skills: ["1", "2", "3"],
  difficulty: 3,
  format: "lab",
  gen(r) {
    const rho = r.pick([1.1e-6, 4.9e-7, 1.0e-6, 5.0e-7]);
    const dmm = r.pick([0.3, 0.4, 0.5]);
    const A = Math.PI * ((dmm / 1000) / 2) ** 2;
    const Ls = [0.2, 0.4, 0.6, 0.8, 1.0];
    const Rs = Ls.map((L) => Number(((rho * L) / A * (1 + (r.next() - 0.5) * 0.04)).toFixed(2)));
    const mx = 0.6;
    const my = Rs.reduce((a, b) => a + b, 0) / 5;
    const slope = Ls.reduce((s, L, i) => s + (L - mx) * (Rs[i]! - my), 0) / Ls.reduce((s, L) => s + (L - mx) ** 2, 0);
    const rhoExp = slope * A;
    return {
      title: "Measuring resistivity",
      stimulus: {
        text: `Students measure the resistance of different lengths of a wire with a diameter of ${dmm} mm, using a battery, an ammeter and a voltmeter.`,
        table: { caption: "Resistance versus length", columns: [{ key: "len", label: "Length L (m)" }, { key: "res", label: "Resistance R (Ω)" }], rows: Ls.map((L, i) => ({ len: L, res: Rs[i]! })) },
      },
      parts: [
        { prompt: "Describe (draw) how the ammeter and voltmeter should be connected, and how R is determined.", rubric: [
          { criterion: "Ammeter in series with the wire; voltmeter in parallel across it.", example: "R = V/I for each length." },
          { criterion: "Keep the current small or brief so the wire does not heat up.", example: "Heating would change the resistivity." },
        ] },
        { prompt: "Plot (describe) R versus L and draw a best-fit line. Calculate its slope.", rubric: [
          { criterion: "Linear relationship through (near) the origin.", example: "R ∝ L" },
          { criterion: "Slope.", example: `about ${n(slope)} Ω/m` },
        ] },
        { prompt: "Use the slope to calculate the resistivity of the wire.", rubric: [
          { criterion: "Uses slope = ρ/A with A = π(d/2)².", example: `A = ${n(A)} m²` },
          { criterion: "Correct resistivity.", example: `ρ ≈ ${n(rhoExp)} Ω·m` },
        ] },
        { prompt: "The students then use a wire of the same material with twice the diameter. Predict the new slope of R versus L and explain.", rubric: [{ criterion: "The slope becomes one quarter as large because the area quadruples.", example: `about ${n(slope / 4)} Ω/m` }] },
      ],
    };
  },
};

export const emQQT: FrqTemplate = {
  ...base,
  key: "frq-em-sliding-rod",
  topics: ["induced-currents-and-magnetic-forces", "faradays-and-lenzs-laws"],
  skills: ["2", "3"],
  difficulty: 4,
  format: "qqt",
  gen(r) {
    const B = r.int(2, 10) / 10;
    const L = r.int(2, 10) / 10;
    const R = r.int(1, 10);
    const mass = r.int(1, 10) / 10;
    const v0 = r.int(2, 10);
    const tau = (mass * R) / (B * B * L * L);
    const I0 = (B * L * v0) / R;
    return {
      title: "A sliding rod in a magnetic field",
      stimulus: { text: `A conducting rod of mass ${mass} kg and length ${L} m slides without friction on horizontal rails connected by a ${R} Ω resistor. A uniform ${B} T magnetic field points vertically through the rails. The rod is given an initial speed of ${v0} m/s and then released.` },
      parts: [
        { prompt: "Describe qualitatively how the rod's speed changes after it is released, and explain using Lenz's law.", rubric: [
          { criterion: "The rod slows down, approaching zero.", example: "Its speed decreases ever more slowly." },
          { criterion: "The induced current produces a magnetic force opposing the motion (Lenz's law).", example: "The force opposes the change in flux." },
        ] },
        { prompt: "Derive an expression for the magnetic force on the rod in terms of B, L, v and R.", rubric: [
          { criterion: "Uses ε = BLv and I = ε/R.", example: t`$$I = \frac{BLv}{R}$$` },
          { criterion: "Correct force.", example: t`$$F = ILB = \frac{B^2L^2v}{R}$$` },
        ] },
        { prompt: "Write and solve a differential equation for v(t).", rubric: [
          { criterion: "Newton's second law.", example: t`$$m\frac{dv}{dt} = -\frac{B^2L^2}{R}v$$` },
          { criterion: "Exponential solution.", example: t`$$v = v_0e^{-t/\tau}$$, $$\tau = \frac{mR}{B^2L^2}$$ = ${n(tau)} s` },
        ] },
        { prompt: "Calculate the initial current, and explain where the rod's initial kinetic energy ends up.", rubric: [
          { criterion: "Initial current.", example: `I₀ = BLv₀/R = ${n(I0)} A` },
          { criterion: "All of the kinetic energy is dissipated as thermal energy in the resistor.", example: `${n(0.5 * mass * v0 * v0)} J` },
        ] },
      ],
    };
  },
};

