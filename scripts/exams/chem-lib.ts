/* Chemistry helpers: atomic masses, a formula parser for molar mass, and reference tables. */

export const MASS: Record<string, number> = {
  H: 1.008, He: 4.003, Li: 6.94, Be: 9.012, B: 10.81, C: 12.01, N: 14.01, O: 16.0, F: 19.0, Ne: 20.18,
  Na: 22.99, Mg: 24.31, Al: 26.98, Si: 28.09, P: 30.97, S: 32.07, Cl: 35.45, Ar: 39.95, K: 39.1, Ca: 40.08,
  Fe: 55.85, Ni: 58.69, Cu: 63.55, Zn: 65.38, Br: 79.9, Ag: 107.87, I: 126.9, Ba: 137.33, Pb: 207.2, Mn: 54.94, Cr: 52.0,
};

/** Counts of each element in a formula like "Ca(OH)2" or "CuSO4". */
export function parseFormula(f: string): Record<string, number> {
  const stack: Record<string, number>[] = [{}];
  const re = /([A-Z][a-z]?|\(|\))(\d*)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(f))) {
    const [, tok, num] = m;
    const n = num ? Number(num) : 1;
    if (tok === "(") stack.push({});
    else if (tok === ")") {
      const top = stack.pop()!;
      const into = stack[stack.length - 1]!;
      for (const [el, c] of Object.entries(top)) into[el] = (into[el] ?? 0) + c * n;
    } else {
      const into = stack[stack.length - 1]!;
      into[tok!] = (into[tok!] ?? 0) + n;
    }
  }
  return stack[0]!;
}
export const molarMass = (f: string) => Object.entries(parseFormula(f)).reduce((s, [el, n]) => s + MASS[el]! * n, 0);

/** Electron configurations in noble-gas notation, with the number of electrons. */
const ORDER: [string, number][] = [["1s", 2], ["2s", 2], ["2p", 6], ["3s", 2], ["3p", 6], ["4s", 2], ["3d", 10], ["4p", 6]];
export function configuration(z: number): string {
  // Cr and Cu are the usual exceptions; avoided by the generators.
  let left = z;
  const parts: string[] = [];
  for (const [sub, cap] of ORDER) {
    if (left <= 0) break;
    const n = Math.min(cap, left);
    parts.push(`${sub}^{${n}}`);
    left -= n;
  }
  return parts.join("\\,");
}

export const SYMBOLS = ["", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"];
export const NAMES = ["", "hydrogen", "helium", "lithium", "beryllium", "boron", "carbon", "nitrogen", "oxygen", "fluorine", "neon", "sodium", "magnesium", "aluminum", "silicon", "phosphorus", "sulfur", "chlorine", "argon", "potassium", "calcium", "scandium", "titanium", "vanadium", "chromium", "manganese", "iron", "cobalt", "nickel", "copper", "zinc", "gallium", "germanium", "arsenic", "selenium", "bromine", "krypton"];

/** Pauling electronegativities for main-group elements used in questions. */
export const EN: Record<string, number> = { H: 2.2, C: 2.55, N: 3.04, O: 3.44, F: 3.98, Cl: 3.16, Br: 2.96, I: 2.66, S: 2.58, P: 2.19, Si: 1.9, B: 2.04, Na: 0.93, K: 0.82, Mg: 1.31, Li: 0.98 };

/** Standard reduction potentials (V) for M^n+ + n e- -> M. */
export const E0: { ion: string; metal: string; n: number; e: number }[] = [
  { ion: "Mg^{2+}", metal: "Mg", n: 2, e: -2.37 },
  { ion: "Al^{3+}", metal: "Al", n: 3, e: -1.66 },
  { ion: "Zn^{2+}", metal: "Zn", n: 2, e: -0.76 },
  { ion: "Fe^{2+}", metal: "Fe", n: 2, e: -0.44 },
  { ion: "Ni^{2+}", metal: "Ni", n: 2, e: -0.25 },
  { ion: "Pb^{2+}", metal: "Pb", n: 2, e: -0.13 },
  { ion: "Cu^{2+}", metal: "Cu", n: 2, e: 0.34 },
  { ion: "Ag+", metal: "Ag", n: 1, e: 0.8 },
];

/** VSEPR data for common molecules. */
export const SHAPES: { f: string; shape: string; angle: string; hyb: string; polar: boolean }[] = [
  { f: "CO2", shape: "linear", angle: "180°", hyb: "sp", polar: false },
  { f: "BF3", shape: "trigonal planar", angle: "120°", hyb: "sp^2", polar: false },
  { f: "SO2", shape: "bent", angle: "slightly less than 120°", hyb: "sp^2", polar: true },
  { f: "CH4", shape: "tetrahedral", angle: "109.5°", hyb: "sp^3", polar: false },
  { f: "NH3", shape: "trigonal pyramidal", angle: "about 107°", hyb: "sp^3", polar: true },
  { f: "H2O", shape: "bent", angle: "about 104.5°", hyb: "sp^3", polar: true },
  { f: "PCl3", shape: "trigonal pyramidal", angle: "about 107°", hyb: "sp^3", polar: true },
  { f: "CCl4", shape: "tetrahedral", angle: "109.5°", hyb: "sp^3", polar: false },
  { f: "HCN", shape: "linear", angle: "180°", hyb: "sp", polar: true },
  { f: "CH2O", shape: "trigonal planar", angle: "about 120°", hyb: "sp^2", polar: true },
  { f: "SiH4", shape: "tetrahedral", angle: "109.5°", hyb: "sp^3", polar: false },
];

export const R_GAS = 0.08206;
export const R_J = 8.314;
export const FARADAY = 96485;
export const ce = (f: string) => `$$\\ce{${f}}$$`;
