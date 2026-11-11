import type { CourseExamConfig } from "../build";
import { chemLong1, chemLong2, chemLong3, chemShort1, chemShort2, chemShort3, chemShort4 } from "../frq-chem";
import { chemUnit1, chemUnit2, chemUnit3, chemUnit4 } from "../mcq-chem-a";
import { chemUnit5, chemUnit6, chemUnit7, chemUnit8, chemUnit9 } from "../mcq-chem-b";

/* AP Chemistry: 60 MCQ in 90 min, then 7 FRQs in 105 min (3 long at 10 points, 4 short at 4 points). */
export const chemistry: CourseExamConfig = {
  courseId: "ap-chemistry",
  seed: 97000,
  exams: 40,
  units: { 1: chemUnit1, 2: chemUnit2, 3: chemUnit3, 4: chemUnit4, 5: chemUnit5, 6: chemUnit6, 7: chemUnit7, 8: chemUnit8, 9: chemUnit9 },
  // Unit weightings 7–9% for most units, 18–22% for Unit 3, 11–15% for Unit 8.
  mcqSections: [{ calc: null, perUnit: { 1: 6, 2: 5, 3: 12, 4: 6, 5: 6, 6: 6, 7: 6, 8: 8, 9: 5 } }],
  frqSections: [chemLong1, chemLong2, chemLong3, chemShort1, chemShort2, chemShort3, chemShort4].map((t) => ({ pool: [t], count: 1 })),
  frqMinutes: 15,
};
