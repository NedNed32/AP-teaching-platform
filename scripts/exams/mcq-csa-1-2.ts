/* AP Computer Science A multiple choice, Units 1 and 2: Java code tracing with computed answers. */
import { ic, idiv, java, jd, options, tracePrompt, WORDS } from "./csa-lib";
import type { Rng } from "./lib";
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

export const csaUnit1: McqTemplate[] = [
  t("csa-int-div-mod", 1, ["expressions-and-output"], 1, (r) => {
    const b = r.int(3, 9);
    const a = r.int(17, 70);
    if (a % b === 0) throw new Retry();
    const q = idiv(a, b);
    const m = a % b;
    const ans = q + m;
    return {
      stem: tracePrompt(`int a = ${a};\nint b = ${b};\nSystem.out.println(a / b + a % b);`),
      ...options([ic(ans), `${a} / ${b} is ${q} (integer division) and ${a} % ${b} is ${m}.`], [
        [ic(`${q}${m}`), "The + is between two ints, so it adds; it does not concatenate."],
        [ic(Math.round(a / b) + m), "Integer division truncates; it does not round."],
        [ic(q), "The remainder is added as well."],
        [ic(jd(a / b + m)), "Both operands are ints, so a / b is an int."],
        [ic(m + b), "a % b is the remainder, not the remainder plus the divisor."],
      ]),
      explanation: `With two int operands, ${ic("/")} gives the truncated quotient ${q} and ${ic("%")} gives the remainder ${m}, so the sum is ${ans}.`,
    };
  }),
  t("csa-casting-average", 1, ["casting-and-range"], 2, (r) => {
    const count = r.pick([2, 4, 5, 8]);
    const total = r.int(40, 99);
    if (total % count === 0) throw new Retry();
    const trunc = idiv(total, count);
    const exact = total / count;
    return {
      stem: tracePrompt(`int total = ${total};\nint count = ${count};\ndouble avg1 = total / count;\ndouble avg2 = (double) total / count;\nSystem.out.println(avg1 + " " + avg2);`),
      ...options([ic(`${jd(trunc)} ${jd(exact)}`), "avg1 divides two ints before converting; avg2 casts first."], [
        [ic(`${jd(exact)} ${jd(exact)}`), "In avg1 the division happens between two ints, so the decimal part is lost before the result is stored."],
        [ic(`${jd(trunc)} ${jd(trunc)}`), "The cast in avg2 applies to total before dividing, so the division is done with doubles."],
        [ic(`${trunc} ${jd(exact)}`), "avg1 is a double, so it prints with a decimal point."],
        [ic(`${jd(exact)} ${jd(trunc)}`), "The two results are reversed."],
      ]),
      explanation: `${ic("total / count")} is integer division (${trunc}), then widened to ${jd(trunc)}. ${ic("(double) total / count")} casts first, giving ${jd(exact)}.`,
    };
  }),
  t("csa-compound-assignment", 1, ["compound-assignment"], 2, (r) => {
    const ops = r.sample(["+=", "-=", "*=", "/=", "%="], 4);
    let x = r.int(5, 20);
    const start = x;
    const vals = ops.map((op) => (op === "*=" ? r.int(2, 4) : op === "/=" || op === "%=" ? r.int(2, 5) : r.int(1, 9)));
    const run = (o: string[], v: number[], real = false, stop = o.length) => {
      let y = start;
      for (let i = 0; i < stop; i++) {
        const k = v[i]!;
        if (o[i] === "+=") y += k;
        else if (o[i] === "-=") y -= k;
        else if (o[i] === "*=") y *= k;
        else if (o[i] === "/=") y = real ? y / k : idiv(y, k);
        else y %= k;
      }
      return y;
    };
    x = run(ops, vals);
    const lines = ops.map((op, i) => `x ${op} ${vals[i]};`).join("\n");
    const realRes = run(ops, vals, true);
    return {
      stem: tracePrompt(`int x = ${start};\n${lines}\nSystem.out.println(x);`),
      ...options([ic(x), "Apply each statement in order, using integer division."], [
        ...(Number.isInteger(realRes) ? [] : [[ic(Math.round(realRes * 100) / 100), "x is an int, so /= truncates."] as [string, string]]),
        [ic(run(ops, vals, false, 3)), "Every statement runs, including the last one."],
        [ic(run([...ops].reverse(), [...vals].reverse())), "The statements run from top to bottom."],
        [ic(run(ops.map((o) => (o === "%=" ? "/=" : o === "/=" ? "%=" : o)), vals)), "/= keeps the quotient and %= keeps the remainder."],
        [ic(x + 1), "Recheck each step."],
      ]),
      explanation: `Starting from ${start}, the statements give ${ops.map((_, i) => run(ops, vals, false, i + 1)).join(", ")}.`,
    };
  }),
  t("csa-substring", 1, ["string-manipulation"], 2, (r) => {
    const s = r.pick(WORDS);
    const a = r.int(0, 3);
    const b = r.int(a + 2, s.length - 1);
    const sub = s.substring(a, b);
    return {
      stem: tracePrompt(`String s = "${s}";\nString t = s.substring(${a}, ${b});\nSystem.out.println(t + t.length());`),
      ...options([ic(sub + sub.length), `substring(${a}, ${b}) takes indexes ${a} through ${b - 1}.`], [
        [ic(s.substring(a, b + 1) + (b - a + 1)), "The end index is exclusive."],
        [ic(s.substring(a + 1, b + 1) + (b - a)), "Indexes start at 0, not 1."],
        [ic(s.substring(a, b) + (b - a + 1)), "The length of t is end minus start."],
        [ic(s.substring(a) + (s.length - a)), "The second argument limits where the substring ends."],
      ]),
      explanation: `Indexes ${a} to ${b - 1} of "${s}" give "${sub}", whose length is ${sub.length}.`,
    };
  }),
  t("csa-indexof", 1, ["string-manipulation", "calling-instance-methods"], 2, (r) => {
    const s = r.pick(WORDS);
    const i = r.int(1, s.length - 3);
    const ch = s[i]!;
    const first = s.indexOf(ch);
    const last = s.lastIndexOf(ch);
    return {
      stem: tracePrompt(`String s = "${s}";\nint i = s.indexOf("${ch}");\nSystem.out.println(s.substring(i + 1) + i);`),
      ...options([ic(s.substring(first + 1) + first), `indexOf returns the first position of "${ch}", which is ${first}.`], [
        [ic(s.substring(first + 2) + (first + 1)), "indexOf counts from 0."],
        [ic(s.substring(first) + first), "substring(i + 1) starts after the found letter."],
        [ic(s.substring(last + 1) + last), "indexOf finds the first occurrence, not the last."],
        [ic(s.substring(first + 1) + (first + 1)), "i itself is printed, not i + 1."],
      ]),
      explanation: `"${ch}" first appears at index ${first}, so the substring from ${first + 1} is "${s.substring(first + 1)}" and ${first} is appended.`,
    };
  }),
  t("csa-concatenation", 1, ["expressions-and-output"], 2, (r) => {
    const a = r.int(2, 9);
    const b = r.int(2, 9);
    const w = r.pick(["AP", "CS", "Hi", "Java"]);
    const v = r.int(0, 1);
    const code = v === 0 ? `a + b + "${w}" + a + b` : `"${w}" + a + b + (a + b)`;
    const ans = v === 0 ? `${a + b}${w}${a}${b}` : `${w}${a}${b}${a + b}`;
    return {
      stem: tracePrompt(`int a = ${a};\nint b = ${b};\nSystem.out.println(${code});`),
      ...options([ic(ans), "+ is evaluated left to right; once a String is involved it concatenates."], v === 0
        ? [
            [ic(`${a}${b}${w}${a}${b}`), "Before the String appears, a + b is integer addition."],
            [ic(`${a + b}${w}${a + b}`), "After the String, a and b are concatenated one at a time."],
            [ic(`${a}${b}${w}${a + b}`), "Evaluation goes left to right: add first, then concatenate."],
          ]
        : [
            [ic(`${w}${a + b}${a + b}`), "After the String, a and b are concatenated separately."],
            [ic(`${w}${a}${b}${a}${b}`), "The parentheses make (a + b) an integer addition."],
            [ic(`${w}${a + b}${a}${b}`), "Evaluation goes left to right."],
          ]),
      explanation: "Java evaluates + left to right. Two ints add; a String and anything concatenate.",
    };
  }),
  t("csa-random-range", 1, ["math-class"], 2, (r) => {
    const n = r.int(5, 20);
    const k = r.int(-5, 10);
    if (r.next() < 0.5) {
      return {
        stem: tracePrompt(`int x = (int) (Math.random() * ${n}) + ${k};`, "Which of the following describes all possible values of x?"),
        ...options([`All integers from ${k} to ${k + n - 1}, inclusive`, `Math.random() * ${n} is in [0, ${n}); truncating gives 0 to ${n - 1}, then ${k} is added.`], [
          [`All integers from ${k} to ${k + n}, inclusive`, `Math.random() never returns 1, so the product is always less than ${n}.`],
          [`All integers from ${k + 1} to ${k + n}, inclusive`, "The truncated value can be 0."],
          [`All integers from 0 to ${n - 1}, inclusive`, `${k} is added after the cast.`],
          [`All integers from ${k} to ${k + n - 2}, inclusive`, `The largest truncated value is ${n - 1}.`],
        ]),
        explanation: `${ic(`(int) (Math.random() * ${n})`)} is an integer from 0 to ${n - 1}; adding ${k} gives ${k} to ${k + n - 1}.`,
      };
    }
    const lo = r.int(1, 20);
    const hi = lo + r.int(4, 30);
    const span = hi - lo + 1;
    return {
      stem: `Which expression produces a random integer from ${lo} to ${hi}, inclusive?`,
      ...options([ic(`(int) (Math.random() * ${span}) + ${lo}`), `There are ${span} possible values, starting at ${lo}.`], [
        [ic(`(int) (Math.random() * ${span - 1}) + ${lo}`), `This never produces ${hi}.`],
        [ic(`(int) Math.random() * ${span} + ${lo}`), `The cast applies to Math.random() alone, which becomes 0, so this is always ${lo}.`],
        [ic(`(int) (Math.random() * ${hi}) + ${lo}`), `This can produce values above ${hi}.`],
      ]),
      explanation: `To get ${span} values starting at ${lo}, multiply by ${span}, cast to int, then add ${lo}.`,
    };
  }),
  t("csa-nested-static-call", 1, ["calling-class-methods", "method-signatures"], 2, (r) => {
    const A = r.int(2, 4);
    const B = r.int(1, 6);
    const k = r.int(2, 5);
    const f = (x: number) => x * A - B;
    return {
      stem: `Consider the following method.\n\n${java(`public static int f(int x) {\n    return x * ${A} - ${B};\n}`)}\n\nWhat value is returned by the call ${ic(`f(f(${k}))`)}?`,
      ...options([ic(f(f(k))), `f(${k}) is ${f(k)}, and f(${f(k)}) is ${f(f(k))}.`], [
        [ic(f(k)), "The outer call uses the result of the inner call."],
        [ic(f(k) * A), "The outer call also subtracts."],
        [ic(k * A * A - B), "The inner call subtracts before the outer call multiplies."],
        [ic(f(k) + f(k)), "f is applied to its own result, not added to it."],
      ]),
      explanation: `Evaluate the inner call first: f(${k}) = ${f(k)}. Then f(${f(k)}) = ${f(f(k))}.`,
    };
  }),
  t("csa-math-sqrt", 1, ["math-class", "casting-and-range"], 2, (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20]] as const);
    const cast = r.next() < 0.5;
    const expr = `Math.sqrt(Math.pow(${a}, 2) + Math.pow(${b}, 2))`;
    const right = cast ? String(c) : jd(c);
    return {
      stem: tracePrompt(cast ? `int d = (int) ${expr};\nSystem.out.println(d);` : `double d = ${expr};\nSystem.out.println(d);`),
      ...options([ic(right), `${a * a} + ${b * b} = ${c * c}, whose square root is ${c}.`], [
        [ic(cast ? jd(c) : String(c)), cast ? "d is an int, so it prints without a decimal point." : "Math.sqrt returns a double, so it prints with a decimal point."],
        [ic(cast ? String(a + b) : jd(a + b)), "The square root of a sum is not the sum of the square roots."],
        [ic(cast ? String(c * c) : jd(c * c)), "Math.sqrt is applied to the sum."],
      ]),
      explanation: `Math.pow gives ${a * a} and ${b * b}; their sum is ${c * c} and its square root is ${c}.`,
    };
  }),
  t("csa-string-immutable", 1, ["objects-instances-of-classes", "string-manipulation"], 2, (r) => {
    const w = r.pick(WORDS);
    const v = r.int(0, 1);
    const code = v === 0
      ? `String a = "${w}";\nString b = a;\na = a + "!";\nb.toUpperCase();\nSystem.out.println(a + " " + b);`
      : `String a = "${w}";\na.substring(2);\nString b = a.toUpperCase();\nSystem.out.println(a + " " + b);`;
    const right = v === 0 ? `${w}! ${w}` : `${w} ${w.toUpperCase()}`;
    return {
      stem: tracePrompt(code),
      ...options([ic(right), "Strings are immutable; calling a method without storing its result changes nothing."], v === 0
        ? [
            [ic(`${w}! ${w.toUpperCase()}`), "toUpperCase returns a new String; b is not changed because the result is not stored."],
            [ic(`${w}! ${w}!`), "a now refers to a new String; b still refers to the original."],
            [ic(`${w} ${w}`), "a is reassigned to the new String."],
          ]
        : [
            [ic(`${w.substring(2)} ${w.toUpperCase()}`), "The substring result is not stored, so a is unchanged."],
            [ic(`${w.toUpperCase()} ${w.toUpperCase()}`), "toUpperCase does not change a; it returns a new String."],
            [ic(`${w} ${w}`), "b stores the returned uppercase String."],
          ]),
      explanation: "String methods return new Strings. Unless the result is assigned, the original variable is unchanged.",
    };
  }),
];

/** The four (x, y) choices, exactly one satisfying the condition. */
function pairsFor(r: Rng, test: (x: number, y: number) => boolean) {
  const yes: [number, number][] = [];
  const no: [number, number][] = [];
  for (let i = 0; i < 200 && (yes.length < 1 || no.length < 3); i++) {
    const p: [number, number] = [r.int(0, 12), r.int(0, 12)];
    if ([...yes, ...no].some((q) => q[0] === p[0] && q[1] === p[1])) continue;
    if (test(p[0], p[1])) {
      if (yes.length < 1) yes.push(p);
    } else if (no.length < 3) no.push(p);
  }
  if (yes.length < 1 || no.length < 3) throw new Retry();
  return { yes: yes[0]!, no };
}

const NEG: Record<string, string> = { ">": "<=", "<": ">=", ">=": "<", "<=": ">", "==": "!=", "!=": "==" };
const STRICT: Record<string, string> = { ">": "<", "<": ">", ">=": "<=", "<=": ">=", "==": "!=", "!=": "==" };

export const csaUnit2: McqTemplate[] = [
  t("csa-while-trace", 2, ["while-loops"], 2, (r) => {
    const start = r.int(30, 80);
    const lim = r.int(0, 10);
    const step = r.int(4, 9);
    let x = start;
    let count = 0;
    while (x > lim) {
      x -= step;
      count++;
    }
    return {
      stem: tracePrompt(`int x = ${start};\nint count = 0;\nwhile (x > ${lim}) {\n    x -= ${step};\n    count++;\n}\nSystem.out.println(count + " " + x);`),
      ...options([ic(`${count} ${x}`), `The loop runs ${count} times and stops when x is ${x}.`], [
        [ic(`${count - 1} ${x + step}`), "The loop runs once more: the condition is still true at that point."],
        [ic(`${count} ${x + step}`), "x is decreased inside the loop on the last iteration too."],
        [ic(`${count + 1} ${x - step}`), "The loop stops as soon as x is no longer greater than the limit."],
      ]),
      explanation: `x goes ${start}, ${start - step}, … and the loop ends at x = ${x} after ${count} passes.`,
    };
  }),
  t("csa-for-sum", 2, ["for-loops"], 2, (r) => {
    const s = r.int(0, 3);
    const e = r.int(9, 16);
    const st = r.int(2, 3);
    const le = r.next() < 0.5;
    const sum = (lo: number, hi: number, step: number, incl: boolean) => {
      let tot = 0;
      for (let i = lo; incl ? i <= hi : i < hi; i += step) tot += i;
      return tot;
    };
    const right = sum(s, e, st, le);
    return {
      stem: tracePrompt(`int sum = 0;\nfor (int i = ${s}; i ${le ? "<=" : "<"} ${e}; i += ${st}) {\n    sum += i;\n}\nSystem.out.println(sum);`),
      ...options([ic(right), `i takes the values ${s}, ${s + st}, … while i ${le ? "<=" : "<"} ${e}.`], [
        [ic(sum(s, e, st, !le)), le ? "The condition includes the end value." : "The condition excludes the end value."],
        [ic(right - s), "The first value of i is also added."],
        [ic(sum(s + st, e, st, le)), "The update happens after the body, so the first value is used."],
        [ic(sum(s, e, 1, le)), `i increases by ${st} each time.`],
      ]),
      explanation: `Add every value of i from ${s} in steps of ${st} that satisfies the condition: ${right}.`,
    };
  }),
  t("csa-nested-count", 2, ["nested-iteration"], 3, (r) => {
    const n = r.int(3, 6);
    const m = r.int(3, 6);
    const start = r.pick(["0", "i", "i + 1"]);
    const count = (outerLe: boolean, innerLe: boolean, st = start) => {
      let c = 0;
      for (let i = 0; outerLe ? i <= n : i < n; i++) {
        const j0 = st === "0" ? 0 : st === "i" ? i : i + 1;
        for (let j = j0; innerLe ? j <= m : j < m; j++) c++;
      }
      return c;
    };
    const right = count(false, false);
    return {
      stem: tracePrompt(`int count = 0;\nfor (int i = 0; i < ${n}; i++) {\n    for (int j = ${start}; j < ${m}; j++) {\n        count++;\n    }\n}\nSystem.out.println(count);`),
      ...options([ic(right), "Add the inner-loop counts for each value of i."], [
        [ic(n * m), start === "0" ? "Check the inner loop bounds." : "The inner loop starts at a value that depends on i."],
        [ic(count(false, true)), "The inner condition is j < " + m + ", not j <= " + m + "."],
        [ic(count(true, false)), "The outer loop runs " + n + " times."],
        [ic(count(false, false, start === "i" ? "i + 1" : "i")), "Read the inner loop's starting value carefully."],
      ]),
      explanation: `For each i from 0 to ${n - 1}, the inner loop runs from ${start} up to ${m - 1}. The total is ${right}.`,
    };
  }, ["2", "4"]),
  t("csa-boolean-values", 2, ["compound-boolean-expressions", "boolean-expressions"], 2, (r) => {
    const A = r.int(2, 9);
    const B = r.int(3, 10);
    const forms: [string, (x: number, y: number) => boolean][] = [
      [`(x > ${A} && y < ${B}) || x == y`, (x, y) => (x > A && y < B) || x === y],
      [`!(x < ${A} || y >= ${B})`, (x, y) => !(x < A || y >= B)],
      [`x % 2 == 0 && (y > ${A} || x > ${B})`, (x, y) => x % 2 === 0 && (y > A || x > B)],
      [`(x + y > ${A + B}) && !(x > y)`, (x, y) => x + y > A + B && !(x > y)],
    ];
    const [expr, test] = r.pick(forms);
    const { yes, no } = pairsFor(r, test);
    const fmt = (p: [number, number]) => ic(`x = ${p[0]}, y = ${p[1]}`);
    return {
      stem: `Consider the following Boolean expression.\n\n${java(expr)}\n\nFor which of the following values is the expression ${ic("true")}?`,
      correct: { text: fmt(yes), why: "Correct. Substituting these values makes the whole expression true." },
      wrong: no.map((p) => ({ text: fmt(p), why: "Substitute and evaluate each part: this pair makes the expression false." })),
      explanation: `With x = ${yes[0]} and y = ${yes[1]}, evaluating ${ic(expr)} step by step gives true; each other pair gives false.`,
    };
  }),
  t("csa-de-morgan", 2, ["comparing-boolean-expressions"], 3, (r) => {
    const X = r.int(1, 20);
    const Y = r.int(1, 20);
    const op1 = r.pick([">", "<", ">=", "<="]);
    const op2 = r.pick([">", "<", "==", "!="]);
    const and = r.next() < 0.5;
    const c = and ? "&&" : "||";
    const d = and ? "||" : "&&";
    return {
      stem: `Which of the following is equivalent to ${ic(`!(a ${op1} ${X} ${c} b ${op2} ${Y})`)} for all int values of a and b?`,
      ...options([ic(`a ${NEG[op1]} ${X} ${d} b ${NEG[op2]} ${Y}`), "De Morgan's law: negate each comparison and switch && and ||."], [
        [ic(`a ${NEG[op1]} ${X} ${c} b ${NEG[op2]} ${Y}`), `Negating also switches ${c} to ${d}.`],
        [ic(`a ${STRICT[op1]} ${X} ${d} b ${STRICT[op2]} ${Y}`), "The negation of > is <=, not < (and similarly for the others)."],
        [ic(`a ${op1} ${X} ${d} b ${op2} ${Y}`), "Each comparison must be negated too."],
      ]),
      explanation: `By De Morgan's law, !(P ${c} Q) is !P ${d} !Q. Negating ${ic(`a ${op1} ${X}`)} gives ${ic(`a ${NEG[op1]} ${X}`)}, and ${ic(`b ${op2} ${Y}`)} gives ${ic(`b ${NEG[op2]} ${Y}`)}.`,
    };
  }, ["2", "3"]),
  t("csa-if-chain", 2, ["if-statements", "nested-if-statements"], 3, (r) => {
    const C = r.int(10, 30);
    const B = C + r.int(10, 25);
    const A = B + r.int(10, 25);
    const n = r.int(0, 100);
    // Actual code: separate if, then an if / else if / else chain.
    let res = "";
    if (n > A) res += "X";
    if (n > B) res += "Y";
    else if (n > C) res += "Z";
    else res += "W";
    const chain = n > A ? "X" : n > B ? "Y" : n > C ? "Z" : "W";
    let indep = "";
    if (n > A) indep += "X";
    if (n > B) indep += "Y";
    if (n > C) indep += "Z";
    if (!indep) indep = "W";
    return {
      stem: tracePrompt(`int n = ${n};\nString r = "";\nif (n > ${A}) {\n    r += "X";\n}\nif (n > ${B}) {\n    r += "Y";\n} else if (n > ${C}) {\n    r += "Z";\n} else {\n    r += "W";\n}\nSystem.out.println(r);`),
      ...options([ic(res), "The first if is separate; the second statement is a chain where only one branch runs."], [
        [ic(chain), "The first if is not part of the else-if chain, so the chain still runs."],
        [ic(indep), "In an if / else if chain, only the first true branch runs."],
        ...["XY", "XZ", "Y", "Z", "W", "XW", "YZ"].map((s) => [ic(s), "Trace each condition with n = " + n + "."] as [string, string]),
      ]),
      explanation: `n = ${n}: the first if ${n > A ? "adds X" : "adds nothing"}; in the chain ${n > B ? "n > " + B + " adds Y" : n > C ? "n > " + C + " adds Z" : "the else adds W"}.`,
    };
  }),
  t("csa-string-loop", 2, ["string-algorithms"], 2, (r) => {
    const s = r.pick(WORDS);
    const step = r.int(2, 3);
    const rev = r.next() < 0.4;
    const start = rev ? s.length - 1 : r.int(0, 1);
    const run = (st: number, k: number, back: boolean) => {
      let out = "";
      if (back) for (let i = st; i >= 0; i -= k) out += s[i];
      else for (let i = st; i < s.length; i += k) out += s[i];
      return out;
    };
    const right = run(start, step, rev);
    const code = rev
      ? `String s = "${s}";\nString result = "";\nfor (int i = s.length() - 1; i >= 0; i -= ${step}) {\n    result += s.substring(i, i + 1);\n}\nSystem.out.println(result);`
      : `String s = "${s}";\nString result = "";\nfor (int i = ${start}; i < s.length(); i += ${step}) {\n    result += s.substring(i, i + 1);\n}\nSystem.out.println(result);`;
    return {
      stem: tracePrompt(code),
      ...options([ic(right), "Collect the characters at the visited indexes, in order."], [
        [ic(rev ? run(s.length - 2, step, true) : run(1 - start, step, false)), "Check the starting index."],
        [ic(rev ? run(s.length - 1, step + 1, true) : run(start, step + 1, false)), `i changes by ${step} each time.`],
        [ic(right.split("").reverse().join("")), "Characters are appended in the order they are visited."],
        [ic(rev ? run(s.length - 1, step - 1, true) : run(start, step - 1, false)), "Recheck the step size."],
      ]),
      explanation: `The loop visits indexes ${rev ? `from ${s.length - 1} down` : `from ${start} up`} in steps of ${step} and appends each character: "${right}".`,
    };
  }),
  t("csa-digit-loop", 2, ["selection-iteration-algorithms", "while-loops"], 3, (r) => {
    const n = r.int(102, 9876);
    const digits = String(n).split("").map(Number);
    if (digits.includes(0) && r.next() < 0.5) throw new Retry();
    const sumV = r.next() < 0.5;
    const right = sumV ? digits.reduce((a, b) => a + b, 0) : Number(String(n).split("").reverse().join(""));
    const code = sumV
      ? `int n = ${n};\nint result = 0;\nwhile (n > 0) {\n    result += n % 10;\n    n /= 10;\n}\nSystem.out.println(result);`
      : `int n = ${n};\nint result = 0;\nwhile (n > 0) {\n    result = result * 10 + n % 10;\n    n /= 10;\n}\nSystem.out.println(result);`;
    return {
      stem: tracePrompt(code),
      ...options([ic(right), sumV ? "Each pass adds the last digit, then removes it." : "Each pass moves the last digit of n onto the end of result."], sumV
        ? [
            [ic(right - digits[0]!), "The loop also runs when n is a single digit."],
            [ic(digits.length), "result adds the digits, not 1 per pass."],
            [ic(right - digits[digits.length - 1]!), "The last digit is added on the first pass."],
            [ic(right + 1), "Recheck the sum of the digits."],
          ]
        : [
            [ic(n), "The digits come off the end of n, so they appear in reverse."],
            [ic(Number(String(n).slice(1).split("").reverse().join(""))), "The loop runs until n is 0, including the first digit."],
            [ic(digits.reduce((a, b) => a + b, 0)), "result is multiplied by 10 each time, building a number."],
          ]),
      explanation: sumV ? `The digits of ${n} add to ${right}.` : `Reading the digits of ${n} from the right gives ${right}.`,
    };
  }),
  t("csa-loop-count", 2, ["run-time-analysis", "nested-iteration"], 3, (r) => {
    const n = r.int(5, 12);
    const forms: [string, (n: number) => number][] = [
      [`for (int j = 1; j <= i; j++)`, (n) => (n * (n + 1)) / 2],
      [`for (int j = 1; j < i; j++)`, (n) => (n * (n - 1)) / 2],
      [`for (int j = 1; j <= ${n}; j++)`, (n) => n * n],
      [`for (int j = 1; j < ${n}; j *= 2)`, (n) => n * Math.ceil(Math.log2(n))],
    ];
    const idx = r.int(0, forms.length - 1);
    const [inner] = forms[idx]!;
    // Count by simulation to be safe.
    let c = 0;
    for (let i = 1; i <= n; i++) {
      if (idx === 0) for (let j = 1; j <= i; j++) c++;
      else if (idx === 1) for (let j = 1; j < i; j++) c++;
      else if (idx === 2) for (let j = 1; j <= n; j++) c++;
      else for (let j = 1; j < n; j *= 2) c++;
    }
    const cands = forms.filter((_, i) => i !== idx).map(([code, f]) => [ic(f(n)), `That count belongs to the inner loop ${ic(code)}.`] as [string, string]);
    return {
      stem: tracePrompt(`int count = 0;\nfor (int i = 1; i <= ${n}; i++) {\n    ${inner} {\n        count++;\n    }\n}`, `How many times is ${ic("count++")} executed?`),
      ...options([ic(c), "Add the inner-loop executions for each value of i."], [...cands, [ic(c + n), "Count the inner loop only."], [ic(n), "The statement is inside the inner loop."]]),
      explanation: `Summing the inner loop's executions over i = 1 to ${n} gives ${c}.`,
    };
  }, ["2", "4"]),
];
