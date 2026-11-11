/*
 * Free-response templates for AP Cybersecurity (one Device Security Analysis
 * question with several sources) and AP Business with Personal Finance (the
 * four questions of Section II). Data are randomized and rubric answers computed.
 */
import type { Rng } from "./lib";
import { Retry, type FrqTemplate } from "./types";

const block = (s: string) => "```text\n" + s + "\n```";
const usd = (x: number, cents = false) => (x < 0 ? "−" : "") + "$" + Math.abs(x).toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
const pct = (x: number) => `${Number((x * 100).toFixed(1))}%`;
const perm = (d: number) => `${d & 4 ? "r" : "-"}${d & 2 ? "w" : "-"}${d & 1 ? "x" : "-"}`;

/* ---------------- Cybersecurity: Device Security Analysis ---------------- */

export const cyberDeviceAnalysis: FrqTemplate = {
  key: "frq-cyber-device-analysis",
  topics: ["protecting-devices", "detecting-attacks-on-devices", "protecting-networks-firewalls", "authentication"],
  skills: ["1", "2", "3"],
  difficulty: 4,
  calc: false,
  format: "device-security-analysis",
  minutes: 50,
  gen(r: Rng) {
    const host = r.pick(["clinic-ws07", "lib-kiosk02", "hr-laptop14", "lab-srv03"]);
    const owner = r.pick(["mrivera", "kchen", "apatel", "jlee"]);
    const atk = `${r.pick(["203.0.113", "198.51.100"])}.${r.int(2, 250)}`;
    const user = r.pick(["admin", "backup", owner]);
    const fails = r.int(5, 9);
    const sensitive = r.pick(["patients.csv", "payroll.xlsx", "grades.db", "employee_ssn.txt"]);
    const badOthers = r.pick([4, 6, 7]);
    const fixed = `${r.pick([6, 6, 7])}${r.pick([4, 0])}0`;
    const sshPolicy = r.next() < 0.5;
    const adminNet = `10.0.${r.int(5, 20)}.0/24`;
    const policy = [
      `1. Files containing personal data must not be readable by users outside the owner's group.`,
      `2. Remote administration (SSH, port 22) is permitted only from the IT subnet ${adminNet}.`,
      `3. Accounts are locked after 5 consecutive failed logins.`,
      `4. Only HTTPS (443) may be accepted from outside the organization.`,
    ].join("\n");
    const fw = [
      "#  Action  Source          Port",
      `1  ALLOW   any             443`,
      sshPolicy ? `2  ALLOW   any             22` : `2  ALLOW   ${adminNet}  22`,
      `3  ALLOW   any             ${r.pick([23, 3389, 21])}`,
      "   (all other inbound traffic denied)",
    ].join("\n");
    const ls = [
      `-rw-r--r-- ${owner} staff  1820 notes.txt`,
      `-rw-r--${perm(badOthers)} ${owner} staff 48211 ${sensitive}`,
      `-rwxr-x--- ${owner} staff   902 backup.sh`,
    ].join("\n");
    const log = [
      `02:13:58 sshd: Accepted publickey for ${owner} from 10.0.3.21`,
      ...Array.from({ length: fails }, (_, k) => `02:14:${String(2 + k * 2).padStart(2, "0")} sshd: Failed password for ${user} from ${atk}`),
      `02:14:${String(4 + fails * 2).padStart(2, "0")} sshd: Accepted password for ${user} from ${atk}`,
      `02:16:40 sudo: ${user} : COMMAND=/bin/cat /home/${owner}/${sensitive}`,
    ].join("\n");
    const conn = [
      "Proto  Local        Remote               State",
      `tcp    ${host}:22   ${atk}:51544   ESTABLISHED`,
      `tcp    ${host}:443  10.0.3.40:60122      ESTABLISHED`,
    ].join("\n");
    const thirdPort = fw.split("\n")[3]!.trim().split(/\s+/).pop();
    return {
      title: `Device Security Analysis: ${host}`,
      stimulus: {
        text: `An analyst is investigating the device ${host} after an alert. Use the six sources below.\n\n**Source 1: Security policy**\n\n${policy.split("\n").join("\n\n")}\n\n**Source 2: Host firewall rules (inbound, first match)**\n\n${block(fw)}\n\n**Source 3: File permissions**\n\n${block(ls)}\n\n**Source 4: Authentication log**\n\n${block(log)}\n\n**Source 5: Active network connections**\n\n${block(conn)}\n\n**Source 6: Change request**\n\n${block(`Proposed: run "chmod ${fixed} ${sensitive}" and replace firewall rule 2 with: ALLOW ${adminNet} 22`)}\n\nOn the real exam, this question also includes six sources about a single device; here they are generated for practice.`,
      },
      parts: [
        {
          prompt: "Identify one configuration on this device that violates the security policy. Cite evidence from the sources.",
          rubric: [
            { criterion: "Identifies a policy violation with evidence.", example: `${sensitive} has permissions rw-r--${perm(badOthers)}, so others can read it (Source 3), violating policy 1.${sshPolicy ? " Also, rule 2 allows SSH from any source (Source 2), violating policy 2." : ""} Rule 3 allows port ${thirdPort} from anywhere, violating policy 4.` },
          ],
        },
        {
          prompt: "Describe the attack shown in the sources, citing specific evidence, and explain whether it succeeded.",
          rubric: [
            { criterion: "Identifies a brute-force (password-guessing) attack.", example: `${fails} failed passwords for ${user} from ${atk} within seconds (Source 4).` },
            { criterion: "Explains that it succeeded, with evidence.", example: `An accepted password from the same address follows, the attacker read ${sensitive} with sudo, and an SSH session from ${atk} is still established (Source 5).` },
            { criterion: "Notes the failed control.", example: `Account lockout after 5 failures (policy 3) did not happen: ${fails} failures were allowed.` },
          ],
        },
        {
          prompt: `Describe the effect of running "chmod ${fixed} ${sensitive}" on who can access the file, and explain whether it brings the file into compliance.`,
          rubric: [
            { criterion: "Correctly interprets the new permissions.", example: `${fixed} = owner ${perm(Number(fixed[0]))}, group ${perm(Number(fixed[1]))}, others ---.` },
            { criterion: "Explains compliance.", example: "Others lose all access, so users outside the group can no longer read the personal data: it complies with policy 1." },
          ],
        },
        {
          prompt: `Describe how replacing firewall rule 2 with "ALLOW ${adminNet} 22" would affect network traffic and users of the device.`,
          rubric: [
            { criterion: "Effect on attackers.", example: `SSH from outside ${adminNet}, including ${atk}, would be denied by the implicit deny.` },
            { criterion: "Effect on legitimate users.", example: `IT staff on ${adminNet} can still administer the device; other internal users lose SSH access.${sshPolicy ? "" : " (The rule already restricts SSH, so behavior is unchanged.)"}` },
          ],
        },
        {
          prompt: "Recommend one additional control to prevent a similar attack, and explain how it addresses the evidence.",
          rubric: [
            { criterion: "A relevant control with justification.", example: "Enforce account lockout and multifactor authentication or key-only SSH logins, so password guessing cannot succeed; alert on repeated failures." },
          ],
        },
      ],
    };
  },
};

/* ---------------- Business with Personal Finance ---------------- */

const PRODUCTS = [
  { name: "a reusable meal-prep container subscription", customer: "busy college students", hyp: "at least 30% of surveyed students would pay $12 per month", res: [38, 22] },
  { name: "a phone app that matches neighborhood dog walkers with owners", customer: "working pet owners", hyp: "at least 25% of owners would try the app in its first month", res: [31, 18] },
  { name: "a refurbished-laptop store for high school students", customer: "families on a budget", hyp: "at least 40% of families would choose a refurbished laptop over a new one at 40% off", res: [46, 34] },
  { name: "a tutoring service using peer tutors", customer: "middle school students and parents", hyp: "at least 20% of parents would book a trial session", res: [27, 14] },
];

export const bizCanvas: FrqTemplate = {
  key: "frq-biz-canvas-validation",
  topics: ["how-do-business-ideas-originate", "market-research", "product", "markets-and-competitive-advantage"],
  skills: ["1", "2", "4"],
  difficulty: 3,
  calc: true,
  format: "canvas",
  minutes: 25,
  gen(r) {
    const p = r.pick(PRODUCTS);
    const supported = r.next() < 0.5;
    const result = supported ? p.res[0]! : p.res[1]!;
    const threshold = Number(p.hyp.match(/(\d+)%/)![1]);
    return {
      title: "Business Canvas Project: exam-day validation (practice)",
      stimulus: {
        text: `On the real exam, this question asks about **your own** Business Canvas Project. For practice, answer about this sample project.\n\nA student team developed ${p.name} for ${p.customer}. Their hypothesis was that ${p.hyp}. In a survey of 150 people in the target market, ${result}% said they would.`,
      },
      parts: [
        { prompt: "Write a brief pitch for the product idea that identifies the target customer, the problem, and the value proposition.", rubric: [
          { criterion: "Identifies the target customer and the problem.", example: `${p.customer[0]!.toUpperCase() + p.customer.slice(1)} who face a specific, described problem.` },
          { criterion: "States a clear value proposition.", example: "Explains the benefit to the customer and how it differs from alternatives." },
        ] },
        { prompt: "Explain how the team used hypothesis testing to inform a decision. State whether the evidence supports the hypothesis.", rubric: [
          { criterion: "Describes the test and compares the result with the hypothesis.", example: `${result}% versus the ${threshold}% threshold: the hypothesis is ${supported ? "supported" : "not supported"}.` },
          { criterion: "Connects the result to a decision.", example: supported ? "Proceed to build a minimum viable product and test pricing." : "Revise the product, price or target customer before investing further." },
        ] },
        { prompt: "Explain why a challenge frequently faced by entrepreneurs (for example, limited funding, competition or uncertain demand) could threaten the viability of this product idea.", rubric: [
          { criterion: "Identifies a relevant challenge and explains its impact on viability.", example: "Limited funding could prevent the team from reaching enough customers to cover fixed costs before cash runs out." },
        ] },
      ],
    };
  },
};

export const bizPersonalFinance: FrqTemplate = {
  key: "frq-biz-personal-finance",
  topics: ["taxes-net-income-and-budgeting", "saving-for-future-purchases", "borrowing-credit-and-debt"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: true,
  format: "personal-finance",
  minutes: 13,
  gen(r) {
    const name = r.pick(["Maya", "Jordan", "Priya", "Luis", "Amara", "Theo"]);
    const gross = r.int(30, 70) * 100;
    const deductions = Math.round(gross * (r.int(18, 26) / 100));
    const net = gross - deductions;
    const rent = Math.round(net * (r.int(28, 45) / 100) / 10) * 10;
    const other = Math.round(net * (r.int(25, 45) / 100) / 10) * 10;
    const card = r.int(10, 60) * 100;
    const goal = r.int(30, 120) * 100;
    const months = r.int(10, 24);
    const leftover = net - rent - other;
    if (leftover <= 0) throw new Retry();
    const needMonthly = goal / months;
    const housingShare = rent / net;
    return {
      title: `${name}'s financial plan`,
      stimulus: {
        text: `${name} earns ${usd(gross)} per month before taxes. Payroll deductions total ${usd(deductions)}. Rent is ${usd(rent)} per month, and other living expenses average ${usd(other)}. ${name} has a ${usd(card)} credit card balance at 24% APR and wants to save ${usd(goal)} for a car down payment in ${months} months.`,
      },
      parts: [
        { prompt: `Calculate ${name}'s monthly net (take-home) pay and the amount left after rent and other expenses.`, rubric: [
          { criterion: "Net pay.", example: `${usd(gross)} − ${usd(deductions)} = ${usd(net)}` },
          { criterion: "Amount remaining.", example: `${usd(net)} − ${usd(rent)} − ${usd(other)} = ${usd(leftover)}` },
        ] },
        { prompt: `Determine how much ${name} must save each month to reach the goal, and whether the current budget allows it.`, rubric: [
          { criterion: "Required monthly savings.", example: `${usd(goal)} ÷ ${months} = ${usd(needMonthly, true)}` },
          { criterion: "Correct comparison.", example: leftover >= needMonthly ? `Yes: ${usd(leftover)} available is at least ${usd(needMonthly, true)}.` : `No: only ${usd(leftover)} is available, short by ${usd(needMonthly - leftover, true)} a month.` },
        ] },
        { prompt: `Rent is ${pct(housingShare)} of net pay. Recommend one change that would help ${name} reach the goal, and explain it using the data, including the credit card balance.`, rubric: [
          { criterion: "A reasonable recommendation tied to the data.", example: "Pay off the 24% APR card first: its interest costs more than savings earn. Then cut variable expenses or extend the timeline, or reduce housing costs if above about 30% of net pay." },
        ] },
      ],
    };
  },
};

export const bizConceptApplication: FrqTemplate = {
  key: "frq-biz-concept-application",
  topics: ["market-research", "markets-and-competitive-advantage", "price"],
  skills: ["1"],
  difficulty: 3,
  calc: true,
  format: "concept-application",
  minutes: 12,
  gen(r) {
    const firms = r.sample(["VistaFlix", "OrbioTV", "Vistify", "Kinovo", "NetCom"], 4);
    const raw = firms.map(() => r.int(5, 40));
    const tot = raw.reduce((a, b) => a + b, 0);
    const shares = raw.map((x) => Math.round((x / tot) * 100));
    shares[0] = 100 - shares.slice(1).reduce((a, b) => a + b, 0);
    const prices = firms.map(() => Number((r.int(7, 19) + 0.99).toFixed(2)));
    const leader = shares.indexOf(Math.max(...shares));
    const cheapest = prices.indexOf(Math.min(...prices));
    const entrant = r.pick(["CableFusion Plus", "StreamNest", "Brightwave"]);
    return {
      title: `${entrant} enters the market`,
      stimulus: {
        text: `A media company plans to launch ${entrant}, a streaming service, in a market with four established rivals. Its executives reviewed industry publications and the rivals' public financial reports.`,
        table: { caption: "Rival streaming services", columns: [{ key: "f", label: "Service" }, { key: "s", label: "Market share by revenue (%)" }, { key: "p", label: "Monthly price ($)" }], rows: firms.map((f, k) => ({ f, s: shares[k]!, p: prices[k]! })) },
      },
      parts: [
        { prompt: "Describe the market research method the executives used.", rubric: [{ criterion: "Secondary research.", example: "They used existing data from publications and published financial statements, not data they collected themselves." }] },
        { prompt: "Describe one finding revealed by the research.", rubric: [{ criterion: "An accurate finding from the data.", example: `${firms[leader]} leads with ${shares[leader]}% of revenue; ${firms[cheapest]} is the cheapest at $${prices[cheapest]}.` }] },
        { prompt: `Explain how ${entrant} could use a finding to achieve a business goal, such as gaining market share.`, rubric: [{ criterion: "Connects a finding to a strategy and goal.", example: `Because the market is concentrated and prices range from $${Math.min(...prices)} to $${Math.max(...prices)}, ${entrant} could use penetration pricing below $${Math.min(...prices)} or differentiate with exclusive content to win share.` }] },
      ],
    };
  },
};

export const bizDecision: FrqTemplate = {
  key: "frq-biz-decision",
  topics: ["strategy-and-decision-making", "evaluating-performance-using-kpis", "business-expenses", "business-ethics"],
  skills: ["3"],
  difficulty: 4,
  calc: true,
  format: "business-decision",
  minutes: 40,
  gen(r) {
    const biz = r.pick(["Harbor Outfitters", "Kova Coffee", "Brightline Bikes", "Pixel Print Shop"]);
    const costA = r.int(20, 80) * 1000;
    const gainA = Math.round(costA / r.pick([2, 2.5, 3, 4]) / 500) * 500;
    const costB = r.int(10, 50) * 1000;
    const gainB = Math.round(costB / r.pick([1.5, 2, 3, 5]) / 500) * 500;
    const pa = costA / gainA;
    const pb = costB / gainB;
    const roiA = (gainA * 3 - costA) / costA;
    const roiB = (gainB * 3 - costB) / costB;
    if (Math.abs(pa - pb) < 0.2) throw new Retry();
    const [optA, optB] = r.pick([
      ["open a second location in a growing neighborhood", "launch an online store with home delivery"],
      ["buy new equipment that speeds production", "hire two experienced employees"],
      ["add a premium product line", "expand advertising to a new customer segment"],
    ]);
    return {
      title: `${biz} chooses between two options`,
      stimulus: {
        text: `${biz} has funds for one project. **Option A**: ${optA}, costing ${usd(costA)} and expected to add ${usd(gainA)} in annual profit. It would also require the owner to manage a new team. **Option B**: ${optB}, costing ${usd(costB)} and expected to add ${usd(gainB)} in annual profit, with more uncertainty because the business has less experience in this area. The owner's goals are to grow profit, keep risk manageable, and maintain the business's reputation for customer service.`,
      },
      parts: [
        { prompt: "Establish two decision-making criteria the business should use, and explain why each is appropriate given its goals.", rubric: [
          { criterion: "Two relevant criteria tied to the goals.", example: "Financial return (payback or ROI) and risk; or impact on customer service." },
        ] },
        { prompt: "Compare the two options using your criteria and the data. Include at least one calculation.", rubric: [
          { criterion: "Payback periods.", example: `A: ${usd(costA)} ÷ ${usd(gainA)} = ${pa.toFixed(1)} years. B: ${usd(costB)} ÷ ${usd(gainB)} = ${pb.toFixed(1)} years.` },
          { criterion: "Three-year ROI or another valid comparison.", example: `A: ${pct(roiA)}; B: ${pct(roiB)}.` },
          { criterion: "Compares nonfinancial criteria.", example: "A demands management time; B carries more uncertainty from inexperience." },
        ] },
        { prompt: "Make a recommendation and support it with reasoning and evidence from the scenario. Acknowledge a drawback of your choice.", rubric: [
          { criterion: "Clear recommendation consistent with the analysis.", example: `Choose Option ${pa < pb ? "A" : "B"} for its faster payback (${Math.min(pa, pb).toFixed(1)} years), if the owner can manage the drawback.` },
          { criterion: "Acknowledges a trade-off.", example: pa < pb ? "Option A ties up more capital and needs management time." : "Option B is less certain because the business lacks experience." },
        ] },
      ],
    };
  },
};
