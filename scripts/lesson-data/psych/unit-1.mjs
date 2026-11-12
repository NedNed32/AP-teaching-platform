/* AP Psychology, Unit 1: Biological Bases of Behavior. */
const R = String.raw;
export const lessons = [
  {
    id: "interaction-of-heredity-and-environment",
    obj: ["Explain how heredity and environment interact to shape behavior and mental processes.", "Describe the research methods psychologists use, including twin and adoption studies."],
    terms: [
      ["Nature and nurture", "Heredity (genes) and environment (experience); behavior results from their interaction."],
      ["Evolutionary perspective", "Explains behavior through natural selection of traits that aided survival and reproduction."],
      ["Epigenetics", "The study of how the environment changes gene expression without changing DNA."],
      ["Twin and adoption studies", "Designs that compare relatives to separate the influence of genes and environment."],
    ],
    checks: [
      ["Identical twins raised apart are very similar in temperament. Which influence does this support?", "Nature (heredity)."],
      ["Why can only an experiment show cause and effect?", "It manipulates a variable and assigns participants at random, so other explanations are ruled out."],
    ],
    body: R`
Psychology is the scientific study of behavior and mental processes. Its oldest question is how much of who we are comes from **nature** (the genes we inherit) and how much from **nurture** (everything we experience). The modern answer is that the two interact: genes set possibilities, and environments shape which ones appear.

## Studying heredity

- **Twin studies** compare identical twins (who share all their genes) with fraternal twins (who share about half). If identical twins are more alike on a trait, genes matter for that trait.
- **Adoption studies** compare adopted children with their biological relatives (shared genes) and adoptive relatives (shared environment).
- **Family studies** look at how often a trait appears among relatives.

## Ideas to know

- The **evolutionary perspective** explains behavior by **natural selection**: traits that helped ancestors survive and reproduce became common.
- **Epigenetics** studies how experience, such as stress or diet, switches genes on or off without changing the DNA code.
- **Eugenics** was a discredited movement that misused ideas about heredity to justify selective breeding and discrimination. It is a warning about the misuse of science.

## Research methods in psychology

| Method | What it does | Limit |
| --- | --- | --- |
| Experiment | Manipulates an independent variable, with random assignment | May be artificial |
| Correlational study | Measures how two variables are related | Cannot show cause |
| Naturalistic observation | Records behavior in its normal setting | No control of variables |
| Survey | Collects self-reports from a sample | Self-report bias |
| Case study | Studies one individual in depth | Cannot be generalized |

A **hypothesis** is a testable prediction; it must be **falsifiable**. An **operational definition** states exactly how each variable is measured. **Replication** means repeating a study to check the result.
`,
    note: ["It is never nature or nurture alone", "If a question asks which one causes a trait, the best answer is nearly always that they interact. Look for the option that mentions both."],
    ex: ["Reading a twin study", "For a trait, identical twins match 80% of the time and fraternal twins match 40% of the time. What does this suggest?", ["Both kinds of twins share a home, so environment is similar for both.", "Identical twins share twice as many genes and match twice as often."], "The trait is strongly influenced by heredity, although the match is not 100%, so environment also matters."],
  },
  {
    id: "overview-of-the-nervous-system",
    obj: ["Describe the divisions of the nervous system and what each one does."],
    terms: [
      ["Central nervous system", "The brain and spinal cord."],
      ["Peripheral nervous system", "The nerves connecting the central nervous system to the rest of the body."],
      ["Sympathetic nervous system", "Arouses the body for fight or flight."],
      ["Parasympathetic nervous system", "Calms the body: rest and digest."],
    ],
    checks: [
      ["Which division makes your heart pound when you are frightened?", "The sympathetic nervous system."],
      ["Which division controls raising your hand on purpose?", "The somatic nervous system."],
    ],
    body: R`
The nervous system is the body's fast communication network. It has two main parts, and each part divides again.

## The divisions

- **Central nervous system (CNS)**: the brain and spinal cord. It makes decisions.
- **Peripheral nervous system (PNS)**: every nerve outside the brain and spinal cord. It carries messages in and out.
  - **Somatic nervous system**: voluntary control of skeletal muscles.
  - **Autonomic nervous system**: automatic control of glands and internal organs, such as heartbeat and digestion.
    - **Sympathetic**: arouses. Heart rate rises, pupils widen, digestion slows, adrenaline is released. This is the fight-or-flight response.
    - **Parasympathetic**: calms. Heart rate slows and digestion resumes. This is rest and digest.

| Body change | Sympathetic | Parasympathetic |
| --- | --- | --- |
| Heart rate | faster | slower |
| Pupils | widen | narrow |
| Digestion | slows | resumes |
| Breathing | faster | slower |

The two autonomic divisions work like an accelerator and a brake, keeping the body in balance (**homeostasis**).
`,
    note: ["A memory aid", "Sympathetic begins with S, like stress. Parasympathetic begins with P, like peace."],
    ex: ["Which division?", "During an exam, Jo's palms sweat and her heart races. An hour later she is relaxed and hungry. Name the division active each time.", ["Sweating and a racing heart are arousal: the sympathetic division.", "Relaxation and returning appetite are calming: the parasympathetic division."], "Sympathetic during the exam; parasympathetic afterward. Both belong to the autonomic nervous system."],
  },
  {
    id: "the-neuron-and-neural-firing",
    obj: ["Describe how neurons send messages, and how neurotransmitters, hormones and drugs affect behavior."],
    terms: [
      ["Action potential", "The brief electrical charge that travels down the axon when a neuron fires."],
      ["All-or-nothing principle", "A neuron fires at full strength or not at all."],
      ["Reuptake", "The sending neuron reabsorbs leftover neurotransmitter from the synapse."],
      ["Agonist and antagonist", "An agonist increases a neurotransmitter's action; an antagonist blocks it."],
    ],
    checks: [
      ["Which neurotransmitter is low in Parkinson's disease?", "Dopamine."],
      ["A drug blocks a neurotransmitter's receptors. Is it an agonist or an antagonist?", "An antagonist."],
    ],
    body: R`
## Neurons and their helpers

A **neuron** is a nerve cell. **Dendrites** receive messages, the **cell body** keeps the cell alive, the **axon** carries the message away, the **myelin sheath** speeds it up, and the **axon terminals** release chemicals into the **synapse**, the gap before the next cell. **Glial cells** support, feed and protect neurons.

- **Sensory neurons** carry information in to the CNS. **Motor neurons** carry commands out to muscles and glands. **Interneurons** connect them inside the CNS.
- In a **reflex arc**, the spinal cord produces a response before the brain is aware, as when you pull your hand off a hot stove.

## Neural firing

1. At rest the inside of the axon is negative: the **resting potential**.
2. If stimulation reaches the **threshold**, positive ions rush in (**depolarization**) and an **action potential** travels down the axon.
3. Firing is **all-or-nothing**: a stronger stimulus makes neurons fire more often, not more strongly.
4. During the **refractory period** the neuron cannot fire again.
5. Neurotransmitters cross the synapse and bind to receptors. The excess is taken back by **reuptake**.

Damage to myelin causes **multiple sclerosis**. Blocked acetylcholine receptors cause **myasthenia gravis**.

## Neurotransmitters

| Neurotransmitter | Main roles | Linked problem |
| --- | --- | --- |
| Acetylcholine | muscle action, memory | Alzheimer's (too little) |
| Dopamine | movement, reward | Parkinson's (too little), schizophrenia (too much) |
| Serotonin | mood, sleep, hunger | depression (too little) |
| Norepinephrine | alertness, arousal | depressed mood (too little) |
| Glutamate | main excitatory; memory | seizures (too much) |
| GABA | main inhibitory | seizures, insomnia (too little) |
| Endorphins | pain relief, pleasure | |
| Substance P | carries pain signals | |

## Hormones

The **endocrine system** sends slower chemical messages through the blood. **Adrenaline** arouses the body; **leptin** signals fullness; **ghrelin** signals hunger; **melatonin** brings sleep; **oxytocin** promotes bonding.

## Psychoactive drugs

- **Agonists** increase a neurotransmitter's effect; **antagonists** block it; **reuptake inhibitors** keep it in the synapse longer.
- **Stimulants** (caffeine, cocaine) speed up neural activity. **Depressants** (alcohol) slow it. **Hallucinogens** (marijuana) distort perception. **Opioids** (heroin) relieve pain and are highly addictive.
- Repeated use brings **tolerance** (needing more for the same effect), and stopping brings **withdrawal**. Together these drive **addiction**.
`,
    note: ["Stronger stimulus, more firing", "A neuron cannot fire harder. A strong stimulus makes more neurons fire, and makes them fire more often."],
    ex: ["How does this drug work?", "A drug prevents sending neurons from reabsorbing serotonin. What kind of drug is it, and what is the effect?", ["Blocking reabsorption is blocking reuptake.", "More serotonin stays in the synapse, so its effect increases."], "It is a reuptake inhibitor, which acts as an agonist for serotonin. Many antidepressants work this way."],
  },
  {
    id: "the-brain",
    obj: ["Identify the major structures of the brain and their functions.", "Explain how psychologists study the brain."],
    terms: [
      ["Cerebral cortex", "The wrinkled outer layer of the brain, responsible for thinking, perception and voluntary movement."],
      ["Limbic system", "Structures for emotion and memory, including the amygdala, hippocampus and hypothalamus."],
      ["Neuroplasticity", "The brain's ability to reorganize after damage or through experience."],
      ["Split brain", "The condition in which the corpus callosum has been cut, so the hemispheres cannot communicate."],
    ],
    checks: [
      ["Which structure forms new explicit memories?", "The hippocampus."],
      ["Damage to which area leaves a person able to understand speech but unable to speak fluently?", "Broca's area."],
    ],
    body: R`
## Older structures

| Structure | Function |
| --- | --- |
| Medulla | heartbeat and breathing |
| Reticular activating system | arousal and alertness |
| Cerebellum | balance, coordination, procedural learning |
| Thalamus | relay station for all senses except smell |
| Hypothalamus | hunger, thirst, body temperature, sex; controls the pituitary gland |
| Pituitary gland | master gland of the endocrine system |
| Hippocampus | forms new explicit memories |
| Amygdala | fear and aggression |

## The cerebral cortex

- **Frontal lobes**: planning, judgment and movement. The **prefrontal cortex** handles executive functions; the **motor cortex** controls voluntary movement.
- **Parietal lobes**: touch and spatial sense. The **somatosensory cortex** registers body sensations.
- **Occipital lobes**: vision.
- **Temporal lobes**: hearing and language comprehension.

The **corpus callosum** connects the two hemispheres. Each hemisphere controls the opposite side of the body (**contralateral control**). Language is usually in the left hemisphere: **Broca's area** produces speech and **Wernicke's area** understands it. Damage to either causes **aphasia**.

## Split-brain research

When the corpus callosum is cut, an image shown to the left visual field goes only to the right hemisphere. The patient cannot name it, because speech is on the left, but can pick the object out with the left hand.

## Plasticity and methods

**Neuroplasticity** lets the brain rewire after injury or with practice. Researchers study the brain with **case studies** of injured patients, **lesioning**, the **EEG** (electrical activity) and **fMRI** (blood flow showing active areas).
`,
    note: ["Broca and Wernicke", "Broca's area: broken speech. Wernicke's area: words without meaning."],
    ex: ["Locating the damage", "After a stroke, a patient cannot move his right arm and speaks in slow, broken sentences, but understands everything. Where is the damage?", ["The right arm is controlled by the left motor cortex.", "Broken speech with good understanding points to Broca's area, in the left frontal lobe."], "The left frontal lobe, including the motor cortex and Broca's area."],
  },
  {
    id: "sleep",
    obj: ["Describe the sleep cycle, theories of why we sleep and dream, and sleep disorders."],
    terms: [
      ["Circadian rhythm", "The body's roughly 24-hour cycle of sleep and wakefulness."],
      ["REM sleep", "The stage with rapid eye movements, vivid dreams and relaxed muscles."],
      ["Activation-synthesis theory", "Dreams are the brain's attempt to make sense of random neural activity."],
      ["Narcolepsy", "A disorder with sudden, uncontrollable sleep attacks."],
    ],
    checks: [
      ["Why is REM sleep called paradoxical?", "The brain is as active as when awake, but the body is nearly paralyzed."],
      ["Which disorder involves repeated pauses in breathing during sleep?", "Sleep apnea."],
    ],
    body: R`
Consciousness is our awareness of ourselves and our surroundings. Sleep is a different state of consciousness, not an absence of it.

## The sleep cycle

Our **circadian rhythm** follows a cycle of about 24 hours. It is disrupted by **jet lag** and **shift work**. Through the night we cycle about every 90 minutes through these stages, which an **EEG** can record:

| Stage | Features |
| --- | --- |
| NREM 1 | light sleep; **hypnagogic sensations** such as falling |
| NREM 2 | deeper; bursts of activity called sleep spindles |
| NREM 3 | deep sleep; slow **delta waves**; hard to wake |
| REM | rapid eye movements, vivid dreams, active brain, relaxed muscles |

Deep sleep is longest early in the night; REM periods lengthen toward morning. After losing REM sleep, people have more of it the next night: **REM rebound**.

## Why we sleep and dream

- **Restoration**: sleep repairs body and brain tissue.
- **Memory consolidation**: sleep strengthens the day's memories.
- **Activation-synthesis theory**: dreams are the cortex making a story from random brainstem signals.
- **Consolidation theory**: dreams help sort and store memories.

## Sleep disorders

- **Insomnia**: persistent difficulty falling or staying asleep.
- **Narcolepsy**: sudden sleep attacks, often straight into REM.
- **Sleep apnea**: breathing stops repeatedly; loud snoring and daytime tiredness.
- **Somnambulism**: sleepwalking, during NREM 3.
- **REM sleep behavior disorder**: the usual paralysis is missing, so dreams are acted out.
`,
    note: ["Which stage?", "Sleepwalking happens in deep NREM sleep. Acting out dreams happens in REM. The exams often contrast the two."],
    ex: ["Reading a sleep record", "An EEG shows fast, irregular waves like those of waking, the eyes are darting, and the muscles are limp. Which stage is this, and what is likely happening?", ["Waking-like brain waves with relaxed muscles are the paradox of REM.", "Rapid eye movements confirm it."], "REM sleep; the person is probably dreaming."],
  },
  {
    id: "sensation",
    obj: ["Explain how each sense converts energy into neural messages.", "Apply thresholds, adaptation and theories of color and pitch."],
    terms: [
      ["Transduction", "Converting physical energy into neural impulses."],
      ["Absolute threshold", "The weakest stimulus a person can detect half of the time."],
      ["Weber's law", "Two stimuli must differ by a constant proportion to be noticed."],
      ["Sensory adaptation", "Reduced sensitivity after constant stimulation."],
    ],
    checks: [
      ["Which receptors work best in dim light?", "Rods."],
      ["Which theory explains afterimages?", "The opponent-process theory."],
    ],
    body: R`
**Sensation** is detecting energy from the environment. Receptors change that energy into neural impulses, a process called **transduction**.

## Thresholds

- **Absolute threshold**: the weakest stimulus detected 50% of the time.
- **Just-noticeable difference**: the smallest difference detected 50% of the time.
- **Weber's law**: the difference needed is a constant proportion, not a constant amount.
- **Sensory adaptation**: we stop noticing unchanging stimulation.
- **Sensory interaction**: senses influence each other, as smell does taste. **Synesthesia** is when one sense triggers another.

## Vision

Light passes through the **lens**, which changes shape to focus it (**accommodation**), onto the **retina**. **Rods** detect black and white in dim light; **cones** detect color and detail and are packed in the **fovea**. Where the optic nerve leaves the eye there are no receptors: the **blind spot**. The wavelength of light gives its hue.

- **Trichromatic theory**: three types of cones (red, green, blue). Explains color deficiency such as **dichromatism** and **monochromatism**.
- **Opponent-process theory**: color is coded in opposing pairs (red–green, blue–yellow, black–white). Explains **afterimages**.
- **Prosopagnosia** is face blindness; **blindsight** is responding to things one does not consciously see.

## Hearing

Sound waves have **frequency** (pitch) and **amplitude** (loudness). In the **cochlea**, hair cells turn vibrations into impulses.

- **Place theory**: pitch depends on where the cochlea's membrane is stimulated; best for high pitches.
- **Frequency theory**: the rate of impulses matches the sound's frequency; best for low pitches.
- **Volley theory**: neurons take turns firing to match higher frequencies.
- **Sound localization** uses differences in timing and loudness between the ears.
- **Conduction deafness** is damage to the eardrum or middle-ear bones; **sensorineural deafness** is damage to hair cells or the auditory nerve.

## Chemical and body senses

- **Olfaction** (smell) is the only sense that bypasses the thalamus. **Pheromones** are chemical signals between members of a species.
- **Gustation** (taste): sweet, sour, salty, bitter, umami and oleogustus (fat). **Supertasters** have more taste receptors.
- **Touch and pain**: the **gate control theory** says the spinal cord can block pain signals. **Phantom limb** sensations arise in the brain.
- **Vestibular sense**: balance, from the semicircular canals. **Kinesthesis**: the position of body parts.
`,
    note: ["Two theories, both right", "Trichromatic theory describes the cones in the retina. Opponent-process theory describes later processing. Each explains what the other cannot."],
    ex: ["Applying Weber's law", "A person just notices when 2 g is added to a 100 g weight. How much must be added to 500 g to be noticed?", ["The proportion is 2 ÷ 100 = 2%.", "2% of 500 g is 10 g."], "About 10 g, because the just-noticeable difference is a constant proportion."],
  },
];
