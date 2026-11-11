/* AP Comparative Government and Politics, Unit 2: Political Institutions. */
const R = String.raw;
export const lessons = [
  {
    id: "parliamentary-presidential-and-semi-presidential-systems",
    obj: ["Describe parliamentary, presidential and semi-presidential systems."],
    terms: [
      ["Parliamentary system", "The executive (prime minister and cabinet) comes from and is accountable to the legislature."],
      ["Presidential system", "A directly elected president is separate from the legislature and serves a fixed term."],
      ["Semi-presidential system", "A directly elected president shares executive power with a prime minister."],
    ],
    checks: [
      ["Which course country is parliamentary?", "The United Kingdom."],
      ["Which course country is semi-presidential?", "Russia."],
    ],
    body: R`
| System | Executive | Course examples |
| --- | --- | --- |
| parliamentary | PM chosen from the legislative majority; fusion of powers | United Kingdom |
| presidential | separately elected president; separation of powers | Mexico, Nigeria |
| semi-presidential | elected president plus PM | Russia |

China and Iran do not fit neatly: China is a one-party state with a nominal legislature, and Iran combines an elected president with the unelected Supreme Leader.
`,
    note: ["Head of state and head of government", "In the UK the monarch is head of state and the PM head of government. In Mexico and Nigeria the president is both."],
    ex: ["Identify", "A country's head of government must keep the support of a majority in the legislature or be replaced. Which system?", ["Executive accountable to the legislature."], "parliamentary."],
  },
  {
    id: "comparing-parliamentary-presidential-and-semi-presidential-systems",
    obj: ["Compare the advantages and disadvantages of each system."],
    terms: [
      ["Fusion of powers", "The executive is drawn from and controlled by the legislature."],
      ["Divided government", "The presidency and legislature are controlled by different parties."],
    ],
    checks: [
      ["Name an advantage of parliamentary systems.", "A government with a majority can pass its program efficiently."],
      ["Name a risk in presidential systems.", "Gridlock under divided government, and a fixed term makes removing a failing president hard."],
    ],
    body: R`
| | Parliamentary | Presidential |
| --- | --- | --- |
| efficiency | high with a majority | can face gridlock |
| accountability | votes of no confidence | fixed terms; impeachment |
| stability of executive | can fall at any time | fixed term |
| checks | weaker (fusion of powers) | stronger (separation of powers) |

Semi-presidential systems can produce strong presidents (Russia), especially when the president appoints and dismisses the PM.
`,
    note: ["Use specific evidence", "Comparisons are stronger when tied to a course country, for example, the UK's majority governments versus Mexico's periods of divided government."],
    ex: ["Compare", "Why might a UK prime minister pass legislation more easily than a Mexican president?", ["The UK PM leads the majority party in the Commons.", "A Mexican president may face a Congress controlled by other parties."], "fusion of powers gives a majority PM control of the legislature."],
  },
  {
    id: "executive-systems",
    obj: ["Compare the powers of executives in the course countries."],
    terms: [
      ["Head of state", "The symbolic leader representing the state."],
      ["Head of government", "The leader who runs the government and directs policy."],
      ["Supreme Leader", "Iran's highest authority, a senior cleric chosen by the Assembly of Experts."],
    ],
    checks: [
      ["Who holds the most power in China?", "The General Secretary of the CCP, who also serves as state president and military commission chair."],
      ["Who chooses Iran's Supreme Leader?", "The Assembly of Experts, an elected body of clerics."],
    ],
    body: R`
| Country | Head of state | Head of government | Notes |
| --- | --- | --- | --- |
| UK | monarch | prime minister | PM leads the majority party |
| Russia | president | prime minister | president dominant |
| China | president | premier | real power in CCP leadership |
| Iran | Supreme Leader | president | Supreme Leader controls military, judiciary heads, media |
| Mexico | president | president | single six-year term |
| Nigeria | president | president | federal presidential system |

Executives' formal powers include vetoes, decrees, appointments and command of the military.
`,
    note: ["Formal versus informal power", "Party leadership, control of security forces and patronage can matter more than formal powers."],
    ex: ["Compare", "Which executive in the course countries is limited by an unelected religious authority?", ["Iran's president is subordinate to the Supreme Leader."], "Iran's president."],
  },
  {
    id: "executive-term-limits",
    obj: ["Explain how term limits affect accountability and power, and how they have been changed."],
    terms: [["Term limit", "A legal limit on how long or how many times a leader can hold office."]],
    checks: [
      ["How long is a Mexican president's term?", "Six years, with no re-election."],
      ["What happened to China's presidential term limits in 2018?", "They were removed."],
    ],
    body: R`
| Country | Term rules |
| --- | --- |
| Mexico | one six-year term (sexenio) |
| Nigeria | four-year terms, two-term limit |
| Iran | four-year terms; two consecutive terms |
| Russia | six-year terms; 2020 amendments reset previous terms for the incumbent |
| China | presidential term limits removed in 2018 |
| UK | no PM term limit; elections at least every five years |

Term limits prevent personal concentration of power and encourage turnover; removing them can signal authoritarian consolidation.
`,
    note: ["Why leaders change term limits", "Changing term limits allows an incumbent to stay in power, reducing alternation and accountability."],
    ex: ["Explain the significance", "What did Russia's 2020 constitutional amendments mean for presidential term limits?", ["The incumbent's previous terms were reset to zero."], "they allowed the sitting president to run for additional terms, extending personal rule."],
  },
  {
    id: "removal-of-executives",
    obj: ["Compare procedures for removing executives."],
    terms: [
      ["Vote of no confidence", "A legislative vote that can force a parliamentary government to resign."],
      ["Impeachment", "A formal process by which a legislature charges and may remove an executive."],
    ],
    checks: [
      ["How is a UK prime minister usually replaced between elections?", "By their party choosing a new leader, or through a vote of no confidence."],
      ["Who can dismiss Iran's Supreme Leader, formally?", "The Assembly of Experts."],
    ],
    body: R`
| Country | Removal |
| --- | --- |
| UK | no-confidence vote; party leadership challenge |
| Mexico, Nigeria | impeachment by the legislature |
| Russia | impeachment (very difficult); president can dismiss the PM |
| Iran | Assembly of Experts can remove the Supreme Leader; Majles can impeach ministers |
| China | removal decided within the CCP leadership |

Easier removal increases accountability but can reduce stability.
`,
    note: ["Party removal in the UK", "Several UK prime ministers have been replaced by their own party between general elections, without a no-confidence vote in the Commons."],
    ex: ["Compare", "Which is easier to remove: a UK PM who loses party support, or a Nigerian president?", ["A UK PM depends on party and parliamentary support.", "A Nigerian president can be removed only by a demanding impeachment process."], "the UK prime minister."],
  },
  {
    id: "legislative-systems",
    obj: ["Compare the structure and powers of legislatures in the course countries."],
    terms: [
      ["Bicameral legislature", "A legislature with two chambers."],
      ["Unicameral legislature", "A legislature with one chamber, such as Iran's Majles."],
    ],
    checks: [
      ["Which chamber of the UK Parliament is more powerful?", "The House of Commons."],
      ["What is the role of China's National People's Congress?", "Formally the highest state organ, but it largely approves decisions made by the CCP."],
    ],
    body: R`
| Country | Legislature |
| --- | --- |
| UK | House of Commons (elected) and House of Lords (appointed, hereditary, bishops) |
| Russia | State Duma and Federation Council |
| China | National People's Congress (meets briefly; Standing Committee between sessions) |
| Iran | Majles (unicameral), checked by the Guardian Council |
| Mexico | Chamber of Deputies and Senate |
| Nigeria | House of Representatives and Senate |

Legislatures make laws, approve budgets and oversee the executive, with very different real power.
`,
    note: ["Upper chambers", "The House of Lords can delay but not block most legislation; Nigeria's and Mexico's Senates have equal law-making power with the lower house."],
    ex: ["Identify", "Which course country's legislation must be approved by a council that can veto laws inconsistent with Islam and the constitution?", ["The Guardian Council reviews Majles legislation."], "Iran."],
  },
  {
    id: "independent-legislatures",
    obj: ["Evaluate how independent legislatures are from the executive."],
    terms: [
      ["Rubber-stamp legislature", "A legislature that routinely approves executive decisions."],
      ["Question Time", "Weekly sessions in which UK MPs question the prime minister."],
    ],
    checks: [
      ["Name a way the UK Parliament holds the executive accountable.", "Question Time, select committees and votes of no confidence."],
      ["Why is Russia's Duma considered weak?", "It is dominated by a pro-presidential party and rarely challenges the president."],
    ],
    body: R`
Indicators of legislative independence: the ability to reject executive bills, investigate, control budgets and remove officials.

- **Stronger**: UK Parliament (committees, Question Time), Mexico's Congress when opposition parties hold seats, Nigeria's National Assembly.
- **Weaker**: Russia's Duma, China's NPC, Iran's Majles (constrained by the Guardian Council and Supreme Leader).
`,
    note: ["Party discipline", "In the UK, strong party discipline means MPs usually vote with their party, but rebellions can defeat governments."],
    ex: ["Evaluate", "A legislature passes nearly all executive bills with large majorities and rarely holds hearings. What does this suggest?", ["Little oversight or opposition."], "a weak legislature with little independence."],
  },
  {
    id: "judicial-systems",
    obj: ["Compare judicial systems and judicial review in the course countries."],
    terms: [
      ["Judicial review", "The power of courts to strike down laws or actions that violate the constitution."],
      ["Rule of law", "Laws apply equally to everyone, including officials."],
    ],
    checks: [
      ["Can the UK Supreme Court strike down an Act of Parliament?", "No; it can issue declarations of incompatibility with human-rights law."],
      ["Which Iranian body enforces Islamic law in courts?", "The judiciary, headed by an official appointed by the Supreme Leader."],
    ],
    body: R`
| Country | Highest court | Judicial review |
| --- | --- | --- |
| UK | Supreme Court (since 2009) | limited; parliamentary sovereignty |
| Russia | Constitutional Court | formal but rarely against the executive |
| China | Supreme People's Court | none over CCP decisions |
| Iran | judiciary under the Supreme Leader; Guardian Council reviews laws | through the Guardian Council |
| Mexico | Supreme Court of Justice | yes; 2024 reform made judges popularly elected |
| Nigeria | Supreme Court | yes; decides election disputes |
`,
    note: ["Common law and religious law", "The UK uses common law; Iran applies Sharia; Nigeria has Sharia courts in some northern states alongside common-law courts."],
    ex: ["Compare", "Which course country's courts have regularly ruled on presidential election disputes?", ["Nigeria's courts hear challenges to presidential results."], "Nigeria."],
  },
  {
    id: "independent-judiciaries",
    obj: ["Evaluate judicial independence and its effect on rule of law."],
    terms: [["Judicial independence", "Courts can rule without pressure from the executive, legislature or party."]],
    checks: [
      ["Name a feature that protects judicial independence.", "Secure tenure, protected salaries, merit-based appointment."],
      ["Why might popularly electing judges raise concerns?", "Judges may be influenced by parties and campaigns rather than law."],
    ],
    body: R`
Judicial independence is supported by long or secure terms, appointment processes that limit political control, and respect for court rulings.

- **UK**: strong independence; separation from Parliament since 2009.
- **Mexico**: debate over the 2024 reform replacing appointed judges with popularly elected ones.
- **Nigeria**: courts sometimes rule against governments but face corruption and pressure.
- **Russia, China, Iran**: courts largely serve the regime.
`,
    note: ["Why it matters", "Independent courts protect civil liberties and property rights and make rule of law credible."],
    ex: ["Evaluate", "A court cancels an election result for fraud, and the result is accepted. What does this show?", ["Courts can check powerful actors and are obeyed."], "a degree of judicial independence and rule of law."],
  },
];
