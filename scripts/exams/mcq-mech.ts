/* AP Physics C: Mechanics multiple choice. Every answer is computed; wrong answers come from specific mistakes. */
import { deg, G, m, num, numOptions, tpl } from "./phys-lib";
import { options } from "./csa-lib";
import { Retry, type McqTemplate } from "./types";

const t = String.raw;

/* ---------------- Unit 1: Kinematics ---------------- */
export const mechUnit1: McqTemplate[] = [
  tpl("m-kin-derivative", 1, ["displacement-velocity-and-acceleration"], ["2"], 2, (r) => {
    const a = r.nz(-3, 4);
    const b = r.nz(-6, 6);
    const c = r.int(-8, 8);
    const T = r.int(1, 4);
    const askA = r.next() < 0.5;
    const x = (s: number) => a * s ** 3 + b * s ** 2 + c * s;
    const v = (s: number) => 3 * a * s ** 2 + 2 * b * s + c;
    const acc = (s: number) => 6 * a * s + 2 * b;
    const right = askA ? acc(T) : v(T);
    return {
      stem: `A particle's position is ${m(t`x(t) = ${a}t^3 ${b < 0 ? "-" : "+"} ${Math.abs(b)}t^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}t`)}, with x in meters and t in seconds. What is its ${askA ? "acceleration" : "velocity"} at ${m(`t = ${T}`)} s?`,
      ...numOptions(right, askA ? "Differentiate twice: a = 6at + 2b." : "Differentiate once: v = 3at² + 2bt + c.", [
        [askA ? v(T) : x(T), askA ? "That is the velocity; differentiate again." : "That is the position; differentiate it."],
        [askA ? 3 * a * T + 2 * b : a * T ** 2 + b * T + c, "Bring each exponent down as a factor when differentiating."],
        [askA ? 6 * a * T : 3 * a * T ** 2 + 2 * b * T, askA ? "The derivative of 2bt is 2b, which also remains." : "The constant term c is part of the velocity."],
        [right + 2, "Recheck the arithmetic."],
      ], askA ? "m/s^2" : "m/s"),
      explanation: `${askA ? `a(t) = ${6 * a}t ${2 * b < 0 ? "-" : "+"} ${Math.abs(2 * b)}` : `v(t) = ${3 * a}t² ${2 * b < 0 ? "-" : "+"} ${Math.abs(2 * b)}t ${c < 0 ? "-" : "+"} ${Math.abs(c)}`}, so at t = ${T} the value is ${right}.`,
    };
  }),
  tpl("m-kin-integral", 1, ["displacement-velocity-and-acceleration"], ["2"], 3, (r) => {
    const k = r.int(1, 6);
    const v0 = r.int(0, 8);
    const T = r.int(2, 5);
    const askX = r.next() < 0.5;
    const vT = v0 + (k * T * T) / 2;
    const xT = v0 * T + (k * T ** 3) / 6;
    return {
      stem: `An object's acceleration is ${m(`a(t) = ${k}t`)} m/s². At ${m("t = 0")} it has velocity ${v0} m/s and is at ${m("x = 0")}. What is its ${askX ? "position" : "velocity"} at ${m(`t = ${T}`)} s?`,
      ...numOptions(askX ? xT : vT, askX ? "Integrate twice, using the initial conditions." : "Integrate a(t) and add the initial velocity.", [
        [askX ? v0 * T + (k * T ** 3) / 2 : v0 + k * T * T, "Integrating tⁿ divides by n + 1."],
        [askX ? (k * T ** 3) / 6 : (k * T * T) / 2, "Include the initial velocity."],
        [askX ? v0 * T + 0.5 * k * T * T * T : v0 + k * T, "The acceleration is not constant, so constant-acceleration equations do not apply."],
        [askX ? vT : xT, askX ? "That is the velocity." : "That is the position."],
      ], askX ? "m" : "m/s"),
      explanation: `v(t) = ${v0} + ${k}t²/2${askX ? ` and x(t) = ${v0}t + ${k}t³/6` : ""}. At t = ${T}: ${num(askX ? xT : vT)}.`,
    };
  }),
  tpl("m-const-accel", 1, ["displacement-velocity-and-acceleration"], ["2"], 2, (r) => {
    const v0 = r.int(5, 30);
    const a = r.int(2, 8);
    const d = r.int(10, 80);
    const stop = r.next() < 0.5;
    if (stop) {
      const dist = (v0 * v0) / (2 * a);
      return {
        stem: `A car moving at ${v0} m/s brakes with a constant deceleration of ${a} m/s². How far does it travel before stopping?`,
        ...numOptions(dist, "Use v² = v₀² + 2aΔx with v = 0.", [[(v0 * v0) / a, "Divide by 2a, not a."], [v0 / a, "That is the stopping time in seconds."], [(v0 * v0) / (4 * a), "Δx = v₀²/(2a)."], [v0 * (v0 / a), "Average velocity is v₀/2, not v₀."]], "m"),
        explanation: `Δx = v₀²/(2a) = ${v0}²/(2 × ${a}) = ${num(dist)} m.`,
      };
    }
    const v = Math.sqrt(v0 * v0 + 2 * a * d);
    return {
      stem: `A cart moving at ${v0} m/s accelerates uniformly at ${a} m/s² over ${d} m. What is its final speed?`,
      ...numOptions(v, "Use v² = v₀² + 2aΔx.", [[v0 + Math.sqrt(2 * a * d), "Square roots do not add term by term."], [Math.sqrt(v0 * v0 + a * d), "The equation has 2aΔx."], [v0 * v0 + 2 * a * d, "Take the square root."], [v0 + a * d, "Use v² = v₀² + 2aΔx; the time is not given."]], "m/s"),
      explanation: `v = √(${v0}² + 2·${a}·${d}) = ${num(v)} m/s.`,
    };
  }),
  tpl("m-projectile", 1, ["vectors-and-motion-in-two-dimensions"], ["2"], 3, (r) => {
    const v0 = r.int(10, 30);
    const th = r.pick([20, 30, 37, 45, 53, 60, 70]);
    const ask = r.pick(["range", "height", "time"]);
    const s = Math.sin(deg(th));
    const c = Math.cos(deg(th));
    const R = (v0 * v0 * Math.sin(deg(2 * th))) / G;
    const H = (v0 * s) ** 2 / (2 * G);
    const T = (2 * v0 * s) / G;
    const right = ask === "range" ? R : ask === "height" ? H : T;
    const unit = ask === "time" ? "s" : "m";
    return {
      stem: `A ball is launched from level ground at ${v0} m/s at ${th}° above the horizontal. Ignoring air resistance, what is its ${ask === "range" ? "horizontal range" : ask === "height" ? "maximum height" : "time of flight"}?`,
      ...numOptions(right, "Treat horizontal and vertical motion separately.", ask === "range"
        ? [[(v0 * v0 * Math.sin(deg(th))) / G, "Range uses sin 2θ."], [R / 2, "Use the full time of flight."], [(v0 * v0) / G, "That is the maximum range, at 45°."], [v0 * c * (v0 * s) / G, "That is only the time to the top times the horizontal speed."]]
        : ask === "height"
          ? [[(v0 * c) ** 2 / (2 * G), "Use the vertical component, v₀ sin θ."], [(v0 * s) ** 2 / G, "H = (v₀ sin θ)²/(2g)."], [(v0 * v0) / (2 * G), "Only the vertical component matters."], [2 * H, "Recheck the factor of 2."]]
          : [[(v0 * s) / G, "That is the time to the top; the flight is twice as long."], [(2 * v0 * c) / G, "Use the vertical component."], [(2 * v0) / G, "Use v₀ sin θ."], [T * 2, "Recheck."]], unit),
      explanation: `v₀x = ${num(v0 * c)} m/s, v₀y = ${num(v0 * s)} m/s. ${ask === "range" ? `R = v₀² sin 2θ/g` : ask === "height" ? "H = v₀y²/(2g)" : "T = 2v₀y/g"} = ${num(right)} ${unit}.`,
    };
  }),
  tpl("m-horizontal-launch", 1, ["vectors-and-motion-in-two-dimensions"], ["2"], 2, (r) => {
    const h = r.int(2, 40) / 2;
    const vx = r.int(2, 15);
    const tt = Math.sqrt((2 * h) / G);
    const d = vx * tt;
    return {
      stem: `A ball rolls off a horizontal ledge ${h} m high at ${vx} m/s. How far from the base of the ledge does it land?`,
      ...numOptions(d, "Fall time from the height, times the horizontal speed.", [[vx * Math.sqrt(h / G), "Fall time is √(2h/g)."], [vx * ((2 * h) / G), "Take the square root for the time."], [(vx * vx) / G, "Horizontal and vertical motion are independent."], [vx * Math.sqrt(2 * h * G) / G * 2, "Recheck the fall time."]], "m"),
      explanation: `t = √(2·${h}/9.8) = ${num(tt)} s; x = ${vx}·${num(tt)} = ${num(d)} m.`,
    };
  }),
  tpl("m-river", 1, ["reference-frames-and-relative-motion"], ["2"], 2, (r) => {
    const vb = r.int(3, 8);
    const vw = r.int(1, vb - 1);
    const w = r.int(4, 20) * 10;
    const time = w / vb;
    const drift = vw * time;
    const askDrift = r.next() < 0.5;
    return {
      stem: `A boat points straight across a river ${w} m wide, moving at ${vb} m/s relative to the water. The current flows at ${vw} m/s. ${askDrift ? "How far downstream does the boat land?" : "How long does the crossing take?"}`,
      ...numOptions(askDrift ? drift : time, "The current does not change the time to cross; it only carries the boat downstream.", askDrift
        ? [[(w * vw) / Math.hypot(vb, vw), "Use the crossing time w/v_boat."], [(w * vb) / vw, "Drift = current speed × crossing time."], [w / vw, "That is a time, not a distance."]]
        : [[w / Math.hypot(vb, vw), "The perpendicular component alone sets the crossing time."], [w / (vb - vw), "The current is perpendicular to the heading."], [w / (vb + vw), "The current is perpendicular to the heading."]], askDrift ? "m" : "s"),
      explanation: `t = ${w}/${vb} = ${num(time)} s; drift = ${vw}·${num(time)} = ${num(drift)} m.`,
    };
  }),
];

/* ---------------- Unit 2: Forces ---------------- */
export const mechUnit2: McqTemplate[] = [
  tpl("m-incline-friction", 2, ["kinetic-and-static-friction", "newtons-second-law"], ["2"], 2, (r) => {
    const th = r.pick([20, 25, 30, 35, 40, 45]);
    const mu = r.pick([0.1, 0.15, 0.2, 0.25, 0.3]);
    const a = G * (Math.sin(deg(th)) - mu * Math.cos(deg(th)));
    if (a <= 0.2) throw new Retry();
    return {
      stem: `A block slides down a ${th}° incline. The coefficient of kinetic friction is ${mu}. What is the magnitude of its acceleration?`,
      ...numOptions(a, "a = g(sin θ − μk cos θ).", [[G * (Math.sin(deg(th)) - mu * Math.sin(deg(th))), "Friction depends on the normal force, mg cos θ."], [G * (Math.cos(deg(th)) - mu * Math.sin(deg(th))), "The component along the incline is mg sin θ."], [G * Math.sin(deg(th)), "Friction acts up the slope."], [G * (Math.sin(deg(th)) + mu * Math.cos(deg(th))), "Friction opposes the sliding."]], "m/s^2"),
      explanation: `a = 9.8(sin ${th}° − ${mu} cos ${th}°) = ${num(a)} m/s².`,
    };
  }),
  tpl("m-atwood", 2, ["newtons-second-law", "systems-and-center-of-mass"], ["2"], 2, (r) => {
    const m1 = r.int(3, 10);
    const m2 = r.int(1, m1 - 1);
    const askT = r.next() < 0.5;
    const a = ((m1 - m2) * G) / (m1 + m2);
    const T = (2 * m1 * m2 * G) / (m1 + m2);
    return {
      stem: `Masses of ${m1} kg and ${m2} kg hang on either side of a light, frictionless pulley. What is the ${askT ? "tension in the string" : "magnitude of their acceleration"}?`,
      ...numOptions(askT ? T : a, askT ? "T = 2m₁m₂g/(m₁ + m₂)." : "a = (m₁ − m₂)g/(m₁ + m₂).", askT
        ? [[m1 * G, "The heavier mass accelerates down, so T is less than its weight."], [m2 * G, "The lighter mass accelerates up, so T exceeds its weight."], [((m1 + m2) * G) / 2, "Use T = m₂(g + a)."], [(m1 - m2) * G, "That is the net driving force."]]
        : [[((m1 - m2) * G) / m1, "The whole system accelerates: divide by both masses."], [((m1 + m2) * G) / (m1 - m2), "The fraction is inverted."], [G, "The masses are connected, so a is less than g."], [(m1 * G) / (m1 + m2), "The net force is (m₁ − m₂)g."]], askT ? "N" : "m/s^2"),
      explanation: `a = (${m1} − ${m2})(9.8)/${m1 + m2} = ${num(a)} m/s²; T = m₂(g + a) = ${num(T)} N.`,
    };
  }),
  tpl("m-table-pulley", 2, ["newtons-second-law", "kinetic-and-static-friction"], ["2"], 3, (r) => {
    const m1 = r.int(2, 8);
    const m2 = r.int(1, 6);
    const mu = r.pick([0, 0.1, 0.2, 0.3]);
    const a = ((m2 - mu * m1) * G) / (m1 + m2);
    if (a <= 0.1) throw new Retry();
    return {
      stem: `A ${m1} kg block on a horizontal table is connected by a string over a light pulley to a hanging ${m2} kg block. The coefficient of kinetic friction between the table and the block is ${mu}. What is the acceleration of the blocks?`,
      ...numOptions(a, "Net force (m₂g − μm₁g) divided by the total mass.", [[(m2 * G) / (m1 + m2), mu ? "Include friction on the table block." : "Recheck."], [((m2 - mu * m1) * G) / m2, "Both blocks accelerate; divide by the total mass."], [((m2 + mu * m1) * G) / (m1 + m2), "Friction opposes the motion."], [(m2 * G) / m1, "Divide by the total mass."]], "m/s^2"),
      explanation: `a = (${m2} − ${mu}·${m1})(9.8)/${m1 + m2} = ${num(a)} m/s².`,
    };
  }),
  tpl("m-flat-curve", 2, ["circular-motion", "kinetic-and-static-friction"], ["2"], 2, (r) => {
    const rad = r.int(2, 15) * 10;
    if (r.next() < 0.5) {
      const mu = r.pick([0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
      const v = Math.sqrt(mu * G * rad);
      return {
        stem: `A car rounds a flat curve of radius ${rad} m. The coefficient of static friction is ${mu}. What is the maximum speed without skidding?`,
        ...numOptions(v, "Static friction supplies the centripetal force: μmg = mv²/r.", [[mu * G * rad, "Take the square root."], [Math.sqrt(G * rad), "Include the friction coefficient."], [Math.sqrt((G * rad) / mu), "μ multiplies g r."]], "m/s"),
        explanation: `v = √(μgr) = √(${mu}·9.8·${rad}) = ${num(v)} m/s.`,
      };
    }
    const v = r.int(10, 30);
    const th = (Math.atan((v * v) / (rad * G)) * 180) / Math.PI;
    return {
      stem: `A curve of radius ${rad} m is banked so that a car at ${v} m/s needs no friction. What is the banking angle?`,
      ...{ ...options([`$$${num(th)}°$$`, "tan θ = v²/(rg)."], [[`$$${num((Math.asin(Math.min(1, (v * v) / (rad * G))) * 180) / Math.PI)}°$$`, "Use tan θ = v²/(rg), from dividing the force components."], [`$$${num(90 - th)}°$$`, "Measure the angle from the horizontal."], [`$$${num((Math.atan((v) / (rad * G)) * 180) / Math.PI)}°$$`, "Square the speed."]]) },
      explanation: `tan θ = ${v}²/(${rad}·9.8) = ${num((v * v) / (rad * G))}, so θ = ${num(th)}°.`,
    };
  }),
  tpl("m-vertical-circle", 2, ["circular-motion"], ["2"], 3, (r) => {
    const mass = r.int(1, 5) / 2;
    const L = r.int(4, 15) / 10;
    const v = r.int(3, 9);
    const top = r.next() < 0.5;
    const T = top ? (mass * v * v) / L - mass * G : (mass * v * v) / L + mass * G;
    if (T <= 0) throw new Retry();
    return {
      stem: `A ${mass} kg ball on a ${L} m string moves in a vertical circle. At the ${top ? "top" : "bottom"} of the circle its speed is ${v} m/s. What is the tension in the string there?`,
      ...numOptions(T, top ? "At the top, T + mg = mv²/r." : "At the bottom, T − mg = mv²/r.", [[(mass * v * v) / L, "Include gravity."], [top ? (mass * v * v) / L + mass * G : (mass * v * v) / L - mass * G, "Check the direction of gravity relative to the center."], [(mass * v) / L + (top ? -1 : 1) * mass * G, "Centripetal force uses v²."]], "N"),
      explanation: `${top ? "T = mv²/r − mg" : "T = mv²/r + mg"} = ${num(T)} N.`,
    };
  }),
  tpl("m-terminal", 2, ["resistive-forces"], ["2"], 3, (r) => {
    const mass = r.int(1, 20) / 10;
    const b = r.int(1, 20) / 100;
    const vt = (mass * G) / b;
    const tau = mass / b;
    const ask = r.pick(["vt", "tau", "half"]);
    const val = ask === "vt" ? vt : ask === "tau" ? tau : vt * (1 - Math.exp(-1));
    return {
      stem: `An object of mass ${mass} kg falls from rest with a drag force ${m("F = -bv")}, where ${m(`b = ${b}`)} kg/s. ${ask === "vt" ? "What is its terminal speed?" : ask === "tau" ? "What is the time constant of its approach to terminal speed?" : `What is its speed at ${m("t = m/b")}?`}`,
      ...numOptions(val, ask === "vt" ? "At terminal speed, mg = bv." : ask === "tau" ? "From m dv/dt = mg − bv, τ = m/b." : "v = v_T(1 − e^(−t/τ)) and t = τ.", ask === "vt"
        ? [[b / (mass * G), "Solve mg = bv for v."], [mass / b, "That is the time constant."], [Math.sqrt((mass * G) / b), "Drag here is linear in v."]]
        : ask === "tau"
          ? [[b / mass, "τ = m/b."], [vt, "That is the terminal speed."], [mass * G * b, "τ has units of seconds: m/b."]]
          : [[vt * Math.exp(-1), "v = v_T(1 − e^(−1))."], [vt / 2, "The approach is exponential."], [vt, "Terminal speed is reached only as t → ∞."]], ask === "tau" ? "s" : "m/s"),
      explanation: `v_T = mg/b = ${num(vt)} m/s and τ = m/b = ${num(tau)} s.`,
    };
  }),
  tpl("m-planet-g", 2, ["gravitational-force"], ["2"], 2, (r) => {
    const fm = r.pick([0.5, 2, 3, 4, 8, 10]);
    const fr = r.pick([0.5, 2, 3, 4]);
    const g = (G * fm) / (fr * fr);
    return {
      stem: `A planet has ${fm} times Earth's mass and ${fr} times Earth's radius. What is the gravitational field strength at its surface? (Earth's is 9.8 N/kg.)`,
      ...numOptions(g, "g ∝ M/R².", [[(G * fm) / fr, "g depends on 1/R², not 1/R."], [G * fm * fr * fr, "g decreases with radius."], [(G * fr * fr) / fm, "The ratio is inverted."], [G * fm, "Include the radius."]], "N/kg"),
      explanation: `g = 9.8 × ${fm}/${fr}² = ${num(g)} N/kg.`,
    };
  }),
  tpl("m-elevator", 2, ["newtons-second-law", "forces-and-free-body-diagrams"], ["2"], 2, (r) => {
    const mass = r.int(40, 90);
    const a = r.int(1, 4);
    const up = r.next() < 0.5;
    const N = mass * (G + (up ? a : -a));
    return {
      stem: `A ${mass} kg person stands on a scale in an elevator that is ${up ? "accelerating upward" : "accelerating downward"} at ${a} m/s². What does the scale read?`,
      ...numOptions(N, "The scale reads the normal force: N − mg = ma (up positive).", [[mass * G, "The acceleration changes the normal force."], [mass * (G + (up ? -a : a)), "Check the direction of the acceleration."], [mass * a, "Include gravity."]], "N"),
      explanation: `N = m(g ${up ? "+" : "−"} a) = ${num(N)} N.`,
    };
  }),
  tpl("m-com-rod", 2, ["systems-and-center-of-mass"], ["2"], 3, (r) => {
    const n = r.int(1, 3);
    const L = r.int(1, 6);
    const x = ((n + 1) / (n + 2)) * L;
    return {
      stem: `A rod lies along the x-axis from ${m("x = 0")} to ${m(`x = ${L}`)} m and has linear mass density ${m(`\\lambda = kx${n > 1 ? `^${n}` : ""}`)}. Where is its center of mass?`,
      ...numOptions(x, "x_cm = ∫xλ dx / ∫λ dx.", [[L / 2, "The rod is not uniform."], [(n / (n + 1)) * L, "The exponents are n + 2 and n + 1."], [((n + 1) / (n + 3)) * L, "Integrate x·xⁿ and xⁿ correctly."]], "m"),
      explanation: `x_cm = [kL^${n + 2}/(${n + 2})]/[kL^${n + 1}/(${n + 1})] = ${n + 1}L/${n + 2} = ${num(x)} m.`,
    };
  }),
  tpl("m-springs", 2, ["spring-forces"], ["2"], 2, (r) => {
    const k1 = r.int(2, 10) * 10;
    const k2 = r.int(2, 10) * 10;
    const mass = r.int(1, 8) / 2;
    const series = r.next() < 0.5;
    const keq = series ? (k1 * k2) / (k1 + k2) : k1 + k2;
    const x = (mass * G) / keq;
    return {
      stem: `Two springs with constants ${k1} N/m and ${k2} N/m are connected in ${series ? "series" : "parallel"} and support a ${mass} kg mass at rest. How far do they stretch in total?`,
      ...numOptions(x, `k_eq = ${series ? "k₁k₂/(k₁ + k₂)" : "k₁ + k₂"}.`, [[(mass * G) / (series ? k1 + k2 : (k1 * k2) / (k1 + k2)), "Series and parallel rules are reversed."], [(mass * G) / k1, "Both springs share the load."], [mass / keq, "The force is the weight, mg."]], "m"),
      explanation: `k_eq = ${num(keq)} N/m; x = mg/k_eq = ${num(x)} m.`,
    };
  }),
];

/* ---------------- Unit 3: Work and energy ---------------- */
export const mechUnit3: McqTemplate[] = [
  tpl("m-work-integral", 3, ["work"], ["2"], 2, (r) => {
    const k = r.int(1, 6);
    const n = r.int(1, 3);
    const a = r.int(0, 2);
    const b = a + r.int(1, 3);
    const W = (k * (b ** (n + 1) - a ** (n + 1))) / (n + 1);
    return {
      stem: `A force ${m(`F(x) = ${k}x${n > 1 ? `^${n}` : ""}`)} N acts along the x-axis. How much work does it do on an object moving from ${m(`x = ${a}`)} m to ${m(`x = ${b}`)} m?`,
      ...numOptions(W, "W = ∫F dx.", [[k * (b ** n - a ** n), "Integrate; do not just evaluate F."], [k * b ** n * (b - a), "The force is not constant."], [k * (b ** (n + 1) - a ** (n + 1)), "Divide by n + 1 when integrating."], [k * n * (b ** (n - 1) - a ** (n - 1)), "Integrate rather than differentiate."]], "J"),
      explanation: `W = ${k}[x^${n + 1}/${n + 1}] from ${a} to ${b} = ${num(W)} J.`,
    };
  }),
  tpl("m-spring-launch", 3, ["conservation-of-energy", "spring-forces"], ["2"], 2, (r) => {
    const k = r.int(5, 50) * 10;
    const x = r.int(5, 25) / 100;
    const mass = r.int(1, 10) / 10;
    const v = x * Math.sqrt(k / mass);
    return {
      stem: `A spring with ${m(`k = ${k}`)} N/m is compressed ${x} m and launches a ${mass} kg block across a frictionless surface. What is the block's speed after leaving the spring?`,
      ...numOptions(v, "½kx² = ½mv².", [[(k * x) / mass, "Use energy: v = x√(k/m)."], [x * Math.sqrt((2 * k) / mass), "The ½ appears on both sides."], [(k * x * x) / mass, "Take the square root."]], "m/s"),
      explanation: `v = x√(k/m) = ${x}√(${k}/${mass}) = ${num(v)} m/s.`,
    };
  }),
  tpl("m-incline-energy", 3, ["conservation-of-energy", "work"], ["2"], 3, (r) => {
    const th = r.pick([20, 30, 37, 45]);
    const L = r.int(2, 10);
    const mu = r.pick([0, 0.1, 0.2, 0.3]);
    const h = L * Math.sin(deg(th));
    const v2 = 2 * G * (h - mu * L * Math.cos(deg(th)));
    if (v2 <= 0) throw new Retry();
    const v = Math.sqrt(v2);
    return {
      stem: `A block starts from rest and slides ${L} m down a ${th}° incline${mu ? ` with coefficient of kinetic friction ${mu}` : " with no friction"}. What is its speed at the bottom?`,
      ...numOptions(v, "mgh − μmg cos θ·L = ½mv².", [[Math.sqrt(2 * G * L), "Use the vertical drop, L sin θ."], [Math.sqrt(2 * G * h), mu ? "Friction removes energy." : "Recheck."], [Math.sqrt(2 * G * (h - mu * L)), "Friction depends on the normal force, mg cos θ."], [2 * G * h, "Take the square root."]], "m/s"),
      explanation: `h = ${num(h)} m. v = √(2g(h − μL cos θ)) = ${num(v)} m/s.`,
    };
  }),
  tpl("m-power-lift", 3, ["power"], ["2"], 2, (r) => {
    const mass = r.int(5, 50) * 10;
    const h = r.int(3, 30);
    const tt = r.int(4, 30);
    const P = (mass * G * h) / tt;
    return {
      stem: `A motor lifts a ${mass} kg load ${h} m at constant speed in ${tt} s. What average power does it deliver?`,
      ...numOptions(P, "P = mgh/t.", [[mass * G * h, "That is the work; divide by time."], [(mass * h) / tt, "Include g."], [(mass * G * tt) / h, "P = W/t."]], "W"),
      explanation: `P = ${mass}(9.8)(${h})/${tt} = ${num(P)} W.`,
    };
  }),
  tpl("m-potential-equilibrium", 3, ["potential-energy"], ["2"], 3, (r) => {
    const a = r.int(1, 4);
    const b = r.int(1, 12) * 3;
    const xeq = Math.sqrt(b / (3 * a));
    return {
      stem: `The potential energy of a particle is ${m(`U(x) = ${a}x^3 - ${b}x`)} J. At what positive x is the particle in stable equilibrium?`,
      ...numOptions(xeq, "Equilibrium where dU/dx = 0; stable at a minimum.", [[Math.sqrt(b / a), "dU/dx = 3ax² − b."], [b / (3 * a), "Take the square root."], [Math.cbrt(b / a), "Set the derivative, not U, to zero."]], "m"),
      explanation: `dU/dx = ${3 * a}x² − ${b} = 0 gives x = ${num(xeq)} m; d²U/dx² > 0 there, so it is stable.`,
    };
  }),
  tpl("m-escape", 3, ["conservation-of-energy", "gravitational-force"], ["2"], 3, (r) => {
    const M = r.int(1, 9) * 10 ** r.int(22, 25);
    const R = r.int(1, 9) * 10 ** r.int(6, 7);
    const v = Math.sqrt((2 * 6.67e-11 * M) / R);
    return {
      stem: `A planet has mass ${m(num(M))} kg and radius ${m(num(R))} m. What is the escape speed from its surface? (${m("G = 6.67 \\times 10^{-11}")} N·m²/kg²)`,
      ...numOptions(v, "½mv² = GMm/R.", [[Math.sqrt((6.67e-11 * M) / R), "That is the circular orbit speed; escape needs √2 times more."], [(2 * 6.67e-11 * M) / R, "Take the square root."], [Math.sqrt((2 * 6.67e-11 * M) / (R * R)), "Potential energy uses 1/R."]], "m/s"),
      explanation: `v = √(2GM/R) = ${num(v)} m/s.`,
    };
  }),
];

/* ---------------- Unit 4: Momentum ---------------- */
export const mechUnit4: McqTemplate[] = [
  tpl("m-inelastic", 4, ["elastic-and-inelastic-collisions", "conservation-of-linear-momentum"], ["2"], 2, (r) => {
    const m1 = r.int(1, 8);
    const m2 = r.int(1, 8);
    const v1 = r.int(2, 12);
    const vf = (m1 * v1) / (m1 + m2);
    const askK = r.next() < 0.5;
    const lost = 0.5 * m1 * v1 * v1 - 0.5 * (m1 + m2) * vf * vf;
    return {
      stem: `A ${m1} kg cart moving at ${v1} m/s collides with and sticks to a ${m2} kg cart at rest. ${askK ? "How much kinetic energy is lost?" : "What is their speed after the collision?"}`,
      ...numOptions(askK ? lost : vf, "Momentum is conserved; kinetic energy is not.", askK
        ? [[0.5 * m1 * v1 * v1, "Some kinetic energy remains after the collision."], [0, "Kinetic energy is lost in a sticking collision."], [0.5 * (m1 + m2) * vf * vf, "That is the remaining kinetic energy."]]
        : [[v1, "The carts share the momentum."], [(m2 * v1) / (m1 + m2), "Use m₁v₁ for the initial momentum."], [v1 * Math.sqrt(m1 / (m1 + m2)), "Kinetic energy is not conserved here."]], askK ? "J" : "m/s"),
      explanation: `v_f = ${m1}·${v1}/${m1 + m2} = ${num(vf)} m/s; kinetic energy lost = ${num(lost)} J.`,
    };
  }),
  tpl("m-elastic", 4, ["elastic-and-inelastic-collisions"], ["2"], 3, (r) => {
    const m1 = r.int(1, 8);
    let m2 = r.int(1, 8);
    if (m2 === m1) m2++;
    const v = r.int(2, 10);
    const v1 = ((m1 - m2) / (m1 + m2)) * v;
    const v2 = ((2 * m1) / (m1 + m2)) * v;
    const askTarget = r.next() < 0.5;
    return {
      stem: `A ${m1} kg ball moving at +${v} m/s collides elastically head-on with a ${m2} kg ball at rest. What is the velocity of the ${askTarget ? `${m2} kg` : `${m1} kg`} ball afterward (positive in the original direction)?`,
      ...numOptions(askTarget ? v2 : v1, "Elastic: conserve momentum and kinetic energy (relative velocity reverses).", askTarget
        ? [[(m1 * v) / (m1 + m2), "That would be a sticking collision."], [(m1 * v) / m2, "Kinetic energy is conserved too."], [v, "Only equal masses exchange velocities."]]
        : [[((m2 - m1) / (m1 + m2)) * v, "Check the sign: v₁' = (m₁ − m₂)v/(m₁ + m₂)."], [0, "Only equal masses stop dead."], [(m1 * v) / (m1 + m2), "That would be a sticking collision."]], "m/s"),
      explanation: `v₁' = (m₁ − m₂)v/(m₁ + m₂) = ${num(v1)} m/s; v₂' = 2m₁v/(m₁ + m₂) = ${num(v2)} m/s.`,
    };
  }),
  tpl("m-impulse-integral", 4, ["change-in-momentum-and-impulse"], ["2"], 3, (r) => {
    const k = r.int(1, 12);
    const n = r.int(1, 2);
    const T = r.int(1, 4);
    const mass = r.int(1, 6);
    const J = (k * T ** (n + 1)) / (n + 1);
    const v = J / mass;
    return {
      stem: `A ${mass} kg object at rest experiences a net force ${m(`F(t) = ${k}t${n > 1 ? `^${n}` : ""}`)} N from ${m("t = 0")} to ${m(`t = ${T}`)} s. What is its final speed?`,
      ...numOptions(v, "Impulse ∫F dt equals the change in momentum.", [[(k * T ** n) / mass, "Integrate the force over time."], [(k * T ** n * T) / mass, "The force is not constant."], [J, "Divide by the mass to get speed."]], "m/s"),
      explanation: `J = ∫F dt = ${num(J)} N·s; v = J/m = ${num(v)} m/s.`,
    };
  }),
  tpl("m-bounce-force", 4, ["change-in-momentum-and-impulse"], ["2"], 2, (r) => {
    const mass = r.int(1, 10) / 10;
    const vi = r.int(5, 20);
    const vf = r.int(2, vi);
    const dt = r.int(1, 10) / 100;
    const F = (mass * (vi + vf)) / dt;
    return {
      stem: `A ${mass} kg ball hits a wall at ${vi} m/s and rebounds at ${vf} m/s. The contact lasts ${dt} s. What is the average force from the wall?`,
      ...numOptions(F, "Δp = m(v_f − v_i) with the direction reversed.", [[(mass * (vi - vf)) / dt, "The velocity reverses, so the speeds add."], [(mass * vi) / dt, "Include the rebound."], [mass * (vi + vf) * dt, "Divide by time."]], "N"),
      explanation: `Δp = ${mass}(${vf} + ${vi}) = ${num(mass * (vi + vf))} kg·m/s; F = Δp/Δt = ${num(F)} N.`,
    };
  }),
  tpl("m-ballistic", 4, ["elastic-and-inelastic-collisions", "conservation-of-energy"], ["2"], 4, (r) => {
    const mb = r.int(5, 30) / 1000;
    const M = r.int(10, 50) / 10;
    const v = r.int(20, 50) * 10;
    const V = (mb * v) / (mb + M);
    const h = (V * V) / (2 * G);
    return {
      stem: `A ${num(mb * 1000)} g bullet moving at ${v} m/s embeds in a ${M} kg block hanging from strings. How high does the block rise?`,
      ...numOptions(h, "Momentum for the collision, then energy for the swing.", [[(mb * v * v) / (2 * G * (mb + M)), "Kinetic energy is not conserved in the collision."], [V / G, "h = V²/(2g)."], [(v * v) / (2 * G), "Find the block's speed after the collision first."]], "m"),
      explanation: `V = ${num(V)} m/s after the collision; h = V²/(2g) = ${num(h)} m.`,
    };
  }),
  tpl("m-2d-collision", 4, ["conservation-of-linear-momentum"], ["2"], 3, (r) => {
    const m1 = r.int(1, 6) * 500;
    const m2 = r.int(1, 6) * 500;
    const v1 = r.int(5, 20);
    const v2 = r.int(5, 20);
    const vf = Math.hypot(m1 * v1, m2 * v2) / (m1 + m2);
    return {
      stem: `A ${m1} kg car heading east at ${v1} m/s collides with a ${m2} kg car heading north at ${v2} m/s, and they lock together. What is their speed just after the collision?`,
      ...numOptions(vf, "Conserve momentum in x and y separately, then combine.", [[(m1 * v1 + m2 * v2) / (m1 + m2), "Momentum is a vector; add components at right angles."], [Math.hypot(v1, v2), "Weight each velocity by its mass."], [Math.hypot(m1 * v1, m2 * v2) / m1, "Divide by the total mass."]], "m/s"),
      explanation: `p_x = ${m1 * v1}, p_y = ${m2 * v2}; v = √(p_x² + p_y²)/(m₁ + m₂) = ${num(vf)} m/s.`,
    };
  }),
];

/* ---------------- Unit 5: Rotation ---------------- */
export const mechUnit5: McqTemplate[] = [
  tpl("m-rot-kinematics", 5, ["rotational-kinematics"], ["2"], 2, (r) => {
    const w0 = r.int(10, 60);
    const tt = r.int(4, 20);
    const theta = (w0 * tt) / 2;
    const rev = theta / (2 * Math.PI);
    return {
      stem: `A wheel spinning at ${w0} rad/s slows uniformly to rest in ${tt} s. How many revolutions does it make while stopping?`,
      ...{ ...options([`$$${num(rev)}$$`, "Δθ = ½ω₀t, then divide by 2π."], [[`$$${num(theta)}$$`, "That is in radians; convert to revolutions."], [`$$${num((w0 * tt) / (2 * Math.PI))}$$`, "The average angular speed is ω₀/2."], [`$$${num(rev / 2)}$$`, "Recheck the average."]]) },
      explanation: `Δθ = ½(${w0})(${tt}) = ${num(theta)} rad = ${num(rev)} rev.`,
    };
  }),
  tpl("m-inertia", 5, ["rotational-inertia"], ["2"], 3, (r) => {
    const M = r.int(1, 8);
    const L = r.int(1, 4);
    const v = r.int(0, 2);
    if (v === 0) {
      const I = (M * L * L) / 3;
      return {
        stem: `What is the rotational inertia of a uniform rod of mass ${M} kg and length ${L} m about an axis through one end, perpendicular to the rod?`,
        ...numOptions(I, "I = ML²/3 (parallel-axis theorem from ML²/12).", [[(M * L * L) / 12, "That is about the center."], [M * L * L, "The mass is spread along the rod."], [(M * L * L) / 2, "That is a disk's formula."]], "kg{\\cdot}m^2"),
        explanation: `I = ML²/12 + M(L/2)² = ML²/3 = ${num(I)} kg·m².`,
      };
    }
    if (v === 1) {
      const d = r.int(1, 3) / 2;
      const R = r.int(2, 6) / 10;
      const I = 0.5 * M * R * R + M * d * d;
      return {
        stem: `A uniform disk of mass ${M} kg and radius ${R} m rotates about an axis perpendicular to it, ${d} m from its center. What is its rotational inertia?`,
        ...numOptions(I, "Parallel-axis theorem: I = ½MR² + Md².", [[0.5 * M * R * R, "The axis is not through the center."], [M * d * d, "Include the disk's own I about its center."], [0.5 * M * R * R + M * d, "The parallel-axis term is Md²."]], "kg{\\cdot}m^2"),
        explanation: `I = ½(${M})(${R})² + ${M}(${d})² = ${num(I)} kg·m².`,
      };
    }
    const m1 = r.int(1, 5);
    const m2 = r.int(1, 5);
    const I = m1 * (L / 2) ** 2 + m2 * (L / 2) ** 2;
    return {
      stem: `Point masses of ${m1} kg and ${m2} kg are at the ends of a massless rod ${L} m long. What is the rotational inertia about the rod's center?`,
      ...numOptions(I, "Sum of mr² with r = L/2.", [[(m1 + m2) * L * L, "Each mass is L/2 from the center."], [(m1 + m2) * (L / 2), "Square the distance."], [m1 * L * L, "Measure from the center, not an end."]], "kg{\\cdot}m^2"),
      explanation: `I = (${m1} + ${m2})(${L}/2)² = ${num(I)} kg·m².`,
    };
  }),
  tpl("m-beam", 5, ["rotational-equilibrium-and-newtons-first-law-in-rotational-form", "torque"], ["2"], 3, (r) => {
    const L = r.int(3, 8);
    const W = r.int(1, 6) * 100;
    const P = r.int(2, 9) * 100;
    const x = r.int(1, L - 1);
    const right = (W * (L / 2) + P * x) / L;
    return {
      stem: `A uniform ${L} m beam weighing ${W} N rests on supports at both ends. A ${P} N load sits ${x} m from the left end. What force does the right support exert?`,
      ...numOptions(right, "Take torques about the left support.", [[W + P - right, "That is the left support's force."], [(W + P) / 2, "The load is not at the center."], [(P * x) / L, "Include the beam's weight at its center."]], "N"),
      explanation: `F_R·${L} = ${W}·${L / 2} + ${P}·${x}, so F_R = ${num(right)} N.`,
    };
  }),
  tpl("m-pulley-disk", 5, ["newtons-second-law-in-rotational-form"], ["2"], 3, (r) => {
    const mh = r.int(1, 6);
    const M = r.int(1, 8);
    const a = (mh * G) / (mh + M / 2);
    return {
      stem: `A ${mh} kg mass hangs from a light string wrapped around a uniform disk pulley of mass ${M} kg that turns on a frictionless axle. What is the acceleration of the mass?`,
      ...numOptions(a, "a = mg/(m + M/2), using I = ½MR² and a = Rα.", [[G, "The pulley's inertia reduces the acceleration."], [(mh * G) / (mh + M), "For a disk, I/R² = M/2."], [(mh * G) / (mh + 2 * M), "I/R² = M/2."]], "m/s^2"),
      explanation: `mg − T = ma and TR = ½MR²(a/R) give a = ${num(a)} m/s².`,
    };
  }),
  tpl("m-rod-release", 5, ["newtons-second-law-in-rotational-form", "torque"], ["2"], 3, (r) => {
    const L = r.int(4, 30) / 10;
    const alpha = (3 * G) / (2 * L);
    const askA = r.next() < 0.5;
    return {
      stem: `A uniform rod of length ${L} m is pivoted at one end and released from rest in a horizontal position. What is ${askA ? "the linear acceleration of its free end" : "its angular acceleration"} just after release?`,
      ...numOptions(askA ? alpha * L : alpha, "τ = Mg(L/2) and I = ML²/3 give α = 3g/(2L).", askA
        ? [[G, "The free end accelerates faster than g."], [(alpha * L) / 2, "The free end is a distance L from the pivot."], [(3 * G) / 4, "a = αL = 3g/2."]]
        : [[G / L, "Use τ = Iα with I = ML²/3."], [(6 * G) / L, "The weight acts at L/2."], [(3 * G) / L, "τ = MgL/2."]], askA ? "m/s^2" : "rad/s^2"),
      explanation: `α = (MgL/2)/(ML²/3) = 3g/(2L) = ${num(alpha)} rad/s²${askA ? `; a = αL = ${num(alpha * L)} m/s²` : ""}.`,
    };
  }),
];

/* ---------------- Unit 6: Rotational energy and momentum ---------------- */
const SHAPES: [string, number][] = [["hoop", 1], ["solid cylinder", 0.5], ["solid sphere", 0.4], ["thin spherical shell", 2 / 3]];
export const mechUnit6: McqTemplate[] = [
  tpl("m-rolling", 6, ["rolling", "rotational-kinetic-energy"], ["2"], 3, (r) => {
    const [shape, beta] = r.pick(SHAPES);
    const h = r.int(5, 40) / 10;
    const v = Math.sqrt((2 * G * h) / (1 + beta));
    return {
      stem: `A ${shape} rolls without slipping from rest down a ramp of height ${h} m. What is its speed at the bottom?`,
      ...numOptions(v, `mgh = ½mv²(1 + β) with I = ${beta === 1 ? "" : beta === 0.5 ? "½" : beta === 0.4 ? "⅖" : "⅔"}MR².`, [[Math.sqrt(2 * G * h), "Some energy goes into rotation."], [Math.sqrt((2 * G * h) / (1 + 1 / beta)), "Rotational energy is ½Iω² = ½βmv²."], [Math.sqrt(G * h), "That is only correct for a hoop."], [Math.sqrt((2 * G * h) / (1 + (beta === 0.5 ? 0.4 : 0.5))), "Use the rotational inertia of this shape."]], "m/s"),
      explanation: `v = √(2gh/(1 + ${num(beta)})) = ${num(v)} m/s.`,
    };
  }),
  tpl("m-angular-conservation", 6, ["conservation-of-angular-momentum"], ["2"], 3, (r) => {
    const M = r.int(2, 8);
    const R = r.int(2, 6) / 10;
    const w = r.int(4, 20);
    const ml = r.int(1, 6) / 4;
    const Ii = 0.5 * M * R * R;
    const If = Ii + ml * R * R;
    const wf = (Ii * w) / If;
    return {
      stem: `A uniform disk of mass ${M} kg and radius ${R} m spins at ${w} rad/s on a frictionless axle. A ${ml} kg lump of clay is dropped onto the rim and sticks. What is the new angular speed?`,
      ...numOptions(wf, "Angular momentum is conserved: I_iω_i = I_fω_f.", [[(M * w) / (M + ml), "Use rotational inertias, not masses."], [w * Math.sqrt(Ii / If), "Kinetic energy is not conserved in a sticking collision."], [(Ii * w) / (Ii + ml * R), "The clay's inertia is mR²."]], "rad/s"),
      explanation: `I_i = ${num(Ii)}, I_f = ${num(If)} kg·m²; ω_f = ${num(wf)} rad/s.`,
    };
  }),
  tpl("m-orbit", 6, ["motion-of-orbiting-satellites"], ["2"], 3, (r) => {
    const f = r.pick([2, 3, 4, 9, 16]);
    const ask = r.pick(["period", "speed"]);
    const val = ask === "period" ? f ** 1.5 : 1 / Math.sqrt(f);
    return {
      stem: `Satellite B orbits a planet in a circular orbit ${f} times the radius of satellite A's circular orbit. What is the ratio of B's orbital ${ask} to A's?`,
      ...options([`$$${num(val)}$$`, ask === "period" ? "T² ∝ r³, so T ∝ r^(3/2)." : "v = √(GM/r), so v ∝ r^(−1/2)."], ask === "period"
        ? [[`$$${num(f)}$$`, "Kepler's third law: T ∝ r^(3/2)."], [`$$${num(f * f)}$$`, "T² ∝ r³."], [`$$${num(Math.sqrt(f))}$$`, "The exponent is 3/2."]]
        : [[`$$${num(1 / f)}$$`, "v ∝ 1/√r."], [`$$${num(Math.sqrt(f))}$$`, "Farther satellites move more slowly."], [`$$${num(1 / (f * f))}$$`, "v ∝ 1/√r."]]),
      explanation: ask === "period" ? `T_B/T_A = ${f}^(3/2) = ${num(val)}.` : `v_B/v_A = 1/√${f} = ${num(val)}.`,
    };
  }),
  tpl("m-rod-swing", 6, ["rotational-kinetic-energy", "conservation-of-energy"], ["2"], 3, (r) => {
    const L = r.int(4, 30) / 10;
    const w = Math.sqrt((3 * G) / L);
    return {
      stem: `A uniform rod of length ${L} m, pivoted at one end, is released from rest in a horizontal position. What is its angular speed as it swings through the vertical?`,
      ...numOptions(w, "Mg(L/2) = ½(ML²/3)ω².", [[Math.sqrt((2 * G) / L), "The rod's inertia about the end is ML²/3."], [Math.sqrt((6 * G) / L), "The center of mass falls only L/2."], [Math.sqrt(2 * G * L) / L, "Treat the rod as rotating, not as a point mass."]], "rad/s"),
      explanation: `ω = √(3g/L) = ${num(w)} rad/s.`,
    };
  }),
  tpl("m-torque-work", 6, ["torque-and-work", "rotational-kinetic-energy"], ["2"], 3, (r) => {
    const tau = r.int(2, 20);
    const I = r.int(1, 20) / 10;
    const rev = r.int(1, 10);
    const W = tau * rev * 2 * Math.PI;
    const w = Math.sqrt((2 * W) / I);
    return {
      stem: `A constant torque of ${tau} N·m acts on a wheel (${m(`I = ${I}`)} kg·m²) initially at rest, through ${rev} revolution${rev > 1 ? "s" : ""}. What is the wheel's final angular speed?`,
      ...numOptions(w, "Work τΔθ (in radians) equals ½Iω².", [[Math.sqrt((2 * tau * rev) / I), "Convert revolutions to radians."], [(tau * rev * 2 * Math.PI) / I, "½Iω² = W; solve for ω."], [Math.sqrt(W / I), "W = ½Iω²."]], "rad/s"),
      explanation: `W = ${tau}·${rev}·2π = ${num(W)} J; ω = √(2W/I) = ${num(w)} rad/s.`,
    };
  }),
];

/* ---------------- Unit 7: Oscillations ---------------- */
export const mechUnit7: McqTemplate[] = [
  tpl("m-spring-period", 7, ["frequency-and-period-of-shm"], ["2"], 2, (r) => {
    const mass = r.int(1, 20) / 10;
    const k = r.int(2, 40) * 5;
    const T = 2 * Math.PI * Math.sqrt(mass / k);
    return {
      stem: `A ${mass} kg mass oscillates on a spring with ${m(`k = ${k}`)} N/m. What is the period?`,
      ...numOptions(T, "T = 2π√(m/k).", [[2 * Math.PI * Math.sqrt(k / mass), "The ratio is m/k."], [Math.sqrt(mass / k), "Include the 2π."], [1 / T, "That is the frequency."]], "s"),
      explanation: `T = 2π√(${mass}/${k}) = ${num(T)} s.`,
    };
  }),
  tpl("m-pendulum", 7, ["simple-and-physical-pendulums"], ["2"], 2, (r) => {
    const physical = r.next() < 0.5;
    const L = r.int(3, 25) / 10;
    const T = physical ? 2 * Math.PI * Math.sqrt((2 * L) / (3 * G)) : 2 * Math.PI * Math.sqrt(L / G);
    return {
      stem: physical
        ? `A uniform rod of length ${L} m swings about a pivot at one end with small amplitude. What is its period?`
        : `A simple pendulum is ${L} m long. What is its period for small oscillations?`,
      ...numOptions(T, physical ? "T = 2π√(I/(mgd)) with I = mL²/3 and d = L/2." : "T = 2π√(L/g).", physical
        ? [[2 * Math.PI * Math.sqrt(L / G), "A rod is a physical pendulum, not a simple one."], [2 * Math.PI * Math.sqrt(L / (3 * G)), "d is L/2, the distance to the center of mass."], [2 * Math.PI * Math.sqrt((2 * L) / G), "I = mL²/3."]]
        : [[2 * Math.PI * Math.sqrt(G / L), "The ratio is L/g."], [Math.sqrt(L / G), "Include 2π."], [2 * Math.PI * (L / G), "Take the square root."]], "s"),
      explanation: `T = ${num(T)} s.`,
    };
  }),
  tpl("m-shm-energy", 7, ["energy-of-simple-harmonic-oscillators"], ["2"], 3, (r) => {
    const w = r.int(2, 12);
    const A = r.int(5, 20) / 100;
    const x = Number((A * r.int(1, 8) / 10).toFixed(3));
    const v = w * Math.sqrt(A * A - x * x);
    return {
      stem: `A mass on a spring oscillates with angular frequency ${w} rad/s and amplitude ${A} m. What is its speed when it is ${x} m from equilibrium?`,
      ...numOptions(v, "v = ω√(A² − x²), from conservation of energy.", [[w * A, "That is the maximum speed, at x = 0."], [w * (A - x), "Use A² − x² under a square root."], [w * x, "Speed is greatest at equilibrium, not at the ends."]], "m/s"),
      explanation: `v = ${w}√(${A}² − ${x}²) = ${num(v)} m/s.`,
    };
  }),
  tpl("m-shm-max", 7, ["representing-and-analyzing-shm", "defining-simple-harmonic-motion"], ["2"], 2, (r) => {
    const A = r.int(2, 20) / 100;
    const w = r.int(2, 15);
    const askA = r.next() < 0.5;
    return {
      stem: `An oscillator's position is ${m(`x(t) = ${A}\\cos(${w}t)`)} m. What is its maximum ${askA ? "acceleration" : "speed"}?`,
      ...numOptions(askA ? A * w * w : A * w, askA ? "a_max = Aω²." : "v_max = Aω.", askA ? [[A * w, "That is v_max."], [A * w * w * w, "Differentiate twice: Aω²."], [w * w, "Multiply by the amplitude."]] : [[A * w * w, "That is a_max."], [A, "Multiply by ω."], [w / A, "v_max = Aω."]], askA ? "m/s^2" : "m/s"),
      explanation: `${askA ? `a_max = Aω² = ${num(A * w * w)} m/s²` : `v_max = Aω = ${num(A * w)} m/s`}.`,
    };
  }),
  tpl("m-shm-from-equation", 7, ["defining-simple-harmonic-motion", "frequency-and-period-of-shm"], ["2"], 2, (r) => {
    const c = r.pick([4, 9, 16, 25, 36, 49, 64, 81, 100]);
    const w = Math.sqrt(c);
    const T = (2 * Math.PI) / w;
    return {
      stem: `A system obeys ${m(`\\frac{d^2x}{dt^2} = -${c}x`)}. What is the period of its motion?`,
      ...numOptions(T, `ω = √${c} = ${w} rad/s, T = 2π/ω.`, [[(2 * Math.PI) / c, "ω is the square root of the coefficient."], [1 / w, "T = 2π/ω."], [2 * Math.PI * w, "T = 2π/ω, not 2πω."]], "s"),
      explanation: `ω = ${w} rad/s; T = 2π/${w} = ${num(T)} s.`,
    };
  }),
];

