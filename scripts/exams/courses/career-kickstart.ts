import type { CourseExamConfig } from "../build";
import { bizCanvas, bizConceptApplication, bizDecision, bizPersonalFinance, cyberDeviceAnalysis } from "../frq-cyber-biz";
import { bizUnit1, bizUnit2, bizUnit3, bizUnit4 } from "../mcq-biz";
import { cyberUnit1, cyberUnit2, cyberUnit3, cyberUnit4, cyberUnit5 } from "../mcq-cyber";

/* AP Cybersecurity: 60 MCQ (80 min, all five units) + 1 Device Security Analysis FRQ (50 min). */
export const cybersecurity: CourseExamConfig = {
  courseId: "ap-cybersecurity",
  seed: 93000,
  exams: 40,
  units: { 1: cyberUnit1, 2: cyberUnit2, 3: cyberUnit3, 4: cyberUnit4, 5: cyberUnit5 },
  // The CED weights skills (Analyze Risk, Mitigate Risk, Detect Attacks, 25–40% each), not units, so units are spread evenly.
  mcqSections: [{ calc: null, perUnit: { 1: 12, 2: 12, 3: 12, 4: 12, 5: 12 } }],
  frqSections: [{ pool: [cyberDeviceAnalysis], count: 1 }],
  frqMinutes: 50,
};

/* AP Business with Personal Finance: 60 MCQ (70 min, Units 1–4) + 4 FRQs (90 min). */
export const businessPersonalFinance: CourseExamConfig = {
  courseId: "ap-business-with-personal-finance",
  seed: 94000,
  exams: 40,
  units: { 1: bizUnit1, 2: bizUnit2, 3: bizUnit3, 4: bizUnit4 },
  // Unit weights 20–30, 20–30, 25–35, 15–20 percent; Unit 5 is not on the exam.
  mcqSections: [{ calc: null, perUnit: { 1: 15, 2: 15, 3: 20, 4: 10 } }],
  frqSections: [bizCanvas, bizPersonalFinance, bizConceptApplication, bizDecision].map((t) => ({ pool: [t], count: 1 })),
  frqMinutes: 15,
};
