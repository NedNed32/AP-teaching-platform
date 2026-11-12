/*
 * AP Psychology multiple choice built from term groups.
 * Each group holds related terms from one topic. Every term has a definition and one or more
 * scenarios. Questions ask for the term from its definition, the definition from the term, or
 * the term a scenario illustrates. Wrong options are the other terms in the same group.
 */
import type { McqDraft, McqTemplate } from "./types";
import { correct, wrong } from "./types";

/** [term, definition (a noun phrase starting with an article), ...scenarios]. */
export type Term = [string, string, ...string[]];

export interface Group {
  id: string;
  topic: string;
  /** Question added after a scenario that does not end with its own question. */
  ask?: string | undefined;
  terms: Term[];
}

export const g = (id: string, topic: string, terms: Term[], ask?: string): Group => ({ id, topic, terms, ask });

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const stop = (s: string) => (/[.?!]$/.test(s) ? s : `${s}.`);

export function groupTemplates(unit: number, groups: Group[]): McqTemplate[] {
  return groups.map((group) => {
    if (group.terms.length < 4) throw new Error(`Group ${group.id} needs at least four terms.`);
    return {
      key: `psy-u${unit}-${group.id}`,
      unit,
      topics: [group.topic],
      skills: ["1"],
      difficulty: 2,
      calc: false,
      gen(r): McqDraft {
        // The exam is mostly application: about 60% scenarios, 20% each for the two definition forms.
        const i = r.int(0, group.terms.length - 1);
        const [term, def, ...scenes] = group.terms[i]!;
        const roll = r.next();
        const k = scenes.length && roll < 0.6 ? r.int(0, scenes.length - 1) : roll < 0.8 ? -2 : -1;
        const others = r.shuffle(group.terms.filter((_, j) => j !== i)).slice(0, 3);
        const explanation = `${cap(term)} is ${stop(def)}`;
        if (k === -1) {
          return {
            stem: `Which statement best describes ${term}?`,
            correct: correct(cap(def), `This is what ${term} means.`),
            wrong: others.map(([t, d]) => wrong(cap(d), `That describes ${t}.`)),
            explanation,
          };
        }
        const scene = k >= 0 ? scenes[k]! : "";
        const stem = k === -2 ? `Which of the following is best described as ${def}?` : scene.endsWith("?") ? scene : `${scene} ${group.ask ?? "This best illustrates which of the following?"}`;
        return {
          stem,
          correct: correct(cap(term), explanation),
          wrong: others.map(([t, d]) => wrong(cap(t), `${cap(t)} is ${stop(d)}`)),
          explanation,
        };
      },
    };
  });
}
