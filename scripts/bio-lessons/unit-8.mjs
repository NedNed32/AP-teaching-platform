/* AP Biology Unit 8: Ecology. */
export const lessons = [
  {
    id: "responses-to-the-environment",
    obj: ["Explain how organisms respond to environmental changes through behavior and physiology."],
    terms: [
      ["Taxis", "Movement toward or away from a stimulus."],
      ["Kinesis", "A change in the rate of random movement in response to a stimulus."],
      ["Photoperiodism", "A response to changes in day length, such as flowering."],
    ],
    checks: [
      ["Give an example of behavior that increases fitness.", "Migration, hibernation, courtship displays, or warning calls."],
      ["What is the difference between taxis and kinesis?", "Taxis is directed movement; kinesis is a change in speed or turning without direction."],
    ],
    body: String.raw`
Organisms detect and respond to their environment in ways that increase survival and reproduction.

## Behavior

- **Taxis** (directed) and **kinesis** (undirected) movements.
- Migration, hibernation and estivation in response to seasons.
- Communication by visual, auditory, chemical (pheromones) and tactile signals: used for mating, warning, territory and coordinating groups.
- **Cooperative behavior**, including altruism toward relatives.

## Physiology

- Plants respond to light (**phototropism**) and day length (**photoperiodism**).
- Animals adjust metabolism; **endotherms** generate heat internally, while **ectotherms** rely on external heat.
`,
    note: ["Designing experiments", "Choice chambers test whether organisms prefer wet or dry, light or dark. Use enough organisms and repeated trials, and analyze with chi-square."],
    ex: ["Interpret a choice chamber", "Of 40 pill bugs, 32 move to the moist side after 10 minutes. What does this suggest?", ["If there were no preference, about 20 would be on each side.", "32 is far more than expected."], "pill bugs show a preference for moist conditions (confirm with chi-square)."],
  },
  {
    id: "energy-flow-through-ecosystems",
    obj: ["Describe energy flow through trophic levels and calculate energy transfer."],
    terms: [
      ["Trophic level", "A step in a food chain: producers, primary consumers, secondary consumers and so on."],
      ["Gross primary productivity", "The total rate at which producers capture energy."],
      ["Net primary productivity", "Gross primary productivity minus the energy producers use in respiration."],
    ],
    checks: [
      ["About what percentage of energy passes from one trophic level to the next?", "About 10 percent."],
      ["Where does most of the energy at each level go?", "It is lost as heat from cellular respiration or not consumed."],
    ],
    body: String.raw`
Energy enters most ecosystems as sunlight, is captured by **producers** and flows to consumers. Energy is not recycled: it leaves as heat. Matter, such as carbon and nitrogen, **cycles**.

## Trophic efficiency

On average about **10 percent** of the energy at one level is stored in the next. The rest is used for metabolism and lost as heat, or never eaten. This is why food chains are short and pyramids of energy narrow at the top.

$$\text{NPP} = \text{GPP} - R$$

## Metabolic rate

Endotherms use more energy to maintain body temperature, so more of their food goes to heat rather than growth. Smaller animals generally have higher metabolic rates per unit mass.
`,
    note: ["Biogeochemical cycles", "Carbon: photosynthesis takes in CO₂; respiration and combustion release it. Nitrogen: bacteria fix N₂ into forms plants can use. Phosphorus: cycles through rock, soil and water, with no atmospheric phase."],
    ex: ["Energy available", "Producers in a field store 20,000 kcal. About how much reaches the tertiary consumers?", ["Primary: 2,000. Secondary: 200. Tertiary: 20."], "about 20 kcal."],
  },
  {
    id: "population-ecology",
    obj: ["Calculate population growth using exponential and logistic models."],
    terms: [
      ["Exponential growth", "Growth with unlimited resources: dN/dt = rmaxN."],
      ["Carrying capacity (K)", "The maximum population size an environment can sustain."],
      ["Logistic growth", "Growth that slows as the population approaches K: dN/dt = rmaxN(K − N)/K."],
    ],
    checks: [
      ["What shape is an exponential growth curve?", "J-shaped."],
      ["At what population size is logistic growth fastest?", "At half the carrying capacity."],
    ],
    body: String.raw`
## Exponential growth

$$\frac{dN}{dt} = r_{max}N$$

With plenty of resources, the population grows faster the larger it gets: a J-shaped curve.

## Logistic growth

$$\frac{dN}{dt} = r_{max}N\left(\frac{K - N}{K}\right)$$

As N approaches the carrying capacity K, growth slows: an S-shaped curve. Growth is fastest at $$N = K/2$$.

## Population size from rates

Population change = births − deaths (+ immigration − emigration). The per capita growth rate $$r$$ is the birth rate minus the death rate per individual.
`,
    note: ["Reading the model", "When N is small, (K − N)/K is near 1 and growth is nearly exponential. When N equals K, the factor is 0 and growth stops."],
    ex: ["Logistic calculation", "A population has rmax = 0.4 per year, N = 300 and K = 1,200. What is dN/dt?", ["(K − N)/K = 900/1200 = 0.75.", "dN/dt = 0.4 × 300 × 0.75 = 90."], "90 individuals per year."],
  },
  {
    id: "effect-of-density-of-populations",
    obj: ["Distinguish density-dependent and density-independent factors that limit populations."],
    terms: [
      ["Density-dependent factor", "A factor whose effect increases as population density rises, such as competition, predation and disease."],
      ["Density-independent factor", "A factor that affects a population regardless of its density, such as a flood or freeze."],
    ],
    checks: [
      ["Is a contagious disease density-dependent or independent?", "Density-dependent; it spreads more easily in crowded populations."],
      ["Is a forest fire density-dependent or independent?", "Usually density-independent."],
    ],
    body: String.raw`
Populations do not grow forever.

| Density-dependent | Density-independent |
| --- | --- |
| competition for food, water, space | weather events |
| predation | natural disasters |
| disease and parasites | human disturbance like pollution |
| accumulation of wastes | seasonal changes |

Density-dependent factors act like **negative feedback**, keeping populations near carrying capacity. Predator and prey populations can oscillate together: more prey supports more predators, which then reduce prey.
`,
    note: ["Graph clues", "If the death rate rises as density rises, the factor is density-dependent. If the same fraction dies at any density, it is density-independent."],
    ex: ["Classify", "In a crowded pond, tadpoles grow slowly and many starve; in a sparse pond, most survive. What kind of factor is food here?", ["Its effect depends on how many tadpoles are present."], "density-dependent."],
  },
  {
    id: "community-ecology",
    obj: ["Describe interactions within communities and how they affect population sizes and diversity."],
    terms: [
      ["Niche", "The role and resources a species uses in its environment."],
      ["Competitive exclusion", "Two species cannot coexist indefinitely if they use exactly the same limited resources."],
      ["Keystone species", "A species with a much larger effect on its community than its numbers suggest."],
      ["Symbiosis", "A close, long-term interaction between species: mutualism, commensalism or parasitism."],
    ],
    checks: [
      ["What is resource partitioning?", "Species dividing resources so they can coexist, such as birds feeding at different heights."],
      ["What happens to a community when a keystone predator is removed?", "Its prey may overrun the community, reducing diversity."],
    ],
    body: String.raw`
| Interaction | Species 1 | Species 2 | Example |
| --- | --- | --- | --- |
| competition | − | − | plants competing for light |
| predation, herbivory | + | − | wolves and elk |
| parasitism | + | − | tapeworms |
| mutualism | + | + | pollinators and flowers |
| commensalism | + | 0 | barnacles on whales |

**Simpson's diversity index** measures community diversity:

$$\text{SDI} = 1 - \sum \left(\frac{n}{N}\right)^2$$

Values near 1 indicate high diversity. **Keystone species** (such as sea otters, which control sea urchins and protect kelp forests) maintain community structure. **Ecological succession** changes communities over time after disturbances.
`,
    note: ["Trophic cascades", "Changing one population can ripple through a food web. Removing wolves let elk increase, which reduced streamside plants."],
    ex: ["Simpson's index", "A community has 6 individuals of species A, 3 of B and 1 of C. Calculate the diversity index.", ["N = 10. Proportions: 0.6, 0.3, 0.1.", "Sum of squares: 0.36 + 0.09 + 0.01 = 0.46.", "SDI = 1 − 0.46."], "0.54."],
  },
  {
    id: "biodiversity",
    obj: ["Explain how biodiversity affects ecosystem resilience."],
    terms: [
      ["Biodiversity", "The variety of life, from genetic diversity within species to species and ecosystem diversity."],
      ["Resilience", "The ability of an ecosystem to recover from disturbance."],
    ],
    checks: [
      ["Why are diverse ecosystems often more resilient?", "If one species is lost, others can fill similar roles."],
      ["What is an ecosystem service?", "A benefit people get from ecosystems, such as pollination, clean water or soil formation."],
    ],
    body: String.raw`
Biodiversity includes genetic diversity, species diversity and ecosystem diversity.

- Ecosystems with high diversity often recover better from disturbances such as drought or disease, because several species may perform similar functions.
- **Keystone species** and **producers** are especially important: their loss can cause a community to collapse.
- Biodiversity provides **ecosystem services**: pollination, water purification, nutrient cycling, medicines.

The structure of food webs, with many links, buffers ecosystems against the loss of any one species.
`,
    note: ["Measuring diversity", "Diversity depends on both richness (number of species) and evenness (how equal their abundances are). Simpson's index accounts for both."],
    ex: ["Compare ecosystems", "Grassland X has 20 grass species; Grassland Y has 3. A drought kills drought-sensitive species. Which recovers productivity faster?", ["X likely includes drought-tolerant species that keep producing.", "Y may lose most of its producers."], "grassland X, because its diversity provides resilience."],
  },
  {
    id: "disruptions-to-ecosystems",
    obj: ["Explain how invasive species, human activities and natural events disrupt ecosystems."],
    terms: [
      ["Invasive species", "A non-native species that spreads rapidly and harms its new ecosystem."],
      ["Eutrophication", "Excess nutrients causing algal blooms, followed by oxygen depletion as the algae decompose."],
    ],
    checks: [
      ["Why do invasive species often spread quickly?", "Their natural predators, competitors and diseases are absent in the new habitat."],
      ["How does fertilizer runoff harm aquatic life?", "It causes algal blooms; decomposers use up oxygen as the algae die, creating dead zones."],
    ],
    body: String.raw`
Ecosystems change through natural events and human activity.

## Human impacts

- **Habitat destruction and fragmentation**.
- **Invasive species**, which lack natural controls and outcompete natives.
- **Pollution**: fertilizer runoff causes **eutrophication**; some toxins accumulate up food chains (**biomagnification**).
- **Climate change** from burning fossil fuels, shifting ranges and timing of seasonal events.
- **Overharvesting**.

## Natural disruptions

Volcanoes, fires, storms and El Niño events change ecosystems; succession follows.

Disruptions can change selective pressures, sometimes rapidly, which can lead to adaptation or extinction.
`,
    note: ["Geological and meteorological events", "Events such as continental drift and ice ages have reshaped life many times, contributing to speciation and extinction."],
    ex: ["Predict effects", "An invasive plant spreads through a wetland and shades out native plants. Predict an effect on native insects.", ["Insects that depend on native plants lose food and habitat.", "Their populations decline, affecting animals that eat them."], "native insect populations decline, with effects up the food web."],
  },
];
