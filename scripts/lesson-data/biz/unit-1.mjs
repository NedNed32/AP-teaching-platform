/* AP Business with Personal Finance, Units 1–2. */
const R = String.raw;
export const lessons = [
  {
    id: "what-is-a-business",
    obj: ["Describe what businesses do, the main forms of business ownership, and how businesses create value."],
    terms: [
      ["Business", "An organization that provides goods or services to customers, usually seeking profit."],
      ["Profit", "Revenue minus expenses."],
      ["Limited liability", "Owners can lose only what they invested, not their personal assets."],
    ],
    checks: [
      ["Which forms of ownership protect owners' personal assets?", "Corporations and LLCs (limited liability)."],
      ["What is the main disadvantage of a sole proprietorship?", "Unlimited personal liability for the business's debts."],
    ],
    body: R`
A business turns resources into goods or services that customers value. Nonprofits also create value but reinvest any surplus in their mission.

| Form | Owners | Liability | Notes |
| --- | --- | --- | --- |
| sole proprietorship | one | unlimited | simple, owner keeps all profit |
| partnership | two or more | usually unlimited | shared skills and decisions |
| LLC | one or more | limited | flexible, pass-through taxes |
| corporation | shareholders | limited | can raise capital by selling stock |

Businesses are **viable** when they can cover their costs and keep operating over time.
`,
    note: ["Stakeholders", "Customers, employees, owners, suppliers, communities and governments all have a stake in what a business does."],
    ex: ["Choose a form", "Two friends start a bakery and want to protect their savings if the business fails, while keeping things simple. Which form fits?", ["They need limited liability.", "An LLC is simpler than a corporation."], "a limited liability company (LLC)."],
  },
  {
    id: "markets-and-competitive-advantage",
    obj: ["Explain market structures and how businesses gain competitive advantage through cost leadership or differentiation."],
    terms: [
      ["Competitive advantage", "Something that lets a business outperform rivals, such as lower costs or a distinctive product."],
      ["Market share", "A business's sales as a percentage of total market sales."],
    ],
    checks: [
      ["What are the two basic competitive strategies?", "Cost leadership (lowest cost) and differentiation (a unique product customers will pay more for)."],
      ["A company sells $12 million in a $60 million market. What is its market share?", "20%."],
    ],
    body: R`
A **market** is the set of buyers and sellers of a product. The more competitors and the more similar their products, the more intense the competition.

## Competitive advantage

- **Cost leadership**: produce at lower cost and compete on price.
- **Differentiation**: offer something customers value and rivals do not (quality, design, service, brand).
- **Focus**: target a narrow market segment with either strategy.

$$\text{market share} = \frac{\text{company sales}}{\text{total market sales}} \times 100\%$$

Sustainable advantages are hard to copy: patents, brand loyalty, unique know-how, scale.
`,
    note: ["Advantage must matter to customers", "A difference only creates advantage if target customers value it enough to choose the product."],
    ex: ["Identify the strategy", "A streaming service charges more than rivals but offers exclusive live sports. What strategy is this?", ["It competes on a feature rivals lack, not on price."], "differentiation."],
  },
  {
    id: "pestel-factors-and-the-business-environment",
    obj: ["Use the PESTEL framework to analyze external factors affecting a business."],
    terms: [["PESTEL", "Political, Economic, Social, Technological, Environmental and Legal factors in a business's external environment."]],
    checks: [
      ["Rising interest rates fall under which PESTEL factor?", "Economic."],
      ["A new data-privacy law falls under which factor?", "Legal."],
    ],
    body: R`
| Factor | Examples |
| --- | --- |
| Political | trade policy, tariffs, government stability |
| Economic | interest rates, inflation, unemployment, income |
| Social | demographics, trends, values, lifestyles |
| Technological | new tools, automation, digital platforms |
| Environmental | climate, sustainability expectations, resources |
| Legal | regulations, employment law, consumer protection |

PESTEL factors are **external**: the business cannot control them but must respond. They can create **opportunities** or **threats** (they feed the O and T of a SWOT analysis).
`,
    note: ["Political or legal?", "Political covers government priorities and policy direction; legal covers the specific laws that result."],
    ex: ["Classify", "Growing consumer interest in plant-based diets helps a vegan food startup. Which PESTEL factor is this?", ["It reflects changing preferences and lifestyles."], "Social."],
  },
  {
    id: "how-do-business-ideas-originate",
    obj: ["Describe how entrepreneurs identify problems and opportunities and develop product ideas."],
    terms: [
      ["Entrepreneur", "A person who starts a business, taking on risk to pursue an opportunity."],
      ["Market opportunity", "An unmet customer need that a business could profitably address."],
      ["Value proposition", "A statement of the benefit a product delivers to its target customer."],
    ],
    checks: [
      ["What is a common source of business ideas?", "Personal frustrations, customer complaints, trends, new technology or gaps in existing products."],
      ["Why test an idea with customers before launching?", "To learn whether there is real demand before investing heavily."],
    ],
    body: R`
Good business ideas usually start with a **problem** experienced by a group of customers.

## Sources of ideas

- Personal experience and frustrations.
- Changes in technology, demographics or regulation (PESTEL).
- Gaps in what competitors offer.
- Improving an existing product's cost, quality or convenience.

## From idea to opportunity

1. Define the problem and the target customer.
2. Write a **value proposition**.
3. Form a **hypothesis** about customer behavior and test it (surveys, interviews, prototypes).
4. Refine the idea based on evidence.
`,
    note: ["Ideas versus opportunities", "An idea becomes an opportunity only if enough customers want it, will pay for it, and the business can deliver it profitably."],
    ex: ["Test a hypothesis", "A student believes classmates would pay $3 for healthy breakfast bars sold before school. How could they test this cheaply?", ["Form a testable hypothesis.", "Run a small pre-sale or survey with a sample of classmates."], "run a small trial sale or survey and compare actual purchases with the prediction."],
  },
  {
    id: "vision",
    obj: ["Distinguish vision, mission and goals, and explain how they guide a business."],
    terms: [
      ["Vision statement", "The long-term future the organization aims to create."],
      ["Mission statement", "What the organization does, for whom, and how."],
      ["SMART goal", "A goal that is Specific, Measurable, Achievable, Relevant and Time-bound."],
    ],
    checks: [
      ["Is 'grow sales' a SMART goal?", "No; it is not specific, measurable or time-bound."],
      ["Which statement describes the future, vision or mission?", "Vision."],
    ],
    body: R`
| Statement | Answers | Example |
| --- | --- | --- |
| vision | Where are we going? | A world where every student can learn to code |
| mission | What do we do now, for whom? | We provide free coding lessons to middle schools |
| values | How do we behave? | Integrity, inclusion, curiosity |
| goals | What will we achieve, by when? | Reach 200 schools by June |

**SMART** goals turn the vision into measurable steps that can be tracked with KPIs.
`,
    note: ["Alignment", "Strategies and day-to-day decisions should be consistent with the mission and move the business toward its vision."],
    ex: ["Make it SMART", "Rewrite 'get more customers' as a SMART goal for a café.", ["Make it specific and measurable, with a deadline."], "Increase average weekday customers from 120 to 150 by the end of March."],
  },
  {
    id: "business-ethics",
    obj: ["Analyze ethical issues in business and approaches to social responsibility."],
    terms: [
      ["Business ethics", "Principles of right and wrong that guide business decisions."],
      ["Corporate social responsibility (CSR)", "A business's commitment to act in ways that benefit society and the environment."],
      ["Conflict of interest", "A situation in which personal interests could influence professional decisions."],
    ],
    checks: [
      ["Is every legal action ethical?", "No; laws set minimum standards, and ethics often require more."],
      ["Give an example of a conflict of interest.", "A purchasing manager choosing a supplier owned by a relative."],
    ],
    body: R`
Ethical decisions consider how actions affect all **stakeholders**, not just profit.

## Common issues

- Honesty in advertising and financial reporting.
- Fair treatment and safety of workers, including in the supply chain.
- Privacy of customer data.
- Environmental impact.
- Conflicts of interest, bribery.

## Approaches

Codes of conduct, ethics training, whistleblower protections, and the **triple bottom line**: people, planet, profit.

A useful test: would the decision still feel right if it were published for customers and employees to see?
`,
    note: ["Ethics and reputation", "Unethical behavior can destroy customer trust and brand value, so ethics is often good business too."],
    ex: ["Weigh an ethical choice", "A supplier offers a cheaper fabric made in a factory with documented unsafe conditions. What should a clothing brand consider?", ["Worker safety is an ethical issue in the supply chain.", "Customers and investors may react to the brand's choice."], "the harm to workers and the brand's reputation, not just the cost saving; many firms would reject the supplier or require improvements."],
  },
  {
    id: "organization-roles-and-responsibilities",
    obj: ["Describe organizational structures and the roles of business functions."],
    terms: [
      ["Organizational chart", "A diagram showing roles and reporting relationships."],
      ["Span of control", "The number of people who report to one manager."],
      ["Functional areas", "Departments such as marketing, finance, operations and human resources."],
    ],
    checks: [
      ["What is a flat organization?", "One with few management levels and wide spans of control."],
      ["Which function manages hiring and training?", "Human resources."],
    ],
    body: R`
## Business functions

| Function | Responsibilities |
| --- | --- |
| marketing | customers, products, pricing, promotion |
| finance and accounting | money, budgets, records |
| operations | producing and delivering the product |
| human resources | hiring, training, pay, compliance |
| management | planning, organizing, leading, controlling |

## Structures

- **Tall (hierarchical)**: many levels, narrow spans of control, clear authority, slower decisions.
- **Flat**: few levels, wide spans, faster communication.
- **Functional**, **divisional** (by product or region) and **matrix** structures.
`,
    note: ["Start-ups", "Small businesses are often flat: the founder may handle several functions until the business grows."],
    ex: ["Pick a structure", "A company sells in three very different regions with different customer needs. Which structure helps it respond locally?", ["Each region needs its own decision-making."], "a divisional structure by region."],
  },
  {
    id: "supply-chains",
    obj: ["Explain how supply chains work and how businesses balance cost, risk and responsiveness."],
    terms: [
      ["Supply chain", "The network of organizations and steps that turn raw materials into products delivered to customers."],
      ["Just-in-time inventory", "Receiving goods only as they are needed, reducing storage costs but increasing risk of shortages."],
    ],
    checks: [
      ["What is a risk of relying on a single supplier?", "A disruption at that supplier can halt production."],
      ["What is a benefit of just-in-time inventory?", "Lower storage and holding costs."],
    ],
    body: R`
A supply chain links **suppliers → manufacturers → distributors → retailers → customers**.

## Decisions

- **Make or buy**: produce in-house or outsource.
- **Local or global** suppliers: cost versus speed and risk.
- **Inventory**: just-in-time (lean) versus safety stock (resilient).
- **Single or multiple** suppliers.

Supply chains affect competitive advantage: low costs support cost leadership; fast, flexible supply supports differentiation. Disruptions (natural disasters, shipping delays, political events) show the value of resilience.
`,
    note: ["Ethics in the supply chain", "Businesses are increasingly held responsible for labor and environmental practices of their suppliers."],
    ex: ["Trade-off", "A toy company can buy parts overseas at $2 each with a 6-week lead time, or locally at $2.60 with a 1-week lead time. Why might it choose local?", ["Shorter lead time reduces inventory needs and disruption risk.", "It can react faster to demand changes."], "faster, more reliable supply may be worth the higher unit cost, especially for seasonal products."],
  },
  {
    id: "marketing-to-customers",
    obj: ["Explain the marketing concept, market segmentation and target markets."],
    terms: [
      ["Market segmentation", "Dividing a market into groups with similar needs or characteristics."],
      ["Target market", "The segment a business chooses to serve."],
      ["Marketing mix (4 Ps)", "Product, price, place and promotion."],
    ],
    checks: [
      ["Name four ways to segment a market.", "Demographic, geographic, psychographic and behavioral."],
      ["What does positioning mean?", "How a business wants target customers to perceive its product relative to competitors."],
    ],
    body: R`
Marketing identifies customer needs and satisfies them profitably.

| Segmentation | Based on |
| --- | --- |
| demographic | age, income, gender, education |
| geographic | location, climate, urban or rural |
| psychographic | lifestyle, values, interests |
| behavioral | usage, loyalty, benefits sought |

After choosing a **target market**, a business **positions** its product and designs the **marketing mix** (4 Ps) to fit that segment.
`,
    note: ["Not everyone is a customer", "Trying to appeal to everyone often appeals to no one. A clear target market sharpens every marketing decision."],
    ex: ["Segment", "A fitness app targets busy professionals who value short workouts. What kind of segmentation combines these?", ["'Professionals' is demographic.", "'Values short workouts' is psychographic/behavioral."], "demographic plus psychographic (or behavioral) segmentation."],
  },
  {
    id: "consumer-behavior",
    obj: ["Describe the consumer decision process and factors that influence purchases."],
    terms: [
      ["Consumer decision process", "Need recognition, information search, evaluation of alternatives, purchase, and post-purchase evaluation."],
      ["Opportunity cost", "The value of the next-best alternative given up when making a choice."],
    ],
    checks: [
      ["What is buyer's remorse?", "Post-purchase doubt about whether a purchase was the right choice."],
      ["Name a psychological influence on buying.", "Motivation, perception, attitudes, or social proof."],
    ],
    body: R`
## The decision process

1. **Need recognition**
2. **Information search**
3. **Evaluation of alternatives** (features, price, reviews)
4. **Purchase**
5. **Post-purchase evaluation**

## Influences

- **Personal**: income, budget, age, lifestyle.
- **Psychological**: motivation, perception, attitudes.
- **Social**: family, friends, influencers, culture.
- **Situational**: time pressure, store environment.

Persuasion principles businesses use include scarcity ("only 3 left"), social proof (reviews), and reciprocity (free samples). Rational consumers compare costs and benefits within their **budget** and weigh the **opportunity cost**.
`,
    note: ["Personal finance link", "Recognizing sales tactics helps you make deliberate spending decisions instead of impulse purchases."],
    ex: ["Identify a tactic", "A website shows 'Only 2 rooms left at this price!' What principle is it using?", ["It creates urgency by suggesting limited supply."], "scarcity."],
  },
  {
    id: "market-research",
    obj: ["Compare primary and secondary research and interpret research data."],
    terms: [
      ["Primary research", "New data collected directly, such as surveys, interviews, focus groups and experiments."],
      ["Secondary research", "Existing data gathered by others, such as industry reports and government statistics."],
      ["Sample", "The subset of a population that is studied."],
    ],
    checks: [
      ["Is reading a competitor's published financial statements primary or secondary research?", "Secondary."],
      ["Why can a small or unrepresentative sample mislead?", "Its results may not reflect the whole target market."],
    ],
    body: R`
| | Primary | Secondary |
| --- | --- | --- |
| examples | surveys, interviews, focus groups, test markets | industry reports, census data, published financials |
| cost and time | higher | lower |
| specificity | tailored to the question | may not fit exactly |

## Quantitative and qualitative

**Quantitative** data are numbers (percentages, sales); **qualitative** data are descriptions (opinions, reasons).

## Using findings

Compare groups, find trends, and connect a **finding** (for example, 45% of customers want accessories but only 30% find them) to a **decision** (expand the accessory range).
`,
    note: ["Hypothesis testing", "State what you expect before collecting data, then check whether the evidence supports it."],
    ex: ["Interpret data", "In a survey, 60% of business customers found the device they wanted but only 35% found the accessory they wanted. What opportunity does this suggest?", ["Accessory demand is going unmet."], "expanding the accessory selection for business customers."],
  },
  {
    id: "product",
    obj: ["Describe product development, minimum viable products and the product life cycle."],
    terms: [
      ["Minimum viable product (MVP)", "The simplest version of a product that can test whether customers want it."],
      ["Product life cycle", "Introduction, growth, maturity and decline."],
      ["Brand", "The name, design and associations that identify a product and distinguish it from competitors."],
    ],
    checks: [
      ["Why launch an MVP?", "To learn from real customers before investing in a full product."],
      ["In which life-cycle stage are sales highest and competition strongest?", "Maturity."],
    ],
    body: R`
## Development

Idea → concept → **prototype / MVP** → testing → launch. Each step gathers feedback to improve **product-market fit**.

## Product life cycle

| Stage | Sales | Typical strategy |
| --- | --- | --- |
| introduction | low | build awareness |
| growth | rising fast | expand distribution |
| maturity | peak, leveling | differentiate, defend share |
| decline | falling | cut costs, refresh or discontinue |

**Branding** builds recognition and loyalty, which can support higher prices.
`,
    note: ["Features versus benefits", "Customers buy benefits (saving time, feeling safe), not features. Communicate the benefit."],
    ex: ["Identify the stage", "Smartphone sales have leveled off and brands compete mainly on camera features and price. Which stage is this?", ["Sales are high but no longer growing fast; competition is intense."], "maturity."],
  },
  {
    id: "price",
    obj: ["Apply cost-plus, competitive and value-based pricing and calculate markup and break-even."],
    terms: [
      ["Markup", "The amount added to cost to set price, often as a percentage of cost."],
      ["Break-even point", "The quantity at which total revenue equals total costs."],
      ["Contribution margin", "Price minus variable cost per unit."],
    ],
    checks: [
      ["A product costs $20 and has a 50% markup. What is the price?", "$30."],
      ["Fixed costs are $6,000, price is $25 and variable cost is $10. What is the break-even quantity?", "400 units."],
    ],
    body: R`
## Strategies

- **Cost-plus**: cost + markup.
- **Competitive**: set relative to rivals.
- **Value-based**: based on what customers will pay.
- **Penetration** (low to gain share) and **skimming** (high at launch).
- **Psychological** ($9.99).

## Calculations

$$\text{price} = \text{cost} \times (1 + \text{markup \%})$$

$$\text{break-even units} = \frac{\text{fixed costs}}{\text{price} - \text{variable cost per unit}}$$

Profit margin on price: $$\frac{\text{price} - \text{cost}}{\text{price}}$$ (different from markup on cost).
`,
    note: ["Markup versus margin", "A $20 item sold for $30 has a 50% markup on cost but a 33% margin on price."],
    ex: ["Break-even", "A food truck has fixed costs of $9,000 per month. Each meal sells for $12 and costs $5 to make. How many meals must it sell to break even?", [R`Contribution margin: $12 − $5 = $7.`, R`9,000 ÷ 7 = 1,285.7.`], "1,286 meals."],
  },
  {
    id: "place-and-channels",
    obj: ["Compare distribution channels and explain how businesses choose them."],
    terms: [
      ["Distribution channel", "The path a product takes from producer to customer."],
      ["Direct channel", "Selling straight to customers, such as through a company website."],
      ["Intermediary", "A wholesaler, distributor or retailer between producer and customer."],
    ],
    checks: [
      ["What is an advantage of selling through retailers?", "Wider reach and customer access to the product in stores."],
      ["What is an advantage of direct-to-consumer sales?", "Higher margins, customer data and control of the experience."],
    ],
    body: R`
| Channel | Example | Trade-off |
| --- | --- | --- |
| direct | company website, own stores | more control and margin, less reach |
| retailer | grocery chain | wide reach, lower margin |
| wholesaler → retailer | many small shops | broad coverage, two intermediaries take a share |
| online marketplace | large e-commerce sites | huge audience, fees and less control |
| omnichannel | online plus stores | convenient, complex to manage |

Choose channels where the **target market** shops, considering cost, control, and how the product must be sold (for example, products needing expert advice).
`,
    note: ["Channel and positioning", "A luxury brand sold in discount stores can weaken its image. Channels must fit the brand."],
    ex: ["Choose a channel", "A small company makes handmade skincare and wants to reach customers nationwide with little upfront cost. Which channel fits?", ["A national store network requires large volumes.", "Online sales reach everywhere cheaply."], "direct online sales (its own website or a marketplace)."],
  },
  {
    id: "promotion-and-marketing-communications",
    obj: ["Select promotional tools and evaluate marketing campaigns."],
    terms: [
      ["Promotional mix", "Advertising, sales promotion, personal selling, public relations and digital/social media."],
      ["Conversion rate", "The percentage of people who take a desired action, such as buying, after seeing a promotion."],
    ],
    checks: [
      ["A campaign reaches 20,000 people and 500 buy. What is the conversion rate?", "2.5%."],
      ["Which promotional tool is best for complex, expensive products?", "Personal selling."],
    ],
    body: R`
| Tool | Strength |
| --- | --- |
| advertising | broad reach |
| sales promotion (coupons, trials) | short-term sales boost |
| personal selling | explaining complex products |
| public relations | credibility, low cost |
| digital and social media | targeting, measurable results |

## Measuring campaigns

$$\text{conversion rate} = \frac{\text{customers who act}}{\text{people reached}} \times 100\%$$

$$\text{customer acquisition cost} = \frac{\text{campaign cost}}{\text{new customers}}$$

Messages should be designed for a specific **audience** and **purpose**.
`,
    note: ["Return on marketing", "Compare what a campaign costs with the profit it brings in, not just with how many people saw it."],
    ex: ["Acquisition cost", "A $3,000 social media campaign brings 150 new customers. What is the acquisition cost?", [R`3,000 ÷ 150.`], "$20 per customer."],
  },
];
