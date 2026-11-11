import type { CourseExamConfig } from "../build";
import { bioLongExperiment, bioLongGraphing, bioShortConceptual, bioShortData, bioShortInvestigation, bioShortModel } from "../frq-bio";
import { bioUnit1, bioUnit2, bioUnit3, bioUnit4, bioUnit5, bioUnit6, bioUnit7, bioUnit8 } from "../mcq-bio";

export const biology: CourseExamConfig = {
  courseId: "ap-biology",
  seed: 81000,
  exams: 40,
  units: { 1: bioUnit1, 2: bioUnit2, 3: bioUnit3, 4: bioUnit4, 5: bioUnit5, 6: bioUnit6, 7: bioUnit7, 8: bioUnit8 },
  // 60 questions following the unit weightings (8–11, 10–13, 12–16, 10–15, 8–11, 12–16, 13–20, 10–15 percent).
  mcqSections: [{ calc: null, perUnit: { 1: 6, 2: 7, 3: 8, 4: 7, 5: 6, 6: 8, 7: 10, 8: 8 } }],
  // Exam order: two long questions, then four short ones.
  frqSections: [
    { pool: [bioLongExperiment], count: 1 },
    { pool: [bioLongGraphing], count: 1 },
    { pool: [bioShortInvestigation], count: 1 },
    { pool: [bioShortConceptual], count: 1 },
    { pool: [bioShortModel], count: 1 },
    { pool: [bioShortData], count: 1 },
  ],
  frqMinutes: 10,
};
