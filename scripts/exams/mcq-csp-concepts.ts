/* AP Computer Science Principles multiple choice: concept questions drawn from written pools. */
import { options } from "./csa-lib";
import type { McqTemplate } from "./types";

interface Item {
  stem: string;
  right: [string, string];
  wrong: [string, string][];
}

/** One template per topic group; each exam draws distinct items from the pool. */
function pool(key: string, unit: number, topics: string[], skills: string[], items: Item[], difficulty = 2): McqTemplate {
  return {
    key,
    unit,
    topics,
    skills,
    difficulty,
    calc: false,
    gen(r) {
      const it = r.pick(items);
      return { stem: it.stem, ...options(it.right, it.wrong), explanation: it.right[1] };
    },
  };
}

const ERROR_SCENARIOS: [string, "syntax" | "run-time" | "logic" | "overflow"][] = [
  ["A program will not start because a closing parenthesis is missing on one line.", "syntax"],
  ["A program crashes when a user enters 0 because it divides by the number entered.", "run-time"],
  ["A grade calculator runs without stopping but reports an average that is too high for every student.", "logic"],
  ["A step counter that stores totals in 16 bits shows a small number after a user walks a very long way.", "overflow"],
  ["A loop meant to display the numbers 1 to 10 displays 1 to 9.", "logic"],
  ["A program stops partway through when it tries to access the 11th element of a list that has 10 elements.", "run-time"],
  ["A keyword is misspelled, so the program cannot be translated and run.", "syntax"],
  ["A shopping app applies a discount to orders under 50 dollars instead of orders over 50 dollars.", "logic"],
];
const ERROR_WHY = {
  syntax: "The rules of the language are broken, so the program cannot run at all.",
  "run-time": "The error occurs while the program is running and stops it.",
  logic: "The program runs, but the algorithm produces incorrect results.",
  overflow: "The value is larger than the fixed number of bits can represent.",
};

export const cspBigIdea1: McqTemplate[] = [
  {
    key: "csp-error-type",
    unit: 1,
    topics: ["identifying-and-correcting-errors"],
    skills: ["4"],
    difficulty: 2,
    calc: false,
    gen(r) {
      const [s, type] = r.pick(ERROR_SCENARIOS);
      const label = (x: string) => `A ${x} error`;
      return {
        stem: `${s} Which type of error is this?`,
        ...options([label(type), ERROR_WHY[type]], (["syntax", "run-time", "logic", "overflow"] as const).filter((x) => x !== type).map((x) => [label(x), ERROR_WHY[x].replace(/^The/, "That would mean the")] as [string, string])),
        explanation: ERROR_WHY[type],
      };
    },
  },
  pool("csp-dev-process", 1, ["program-design-and-development", "collaboration", "program-function-and-purpose"], ["1"], [
    {
      stem: "A team builds a small part of an app, tests it, then adds another small part and tests again. Which development approach is this?",
      right: ["Incremental development", "Adding and testing one small piece at a time is incremental."],
      wrong: [["Sequential computing", "That describes how operations run, not how programs are developed."], ["Lossy development", "That is not a development process."], ["Writing the whole program before any testing", "This team tests after each piece."]],
    },
    {
      stem: "After user testing reveals problems, a developer returns to the design phase and revises the plan before writing more code. Which approach does this describe?",
      right: ["Iterative development", "Revisiting earlier phases based on feedback is iterative development."],
      wrong: [["Data compression", "That reduces the size of data."], ["Procedural abstraction", "That is about naming procedures, not the process of development."], ["Distributed computing", "That uses multiple devices to run a program."]],
    },
    {
      stem: "What is the primary purpose of comments in program code?",
      right: ["To explain how the code works for people reading it, without affecting how it runs", "Comments are documentation for programmers."],
      wrong: [["To make the program run faster", "Comments do not change execution."], ["To prevent syntax errors", "Comments do not check the code."], ["To encrypt the code so others cannot read it", "Comments are plain text."]],
    },
    {
      stem: "Which of the following is the best reason to include people with diverse backgrounds on a team designing an app?",
      right: ["They can identify needs and possible biases that a less diverse team might miss", "Diverse perspectives improve computing innovations."],
      wrong: [["It guarantees the app will have no errors", "No team composition guarantees that."], ["It makes the program run faster", "Team makeup does not change run time."], ["It removes the need for user testing", "Testing is still needed."]],
    },
    {
      stem: "Two students work at one computer: one types the code while the other reviews each line and plans the next step, and they switch roles often. What is this practice called?",
      right: ["Pair programming", "A driver and a navigator working together is pair programming."],
      wrong: [["Crowdsourcing", "That gathers input from many people online."], ["Parallel computing", "That runs operations at the same time on a computer."], ["Citizen science", "That is public participation in research."]],
    },
    {
      stem: "A weather app's purpose is to help people plan their day. Which statement describes the app's function rather than its purpose?",
      right: ["It takes a location as input and displays the forecast for that location", "Function describes what the program does: its inputs and outputs."],
      wrong: [["It helps people decide whether to bring an umbrella", "That is the problem it solves: its purpose."], ["It was created because the developer often got caught in the rain", "That is the motivation, not the function."], ["It is popular with commuters", "That describes its users, not its function."]],
    },
    {
      stem: "In an event-driven program, when does the code attached to a button run?",
      right: ["When the button-click event occurs", "Event-driven code runs in response to events."],
      wrong: [["Immediately when the program starts, in order from top to bottom", "Event handlers wait for their event."], ["Only after every other statement has finished", "Order depends on when events occur."], ["Continuously, many times per second", "It runs once per event."]],
    },
    {
      stem: "A programmer uses a procedure that was written by another student. What should the programmer do?",
      right: ["Acknowledge the other student as the author of that code", "Code written by others should be credited."],
      wrong: [["Rename the procedure so it looks original", "That is plagiarism."], ["Nothing, because code cannot be owned", "Code is intellectual property."], ["Delete the comments from the procedure", "Comments help readers and should stay."]],
    },
  ]),
];

export const cspBigIdea2: McqTemplate[] = [
  pool("csp-compression-choice", 2, ["data-compression"], ["5"], [
    {
      stem: "A hospital stores X-ray images that doctors use for diagnosis and wants to reduce storage space. Which approach is most appropriate?",
      right: ["Lossless compression, because every detail must be recoverable", "Medical images must be restored exactly."],
      wrong: [["Lossy compression, because the files become smallest", "Losing detail could affect diagnosis."], ["No compression is possible for images", "Images can be compressed."], ["Lossy compression, because it can be fully reversed", "Lossy compression cannot be fully reversed."]],
    },
    {
      stem: "A video streaming service wants to send video quickly over slow connections, and viewers will not notice small losses in detail. Which approach is most appropriate?",
      right: ["Lossy compression", "Lossy compression gives much smaller files when exact reconstruction is not needed."],
      wrong: [["Lossless compression, because it always gives smaller files than lossy", "Lossy usually gives smaller files."], ["Encrypting the video", "Encryption protects data; it does not reduce size."], ["Sending the video uncompressed", "That is the slowest option."]],
    },
    {
      stem: "Which statement about lossless compression is true?",
      right: ["The original data can be completely restored", "That is the defining property of lossless compression."],
      wrong: [["It always reduces a file to half its size", "The reduction depends on the data."], ["It permanently removes some information", "That describes lossy compression."], ["It can only be used on text", "It works on any data."]],
    },
    {
      stem: "A program must transmit a spreadsheet of financial records as quickly as possible. Why should it use lossless rather than lossy compression?",
      right: ["Every value must arrive exactly as it was stored", "Financial data cannot tolerate lost information."],
      wrong: [["Lossless always produces smaller files", "Lossy usually produces smaller files."], ["Lossy compression cannot be used on numbers", "It could be used, but would damage the data."], ["Lossless compression encrypts the data", "Compression does not encrypt."]],
    },
  ]),
  pool("csp-data-concepts", 2, ["extracting-information-from-data", "binary-numbers"], ["5"], [
    {
      stem: "A photo file includes the date it was taken and the camera's location. What is this additional information called?",
      right: ["Metadata", "Data about data is metadata."],
      wrong: [["Lossy data", "That is not a kind of data."], ["An overflow", "Overflow is an error with large numbers."], ["A protocol", "Protocols are rules for communication."]],
    },
    {
      stem: "A researcher finds that students who sleep more also have higher test scores. Which conclusion is justified?",
      right: ["Sleep and scores are correlated, but the data alone does not show that sleep causes higher scores", "Correlation does not imply causation."],
      wrong: [["Sleeping more causes higher scores", "Other factors could explain both."], ["Higher scores cause students to sleep more", "The data does not show a direction."], ["The two variables are unrelated", "The data shows a relationship."]],
    },
    {
      stem: "A data set records states as \"CA\", \"Calif.\" and \"California\". What should be done before counting entries by state?",
      right: ["Clean the data so each state is written the same way", "Cleaning makes data uniform without changing its meaning."],
      wrong: [["Delete every entry for that state", "That loses valid data."], ["Compress the data with lossy compression", "That does not make values uniform."], ["Collect more data in the same format", "That makes the inconsistency larger."]],
    },
    {
      stem: "A survey collected only from people who use a particular app is used to describe the whole population. What is the main problem?",
      right: ["The sample may be biased, so the results may not represent everyone", "Data collected from one group may not apply to others."],
      wrong: [["The data set is too small to store", "Size is not the issue."], ["Survey data cannot be analyzed by programs", "It can be."], ["The data needs to be converted to binary first", "All digital data is already binary."]],
    },
    {
      stem: "Which is a consequence of representing real numbers with a fixed number of bits?",
      right: ["Some values can only be approximated, causing round-off errors", "Limited precision means some real numbers are approximated."],
      wrong: [["Every real number is stored exactly", "Many cannot be."], ["Programs cannot do arithmetic with decimals", "They can, with limited precision."], ["Lossless compression becomes impossible", "Compression is unrelated."]],
    },
    {
      stem: "Sound is sampled 44,100 times per second to store it digitally. What is the effect of sampling more often?",
      right: ["The digital version is a closer approximation of the analog sound, but uses more storage", "More samples capture more detail at the cost of size."],
      wrong: [["The file becomes smaller", "More samples mean more data."], ["The sound becomes analog", "Sampled data is digital."], ["Nothing changes", "The number of samples affects quality and size."]],
    },
  ]),
];

export const cspBigIdea3Concepts: McqTemplate[] = [
  pool("csp-efficiency-concepts", 3, ["algorithmic-efficiency", "undecidable-problems"], ["4"], [
    {
      stem: "An algorithm checks every possible subset of n items to find the best combination. How does its run time grow?",
      right: ["Exponentially, so it does not run in reasonable time", "There are 2 to the n subsets."],
      wrong: [["Linearly, so it runs in reasonable time", "The number of subsets doubles with each item."], ["Logarithmically", "That describes binary search."], ["It does not depend on n", "More items means more subsets."]],
    },
    {
      stem: "Why might a programmer use a heuristic to plan delivery routes through hundreds of stops?",
      right: ["Finding the guaranteed best route would take unreasonable time, so a good-enough route found quickly is preferred", "Heuristics trade optimality for speed."],
      wrong: [["Heuristics always find the best possible route", "They find an approximate solution."], ["The problem is undecidable", "It is decidable but slow."], ["Heuristics require no computation", "They still compute a solution."]],
    },
    {
      stem: "What does it mean for a problem to be undecidable?",
      right: ["No algorithm can give a correct yes-or-no answer for every input", "That is the definition of undecidable."],
      wrong: [["Its algorithm takes exponential time", "Slow is not the same as impossible."], ["It has no correct answer for any input", "Specific instances may be solvable."], ["It requires parallel computing", "Hardware does not change decidability."]],
    },
    {
      stem: "An algorithm compares every element of a list with every other element. For a list of n elements, its number of steps grows like which expression?",
      right: ["n squared, which is reasonable time", "Polynomial growth is considered reasonable."],
      wrong: [["2 to the n, which is unreasonable time", "Comparing pairs is polynomial."], ["log n", "Every pair is checked, not halves."], ["n, exactly", "There are about n times n pairs."]],
    },
    {
      stem: "Which of the following is an example of a decision problem?",
      right: ["Is there a route between two cities that is shorter than 300 miles?", "A decision problem has a yes-or-no answer."],
      wrong: [["What is the shortest route between two cities?", "That is an optimization problem."], ["List every route between two cities.", "That asks for a list, not yes or no."], ["How long does the shortest route take to compute?", "That asks about efficiency."]],
    },
  ], 3),
  pool("csp-abstraction-concepts", 3, ["simulations", "libraries", "developing-procedures", "data-abstraction"], ["3"], [
    {
      stem: "Which is the best reason to use a simulation to study how a disease spreads?",
      right: ["It can test different scenarios safely and quickly without exposing people to disease", "Simulations study situations that are dangerous or impractical to test directly."],
      wrong: [["It is guaranteed to predict the future exactly", "Simulations simplify reality."], ["It removes the need for any real data", "Models should be checked against real data."], ["It never contains bias", "Assumptions can introduce bias."]],
    },
    {
      stem: "A simulation of a store's checkout lines assumes every customer takes exactly 2 minutes. What is the main limitation?",
      right: ["Real customers vary, so the simulation may not reflect actual waiting times", "Simplifying assumptions limit accuracy."],
      wrong: [["The simulation cannot use random numbers", "It could, but chose not to."], ["Simulations cannot model people", "They can, with simplifications."], ["The simulation will run too slowly", "Speed is not the issue."]],
    },
    {
      stem: "What does an API provide to programmers?",
      right: ["A specification of how a library's procedures behave and how to use them", "An API documents a library's procedures."],
      wrong: [["A way to compress data", "That is not what an API is."], ["A guarantee that programs have no errors", "APIs do not guarantee correctness of your program."], ["A list of all bugs in the language", "That is not what an API is."]],
    },
    {
      stem: "Which is the main benefit of procedural abstraction?",
      right: ["A procedure can be used by knowing what it does, without knowing how it works", "That reduces complexity."],
      wrong: [["Programs no longer need variables", "Variables are still needed."], ["Procedures make programs run in parallel", "Procedures do not create parallelism."], ["It prevents all logic errors", "Errors can still occur."]],
    },
    {
      stem: "A program stores 50 student names in 50 separate variables. How would storing them in a list manage complexity?",
      right: ["One loop could process all names, and the program could handle any number of students", "A list is a data abstraction that generalizes the code."],
      wrong: [["The names would take up no memory", "A list still uses memory."], ["The program would no longer need procedures", "Procedures are still useful."], ["The list would sort the names automatically", "Lists do not sort themselves."]],
    },
    {
      stem: "How do parameters make a procedure more useful?",
      right: ["They let one procedure work with different input values, so it can be reused", "Parameters generalize a procedure."],
      wrong: [["They make the procedure run faster", "Parameters do not affect speed."], ["They prevent the procedure from returning a value", "Procedures with parameters can return values."], ["They store values permanently between calls", "Parameters receive new values on each call."]],
    },
  ]),
];

export const cspBigIdea4: McqTemplate[] = [
  pool("csp-internet", 4, ["the-internet"], ["5"], [
    {
      stem: "Data sent across the Internet is broken into packets. Which statement about packets is true?",
      right: ["Packets of one message may take different routes and arrive out of order", "Each packet is routed independently and reassembled at the destination."],
      wrong: [["All packets of a message must travel the same path", "Routing can differ per packet."], ["Packets always arrive in the order they were sent", "They can arrive out of order."], ["A packet contains the whole message", "A packet is a small chunk of the data."]],
    },
    {
      stem: "Why were open protocols important to the growth of the Internet?",
      right: ["Any manufacturer can build devices that communicate with all others, letting the network scale", "Open, shared rules allow anyone to connect."],
      wrong: [["They encrypt all data automatically", "Protocols are not all about encryption."], ["They make each device a single point of failure", "Openness does not cause that."], ["They limit the Internet to one company's devices", "Open protocols do the opposite."]],
    },
    {
      stem: "What is the relationship between the World Wide Web and the Internet?",
      right: ["The Web is a system of linked pages and files that uses the Internet to transfer data", "The Web runs on top of the Internet."],
      wrong: [["They are two names for the same thing", "The Internet carries much more than the Web."], ["The Internet runs on top of the Web", "It is the other way around."], ["The Web is a type of computer hardware", "The Web is a system of information."]],
    },
    {
      stem: "Which protocol is primarily responsible for addressing and routing packets to their destination?",
      right: ["IP (Internet Protocol)", "IP handles addresses and routing."],
      wrong: [["HTTP", "HTTP requests and sends web pages."], ["TCP", "TCP makes delivery reliable and ordered."], ["UDP", "UDP sends data quickly without guarantees."]],
    },
    {
      stem: "A live video call uses a protocol that sends packets quickly without checking that each one arrived. Which protocol is this?",
      right: ["UDP", "UDP trades reliability for speed."],
      wrong: [["TCP", "TCP checks for and resends missing packets."], ["HTTP", "HTTP transfers web pages."], ["IP alone guarantees delivery", "IP does not guarantee delivery."]],
    },
    {
      stem: "What is bandwidth?",
      right: ["The maximum amount of data that can be sent in a fixed amount of time", "Bandwidth is usually measured in bits per second."],
      wrong: [["The physical length of a network cable", "That is not bandwidth."], ["The number of devices on a network", "That is network size."], ["The time a packet takes to cross the network", "That is latency."]],
    },
  ]),
  pool("csp-systems-concepts", 4, ["fault-tolerance", "parallel-and-distributed-computing"], ["5"], [
    {
      stem: "Why is redundancy built into the Internet?",
      right: ["So data can be rerouted when a connection or device fails", "Redundant paths provide fault tolerance."],
      wrong: [["To make every packet travel the shortest path", "Redundancy is about reliability."], ["To reduce the cost of the network", "Redundancy adds cost."], ["To encrypt data", "Redundancy does not encrypt."]],
    },
    {
      stem: "Adding more processors to a parallel program eventually stops reducing its run time. What is the most likely reason?",
      right: ["Some parts of the program must run sequentially and cannot be shared", "Sequential portions limit speedup."],
      wrong: [["Processors slow down when more are added", "Each processor keeps its speed."], ["Parallel programs cannot use more than two processors", "They can use many."], ["The program becomes undecidable", "Decidability does not change."]],
    },
    {
      stem: "Which situation best illustrates distributed computing?",
      right: ["Thousands of volunteers' computers each analyze part of a large scientific data set", "Multiple devices running one program is distributed computing."],
      wrong: [["One laptop running a word processor", "That is a single device."], ["A program running one instruction at a time", "That is sequential computing."], ["Compressing a file before emailing it", "That is data compression."]],
    },
    {
      stem: "A task takes 100 seconds sequentially. A parallel version takes 40 seconds. What is the speedup?",
      right: ["2.5", "Speedup is sequential time divided by parallel time: 100 ÷ 40."],
      wrong: [["60", "That is the time saved, not the speedup."], ["0.4", "That is parallel time divided by sequential time."], ["140", "Times are divided, not added."]],
    },
  ]),
];

export const cspBigIdea5: McqTemplate[] = [
  pool("csp-effects", 5, ["beneficial-and-harmful-effects", "digital-divide"], ["6"], [
    {
      stem: "A social media platform built to help friends share photos is also used to spread false news quickly. This is an example of what?",
      right: ["An unintended harmful effect of a computing innovation", "Creators did not plan this use."],
      wrong: [["The digital divide", "That concerns access to technology."], ["A syntax error", "That is a programming error."], ["Lossless compression", "That is unrelated."]],
    },
    {
      stem: "Which is an example of the digital divide?",
      right: ["Students in a rural area cannot complete online homework because they lack reliable Internet access", "Unequal access to technology is the digital divide."],
      wrong: [["A website that loads slowly for everyone", "Everyone is affected equally."], ["Two apps that use different protocols", "That is not about access."], ["A program with a logic error", "That is a bug."]],
    },
    {
      stem: "A city moves all job applications online. Which group is most likely to be harmed?",
      right: ["People without home computers or Internet access", "This can widen the digital divide."],
      wrong: [["People who apply from home computers", "They have access."], ["The city's IT department", "They are not disadvantaged."], ["Employers reviewing applications", "They gain efficiency."]],
    },
    {
      stem: "Ride-sharing apps let drivers earn money on flexible schedules but may reduce income for traditional taxi drivers. What does this show?",
      right: ["An effect can be beneficial for some people and harmful for others", "Effects of innovations are rarely only good or only bad."],
      wrong: [["Ride-sharing apps are undecidable", "Decidability is unrelated."], ["The innovation has no harmful effects", "Taxi drivers are harmed."], ["The innovation has only harmful effects", "Drivers gain flexibility."]],
    },
    {
      stem: "Which action would most help reduce the digital divide?",
      right: ["Providing free public Wi-Fi and devices at libraries", "That increases access for people without it."],
      wrong: [["Requiring faster computers for government websites", "That increases barriers."], ["Moving services online and closing in-person offices", "That can widen the divide."], ["Increasing the price of broadband service", "That reduces access."]],
    },
    {
      stem: "Machine learning finds patterns in medical data that help detect disease early, but the same data could reveal private health details. What does this illustrate?",
      right: ["Data analysis can have both beneficial and harmful effects", "The same innovation can help and harm."],
      wrong: [["Medical data cannot be analyzed by computers", "It can."], ["Machine learning always protects privacy", "It can create privacy risks."], ["Pattern finding is an undecidable problem", "It is not."]],
    },
  ]),
  pool("csp-bias-crowd", 5, ["computing-bias", "crowdsourcing"], ["6"], [
    {
      stem: "A face recognition system works well for some groups but poorly for others. What is the most likely cause?",
      right: ["The training data did not include enough images of some groups", "Unrepresentative data creates biased results."],
      wrong: [["The program has a syntax error", "Syntax errors stop programs from running."], ["The computer's processor is too slow", "Speed does not cause unequal accuracy."], ["Face recognition is undecidable", "It is not."]],
    },
    {
      stem: "A hiring algorithm learns from ten years of past hiring decisions in which some groups were rarely hired. What is the risk?",
      right: ["The algorithm may repeat the bias in those past decisions", "Algorithms reflect biases in their data."],
      wrong: [["The algorithm will remove all bias automatically", "Algorithms do not fix biased data on their own."], ["The algorithm will run too slowly", "Speed is not the concern."], ["The data will overflow", "Overflow is unrelated."]],
    },
    {
      stem: "Which practice best reduces bias in a computing innovation?",
      right: ["Testing the innovation with a diverse range of users and data", "Diverse testing reveals unequal performance."],
      wrong: [["Collecting more data from the same source as before", "That repeats the existing bias."], ["Removing all documentation", "That makes problems harder to find."], ["Using lossy compression on the data", "That is unrelated."]],
    },
    {
      stem: "A navigation app improves its traffic estimates using location reports from millions of drivers. This is an example of what?",
      right: ["Crowdsourcing", "Many people contribute data through the Internet."],
      wrong: [["The digital divide", "That is about access."], ["Phishing", "That is a scam."], ["Sequential computing", "That is about how operations run."]],
    },
    {
      stem: "Volunteers around the world classify millions of telescope images for an astronomy project. What is this called?",
      right: ["Citizen science", "Public participation in scientific research is citizen science."],
      wrong: [["Pair programming", "That is two programmers at one computer."], ["Encryption", "That protects data."], ["Data compression", "That reduces size."]],
    },
    {
      stem: "Which is a concern with information gathered by crowdsourcing?",
      right: ["Some contributions may be inaccurate or deliberately false", "Crowdsourced data needs quality checks."],
      wrong: [["It can only collect small amounts of data", "It often collects very large amounts."], ["It requires no Internet connection", "It usually depends on the Internet."], ["It cannot involve people from different countries", "It often does."]],
    },
  ]),
  pool("csp-legal", 5, ["legal-and-ethical-concerns"], ["6"], [
    {
      stem: "A student wants to use a song in an app. The song is published with a Creative Commons license that allows reuse with attribution. What should the student do?",
      right: ["Use the song and credit the creator as the license requires", "The license grants permission with attribution."],
      wrong: [["Use the song without credit, since it is online", "Online content is still protected."], ["Pay the creator, because Creative Commons always requires payment", "Many Creative Commons licenses are free."], ["Avoid the song, because licensed content can never be reused", "The license allows reuse."]],
    },
    {
      stem: "What is open source software?",
      right: ["Software whose source code is freely available for others to use and modify", "That is the definition of open source."],
      wrong: [["Software that has no copyright", "Open source software is licensed."], ["Software that cannot be modified", "It is meant to be modified."], ["Software that is always free of errors", "It can contain errors."]],
    },
    {
      stem: "A student copies a paragraph from a website into a report without giving credit. What is this?",
      right: ["Plagiarism", "Using others' work without credit is plagiarism."],
      wrong: [["Crowdsourcing", "That gathers contributions from many people."], ["Open access", "That makes research freely readable."], ["Fair encryption", "That is not a real concept."]],
    },
    {
      stem: "Which statement about digital content is true?",
      right: ["Content found online is usually protected by copyright unless its license allows use", "Being online does not make content free to use."],
      wrong: [["Anything posted online is in the public domain", "Copyright still applies."], ["Only printed works can be copyrighted", "Digital works can be too."], ["Code cannot be intellectual property", "Code is intellectual property."]],
    },
    {
      stem: "A company collects far more personal data than its app needs, which is legal in its country. Why might this still be a concern?",
      right: ["Collecting unnecessary data can be unethical and increases privacy risks", "Legal and ethical are not the same."],
      wrong: [["Legal actions can never be unethical", "Some legal actions raise ethical issues."], ["More data always makes an app run faster", "It does not."], ["Personal data cannot be stolen", "It can."]],
    },
  ]),
  pool("csp-safe", 5, ["safe-computing"], ["6"], [
    {
      stem: "A user receives an email that looks like it is from their bank, asking them to click a link and enter their password. What is this attack called?",
      right: ["Phishing", "Phishing tricks people into revealing information."],
      wrong: [["Keylogging", "That records keystrokes."], ["A rogue access point", "That is a fake wireless network."], ["Overflow", "That is a numeric error."]],
    },
    {
      stem: "Why is multifactor authentication more secure than a password alone?",
      right: ["An attacker who steals the password still needs another factor, such as a code on the user's phone", "Multiple kinds of evidence are required."],
      wrong: [["It encrypts the password", "That is not what multifactor means."], ["It makes passwords unnecessary", "A password is usually one of the factors."], ["It prevents all malware", "It protects logins, not against all malware."]],
    },
    {
      stem: "In public key encryption, which key does a sender use to encrypt a message for a recipient?",
      right: ["The recipient's public key", "Anyone can encrypt with the public key; only the private key decrypts."],
      wrong: [["The recipient's private key", "The private key is secret to the recipient."], ["The sender's private key, shared with the recipient", "Private keys are not shared."], ["No key; the message is sent as plain text", "Then it would not be encrypted."]],
    },
    {
      stem: "Software secretly installed on a computer records every key the user presses. What is this?",
      right: ["A keylogger", "Keylogging captures keystrokes, including passwords."],
      wrong: [["A certificate authority", "That verifies website identities."], ["A heuristic", "That is an approximate algorithm."], ["A protocol", "That is a set of communication rules."]],
    },
    {
      stem: "What does a certificate authority do?",
      right: ["Verifies that a website's public key belongs to that website", "This lets users trust encrypted connections."],
      wrong: [["Stores users' passwords", "That is not its role."], ["Creates computer viruses", "It is a trusted security organization."], ["Compresses web pages", "That is unrelated."]],
    },
    {
      stem: "Which is an example of personally identifiable information (PII)?",
      right: ["A person's home address", "PII can identify a specific person."],
      wrong: [["The average temperature in a city", "That is not about a person."], ["The number of pages in a book", "That is not about a person."], ["A list of popular song genres", "That does not identify anyone."]],
    },
    {
      stem: "A coffee shop customer connects to a free network named after the shop, but it was set up by an attacker to capture traffic. What is this?",
      right: ["A rogue access point", "A fake wireless network can intercept data."],
      wrong: [["Phishing by email", "No email is involved."], ["Lossy compression", "That is unrelated."], ["Fault tolerance", "That is network reliability."]],
    },
    {
      stem: "How does symmetric encryption differ from public key encryption?",
      right: ["Symmetric encryption uses the same key to encrypt and decrypt", "Public key encryption uses a pair of different keys."],
      wrong: [["Symmetric encryption uses no key", "All encryption uses keys."], ["Symmetric encryption can never be decrypted", "The shared key decrypts it."], ["Symmetric encryption only works on images", "It works on any data."]],
    },
  ]),
];
