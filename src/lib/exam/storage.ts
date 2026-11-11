/*
 * Exam attempts are kept in the browser (localStorage) so the exams work in
 * guest mode with no account. Every access is guarded: storage can be missing
 * or blocked (private windows), and the exam must still work for that visit.
 */

export interface Attempt {
  version: 1;
  stage: "section" | "break" | "results";
  /** Index of the current (or next, during a break) section. */
  section: number;
  timed: boolean;
  /** When the current section's time runs out (ms since epoch), if timed. */
  deadline?: number | undefined;
  /** Multiple-choice answers by question id. */
  answers: Record<string, string>;
  flags: string[];
  /** Free-response answers by "questionId:partId". */
  responses: Record<string, string>;
  /** Self-scored rubric points by "questionId:partId:rowId". */
  scores: Record<string, number>;
  startedAt: number;
  finishedAt?: number | undefined;
}

export interface AttemptSummary {
  status: "in-progress" | "done";
  /** Weighted composite, percent (done only). */
  composite?: number | undefined;
  apScore?: number | undefined;
  mcqCorrect?: number | undefined;
  mcqTotal?: number | undefined;
  updatedAt: number;
}

const attemptKey = (course: string, exam: number) => `ap-exam:${course}:${exam}`;
const summaryKey = (course: string) => `ap-exam-summary:${course}`;

function read<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: progress lasts only for this page view.
  }
}

export function loadAttempt(course: string, exam: number): Attempt | null {
  const attempt = read<Attempt>(attemptKey(course, exam));
  return attempt?.version === 1 ? attempt : null;
}

export function saveAttempt(course: string, exam: number, attempt: Attempt | null) {
  write(attemptKey(course, exam), attempt);
}

export function loadSummaries(course: string): Record<number, AttemptSummary> {
  return read<Record<number, AttemptSummary>>(summaryKey(course)) ?? {};
}

export function saveSummary(course: string, exam: number, summary: AttemptSummary | null) {
  const all = loadSummaries(course);
  if (summary) all[exam] = summary;
  else delete all[exam];
  write(summaryKey(course), all);
}
