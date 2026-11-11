/*
 * Plain, serializable question data for the exam and practice UIs (client
 * components). Built on the server from the content files by server/exams.ts.
 */

export interface StimulusData {
  id: string;
  title?: string | undefined;
  text?: string | undefined;
  table?: { caption: string; columns: { key: string; label: string; unit?: string | undefined }[]; rows: Record<string, string | number>[] } | undefined;
  image?: { url: string; alt: string; caption?: string | undefined } | undefined;
  source?: string | undefined;
}

export interface McqData {
  type: "mcq";
  id: string;
  /** Unit numbers the question's topics belong to. */
  units: number[];
  topics: string[];
  stimuli: StimulusData[];
  stem: string;
  options: { id: string; text: string; why: string }[];
  answer: string;
  explanation: string;
}

export interface RubricRowData {
  id: string;
  criterion: string;
  example?: string | undefined;
  /** 1 for a point row; the scale's maximum otherwise. */
  max: number;
  levels?: string[] | undefined;
}

export interface FrqData {
  type: "frq";
  id: string;
  units: number[];
  topics: string[];
  stimuli: StimulusData[];
  title: string;
  minutes: number;
  parts: { id: string; prompt: string; rubric: RubricRowData[]; maxPoints: number }[];
}

export type QuestionData = McqData | FrqData;

export interface ExamSectionData {
  /** e.g. "Section I, Part A". */
  label: string;
  type: "mcq" | "frq";
  minutes: number;
  /** Undefined for subjects where calculators are not a question. */
  calculator?: boolean | undefined;
  /** Share of the exam score, in percent. */
  weight: number;
  questions: QuestionData[];
}

export interface ExamData {
  courseId: string;
  courseTitle: string;
  number: number;
  total: number;
  sections: ExamSectionData[];
  unitTitles: Record<number, string>;
  /** Minimum composite (percent) for an estimated 5, 4, 3 and 2. */
  cutoffs: [number, number, number, number];
}

/** Used when a course gives no cut-offs: typical AP conversions. */
export const DEFAULT_CUTOFFS: [number, number, number, number] = [70, 55, 40, 28];

export function estimateApScore(composite: number, cutoffs: readonly number[] = DEFAULT_CUTOFFS): number {
  const index = cutoffs.findIndex((min) => composite >= min);
  return index === -1 ? 1 : 5 - index;
}
