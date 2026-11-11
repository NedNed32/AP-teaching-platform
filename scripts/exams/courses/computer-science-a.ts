import type { CourseExamConfig } from "../build";
import { csa2d, csaArrayList, csaClass, csaMethods } from "../frq-csa";
import { csaUnit1, csaUnit2 } from "../mcq-csa-1-2";
import { csaUnit3, csaUnit4 } from "../mcq-csa-3-4";

export const computerScienceA: CourseExamConfig = {
  courseId: "ap-computer-science-a",
  seed: 61000,
  exams: 40,
  units: { 1: csaUnit1, 2: csaUnit2, 3: csaUnit3, 4: csaUnit4 },
  // 42 questions following the unit weightings (15–25, 25–35, 10–18, 30–40 percent).
  mcqSections: [{ calc: null, perUnit: { 1: 8, 2: 12, 3: 6, 4: 16 } }],
  // One of each free-response type, in exam order.
  frqSections: [
    { pool: csaMethods, count: 1 },
    { pool: csaClass, count: 1 },
    { pool: csaArrayList, count: 1 },
    { pool: csa2d, count: 1 },
  ],
  frqMinutes: 22,
};
