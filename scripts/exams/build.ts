/*
 * Course-independent exam builder. A course supplies its templates and a
 * blueprint (how many questions each unit contributes to each section); this
 * writes content/courses/<id>/questions/exam-NN.json and graph assets.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Rng } from "./lib";
import { Retry, type FrqDraft, type FrqTemplate, type McqDraft, type McqTemplate, type StimulusDraft } from "./types";

export interface McqSectionPlan {
  /** true / false: prefer calculator-active / no-calculator templates; null: no preference. */
  calc: boolean | null;
  /** Questions per unit number. */
  perUnit: Record<number, number>;
}

export interface FrqSectionPlan {
  pool: FrqTemplate[];
  count: number;
}

export interface CourseExamConfig {
  courseId: string;
  seed: number;
  exams: number;
  units: Record<number, McqTemplate[]>;
  mcqSections: McqSectionPlan[];
  frqSections: FrqSectionPlan[];
  /** Default minutes for a free-response question when the template sets none. */
  frqMinutes: number;
  /** Keep difficulty roughly ascending within a section. */
  sortByDifficulty?: boolean;
}

type Json = Record<string, unknown>;

function draw<D>(r: Rng, gen: (r: Rng) => D, check: (d: D) => boolean, label: string): D {
  for (let attempt = 0; attempt < 300; attempt++) {
    try {
      const d = gen(r);
      if (check(d)) return d;
    } catch (error) {
      if (!(error instanceof Retry)) throw new Error(`Template ${label}: ${error instanceof Error ? error.stack : String(error)}`);
    }
  }
  throw new Error(`Template ${label} failed to produce a valid question in 300 attempts.`);
}

const validMcq = (d: McqDraft) => {
  const texts = [d.correct.text, ...d.wrong.map((w) => w.text)];
  return d.wrong.length === 3 && new Set(texts).size === 4 && texts.every((x) => x.trim() && !/NaN|Infinity|undefined/.test(x));
};
const validFrq = (d: FrqDraft) => !/NaN|Infinity|undefined/.test(JSON.stringify(d));

function numericValue(text: string): number {
  const match = /-?\d+(\.\d+)?/.exec(text.replace(/\\frac\{(\d+)\}\{(\d+)\}/, (_, a, b) => String(Number(a) / Number(b))));
  return match ? Number(match[0]) : 0;
}

function stimulusJson(id: string, s: StimulusDraft, assets: Map<string, string>): Json {
  const out: Json = { id };
  if (s.text) out.text = s.text;
  if (s.table) out.table = s.table;
  if (s.svg) {
    const file = `assets/exams/${id}.svg`;
    assets.set(file, s.svg);
    out.image = { src: file, alt: s.alt ?? "Graph for this question.", ...(s.caption ? { caption: s.caption } : {}) };
  }
  return out;
}

export function buildExams(config: CourseExamConfig, only: number | null = null) {
  const courseDir = path.join(process.cwd(), "content", "courses", config.courseId);
  const usage = new Map<string, number>();
  const uses = (key: string) => usage.get(key) ?? 0;
  const choose = <T extends { key: string }>(r: Rng, pool: T[], count: number, taken: Set<string>): T[] => {
    const ranked = r.shuffle(pool.filter((p) => !taken.has(p.key))).sort((a, b) => uses(a.key) - uses(b.key));
    const chosen = ranked.slice(0, count);
    for (const c of chosen) {
      usage.set(c.key, uses(c.key) + 1);
      taken.add(c.key);
    }
    return chosen;
  };

  const assetDir = path.join(courseDir, "assets", "exams");
  if (!only) rmSync(assetDir, { recursive: true, force: true });
  mkdirSync(assetDir, { recursive: true });
  mkdirSync(path.join(courseDir, "questions"), { recursive: true });

  let total = 0;
  for (let n = 1; n <= config.exams; n++) {
    const r = new Rng(config.seed + n * 7919);
    const tag = `e${String(n).padStart(2, "0")}`;
    const taken = new Set<string>();
    const stimuli: Json[] = [];
    const questions: Json[] = [];
    const assets = new Map<string, string>();
    const stems = new Set<string>();
    let q = 0;

    for (const section of config.mcqSections) {
      const picked: McqTemplate[] = [];
      for (const [unit, count] of Object.entries(section.perUnit)) {
        if (!count) continue;
        const all = config.units[Number(unit)] ?? [];
        const preferred = section.calc === null ? all : all.filter((t) => t.calc === section.calc);
        const chosen = choose(r, preferred, count, taken);
        if (chosen.length < count) chosen.push(...choose(r, all, count - chosen.length, taken));
        // A unit with fewer templates than slots reuses templates (with new numbers).
        while (chosen.length < count && all.length) chosen.push(r.pick(all));
        if (chosen.length < count) throw new Error(`${config.courseId}: unit ${unit} has no templates.`);
        picked.push(...chosen);
      }
      const ordered =
        config.sortByDifficulty === false
          ? r.shuffle(picked)
          : r.shuffle(picked).sort((a, b) => a.difficulty + r.next() * 1.5 - (b.difficulty + r.next() * 1.5));
      for (const first of ordered) {
        q++;
        const id = `${tag}-q${String(q).padStart(2, "0")}`;
        const sig = (x: McqDraft) => x.stem + (x.stimulus?.text ?? "") + JSON.stringify(x.stimulus?.table ?? "");
        // If a reused template has run out of distinct variants, fall back to another one from the same unit.
        const candidates = [first, ...r.shuffle(config.units[first.unit] ?? []).filter((x) => x !== first)];
        let tpl = first;
        let d: McqDraft | undefined;
        for (const candidate of candidates) {
          try {
            d = draw(r, (rr) => candidate.gen(rr), (x) => validMcq(x) && !stems.has(sig(x)), candidate.key);
            tpl = candidate;
            break;
          } catch (error) {
            if (!(error instanceof Error) || !error.message.includes("failed to produce")) throw error;
          }
        }
        if (!d) throw new Error(`${config.courseId}: no template in unit ${first.unit} could produce another distinct question.`);
        stems.add(sig(d));
        let opts = [{ ...d.correct, right: true }, ...d.wrong.map((w) => ({ ...w, right: false }))];
        opts = d.ordered ? opts.sort((a, b) => numericValue(a.text) - numericValue(b.text)) : r.shuffle(opts);
        const ids = ["a", "b", "c", "d"] as const;
        const question: Json = { id, type: "mcq", topics: tpl.topics, skills: tpl.skills, difficulty: tpl.difficulty };
        if (d.stimulus) {
          const sid = `${id}-s`;
          stimuli.push(stimulusJson(sid, d.stimulus, assets));
          question.stimuli = [sid];
        }
        Object.assign(question, {
          stem: d.stem,
          options: opts.map((o, i) => ({ id: ids[i], text: o.text, why: o.why })),
          answer: ids[opts.findIndex((o) => o.right)],
          explanation: d.explanation,
        });
        questions.push(question);
      }
    }

    let f = 0;
    for (const section of config.frqSections) {
      for (const tpl of choose(r, section.pool, section.count, taken)) {
        f++;
        const id = `${tag}-frq${f}`;
        const d = draw(r, (rr) => tpl.gen(rr), validFrq, tpl.key);
        const sid = `${id}-s`;
        stimuli.push(stimulusJson(sid, d.stimulus, assets));
        questions.push({
          id,
          type: "frq",
          ...(tpl.format ? { format: tpl.format } : {}),
          title: d.title,
          topics: tpl.topics,
          skills: tpl.skills,
          difficulty: tpl.difficulty,
          minutes: tpl.minutes ?? config.frqMinutes,
          stimuli: [sid],
          parts: d.parts.map((p, j) => ({
            id: "abcdefgh"[j],
            prompt: p.prompt,
            rubric: p.rubric.map((row, k) => ({ kind: "point", id: `p${k + 1}`, criterion: row.criterion, ...(row.example ? { example: row.example } : {}) })),
          })),
        });
      }
    }

    if (only && n !== only) continue;
    const file = { $schema: "../../../schema/questions.schema.json", stimuli, questions };
    writeFileSync(path.join(courseDir, "questions", `exam-${String(n).padStart(2, "0")}.json`), JSON.stringify(file, null, 2) + "\n");
    for (const [rel, svg] of assets) writeFileSync(path.join(courseDir, rel), svg);
    total += questions.length;
  }
  const counts = [...usage.entries()].sort((a, b) => a[1] - b[1]);
  console.log(`${config.courseId}: wrote ${only ? 1 : config.exams} exam(s), ${total} questions from ${counts.length} templates (use ${counts[0]?.[1]}–${counts[counts.length - 1]?.[1]}).`);
}
