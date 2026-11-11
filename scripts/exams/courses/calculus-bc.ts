import type { CourseExamConfig } from "../build";
import { frqCalc, frqNoCalc } from "../frq";
import { parametricMotion, polarRegion, taylorPolynomialFrq, taylorSeriesFrq } from "../frq-bc";
import { bcUnit10, bcUnit6, bcUnit7, bcUnit8, bcUnit9 } from "../mcq-bc";
import { unit1, unit2 } from "../mcq-units-1-2";
import { unit3, unit4, unit5 } from "../mcq-units-3-5";
import { unit6, unit7, unit8 } from "../mcq-units-6-8";

export const calculusBc: CourseExamConfig = {
  courseId: "ap-calculus-bc",
  seed: 31337,
  exams: 40,
  units: {
    1: unit1,
    2: unit2,
    3: unit3,
    4: unit4,
    5: unit5,
    6: [...unit6, ...bcUnit6],
    7: [...unit7, ...bcUnit7],
    8: [...unit8, ...bcUnit8],
    9: bcUnit9,
    10: bcUnit10,
  },
  // BC weightings: units 1–3 4–7%, 4 6–9%, 5 8–11%, 6 17–20%, 7–8 6–9%, 9 11–12%, 10 17–18%.
  mcqSections: [
    { calc: false, perUnit: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 3, 6: 5, 7: 2, 8: 2, 9: 3, 10: 7 } },
    { calc: true, perUnit: { 2: 1, 4: 1, 5: 1, 6: 3, 7: 1, 8: 2, 9: 2, 10: 4 } },
  ],
  // As on the real exam: one AB-style and one parametric/polar calculator question, then three
  // no-calculator questions and a series question.
  frqSections: [
    { pool: frqCalc, count: 1 },
    { pool: [parametricMotion, polarRegion], count: 1 },
    { pool: frqNoCalc, count: 3 },
    { pool: [taylorSeriesFrq, taylorPolynomialFrq], count: 1 },
  ],
  frqMinutes: 15,
};
