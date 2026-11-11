/* AP Comparative Government and Politics, Units 3–5. */
const R = String.raw;
export const lessons = [
  {
    id: "civil-society",
    obj: ["Describe civil society and how states support or restrict it."],
    terms: [["Civil society", "Voluntary organizations outside the state, such as NGOs, religious groups, unions and clubs."]],
    checks: [
      ["Why do authoritarian regimes restrict civil society?", "Independent groups can organize opposition and hold the state accountable."],
      ["Give an example of restricting civil society in Russia.", "Laws labeling groups 'foreign agents' or 'undesirable'."],
    ],
    body: R`
A strong civil society links citizens to government, builds trust and checks state power.

- **UK**: a large, independent civil society.
- **Mexico, Nigeria**: active civil society facing violence or corruption.
- **Russia**: "foreign agent" laws restrict NGOs and media.
- **China**: the state permits groups that serve its goals; independent organizing is limited.
- **Iran**: tight control, with periodic protest movements.
`,
    note: ["State-sponsored groups", "Authoritarian states often create official organizations that look like civil society but are controlled by the state."],
    ex: ["Explain", "How can a strong civil society support democracy?", ["It lets citizens organize, express interests and hold officials accountable."], "by channeling participation and checking government power."],
  },
  {
    id: "political-culture",
    obj: ["Explain political culture and how it is shaped by political socialization."],
    terms: [
      ["Political culture", "Shared beliefs and attitudes about government and politics."],
      ["Political socialization", "How people acquire political values, through family, schools, media and religion."],
    ],
    checks: [
      ["Name an agent of political socialization.", "Family, schools, media, religion, peers or the state."],
      ["How does the Chinese state shape political culture?", "Through education, media control and patriotic campaigns."],
    ],
    body: R`
Political culture includes attitudes toward authority, participation and trust. Countries differ:

- **UK**: traditions of gradual change, respect for institutions.
- **China**: state-guided socialization through education and media.
- **Iran**: religious institutions and state media promote the Islamic Republic's values.
- **Mexico, Nigeria**: diverse regional, ethnic and religious identities.

Political culture can change with generations, economic development and events.
`,
    note: ["Socialization as control", "Authoritarian states use socialization deliberately to build support and legitimacy."],
    ex: ["Identify", "Patriotic education campaigns in schools are an example of what?", ["The state teaching political values."], "political socialization by the state."],
  },
  {
    id: "political-ideologies",
    obj: ["Compare political ideologies, including liberalism, socialism, communism and fascism."],
    terms: [
      ["Liberalism", "Emphasizes individual rights and freedoms, often with market economies."],
      ["Communism", "A system of collective ownership and one-party rule in practice."],
      ["Neoliberalism", "Support for free markets, privatization and reduced state intervention in the economy."],
    ],
    checks: [
      ["Which ideology officially guides China's ruling party?", "Communism (socialism with Chinese characteristics)."],
      ["What ideology underlies Iran's political system?", "Islamic theocracy (velayat-e faqih)."],
    ],
    body: R`
| Ideology | Core idea |
| --- | --- |
| liberalism | individual rights, limited government |
| socialism | greater equality through state action |
| communism | collective ownership; in practice, one-party rule |
| fascism | extreme nationalism and authoritarian rule |
| neoliberalism | free markets, privatization, deregulation |

Ideologies shape policies: market reforms in Mexico (neoliberal turn), China's mix of markets and party control, and Iran's religious governance.
`,
    note: ["Ideology and practice", "Official ideologies may differ from actual policies: China's economy includes extensive private enterprise."],
    ex: ["Classify", "A party advocates privatizing state companies and cutting trade barriers. Which ideology fits?", ["Free markets, less state role."], "neoliberalism."],
  },
  {
    id: "political-values-and-beliefs",
    obj: ["Explain how values and beliefs vary within and across countries."],
    terms: [["Post-materialism", "Values that prioritize self-expression and quality of life over economic security, often in wealthy societies."]],
    checks: [
      ["How can economic development change values?", "Wealthier generations tend to emphasize self-expression and participation."],
      ["Give an example of religious values shaping politics.", "Iran's Islamic law; Sharia in some northern Nigerian states."],
    ],
    body: R`
Beliefs about the role of the state, religion and individual rights vary across countries and groups.

- **Religion**: central to Iran's system; a major cleavage in Nigeria.
- **Generational change**: younger, urban citizens often favor more openness.
- **Economic development**: can shift values toward post-materialism.

Surveys (such as attitudes toward democracy) help measure values, but answers can be shaped by fear in authoritarian states.
`,
    note: ["Survey reliability", "In authoritarian states, respondents may not answer honestly, so survey data must be read with caution."],
    ex: ["Interpret", "A survey finds younger urban citizens are more likely than older rural citizens to support expanded civil liberties. What explains this?", ["Generational and urban–rural differences in socialization and development."], "different political socialization and economic experiences."],
  },
  {
    id: "nature-and-role-of-political-participation",
    obj: ["Describe forms of political participation and their purposes in different regimes."],
    terms: [
      ["Political participation", "Actions by citizens to influence government, such as voting, protesting or joining groups."],
      ["Compulsory voting", "Legal requirement to vote."],
    ],
    checks: [
      ["Why do authoritarian regimes hold elections?", "To claim legitimacy, gather information and co-opt elites."],
      ["Name a non-electoral form of participation.", "Protests, petitions, social movements or contacting officials."],
    ],
    body: R`
Participation can be **voluntary** or **state-controlled**, **conventional** (voting, campaigning) or **unconventional** (protests, strikes).

- Democracies use participation to choose leaders and influence policy.
- Authoritarian regimes may mobilize participation to show support or to channel discontent safely.

Examples: protest movements in Iran; election-related protests in Russia; village-level elections in China.
`,
    note: ["Participation and legitimacy", "High voluntary participation can strengthen legitimacy; forced participation does not."],
    ex: ["Explain", "Why might a regime allow local elections but not national ones?", ["Local elections give limited voice and feedback without threatening central control."], "to gain some legitimacy and information while keeping national power."],
  },
  {
    id: "forces-that-impact-political-participation",
    obj: ["Explain factors that increase or decrease participation."],
    terms: [["Voter turnout", "The percentage of eligible voters who vote."]],
    checks: [
      ["Name two factors that raise turnout.", "Competitive elections, easy registration, high education and trust in the process."],
      ["Why might turnout fall in an authoritarian election?", "Citizens believe outcomes are predetermined or boycott as protest."],
    ],
    body: R`
| Increases participation | Decreases participation |
| --- | --- |
| competitive elections | belief that results are fixed |
| education and income | fear of repression |
| strong parties and civil society | low trust, corruption |
| easy voting rules | violence or insecurity |

Turnout data across elections can show changing legitimacy, as in falling turnout in some recent Iranian and Nigerian elections.
`,
    note: ["Reading turnout trends", "A falling turnout trend can indicate declining trust, especially when combined with other evidence."],
    ex: ["Interpret", "Turnout in a country's presidential elections fell from 65% to 41% over four elections. Give a possible explanation.", ["Declining trust or competitiveness, insecurity, or disillusionment."], "growing disillusionment or distrust in the electoral process."],
  },
  {
    id: "civil-rights-and-civil-liberties",
    obj: ["Distinguish civil rights from civil liberties and evaluate their protection."],
    terms: [
      ["Civil liberties", "Protections of individuals from government, such as freedom of speech and press."],
      ["Civil rights", "Guarantees of equal treatment, for example for women or minority groups."],
    ],
    checks: [
      ["Is freedom of the press a civil right or a civil liberty?", "A civil liberty."],
      ["How do authoritarian states typically restrict civil liberties?", "Censorship, surveillance, restrictions on assembly and arrests."],
    ],
    body: R`
| Civil liberties | Civil rights |
| --- | --- |
| speech, press, religion, assembly | equal protection, nondiscrimination |

Protection varies: strong in the UK, uneven in Mexico and Nigeria, restricted in Russia, China and Iran. Methods of restriction include internet controls (China's "Great Firewall"), media laws (Russia) and morality policing (Iran).
`,
    note: ["Constitutions versus practice", "Many constitutions list liberties that are not enforced. Look at evidence such as press freedom indexes."],
    ex: ["Classify", "A law requiring equal pay for women and men protects what?", ["Equal treatment of groups."], "a civil right."],
  },
  {
    id: "political-and-social-cleavages",
    obj: ["Identify political and social cleavages and how they shape politics."],
    terms: [
      ["Cleavage", "A division in society (ethnic, religious, regional, class) that can shape political conflict."],
      ["Cross-cutting cleavage", "A division that cuts across another, reducing polarization."],
    ],
    checks: [
      ["Name a major cleavage in Nigeria.", "Ethnic (Hausa-Fulani, Yoruba, Igbo), religious (Muslim north, Christian south) and regional."],
      ["Name a regional cleavage in the UK.", "Scottish nationalism and the status of Northern Ireland."],
    ],
    body: R`
| Country | Major cleavages |
| --- | --- |
| UK | national (Scotland, Northern Ireland), class, urban–rural, Brexit |
| Russia | ethnic minorities (Chechnya), urban–rural |
| China | ethnic minorities (Uyghurs, Tibetans), urban–rural, regional inequality |
| Iran | ethnic minorities, religious–secular, generational |
| Mexico | north–south, urban–rural, indigenous populations |
| Nigeria | ethnic, religious, regional |

**Coinciding** cleavages (for example, ethnicity, religion and region overlapping) increase conflict; **cross-cutting** cleavages reduce it.
`,
    note: ["Coinciding cleavages in Nigeria", "Ethnicity, religion and region often overlap in Nigeria, which intensifies political competition."],
    ex: ["Analyze", "Why are coinciding cleavages more dangerous for stability?", ["Groups divided in several ways at once have fewer shared identities.", "Conflicts reinforce each other."], "they deepen divisions and make compromise harder."],
  },
  {
    id: "challenges-from-political-and-social-cleavages",
    obj: ["Evaluate how governments respond to challenges from cleavages."],
    terms: [
      ["Federal character principle", "Nigeria's constitutional requirement that appointments reflect the country's diversity."],
      ["Devolution", "Transferring power to regional governments to accommodate distinct groups."],
    ],
    checks: [
      ["How has Nigeria tried to manage ethnic diversity?", "Federalism, the federal character principle, and requiring broad regional support for presidents."],
      ["How has China responded to ethnic unrest?", "Heavy security, surveillance and assimilation policies."],
    ],
    body: R`
Responses to cleavages:

- **Accommodation**: devolution (UK), federalism and power sharing (Nigeria's federal character principle and its requirement that a winning presidential candidate receive at least 25% of the vote in two-thirds of states).
- **Repression**: security crackdowns (China in Xinjiang, Russia in Chechnya).
- **Policy**: development programs, affirmative action, language rights.
`,
    note: ["Evaluate effectiveness", "Explain whether a policy reduced conflict or created new problems, with evidence."],
    ex: ["Evaluate", "How does Nigeria's presidential election rule requiring broad geographic support help manage cleavages?", ["Candidates must win support beyond their own region or group."], "it encourages candidates to build cross-regional, cross-ethnic coalitions."],
  },
  {
    id: "electoral-systems-and-rules",
    obj: ["Compare single-member district, proportional representation and mixed electoral systems."],
    terms: [
      ["Single-member district (SMD) plurality", "One representative per district; the candidate with the most votes wins (first past the post)."],
      ["Proportional representation (PR)", "Seats are distributed in proportion to parties' vote shares."],
      ["Mixed system", "Combines SMD and PR seats."],
    ],
    checks: [
      ["Which course countries use mixed systems for the lower house?", "Mexico and Russia."],
      ["What system elects the UK House of Commons?", "Single-member district plurality (first past the post)."],
    ],
    body: R`
| Country | Lower house |
| --- | --- |
| UK | 650 SMD seats (first past the post) |
| Nigeria | 360 SMD seats |
| Mexico | 500 seats: 300 SMD + 200 PR |
| Russia | 450 seats: 225 SMD + 225 PR (5% threshold) |
| Iran | Majles: multi-member and single-member districts with majority/plurality rules |
| China | indirect election of NPC deputies |

Presidential elections: two-round majority (Russia), plurality (Mexico), and Nigeria's plurality plus geographic distribution requirement.
`,
    note: ["Thresholds", "PR systems often require a minimum vote share (such as Russia's 5%) to win seats, which limits small parties."],
    ex: ["Compute", "A party wins 30% of votes. Under pure PR in a 450-seat chamber, about how many seats would it get?", [R`$$0.30 \times 450 = 135$$.`], "about 135 seats."],
  },
  {
    id: "objectives-of-election-rules",
    obj: ["Explain why governments choose or change election rules and the effects of those rules."],
    terms: [["Duverger's law", "SMD plurality systems tend to produce two-party systems; PR tends to produce multiparty systems."]],
    checks: [
      ["Why does first past the post disadvantage small parties?", "They can win many votes but few seats unless their support is geographically concentrated."],
      ["Why might a regime raise a PR threshold?", "To keep small opposition parties out of the legislature."],
    ],
    body: R`
Election rules aim to:

- produce **stable governments** (SMD often gives single-party majorities);
- ensure **representation** of diverse views (PR);
- **manage cleavages** (Nigeria's distribution rule);
- for authoritarian regimes, **control outcomes** (candidate vetting in Iran, rule changes in Russia).

Effects: SMD can produce big gaps between vote share and seat share; PR creates more proportional results and coalition governments.
`,
    note: ["Seats versus votes", "Compare a party's percentage of seats with its percentage of votes to see how proportional a system is."],
    ex: ["Analyze", "A party wins 34% of the vote but 63% of seats under SMD plurality. What explains the gap?", ["Winning many districts with pluralities gives a seat bonus."], "the disproportional effect of first-past-the-post."],
  },
  {
    id: "political-party-systems",
    obj: ["Compare one-party, dominant-party, two-party and multiparty systems."],
    terms: [
      ["Dominant-party system", "Several parties compete, but one wins consistently."],
      ["One-party system", "Only one party is permitted to hold power."],
    ],
    checks: [
      ["What party system does China have?", "A one-party system under the CCP."],
      ["Which party dominated Mexico for most of the 20th century?", "The PRI."],
    ],
    body: R`
| Country | Party system |
| --- | --- |
| UK | two-party dominant (Conservative, Labour), with smaller parties such as the Liberal Democrats and SNP |
| Russia | dominant party (United Russia) with "systemic" opposition parties |
| China | one-party (CCP), with minor parties under its leadership |
| Iran | no formal party system; factions (principlists, reformists) |
| Mexico | multiparty; MORENA dominant since 2018 |
| Nigeria | competitive, mainly APC and PDP |
`,
    note: ["Systemic opposition", "In Russia, some parties appear to oppose the government but generally support the regime on major issues."],
    ex: ["Classify", "A country holds competitive elections, but the same party has won every national election for 70 years. What party system is this?", ["Competition exists, but one party always wins."], "a dominant-party system."],
  },
  {
    id: "role-of-political-party-systems",
    obj: ["Explain the functions of political parties in democratic and authoritarian systems."],
    terms: [["Patronage", "Giving jobs, contracts or benefits to supporters in exchange for loyalty."]],
    checks: [
      ["Name two functions of parties in democracies.", "Recruiting candidates, aggregating interests, organizing government and opposition."],
      ["What role does the CCP play beyond governing?", "Recruits elites, controls appointments (nomenklatura), and links state and society."],
    ],
    body: R`
Parties recruit leaders, mobilize voters, link citizens and government, and organize legislatures.

In authoritarian systems, ruling parties **co-opt** elites, distribute **patronage** and control appointments (China's nomenklatura system). Party membership can be a path to career advancement.
`,
    note: ["Parties and accountability", "When parties alternate in power, voters can hold governments accountable by voting them out."],
    ex: ["Explain", "How does party control of appointments help a one-party state?", ["Loyal members fill key posts in government, business and society."], "it ensures loyalty and keeps elites invested in the regime."],
  },
  {
    id: "impact-of-social-movements-and-interest-groups",
    obj: ["Explain how social movements and interest groups influence policy."],
    terms: [
      ["Social movement", "A broad, organized effort by many people to promote or resist change."],
      ["Interest group", "An organization that seeks to influence policy for its members."],
    ],
    checks: [
      ["Give an example of a social movement in a course country.", "#EndSARS protests in Nigeria (2020) against police brutality, or protests in Iran."],
      ["How do interest groups influence policy?", "Lobbying, campaign support, protests, litigation and public campaigns."],
    ],
    body: R`
Social movements raise issues, mobilize citizens and pressure governments: Nigeria's #EndSARS protests, the Zapatista movement in Mexico, environmental movements in the UK, and protest waves in Iran.

Governments respond by **accommodation** (reforms), **co-optation**, or **repression**.

Interest groups range from business associations to labor unions; their access depends on whether the system is pluralist or corporatist.
`,
    note: ["Response tells you about the regime", "Democracies usually tolerate protest; authoritarian regimes more often restrict or repress it."],
    ex: ["Evaluate", "Nigeria's government disbanded a police unit after mass protests. What does this show?", ["Protest pressure produced a policy response."], "social movements can influence policy, at least partially."],
  },
  {
    id: "pluralist-and-corporatist-interests",
    obj: ["Distinguish pluralism and corporatism and identify them in the course countries."],
    terms: [
      ["Pluralism", "Many independent groups compete to influence policy."],
      ["Corporatism", "A limited number of officially recognized groups represent interests, often in partnership with or controlled by the state."],
    ],
    checks: [
      ["Is the UK more pluralist or corporatist?", "Pluralist."],
      ["What is state corporatism?", "The state creates or controls interest groups, as in China or historically under Mexico's PRI."],
    ],
    body: R`
| Pluralist | Corporatist |
| --- | --- |
| UK: many independent groups | China: state-sanctioned unions and associations |
| Nigeria: many competing groups | Russia: state-linked organizations |
| Mexico today (more pluralist than under the PRI) | Mexico under the PRI: unions incorporated into the party |

Corporatism can provide stability and order; pluralism provides more independent voice.
`,
    note: ["Mexico's change", "Under the PRI, labor and peasant organizations were incorporated into the ruling party; democratization brought more pluralism."],
    ex: ["Classify", "A country has one official labor federation, created by the ruling party, that negotiates wages with the state. Pluralist or corporatist?", ["One recognized group, linked to the state."], "corporatist (state corporatism)."],
  },
  {
    id: "impact-of-global-economic-and-technological-forces",
    obj: ["Explain how globalization and technology affect states and societies."],
    terms: [["Globalization", "Increasing integration of economies, cultures and societies across borders."]],
    checks: [
      ["Name a benefit of globalization for developing countries.", "Foreign investment, trade and access to technology."],
      ["How has technology challenged authoritarian control?", "The internet and social media help citizens share information and organize."],
    ],
    body: R`
Globalization brings trade, investment, migration and the spread of ideas and technology.

- **Benefits**: growth, jobs, technology transfer (China's export growth, Mexico's manufacturing).
- **Costs**: inequality, job losses in some sectors, loss of policy autonomy, cultural tension.
- **Technology**: social media helps movements organize; states respond with censorship and surveillance (China's firewall, Iran's internet shutdowns, Russia's restrictions).
`,
    note: ["Two-sided effects", "Strong answers explain both the opportunities and the challenges that globalization creates for a specific country."],
    ex: ["Explain", "How has technology helped and challenged China's government?", ["It enables surveillance and economic growth.", "It also gives citizens new ways to share information."], "the state uses technology for control while restricting its use for dissent."],
  },
  {
    id: "political-responses-to-global-market-forces",
    obj: ["Explain how states respond to global market forces through policy."],
    terms: [
      ["Protectionism", "Policies such as tariffs that shield domestic industries from foreign competition."],
      ["Foreign direct investment (FDI)", "Investment by foreign firms in productive assets in another country."],
    ],
    checks: [
      ["Name a tool states use to attract foreign investment.", "Special economic zones, tax incentives or trade agreements."],
      ["Why might a state adopt protectionism?", "To protect domestic jobs and industries."],
    ],
    body: R`
States can **open** to markets (trade agreements, privatization, special economic zones) or **protect** themselves (tariffs, subsidies, state ownership).

- **China**: special economic zones attracting FDI, while keeping state-owned enterprises.
- **Mexico**: NAFTA (1994), now USMCA, integrating its economy with the US and Canada.
- **Russia, Iran**: state control of energy sectors; sanctions push them toward other partners.
- **UK**: Brexit changed trade relationships with the EU.
`,
    note: ["Sovereignty trade-off", "Joining trade agreements can boost growth but limits a state's freedom to set its own economic rules."],
    ex: ["Identify", "A country creates zones with lower taxes and fewer regulations for foreign companies. What policy is this?", ["Incentives for foreign investment."], "special economic zones to attract foreign direct investment."],
  },
  {
    id: "challenges-from-globalization",
    obj: ["Evaluate political and economic challenges created by globalization."],
    terms: [["Brain drain", "Emigration of educated or skilled people."]],
    checks: [
      ["Name a political backlash to globalization.", "Brexit, or nationalist and protectionist movements."],
      ["How can globalization increase inequality?", "Gains may go to skilled workers, cities or export regions while others fall behind."],
    ],
    body: R`
Challenges include:

- **Inequality** between regions and groups (coastal and interior China; northern and southern Mexico).
- **Economic vulnerability** to global price shocks (oil-dependent Nigeria, Russia, Iran).
- **Loss of sovereignty** to international agreements.
- **Cultural backlash** and nationalism.
- **Migration** and brain drain (Nigeria).
`,
    note: ["Commodity dependence", "Countries that rely on one export, such as oil, are especially exposed to world price swings."],
    ex: ["Explain", "Why did a sharp fall in world oil prices hurt Nigeria's government?", ["Oil provides a large share of government revenue and exports."], "revenue and foreign exchange fell, forcing spending cuts and weakening the economy."],
  },
  {
    id: "policies-and-economic-liberalization",
    obj: ["Explain economic liberalization policies and their effects."],
    terms: [
      ["Economic liberalization", "Reducing state control over the economy through privatization, deregulation and trade opening."],
      ["Privatization", "Selling state-owned enterprises to private owners."],
    ],
    checks: [
      ["What happened during Russia's privatization in the 1990s?", "State assets were sold quickly, often to well-connected insiders who became oligarchs."],
      ["How did China liberalize after 1978?", "Market reforms, household farming, private business and openness to trade and investment."],
    ],
    body: R`
| Country | Liberalization |
| --- | --- |
| China | gradual market reforms since 1978 under party control |
| Russia | rapid privatization in the 1990s ("shock therapy"), later partial re-nationalization |
| Mexico | 1980s–90s neoliberal reforms; NAFTA; energy reforms |
| Nigeria | structural adjustment programs; fuel subsidy reform debates |
| UK | 1980s privatization of state industries |

Effects: growth and efficiency, but also inequality, unemployment and corruption in some cases.
`,
    note: ["Pace matters", "China's gradual reforms and Russia's rapid ones had very different political effects."],
    ex: ["Compare", "Contrast China's and Russia's approaches to liberalization.", ["China: gradual, under one-party control.", "Russia: rapid privatization during political upheaval."], "China reformed gradually and kept political control; Russia's rapid privatization created oligarchs and instability."],
  },
  {
    id: "international-and-supranational-organizations",
    obj: ["Explain how international and supranational organizations affect sovereignty."],
    terms: [
      ["Supranational organization", "A body whose decisions can bind member states, such as the European Union."],
      ["Intergovernmental organization", "A body in which states cooperate but keep sovereignty, such as the UN or WTO."],
    ],
    checks: [
      ["Why did the UK leave the EU?", "Supporters of Brexit sought to restore national sovereignty, especially over laws and immigration."],
      ["Name an organization China and Russia belong to that promotes cooperation among non-Western states.", "BRICS or the Shanghai Cooperation Organisation."],
    ],
    body: R`
| Organization | Course country members |
| --- | --- |
| United Nations | all six |
| World Trade Organization | China, Mexico, Nigeria, Russia, UK (Iran is an observer) |
| European Union | UK until 2020 (Brexit) |
| African Union, ECOWAS | Nigeria |
| USMCA | Mexico |
| BRICS | China, Russia, Iran |

Membership can bring trade, aid and security but require states to accept rules that limit sovereignty.
`,
    note: ["Sovereignty debates", "Brexit is the clearest course example of a state choosing sovereignty over deeper integration."],
    ex: ["Explain", "Why is the EU called supranational?", ["Its laws and courts can bind member states."], "member states pool sovereignty, so EU decisions can override national ones."],
  },
  {
    id: "adaptation-of-social-policies",
    obj: ["Explain how states adapt social policies to address problems."],
    terms: [["Conditional cash transfer", "Payments to poor families conditioned on behaviors such as school attendance or health visits."]],
    checks: [
      ["Give an example of a conditional cash transfer program.", "Mexico's Oportunidades/Prospera program (later replaced by other social programs)."],
      ["How did China adjust population policy?", "From a one-child policy to two-child (2016) and three-child (2021) policies."],
    ],
    body: R`
States adapt social policy in response to economic, demographic and political pressures:

- **Mexico**: conditional cash transfers to reduce poverty; later shifts to universal programs.
- **China**: from the one-child policy to encouraging more births.
- **UK**: the National Health Service and welfare reforms.
- **Iran**: subsidy reform, replacing fuel subsidies with cash payments.
- **Nigeria**: debates over removing fuel subsidies.
- **Russia**: pension reform raising the retirement age.
`,
    note: ["Policy and legitimacy", "Unpopular reforms (raising pension ages, removing subsidies) can trigger protests and hurt legitimacy."],
    ex: ["Explain", "Why did China move away from the one-child policy?", ["An aging population and shrinking workforce."], "to address demographic decline and its economic effects."],
  },
  {
    id: "impact-of-industrialization-and-economic-development",
    obj: ["Explain how industrialization and development affect society and politics."],
    terms: [
      ["Human Development Index (HDI)", "A measure combining life expectancy, education and income."],
      ["Gini coefficient", "A measure of income inequality from 0 (equal) to 1 (unequal)."],
    ],
    checks: [
      ["What does a rising Gini coefficient indicate?", "Increasing income inequality."],
      ["How can industrialization affect politics?", "Urbanization and a growing middle class can increase demands for participation."],
    ],
    body: R`
Industrialization brings urbanization, a larger middle class, rising education and new demands on the state.

Measures of development: **GDP per capita**, **HDI**, **Gini coefficient**, poverty rates.

- **China**: rapid growth lifted hundreds of millions out of poverty but increased inequality and pollution.
- **Mexico**: manufacturing growth, persistent regional inequality.
- **Nigeria**: large population, high poverty despite oil wealth.

**Modernization theory** argues development promotes democracy; China is a key counterexample.
`,
    note: ["Read indicators correctly", "GDP per capita measures average income; HDI adds health and education; Gini measures how unequally income is shared."],
    ex: ["Interpret", "A country's GDP per capita doubled while its Gini rose from 0.30 to 0.45. What happened?", ["Average income rose.", "Inequality increased."], "the economy grew, but the gains were shared unequally."],
  },
  {
    id: "causes-and-effects-of-demographic-change",
    obj: ["Explain causes and effects of population change and urbanization."],
    terms: [
      ["Demographic transition", "Shift from high birth and death rates to low ones as countries develop."],
      ["Dependency ratio", "The number of dependents (young and old) relative to the working-age population."],
    ],
    checks: [
      ["Why does an aging population strain government budgets?", "More pensions and health care, with fewer workers paying taxes."],
      ["Which course country has the fastest population growth?", "Nigeria."],
    ],
    body: R`
| Country | Demographic challenge |
| --- | --- |
| China | aging, shrinking workforce (legacy of one-child policy) |
| Russia | population decline, low life expectancy for men |
| UK | aging; immigration debates |
| Iran | falling birth rate after rapid earlier growth |
| Mexico | aging; urbanization; migration |
| Nigeria | rapid growth, very young population, urbanization |

Young populations need jobs and schools; aging populations need pensions and health care.
`,
    note: ["Youth bulge", "A large young population can be an economic opportunity if jobs exist, or a source of instability if they do not."],
    ex: ["Explain", "Why might a very young, fast-growing population challenge Nigeria's government?", ["Large demand for jobs, schools and services."], "if growth outpaces job creation, unemployment and unrest may rise."],
  },
  {
    id: "impact-of-natural-resources",
    obj: ["Explain the resource curse and how natural resources affect politics and economies."],
    terms: [
      ["Resource curse", "The tendency of resource-rich countries to have slower development, more corruption and weaker democracy."],
      ["Rentier state", "A state that relies on resource revenues rather than taxation."],
    ],
    checks: [
      ["Which course countries are major oil and gas exporters?", "Russia, Iran and Nigeria (and Mexico to a lesser degree)."],
      ["Why can resource wealth weaken democracy?", "Governments need less tax from citizens, reducing accountability; revenue can fund patronage and repression."],
    ],
    body: R`
Resource wealth can fund development, but it often brings:

- **Corruption** and patronage over control of revenues.
- **Volatility** from world price swings.
- **Weak accountability** when the state does not depend on taxing citizens.
- **Conflict** over who controls resources (Niger Delta in Nigeria).

Responses include sovereign wealth funds, diversification and transparency initiatives. Mexico nationalized oil in 1938 (Pemex) and later opened the sector partly to private investment.
`,
    note: ["Avoid a one-sided answer", "Resources can support growth when institutions are strong; the curse is a tendency, not a certainty."],
    ex: ["Explain", "How has oil wealth contributed to conflict in Nigeria's Niger Delta?", ["Local communities bear environmental damage while revenues flow to the federal government and elites."], "disputes over revenue sharing and environmental harm have fueled grievances and militancy."],
  },
];
