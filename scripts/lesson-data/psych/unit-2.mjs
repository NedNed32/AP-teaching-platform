/* AP Psychology, Unit 2: Cognition. */
const R = String.raw;
export const lessons = [
  {
    id: "perception",
    obj: ["Explain how the brain organizes and interprets sensory information.", "Apply Gestalt principles, depth cues and attention to examples."],
    terms: [
      ["Top-down processing", "Perception guided by experience and expectations."],
      ["Bottom-up processing", "Perception built from raw sensory input."],
      ["Selective attention", "Focusing awareness on one stimulus while ignoring others."],
      ["Perceptual constancy", "Seeing objects as unchanging in size, shape and color despite changing images."],
    ],
    checks: [
      ["Which depth cue needs two eyes: interposition or retinal disparity?", "Retinal disparity."],
      ["Failing to see a gorilla while counting passes is an example of what?", "Inattentional blindness."],
    ],
    body: R`
**Perception** is how the brain organizes and interprets sensations.

## Two directions of processing

- **Bottom-up**: start with the raw input and build the whole.
- **Top-down**: use experience, context and expectations to interpret the input. Expectations create a **perceptual set**, a readiness to see things one way. **Schemas** (mental frameworks) guide it.

## Attention

- **Selective attention**: we focus on a little and ignore the rest.
- The **cocktail party effect**: your name still breaks through from an ignored conversation.
- **Inattentional blindness**: missing a visible object because attention is elsewhere.
- **Change blindness**: missing a change in the scene.

## Gestalt principles

We organize pieces into wholes.

| Principle | We tend to |
| --- | --- |
| Closure | fill gaps to see a complete figure |
| Figure and ground | separate an object from its background |
| Proximity | group things that are near each other |
| Similarity | group things that look alike |

## Depth perception

- **Binocular cues** (two eyes): **retinal disparity** (the two eyes' images differ more for near objects) and **convergence** (the eyes turn inward for near objects).
- **Monocular cues** (one eye): **relative size**, **interposition**, **linear perspective**, **texture gradient** and **relative clarity**.

## Constancy and movement

**Perceptual constancies** keep size, shape and color stable as images change. **Apparent movement** is seeing motion in a rapid series of still images, as in film.
`,
    note: ["Blindness of attention", "Inattentional blindness is missing an object. Change blindness is missing a change. Both show that attention is limited."],
    ex: ["Name the cue", "In a painting, a road narrows toward the horizon and a near tree hides part of a far house. Which two depth cues are used?", ["Parallel edges that seem to meet are linear perspective.", "One object blocking another is interposition."], "Linear perspective and interposition, both monocular cues."],
  },
  {
    id: "thinking-problem-solving-judgments-and-decision-making",
    obj: ["Describe how people form concepts, solve problems and make judgments, and the errors they make."],
    terms: [
      ["Prototype", "The most typical example of a concept."],
      ["Algorithm", "A step-by-step procedure that guarantees a solution."],
      ["Heuristic", "A quick thinking shortcut that can cause errors."],
      ["Functional fixedness", "Being unable to see a new use for a familiar object."],
    ],
    checks: [
      ["Judging risk by how easily examples come to mind is which heuristic?", "The availability heuristic."],
      ["Continuing a bad investment because of money already spent is which error?", "The sunk-cost fallacy."],
    ],
    body: R`
## Concepts

A **concept** is a mental grouping of similar things. We often judge membership by comparing with a **prototype**, the best example. **Schemas** organize knowledge. New information is either fitted into an existing schema (**assimilation**) or the schema is changed (**accommodation**).

## Solving problems

- An **algorithm** tries every step and always works, but is slow.
- A **heuristic** is a fast rule of thumb that usually works.
- **Insight** is a sudden solution.
- Obstacles: a **mental set** (repeating an approach that worked before) and **functional fixedness** (seeing objects only in their usual roles).
- **Executive functions** are the processes that plan, organize and carry out goal-directed behavior.

## Judgment errors

| Error | What happens |
| --- | --- |
| Representativeness heuristic | judging by resemblance to a prototype, ignoring base rates |
| Availability heuristic | judging by how easily examples come to mind |
| Gambler's fallacy | believing a chance event is due because it has not happened lately |
| Sunk-cost fallacy | continuing because of what has already been invested |
| Framing | the wording of a choice changes the decision |
| Priming | an earlier stimulus unconsciously shapes a response |

## Creativity

**Divergent thinking** produces many possible answers; **convergent thinking** narrows to the single best one. Creativity is hindered by functional fixedness.
`,
    note: ["Two heuristics", "Representativeness is about similarity to a stereotype. Availability is about how easily examples are recalled."],
    ex: ["Which error?", "After a plane crash is widely reported, many people choose to drive instead of fly, although driving is more dangerous. Which heuristic explains this?", ["The crash is vivid and easy to recall.", "People judge flying as risky because examples come to mind easily."], "The availability heuristic."],
  },
  {
    id: "introduction-to-memory",
    obj: ["Describe the types of memory and the models that explain how memory works."],
    terms: [
      ["Explicit memory", "Memory of facts and events that can be consciously recalled."],
      ["Implicit memory", "Memory of skills and associations, retained without conscious recall."],
      ["Working memory", "Active processing of information held briefly in mind."],
      ["Long-term potentiation", "Strengthened connections between neurons; the biological basis of memory."],
    ],
    checks: [
      ["Remembering your tenth birthday is which kind of memory?", "Episodic memory."],
      ["Which level of processing gives the best retention?", "Deep (semantic) processing."],
    ],
    body: R`
**Memory** is learning that persists over time. It involves **encoding** (getting information in), **storage** (keeping it) and **retrieval** (getting it out).

## Types of long-term memory

- **Explicit memory** (conscious): **episodic** (events you experienced) and **semantic** (facts and knowledge).
- **Implicit memory** (not conscious): **procedural** (skills such as cycling) and learned associations.
- **Prospective memory**: remembering to do something in the future.

## The multi-store model

| Store | Capacity | Duration |
| --- | --- | --- |
| Sensory memory (**iconic** for sights, **echoic** for sounds) | large | under a second (iconic), 3–4 seconds (echoic) |
| Short-term memory | about 7 items | about 20 seconds |
| Long-term memory | unlimited | lasting |

Some information is encoded by **automatic processing** (space, time, frequency); the rest needs **effortful processing**.

## The working memory model

Short-term memory is active. The **central executive** directs attention; the **phonological loop** holds words and sounds; the **visuospatial sketchpad** holds images and locations.

## Levels of processing

- **Structural** (appearance): shallow.
- **Phonemic** (sound): intermediate.
- **Semantic** (meaning): deep, and remembered best.

## The biology of memory

**Long-term potentiation** is the strengthening of synapses that fire together repeatedly.
`,
    note: ["Deeper is better", "To remember something, think about what it means and connect it to yourself. Rereading the words is shallow processing."],
    ex: ["Classify the memories", "Classify: (1) knowing that Paris is the capital of France; (2) tying your shoes; (3) remembering to post a letter tomorrow.", ["(1) is a fact: semantic, explicit.", "(2) is a skill: procedural, implicit.", "(3) is a future intention: prospective."], "Semantic, procedural and prospective memory."],
  },
  {
    id: "encoding-memories",
    obj: ["Explain strategies that improve the encoding of memories."],
    terms: [
      ["Mnemonic device", "A memory aid using imagery or organization."],
      ["Chunking", "Organizing items into familiar, manageable units."],
      ["Spacing effect", "Study spread over time is remembered longer than cramming."],
      ["Serial position effect", "The first and last items of a list are remembered best."],
    ],
    checks: [
      ["Which gives better long-term memory: massed or distributed practice?", "Distributed practice."],
      ["Why are the first items in a list remembered well?", "They are rehearsed more, so they enter long-term memory (the primacy effect)."],
    ],
    body: R`
How information is encoded decides how well it is remembered.

## Organizing information

- **Mnemonic devices** use vivid imagery and organization. In the **method of loci**, you imagine items placed along a familiar route.
- **Chunking** groups items into meaningful units: 1-9-4-5 becomes 1945.
- **Categories and hierarchies** arrange material into broad groups with narrower groups inside.

## Spacing your practice

- **Massed practice** is cramming in one session.
- **Distributed practice** spreads study over several sessions.
- The **spacing effect**: distributed practice gives much better long-term retention.

## Serial position effect

When recalling a list, people remember:

- the first items (**primacy effect**), because they were rehearsed most and reached long-term memory;
- the last items (**recency effect**), because they are still in working memory;
- the middle items least.

After a delay, the recency effect fades but the primacy effect remains.
`,
    note: ["Study advice from the science", "Short sessions on several days beat one long session. This is one of the most reliable findings in psychology."],
    ex: ["Predict the recall", "Students hear 20 words and recall them an hour later. Which words are remembered best?", ["After a delay, working memory no longer holds the last words.", "The first words were rehearsed into long-term memory."], "The first few words (the primacy effect)."],
  },
  {
    id: "storing-memories",
    obj: ["Explain how memories are stored and how storage can fail."],
    terms: [
      ["Maintenance rehearsal", "Repeating information to keep it in short-term memory."],
      ["Elaborative rehearsal", "Linking new information to meaning and existing knowledge."],
      ["Retrograde amnesia", "Loss of memories from before an injury."],
      ["Anterograde amnesia", "Inability to form new memories after an injury."],
    ],
    checks: [
      ["Which rehearsal moves information into long-term memory more effectively?", "Elaborative rehearsal."],
      ["A patient cannot form new memories after surgery. Which amnesia is this?", "Anterograde amnesia."],
    ],
    body: R`
## Rehearsal

- **Maintenance rehearsal** repeats information to hold it in short-term memory.
- **Elaborative rehearsal** connects it to meaning and to what you already know, which stores it in long-term memory.

Sleep helps **memory consolidation**, the strengthening of stored memories.

## Autobiographical memory

**Autobiographical memory** is the memory of your own life. A few people have **highly superior autobiographical memory** and can recall almost every day.

## When storage fails

| Condition | What is lost |
| --- | --- |
| Retrograde amnesia | memories from before the injury |
| Anterograde amnesia | the ability to form new memories |
| Alzheimer's disease | memory first, then other abilities, progressively |
| Infantile amnesia | events from the first few years of life, in all adults |

The **hippocampus** is needed to form new explicit memories, so damage to it causes anterograde amnesia. Implicit memories, which depend on the cerebellum and other areas, can survive.
`,
    note: ["Retro means backward", "Retrograde amnesia reaches back to before the injury. Anterograde amnesia affects what comes after."],
    ex: ["Which amnesia?", "After an accident, Sam remembers his childhood but cannot remember what he ate an hour ago or the nurse he met this morning. Name the condition.", ["Old memories are intact.", "New memories are not being formed."], "Anterograde amnesia, probably from damage to the hippocampus."],
  },
  {
    id: "retrieving-memories",
    obj: ["Explain how memories are retrieved and what helps retrieval."],
    terms: [
      ["Recall", "Retrieving information without cues."],
      ["Recognition", "Identifying information when it is presented."],
      ["Retrieval cue", "A stimulus that helps bring a memory to mind."],
      ["Testing effect", "Practicing retrieval strengthens memory more than rereading."],
    ],
    checks: [
      ["Is a multiple-choice question a test of recall or recognition?", "Recognition."],
      ["Remembering better in the room where you studied is which effect?", "Context-dependent memory."],
    ],
    body: R`
## Recall and recognition

- **Recall**: producing the answer with no help, as in an essay.
- **Recognition**: identifying the answer when you see it, as in multiple choice. Recognition is easier.

## Retrieval cues

Memories are stored with links to the situation in which they formed. Any of those links can act as a **retrieval cue**.

| Effect | Recall is best when |
| --- | --- |
| Context-dependent memory | you are in the same place as when you learned |
| State-dependent memory | you are in the same physical state |
| Mood-congruent memory | the memory matches your present mood |

## Improving retrieval

- The **testing effect**: quizzing yourself is more effective than rereading.
- **Metacognition**, thinking about your own thinking, helps you notice what you do not yet know and choose a better strategy.
`,
    note: ["Test yourself", "Rereading feels effective because the material looks familiar. Familiarity is recognition, and exams often need recall."],
    ex: ["Explain the result", "Students who learned words in a noisy room recall more in a noisy room than in a quiet one. Why?", ["The noise was part of the learning situation.", "The same surroundings act as retrieval cues."], "Context-dependent memory."],
  },
  {
    id: "forgetting-and-other-memory-challenges",
    obj: ["Explain why people forget and how memories become distorted."],
    terms: [
      ["Proactive interference", "Old learning disrupts new learning."],
      ["Retroactive interference", "New learning disrupts old memories."],
      ["Misinformation effect", "Misleading information after an event distorts the memory of it."],
      ["Source amnesia", "Forgetting where or how information was learned."],
    ],
    checks: [
      ["You keep writing last year's date in January. Which interference is this?", "Proactive interference."],
      ["Why can eyewitness testimony be unreliable?", "Memory is constructive, and leading questions can distort it (the misinformation effect)."],
    ],
    body: R`
## Why we forget

- **Encoding failure**: the information never entered long-term memory.
- The **forgetting curve** (Ebbinghaus): forgetting is rapid at first and then levels off.
- **Interference**:
  - **Proactive**: old information blocks new.
  - **Retroactive**: new information blocks old.
- **Retrieval failure**, as in the **tip-of-the-tongue phenomenon**.
- **Repression**: in psychodynamic theory, anxiety-arousing memories are pushed out of awareness. Research support for it is weak.

## Memory is constructive

A memory is rebuilt each time it is retrieved, so it can change.

- The **misinformation effect**: misleading details given after an event become part of the memory. Asking how fast cars were going when they "smashed" produces higher speed estimates than asking about when they "contacted".
- **Source amnesia**: remembering a fact but not where it came from.
- **Imagination inflation**: repeatedly imagining an event increases confidence that it happened.

These errors mean that confident eyewitnesses can be wrong.
`,
    note: ["Which way does it interfere?", "Proactive: the past interferes forward. Retroactive: the new interferes backward."],
    ex: ["Name the interference", "After learning a new phone number, Li can no longer remember her old one. Which interference is this?", ["The forgotten item is the old memory.", "The new learning is what disrupted it."], "Retroactive interference."],
  },
  {
    id: "intelligence-and-achievement",
    obj: ["Describe theories of intelligence, how intelligence is measured and what makes a test sound.", "Interpret descriptive statistics and the normal curve."],
    terms: [
      ["General intelligence (g)", "A single underlying mental ability proposed by Spearman."],
      ["Reliability", "The consistency of a test's scores."],
      ["Validity", "The extent to which a test measures or predicts what it should."],
      ["Stereotype threat", "Worry about confirming a negative stereotype, which can lower performance."],
    ],
    checks: [
      ["A test gives the same scores on two occasions. Is it reliable, valid or both?", "Reliable; that alone does not show it is valid."],
      ["About what percentage of scores lie within one standard deviation of the mean?", "About 68%."],
    ],
    body: R`
## What is intelligence?

- **General intelligence (g)**: one ability underlies all mental tasks.
- **Multiple intelligences**: several independent abilities.
- Binet measured **mental age**. The original **intelligence quotient** was mental age ÷ chronological age × 100. Modern tests compare a person with others of the same age.
- The **Flynn effect**: average scores have risen over the generations.

## Sound tests (psychometrics)

- **Standardization**: uniform procedures, and scores compared with a pretested group.
- **Reliability**: consistency. **Test-retest** (same test twice) and **split-half** (two halves agree).
- **Validity**: accuracy. **Construct validity** (measures the intended concept) and **predictive validity** (forecasts future performance).
- **Achievement tests** measure what you have learned; **aptitude tests** predict future performance.

## Influences on scores

- **Stereotype threat** lowers performance; **stereotype lift** can raise it.
- A **fixed mindset** treats intelligence as unchangeable; a **growth mindset** treats it as something effort can develop.
- Differences in scores among groups reflect environment, including poverty, discrimination and educational opportunity.

## Statistics you need

| Statistic | Meaning |
| --- | --- |
| Mean | the arithmetic average |
| Median | the middle score |
| Mode | the most frequent score |
| Range | highest minus lowest |
| Standard deviation | how spread out scores are around the mean |
| Percentile rank | the percentage of scores at or below a score |

In a **normal curve**, about 68% of scores fall within one standard deviation of the mean and about 95% within two. Intelligence scores have a mean of 100 and a standard deviation of 15. In a **positive skew**, a few very high scores pull the mean above the median; in a **negative skew**, a few very low scores pull it below.
`,
    note: ["Reliable is not the same as valid", "A scale that always reads 2 kg too heavy is reliable but not valid. A test must be reliable to be valid, but reliability alone is not enough."],
    ex: ["Using the normal curve", "Intelligence scores have a mean of 100 and a standard deviation of 15. About what percentage of people score above 115?", ["115 is one standard deviation above the mean.", "68% lie within one standard deviation, so 32% lie outside.", "Half of 32% is above."], "About 16%."],
  },
];
