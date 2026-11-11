/*
 * Writes AP Biology lesson MDX files from the compact data in unit-*.mjs.
 * Run: node scripts/bio-lessons/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, "../../content/courses/ap-biology/lessons");
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const SOURCES = `sources:
  - title: Biology 2e
    publisher: OpenStax
    url: https://openstax.org/details/books/biology-2e
  - title: AP Biology course and exam description
    publisher: College Board
    url: https://apcentral.collegeboard.org/courses/ap-biology
reviewed: false`;

let n = 0;
for (const f of fs.readdirSync(here).filter((f) => /^unit-\d\.mjs$/.test(f)).sort()) {
  const { lessons } = await import(`./${f}`);
  for (const l of lessons) {
    const fm = [
      "---",
      "objectives:",
      ...l.obj.map((o) => `  - ${q(o)}`),
      "keyTerms:",
      ...l.terms.flatMap(([t, d]) => [`  - term: ${q(t)}`, `    definition: ${q(d)}`]),
      "checks:",
      ...l.checks.flatMap(([a, b]) => [`  - q: ${q(a)}`, `    a: ${q(b)}`]),
      SOURCES,
      "---",
    ].join("\n");
    const parts = [fm, "", l.body.trim(), ""];
    if (l.note) parts.push(`<Note title="${l.note[0]}">\n${l.note[1]}\n</Note>`, "");
    if (l.ex) {
      const [title, problem, steps, answer] = l.ex;
      parts.push(`<WorkedExample title="${title}">\n${problem}\n\n${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n**Answer:** ${answer}\n</WorkedExample>`, "");
    }
    fs.writeFileSync(path.join(out, `${l.id}.mdx`), parts.join("\n"));
    n++;
  }
}
console.log(`wrote ${n} lessons`);
