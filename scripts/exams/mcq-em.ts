/* AP Physics C: E&M multiple choice. Units are numbered 1–6 here (the course's Units 8–13). */
import { options } from "./csa-lib";
import { E_CHARGE, EPS0, K, m, MU0, num, numOptions, q, tpl } from "./phys-lib";
import { Retry, type McqTemplate } from "./types";

const uC = (x: number) => x * 1e-6;

/* ---------------- Unit 8: charges, fields, Gauss ---------------- */
export const emUnit1: McqTemplate[] = [
  tpl("e-coulomb", 1, ["electric-charge-and-electric-force"], ["2"], 2, (r) => {
    const q1 = r.int(1, 9);
    const q2 = r.int(1, 9);
    const d = r.int(5, 50) / 100;
    const F = (K * uC(q1) * uC(q2)) / (d * d);
    return {
      stem: `Two point charges of ${q1} µC and −${q2} µC are ${d} m apart. What is the magnitude of the force between them?`,
      ...numOptions(F, "F = k|q₁q₂|/r².", [[(K * uC(q1) * uC(q2)) / d, "Coulomb's law uses r²."], [(K * q1 * q2) / (d * d), "Convert µC to C."], [(K * uC(q1) * uC(q2)) / (4 * d * d), "Use the full separation r."]], "N"),
      explanation: `F = (8.99 × 10⁹)(${q1} × 10⁻⁶)(${q2} × 10⁻⁶)/${d}² = ${num(F)} N, attractive.`,
    };
  }),
  tpl("e-superposition-1d", 1, ["electric-charge-and-electric-force", "electric-fields"], ["2"], 3, (r) => {
    const qa = r.int(1, 9);
    const qb = r.int(1, 9);
    const d = r.int(2, 10) / 10;
    const same = r.next() < 0.5;
    const Ea = (K * uC(qa)) / ((d / 2) ** 2);
    const Eb = (K * uC(qb)) / ((d / 2) ** 2);
    const E = same ? Math.abs(Ea - Eb) : Ea + Eb;
    if (E === 0) throw new Retry();
    return {
      stem: `Charges of +${qa} µC and ${same ? "+" : "−"}${qb} µC are ${d} m apart. What is the magnitude of the electric field at the midpoint between them?`,
      ...numOptions(E, same ? "Like charges' fields point in opposite directions at the midpoint: subtract." : "Opposite charges' fields point the same way at the midpoint: add.", [[same ? Ea + Eb : Math.abs(Ea - Eb), "Check the directions of the two fields at the midpoint."], [(K * uC(qa + qb)) / (d * d), "Each charge is d/2 from the midpoint."], [(same ? Math.abs(Ea - Eb) : Ea + Eb) / 4, "The distance is d/2, so r² = d²/4."]], "N/C"),
      explanation: `Each field is k q/(d/2)²: ${num(Ea)} and ${num(Eb)} N/C, ${same ? "opposite" : "in the same direction"}, giving ${num(E)} N/C.`,
    };
  }),
  tpl("e-zero-field", 1, ["electric-fields"], ["2"], 3, (r) => {
    const ratio = r.pick([4, 9, 16, 25]);
    const s = Math.sqrt(ratio);
    const d = r.int(2, 9);
    const x = (s * d) / (s + 1);
    return {
      stem: `A charge of +${ratio}q is at ${m("x = 0")} and a charge of +q is at ${m(`x = ${d}`)} m. At what point between them is the electric field zero?`,
      ...numOptions(x, `k(${ratio}q)/x² = kq/(${d} − x)².`, [[d / (s + 1), "The zero point is closer to the smaller charge."], [(ratio * d) / (ratio + 1), "Compare r², so take square roots."], [d / 2, "The charges are unequal."]], "m"),
      explanation: `√${ratio}(${d} − x) = x gives x = ${num(x)} m.`,
    };
  }),
  tpl("e-ring-axis", 1, ["electric-fields-of-charge-distributions"], ["2"], 3, (r) => {
    const Q = r.int(1, 9);
    const a = r.int(5, 30) / 100;
    const x = r.int(5, 40) / 100;
    const E = (K * uC(Q) * x) / (x * x + a * a) ** 1.5;
    return {
      stem: `A ring of radius ${a} m carries ${Q} µC spread uniformly. What is the field magnitude on its axis ${x} m from the center?`,
      ...numOptions(E, "E = kQx/(x² + a²)^(3/2).", [[(K * uC(Q)) / (x * x + a * a), "Only the axial components add; the others cancel."], [(K * uC(Q)) / (x * x), "The charge is not at the center."], [(K * uC(Q) * x) / (x * x + a * a), "The denominator has a 3/2 power."]], "N/C"),
      explanation: `E = kQx/(x² + a²)^(3/2) = ${num(E)} N/C.`,
    };
  }),
  tpl("e-line-charge", 1, ["electric-fields-of-charge-distributions", "gausss-law"], ["2"], 2, (r) => {
    const lam = r.int(1, 9);
    const d = r.int(5, 50) / 100;
    const E = (lam * 1e-6) / (2 * Math.PI * EPS0 * d);
    return {
      stem: `A long straight wire carries a uniform charge of ${lam} µC/m. What is the field ${d} m from it?`,
      ...numOptions(E, "E = λ/(2πε₀r), from Gauss's law with a cylinder.", [[(K * lam * 1e-6) / (d * d), "A line charge's field falls off as 1/r."], [(lam * 1e-6) / (4 * Math.PI * EPS0 * d), "The cylinder gives 2πrL, not 4πr²."], [(lam * 1e-6) / (2 * EPS0), "That is a sheet's field."]], "N/C"),
      explanation: `E = λ/(2πε₀r) = ${num(E)} N/C.`,
    };
  }),
  tpl("e-gauss-sphere", 1, ["gausss-law"], ["2"], 3, (r) => {
    const Q = r.int(1, 9);
    const R = r.int(5, 20) / 100;
    const inside = r.next() < 0.6;
    const rr = inside ? Number((R * r.int(2, 8) / 10).toFixed(3)) : Number((R * r.int(12, 30) / 10).toFixed(3));
    const E = inside ? (K * uC(Q) * rr) / R ** 3 : (K * uC(Q)) / (rr * rr);
    return {
      stem: `A solid insulating sphere of radius ${R} m has ${Q} µC distributed uniformly through its volume. What is the field magnitude ${rr} m from its center?`,
      ...numOptions(E, inside ? "Inside, the enclosed charge is Q(r/R)³, so E = kQr/R³." : "Outside, the sphere acts like a point charge.", inside
        ? [[(K * uC(Q)) / (rr * rr), "Only the charge inside radius r counts."], [0, ""], [(K * uC(Q)) / (R * R), "That is the field at the surface."], [(K * uC(Q) * rr * rr) / R ** 4, "q_enc ∝ r³, so E ∝ r."]]
        : [[(K * uC(Q) * rr) / R ** 3, "Outside, all the charge is enclosed."], [(K * uC(Q)) / (R * R), "Use the distance from the center, r."], [(K * uC(Q)) / rr, "E falls off as 1/r²."]], "N/C"),
      explanation: `${inside ? "E = kQr/R³" : "E = kQ/r²"} = ${num(E)} N/C.`,
    };
  }),
  tpl("e-flux", 1, ["electric-flux"], ["2"], 2, (r) => {
    const E = r.int(1, 9) * 100;
    const A = r.int(1, 9) / 10;
    const th = r.pick([0, 30, 45, 60]);
    const phi = E * A * Math.cos((th * Math.PI) / 180);
    if (r.next() < 0.5) {
      const qn = r.int(1, 20);
      const flux = (qn * 1e-9) / EPS0;
      return {
        stem: `A closed surface encloses ${qn} nC of charge. What is the net electric flux through it?`,
        ...numOptions(flux, "Gauss's law: Φ = q_enc/ε₀.", [[qn * 1e-9 * EPS0, "Divide by ε₀."], [(K * qn * 1e-9), "Φ = q/ε₀ = 4πkq."], [(qn * 1e-9) / (4 * Math.PI * EPS0), "Φ = q/ε₀, without 4π."]], "N{\\cdot}m^2/C"),
        explanation: `Φ = q/ε₀ = ${num(flux)} N·m²/C, whatever the surface's shape.`,
      };
    }
    return {
      stem: `A uniform field of ${E} N/C passes through a flat ${A} m² surface whose normal makes ${th}° with the field. What is the flux through the surface?`,
      ...numOptions(phi, "Φ = EA cos θ.", [[E * A * Math.sin((th * Math.PI) / 180), "θ is measured from the normal, so use cos θ."], [E * A, "Account for the angle."], [E / A, "Flux is E times A."]], "N{\\cdot}m^2/C"),
      explanation: `Φ = ${E}(${A}) cos ${th}° = ${num(phi)} N·m²/C.`,
    };
  }),
  tpl("e-share-charge", 1, ["conservation-of-electric-charge-and-the-process-of-charging", "redistribution-of-charge-between-conductors"], ["2"], 2, (r) => {
    const a = r.int(-8, 12);
    const b = r.int(-8, 12);
    const f = (a + b) / 2;
    if (f === a || f === 0) throw new Retry();
    return {
      stem: `Two identical small conducting spheres carry ${a} µC and ${b} µC. They are touched together and separated. What is the charge on each?`,
      ...options([`${num(f)} µC`, "Identical conductors share the total charge equally."], [[`${num(a + b)} µC`, "The total is shared between two spheres."], [`${num((Math.abs(a) + Math.abs(b)) / 2)} µC`, "Add the charges with their signs."], [`${a} µC and ${b} µC`, "Charge flows between touching conductors."], [`0 µC`, "Charge is conserved, not cancelled."]]),
      explanation: `Total ${a + b} µC, split equally: ${num(f)} µC each.`,
    };
  }),
];

/* ---------------- Unit 9: potential ---------------- */
export const emUnit2: McqTemplate[] = [
  tpl("e-potential-sum", 2, ["electric-potential"], ["2"], 2, (r) => {
    const q1 = r.int(1, 9);
    const q2 = r.int(1, 9);
    const r1 = r.int(1, 6) / 10;
    const r2 = r.int(1, 6) / 10;
    const V = K * (uC(q1) / r1 - uC(q2) / r2) * 1e-3;
    if (Math.abs(V) < 1) throw new Retry();
    const Vv = K * (uC(q1) / r1 - uC(q2) / r2);
    return {
      stem: `Point P is ${r1} m from a +${q1} µC charge and ${r2} m from a −${q2} µC charge. What is the electric potential at P?`,
      ...numOptions(Vv, "Potential is a scalar: add kq/r with signs.", [[K * (uC(q1) / r1 + uC(q2) / r2), "The negative charge contributes negative potential."], [K * (uC(q1) / r1 ** 2 - uC(q2) / r2 ** 2), "Potential uses 1/r, not 1/r²."], [-Vv, "Check the signs."]], "V"),
      explanation: `V = k(q₁/r₁ + q₂/r₂) = ${num(Vv)} V.`,
    };
  }),
  tpl("e-accelerated-electron", 2, ["electric-potential", "electric-potential-energy"], ["2"], 2, (r) => {
    const V = r.int(1, 20) * 50;
    const me = 9.11e-31;
    const v = Math.sqrt((2 * E_CHARGE * V) / me);
    return {
      stem: `An electron starts from rest and is accelerated through a potential difference of ${V} V. What is its final speed? (${m("m_e = 9.11 \\times 10^{-31}")} kg)`,
      ...numOptions(v, "eΔV = ½mv².", [[Math.sqrt((E_CHARGE * V) / me), "eV = ½mv², so v = √(2eV/m)."], [(2 * E_CHARGE * V) / me, "Take the square root."], [Math.sqrt((2 * E_CHARGE * V) / 1.67e-27), "Use the electron's mass."]], "m/s"),
      explanation: `v = √(2eV/m) = ${num(v)} m/s.`,
    };
  }),
  tpl("e-work-move", 2, ["electric-potential-energy", "electric-potential"], ["2"], 2, (r) => {
    const qn = r.int(1, 9);
    const Va = r.int(-50, 150);
    const Vb = r.int(-50, 150);
    if (Va === Vb) throw new Retry();
    const W = qn * 1e-6 * (Vb - Va);
    return {
      stem: `How much work must an external agent do to move a +${qn} µC charge slowly from a point at ${Va} V to a point at ${Vb} V?`,
      ...numOptions(W, "W_ext = qΔV = q(V_b − V_a).", [[qn * 1e-6 * (Va - Vb), "ΔV is final minus initial."], [qn * (Vb - Va), "Convert µC to C."], [qn * 1e-6 * (Vb + Va), "Use the difference in potential."]], "J"),
      explanation: `W = (${qn} × 10⁻⁶)(${Vb} − ${Va}) = ${num(W)} J.`,
    };
  }),
  tpl("e-field-from-v", 2, ["equipotentials-and-the-electric-field"], ["2"], 3, (r) => {
    const a = r.int(1, 9) * 10;
    const n = r.int(2, 3);
    const x = r.int(1, 4) / 2;
    const E = -n * a * x ** (n - 1);
    return {
      stem: `The electric potential along the x-axis is ${m(`V(x) = ${a}x^${n}`)} V. What is the x-component of the electric field at ${m(`x = ${x}`)} m?`,
      ...numOptions(E, "E_x = −dV/dx.", [[n * a * x ** (n - 1), "E = −dV/dx: include the minus sign."], [-a * x ** n, "Differentiate V."], [-(a * x ** (n + 1)) / (n + 1), "Differentiate, do not integrate."]], "V/m"),
      explanation: `E_x = −${n * a}x${n === 3 ? "²" : ""} = ${num(E)} V/m.`,
    };
  }),
  tpl("e-pe-system", 2, ["electric-potential-energy"], ["2"], 3, (r) => {
    const qs = [r.nz(-5, 5), r.nz(-5, 5), r.nz(-5, 5)];
    const s = r.int(1, 5) / 10;
    const U = (K * 1e-12 * (qs[0]! * qs[1]! + qs[1]! * qs[2]! + qs[0]! * qs[2]!)) / s;
    if (Math.abs(U) < 1e-6) throw new Retry();
    return {
      stem: `Charges of ${qs.join(" µC, ")} µC sit at the corners of an equilateral triangle with sides ${s} m. What is the system's electric potential energy?`,
      ...numOptions(U, "Add kqᵢqⱼ/r for all three pairs.", [[(K * 1e-12 * (qs[0]! * qs[1]! + qs[1]! * qs[2]!)) / s, "There are three pairs."], [(K * 1e-12 * (qs[0]! * qs[1]! + qs[1]! * qs[2]! + qs[0]! * qs[2]!)) / (s * s), "Potential energy uses 1/r."], [-U, "Keep the signs of the charges."]], "J"),
      explanation: `U = (k/s)(q₁q₂ + q₂q₃ + q₁q₃) = ${num(U)} J.`,
    };
  }),
  tpl("e-uniform-field-v", 2, ["equipotentials-and-the-electric-field"], ["2"], 2, (r) => {
    const V = r.int(1, 20) * 10;
    const d = r.int(1, 10) / 100;
    const E = V / d;
    return {
      stem: `Two parallel plates ${d} m apart have a potential difference of ${V} V. What is the field between them?`,
      ...numOptions(E, "In a uniform field, E = ΔV/d.", [[V * d, "Divide by the separation."], [V / (d * d), "E = V/d."], [d / V, "The ratio is inverted."]], "V/m"),
      explanation: `E = ${V}/${d} = ${num(E)} V/m.`,
    };
  }),
];

/* ---------------- Unit 10: conductors and capacitors ---------------- */
export const emUnit3: McqTemplate[] = [
  tpl("e-plate-capacitor", 3, ["capacitors"], ["2"], 2, (r) => {
    const A = r.int(1, 20) / 100;
    const d = r.int(1, 10) / 1000;
    const kappa = r.pick([1, 1, 2, 3.5, 5]);
    const C = (kappa * EPS0 * A) / d;
    return {
      stem: `A parallel-plate capacitor has plates of area ${A} m² separated by ${d * 1000} mm${kappa > 1 ? `, filled with a dielectric of κ = ${kappa}` : " of air"}. What is its capacitance?`,
      ...numOptions(C, "C = κε₀A/d.", [[(EPS0 * d) / A, "C = ε₀A/d."], [(kappa * EPS0 * A) / (d * 1000), "Convert mm to m."], [kappa > 1 ? (EPS0 * A) / d : (EPS0 * A) / (d * d), kappa > 1 ? "Include the dielectric constant." : "C ∝ 1/d."]], "F"),
      explanation: `C = ${kappa > 1 ? `${kappa}·` : ""}(8.85 × 10⁻¹²)(${A})/(${d}) = ${num(C)} F.`,
    };
  }),
  tpl("e-cap-combo", 3, ["capacitors"], ["2"], 2, (r) => {
    const c1 = r.int(1, 12);
    const c2 = r.int(1, 12);
    const c3 = r.int(1, 12);
    const v = r.int(0, 1);
    const eq = v === 0 ? (c1 * (c2 + c3)) / (c1 + c2 + c3) : c1 + (c2 * c3) / (c2 + c3);
    return {
      stem: v === 0
        ? `A ${c1} µF capacitor is in series with a parallel combination of ${c2} µF and ${c3} µF. What is the equivalent capacitance?`
        : `A ${c1} µF capacitor is in parallel with a series combination of ${c2} µF and ${c3} µF. What is the equivalent capacitance?`,
      ...options([`${num(eq)} µF`, "Capacitors add in parallel; reciprocals add in series."], [[`${num(c1 + c2 + c3)} µF`, "Not all the capacitors are in parallel."], [`${num(v === 0 ? c1 + (c2 * c3) / (c2 + c3) : (c1 * (c2 + c3)) / (c1 + c2 + c3))} µF`, "The series and parallel rules are swapped (they are the reverse of resistors)."], [`${num(1 / (1 / c1 + 1 / c2 + 1 / c3))} µF`, "Not all the capacitors are in series."]]),
      explanation: `C_eq = ${num(eq)} µF.`,
    };
  }),
  tpl("e-cap-energy", 3, ["capacitors"], ["2"], 2, (r) => {
    const C = r.int(1, 50);
    const V = r.int(2, 30) * 5;
    const U = 0.5 * C * 1e-6 * V * V;
    return {
      stem: `A ${C} µF capacitor is charged to ${V} V. How much energy does it store?`,
      ...numOptions(U, "U = ½CV².", [[C * 1e-6 * V * V, "U = ½CV²."], [0.5 * C * 1e-6 * V, "Square the voltage."], [0.5 * C * V * V, "Convert µF to F."]], "J"),
      explanation: `U = ½(${C} × 10⁻⁶)(${V})² = ${num(U)} J.`,
    };
  }),
  tpl("e-dielectric", 3, ["dielectrics", "capacitors"], ["3"], 3, (r) => {
    const kappa = r.pick([2, 3, 4, 5]);
    const connected = r.next() < 0.5;
    const ask = r.pick(["Q", "V", "U"]);
    const factor = connected ? ({ Q: kappa, V: 1, U: kappa } as Record<string, number>)[ask]! : ({ Q: 1, V: 1 / kappa, U: 1 / kappa } as Record<string, number>)[ask]!;
    const name = { Q: "charge", V: "voltage", U: "stored energy" }[ask]!;
    const fmtF = (f: number) => (f === 1 ? "It is unchanged" : f > 1 ? `It is multiplied by ${num(f)}` : `It is divided by ${num(1 / f)}`);
    return {
      stem: `A parallel-plate capacitor is charged and ${connected ? "remains connected to the battery" : "then disconnected from the battery"}. A dielectric with κ = ${kappa} is inserted to fill the gap. What happens to the capacitor's ${name}?`,
      ...options([fmtF(factor), connected ? "With the battery connected, V is fixed and C rises by κ." : "Disconnected, Q is fixed and C rises by κ."], [[fmtF(connected ? (ask === "V" ? kappa : 1 / kappa) : ask === "Q" ? kappa : kappa), "Decide first whether Q or V is held fixed."], [fmtF(1), "Inserting the dielectric changes the capacitance."], [fmtF(kappa * kappa), "Each quantity changes by at most a factor of κ."], [fmtF(1 / (kappa * kappa)), "Each quantity changes by at most a factor of κ."]]),
      explanation: `C becomes κC. ${connected ? "V fixed: Q = CV and U = ½CV² rise by κ." : "Q fixed: V = Q/C and U = Q²/(2C) fall by κ."}`,
    };
  }),
  tpl("e-sphere-share", 3, ["redistribution-of-charge-between-conductors", "electrostatics-with-conductors"], ["2"], 3, (r) => {
    const r1 = r.int(1, 4);
    const r2 = r.int(r1 + 1, 8);
    const Q = r.int(2, 12) * (r1 + r2);
    const q1 = (Q * r1) / (r1 + r2);
    return {
      stem: `A conducting sphere of radius ${r1} cm carrying ${Q} nC is connected by a long thin wire to an uncharged conducting sphere of radius ${r2} cm far away. What charge ends up on the smaller sphere?`,
      ...options([`${num(q1)} nC`, "Connected spheres reach equal potential, so Q ∝ R."], [[`${num(Q / 2)} nC`, "The spheres have different radii."], [`${num(Q - q1)} nC`, "That is the larger sphere's charge."], [`${num((Q * r1 * r1) / (r1 * r1 + r2 * r2))} nC`, "Equal potential gives Q ∝ R, not R²."]]),
      explanation: `kQ₁/R₁ = kQ₂/R₂ with Q₁ + Q₂ = ${Q}: Q₁ = ${num(q1)} nC.`,
    };
  }),
];

/* ---------------- Unit 11: circuits ---------------- */
export const emUnit4: McqTemplate[] = [
  tpl("e-resistivity", 4, ["resistance-resistivity-and-ohms-law"], ["2"], 2, (r) => {
    const rho = r.pick([1.7e-8, 2.8e-8, 1.0e-7, 5.6e-8]);
    const L = r.int(1, 50);
    const dmm = r.int(5, 30) / 10;
    const A = Math.PI * ((dmm / 1000) / 2) ** 2;
    const R = (rho * L) / A;
    return {
      stem: `A wire ${L} m long has a diameter of ${dmm} mm and resistivity ${m(num(rho))} Ω·m. What is its resistance?`,
      ...numOptions(R, "R = ρL/A with A = π(d/2)².", [[(rho * L) / (Math.PI * (dmm / 1000) ** 2), "Use the radius, d/2."], [(rho * A) / L, "R = ρL/A."], [(rho * L) / (Math.PI * (dmm / 2) ** 2), "Convert mm to m."]], "\\Omega"),
      explanation: `A = ${num(A)} m²; R = ${num(R)} Ω.`,
    };
  }),
  tpl("e-mixed-circuit", 4, ["compound-direct-current-circuits"], ["2"], 3, (r) => {
    const R1 = r.int(1, 10);
    const R2 = r.int(2, 12);
    const R3 = r.int(2, 12);
    const V = r.int(6, 24);
    const Rp = (R2 * R3) / (R2 + R3);
    const Req = R1 + Rp;
    const I = V / Req;
    const ask = r.pick(["total", "branch", "req"]);
    const I2 = (I * Rp) / R2;
    const val = ask === "total" ? I : ask === "branch" ? I2 : Req;
    return {
      stem: `A ${R1} Ω resistor is in series with a parallel pair of ${R2} Ω and ${R3} Ω, connected to an ideal ${V} V battery. What is ${ask === "total" ? "the current from the battery" : ask === "branch" ? `the current in the ${R2} Ω resistor` : "the equivalent resistance"}?`,
      ...numOptions(val, "Reduce the parallel pair, add the series resistor, then work back.", ask === "req"
        ? [[R1 + R2 + R3, "R₂ and R₃ are in parallel."], [1 / (1 / R1 + 1 / R2 + 1 / R3), "R₁ is in series."], [R1 + (R2 + R3) / 2, "Parallel: R₂R₃/(R₂ + R₃)."]]
        : ask === "total"
          ? [[V / (R1 + R2 + R3), "R₂ and R₃ are in parallel."], [V / R1, "Use the equivalent resistance."], [V / Rp, "Include R₁."]]
          : [[I / 2, "The branches have different resistances."], [V / R2, "Only part of the battery's voltage is across the pair."], [(I * Rp) / R3, "That is the other branch."]], ask === "req" ? "\\Omega" : "A"),
      explanation: `R_eq = ${R1} + ${num(Rp)} = ${num(Req)} Ω; I = ${num(I)} A; I in ${R2} Ω = ${num(I2)} A.`,
    };
  }),
  tpl("e-power", 4, ["electric-power"], ["2"], 2, (r) => {
    const V = r.int(3, 24) * 5;
    const R = r.int(2, 60);
    const P = (V * V) / R;
    return {
      stem: `A ${R} Ω resistor is connected across ${V} V. What power does it dissipate?`,
      ...numOptions(P, "P = V²/R.", [[V / R, "That is the current."], [V * R, "P = V²/R."], [(V / R) ** 2, "P = I²R = V²/R."]], "W"),
      explanation: `P = ${V}²/${R} = ${num(P)} W.`,
    };
  }),
  tpl("e-internal-resistance", 4, ["simple-circuits"], ["2"], 2, (r) => {
    const emf = r.int(3, 24);
    const ri = r.int(1, 10) / 10;
    const R = r.int(2, 20);
    const I = emf / (R + ri);
    const Vt = emf - I * ri;
    const askV = r.next() < 0.5;
    return {
      stem: `A battery with emf ${emf} V and internal resistance ${ri} Ω is connected to a ${R} Ω resistor. What is ${askV ? "the terminal voltage" : "the current"}?`,
      ...numOptions(askV ? Vt : I, "I = ε/(R + r); V = ε − Ir.", askV
        ? [[emf, "Some voltage is lost across the internal resistance."], [emf + I * ri, "V = ε − Ir."], [I * ri, "That is the internal voltage drop."]]
        : [[emf / R, "Include the internal resistance."], [emf / ri, "The resistances are in series."], [emf * (R + ri), "I = ε/(R + r)."]], askV ? "V" : "A"),
      explanation: `I = ${emf}/${R + ri} = ${num(I)} A; V = ${num(Vt)} V.`,
    };
  }),
  tpl("e-rc", 4, ["resistor-capacitor-rc-circuits"], ["2"], 3, (r) => {
    const Rk = r.int(1, 50) * 10;
    const C = r.int(1, 20);
    const emf = r.int(3, 24);
    const tau = Rk * 1e3 * C * 1e-6;
    const tt = Number((tau * r.pick([0.5, 1, 2, 3])).toPrecision(3));
    const charging = r.next() < 0.5;
    const V = charging ? emf * (1 - Math.exp(-tt / tau)) : emf * Math.exp(-tt / tau);
    return {
      stem: `A ${C} µF capacitor ${charging ? `starts uncharged and is charged through a ${Rk} kΩ resistor by a ${emf} V battery` : `charged to ${emf} V discharges through a ${Rk} kΩ resistor`}. What is the capacitor's voltage after ${tt} s?`,
      ...numOptions(V, `τ = RC = ${num(tau)} s; ${charging ? "V = ε(1 − e^(−t/τ))" : "V = V₀e^(−t/τ)"}.`, [[charging ? emf * Math.exp(-tt / tau) : emf * (1 - Math.exp(-tt / tau)), charging ? "That is the charging resistor's voltage." : "That is the charging curve."], [emf * (charging ? tt / tau : 1 - tt / tau), "The change is exponential, not linear."], [emf * (charging ? 1 - Math.exp(-tt / (tau * 1e3)) : Math.exp(-tt / (tau * 1e3))), "Convert kΩ and µF to Ω and F."]], "V"),
      explanation: `τ = ${num(tau)} s; V = ${num(V)} V.`,
    };
  }),
  tpl("e-loop-rule", 4, ["kirchhoffs-loop-rule", "kirchhoffs-junction-rule"], ["2"], 3, (r) => {
    const e1 = r.int(6, 24);
    const e2 = r.int(1, e1 - 1);
    const R1 = r.int(1, 8);
    const R2 = r.int(1, 8);
    const I = (e1 - e2) / (R1 + R2);
    return {
      stem: `A single loop contains a ${e1} V battery and a ${e2} V battery connected so their emfs oppose each other, plus resistors of ${R1} Ω and ${R2} Ω. What is the current?`,
      ...numOptions(I, "Loop rule: ε₁ − ε₂ − I(R₁ + R₂) = 0.", [[(e1 + e2) / (R1 + R2), "The batteries oppose each other."], [e1 / (R1 + R2), "Include the opposing battery."], [(e1 - e2) / R1, "Both resistors are in the loop."]], "A"),
      explanation: `I = (${e1} − ${e2})/(${R1} + ${R2}) = ${num(I)} A.`,
    };
  }),
  tpl("e-charge-integral", 4, ["electric-current"], ["2"], 2, (r) => {
    const k = r.int(1, 9);
    const n = r.int(1, 2);
    const T = r.int(1, 5);
    const Q = (k * T ** (n + 1)) / (n + 1);
    return {
      stem: `The current in a wire is ${m(`I(t) = ${k}t${n > 1 ? "^2" : ""}`)} A. How much charge passes a point from ${m("t = 0")} to ${m(`t = ${T}`)} s?`,
      ...numOptions(Q, "Q = ∫I dt.", [[k * T ** n, "Integrate the current."], [k * T ** n * T, "The current is not constant."], [k * n * T ** (n - 1), "Integrate, do not differentiate."]], "C"),
      explanation: `Q = ∫I dt = ${num(Q)} C.`,
    };
  }),
];

/* ---------------- Unit 12: magnetism ---------------- */
export const emUnit5: McqTemplate[] = [
  tpl("e-cyclotron-radius", 5, ["magnetism-and-moving-charges"], ["2"], 2, (r) => {
    const proton = r.next() < 0.5;
    const mass = proton ? 1.67e-27 : 9.11e-31;
    const v = r.int(1, 9) * 10 ** (proton ? 5 : 6);
    const B = r.int(1, 20) / 100;
    const R = (mass * v) / (E_CHARGE * B);
    return {
      stem: `${proton ? "A proton" : "An electron"} moves at ${m(num(v))} m/s perpendicular to a uniform ${B} T magnetic field. What is the radius of its path?`,
      ...numOptions(R, "qvB = mv²/r, so r = mv/(qB).", [[(E_CHARGE * B) / (mass * v), "The ratio is inverted."], [(mass * v * v) / (E_CHARGE * B), "r = mv/(qB)."], [((proton ? 9.11e-31 : 1.67e-27) * v) / (E_CHARGE * B), `Use the ${proton ? "proton's" : "electron's"} mass.`]], "m"),
      explanation: `r = mv/(qB) = ${num(R)} m.`,
    };
  }),
  tpl("e-wire-field", 5, ["biot-savart-law", "amperes-law"], ["2"], 2, (r) => {
    const I = r.int(1, 30);
    const d = r.int(1, 20) / 100;
    const B = (MU0 * I) / (2 * Math.PI * d);
    return {
      stem: `A long straight wire carries ${I} A. What is the magnetic field ${d} m from it?`,
      ...numOptions(B, "B = μ₀I/(2πr).", [[(MU0 * I) / (2 * d), "That is the field at the center of a loop."], [(MU0 * I) / (4 * Math.PI * d * d), "A long wire's field falls off as 1/r."], [MU0 * I * d * 2 * Math.PI, "B = μ₀I/(2πr)."]], "T"),
      explanation: `B = (4π × 10⁻⁷)(${I})/(2π·${d}) = ${num(B)} T.`,
    };
  }),
  tpl("e-parallel-wires", 5, ["magnetic-forces-on-current-carrying-wires"], ["2"], 3, (r) => {
    const I1 = r.int(1, 20);
    const I2 = r.int(1, 20);
    const d = r.int(1, 20) / 100;
    const same = r.next() < 0.5;
    const F = (MU0 * I1 * I2) / (2 * Math.PI * d);
    const dir = same ? "attract" : "repel";
    return {
      stem: `Two long parallel wires ${d} m apart carry ${I1} A and ${I2} A in ${same ? "the same direction" : "opposite directions"}. What is the force per meter between them?`,
      ...options([`${q(F, "N/m")}, and the wires ${dir}`, `F/L = μ₀I₁I₂/(2πd); ${same ? "parallel currents attract" : "antiparallel currents repel"}.`], [[`${q(F, "N/m")}, and the wires ${same ? "repel" : "attract"}`, "Parallel currents attract; antiparallel currents repel."], [`${q((MU0 * I1 * I2) / (2 * Math.PI * d * d), "N/m")}, and the wires ${dir}`, "The force per length falls off as 1/d."], [`${q((MU0 * I1 * I2) / (4 * Math.PI * d), "N/m")}, and the wires ${dir}`, "F/L = μ₀I₁I₂/(2πd)."]]),
      explanation: `F/L = ${num(F)} N/m; the wires ${dir}.`,
    };
  }),
  tpl("e-solenoid", 5, ["amperes-law"], ["2"], 2, (r) => {
    const N = r.int(1, 20) * 100;
    const L = r.int(1, 10) / 10;
    const I = r.int(1, 10);
    const B = (MU0 * N * I) / L;
    return {
      stem: `A solenoid ${L} m long has ${N} turns and carries ${I} A. What is the magnetic field inside it?`,
      ...numOptions(B, "B = μ₀nI with n = N/L.", [[MU0 * N * I, "Use turns per meter, N/L."], [(MU0 * N * I) / (2 * Math.PI * L), "That resembles a wire's field; use B = μ₀nI."], [(MU0 * I) / L, "Include the number of turns."]], "T"),
      explanation: `B = μ₀(N/L)I = ${num(B)} T.`,
    };
  }),
  tpl("e-force-wire", 5, ["magnetic-forces-on-current-carrying-wires"], ["2"], 2, (r) => {
    const I = r.int(1, 20);
    const L = r.int(1, 10) / 10;
    const B = r.int(1, 10) / 10;
    const th = r.pick([30, 45, 60, 90]);
    const F = I * L * B * Math.sin((th * Math.PI) / 180);
    return {
      stem: `A ${L} m wire carrying ${I} A makes a ${th}° angle with a uniform ${B} T magnetic field. What is the magnitude of the magnetic force on it?`,
      ...numOptions(F, "F = ILB sin θ.", [[th === 90 ? 2 * I * L * B : I * L * B * Math.cos((th * Math.PI) / 180), th === 90 ? "F = ILB sin θ." : "Use sin θ, from the cross product."], [I * L * B * (th === 90 ? 0.5 : 1), th === 90 ? "At 90°, sin θ = 1." : "Include the angle."], [(I * B) / L, "F = ILB sin θ."]], "N"),
      explanation: `F = ${I}(${L})(${B}) sin ${th}° = ${num(F)} N.`,
    };
  }),
  tpl("e-loop-center", 5, ["biot-savart-law"], ["2"], 2, (r) => {
    const I = r.int(1, 20);
    const R = r.int(2, 20) / 100;
    const N = r.int(1, 50);
    const B = (MU0 * N * I) / (2 * R);
    return {
      stem: `A flat circular coil of ${N} turn${N > 1 ? "s" : ""} and radius ${R} m carries ${I} A. What is the field at its center?`,
      ...numOptions(B, "B = Nμ₀I/(2R).", [[(MU0 * N * I) / (2 * Math.PI * R), "That is a straight wire's field."], [(MU0 * I) / (2 * R), "Include the number of turns."], [(MU0 * N * I) / R, "B = μ₀I/(2R) per turn."]], "T"),
      explanation: `B = ${N}(4π × 10⁻⁷)(${I})/(2·${R}) = ${num(B)} T.`,
    };
  }),
];

/* ---------------- Unit 13: induction ---------------- */
export const emUnit6: McqTemplate[] = [
  tpl("e-faraday", 6, ["faradays-and-lenzs-laws", "magnetic-flux"], ["2"], 2, (r) => {
    const N = r.int(1, 20) * 10;
    const A = r.int(1, 20) / 100;
    const dB = r.int(1, 10) / 10;
    const dt = r.int(1, 10) / 10;
    const emf = (N * A * dB) / dt;
    return {
      stem: `A ${N}-turn coil of area ${A} m² is perpendicular to a magnetic field that changes by ${dB} T in ${dt} s. What is the magnitude of the average induced emf?`,
      ...numOptions(emf, "ε = N ΔΦ/Δt.", [[(A * dB) / dt, "Multiply by the number of turns."], [N * A * dB * dt, "Divide by the time."], [(N * dB) / dt, "Flux includes the area."]], "V"),
      explanation: `ε = ${N}(${A})(${dB})/${dt} = ${num(emf)} V.`,
    };
  }),
  tpl("e-motional", 6, ["faradays-and-lenzs-laws", "induced-currents-and-magnetic-forces"], ["2"], 3, (r) => {
    const B = r.int(1, 10) / 10;
    const L = r.int(1, 10) / 10;
    const v = r.int(1, 20);
    const R = r.int(1, 20);
    const ask = r.pick(["emf", "I", "F"]);
    const emf = B * L * v;
    const I = emf / R;
    const F = I * L * B;
    const val = ask === "emf" ? emf : ask === "I" ? I : F;
    return {
      stem: `A ${L} m conducting rod slides at ${v} m/s along rails connected by a ${R} Ω resistor, perpendicular to a uniform ${B} T field. What is ${ask === "emf" ? "the induced emf" : ask === "I" ? "the induced current" : "the force needed to keep the rod moving at constant speed"}?`,
      ...numOptions(val, "ε = BLv, I = ε/R, F = ILB = B²L²v/R.", ask === "emf"
        ? [[(B * v) / L, "ε = BLv."], [B * L * v * R, "That is not the emf; ε = BLv."], [B * L, "Include the speed."]]
        : ask === "I"
          ? [[B * L * v * R, "Divide the emf by R."], [(B * v) / R, "ε = BLv includes L."], [emf, "That is the emf, in volts."]]
          : [[(B * L * v) / R, "That is the current; F = ILB."], [B * B * L * v, "F = B²L²v/R."], [(B * L * L * v) / R, "F = B²L²v/R."]], ask === "emf" ? "V" : ask === "I" ? "A" : "N"),
      explanation: `ε = ${num(emf)} V, I = ${num(I)} A, F = ${num(F)} N.`,
    };
  }),
  tpl("e-lr", 6, ["resistor-inductor-lr-circuits"], ["2"], 3, (r) => {
    const emf = r.int(3, 24);
    const R = r.int(1, 20);
    const L = r.int(1, 20) / 10;
    const tau = L / R;
    const tt = Number((tau * r.pick([0.5, 1, 2, 3])).toPrecision(3));
    const I = (emf / R) * (1 - Math.exp(-tt / tau));
    return {
      stem: `An ideal ${emf} V battery is connected at ${m("t = 0")} to a ${R} Ω resistor and a ${L} H inductor in series. What is the current at ${m(`t = ${tt}`)} s?`,
      ...numOptions(I, `τ = L/R = ${num(tau)} s; I = (ε/R)(1 − e^(−t/τ)).`, [[emf / R, "The current has not reached its final value."], [(emf / R) * Math.exp(-tt / tau), "The current grows from zero."], [(emf / R) * (1 - Math.exp(-tt * L * R)), "τ = L/R."]], "A"),
      explanation: `I = (${emf}/${R})(1 − e^(−${tt}/${num(tau)})) = ${num(I)} A.`,
    };
  }),
  tpl("e-inductor", 6, ["inductance"], ["2"], 2, (r) => {
    const L = r.int(1, 50) / 100;
    if (r.next() < 0.5) {
      const I = r.int(1, 10);
      const U = 0.5 * L * I * I;
      return {
        stem: `A ${L} H inductor carries ${I} A. How much energy is stored in its magnetic field?`,
        ...numOptions(U, "U = ½LI².", [[L * I * I, "U = ½LI²."], [0.5 * L * I, "Square the current."], [0.5 * I * I, "Include L."]], "J"),
        explanation: `U = ½(${L})(${I})² = ${num(U)} J.`,
      };
    }
    const dI = r.int(1, 10);
    const dt = r.int(1, 20) / 100;
    const emf = (L * dI) / dt;
    return {
      stem: `The current in a ${L} H inductor changes by ${dI} A in ${dt} s. What is the magnitude of the average induced emf?`,
      ...numOptions(emf, "ε = L ΔI/Δt.", [[L * dI * dt, "Divide by Δt."], [dI / (L * dt), "ε = L dI/dt."], [(0.5 * L * dI * dI) / dt, "That is power from energy; use ε = L dI/dt."]], "V"),
      explanation: `ε = ${L}(${dI})/${dt} = ${num(emf)} V.`,
    };
  }),
  tpl("e-lc", 6, ["inductor-capacitor-lc-circuits"], ["2"], 3, (r) => {
    const L = r.int(1, 50);
    const C = r.int(1, 50);
    const w = 1 / Math.sqrt(L * 1e-3 * C * 1e-6);
    const f = w / (2 * Math.PI);
    const askF = r.next() < 0.5;
    return {
      stem: `An LC circuit has a ${L} mH inductor and a ${C} µF capacitor. What is its ${askF ? "frequency f" : "angular frequency ω"} of oscillation?`,
      ...numOptions(askF ? f : w, "ω = 1/√(LC), f = ω/(2π).", askF
        ? [[w, "That is ω; divide by 2π."], [1 / (L * 1e-3 * C * 1e-6) / (2 * Math.PI), "Take the square root of LC."], [Math.sqrt(L * C) / (2 * Math.PI), "Convert mH and µF; ω = 1/√(LC)."]]
        : [[f, "That is f; ω = 2πf."], [1 / (L * 1e-3 * C * 1e-6), "Take the square root."], [Math.sqrt((L * 1e-3) / (C * 1e-6)), "ω = 1/√(LC)."]], askF ? "Hz" : "rad/s"),
      explanation: `ω = 1/√(LC) = ${num(w)} rad/s; f = ${num(f)} Hz.`,
    };
  }),
  tpl("e-flux-wire", 6, ["magnetic-flux"], ["2"], 4, (r) => {
    const I = r.int(1, 20);
    const a = r.int(1, 10) / 100;
    const b = a + r.int(1, 10) / 100;
    const L = r.int(1, 10) / 10;
    const phi = ((MU0 * I * L) / (2 * Math.PI)) * Math.log(b / a);
    return {
      stem: `A rectangular loop of length ${L} m lies in the plane of a long straight wire carrying ${I} A, parallel to it. Its near and far sides are ${a} m and ${b.toFixed(2)} m from the wire. What is the magnetic flux through the loop?`,
      ...numOptions(phi, "Φ = ∫(μ₀I/2πr)L dr = (μ₀IL/2π) ln(b/a).", [[((MU0 * I) / (2 * Math.PI * a)) * L * (b - a), "The field is not uniform across the loop."], [((MU0 * I * L) / (2 * Math.PI)) * (b - a), "Integrate 1/r to get a logarithm."], [((MU0 * I) / (2 * Math.PI * ((a + b) / 2))) * L * (b - a) * 2, "Integrate across the loop."]], "Wb"),
      explanation: `Φ = (μ₀IL/2π) ln(${b.toFixed(2)}/${a}) = ${num(phi)} Wb.`,
    };
  }),
];
