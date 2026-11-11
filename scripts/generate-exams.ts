/**
 * Generates the practice exams for every course that has an exam config in
 * scripts/exams/courses/, writing content/courses/<id>/questions/exam-NN.json.
 *
 * Every question comes from a template with randomized values; answers and
 * wrong options are computed, so they stay consistent. Output is deterministic.
 *
 *   npm run exams:generate                      (every course)
 *   npm run exams:generate -- ap-calculus-bc    (one course)
 *   npm run exams:generate -- ap-calculus-bc 5  (one exam, for checking)
 *
 * The site maps each exam file onto the mock sections in course.json, in order:
 * each section takes the next questions of its type.
 */
import { buildExams } from "./exams/build";
import { courseConfigs } from "./exams/courses";

const [courseArg, examArg] = process.argv.slice(2);
const configs = courseArg ? courseConfigs.filter((c) => c.courseId === courseArg) : courseConfigs;
if (!configs.length) throw new Error(`No exam config for "${courseArg}". Known: ${courseConfigs.map((c) => c.courseId).join(", ")}`);
for (const config of configs) buildExams(config, examArg ? Number(examArg) : null);
