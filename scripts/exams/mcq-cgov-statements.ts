/* AP Comparative Government: "Which statement about [country] is accurate?" built from the course fact table. */
import { options } from "./csa-lib";
import { COUNTRIES, FACTS } from "./mcq-cgov";
import { Retry, type McqTemplate } from "./types";

export function statementTemplate(unit: number): McqTemplate {
  const facts = FACTS.filter((f) => f.unit === unit);
  return {
    key: `cg-statement-u${unit}`,
    unit,
    topics: [...new Set(facts.flatMap((f) => f.topics))],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const country = r.pick(COUNTRIES);
      const trueFacts = facts.filter((f) => f.yes.includes(country));
      const falseFacts = FACTS.filter((f) => !f.yes.includes(country));
      if (!trueFacts.length || falseFacts.length < 3) throw new Retry();
      const right = r.pick(trueFacts);
      const wrongs = r.sample(falseFacts, 3);
      const cap = (s: string) => `${country} ${s}`;
      return {
        stem: `Which of the following statements about ${country} is accurate?`,
        ...options([cap(right.text), right.why], wrongs.map((f) => [cap(f.text), f.why] as [string, string])),
        explanation: right.why,
      };
    },
  };
}
