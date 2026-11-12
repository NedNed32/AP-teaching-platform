/* AP Psychology, Unit 4: Social Psychology and Personality. */
const R = String.raw;
export const lessons = [
  {
    id: "attribution-theory-and-person-perception",
    obj: ["Explain how people explain behavior and form impressions of themselves and others."],
    terms: [
      ["Fundamental attribution error", "Overestimating traits and underestimating the situation when judging others."],
      ["Self-serving bias", "Crediting successes to ourselves and blaming failures on the situation."],
      ["Locus of control", "Whether a person believes outcomes are controlled by themselves or by outside forces."],
      ["Self-fulfilling prophecy", "An expectation that causes its own fulfillment."],
    ],
    checks: [
      ["'He failed because he is lazy.' Is this a dispositional or situational attribution?", "Dispositional."],
      ["Liking a song more after hearing it many times is which effect?", "The mere exposure effect."],
    ],
    body: R`
**Social psychology** studies how people think about, influence and relate to one another.

## Attributions

An **attribution** is an explanation of behavior.

- **Dispositional**: the cause is the person's character.
- **Situational**: the cause is the circumstances.

| Bias | What we do |
| --- | --- |
| Fundamental attribution error | explain others' behavior by their traits, ignoring the situation |
| Actor-observer bias | explain our own behavior by the situation, others' by their traits |
| Self-serving bias | take credit for success, blame the situation for failure |

## Explanatory style and control

- An **optimistic explanatory style** sees bad events as temporary, specific and external. A **pessimistic** style sees them as lasting, global and one's own fault.
- **Internal locus of control**: I control my outcomes. **External locus of control**: luck or others do.

## Perceiving people

- **Mere exposure effect**: repeated exposure increases liking.
- **Self-fulfilling prophecy**: our expectations of someone change how we treat them, and they come to behave as expected.
- **Social comparison**: **upward** (with those better off) can lower satisfaction or motivate; **downward** (with those worse off) can raise self-esteem.
- **Relative deprivation**: feeling worse off than those we compare ourselves with.
`,
    note: ["Who is being judged?", "The fundamental attribution error is about judging other people. The self-serving bias is about judging ourselves."],
    ex: ["Which bias?", "Tom wins a game and says he is skilled; he loses the next and blames the referee. Which bias is this?", ["Success is credited to himself.", "Failure is blamed on the situation."], "The self-serving bias."],
  },
  {
    id: "attitude-formation-and-attitude-change",
    obj: ["Explain how stereotypes and attitudes form, persist and change."],
    terms: [
      ["Stereotype, prejudice, discrimination", "A generalized belief, a negative attitude, and negative behavior toward a group."],
      ["In-group bias", "Favoring one's own group."],
      ["Cognitive dissonance", "Discomfort from conflicting actions and attitudes, which motivates change."],
      ["Confirmation bias", "Seeking information that supports existing beliefs."],
    ],
    checks: [
      ["Is refusing to hire someone because of their age prejudice or discrimination?", "Discrimination; it is behavior."],
      ["How do people usually reduce cognitive dissonance?", "By changing their attitude to match their behavior."],
    ],
    body: R`
## Beliefs, feelings and actions toward groups

| Term | What it is |
| --- | --- |
| Stereotype | a generalized belief about a group (thought) |
| Prejudice | an unjustified negative attitude (feeling) |
| Discrimination | unjustified negative behavior (action) |

Stereotypes reduce mental effort but lead to errors. **Implicit attitudes** operate without awareness.

## Why bias persists

- **In-group bias**: we favor our own group.
- **Out-group homogeneity bias**: we see members of other groups as all alike.
- **Ethnocentrism**: judging other cultures by our own.
- The **just-world phenomenon**: believing people get what they deserve, which leads to blaming victims.
- **Belief perseverance**: clinging to a belief after it is discredited.
- **Confirmation bias**: looking for evidence that agrees with us.

## Changing attitudes

**Cognitive dissonance** is the tension we feel when our actions and attitudes clash. Since the action is already done, we usually change the attitude. In a classic study, people paid only one dollar to say a dull task was fun came to believe it was enjoyable, because the small payment did not justify the lie.

## Bias in research

Researchers guard against **social desirability bias** and **self-report bias** in participants, and against **experimenter bias**, **hindsight bias** and **overconfidence** in themselves.
`,
    note: ["Thought, feeling, action", "Stereotype is what you think, prejudice is what you feel, discrimination is what you do."],
    ex: ["Explain the change", "Maria thinks cheating is wrong but copies a friend's homework. Afterward she says, 'Homework does not really matter anyway.' Explain.", ["Her action conflicts with her attitude.", "The conflict is uncomfortable.", "She changes the attitude to reduce the discomfort."], "Cognitive dissonance."],
  },
  {
    id: "psychology-of-social-situations",
    obj: ["Explain how the presence and actions of others influence behavior."],
    terms: [
      ["Conformity", "Adjusting behavior to match a group."],
      ["Obedience", "Following the orders of an authority."],
      ["Bystander effect", "People are less likely to help when others are present."],
      ["Groupthink", "The desire for harmony in a group overrides realistic judgment."],
    ],
    checks: [
      ["Asking for a small favor before a large one is which technique?", "Foot-in-the-door."],
      ["Why does the bystander effect occur?", "Diffusion of responsibility: each person assumes someone else will act."],
    ],
    body: R`
## Social influence

- **Social norms** are a group's rules for accepted behavior.
- **Conformity**: Asch found that people often agree with a group's obviously wrong answer.
  - **Normative social influence**: conforming to be accepted.
  - **Informational social influence**: conforming because others seem to know better.
- **Obedience**: Milgram found that most people obeyed an authority's order to give what they believed were painful shocks.

## Persuasion

- **Central route**: evidence and arguments. **Peripheral route**: surface cues such as attractiveness. The **halo effect** makes one good trait suggest others.
- **Foot-in-the-door**: a small request first. **Door-in-the-face**: a large request first, then a smaller one.

## Behavior in groups

| Effect | What happens |
| --- | --- |
| Social facilitation | better performance on easy tasks with an audience |
| Social loafing | less effort in a group |
| Deindividuation | loss of self-restraint when anonymous in a crowd |
| Group polarization | discussion strengthens a group's existing views |
| Groupthink | harmony wins over critical judgment |
| Diffusion of responsibility | each person feels less responsible |
| False consensus effect | overestimating how many agree with us |

## Culture, conflict and helping

- **Individualism** puts personal goals first; **collectivism** puts the group first. **Multiculturalism** values diversity.
- **Superordinate goals**, which need cooperation, reduce conflict. **Social traps** arise when self-interest harms everyone.
- **Altruism** is unselfish helping. The **social reciprocity norm** says help those who helped you; the **social responsibility norm** says help those in need. The **bystander effect** reduces helping when others are present.
- **Industrial-organizational psychologists** study the workplace. **Burnout** is exhaustion from long-term work stress.

## Ethics

Studies such as Milgram's led to rules: **informed consent** (and **informed assent** for minors), **protection from harm**, **confidentiality**, limits on **deception** and the use of **confederates**, **debriefing**, and approval by an **institutional review board**.
`,
    note: ["Two reasons to conform", "Normative influence is about being liked. Informational influence is about being right."],
    ex: ["Name the technique", "A salesperson first asks whether you will answer two quick questions, then asks you to buy a subscription. Which technique is this?", ["A small request comes first.", "A larger request follows."], "The foot-in-the-door technique."],
  },
  {
    id: "psychodynamic-and-humanistic-theories-of-personality",
    obj: ["Compare the psychodynamic and humanistic explanations of personality."],
    terms: [
      ["Unconscious", "Thoughts and wishes outside awareness that still influence behavior."],
      ["Defense mechanism", "An unconscious way the ego reduces anxiety by distorting reality."],
      ["Unconditional positive regard", "Total acceptance of another person."],
      ["Self-actualizing tendency", "The inborn drive to fulfill one's potential."],
    ],
    checks: [
      ["Shouting at your brother after your boss shouts at you is which defense mechanism?", "Displacement."],
      ["What do projective tests try to reveal?", "Unconscious feelings and conflicts."],
    ],
    body: R`
**Personality** is a person's characteristic pattern of thinking, feeling and acting.

## Psychodynamic theory

The psychodynamic view holds that personality is shaped by **unconscious** processes and childhood experience. The ego protects itself from anxiety with **defense mechanisms**.

| Defense mechanism | What the person does | Example |
| --- | --- | --- |
| Denial | refuses to accept reality | insisting a diagnosis is a mistake |
| Displacement | shifts feelings to a safer target | shouting at a sibling after a bad day |
| Projection | sees own impulses in others | "She hates me" when you dislike her |
| Rationalization | gives a comfortable excuse | "I did not want that job anyway" |
| Reaction formation | acts the opposite of the impulse | being overly kind to someone you resent |
| Regression | returns to earlier behavior | thumb sucking when a new baby arrives |
| Repression | pushes thoughts out of awareness | no memory of a trauma |
| Sublimation | channels impulses into valued activity | aggression into sport |

Psychodynamic psychologists use **projective tests**, such as inkblots, to reveal the unconscious. Critics say these tests lack reliability and validity.

## Humanistic theory

The humanistic view holds that people are basically good and motivated to grow.

- The **self-actualizing tendency** is the drive to reach one's potential.
- **Unconditional positive regard**, acceptance without conditions, lets a healthy self-concept develop.
`,
    note: ["Projection and displacement", "Projection moves the feeling onto someone else (they feel it, not me). Displacement moves the target (I take it out on someone safer)."],
    ex: ["Name the defense", "A student who failed an exam says the teacher is useless and the exam was unfair. Which defense mechanism is this?", ["The student offers an excuse that protects self-esteem.", "The real reason, not studying, is avoided."], "Rationalization."],
  },
  {
    id: "social-cognitive-and-trait-theories-of-personality",
    obj: ["Compare social-cognitive and trait explanations of personality and how personality is measured."],
    terms: [
      ["Reciprocal determinism", "Behavior, thoughts and environment influence one another."],
      ["Self-efficacy", "Belief in one's ability to succeed at a task."],
      ["Big Five", "Openness, conscientiousness, extraversion, agreeableness and emotional stability."],
      ["Personality inventory", "A questionnaire measuring many traits."],
    ],
    checks: [
      ["Which Big Five trait describes an organized, reliable person?", "Conscientiousness."],
      ["How does self-efficacy differ from self-esteem?", "Self-efficacy is confidence about a task; self-esteem is overall self-worth."],
    ],
    body: R`
## Social-cognitive theory

Personality results from the interaction of the person and the situation. In **reciprocal determinism**, behavior, internal factors (thoughts and feelings) and environment each influence the others.

- **Self-concept**: your answer to "Who am I?"
- **Self-efficacy**: belief that you can succeed at a particular task.
- **Self-esteem**: your overall sense of worth.

## Trait theories

Trait theories describe personality as stable characteristics. **Factor analysis**, a statistical method, finds clusters of related items and identifies basic traits. The **Big Five** are:

| Trait | High scorers are |
| --- | --- |
| Openness to experience | imaginative, curious |
| Conscientiousness | organized, careful |
| Extraversion | sociable, energetic |
| Agreeableness | kind, cooperative |
| Emotional stability | calm, secure |

Traits are measured with **personality inventories**: long questionnaires that are scored objectively. They are more reliable than projective tests but rely on honest self-report.
`,
    note: ["Remember the five", "The first letters of openness, conscientiousness, extraversion, agreeableness and neuroticism (the opposite of emotional stability) spell OCEAN."],
    ex: ["Apply reciprocal determinism", "A confident student joins the debate club, improves with practice and becomes more confident. Identify the three factors.", ["Internal factor: confidence.", "Behavior: joining and practicing.", "Environment: the club and its feedback."], "Thoughts, behavior and environment each strengthen the others."],
  },
  {
    id: "motivation",
    obj: ["Explain theories of motivation and how they apply to behavior, including eating."],
    terms: [
      ["Drive-reduction theory", "A physical need creates tension that motivates us to reduce it."],
      ["Yerkes-Dodson law", "Performance is best at moderate arousal."],
      ["Intrinsic motivation", "Doing something for its own sake."],
      ["Approach-avoidance conflict", "One option has both attractive and unattractive features."],
    ],
    checks: [
      ["Reading for a grade is which kind of motivation?", "Extrinsic."],
      ["Choosing between two unpleasant chores is which conflict?", "Avoidance-avoidance."],
    ],
    body: R`
**Motivation** is the need or desire that energizes and directs behavior.

## Theories

| Theory | Main idea |
| --- | --- |
| Instinct theory | fixed inborn patterns drive behavior |
| Drive-reduction theory | needs create drives that push us to restore **homeostasis** |
| Arousal theory | we seek an ideal level of arousal |
| Incentive theory | external rewards pull behavior |
| Self-determination theory | we need competence, autonomy and relatedness |

The **Yerkes-Dodson law** says performance is best at moderate arousal: too little brings boredom, too much brings anxiety.

- **Intrinsic motivation** comes from within; **extrinsic motivation** comes from rewards or punishments. Rewards can reduce intrinsic motivation.

## Sensation seeking

Some people need more stimulation. Forms include **thrill and adventure seeking**, **experience seeking**, **disinhibition** and **boredom susceptibility**.

## Conflicts

- **Approach-approach**: two attractive options.
- **Avoidance-avoidance**: two unattractive options.
- **Approach-avoidance**: one option with good and bad features.

## Eating

Hunger is controlled by the **hypothalamus** and the **pituitary gland**. **Ghrelin** increases hunger; **leptin** signals fullness. External factors matter too: the presence of food, the time of day, and social gatherings.
`,
    note: ["Push and pull", "Drives push from inside (hunger). Incentives pull from outside (the smell of fresh bread)."],
    ex: ["Which theory?", "A student does poorly when bored, poorly when panicking, and best when alert but calm. Which principle explains this?", ["Performance changes with arousal.", "It peaks in the middle."], "The Yerkes-Dodson law (arousal theory)."],
  },
  {
    id: "emotion",
    obj: ["Explain theories of emotion and how emotions are expressed across cultures."],
    terms: [
      ["Facial-feedback hypothesis", "Facial expressions can influence felt emotion."],
      ["Broaden-and-build theory", "Positive emotions widen awareness and build lasting resources."],
      ["Display rules", "Cultural rules about showing emotion."],
      ["Cognitive appraisal", "The interpretation of a situation, which shapes the emotion felt."],
    ],
    checks: [
      ["Are facial expressions of basic emotions universal?", "Largely yes; they are recognized across cultures."],
      ["What differs between cultures in emotional expression?", "Display rules: when and how emotions may be shown."],
    ],
    body: R`
An **emotion** (affect) combines bodily arousal, expressive behavior and conscious experience. Emotions are triggered by **elicitors**.

## How emotion arises

Theories differ on the order of events:

- Some say bodily arousal comes first and the feeling follows.
- Some say arousal and feeling occur together.
- Others say a **cognitive appraisal** is needed: we feel an emotion only after we interpret and label the arousal. The same racing heart may be labeled as fear or as excitement.

The **facial-feedback hypothesis** says expressions also affect feelings: smiling can make you feel happier.

## Positive emotion

The **broaden-and-build theory** says positive emotions broaden awareness and encourage new thoughts and actions, which builds skills and relationships. Negative emotions narrow attention.

## Emotion and culture

- Research suggests that some basic emotions, including anger, disgust, sadness, happiness, surprise and fear, have **universal** facial expressions.
- **Display rules** differ: cultures set norms for which emotions may be shown, to whom and when. These rules can also differ by gender and age.
`,
    note: ["Universal feelings, local rules", "The expression itself is shared across cultures. Whether you are allowed to show it is cultural."],
    ex: ["Apply appraisal", "Two skiers stand at the top of a steep slope with pounding hearts. One feels thrilled and the other terrified. Explain.", ["The physical arousal is the same.", "Each interprets the situation differently."], "Their cognitive appraisals differ, so they label the same arousal as different emotions."],
  },
];
