/* AP Microeconomics multiple-choice templates. */
import { num, pct } from "./econ-lib";
import type { Rng } from "./lib";
import { econBasics } from "./mcq-econ-basics";
import { correct, Retry, wrong, type McqTemplate } from "./types";

const basics1 = econBasics(1).filter((t) => /ppc|comparative|factors/.test(t.key));
const basics2 = econBasics(2).filter((t) => /market-shift|double-shift/.test(t.key));

/** A 2×2 game with random payoffs; returns the matrix and its pure-strategy Nash equilibria. */
function game(r: Rng) {
  const p = [0, 1].map(() => [0, 1].map(() => [r.int(1, 12), r.int(1, 12)] as [number, number]));
  const nash: [number, number][] = [];
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++) {
      const aBest = p[i]![j]![0] >= p[1 - i]![j]![0];
      const bBest = p[i]![j]![1] >= p[i]![1 - j]![1];
      if (aBest && bBest) nash.push([i, j]);
    }
  // Avoid ties, which make dominance and equilibria ambiguous.
  for (let j = 0; j < 2; j++) if (p[0]![j]![0] === p[1]![j]![0]) throw new Retry();
  for (let i = 0; i < 2; i++) if (p[i]![0]![1] === p[i]![1]![1]) throw new Retry();
  const aDom = p[0]![0]![0] > p[1]![0]![0] && p[0]![1]![0] > p[1]![1]![0] ? 0 : p[1]![0]![0] > p[0]![0]![0] && p[1]![1]![0] > p[0]![1]![0] ? 1 : null;
  const bDom = p[0]![0]![1] > p[0]![1]![1] && p[1]![0]![1] > p[1]![1]![1] ? 0 : p[0]![1]![1] > p[0]![0]![1] && p[1]![1]![1] > p[1]![0]![1] ? 1 : null;
  return { p, nash, aDom, bDom };
}

const ROWS = ["Advertise", "Don't advertise"];
const COLS = ["Advertise", "Don't advertise"];

function gameTable(p: [number, number][][], a: string, b: string) {
  return {
    caption: `Payoffs (${a}, ${b})`,
    columns: [
      { key: "row", label: `${a} \\ ${b}` },
      { key: "c0", label: `${b}: ${COLS[0]}` },
      { key: "c1", label: `${b}: ${COLS[1]}` },
    ],
    rows: [0, 1].map((i) => ({ row: `${a}: ${ROWS[i]}`, c0: `(${p[i]![0]![0]}, ${p[i]![0]![1]})`, c1: `(${p[i]![1]![0]}, ${p[i]![1]![1]})` })),
  };
}

export const microUnit1: McqTemplate[] = [
  ...basics1,
  {
    key: "mi-marginal-benefit-cost",
    unit: 1,
    topics: ["cost-benefit-analysis"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const mb = [r.int(40, 60)];
      for (let i = 1; i < 6; i++) mb.push(mb[i - 1]! - r.int(4, 9));
      const mc = [r.int(5, 15)];
      for (let i = 1; i < 6; i++) mc.push(mc[i - 1]! + r.int(4, 9));
      let best = 0;
      for (let i = 0; i < 6; i++) if (mb[i]! >= mc[i]!) best = i + 1;
      if (best < 2 || best > 5) throw new Retry();
      const totals = mb.map((b, i) => b - mc[i]!);
      const firstMax = totals.indexOf(Math.max(...totals)) + 1;
      const opts = [...new Set([best, best - 1, best + 1, firstMax === best ? 6 : firstMax, 1])].filter((x) => x >= 1 && x <= 6).slice(0, 4);
      if (opts.length < 4 || !opts.includes(best)) throw new Retry();
      return {
        stimulus: {
          text: "The table shows the marginal benefit and marginal cost of each unit of an activity.",
          table: {
            caption: "Marginal benefit and marginal cost",
            columns: [{ key: "u", label: "Unit" }, { key: "mb", label: "Marginal benefit" }, { key: "mc", label: "Marginal cost" }],
            rows: mb.map((b, i) => ({ u: i + 1, mb: b, mc: mc[i]! })),
          },
        },
        stem: "How many units should a rational decision-maker choose?",
        ordered: true,
        correct: correct(String(best), `Unit ${best} is the last one whose marginal benefit is at least its marginal cost.`),
        wrong: opts.filter((o) => o !== best).map((o) => wrong(String(o), o < best ? "Stopping here leaves units whose benefit exceeds their cost." : o === firstMax ? "This maximizes the gap for a single unit, not total net benefit." : "This unit costs more than it is worth.")),
        explanation: `Keep going while marginal benefit is at least marginal cost. That holds through unit ${best} (MB ${mb[best - 1]}, MC ${mc[best - 1]}), but not for the next unit.`,
      };
    },
  },
  {
    key: "mi-utility-max",
    unit: 1,
    topics: ["marginal-analysis-consumer-choice"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const pa = r.int(1, 4);
      const pb = r.int(2, 6);
      if (pa === pb) throw new Retry();
      const ra = r.int(4, 10);
      const rb = r.int(4, 10);
      if (ra === rb) throw new Retry();
      const mua = ra * pa;
      const mub = rb * pb;
      const more = ra > rb ? "A" : "B";
      return {
        stem: `A consumer spends her whole budget on goods A and B. For the last units bought, the marginal utility of A is ${mua} with a price of ${pa}, and the marginal utility of B is ${mub} with a price of ${pb}. To maximize utility, she should`,
        correct: correct(`buy more of good ${more} and less of the other good`, `Good A gives ${ra} utils per dollar; good B gives ${rb}.`),
        wrong: [
          wrong(`buy more of good ${more === "A" ? "B" : "A"} and less of the other good`, "Compare marginal utility per dollar, not marginal utility alone."),
          wrong("keep her purchases unchanged", "The marginal utilities per dollar are not equal, so a better bundle exists."),
          wrong(`buy more of the good with the higher marginal utility${mua > mub ? ", A" : ", B"}`, "A higher marginal utility does not mean a better buy if the price is also higher."),
        ],
        explanation: `MU per dollar: A = ${mua} ÷ ${pa} = ${ra}; B = ${mub} ÷ ${pb} = ${rb}. Shift spending toward ${more} until the ratios are equal.`,
      };
    },
  },
  {
    key: "mi-economic-systems",
    unit: 1,
    topics: ["resource-allocation-economic-systems"],
    skills: ["1"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const items = [
        { s: "Prices determined by supply and demand guide what is produced.", a: "Market economy" },
        { s: "A central planning agency sets production targets for every factory.", a: "Command economy" },
        { s: "Most goods are sold in markets, but the government provides schools and regulates pollution.", a: "Mixed economy" },
      ];
      const it = r.pick(items);
      const all = ["Market economy", "Command economy", "Mixed economy", "Barter economy"];
      return {
        stem: `${it.s} Which economic system does this describe?`,
        correct: correct(it.a, "This matches who makes the key allocation decisions."),
        wrong: all.filter((a) => a !== it.a).map((a) => wrong(a, a === "Barter economy" ? "Barter describes exchange without money, not a system of allocation." : "Decide who answers what, how and for whom: markets, planners, or a mix.")),
        explanation: "Market economies rely on prices and private decisions; command economies on central planning; mixed economies combine markets with government roles.",
      };
    },
  },
];

export const microUnit2: McqTemplate[] = [
  ...basics2,
  {
    key: "mi-elasticity-midpoint",
    unit: 2,
    topics: ["price-elasticity-of-demand"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const p1 = r.int(2, 10) * 2;
      const p2 = p1 + r.int(1, 4) * 2;
      const q1 = r.int(10, 40) * 10;
      const q2 = q1 - r.int(1, 15) * 10;
      if (q2 <= 0) throw new Retry();
      const e = ((q1 - q2) / ((q1 + q2) / 2)) / ((p2 - p1) / ((p1 + p2) / 2));
      const simple = ((q1 - q2) / q1) / ((p2 - p1) / p1);
      const inv = 1 / e;
      const kind = e > 1 ? "elastic" : e < 1 ? "inelastic" : "unit elastic";
      const opts = [`${e.toFixed(2)}, ${kind}`, `${inv.toFixed(2)}, ${inv > 1 ? "elastic" : "inelastic"}`, `${e.toFixed(2)}, ${e > 1 ? "inelastic" : "elastic"}`, `${simple.toFixed(2)}, ${simple > 1 ? "elastic" : "inelastic"}`];
      if (new Set(opts).size < 4 || Math.abs(e - 1) < 0.03) throw new Retry();
      return {
        stem: `When the price of a good rises from ${p1} to ${p2}, the quantity demanded falls from ${q1} to ${q2}. Using the midpoint method, what is the price elasticity of demand, and is demand elastic or inelastic?`,
        correct: correct(opts[0]!, "Percentage changes use the averages of the two values."),
        wrong: [
          wrong(opts[1]!, "This divides the percentage change in price by the percentage change in quantity: upside down."),
          wrong(opts[2]!, "The value is right but the classification is wrong: elastic means greater than 1."),
          wrong(opts[3]!, "This uses the starting values instead of the midpoint method."),
        ],
        explanation: `%ΔQ = ${q1 - q2} ÷ ${(q1 + q2) / 2} ≈ ${(((q1 - q2) / ((q1 + q2) / 2)) * 100).toFixed(1)}%; %ΔP = ${p2 - p1} ÷ ${(p1 + p2) / 2} ≈ ${(((p2 - p1) / ((p1 + p2) / 2)) * 100).toFixed(1)}%. Elasticity ≈ ${e.toFixed(2)}, so demand is ${kind}.`,
      };
    },
  },
  {
    key: "mi-total-revenue-test",
    unit: 2,
    topics: ["price-elasticity-of-demand"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const raise = r.next() < 0.5;
      const elastic = r.next() < 0.5;
      const trUp = raise !== elastic;
      return {
        stem: `A firm ${raise ? "raises" : "lowers"} its price and finds that its total revenue ${trUp ? "increases" : "decreases"}. Over this range, demand for its product is`,
        correct: correct(elastic ? "price elastic" : "price inelastic", elastic ? "Price and total revenue moved in opposite directions." : "Price and total revenue moved in the same direction."),
        wrong: [
          wrong(elastic ? "price inelastic" : "price elastic", "Use the total revenue test: same direction means inelastic, opposite means elastic."),
          wrong("unit elastic", "With unit elastic demand, total revenue would not change."),
          wrong("perfectly elastic", "With perfectly elastic demand, any price increase would lose all sales."),
        ],
        explanation: `Price ${raise ? "rose" : "fell"} and total revenue ${trUp ? "rose" : "fell"}. ${elastic ? "Opposite movements mean quantity changed by a larger percentage than price: elastic." : "Same-direction movements mean quantity changed by a smaller percentage than price: inelastic."}`,
      };
    },
  },
  {
    key: "mi-other-elasticities",
    unit: 2,
    topics: ["other-elasticities"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const dx = r.int(2, 10) * 5;
      const dq = r.nz(-8, 8) * 5;
      const e = dq / dx;
      if (r.next() < 0.5) {
        const type = e > 0 ? "substitutes" : "complements";
        return {
          stem: `When the price of good Y rises by ${dx}%, the quantity demanded of good X ${dq > 0 ? "rises" : "falls"} by ${Math.abs(dq)}%. What is the cross-price elasticity, and how are the goods related?`,
          correct: correct(`${Number(e.toFixed(2))}; ${type}`, e > 0 ? "A positive cross-price elasticity means substitutes." : "A negative cross-price elasticity means complements."),
          wrong: [
            wrong(`${Number(e.toFixed(2))}; ${e > 0 ? "complements" : "substitutes"}`, "The sign tells the relationship: positive for substitutes, negative for complements."),
            wrong(`${Number((1 / e).toFixed(2))}; ${type}`, "The percentage change in quantity goes on top."),
            wrong(`${Number(Math.abs(e).toFixed(2))}; unrelated goods`, "Unrelated goods have a cross-price elasticity of zero; keep the sign."),
          ],
          explanation: `Cross-price elasticity = %ΔQx ÷ %ΔPy = ${dq} ÷ ${dx} = ${Number(e.toFixed(2))}.`,
        };
      }
      const type = e > 1 ? "a normal good (luxury)" : e > 0 ? "a normal good (necessity)" : "an inferior good";
      return {
        stem: `When consumer income rises by ${dx}%, the quantity demanded of a good ${dq > 0 ? "rises" : "falls"} by ${Math.abs(dq)}%. The good is`,
        correct: correct(type, `Income elasticity = ${dq} ÷ ${dx} = ${Number(e.toFixed(2))}.`),
        wrong: ["a normal good (luxury)", "a normal good (necessity)", "an inferior good", "a complement"].filter((x) => x !== type).slice(0, 3).map((x) => wrong(x, x === "a complement" ? "Complements are identified with cross-price elasticity, not income elasticity." : "Check the sign and size of the income elasticity.")),
        explanation: `Income elasticity ${Number(e.toFixed(2))}: negative means inferior, between 0 and 1 a necessity, above 1 a luxury.`,
      };
    },
  },
  {
    key: "mi-equilibrium-equations",
    unit: 2,
    topics: ["market-equilibrium"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const b = r.int(1, 5);
      const d = r.int(1, 5);
      const P = r.int(5, 30);
      const Q = r.int(4, 30) * 2;
      const a = Q + b * P;
      const c = Q - d * P;
      const vals = [`P = ${P}, Q = ${Q}`, `P = ${P + 2}, Q = ${a - b * (P + 2)}`, `P = ${Q}, Q = ${P}`, `P = ${P}, Q = ${a}`];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `Demand is $$Q_d = ${a} - ${b === 1 ? "" : b}P$$ and supply is $$Q_s = ${c < 0 ? `${d === 1 ? "" : d}P - ${-c}` : `${c} + ${d === 1 ? "" : d}P`}$$. What are the equilibrium price and quantity?`,
        correct: correct(vals[0]!, "Set quantity demanded equal to quantity supplied."),
        wrong: [
          wrong(vals[1]!, "At this price quantity supplied exceeds quantity demanded."),
          wrong(vals[2]!, "The price and quantity are swapped."),
          wrong(vals[3]!, "This is the demand intercept, not the equilibrium quantity."),
        ],
        explanation: `$$${a} - ${b}P = ${c} + ${d}P$$ gives $$P = ${P}$$, and then $$Q = ${a} - ${b}(${P}) = ${Q}$$.`,
      };
    },
  },
  {
    key: "mi-surplus",
    unit: 2,
    topics: ["market-equilibrium"],
    skills: ["3", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const choke = r.int(10, 30) * 2;
      const pmin = r.int(0, 8);
      const Q = r.int(4, 20) * 2;
      const P = r.int(pmin + 2, choke - 2);
      const cs = ((choke - P) * Q) / 2;
      const ps = ((P - pmin) * Q) / 2;
      const ask = r.pick(["cs", "ps"] as const);
      const ans = ask === "cs" ? cs : ps;
      const vals = [ans, ask === "cs" ? ps : cs, ans * 2, cs + ps];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `In a market with straight-line supply and demand, the equilibrium price is ${P} and the equilibrium quantity is ${Q}. The demand curve meets the price axis at ${choke}, and the supply curve meets it at ${pmin}. What is ${ask === "cs" ? "consumer" : "producer"} surplus?`,
        correct: correct(num(ans), ask === "cs" ? `$$\\frac{1}{2}(${Q})(${choke} - ${P})$$.` : `$$\\frac{1}{2}(${Q})(${P} - ${pmin})$$.`),
        wrong: [
          wrong(num(vals[1]!), `This is ${ask === "cs" ? "producer" : "consumer"} surplus.`),
          wrong(num(vals[2]!), "Surplus is a triangle: multiply by one half."),
          wrong(num(vals[3]!), "This is total surplus."),
        ],
        explanation: ask === "cs" ? `Consumer surplus is the triangle below demand and above price: ½ × ${Q} × (${choke} − ${P}) = ${cs}.` : `Producer surplus is the triangle above supply and below price: ½ × ${Q} × (${P} − ${pmin}) = ${ps}.`,
      };
    },
  },
  {
    key: "mi-price-control",
    unit: 2,
    topics: ["government-intervention", "market-disequilibrium-changes"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const b = r.int(2, 6);
      const d = r.int(2, 6);
      const P = r.int(8, 20);
      const Q = r.int(20, 80);
      const a = Q + b * P;
      const c = Q - d * P;
      const ceiling = r.next() < 0.5;
      const pc = ceiling ? P - r.int(2, 5) : P + r.int(2, 5);
      const qd = a - b * pc;
      const qs = c + d * pc;
      const gap = Math.abs(qd - qs);
      const right = `A ${ceiling ? "shortage" : "surplus"} of ${gap} units`;
      return {
        stem: `Demand is $$Q_d = ${a} - ${b}P$$ and supply is $$Q_s = ${c} + ${d}P$$. The government sets a price ${ceiling ? "ceiling" : "floor"} of ${pc}. What results?`,
        correct: correct(right, `At ${pc}, $$Q_d = ${qd}$$ and $$Q_s = ${qs}$$.`),
        wrong: [
          wrong(`A ${ceiling ? "surplus" : "shortage"} of ${gap} units`, `A binding ${ceiling ? "ceiling (below equilibrium)" : "floor (above equilibrium)"} creates a ${ceiling ? "shortage" : "surplus"}.`),
          wrong("No effect, because the control is not binding", `Equilibrium price is ${P}, so a ${ceiling ? "ceiling" : "floor"} of ${pc} is binding.`),
          wrong(`A ${ceiling ? "shortage" : "surplus"} of ${Math.abs(Q - (ceiling ? qs : qd))} units`, "Compare quantity demanded with quantity supplied at the controlled price, not with the old equilibrium."),
        ],
        explanation: `Equilibrium is P = ${P}, Q = ${Q}. At the ${ceiling ? "ceiling" : "floor"} of ${pc}, quantity demanded is ${qd} and quantity supplied is ${qs}: a ${ceiling ? "shortage" : "surplus"} of ${gap}.`,
      };
    },
  },
  {
    key: "mi-tax",
    unit: 2,
    topics: ["government-intervention"],
    skills: ["3", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const P0 = r.int(10, 30);
      const Q0 = r.int(10, 30) * 10;
      const t = r.int(2, 8);
      const buyerShare = r.int(1, t - 1);
      const Pb = P0 + buyerShare;
      const Ps = Pb - t;
      const Q1 = Q0 - r.int(2, 8) * 10;
      const ask = r.pick(["revenue", "dwl", "incidence"] as const);
      if (ask === "revenue") {
        const ans = t * Q1;
        const vals = [ans, t * Q0, Pb * Q1, buyerShare * Q1];
        if (new Set(vals).size < 4) throw new Retry();
        return {
          stem: `Before a tax, the market price is ${P0} and quantity is ${Q0}. After a per-unit tax of ${t}, buyers pay ${Pb}, sellers keep ${Ps}, and quantity falls to ${Q1}. How much tax revenue does the government collect?`,
          correct: correct(num(ans), `${t} × ${Q1}.`),
          wrong: [wrong(num(vals[1]!), "Revenue uses the quantity after the tax."), wrong(num(vals[2]!), "This is total spending by buyers."), wrong(num(vals[3]!), "This is only the buyers' share of the tax revenue.")],
          explanation: `Tax revenue = tax per unit × quantity sold after the tax = ${t} × ${Q1} = ${ans}.`,
        };
      }
      if (ask === "dwl") {
        const ans = ((Q0 - Q1) * t) / 2;
        const vals = [ans, (Q0 - Q1) * t, t * Q1, ((Q0 - Q1) * buyerShare) / 2];
        if (new Set(vals).size < 4) throw new Retry();
        return {
          stem: `Before a tax, the market price is ${P0} and quantity is ${Q0}. After a per-unit tax of ${t}, buyers pay ${Pb}, sellers keep ${Ps}, and quantity falls to ${Q1}. What is the deadweight loss?`,
          correct: correct(num(ans), `$$\\frac{1}{2} \\times (${Q0} - ${Q1}) \\times ${t}$$.`),
          wrong: [wrong(num(vals[1]!), "The deadweight loss is a triangle: multiply by one half."), wrong(num(vals[2]!), "This is the tax revenue."), wrong(num(vals[3]!), "The height of the triangle is the whole tax, not the buyers' share.")],
          explanation: `DWL = ½ × (lost quantity) × (tax) = ½ × ${Q0 - Q1} × ${t} = ${ans}.`,
        };
      }
      const more = buyerShare > t - buyerShare ? "Buyers" : buyerShare < t - buyerShare ? "Sellers" : null;
      if (!more) throw new Retry();
      return {
        stem: `Before a per-unit tax of ${t}, the market price is ${P0}. After the tax, buyers pay ${Pb} and sellers keep ${Ps}. Which of the following is true?`,
        correct: correct(`${more} bear more of the tax, so ${more === "Buyers" ? "demand" : "supply"} is relatively more inelastic.`, `Buyers pay ${buyerShare} more; sellers receive ${t - buyerShare} less.`),
        wrong: [
          wrong(`${more === "Buyers" ? "Sellers" : "Buyers"} bear more of the tax, so ${more === "Buyers" ? "supply" : "demand"} is relatively more inelastic.`, "Compare how much each side's price changed."),
          wrong(`${more} bear more of the tax, so ${more === "Buyers" ? "demand" : "supply"} is relatively more elastic.`, "The side that cannot easily adjust (more inelastic) bears more of the tax."),
          wrong("The side the law taxes pays the whole tax.", "The burden depends on elasticities, not on who is legally taxed."),
        ],
        explanation: `Buyers' price rose by ${buyerShare} and sellers' price fell by ${t - buyerShare}. The more inelastic side bears more of the burden.`,
      };
    },
  },
  {
    key: "mi-tariff",
    unit: 2,
    topics: ["international-trade-policy"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const pw = r.int(4, 10);
      const t = r.int(1, 3);
      const qd = r.int(80, 150);
      const qs = r.int(20, 60);
      const qd2 = qd - r.int(5, 15);
      const qs2 = qs + r.int(5, 15);
      const before = qd - qs;
      const after = qd2 - qs2;
      if (after <= 0) throw new Retry();
      const ask = r.next() < 0.5 ? "imports" : "revenue";
      if (ask === "imports") {
        return {
          stem: `At the world price of ${pw}, domestic consumers buy ${qd} units and domestic producers supply ${qs}. A tariff of ${t} raises the domestic price to ${pw + t}, where consumers buy ${qd2} and producers supply ${qs2}. By how much do imports fall?`,
          correct: correct(num(before - after), `Imports fall from ${before} to ${after}.`),
          wrong: [wrong(num(after), "This is the level of imports after the tariff."), wrong(num(before), "This is the level of imports before the tariff."), wrong(num(qd - qd2), "This is only the fall in consumption; domestic production also rises.")],
          explanation: `Imports = domestic quantity demanded − domestic quantity supplied: ${before} before, ${after} after, a fall of ${before - after}.`,
        };
      }
      return {
        stem: `At the world price of ${pw}, domestic consumers buy ${qd} units and domestic producers supply ${qs}. A tariff of ${t} raises the domestic price to ${pw + t}, where consumers buy ${qd2} and producers supply ${qs2}. How much revenue does the tariff raise?`,
        correct: correct(num(t * after), `${t} × imports of ${after}.`),
        wrong: [wrong(num(t * before), "Use imports after the tariff."), wrong(num(t * qd2), "The tariff applies only to imports, not to domestic production."), wrong(num((pw + t) * after), "Revenue is the tariff per unit, not the full price.")],
        explanation: `Imports after the tariff = ${qd2} − ${qs2} = ${after}. Tariff revenue = ${t} × ${after} = ${t * after}.`,
      };
    },
  },
  {
    key: "mi-elasticity-determinants",
    unit: 2,
    topics: ["price-elasticity-of-demand", "price-elasticity-of-supply"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { s: "Which good is likely to have the most price-elastic demand?", a: "One particular brand of bottled water", w: ["Insulin for diabetics", "Table salt", "Electricity for home heating in the short run"] },
        { s: "Which good is likely to have the most price-inelastic demand?", a: "Life-saving prescription medicine", w: ["A specific brand of cereal", "Restaurant meals", "Tickets to a particular movie"] },
        { s: "Supply of which good is likely to be the most price-elastic?", a: "T-shirts made with easily available materials and labor", w: ["Original paintings by a deceased artist", "Beachfront land", "Vintage wine from a past year"] },
      ];
      const it = r.pick(items);
      return {
        stem: it.s,
        correct: correct(it.a, "Availability of substitutes, necessity, budget share, time and production flexibility drive elasticity."),
        wrong: it.w.map((w) => wrong(w, "This good has fewer substitutes or less flexible production, so its quantity responds less to price.")),
        explanation: "Demand is more elastic with close substitutes, for luxuries, for large budget shares and over longer time periods. Supply is more elastic when production can expand easily.",
      };
    },
  },
];

export const microUnit3: McqTemplate[] = [
  {
    key: "mi-marginal-product",
    unit: 3,
    topics: ["production-function"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const mp = [r.int(6, 12)];
      mp.push(mp[0]! + r.int(1, 6));
      for (let i = 2; i < 6; i++) mp.push(Math.max(0, mp[i - 1]! - r.int(2, 6)));
      const tp = mp.reduce<number[]>((acc, x) => [...acc, (acc[acc.length - 1] ?? 0) + x], []);
      const k = r.int(3, 6);
      const ans = mp[k - 1]!;
      const vals = [ans, tp[k - 1]!, Number((tp[k - 1]! / k).toFixed(1)), mp[k - 2]!];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stimulus: {
          text: "The table shows a firm's total product as it hires more workers, with capital fixed.",
          table: { caption: "Total product", columns: [{ key: "l", label: "Workers" }, { key: "tp", label: "Total product" }], rows: [{ l: 0, tp: 0 }, ...tp.map((x, i) => ({ l: i + 1, tp: x }))] },
        },
        stem: `What is the marginal product of worker ${k}?`,
        correct: correct(String(ans), `${tp[k - 1]} − ${tp[k - 2]}.`),
        wrong: [wrong(String(vals[1]), "This is total product, not the change in it."), wrong(String(vals[2]), "This is average product."), wrong(String(vals[3]), "This is the marginal product of the previous worker.")],
        explanation: `Marginal product = change in total product = ${tp[k - 1]} − ${tp[k - 2]} = ${ans}. Diminishing marginal returns begin after worker 2, where MP starts falling.`,
      };
    },
  },
  {
    key: "mi-cost-table",
    unit: 3,
    topics: ["short-run-costs"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const fc = r.int(4, 20) * 10;
      const mcs = [r.int(15, 30)];
      mcs.push(mcs[0]! - r.int(2, 6));
      for (let i = 2; i < 6; i++) mcs.push(mcs[i - 1]! + r.int(3, 10));
      const tc = mcs.reduce<number[]>((acc, x) => [...acc, acc[acc.length - 1]! + x], [fc]);
      const q = r.int(2, 5);
      const ask = r.pick(["mc", "atc", "avc", "afc"] as const);
      const vals = { mc: tc[q]! - tc[q - 1]!, atc: tc[q]! / q, avc: (tc[q]! - fc) / q, afc: fc / q };
      const ans = vals[ask];
      const show = (x: number) => (Number.isInteger(x) ? String(x) : x.toFixed(2));
      const others = (["mc", "atc", "avc", "afc"] as const).filter((k) => k !== ask);
      if (new Set(Object.values(vals).map(show)).size < 4) throw new Retry();
      const names = { mc: "marginal cost", atc: "average total cost", avc: "average variable cost", afc: "average fixed cost" };
      return {
        stimulus: {
          text: "The table shows a firm's total cost at each level of output.",
          table: { caption: "Total cost", columns: [{ key: "q", label: "Output" }, { key: "tc", label: "Total cost" }], rows: tc.map((x, i) => ({ q: i, tc: x })) },
        },
        stem: `What is the ${names[ask]} of producing ${q} units?`,
        correct: correct(show(ans), ask === "mc" ? `TC(${q}) − TC(${q - 1}).` : ask === "atc" ? `TC ÷ Q = ${tc[q]} ÷ ${q}.` : ask === "avc" ? `(TC − FC) ÷ Q, with FC = TC(0) = ${fc}.` : `FC ÷ Q = ${fc} ÷ ${q}.`),
        wrong: others.map((k) => wrong(show(vals[k]), `This is the ${names[k]}.`)),
        explanation: `Fixed cost is the cost at zero output, ${fc}. At ${q} units: MC = ${show(vals.mc)}, ATC = ${show(vals.atc)}, AVC = ${show(vals.avc)}, AFC = ${show(vals.afc)}.`,
      };
    },
  },
  {
    key: "mi-profit-max-table",
    unit: 3,
    topics: ["profit-maximization", "perfect-competition"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const mcs = [r.int(8, 16)];
      mcs.push(mcs[0]! - r.int(1, 4));
      for (let i = 2; i < 7; i++) mcs.push(mcs[i - 1]! + r.int(3, 7));
      const P = r.int(mcs[2]! + 1, mcs[5]!);
      let q = 0;
      for (let i = 0; i < 7; i++) if (mcs[i]! <= P) q = i + 1;
      if (q < 3) throw new Retry();
      const opts = [...new Set([q, q - 1, q + 1, q - 2])].filter((x) => x >= 1 && x <= 7);
      if (opts.length < 4) throw new Retry();
      return {
        stimulus: {
          text: `A perfectly competitive firm sells its output at a market price of ${P}. Its marginal cost of each unit is shown.`,
          table: { caption: "Marginal cost", columns: [{ key: "q", label: "Unit" }, { key: "mc", label: "Marginal cost" }], rows: mcs.map((x, i) => ({ q: i + 1, mc: x })) },
        },
        stem: "How many units should the firm produce to maximize profit?",
        ordered: true,
        correct: correct(String(q), `Unit ${q} is the last one whose marginal cost (${mcs[q - 1]}) is at most the price (MR) of ${P}.`),
        wrong: opts.filter((o) => o !== q).map((o) => wrong(String(o), o < q ? "Producing more adds units whose marginal revenue exceeds marginal cost." : "This unit costs more than the price it sells for.")),
        explanation: `For a price taker, MR = P = ${P}. Produce every unit whose MC is at most ${P}: units 1 to ${q}.`,
      };
    },
  },
  {
    key: "mi-profit-calc",
    unit: 3,
    topics: ["profit-maximization", "types-of-profit"],
    skills: ["3", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const P = r.int(10, 40);
      const atc = P + r.int(-8, 8);
      const q = r.int(5, 50) * 10;
      if (atc === P) throw new Retry();
      const ans = (P - atc) * q;
      const vals = [ans, P * q, atc * q, (P - atc)];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `A firm maximizes profit by producing ${q} units, which it sells at a price of ${P}. At that output, average total cost is ${atc}. What is the firm's economic profit (or loss)?`,
        correct: correct(ans < 0 ? `A loss of ${num(-ans)}` : num(ans), "(P − ATC) × Q."),
        wrong: [wrong(num(P * q), "This is total revenue."), wrong(num(atc * q), "This is total cost."), wrong(num(Math.abs(P - atc)), "This is profit per unit; multiply by quantity.")],
        explanation: `Profit = (P − ATC) × Q = (${P} − ${atc}) × ${q} = ${ans}.`,
      };
    },
  },
  {
    key: "mi-shutdown",
    unit: 3,
    topics: ["shutdown-and-exit"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const avc = r.int(10, 30);
      const atc = avc + r.int(3, 10);
      const zone = r.pick(["above", "between", "below"] as const);
      const P = zone === "above" ? atc + r.int(1, 6) : zone === "between" ? r.int(avc + 1, atc - 1) : avc - r.int(1, 5);
      const opts = {
        above: "Produce in the short run; it earns an economic profit, so firms enter in the long run.",
        between: "Produce in the short run at a loss; in the long run, firms exit the industry.",
        below: "Shut down in the short run; in the long run, firms exit the industry.",
      };
      const extra = "Shut down in the short run; in the long run, firms enter the industry.";
      return {
        stem: `A perfectly competitive firm's minimum average variable cost is ${avc} and its minimum average total cost is ${atc}. The market price is ${P}. What should the firm do?`,
        correct: correct(opts[zone], zone === "above" ? "Price is above minimum ATC." : zone === "between" ? "Price covers AVC but not ATC." : "Price is below minimum AVC."),
        wrong: [...Object.entries(opts).filter(([k]) => k !== zone).map(([, v]) => wrong(v, "Compare price with minimum AVC (short-run shutdown) and minimum ATC (long-run entry or exit).")), wrong(extra, "Firms do not enter an industry that is making losses.")].slice(0, 3),
        explanation: `Short run: produce if P ≥ min AVC (${avc}). Long run: entry if P > min ATC (${atc}), exit if P < min ATC. Here P = ${P}.`,
      };
    },
  },
  {
    key: "mi-long-run-adjustment",
    unit: 3,
    topics: ["perfect-competition", "shutdown-and-exit"],
    skills: ["2", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const up = r.next() < 0.5;
      const right = up ? "Firms enter, market supply increases, and the price falls back to minimum ATC." : "Firms exit, market supply decreases, and the price rises back to minimum ATC.";
      return {
        stem: `A perfectly competitive, constant-cost industry is in long-run equilibrium. Market demand then ${up ? "increases" : "decreases"} permanently. Which of the following describes the long-run adjustment?`,
        correct: correct(right, up ? "Short-run profits attract entry." : "Short-run losses cause exit."),
        wrong: [
          wrong(up ? "Firms exit, market supply decreases, and the price rises further." : "Firms enter, market supply increases, and the price falls further.", "The direction of entry or exit is reversed."),
          wrong(up ? "The price stays permanently higher, and firms keep earning economic profit." : "The price stays permanently lower, and firms keep making losses.", "Free entry and exit eliminate economic profit and losses in the long run."),
          wrong("Each firm's demand curve becomes downward sloping.", "Firms in perfect competition remain price takers."),
        ],
        explanation: `The ${up ? "higher" : "lower"} price creates economic ${up ? "profits" : "losses"}. Firms ${up ? "enter" : "exit"}, shifting market supply ${up ? "right" : "left"} until price returns to minimum ATC and economic profit is zero.`,
      };
    },
  },
  {
    key: "mi-economic-profit",
    unit: 3,
    topics: ["types-of-profit"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const tr = r.int(20, 60) * 10000;
      const ex = tr - r.int(2, 15) * 10000;
      const im = r.int(2, 15) * 10000;
      const acc = tr - ex;
      const eco = acc - im;
      if (eco === 0) throw new Retry();
      const ask = r.next() < 0.5 ? "eco" : "acc";
      const ans = ask === "eco" ? eco : acc;
      const vals = [ans, ask === "eco" ? acc : eco, tr - im, acc + im];
      if (new Set(vals).size < 4) throw new Retry();
      const fmt = (x: number) => (x < 0 ? `A loss of ${num(-x)}` : num(x));
      return {
        stem: `A firm earns total revenue of ${num(tr)} and pays explicit costs of ${num(ex)}. The owner could earn ${num(im)} working elsewhere. What is the firm's ${ask === "eco" ? "economic" : "accounting"} profit?`,
        correct: correct(fmt(ans), ask === "eco" ? "Revenue minus explicit and implicit costs." : "Revenue minus explicit costs."),
        wrong: [wrong(fmt(vals[1]!), `This is ${ask === "eco" ? "accounting" : "economic"} profit.`), wrong(fmt(vals[2]!), "This subtracts only the implicit cost."), wrong(fmt(vals[3]!), "Implicit costs are subtracted, not added.")],
        explanation: `Accounting profit = ${num(tr)} − ${num(ex)} = ${num(acc)}. Economic profit = ${num(acc)} − ${num(im)} = ${num(eco)}.`,
      };
    },
  },
  {
    key: "mi-cost-shifts",
    unit: 3,
    topics: ["short-run-costs", "long-run-costs"],
    skills: ["1"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const items = [
        { s: "The rent on a firm's building rises.", a: "ATC and AFC shift up; MC and AVC do not change." },
        { s: "The wage paid to every worker rises.", a: "MC, AVC and ATC all shift up." },
        { s: "A one-time license fee is imposed on the firm.", a: "ATC and AFC shift up; MC and AVC do not change." },
        { s: "The price of raw materials used in each unit falls.", a: "MC, AVC and ATC all shift down." },
      ];
      const it = r.pick(items);
      const all = ["ATC and AFC shift up; MC and AVC do not change.", "MC, AVC and ATC all shift up.", "MC, AVC and ATC all shift down.", "Only MC shifts up.", "ATC shifts down; MC shifts up."];
      return {
        stem: `${it.s} How are the firm's short-run cost curves affected?`,
        correct: correct(it.a, "Fixed costs affect only average fixed and total costs; variable costs affect marginal and average variable costs too."),
        wrong: r.sample(all.filter((a) => a !== it.a), 3).map((a) => wrong(a, "Decide whether the change is a fixed cost (does not vary with output) or a variable cost.")),
        explanation: "A change in fixed cost shifts AFC and ATC but leaves MC and AVC unchanged. A change in a per-unit (variable) cost shifts MC, AVC and ATC.",
      };
    },
  },
];

export const microUnit4: McqTemplate[] = [
  {
    key: "mi-monopoly-linear",
    unit: 4,
    topics: ["monopoly"],
    skills: ["3", "4"],
    difficulty: 4,
    calc: false,
    gen(r) {
      const b = r.int(1, 4);
      const mc = r.int(2, 20);
      const Q = r.int(3, 15);
      const a = mc + 2 * b * Q;
      const P = a - b * Q;
      const ask = r.pick(["q", "p", "profit", "dwl"] as const);
      const qc = 2 * Q;
      const vals = { q: Q, p: P, profit: (P - mc) * Q, dwl: ((qc - Q) * (P - mc)) / 2 };
      const ans = vals[ask];
      const wrongs = {
        q: [qc, Math.round((a - mc) / (3 * b)) + 0.5, a / b],
        p: [mc, a - 2 * b * Q, a - b * qc],
        profit: [P * Q, (P - mc) * qc, (a - mc) * Q],
        dwl: [(qc - Q) * (P - mc), (P - mc) * Q, ((qc - Q) * mc) / 2],
      }[ask];
      if (new Set([ans, ...wrongs]).size < 4) throw new Retry();
      const why = {
        q: ["This is the efficient quantity where P = MC.", "MR = MC sets the quantity; MR has twice the slope of demand.", "This is where demand reaches a price of zero."],
        p: ["Price is read from the demand curve, not MC.", "This is MR at the chosen quantity.", "This is the price at the efficient quantity."],
        profit: ["This is total revenue; subtract total cost.", "Profit uses the monopoly quantity.", "Price comes from the demand curve at the chosen quantity."],
        dwl: ["The deadweight loss is a triangle: multiply by one half.", "This is the monopoly's profit.", "The height of the triangle is P − MC."],
      }[ask];
      const label = { q: "quantity", p: "price", profit: "profit", dwl: "deadweight loss" }[ask];
      return {
        stem: `A monopolist faces demand $$P = ${a} - ${b === 1 ? "" : b}Q$$ and has constant marginal cost and average total cost of ${mc}. What is the profit-maximizing ${label}?`.replace("profit-maximizing deadweight loss", "deadweight loss at the profit-maximizing output").replace("profit-maximizing profit", "maximum profit"),
        correct: correct(num(ans), `$$MR = ${a} - ${2 * b}Q = ${mc}$$ gives $$Q = ${Q}$$, so $$P = ${P}$$.`),
        wrong: wrongs.map((w, i) => wrong(num(w), why[i]!)),
        explanation: `MR = ${a} − ${2 * b}Q. Setting MR = MC: Q = ${Q}; price from demand: P = ${P}. Profit = (${P} − ${mc}) × ${Q} = ${vals.profit}. The efficient quantity is ${qc}, so DWL = ½ × ${qc - Q} × ${P - mc} = ${vals.dwl}.`,
      };
    },
  },
  {
    key: "mi-marginal-revenue",
    unit: 4,
    topics: ["imperfect-competition-intro"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const p1 = r.int(12, 40);
      const q1 = r.int(3, 10);
      const p2 = p1 - r.int(1, 4);
      const mr = p2 * (q1 + 1) - p1 * q1;
      const vals = [mr, p2, p2 * (q1 + 1), p1 - p2];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `A firm can sell ${q1} units at a price of ${p1} each, or ${q1 + 1} units at a price of ${p2} each. What is the marginal revenue of unit ${q1 + 1}?`,
        correct: correct(String(mr), `${p2 * (q1 + 1)} − ${p1 * q1}.`),
        wrong: [wrong(String(p2), "Price exceeds marginal revenue because the price cut applies to all units."), wrong(String(p2 * (q1 + 1)), "This is total revenue."), wrong(String(p1 - p2), "This is the price cut, not the change in revenue.")],
        explanation: `TR(${q1}) = ${p1 * q1}; TR(${q1 + 1}) = ${p2 * (q1 + 1)}. MR = ${mr}${mr < 0 ? " (negative: demand is inelastic here)" : ""}.`,
      };
    },
  },
  {
    key: "mi-game-nash",
    unit: 4,
    topics: ["oligopoly-game-theory"],
    skills: ["3", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const { p, nash } = game(r);
      if (nash.length !== 1) throw new Retry();
      const [i, j] = nash[0]!;
      const name = (x: number, y: number) => `Firm A ${ROWS[x]!.toLowerCase()}s, Firm B ${COLS[y]!.toLowerCase()}s`.replace("don't advertises", "does not advertise").replace("don't advertises", "does not advertise");
      const cells: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]];
      return {
        stimulus: { text: "Two firms choose simultaneously whether to advertise. Each cell shows (Firm A's profit, Firm B's profit).", table: gameTable(p, "Firm A", "Firm B") },
        stem: "Which outcome is the Nash equilibrium?",
        correct: correct(name(i, j), "Neither firm can raise its own payoff by changing only its own strategy."),
        wrong: cells.filter(([x, y]) => x !== i || y !== j).map(([x, y]) => wrong(name(x, y), "At least one firm would switch strategies from this cell to increase its own payoff.")),
        explanation: `Check each cell: in (${ROWS[i]}, ${COLS[j]}) with payoffs (${p[i]![j]![0]}, ${p[i]![j]![1]}), Firm A would get ${p[1 - i]![j]![0]} by switching and Firm B ${p[i]![1 - j]![1]}, both lower. No other cell has that property.`,
      };
    },
  },
  {
    key: "mi-game-dominant",
    unit: 4,
    topics: ["oligopoly-game-theory"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const { p, aDom, bDom } = game(r);
      const ans = aDom === null ? "Firm A has no dominant strategy." : `Firm A's dominant strategy is to ${ROWS[aDom]!.toLowerCase()}.`;
      const pool = ["Firm A's dominant strategy is to advertise.", "Firm A's dominant strategy is to don't advertise.", "Firm A has no dominant strategy.", `Firm A's dominant strategy depends on Firm B's dominant strategy${bDom === null ? "" : ""}.`];
      const fix = (s: string) => s.replace("to don't advertise", "not to advertise");
      return {
        stimulus: { text: "Two firms choose simultaneously whether to advertise. Each cell shows (Firm A's profit, Firm B's profit).", table: gameTable(p, "Firm A", "Firm B") },
        stem: "Which of the following is true about Firm A?",
        correct: correct(fix(ans), `If B advertises, A gets ${p[0]![0]![0]} (advertise) or ${p[1]![0]![0]} (not); if B does not, A gets ${p[0]![1]![0]} or ${p[1]![1]![0]}.`),
        wrong: pool.filter((x) => x !== ans).map((x) => wrong(fix(x), x.includes("depends") ? "A dominant strategy, by definition, is best whatever the other firm does." : "Compare Firm A's own payoffs (the first number) for each of Firm B's choices.")),
        explanation: "A strategy is dominant if it gives the higher payoff whichever strategy the other firm picks. Compare only Firm A's payoffs within each column.",
      };
    },
  },
  {
    key: "mi-market-structures",
    unit: 4,
    topics: ["imperfect-competition-intro", "monopolistic-competition", "monopoly", "perfect-competition"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { s: "In long-run equilibrium, price equals average total cost but exceeds marginal cost, and firms have excess capacity.", a: "Monopolistic competition" },
        { s: "In long-run equilibrium, price equals marginal cost and minimum average total cost.", a: "Perfect competition" },
        { s: "A single firm with high barriers to entry can earn economic profit in the long run.", a: "Monopoly" },
        { s: "A few interdependent firms consider rivals' reactions when setting prices.", a: "Oligopoly" },
      ];
      const it = r.pick(items);
      const all = ["Perfect competition", "Monopolistic competition", "Oligopoly", "Monopoly"];
      return {
        stem: `Which market structure is described? ${it.s}`,
        correct: correct(it.a, "This matches the structure's long-run conditions."),
        wrong: all.filter((a) => a !== it.a).map((a) => wrong(a, "Recall each structure's number of firms, entry conditions and long-run efficiency.")),
        explanation: "Perfect competition: P = MC = min ATC. Monopolistic competition: P = ATC > MC, excess capacity. Oligopoly: few interdependent firms. Monopoly: one firm, barriers, possible long-run profit.",
      };
    },
  },
  {
    key: "mi-price-discrimination",
    unit: 4,
    topics: ["price-discrimination"],
    skills: ["1", "2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const items = [
        { s: "A monopolist becomes able to perfectly price discriminate. Compared with a single-price monopoly, which is true?", a: "Output rises to the efficient level, and consumer surplus falls to zero.", w: ["Output falls, and deadweight loss rises.", "Consumer surplus rises, and producer surplus falls.", "Output and deadweight loss are unchanged, but price rises."] },
        { s: "Which condition is necessary for a firm to price discriminate?", a: "The firm can prevent buyers from reselling the good.", w: ["The firm sells an identical product in a perfectly competitive market.", "All buyers have the same willingness to pay.", "The firm's marginal cost is zero."] },
        { s: "A theater charges students less than adults for the same show. Which is most likely true?", a: "Students' demand is more price elastic than adults' demand.", w: ["Students' demand is less price elastic than adults' demand.", "It costs the theater less to seat a student.", "The theater is a price taker."] },
      ];
      const it = r.pick(items);
      return {
        stem: it.s,
        correct: correct(it.a, "Price discrimination charges more to buyers with less elastic demand, requires market power and no resale, and perfect discrimination captures all surplus."),
        wrong: it.w.map((w) => wrong(w, "Recall the conditions for and effects of price discrimination.")),
        explanation: "Price discrimination needs market power, separable groups and no resale. The less elastic group pays more. Perfect price discrimination produces the efficient quantity with no consumer surplus.",
      };
    },
  },
  {
    key: "mi-natural-monopoly",
    unit: 4,
    topics: ["monopoly"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const fair = r.next() < 0.5;
      return {
        stem: `A regulator sets the price a natural monopoly may charge at the level where ${fair ? "the demand curve intersects average total cost" : "the demand curve intersects marginal cost"}. Which of the following results?`,
        correct: correct(fair ? "The firm earns zero economic profit (a fair return)." : "The allocatively efficient quantity is produced, but the firm may need a subsidy because price is below average total cost.", fair ? "At P = ATC, total revenue equals total cost." : "At P = MC, output is efficient, but a natural monopoly's ATC exceeds MC."),
        wrong: [
          wrong(fair ? "The allocatively efficient quantity is produced." : "The firm earns zero economic profit.", fair ? "Efficiency needs P = MC; at P = ATC output is still below the efficient level." : "With falling ATC above MC, pricing at MC causes a loss."),
          wrong("Output falls below the unregulated monopoly level.", "A price ceiling below the monopoly price raises output."),
          wrong("The firm earns larger profits than without regulation.", "Regulation lowers the price the firm can charge."),
        ],
        explanation: "The socially optimal price (P = MC) gives the efficient quantity but, for a natural monopoly, a loss. The fair-return price (P = ATC) gives zero economic profit with output between the monopoly and efficient levels.",
      };
    },
  },
];

export const microUnit5: McqTemplate[] = [
  {
    key: "mi-mrp-hire",
    unit: 5,
    topics: ["competitive-factor-markets", "factor-markets-intro"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const P = r.int(2, 8);
      const mp = [r.int(15, 25)];
      for (let i = 1; i < 6; i++) mp.push(Math.max(1, mp[i - 1]! - r.int(2, 5)));
      const mrp = mp.map((x) => x * P);
      const w = r.int(mrp[4]! + 1, mrp[1]!);
      let n = 0;
      for (let i = 0; i < 6; i++) if (mrp[i]! >= w) n = i + 1;
      const opts = [...new Set([n, n - 1, n + 1, n + 2])].filter((x) => x >= 1 && x <= 6);
      if (opts.length < 4) throw new Retry();
      return {
        stimulus: {
          text: `A firm sells its output in a perfectly competitive market at a price of ${P} and hires workers in a perfectly competitive labor market at a wage of ${w}.`,
          table: { caption: "Marginal product of labor", columns: [{ key: "l", label: "Worker" }, { key: "mp", label: "Marginal product" }], rows: mp.map((x, i) => ({ l: i + 1, mp: x })) },
        },
        stem: "How many workers should the firm hire to maximize profit?",
        ordered: true,
        correct: correct(String(n), `Worker ${n} is the last whose MRP (${mrp[n - 1]}) is at least the wage.`),
        wrong: opts.filter((o) => o !== n).map((o) => wrong(String(o), o < n ? "Another worker would add more revenue than the wage costs." : "This worker's MRP is below the wage.")),
        explanation: `MRP = MP × P: ${mrp.join(", ")}. Hire while MRP ≥ wage (${w}): ${n} workers.`,
      };
    },
  },
  {
    key: "mi-mfc",
    unit: 5,
    topics: ["monopsony"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const L = r.int(3, 9);
      const w1 = r.int(8, 20);
      const w2 = w1 + r.int(1, 3);
      const mfc = w2 * (L + 1) - w1 * L;
      const vals = [mfc, w2, w2 - w1, w2 * (L + 1)];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `A monopsonist can hire ${L} workers at a wage of ${w1} each, or ${L + 1} workers at a wage of ${w2} each. What is the marginal factor cost of worker ${L + 1}?`,
        correct: correct(String(mfc), `${w2 * (L + 1)} − ${w1 * L}.`),
        wrong: [wrong(String(w2), "MFC exceeds the wage because the higher wage is paid to all workers."), wrong(String(w2 - w1), "This is only the raise for one worker."), wrong(String(w2 * (L + 1)), "This is total labor cost.")],
        explanation: `Total cost rises from ${w1 * L} to ${w2 * (L + 1)}, so MFC = ${mfc}, greater than the wage of ${w2}.`,
      };
    },
  },
  {
    key: "mi-labor-shift",
    unit: 5,
    topics: ["factor-demand-supply-changes"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { e: "the price of the product that the workers make rises", a: "Labor demand increases; the wage and employment rise." },
        { e: "workers' productivity rises because of better training", a: "Labor demand increases; the wage and employment rise." },
        { e: "a new licensing requirement makes it harder to enter the occupation", a: "Labor supply decreases; the wage rises and employment falls." },
        { e: "many new workers immigrate and seek jobs in this occupation", a: "Labor supply increases; the wage falls and employment rises." },
        { e: "demand for the product the workers make falls", a: "Labor demand decreases; the wage and employment fall." },
      ];
      const it = r.pick(items);
      const all = [...new Set(items.map((i) => i.a)), "Labor supply increases; the wage and employment fall."];
      return {
        stem: `In a competitive labor market, ${it.e}. Which of the following is most likely?`,
        correct: correct(it.a, "Identify whether firms' MRP (demand) or workers' availability (supply) changed."),
        wrong: r.sample(all.filter((a) => a !== it.a), 3).map((a) => wrong(a, "Check which curve the event shifts and read the new wage and employment.")),
        explanation: "Labor demand depends on MRP (product price and productivity). Labor supply depends on the number of available workers and entry requirements.",
      };
    },
  },
  {
    key: "mi-least-cost",
    unit: 5,
    topics: ["competitive-factor-markets"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const pl = r.int(5, 20);
      const pk = r.int(5, 20);
      const rl = r.int(2, 8);
      const rk = r.int(2, 8);
      if (rl === rk) throw new Retry();
      const mpl = rl * pl;
      const mpk = rk * pk;
      const more = rl > rk ? "labor" : "capital";
      return {
        stem: `A firm uses labor (wage ${pl}) and capital (rental price ${pk}). The marginal product of labor is ${mpl} and the marginal product of capital is ${mpk}. To produce its output at the lowest cost, the firm should`,
        correct: correct(`use more ${more} and less of the other input`, `Labor yields ${rl} units per dollar; capital yields ${rk}.`),
        wrong: [
          wrong(`use more ${more === "labor" ? "capital" : "labor"} and less of the other input`, "Compare marginal product per dollar, not marginal product alone."),
          wrong("keep its input mix unchanged", "The marginal products per dollar are unequal, so costs can be lowered."),
          wrong("use more of both inputs", "To minimize cost for a given output, shift spending between inputs rather than adding both."),
        ],
        explanation: `MP per dollar: labor ${mpl} ÷ ${pl} = ${rl}; capital ${mpk} ÷ ${pk} = ${rk}. Shift toward ${more} until the ratios are equal.`,
      };
    },
  },
  {
    key: "mi-monopsony-compare",
    unit: 5,
    topics: ["monopsony"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      return {
        stem: r.pick(["Compared with a perfectly competitive labor market, a monopsony employer hires", "A town's only large employer, compared with what a competitive labor market would produce, hires"]),
        correct: correct("fewer workers at a lower wage", "It hires where MRP = MFC, with MFC above the supply curve, then pays the wage on the supply curve."),
        wrong: [
          wrong("more workers at a lower wage", "Because MFC exceeds the wage, the monopsonist restricts hiring."),
          wrong("fewer workers at a higher wage", "Restricting hiring lets the monopsonist pay a lower wage, read from the supply curve."),
          wrong("the same number of workers at the same wage", "Monopsony power changes both employment and the wage."),
        ],
        explanation: "A monopsonist's MFC lies above labor supply, so MRP = MFC at a lower employment level, and the wage needed to attract those workers is also lower.",
      };
    },
  },
];

export const microUnit6: McqTemplate[] = [
  {
    key: "mi-pigouvian",
    unit: 6,
    topics: ["externalities"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const a = r.int(60, 120);
      const c = r.int(5, 20);
      const mec = r.int(4, 20) * 2;
      const Qm = (a - c) / 2;
      const Qe = (a - c - mec) / 2;
      if (!Number.isInteger(Qm * 2) || Qe <= 0) throw new Retry();
      const ask = r.next() < 0.5 ? "tax" : "q";
      if (ask === "tax") {
        return {
          stem: `Producing each unit of a good imposes a constant external cost of ${mec} on third parties. Market demand is $$P = ${a} - Q$$ and market supply (marginal private cost) is $$P = ${c} + Q$$. What per-unit tax would achieve the socially efficient quantity?`,
          correct: correct(String(mec), "A Pigouvian tax equal to the marginal external cost."),
          wrong: [wrong(String(mec / 2), "The tax should equal the whole external cost per unit."), wrong(String(Qm), "This is the market quantity, not a tax."), wrong("0, because the market is already efficient", "With a negative externality, the market overproduces.")],
          explanation: `Setting the tax equal to the marginal external cost (${mec}) makes producers face the full social cost, so output falls from ${Qm} to ${Qe}.`,
        };
      }
      return {
        stem: `Producing each unit of a good imposes a constant external cost of ${mec} on third parties. Market demand is $$P = ${a} - Q$$ and market supply (marginal private cost) is $$P = ${c} + Q$$. What is the socially efficient quantity?`,
        correct: correct(num(Qe), `$$${a} - Q = ${c + mec} + Q$$.`),
        wrong: [wrong(num(Qm), "This is the market quantity, which ignores the external cost."), wrong(num(Qm + mec / 2), "The external cost reduces the efficient quantity."), wrong(num(Qe / 2), "Set MSB = MSC: demand equals supply plus the external cost.")],
        explanation: `MSC = ${c} + Q + ${mec}. Efficient quantity where MSB = MSC: ${a} − Q = ${c + mec} + Q, so Q = ${Qe}, below the market quantity ${Qm}.`,
      };
    },
  },
  {
    key: "mi-externality-direction",
    unit: 6,
    topics: ["externalities", "efficient-outcomes"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { s: "A factory releases pollution into a river used by a downstream town.", a: "The market produces too much; a per-unit tax could correct it." },
        { s: "Vaccinations protect not only the people vaccinated but also those around them.", a: "The market produces too little; a per-unit subsidy could correct it." },
        { s: "Homeowners who plant gardens make their neighborhood more attractive to neighbors.", a: "The market produces too little; a per-unit subsidy could correct it." },
        { s: "Loud late-night music from a club disturbs nearby residents.", a: "The market produces too much; a per-unit tax could correct it." },
      ];
      const it = r.pick(items);
      const all = ["The market produces too much; a per-unit tax could correct it.", "The market produces too little; a per-unit subsidy could correct it.", "The market produces too much; a per-unit subsidy could correct it.", "The market produces the efficient quantity, so no policy is needed."];
      return {
        stem: `${it.s} Which of the following is true?`,
        correct: correct(it.a, "Negative externalities cause overproduction; positive ones cause underproduction."),
        wrong: all.filter((a) => a !== it.a).map((a) => wrong(a, "Decide whether third parties bear a cost (negative) or receive a benefit (positive).")),
        explanation: "With a negative externality MSC > MPC and the market overproduces; a Pigouvian tax fixes it. With a positive externality MSB > MPB and the market underproduces; a subsidy fixes it.",
      };
    },
  },
  {
    key: "mi-goods-classification",
    unit: 6,
    topics: ["public-and-private-goods"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { x: "national defense", a: "Public good: non-rival and non-excludable" },
        { x: "a slice of pizza", a: "Private good: rival and excludable" },
        { x: "fish in international waters", a: "Common resource: rival and non-excludable" },
        { x: "a streaming video subscription", a: "Club good: non-rival and excludable" },
        { x: "a city's street lighting", a: "Public good: non-rival and non-excludable" },
        { x: "a toll road that is rarely congested", a: "Club good: non-rival and excludable" },
      ];
      const it = r.pick(items);
      const all = ["Public good: non-rival and non-excludable", "Private good: rival and excludable", "Common resource: rival and non-excludable", "Club good: non-rival and excludable"];
      return {
        stem: `How is ${it.x} best classified?`,
        correct: correct(it.a, "Check rivalry (does one person's use reduce availability?) and excludability (can non-payers be kept out?)."),
        wrong: all.filter((a) => a !== it.a).map((a) => wrong(a, "Recheck rivalry and excludability for this good.")),
        explanation: "Goods are classified by rivalry and excludability: private (both), public (neither), common resources (rival only), club goods (excludable only).",
      };
    },
  },
  {
    key: "mi-lump-sum",
    unit: 6,
    topics: ["intervention-in-market-structures"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const lump = r.next() < 0.5;
      return {
        stem: `The government imposes a ${lump ? "lump-sum tax (a fixed amount, regardless of output)" : "per-unit tax"} on a profit-maximizing monopolist. In the short run, what happens to the monopolist's output and price?`,
        correct: correct(lump ? "Output and price do not change; profit falls." : "Output falls and price rises.", lump ? "A lump-sum tax raises fixed cost, not marginal cost." : "A per-unit tax raises marginal cost."),
        wrong: [
          wrong(lump ? "Output falls and price rises." : "Output and price do not change; profit falls.", lump ? "Only a change in marginal cost changes the MR = MC quantity." : "A per-unit tax shifts MC up, so the MR = MC quantity falls."),
          wrong("Output rises and price falls.", "Taxes do not lower the monopolist's costs."),
          wrong("The monopolist passes the full tax on to consumers with no change in output.", "Output depends on where MR equals MC."),
        ],
        explanation: lump ? "A lump-sum tax is a fixed cost: ATC rises but MC is unchanged, so the profit-maximizing output and price stay the same and profit falls." : "A per-unit tax raises MC; MR = MC at a lower quantity, and the price read from demand is higher.",
      };
    },
  },
  {
    key: "mi-tax-progressivity",
    unit: 6,
    topics: ["inequality"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const y1 = r.int(2, 5) * 10000;
      const y2 = y1 * r.int(3, 6);
      const r1 = r.int(5, 20);
      const kind = r.pick(["progressive", "regressive", "proportional"] as const);
      const r2 = kind === "progressive" ? r1 + r.int(3, 10) : kind === "regressive" ? r1 - r.int(2, 4) : r1;
      const t1 = (y1 * r1) / 100;
      const t2 = (y2 * r2) / 100;
      return {
        stem: `A household earning ${num(y1)} pays ${num(t1)} in tax, and a household earning ${num(y2)} pays ${num(t2)}. The tax is`,
        correct: correct(kind, `The rates are ${pct(r1)} and ${pct(r2)}.`),
        wrong: ["progressive", "regressive", "proportional", "lump-sum"].filter((k) => k !== kind).slice(0, 3).map((k) => wrong(k, k === "lump-sum" ? "A lump-sum tax is the same amount for everyone." : "Compare the tax as a percentage of income, not the amount paid.")),
        explanation: `Tax as a share of income: ${pct(r1)} for the lower income and ${pct(r2)} for the higher. Rising share: progressive; falling: regressive; equal: proportional.`,
      };
    },
  },
  {
    key: "mi-lorenz",
    unit: 6,
    topics: ["inequality"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { s: "A country's Lorenz curve moves farther from the line of perfect equality.", a: "Income inequality increases and the Gini coefficient rises." },
        { s: "A new program of progressive taxes and cash transfers is introduced.", a: "The Lorenz curve moves toward the line of equality and the Gini coefficient falls." },
        { s: "Every household's income doubles.", a: "The Lorenz curve and the Gini coefficient do not change." },
      ];
      const it = r.pick(items);
      const all = [...items.map((i) => i.a), "The Gini coefficient becomes negative."];
      return {
        stem: `${it.s} Which of the following is true?`,
        correct: correct(it.a, "The Lorenz curve and Gini coefficient measure relative shares, not income levels."),
        wrong: all.filter((a) => a !== it.a).map((a) => wrong(a, a.includes("negative") ? "The Gini coefficient lies between 0 and 1." : "Think about how the shares of income held by each group change.")),
        explanation: "The farther the Lorenz curve from the 45-degree line, the higher the Gini coefficient and the greater the inequality. Equal proportional changes in all incomes leave shares unchanged.",
      };
    },
  },
];
