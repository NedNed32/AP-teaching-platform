import type { CourseExamConfig } from "../build";
import { cgovQ1, cgovQ2, cgovQ3, cgovQ4 } from "../frq-cgov";
import { cgovUnit1, cgovUnit2, cgovUnit3, cgovUnit4, cgovUnit5 } from "../mcq-cgov";
import { unitDataTemplate } from "../mcq-cgov-indicators";
import { statementTemplate } from "../mcq-cgov-statements";

// Each unit: country facts, country statements, concept pool, and one data set (the real exam has about five data-based sets).
const withData = (unit: number, base: typeof cgovUnit1) => [...base, statementTemplate(unit), unitDataTemplate(unit)];

/* AP Comparative Government and Politics: 55 MCQ in 60 min, then 4 FRQs in 90 min (10, 20, 20, 40). */
export const comparativeGovernment: CourseExamConfig = {
  courseId: "ap-comparative-government-and-politics",
  seed: 96000,
  exams: 40,
  units: { 1: withData(1, cgovUnit1), 2: withData(2, cgovUnit2), 3: withData(3, cgovUnit3), 4: withData(4, cgovUnit4), 5: withData(5, cgovUnit5) },
  // Unit weightings 18–27, 22–33, 11–18, 13–18, 16–24 percent.
  mcqSections: [{ calc: null, perUnit: { 1: 12, 2: 15, 3: 8, 4: 9, 5: 11 } }],
  frqSections: [cgovQ1, cgovQ2, cgovQ3, cgovQ4].map((t) => ({ pool: [t], count: 1 })),
  frqMinutes: 20,
};
