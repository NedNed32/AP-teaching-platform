import type { CourseExamConfig } from "../build";
import { psychAaq, psychEbq } from "../frq-psych";
import { psychUnit } from "../mcq-psych";

/* AP Psychology: 75 MCQ in 90 min, then 2 FRQs in 70 min (Article Analysis 25 min, Evidence-Based 45 min). */
export const psychology: CourseExamConfig = {
  courseId: "ap-psychology",
  seed: 108000,
  exams: 40,
  units: { 1: psychUnit(1), 2: psychUnit(2), 3: psychUnit(3), 4: psychUnit(4), 5: psychUnit(5) },
  // Each unit is 15–25 percent of the exam.
  mcqSections: [{ calc: null, perUnit: { 1: 15, 2: 15, 3: 15, 4: 15, 5: 15 } }],
  frqSections: [
    { pool: psychAaq, count: 1 },
    { pool: psychEbq, count: 1 },
  ],
  frqMinutes: 35,
};
