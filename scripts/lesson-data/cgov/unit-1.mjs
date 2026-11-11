/* AP Comparative Government and Politics, Unit 1: Political Systems, Regimes, and Governments. */
const R = String.raw;
export const lessons = [
  {
    id: "the-practice-of-political-scientists",
    obj: ["Explain how political scientists use empirical data, normative statements and the comparative method."],
    terms: [
      ["Empirical statement", "A claim based on observable evidence that can be tested."],
      ["Normative statement", "A claim about what ought to be, based on values."],
      ["Correlation and causation", "Two variables moving together does not prove that one causes the other."],
    ],
    checks: [
      ["Is 'Nigeria should adopt proportional representation' empirical or normative?", "Normative."],
      ["Why do comparativists study several countries?", "To find patterns and test explanations that a single case cannot show."],
    ],
    body: R`
Comparative politics asks why political systems differ and what effects those differences have. It studies six course countries: **China, Iran, Mexico, Nigeria, Russia and the United Kingdom**.

## Tools

- **Empirical** data: election results, turnout, GDP, human development and corruption indexes.
- **Normative** judgments: claims about what is better or fair.
- **Quantitative** data (numbers) and **qualitative** evidence (text, interviews, case studies).
- The **comparative method**: compare cases that are similar in most ways but differ in one key variable.

When reading data, identify the trend, then draw a conclusion that the data actually supports. Correlation does not prove causation.
`,
    note: ["Read the axes", "On the exam's data questions, read the title, axes and units first. Many wrong answers misread what is measured."],
    ex: ["Empirical or normative?", "Classify: (1) Mexico's voter turnout was about 61% in 2024. (2) Mexico's turnout is too low.", ["(1) can be checked against data.", "(2) is a value judgment."], "(1) empirical, (2) normative."],
  },
  {
    id: "defining-political-organizations",
    obj: ["Distinguish state, nation, regime and government."],
    terms: [
      ["State", "A political organization with sovereignty over a defined territory and population."],
      ["Nation", "A group of people who share an identity, often language, culture or history."],
      ["Regime", "The fundamental rules and norms of politics; it lasts longer than any one government."],
      ["Government", "The people and institutions that hold authority at a given time."],
    ],
    checks: [
      ["Can a state contain several nations?", "Yes; Nigeria and the United Kingdom are multinational states."],
      ["What changes at an election in a democracy: the regime or the government?", "The government."],
    ],
    body: R`
| Concept | Example |
| --- | --- |
| state | Russia, with sovereignty over its territory |
| nation | Scots within the United Kingdom; Yoruba within Nigeria |
| regime | Iran's theocratic republic since 1979 |
| government | the cabinet currently in office in the UK |

A **nation-state** is a state whose people largely share a national identity. **Sovereignty** means the state has final authority within its borders.

A regime change (Iran in 1979, Russia in 1991) replaces the rules; a change of government operates within them.
`,
    note: ["Precise vocabulary", "The exam expects you to use these terms exactly. 'Government' and 'regime' are not interchangeable."],
    ex: ["Regime or government?", "In 2000 Mexico's PRI lost the presidency after 71 years, but the constitution and institutions stayed in place. Was this a regime change?", ["The rules of the political system continued.", "Only the party in power changed."], "a change of government (though it marked democratization within the regime)."],
  },
  {
    id: "democracy-vs-authoritarianism",
    obj: ["Compare democratic and authoritarian regimes, including illiberal democracies and hybrid regimes."],
    terms: [
      ["Liberal democracy", "Free and fair elections plus rule of law, civil liberties, independent courts and a free press."],
      ["Illiberal democracy", "Holds elections but limits civil liberties, media and independent institutions."],
      ["Authoritarian regime", "Power is concentrated, with limited political competition and accountability."],
    ],
    checks: [
      ["Which course countries are usually classified as authoritarian?", "China, Iran and Russia."],
      ["What separates a liberal from an illiberal democracy?", "Protection of civil liberties, rule of law and independent institutions, not just elections."],
    ],
    body: R`
| Regime type | Features | Course examples |
| --- | --- | --- |
| liberal democracy | competitive elections, rule of law, civil liberties | United Kingdom |
| illiberal or developing democracy | elections, but weaker rule of law and liberties | Mexico, Nigeria |
| authoritarian | limited competition, controlled media and courts | China, Iran, Russia |

Authoritarian regimes vary: **one-party** (China), **theocratic** (Iran), and **competitive authoritarian / personalist** (Russia), where elections exist but are not fair.

**Rule of law** means everyone, including leaders, is subject to the law; **rule by law** uses law as a tool of control.
`,
    note: ["Elections are not enough", "Russia and Iran hold elections, but controls on candidates, media and courts keep them from being free and fair."],
    ex: ["Classify", "A country holds regular elections, but the main opposition leaders are barred from running and independent media are closed. How should it be classified?", ["Elections exist but competition is not fair."], "authoritarian (competitive authoritarian), not a liberal democracy."],
  },
  {
    id: "democratization",
    obj: ["Describe the process of democratization and evaluate democratic consolidation."],
    terms: [
      ["Democratization", "The transition from authoritarian rule toward democracy."],
      ["Democratic consolidation", "When democracy becomes widely accepted as 'the only game in town', with peaceful transfers of power."],
      ["Democratic backsliding", "The weakening of democratic institutions and freedoms."],
    ],
    checks: [
      ["Name an indicator of democratization in Mexico.", "The creation of an independent electoral institute and the PRI's loss of the presidency in 2000."],
      ["When did Nigeria return to civilian rule?", "1999."],
    ],
    body: R`
## Indicators of democratization

- Competitive, free and fair elections, with peaceful **alternation** of power.
- Independent election commissions and courts.
- Expanded civil liberties, free media and active civil society.

## Course examples

- **Mexico**: decades of PRI dominance ended in 2000; an independent electoral authority (now the INE) supervises elections.
- **Nigeria**: return to civilian rule in 1999; in 2015 an incumbent president lost and accepted defeat, the first such transfer.
- **Russia**: partial democratization in the 1990s followed by backsliding.

Consolidation is helped by economic development, a strong civil society and elite acceptance of the rules.
`,
    note: ["Backsliding", "Democratization is not one-way. Weakened courts, controlled media and changed term limits can reverse earlier gains."],
    ex: ["Evidence of consolidation", "Which event best shows democratic consolidation: a new constitution, or the second peaceful transfer of power between rival parties after a lost election?", ["Consolidation means the rules are accepted by losers as well as winners."], "the peaceful transfer of power after an election loss."],
  },
  {
    id: "sources-of-power-and-authority",
    obj: ["Explain how constitutions and other sources of authority distribute power."],
    terms: [
      ["Constitution", "The rules, written or unwritten, that establish and limit government authority."],
      ["Uncodified constitution", "A constitution not contained in a single document, as in the United Kingdom."],
      ["Parliamentary sovereignty", "Parliament can make or repeal any law; no court can overturn its acts."],
    ],
    checks: [
      ["Which course country has an uncodified constitution?", "The United Kingdom."],
      ["What makes Iran's constitution distinctive?", "It combines republican institutions with clerical authority under the Supreme Leader."],
    ],
    body: R`
| Country | Constitution |
| --- | --- |
| United Kingdom | uncodified: statutes, common law, conventions; parliamentary sovereignty |
| Russia | 1993 constitution, amended in 2020 |
| China | written constitution; the CCP's leadership role is central |
| Iran | 1979 constitution establishing velayat-e faqih (guardianship of the jurist) |
| Mexico | 1917 constitution, often amended |
| Nigeria | 1999 constitution establishing a federal presidential system |

Authority can be **traditional**, **charismatic** or **rational-legal** (based on law and procedures).
`,
    note: ["Constitutions on paper and in practice", "Authoritarian states often have written constitutions with rights that are not protected in practice."],
    ex: ["Source of authority", "Iran's Supreme Leader's authority rests on a religious doctrine written into the constitution. Which type of legitimacy combines here?", ["Religious tradition plus a written legal document."], "traditional (religious) and rational-legal authority."],
  },
  {
    id: "change-in-power-and-authority",
    obj: ["Explain how and why governments change the distribution of power, including through reforms."],
    terms: [
      ["Devolution", "Transferring powers from central government to regional governments."],
      ["Decentralization", "Moving some decision-making away from the center."],
    ],
    checks: [
      ["Give an example of devolution in the UK.", "The Scottish Parliament, Welsh Senedd and Northern Ireland Assembly created in 1998–99."],
      ["Why might an authoritarian state decentralize economic policy?", "To improve growth and adapt locally while keeping political control."],
    ],
    body: R`
Governments redistribute power to respond to pressure, improve effectiveness or strengthen legitimacy.

- **United Kingdom**: devolution to Scotland, Wales and Northern Ireland; a Supreme Court separate from the House of Lords (2009).
- **China**: economic decentralization to provinces since the reform era, while the CCP keeps political control.
- **Russia**: recentralization since 2000, including appointed or tightly managed regional leaders.
- **Mexico**: federal reforms shifting power among levels; constitutional changes to the judiciary in 2024.
- **Nigeria**: debates over "true federalism" and control of oil revenue.
`,
    note: ["Why governments change power", "Ask what problem the change was meant to solve, and whether it increased or decreased central control."],
    ex: ["Explain a change", "Why did the UK devolve power to Scotland?", ["Demand for self-government grew among Scots.", "Devolution was meant to address it while keeping the union."], "to respond to Scottish demands for self-rule and preserve the United Kingdom."],
  },
  {
    id: "federal-and-unitary-systems",
    obj: ["Compare federal and unitary systems in the course countries."],
    terms: [
      ["Federal system", "Sovereignty is constitutionally divided between national and regional governments."],
      ["Unitary system", "Sovereignty rests with the central government, which may delegate powers."],
    ],
    checks: [
      ["Which course countries are federal?", "Mexico, Nigeria and Russia."],
      ["Is the UK federal because of devolution?", "No; it is unitary, because Parliament can change or revoke devolved powers."],
    ],
    body: R`
| Federal | Unitary |
| --- | --- |
| Mexico (32 federal entities) | United Kingdom (with devolution) |
| Nigeria (36 states plus a capital territory) | China |
| Russia (federal subjects) | Iran |

Federalism can manage diversity (ethnic, regional) but can also create conflict over resources. In practice, Russia's federalism is highly centralized.
`,
    note: ["On paper versus in practice", "A constitution may say federal, but power can be concentrated at the center, as in Russia."],
    ex: ["Classify", "In a country, regional governments' powers are guaranteed by the constitution and cannot be removed by a simple national law. Federal or unitary?", ["Constitutionally protected regional authority."], "federal."],
  },
  {
    id: "political-legitimacy",
    obj: ["Explain sources of legitimacy and how states gain it."],
    terms: [
      ["Legitimacy", "The belief by citizens that the government has the right to rule."],
      ["Performance legitimacy", "Legitimacy based on results such as economic growth or security."],
    ],
    checks: [
      ["What is a major source of the CCP's legitimacy?", "Economic growth and rising living standards (performance), plus nationalism."],
      ["Name an indicator of low legitimacy.", "Low turnout, protests, low trust in institutions or political violence."],
    ],
    body: R`
Sources of legitimacy:

- **Elections** and constitutional procedures (UK, Mexico, Nigeria).
- **Economic performance** (China).
- **Religion and ideology** (Iran's Islamic Republic).
- **Nationalism** and tradition (Russia, China).

Indicators: turnout, trust in institutions, compliance with laws, and the absence of widespread unrest.
`,
    note: ["Legitimacy versus power", "A regime can hold power by coercion without legitimacy, but this is costly and less stable."],
    ex: ["Identify the source", "A government emphasizes decades of rapid growth and poverty reduction to justify one-party rule. What source of legitimacy is this?", ["It is based on results."], "performance (economic) legitimacy."],
  },
  {
    id: "sustaining-legitimacy",
    obj: ["Explain how regimes maintain legitimacy and control, including through policy and coercion."],
    terms: [
      ["Co-optation", "Bringing potential opponents into the system with benefits or positions."],
      ["Rentier state", "A state that gets much of its revenue from natural resources rather than taxation."],
    ],
    checks: [
      ["How can oil revenue affect legitimacy?", "It can fund popular programs but weaken accountability, since the state depends less on taxes."],
      ["Give an example of co-optation.", "Including business elites or religious leaders in official bodies."],
    ],
    body: R`
Regimes sustain legitimacy through:

- **Policy performance**: growth, social spending, security.
- **Elections and participation**, even if limited.
- **Nationalism** and appeals to identity.
- **Co-optation** of elites and groups.
- **Coercion**: censorship, surveillance, arrests.

Resource wealth can fund benefits (Russia, Iran, Nigeria), but price drops strain budgets and legitimacy.
`,
    note: ["Mixed strategies", "Authoritarian regimes usually combine benefits for supporters with pressure on opponents."],
    ex: ["Explain", "How might falling oil prices threaten a rentier state's legitimacy?", ["Revenue falls, so spending and subsidies are cut.", "Citizens may become dissatisfied."], "less revenue means fewer benefits, which can increase discontent."],
  },
  {
    id: "political-stability",
    obj: ["Explain factors that support or threaten political stability."],
    terms: [["Political stability", "The ability of a regime to survive and govern without disruptive upheaval."]],
    checks: [
      ["Name two threats to stability in Nigeria.", "Ethnic and religious conflict, insurgency (such as Boko Haram), corruption and economic dependence on oil."],
      ["How can elections support stability?", "They provide peaceful ways to transfer power and channel discontent."],
    ],
    body: R`
| Supports stability | Threatens stability |
| --- | --- |
| legitimacy, rule of law | corruption, low trust |
| economic growth | unemployment, inequality, inflation |
| institutions that manage conflict | ethnic, religious or regional cleavages |
| peaceful transfer of power | insurgency, coups, mass protests |

Examples: Nigeria's insurgencies and regional tensions; Iran's periodic protest waves; China's concern with regional and ethnic unrest; Mexico's cartel violence.
`,
    note: ["Stability is not democracy", "Authoritarian regimes can be stable, and democracies can face instability."],
    ex: ["Assess", "A country has rising youth unemployment and recent mass protests over fuel prices. What is the likely effect on stability?", ["Economic grievances and protests strain the regime."], "stability is threatened unless the government responds effectively."],
  },
];
