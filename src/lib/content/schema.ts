import { z } from "zod";

/*
 * The content format: what a course folder may contain. Objects are strict, so a
 * misspelled key is an error rather than silently ignored. JSON Schemas generated
 * from these (npm run content:schema) give editors autocomplete for the JSON files.
 * Cross-file rules (references, unique ids, assets) are checked in load.ts.
 */

/** The College Board's course groups. Each picks an accent colour (`--subject-*`). */
export const SUBJECTS = ["arts", "english", "history", "math-cs", "sciences", "world-languages", "capstone"] as const;
export type Subject = (typeof SUBJECTS)[number];

export const SUBJECT_LABELS: Record<Subject, string> = {
  arts: "Arts",
  english: "English",
  history: "History & Social Sciences",
  "math-cs": "Math & Computer Science",
  sciences: "Sciences",
  "world-languages": "World Languages & Cultures",
  capstone: "AP Capstone",
};

/** `draft`: only in development (or with SHOW_DRAFTS=1). `beta`: public, marked Beta. `live`: public. */
export const COURSE_STATUSES = ["draft", "beta", "live"] as const;
export type CourseStatus = (typeof COURSE_STATUSES)[number];

/** Unit ids that would shadow fixed course routes. */
export const RESERVED_UNIT_IDS = ["practice", "mock"] as const;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const slug = z.string().regex(SLUG, 'Use lowercase letters, digits and single hyphens, e.g. "cell-cycle".');
/** Prefixed with "ap-" so a course URL can never collide with a site page such as /sign-in. */
const courseId = z.string().regex(/^ap-[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Course ids start with "ap-", e.g. "ap-biology".');
const text = z.string().trim().min(1, "Must not be empty.");
const httpsUrl = z.url({ protocol: /^https$/, error: "Use a full https:// link." });
/** A file inside the course's assets/ folder. */
const assetPath = z
  .string()
  .regex(/^assets\/(?!.*\.\.)[A-Za-z0-9._/-]+$/, 'Point into the course\'s assets folder, e.g. "assets/map-1754.png".');

const link = z.strictObject({ label: text, url: httpsUrl });

// ---------------------------------------------------------------------------
// course.json
// ---------------------------------------------------------------------------

export const topicSchema = z.strictObject({
  id: slug,
  /** The CED topic number, e.g. "3.6". Display only, so renumbering in a new CED loses no progress. */
  ced: z
    .string()
    .regex(/^\d+\.\d+$/, 'Use the CED number, e.g. "3.6".')
    .optional(),
  title: text,
  /** One or two sentences, shown on unit pages and above the lesson. */
  summary: text.optional(),
  /** "Go deeper" links, e.g. to the full lesson on a companion site or a free textbook section. */
  links: z.array(link).max(10).optional(),
});

export const unitSchema = z
  .strictObject({
    id: slug,
    title: text,
    /** The CED's exam weighting range in percent, e.g. [8, 11]. */
    examWeight: z.tuple([z.number().min(0).max(100), z.number().min(0).max(100)]).optional(),
    topics: z.array(topicSchema).min(1, "A unit needs at least one topic."),
  })
  .refine((unit) => !unit.examWeight || unit.examWeight[0] <= unit.examWeight[1], {
    message: "examWeight is [lowest, highest].",
    path: ["examWeight"],
  });

export const mockSectionSchema = z.strictObject({
  type: z.enum(["mcq", "frq"]),
  /** Free-response sections only: draw questions of this format (e.g. "saq", "dbq"). */
  format: slug.optional(),
  count: z.int().positive(),
  minutes: z.int().positive(),
  /** Share of the exam score, in percent. */
  weight: z.number().positive().max(100).optional(),
  calculator: z.boolean().optional(),
});

export const courseFileSchema = z.strictObject({
  $schema: z.string().optional(),
  id: courseId,
  title: text,
  /** For tight spaces, e.g. "Calc AB". */
  shortTitle: text.optional(),
  subject: z.enum(SUBJECTS),
  status: z.enum(COURSE_STATUSES),
  description: text,
  /** A site with more depth for this course, e.g. Operon for AP Biology. */
  companion: z.strictObject({ name: text, url: httpsUrl, description: text }).optional(),
  /** The CED's skill categories; questions may tag skills by code. */
  skills: z
    .array(z.strictObject({ code: z.string().regex(/^[0-9A-Za-z.]+$/, 'Use the CED code, e.g. "1" or "2.A".'), name: text }))
    .optional(),
  units: z.array(unitSchema).min(1, "A course needs at least one unit."),
  /** The layout of a full mock exam, from the CED's exam description. */
  mock: z
    .strictObject({
      sections: z.array(mockSectionSchema).min(1),
      /** Minimum weighted composite (percent) for an estimated 5, 4, 3 and 2. */
      cutoffs: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
    })
    .optional(),
});

export type CourseFile = z.infer<typeof courseFileSchema>;
export type UnitFile = z.infer<typeof unitSchema>;
export type TopicFile = z.infer<typeof topicSchema>;
export type MockSection = z.infer<typeof mockSectionSchema>;

// ---------------------------------------------------------------------------
// questions/*.json
// ---------------------------------------------------------------------------

export const dataTableSchema = z
  .strictObject({
    caption: text,
    columns: z.array(z.strictObject({ key: slug, label: text, unit: text.optional() })).min(1),
    rows: z.array(z.record(z.string(), z.union([z.string(), z.number()]))).min(1),
  })
  .superRefine((table, ctx) => {
    const keys = table.columns.map((column) => column.key);
    table.rows.forEach((row, index) => {
      const rowKeys = Object.keys(row);
      const missing = keys.filter((key) => !(key in row));
      const extra = rowKeys.filter((key) => !keys.includes(key));
      if (missing.length || extra.length) {
        ctx.addIssue({
          code: "custom",
          path: ["rows", index],
          message: [missing.length ? `missing ${missing.join(", ")}` : "", extra.length ? `unknown ${extra.join(", ")}` : ""]
            .filter(Boolean)
            .join("; ")
            .concat(" (each row needs exactly the column keys)"),
        });
      }
    });
  });

/** Shared material for one or more questions: a passage, a data table, an image, audio, or a mix. */
export const stimulusSchema = z
  .strictObject({
    id: slug,
    title: text.optional(),
    text: text.optional(),
    table: dataTableSchema.optional(),
    image: z.strictObject({ src: assetPath, alt: text, caption: text.optional() }).optional(),
    audio: z.strictObject({ src: assetPath, transcript: text }).optional(),
    /** Attribution, e.g. "Bartolomé de las Casas, A Short Account of the Destruction of the Indies, 1542". */
    source: text.optional(),
  })
  .refine((s) => s.text || s.table || s.image || s.audio, { message: "A stimulus needs text, a table, an image or audio." });

export const OPTION_IDS = ["a", "b", "c", "d", "e"] as const;
export type OptionId = (typeof OPTION_IDS)[number];

const questionBase = {
  id: slug,
  /** Topic ids from course.json; mastery is credited to each. */
  topics: z.array(slug).min(1, "Tag at least one topic."),
  /** Skill codes from course.json. */
  skills: z.array(z.string()).optional(),
  difficulty: z.int().min(1).max(5),
  /** Stimulus ids, shown above the question in this order. */
  stimuli: z.array(slug).optional(),
};

export const mcqSchema = z
  .strictObject({
    ...questionBase,
    type: z.literal("mcq"),
    stem: text,
    /** Four options, or five for exams that still use five. Ids run a, b, c, d(, e). */
    options: z
      .array(z.strictObject({ id: z.enum(OPTION_IDS), text, why: text }))
      .min(4, "AP questions have 4 or 5 options.")
      .max(5, "AP questions have 4 or 5 options."),
    answer: z.enum(OPTION_IDS),
    explanation: text,
  })
  .superRefine((question, ctx) => {
    const ids = question.options.map((option) => option.id);
    if (ids.some((id, index) => id !== OPTION_IDS[index])) {
      ctx.addIssue({ code: "custom", path: ["options"], message: `Option ids must run ${OPTION_IDS.slice(0, ids.length).join(", ")} in order.` });
    }
    if (!ids.includes(question.answer)) {
      ctx.addIssue({ code: "custom", path: ["answer"], message: `"${question.answer}" is not one of the options.` });
    }
  });

/** One scoring row. `point`: earned or not (1 point). `scale`: 0 to `max` points, one description per level. */
export const rubricRowSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("point"), id: slug, criterion: text, example: text.optional() }),
  z
    .strictObject({
      kind: z.literal("scale"),
      id: slug,
      criterion: text,
      max: z.int().min(1).max(10),
      /** What earns 0, 1, … `max` points, in that order. */
      levels: z.array(text),
    })
    .refine((row) => row.levels.length === row.max + 1, {
      message: "A scale row needs one level description per score, from 0 to max (max + 1 in total).",
      path: ["levels"],
    }),
]);

export const frqPartSchema = z
  .strictObject({
    id: slug,
    prompt: text,
    rubric: z.array(rubricRowSchema).min(1),
    /** Caps the part's score, e.g. "any 2 of these 4 points". Defaults to the rubric total. */
    maxPoints: z.int().positive().optional(),
  })
  .superRefine((part, ctx) => {
    const total = part.rubric.reduce((sum, row) => sum + (row.kind === "point" ? 1 : row.max), 0);
    if (part.maxPoints !== undefined && part.maxPoints > total) {
      ctx.addIssue({ code: "custom", path: ["maxPoints"], message: `maxPoints (${part.maxPoints}) is more than the rubric total (${total}).` });
    }
    const ids = part.rubric.map((row) => row.id);
    const duplicate = ids.find((id, index) => ids.indexOf(id) !== index);
    if (duplicate) ctx.addIssue({ code: "custom", path: ["rubric"], message: `Rubric row id "${duplicate}" is used twice.` });
  });

export const frqSchema = z
  .strictObject({
    ...questionBase,
    type: z.literal("frq"),
    /** The exam's name for this kind of question, e.g. "saq", "dbq", "leq". Plain "frq" if it has none. */
    format: slug.default("frq"),
    title: text,
    minutes: z.int().positive(),
    parts: z.array(frqPartSchema).min(1),
  })
  .superRefine((question, ctx) => {
    const ids = question.parts.map((part) => part.id);
    const duplicate = ids.find((id, index) => ids.indexOf(id) !== index);
    if (duplicate) ctx.addIssue({ code: "custom", path: ["parts"], message: `Part id "${duplicate}" is used twice.` });
  });

export const questionSchema = z.discriminatedUnion("type", [mcqSchema, frqSchema]);

export const questionFileSchema = z.strictObject({
  $schema: z.string().optional(),
  stimuli: z.array(stimulusSchema).default([]),
  questions: z.array(questionSchema).default([]),
});

export type DataTable = z.infer<typeof dataTableSchema>;
export type Stimulus = z.infer<typeof stimulusSchema>;
export type McqQuestion = z.infer<typeof mcqSchema>;
export type FrqQuestion = z.infer<typeof frqSchema>;
export type RubricRow = z.infer<typeof rubricRowSchema>;
export type Question = z.infer<typeof questionSchema>;

// ---------------------------------------------------------------------------
// lessons/<topic-id>.mdx frontmatter
// ---------------------------------------------------------------------------

export const lessonFrontmatterSchema = z.strictObject({
  objectives: z.array(text).optional(),
  keyTerms: z.array(z.strictObject({ term: text, definition: text })).optional(),
  /** Quick self-checks shown at the end, answers hidden until opened. */
  checks: z.array(z.strictObject({ q: text, a: text })).optional(),
  /** Where the facts were checked. The lesson itself is written fresh, not copied. */
  sources: z.array(z.strictObject({ title: text, publisher: text.optional(), url: httpsUrl })).optional(),
  /** Set to true once a teacher or subject expert has checked the lesson. */
  reviewed: z.boolean().default(false),
});

export type LessonFrontmatter = z.infer<typeof lessonFrontmatterSchema>;
