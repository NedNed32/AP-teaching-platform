/* AP Psychology Unit 2: Cognition. */
import { g, type Group } from "./psych-lib";

const T1 = "perception";
const T2 = "thinking-problem-solving-judgments-and-decision-making";
const T3 = "introduction-to-memory";
const T4 = "encoding-memories";
const T5 = "storing-memories";
const T6 = "retrieving-memories";
const T7 = "forgetting-and-other-memory-challenges";
const T8 = "intelligence-and-achievement";

export const psychU2: Group[] = [
  g("processing", T1, [
    ["bottom-up processing", "perception that starts with the raw sensory input and builds up to a complete picture", "Looking at a completely unfamiliar abstract painting, Ravi studies its lines and colors one by one to work out what it shows. This best illustrates which of the following?"],
    ["top-down processing", "perception that is guided by experience, expectations and context", "Yuki reads a note with several letters smudged, yet she understands every word because she knows what the sentence should say. This best illustrates which of the following?"],
    ["a perceptual set", "a readiness to perceive something in a particular way because of expectations", "After being told that a blurry photo shows a monster, people looking at it report seeing a monster rather than a log. This best illustrates which of the following?"],
    ["selective attention", "the focusing of awareness on one stimulus while ignoring others", "In a noisy cafeteria, Carla follows only her friend's voice and ignores the conversations around her. This best illustrates which of the following?"],
    ["the cocktail party effect", "the ability to notice personally important information, such as your name, in an unattended conversation", "While chatting at a crowded party, Deshawn suddenly notices his own name spoken across the room. This best illustrates which of the following?"],
    ["inattentional blindness", "the failure to notice a visible object because attention is directed elsewhere", "While counting basketball passes in a video, half of the viewers fail to see a person in a gorilla suit walk through the game. This best illustrates which of the following?"],
    ["change blindness", "the failure to notice that something in the environment has changed", "A man giving directions does not notice that the stranger he is talking to was swapped for a different person when a door passed between them. This best illustrates which of the following?"],
  ]),
  g("gestalt", T1, [
    ["closure", "the Gestalt principle that we fill in gaps to see a complete, whole object", "A logo is made of three separate curved lines, but people see a complete circle. Which Gestalt principle explains this?"],
    ["figure and ground", "the Gestalt principle that we organize a scene into an object that stands out and its background", "In a famous drawing, people see either a white vase or two black faces, depending on which part they treat as the background. Which Gestalt principle explains this?"],
    ["proximity", "the Gestalt principle that we group together objects that are near each other", "Six dots are drawn as three close pairs, and people see three groups rather than six dots. Which Gestalt principle explains this?"],
    ["similarity", "the Gestalt principle that we group together objects that look alike", "In a crowd of fans, people see the red-shirted fans as one group and the blue-shirted fans as another. Which Gestalt principle explains this?"],
  ]),
  g("depth", T1, [
    ["retinal disparity", "the binocular depth cue based on the difference between the images in the two eyes", "A 3D film sends a slightly different image to each eye, and the brain uses the difference to perceive depth. Which depth cue is this?"],
    ["convergence", "the binocular depth cue based on how far the eyes turn inward to focus on a near object", "As Pia brings a pencil toward her nose, her eyes turn inward, and her brain uses the muscle strain to judge the distance. Which depth cue is this?"],
    ["relative size", "the monocular depth cue in which the object that casts the smaller image is seen as farther away", "In a photo, two identical cars appear, and the one that looks smaller is judged to be farther away. Which depth cue is this?"],
    ["interposition", "the monocular depth cue in which an object that partly blocks another is seen as closer", "A tree partly covers a house in a painting, so viewers see the tree as closer. Which depth cue is this?"],
    ["linear perspective", "the monocular depth cue in which parallel lines seem to meet in the distance", "Railway tracks in a drawing appear to come together at the horizon, which makes the scene look deep. Which depth cue is this?"],
    ["texture gradient", "the monocular depth cue in which surfaces look smoother and less detailed as they get farther away", "In a photo of a pebble beach, the nearby stones look distinct while the distant ones blur into a smooth surface. Which depth cue is this?"],
    ["relative clarity", "the monocular depth cue in which hazy objects are seen as farther away than sharp ones", "Distant mountains look hazy and bluish, so a hiker judges them to be far away. Which depth cue is this?"],
  ]),
  g("constancy", T1, [
    ["size constancy", "the perception that an object keeps the same size even when its image on the retina changes", "As a friend walks away, her image on Tom's retina shrinks, but he does not think she is getting smaller. This best illustrates which of the following?"],
    ["shape constancy", "the perception that an object keeps the same shape even when the viewing angle changes", "A door swinging open casts a changing image on the retina, yet it still looks rectangular. This best illustrates which of the following?"],
    ["color constancy", "the perception that an object keeps the same color under different lighting", "A red apple still looks red to Jin at noon, at sunset and under a kitchen lamp. This best illustrates which of the following?"],
    ["apparent movement", "the perception of motion when a series of still images or lights is shown in quick succession", "Lights on a sign flash one after another, and viewers see a single light moving along the sign. This best illustrates which of the following?"],
  ]),
  g("concepts", T2, [
    ["a concept", "a mental grouping of similar objects, events, ideas or people", "A child uses one mental category, 'chair', for stools, armchairs and benches. This mental category is an example of which of the following?"],
    ["a prototype", "the best or most typical example of a category", "Asked to think of a bird, most people picture a robin rather than a penguin. The robin is serving as which of the following?"],
    ["a schema", "a mental framework that organizes and interprets information", "Before visiting a restaurant, Ola already expects to be seated, read a menu, order and pay. This set of expectations is an example of which of the following?"],
    ["assimilation", "the interpretation of a new experience in terms of an existing schema", "A toddler who knows the word 'dog' sees a cow for the first time and calls it a dog. This best illustrates which of the following?"],
    ["accommodation", "the changing of an existing schema to fit new information", "After being corrected, a toddler stops calling every four-legged animal a dog and learns a separate category for cows. This best illustrates which of the following?"],
  ]),
  g("problem-solving", T2, [
    ["an algorithm", "a step-by-step procedure that guarantees a solution", "To open a combination lock, Wes tries 000, then 001, then 002, and so on until it opens. Which problem-solving strategy is he using?"],
    ["a heuristic", "a simple thinking shortcut that is fast but can lead to errors", "To find the pasta sauce, a shopper skips most aisles and goes straight to the aisle with the pasta. Which problem-solving strategy is she using?"],
    ["a mental set", "the tendency to approach a problem in a way that has worked before, even when it no longer works", "After solving ten math problems with one formula, Abby keeps trying that formula on a problem that needs a different approach. This best illustrates which of the following?"],
    ["functional fixedness", "the inability to see that an object can be used for something other than its usual purpose", "Needing to tighten a screw, Hal searches for a screwdriver and never thinks of using the coin in his pocket. This best illustrates which of the following?"],
    ["divergent thinking", "thinking that produces many possible answers to a problem", "A teacher asks students to list as many uses for a brick as they can. Which kind of thinking does this task measure?"],
    ["convergent thinking", "thinking that narrows the possibilities down to the single best answer", "A multiple-choice math question asks students to find the one correct answer. Which kind of thinking does this task require?"],
    ["executive functions", "the mental processes used to plan, organize and carry out goal-directed behavior", "To finish a long project, Nia sets goals, makes a schedule, resists distractions and checks her progress. These skills are examples of which of the following?"],
  ]),
  g("judgment", T2, [
    ["the representativeness heuristic", "the judging of how likely something is by how well it matches a prototype, while ignoring base rates", "Told that a stranger is quiet and loves poetry, people guess she is a literature professor rather than a truck driver, although there are far more truck drivers. This best illustrates which of the following?"],
    ["the availability heuristic", "the judging of how likely something is by how easily examples come to mind", "After seeing several news reports about shark attacks, Gus believes sharks kill far more people than they do. This best illustrates which of the following?"],
    ["the gambler's fallacy", "the mistaken belief that a random event is more likely because it has not happened recently", "After a coin lands heads five times in a row, Rita is sure the next toss must be tails. This best illustrates which of the following?"],
    ["the sunk-cost fallacy", "the tendency to keep investing in something because of what has already been spent on it", "Although the film is terrible, Mo stays to the end because he already paid for the ticket. This best illustrates which of the following?"],
    ["framing", "the way the wording of an issue affects decisions and judgments", "Shoppers prefer beef labeled '80% lean' to the same beef labeled '20% fat'. This best illustrates which of the following?"],
    ["priming", "the activation, often without awareness, of certain associations that then influence perception or behavior", "People who have just read words about old age walk more slowly down a hallway without knowing why. This best illustrates which of the following?"],
  ]),
  g("memory-types", T3, [
    ["episodic memory", "the explicit memory of personally experienced events", "Kim remembers exactly where she sat and what she ate at her tenth birthday party. Which kind of memory is this?"],
    ["semantic memory", "the explicit memory of facts and general knowledge", "Kim knows that Paris is the capital of France, although she cannot remember when she learned it. Which kind of memory is this?"],
    ["procedural memory", "the implicit memory of how to perform skills and actions", "After ten years without cycling, Raj gets on a bicycle and rides without thinking about it. Which kind of memory is this?"],
    ["prospective memory", "the memory to carry out a planned action in the future", "On the way home, Lin remembers that she must stop to buy milk. Which kind of memory is this?"],
  ]),
  g("memory-stores", T3, [
    ["iconic memory", "the brief sensory memory of a visual image, which lasts a few tenths of a second", "A grid of letters is flashed for an instant, and viewers can still 'see' it for a moment afterward. Which kind of memory is this?"],
    ["echoic memory", "the sensory memory of a sound, which lasts three or four seconds", "Although she was not listening, Bea can repeat the last few words her teacher just said. Which kind of memory makes this possible?"],
    ["short-term memory", "the memory store that briefly holds a few items, about seven, before they are stored or forgotten", "Jamal reads a phone number and can hold it in mind for about twenty seconds before it fades. Which memory store is he using?"],
    ["working memory", "the active processing of information held in mind, combining new input with knowledge from long-term memory", "To work out 23 × 4 in her head, Elif holds the numbers in mind and manipulates them. Which memory system is she using?"],
    ["long-term memory", "the relatively permanent and limitless store of knowledge, skills and experiences", "Which memory store holds a person's childhood memories and vocabulary for decades?"],
  ]),
  g("working-memory", T3, [
    ["the central executive", "the part of working memory that directs attention and coordinates the other parts", "Which part of the working memory model decides what to attend to and coordinates the sound and visual stores?"],
    ["the phonological loop", "the part of working memory that briefly holds spoken and written words", "Kwame repeats a phone number under his breath to keep it in mind. Which part of working memory is he using?"],
    ["the visuospatial sketchpad", "the part of working memory that briefly holds images and spatial information", "Dana pictures the layout of her house to count the windows. Which part of working memory is she using?"],
    ["long-term potentiation", "the strengthening of the connections between neurons after repeated activation, which is the biological basis of memory", "After two neurons fire together repeatedly, the synapse between them becomes more efficient. What is this process called?"],
  ]),
  g("levels", T3, [
    ["implicit memory", "the memory of skills and learned associations that is retained without conscious recall", "A patient with amnesia cannot remember practicing a puzzle, yet he solves it faster each day. Which kind of memory is still working?"],
    ["explicit memory", "the memory of facts and experiences that a person can consciously recall and state", "In a history test, Farah deliberately recalls the dates she studied. Which kind of memory is she using?"],
    ["structural encoding", "the shallow encoding of a word based on its appearance", "Students are asked whether each word on a list is printed in capital letters. Which level of processing does this task use?"],
    ["phonemic encoding", "the encoding of a word based on its sound", "Students are asked whether each word on a list rhymes with 'cat'. Which level of processing does this task use?"],
    ["semantic encoding", "the deep encoding of a word based on its meaning", "Students are asked whether each word on a list would fit in a sentence about cooking, and they later remember these words best. Which level of processing does this task use?"],
    ["automatic processing", "the encoding of information, such as space, time and frequency, without conscious effort", "Without trying, Ada remembers where on the page a fact appeared and roughly how many times she saw a friend this week. This best illustrates which of the following?"],
    ["effortful processing", "the encoding that requires attention and conscious effort", "To learn forty new vocabulary words, Felix must concentrate and rehearse them. This best illustrates which of the following?"],
  ]),
  g("encoding-aids", T4, [
    ["distributed practice", "study that is spread out over several sessions", "Ivo reviews his flashcards for fifteen minutes every evening for two weeks. Which kind of practice is he using?"],
    ["massed practice", "study that is crammed into one long session", "The night before a test, Gia studies for six hours without a break. Which kind of practice is she using?"],
    ["a mnemonic device", "a memory aid that uses vivid images or organizing tricks", "To remember the order of the planets, students learn a sentence whose words start with the same letters. What is this kind of memory aid called?"],
    ["the method of loci", "the mnemonic of imagining items placed at locations along a familiar route", "To remember his speech, Marco imagines each point sitting in a different room of his house and mentally walks through the rooms. Which technique is he using?"],
    ["chunking", "the organizing of items into familiar, manageable units", "Tess remembers the number 177618652001 by treating it as three famous years. Which technique is she using?"],
    ["a hierarchy", "the organizing of information into broad categories divided into narrower ones", "To study, Omar arranges his notes into main topics, then subtopics, then details. Which encoding strategy is he using?"],
  ]),
  g("practice", T4, [
    ["the spacing effect", "the finding that study spread over time produces better long-term memory than study crammed together", "Students who study thirty minutes a day for a week remember more a month later than students who study for the same total time in one night. This best illustrates which of the following?"],
    ["the serial position effect", "the tendency to remember the first and last items in a list better than the middle ones", "After hearing a list of fifteen words, people recall the first few and the last few best. This best illustrates which of the following?"],
    ["the primacy effect", "the tendency to remember the first items in a list well", "A day after meeting twelve new people, Joy remembers only the names of the first two she met. This best illustrates which of the following?"],
    ["the recency effect", "the tendency to remember the last items in a list well", "Immediately after hearing a shopping list, Ken can repeat the final three items but not the middle ones. This best illustrates which of the following?"],
  ]),
  g("storing", T5, [
    ["maintenance rehearsal", "the repeating of information over and over to keep it in short-term memory", "Walking to the phone, Rosa repeats a number again and again so that she does not forget it. Which technique is she using?"],
    ["elaborative rehearsal", "the linking of new information to existing knowledge and meaning to store it in long-term memory", "To remember the term 'hippocampus', Sol links it to a hippo on a campus who never forgets his classes. Which technique is he using?"],
    ["autobiographical memory", "the memory of the events of one's own life", "Grandpa tells detailed stories about his wedding day and his first job. Which kind of memory is he drawing on?"],
    ["highly superior autobiographical memory", "the rare ability to recall almost every day of one's life in detail", "Given any date in the past twenty years, a woman can say what she did and what the weather was. Which condition does she have?"],
  ]),
  g("amnesia", T5, [
    ["retrograde amnesia", "the loss of memories from before an injury or illness", "After a head injury, Amir can learn new things but cannot remember anything from the year before the accident. Which condition does he have?"],
    ["anterograde amnesia", "the inability to form new memories after an injury or illness", "After brain surgery, a patient remembers his past but forgets each new person minutes after meeting them. Which condition does he have?"],
    ["Alzheimer's disease", "a progressive brain disease that destroys memory and then other mental abilities", "An elderly woman's memory steadily worsens over several years until she no longer recognizes her family. Which condition does she most likely have?"],
    ["infantile amnesia", "the inability of adults to remember events from the first few years of life", "No matter how hard she tries, Zara cannot remember anything from before she was three. This best illustrates which of the following?"],
  ]),
  g("retrieval", T6, [
    ["recall", "the retrieval of information without any cues, as in an essay question", "A test asks students to write the names of the brain's four lobes on a blank page. Which measure of memory is this?"],
    ["recognition", "the identification of previously learned information when it is presented, as in a multiple-choice question", "A witness picks the thief out of a line-up of six people. Which measure of memory is this?"],
    ["a retrieval cue", "a stimulus that helps bring a memory to mind", "Hearing a song from her school days brings back a flood of memories for Tina. The song is acting as which of the following?"],
    ["context-dependent memory", "the improved recall that occurs in the same place where the information was learned", "Divers who learned a word list underwater recall it better underwater than on land. This best illustrates which of the following?"],
    ["state-dependent memory", "the improved recall that occurs in the same physical state as when the information was learned", "Information learned after drinking several cups of coffee is recalled best after drinking coffee again. This best illustrates which of the following?"],
    ["mood-congruent memory", "the tendency to recall memories that match one's current mood", "When Paul feels sad, he mostly remembers the disappointments in his life. This best illustrates which of the following?"],
    ["the testing effect", "the finding that practicing retrieval improves memory more than rereading", "Students who quiz themselves on a chapter remember more a week later than students who read the chapter twice. This best illustrates which of the following?"],
    ["metacognition", "the awareness and understanding of one's own thinking and learning", "While studying, Vera notices that she does not really understand one section and decides to change her study method. This best illustrates which of the following?"],
  ]),
  g("forgetting", T7, [
    ["the forgetting curve", "the pattern in which memory fades quickly at first and then levels off", "Ebbinghaus found that most forgetting of nonsense syllables happened in the first hours, with little more lost over later weeks. What is this pattern called?"],
    ["encoding failure", "forgetting that happens because the information never entered long-term memory", "Although Nell has handled coins thousands of times, she cannot say which way the head faces, because she never paid attention to it. This best illustrates which of the following?"],
    ["proactive interference", "the disruption of new learning by older memories", "Having just changed her password, Ming keeps typing her old one. This best illustrates which of the following?"],
    ["retroactive interference", "the disruption of older memories by new learning", "After learning Spanish this year, Otto finds he can no longer remember the French words he learned last year. This best illustrates which of the following?"],
    ["the tip-of-the-tongue phenomenon", "the temporary inability to retrieve a word that one is sure one knows", "Hugo knows the actor's name and can even say its first letter, but he cannot quite produce it. This best illustrates which of the following?"],
    ["repression", "in psychodynamic theory, the pushing of anxiety-arousing memories out of awareness", "According to Freud, a person may be unable to recall a painful childhood event because the mind has blocked it from consciousness. What did Freud call this?"],
  ]),
  g("memory-errors", T7, [
    ["the misinformation effect", "the distortion of a memory by misleading information received after the event", "Witnesses asked how fast the cars were going when they 'smashed' into each other later remember broken glass that was not there. This best illustrates which of the following?"],
    ["source amnesia", "the inability to remember where, when or how a piece of information was learned", "Leah is sure a fact is true but cannot remember whether she read it in a textbook or saw it in a film. This best illustrates which of the following?"],
    ["constructive memory", "the building of a memory at retrieval from stored pieces, expectations and later information", "Each time Ed retells a childhood story, his brain rebuilds it, filling gaps with what probably happened. This best illustrates which of the following?"],
    ["imagination inflation", "the increased confidence that an event happened after repeatedly imagining it", "After being asked several times to imagine spilling punch at a wedding as a child, a student becomes confident it really happened. This best illustrates which of the following?"],
  ]),
  g("intelligence", T8, [
    ["general intelligence", "the single underlying mental ability that Spearman believed affects performance on all mental tasks", "A psychologist notes that people who score high on verbal tests also tend to score high on spatial and numerical tests, and concludes that one ability underlies them all. Which idea is this?"],
    ["multiple intelligences", "the theory that people have several independent kinds of intelligence, such as musical and interpersonal", "A theorist argues that a gifted dancer and a gifted mathematician show different, separate kinds of intelligence. Which theory is this?"],
    ["mental age", "the level of performance typical of a certain chronological age on an intelligence test", "An eight-year-old answers the questions that a typical ten-year-old can answer. On Binet's test, ten is the child's what?"],
    ["the intelligence quotient", "originally, mental age divided by chronological age and multiplied by 100", "A child with a mental age of 10 and a chronological age of 8 is given a score of 125. What is this score called?"],
    ["the Flynn effect", "the steady rise in average intelligence test scores over the generations", "Average performance on intelligence tests rose by about three points per decade during the twentieth century. What is this trend called?"],
  ]),
  g("test-quality", T8, [
    ["standardization", "the giving and scoring of a test in the same way for everyone, and the comparison of scores with a pretested group", "Before releasing a new test, its makers give it to a large representative sample so that later scores can be compared with that group. What is this process called?"],
    ["test-retest reliability", "the consistency of scores when the same people take the same test twice", "People who take a personality test in March get almost the same scores when they take it again in May. Which quality does the test have?"],
    ["split-half reliability", "the consistency of scores between two halves of the same test", "Scores on the odd-numbered questions of a test closely match scores on the even-numbered questions. Which quality does the test have?"],
    ["construct validity", "the extent to which a test measures the concept it claims to measure", "Critics argue that a so-called creativity test actually measures vocabulary. Which quality are they questioning?"],
    ["predictive validity", "the extent to which test scores forecast the future performance they are meant to predict", "Scores on a university entrance test correlate strongly with students' later grades. Which quality does the test have?"],
  ]),
  g("test-factors", T8, [
    ["stereotype threat", "the worry about confirming a negative stereotype about one's group, which can lower performance", "Girls reminded of the stereotype that girls are bad at math just before a math test score lower than girls who are not reminded. This best illustrates which of the following?"],
    ["stereotype lift", "the boost in performance that comes from awareness that another group is negatively stereotyped", "Students who are told that another group usually does badly on a test perform slightly better than usual themselves. This best illustrates which of the following?"],
    ["an achievement test", "a test that measures what a person has already learned", "At the end of the year, students take an exam covering the chemistry they were taught. Which kind of test is this?"],
    ["an aptitude test", "a test that predicts a person's ability to learn or perform in the future", "A company gives applicants a test designed to predict how well they will learn computer programming. Which kind of test is this?"],
    ["a fixed mindset", "the belief that intelligence is set and cannot be changed", "After failing a quiz, Ty says, 'I am just not a math person,' and stops trying. Which belief does this show?"],
    ["a growth mindset", "the belief that intelligence can be developed through effort and learning", "After failing a quiz, Ana says, 'I need a better strategy and more practice,' and works harder. Which belief does this show?"],
  ]),
];
