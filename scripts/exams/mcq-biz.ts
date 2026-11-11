/* AP Business with Personal Finance multiple choice: computed business and personal-finance math plus concept pools. */
import { options } from "./csa-lib";
import type { Rng } from "./lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], skills: string[], difficulty: number, gen: McqTemplate["gen"]): McqTemplate => ({ key, unit, topics, skills, difficulty, calc: true, gen });
const usd = (x: number, cents = false) => (x < 0 ? "−" : "") + "$" + Math.abs(x).toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
const pct = (x: number, d = 1) => `${Number((x * 100).toFixed(d))}%`;
const money = (right: number, why: string, wrongs: [number, string][], cents = false) => options([usd(right, cents), why], wrongs.filter(([v]) => Number.isFinite(v)).map(([v, w]) => [usd(v, cents), w]));
const percent = (right: number, why: string, wrongs: [number, string][], d = 1) => options([pct(right, d), why], wrongs.filter(([v]) => Number.isFinite(v)).map(([v, w]) => [pct(v, d), w]));

interface Item {
  stem: string;
  right: [string, string];
  wrong: [string, string][];
}
const pool = (key: string, unit: number, topics: string[], skills: string[], items: Item[]) =>
  t(key, unit, topics, skills, 2, (r) => {
    const it = r.pick(items);
    return { stem: it.stem, ...options(it.right, r.shuffle(it.wrong)), explanation: it.right[1] };
  });

const BIZ = ["Maple Street Bakery", "Brightline Bikes", "Kova Coffee", "Pixel Print Shop", "GreenLeaf Landscaping", "Harbor Outfitters", "Nimbus Apps", "Sunrise Smoothies"];
const PEOPLE = ["Ana", "Ben", "Chen", "Dara", "Eli", "Farah", "Gus", "Hana", "Ivan", "Jada", "Kai", "Lena"];
const round = (x: number, step: number) => Math.round(x / step) * step;
const pickName = (r: Rng) => r.pick(PEOPLE);

/* ---------------- Unit 1 ---------------- */
export const bizUnit1: McqTemplate[] = [
  t("bz-market-share", 1, ["markets-and-competitive-advantage"], ["1"], 2, (r) => {
    const names = r.sample(["VistaWare", "Orbio", "Kinetica", "Lumen", "Northline"], 4);
    const sales = names.map(() => r.int(2, 30) * 5);
    const total = sales.reduce((a, b) => a + b, 0);
    const i = r.int(0, 3);
    const share = sales[i]! / total;
    return {
      stimulus: { table: { caption: "Annual sales in the market ($ millions)", columns: [{ key: "c", label: "Company" }, { key: "s", label: "Sales" }], rows: names.map((c, k) => ({ c, s: sales[k]! })) } },
      stem: `What is ${names[i]}'s market share by revenue?`,
      ...percent(share, "Company sales divided by total market sales.", [[sales[i]! / (total - sales[i]!), "Divide by the total market, including the company itself."], [sales[i]! / Math.max(...sales), "Divide by the market total, not the leader's sales."], [1 / 4, "Shares are based on sales, not the number of companies."]]),
      explanation: `${sales[i]} ÷ ${total} = ${pct(share)}.`,
    };
  }),
  t("bz-supplier-cost", 1, ["supply-chains"], ["3"], 2, (r) => {
    const q = r.int(5, 40) * 100;
    const a = r.int(150, 400) / 100;
    const b = Number((a + r.int(20, 90) / 100).toFixed(2));
    const shipA = r.int(8, 40) * 100;
    const shipB = r.int(1, 6) * 100;
    const totA = q * a + shipA;
    const totB = q * b + shipB;
    if (Math.abs(totA - totB) < 50) throw new Retry();
    const cheap = totA < totB ? "A" : "B";
    return {
      stem: `A business needs ${q.toLocaleString("en-US")} units. Supplier A charges ${usd(a, true)} per unit plus ${usd(shipA)} shipping. Supplier B charges ${usd(b, true)} per unit plus ${usd(shipB)} shipping. Which is cheaper in total, and by how much?`,
      ...options([`Supplier ${cheap}, by ${usd(Math.abs(totA - totB))}`, `Totals: A ${usd(totA)}, B ${usd(totB)}.`], [[`Supplier ${cheap === "A" ? "B" : "A"}, by ${usd(Math.abs(totA - totB))}`, "Compare the full totals, including shipping."], [`Supplier A, because its unit price is lower`, "Shipping can outweigh a lower unit price."], [`Supplier ${cheap}, by ${usd(Math.abs((a - b) * q))}`, "Include the shipping charges."]]),
      explanation: `A: ${q} × ${usd(a, true)} + ${usd(shipA)} = ${usd(totA)}. B: ${q} × ${usd(b, true)} + ${usd(shipB)} = ${usd(totB)}.`,
    };
  }),
  t("bz-pestel", 1, ["pestel-factors-and-the-business-environment"], ["1"], 1, (r) => {
    const items: [string, string][] = [
      ["The central bank raises interest rates, making business loans more expensive.", "Economic"],
      ["A new law requires apps to get parental consent before collecting data from children.", "Legal"],
      ["Growing interest in plant-based diets increases demand for meat alternatives.", "Social"],
      ["A new trade agreement removes tariffs on imported parts.", "Political"],
      ["Advances in battery technology lower the cost of electric delivery vans.", "Technological"],
      ["More frequent droughts reduce the supply of locally grown produce.", "Environmental"],
      ["An aging population increases demand for home health services.", "Social"],
      ["Inflation raises the cost of raw materials.", "Economic"],
      ["The government announces subsidies for solar panel installation.", "Political"],
      ["Customers increasingly expect sustainable packaging.", "Environmental"],
    ];
    const [s, a] = r.pick(items);
    return {
      stem: `${s} Which PESTEL factor does this represent?`,
      ...options([a, `It concerns ${a.toLowerCase()} conditions in the business environment.`], r.shuffle(["Political", "Economic", "Social", "Technological", "Environmental", "Legal"].filter((x) => x !== a)).slice(0, 3).map((x) => [x, "Identify the source of the change in the environment."] as [string, string])),
      explanation: `${a}.`,
    };
  }),
  pool("bz-u1-concepts", 1, ["what-is-a-business", "vision", "business-ethics", "organization-roles-and-responsibilities", "markets-and-competitive-advantage", "how-do-business-ideas-originate"], ["1"], [
    { stem: "Two founders want limited personal liability and simple pass-through taxation. Which form of business best fits?", right: ["A limited liability company (LLC)", "LLCs offer limited liability with flexible, simple taxation."], wrong: [["A sole proprietorship", "That has unlimited liability."], ["A general partnership", "Partners usually have unlimited liability."], ["A nonprofit", "Nonprofits do not distribute profits to owners."]] },
    { stem: "Which is a vision statement rather than a mission statement?", right: ["\"A world where every family has access to fresh, affordable food.\"", "Vision describes the long-term future the organization wants."], wrong: [["\"We deliver fresh groceries to homes in Springfield within two hours.\"", "That describes what the business does now: a mission."], ["\"Increase deliveries 15% by June.\"", "That is a goal."], ["\"We value honesty and teamwork.\"", "That is a values statement."]] },
    { stem: "Which goal is SMART?", right: ["Increase online sales from $40,000 to $50,000 per month by December 31", "It is specific, measurable and time-bound."], wrong: [["Become the best store in town", "Not measurable or time-bound."], ["Grow sales a lot", "Not specific or measurable."], ["Improve customer happiness soon", "Not measurable or time-bound."]] },
    { stem: "A purchasing manager awards a contract to a company owned by her brother without disclosing the relationship. What is the ethical problem?", right: ["A conflict of interest", "Personal interests influenced a business decision."], wrong: [["Price discrimination", "Unrelated."], ["Market segmentation", "Unrelated."], ["Limited liability", "Unrelated."]] },
    { stem: "A company sells the lowest-priced basic laptops by producing at huge scale. What competitive strategy is this?", right: ["Cost leadership", "It competes on low cost and price."], wrong: [["Differentiation", "That relies on unique features."], ["Vertical integration", "That is about owning the supply chain."], ["Skimming", "That is a high launch price."]] },
    { stem: "Which department is mainly responsible for recruiting, training and benefits?", right: ["Human resources", "HR manages people."], wrong: [["Marketing", "Marketing manages customers and promotion."], ["Operations", "Operations produces the product."], ["Accounting", "Accounting records finances."]] },
    { stem: "A student notices that classmates struggle to find quiet study spaces and starts an app listing open rooms. Where did this business idea come from?", right: ["Identifying a problem experienced by a group of customers", "Many ideas start from an unmet need."], wrong: [["Copying a competitor exactly", "No competitor is described."], ["A PESTEL legal change", "No law is involved."], ["A financial statement", "Unrelated."]] },
    { stem: "Which organizational structure has few management levels and wide spans of control?", right: ["A flat structure", "Flat structures have few layers."], wrong: [["A tall structure", "Tall structures have many layers."], ["A divisional structure", "That groups by product or region."], ["A matrix structure", "That combines function and project lines."]] },
  ]),
];

/* ---------------- Unit 2 ---------------- */
export const bizUnit2: McqTemplate[] = [
  t("bz-markup", 2, ["price"], ["1"], 2, (r) => {
    const cost = r.int(4, 80);
    const m = r.pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 1]);
    const v = r.int(0, 1);
    if (v === 0) {
      const price = cost * (1 + m);
      return {
        stem: `A product costs ${usd(cost)} to make. The business uses cost-plus pricing with a ${pct(m, 0)} markup on cost. What is the price?`,
        ...money(price, "Price = cost × (1 + markup).", [[cost * m, "That is only the markup amount."], [cost / (1 - m), "That sets a margin on price, not a markup on cost."], [cost + m * 100, "Apply the percentage to the cost."]], true),
        explanation: `${usd(cost)} × ${1 + m} = ${usd(price, true)}.`,
      };
    }
    const price = cost * (1 + m);
    const margin = (price - cost) / price;
    return {
      stem: `An item costs ${usd(cost)} and sells for ${usd(price, true)}. What is the profit margin on the selling price?`,
      ...percent(margin, "Margin = (price − cost) ÷ price.", [[m, "That is the markup on cost."], [cost / price, "That is cost as a share of price."], [(price - cost) / (price + cost), "Divide by the price."]]),
      explanation: `(${usd(price, true)} − ${usd(cost)}) ÷ ${usd(price, true)} = ${pct(margin)}; the markup on cost is ${pct(m, 0)}.`,
    };
  }),
  t("bz-break-even", 2, ["price"], ["1"], 2, (r) => {
    const fixed = r.int(4, 60) * 500;
    const vc = r.int(2, 30);
    const price = vc + r.int(3, 30);
    const be = Math.ceil(fixed / (price - vc));
    const askProfit = r.next() < 0.4;
    if (askProfit) {
      const q = be + r.int(50, 500);
      const profit = q * (price - vc) - fixed;
      return {
        stem: `A business has fixed costs of ${usd(fixed)}, sells its product for ${usd(price)} and has variable costs of ${usd(vc)} per unit. What is its profit if it sells ${q.toLocaleString("en-US")} units?`,
        ...money(profit, "Profit = quantity × (price − variable cost) − fixed costs.", [[q * price - fixed, "Subtract variable costs too."], [q * (price - vc), "Subtract the fixed costs."], [q * price - q * vc - fixed * 2, "Fixed costs are subtracted once."]]),
        explanation: `${q} × ${usd(price - vc)} − ${usd(fixed)} = ${usd(profit)}.`,
      };
    }
    return {
      stem: `A business has fixed costs of ${usd(fixed)} per month, sells its product for ${usd(price)} and has variable costs of ${usd(vc)} per unit. How many units must it sell each month to break even?`,
      ...options([be.toLocaleString("en-US"), "Fixed costs ÷ contribution margin (price − variable cost), rounded up."], [[Math.ceil(fixed / price).toLocaleString("en-US"), "Divide by the contribution margin, not the price."], [Math.ceil(fixed / vc).toLocaleString("en-US"), "Divide by price minus variable cost."], [Math.ceil(fixed / (price + vc)).toLocaleString("en-US"), "Subtract variable cost from price."]]),
      explanation: `${usd(fixed)} ÷ (${usd(price)} − ${usd(vc)}) = ${(fixed / (price - vc)).toFixed(1)}, so ${be} units.`,
    };
  }),
  t("bz-campaign", 2, ["promotion-and-marketing-communications"], ["1"], 2, (r) => {
    const reach = r.int(5, 80) * 1000;
    const buyers = round(reach * (r.int(5, 60) / 1000), 5);
    const cost = r.int(5, 60) * 100;
    if (buyers <= 0) throw new Retry();
    if (r.next() < 0.5) {
      const cr = buyers / reach;
      return {
        stem: `An online ad campaign reaches ${reach.toLocaleString("en-US")} people, and ${buyers.toLocaleString("en-US")} of them make a purchase. What is the conversion rate?`,
        ...percent(cr, "Conversion rate = buyers ÷ people reached.", [[reach / buyers / 100, "Divide buyers by reach."], [buyers / reach / 10, "Recheck the division."], [buyers / 1000, "Divide by the number reached."]], 2),
        explanation: `${buyers} ÷ ${reach} = ${pct(cr, 2)}.`,
      };
    }
    const cac = cost / buyers;
    return {
      stem: `A ${usd(cost)} campaign brings in ${buyers.toLocaleString("en-US")} new customers. What is the customer acquisition cost?`,
      ...money(cac, "Acquisition cost = campaign cost ÷ new customers.", [[buyers / cost, "The ratio is inverted."], [cost / reach, "Divide by customers gained, not people reached."], [cost, "Divide by the number of customers."]], true),
      explanation: `${usd(cost)} ÷ ${buyers} = ${usd(cac, true)} per customer.`,
    };
  }),
  t("bz-survey-gap", 2, ["market-research"], ["3"], 3, (r) => {
    const groups = ["Individuals seeking a device", "Individuals seeking an accessory", "Businesses seeking a device", "Businesses seeking an accessory"];
    const share = [r.int(15, 45), r.int(15, 45), r.int(10, 30), r.int(5, 20)];
    const found = [r.int(55, 90), r.int(20, 60), r.int(55, 90), r.int(20, 60)];
    const unmet = groups.map((_, k) => share[k]! * (100 - found[k]!));
    const best = unmet.indexOf(Math.max(...unmet));
    if (unmet.filter((x) => x === unmet[best]).length > 1) throw new Retry();
    const lowest = found.indexOf(Math.min(...found));
    const biggest = share.indexOf(Math.max(...share));
    return {
      stimulus: { text: `${r.pick(BIZ)} surveyed its customers.`, table: { caption: "Customer survey", columns: [{ key: "g", label: "Customer type" }, { key: "s", label: "Share of customers (%)" }, { key: "f", label: "Found the product they wanted (%)" }], rows: groups.map((g, k) => ({ g, s: share[k]!, f: found[k]! })) } },
      stem: "Which customer group represents the largest number of customers whose needs went unmet?",
      ...options([groups[best]!, "Unmet customers = share of customers × share who did not find the product."], groups.filter((_, k) => k !== best).map((g) => [g, g === groups[lowest] ? "It has the lowest success rate, but it is a smaller group." : g === groups[biggest] ? "It is the largest group, but most of its customers were served." : "Fewer of its customers went without."] as [string, string]).slice(0, 3)),
      explanation: `Unmet (share × not found): ${groups.map((g, k) => `${g} ${((share[k]! * (100 - found[k]!)) / 100).toFixed(1)}%`).join("; ")}.`,
    };
  }),
  pool("bz-u2-concepts", 2, ["marketing-to-customers", "consumer-behavior", "market-research", "product", "place-and-channels", "promotion-and-marketing-communications", "price"], ["1"], [
    { stem: "A company targets college students who live on campus and value convenience. What kind of segmentation combines these?", right: ["Demographic, geographic and psychographic", "Students (demographic), on campus (geographic), value convenience (psychographic)."], wrong: [["Behavioral only", "Several bases are used."], ["Geographic only", "More than location is used."], ["None; this is mass marketing", "A specific segment is targeted."]] },
    { stem: "A business reads a government report on household spending to estimate market size. What kind of research is this?", right: ["Secondary research", "It uses data collected by others."], wrong: [["Primary research", "The business did not collect the data itself."], ["A focus group", "No group discussion is involved."], ["A test market", "No product is being tested."]] },
    { stem: "A startup releases a simple version of its app with only the core feature to learn whether people use it. What is this?", right: ["A minimum viable product (MVP)", "An MVP tests demand with minimal investment."], wrong: [["A mature product", "It is brand new."], ["Price skimming", "That is a pricing strategy."], ["A distribution channel", "That is how products reach customers."]] },
    { stem: "Sales of a product have leveled off at a high level and many competitors offer similar versions. Which stage of the product life cycle is this?", right: ["Maturity", "High, flat sales and intense competition."], wrong: [["Introduction", "Sales would be low."], ["Growth", "Sales would be rising fast."], ["Decline", "Sales would be falling."]] },
    { stem: "A new game console launches at a high price that is lowered over time. What pricing strategy is this?", right: ["Price skimming", "High initial price for early adopters, then lower."], wrong: [["Penetration pricing", "That starts low."], ["Cost-plus pricing", "That adds a fixed markup to cost."], ["Psychological pricing", "That uses prices like $9.99."]] },
    { stem: "A brand sells only through its own website and stores. What type of distribution channel is this?", right: ["Direct", "No intermediaries."], wrong: [["Indirect through wholesalers", "No wholesalers are used."], ["Retail through department stores", "It uses only its own outlets."], ["Franchising", "Not described."]] },
    { stem: "Which promotional tool is best suited to explaining an expensive, complex product to a business customer?", right: ["Personal selling", "A salesperson can answer specific questions."], wrong: [["Billboard advertising", "Too little detail."], ["Coupons", "Short-term discounts do not explain products."], ["Mass social media posts", "Not tailored enough."]] },
    { stem: "A website shows 'Only 3 left in stock!' next to an item. Which persuasion principle is this?", right: ["Scarcity", "Limited availability creates urgency."], wrong: [["Reciprocity", "That involves giving something first."], ["Social proof", "That uses others' behavior or reviews."], ["Authority", "That relies on expert endorsement."]] },
  ]),
];

/* ---------------- Unit 3 ---------------- */
export const bizUnit3: McqTemplate[] = [
  t("bz-compound", 3, ["saving-for-future-purchases"], ["1"], 2, (r) => {
    const P = r.int(5, 50) * 100;
    const rate = r.pick([0.02, 0.03, 0.04, 0.05, 0.06]);
    const yrs = r.int(2, 8);
    const A = P * (1 + rate) ** yrs;
    return {
      stem: `${pickName(r)} deposits ${usd(P)} in an account earning ${pct(rate, 0)} interest compounded annually. What is the balance after ${yrs} years, with no other deposits or withdrawals?`,
      ...money(A, "A = P(1 + r)^t.", [[P * (1 + rate * yrs), "That is simple interest; compounding earns interest on interest."], [P * rate * yrs, "That is only the interest, and it ignores compounding."], [P * (1 + rate) ** (yrs - 1), `Compound for all ${yrs} years.`]], true),
      explanation: `${usd(P)} × ${1 + rate}^${yrs} = ${usd(A, true)}.`,
    };
  }),
  t("bz-rule72", 3, ["saving-for-future-purchases", "saving-and-investing-for-education-housing-and-retirement-goals"], ["1"], 1, (r) => {
    const rate = r.pick([3, 4, 6, 8, 9, 12]);
    const y = 72 / rate;
    return {
      stem: `Using the rule of 72, about how many years will it take an investment earning ${rate}% per year to double?`,
      ...options([`About ${y} years`, `72 ÷ ${rate} = ${y}.`], [[`About ${Math.round(100 / rate)} years`, "Use 72, not 100."], [`About ${rate * 2} years`, "Divide 72 by the rate."], [`About ${Math.round(72 / (rate * 2))} years`, "Divide 72 by the rate, not twice the rate."]]),
      explanation: `72 ÷ ${rate} ≈ ${y} years.`,
    };
  }),
  t("bz-credit-utilization", 3, ["borrowing-credit-and-debt"], ["1"], 2, (r) => {
    const limits = [r.int(2, 10) * 500, r.int(2, 10) * 500];
    const bal = limits.map((l) => round(l * (r.int(5, 90) / 100), 50));
    const u = (bal[0]! + bal[1]!) / (limits[0]! + limits[1]!);
    return {
      stem: `${pickName(r)} has two credit cards. Card 1 has a ${usd(limits[0]!)} limit and a ${usd(bal[0]!)} balance. Card 2 has a ${usd(limits[1]!)} limit and a ${usd(bal[1]!)} balance. What is the overall credit utilization rate?`,
      ...percent(u, "Total balances ÷ total limits.", [[(bal[0]! / limits[0]! + bal[1]! / limits[1]!) / 2, "Combine totals rather than averaging the two rates."], [(bal[0]! + bal[1]!) / Math.max(...limits), "Use the combined limit."], [1 - u, "That is the unused share of credit."]]),
      explanation: `(${usd(bal[0]!)} + ${usd(bal[1]!)}) ÷ (${usd(limits[0]!)} + ${usd(limits[1]!)}) = ${pct(u)}.`,
    };
  }),
  t("bz-loan", 3, ["borrowing-credit-and-debt"], ["3"], 3, (r) => {
    const P = r.int(5, 40) * 1000;
    const apr = r.pick([0.04, 0.05, 0.06, 0.07, 0.08, 0.09]);
    const n = r.pick([24, 36, 48, 60]);
    const i = apr / 12;
    const M = (P * i * (1 + i) ** n) / ((1 + i) ** n - 1);
    const interest = M * n - P;
    return {
      stem: `A ${usd(P)} car loan at ${pct(apr, 0)} APR is repaid in ${n} equal monthly payments of ${usd(M, true)}. How much interest is paid over the life of the loan?`,
      ...money(interest, "Total paid (payment × number of payments) minus the amount borrowed.", [[P * apr * (n / 12), "That is simple interest on the full amount; the balance falls as you pay."], [M * n, "That is the total repaid, including principal."], [P * apr, "That is only one year of interest on the original balance."]], true),
      explanation: `${usd(M, true)} × ${n} = ${usd(M * n, true)}; minus ${usd(P)} = ${usd(interest, true)}.`,
    };
  }),
  t("bz-income-statement", 3, ["the-income-statement", "business-expenses"], ["1"], 3, (r) => {
    const rev = r.int(20, 200) * 1000;
    const cogs = round(rev * (r.int(30, 60) / 100), 500);
    const opex = round(rev * (r.int(15, 35) / 100), 500);
    const tax = round(Math.max(0, rev - cogs - opex) * 0.2, 100);
    const net = rev - cogs - opex - tax;
    if (net <= 0) throw new Retry();
    const ask = r.pick(["gross", "net", "margin"]);
    const rows = [["Revenue", rev], ["Cost of goods sold", cogs], ["Operating expenses", opex], ["Taxes", tax]] as const;
    const stimulus = { table: { caption: `${r.pick(BIZ)} income statement`, columns: [{ key: "i", label: "Item" }, { key: "a", label: "Amount" }], rows: rows.map(([i, a]) => ({ i, a: usd(a) })) } };
    if (ask === "margin") {
      return {
        stimulus,
        stem: "What is the business's net profit margin?",
        ...percent(net / rev, "Net income ÷ revenue.", [[(rev - cogs) / rev, "That is the gross margin."], [(rev - cogs - opex) / rev, "Subtract taxes too."], [net / cogs, "Divide by revenue."]]),
        explanation: `Net income ${usd(net)} ÷ ${usd(rev)} = ${pct(net / rev)}.`,
      };
    }
    return {
      stimulus,
      stem: `What is the business's ${ask === "gross" ? "gross profit" : "net income"}?`,
      ...money(ask === "gross" ? rev - cogs : net, ask === "gross" ? "Revenue − cost of goods sold." : "Revenue − COGS − operating expenses − taxes.", ask === "gross" ? [[rev - cogs - opex, "Gross profit subtracts only COGS."], [net, "That is net income."], [rev - opex, "Subtract COGS, not operating expenses."]] : [[rev - cogs, "That is gross profit."], [rev - cogs - opex, "Subtract taxes too."], [rev - cogs - opex + tax, "Taxes are subtracted."]]),
      explanation: `Gross profit ${usd(rev - cogs)}; operating income ${usd(rev - cogs - opex)}; net income ${usd(net)}.`,
    };
  }),
  t("bz-balance-sheet", 3, ["the-balance-sheet-and-net-worth", "accounting-and-financial-management"], ["1"], 2, (r) => {
    const cash = r.int(5, 60) * 1000;
    const inv = r.int(2, 40) * 1000;
    const equip = r.int(10, 150) * 1000;
    const curL = r.int(5, 50) * 1000;
    const ltL = r.int(0, 80) * 1000;
    const assets = cash + inv + equip;
    const eq = assets - curL - ltL;
    if (eq <= 0) throw new Retry();
    const ask = r.pick(["equity", "ratio"]);
    const stimulus = { table: { caption: "Balance sheet items", columns: [{ key: "i", label: "Item" }, { key: "a", label: "Amount" }], rows: [["Cash", cash], ["Inventory", inv], ["Equipment", equip], ["Current liabilities", curL], ["Long-term loan", ltL]].map(([i, a]) => ({ i: String(i), a: usd(Number(a)) })) } };
    if (ask === "ratio") {
      const cr = (cash + inv) / curL;
      return {
        stimulus,
        stem: "What is the business's current ratio?",
        ...options([cr.toFixed(2), "Current assets (cash + inventory) ÷ current liabilities."], [[(assets / curL).toFixed(2), "Equipment is not a current asset."], [(curL / (cash + inv)).toFixed(2), "The ratio is inverted."], [((cash + inv) / (curL + ltL)).toFixed(2), "Use only current liabilities."]]),
        explanation: `(${usd(cash)} + ${usd(inv)}) ÷ ${usd(curL)} = ${cr.toFixed(2)}.`,
      };
    }
    return {
      stimulus,
      stem: "What is the owner's equity?",
      ...money(eq, "Equity = assets − liabilities.", [[assets, "Subtract the liabilities."], [assets - curL, "Subtract the long-term loan too."], [assets + curL + ltL, "Liabilities are subtracted."]]),
      explanation: `Assets ${usd(assets)} − liabilities ${usd(curL + ltL)} = ${usd(eq)}.`,
    };
  }),
  t("bz-cash-flow", 3, ["the-cash-flow-statement"], ["1"], 2, (r) => {
    const begin = r.int(2, 30) * 1000;
    const op = r.int(-10, 25) * 500;
    const inv = -r.int(1, 20) * 500;
    const fin = r.int(-10, 10) * 500;
    const end = begin + op + inv + fin;
    return {
      stem: `A business starts the month with ${usd(begin)} in cash. Operating activities bring in ${usd(op)}, it spends ${usd(-inv)} on new equipment, and financing activities net ${usd(fin)}. What is its ending cash balance?`,
      ...money(end, "Ending cash = beginning cash + operating + investing + financing.", [[begin + op - inv + fin, "Buying equipment is a cash outflow."], [begin + op, "Include investing and financing flows."], [op + inv + fin, "Add the beginning balance."]]),
      explanation: `${usd(begin)} + ${usd(op)} − ${usd(-inv)} + ${usd(fin)} = ${usd(end)}.`,
    };
  }),
  t("bz-valuation", 3, ["financial-capital"], ["1"], 2, (r) => {
    const amt = r.int(5, 50) * 10000;
    const stake = r.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]);
    return {
      stem: `An investor offers ${usd(amt)} for a ${pct(stake, 0)} ownership stake in a startup. What total value does this offer imply for the company?`,
      ...money(amt / stake, "Company value = investment ÷ ownership share.", [[amt * stake, "Divide by the share; do not multiply."], [amt * (1 + stake), "Divide the investment by the share."], [amt / (1 - stake), "The investment buys the stated share, not the remainder."]]),
      explanation: `${usd(amt)} ÷ ${stake} = ${usd(amt / stake)}.`,
    };
  }),
  t("bz-average-cost", 3, ["business-expenses"], ["1"], 2, (r) => {
    const fixed = r.int(2, 40) * 1000;
    const vc = r.int(1, 25);
    const q = r.int(5, 80) * 100;
    const avg = (fixed + vc * q) / q;
    return {
      stem: `A business has fixed costs of ${usd(fixed)} and a variable cost of ${usd(vc)} per unit. What is its average cost per unit when it produces ${q.toLocaleString("en-US")} units?`,
      ...money(avg, "(Fixed costs + variable cost × quantity) ÷ quantity.", [[vc, "Include the fixed costs spread across units."], [fixed / q, "Add the variable cost per unit."], [fixed + vc * q, "That is total cost; divide by quantity."]], true),
      explanation: `(${usd(fixed)} + ${usd(vc)} × ${q}) ÷ ${q} = ${usd(avg, true)}.`,
    };
  }),
  pool("bz-u3-concepts", 3, ["borrowing-credit-and-debt", "financial-capital", "ethics-and-financial-reporting", "accounting-and-financial-management", "the-cash-flow-statement"], ["1"], [
    { stem: "Which factor has the greatest effect on a person's credit score?", right: ["Payment history", "On-time payments matter most."], wrong: [["Income", "Income is not part of the score."], ["Number of bank accounts", "Not a main factor."], ["Age", "Age is not used."]] },
    { stem: "A founder wants to raise money without giving up any ownership. Which source fits?", right: ["A bank loan", "Debt does not dilute ownership."], wrong: [["Selling shares to an angel investor", "That gives up equity."], ["Venture capital", "That takes equity."], ["Equity crowdfunding", "That sells ownership."]] },
    { stem: "A company is profitable on its income statement but cannot pay its suppliers this month. What is the most likely explanation?", right: ["Customers have not yet paid, so cash inflows lag behind recorded sales", "Profit is not the same as cash."], wrong: [["Its revenue is negative", "It is profitable."], ["It has no assets", "Unlikely and unrelated."], ["Its equity is too high", "Equity does not prevent payment."]] },
    { stem: "Which internal control best prevents one employee from both stealing cash and hiding it in the records?", right: ["Separation of duties", "Different people handle cash and record-keeping."], wrong: [["Higher prices", "Unrelated."], ["A larger marketing budget", "Unrelated."], ["Paying employees weekly", "Unrelated."]] },
    { stem: "In which section of the cash flow statement does repaying a bank loan appear?", right: ["Financing activities", "Borrowing and repaying loans are financing."], wrong: [["Operating activities", "Those are day-to-day cash flows."], ["Investing activities", "Those involve buying or selling long-term assets."], ["It does not appear", "It is a cash outflow."]] },
    { stem: "What does the accounting equation state?", right: ["Assets = Liabilities + Owner's equity", "Everything a business owns is financed by debt or owners."], wrong: [["Revenue = Expenses + Assets", "Not an accounting identity."], ["Profit = Assets − Revenue", "Not correct."], ["Equity = Revenue − Liabilities", "Equity = assets − liabilities."]] },
    { stem: "Why does paying only the minimum on a credit card balance often cost so much?", right: ["Interest continues to accrue on the remaining balance, stretching repayment over years", "Most of a minimum payment goes to interest."], wrong: [["Minimum payments include large annual fees", "Fees are separate."], ["Credit cards charge no interest on minimum payments", "Interest applies to unpaid balances."], ["The bank doubles the balance each month", "Not how interest works."]] },
  ]),
];

/* ---------------- Unit 4 ---------------- */
export const bizUnit4: McqTemplate[] = [
  t("bz-growth", 4, ["evaluating-performance-using-kpis"], ["1"], 2, (r) => {
    const a = r.int(20, 200) * 1000;
    const b = round(a * (1 + r.int(-30, 60) / 100), 500);
    if (b === a) throw new Retry();
    const g = (b - a) / a;
    const kpi = r.pick(["quarterly revenue", "monthly online orders", "active subscribers"]);
    return {
      stem: `A business's ${kpi} changed from ${a.toLocaleString("en-US")} to ${b.toLocaleString("en-US")}. What is the percentage change?`,
      ...percent(g, "(New − old) ÷ old.", [[(b - a) / b, "Divide by the original value."], [b / a, "Subtract 1 (or subtract old from new first)."], [-g, "Check the direction of the change."]]),
      explanation: `(${b} − ${a}) ÷ ${a} = ${pct(g)}.`,
    };
  }),
  t("bz-roi-payback", 4, ["strategy-and-decision-making", "evaluating-performance-using-kpis"], ["3"], 3, (r) => {
    const costA = r.int(10, 60) * 1000;
    const costB = r.int(10, 60) * 1000;
    const saveA = round(costA / r.pick([2, 2.5, 3, 4, 5]), 500);
    const saveB = round(costB / r.pick([2, 2.5, 3, 4, 5]), 500);
    const pa = costA / saveA;
    const pb = costB / saveB;
    if (Math.abs(pa - pb) < 0.2) throw new Retry();
    const best = pa < pb ? "A" : "B";
    return {
      stem: `Option A costs ${usd(costA)} and saves ${usd(saveA)} per year. Option B costs ${usd(costB)} and saves ${usd(saveB)} per year. Based on payback period alone, which option should the business choose?`,
      ...options([`Option ${best}, with a payback of ${(best === "A" ? pa : pb).toFixed(1)} years`, "Payback period = cost ÷ annual savings; shorter is better."], [[`Option ${best === "A" ? "B" : "A"}, with a payback of ${(best === "A" ? pb : pa).toFixed(1)} years`, "The shorter payback is preferred."], [`Option ${saveA > saveB ? "A" : "B"}, because it saves more each year`, "Payback also depends on the cost."], [`Option ${costA < costB ? "A" : "B"}, because it costs less`, "Payback depends on savings as well as cost."]]),
      explanation: `A: ${usd(costA)} ÷ ${usd(saveA)} = ${pa.toFixed(1)} years. B: ${usd(costB)} ÷ ${usd(saveB)} = ${pb.toFixed(1)} years.`,
    };
  }),
  t("bz-decision-matrix", 4, ["strategy-and-decision-making"], ["3"], 3, (r) => {
    const crit = r.sample(["Profit potential", "Cost", "Risk", "Customer impact", "Fit with mission"], 3);
    const w = r.pick([[0.5, 0.3, 0.2], [0.4, 0.4, 0.2], [0.6, 0.2, 0.2], [0.3, 0.3, 0.4]]);
    const sA = crit.map(() => r.int(1, 5));
    const sB = crit.map(() => r.int(1, 5));
    const tA = sA.reduce((s, x, k) => s + x * w[k]!, 0);
    const tB = sB.reduce((s, x, k) => s + x * w[k]!, 0);
    if (Math.abs(tA - tB) < 0.15) throw new Retry();
    const uA = sA.reduce((a, b) => a + b, 0);
    const uB = sB.reduce((a, b) => a + b, 0);
    const best = tA > tB ? "A" : "B";
    return {
      stimulus: { text: "A business scores two options from 1 (poor) to 5 (excellent) on each criterion. Each criterion has a weight.", table: { caption: "Weighted decision matrix", columns: [{ key: "c", label: "Criterion" }, { key: "w", label: "Weight" }, { key: "a", label: "Option A" }, { key: "b", label: "Option B" }], rows: crit.map((c, k) => ({ c, w: w[k]!, a: sA[k]!, b: sB[k]! })) } },
      stem: "Which option has the higher weighted score?",
      ...options([`Option ${best} (${(best === "A" ? tA : tB).toFixed(1)} versus ${(best === "A" ? tB : tA).toFixed(1)})`, "Multiply each score by its weight and add."], [[`Option ${best === "A" ? "B" : "A"} (${(best === "A" ? tB : tA).toFixed(1)} versus ${(best === "A" ? tA : tB).toFixed(1)})`, "Compare the weighted totals carefully."], [`Option ${uA >= uB ? "A" : "B"}, because its unweighted total is ${Math.max(uA, uB)}`, "The weights change the comparison."], ["They are tied", "The weighted totals differ."]]),
      explanation: `A: ${sA.map((x, k) => `${x}×${w[k]}`).join(" + ")} = ${tA.toFixed(1)}. B: ${sB.map((x, k) => `${x}×${w[k]}`).join(" + ")} = ${tB.toFixed(1)}.`,
    };
  }),
  t("bz-swot", 4, ["strategic-frameworks-porters-five-forces-and-swot-analysis"], ["1"], 1, (r) => {
    const items: [string, string][] = [
      ["The company's staff are highly trained and give expert advice.", "Strength"],
      ["The company relies on a single supplier that also serves its competitors.", "Weakness"],
      ["A new highway will bring more traffic past the store.", "Opportunity"],
      ["A large national chain plans to open a store nearby.", "Threat"],
      ["The company has a loyal customer base and strong brand recognition.", "Strength"],
      ["The company's website is outdated and hard to use on phones.", "Weakness"],
      ["Demand for the company's product category is growing among teenagers.", "Opportunity"],
      ["New regulations will raise the cost of the company's main ingredient.", "Threat"],
    ];
    const [s, a] = r.pick(items);
    return {
      stem: `In a SWOT analysis, how should this be classified? "${s}"`,
      ...options([`${a}`, a === "Strength" || a === "Weakness" ? "It is internal to the business." : "It comes from the external environment."], ["Strength", "Weakness", "Opportunity", "Threat"].filter((x) => x !== a).map((x) => [x, "Decide whether it is internal or external, then helpful or harmful."] as [string, string])),
      explanation: `${a}: ${a === "Strength" || a === "Weakness" ? "internal" : "external"} and ${a === "Strength" || a === "Opportunity" ? "helpful" : "harmful"}.`,
    };
  }),
  pool("bz-u4-concepts", 4, ["strategic-frameworks-porters-five-forces-and-swot-analysis", "management-and-leadership", "evaluating-performance-using-kpis", "strategy-and-decision-making"], ["1"], [
    { stem: "Many companies can supply the plain cardboard boxes a business needs, and switching between them is easy. According to Porter's Five Forces, supplier power is:", right: ["Low", "Many suppliers and easy switching weaken supplier power."], wrong: [["High", "Supplier power is high when there are few suppliers."], ["Irrelevant to profitability", "It affects costs."], ["The same as buyer power", "They are different forces."]] },
    { stem: "Customers can easily switch from a company's energy drink to coffee or tea. Which of Porter's Five Forces is strong?", right: ["Threat of substitutes", "Other products meet the same need."], wrong: [["Threat of new entrants", "That concerns new competitors in the same industry."], ["Supplier power", "That concerns input sellers."], ["Competitive rivalry only", "Substitutes are a separate force."]] },
    { stem: "During a fire in a warehouse, a manager gives direct orders without consulting the team. Which leadership style fits this situation?", right: ["Autocratic", "Emergencies need fast, clear decisions."], wrong: [["Delegative", "The team cannot decide alone in a crisis."], ["Democratic", "There is no time for discussion."], ["Laissez-faire", "Too hands-off for an emergency."]] },
    { stem: "Which of the four functions of management involves comparing results with goals and correcting course?", right: ["Controlling", "Controlling measures and adjusts performance."], wrong: [["Planning", "Planning sets the goals."], ["Organizing", "Organizing arranges resources."], ["Leading", "Leading motivates people."]] },
    { stem: "A café wants to measure how well it keeps customers coming back. Which KPI fits best?", right: ["Customer retention rate", "It measures repeat customers."], wrong: [["Total square footage", "Not a performance measure of loyalty."], ["Number of menu items", "Not about retention."], ["Rent per month", "That is a cost."]] },
    { stem: "Before comparing two strategic options, why should a business define its decision criteria?", right: ["So the options are judged consistently against what matters most to the business", "Criteria make the comparison objective."], wrong: [["To guarantee the cheapest option wins", "Criteria may include more than cost."], ["Because criteria replace the need for evidence", "Evidence is still needed."], ["To avoid making a recommendation", "The goal is a recommendation."]] },
  ]),
];
