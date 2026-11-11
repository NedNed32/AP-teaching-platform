/* AP Microeconomics free-response templates. */
import { num } from "./econ-lib";
import { Retry, type FrqTemplate } from "./types";

export const microLongCompetition: FrqTemplate = {
  key: "frq-mi-long-competition",
  topics: ["perfect-competition", "profit-maximization", "shutdown-and-exit"],
  skills: ["1", "2", "3", "4"],
  difficulty: 3,
  calc: false,
  format: "long",
  minutes: 25,
  gen(r) {
    const P = r.int(12, 30);
    const q = r.int(5, 20) * 10;
    const loss = r.next() < 0.5;
    const atc = loss ? P + r.int(2, 6) : P - r.int(2, 6);
    const avc = loss ? P - r.int(1, 4) : atc - r.int(2, 5);
    const profit = (P - atc) * q;
    const fc = (atc - avc) * q;
    return {
      title: "A perfectly competitive firm",
      stimulus: {
        text: `The market for a product is perfectly competitive, and the industry has constant costs. The market price is ${P}. A typical firm maximizes profit by producing ${q} units, where its average total cost is ${atc} and its average variable cost is ${avc}.`,
      },
      parts: [
        {
          prompt: "Describe correctly labeled side-by-side graphs for the market and for the typical firm. On the firm's graph show MR, MC, ATC and the profit-maximizing quantity.",
          rubric: [
            { criterion: "Market graph with supply and demand setting the price.", example: `Market price ${P} at the intersection of S and D.` },
            { criterion: "Firm's horizontal demand = MR = P at the market price.", example: `Horizontal line at ${P}.` },
            { criterion: "Firm produces where MR = MC, with ATC drawn consistently.", example: `q = ${q} where MC crosses MR; ATC at ${atc}.` },
          ],
        },
        {
          prompt: "Calculate the firm's economic profit or loss. Show your work.",
          rubric: [{ criterion: "Correct value.", example: `(${P} − ${atc}) × ${q} = ${profit}${profit < 0 ? " (a loss)" : ""}` }],
        },
        {
          prompt: "Should the firm continue to produce in the short run? Explain using cost curves.",
          rubric: [{ criterion: "Yes, with the AVC comparison.", example: `Yes: price ${P} is at least AVC ${avc}, so producing covers variable costs and part of the fixed cost of ${fc}.` }],
        },
        {
          prompt: "What happens to the number of firms in the industry in the long run? Explain.",
          rubric: [{ criterion: "Correct direction with reason.", example: loss ? "Firms exit because they earn economic losses." : "Firms enter because existing firms earn economic profits." }],
        },
        {
          prompt: "After all long-run adjustments, compare the market price with the typical firm's minimum average total cost.",
          rubric: [{ criterion: "They are equal.", example: "In long-run equilibrium, P = minimum ATC, and economic profit is zero." }],
        },
      ],
    };
  },
};

export const microLongMonopoly: FrqTemplate = {
  key: "frq-mi-long-monopoly",
  topics: ["monopoly", "intervention-in-market-structures", "price-discrimination"],
  skills: ["1", "2", "3", "4"],
  difficulty: 4,
  calc: false,
  format: "long",
  minutes: 25,
  gen(r) {
    const b = r.int(1, 3);
    const mc = r.int(4, 20);
    const Q = r.int(5, 15);
    const a = mc + 2 * b * Q;
    const P = a - b * Q;
    const qc = 2 * Q;
    const dwl = ((qc - Q) * (P - mc)) / 2;
    return {
      title: "A monopoly",
      stimulus: { text: `A profit-maximizing monopolist faces the demand curve $$P = ${a} - ${b === 1 ? "" : b}Q$$, so its marginal revenue is $$MR = ${a} - ${2 * b}Q$$. Its marginal cost and average total cost are constant at ${mc}.` },
      parts: [
        {
          prompt: "Calculate the profit-maximizing quantity and price.",
          rubric: [
            { criterion: "Sets MR = MC to find quantity.", example: `${a} − ${2 * b}Q = ${mc}, so Q = ${Q}` },
            { criterion: "Reads price from demand.", example: `P = ${a} − ${b}(${Q}) = ${P}` },
          ],
        },
        {
          prompt: "Calculate the monopolist's profit.",
          rubric: [{ criterion: "Correct profit.", example: `(${P} − ${mc}) × ${Q} = ${(P - mc) * Q}` }],
        },
        {
          prompt: "Calculate the allocatively efficient quantity and the deadweight loss of monopoly.",
          rubric: [
            { criterion: "Efficient quantity where P = MC.", example: `${a} − ${b}Q = ${mc}, so Q = ${qc}` },
            { criterion: "Deadweight loss.", example: `½ × (${qc} − ${Q}) × (${P} − ${mc}) = ${dwl}` },
          ],
        },
        {
          prompt: "The government imposes a lump-sum tax on the monopolist. What happens to the profit-maximizing quantity? Explain.",
          rubric: [{ criterion: "No change, because MC and MR are unchanged.", example: "A lump-sum tax raises fixed cost only, so MR = MC at the same quantity; profit falls." }],
        },
        {
          prompt: "If the monopolist could perfectly price discriminate, what would happen to consumer surplus and deadweight loss?",
          rubric: [{ criterion: "Both become zero.", example: `Output rises to ${qc}; the firm captures all surplus, so consumer surplus and deadweight loss are zero.` }],
        },
      ],
    };
  },
};

export const microShortGame: FrqTemplate = {
  key: "frq-mi-short-game",
  topics: ["oligopoly-game-theory"],
  skills: ["3"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const p = [0, 1].map(() => [0, 1].map(() => [r.int(2, 15), r.int(2, 15)] as [number, number]));
    for (let j = 0; j < 2; j++) if (p[0]![j]![0] === p[1]![j]![0]) throw new Retry();
    for (let i = 0; i < 2; i++) if (p[i]![0]![1] === p[i]![1]![1]) throw new Retry();
    const S = ["High price", "Low price"];
    const aDom = p[0]![0]![0] > p[1]![0]![0] && p[0]![1]![0] > p[1]![1]![0] ? 0 : p[1]![0]![0] > p[0]![0]![0] && p[1]![1]![0] > p[0]![1]![0] ? 1 : null;
    const bDom = p[0]![0]![1] > p[0]![1]![1] && p[1]![0]![1] > p[1]![1]![1] ? 0 : p[0]![1]![1] > p[0]![0]![1] && p[1]![1]![1] > p[1]![0]![1] ? 1 : null;
    const nash: string[] = [];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) if (p[i]![j]![0] > p[1 - i]![j]![0] && p[i]![j]![1] > p[i]![1 - j]![1]) nash.push(`(${S[i]}, ${S[j]})`);
    const bonus = r.int(2, 5);
    return {
      title: "A pricing game",
      stimulus: {
        text: "Two firms, Alpha and Beta, choose prices at the same time. Each cell shows (Alpha's profit, Beta's profit) in thousands. Both firms know the payoffs.",
        table: {
          caption: "Payoffs (Alpha, Beta)",
          columns: [{ key: "row", label: "Alpha \\ Beta" }, { key: "c0", label: "Beta: High price" }, { key: "c1", label: "Beta: Low price" }],
          rows: [0, 1].map((i) => ({ row: `Alpha: ${S[i]}`, c0: `(${p[i]![0]![0]}, ${p[i]![0]![1]})`, c1: `(${p[i]![1]![0]}, ${p[i]![1]![1]})` })),
        },
      },
      parts: [
        {
          prompt: "Does Alpha have a dominant strategy? Explain using the payoffs.",
          rubric: [{ criterion: "Correct answer with the payoff comparison.", example: aDom === null ? `No. Alpha's best choice depends on Beta: against High it prefers ${p[0]![0]![0] > p[1]![0]![0] ? "High" : "Low"}, against Low it prefers ${p[0]![1]![0] > p[1]![1]![0] ? "High" : "Low"}.` : `Yes, ${S[aDom]}: it pays more whether Beta chooses High (${p[aDom]![0]![0]} > ${p[1 - aDom]![0]![0]}) or Low (${p[aDom]![1]![0]} > ${p[1 - aDom]![1]![0]}).` }],
        },
        {
          prompt: "Does Beta have a dominant strategy? Explain.",
          rubric: [{ criterion: "Correct answer.", example: bDom === null ? "No dominant strategy for Beta." : `Yes, ${S[bDom]}.` }],
        },
        {
          prompt: "Identify every Nash equilibrium.",
          rubric: [{ criterion: "Lists the Nash equilibrium cells (or states there is none in pure strategies).", example: nash.length ? nash.join(" and ") : "There is no pure-strategy Nash equilibrium." }],
        },
        {
          prompt: `Suppose the government pays Alpha a bonus of ${bonus} whenever Alpha chooses Low price. Recompute Alpha's payoffs. Does Alpha now have a dominant strategy?`,
          rubric: [{ criterion: "Adds the bonus to both Low-price payoffs and evaluates dominance.", example: (() => { const l0 = p[1]![0]![0] + bonus; const l1 = p[1]![1]![0] + bonus; const dom = l0 > p[0]![0]![0] && l1 > p[0]![1]![0] ? "Yes, Low price" : p[0]![0]![0] > l0 && p[0]![1]![0] > l1 ? "Yes, High price" : "No"; return `Low-price payoffs become ${l0} and ${l1}. ${dom}.`; })() }],
        },
      ],
    };
  },
};

export const microShortExternality: FrqTemplate = {
  key: "frq-mi-short-externality",
  topics: ["externalities", "efficient-outcomes"],
  skills: ["1", "4"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const neg = r.next() < 0.5;
    const good = neg ? r.pick(["steel", "paper from a mill that pollutes a river", "fertilizer"]) : r.pick(["flu vaccinations", "beekeeping near orchards", "college education"]);
    const ext = r.int(2, 8) * 5;
    return {
      title: neg ? "A negative externality" : "A positive externality",
      stimulus: { text: `The market for ${good} is perfectly competitive. Each unit ${neg ? "imposes an external cost" : "creates an external benefit"} of ${ext} on third parties.` },
      parts: [
        {
          prompt: `Describe a correctly labeled graph of this market showing the market quantity (Qm) and the socially optimal quantity (Qs).`,
          rubric: [
            { criterion: neg ? "MSC drawn above MPC (supply) by the external cost." : "MSB drawn above MPB (demand) by the external benefit.", example: neg ? `MSC = MPC + ${ext}` : `MSB = MPB + ${ext}` },
            { criterion: "Correct relationship between Qm and Qs.", example: neg ? "Qm is greater than Qs." : "Qm is less than Qs." },
          ],
        },
        {
          prompt: "Shade or describe the deadweight loss.",
          rubric: [{ criterion: "Triangle between the social and private curves between Qs and Qm.", example: neg ? "Between MSC and demand from Qs to Qm." : "Between MSB and supply from Qm to Qs." }],
        },
        {
          prompt: "Identify a per-unit government policy that would achieve the socially optimal quantity, and give its size.",
          rubric: [{ criterion: "Correct policy and size.", example: neg ? `A per-unit tax of ${ext}.` : `A per-unit subsidy of ${ext}.` }],
        },
      ],
    };
  },
};

export const microShortTax: FrqTemplate = {
  key: "frq-mi-short-tax",
  topics: ["government-intervention", "price-elasticity-of-demand"],
  skills: ["2", "3"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const P0 = r.int(8, 20);
    const Q0 = r.int(10, 30) * 10;
    const t = r.int(2, 6);
    const share = r.int(1, t - 1);
    const Pb = P0 + share;
    const Q1 = Q0 - r.int(2, 6) * 10;
    return {
      title: "A per-unit tax",
      stimulus: { text: `In a competitive market, the equilibrium price is ${P0} and quantity is ${Q0}. The government imposes a per-unit tax of ${t} on sellers. Afterwards, buyers pay ${Pb}, sellers keep ${Pb - t}, and ${Q1} units are sold.` },
      parts: [
        {
          prompt: "Calculate the government's tax revenue.",
          rubric: [{ criterion: "Correct value.", example: `${t} × ${Q1} = ${num(t * Q1)}` }],
        },
        {
          prompt: "Calculate the deadweight loss.",
          rubric: [{ criterion: "Correct value.", example: `½ × ${Q0 - Q1} × ${t} = ${num(((Q0 - Q1) * t) / 2)}` }],
        },
        {
          prompt: "Do buyers or sellers bear more of the tax? What does this imply about the relative elasticities of demand and supply?",
          rubric: [{ criterion: "Correct side and elasticity comparison.", example: share * 2 === t ? "They share it equally; demand and supply are equally elastic." : share * 2 > t ? `Buyers (${share} of ${t}); demand is relatively more inelastic than supply.` : `Sellers (${t - share} of ${t}); supply is relatively more inelastic than demand.` }],
        },
      ],
    };
  },
};

export const microShortFactor: FrqTemplate = {
  key: "frq-mi-short-factor",
  topics: ["competitive-factor-markets", "factor-markets-intro", "factor-demand-supply-changes"],
  skills: ["3"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const P = r.int(2, 6);
    const mp = [r.int(14, 22)];
    for (let i = 1; i < 5; i++) mp.push(mp[i - 1]! - r.int(2, 4));
    const mrp = mp.map((x) => x * P);
    const w = r.int(mrp[3]! + 1, mrp[1]! - 1);
    let n = 0;
    for (let i = 0; i < 5; i++) if (mrp[i]! >= w) n = i + 1;
    return {
      title: "Hiring workers",
      stimulus: {
        text: `A firm sells its product in a perfectly competitive market at ${P} per unit and hires labor in a perfectly competitive market at a wage of ${w}. The marginal products of workers 1 to 5 are ${mp.join(", ")}.`,
      },
      parts: [
        {
          prompt: "Calculate the marginal revenue product of the third worker.",
          rubric: [{ criterion: "MP × P.", example: `${mp[2]} × ${P} = ${mrp[2]}` }],
        },
        {
          prompt: "How many workers will the firm hire? Explain.",
          rubric: [{ criterion: "Correct number with the MRP ≥ wage rule.", example: `${n}: MRP is at least the wage of ${w} for workers 1 to ${n} only.` }],
        },
        {
          prompt: "If the price of the product rises, what happens to the firm's demand for labor? Explain.",
          rubric: [{ criterion: "Increases, because MRP rises.", example: "Each worker's MRP = MP × P rises, so labor demand shifts right." }],
        },
      ],
    };
  },
};

export const microLong = [microLongCompetition, microLongMonopoly];
export const microShort = [microShortGame, microShortExternality, microShortTax, microShortFactor];
