import type { CourseExamConfig } from "../build";
import { macroLong, macroShort } from "../frq-macro";
import { econBasics } from "../mcq-econ-basics";
import { macroUnit2, macroUnit3, macroUnit4, macroUnit5, macroUnit6 } from "../mcq-macro";

export const macroeconomics: CourseExamConfig = {
  courseId: "ap-macroeconomics",
  seed: 41000,
  exams: 40,
  units: { 1: econBasics(1), 2: macroUnit2, 3: macroUnit3, 4: macroUnit4, 5: macroUnit5, 6: macroUnit6 },
  // 60 questions following the unit weightings (5–10, 12–17, 17–27, 18–23, 20–30, 10–13 percent).
  mcqSections: [{ calc: null, perUnit: { 1: 5, 2: 9, 3: 13, 4: 12, 5: 13, 6: 8 } }],
  frqSections: [
    { pool: macroLong, count: 1 },
    { pool: macroShort, count: 2 },
  ],
  frqMinutes: 17,
};
