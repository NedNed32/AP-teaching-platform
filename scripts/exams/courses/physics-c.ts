import type { CourseExamConfig } from "../build";
import { emLAB, emMR, emQQT, emTBR, mechLAB, mechMR, mechQQT, mechTBR } from "../frq-phys";
import { emUnit1, emUnit2, emUnit3, emUnit4, emUnit5, emUnit6 } from "../mcq-em";
import { mechUnit1, mechUnit2, mechUnit3, mechUnit4, mechUnit5, mechUnit6, mechUnit7 } from "../mcq-mech";

/* Both Physics C exams: 40 MCQ (80 min), then four 25-minute FRQs in the order MR, TBR, LAB, QQT. */
export const physicsCMechanics: CourseExamConfig = {
  courseId: "ap-physics-c-mechanics",
  seed: 91000,
  exams: 40,
  units: { 1: mechUnit1, 2: mechUnit2, 3: mechUnit3, 4: mechUnit4, 5: mechUnit5, 6: mechUnit6, 7: mechUnit7 },
  // Unit weightings 10–15, 20–25, 15–25, 10–20, 10–15, 10–15, 10–15 percent.
  mcqSections: [{ calc: true, perUnit: { 1: 5, 2: 9, 3: 7, 4: 6, 5: 5, 6: 4, 7: 4 } }],
  frqSections: [mechMR, mechTBR, mechLAB, mechQQT].map((t) => ({ pool: [t], count: 1 })),
  frqMinutes: 25,
};

export const physicsCEM: CourseExamConfig = {
  courseId: "ap-physics-c-electricity-and-magnetism",
  seed: 92000,
  exams: 40,
  units: { 1: emUnit1, 2: emUnit2, 3: emUnit3, 4: emUnit4, 5: emUnit5, 6: emUnit6 },
  // Units 8–13: 15–25, 15–25, 10–20, 15–25, 10–20, 10–20 percent.
  mcqSections: [{ calc: true, perUnit: { 1: 8, 2: 7, 3: 6, 4: 8, 5: 6, 6: 5 } }],
  frqSections: [emMR, emTBR, emLAB, emQQT].map((t) => ({ pool: [t], count: 1 })),
  frqMinutes: 25,
};
