/* AP Psychology Unit 3: Development and Learning. */
import { g, type Group } from "./psych-lib";

const T1 = "themes-and-methods-in-developmental-psychology";
const T2 = "physical-development-across-the-lifespan";
const T3 = "gender-and-sexual-orientation";
const T4 = "cognitive-development-across-the-lifespan";
const T5 = "communication-and-language-development";
const T6 = "social-emotional-development-across-the-lifespan";
const T7 = "classical-conditioning";
const T8 = "operant-conditioning";
const T9 = "social-cognitive-and-neurological-factors-in-learning";

export const psychU3: Group[] = [
  g("themes", T1, [
    ["stability and change", "the developmental question of which traits stay the same through life and which ones alter", "A researcher asks whether a shy three-year-old will still be shy at thirty. Which theme of developmental psychology is this?"],
    ["nature and nurture", "the developmental question of how heredity and experience together shape a person", "A researcher asks how much of a child's musical ability comes from genes and how much from lessons. Which theme of developmental psychology is this?"],
    ["continuous development", "the view that development is a gradual, steady process, like a ramp", "A theorist says children's thinking improves little by little, with no sudden jumps. Which view of development is this?"],
    ["discontinuous development", "the view that development happens in distinct stages, like a staircase", "A theorist says children's thinking passes through four separate stages, each different in kind from the one before. Which view of development is this?"],
    ["a cross-sectional study", "research that compares people of different ages at one point in time", "On one day, a researcher gives the same memory test to groups of 20-, 40- and 60-year-olds and compares them. Which research design is this?"],
    ["a longitudinal study", "research that follows the same people and retests them over a long period", "A researcher tests the same 200 children every two years from age 6 to age 30. Which research design is this?"],
  ]),
  g("early-physical", T2, [
    ["a teratogen", "a harmful agent, such as alcohol or a virus, that can damage an embryo or fetus", "A doctor warns a pregnant patient that alcohol can cross the placenta and harm the developing baby. Alcohol is an example of which of the following?"],
    ["the rooting reflex", "a newborn's automatic turning of the head toward a touch on the cheek, to find food", "When a newborn's cheek is stroked, she turns her head and opens her mouth. This best illustrates which of the following?"],
    ["the visual cliff", "the laboratory apparatus with a glass-covered drop that is used to test depth perception in infants", "A crawling infant refuses to cross a sheet of glass over what looks like a steep drop. Which apparatus is being used?"],
    ["a critical period", "a limited time early in life when certain experiences must occur for normal development", "A child who hears no language at all before adolescence never fully masters grammar. This best supports the idea of which of the following?"],
    ["imprinting", "the process by which some animals form a strong attachment to the first moving object they see", "Newly hatched ducklings follow the first moving thing they see, a researcher, as if he were their mother. This best illustrates which of the following?"],
    ["gross motor skills", "the movements that use large muscles, such as crawling, walking and jumping", "At thirteen months, Ella takes her first steps. Walking is an example of which of the following?"],
    ["fine motor skills", "the movements that use small muscles, such as grasping a crayon or buttoning a shirt", "At age four, Noah learns to hold a pencil correctly and to fasten buttons. These are examples of which of the following?"],
  ]),
  g("later-physical", T2, [
    ["puberty", "the period of sexual maturation, when a person becomes able to reproduce", "Between ages 11 and 14, Dev grows quickly and his body becomes capable of reproduction. Which period is this?"],
    ["primary sex characteristics", "the body structures, such as ovaries and testes, that make reproduction possible", "During adolescence, the reproductive organs themselves mature. These organs are examples of which of the following?"],
    ["secondary sex characteristics", "the nonreproductive traits of sexual maturity, such as body hair and a deeper voice", "During adolescence, Luis grows facial hair and his voice deepens. These changes are examples of which of the following?"],
    ["menarche", "a girl's first menstrual period", "Which term refers to the first menstrual period?"],
    ["spermarche", "a boy's first ejaculation", "Which term refers to the first ejaculation, which marks sexual maturity in boys?"],
    ["menopause", "the natural end of menstruation and of the ability to reproduce, usually around age 50", "Around age 51, Mrs. Ortiz's menstrual cycles stop permanently. Which term describes this change?"],
  ]),
  g("gender", T3, [
    ["sex", "the biological characteristics, such as chromosomes and anatomy, by which people are classified as male, female or intersex", "A doctor records a newborn as female on the basis of anatomy and chromosomes. The doctor is recording which of the following?"],
    ["gender", "the socially and culturally influenced attitudes, feelings and behaviors that a culture links to being a boy, girl, man or woman", "In one culture, wearing skirts is considered masculine; in another, it is considered feminine. This difference best illustrates which of the following?"],
    ["a gender role", "the set of behaviors that a culture expects of men or of women", "In Sam's community, women are expected to care for children and men are expected to earn money. These expectations are examples of which of the following?"],
    ["gender identity", "a person's own sense of being male, female, neither or some combination", "Alex's inner sense of being a boy has been clear to him since early childhood. Which term describes this inner sense?"],
    ["sexual orientation", "the direction of a person's enduring sexual attraction", "Kai is consistently attracted to people of the same sex. Which term describes this pattern of attraction?"],
  ]),
  g("piaget-stages", T4, [
    ["the sensorimotor stage", "Piaget's stage from birth to about age 2, in which infants know the world through senses and actions", "An eight-month-old learns about a rattle by shaking it, looking at it and putting it in her mouth. Which of Piaget's stages is she in?"],
    ["the preoperational stage", "Piaget's stage from about age 2 to 7, in which children use words and images but cannot yet reason logically", "A four-year-old enjoys pretend play and talks well, but thinks a tall glass holds more juice than a wide glass with the same amount. Which of Piaget's stages is he in?"],
    ["the concrete operational stage", "Piaget's stage from about age 7 to 11, in which children think logically about real objects and events", "A nine-year-old understands that pouring water into a taller glass does not change the amount, but she struggles with abstract algebra. Which of Piaget's stages is she in?"],
    ["the formal operational stage", "Piaget's stage from about age 12 on, in which people can reason about abstract and hypothetical ideas", "A fifteen-year-old debates what would happen to society if people could live forever. Which of Piaget's stages allows this hypothetical thinking?"],
  ]),
  g("piaget-concepts", T4, [
    ["object permanence", "the understanding that things continue to exist when they are out of sight", "When a toy is hidden under a blanket, a five-month-old acts as if it has vanished, but a ten-month-old lifts the blanket to find it. What has the older infant developed?"],
    ["conservation", "the understanding that quantity stays the same when shape or arrangement changes", "A child insists that a ball of clay has more clay after it is rolled into a long snake. Which concept does the child lack?"],
    ["reversibility", "the understanding that an action can be undone to return things to their original state", "A child realizes that water poured from a short glass into a tall one could be poured back to give the same level as before. Which concept does this show?"],
    ["animism", "the belief of young children that lifeless objects have feelings and intentions", "A three-year-old says that the moon is following her and that her teddy bear is sad. This best illustrates which of the following?"],
    ["egocentrism", "the difficulty that young children have in taking another person's point of view", "On the phone with her grandfather, a three-year-old nods silently in answer to his questions, assuming he can see her. This best illustrates which of the following?"],
    ["theory of mind", "the understanding that other people have their own thoughts, beliefs and feelings", "A five-year-old realizes that his sister will look for her doll where she left it, even though he knows it has been moved. What has he developed?"],
  ]),
  g("vygotsky-aging", T4, [
    ["scaffolding", "the temporary support that a more skilled person gives a learner and gradually removes", "A father first guides his daughter's hands as she ties her shoes, then only gives hints, then lets her do it alone. This best illustrates which of the following?"],
    ["the zone of proximal development", "the gap between what a learner can do alone and what the learner can do with help", "A child cannot solve a puzzle alone but can solve it with a few hints from a teacher. In Vygotsky's theory, this puzzle falls within which of the following?"],
    ["crystallized intelligence", "the accumulated knowledge and verbal skills that tend to increase with age", "At seventy, Mr. Park does better at crossword puzzles and vocabulary tests than he did at thirty. Which kind of intelligence does this show?"],
    ["fluid intelligence", "the ability to reason quickly and abstractly, which tends to decline in older adulthood", "At seventy, Mr. Park is slower than he used to be at solving unfamiliar logic puzzles. Which kind of intelligence has declined?"],
    ["dementia", "a serious decline in memory and thinking that interferes with daily life, most common in old age", "An elderly man increasingly forgets recent events, gets lost in familiar places and can no longer manage his money. Which term describes his condition?"],
  ]),
  g("language-parts", T5, [
    ["a phoneme", "the smallest distinctive unit of sound in a language", "The word 'chat' has three basic sounds: ch, a and t. Each of these sounds is which of the following?"],
    ["a morpheme", "the smallest unit of language that carries meaning", "The word 'unkindly' has three meaningful parts: un, kind and ly. Each of these parts is which of the following?"],
    ["semantics", "the rules by which we get meaning from words and sentences", "Knowing that adding '-ed' to 'laugh' means the action happened in the past is part of which of the following?"],
    ["syntax", "the rules for ordering words into sentences", "English speakers say 'white house' while Spanish speakers say 'casa blanca', with the adjective second. This difference is one of which of the following?"],
    ["grammar", "the whole system of rules in a language that lets people communicate", "Which term refers to a language's complete system of rules, including both semantics and syntax?"],
  ]),
  g("language-stages", T5, [
    ["cooing", "the vowel-like sounds, such as 'ooh', that infants make from about two months", "At two months, a baby makes soft 'ooh' and 'aah' sounds. Which stage of language development is this?"],
    ["babbling", "the stage from about four months in which infants produce many consonant-vowel sounds, such as 'ba-ba'", "At six months, a baby says 'da-da-da' and 'ma-ma-ma' without meaning anything by it. Which stage of language development is this?"],
    ["the one-word stage", "the stage from about age 1 in which a child speaks mostly in single words", "A one-year-old says 'milk' to mean 'I want some milk'. Which stage of language development is this?"],
    ["telegraphic speech", "the two-word stage in which a child uses mostly nouns and verbs, such as 'want juice'", "A two-year-old says 'Daddy go' and 'more cookie'. Which stage of language development is this?"],
    ["overgeneralization", "the applying of a grammar rule too widely, as in 'goed' or 'mouses'", "A three-year-old says 'I runned fast' and 'two foots'. This best illustrates which of the following?"],
  ]),
  g("ecological", T6, [
    ["the microsystem", "in ecological systems theory, the groups that have direct contact with the child, such as family and school", "In ecological systems theory, a child's parents, teachers and friends belong to which system?"],
    ["the mesosystem", "in ecological systems theory, the relationships between the groups in a child's immediate surroundings", "A child's parents and teachers meet regularly and work together. In ecological systems theory, this connection is part of which system?"],
    ["the exosystem", "in ecological systems theory, the settings that affect a child indirectly, such as a parent's workplace", "A mother's employer changes her to night shifts, so she sees her son less. In ecological systems theory, her workplace is part of which system?"],
    ["the macrosystem", "in ecological systems theory, the cultural values, laws and customs that surround a child", "A child grows up in a society that places a high value on respect for elders. In ecological systems theory, this cultural value is part of which system?"],
    ["the chronosystem", "in ecological systems theory, the life stage and historical events that affect a child", "A child's schooling is disrupted by a pandemic at age eight. In ecological systems theory, the timing of this event is part of which system?"],
  ]),
  g("parenting", T6, [
    ["authoritarian parenting", "the parenting style that sets strict rules and expects obedience, with little warmth or discussion", "'Because I said so' is the only explanation that Tara's parents ever give for their many strict rules. Which parenting style is this?"],
    ["authoritative parenting", "the parenting style that sets firm rules but explains them, listens and is warm", "Dev's parents set a curfew, explain the reason for it and are willing to discuss exceptions. Which parenting style is this?"],
    ["permissive parenting", "the parenting style that makes few demands and sets few limits", "Mia's parents are loving but let her stay up as late as she likes and rarely enforce any rules. Which parenting style is this?"],
    ["temperament", "a person's characteristic emotional reactivity and intensity, which appears early in life", "From her first weeks, baby Ivy has been calm and easygoing, while her brother was fussy and intense. This difference is one of which of the following?"],
  ]),
  g("attachment", T6, [
    ["secure attachment", "the attachment style in which a child uses the caregiver as a safe base, is upset when the caregiver leaves and is comforted on return", "In the strange situation, a toddler explores happily while his mother is present, cries when she leaves and calms quickly when she returns. Which attachment style is this?"],
    ["avoidant attachment", "the insecure attachment style in which a child seems indifferent when the caregiver leaves and ignores the caregiver on return", "In the strange situation, a toddler shows little reaction when her mother leaves and turns away when she returns. Which attachment style is this?"],
    ["anxious attachment", "the insecure attachment style in which a child is very upset by separation and is not easily comforted on reunion", "In the strange situation, a toddler clings to his mother, is extremely upset when she leaves and both seeks and resists her when she returns. Which attachment style is this?"],
    ["disorganized attachment", "the insecure attachment style in which a child shows confused, contradictory behavior toward the caregiver", "In the strange situation, a toddler approaches her mother, then freezes, then backs away with a dazed expression. Which attachment style is this?"],
    ["separation anxiety", "the distress that infants show when a familiar caregiver leaves, which peaks around 13 months", "At daycare, a one-year-old cries hard every time his father walks out of the door. This best illustrates which of the following?"],
    ["contact comfort", "the comfort from physical touch that Harlow showed is more important to attachment than feeding", "Harlow's infant monkeys spent most of their time clinging to a soft cloth 'mother' rather than a wire one that gave milk. This finding shows the importance of which of the following?"],
  ]),
  g("social-growth", T6, [
    ["parallel play", "the play of young children who play side by side without interacting", "Two two-year-olds sit next to each other, each building with their own blocks and not speaking. Which kind of play is this?"],
    ["pretend play", "the play in which children act out imaginary roles and situations", "A four-year-old uses a banana as a telephone and 'calls' her grandmother. Which kind of play is this?"],
    ["the imaginary audience", "the belief of adolescents that everyone is watching and judging them", "Fourteen-year-old Jo refuses to go to school because she is sure everyone will stare at the small spot on her chin. This best illustrates which of the following?"],
    ["the personal fable", "the belief of adolescents that they are unique and that bad things will not happen to them", "Sixteen-year-old Max drives too fast because he believes accidents happen only to other people. This best illustrates which of the following?"],
    ["the social clock", "a culture's preferred timing for life events such as marriage, parenthood and retirement", "Lena feels pressure because she is thirty-five and unmarried in a community where most people marry by twenty-five. This pressure comes from which of the following?"],
    ["emerging adulthood", "the period from about 18 to the mid-twenties, between adolescence and full independence", "At twenty-two, Tariq has finished school but still lives with his parents and is exploring career options. Which period of life is he in?"],
    ["adverse childhood experiences", "the stressful or traumatic events in childhood, such as abuse or neglect, that raise the risk of later problems", "Researchers find that adults who suffered abuse and neglect as children have higher rates of illness and depression. These early events are called which of the following?"],
  ]),
  g("erikson-early", T6, [
    ["trust versus mistrust", "Erikson's stage in infancy, in which babies learn whether their needs will be met", "A baby whose cries are answered with food and comfort learns that the world is dependable. Which of Erikson's stages is this?"],
    ["autonomy versus shame and doubt", "Erikson's stage in toddlerhood, in which children learn to do things for themselves", "A two-year-old insists, 'Me do it!' when getting dressed. Which of Erikson's stages is this?"],
    ["initiative versus guilt", "Erikson's stage in the preschool years, in which children learn to start tasks and carry out plans", "A four-year-old invents a game and organizes her friends to play it. Which of Erikson's stages is this?"],
    ["industry versus inferiority", "Erikson's stage in elementary school, in which children learn to feel competent or else feel inadequate", "A nine-year-old takes pride in finishing his school projects well and compares his work with classmates' work. Which of Erikson's stages is this?"],
  ]),
  g("erikson-late", T6, [
    ["identity versus role confusion", "Erikson's stage in adolescence, in which teenagers work out who they are", "A sixteen-year-old tries out different friend groups, styles and beliefs to decide what kind of person she wants to be. Which of Erikson's stages is this?"],
    ["intimacy versus isolation", "Erikson's stage in young adulthood, in which people seek close, lasting relationships", "A twenty-five-year-old focuses on forming a committed, loving relationship. Which of Erikson's stages is this?"],
    ["generativity versus stagnation", "Erikson's stage in middle adulthood, in which people seek to contribute to the world through family and work", "A fifty-year-old mentors younger colleagues and volunteers as a youth coach, wanting to give something to the next generation. Which of Erikson's stages is this?"],
    ["integrity versus despair", "Erikson's stage in late adulthood, in which people look back on life with satisfaction or regret", "An eighty-year-old reflects on her life and feels that it was meaningful and well lived. Which of Erikson's stages is this?"],
  ]),
  g("identity-status", T6, [
    ["identity achievement", "the identity status of a person who has explored options and made a commitment", "After considering several careers and trying two internships, Nadia commits to becoming a nurse. Which identity status is this?"],
    ["identity diffusion", "the identity status of a person who has neither explored options nor made a commitment", "Asked about his future, Cole shrugs; he has not thought about it and does not care to. Which identity status is this?"],
    ["identity foreclosure", "the identity status of a person who has made a commitment without exploring options", "Without considering any alternatives, Ravi plans to join the family business because his parents always expected it. Which identity status is this?"],
    ["identity moratorium", "the identity status of a person who is actively exploring options but has not yet made a commitment", "Zoe is taking classes in art, biology and law to work out what she wants, and she has not decided yet. Which identity status is this?"],
  ]),
  g("cc-elements", T7, [
    ["the unconditioned stimulus", "in classical conditioning, the stimulus that triggers a response naturally, without learning", "A dentist's drill causes pain, and soon the sound of the drill alone makes Ben tense. In this example, the pain is which of the following?", "In Pavlov's experiments, dogs salivated to food, and later to a tone that had been paired with food. The food was which of the following?"],
    ["the unconditioned response", "in classical conditioning, the natural, unlearned response to a stimulus", "In Pavlov's experiments, dogs salivated to food, and later to a tone that had been paired with food. Salivating to the food was which of the following?"],
    ["the conditioned stimulus", "in classical conditioning, the originally neutral stimulus that triggers a response after being paired with another stimulus", "A dentist's drill causes pain, and soon the sound of the drill alone makes Ben tense. In this example, the sound of the drill is which of the following?", "In Pavlov's experiments, dogs salivated to food, and later to a tone that had been paired with food. After conditioning, the tone was which of the following?"],
    ["the conditioned response", "in classical conditioning, the learned response to a previously neutral stimulus", "A dentist's drill causes pain, and soon the sound of the drill alone makes Ben tense. Becoming tense at the sound is which of the following?", "In Pavlov's experiments, dogs salivated to food, and later to a tone that had been paired with food. Salivating to the tone alone was which of the following?"],
  ]),
  g("cc-processes", T7, [
    ["acquisition", "in classical conditioning, the first stage, in which the neutral stimulus is paired with the unconditioned stimulus and the response is learned", "Over ten trials in which a light is followed by a puff of air, a rabbit begins to blink at the light. This learning stage is called which of the following?"],
    ["extinction", "the weakening of a conditioned response when the conditioned stimulus is repeatedly presented alone", "After the tone is sounded many times with no food, a dog stops salivating to the tone. This best illustrates which of the following?"],
    ["spontaneous recovery", "the reappearance of a weakened conditioned response after a rest period", "A dog's salivation to a tone has died away. The next day, the tone is sounded and the dog salivates again. This best illustrates which of the following?"],
    ["stimulus generalization", "the tendency to respond to stimuli that are similar to the conditioned stimulus", "After being bitten by a large brown dog, Eva is afraid of all dogs. This best illustrates which of the following?"],
    ["stimulus discrimination", "the learned ability to respond to the conditioned stimulus but not to similar stimuli", "A dog salivates to a high tone that signals food but not to a low tone that never does. This best illustrates which of the following?"],
    ["higher-order conditioning", "the pairing of a new neutral stimulus with an existing conditioned stimulus to create a second conditioned stimulus", "A dog already salivates to a tone. A light is then repeatedly shown just before the tone, and the dog begins to salivate to the light. This best illustrates which of the following?"],
  ]),
  g("cc-applications", T7, [
    ["counterconditioning", "the replacing of an unwanted response to a stimulus with a new response, by pairing the stimulus with something pleasant", "To treat a child's fear of rabbits, a therapist gives the child a favorite snack while a rabbit is slowly brought closer. Which technique is this?"],
    ["a taste aversion", "a learned dislike of a food that was followed by illness", "After getting food poisoning from fish, Carl feels sick at the smell of fish for years. This best illustrates which of the following?"],
    ["biological preparedness", "the inborn readiness to learn some associations, such as taste and nausea, more easily than others", "Rats quickly learn to avoid a flavor that was followed by nausea but do not learn to avoid a light that was followed by nausea. This best illustrates which of the following?"],
    ["one-trial conditioning", "learning that happens after a single pairing of two stimuli", "Carl avoided fish after becoming ill only once. Learning that takes place after a single pairing is called which of the following?"],
    ["habituation", "the decrease in response to a stimulus that is presented over and over", "People who move next to a railway are woken by trains at first but soon sleep through the noise. This best illustrates which of the following?"],
  ]),
  g("consequences", T8, [
    ["positive reinforcement", "the strengthening of a behavior by adding a pleasant stimulus after it", "Each time Ali finishes his homework, his mother gives him praise, and he does his homework more often. This best illustrates which of the following?", "A dog is given a treat every time it sits on command, and it sits more often. This best illustrates which of the following?"],
    ["negative reinforcement", "the strengthening of a behavior by removing an unpleasant stimulus after it", "A car's loud beeping stops as soon as the driver fastens the seat belt, so the driver fastens it more quickly in future. This best illustrates which of the following?", "Taking a tablet makes Lena's headache go away, so she is more likely to take a tablet next time. This best illustrates which of the following?"],
    ["positive punishment", "the weakening of a behavior by adding an unpleasant stimulus after it", "After Mia talks back, her mother gives her extra chores, and she talks back less often. Being given the chores is an example of which of the following?", "A child touches a hot stove, feels pain and does not touch it again. This best illustrates which of the following?"],
    ["negative punishment", "the weakening of a behavior by removing a pleasant stimulus after it", "After Rita comes home late, her parents take away her phone for a week, and she comes home late less often. This best illustrates which of the following?", "When two brothers fight over a game, their father removes the game, and the fighting decreases. This best illustrates which of the following?"],
  ]),
  g("operant-ideas", T8, [
    ["the law of effect", "Thorndike's principle that behaviors followed by good outcomes become more likely and those followed by bad outcomes become less likely", "A cat in a puzzle box escapes faster on each trial because pressing the lever is followed by freedom and food. Which principle did Thorndike draw from this?"],
    ["a primary reinforcer", "a reinforcer, such as food or water, that satisfies a biological need and is rewarding without learning", "A hungry rat presses a lever to get food. The food is which kind of reinforcer?"],
    ["a secondary reinforcer", "a reinforcer, such as money or praise, that gets its power through association with other rewards", "Workers do extra shifts to earn money, which they can exchange for things they want. Money is which kind of reinforcer?"],
    ["shaping", "the reinforcing of closer and closer approximations of a desired behavior", "To teach a dolphin to jump through a hoop, a trainer first rewards swimming near the hoop, then touching it, then passing through it. Which technique is this?"],
    ["instinctive drift", "the tendency of a trained animal to return to its natural, inborn behaviors", "Raccoons trained to drop coins into a box began rubbing the coins together as if washing food, despite getting no reward for it. This best illustrates which of the following?"],
    ["superstitious behavior", "a behavior that is repeated because it happened by chance just before a reward", "A baseball player wore odd socks on the day he hit three home runs, and he has worn odd socks at every game since. This best illustrates which of the following?"],
    ["learned helplessness", "the passive giving up that follows repeated experiences of being unable to avoid bad events", "After failing every math test no matter how hard he studied, Finn stops studying altogether, saying nothing he does matters. This best illustrates which of the following?"],
  ]),
  g("schedules", T8, [
    ["continuous reinforcement", "the schedule in which the behavior is reinforced every time it occurs", "A vending machine delivers a snack every time money is inserted. Which schedule of reinforcement is this?"],
    ["a fixed-ratio schedule", "the schedule in which the behavior is reinforced after a set number of responses", "A coffee shop gives a free drink after every ten purchases. Which schedule of reinforcement is this?", "A factory worker is paid for every twenty shirts she sews. Which schedule of reinforcement is this?"],
    ["a variable-ratio schedule", "the schedule in which the behavior is reinforced after an unpredictable number of responses", "A slot machine pays out after an unpredictable number of plays. Which schedule of reinforcement is this?", "A salesperson makes a sale after an unpredictable number of phone calls. Which schedule of reinforcement is this?"],
    ["a fixed-interval schedule", "the schedule in which the first response after a set amount of time is reinforced", "An employee receives a paycheck every two weeks. Which schedule of reinforcement is this?", "A cake needs exactly thirty minutes in the oven, and the baker checks it more and more often as the half hour ends. Which schedule of reinforcement is this?"],
    ["a variable-interval schedule", "the schedule in which the first response after an unpredictable amount of time is reinforced", "A teacher gives surprise quizzes at unpredictable times, so students study steadily. Which schedule of reinforcement is this?", "Someone checks their phone repeatedly for a message that could arrive at any time. Which schedule of reinforcement is this?"],
  ]),
  g("cognitive-learning", T9, [
    ["observational learning", "learning by watching others and imitating them", "After watching her older brother tie his shoes, four-year-old Lily ties her own in the same way. This best illustrates which of the following?", "In Bandura's study, children who had watched an adult hit an inflatable doll later hit the doll themselves. This best illustrates which of the following?"],
    ["vicarious conditioning", "learning from seeing the consequences of another person's behavior", "After seeing a classmate praised for raising her hand, Tom starts raising his hand too. This best illustrates which of the following?"],
    ["modeling", "the process of demonstrating a behavior that others then observe and imitate", "A coach performs a correct free throw slowly so that her players can watch and copy it. The coach is doing which of the following?"],
    ["insight learning", "the sudden realization of the solution to a problem", "After failing to reach bananas hung from the ceiling, a chimpanzee sits for a while, then suddenly stacks boxes and climbs up to get them. This best illustrates which of the following?"],
    ["latent learning", "learning that takes place without reinforcement and is not shown until there is a reason to show it", "Rats that wandered a maze with no reward for ten days ran it almost perfectly as soon as food was placed at the end. This best illustrates which of the following?"],
    ["a cognitive map", "a mental picture of the layout of one's surroundings", "When her usual road is closed, Kim takes a new route home without difficulty because she has a mental picture of the town. This mental picture is which of the following?"],
  ]),
];
