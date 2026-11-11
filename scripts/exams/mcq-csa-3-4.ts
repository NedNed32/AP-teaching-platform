/* AP Computer Science A multiple choice, Units 3 and 4: classes, arrays, ArrayLists, 2D arrays, searching, sorting, recursion. */
import { distinct, ic, init, ints, java, listStr, options, spaced, tracePrompt, WORDS } from "./csa-lib";
import { Retry, type McqTemplate } from "./types";

const t = (key: string, unit: number, topics: string[], difficulty: number, gen: McqTemplate["gen"], skills = ["2"]): McqTemplate => ({
  key,
  unit,
  topics,
  skills,
  difficulty,
  calc: false,
  gen,
});

const CLASS_NAMES = [
  ["Student", "grade", "getGrade"],
  ["Car", "speed", "getSpeed"],
  ["Plant", "height", "getHeight"],
  ["Player", "score", "getScore"],
  ["Room", "capacity", "getCapacity"],
] as const;

export const csaUnit3: McqTemplate[] = [
  t("csa-account-trace", 3, ["anatomy-of-a-class", "writing-methods"], 2, (r) => {
    const start = r.int(2, 9) * 10;
    const w1 = start + r.int(1, 4) * 10; // too large: refused
    const d = r.int(1, 6) * 5;
    const w2 = r.int(1, Math.floor((start + d) / 5)) * 5;
    let bal = start;
    if (w1 <= bal) bal -= w1;
    bal += d;
    if (w2 <= bal) bal -= w2;
    return {
      stem: `Consider the following class.\n\n${java(`public class Account {\n    private int balance;\n    public Account(int start) {\n        balance = start;\n    }\n    public void deposit(int amt) {\n        balance += amt;\n    }\n    public void withdraw(int amt) {\n        if (amt <= balance) {\n            balance -= amt;\n        }\n    }\n    public int getBalance() {\n        return balance;\n    }\n}`)}\n\nWhat is printed by the following code segment?\n\n${java(`Account a = new Account(${start});\na.withdraw(${w1});\na.deposit(${d});\na.withdraw(${w2});\nSystem.out.println(a.getBalance());`)}`,
      ...options([ic(bal), `The first withdrawal is refused because ${w1} is more than ${start}.`], [
        [ic(start - w1 + d - w2), "withdraw only subtracts when there is enough money."],
        [ic(start + d), "The second withdrawal is allowed."],
        [ic(start - w1 + d), "Trace every call, and check each withdrawal against the current balance."],
        [ic(start), "deposit and the second withdraw change the balance."],
      ]),
      explanation: `Balance: ${start}; withdraw ${w1} refused; deposit ${d} gives ${start + d}; withdraw ${w2} gives ${bal}.`,
    };
  }),
  t("csa-static-counter", 3, ["class-variables-and-methods"], 3, (r) => {
    const k = r.int(3, 6);
    const j = r.int(1, k - 1);
    const [cls] = r.pick([["Ticket"], ["Badge"], ["Order"], ["Visitor"]] as const);
    const decl = Array.from({ length: k }, (_, i) => `${cls} t${i + 1} = new ${cls}();`).join("\n");
    return {
      stem: `Consider the following class.\n\n${java(`public class ${cls} {\n    private static int count = 0;\n    private int id;\n    public ${cls}() {\n        count++;\n        id = count;\n    }\n    public int getId() {\n        return id;\n    }\n    public static int getCount() {\n        return count;\n    }\n}`)}\n\nWhat is printed by the following code segment?\n\n${java(`${decl}\nSystem.out.println(t${j}.getId() + " " + ${cls}.getCount());`)}`,
      ...options([ic(`${j} ${k}`), "count is shared by all objects; each id records count when that object was made."], [
        [ic(`${j} ${j}`), "count is static: it keeps increasing after t" + j + " is created."],
        [ic(`${k} ${k}`), "id is an instance variable set once, when that object is constructed."],
        [ic(`1 1`), "A static variable is not reset for each new object."],
        [ic(`${j - 1} ${k}`), "count is incremented before id is assigned."],
      ]),
      explanation: `Each constructor call increments the shared count, so t${j} gets id ${j}, and after ${k} objects count is ${k}.`,
    };
  }),
  t("csa-pass-by-value", 3, ["passing-and-returning-references", "writing-methods"], 3, (r) => {
    const A = r.int(2, 9);
    const N = r.int(1, 20);
    const p = r.int(1, 20);
    const q = r.int(1, 20);
    return {
      stem: `Consider the following method.\n\n${java(`public static void change(int x, int[] arr) {\n    x = x + ${A};\n    arr[0] = arr[0] + ${A};\n}`)}\n\nWhat is printed by the following code segment?\n\n${java(`int n = ${N};\nint[] nums = {${p}, ${q}};\nchange(n, nums);\nSystem.out.println(n + " " + nums[0]);`)}`,
      ...options([ic(`${N} ${p + A}`), "The int is copied, but the array parameter refers to the same array object."], [
        [ic(`${N + A} ${p + A}`), "x is a copy of n; changing x does not change n."],
        [ic(`${N} ${p}`), "arr refers to the same array as nums, so the change to arr[0] is visible."],
        [ic(`${N + A} ${p}`), "Primitives are passed by value; arrays are passed as references to the same object."],
      ]),
      explanation: "Java passes copies of values. For an int, the copy is independent. For an array, the copy is a reference to the same array, so element changes persist.",
    };
  }),
  t("csa-aliasing", 3, ["objects-instances-of-classes", "passing-and-returning-references"], 3, (r) => {
    const [a, b, c, d, e] = distinct(r, 5, 1, 30);
    return {
      stem: `Assume a class ${ic("Point")} has a constructor ${ic("Point(int x, int y)")}, a method ${ic("setX(int x)")} and a method ${ic("getX()")}. What is printed by the following code segment?\n\n${java(`Point p = new Point(${a}, ${b});\nPoint q = p;\nq.setX(${c});\np = new Point(${d}, ${e});\nSystem.out.println(q.getX() + " " + p.getX());`)}`,
      ...options([ic(`${c} ${d}`), "q and p first refer to the same object; then p is pointed at a new object, and q is unaffected."], [
        [ic(`${a} ${d}`), "q = p copies the reference, so q.setX changes the shared object."],
        [ic(`${d} ${d}`), "Reassigning p does not change what q refers to."],
        [ic(`${c} ${c}`), "p now refers to a new Point with x = " + d + "."],
      ]),
      explanation: `After q = p, both refer to one Point whose x becomes ${c}. Then p refers to a new Point (x = ${d}); q still refers to the first one.`,
    };
  }),
  t("csa-access-private", 3, ["scope-and-access", "anatomy-of-a-class"], 2, (r) => {
    const [cls, field, getter] = r.pick(CLASS_NAMES);
    const obj = cls.toLowerCase().slice(0, 1);
    return {
      stem: `The class ${ic(cls)} has a private instance variable ${ic(`int ${field}`)} and a public, non-static method ${ic(`int ${getter}()`)} that returns it. A client class declares ${ic(`${cls} ${obj} = new ${cls}();`)}. Which statement in the client class compiles without error?`,
      ...options([ic(`int v = ${obj}.${getter}();`), "Clients use public methods on an object to read private data."], [
        [ic(`int v = ${obj}.${field};`), `${field} is private, so it is only accessible inside ${cls}.`],
        [ic(`int v = ${cls}.${getter}();`), `${getter} is not static, so it must be called on an object.`],
        [ic(`${obj}.${field} = 5;`), `${field} is private and cannot be assigned from another class.`],
      ]),
      explanation: `Private members are visible only inside ${cls}. The client must call the public instance method ${ic(`${getter}()`)} on an object.`,
    };
  }, ["1", "3"]),
  t("csa-this-shadowing", 3, ["this-keyword", "constructors"], 3, (r) => {
    const w = r.int(2, 9);
    const h = r.int(2, 9);
    const fixed = r.next() < 0.5;
    return {
      stem: `Consider the following class.\n\n${java(`public class Box {\n    private int width;\n    private int height;\n    public Box(int width, int h) {\n        ${fixed ? "this.width" : "width"} = width;\n        height = h;\n    }\n    public int area() {\n        return width * height;\n    }\n}`)}\n\nWhat is printed by ${ic(`System.out.println(new Box(${w}, ${h}).area());`)}?`,
      ...options([ic(fixed ? w * h : 0), fixed ? "this.width refers to the instance variable, so it is set correctly." : "The parameter width shadows the instance variable, so the instance variable stays 0."], [
        [ic(fixed ? 0 : w * h), fixed ? "this.width assigns the instance variable." : "Without this, width = width assigns the parameter to itself."],
        [ic(w + h), "area multiplies."],
        [ic(h * h), "width is not set from h."],
        [ic(w * w), "height is set from h."],
      ]),
      explanation: fixed
        ? `this.width = width stores ${w} in the instance variable, so the area is ${w} × ${h} = ${w * h}.`
        : `Inside the constructor, width means the parameter, so width = width does nothing to the instance variable, which keeps its default 0. The area is 0.`,
    };
  }),
];

/* ---------------- Unit 4 ---------------- */

function selectionPasses(a: number[], k: number) {
  const b = [...a];
  for (let i = 0; i < k && i < b.length - 1; i++) {
    let mi = i;
    for (let j = i + 1; j < b.length; j++) if (b[j]! < b[mi]!) mi = j;
    [b[i], b[mi]] = [b[mi]!, b[i]!];
  }
  return b;
}
function insertionPasses(a: number[], k: number) {
  const b = [...a];
  for (let i = 1; i <= k && i < b.length; i++) {
    const key = b[i]!;
    let j = i - 1;
    while (j >= 0 && b[j]! > key) {
      b[j + 1] = b[j]!;
      j--;
    }
    b[j + 1] = key;
  }
  return b;
}

type ListOp = { kind: "add"; v: number } | { kind: "addAt"; i: number; v: number } | { kind: "remove"; i: number } | { kind: "set"; i: number; v: number };

function applyOps(start: number[], ops: ListOp[], mode: "right" | "setInsert" | "removeValue" | "after") {
  const a = [...start];
  for (const op of ops) {
    if (op.kind === "add") a.push(op.v);
    else if (op.kind === "addAt") {
      if (mode === "setInsert") a[op.i] = op.v;
      else a.splice(Math.min(mode === "after" ? op.i + 1 : op.i, a.length), 0, op.v);
    } else if (op.kind === "remove") {
      if (mode === "removeValue") {
        const at = a.indexOf(op.i);
        if (at >= 0) a.splice(at, 1);
      } else if (op.i < a.length) a.splice(op.i, 1);
    } else if (op.i < a.length) a[op.i] = op.v;
  }
  return a;
}
const opCode = (op: ListOp) =>
  op.kind === "add" ? `list.add(${op.v});` : op.kind === "addAt" ? `list.add(${op.i}, ${op.v});` : op.kind === "remove" ? `list.remove(${op.i});` : `list.set(${op.i}, ${op.v});`;

const ETHICS: { stem: string; right: [string, string]; wrong: [string, string][] }[] = [
  {
    stem: "A school app collects students' locations at all times, although it only needs to know whether a student is on campus. Which change best protects student privacy?",
    right: ["Record only whether each student is on campus, not exact locations", "Collecting only the data needed reduces privacy risk."],
    wrong: [
      ["Store the exact locations in a larger database", "More storage does not reduce what is collected."],
      ["Collect locations more often so the data is accurate", "This collects even more personal data."],
      ["Share the locations with more teachers", "Wider access increases privacy risk."],
    ],
  },
  {
    stem: "A program that predicts loan approvals was built from past decisions in which some groups were rarely approved. What is the most likely problem?",
    right: ["The program may repeat the unfair patterns in the historical data", "Biased training data leads to biased predictions."],
    wrong: [
      ["The program will run too slowly to be useful", "Speed is not the concern described."],
      ["The program cannot store enough records", "Storage is not the concern described."],
      ["The program will be unbiased because computers are objective", "Programs inherit the biases in their data."],
    ],
  },
  {
    stem: "A survey app stores users' names together with their answers to sensitive questions. Which practice best reduces harm if the stored data is stolen?",
    right: ["Store answers without names, or encrypt the data", "Removing identifiers or encrypting limits the damage of a breach."],
    wrong: [
      ["Print the data so there is a paper copy", "A paper copy adds another place for the data to leak."],
      ["Ask more sensitive questions so the data is more useful", "This increases the potential harm."],
      ["Keep the data forever in case it is needed", "Keeping data longer increases risk."],
    ],
  },
  {
    stem: "Researchers analyze a data set of fitness-tracker users to make claims about the health of all adults. What is the main concern with this conclusion?",
    right: ["Fitness-tracker users may not represent all adults", "A non-representative sample limits how far conclusions apply."],
    wrong: [
      ["The data set is too large to analyze", "Size is not the issue; representativeness is."],
      ["Fitness trackers cannot record numbers", "They record numeric data."],
      ["Data sets should never be used to make claims", "Data can support claims about the population it represents."],
    ],
  },
];

export const csaUnit4: McqTemplate[] = [
  t("csa-array-access", 4, ["array-creation-and-access"], 2, (r) => {
    const n = r.int(4, 6);
    const a = ints(r, n, 0, n - 1);
    const [i1, i2, i3] = [r.int(0, n - 1), r.int(0, n - 1), r.int(0, n - 1)];
    const k = r.int(0, n - 1);
    const v = r.int(10, 20);
    const run = (skipSecond: boolean, direct: boolean) => {
      const b = [...a];
      b[i1] = b[i2]! + b[i3]!;
      if (!skipSecond) {
        const idx = direct ? k : b[k]!;
        if (idx < 0 || idx >= n) throw new Retry();
        b[idx] = v;
      }
      return b;
    };
    const right = run(false, false);
    const reversed = (() => {
      const b = [...a];
      const idx = b[k]!;
      b[idx] = v;
      b[i1] = b[i2]! + b[i3]!;
      return b;
    })();
    return {
      stem: tracePrompt(`int[] a = ${init(a)};\na[${i1}] = a[${i2}] + a[${i3}];\na[a[${k}]] = ${v};\nfor (int x : a) {\n    System.out.print(x + " ");\n}`),
      ...options([ic(spaced(right)), `After the first assignment, a[${k}] is ${run(true, false)[k]}, so that index is set to ${v}.`], [
        [ic(spaced(run(false, true))), `a[a[${k}]] uses the value stored at index ${k} as the index.`],
        [ic(spaced(run(true, false))), "The second assignment also changes the array."],
        [ic(spaced(reversed)), "Statements run in order; the first assignment happens before a[" + k + "] is read."],
        [ic(spaced(a)), "Array elements can be reassigned."],
      ]),
      explanation: `After ${ic(`a[${i1}] = a[${i2}] + a[${i3}]`)}, the array is ${init(run(true, false))}. Then a[${k}] is ${run(true, false)[k]}, so index ${run(true, false)[k]} becomes ${v}.`,
    };
  }),
  t("csa-enhanced-for", 4, ["array-traversals"], 3, (r) => {
    const n = r.int(4, 6);
    const a = ints(r, n, 1, 9);
    const st = r.int(0, 1);
    const right = a.map((x, i) => (i >= st && (i - st) % 2 === 0 ? x + 1 : x));
    const doubled = a.map((x) => x * 2);
    return {
      stem: tracePrompt(`int[] a = ${init(a)};\nfor (int x : a) {\n    x = x * 2;\n}\nfor (int i = ${st}; i < a.length; i += 2) {\n    a[i] = a[i] + 1;\n}\nfor (int x : a) {\n    System.out.print(x + " ");\n}`),
      ...options([ic(spaced(right)), "The enhanced for loop changes only copies; the indexed loop changes the array."], [
        [ic(spaced(doubled.map((x, i) => (i >= st && (i - st) % 2 === 0 ? x + 1 : x)))), "Assigning to the enhanced-for variable does not change the array."],
        [ic(spaced(a.map((x, i) => (i >= 1 - st && (i - (1 - st)) % 2 === 0 ? x + 1 : x)))), `The indexed loop starts at ${st}.`],
        [ic(spaced(a.map((x) => x + 1))), "The index increases by 2."],
        [ic(spaced(a)), "The indexed loop does change the array."],
      ]),
      explanation: `The first loop has no effect on a. The second adds 1 at indexes ${st}, ${st + 2}, …, giving ${init(right)}.`,
    };
  }),
  t("csa-array-mystery", 4, ["array-algorithms"], 3, (r) => {
    if (r.next() < 0.5) {
      const a = ints(r, r.int(6, 8), 1, 9);
      const cnt = (f: (x: number, y: number) => boolean) => a.slice(0, -1).filter((x, i) => f(x, a[i + 1]!)).length;
      const right = cnt((x, y) => x < y);
      return {
        stem: `Consider the following method.\n\n${java(`public static int mystery(int[] arr) {\n    int c = 0;\n    for (int i = 0; i < arr.length - 1; i++) {\n        if (arr[i] < arr[i + 1]) {\n            c++;\n        }\n    }\n    return c;\n}`)}\n\nWhat is returned by ${ic(`mystery(new int[] ${init(a)})`)}?`,
        ...options([ic(right), "Count the adjacent pairs where the next element is larger."], [
          [ic(cnt((x, y) => x <= y)), "Equal neighbors are not counted; the comparison is strict."],
          [ic(cnt((x, y) => x > y)), "The method counts increases, not decreases."],
          [ic(a.length - 1), "Only pairs that increase are counted."],
          [ic(right + 1), "There are " + (a.length - 1) + " pairs; check each."],
        ]),
        explanation: `Comparing each element with the next in ${init(a)} finds ${right} increases.`,
      };
    }
    const n = r.int(6, 8);
    const a = ints(r, n, 1, 9);
    const mx = Math.max(...a);
    const first = a.indexOf(mx);
    const last = a.lastIndexOf(mx);
    if (first === last) a[(first + r.int(2, n - 1)) % n] = mx;
    const f2 = a.indexOf(mx);
    const l2 = a.lastIndexOf(mx);
    const ge = r.next() < 0.5;
    const right = ge ? l2 : f2;
    return {
      stem: `Consider the following method.\n\n${java(`public static int mystery(int[] arr) {\n    int k = 0;\n    for (int i = 1; i < arr.length; i++) {\n        if (arr[i] ${ge ? ">=" : ">"} arr[k]) {\n            k = i;\n        }\n    }\n    return k;\n}`)}\n\nWhat is returned by ${ic(`mystery(new int[] ${init(a)})`)}?`,
      ...options([ic(right), `The method returns the index of the ${ge ? "last" : "first"} occurrence of the maximum.`], [
        [ic(ge ? f2 : l2), ge ? "With >=, a later equal maximum replaces k." : "With >, a later equal value does not replace k."],
        [ic(mx), "k stores an index, not a value."],
        [ic(right + 1), "Indexes start at 0."],
      ]),
      explanation: `The maximum ${mx} occurs at indexes ${f2} and ${l2}. Using ${ic(ge ? ">=" : ">")}, k ends at ${right}.`,
    };
  }, ["2", "3"]),
  t("csa-shift", 4, ["array-algorithms"], 3, (r) => {
    const a = distinct(r, r.int(4, 6), 1, 9);
    const n = a.length;
    const left = [...a.slice(1), a[0]!];
    const right = [a[n - 1]!, ...a.slice(0, -1)];
    const buggy = a.map(() => a[0]!);
    const v = r.int(0, 2);
    const code = [
      `int first = a[0];\nfor (int i = 0; i < a.length - 1; i++) {\n    a[i] = a[i + 1];\n}\na[a.length - 1] = first;`,
      `int last = a[a.length - 1];\nfor (int i = a.length - 1; i > 0; i--) {\n    a[i] = a[i - 1];\n}\na[0] = last;`,
      `for (int i = 1; i < a.length; i++) {\n    a[i] = a[i - 1];\n}`,
    ][v]!;
    const res = [left, right, buggy][v]!;
    return {
      stem: tracePrompt(`int[] a = ${init(a)};\n${code}`, `Which of the following represents the contents of ${ic("a")} after the code segment executes?`),
      ...options([ic(init(res)), ["Every element moves one place left and the first wraps to the end.", "Every element moves one place right and the last wraps to the front.", "Each element copies the one before it, which was already overwritten, so a[0] spreads through the array."][v]!], [
        [ic(init(left)), "Trace the loop direction and indexes carefully."],
        [ic(init(right)), "Trace the loop direction and indexes carefully."],
        [ic(init(buggy)), "Trace the loop direction and indexes carefully."],
        [ic(init([...a].reverse())), "Shifting is not reversing."],
        [ic(init(a)), "The loop changes the array."],
      ]),
      explanation: `Tracing the loop on ${init(a)} gives ${init(res)}.`,
    };
  }),
  t("csa-mirror-bug", 4, ["array-algorithms"], 3, (r) => {
    const a = distinct(r, r.int(5, 6), 1, 9);
    const n = a.length;
    const mirror = [...a];
    for (let i = 0; i < Math.floor(n / 2); i++) mirror[n - 1 - i] = mirror[i]!;
    const mirrorBack = [...a];
    for (let i = 0; i < Math.floor(n / 2); i++) mirrorBack[i] = mirrorBack[n - 1 - i]!;
    return {
      stem: tracePrompt(`int[] a = ${init(a)};\nfor (int i = 0; i < a.length / 2; i++) {\n    a[a.length - 1 - i] = a[i];\n}`, `Which of the following represents the contents of ${ic("a")} after the code segment executes?`),
      ...options([ic(init(mirror)), "The back half is overwritten with a copy of the front half, so the array reads the same both ways."], [
        [ic(init([...a].reverse())), "Reversing needs a swap with a temporary variable; this only copies."],
        [ic(init(mirrorBack)), "Values are copied from index i to the back, not the other way."],
        [ic(init(a)), "The loop assigns to the back half."],
      ]),
      explanation: `Each a[i] in the front half is copied to its mirror position, giving ${init(mirror)}.`,
    };
  }, ["2", "4"]),
  t("csa-arraylist-ops", 4, ["arraylist-methods"], 3, (r) => {
    const start = distinct(r, 3, 10, 40);
    const ops: ListOp[] = [];
    let cur = [...start];
    const kinds = r.shuffle(["addAt", "remove", "set", "add", r.pick(["addAt", "remove"])] as const);
    for (const k of kinds) {
      const v = r.int(10, 50);
      const op: ListOp = k === "add" ? { kind: "add", v } : k === "addAt" ? { kind: "addAt", i: r.int(0, cur.length - 1), v } : k === "remove" ? { kind: "remove", i: r.int(0, cur.length - 1) } : { kind: "set", i: r.int(0, cur.length - 1), v };
      ops.push(op);
      cur = applyOps(cur, [op], "right");
    }
    const right = applyOps(start, ops, "right");
    return {
      stem: tracePrompt(`ArrayList<Integer> list = new ArrayList<Integer>();\n${start.map((x) => `list.add(${x});`).join("\n")}\n${ops.map(opCode).join("\n")}\nSystem.out.println(list);`),
      ...options([ic(listStr(right)), "Apply each call in order; add(i, v) inserts and remove(i) removes by index."], [
        [ic(listStr(applyOps(start, ops, "setInsert"))), "add(index, obj) inserts and shifts later elements; it does not replace."],
        [ic(listStr(applyOps(start, ops, "removeValue"))), "With an int argument, remove(i) removes the element at index i."],
        [ic(listStr(applyOps(start, ops, "after"))), "add(i, obj) places obj at index i."],
        [ic(listStr([...right].reverse())), "add(obj) appends to the end."],
      ]),
      explanation: `Tracing each call from ${listStr(start)} gives ${listStr(right)}.`,
    };
  }),
  t("csa-arraylist-remove-bug", 4, ["arraylist-traversals"], 4, (r) => {
    const n = r.int(5, 7);
    const a = ints(r, n, -9, 9).map((x) => (x === 0 ? 1 : x));
    // Make sure there are two adjacent negatives so the bug shows.
    const p = r.int(0, n - 2);
    a[p] = -r.int(1, 9);
    a[p + 1] = -r.int(1, 9);
    const buggy = [...a];
    for (let i = 0; i < buggy.length; i++) if (buggy[i]! < 0) buggy.splice(i, 1);
    const all = a.filter((x) => x >= 0);
    return {
      stem: tracePrompt(`// list contains ${listStr(a)}\nfor (int i = 0; i < list.size(); i++) {\n    if (list.get(i) < 0) {\n        list.remove(i);\n    }\n}\nSystem.out.println(list);`),
      ...options([ic(listStr(buggy)), "After a removal, the next element shifts into index i but i still increases, so it is skipped."], [
        [ic(listStr(all)), "This is the intended result, but adjacent negatives cause one to be skipped."],
        [ic(listStr(a)), "Negative values are removed."],
        [ic(listStr(a.filter((x, i) => !(x < 0 && i === a.findIndex((y) => y < 0))))), "The loop continues after the first removal."],
      ]),
      explanation: `Removing at index i shifts the rest left. The element that moves into index i is never checked, so the result is ${listStr(buggy)}.`,
    };
  }, ["2", "4"]),
  t("csa-wrapper-parse", 4, ["wrapper-classes"], 2, (r) => {
    const d = r.int(10, 99);
    const k = r.int(2, 9);
    return {
      stem: tracePrompt(`String s = "${d}";\nint n = Integer.parseInt(s) + ${k};\nInteger w = n;\nSystem.out.println(s + ${k} + " " + w);`),
      ...options([ic(`${d}${k} ${d + k}`), "s + k concatenates; parseInt converts the String to an int before adding."], [
        [ic(`${d + k} ${d + k}`), "s is a String, so s + " + k + " concatenates."],
        [ic(`${d}${k} ${d}${k}`), "parseInt returns an int, so n is computed by addition."],
        [ic(`${d + k} ${d}${k}`), "The two expressions are reversed."],
      ]),
      explanation: `${ic("Integer.parseInt(s)")} is ${d}, so n is ${d + k}, autoboxed into w. But ${ic(`s + ${k}`)} joins Strings: "${d}${k}".`,
    };
  }),
  t("csa-2d-access", 4, ["2d-array-creation-and-access"], 2, (r) => {
    const R = r.int(2, 4);
    const C = r.int(3, 5);
    if (R === C) throw new Retry();
    const k = r.int(2, 5);
    const x = r.int(0, R - 1);
    const y = r.int(0, C - 1);
    const val = (i: number, j: number) => i * k + j;
    return {
      stem: tracePrompt(`int[][] m = new int[${R}][${C}];\nfor (int r = 0; r < m.length; r++) {\n    for (int c = 0; c < m[0].length; c++) {\n        m[r][c] = r * ${k} + c;\n    }\n}\nSystem.out.println(m[${x}][${y}] + " " + m.length + " " + m[0].length);`),
      ...options([ic(`${val(x, y)} ${R} ${C}`), "The first index is the row; m.length is the number of rows."], [
        [ic(`${val(x, y)} ${C} ${R}`), "m.length counts rows; m[0].length counts columns."],
        [ic(`${y * k + x} ${R} ${C}`), "m[" + x + "][" + y + "] is row " + x + ", column " + y + "."],
        [ic(`${val(x, y)} ${R * C} ${C}`), "m.length is the number of rows, not elements."],
        [ic(`${y * k + x} ${C} ${R}`), "The first index is the row."],
      ]),
      explanation: `m[${x}][${y}] = ${x} × ${k} + ${y} = ${val(x, y)}; the array has ${R} rows and ${C} columns.`,
    };
  }),
  t("csa-2d-traversal", 4, ["2d-array-traversals"], 3, (r) => {
    const R = r.int(2, 3);
    const C = R === 2 ? 3 : r.pick([2, 4]);
    const g = Array.from({ length: R }, () => ints(r, C, 1, 9));
    const rowMajor = g.flat();
    const colMajor: number[] = [];
    for (let c = 0; c < C; c++) for (let rr = 0; rr < R; rr++) colMajor.push(g[rr]![c]!);
    const col = r.next() < 0.5;
    const right = col ? colMajor : rowMajor;
    const code = col
      ? `for (int c = 0; c < g[0].length; c++) {\n    for (int r = 0; r < g.length; r++) {\n        System.out.print(g[r][c] + " ");\n    }\n}`
      : `for (int r = 0; r < g.length; r++) {\n    for (int c = 0; c < g[0].length; c++) {\n        System.out.print(g[r][c] + " ");\n    }\n}`;
    const revRow = [...g].reverse().flat();
    return {
      stem: tracePrompt(`int[][] g = {${g.map((row) => init(row)).join(", ")}};\n${code}`),
      ...options([ic(spaced(right)), col ? "The outer loop is over columns: column-major order." : "The outer loop is over rows: row-major order."], [
        [ic(spaced(col ? rowMajor : colMajor)), "The outer loop decides the order of the visits."],
        [ic(spaced([...right].reverse())), "Both loops count upward."],
        [ic(spaced(revRow)), "Row 0 is printed first."],
      ]),
      explanation: `The ${col ? "column" : "row"} index is in the outer loop, so the output is ${spaced(right)}.`,
    };
  }),
  t("csa-2d-sums", 4, ["2d-array-algorithms"], 3, (r) => {
    const R = 3;
    const C = r.int(3, 4);
    const g = Array.from({ length: R }, () => ints(r, C, 0, 9));
    const rowSums = g.map((row) => row.reduce((a, b) => a + b, 0));
    const colSums = Array.from({ length: C }, (_, c) => g.reduce((s, row) => s + row[c]!, 0));
    const best = rowSums.indexOf(Math.max(...rowSums));
    if (rowSums.filter((s) => s === rowSums[best]).length > 1) throw new Retry();
    const bestCol = colSums.indexOf(Math.max(...colSums));
    return {
      stem: `Consider the following method.\n\n${java(`public static int mystery(int[][] g) {\n    int best = 0;\n    int bestSum = 0;\n    for (int r = 0; r < g.length; r++) {\n        int sum = 0;\n        for (int c = 0; c < g[r].length; c++) {\n            sum += g[r][c];\n        }\n        if (sum > bestSum) {\n            bestSum = sum;\n            best = r;\n        }\n    }\n    return best;\n}`)}\n\nWhat is returned by ${ic("mystery(g)")} if ${ic("g")} is ${ic(`{${g.map((row) => init(row)).join(", ")}}`)}?`,
      ...options([ic(best), `The row sums are ${rowSums.join(", ")}; the largest is in row ${best}.`], [
        [ic(rowSums[best]!), "The method returns the row index, not the sum."],
        [ic(bestCol), "The inner loop adds across a row, not down a column."],
        [ic((best + 1) % R === bestCol ? (best + 2) % R : (best + 1) % R), "Recompute each row's sum."],
        [ic(R), "Rows are numbered from 0."],
      ]),
      explanation: `Row sums: ${rowSums.join(", ")}. The method keeps the index of the largest, ${best}.`,
    };
  }, ["2", "3"]),
  t("csa-binary-search-trace", 4, ["searching-algorithms"], 3, (r) => {
    const n = r.int(7, 12);
    const a = distinct(r, n, 1, 60).sort((x, y) => x - y);
    const target = r.next() < 0.6 ? a[r.int(0, n - 1)]! : r.int(1, 60);
    const trace = (up: boolean) => {
      const seen: number[] = [];
      let lo = 0;
      let hi = n - 1;
      while (lo <= hi) {
        const mid = up ? Math.ceil((lo + hi) / 2) : Math.floor((lo + hi) / 2);
        seen.push(a[mid]!);
        if (a[mid] === target) break;
        if (a[mid]! < target) lo = mid + 1;
        else hi = mid - 1;
      }
      return seen;
    };
    const right = trace(false);
    const linear: number[] = [];
    for (const x of a) {
      linear.push(x);
      if (x === target || linear.length >= right.length + 1) break;
    }
    return {
      stem: `The following binary search is called with ${ic("arr")} = ${ic(init(a))} and ${ic(`target`)} = ${target}.\n\n${java(`int low = 0, high = arr.length - 1;\nwhile (low <= high) {\n    int mid = (low + high) / 2;\n    if (arr[mid] == target) {\n        return mid;\n    }\n    if (arr[mid] < target) {\n        low = mid + 1;\n    } else {\n        high = mid - 1;\n    }\n}\nreturn -1;`)}\n\nWhich values of ${ic("arr[mid]")} are compared with the target, in order?`,
      ...options([ic(right.join(", ")), "Each step halves the range; integer division rounds mid down."], [
        [ic(trace(true).join(", ")), "(low + high) / 2 truncates, so mid is rounded down."],
        [ic(linear.join(", ")), "Binary search starts in the middle, not at the front."],
        [ic(right.slice(0, -1).join(", ") || String(a[0])), "Include the final comparison."],
        [ic([...right].reverse().join(", ")), "The first comparison is with the middle element."],
      ]),
      explanation: `low = 0, high = ${n - 1}: the middle elements checked are ${right.join(", ")}${a.includes(target) ? `, and ${target} is found` : `, after which low passes high and -1 is returned`}.`,
    };
  }),
  t("csa-sort-passes", 4, ["sorting-algorithms"], 3, (r) => {
    const a = distinct(r, r.int(5, 6), 1, 20);
    const k = r.int(1, 3);
    const sel = r.next() < 0.5;
    const right = sel ? selectionPasses(a, k) : insertionPasses(a, k);
    const name = sel ? "selection sort" : "insertion sort";
    return {
      stem: `The array ${ic(init(a))} is sorted into ascending order using ${name}. What are the contents of the array after ${k} ${k === 1 ? "pass" : "passes"} of the outer loop?`,
      ...options([ic(init(right)), sel ? `After ${k} passes, the ${k} smallest values are in place at the front.` : `After ${k} passes, the first ${k + 1} elements are sorted among themselves.`], [
        [ic(init(sel ? insertionPasses(a, k) : selectionPasses(a, k))), `That is the result of ${sel ? "insertion" : "selection"} sort.`],
        [ic(init(sel ? selectionPasses(a, k + 1) : insertionPasses(a, k + 1))), `That is one pass too many.`],
        [ic(init(sel ? selectionPasses(a, k - 1) : insertionPasses(a, k - 1))), "That is one pass too few."],
        [ic(init([...a].sort((x, y) => x - y))), "The array is not fully sorted yet."],
      ]),
      explanation: sel
        ? `Each pass of selection sort swaps the smallest remaining value into the next position. After ${k}: ${init(right)}.`
        : `Each pass of insertion sort inserts the next element into the sorted front part. After ${k}: ${init(right)}.`,
    };
  }),
  t("csa-recursion-value", 4, ["recursion"], 3, (r) => {
    const v = r.int(0, 2);
    const A = r.int(2, 3);
    const B = r.int(1, 3);
    const n = r.int(4, 6);
    const forms: [string, (n: number) => number][] = [
      [`if (n <= 1) {\n        return ${B};\n    }\n    return ${A} * f(n - 1) + n;`, (x) => {
        let res = B;
        for (let i = 2; i <= x; i++) res = A * res + i;
        return res;
      }],
      [`if (n <= 1) {\n        return 1;\n    }\n    return n + f(n - 2);`, (x) => {
        let s = 0;
        let i = x;
        while (i > 1) {
          s += i;
          i -= 2;
        }
        return s + 1;
      }],
      [`if (n == 0) {\n        return ${B};\n    }\n    return ${A} * f(n - 1);`, (x) => B * A ** x],
    ];
    const [body, f] = forms[v]!;
    const right = f(n);
    return {
      stem: `Consider the following method.\n\n${java(`public static int f(int n) {\n    ${body}\n}`)}\n\nWhat value is returned by ${ic(`f(${n})`)}?`,
      ...options([ic(right), "Work down to the base case, then build the result back up."], [
        [ic(f(n - 1)), `That is f(${n - 1}).`],
        [ic(f(n + 1)), `That is f(${n + 1}).`],
        [ic(right + n), "Each call's own work is done once."],
        [ic(right - 1), "Recheck the base case value."],
      ]),
      explanation: `Expanding the calls down to the base case and substituting back gives f(${n}) = ${right}.`,
    };
  }),
  t("csa-recursion-print", 4, ["recursion"], 3, (r) => {
    const n = r.int(1000, 98765);
    const after = r.next() < 0.5;
    const digits = String(n);
    const right = after ? digits : digits.split("").reverse().join("");
    return {
      stem: `Consider the following method.\n\n${java(after ? `public static void show(int n) {\n    if (n > 0) {\n        show(n / 10);\n        System.out.print(n % 10);\n    }\n}` : `public static void show(int n) {\n    if (n > 0) {\n        System.out.print(n % 10);\n        show(n / 10);\n    }\n}`)}\n\nWhat is printed by the call ${ic(`show(${n})`)}?`,
      ...options([ic(right), after ? "The print happens after the recursive call returns, so the first digit prints first." : "The last digit prints first, then the recursion handles the rest."], [
        [ic(after ? digits.split("").reverse().join("") : digits), after ? "Each print waits until the deeper call finishes." : "The print comes before the recursive call."],
        [ic(after ? digits.slice(1) : right.slice(0, -1)), "The recursion continues until n is 0, so every digit prints."],
        [ic(after ? digits + "0" : right + "0"), "When n is 0, nothing is printed."],
      ]),
      explanation: after ? `The calls go down to show(0) first; the prints then happen in order from the first digit: ${right}.` : `Each call prints n % 10 (the last digit) before recursing: ${right}.`,
    };
  }),
  t("csa-string-recursion", 4, ["recursion"], 4, (r) => {
    const s = r.pick(WORDS).slice(0, r.int(4, 6));
    const v = r.int(0, 1);
    const evens = (x: string): string => (x.length < 2 ? x : x[0]! + evens(x.substring(2)));
    const right = v === 0 ? s.split("").reverse().join("") : evens(s);
    const code = v === 0
      ? `public static String mystery(String s) {\n    if (s.length() <= 1) {\n        return s;\n    }\n    return mystery(s.substring(1)) + s.substring(0, 1);\n}`
      : `public static String mystery(String s) {\n    if (s.length() < 2) {\n        return s;\n    }\n    return s.substring(0, 1) + mystery(s.substring(2));\n}`;
    return {
      stem: `Consider the following method.\n\n${java(code)}\n\nWhat is returned by ${ic(`mystery("${s}")`)}?`,
      ...options([ic(`"${right}"`), v === 0 ? "Each call puts the first character after the result for the rest: the string is reversed." : "Each call keeps the first character and skips the next one."], v === 0
        ? [
            [ic(`"${s}"`), "The first character is added at the end, not the front."],
            [ic(`"${s.slice(1).split("").reverse().join("")}"`), "The first character is also included."],
            [ic(`"${s[0]}"`), "The result is built from every recursive call."],
          ]
        : [
            [ic(`"${s.split("").filter((_, i) => i % 2 === 1).join("")}"`), "Each call keeps the character at index 0."],
            [ic(`"${s}"`), "substring(2) skips a character each time."],
            [ic(`"${evens(s).slice(0, -1) || s[1]}"`), "The base case returns the remaining character."],
          ]),
      explanation: `Expanding the calls for "${s}" gives "${right}".`,
    };
  }),
  t("csa-search-efficiency", 4, ["searching-algorithms", "recursive-searching-and-sorting"], 3, (r) => {
    const n = r.pick([20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]) + r.int(0, 9);
    const bin = Math.floor(Math.log2(n)) + 1;
    return {
      stem: `A sorted array contains ${n} elements. What is the maximum number of elements that binary search examines to find a target or determine that it is not present?`,
      ordered: true,
      ...options([ic(bin), `Each comparison halves the range; ${n} can be halved about ${bin - 1} times before one element remains.`], [
        [ic(n), "That is the worst case for linear search."],
        [ic(Math.ceil(n / 2)), "Binary search halves the range at each step, not just once."],
        [ic(bin + 4), `2 to the power ${bin} is ${2 ** bin}, which is already more than ${n}.`],
      ]),
      explanation: `Binary search needs about log₂(${n}) + 1 = ${bin} comparisons in the worst case, far fewer than the ${n} of linear search.`,
    };
  }, ["4"]),
  t("csa-merge-sort", 4, ["recursive-searching-and-sorting"], 3, (r) => {
    const a = distinct(r, 4, 1, 30);
    const b = distinct(r, 4, 1, 30).filter((x) => !a.includes(x));
    if (b.length < 3) throw new Retry();
    const L = a.sort((x, y) => x - y);
    const R = b.slice(0, 3).sort((x, y) => x - y);
    const merged = [...L, ...R].sort((x, y) => x - y);
    const k = r.int(3, 5);
    return {
      stem: `During merge sort, the sorted halves ${ic(init(L))} and ${ic(init(R))} are merged. What are the first ${k} values placed into the merged array, in order?`,
      ...options([ic(merged.slice(0, k).join(", ")), "Merging repeatedly takes the smaller of the two front elements."], [
        [ic([...L, ...R].slice(0, k).join(", ")), "Merging interleaves the halves; it does not copy the left half first."],
        [ic(L.flatMap((x, i) => (R[i] !== undefined ? [x, R[i]!] : [x])).slice(0, k).join(", ")), "Merging compares values; it does not alternate between halves."],
        [ic([...merged].reverse().slice(0, k).join(", ")), "The merged array is in ascending order."],
      ]),
      explanation: `Compare the front elements of each half and take the smaller each time: ${merged.join(", ")}.`,
    };
  }),
  t("csa-file-reading", 4, ["text-files"], 3, (r) => {
    const before = ints(r, r.int(2, 4), 1, 20);
    const after = ints(r, r.int(1, 3), 1, 20);
    const word = r.pick(["stop", "end", "x", "done"]);
    const s1 = before.reduce((a, b) => a + b, 0);
    return {
      stem: `A text file contains the following tokens, separated by spaces.\n\n${java([...before, word, ...after].join(" "))}\n\nWhat is printed by this code segment, where ${ic("in")} is a ${ic("Scanner")} reading the file?\n\n${java(`int sum = 0;\nwhile (in.hasNextInt()) {\n    sum += in.nextInt();\n}\nSystem.out.println(sum);`)}`,
      ...options([ic(s1), `hasNextInt() is false at "${word}", so the loop stops there.`], [
        [ic(s1 + after.reduce((a, b) => a + b, 0)), "The loop stops at the first token that is not an int."],
        [ic(before.length), "sum adds the values, not one per value."],
        [ic(s1 - before[before.length - 1]!), "The last int before the word is also read."],
      ]),
      explanation: `The loop adds ${before.join(" + ")} = ${s1}, then hasNextInt() returns false at "${word}".`,
    };
  }, ["2", "4"]),
  t("csa-data-ethics", 4, ["ethics-of-data-collection", "using-data-sets"], 2, (r) => {
    const q = r.pick(ETHICS);
    return {
      stem: q.stem,
      ...options(q.right, q.wrong),
      explanation: q.right[1],
    };
  }, ["1"]),
];
