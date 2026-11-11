import type { CourseExamConfig } from "../build";
import { frqCalc, frqNoCalc } from "../frq";
import { unit1, unit2 } from "../mcq-units-1-2";
import { unit3, unit4, unit5 } from "../mcq-units-3-5";
import { unit6, unit7, unit8 } from "../mcq-units-6-8";

export const calculusAb: CourseExamConfig = {
  courseId: "ap-calculus-ab",
  seed: 20260,
  exams: 40,
  units: { 1: unit1, 2: unit2, 3: unit3, 4: unit4, 5: unit5, 6: unit6, 7: unit7, 8: unit8 },
  // 45 multiple choice following the CED unit weightings.
  mcqSections: [
    { calc: false, perUnit: { 1: 4, 2: 4, 3: 4, 4: 3, 5: 5, 6: 5, 7: 2, 8: 3 } },
    { calc: true, perUnit: { 1: 1, 2: 1, 3: 1, 4: 2, 5: 3, 6: 3, 7: 1, 8: 3 } },
  ],
  frqSections: [
    { pool: frqCalc, count: 2 },
    { pool: frqNoCalc, count: 4 },
  ],
  frqMinutes: 15,
};
