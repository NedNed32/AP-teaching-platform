/* AP Macroeconomics multiple-choice templates, units 2–6. */
import { COUNTRIES, CURRENCIES, directionChoices, num, pct, type Dir } from "./econ-lib";
import { correct, Retry, wrong, type McqTemplate } from "./types";

const up = (b: boolean): Dir => (b ? "up" : "down");

// ---------------------------------------------------------------------------
// Unit 2: Economic indicators
// ---------------------------------------------------------------------------

export const macroUnit2: McqTemplate[] = [
  {
    key: "ma-gdp-expenditure",
    unit: 2,
    topics: ["circular-flow-and-gdp"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const C = r.int(40, 90) * 10;
      const I = r.int(8, 25) * 10;
      const G = r.int(10, 30) * 10;
      const X = r.int(5, 20) * 10;
      const M = r.int(5, 25) * 10;
      const T = r.int(5, 15) * 10; // transfers
      const S = r.int(5, 20) * 10; // stock purchases
      const gdp = C + I + G + X - M;
      const vals = [gdp, gdp + T, C + I + G + X + M, gdp + S];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stimulus: {
          text: "Selected data for an economy (in billions of dollars):",
          table: {
            caption: "National accounts data",
            columns: [{ key: "item", label: "Item" }, { key: "v", label: "Billions" }],
            rows: r.shuffle([
              { item: "Consumption spending", v: C },
              { item: "Gross private investment", v: I },
              { item: "Government purchases of goods and services", v: G },
              { item: "Government transfer payments", v: T },
              { item: "Exports", v: X },
              { item: "Imports", v: M },
              { item: "Purchases of corporate stock", v: S },
            ]),
          },
        },
        stem: "What is the economy's GDP?",
        correct: correct(num(gdp), `$$C + I + G + (X - M) = ${C} + ${I} + ${G} + (${X} - ${M})$$.`),
        wrong: [
          wrong(num(vals[1]!), "Transfer payments are not purchases of goods or services, so they are excluded."),
          wrong(num(vals[2]!), "Imports are subtracted, not added."),
          wrong(num(vals[3]!), "Buying stock is a financial transaction, not production."),
        ],
        explanation: `Using the expenditure approach and excluding transfers and stock purchases: GDP $$= ${C} + ${I} + ${G} + ${X} - ${M} = ${gdp}$$ billion.`,
      };
    },
  },
  {
    key: "ma-gdp-included",
    unit: 2,
    topics: ["circular-flow-and-gdp", "limitations-of-gdp"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const inc = [
        "A new house built and sold this year",
        "A haircut purchased at a salon",
        "A new tractor bought by a farmer",
        "Military equipment purchased by the government",
        "Unsold cars added to a dealer's inventory this year",
        "A new laptop produced domestically and sold abroad",
      ];
      const exc = [
        "A used car resold this year",
        "Social Security payments to retirees",
        "Purchases of shares of stock",
        "Flour bought by a bakery to make bread for sale",
        "Unpaid work cleaning one's own home",
        "A car built in another country by a domestic firm",
      ];
      const askIncluded = r.next() < 0.5;
      const right = askIncluded ? r.pick(inc) : r.pick(exc);
      const others = r.sample(askIncluded ? exc : inc, 3);
      return {
        stem: askIncluded ? "Which of the following is included in this year's GDP?" : "Which of the following is NOT included in this year's GDP?",
        correct: correct(right, askIncluded ? "It is a final good or service produced domestically this year." : "It is excluded: a used good, transfer, financial transaction, intermediate good, non-market activity or foreign production."),
        wrong: others.map((o) => wrong(o, askIncluded ? "This is excluded from GDP." : "This is a final good or service produced domestically this year, so it is counted.")),
        explanation: "GDP counts the market value of final goods and services produced within the country this year. It excludes used goods, intermediate goods, transfer payments, financial transactions, non-market work and production in other countries.",
      };
    },
  },
  {
    key: "ma-unemployment-rate",
    unit: 2,
    topics: ["unemployment"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const E = r.int(80, 180);
      const U = r.int(4, 18);
      const NLF = r.int(40, 120);
      const lf = E + U;
      const kind = r.next() < 0.6 ? "u" : "p";
      if (kind === "u") {
        const ans = (100 * U) / lf;
        const vals = [ans, (100 * U) / E, (100 * U) / (lf + NLF), (100 * E) / lf];
        if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
        return {
          stem: `In a country, ${E} million people are employed, ${U} million are unemployed, and ${NLF} million adults are not in the labor force. What is the unemployment rate?`,
          correct: correct(pct(Number(ans.toFixed(1))), `$$\\frac{${U}}{${E} + ${U}} \\times 100$$.`),
          wrong: [
            wrong(pct(Number(vals[1]!.toFixed(1))), "The denominator is the labor force (employed + unemployed), not only the employed."),
            wrong(pct(Number(vals[2]!.toFixed(1))), "People not in the labor force are excluded from the denominator."),
            wrong(pct(Number(vals[3]!.toFixed(1))), "This is the share of the labor force that is employed."),
          ],
          explanation: `Labor force = ${E} + ${U} = ${lf} million. Unemployment rate = ${U} ÷ ${lf} × 100 ≈ ${ans.toFixed(1)}%.`,
        };
      }
      const pop = lf + NLF;
      const ans = (100 * lf) / pop;
      const vals = [ans, (100 * E) / pop, (100 * lf) / E, (100 * NLF) / pop];
      if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
      return {
        stem: `In a country, ${E} million people are employed, ${U} million are unemployed, and ${NLF} million adults are not in the labor force. What is the labor force participation rate?`,
        correct: correct(pct(Number(ans.toFixed(1))), `$$\\frac{${lf}}{${pop}} \\times 100$$.`),
        wrong: [
          wrong(pct(Number(vals[1]!.toFixed(1))), "The labor force includes the unemployed, not only the employed."),
          wrong(pct(Number(vals[2]!.toFixed(1))), "The denominator is the adult population."),
          wrong(pct(Number(vals[3]!.toFixed(1))), "This is the share of adults not in the labor force."),
        ],
        explanation: `Labor force = ${lf} million; adult population = ${pop} million. Participation rate = ${lf} ÷ ${pop} × 100 ≈ ${ans.toFixed(1)}%.`,
      };
    },
  },
  {
    key: "ma-unemployment-type",
    unit: 2,
    topics: ["unemployment"],
    skills: ["1"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const items = [
        { s: "A recent college graduate is searching for a first job in her field.", a: "Frictional" },
        { s: "A worker quits to look for a better-paying job in another city.", a: "Frictional" },
        { s: "Bank tellers lose their jobs because customers switch to mobile banking.", a: "Structural" },
        { s: "Coal miners lose their jobs as power plants switch permanently to natural gas.", a: "Structural" },
        { s: "Construction workers are laid off because a recession reduces spending on new homes.", a: "Cyclical" },
        { s: "Factory workers are laid off as overall demand falls during a downturn.", a: "Cyclical" },
        { s: "A retiree stops working and does not look for a job.", a: "Not unemployed (not in the labor force)" },
      ];
      const it = r.pick(items);
      const all = ["Frictional", "Structural", "Cyclical", "Not unemployed (not in the labor force)"];
      return {
        stem: `${it.s} Which best describes this situation?`,
        correct: correct(it.a, "This matches the cause of the joblessness."),
        wrong: all.filter((x) => x !== it.a).map((x) => wrong(x, "Match the cause: searching (frictional), mismatched skills or declining industry (structural), or a downturn (cyclical).")),
        explanation: "Frictional unemployment comes from job search, structural from a mismatch between skills and jobs, and cyclical from recessions. People not looking for work are not in the labor force.",
      };
    },
  },
  {
    key: "ma-cpi",
    unit: 2,
    topics: ["price-indices-and-inflation"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const q1 = r.int(2, 10);
      const q2 = r.int(2, 10);
      const p1 = r.int(2, 10);
      const p2 = r.int(2, 10);
      const n1 = p1 + r.int(0, 4);
      const n2 = p2 + r.int(0, 4);
      const base = q1 * p1 + q2 * p2;
      const now = q1 * n1 + q2 * n2;
      if (now === base) throw new Retry();
      const cpi = (100 * now) / base;
      const vals = [cpi, (100 * base) / now, ((n1 + n2) / (p1 + p2)) * 100, cpi - 100];
      if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
      return {
        stimulus: {
          text: `A market basket contains ${q1} units of good A and ${q2} units of good B. Prices are shown.`,
          table: {
            caption: "Prices",
            columns: [{ key: "g", label: "Good" }, { key: "b", label: "Base year price" }, { key: "c", label: "Current year price" }],
            rows: [
              { g: "A", b: p1, c: n1 },
              { g: "B", b: p2, c: n2 },
            ],
          },
        },
        stem: "What is the price index for the current year (base year = 100)?",
        correct: correct(cpi.toFixed(1), `Current cost ${now} ÷ base cost ${base} × 100.`),
        wrong: [
          wrong(vals[1]!.toFixed(1), "This divides the base-year cost by the current cost: upside down."),
          wrong(vals[2]!.toFixed(1), "The index weights prices by the quantities in the basket."),
          wrong(vals[3]!.toFixed(1), "This is the percentage change since the base year, not the index."),
        ],
        explanation: `Basket cost: base year $$${q1}(${p1}) + ${q2}(${p2}) = ${base}$$; current year $$${q1}(${n1}) + ${q2}(${n2}) = ${now}$$. Index $$= \\frac{${now}}{${base}} \\times 100 \\approx ${cpi.toFixed(1)}$$.`,
      };
    },
  },
  {
    key: "ma-inflation-rate",
    unit: 2,
    topics: ["price-indices-and-inflation"],
    skills: ["3"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const a = r.int(100, 240);
      const b = a + r.int(-6, 20);
      if (b === a) throw new Retry();
      const ans = (100 * (b - a)) / a;
      const vals = [ans, b - a, (100 * (b - a)) / b, b - 100];
      if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
      return {
        stem: `A price index rises from ${a} in one year to ${b} the next year. What is the inflation rate?`,
        correct: correct(pct(Number(ans.toFixed(1))), `$$\\frac{${b} - ${a}}{${a}} \\times 100$$.`),
        wrong: [
          wrong(pct(b - a), "This is the change in index points, not the percentage change."),
          wrong(pct(Number(vals[2]!.toFixed(1))), "Divide by the earlier year's index, not the later one."),
          wrong(pct(b - 100), "This compares with the base year, not with the previous year."),
        ],
        explanation: `Inflation rate = (${b} − ${a}) ÷ ${a} × 100 ≈ ${ans.toFixed(1)}%.${b < a ? " A negative rate is deflation." : ""}`,
      };
    },
  },
  {
    key: "ma-real-gdp",
    unit: 2,
    topics: ["real-vs-nominal-gdp"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const defl = r.pick([80, 105, 110, 120, 125, 150, 160, 200]);
      const real = r.int(20, 90) * 100;
      const nominal = (real * defl) / 100;
      if (!Number.isInteger(nominal)) throw new Retry();
      const vals = [real, (nominal * defl) / 100, nominal - defl, nominal];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `An economy's nominal GDP is ${num(nominal)} billion and its GDP deflator is ${defl}. What is real GDP?`,
        correct: correct(`${num(real)} billion`, `$$\\frac{${nominal}}{${defl}/100}$$.`),
        wrong: [
          wrong(`${num(vals[1]!)} billion`, "This multiplies by the deflator instead of dividing."),
          wrong(`${num(vals[2]!)} billion`, "The deflator is an index; divide by it (over 100), do not subtract it."),
          wrong(`${num(nominal)} billion`, "Nominal and real GDP are equal only when the deflator is 100."),
        ],
        explanation: `Real GDP = nominal GDP ÷ (deflator ÷ 100) = ${nominal} ÷ ${defl / 100} = ${real} billion.`,
      };
    },
  },
  {
    key: "ma-inflation-winners",
    unit: 2,
    topics: ["costs-of-inflation"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const helped = ["A borrower with a fixed-rate mortgage", "A homeowner who took out a fixed-interest loan", "A firm paying workers under a multi-year fixed-wage contract"];
      const hurt = ["A bank that made fixed-rate loans", "A retiree living on a fixed nominal pension", "A saver holding cash", "A worker whose nominal wage is fixed by contract"];
      const askHelped = r.next() < 0.5;
      const right = r.pick(askHelped ? helped : hurt);
      return {
        stem: `Inflation turns out to be much higher than people expected. Which of the following is most likely to be ${askHelped ? "helped" : "hurt"}?`,
        correct: correct(right, askHelped ? "They pay fixed nominal amounts with dollars that are worth less than expected." : "They receive fixed nominal amounts that buy less than expected."),
        wrong: r.sample(askHelped ? hurt : helped, 3).map((w) => wrong(w, askHelped ? "This person receives fixed nominal payments, which lose purchasing power: they are hurt." : "This person pays fixed nominal amounts with cheaper dollars: they are helped.")),
        explanation: "Unexpected inflation redistributes purchasing power from those who receive fixed nominal payments (lenders, savers, fixed-income earners) to those who make them (borrowers).",
      };
    },
  },
  {
    key: "ma-business-cycle",
    unit: 2,
    topics: ["business-cycles"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const pot = r.int(15, 30) * 100;
      const gap = r.int(1, 4) * 50 * r.sign();
      const actual = pot + gap;
      const nru = r.pick([4, 4.5, 5, 5.5]);
      const rate = gap < 0 ? nru + r.pick([1.5, 2, 3]) : nru - r.pick([0.5, 1, 1.5]);
      const right = gap < 0 ? "a recessionary gap, with cyclical unemployment" : "an inflationary gap, with unemployment below its natural rate";
      const opts = [
        "a recessionary gap, with cyclical unemployment",
        "an inflationary gap, with unemployment below its natural rate",
        "long-run equilibrium at full employment",
        gap < 0 ? "an inflationary gap, with cyclical unemployment" : "a recessionary gap, with unemployment below its natural rate",
      ];
      return {
        stem: `Potential real GDP is ${num(pot)} billion, actual real GDP is ${num(actual)} billion, the unemployment rate is ${rate}% and the natural rate of unemployment is ${nru}%. The economy is experiencing`,
        correct: correct(right, gap < 0 ? "Output is below potential and unemployment is above the natural rate." : "Output is above potential and unemployment is below the natural rate."),
        wrong: opts.filter((o) => o !== right).map((o) => wrong(o, "Compare actual with potential output, and the unemployment rate with the natural rate.")),
        explanation: `Actual output is ${Math.abs(gap)} billion ${gap < 0 ? "below" : "above"} potential, and unemployment (${rate}%) is ${gap < 0 ? "above" : "below"} the natural rate (${nru}%).`,
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 3: National income and price determination
// ---------------------------------------------------------------------------

const AD_EVENTS = [
  { e: "consumer confidence rises sharply", dir: "up" as const, comp: "consumption" },
  { e: "household wealth falls as stock prices crash", dir: "down" as const, comp: "consumption" },
  { e: "businesses become pessimistic about future sales", dir: "down" as const, comp: "investment" },
  { e: "the government increases spending on highways", dir: "up" as const, comp: "government purchases" },
  { e: "personal income taxes are cut", dir: "up" as const, comp: "consumption" },
  { e: "incomes in major trading partners fall", dir: "down" as const, comp: "net exports" },
  { e: "the country's currency depreciates", dir: "up" as const, comp: "net exports" },
  { e: "interest rates fall", dir: "up" as const, comp: "investment" },
];
const SRAS_EVENTS = [
  { e: "the price of oil rises sharply", dir: "down" as const },
  { e: "nominal wages fall across the economy", dir: "up" as const },
  { e: "workers and firms come to expect higher inflation", dir: "down" as const },
  { e: "the government gives firms a per-unit production subsidy", dir: "up" as const },
  { e: "a drought raises the price of agricultural inputs", dir: "down" as const },
  { e: "the prices of imported raw materials fall", dir: "up" as const },
];
const LRAS_EVENTS = [
  { e: "a large increase in the country's capital stock", dir: "up" as const },
  { e: "a major improvement in production technology", dir: "up" as const },
  { e: "a lasting rise in the education and skills of the labor force", dir: "up" as const },
  { e: "a war that destroys much of the country's factories and infrastructure", dir: "down" as const },
  { e: "a large permanent increase in the size of the labor force", dir: "up" as const },
];

export const macroUnit3: McqTemplate[] = [
  {
    key: "ma-spending-multiplier",
    unit: 3,
    topics: ["multipliers", "fiscal-policy"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const mpc = r.pick([0.5, 0.6, 0.75, 0.8, 0.9]);
      const mult = 1 / (1 - mpc);
      const dG = r.int(1, 10) * 10;
      const kind = r.pick(["G", "T", "gap"] as const);
      if (kind === "G") {
        const ans = dG * mult;
        const vals = [ans, dG * (mult - 1), dG * mpc, dG / (1 - mpc) / mult + dG];
        if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
        return {
          stem: `The marginal propensity to consume is ${mpc}. If government purchases increase by ${dG} billion, what is the maximum increase in real GDP?`,
          correct: correct(`${num(ans)} billion`, `Spending multiplier $$\\frac{1}{1 - ${mpc}} = ${num(mult)}$$.`),
          wrong: [
            wrong(`${num(vals[1]!)} billion`, "This uses the tax multiplier; government purchases use the spending multiplier."),
            wrong(`${num(vals[2]!)} billion`, "This multiplies by the MPC instead of the multiplier."),
            wrong(`${num(vals[3]!)} billion`, "This doubles the change; the multiplier depends on the MPC."),
          ],
          explanation: `Multiplier = 1 ÷ (1 − ${mpc}) = ${num(mult)}. Maximum change = ${num(mult)} × ${dG} = ${num(ans)} billion.`,
        };
      }
      if (kind === "T") {
        const tm = mpc * mult;
        const ans = dG * tm;
        const vals = [ans, dG * mult, dG * mpc, dG];
        if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
        return {
          stem: `The marginal propensity to consume is ${mpc}. If the government cuts taxes by ${dG} billion, what is the maximum increase in real GDP?`,
          correct: correct(`${num(ans)} billion`, `Tax multiplier $$\\frac{${mpc}}{1 - ${mpc}} = ${num(tm)}$$ in size.`),
          wrong: [
            wrong(`${num(vals[1]!)} billion`, "This uses the spending multiplier; part of a tax cut is saved, so the tax multiplier is smaller."),
            wrong(`${num(vals[2]!)} billion`, "This is only the first round of extra spending."),
            wrong(`${num(vals[3]!)} billion`, "This ignores the multiplier process."),
          ],
          explanation: `Tax multiplier = MPC ÷ (1 − MPC) = ${num(tm)}. Maximum change = ${num(tm)} × ${dG} = ${num(ans)} billion.`,
        };
      }
      const gap = dG * mult;
      const vals = [dG, gap, gap * mpc, gap / (mult - 1)];
      if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
      return {
        stem: `Real GDP is ${num(gap)} billion below full-employment output, and the MPC is ${mpc}. Assuming no crowding out, what increase in government purchases would close the gap?`,
        correct: correct(`${num(dG)} billion`, `Divide the gap by the spending multiplier ${num(mult)}.`),
        wrong: [
          wrong(`${num(gap)} billion`, "The multiplier means government purchases need to rise by less than the gap."),
          wrong(`${num(vals[2]!)} billion`, "This multiplies by the MPC; divide by the multiplier instead."),
          wrong(`${num(vals[3]!)} billion`, "This is the tax cut that would be needed, using the tax multiplier."),
        ],
        explanation: `Spending multiplier = ${num(mult)}. Required increase = ${num(gap)} ÷ ${num(mult)} = ${num(dG)} billion.`,
      };
    },
  },
  {
    key: "ma-curve-shifter",
    unit: 3,
    topics: ["aggregate-demand", "short-run-aggregate-supply", "long-run-aggregate-supply"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const kind = r.pick(["AD", "SRAS", "LRAS"] as const);
      const ev = kind === "AD" ? r.pick(AD_EVENTS) : kind === "SRAS" ? r.pick(SRAS_EVENTS) : r.pick(LRAS_EVENTS);
      const ans = `${kind === "AD" ? "Aggregate demand" : kind === "SRAS" ? "Short-run aggregate supply" : "Long-run aggregate supply (and SRAS)"} shifts ${ev.dir === "up" ? "right" : "left"}.`;
      const pool = [
        "Aggregate demand shifts right.",
        "Aggregate demand shifts left.",
        "Short-run aggregate supply shifts right.",
        "Short-run aggregate supply shifts left.",
        "Long-run aggregate supply (and SRAS) shifts right.",
        "Long-run aggregate supply (and SRAS) shifts left.",
      ];
      return {
        stem: `Which of the following best describes the effect of the following event: ${ev.e}?`,
        correct: correct(ans, kind === "AD" ? `It changes ${(ev as (typeof AD_EVENTS)[number]).comp}, a component of AD.` : kind === "SRAS" ? "It changes production costs in the short run." : "It changes the economy's productive capacity."),
        wrong: r.sample(pool.filter((p) => p !== ans), 3).map((p) => wrong(p, "Identify whether the event changes spending (AD), short-run costs (SRAS) or productive capacity (LRAS), then the direction.")),
        explanation: kind === "AD" ? `The event changes ${(ev as (typeof AD_EVENTS)[number]).comp}, so AD shifts ${ev.dir === "up" ? "right" : "left"}.` : kind === "SRAS" ? `The event changes input costs or expectations, shifting SRAS ${ev.dir === "up" ? "right" : "left"}.` : `The event changes the quantity or quality of resources or technology, shifting LRAS (and SRAS) ${ev.dir === "up" ? "right" : "left"}.`,
      };
    },
  },
  {
    key: "ma-short-run-effects",
    unit: 3,
    topics: ["ad-as-short-run-changes", "ad-as-equilibrium"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const ev = r.pick(AD_EVENTS);
        return {
          stem: `Assume the economy is initially in long-run equilibrium. If ${ev.e}, what happens to the price level and real GDP in the short run?`,
          ...directionChoices(r, ["Price level", "real GDP"], [ev.dir, ev.dir], `AD shifts ${ev.dir === "up" ? "right" : "left"} along the upward-sloping SRAS.`),
          explanation: `The event changes ${ev.comp}, shifting AD ${ev.dir === "up" ? "right" : "left"}. Moving along SRAS, the price level and real GDP move in the same direction.`,
        };
      }
      const ev = r.pick(SRAS_EVENTS);
      return {
        stem: `Assume the economy is initially in long-run equilibrium. If ${ev.e}, what happens to the price level and real GDP in the short run?`,
        ...directionChoices(r, ["Price level", "real GDP"], [up(ev.dir === "down"), ev.dir], `SRAS shifts ${ev.dir === "up" ? "right" : "left"} along AD.`),
        explanation: `The event shifts SRAS ${ev.dir === "up" ? "right" : "left"}. Along a downward-sloping AD, the price level and real GDP move in opposite directions${ev.dir === "down" ? " (stagflation)" : ""}.`,
      };
    },
  },
  {
    key: "ma-gap-policy",
    unit: 3,
    topics: ["fiscal-policy", "ad-as-equilibrium"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const rec = r.next() < 0.5;
      const right = rec ? r.pick(["an increase in government purchases", "a decrease in personal income taxes", "an increase in transfer payments"]) : r.pick(["a decrease in government purchases", "an increase in personal income taxes"]);
      const wrongs = rec ? ["a decrease in government purchases", "an increase in personal income taxes", "a sale of government bonds by the central bank"] : ["an increase in government purchases", "a decrease in personal income taxes", "a purchase of government bonds by the central bank"];
      return {
        stem: `The economy has ${rec ? "a recessionary" : "an inflationary"} gap. Which of the following fiscal policies would be appropriate to close it?`,
        correct: correct(right, rec ? "Expansionary fiscal policy raises AD." : "Contractionary fiscal policy lowers AD."),
        wrong: wrongs.map((w) => wrong(w, w.includes("central bank") ? "This is monetary policy, not fiscal policy, and it moves AD the wrong way." : `This moves AD ${rec ? "left, widening a recessionary gap" : "right, worsening an inflationary gap"}.`)),
        explanation: rec ? "A recessionary gap calls for expansionary fiscal policy: higher government purchases or transfers, or lower taxes, shift AD right." : "An inflationary gap calls for contractionary fiscal policy: lower government purchases or higher taxes shift AD left.",
      };
    },
  },
  {
    key: "ma-self-adjustment",
    unit: 3,
    topics: ["long-run-self-adjustment"],
    skills: ["1", "2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const rec = r.next() < 0.5;
      const right = rec ? "Nominal wages fall, and short-run aggregate supply shifts right." : "Nominal wages rise, and short-run aggregate supply shifts left.";
      return {
        stem: `An economy is in ${rec ? "a recessionary" : "an inflationary"} gap, and the government takes no policy action. Which of the following describes the long-run adjustment?`,
        correct: correct(right, rec ? "High unemployment pushes wages down, lowering costs." : "Low unemployment pushes wages up, raising costs."),
        wrong: [
          wrong(rec ? "Nominal wages rise, and short-run aggregate supply shifts left." : "Nominal wages fall, and short-run aggregate supply shifts right.", "The wage change is in the wrong direction for this gap."),
          wrong(rec ? "Aggregate demand shifts right as consumers regain confidence." : "Aggregate demand shifts left as consumers cut spending.", "Self-adjustment works through wages and SRAS, not AD."),
          wrong(rec ? "Long-run aggregate supply shifts left to meet current output." : "Long-run aggregate supply shifts right to meet current output.", "Potential output does not adjust to the gap; the economy returns to LRAS."),
        ],
        explanation: rec ? "With unemployment above the natural rate, nominal wages eventually fall, SRAS shifts right, and output returns to potential at a lower price level." : "With unemployment below the natural rate, nominal wages rise, SRAS shifts left, and output returns to potential at a higher price level.",
      };
    },
  },
  {
    key: "ma-automatic-stabilizer",
    unit: 3,
    topics: ["automatic-stabilizers"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const auto = ["Unemployment insurance payments that rise as layoffs increase", "A progressive income tax whose revenue falls as incomes fall", "Food assistance payments that rise as more households qualify"];
      const notAuto = ["A new law cutting income tax rates to fight a recession", "A one-time stimulus program passed by the legislature", "The central bank buying government bonds", "An increase in the reserve requirement"];
      const right = r.pick(auto);
      return {
        stem: "Which of the following is an example of an automatic stabilizer?",
        correct: correct(right, "It changes with the business cycle without new legislation."),
        wrong: r.sample(notAuto, 3).map((w) => wrong(w, w.includes("central bank") || w.includes("reserve") ? "This is monetary policy." : "This requires a new decision by policymakers: it is discretionary fiscal policy.")),
        explanation: "Automatic stabilizers are taxes and transfers that rise or fall automatically with income, cushioning the business cycle without new legislation.",
      };
    },
  },
  {
    key: "ma-mpc",
    unit: 3,
    topics: ["multipliers", "aggregate-demand"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const dY = r.int(2, 10) * 100;
      const mpc = r.pick([0.6, 0.75, 0.8, 0.9, 0.5]);
      const dC = dY * mpc;
      const mult = 1 / (1 - mpc);
      const vals = [mult, 1 / mpc, mpc, (mpc * mult)];
      if (new Set(vals.map((v) => v.toFixed(2))).size < 4) throw new Retry();
      return {
        stem: `When disposable income rises by ${dY}, consumption spending rises by ${dC}. What is the value of the spending multiplier?`,
        correct: correct(num(mult), `MPC = ${dC} ÷ ${dY} = ${mpc}, so the multiplier is $$\\frac{1}{1 - ${mpc}}$$.`),
        wrong: [
          wrong(num(Number((1 / mpc).toFixed(2))), "The multiplier is 1 ÷ MPS, not 1 ÷ MPC."),
          wrong(num(mpc), "This is the MPC itself."),
          wrong(num(mpc * mult), "This is the tax multiplier in absolute value."),
        ],
        explanation: `MPC = ΔC ÷ ΔYd = ${mpc}; MPS = ${Number((1 - mpc).toFixed(2))}; spending multiplier = 1 ÷ MPS = ${num(mult)}.`,
      };
    },
  },
  {
    key: "ma-ad-slope",
    unit: 3,
    topics: ["aggregate-demand"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const items = [
        { s: "As the price level falls, the real value of households' savings rises, so they spend more.", a: "The wealth (real balances) effect" },
        { s: "As the price level falls, people need less money for transactions, interest rates fall, and investment rises.", a: "The interest-rate effect" },
        { s: "As the domestic price level falls, domestic goods become cheaper relative to foreign goods, so net exports rise.", a: "The exchange-rate (foreign purchases) effect" },
      ];
      const it = r.pick(items);
      const opts = ["The wealth (real balances) effect", "The interest-rate effect", "The exchange-rate (foreign purchases) effect", "The multiplier effect"];
      return {
        stem: `${it.s} This is an explanation of the downward slope of aggregate demand known as`,
        correct: correct(it.a, "This matches the channel described."),
        wrong: opts.filter((o) => o !== it.a).map((o) => wrong(o, o.includes("multiplier") ? "The multiplier explains the size of AD shifts, not the slope of AD." : "This effect works through a different channel.")),
        explanation: "AD slopes downward because of the wealth effect (real value of assets), the interest-rate effect (money demand and investment) and the exchange-rate effect (net exports).",
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 4: Financial sector
// ---------------------------------------------------------------------------

const MONEY_TOOLS = [
  { a: "buys government bonds on the open market", dir: "up" as const },
  { a: "sells government bonds on the open market", dir: "down" as const },
  { a: "lowers the discount rate", dir: "up" as const },
  { a: "raises the discount rate", dir: "down" as const },
  { a: "lowers the interest rate paid on reserves", dir: "up" as const },
  { a: "raises the interest rate paid on reserves", dir: "down" as const },
  { a: "lowers the required reserve ratio", dir: "up" as const },
];

export const macroUnit4: McqTemplate[] = [
  {
    key: "ma-money-multiplier",
    unit: 4,
    topics: ["banking-and-money-supply"],
    skills: ["3"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const rr = r.pick([0.05, 0.1, 0.2, 0.25]);
      const mult = 1 / rr;
      const dep = r.int(1, 20) * 1000;
      const excess = dep * (1 - rr);
      const kind = r.pick(["cash", "omo"] as const);
      if (kind === "cash") {
        const ans = excess * mult;
        const vals = [ans, dep * mult, excess, ans + dep];
        if (new Set(vals).size < 4) throw new Retry();
        return {
          stem: `The required reserve ratio is ${rr * 100}%. A customer deposits ${num(dep)} of currency into a checking account. Assuming banks hold no excess reserves and the public holds no additional cash, what is the maximum increase in the money supply from new lending?`,
          correct: correct(num(ans), `Excess reserves ${num(excess)} times the money multiplier ${mult}.`),
          wrong: [
            wrong(num(dep * mult), "Only the excess reserves (the deposit minus required reserves) can be lent and multiplied."),
            wrong(num(excess), "This is the first bank's new loans; the multiplier spreads it through the banking system."),
            wrong(num(ans + dep), "The currency deposit itself does not change the money supply; it only changes its form."),
          ],
          explanation: `Required reserves = ${rr} × ${num(dep)} = ${num(dep * rr)}, so excess reserves = ${num(excess)}. Money multiplier = 1 ÷ ${rr} = ${mult}. Maximum new money = ${num(excess)} × ${mult} = ${num(ans)}.`,
        };
      }
      const ans = dep * mult;
      const vals = [ans, excess * mult, dep, dep * rr];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `The required reserve ratio is ${rr * 100}% and banks hold no excess reserves. The central bank buys ${num(dep)} of government bonds from a commercial bank. What is the maximum possible increase in the money supply?`,
        correct: correct(num(ans), `The whole purchase adds excess reserves of ${num(dep)}, multiplied by ${mult}.`),
        wrong: [
          wrong(num(vals[1]!), "When the central bank buys bonds from a bank, all of the payment is new excess reserves; nothing is required against it."),
          wrong(num(dep), "This ignores the money multiplier."),
          wrong(num(vals[3]!), "This is the reserve ratio times the purchase."),
        ],
        explanation: `Buying bonds from a bank gives it ${num(dep)} of new excess reserves. Maximum change in the money supply = ${num(dep)} × ${mult} = ${num(ans)}.`,
      };
    },
  },
  {
    key: "ma-excess-reserves",
    unit: 4,
    topics: ["banking-and-money-supply"],
    skills: ["3", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const rr = r.pick([0.1, 0.2, 0.25, 0.05]);
      const dd = r.int(10, 60) * 100;
      const reserves = dd * rr + r.int(2, 20) * 50;
      const loans = r.int(10, 50) * 100;
      const req = dd * rr;
      const excess = reserves - req;
      const vals = [excess, reserves, req, dd - reserves];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stimulus: {
          text: `A bank's balance sheet is shown. The required reserve ratio is ${rr * 100}%.`,
          table: {
            caption: "Balance sheet",
            columns: [{ key: "a", label: "Assets" }, { key: "av", label: "Amount" }, { key: "l", label: "Liabilities" }, { key: "lv", label: "Amount" }],
            rows: [
              { a: "Reserves", av: reserves, l: "Demand deposits", lv: dd },
              { a: "Loans", av: loans, l: "Owner's equity", lv: reserves + loans - dd },
            ],
          },
        },
        stem: "What is the maximum amount this bank can lend immediately?",
        correct: correct(num(excess), `Its excess reserves: ${num(reserves)} − ${num(req)}.`),
        wrong: [
          wrong(num(reserves), "Required reserves cannot be lent."),
          wrong(num(req), "This is the required reserve amount."),
          wrong(num(vals[3]!), "Lending capacity comes from reserves above the requirement, not deposits minus reserves."),
        ],
        explanation: `Required reserves = ${rr} × ${num(dd)} = ${num(req)}. Excess reserves = ${num(reserves)} − ${num(req)} = ${num(excess)}, which is the most the bank can lend.`,
      };
    },
  },
  {
    key: "ma-monetary-tool",
    unit: 4,
    topics: ["monetary-policy", "money-market"],
    skills: ["1", "2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const tool = r.pick(MONEY_TOOLS);
      return {
        stem: `The central bank ${tool.a}. What happens to the nominal interest rate and aggregate demand in the short run?`,
        ...directionChoices(r, ["Nominal interest rate", "aggregate demand"], [up(tool.dir === "down"), tool.dir], tool.dir === "up" ? "Expansionary policy lowers interest rates and raises investment." : "Contractionary policy raises interest rates and reduces investment."),
        explanation: tool.dir === "up" ? "This is expansionary monetary policy: the money supply rises (or banks lend more), the nominal interest rate falls, investment and consumption rise, and AD shifts right." : "This is contractionary monetary policy: the money supply falls (or banks lend less), the nominal interest rate rises, investment falls, and AD shifts left.",
      };
    },
  },
  {
    key: "ma-money-market-shift",
    unit: 4,
    topics: ["money-market"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const evs = [
        { e: "the price level rises", curve: "money demand", dir: "up" as const },
        { e: "real GDP falls during a recession", curve: "money demand", dir: "down" as const },
        { e: "the central bank buys government bonds", curve: "money supply", dir: "up" as const },
        { e: "the central bank sells government bonds", curve: "money supply", dir: "down" as const },
        { e: "real GDP rises strongly", curve: "money demand", dir: "up" as const },
      ];
      const ev = r.pick(evs);
      const rateUp = ev.curve === "money demand" ? ev.dir === "up" : ev.dir === "down";
      const right = `${ev.curve[0]!.toUpperCase() + ev.curve.slice(1)} ${ev.dir === "up" ? "increases" : "decreases"}, and the nominal interest rate ${rateUp ? "rises" : "falls"}.`;
      const pool = [
        "Money demand increases, and the nominal interest rate rises.",
        "Money demand decreases, and the nominal interest rate falls.",
        "Money supply increases, and the nominal interest rate falls.",
        "Money supply decreases, and the nominal interest rate rises.",
        "Money demand increases, and the nominal interest rate falls.",
        "Money supply increases, and the nominal interest rate rises.",
      ];
      return {
        stem: `In the money market, ${ev.e}. Which of the following is true?`,
        correct: correct(right, ev.curve === "money demand" ? "Changes in the price level or real GDP change how much money people want to hold." : "Open market operations change the money supply."),
        wrong: r.sample(pool.filter((p) => p !== right), 3).map((p) => wrong(p, "Check which curve the event moves, then read the new interest rate from the graph.")),
        explanation: `The event shifts ${ev.curve} ${ev.dir === "up" ? "right" : "left"}; with the other curve fixed, the equilibrium nominal interest rate ${rateUp ? "rises" : "falls"}.`,
      };
    },
  },
  {
    key: "ma-loanable-funds",
    unit: 4,
    topics: ["loanable-funds-market", "crowding-out"],
    skills: ["1", "4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const evs = [
        { e: "the government increases its budget deficit", curve: "D", dir: "up" as const },
        { e: "households decide to save a larger share of their income", curve: "S", dir: "up" as const },
        { e: "businesses expect higher future profits and plan more investment", curve: "D", dir: "up" as const },
        { e: "foreign investors pull their funds out of the country", curve: "S", dir: "down" as const },
        { e: "the government moves from a deficit to a budget surplus", curve: "D", dir: "down" as const },
        { e: "a tax incentive encourages households to save more", curve: "S", dir: "up" as const },
      ];
      const ev = r.pick(evs);
      const rateDir: Dir = ev.curve === "D" ? ev.dir : up(ev.dir === "down");
      return {
        stem: `In the loanable funds market, ${ev.e}. What happens to the real interest rate and the equilibrium quantity of loanable funds?`,
        ...directionChoices(r, ["Real interest rate", "quantity of loanable funds"], [rateDir, ev.dir], `${ev.curve === "D" ? "Demand for" : "Supply of"} loanable funds ${ev.dir === "up" ? "increases" : "decreases"}.`),
        explanation: `The event shifts the ${ev.curve === "D" ? "demand for" : "supply of"} loanable funds ${ev.dir === "up" ? "right" : "left"}. ${ev.curve === "D" ? "A demand shift moves the real rate and quantity in the same direction." : "A supply shift moves the real rate and quantity in opposite directions."}`,
      };
    },
  },
  {
    key: "ma-real-interest",
    unit: 4,
    topics: ["nominal-vs-real-interest-rates"],
    skills: ["3"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const nom = r.int(3, 12);
      const inf = r.int(1, 8);
      if (r.next() < 0.5) {
        const ans = nom - inf;
        const vals = [ans, nom + inf, inf - nom, nom * inf];
        if (new Set(vals).size < 4) throw new Retry();
        return {
          stem: `A savings account pays a nominal interest rate of ${nom}%, and the inflation rate is ${inf}%. What is the real interest rate?`,
          correct: correct(pct(ans), "Real rate = nominal rate − inflation."),
          wrong: [wrong(pct(nom + inf), "Inflation is subtracted, not added."), wrong(pct(inf - nom), "The subtraction is reversed."), wrong(pct(nom * inf), "The rates are subtracted, not multiplied.")],
          explanation: `Real interest rate = ${nom}% − ${inf}% = ${ans}%.`,
        };
      }
      const real = r.int(1, 6);
      const ans = real + inf;
      const vals = [ans, real, inf, real - inf];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `A lender wants to earn a real return of ${real}% and expects inflation of ${inf}%. What nominal interest rate should it charge?`,
        correct: correct(pct(ans), "Nominal rate = real rate + expected inflation."),
        wrong: [wrong(pct(real), "This ignores inflation; the lender would earn less in real terms."), wrong(pct(inf), "This covers inflation only, with no real return."), wrong(pct(real - inf), "Expected inflation is added, not subtracted.")],
        explanation: `Nominal rate = ${real}% + ${inf}% = ${ans}%.`,
      };
    },
  },
  {
    key: "ma-bond-prices",
    unit: 4,
    topics: ["financial-assets"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const rise = r.next() < 0.5;
      const right = rise ? "The price of existing bonds falls." : "The price of existing bonds rises.";
      return {
        stem: `Market interest rates ${rise ? "rise" : "fall"} unexpectedly. Which of the following is most likely?`,
        correct: correct(right, "Bond prices and interest rates move in opposite directions."),
        wrong: [
          wrong(rise ? "The price of existing bonds rises." : "The price of existing bonds falls.", "Bond prices move opposite to interest rates."),
          wrong("The fixed interest payment on existing bonds changes to match the new rate.", "An existing bond's coupon payment is fixed; its price adjusts instead."),
          wrong("Bond prices are unaffected, because bonds pay a fixed amount.", "Because the payment is fixed, the price must change for the bond to offer a competitive return."),
        ],
        explanation: `When market rates ${rise ? "rise, new bonds pay more, so buyers pay less for existing lower-paying bonds" : "fall, existing bonds paying the old higher amount become more valuable"}.`,
      };
    },
  },
  {
    key: "ma-money-supply-measures",
    unit: 4,
    topics: ["money-functions-and-measurement"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const amt = r.int(1, 20) * 100;
      const items = [
        { s: `moves ${amt} from a checking account to a small-denomination certificate of deposit`, a: `M1 decreases by ${amt}, and M2 is unchanged.` },
        { s: `withdraws ${amt} in cash from a checking account`, a: "Both M1 and M2 are unchanged." },
        { s: `uses ${amt} from a checking account to buy shares of stock`, a: "Both M1 and M2 are unchanged, because the money goes to the seller of the stock." },
      ];
      const it = r.pick(items);
      const all = [`M1 decreases by ${amt}, and M2 is unchanged.`, "Both M1 and M2 are unchanged.", `M1 and M2 both decrease by ${amt}.`, `M1 is unchanged, and M2 increases by ${amt}.`, "Both M1 and M2 are unchanged, because the money goes to the seller of the stock."];
      return {
        stem: `A household ${it.s}. Which of the following is true?`,
        correct: correct(it.a, "Check which measures each asset belongs to."),
        wrong: r.sample(all.filter((a) => a !== it.a && !(it.a.startsWith("Both") && a.startsWith("Both"))), 3).map((a) => wrong(a, "Currency, checkable and savings deposits are in M1; small time deposits are in M2 only; stocks are not money.")),
        explanation: "M1 includes currency, checkable deposits and savings deposits. M2 adds small time deposits and retail money market funds. Moving funds within M1 changes nothing; moving from M1 to an M2-only asset lowers M1 but not M2.",
      };
    },
  },
  {
    key: "ma-money-functions",
    unit: 4,
    topics: ["money-functions-and-measurement"],
    skills: ["1"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const items = [
        { s: "A shopper compares the prices of two jackets listed in dollars.", a: "Unit of account" },
        { s: "A student saves part of a paycheck to spend next year.", a: "Store of value" },
        { s: "A customer pays for groceries with cash.", a: "Medium of exchange" },
        { s: "A firm records the value of its inventory in dollars.", a: "Unit of account" },
        { s: "A worker accepts dollars for a day of labor rather than goods.", a: "Medium of exchange" },
      ];
      const it = r.pick(items);
      const opts = ["Medium of exchange", "Unit of account", "Store of value", "Standard of deferred taxation"];
      return {
        stem: `${it.s} Which function of money does this illustrate?`,
        correct: correct(it.a, "This matches how money is being used."),
        wrong: opts.filter((o) => o !== it.a).map((o) => wrong(o, o.startsWith("Standard") ? "This is not one of the functions of money." : "Money is being used in a different role here.")),
        explanation: "Money serves as a medium of exchange (used in trades), a unit of account (measures value) and a store of value (holds purchasing power over time).",
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 5: Long-run consequences of stabilization policies
// ---------------------------------------------------------------------------

export const macroUnit5: McqTemplate[] = [
  {
    key: "ma-phillips",
    unit: 5,
    topics: ["phillips-curve"],
    skills: ["1", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const items = [
        { e: "aggregate demand increases", a: "A movement up and to the left along the short-run Phillips curve" },
        { e: "aggregate demand decreases", a: "A movement down and to the right along the short-run Phillips curve" },
        { e: "the price of oil rises sharply, shifting SRAS left", a: "A rightward (upward) shift of the short-run Phillips curve" },
        { e: "expected inflation falls", a: "A leftward (downward) shift of the short-run Phillips curve" },
        { e: "expected inflation rises", a: "A rightward (upward) shift of the short-run Phillips curve" },
        { e: "productivity rises, shifting SRAS right", a: "A leftward (downward) shift of the short-run Phillips curve" },
      ];
      const it = r.pick(items);
      const all = [...new Set(items.map((i) => i.a)), "A rightward shift of the long-run Phillips curve"];
      return {
        stem: `If ${it.e}, which of the following best describes the effect on the Phillips curve?`,
        correct: correct(it.a, "Demand changes move along the SRPC; supply shocks and expected inflation shift it."),
        wrong: r.sample(all.filter((a) => a !== it.a), 3).map((a) => wrong(a, a.includes("long-run") ? "The LRPC shifts only when the natural rate of unemployment changes." : "Distinguish a movement along the SRPC (AD changes) from a shift of the SRPC (supply shocks, expected inflation).")),
        explanation: "Changes in AD move the economy along the SRPC (inflation and unemployment move in opposite directions). Supply shocks and changes in expected inflation shift the SRPC.",
      };
    },
  },
  {
    key: "ma-quantity-theory",
    unit: 5,
    topics: ["money-growth-and-inflation"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      if (r.next() < 0.5) {
        const gm = r.int(3, 15);
        const gy = r.int(1, 4);
        const ans = gm - gy;
        const vals = [ans, gm + gy, gm, gy];
        if (new Set(vals).size < 4 || ans <= 0) throw new Retry();
        return {
          stem: `Assume velocity is constant. If the money supply grows by ${gm}% per year and real output grows by ${gy}% per year, what is the approximate inflation rate according to the quantity theory of money?`,
          correct: correct(pct(ans), "%ΔM + %ΔV = %ΔP + %ΔY."),
          wrong: [wrong(pct(gm + gy), "Real output growth absorbs part of the money growth; subtract it."), wrong(pct(gm), "This ignores the growth in real output."), wrong(pct(gy), "This is the growth rate of real output.")],
          explanation: `With constant velocity: ${gm}% ≈ inflation + ${gy}%, so inflation ≈ ${ans}%.`,
        };
      }
      const M = r.int(2, 10) * 100;
      const V = r.int(2, 6);
      const Y = r.pick([200, 400, 500, 800, 1000]);
      const P = (M * V) / Y;
      if (!Number.isInteger(P * 100)) throw new Retry();
      const vals = [P, (M * Y) / V, M / Y, V];
      if (new Set(vals.map((v) => v.toFixed(2))).size < 4) throw new Retry();
      return {
        stem: `In an economy, the money supply is ${M}, velocity is ${V} and real output is ${Y}. According to the equation of exchange, what is the price level?`,
        correct: correct(num(P), "$$P = \\frac{MV}{Y}$$."),
        wrong: [wrong(num(vals[1]!), "Rearrange MV = PY for P: divide by Y."), wrong(num(Number((M / Y).toFixed(2))), "Velocity must be included."), wrong(num(V), "This is velocity, not the price level.")],
        explanation: `$$MV = PY$$, so $$P = \\frac{${M} \\times ${V}}{${Y}} = ${P}$$.`,
      };
    },
  },
  {
    key: "ma-deficit-debt",
    unit: 5,
    topics: ["deficits-and-debt"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const debt = r.int(5, 30) * 100;
      const G = r.int(20, 50) * 10;
      const T = G + r.int(-15, 5) * 10;
      const deficit = G - T;
      if (deficit === 0) throw new Retry();
      const ans = debt + deficit;
      const vals = [ans, debt - deficit, deficit, debt];
      if (new Set(vals).size < 4) throw new Retry();
      return {
        stem: `At the start of the year, a government's debt is ${num(debt)} billion. During the year it spends ${num(G)} billion (including transfers) and collects ${num(T)} billion in taxes. What is the debt at the end of the year?`,
        correct: correct(`${num(ans)} billion`, deficit > 0 ? `The deficit of ${deficit} adds to the debt.` : `The surplus of ${-deficit} reduces the debt.`),
        wrong: [
          wrong(`${num(vals[1]!)} billion`, "Sign error: a deficit increases the debt and a surplus reduces it."),
          wrong(`${num(Math.abs(deficit))} billion`, "This is this year's deficit (or surplus), a flow, not the debt, a stock."),
          wrong(`${num(debt)} billion`, "The debt changes whenever the budget is not balanced."),
        ],
        explanation: `Budget balance = taxes − spending = ${T} − ${G} = ${T - G}. Debt at year end = ${debt} + ${deficit} = ${ans} billion.`,
      };
    },
  },
  {
    key: "ma-crowding-out",
    unit: 5,
    topics: ["crowding-out", "loanable-funds-market"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const right = "The real interest rate rises, private investment falls, and long-run growth slows.";
      return {
        stem: r.pick([
          "The government finances a large increase in spending by borrowing, while the economy is near full employment. Which of the following is most likely?",
          "A government runs persistent budget deficits financed by selling bonds to the public. Which of the following describes the likely long-run effect?",
        ]),
        correct: correct(right, "Government borrowing raises demand for loanable funds, crowding out private investment."),
        wrong: [
          wrong("The real interest rate falls, private investment rises, and long-run growth speeds up.", "Borrowing increases demand for loanable funds, raising, not lowering, the real interest rate."),
          wrong("The money supply increases, the nominal interest rate falls, and investment rises.", "Selling bonds to the public does not create money; that would require the central bank."),
          wrong("The real interest rate rises, private investment rises, and the capital stock grows faster.", "Higher real interest rates make investment more expensive, so it falls."),
        ],
        explanation: "Deficit borrowing shifts demand for loanable funds right (or supply left), raising the real interest rate. Higher rates reduce private investment, slowing growth of the capital stock and of LRAS.",
      };
    },
  },
  {
    key: "ma-rule-of-70",
    unit: 5,
    topics: ["economic-growth"],
    skills: ["3"],
    difficulty: 1,
    calc: false,
    gen(r) {
      const g = r.pick([1, 1.4, 2, 2.5, 3.5, 5, 7]);
      const ans = 70 / g;
      const vals = [ans, 100 / g, 70 * g, 2 * g];
      if (new Set(vals.map((v) => v.toFixed(1))).size < 4) throw new Retry();
      return {
        stem: `Real GDP per capita grows at a constant ${g}% per year. Using the rule of 70, about how many years will it take to double?`,
        correct: correct(`${num(ans)} years`, `70 ÷ ${g}.`),
        wrong: [wrong(`${num(vals[1]!)} years`, "The rule uses 70, not 100, because of compounding."), wrong(`${num(vals[2]!)} years`, "Divide 70 by the growth rate; do not multiply."), wrong(`${num(vals[3]!)} years`, "This doubles the growth rate rather than finding a doubling time.")],
        explanation: `Doubling time ≈ 70 ÷ growth rate = 70 ÷ ${g} ≈ ${num(ans)} years.`,
      };
    },
  },
  {
    key: "ma-growth-sources",
    unit: 5,
    topics: ["economic-growth", "public-policy-and-growth"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const yes = ["Increased spending on education and job training", "Government investment in roads and communication networks", "Tax incentives for business investment in new equipment", "Subsidies for research and development"];
      const no = ["A one-time tax rebate to households to boost spending", "An increase in the money supply", "A rise in the price level", "An increase in transfer payments during a recession"];
      return {
        stem: "Which of the following policies is most likely to increase long-run economic growth?",
        correct: correct(r.pick(yes), "It increases physical capital, human capital or technology, shifting LRAS right."),
        wrong: r.sample(no, 3).map((w) => wrong(w, "This affects aggregate demand or prices in the short run, not productive capacity.")),
        explanation: "Long-run growth comes from more and better physical capital, human capital and technology. Policies that only change spending in the short run do not shift LRAS.",
      };
    },
  },
  {
    key: "ma-policy-mix",
    unit: 5,
    topics: ["policy-actions-short-run"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const fe = r.next() < 0.5; // fiscal expansionary
      const me = r.next() < 0.5; // monetary expansionary
      const ad: Dir = fe === me ? up(fe) : "?";
      const rate: Dir = fe !== me ? up(fe) : "?";
      return {
        stem: `The government ${fe ? "increases its purchases" : "cuts its purchases"} while the central bank ${me ? "buys" : "sells"} government bonds. What happens to aggregate demand and the interest rate?`,
        ...directionChoices(r, ["Aggregate demand", "the interest rate"], [ad, rate], "Combine the effects of each policy."),
        explanation: `Fiscal policy: AD ${fe ? "right" : "left"}, interest rate ${fe ? "up" : "down"} (more or less borrowing). Monetary policy: AD ${me ? "right" : "left"}, interest rate ${me ? "down" : "up"}. Where the policies agree the result is certain; where they conflict it is indeterminate.`,
      };
    },
  },
  {
    key: "ma-long-run-policy",
    unit: 5,
    topics: ["policy-actions-short-run", "phillips-curve"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      return {
        stem: `An economy is in long-run equilibrium at full employment. The government permanently increases its purchases. ${r.pick(["After all adjustments,", "In the long run,"])} which of the following is true?`,
        correct: correct("Real GDP returns to full-employment output and the price level is higher.", "In the long run, output is set by LRAS; only the price level is higher."),
        wrong: [
          wrong("Real GDP stays permanently above full-employment output and the price level is higher.", "Rising wages shift SRAS left until output returns to potential."),
          wrong("Real GDP and the price level both return to their original levels.", "AD remains higher, so the price level stays higher."),
          wrong("Unemployment stays permanently below its natural rate.", "The long-run Phillips curve is vertical at the natural rate."),
        ],
        explanation: "AD shifts right, creating an inflationary gap. Nominal wages then rise, SRAS shifts left, and output returns to full employment at a higher price level.",
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Unit 6: Open economy
// ---------------------------------------------------------------------------

export const macroUnit6: McqTemplate[] = [
  {
    key: "ma-bop",
    unit: 6,
    topics: ["balance-of-payments"],
    skills: ["1"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const [home, other] = r.sample(COUNTRIES, 2) as [string, string];
      const items = [
        { s: `A firm in ${home} exports machinery to ${other}.`, a: "Current account, as a credit" },
        { s: `Residents of ${home} buy wine imported from ${other}.`, a: "Current account, as a debit" },
        { s: `An investor in ${other} buys government bonds issued by ${home}.`, a: "Financial account, as a credit (inflow)" },
        { s: `A company in ${home} builds a factory in ${other}.`, a: "Financial account, as a debit (outflow)" },
        { s: `Tourists from ${other} pay for hotels in ${home}.`, a: "Current account, as a credit" },
        { s: `A resident of ${home} buys shares of a company based in ${other}.`, a: "Financial account, as a debit (outflow)" },
      ];
      const it = r.pick(items);
      const all = ["Current account, as a credit", "Current account, as a debit", "Financial account, as a credit (inflow)", "Financial account, as a debit (outflow)"];
      return {
        stem: `${it.s} How is this transaction recorded in ${home}'s balance of payments?`,
        correct: correct(it.a, "Goods, services and income go in the current account; asset purchases in the financial account. Money flowing in is a credit."),
        wrong: all.filter((a) => a !== it.a).map((a) => wrong(a, "Decide whether goods or services (current account) or assets (financial account) change hands, then which way the money flows.")),
        explanation: "Trade in goods and services is recorded in the current account; purchases and sales of assets in the financial account. Transactions that bring money into the country are credits.",
      };
    },
  },
  {
    key: "ma-bop-balance",
    unit: 6,
    topics: ["balance-of-payments"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const ca = r.int(-40, 40) * 10;
      if (ca === 0) throw new Retry();
      const ans = -ca;
      return {
        stem: `A country's current account balance is ${ca > 0 ? "a surplus" : "a deficit"} of ${Math.abs(ca)} billion. Ignoring any statistical discrepancy, what is its financial account balance?`,
        correct: correct(`A ${ans > 0 ? "surplus" : "deficit"} of ${Math.abs(ans)} billion`, "The two accounts sum to zero."),
        wrong: [
          wrong(`A ${ca > 0 ? "surplus" : "deficit"} of ${Math.abs(ca)} billion`, "The financial account offsets the current account, so it has the opposite sign."),
          wrong("Zero, because the accounts are independent", "Every payment for net imports must be financed by a net inflow of capital, so the accounts are linked."),
          wrong(`A ${ans > 0 ? "surplus" : "deficit"} of ${Math.abs(ca) * 2} billion`, "The offset is equal in size, not double."),
        ],
        explanation: `Current account + financial account = 0, so the financial account balance is ${ans > 0 ? "+" : ""}${ans} billion.`,
      };
    },
  },
  {
    key: "ma-exchange-rate-calc",
    unit: 6,
    topics: ["exchange-rates"],
    skills: ["3"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const [a, b] = r.sample(COUNTRIES, 2) as [string, string];
      const ca = CURRENCIES[a]!;
      const cb = CURRENCIES[b]!;
      const rate1 = r.pick([2, 4, 5, 8, 10]);
      const rate2 = rate1 + r.pick([-1, 1, 2, -2]);
      if (rate2 <= 0) throw new Retry();
      const price = r.int(2, 20) * 10;
      if (r.next() < 0.5) {
        const appreciates = rate2 > rate1;
        return {
          stem: `The exchange rate changes from ${rate1} ${cb}s per ${ca} to ${rate2} ${cb}s per ${ca}. Which of the following is true?`,
          correct: correct(`The ${ca} ${appreciates ? "appreciated" : "depreciated"}, and the ${cb} ${appreciates ? "depreciated" : "appreciated"}.`, `One ${ca} now buys ${appreciates ? "more" : "fewer"} ${cb}s.`),
          wrong: [
            wrong(`The ${ca} ${appreciates ? "depreciated" : "appreciated"}, and the ${cb} ${appreciates ? "appreciated" : "depreciated"}.`, "Check which currency the rate measures: it is the price of one " + ca + "."),
            wrong(`Both currencies ${appreciates ? "appreciated" : "depreciated"}.`, "When one currency appreciates against another, the other must depreciate."),
            wrong("Neither currency changed in value.", "A change in the exchange rate means the relative values changed."),
          ],
          explanation: `The rate is the price of a ${ca} in ${cb}s. It ${appreciates ? "rose" : "fell"}, so the ${ca} ${appreciates ? "appreciated" : "depreciated"} and the ${cb} moved the other way.`,
        };
      }
      const cost = price * rate1;
      return {
        stem: `The exchange rate is ${rate1} ${cb}s per ${ca}. A good priced at ${price} ${ca}s in ${a} is sold in ${b}. What is its price in ${cb}s?`,
        correct: correct(`${num(cost)} ${cb}s`, `${price} × ${rate1}.`),
        wrong: [
          wrong(`${num(Number((price / rate1).toFixed(2)))} ${cb}s`, "Each " + ca + " is worth " + rate1 + " " + cb + "s, so multiply."),
          wrong(`${num(price)} ${cb}s`, "The price must be converted at the exchange rate."),
          wrong(`${num(price + rate1)} ${cb}s`, "Currency conversion multiplies by the rate; it does not add."),
        ],
        explanation: `${price} ${ca}s × ${rate1} ${cb}s per ${ca} = ${cost} ${cb}s.`,
      };
    },
  },
  {
    key: "ma-fx-event",
    unit: 6,
    topics: ["fx-policy-effects", "foreign-exchange-market"],
    skills: ["1", "4"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const [home, other] = r.sample(COUNTRIES, 2) as [string, string];
      const c = CURRENCIES[home]!;
      const evs = [
        { e: `real interest rates in ${home} rise relative to ${other}`, curve: "demand for", dir: "up", value: "appreciates" },
        { e: `inflation in ${home} rises relative to ${other}`, curve: "demand for", dir: "down", value: "depreciates" },
        { e: `consumers in ${other} buy more goods made in ${home}`, curve: "demand for", dir: "up", value: "appreciates" },
        { e: `incomes in ${home} rise and its residents buy more imports from ${other}`, curve: "supply of", dir: "up", value: "depreciates" },
        { e: `the central bank of ${home} buys government bonds, lowering interest rates`, curve: "supply of", dir: "up", value: "depreciates" },
        { e: `the central bank of ${home} raises the interest rate it pays on reserves`, curve: "demand for", dir: "up", value: "appreciates" },
      ];
      const ev = r.pick(evs);
      const right = `The ${ev.curve} the ${c} ${ev.dir === "up" ? "increases" : "decreases"}, and the ${c} ${ev.value}.`;
      const pool = [
        `The demand for the ${c} increases, and the ${c} appreciates.`,
        `The demand for the ${c} decreases, and the ${c} depreciates.`,
        `The supply of the ${c} increases, and the ${c} depreciates.`,
        `The supply of the ${c} decreases, and the ${c} appreciates.`,
        `The demand for the ${c} increases, and the ${c} depreciates.`,
      ];
      return {
        stem: `${home}'s currency is the ${c}. If ${ev.e}, what happens in the foreign exchange market for the ${c}?`,
        correct: correct(right, "Foreigners demand the currency to buy its goods and assets; residents supply it to buy foreign goods and assets."),
        wrong: r.sample(pool.filter((p) => p !== right), 3).map((p) => wrong(p, "Identify who changes their behavior, foreigners (demand) or residents (supply), and in which direction.")),
        explanation: `${ev.curve === "demand for" ? "Foreign buyers" : "Residents"} change their purchases, so the ${ev.curve} the ${c} ${ev.dir === "up" ? "increases" : "decreases"} and the ${c} ${ev.value}.`,
      };
    },
  },
  {
    key: "ma-fx-net-exports",
    unit: 6,
    topics: ["fx-and-net-exports"],
    skills: ["2"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const home = r.pick(COUNTRIES);
      const c = CURRENCIES[home]!;
      const appr = r.next() < 0.5;
      return {
        stem: `${home}'s currency, the ${c}, ${appr ? "appreciates" : "depreciates"} significantly. What happens to ${home}'s net exports and aggregate demand?`,
        ...directionChoices(r, ["Net exports", "aggregate demand"], [up(!appr), up(!appr)], appr ? "Exports become more expensive abroad and imports cheaper." : "Exports become cheaper abroad and imports more expensive."),
        explanation: appr ? `A stronger ${c} makes ${home}'s exports pricier and imports cheaper, so net exports fall and AD shifts left.` : `A weaker ${c} makes ${home}'s exports cheaper and imports pricier, so net exports rise and AD shifts right.`,
      };
    },
  },
  {
    key: "ma-capital-flows",
    unit: 6,
    topics: ["capital-flows"],
    skills: ["2"],
    difficulty: 3,
    calc: false,
    gen(r) {
      const [home, other] = r.sample(COUNTRIES, 2) as [string, string];
      const right = `Financial capital flows into ${home}, and its currency appreciates.`;
      return {
        stem: `The real interest rate in ${home} rises relative to the real interest rate in ${other}. Which of the following is most likely?`,
        correct: correct(right, "Investors seek higher real returns, increasing demand for the currency."),
        wrong: [
          wrong(`Financial capital flows out of ${home}, and its currency depreciates.`, "Higher real returns attract capital rather than repelling it."),
          wrong(`Financial capital flows into ${home}, and its currency depreciates.`, "Capital inflows increase demand for the currency, so it appreciates."),
          wrong(`The supply of loanable funds in ${home} decreases.`, "Capital inflows add to the supply of loanable funds."),
        ],
        explanation: `Higher real interest rates attract foreign financial investment into ${home}. Foreigners must buy ${home}'s currency, so it appreciates, and the inflow adds to ${home}'s supply of loanable funds.`,
      };
    },
  },
];
