/*
 * Writes lesson MDX files from the compact data in each course folder here (mech, em, cyber, biz, stats, cgov, chem).
 * Run: node scripts/lesson-data/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const COURSES = {
  mech: {
    id: "ap-physics-c-mechanics",
    sources: [
      ["University Physics Volume 1", "OpenStax", "https://openstax.org/details/books/university-physics-volume-1"],
      ["AP Physics C: Mechanics course and exam description", "College Board", "https://apcentral.collegeboard.org/courses/ap-physics-c-mechanics"],
    ],
  },
  em: {
    id: "ap-physics-c-electricity-and-magnetism",
    sources: [
      ["University Physics Volume 2", "OpenStax", "https://openstax.org/details/books/university-physics-volume-2"],
      ["AP Physics C: Electricity and Magnetism course and exam description", "College Board", "https://apcentral.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism"],
    ],
  },
  cyber: {
    id: "ap-cybersecurity",
    sources: [
      ["AP Cybersecurity course and exam description", "College Board", "https://apcentral.collegeboard.org/courses/ap-cybersecurity"],
      ["NICE Workforce Framework for Cybersecurity", "NIST", "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center"],
    ],
  },
  biz: {
    id: "ap-business-with-personal-finance",
    sources: [
      ["AP Business with Personal Finance course and exam description", "College Board", "https://apcentral.collegeboard.org/courses/ap-business-personal-finance"],
      ["Introduction to Business", "OpenStax", "https://openstax.org/details/books/introduction-business"],
    ],
  },
  stats: {
    id: "ap-statistics",
    sources: [
      ["AP Statistics revised course framework", "College Board", "https://apcentral.collegeboard.org/courses/ap-statistics"],
      ["Introductory Statistics 2e", "OpenStax", "https://openstax.org/details/books/introductory-statistics-2e"],
    ],
  },
  cgov: {
    id: "ap-comparative-government-and-politics",
    sources: [
      ["AP Comparative Government and Politics course and exam description", "College Board", "https://apcentral.collegeboard.org/courses/ap-comparative-government-and-politics"],
      ["Introduction to Political Science", "OpenStax", "https://openstax.org/details/books/introduction-political-science"],
    ],
  },
  chem: {
    id: "ap-chemistry",
    sources: [
      ["Chemistry 2e", "OpenStax", "https://openstax.org/details/books/chemistry-2e"],
      ["AP Chemistry course and exam description", "College Board", "https://apcentral.collegeboard.org/courses/ap-chemistry"],
    ],
  },
};

for (const [dir, course] of Object.entries(COURSES)) {
  const out = path.join(here, `../../content/courses/${course.id}/lessons`);
  const src = ["sources:", ...course.sources.flatMap(([t, p, u]) => [`  - title: ${q(t)}`, `    publisher: ${q(p)}`, `    url: ${u}`]), "reviewed: false"].join("\n");
  let n = 0;
  for (const f of fs.readdirSync(path.join(here, dir)).filter((f) => /^unit-\d+\.mjs$/.test(f)).sort()) {
    const { lessons } = await import(`./${dir}/${f}`);
    for (const l of lessons) {
      const fm = [
        "---",
        "objectives:",
        ...l.obj.map((o) => `  - ${q(o)}`),
        "keyTerms:",
        ...l.terms.flatMap(([t, d]) => [`  - term: ${q(t)}`, `    definition: ${q(d)}`]),
        "checks:",
        ...l.checks.flatMap(([a, b]) => [`  - q: ${q(a)}`, `    a: ${q(b)}`]),
        src,
        "---",
      ].join("\n");
      const parts = [fm, "", l.body.trim().replaceAll("§", "`"), ""];
      if (l.note) parts.push(`<Note title="${l.note[0]}">\n${l.note[1]}\n</Note>`, "");
      if (l.ex) {
        const [title, problem, steps, answer] = l.ex;
        parts.push(`<WorkedExample title="${title}">\n${problem}\n\n${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\n**Answer:** ${answer}\n</WorkedExample>`, "");
      }
      fs.writeFileSync(path.join(out, `${l.id}.mdx`), parts.join("\n"));
      n++;
    }
  }
  console.log(`${course.id}: wrote ${n} lessons`);
}
