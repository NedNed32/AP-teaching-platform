/* AP Psychology, Unit 5: Mental and Physical Health. */
const R = String.raw;
export const lessons = [
  {
    id: "introduction-to-health-psychology",
    obj: ["Explain how stress affects health and how people cope with it."],
    terms: [
      ["Stressor", "An event or situation seen as threatening or challenging."],
      ["General adaptation syndrome", "The body's three-phase response to stress: alarm, resistance, exhaustion."],
      ["Problem-focused coping", "Reducing stress by changing the stressor."],
      ["Emotion-focused coping", "Reducing stress by managing one's emotional reaction."],
    ],
    checks: [
      ["What is positive, motivating stress called?", "Eustress."],
      ["In which phase of the general adaptation syndrome is illness most likely?", "Exhaustion."],
    ],
    body: R`
**Health psychology** studies how behavior, thoughts and emotions affect physical health.

## Stress

**Stress** is the process of appraising and responding to a **stressor**. **Eustress** motivates; **distress** harms. Long-term stress is linked to **hypertension**, headaches and **immune suppression**. **Adverse childhood experiences** raise the risk of illness in later life.

## The body's response

In the **general adaptation syndrome**, the body responds in three phases:

| Phase | What happens |
| --- | --- |
| Alarm reaction | the sympathetic nervous system activates: fight or flight |
| Resistance | arousal stays high as the body copes |
| Exhaustion | resources are used up; illness becomes likely |

Besides **fight or flight**, people may **tend and befriend**: care for others and seek support.

## Coping

- **Problem-focused coping** tackles the stressor directly. It works best when the situation can be changed.
- **Emotion-focused coping** manages feelings, through exercise, meditation, medication or talking with friends. It helps when the situation cannot be changed.
`,
    note: ["Which coping fits?", "If you can change the problem, change it (problem-focused). If you cannot, change how you feel about it (emotion-focused)."],
    ex: ["Classify the coping", "Before a difficult exam, Ali (1) makes a revision timetable and (2) goes for a run to calm down. Classify each.", ["The timetable addresses the stressor itself.", "The run manages his feelings."], "(1) problem-focused, (2) emotion-focused."],
  },
  {
    id: "positive-psychology",
    obj: ["Explain how positive psychology studies well-being, resilience and growth."],
    terms: [
      ["Subjective well-being", "A person's own judgment of their happiness and life satisfaction."],
      ["Resilience", "Recovering and adapting well after hardship."],
      ["Posttraumatic growth", "Positive change after struggling with a very difficult event."],
      ["Signature strengths", "The character strengths most central to a person."],
    ],
    checks: [
      ["Which practice has been shown to raise well-being: listing complaints or expressing gratitude?", "Expressing gratitude."],
      ["Under which virtue do kindness and love fall?", "Humanity."],
    ],
    body: R`
**Positive psychology** is the scientific study of what helps people and communities thrive. It adds to, and does not replace, the study of disorders.

## Well-being

- **Subjective well-being** is a person's own evaluation of their happiness and satisfaction with life.
- Practicing **gratitude** increases well-being.
- Using one's **signature strengths** raises happiness and engagement.

## Character strengths and virtues

Strengths are grouped under six virtues:

| Virtue | Example strengths |
| --- | --- |
| Wisdom | creativity, curiosity, love of learning |
| Courage | bravery, perseverance, honesty |
| Humanity | love, kindness, social intelligence |
| Justice | teamwork, fairness, leadership |
| Temperance | forgiveness, humility, self-control |
| Transcendence | gratitude, hope, humor, appreciation of beauty |

## After hardship

- **Resilience** is the ability to recover.
- **Posttraumatic growth** goes further: some people report closer relationships, new purpose and greater appreciation of life after trauma.
`,
    note: ["Resilience or growth", "Resilience returns a person to where they were. Posttraumatic growth leaves them changed for the better in some way."],
    ex: ["Identify the virtue", "A student leads her team fairly and makes sure everyone contributes. Which virtue do her strengths show?", ["Fairness, teamwork and leadership are the strengths.", "These are grouped together."], "Justice."],
  },
  {
    id: "explaining-and-classifying-psychological-disorders",
    obj: ["Describe how psychological disorders are defined, classified and explained."],
    terms: [
      ["Dysfunction, distress, deviation", "The criteria used to judge whether behavior is a disorder."],
      ["DSM", "The American Psychiatric Association's manual for diagnosing disorders."],
      ["Biopsychosocial model", "Disorders result from interacting biological, psychological and social factors."],
      ["Diathesis-stress model", "A vulnerability plus stress produces a disorder."],
    ],
    checks: [
      ["Which perspective explains a phobia as a learned association?", "The behavioral perspective."],
      ["Why can a diagnosis be harmful as well as helpful?", "It guides treatment, but can bring stigma."],
    ],
    body: R`
## What counts as a disorder?

Psychologists consider the level of **dysfunction** (interference with daily life), **distress** (suffering) and **deviation from the social norm**. Norms differ between cultures and over time.

## Classification

- The **DSM** (Diagnostic and Statistical Manual), from the American Psychiatric Association, lists criteria for each disorder.
- The **ICD** (International Classification of Diseases), from the World Health Organization, is used worldwide.

Diagnosis guides treatment and research, but labels can cause **stigma**. Two disorders in one person is **comorbidity**.

## Perspectives on causes

| Perspective | Disorders come from |
| --- | --- |
| Behavioral | learned associations and reinforcement |
| Psychodynamic | unconscious conflicts, often from childhood |
| Humanistic | blocked growth and lack of acceptance |
| Cognitive | distorted or irrational thinking |
| Evolutionary | tendencies that once aided survival |
| Sociocultural | social and cultural pressures |
| Biological | genes, brain structure and chemistry |

## Models that combine causes

- The **biopsychosocial model**: biology, psychology and social conditions interact.
- The **diathesis-stress model**: an inherited vulnerability (diathesis) becomes a disorder when triggered by stress.
- An **eclectic approach** to treatment draws on several perspectives.
`,
    note: ["Match the cause to the perspective", "Thoughts: cognitive. Learning: behavioral. Genes or neurotransmitters: biological. Childhood and the unconscious: psychodynamic. Culture: sociocultural."],
    ex: ["Apply diathesis-stress", "Identical twins share a genetic risk for depression. Only the twin who loses her job becomes depressed. Explain.", ["Both have the vulnerability.", "Only one experienced the stressor."], "The diathesis-stress model: the disorder appears when vulnerability meets stress."],
  },
  {
    id: "selection-of-categories-of-psychological-disorders",
    obj: ["Describe the symptoms and possible causes of the main categories of psychological disorders."],
    terms: [
      ["Schizophrenia", "A disorder with delusions, hallucinations, disorganized speech and reduced emotional expression."],
      ["Major depressive disorder", "At least two weeks of depressed mood or loss of interest, with other symptoms."],
      ["Obsessive-compulsive disorder", "Unwanted repeated thoughts and repeated actions."],
      ["Posttraumatic stress disorder", "Flashbacks, nightmares and avoidance for more than a month after trauma."],
    ],
    checks: [
      ["What distinguishes bipolar I from bipolar II disorder?", "Bipolar I has full manic episodes; bipolar II has milder hypomania."],
      ["Are hallucinations positive or negative symptoms?", "Positive; they add an experience."],
    ],
    body: R`
## Neurodevelopmental disorders

Begin in childhood. **Attention-deficit/hyperactivity disorder**: inattention, hyperactivity, impulsiveness. **Autism spectrum disorder**: difficulty with social communication, with repetitive behaviors or narrow interests. **Specific learning disorders** affect reading, writing or math.

## Schizophrenia spectrum

- **Positive symptoms** add experiences: **delusions** (false beliefs), **hallucinations** (false perceptions), **disorganized speech** (word salad) and disorganized movement, including **catatonia**.
- **Negative symptoms** take away: **flat affect**, loss of motivation, withdrawal.
- Onset may be **acute** (sudden; better outlook) or **chronic** (gradual; poorer outlook).
- The **dopamine hypothesis** links it to excess dopamine activity. Genes and prenatal factors contribute.

## Depressive and bipolar disorders

- **Major depressive disorder**: two weeks or more of low mood or lost interest.
- **Persistent depressive disorder**: milder low mood for two years or more.
- **Bipolar I**: full **mania**, usually with depression. **Bipolar II**: depression with hypomania.

## Anxiety disorders

**Specific phobia**, **agoraphobia** (fear of situations where escape is hard), **panic disorder** (sudden panic attacks), **social anxiety disorder** and **generalized anxiety disorder** (constant worry). Culture-bound forms include **ataque de nervios** and **taijin kyofusho**.

## Obsessive-compulsive and related

**Obsessive-compulsive disorder** combines **obsessions** (thoughts) and **compulsions** (actions). **Hoarding disorder** is the inability to discard possessions.

## Dissociative and trauma-related

**Dissociative amnesia** (memory loss, sometimes with fugue), **dissociative identity disorder** (two or more identities) and **posttraumatic stress disorder**.

## Feeding and eating disorders

**Anorexia nervosa** (restriction, very low weight), **bulimia nervosa** (binge and purge) and **binge-eating disorder** (binges without purging).

## Personality disorders

| Cluster | Style | Disorders |
| --- | --- | --- |
| A | odd, eccentric | paranoid, schizoid, schizotypal |
| B | dramatic, erratic | antisocial, histrionic, narcissistic, borderline |
| C | anxious, fearful | avoidant, dependent, obsessive-compulsive |
`,
    note: ["Positive does not mean good", "In schizophrenia, positive symptoms are additions (hallucinations) and negative symptoms are absences (flat affect)."],
    ex: ["Suggest the disorder", "For six months Dana has worried constantly about money, health and work, with tense muscles and poor sleep, but has had no panic attacks and fears no particular object. Which disorder fits best?", ["The worry is constant and about many things.", "There are no attacks or specific fears."], "Generalized anxiety disorder."],
  },
  {
    id: "treatment-of-psychological-disorders",
    obj: ["Describe psychological and biological treatments and how their effectiveness is judged."],
    terms: [
      ["Cognitive-behavioral therapy", "Changes self-defeating thoughts and behaviors together."],
      ["Systematic desensitization", "Pairs relaxation with gradual exposure to feared stimuli."],
      ["Therapeutic alliance", "The trusting relationship between therapist and client."],
      ["Placebo effect", "Improvement caused by expectation alone."],
    ],
    checks: [
      ["Which drug treats bipolar disorder?", "Lithium."],
      ["Why do drug trials use a double-blind procedure?", "So that neither patients' nor researchers' expectations bias the results."],
    ],
    body: R`
## Trends

- **Deinstitutionalization**: since the 1950s, effective drugs have allowed most patients to be treated in the community.
- **Evidence-based practice** combines research, clinical skill and the client's values. **Meta-analyses** combine many studies to judge what works.
- A strong **therapeutic alliance** and **cultural humility** improve outcomes.
- Therapists follow ethical principles: **nonmaleficence** (do no harm), **fidelity** (trustworthiness), **integrity** (honesty) and **respect for people's rights and dignity**.

## Psychological therapies

| Approach | Techniques |
| --- | --- |
| Psychodynamic | **free association**, **dream interpretation** |
| Humanistic (person-centered) | **active listening**, **unconditional positive regard** |
| Behavioral (applied behavior analysis) | exposure therapies such as **systematic desensitization** with a **fear hierarchy**; **aversion therapy**; **token economies**; **biofeedback** |
| Cognitive | **cognitive restructuring**; challenging the **cognitive triad** |
| Cognitive-behavioral | **CBT**, **dialectical behavior therapy**, **rational emotive behavior therapy** |

**Group therapy** adds support from others. **Hypnosis** can help with pain and anxiety but does not reliably recover memories.

## Biological treatments

- **Psychotropic medication**: **antidepressants** (raise serotonin or norepinephrine), **antianxiety drugs**, **lithium** (bipolar disorder) and **antipsychotics** (block dopamine; long use can cause **tardive dyskinesia**).
- **Electroconvulsive therapy** and **transcranial magnetic stimulation** treat severe depression.
- **Psychosurgery** is a last resort. The **lobotomy** is no longer used.

## Testing treatments

Experiments compare an **experimental group** with a **control group**, often given a **placebo** to measure the **placebo effect**. A **double-blind procedure** keeps participants and researchers unaware of the conditions; a **single-blind procedure** keeps only the participants unaware. Researchers rule out **confounding variables** and report **statistical significance** (p below 0.05) and **effect size**.
`,
    note: ["Significant is not the same as large", "Statistical significance says a result is unlikely to be chance. Effect size says how big it is. A tiny effect can be significant in a large sample."],
    ex: ["Choose the therapy", "A client has a severe fear of elevators. Which behavioral therapy would a therapist most likely use, and how?", ["The fear is a learned response to a stimulus.", "Exposure can replace it with relaxation."], "Systematic desensitization: teach relaxation, build a fear hierarchy, and move up it step by step from pictures of elevators to riding one."],
  },
];
