/* AP Psychology Unit 4: Social Psychology and Personality. */
import { g, type Group } from "./psych-lib";

const T1 = "attribution-theory-and-person-perception";
const T2 = "attitude-formation-and-attitude-change";
const T3 = "psychology-of-social-situations";
const T4 = "psychodynamic-and-humanistic-theories-of-personality";
const T5 = "social-cognitive-and-trait-theories-of-personality";
const T6 = "motivation";
const T7 = "emotion";

export const psychU4: Group[] = [
  g("attribution", T1, [
    ["relative deprivation", "the feeling of being worse off than the people one compares oneself with", "Tom was happy with his salary until he learned that his colleagues earn more; now he feels badly treated. This best illustrates which of the following?"],
    ["the fundamental attribution error", "the tendency, when judging other people's behavior, to overestimate personal traits and underestimate the situation", "A driver cuts in front of Ruth, and she immediately concludes he is a rude person, never considering that he may be rushing to a hospital. This best illustrates which of the following?"],
    ["the actor-observer bias", "the tendency to explain our own behavior by the situation but other people's behavior by their traits", "When Ken trips, he blames the uneven pavement; when a stranger trips, Ken thinks the stranger is clumsy. This best illustrates which of the following?"],
    ["the self-serving bias", "the tendency to credit our successes to ourselves and blame our failures on outside factors", "After a high test score, Sue says she is clever; after a low score, she says the test was unfair. This best illustrates which of the following?"],
    ["an optimistic explanatory style", "the habit of explaining bad events as temporary, specific and caused by outside factors", "After losing a match, Eli thinks, 'It was one bad day and the wind was against me; I will do better next week.' Which explanatory style is this?"],
    ["a pessimistic explanatory style", "the habit of explaining bad events as lasting, affecting everything and caused by oneself", "After losing a match, Eli thinks, 'I always fail at everything, and it is all my fault.' Which explanatory style is this?"],
  ]),
  g("person-perception", T1, [
    ["a situational attribution", "an explanation of behavior that points to outside circumstances", "When a classmate arrives late, Ian decides, 'The bus must have broken down.' Which kind of explanation is this?"],
    ["a dispositional attribution", "an explanation of behavior that points to the person's own traits or character", "When a classmate arrives late, Ian decides, 'She is a lazy and disorganized person.' Which kind of explanation is this?"],
    ["an internal locus of control", "the belief that a person controls their own outcomes through their own actions", "Maya believes her grades depend entirely on how hard she works. Which belief does she hold?"],
    ["an external locus of control", "the belief that outcomes are decided by luck, fate or other people", "Dan believes that his grades depend on luck and on whether the teacher likes him. Which belief does he hold?"],
    ["the mere exposure effect", "the tendency to like something more simply because we have encountered it repeatedly", "Sara disliked a song at first, but after hearing it on the radio twenty times she finds she enjoys it. This best illustrates which of the following?"],
    ["a self-fulfilling prophecy", "an expectation that leads a person to act in ways that make the expectation come true", "A teacher is told that certain randomly chosen students are gifted; she gives them more attention, and their scores rise. This best illustrates which of the following?"],
    ["upward social comparison", "the comparing of oneself with people who are doing better", "Jon feels dissatisfied with his running times after comparing himself with the fastest runner on the team. Which process is this?"],
    ["downward social comparison", "the comparing of oneself with people who are doing worse", "After a poor exam result, Bea feels better when she thinks about classmates who scored lower. Which process is this?"],
  ]),
  g("prejudice", T2, [
    ["a stereotype", "a generalized belief about a group of people", "Lee assumes that all teenagers are careless drivers. This belief is an example of which of the following?"],
    ["prejudice", "an unjustified negative attitude toward a group and its members", "Without knowing any of them, Mr. Hill feels dislike and distrust toward people from a neighboring town. This feeling is an example of which of the following?"],
    ["discrimination", "unjustified negative behavior toward a group and its members", "A manager refuses to interview applicants who are over fifty, whatever their skills. This action is an example of which of the following?"],
    ["an implicit attitude", "an attitude that a person holds without being aware of it", "Although Pat sincerely says she treats everyone equally, a reaction-time test shows she links one group with negative words more quickly. The test has revealed which of the following?"],
    ["the just-world phenomenon", "the tendency to believe that people get what they deserve", "Hearing that a man lost his job, Viv assumes he must have been a bad worker. This best illustrates which of the following?"],
    ["ethnocentrism", "the tendency to judge other cultures by the standards of one's own culture", "A tourist calls another country's eating customs 'wrong' because they differ from the customs at home. This best illustrates which of the following?"],
  ]),
  g("groups-bias", T2, [
    ["in-group bias", "the tendency to favor the members of one's own group", "Fans rate players on their own team as more skilled and more honest than equally good players on other teams. This best illustrates which of the following?"],
    ["out-group homogeneity bias", "the tendency to see the members of other groups as all alike", "Students at one school say, 'People at that other school are all the same,' while describing their own classmates as varied individuals. This best illustrates which of the following?"],
    ["belief perseverance", "the tendency to hold on to a belief even after the evidence for it has been discredited", "After the study behind his favorite diet is shown to be fraudulent, Raj still insists that the diet works. This best illustrates which of the following?"],
    ["confirmation bias", "the tendency to search for and favor information that supports what one already believes", "Convinced that a certain food is harmful, Ana reads only the websites that agree with her and ignores the rest. This best illustrates which of the following?"],
    ["cognitive dissonance", "the discomfort a person feels when their actions and attitudes conflict, which motivates a change in one of them", "After being paid only one dollar to tell others that a boring task was fun, students came to believe the task really was enjoyable. Which concept best explains this change of attitude?", "Leo believes smoking is dangerous but smokes anyway; to reduce his discomfort, he decides the risks are exaggerated. This best illustrates which of the following?"],
  ]),
  g("persuasion", T3, [
    ["a social norm", "a rule for accepted and expected behavior in a group", "In elevators, people face the door and avoid staring at strangers, although no law requires it. This unwritten rule is an example of which of the following?"],
    ["informational social influence", "the influence that comes from a person's willingness to accept others' views as evidence about reality", "Unsure which fork to use at a formal dinner, Sam watches the other guests and copies them, assuming they know. Which kind of influence is this?"],
    ["normative social influence", "the influence that comes from a person's desire to gain approval or avoid rejection", "Although she dislikes the film, Ida says she loved it because all her friends did and she wants to fit in. Which kind of influence is this?"],
    ["the central route to persuasion", "persuasion that works through evidence and logical arguments, which people think about carefully", "An advertisement for a car lists its safety ratings, fuel economy and repair costs. Which route to persuasion is it using?"],
    ["the peripheral route to persuasion", "persuasion that works through surface cues, such as an attractive or famous speaker", "An advertisement for a car shows a famous athlete smiling beside it and gives no facts. Which route to persuasion is it using?"],
    ["the halo effect", "the tendency for one good quality of a person to make us assume they have other good qualities", "Because a job applicant is attractive, the interviewers assume he is also intelligent and honest. This best illustrates which of the following?"],
    ["the foot-in-the-door technique", "the strategy of getting agreement to a small request first so that a larger request is more likely to be accepted", "A charity first asks people to sign a petition and a week later asks the same people for a donation. Which technique is this?"],
    ["the door-in-the-face technique", "the strategy of making a large request that will be refused so that a smaller request is more likely to be accepted", "A teenager asks to borrow 100 dollars, is refused, and then asks for 20 dollars, which she receives. Which technique is this?"],
  ]),
  g("group-behavior", T3, [
    ["social facilitation", "the improved performance on simple or well-learned tasks in the presence of others", "An expert pool player makes more of her shots when a crowd is watching than when she plays alone. This best illustrates which of the following?"],
    ["social loafing", "the tendency for people to put in less effort when working in a group than when working alone", "In a group project with one shared grade, each of the five members does less work than they would on an individual project. This best illustrates which of the following?"],
    ["deindividuation", "the loss of self-awareness and self-restraint in group situations that provide arousal and anonymity", "Wearing masks in a large, excited crowd, normally law-abiding fans begin smashing windows. This best illustrates which of the following?"],
    ["group polarization", "the strengthening of a group's existing opinions after the members discuss them", "A group of people who mildly support a policy discuss it together and end up strongly supporting it. This best illustrates which of the following?"],
    ["groupthink", "the kind of thinking in which the desire for agreement in a group overrides a realistic evaluation of alternatives", "Not wanting to upset the team's harmony, the members of a committee keep their doubts to themselves and approve a risky plan. This best illustrates which of the following?"],
    ["diffusion of responsibility", "the reduced sense of personal duty to act when other people are present", "Each of twenty witnesses to an accident assumes that someone else has already called for help, so nobody calls. Which concept explains their thinking?"],
  ]),
  g("culture-cooperation", T3, [
    ["obedience", "the following of the direct commands of an authority figure", "In Milgram's study, most participants continued to deliver what they thought were painful shocks because the experimenter told them to. This best illustrates which of the following?"],
    ["conformity", "the adjusting of behavior or thinking to match a group standard", "In a group where everyone else gives an obviously wrong answer about the length of a line, a participant gives the same wrong answer. This best illustrates which of the following?"],
    ["individualism", "the cultural pattern that gives priority to personal goals and defines identity by personal traits", "In Jake's culture, people are praised for standing out, being independent and pursuing their own goals. Which cultural pattern is this?"],
    ["collectivism", "the cultural pattern that gives priority to the goals of the group and defines identity by group membership", "In Mei's culture, people are expected to put family duty and group harmony ahead of personal wishes. Which cultural pattern is this?"],
    ["multiculturalism", "the view that the different cultural groups in a society should be valued and should keep their identities", "A school celebrates the languages, foods and holidays of all the cultures among its students. Which view does this reflect?"],
    ["a superordinate goal", "a shared goal that can be reached only if groups cooperate, which reduces conflict between them", "Two hostile groups of campers became friendly after they had to work together to repair the camp's water supply. The repair was an example of which of the following?"],
    ["a social trap", "a situation in which people who each pursue their own interest end up harming everyone", "Each fishing boat catches as many fish as it can, and soon the fish stocks collapse for all the boats. This best illustrates which of the following?"],
    ["the false consensus effect", "the tendency to overestimate how many other people share our opinions and behaviors", "Olga, who loves a certain band, is surprised to learn that most of her classmates have never heard of it. This best illustrates which of the following?"],
  ]),
  g("helping-work", T3, [
    ["the bystander effect", "the tendency for a person to be less likely to help when other people are present", "Researchers find that a person who collapses is helped more quickly when one person is nearby than when a crowd is nearby. What is this finding called?"],
    ["altruism", "unselfish concern for the welfare of others", "A stranger risks her life to pull a child out of a river and expects nothing in return. This best illustrates which of the following?"],
    ["the social reciprocity norm", "the expectation that people will help those who have helped them", "Because his neighbor looked after his cat last month, Abe feels he should help the neighbor move house. Which norm is guiding him?"],
    ["the social responsibility norm", "the expectation that people will help those who need help, even at a cost to themselves", "Lin gives up her seat on the bus to an elderly stranger who can never repay her. Which norm is guiding her?"],
    ["an industrial-organizational psychologist", "a psychologist who studies behavior in the workplace to improve productivity and well-being", "A company hires a psychologist to improve the way it selects employees and to raise job satisfaction. Which kind of psychologist is this?"],
    ["burnout", "the physical and emotional exhaustion that results from long-term stress at work", "After two years of long hours and constant pressure, a nurse feels drained, detached and ineffective. This best illustrates which of the following?"],
  ]),
  g("defenses-a", T4, [
    ["denial", "the defense mechanism of refusing to accept a painful reality", "Despite clear test results, a patient insists that he is not ill and that the laboratory made a mistake. Which defense mechanism is this?"],
    ["displacement", "the defense mechanism of shifting an impulse from its real target to a safer one", "After being shouted at by her boss, Gia goes home and shouts at her younger brother. Which defense mechanism is this?"],
    ["projection", "the defense mechanism of seeing one's own unacceptable impulses in other people", "Karl, who dislikes his colleague, is convinced that the colleague hates him. Which defense mechanism is this?"],
    ["rationalization", "the defense mechanism of giving a comfortable excuse in place of the real reason for a behavior", "After being rejected by a university, Hal says, 'I never really wanted to go there anyway; it is too far away.' Which defense mechanism is this?"],
  ]),
  g("defenses-b", T4, [
    ["reaction formation", "the defense mechanism of acting in the opposite way to one's unacceptable impulses", "Ed feels strong resentment toward his sister but treats her with exaggerated kindness and praise. Which defense mechanism is this?"],
    ["regression", "the defense mechanism of retreating to behavior from an earlier stage of development", "After the birth of a new baby, a six-year-old starts sucking his thumb and talking like a toddler. Which defense mechanism is this?"],
    ["repression", "the defense mechanism of pushing anxiety-arousing thoughts and memories out of awareness", "A man has no memory of a frightening accident he was in as a child. In psychodynamic theory, which defense mechanism explains this?"],
    ["sublimation", "the defense mechanism of turning unacceptable impulses into socially valued activities", "A man with strong aggressive urges becomes a successful boxer. Which defense mechanism is this?"],
  ]),
  g("psychodynamic-humanistic", T4, [
    ["the unconscious", "in psychodynamic theory, the store of thoughts, wishes and memories that a person is not aware of but that still influences behavior", "Freud argued that slips of the tongue reveal wishes that people do not know they have. Where did he believe these wishes are held?"],
    ["a projective test", "a personality test, such as an inkblot test, that asks people to interpret unclear images in order to reveal hidden feelings", "A psychologist shows a client a series of inkblots and asks what each might be. Which kind of test is this?"],
    ["unconditional positive regard", "the attitude of total acceptance toward another person, whatever they say or do", "Although her son failed the exam, a mother makes clear that she values and accepts him just the same. In humanistic theory, this is which of the following?"],
    ["the self-actualizing tendency", "in humanistic theory, the inborn drive of people to grow and fulfill their potential", "Humanistic psychologists argue that people are naturally motivated to become the best version of themselves. What is this motivation called?"],
    ["a defense mechanism", "in psychodynamic theory, a method the ego uses without awareness to reduce anxiety by distorting reality", "In psychodynamic theory, denial, projection and rationalization are all examples of which of the following?"],
  ]),
  g("social-cognitive", T5, [
    ["reciprocal determinism", "the idea that a person's behavior, thoughts and environment all influence one another", "A shy teenager avoids parties, so she gets little social practice, which makes her even more shy. This interaction between thoughts, behavior and environment is called which of the following?"],
    ["self-efficacy", "the belief in one's own ability to succeed at a particular task", "Before her driving test, Hana feels confident that she can pass because she has practiced well. This belief is which of the following?"],
    ["self-esteem", "a person's overall feeling of self-worth", "Omar generally feels that he is a valuable and likeable person. Which term describes this overall feeling?"],
    ["self-concept", "all the thoughts and feelings a person has in answer to the question 'Who am I?'", "Asked to describe herself, Kim lists that she is a daughter, an athlete, friendly and good at math. Together, these ideas form which of the following?"],
    ["a personality inventory", "a questionnaire with many true-false or agree-disagree items that measures a range of traits", "A psychologist asks a client to respond 'true' or 'false' to 500 statements about feelings and behaviors. Which kind of test is this?"],
    ["factor analysis", "the statistical method that finds clusters of related test items, used to identify basic traits", "Researchers find that answers to questions about being talkative, sociable and outgoing all rise and fall together, which suggests a single trait. Which statistical method reveals such clusters?"],
  ]),
  g("big-five", T5, [
    ["openness to experience", "the Big Five trait of being imaginative, curious and willing to try new things", "Yara loves trying unfamiliar foods, visiting art galleries and exploring new ideas. She would score high on which Big Five trait?"],
    ["conscientiousness", "the Big Five trait of being organized, careful and self-disciplined", "Ben always plans ahead, meets every deadline and keeps his desk tidy. He would score high on which Big Five trait?"],
    ["extraversion", "the Big Five trait of being sociable, outgoing and energetic", "Tia loves parties, talks easily to strangers and feels energized by being with people. She would score high on which Big Five trait?"],
    ["agreeableness", "the Big Five trait of being kind, trusting and cooperative", "Sam is warm, quick to forgive and always willing to help. He would score high on which Big Five trait?"],
    ["emotional stability", "the Big Five trait of being calm and secure rather than anxious and moody", "Under pressure, Ada stays calm, rarely worries and recovers quickly from setbacks. She would score high on which Big Five trait?"],
  ]),
  g("motivation-theories", T6, [
    ["drive-reduction theory", "the theory that a physical need creates a state of tension that motivates behavior to reduce it", "After hours without water, Tom feels an unpleasant tension that pushes him to find a drink. Which theory of motivation best explains this?"],
    ["homeostasis", "the body's tendency to keep its internal state, such as temperature, steady", "When Ana becomes too hot, she sweats, and when she is cold, she shivers, keeping her body temperature near 37 degrees Celsius. This best illustrates which of the following?"],
    ["arousal theory", "the theory that people are motivated to keep an ideal level of alertness and stimulation", "Bored on a quiet afternoon, Raj goes looking for something exciting to do, although all his physical needs are met. Which theory of motivation best explains this?"],
    ["the Yerkes-Dodson law", "the principle that performance is best at a moderate level of arousal", "Athletes perform poorly when they are either too relaxed or too anxious, and best when moderately excited. This best illustrates which of the following?"],
    ["incentive theory", "the theory that behavior is pulled by rewards from outside the person", "Although he is not hungry, Karl buys a cake because it looks and smells delicious. Which theory of motivation best explains this?"],
    ["instinct theory", "the theory that behavior is driven by fixed, inborn patterns that are not learned", "Without ever being taught, salmon swim back to the stream where they hatched in order to breed. Which theory of motivation best explains this?"],
    ["self-determination theory", "the theory that people are motivated by needs for competence, autonomy and relatedness, either from within or from outside", "A theory says that people thrive when they feel capable, feel in control of their choices and feel connected to others. Which theory is this?"],
  ]),
  g("motivation-types", T6, [
    ["intrinsic motivation", "the desire to do something for its own sake, because it is enjoyable or satisfying", "Leah paints every evening simply because she loves doing it. Which kind of motivation is this?"],
    ["extrinsic motivation", "the desire to do something to gain a reward or avoid a punishment", "Marc reads the assigned novel only because he wants a good grade. Which kind of motivation is this?"],
    ["an approach-approach conflict", "a conflict in which a person must choose between two attractive options", "Dana must choose between two universities, both of which she would love to attend. Which kind of conflict is this?"],
    ["an avoidance-avoidance conflict", "a conflict in which a person must choose between two unattractive options", "Gus must either clean the bathroom or wash the dishes, and he hates both. Which kind of conflict is this?"],
    ["an approach-avoidance conflict", "a conflict in which one option has both attractive and unattractive features", "Nina wants the chocolate cake because it tastes wonderful but does not want it because it is unhealthy. Which kind of conflict is this?"],
  ]),
  g("sensation-seeking", T6, [
    ["thrill and adventure seeking", "the form of sensation seeking that involves a desire for risky physical activities", "Aaron spends his weekends skydiving and rock climbing. Which form of sensation seeking is this?"],
    ["experience seeking", "the form of sensation seeking that involves a desire for new experiences through travel, art and unusual lifestyles", "Mila constantly seeks out unfamiliar music, foreign films and trips to places she has never been. Which form of sensation seeking is this?"],
    ["disinhibition", "the form of sensation seeking that involves a loss of self-restraint, as at wild parties", "Rex looks for excitement through wild parties and reckless, uninhibited behavior. Which form of sensation seeking is this?"],
    ["boredom susceptibility", "the form of sensation seeking that involves a strong dislike of repetition and routine", "Ines cannot stand doing the same task twice and becomes restless whenever life is predictable. Which form of sensation seeking is this?"],
  ]),
  g("emotion", T7, [
    ["the facial-feedback hypothesis", "the idea that the expression on a person's face can influence the emotion the person feels", "People asked to hold a pen between their teeth, which forces a smile, rate cartoons as funnier. This finding supports which of the following?"],
    ["the broaden-and-build theory", "the theory that positive emotions widen a person's awareness and help build lasting skills and resources", "A theory holds that joy and interest encourage people to explore, be creative and form new friendships, which strengthens them for the future. Which theory is this?"],
    ["a display rule", "a cultural rule about which emotions may be shown, when and to whom", "In one culture, people are expected to hide their disappointment in public; in another, they show it openly. This difference reflects which of the following?"],
    ["an elicitor", "an event or stimulus that triggers an emotion", "The sudden appearance of a snake on the path triggers fear in a hiker. The snake is acting as which of the following?"],
    ["universal emotions", "the basic emotions, such as happiness, sadness, fear and anger, whose facial expressions are recognized across cultures", "People from an isolated culture correctly identify the emotions on the faces of people from a very different culture. This finding supports the existence of which of the following?"],
    ["cognitive appraisal", "the interpretation of a situation, which shapes the emotion a person feels", "Two students have racing hearts before a speech; one labels the feeling as excitement and the other as fear. The difference in their emotions is due to which of the following?"],
  ]),
];
