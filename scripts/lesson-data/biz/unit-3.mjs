/* AP Business with Personal Finance, Units 3–5. */
const R = String.raw;
export const lessons = [
  {
    id: "saving-for-future-purchases",
    obj: ["Calculate simple and compound interest and explain the benefits of saving early."],
    terms: [
      ["Compound interest", "Interest earned on both the principal and previously earned interest."],
      ["APY", "Annual percentage yield: the yearly return including compounding."],
      ["Emergency fund", "Savings set aside for unexpected expenses, often three to six months of costs."],
    ],
    checks: [
      ["How much is $1,000 worth after 2 years at 5% compounded annually?", "$1,102.50."],
      ["Using the rule of 72, about how long does money take to double at 6%?", "About 12 years."],
    ],
    body: R`
$$\text{simple interest} = P \times r \times t \qquad A = P\left(1 + \frac{r}{n}\right)^{nt}$$

- $$P$$: principal, $$r$$: annual rate, $$n$$: compounding periods per year, $$t$$: years.
- **Rule of 72**: years to double ≈ 72 ÷ (rate in percent).

Starting early matters: compounding grows money faster the longer it has.

## Where to save

Savings accounts, money market accounts and certificates of deposit (CDs) are low-risk. Deposits at insured banks and credit unions are protected up to legal limits.

Inflation erodes purchasing power, so savings earning less than inflation lose real value.
`,
    note: ["Pay yourself first", "Automatically moving part of each paycheck to savings makes saving a habit rather than an afterthought."],
    ex: ["Compound growth", "A student deposits $2,000 at 4% interest compounded annually. What is the balance after 3 years?", [R`$$2000(1.04)^3 = 2000 \times 1.124864$$.`], "$2,249.73."],
  },
  {
    id: "borrowing-credit-and-debt",
    obj: ["Compare forms of credit, calculate the cost of borrowing, and explain credit scores."],
    terms: [
      ["APR", "Annual percentage rate: the yearly cost of borrowing, including some fees."],
      ["Credit score", "A number summarizing creditworthiness, based mainly on payment history and amounts owed."],
      ["Amortization", "Paying off a loan with regular payments that cover interest and principal."],
    ],
    checks: [
      ["What factor most affects a credit score?", "Payment history."],
      ["Why can paying only the minimum on a credit card be costly?", "Interest accumulates on the remaining balance, so repayment takes years and costs much more."],
    ],
    body: R`
| Credit type | Notes |
| --- | --- |
| credit card | revolving, high APR on unpaid balances |
| installment loan (car, student) | fixed payments, set term |
| mortgage | long-term loan secured by a home |
| payday loan | very high cost, avoid |

## Loan payments

$$M = P\frac{i(1+i)^n}{(1+i)^n - 1}$$

where $$i$$ is the monthly rate and $$n$$ the number of payments. Total interest = $$Mn - P$$.

## Credit scores

Payment history, credit utilization (balance ÷ limit, ideally low), length of history, new credit, and credit mix. Good credit lowers borrowing costs and can affect renting and insurance.
`,
    note: ["Good and bad debt", "Borrowing can build assets (education, a home) or finance consumption. Compare the cost of borrowing with the benefit."],
    ex: ["Credit utilization", "A borrower has $1,800 of balances on cards with a combined $6,000 limit. What is their utilization?", [R`1,800 ÷ 6,000 = 0.30.`], "30%."],
  },
  {
    id: "accounting-and-financial-management",
    obj: ["Explain the purpose of accounting, the accounting equation, and the main financial statements."],
    terms: [
      ["Accounting equation", "Assets = Liabilities + Owner's equity."],
      ["Financial statements", "The income statement, balance sheet and cash flow statement."],
    ],
    checks: [
      ["If assets are $90,000 and liabilities $35,000, what is equity?", "$55,000."],
      ["Who uses financial statements?", "Managers, owners, investors, lenders and governments."],
    ],
    body: R`
Accounting records, summarizes and reports financial information so people can make decisions.

$$\text{Assets} = \text{Liabilities} + \text{Owner's Equity}$$

| Statement | Shows | Time |
| --- | --- | --- |
| income statement | revenue, expenses, profit | over a period |
| balance sheet | assets, liabilities, equity | at a point in time |
| cash flow statement | cash in and out | over a period |

**Financial management** uses this information for budgeting, pricing, investing and financing decisions.
`,
    note: ["Profit is not cash", "A business can be profitable on paper and still run out of cash if customers pay late."],
    ex: ["Use the equation", "A business has $40,000 in equity and $25,000 in liabilities. What are its total assets?", [R`Assets = 25,000 + 40,000.`], "$65,000."],
  },
  {
    id: "business-expenses",
    obj: ["Classify business costs as fixed or variable and analyze their effect on profit."],
    terms: [
      ["Fixed cost", "A cost that does not change with output in the short run, such as rent."],
      ["Variable cost", "A cost that rises with each unit produced, such as materials."],
      ["Cost of goods sold (COGS)", "The direct costs of producing the goods sold."],
    ],
    checks: [
      ["Is a delivery driver paid per order a fixed or variable cost?", "Variable."],
      ["Fixed costs are $5,000 and variable cost is $4 per unit. What is the total cost of 1,000 units?", "$9,000."],
    ],
    body: R`
$$\text{total cost} = \text{fixed costs} + \text{variable cost per unit} \times \text{quantity}$$

| Fixed | Variable |
| --- | --- |
| rent, insurance, salaries | materials, packaging, shipping, sales commissions |

**Average cost** per unit falls as output rises because fixed costs are spread over more units (economies of scale).

Expenses on the income statement include COGS and **operating expenses** (marketing, administration, rent).
`,
    note: ["Controlling costs", "Lowering variable cost per unit improves every sale's contribution; lowering fixed costs lowers the break-even point."],
    ex: ["Average cost", "Fixed costs are $12,000 and variable cost is $3 per unit. What is the average cost per unit at 2,000 units?", [R`Total cost = 12,000 + 3(2,000) = 18,000.`, R`18,000 ÷ 2,000.`], "$9 per unit."],
  },
  {
    id: "financial-capital",
    obj: ["Compare sources of financing, including debt and equity."],
    terms: [
      ["Debt financing", "Borrowing money that must be repaid with interest."],
      ["Equity financing", "Raising money by selling ownership shares."],
      ["Venture capital", "Investment in young, high-growth businesses in exchange for equity."],
    ],
    checks: [
      ["What is a disadvantage of equity financing for founders?", "They give up part of the ownership and control."],
      ["What is a disadvantage of debt financing?", "Required repayments and interest, even if sales are weak."],
    ],
    body: R`
| Source | Type | Notes |
| --- | --- | --- |
| personal savings | equity | full control, personal risk |
| friends and family | debt or equity | relationships at stake |
| bank loan | debt | needs credit and collateral |
| angel investors / venture capital | equity | expertise, give up ownership |
| crowdfunding | rewards or equity | tests demand too |
| grants | neither | do not need to be repaid |

The right mix depends on how much money is needed, the business's risk and cash flow, and how much control the owners want to keep.
`,
    note: ["Ownership math", "If an investor pays $200,000 for 25% of a company, the deal values the whole company at $800,000."],
    ex: ["Valuation", "An investor offers $150,000 for a 20% stake. What value does this put on the company?", [R`150,000 ÷ 0.20.`], "$750,000."],
  },
  {
    id: "the-income-statement",
    obj: ["Read and construct income statements and calculate profit margins."],
    terms: [
      ["Gross profit", "Revenue minus cost of goods sold."],
      ["Net income", "Revenue minus all expenses, including taxes and interest."],
      ["Profit margin", "Net income divided by revenue."],
    ],
    checks: [
      ["Revenue $200,000; COGS $120,000. What is gross profit?", "$80,000."],
      ["If net income is $20,000 on revenue of $200,000, what is the net profit margin?", "10%."],
    ],
    body: R`
| Line | Example |
| --- | --- |
| revenue | 500,000 |
| − cost of goods sold | 300,000 |
| = gross profit | 200,000 |
| − operating expenses | 140,000 |
| = operating income | 60,000 |
| − interest and taxes | 15,000 |
| = net income | 45,000 |

$$\text{gross margin} = \frac{\text{gross profit}}{\text{revenue}} \qquad \text{net margin} = \frac{\text{net income}}{\text{revenue}}$$

In the example, the gross margin is 40% and the net margin 9%.
`,
    note: ["Comparing periods", "Margins make it possible to compare businesses of different sizes or the same business across years."],
    ex: ["Net income", "Revenue $80,000; COGS $35,000; operating expenses $30,000; taxes $3,000. Find net income and net margin.", [R`Gross profit 45,000; operating income 15,000; net income 12,000.`, R`12,000 ÷ 80,000 = 15%.`], "$12,000, a 15% net margin."],
  },
  {
    id: "the-balance-sheet-and-net-worth",
    obj: ["Read balance sheets, calculate net worth, and compute liquidity ratios."],
    terms: [
      ["Current assets", "Cash and assets expected to become cash within a year."],
      ["Current ratio", "Current assets divided by current liabilities; a measure of liquidity."],
      ["Net worth", "For a person, total assets minus total liabilities."],
    ],
    checks: [
      ["Current assets $60,000, current liabilities $40,000. What is the current ratio?", "1.5."],
      ["A person owns $25,000 in assets and owes $9,000. What is their net worth?", "$16,000."],
    ],
    body: R`
| Assets | Liabilities and equity |
| --- | --- |
| cash, accounts receivable, inventory (current) | accounts payable, short-term loans (current) |
| equipment, buildings (long-term) | long-term loans |
| | owner's equity |

Both sides must balance: assets = liabilities + equity.

$$\text{current ratio} = \frac{\text{current assets}}{\text{current liabilities}} \qquad \text{debt-to-equity} = \frac{\text{total liabilities}}{\text{equity}}$$

A current ratio above 1 means short-term obligations can be covered.

**Personal net worth** works the same way: what you own minus what you owe.
`,
    note: ["Snapshot", "A balance sheet shows one moment. Comparing balance sheets over time shows whether net worth is growing."],
    ex: ["Liquidity", "A shop has $18,000 cash, $7,000 inventory and $20,000 of bills due within the year. What is its current ratio, and is it healthy?", [R`(18,000 + 7,000) ÷ 20,000 = 1.25.`], "1.25: it can cover its short-term bills, with a modest cushion."],
  },
  {
    id: "the-cash-flow-statement",
    obj: ["Interpret cash flow statements and explain why cash flow differs from profit."],
    terms: [
      ["Cash flow statement", "A report of cash received and paid out, grouped into operating, investing and financing activities."],
      ["Net cash flow", "Cash inflows minus cash outflows for a period."],
    ],
    checks: [
      ["In which section does buying equipment appear?", "Investing activities."],
      ["How can a profitable business run out of cash?", "If customers pay late, inventory ties up cash, or large loan repayments come due."],
    ],
    body: R`
| Section | Examples |
| --- | --- |
| operating | cash from customers, payments to suppliers and employees |
| investing | buying or selling equipment and property |
| financing | loans received or repaid, owner investment, dividends |

$$\text{ending cash} = \text{beginning cash} + \text{net cash flow}$$

Cash flow problems are a leading cause of small-business failure. Businesses manage cash by collecting receivables faster, negotiating supplier terms, keeping reserves, and using lines of credit.
`,
    note: ["Nonprofits too", "Nonprofits must manage cash flow carefully when donations or grants arrive at different times from expenses."],
    ex: ["Ending cash", "A business begins March with $8,000. Operating cash flow is +$5,000, it buys a $6,000 oven, and repays $1,500 of a loan. Ending cash?", [R`8,000 + 5,000 − 6,000 − 1,500.`], "$5,500."],
  },
  {
    id: "ethics-and-financial-reporting",
    obj: ["Explain why accurate financial reporting matters and how fraud is prevented."],
    terms: [
      ["Financial fraud", "Deliberately misrepresenting financial information, such as inflating revenue."],
      ["Audit", "An independent examination of financial records."],
      ["Internal controls", "Procedures such as separation of duties that protect assets and ensure accurate records."],
    ],
    checks: [
      ["Why do investors depend on honest financial statements?", "They make decisions based on the reported performance and value."],
      ["Name an internal control that prevents fraud.", "Separation of duties, approvals, regular reconciliations or audits."],
    ],
    body: R`
Owners, lenders and investors rely on accurate financial statements. Misreporting can mislead them into bad decisions and can be illegal.

## Pressures and safeguards

The **fraud triangle**: pressure, opportunity and rationalization. Controls reduce opportunity:

- separation of duties (the person who approves payments does not also record them);
- approvals and documentation;
- regular reconciliation of accounts;
- independent audits;
- whistleblower channels.

Regulators require public companies to disclose accurate information so that investors are protected from fraud.
`,
    note: ["Small steps", "Fraud often starts with small adjustments, such as recording next month's sales early, rationalized as temporary."],
    ex: ["Spot the weakness", "One employee orders supplies, approves the invoices and records the payments. What control is missing?", ["One person controls the whole process."], "separation of duties."],
  },
  {
    id: "management-and-leadership",
    obj: ["Describe the functions of management and leadership styles."],
    terms: [
      ["Functions of management", "Planning, organizing, leading and controlling."],
      ["Leadership style", "A characteristic way of directing and motivating people, such as autocratic, democratic or delegative."],
    ],
    checks: [
      ["When is an autocratic style most appropriate?", "In emergencies or when quick decisions are needed."],
      ["Name a benefit of a democratic style.", "Higher engagement and better ideas from employee input."],
    ],
    body: R`
## Management functions

1. **Planning**: setting goals and strategies.
2. **Organizing**: arranging people and resources.
3. **Leading**: motivating and communicating.
4. **Controlling**: measuring performance and correcting course.

## Leadership styles

| Style | Description | Fits when |
| --- | --- | --- |
| autocratic | leader decides alone | crisis, inexperienced team |
| democratic | team input | complex problems, engaged team |
| delegative (laissez-faire) | team decides | experts, high trust |
| transformational | inspires change | growth, innovation |

Effective leaders adapt their style to the situation and the team.
`,
    note: ["Motivation", "Pay matters, but recognition, growth, autonomy and meaningful work also motivate employees."],
    ex: ["Choose a style", "A team of experienced software engineers is designing a new feature. Which style likely works best?", ["They are experts who benefit from autonomy."], "delegative or democratic."],
  },
  {
    id: "evaluating-performance-using-kpis",
    obj: ["Select key performance indicators and calculate them to evaluate progress."],
    terms: [
      ["KPI", "Key performance indicator: a measurable value that shows progress toward a goal."],
      ["Benchmark", "A standard or target to compare performance against."],
    ],
    checks: [
      ["Sales grew from $50,000 to $60,000. What is the growth rate?", "20%."],
      ["Name a customer-related KPI.", "Customer satisfaction, retention rate, conversion rate or acquisition cost."],
    ],
    body: R`
| Area | Example KPIs |
| --- | --- |
| customers | retention rate, satisfaction score, conversion rate |
| market | market share, sales growth |
| operations | units per hour, defect rate, delivery time |
| finance | profit margin, cash flow, return on investment |

$$\text{growth rate} = \frac{\text{new} - \text{old}}{\text{old}} \times 100\% \qquad \text{ROI} = \frac{\text{gain} - \text{cost}}{\text{cost}} \times 100\%$$

Good KPIs are tied to goals, measurable, and compared with **benchmarks** (past performance, targets or competitors).
`,
    note: ["Measure what matters", "Tracking too many numbers hides the important ones. Choose a few KPIs linked to the strategy."],
    ex: ["Retention", "A gym starts the year with 400 members and keeps 340 of them (ignoring new members). What is its retention rate?", [R`340 ÷ 400.`], "85%."],
  },
  {
    id: "strategy-and-decision-making",
    obj: ["Use a structured decision-making process to compare alternatives with criteria and evidence."],
    terms: [
      ["Decision criteria", "Standards used to judge options, such as cost, profit, risk and fit with the mission."],
      ["Opportunity cost", "The value of the best alternative not chosen."],
    ],
    checks: [
      ["Why define criteria before comparing options?", "So the comparison is objective and focused on the goal."],
      ["What does a strong recommendation include?", "A clear choice supported by evidence and reasoning tied to the criteria, acknowledging trade-offs."],
    ],
    body: R`
A structured process (the course uses a model with steps like this):

1. **Problem or opportunity**: define it.
2. **Alternatives**: identify the options.
3. **Criteria**: decide what matters (profit, cost, risk, customer impact, ethics).
4. **Evaluate**: compare options against each criterion using evidence.
5. **Decide** and justify; plan how to measure results.

## Weighted decision matrix

Score each option on each criterion, multiply by the criterion's weight, and add. The highest total is favored, but trade-offs should still be explained.

Financial criteria often use projected profit, payback period or ROI; nonfinancial criteria include brand fit and employee impact.
`,
    note: ["Explain the trade-off", "The best recommendations admit the weakness of the chosen option and explain why its strengths outweigh it."],
    ex: ["Payback period", "Option A costs $30,000 and saves $10,000 per year; Option B costs $18,000 and saves $4,500 per year. Which pays back sooner?", [R`A: 30,000 ÷ 10,000 = 3 years.`, R`B: 18,000 ÷ 4,500 = 4 years.`], "Option A."],
  },
  {
    id: "strategic-frameworks-porters-five-forces-and-swot-analysis",
    obj: ["Apply SWOT analysis and Porter's Five Forces to evaluate a business and its industry."],
    terms: [
      ["SWOT", "Strengths and Weaknesses (internal), Opportunities and Threats (external)."],
      ["Porter's Five Forces", "Rivalry, threat of new entrants, threat of substitutes, buyer power and supplier power."],
    ],
    checks: [
      ["Is a loyal customer base a strength or an opportunity?", "A strength (internal)."],
      ["If many suppliers can provide an input, is supplier power high or low?", "Low."],
    ],
    body: R`
## SWOT

| | Helpful | Harmful |
| --- | --- | --- |
| internal | Strengths | Weaknesses |
| external | Opportunities | Threats |

## Porter's Five Forces

| Force | High when |
| --- | --- |
| competitive rivalry | many similar competitors |
| threat of new entrants | low startup costs, few barriers |
| threat of substitutes | other products meet the same need |
| buyer power | few large buyers, easy switching |
| supplier power | few suppliers, unique inputs |

Strong forces reduce an industry's profitability. Businesses use the analysis to find positions where the forces are weaker.
`,
    note: ["Internal versus external", "Strengths and weaknesses are things the business controls; opportunities and threats come from its environment (PESTEL, competitors)."],
    ex: ["Classify for SWOT", "A bakery's staff are highly trained (1), a new highway will bring more traffic past the store (2), and a national chain is opening nearby (3). Classify each.", ["(1) internal and helpful.", "(2) external and helpful.", "(3) external and harmful."], "(1) strength, (2) opportunity, (3) threat."],
  },
  {
    id: "taxes-net-income-and-budgeting",
    obj: ["Calculate net pay and build a budget."],
    terms: [
      ["Gross pay", "Earnings before deductions."],
      ["Net pay", "Take-home pay after taxes and other deductions."],
      ["50/30/20 budget", "A guideline: 50% of net income for needs, 30% for wants, 20% for saving and debt repayment."],
    ],
    checks: [
      ["Gross pay is $2,000 and deductions total $380. What is net pay?", "$1,620."],
      ["Under 50/30/20, how much of a $3,000 net income goes to savings?", "$600."],
    ],
    body: R`
$$\text{net pay} = \text{gross pay} - \text{taxes} - \text{other deductions}$$

Deductions include federal and state income tax, Social Security and Medicare (FICA), and benefits like health insurance or retirement contributions.

## Budgeting

1. Record net income.
2. List fixed expenses (rent) and variable expenses (groceries).
3. Set savings goals.
4. Compare planned and actual spending each month and adjust.

The **50/30/20** guideline is a starting point; housing is often recommended to stay around 25–30% of income.
`,
    note: ["Tax brackets", "In a progressive system, a higher bracket applies only to income above that bracket's threshold, not to all income."],
    ex: ["Build a budget", "Net income is $2,400 a month. Using 50/30/20, how much goes to needs, wants and savings?", ["50%: 1,200. 30%: 720. 20%: 480."], "$1,200 needs, $720 wants, $480 savings."],
  },
  {
    id: "managing-personal-risk",
    obj: ["Explain how insurance and other strategies manage personal financial risk."],
    terms: [
      ["Premium", "The regular payment for an insurance policy."],
      ["Deductible", "The amount the insured pays before insurance begins to pay."],
      ["Identity theft", "Using someone's personal information to commit fraud."],
    ],
    checks: [
      ["How does choosing a higher deductible usually affect the premium?", "It lowers the premium."],
      ["Name two ways to manage risk besides insurance.", "Avoiding the risk, reducing it (safety measures), or keeping an emergency fund."],
    ],
    body: R`
| Strategy | Example |
| --- | --- |
| avoid | not driving in dangerous conditions |
| reduce | smoke detectors, safe driving, strong passwords |
| retain | emergency fund for small losses |
| transfer | insurance |

## Insurance basics

Health, auto, renters or homeowners, life and disability insurance. Key terms: **premium**, **deductible**, **copay**, **coverage limit**.

A higher deductible lowers premiums but raises out-of-pocket costs when a claim happens.

Protect against **identity theft** by guarding personal information, monitoring accounts and credit reports, and using strong authentication.
`,
    note: ["Insure big, save for small", "Insurance is most valuable for losses you could not afford; small losses can be covered by an emergency fund."],
    ex: ["Out-of-pocket cost", "A car repair costs $2,600. The policy has a $500 deductible. How much does insurance pay?", [R`2,600 − 500.`], "$2,100 (the owner pays $500)."],
  },
  {
    id: "saving-and-investing-for-education-housing-and-retirement-goals",
    obj: ["Compare investment options and explain risk, return, diversification and long-term goals."],
    terms: [
      ["Diversification", "Spreading investments across many assets to reduce risk."],
      ["Index fund", "A fund that holds the securities in a market index, offering broad diversification at low cost."],
      ["Employer match", "Money an employer adds to an employee's retirement contributions."],
    ],
    checks: [
      ["Which usually has higher long-term returns and higher risk: stocks or bonds?", "Stocks."],
      ["Why is an employer retirement match valuable?", "It is an immediate return on the money contributed."],
    ],
    body: R`
| Investment | Risk | Typical use |
| --- | --- | --- |
| savings account, CD | very low | emergency fund, short-term goals |
| bonds | low to moderate | income, stability |
| stocks | higher | long-term growth |
| mutual funds / index funds | depends on holdings | diversified long-term investing |
| real estate | moderate | housing, investment |

**Risk and return** are linked: higher expected returns come with more risk. Time horizon matters: long-term goals like retirement can tolerate more short-term ups and downs.

Tax-advantaged accounts help: retirement accounts (401(k), IRA) and education savings plans (529). Start early, diversify, keep fees low, and avoid trying to time the market.
`,
    note: ["Compounding over decades", "Money invested at 20 has decades more to compound than money invested at 40, which can make a larger difference than the amount invested."],
    ex: ["Employer match", "An employer matches 50% of contributions up to 6% of a $50,000 salary. How much does the employer add if the employee contributes 6%?", [R`Employee: 0.06 × 50,000 = 3,000.`, R`Match: 0.5 × 3,000.`], "$1,500 per year."],
  },
];
