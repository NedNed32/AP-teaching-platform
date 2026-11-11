/*
 * AP Computer Science Principles written-response questions. On the real exam
 * these refer to the student's own Create task program (the Personalized
 * Project Reference). Here each question supplies a sample program instead.
 */
import { ints } from "./csa-lib";
import type { Rng } from "./lib";
import { pseudo } from "./mcq-csp-code";
import type { FrqTemplate } from "./types";

interface Program {
  name: string;
  purpose: string;
  users: string;
  input: string;
  output: string;
  listName: string;
  listHolds: string;
  procName: string;
  code: string;
  call: string;
  callResult: string;
  edgeCall: string;
  edgeResult: string;
  selection: string;
  iteration: string;
  withoutList: string;
  modify: string;
}

function makeProgram(r: Rng): Program {
  const v = r.int(0, 2);
  if (v === 0) {
    const goal = r.pick([6000, 8000, 10000]);
    const steps = ints(r, 7, 3, 13).map((x) => x * 1000);
    let best = 0;
    let cur = 0;
    for (const s of steps) {
      cur = s >= goal ? cur + 1 : 0;
      best = Math.max(best, cur);
    }
    return {
      name: "Step Streak",
      purpose: "encourage regular exercise by rewarding streaks of active days",
      users: "people trying to build a daily walking habit",
      input: "the user types their step count for each day",
      output: "the app displays the longest streak of days that met the daily goal",
      listName: "steps",
      listHolds: "the step counts the user has entered, one per day",
      procName: "longestStreak",
      code: `PROCEDURE longestStreak(steps, goal)\n{\n   best ← 0\n   current ← 0\n   FOR EACH s IN steps\n   {\n      IF (s ≥ goal)\n      {\n         current ← current + 1\n         IF (current > best)\n         {\n            best ← current\n         }\n      }\n      ELSE\n      {\n         current ← 0\n      }\n   }\n   RETURN (best)\n}`,
      call: `longestStreak([${steps.join(", ")}], ${goal})`,
      callResult: String(best),
      edgeCall: `longestStreak([], ${goal})`,
      edgeResult: "0, because the loop never runs and best keeps its starting value",
      selection: `The IF statement checks whether each day's steps meet the goal; if so the current streak grows, otherwise it resets to 0.`,
      iteration: "The FOR EACH loop visits every day's step count in order.",
      withoutList: "Without the list, the program would need a separate variable for each day and could only handle a fixed number of days; the procedure could not loop over them.",
      modify: "To find the longest streak of days that missed the goal, change the condition to s < goal.",
    };
  }
  if (v === 1) {
    const cutoff = r.pick([60, 65, 70]);
    const scores = ints(r, 6, 40, 100);
    const pass = scores.filter((x) => x >= cutoff).length;
    return {
      name: "Quiz Tracker",
      purpose: "help a student see how many practice quizzes they have passed",
      users: "students preparing for a test",
      input: "the student enters a score after each practice quiz",
      output: "the program displays how many quizzes met the passing score",
      listName: "scores",
      listHolds: "every quiz score the student has entered",
      procName: "countPassing",
      code: `PROCEDURE countPassing(scores, cutoff)\n{\n   count ← 0\n   FOR EACH s IN scores\n   {\n      IF (s ≥ cutoff)\n      {\n         count ← count + 1\n      }\n   }\n   RETURN (count)\n}`,
      call: `countPassing([${scores.join(", ")}], ${cutoff})`,
      callResult: String(pass),
      edgeCall: `countPassing([${cutoff}, ${cutoff - 1}], ${cutoff})`,
      edgeResult: `1, because ${cutoff} meets the cutoff (≥) and ${cutoff - 1} does not`,
      selection: "The IF statement checks whether each score is at least the cutoff, and only then increases the count.",
      iteration: "The FOR EACH loop examines every score in the list.",
      withoutList: "Without the list, each score would need its own variable, the number of quizzes would be fixed, and the count would need a separate IF statement per score.",
      modify: "To count failing quizzes instead, change the condition to s < cutoff.",
    };
  }
  const factor = r.pick([2, 3]);
  const amounts = ints(r, 4, 1, 8);
  return {
    name: "Recipe Scaler",
    purpose: "let cooks make larger batches of a recipe without doing arithmetic by hand",
    users: "home cooks preparing food for more people than a recipe serves",
    input: "the user enters the ingredient amounts and how many batches they want",
    output: "the program displays the new amount of each ingredient",
    listName: "amounts",
    listHolds: "the amount of each ingredient in the original recipe",
    procName: "scale",
    code: `PROCEDURE scale(amounts, factor)\n{\n   result ← []\n   FOR EACH a IN amounts\n   {\n      IF (a > 0)\n      {\n         APPEND(result, a * factor)\n      }\n      ELSE\n      {\n         APPEND(result, 0)\n      }\n   }\n   RETURN (result)\n}`,
    call: `scale([${amounts.join(", ")}], ${factor})`,
    callResult: `[${amounts.map((a) => a * factor).join(", ")}]`,
    edgeCall: `scale([0, 2], ${factor})`,
    edgeResult: `[0, ${2 * factor}], because the ELSE branch appends 0 for an amount that is not positive`,
    selection: "The IF statement checks whether each amount is positive, and the ELSE branch handles amounts of 0 or less.",
    iteration: "The FOR EACH loop processes every ingredient amount and appends a scaled value to the result list.",
    withoutList: "Without lists, every ingredient would need its own variable and statement, and recipes with a different number of ingredients would need different code.",
    modify: "To round each scaled amount, apply a rounding procedure to a * factor before appending it.",
  };
}

const programText = (p: Program) =>
  `A student wrote a program called **${p.name}**. Its purpose is to ${p.purpose}. In the program, ${p.input}, and ${p.output}. The list ${"`"}${p.listName}${"`"} stores ${p.listHolds}. The program's main procedure is shown below.\n\n${pseudo(p.code)}\n\nOn the actual exam, these questions refer to your own Create performance task program. Answer them here for the sample program.`;

export const cspWr1: FrqTemplate = {
  key: "frq-csp-wr1",
  topics: ["program-function-and-purpose", "program-design-and-development", "collaboration"],
  skills: ["1", "2"],
  difficulty: 2,
  calc: false,
  format: "wr1",
  minutes: 20,
  gen(r) {
    const p = makeProgram(r);
    return {
      title: "Written response 1: program design, function and purpose",
      stimulus: { text: programText(p) },
      parts: [
        {
          prompt: "Identify the expected users of the program and describe one way the program's design meets the needs of those users.",
          rubric: [
            { criterion: "Identifies a specific group of users.", example: `${p.users[0]!.toUpperCase()}${p.users.slice(1)}.` },
            { criterion: "Describes a design feature and connects it to a need of those users.", example: `The program asks only for simple input (${p.input}) and gives a clear result (${p.output}), which helps them ${p.purpose}.` },
          ],
        },
        {
          prompt: "Describe one input to the program and the output it produces. Explain how the output relates to the program's purpose.",
          rubric: [
            { criterion: "Describes an input and the corresponding output.", example: `For example, ${p.call} returns ${p.callResult}.` },
            { criterion: "Explains how the output serves the purpose.", example: `The result shows the user the information they need to ${p.purpose}.` },
          ],
        },
        {
          prompt: "Describe how a programmer could use iterative or incremental development, including testing, while creating this program.",
          rubric: [
            { criterion: "Describes building or refining the program in stages.", example: `First write and test ${p.procName} on its own with known lists, then add the input screen, then the display of results.` },
            { criterion: "Describes testing with specific inputs and using the results to revise the program.", example: `Test ${p.edgeCall}, which should give ${p.edgeResult}; if it does not, fix the procedure before adding features.` },
          ],
        },
      ],
    };
  },
};

export const cspWr2: FrqTemplate = {
  key: "frq-csp-wr2",
  topics: ["developing-procedures", "data-abstraction", "iteration", "conditionals", "identifying-and-correcting-errors"],
  skills: ["2", "3", "4"],
  difficulty: 3,
  calc: false,
  format: "wr2",
  minutes: 40,
  gen(r) {
    const p = makeProgram(r);
    return {
      title: "Written response 2: algorithms, testing and abstraction",
      stimulus: { text: programText(p) },
      parts: [
        {
          prompt: `(Algorithm development) Explain in detailed steps how the algorithm in ${"`"}${p.procName}${"`"} uses sequencing, selection and iteration to produce its result.`,
          rubric: [
            { criterion: "Describes iteration in the algorithm.", example: p.iteration },
            { criterion: "Describes selection in the algorithm.", example: p.selection },
            { criterion: "Describes how the steps in sequence produce the returned value.", example: `The variables are initialized first, updated inside the loop, and the result is returned after the loop ends. For example, ${p.call} returns ${p.callResult}.` },
          ],
        },
        {
          prompt: `(Errors and testing) Describe a call to ${"`"}${p.procName}${"`"} that tests a different condition than ${"`"}${p.call}${"`"}. Identify the result the call should produce and explain why that test is useful.`,
          rubric: [
            { criterion: "Gives a specific call with different arguments.", example: p.edgeCall },
            { criterion: "States the correct expected result.", example: p.edgeResult },
            { criterion: "Explains what condition the test checks.", example: "It checks a boundary or special case that a typical input does not, which could reveal an error the first test would miss." },
          ],
        },
        {
          prompt: `(Data and procedural abstraction) Explain how the list ${"`"}${p.listName}${"`"} manages complexity in the program. Then explain how the parameters of ${"`"}${p.procName}${"`"} make the procedure more useful.`,
          rubric: [
            { criterion: "Explains how the list manages complexity.", example: p.withoutList },
            { criterion: "Explains how parameters generalize the procedure.", example: `Because the list and the threshold are parameters, the same procedure works for any data and setting, so it can be reused without copying code. ${p.modify}` },
          ],
        },
      ],
    };
  },
};
