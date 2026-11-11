import type { CourseExamConfig } from "../build";
import { cspWr1, cspWr2 } from "../frq-csp";
import { cspCode, cspData, cspDebugging, cspNetworks } from "../mcq-csp-code";
import { cspBigIdea1, cspBigIdea2, cspBigIdea3Concepts, cspBigIdea4, cspBigIdea5 } from "../mcq-csp-concepts";

export const computerSciencePrinciples: CourseExamConfig = {
  courseId: "ap-computer-science-principles",
  seed: 71000,
  exams: 40,
  units: {
    1: [...cspDebugging, ...cspBigIdea1],
    2: [...cspData, ...cspBigIdea2],
    3: [...cspCode, ...cspBigIdea3Concepts],
    4: [...cspNetworks, ...cspBigIdea4],
    5: cspBigIdea5,
  },
  // 70 questions following the big-idea weightings (10–13, 17–22, 30–35, 11–15, 21–26 percent).
  mcqSections: [{ calc: null, perUnit: { 1: 8, 2: 13, 3: 24, 4: 9, 5: 16 } }],
  frqSections: [
    { pool: [cspWr1], count: 1 },
    { pool: [cspWr2], count: 1 },
  ],
  frqMinutes: 30,
};
