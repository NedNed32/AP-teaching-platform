/* Basic economic concepts shared by AP Macroeconomics and AP Microeconomics. */
import { F, m } from "./lib";
import { directionChoices, type Dir } from "./econ-lib";
import { correct, Retry, wrong, type McqTemplate } from "./types";

const GOODS: [string, string][] = [
  ["wheat", "cloth"],
  ["cars", "computers"],
  ["corn", "steel"],
  ["coffee", "tea"],
  ["shirts", "shoes"],
  ["bicycles", "chairs"],
];

/** Market events: which curve moves, which way, and why. */
const EVENTS: { market: string; event: string; curve: "D" | "S"; dir: "up" | "down"; why: string }[] = [
  { market: "orange juice", event: "a frost destroys much of the orange crop", curve: "S", dir: "down", why: "fewer oranges raise input costs, decreasing supply" },
  { market: "electric cars", event: "battery technology makes production cheaper", curve: "S", dir: "up", why: "lower production costs increase supply" },
  { market: "movie tickets", event: "the price of streaming subscriptions (a substitute) rises", curve: "D", dir: "up", why: "a pricier substitute increases demand" },
  { market: "hot dog buns", event: "the price of hot dogs (a complement) rises", curve: "D", dir: "down", why: "a pricier complement decreases demand" },
  { market: "used cars", event: "consumer incomes fall and used cars are an inferior good", curve: "D", dir: "up", why: "lower income raises demand for an inferior good" },
  { market: "restaurant meals", event: "consumer incomes rise and restaurant meals are a normal good", curve: "D", dir: "up", why: "higher income raises demand for a normal good" },
  { market: "lumber", event: "the wage paid to sawmill workers rises", curve: "S", dir: "down", why: "a higher input price decreases supply" },
  { market: "smartphones", event: "many new firms enter the market", curve: "S", dir: "up", why: "more sellers increase supply" },
  { market: "gasoline", event: "buyers expect gasoline prices to rise sharply next month", curve: "D", dir: "up", why: "expected higher future prices increase current demand" },
  { market: "sugar", event: "the government places a per-unit tax on sugar producers", curve: "S", dir: "down", why: "a per-unit tax raises costs, decreasing supply" },
  { market: "solar panels", event: "the government gives producers a per-unit subsidy", curve: "S", dir: "up", why: "a subsidy lowers costs, increasing supply" },
  { market: "running shoes", event: "a popular study links running to longer life", curve: "D", dir: "up", why: "a shift in tastes increases demand" },
  { market: "beef", event: "a health scare about red meat spreads", curve: "D", dir: "down", why: "a shift in tastes decreases demand" },
  { market: "winter coats", event: "the population of the region grows rapidly", curve: "D", dir: "up", why: "more buyers increase demand" },
];

export function econBasics(unit: number): McqTemplate[] {
  return [
    {
      key: `econ-ppc-opportunity-cost-u${unit}`,
      unit,
      topics: ["opportunity-cost-and-ppc"],
      skills: ["3"],
      difficulty: 2,
      calc: false,
      gen(r) {
        const [a, b] = r.pick(GOODS);
        const steps = [r.int(2, 4), r.int(4, 7), r.int(7, 12)];
        const bVals = [0, 10, 20, 30];
        const aStart = steps.reduce((s, x) => s + x, 0) + r.int(0, 5);
        const aVals = [aStart, aStart - steps[0]!, aStart - steps[0]! - steps[1]!, aStart - steps[0]! - steps[1]! - steps[2]!];
        const i = r.int(1, 3);
        const lost = aVals[i - 1]! - aVals[i]!;
        const ans = F(lost, 10);
        const w = [F(10, lost), F(aVals[i - 1]!, 10), F(aVals[i]!, bVals[i]!)];
        if (w.some((x) => x.equals(ans)) || new Set(w.map(String)).size < 3) throw new Retry();
        return {
          stimulus: {
            text: `The table shows combinations of ${a} and ${b} an economy can produce with its resources fully employed.`,
            table: {
              caption: "Production possibilities",
              columns: [{ key: "option", label: "Option" }, { key: "a", label: a[0]!.toUpperCase() + a.slice(1) }, { key: "b", label: b[0]!.toUpperCase() + b.slice(1) }],
              rows: aVals.map((v, k) => ({ option: "ABCD"[k]!, a: v, b: bVals[k]! })),
            },
          },
          stem: `Moving from option ${"ABCD"[i - 1]} to option ${"ABCD"[i]}, what is the opportunity cost of each additional unit of ${b}?`,
          correct: correct(`${m(ans)} units of ${a}`, `${lost} units of ${a} are given up for 10 more units of ${b}.`),
          wrong: [
            wrong(`${m(w[0]!)} units of ${a}`, `This inverts the ratio: it is ${b} per unit of ${a}.`),
            wrong(`${m(w[1]!)} units of ${a}`, `This divides the total ${a} at the first option instead of the amount given up.`),
            wrong(`${m(w[2]!)} units of ${a}`, "This divides totals at the new option; opportunity cost uses the changes."),
          ],
          explanation: `Opportunity cost per unit of ${b} = (${a} given up) ÷ (${b} gained) = ${lost} ÷ 10 = $$${ans.tex()}$$. The cost rises along the table, so opportunity cost is increasing.`,
        };
      },
    },
    {
      key: `econ-comparative-advantage-u${unit}`,
      unit,
      topics: ["comparative-advantage"],
      skills: ["3"],
      difficulty: 3,
      calc: false,
      gen(r) {
        const [a, b] = r.pick(GOODS);
        const xa = r.int(2, 12);
        const xb = r.int(2, 12);
        const ya = r.int(2, 12);
        const yb = r.int(2, 12);
        const costX = F(xb, xa); // country X: 1 a costs xb/xa b
        const costY = F(yb, ya);
        if (costX.equals(costY)) throw new Retry();
        const xAdv = costX.value < costY.value; // X has comparative advantage in a
        const lo = costX.value < costY.value ? costX : costY;
        const hi = costX.value < costY.value ? costY : costX;
        if (r.next() < 0.5) {
          const opts = [
            `Country X has a comparative advantage in ${a}, and Country Y in ${b}.`,
            `Country Y has a comparative advantage in ${a}, and Country X in ${b}.`,
            `Country X has a comparative advantage in both goods.`,
            `Neither country can gain from trade.`,
          ];
          const ans = xAdv ? opts[0]! : opts[1]!;
          return {
            stimulus: {
              text: `The table shows the maximum output per worker per day in two countries.`,
              table: {
                caption: "Output per worker per day",
                columns: [{ key: "c", label: "Country" }, { key: "a", label: a }, { key: "b", label: b }],
                rows: [
                  { c: "X", a: xa, b: xb },
                  { c: "Y", a: ya, b: yb },
                ],
              },
            },
            stem: "Which of the following is true?",
            correct: correct(ans, `One unit of ${a} costs ${costX.value.toFixed(2)} ${b} in X and ${costY.value.toFixed(2)} ${b} in Y.`),
            wrong: opts.filter((o) => o !== ans).map((o) => wrong(o, o.includes("both") ? "No country can have a comparative advantage in both goods; opportunity costs are reciprocals." : o.includes("Neither") ? "Different opportunity costs always allow mutually beneficial trade." : "This reverses the comparison of opportunity costs.")),
            explanation: `Compare opportunity costs, not output levels. In X, one ${a} costs $$${costX.tex()}$$ ${b}; in Y, $$${costY.tex()}$$ ${b}. The country with the lower cost has the comparative advantage in ${a}; the other has it in ${b}.`,
          };
        }
        const mid = lo.add(hi).div(2);
        const below = lo.mul(F(1, 2));
        const above = hi.add(1);
        return {
          stimulus: {
            text: `The table shows the maximum output per worker per day in two countries.`,
            table: {
              caption: "Output per worker per day",
              columns: [{ key: "c", label: "Country" }, { key: "a", label: a }, { key: "b", label: b }],
              rows: [
                { c: "X", a: xa, b: xb },
                { c: "Y", a: ya, b: yb },
              ],
            },
          },
          stem: `Which of the following terms of trade, in units of ${b} per unit of ${a}, would benefit both countries?`,
          correct: correct(m(mid), `It lies between the two opportunity costs of ${a}: $$${lo.tex()}$$ and $$${hi.tex()}$$.`),
          wrong: [
            wrong(m(below), "This is below both opportunity costs; the exporter of the good would lose."),
            wrong(m(above), "This is above both opportunity costs; the importer would lose."),
            wrong(m(F(xa + ya, xb + yb)), "Terms of trade come from opportunity costs, not total outputs."),
          ],
          explanation: `Mutually beneficial terms of trade lie strictly between the countries' opportunity costs of ${a}, here $$${lo.tex()}$$ and $$${hi.tex()}$$ units of ${b}.`,
        };
      },
    },
    {
      key: `econ-market-shift-u${unit}`,
      unit,
      topics: ["market-equilibrium", "demand", "supply"],
      skills: ["1", "4"],
      difficulty: 2,
      calc: false,
      gen(r) {
        const e = r.pick(EVENTS);
        const ans: [Dir, Dir] = e.curve === "D" ? [e.dir, e.dir] : [e.dir === "up" ? "down" : "up", e.dir];
        const curveName = `${e.curve === "D" ? "demand" : "supply"} ${e.dir === "up" ? "increases" : "decreases"}`;
        return {
          stem: `In the market for ${e.market}, ${e.event}. What happens to the equilibrium price and quantity of ${e.market}?`,
          ...directionChoices(r, ["Price", "quantity"], ans, `${e.why[0]!.toUpperCase() + e.why.slice(1)}.`),
          explanation: `${e.why[0]!.toUpperCase() + e.why.slice(1)}: ${curveName}. ${e.curve === "D" ? "A demand shift moves price and quantity in the same direction." : "A supply shift moves price and quantity in opposite directions."}`,
        };
      },
    },
    {
      key: `econ-double-shift-u${unit}`,
      unit,
      topics: ["market-equilibrium"],
      skills: ["1", "4"],
      difficulty: 3,
      calc: false,
      gen(r) {
        const dEvents = EVENTS.filter((e) => e.curve === "D");
        const sEvents = EVENTS.filter((e) => e.curve === "S");
        const d = r.pick(dEvents);
        const s = r.pick(sEvents);
        const priceD = d.dir;
        const priceS = s.dir === "up" ? "down" : "up";
        const qtyD = d.dir;
        const qtyS = s.dir;
        const ans: [Dir, Dir] = [priceD === priceS ? priceD : "?", qtyD === qtyS ? qtyD : "?"];
        const market = r.pick(["a typical product market"]);
        void market;
        return {
          stem: `In a competitive market, demand ${d.dir === "up" ? "increases" : "decreases"} and, at the same time, supply ${s.dir === "up" ? "increases" : "decreases"}. Which of the following describes the change in equilibrium?`,
          ...directionChoices(r, ["Price", "quantity"], ans, "Shift each curve separately: one variable moves the same way in both cases, the other depends on the sizes of the shifts."),
          explanation: `The demand shift alone moves price ${priceD === "up" ? "up" : "down"} and quantity ${qtyD === "up" ? "up" : "down"}. The supply shift alone moves price ${priceS === "up" ? "up" : "down"} and quantity ${qtyS === "up" ? "up" : "down"}. Where the effects agree the result is certain; where they conflict it is indeterminate.`,
        };
      },
    },
    {
      key: `econ-ppc-points-u${unit}`,
      unit,
      topics: ["opportunity-cost-and-ppc", "scarcity"],
      skills: ["1", "4"],
      difficulty: 1,
      calc: false,
      gen(r) {
        const items = [
          { s: "Many workers in the economy become unemployed during a recession.", a: "The economy moves to a point inside its PPC.", w: ["The PPC shifts inward.", "The PPC shifts outward.", "The economy moves along its PPC."] },
          { s: "A new technology makes workers in every industry more productive.", a: "The PPC shifts outward.", w: ["The economy moves to a point inside its PPC.", "The PPC shifts inward.", "The economy moves along its PPC."] },
          { s: "A natural disaster destroys a large share of the country's factories.", a: "The PPC shifts inward.", w: ["The PPC shifts outward.", "The economy moves along its PPC.", "The economy moves to a point outside its PPC."] },
          { s: "The economy shifts fully employed resources from producing consumer goods to producing capital goods.", a: "The economy moves along its PPC.", w: ["The PPC shifts outward immediately.", "The PPC shifts inward.", "The economy moves to a point inside its PPC."] },
          { s: "A large wave of skilled immigrants joins the labor force.", a: "The PPC shifts outward.", w: ["The economy moves along its PPC.", "The PPC shifts inward.", "The economy moves to a point inside its PPC."] },
        ];
        const it = r.pick(items);
        return {
          stem: `${it.s} Which of the following best describes the effect on the economy's production possibilities curve (PPC)?`,
          correct: correct(it.a, "This matches whether resources, technology or only their use has changed."),
          wrong: it.w.map((w) => wrong(w, "Ask whether the economy's resources or technology changed (a shift) or only how fully or for what the resources are used (a movement).")),
          explanation: "Changes in the quantity or quality of resources or in technology shift the PPC. Unemployment moves the economy inside the curve; reallocating fully employed resources moves it along the curve.",
        };
      },
    },
    {
      key: `econ-factors-u${unit}`,
      unit,
      topics: ["scarcity"],
      skills: ["1"],
      difficulty: 1,
      calc: false,
      gen(r) {
        const items = [
          { x: "a delivery truck owned by a bakery", a: "Physical capital" },
          { x: "the iron ore in a mine", a: "Land (natural resources)" },
          { x: "the hours a nurse works at a hospital", a: "Labor" },
          { x: "a founder who organizes resources and risks money to start a firm", a: "Entrepreneurship" },
          { x: "a factory's assembly-line robots", a: "Physical capital" },
          { x: "fresh water from a river used to irrigate crops", a: "Land (natural resources)" },
          { x: "the effort of software engineers writing code", a: "Labor" },
        ];
        const it = r.pick(items);
        const all = ["Physical capital", "Land (natural resources)", "Labor", "Entrepreneurship"];
        return {
          stem: `Which factor of production is ${it.x}?`,
          correct: correct(it.a, "This matches the definition of the factor."),
          wrong: all.filter((x) => x !== it.a).map((x) => wrong(x, `Not ${x.toLowerCase()}: ${it.a.toLowerCase()} fits this resource.`)),
          explanation: "Land is natural resources, labor is human effort, physical capital is produced tools and equipment, and entrepreneurship organizes the others and bears risk.",
        };
      },
    },
  ];
}
