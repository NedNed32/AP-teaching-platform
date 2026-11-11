/*
 * Appends an "On the practice exams" section to every lesson.
 *
 * The section is produced from the same templates that generate the practice
 * exams, so each lesson shows every kind of question the exams ask about its
 * topic: a worked example with the answer, the reasoning, and the mistakes
 * behind each wrong option. Concept pools are listed in full.
 *
 * Run after the lesson builders:  npx tsx scripts/lesson-guides.ts [courseId]
 * It is idempotent: an existing section is replaced.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { courseConfigs } from "./exams/courses";
import { Rng } from "./exams/lib";
import type { FrqDraft, FrqTemplate, McqDraft, McqTemplate, StimulusDraft } from "./exams/types";

const MARKER = "## On the practice exams";
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Makes exam rich text safe for MDX: braces and angle brackets outside code and math are escaped. */
function mdx(text: string): string {
  return text
    .split(/(```[\s\S]*?```|\$\$[\s\S]*?\$\$|`[^`\n]*`)/g)
    .map((part, i) => (i % 2 ? part : part.replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/</g, "&lt;")))
    .join("");
}
const oneLine = (s: string) => mdx(s).replace(/\s*\n+\s*/g, " ").trim();
const cell = (v: string | number) => oneLine(String(v)).replace(/\|/g, "\\|");
const attr = (s: string) => s.replace(/"/g, "'").replace(/[{}<>]/g, "").replace(/\s+/g, " ").trim();

function valid(d: McqDraft) {
  const texts = [d.correct.text, ...d.wrong.map((w) => w.text)];
  return d.wrong.length === 3 && new Set(texts).size === 4 && texts.every((x) => x.trim() && !/NaN|Infinity|undefined/.test(x));
}

interface Shown {
  kind: "pool" | "worked";
  drafts: McqDraft[];
}

/** Draws a template many times and keeps one example per distinct question (pools) or per variant (computed). */
function examples(t: McqTemplate, seed: number): Shown {
  const drafts: McqDraft[] = [];
  for (let s = 1; s <= 260; s++) {
    try {
      const d = t.gen(new Rng(seed + hash(t.key) + s * 7919));
      if (valid(d)) drafts.push(d);
    } catch {
      /* Retry or a degenerate draw: skip */
    }
  }
  const raw = new Map<string, McqDraft>();
  for (const d of drafts) {
    const k = d.stem + (d.stimulus?.text ?? "") + JSON.stringify(d.stimulus?.table ?? "") + (d.stimulus?.svg ? "svg" : "");
    if (!raw.has(k)) raw.set(k, d);
  }
  if (raw.size <= 45) return { kind: "pool", drafts: [...raw.values()] };
  // Computed: one example per variant, identified by the question's last sentence without numbers or names.
  const variants = new Map<string, McqDraft>();
  for (const d of drafts) {
    const last = d.stem.replace(/```[\s\S]*?```/g, "").trim().split(/(?<=[.?:])\s+/).pop() ?? "";
    const sig = last.replace(/\$\$[\s\S]*?\$\$/g, "M").replace(/`[^`]*`/g, "C").replace(/[-+]?\d[\d,.]*/g, "#").replace(/\b[A-Z][a-z]+\b/g, "N").slice(0, 90) + (d.stimulus?.table?.caption ?? "");
    if (!variants.has(sig)) variants.set(sig, d);
    if (variants.size >= 4) break;
  }
  return { kind: "worked", drafts: [...variants.values()] };
}

class Writer {
  private figures = 0;
  constructor(private courseDir: string, private lessonId: string) {}

  stimulus(s: StimulusDraft | undefined): string[] {
    if (!s) return [];
    const out: string[] = [];
    if (s.text) out.push(mdx(s.text), "");
    if (s.table) {
      const cols = s.table.columns;
      out.push(`*${oneLine(s.table.caption)}*`, "");
      out.push(`| ${cols.map((c) => cell(c.label + (c.unit ? ` (${c.unit})` : ""))).join(" | ")} |`);
      out.push(`| ${cols.map(() => "---").join(" | ")} |`);
      for (const row of s.table.rows) out.push(`| ${cols.map((c) => cell(row[c.key] ?? "")).join(" | ")} |`);
      out.push("");
    }
    if (s.svg) {
      const rel = `assets/guides/${this.lessonId}-${++this.figures}.svg`;
      mkdirSync(path.join(this.courseDir, "assets", "guides"), { recursive: true });
      writeFileSync(path.join(this.courseDir, rel), s.svg);
      out.push(`<Figure src="${rel}" alt="${attr(s.alt ?? "Graph for this question.")}" caption="${attr(s.caption ?? "Graph for the question below.")}" />`, "");
    }
    return out;
  }

  worked(d: McqDraft): string[] {
    const why = d.correct.why.replace(/^Correct\.\s*/, "");
    const out = [...this.stimulus(d.stimulus), mdx(d.stem), "", `**Answer:** ${oneLine(d.correct.text)}`, ""];
    if (why) out.push(`**Why:** ${oneLine(why)}`, "");
    if (d.explanation && d.explanation !== why) out.push(`**Working:** ${oneLine(d.explanation)}`, "");
    out.push("**Mistakes to avoid**", "");
    for (const w of d.wrong) out.push(`- ${oneLine(w.text)}: ${oneLine(w.why) || "does not follow from the question."}`);
    out.push("");
    return out;
  }

  fact(d: McqDraft): string[] {
    const why = d.correct.why.replace(/^Correct\.\s*/, "");
    const extra = d.explanation && d.explanation !== why ? ` ${oneLine(d.explanation)}` : "";
    return [...this.stimulus(d.stimulus), `**Q.** ${oneLine(d.stem.replace(/```[\s\S]*?```/g, (m) => m))}`, "", `**A.** ${oneLine(d.correct.text)}. ${oneLine(why)}${extra}`, ""];
  }

  frq(d: FrqDraft): string[] {
    const out = [`### Free-response practice: ${oneLine(d.title)}`, "", ...this.stimulus(d.stimulus)];
    d.parts.forEach((p, i) => {
      out.push(`**(${"abcdefgh"[i]})** ${mdx(p.prompt)}`, "");
      for (const row of p.rubric) {
        const ex = row.example ?? "";
        if (/```|\n/.test(ex)) out.push(`To earn the point: ${oneLine(row.criterion)} Model answer:`, "", mdx(ex), "");
        else out.push(`To earn the point: ${oneLine(row.criterion)}${ex ? ` Model answer: ${oneLine(ex)}` : ""}`, "");
      }
    });
    return out;
  }
}

function frqExample(t: FrqTemplate, seed: number): FrqDraft | null {
  for (let s = 1; s <= 60; s++) {
    try {
      const d = t.gen(new Rng(seed + hash(t.key) + s * 104729));
      if (!/NaN|Infinity|undefined/.test(JSON.stringify(d))) return d;
    } catch {
      /* retry */
    }
  }
  return null;
}

const only = process.argv[2];
let lessons = 0;
let sections = 0;
const report: string[] = [];

for (const config of courseConfigs) {
  if (only && config.courseId !== only) continue;
  const courseDir = path.join(process.cwd(), "content", "courses", config.courseId);
  const course = JSON.parse(readFileSync(path.join(courseDir, "course.json"), "utf8")) as { units: { topics: { id: string }[] }[] };
  rmSync(path.join(courseDir, "assets", "guides"), { recursive: true, force: true });

  const mcq = new Map<string, McqTemplate>();
  for (const list of Object.values(config.units)) for (const t of list) mcq.set(t.key, t);
  const frq = new Map<string, FrqTemplate>();
  for (const sec of config.frqSections) for (const t of sec.pool) frq.set(t.key, t);

  const shown = new Map<string, Shown>();
  for (const t of mcq.values()) shown.set(t.key, examples(t, config.seed));
  const frqShown = new Map<string, FrqDraft | null>();
  for (const t of frq.values()) frqShown.set(t.key, frqExample(t, config.seed));

  let withOwn = 0;
  let borrowed = 0;
  const placed = new Set<string>();
  course.units.forEach((unit, ui) => {
    const unitTemplates = [...mcq.values()].filter((t) => t.unit === ui + 1);
    for (const topic of unit.topics) {
      const file = path.join(courseDir, "lessons", `${topic.id}.mdx`);
      if (!existsSync(file)) continue;
      let own = [...mcq.values()].filter((t) => t.topics.includes(topic.id));
      let intro = "These are the kinds of questions the practice exams ask about this topic. Each has a full answer, the reasoning, and the reason each wrong option is wrong. If you can do all of them without looking, you are ready for this topic on the exams.";
      if (own.length) withOwn++;
      else {
        // No question is tagged with this topic: show related questions from the same unit.
        own = unitTemplates.slice(0, 3);
        intro = "The practice exams do not ask about this topic on its own, but it supports these questions from the same unit. Work through them to see how the ideas are used.";
        if (own.length) borrowed++;
      }
      const frqs = [...frq.values()].filter((t) => t.topics.slice(0, 2).includes(topic.id));
      if (!own.length && !frqs.length) continue;

      for (const t of own) placed.add(t.key);
      for (const t of frqs) if (frqShown.get(t.key)) placed.add(t.key);
      const w = new Writer(courseDir, topic.id);
      const out: string[] = [MARKER, "", intro, ""];
      const worked = own.filter((t) => shown.get(t.key)!.kind === "worked");
      const pools = own.filter((t) => shown.get(t.key)!.kind === "pool");
      if (!worked.length && intro.startsWith("These are")) intro = "These are the facts and ideas the practice exams ask about this topic, each with the answer and the reason. If you can answer all of them without looking, you are ready for this topic on the exams.";
      out[2] = intro;
      let n = 0;
      for (const t of worked) for (const d of shown.get(t.key)!.drafts) out.push(`### Worked exam question ${++n}`, "", ...w.worked(d));
      if (pools.length) {
        out.push("### Facts and ideas the exams test", "", "Cover the answers and test yourself.", "");
        for (const t of pools) for (const d of shown.get(t.key)!.drafts) out.push(...w.fact(d));
      }
      for (const t of frqs) {
        const d = frqShown.get(t.key);
        if (d) out.push(...w.frq(d));
      }
      const text = readFileSync(file, "utf8");
      const at = text.indexOf(`\n${MARKER}`);
      const base = (at >= 0 ? text.slice(0, at) : text).replace(/\s+$/, "");
      writeFileSync(file, `${base}\n\n${out.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd()}\n`);
      lessons++;
      sections += n + pools.length + frqs.length;
    }
  });
  const total = readdirSync(path.join(courseDir, "lessons")).length;
  const missing = [...mcq.keys(), ...frq.keys()].filter((k) => !placed.has(k));
  if (missing.length) report.push(`  NOT IN ANY LESSON (${config.courseId}): ${missing.join(", ")}`);
  report.push(`${config.courseId}: ${total} lessons, ${withOwn} with their own exam questions, ${borrowed} with related unit questions; ${mcq.size} multiple-choice and ${frq.size} free-response question types shown`);
}
console.log(report.join("\n"));
console.log(`Updated ${lessons} lessons with ${sections} worked sections.`);
