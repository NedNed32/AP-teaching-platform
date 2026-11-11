/* AP Comparative Government: indicator data sets with hypothetical trend data for four countries. */
import { options } from "./csa-lib";
import { Retry, type McqTemplate } from "./types";

const HYP = ["Country A", "Country B", "Country C", "Country D"];

interface Indicator {
  key: string;
  unit: number;
  topics: string[];
  name: string;
  lo: number;
  hi: number;
  step: number;
  /** What a rising value suggests, and what a falling one suggests. */
  up: string;
  down: string;
}

export const INDICATORS: Indicator[] = [
  { key: "democracy-index", unit: 1, topics: ["democratization", "democracy-vs-authoritarianism"], name: "Democracy index score (0–10, higher = more democratic)", lo: 2, hi: 9, step: 0.1, up: "democratization", down: "democratic backsliding" },
  { key: "trust", unit: 1, topics: ["political-legitimacy", "sustaining-legitimacy"], name: "Citizens who trust the national government (%)", lo: 20, hi: 75, step: 1, up: "rising legitimacy", down: "declining legitimacy" },
  { key: "bills-amended", unit: 2, topics: ["independent-legislatures", "legislative-systems"], name: "Executive bills amended or rejected by the legislature (%)", lo: 2, hi: 45, step: 1, up: "a more independent legislature", down: "a legislature increasingly dominated by the executive" },
  { key: "rulings", unit: 2, topics: ["independent-judiciaries", "judicial-systems"], name: "Major court rulings against the government (per year)", lo: 0, hi: 30, step: 1, up: "greater judicial independence", down: "declining judicial independence" },
  { key: "press", unit: 3, topics: ["civil-rights-and-civil-liberties", "civil-society"], name: "Press freedom score (0–100, higher = more free)", lo: 15, hi: 90, step: 1, up: "expanding civil liberties", down: "restrictions on civil liberties" },
  { key: "protest", unit: 3, topics: ["nature-and-role-of-political-participation", "forces-that-impact-political-participation"], name: "Adults who joined a protest in the past year (%)", lo: 1, hi: 25, step: 1, up: "rising unconventional participation", down: "falling unconventional participation" },
  { key: "parties", unit: 4, topics: ["political-party-systems", "electoral-systems-and-rules"], name: "Effective number of parties in the legislature", lo: 1, hi: 6, step: 0.1, up: "a more fragmented, multiparty system", down: "consolidation toward fewer parties" },
  { key: "largest-party", unit: 4, topics: ["political-party-systems", "role-of-political-party-systems"], name: "Seat share of the largest party (%)", lo: 25, hi: 80, step: 1, up: "growing dominance by one party", down: "increasing competition among parties" },
  { key: "oil-revenue", unit: 5, topics: ["impact-of-natural-resources"], name: "Oil and gas revenue as a share of government revenue (%)", lo: 5, hi: 75, step: 1, up: "greater dependence on resource rents", down: "economic diversification away from resource rents" },
  { key: "aged", unit: 5, topics: ["causes-and-effects-of-demographic-change"], name: "Population aged 65 and over (%)", lo: 3, hi: 25, step: 0.5, up: "population aging", down: "a younger population" },
  { key: "trade", unit: 5, topics: ["impact-of-global-economic-and-technological-forces", "political-responses-to-global-market-forces"], name: "Trade as a share of GDP (%)", lo: 15, hi: 90, step: 1, up: "deeper integration into the global economy", down: "retreat from global trade" },
  { key: "urban", unit: 5, topics: ["impact-of-industrialization-and-economic-development"], name: "Urban population (%)", lo: 20, hi: 85, step: 1, up: "urbanization", down: "a shrinking urban share" },
];

const roundTo = (x: number, step: number) => Number((Math.round(x / step) * step).toFixed(step < 1 ? 1 : 0));
const sign = (x: number) => (x > 0 ? "+" : "");

export function indicatorTemplate(ind: Indicator): McqTemplate {
  return {
    key: `cg-ind-${ind.key}`,
    unit: ind.unit,
    topics: ind.topics,
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const years = [2004, 2009, 2014, 2019, 2024];
      const series = HYP.map(() => {
        let v = ind.lo + r.next() * (ind.hi - ind.lo);
        const drift = (r.next() - 0.5) * (ind.hi - ind.lo) * 0.18;
        return years.map(() => {
          const cur = Math.min(ind.hi, Math.max(ind.lo, v));
          v += drift + (r.next() - 0.5) * (ind.hi - ind.lo) * 0.04;
          return roundTo(cur, ind.step);
        });
      });
      const change = series.map((s) => roundTo(s[4]! - s[0]!, ind.step));
      const latest = series.map((s) => s[4]!);
      const stimulus = {
        text: "The table shows hypothetical data for four countries.",
        table: { caption: ind.name, columns: [{ key: "c", label: "Country" }, ...years.map((y) => ({ key: `y${y}`, label: String(y) }))], rows: HYP.map((c, i) => ({ c, ...Object.fromEntries(years.map((y, k) => [`y${y}`, series[i]![k]!])) })) },
      };
      const uniqueMax = (a: number[]) => a.filter((x) => x === Math.max(...a)).length === 1;
      const kind = r.pick(["largest-change", "highest", "conclusion"]);
      if (kind === "highest") {
        if (!uniqueMax(latest)) throw new Retry();
        const i = latest.indexOf(Math.max(...latest));
        const first = series.map((s) => s[0]!);
        const firstMax = first.indexOf(Math.max(...first));
        return {
          stimulus,
          stem: "Which country had the highest value in 2024?",
          ...options([HYP[i]!, `Its 2024 value (${latest[i]}) is the highest.`], HYP.filter((_, k) => k !== i).map((c) => [c, HYP.indexOf(c) === firstMax ? "It was highest in 2004, not 2024." : "Its 2024 value is lower."] as [string, string])),
          explanation: `2024 values: ${HYP.map((c, k) => `${c} ${latest[k]}`).join(", ")}.`,
        };
      }
      if (kind === "largest-change") {
        const abs = change.map((x) => Math.abs(x));
        if (!uniqueMax(abs)) throw new Retry();
        const i = abs.indexOf(Math.max(...abs));
        return {
          stimulus,
          stem: "Which country's value changed the most between 2004 and 2024?",
          ...options([HYP[i]!, `It changed by ${sign(change[i]!)}${change[i]}, the largest change in either direction.`], HYP.filter((_, k) => k !== i).map((c) => [c, `Its change was ${sign(change[HYP.indexOf(c)]!)}${change[HYP.indexOf(c)]}.`] as [string, string])),
          explanation: `Changes 2004–2024: ${HYP.map((c, k) => `${c} ${sign(change[k]!)}${change[k]}`).join(", ")}.`,
        };
      }
      const i = r.int(0, 3);
      if (Math.abs(change[i]!) < (ind.hi - ind.lo) * 0.08) throw new Retry();
      const rising = change[i]! > 0;
      const alwaysHighest = years.every((_, k) => series.every((s, j) => j === i || s[k]! < series[i]![k]!));
      const alwaysLowest = years.every((_, k) => series.every((s, j) => j === i || s[k]! > series[i]![k]!));
      const rankWrong: [string, string] = !alwaysHighest
        ? [`${HYP[i]} had the highest value of the four countries in every year`, "Check the other countries' values."]
        : !alwaysLowest
          ? [`${HYP[i]} had the lowest value of the four countries in every year`, "Check the other countries' values."]
          : [`The data show the exact cause of the change in ${HYP[i]}`, "Trend data alone cannot establish a cause."];
      return {
        stimulus,
        stem: `Which conclusion about ${HYP[i]} is best supported by the data?`,
        ...options([`The change from ${series[i]![0]} to ${series[i]![4]} is consistent with ${rising ? ind.up : ind.down}`, `The value ${rising ? "rose" : "fell"} over the period.`], [[`The change from ${series[i]![0]} to ${series[i]![4]} is consistent with ${rising ? ind.down : ind.up}`, "Read the direction of the change."], rankWrong, [`The data prove that ${HYP[i]} is a liberal democracy`, "One indicator cannot establish a regime type."]]),
        explanation: `${HYP[i]}: ${series[i]!.join(" → ")}.`,
      };
    },
  };
}

/** One data template per unit that picks one of that unit's indicators at random. */
export function unitDataTemplate(unit: number): McqTemplate {
  const inds = INDICATORS.filter((i) => i.unit === unit);
  const tpls = inds.map(indicatorTemplate);
  return {
    key: `cg-data-u${unit}`,
    unit,
    topics: [...new Set(inds.flatMap((i) => i.topics))],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen: (r) => r.pick(tpls).gen(r),
  };
}
