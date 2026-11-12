/* AP Psychology, Unit 3: Development and Learning. */
const R = String.raw;
export const lessons = [
  {
    id: "themes-and-methods-in-developmental-psychology",
    obj: ["Describe the enduring themes of developmental psychology and the research designs used to study change over time.", "Interpret correlations and judge how samples are chosen."],
    terms: [
      ["Cross-sectional study", "Compares people of different ages at one time."],
      ["Longitudinal study", "Follows the same people over a long period."],
      ["Correlation coefficient", "A number from −1.00 to +1.00 giving the direction and strength of a relationship."],
      ["Random sampling", "Every member of the population has an equal chance of being chosen."],
    ],
    checks: [
      ["Which is stronger: r = −0.70 or r = +0.50?", "r = −0.70, because it is farther from zero."],
      ["What is the difference between random sampling and random assignment?", "Sampling chooses who is in the study; assignment decides which condition each participant is in."],
    ],
    body: R`
Developmental psychology studies how people change, physically, cognitively and socially, from conception to death.

## Themes

- **Nature and nurture**: how heredity and experience interact.
- **Stability and change**: which traits last and which alter.
- **Continuous or discontinuous**: gradual change (a ramp) or distinct stages (a staircase).

## Designs

| Design | Method | Strength | Weakness |
| --- | --- | --- | --- |
| Cross-sectional | different ages tested once | quick | groups differ in more than age |
| Longitudinal | same people retested over years | shows real change | slow; people drop out |

## Sampling

- **Random sampling** gives every member of the population an equal chance, which produces a **representative sample** and allows **generalization**.
- A **convenience sample** uses whoever is available and risks **sampling bias**.
- **Random assignment** is different: it places participants in conditions by chance, which allows conclusions about cause in an experiment.

## Correlation

A **correlation coefficient** (r) runs from −1.00 to +1.00.

- The sign gives the direction: **positive** (both rise together) or **negative** (one rises as the other falls).
- The distance from zero gives the strength.
- A **scatterplot** shows the pattern.

Correlation does not show causation, because of the **directionality problem** (which variable comes first?) and the **third variable problem** (something else may cause both).
`,
    note: ["Sign and size", "The sign of r tells direction only. To compare strength, ignore the sign and compare the size."],
    ex: ["Interpreting r", "Hours of television watched and school grades correlate at r = −0.40. What does this mean, and what can we not conclude?", ["Negative: more television goes with lower grades.", "0.40 is a moderate relationship.", "It is a correlation, so no cause is shown."], "A moderate negative relationship. We cannot conclude that television lowers grades; a third variable, such as parental supervision, may explain both."],
  },
  {
    id: "physical-development-across-the-lifespan",
    obj: ["Describe physical development from before birth to old age."],
    terms: [
      ["Teratogen", "A harmful agent that can damage an embryo or fetus."],
      ["Critical period", "A limited time when certain experiences are needed for normal development."],
      ["Puberty", "The period of sexual maturation."],
      ["Menopause", "The natural end of menstruation, around age 50."],
    ],
    checks: [
      ["Name a newborn reflex.", "The rooting reflex: turning toward a touch on the cheek."],
      ["Are deeper voices and body hair primary or secondary sex characteristics?", "Secondary."],
    ],
    body: R`
## Before birth and infancy

- **Teratogens**, such as alcohol, drugs and some viruses, can harm the developing baby. Maternal illness, genetic mutations and hormonal factors also affect prenatal development.
- Newborns have **reflexes**, including the **rooting reflex**.
- Motor skills develop in a set order: **gross motor skills** (large muscles: sitting, crawling, walking) and **fine motor skills** (small muscles: grasping, drawing).
- The **visual cliff** shows that crawling infants perceive depth.
- A **critical period** is a window when an experience must occur. A **sensitive period** is a window when learning is easiest. Some birds show **imprinting**, attaching to the first moving thing they see.

## Adolescence

**Puberty** brings a growth spurt and sexual maturity.

- **Primary sex characteristics**: the reproductive organs.
- **Secondary sex characteristics**: non-reproductive traits such as body hair, breasts and a deeper voice.
- **Menarche** is the first menstrual period; **spermarche** is the first ejaculation.

## Adulthood

Physical abilities peak in early adulthood and then decline gradually. Women experience **menopause** around age 50. In later life, vision, hearing, reaction time and mobility decline, though exercise slows these changes.
`,
    note: ["Critical or sensitive", "A critical period is all-or-nothing: miss it and the ability may never develop. A sensitive period is only the easiest time."],
    ex: ["Gross or fine?", "Classify: walking, tying shoelaces, jumping, holding a pencil.", ["Walking and jumping use large muscles.", "Tying laces and holding a pencil use small muscles of the hand."], "Walking and jumping are gross motor skills; tying laces and holding a pencil are fine motor skills."],
  },
  {
    id: "gender-and-sexual-orientation",
    obj: ["Describe how sex and gender influence socialization and development."],
    terms: [
      ["Sex", "Biological characteristics by which people are classified as male, female or intersex."],
      ["Gender", "Socially and culturally influenced attitudes and behaviors linked to being a boy, girl, man or woman."],
      ["Gender role", "The behaviors a culture expects of men or women."],
      ["Sexual orientation", "The direction of a person's enduring sexual attraction."],
    ],
    checks: [
      ["Is the expectation that men should not cry about sex or gender?", "Gender; it is a cultural expectation (a gender role)."],
      ["Do gender roles differ between cultures?", "Yes; they are learned and vary widely."],
    ],
    body: R`
## Sex and gender

- **Sex** refers to biology: chromosomes, hormones and anatomy.
- **Gender** refers to what a culture associates with being a boy, girl, man or woman.
- **Gender identity** is a person's own sense of their gender.
- **Gender roles** are the behaviors a culture expects. They are learned through **socialization**: children are rewarded for behavior seen as appropriate, and they imitate the models around them.

Because gender is shaped by culture, gender roles differ between societies and change over time.

## Sexual orientation

**Sexual orientation** is the direction of a person's enduring sexual attraction. Research suggests it is influenced by biological factors and is not a choice.

## Influence on development

Gender expectations affect the toys children are given, the activities they are encouraged in, how emotions are expressed and which careers seem open. These influences interact with biology throughout development.
`,
    note: ["Keep the terms separate", "On the exams, sex is biological and gender is social and cultural. Wrong options often swap the two."],
    ex: ["Sex or gender?", "In one society, nursing is seen as women's work; in another, most nurses are men. What does this show?", ["The difference is between cultures.", "Biology is the same in both societies."], "It shows a gender role, which is set by culture, not by sex."],
  },
  {
    id: "cognitive-development-across-the-lifespan",
    obj: ["Describe Piaget's stages and Vygotsky's theory, and how thinking changes in adulthood."],
    terms: [
      ["Object permanence", "Knowing that things exist when out of sight."],
      ["Conservation", "Knowing that quantity stays the same when shape changes."],
      ["Zone of proximal development", "The gap between what a learner can do alone and with help."],
      ["Crystallized and fluid intelligence", "Accumulated knowledge (rises with age) and quick reasoning (declines with age)."],
    ],
    checks: [
      ["In which stage does a child gain conservation?", "The concrete operational stage."],
      ["What does Vygotsky call temporary support from a more skilled person?", "Scaffolding."],
    ],
    body: R`
## Piaget's stages

Piaget said children build **schemas** and change them through **assimilation** and **accommodation**, passing through four stages.

| Stage | Age | Key features |
| --- | --- | --- |
| Sensorimotor | birth to 2 | knows the world through senses and actions; gains **object permanence** |
| Preoperational | 2 to 7 | language and **pretend play**; **egocentrism**, **animism**; lacks **conservation** and **reversibility**; develops **theory of mind** |
| Concrete operational | 7 to 11 | logical thought about real things; gains conservation and reversibility |
| Formal operational | 12 and up | abstract and hypothetical reasoning |

- **Egocentrism**: difficulty taking another's point of view.
- **Animism**: believing objects have feelings.
- **Theory of mind**: understanding that others have their own thoughts and beliefs.

## Vygotsky

Vygotsky stressed the social side of learning. The **zone of proximal development** is the range of tasks a child can do with help but not yet alone. **Scaffolding** is the temporary support that a more skilled person provides and then removes.

## Adulthood

- **Crystallized intelligence** (knowledge, vocabulary) rises or holds steady with age.
- **Fluid intelligence** (speed, abstract reasoning) declines.
- **Dementia**, including Alzheimer's disease, is a serious loss of memory and thinking that is not a normal part of aging.
`,
    note: ["Order of the stages", "Sensorimotor, Preoperational, Concrete, Formal. A common aid: Some People Can Fly."],
    ex: ["Which stage?", "A child says a tall, thin glass has more juice than a short, wide glass holding the same amount, and talks to her doll as if it were alive. Which stage is she in?", ["She lacks conservation.", "She shows animism.", "Both are typical before age 7."], "The preoperational stage."],
  },
  {
    id: "communication-and-language-development",
    obj: ["Describe the structure of language and the stages in which children acquire it."],
    terms: [
      ["Phoneme", "The smallest unit of sound in a language."],
      ["Morpheme", "The smallest unit that carries meaning."],
      ["Syntax", "The rules for ordering words into sentences."],
      ["Overgeneralization", "Applying a grammar rule too widely, as in 'goed'."],
    ],
    checks: [
      ["How many morphemes are in 'unhappy'?", "Two: un and happy."],
      ["What is 'want juice' an example of?", "Telegraphic speech (the two-word stage)."],
    ],
    body: R`
**Language** is a shared system of symbols, spoken, written or signed, with rules for combining them. It is **generative**: a limited set of sounds and rules can produce an unlimited number of messages.

## Building blocks

| Unit | Meaning | Example |
| --- | --- | --- |
| Phoneme | smallest unit of sound | the "ch" in chat |
| Morpheme | smallest unit of meaning | un-, kind, -ly |
| Semantics | rules for meaning | adding -ed means past |
| Syntax | rules for word order | adjective before noun in English |
| Grammar | the whole system of rules | semantics and syntax together |

## Stages of acquisition

Children everywhere pass through the same stages:

1. **Cooing** (about 2 months): vowel-like sounds.
2. **Babbling** (about 4 months): consonant and vowel sounds, including sounds not in the home language.
3. **One-word stage** (about 1 year): single words carry whole meanings.
4. **Telegraphic speech** (about 2 years): two-word sentences of nouns and verbs.
5. Full sentences, with **overgeneralization** errors such as "I goed", which show that children are applying rules, not just imitating.

Nonverbal gestures, such as pointing, also communicate. Language is learned most easily in childhood, which suggests a sensitive period.
`,
    note: ["Errors that show learning", "A child who says 'mouses' has never heard that word from an adult. The error proves the child has worked out a rule."],
    ex: ["Count the units", "For the word 'cats', count the phonemes and the morphemes.", ["Sounds: k, a, t, s.", "Meaningful parts: cat and the plural -s."], "Four phonemes and two morphemes."],
  },
  {
    id: "social-emotional-development-across-the-lifespan",
    obj: ["Describe how relationships, parenting and culture shape social and emotional development across life."],
    terms: [
      ["Attachment", "The emotional bond between a child and a caregiver."],
      ["Authoritative parenting", "Firm rules explained with warmth; linked to the best outcomes."],
      ["Ecological systems theory", "Development is shaped by layers of environment, from family to culture."],
      ["Identity versus role confusion", "Erikson's stage of adolescence."],
    ],
    checks: [
      ["Which parenting style is strict and gives no explanations?", "Authoritarian."],
      ["What did Harlow's monkeys show about attachment?", "Contact comfort matters more than feeding."],
    ],
    body: R`
## Ecological systems theory

| System | What it contains |
| --- | --- |
| Microsystem | groups in direct contact: family, school, friends |
| Mesosystem | links between those groups |
| Exosystem | settings that affect the child indirectly, such as a parent's workplace |
| Macrosystem | cultural values and laws |
| Chronosystem | life stage and historical time |

## Parenting, temperament and attachment

- **Authoritarian** parents are strict and expect obedience. **Authoritative** parents set rules but explain and listen. **Permissive** parents set few limits.
- **Temperament** is a child's inborn emotional style.
- **Attachment** is studied with the strange situation. Styles are **secure**, and the insecure styles **avoidant**, **anxious** and **disorganized**.
- **Separation anxiety** peaks at about 13 months.
- Harlow showed that **contact comfort**, not food, is the basis of attachment.

## Peers and adolescence

- Children move from **parallel play** (side by side) to **pretend play** with others.
- Adolescent egocentrism includes the **imaginary audience** (everyone is watching me) and the **personal fable** (I am unique and invulnerable).
- Identity statuses: **achievement** (explored and committed), **diffusion** (neither), **foreclosure** (committed without exploring), **moratorium** (exploring, not yet committed).

## Adulthood

The **social clock** is a culture's timetable for life events. **Emerging adulthood** covers about 18 to 25. **Adverse childhood experiences** raise the risk of later health and relationship problems.

## Erikson's psychosocial stages

| Age | Conflict |
| --- | --- |
| Infancy | trust versus mistrust |
| Toddlerhood | autonomy versus shame and doubt |
| Preschool | initiative versus guilt |
| Elementary school | industry versus inferiority |
| Adolescence | identity versus role confusion |
| Young adulthood | intimacy versus isolation |
| Middle adulthood | generativity versus stagnation |
| Late adulthood | integrity versus despair |
`,
    note: ["Two similar words", "Authoritarian parents are like dictators. Authoritative parents are like good teachers: firm but warm."],
    ex: ["Which identity status?", "Asha will study medicine because her parents have always said so; she has never considered anything else. Which status is this?", ["She has made a commitment.", "She has not explored alternatives."], "Identity foreclosure."],
  },
  {
    id: "classical-conditioning",
    obj: ["Explain how associations between stimuli are learned and applied."],
    terms: [
      ["Unconditioned stimulus", "A stimulus that triggers a response without learning."],
      ["Conditioned stimulus", "A once-neutral stimulus that triggers a response after pairing."],
      ["Extinction", "The weakening of a conditioned response when the conditioned stimulus appears alone."],
      ["Stimulus generalization", "Responding to stimuli similar to the conditioned stimulus."],
    ],
    checks: [
      ["In Pavlov's study, what was the conditioned response?", "Salivating to the tone alone."],
      ["A fear returns after a rest period following extinction. What is this called?", "Spontaneous recovery."],
    ],
    body: R`
**Learning** is a lasting change in behavior or knowledge from experience. The **behavioral perspective** studies observable behavior. In **classical conditioning**, an organism learns to link two stimuli, so that one comes to signal the other.

## The elements

| Element | Meaning | Pavlov's dogs |
| --- | --- | --- |
| Unconditioned stimulus (UCS) | triggers a response naturally | food |
| Unconditioned response (UCR) | the natural response | salivating to food |
| Conditioned stimulus (CS) | a neutral stimulus paired with the UCS | the tone |
| Conditioned response (CR) | the learned response to the CS | salivating to the tone |

## Processes

- **Acquisition**: the CS and UCS are paired and the response is learned. It works best when the CS comes just before the UCS.
- **Extinction**: the CS appears without the UCS and the CR fades.
- **Spontaneous recovery**: after a pause, the faded CR reappears.
- **Stimulus generalization**: responding to similar stimuli.
- **Stimulus discrimination**: responding only to the CS.
- **Higher-order conditioning**: a new neutral stimulus is paired with an existing CS.

## Applications and limits

- Emotions can be conditioned, such as fear of a dentist's drill.
- **Counterconditioning** pairs a feared stimulus with something pleasant; it is the basis of exposure therapies.
- A **taste aversion** can form after **one trial**, even when illness follows hours later. This shows **biological preparedness**: organisms are ready to learn associations that aid survival.
- **Habituation** is a simpler kind of learning: responding less to a repeated stimulus.
`,
    note: ["Finding the parts", "Ask first: what causes the response naturally? That is the UCS. The thing that was neutral before learning is the CS. The UCR and CR are usually the same behavior."],
    ex: ["Label the parts", "A child is frightened by a loud bang whenever a white rat appears. Soon the child cries at the sight of the rat alone. Label the UCS, UCR, CS and CR.", ["The bang frightens without learning: UCS. Fear of the bang: UCR.", "The rat was neutral, then paired: CS. Crying at the rat: CR."], "UCS: loud bang. UCR: fear of the bang. CS: white rat. CR: fear of the rat."],
  },
  {
    id: "operant-conditioning",
    obj: ["Explain how consequences shape behavior, including reinforcement, punishment and schedules."],
    terms: [
      ["Reinforcement", "A consequence that makes a behavior more likely."],
      ["Punishment", "A consequence that makes a behavior less likely."],
      ["Shaping", "Reinforcing closer and closer approximations of a target behavior."],
      ["Variable-ratio schedule", "Reinforcement after an unpredictable number of responses; very resistant to extinction."],
    ],
    checks: [
      ["Is taking away a toy to reduce fighting positive or negative punishment?", "Negative punishment."],
      ["Which schedule do slot machines use?", "Variable ratio."],
    ],
    body: R`
In **operant conditioning**, behavior is shaped by its consequences. Thorndike's **law of effect** says that behaviors followed by good outcomes become more likely.

## Four consequences

Positive means adding a stimulus; negative means removing one. Reinforcement increases behavior; punishment decreases it.

| Effect on behavior | Add a stimulus | Remove a stimulus |
| --- | --- | --- |
| Behavior increases | positive reinforcement (a treat) | negative reinforcement (the alarm stops) |
| Behavior decreases | positive punishment (extra chores) | negative punishment (phone taken away) |

- **Primary reinforcers** satisfy biological needs (food). **Secondary reinforcers** are learned (money, praise).
- **Shaping** rewards successive approximations.
- **Instinctive drift**: trained animals revert to inborn behaviors.
- **Superstitious behavior** arises when a reward follows a behavior by chance.
- **Learned helplessness**: after uncontrollable bad events, an organism stops trying.

## Schedules of reinforcement

**Continuous reinforcement** rewards every response: learning is fast, but so is extinction. **Partial reinforcement** rewards only some responses and resists extinction.

| Schedule | Reinforcement comes after | Example | Pattern |
| --- | --- | --- | --- |
| Fixed ratio | a set number of responses | a free drink after ten purchases | fast, with pauses after reward |
| Variable ratio | an unpredictable number of responses | slot machines | fast and steady |
| Fixed interval | a set time | a paycheck every two weeks | speeds up as the time nears |
| Variable interval | an unpredictable time | checking for messages | slow and steady |
`,
    note: ["Negative reinforcement is not punishment", "Negative reinforcement removes something unpleasant, so the behavior increases. Ask: did the behavior go up or down?"],
    ex: ["Name the consequence", "A teenager's curfew is extended after a month of coming home on time. What kind of consequence is this, assuming he keeps coming home on time?", ["The behavior continues or increases: reinforcement.", "A restriction is removed: negative."], "Negative reinforcement."],
  },
  {
    id: "social-cognitive-and-neurological-factors-in-learning",
    obj: ["Explain learning by observation and the role of thinking in learning."],
    terms: [
      ["Observational learning", "Learning by watching and imitating others."],
      ["Vicarious conditioning", "Learning from the consequences of another's behavior."],
      ["Latent learning", "Learning that is not shown until there is a reason to show it."],
      ["Cognitive map", "A mental picture of one's surroundings."],
    ],
    checks: [
      ["What did Bandura's doll study show?", "Children imitate aggression they observe in adults."],
      ["A chimpanzee suddenly stacks boxes to reach fruit. What kind of learning is this?", "Insight learning."],
    ],
    body: R`
Conditioning does not explain all learning. Thinking and social experience matter too.

## Social learning theory

- **Observational learning**: we learn by watching others. In Bandura's study, children who watched an adult attack an inflatable doll later copied the attack.
- **Modeling**: demonstrating a behavior for others to imitate. We are most likely to copy models who are similar to us, admired or rewarded.
- **Vicarious conditioning**: seeing someone else rewarded or punished changes our own behavior.

Models can teach helpful (prosocial) behavior as well as harmful behavior.

## Cognitive factors

- **Insight learning**: a solution appears suddenly, without trial and error.
- **Latent learning**: learning takes place without reward and shows only when there is an incentive. Rats that explored a maze with no reward ran it quickly once food was added.
- **Cognitive maps**: mental pictures of a layout, which the rats had formed while exploring.

These findings show that learning involves mental processes, not only responses and rewards.
`,
    note: ["Learning without doing", "Observational and latent learning both show that an organism can learn without being reinforced itself. Performance and learning are different things."],
    ex: ["Explain the behavior", "A boy watches his sister get dessert for clearing the table. The next night he clears the table. Explain.", ["He was not rewarded himself.", "He saw her behavior rewarded."], "Vicarious conditioning (vicarious reinforcement), a form of observational learning."],
  },
];
