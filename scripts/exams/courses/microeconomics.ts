import type { CourseExamConfig } from "../build";
import { microLong, microShort } from "../frq-micro";
import { microUnit1, microUnit2, microUnit3, microUnit4, microUnit5, microUnit6 } from "../mcq-micro";

export const microeconomics: CourseExamConfig = {
  courseId: "ap-microeconomics",
  seed: 52000,
  exams: 40,
  units: { 1: microUnit1, 2: microUnit2, 3: microUnit3, 4: microUnit4, 5: microUnit5, 6: microUnit6 },
  // 60 questions following the unit weightings (12–15, 20–25, 22–25, 15–22, 10–13, 8–13 percent).
  mcqSections: [{ calc: null, perUnit: { 1: 8, 2: 14, 3: 14, 4: 11, 5: 7, 6: 6 } }],
  frqSections: [
    { pool: microLong, count: 1 },
    { pool: microShort, count: 2 },
  ],
  frqMinutes: 17,
};
