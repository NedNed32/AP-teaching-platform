import type { CourseExamConfig } from "../build";
import { statsQ1, statsQ2, statsQ3, statsQ4 } from "../frq-stats";
import { statsUnit1, statsUnit2, statsUnit3, statsUnit4, statsUnit5 } from "../mcq-stats";

/* Revised AP Statistics (first exam May 2027): 42 MCQ in 90 min, then 4 FRQs in 90 min. */
export const statistics: CourseExamConfig = {
  courseId: "ap-statistics",
  seed: 95000,
  exams: 40,
  units: { 1: statsUnit1, 2: statsUnit2, 3: statsUnit3, 4: statsUnit4, 5: statsUnit5 },
  // The revised framework preview does not list unit weights; questions are spread in proportion to topics per unit.
  mcqSections: [{ calc: null, perUnit: { 1: 10, 2: 9, 3: 11, 4: 8, 5: 4 } }],
  frqSections: [statsQ1, statsQ2, statsQ3, statsQ4].map((t) => ({ pool: [t], count: 1 })),
  frqMinutes: 22,
};
