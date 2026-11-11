/* AP Computer Science Principles multiple choice: AP pseudocode, data and networks (computed answers). */
import { distinct, ic, ints, options } from "./csa-lib";
import { Retry, type McqTemplate } from "./types";

/** A block of AP exam pseudocode. */
export const pseudo = (src: string) => "```text\n" + src.replace(/^\n+|\s+$/g, "") + "\n```";
const trace = (code: string, q = "What is displayed as a result of running the code segment?") => `Consider the following code segment.\n\n${pseudo(code)}\n\n${q}`;
const plist = (a: readonly (number | string)[]) => `[${a.join(", ")}]`;

const t = (key: string, unit: number, topics: string[], difficulty: number, gen: McqTemplate["gen"], skills = ["4"]): McqTemplate => ({
  key,
  unit,
  topics,
  skills,
  difficulty,
  calc: false,
  gen,
});

/* ---------------- Big Idea 1 ---------------- */

export const cspDebugging: McqTemplate[] = [
  t("csp-fix-count", 1, ["identifying-and-correcting-errors"], 3, (r) => {
    const k = r.int(5, 20);
    const list = r.shuffle([...ints(r, 4, 1, 30), k]);
    const right = list.filter((x) => x > k).length;
    const shown = list.filter((x) => x >= k).length;
    return {
      stem: `The following code segment is intended to display the number of elements in ${ic("nums")} that are greater than ${k}.\n\n${pseudo(`count ← 0\nFOR EACH n IN nums\n{\n   IF (n ≥ ${k})\n   {\n      count ← count + 1\n   }\n}\nDISPLAY (count)`)}\n\nWhen ${ic("nums")} is ${ic(plist(list))}, the code displays ${shown} instead of ${right}. Which change corrects the error?`,
      ...options([`Change ${ic(`n ≥ ${k}`)} to ${ic(`n > ${k}`)}`, `The value ${k} itself is counted but should not be.`], [
        [`Change ${ic("count ← 0")} to ${ic("count ← 1")}`, "That would add 1 to every result."],
        [`Change ${ic(`n ≥ ${k}`)} to ${ic(`n ≤ ${k}`)}`, "That counts the small values instead."],
        [`Move ${ic("DISPLAY (count)")} inside the loop`, "That displays partial counts but does not fix the comparison."],
      ]),
      explanation: `The list contains ${k}, which ≥ counts but > does not. Using a strict comparison gives ${right}.`,
    };
  }, ["1", "4"]),
  t("csp-reset-in-loop", 1, ["identifying-and-correcting-errors"], 3, (r) => {
    const list = ints(r, 4, 2, 20);
    const last = list[list.length - 1]!;
    const sum = list.reduce((a, b) => a + b, 0);
    return {
      stem: `The following code segment is intended to display the sum of the values in ${ic("nums")}.\n\n${pseudo(`FOR EACH n IN nums\n{\n   total ← 0\n   total ← total + n\n}\nDISPLAY (total)`)}\n\nWhat is displayed when ${ic("nums")} is ${ic(plist(list))}, and why?`,
      ...options([`${last}, because total is reset to 0 on every pass`, "The reset inside the loop discards the earlier values."], [
        [`${sum}, because every value is added`, "total is set back to 0 before each addition."],
        [`0, because total is reset after the loop`, "The reset happens before the addition in each pass."],
        [`${list[0]}, because the loop stops after one pass`, "FOR EACH visits every element."],
      ]),
      explanation: `Each pass sets total to 0 and then adds n, so only the last value, ${last}, remains. Moving ${ic("total ← 0")} before the loop fixes it.`,
    };
  }, ["4"]),
  t("csp-test-case", 1, ["identifying-and-correcting-errors", "program-design-and-development"], 3, (r) => {
    const k = r.int(10, 40);
    const good = r.shuffle([k, ...distinct(r, 3, k + 1, k + 30)]);
    const bad1 = distinct(r, 4, k + 1, k + 40);
    const bad2 = distinct(r, 4, 1, k - 1);
    const bad3 = [...distinct(r, 2, 1, k - 1), ...distinct(r, 2, k + 1, k + 40)];
    return {
      stem: `A procedure ${ic("countAbove(list)")} should return how many values in list are greater than ${k}, but the programmer suspects it uses ≥ instead of >. Which test input would reveal this error?`,
      ...options([ic(plist(good)), `It contains ${k}, which ≥ counts but > does not, so the two versions give different results.`], [
        [ic(plist(bad1)), `Every value is above ${k}, so both versions return the same count.`],
        [ic(plist(bad2)), `No value is ${k} or above, so both versions return 0.`],
        [ic(plist(bad3)), `No value equals ${k}, so both versions agree.`],
      ]),
      explanation: `Only an input containing the boundary value ${k} makes ≥ and > behave differently.`,
    };
  }, ["4"]),
];

/* ---------------- Big Idea 2 ---------------- */

const bin = (n: number, width = 8) => n.toString(2).padStart(width, "0");

export const cspData: McqTemplate[] = [
  t("csp-binary-to-decimal", 2, ["binary-numbers"], 2, (r) => {
    const n = r.int(20, 250);
    const b = bin(n);
    const rev = parseInt(b.split("").reverse().join(""), 2);
    const ones = b.split("").filter((c) => c === "1").length;
    return {
      stem: `What is the decimal value of the binary number ${ic(b)}?`,
      ordered: true,
      ...options([ic(n), "Add the place values of the 1 bits."], [
        [ic(rev), "The rightmost bit is the 1s place, not the leftmost."],
        [ic(n * 2), "The places are 1, 2, 4, …, starting from the rightmost bit."],
        [ic(ones), "Each 1 bit is worth its place value, not 1."],
        [ic(n + 1), "Recheck the place values."],
      ]),
      explanation: `${b} = ${b.split("").map((c, i) => (c === "1" ? 2 ** (7 - i) : 0)).filter(Boolean).join(" + ")} = ${n}.`,
    };
  }),
  t("csp-decimal-to-binary", 2, ["binary-numbers"], 2, (r) => {
    const n = r.int(20, 250);
    const b = bin(n);
    return {
      stem: `Which of the following is the 8-bit binary representation of the decimal number ${n}?`,
      ...options([ic(b), `${n} = ${b.split("").map((c, i) => (c === "1" ? 2 ** (7 - i) : 0)).filter(Boolean).join(" + ")}.`], [
        [ic(b.split("").reverse().join("")), "The bits are in reverse order."],
        [ic(bin((n + 1) % 256)), `That is ${(n + 1) % 256}.`],
        [ic(bin(n ^ 0b10)), `That is ${n ^ 0b10}.`],
        [ic(bin((n * 2) % 256)), `That is ${(n * 2) % 256}.`],
      ]),
      explanation: `Subtract the largest powers of 2 that fit: ${n} = ${b.split("").map((c, i) => (c === "1" ? 2 ** (7 - i) : 0)).filter(Boolean).join(" + ")}, giving ${b}.`,
    };
  }),
  t("csp-bits-needed", 2, ["binary-numbers"], 3, (r) => {
    if (r.next() < 0.5) {
      const count = r.int(20, 900);
      const bits = Math.ceil(Math.log2(count));
      if (2 ** bits === count) throw new Retry();
      const thing = r.pick(["students in a school", "products in a store", "seats in a stadium section", "songs in a library"]);
      return {
        stem: `A system assigns each of ${count} ${thing} a unique ID number stored in binary. What is the minimum number of bits needed for each ID?`,
        ordered: true,
        ...options([ic(bits), `${bits - 1} bits give only ${2 ** (bits - 1)} values, but ${bits} bits give ${2 ** bits}, which is enough.`], [
          [ic(bits - 1), `${bits - 1} bits represent only ${2 ** (bits - 1)} different values.`],
          [ic(bits + 1), "Fewer bits are enough."],
          [ic(Math.ceil(count / 8)), "Each bit doubles the number of values; this divides by 8 instead."],
          [ic(Math.round(count / 2)), "n bits give 2 to the n values, not 2n."],
        ]),
        explanation: `Find the smallest n with 2 to the n at least ${count}: 2^${bits - 1} = ${2 ** (bits - 1)} is too small and 2^${bits} = ${2 ** bits} is enough.`,
      };
    }
    const n = r.int(4, 12);
    return {
      stem: `A program stores whole numbers using ${n} bits, with no sign bit. What is the largest number it can store before an overflow error occurs?`,
      ordered: true,
      ...options([ic(2 ** n - 1), `${n} bits give ${2 ** n} values, from 0 to ${2 ** n - 1}.`], [
        [ic(2 ** n), "The values start at 0, so the largest is one less than the count."],
        [ic(2 ** (n - 1)), "All bits are used for the value."],
        [ic(2 * n), "Each bit doubles the number of values."],
      ]),
      explanation: `With ${n} bits there are 2^${n} = ${2 ** n} patterns, representing 0 through ${2 ** n - 1}.`,
    };
  }),
  t("csp-binary-compare", 2, ["binary-numbers"], 3, (r) => {
    const vals = distinct(r, 4, 9, 60);
    const asBin = r.sample([0, 1, 2, 3], 2);
    const show = (i: number) => (asBin.includes(i) ? `binary ${ic(bin(vals[i]!, 6))}` : `decimal ${ic(vals[i]!)}`);
    const mx = vals.indexOf(Math.max(...vals));
    return {
      stem: "Which of the following numbers is the greatest?",
      correct: { text: show(mx), why: `Correct. Its value is ${vals[mx]}, the largest.` },
      wrong: vals.map((_, i) => i).filter((i) => i !== mx).map((i) => ({ text: show(i), why: `Its value is ${vals[i]}.` })),
      explanation: `Converting each to decimal gives ${vals.join(", ")}; the greatest is ${vals[mx]}.`,
    };
  }),
  t("csp-run-length", 2, ["data-compression"], 2, (r) => {
    const letters = r.sample(["A", "B", "C", "W", "X"], 2);
    const runs = Array.from({ length: r.int(3, 5) }, (_, i) => [letters[i % 2]!, r.int(1, 7)] as [string, number]);
    const s = runs.map(([c, n]) => c.repeat(n)).join("");
    const enc = runs.map(([c, n]) => `${n}${c}`).join("");
    return {
      stem: `Run-length encoding replaces each run of a repeated character with its count followed by the character, so AAAB becomes 3A1B. What is the encoding of ${ic(s)}?`,
      ...options([ic(enc), "Each run is replaced by its length and character, in order."], [
        [ic(runs.map(([c, n]) => `${c}${n}`).join("")), "The count comes before the character."],
        [ic(letters.map((c) => `${runs.filter(([x]) => x === c).reduce((a, [, n]) => a + n, 0)}${c}`).join("")), "Each run is encoded separately, in order; runs are not merged."],
        [ic(runs.map(([c, n], i) => `${i === 0 ? n + 1 : n}${c}`).join("")), "Recount the first run."],
      ]),
      explanation: `The runs are ${runs.map(([c, n]) => `${n} ${c}`).join(", ")}, so the encoding is ${enc}. It is lossless: the original can be rebuilt exactly.`,
    };
  }),
  t("csp-data-answerable", 2, ["using-programs-with-data", "extracting-information-from-data"], 3, (r) => {
    const domains = [
      { what: "a bike-share service", fields: ["start station", "end station", "start time", "trip length in minutes"], ok: ["Which station is the most common starting point?", "What is the average trip length?", "At what hour do the most trips begin?"], no: [["What is the average age of riders?", "rider age"], ["Which riders use the service most often?", "rider identity"], ["How much does each trip cost?", "price"], ["Which bikes need repairs?", "bike condition"]] },
      { what: "an online store", fields: ["product name", "category", "price", "date of sale"], ok: ["Which category has the most sales?", "What is the total revenue for each month?", "Which product sold the most units?"], no: [["Which customers live in each state?", "customer address"], ["How long did each order take to arrive?", "delivery date"], ["How satisfied were customers?", "ratings or reviews"], ["How old are the customers?", "customer age"]] },
      { what: "a school library", fields: ["book title", "genre", "checkout date", "return date"], ok: ["Which genre is checked out most often?", "What is the average number of days a book is kept?", "In which month are the most books checked out?"], no: [["Which grade level borrows the most books?", "borrower grade"], ["How much did each book cost the library?", "purchase price"], ["Did students enjoy the books?", "ratings"], ["Which teacher recommended each book?", "recommender"]] },
    ];
    const d = r.pick(domains);
    const ok = r.pick(d.ok);
    const no = r.sample(d.no, 3) as [string, string][];
    return {
      stem: `A data set from ${d.what} contains one row per transaction with these fields: ${d.fields.join(", ")}. Which question can be answered using only this data?`,
      correct: { text: ok, why: "Correct. Every field it needs is in the data set." },
      wrong: no.map(([q, f]) => ({ text: q, why: `The data does not include ${f}.` })),
      explanation: `Only "${ok}" can be answered from the listed fields; each other question needs data that was not collected.`,
    };
  }, ["5"]),
];

/* ---------------- Big Idea 3 ---------------- */

type Dir = 0 | 1 | 2 | 3; // up, right, down, left
const DIRS = ["up", "right", "down", "left"];

export const cspCode: McqTemplate[] = [
  t("csp-assignment-trace", 3, ["variables-and-assignments", "mathematical-expressions"], 2, (r) => {
    const a0 = r.int(2, 9);
    const b0 = r.int(2, 9);
    const k = r.int(2, 4);
    let a = a0;
    let b = b0;
    let c = a + b;
    a = b * k;
    b = c - a;
    c = a + b;
    const naive = (() => {
      // Treat the statements as if they all used the original values.
      const c1 = a0 + b0;
      return [b0 * k, c1 - a0, a0 + b0];
    })();
    return {
      stem: trace(`a ← ${a0}\nb ← ${b0}\nc ← a + b\na ← b * ${k}\nb ← c - a\nc ← a + b\nDISPLAY (a)\nDISPLAY (b)\nDISPLAY (c)`),
      ...options([ic(`${a} ${b} ${c}`), "Each statement uses the values stored at the moment it runs."], [
        [ic(naive.join(" ")), "Later statements use the updated values, not the original ones."],
        [ic(`${a} ${b} ${a0 + b0}`), "c is reassigned in the last statement."],
        [ic(`${a0} ${b0} ${a0 + b0}`), "Variables change when they are reassigned."],
        [ic(`${a} ${c - a} ${c}`), "Recompute b using the value of c at that time."],
      ]),
      explanation: `c is ${a0 + b0}; a becomes ${a}; b becomes ${a0 + b0} − ${a} = ${b}; c becomes ${a} + ${b} = ${c}.`,
    };
  }),
  t("csp-mod", 3, ["mathematical-expressions"], 2, (r) => {
    const x = r.int(20, 99);
    const m = r.int(3, 9);
    const y = r.int(2, 5);
    const val = (x % m) * y + Math.floor(x / 10);
    return {
      stem: trace(`x ← ${x}\nresult ← x MOD ${m} * ${y}\nDISPLAY (result)`),
      ...options([ic((x % m) * y), `${x} MOD ${m} is ${x % m}, then multiplied by ${y}.`], [
        [ic(x % (m * y)), "MOD and * have equal precedence and are evaluated left to right."],
        [ic(Math.floor(x / m) * y), "MOD gives the remainder, not the quotient."],
        [ic(((x % m) * y) + 1), "Recheck the remainder."],
        [ic(val), "Only the given expression is evaluated."],
      ]),
      explanation: `${x} MOD ${m} = ${x % m}; ${x % m} × ${y} = ${(x % m) * y}.`,
    };
  }),
  t("csp-repeat-until", 3, ["iteration"], 3, (r) => {
    const start = r.int(1, 5);
    const mult = r.int(2, 3);
    const add = r.int(0, 3);
    const lim = r.int(40, 200);
    let n = start;
    let count = 0;
    while (!(n > lim)) {
      n = n * mult + add;
      count++;
    }
    return {
      stem: trace(`n ← ${start}\ncount ← 0\nREPEAT UNTIL (n > ${lim})\n{\n   n ← n * ${mult} + ${add}\n   count ← count + 1\n}\nDISPLAY (count)\nDISPLAY (n)`),
      ...options([ic(`${count} ${n}`), "The condition is checked before each pass, and the loop stops once n exceeds the limit."], [
        [ic(`${count - 1} ${(n - add) / mult}`), "The loop runs once more, because the condition is still false at that point."],
        [ic(`${count + 1} ${n * mult + add}`), "The loop stops as soon as the condition is true."],
        [ic(`${count} ${(n - add) / mult}`), "n is updated in the last pass too."],
      ]),
      explanation: `n takes the values ${(() => {
        const seq = [start];
        let v = start;
        while (!(v > lim)) {
          v = v * mult + add;
          seq.push(v);
        }
        return seq.join(", ");
      })()}; the loop body runs ${count} times.`,
    };
  }),
  t("csp-repeat-times", 3, ["iteration", "conditionals"], 3, (r) => {
    const n = r.int(4, 8);
    const d = r.int(2, 3);
    let x = r.int(0, 3);
    const x0 = x;
    let total = 0;
    for (let i = 0; i < n; i++) {
      x = x + 1;
      if (x % d === 0) total = total + x;
    }
    let alt = 0;
    for (let i = 0, y = x0; i < n; i++) {
      if (y % d === 0) alt += y;
      y++;
    }
    return {
      stem: trace(`x ← ${x0}\ntotal ← 0\nREPEAT ${n} TIMES\n{\n   x ← x + 1\n   IF (x MOD ${d} = 0)\n   {\n      total ← total + x\n   }\n}\nDISPLAY (total)`),
      ...options([ic(total), `x goes from ${x0 + 1} to ${x0 + n}; the multiples of ${d} among them are added.`], [
        [ic(alt), "x is increased before the check in each pass."],
        [ic(Array.from({ length: n }, (_, i) => x0 + 1 + i).reduce((a, b) => a + b, 0)), "Only values divisible by " + d + " are added."],
        [ic(Array.from({ length: n }, (_, i) => x0 + 1 + i).filter((v) => v % d === 0).length), "total adds the values, not 1 each time."],
        [ic(total + d), "Recheck which values are multiples of " + d + "."],
      ]),
      explanation: `The values of x are ${Array.from({ length: n }, (_, i) => x0 + 1 + i).join(", ")}; the multiples of ${d} add to ${total}.`,
    };
  }),
  t("csp-list-ops", 3, ["lists"], 3, (r) => {
    const start = distinct(r, 4, 1, 30);
    const v1 = r.int(31, 50);
    const v2 = r.int(51, 70);
    const i1 = r.int(1, 4);
    const i2 = r.int(1, 5);
    const run = (base: 0 | 1) => {
      const a = [...start];
      a.push(v1);
      a.splice(i1 - base, 0, v2);
      a.splice(i2 - base, 1);
      return a;
    };
    const right = run(1);
    const zero = (() => {
      const a = [...start];
      a.push(v1);
      a.splice(Math.min(i1, a.length), 0, v2);
      if (i2 < a.length) a.splice(i2, 1);
      return a;
    })();
    const replace = (() => {
      const a = [...start];
      a.push(v1);
      a[i1 - 1] = v2;
      a.splice(i2 - 1, 1);
      return a;
    })();
    return {
      stem: trace(`nums ← ${plist(start)}\nAPPEND(nums, ${v1})\nINSERT(nums, ${i1}, ${v2})\nREMOVE(nums, ${i2})\nDISPLAY (nums)`),
      ...options([ic(plist(right)), "List indexes start at 1; INSERT shifts later elements right and REMOVE shifts them left."], [
        [ic(plist(zero)), "AP pseudocode lists start at index 1, not 0."],
        [ic(plist(replace)), "INSERT adds a new element; it does not replace one."],
        [ic(plist([...start, v1])), "INSERT and REMOVE also change the list."],
        [ic(plist(right.slice().reverse())), "APPEND adds to the end of the list."],
      ]),
      explanation: `After APPEND: ${plist([...start, v1])}. INSERT at ${i1} and REMOVE at ${i2} give ${plist(right)}.`,
    };
  }),
  t("csp-for-each", 3, ["lists", "developing-algorithms"], 3, (r) => {
    const list = ints(r, 6, 1, 20);
    const v = r.int(0, 2);
    const k = r.int(5, 14);
    const code = [
      `count ← 0\nFOR EACH n IN nums\n{\n   IF (n > ${k})\n   {\n      count ← count + 1\n   }\n}\nDISPLAY (count)`,
      `result ← nums[1]\nFOR EACH n IN nums\n{\n   IF (n < result)\n   {\n      result ← n\n   }\n}\nDISPLAY (result)`,
      `evens ← []\nFOR EACH n IN nums\n{\n   IF (n MOD 2 = 0)\n   {\n      APPEND(evens, n)\n   }\n}\nDISPLAY (LENGTH(evens))`,
    ][v]!;
    const right = [list.filter((x) => x > k).length, Math.min(...list), list.filter((x) => x % 2 === 0).length][v]!;
    const cands: [string, string][] = [
      [[list.filter((x) => x >= k).length, Math.max(...list), list.filter((x) => x % 2 === 1).length][v]!.toString(), ["The comparison is strict.", "The code keeps the smaller value each time.", "Even numbers have remainder 0."][v]!],
      [[list.filter((x) => x <= k).length, list[0]!, list.filter((x) => x % 2 === 0).reduce((a, b) => a + b, 0)][v]!.toString(), ["This counts the wrong side of " + k + ".", "result changes when a smaller value appears.", "LENGTH counts elements; it does not add them."][v]!],
      [String(right + 1), "Recheck each element."],
      [String(list.length), "Not every element passes the condition."],
      [String(right - 1), "Recheck each element."],
    ];
    return {
      stem: trace(`nums ← ${plist(list)}\n${code}`),
      ...options([ic(right), "Apply the condition to every element of the list."], cands.map(([x, w]) => [ic(x), w])),
      explanation: [`${list.filter((x) => x > k).length} values are greater than ${k}.`, `The smallest value is ${Math.min(...list)}.`, `${list.filter((x) => x % 2 === 0).length} values are even.`][v]!,
    };
  }),
  t("csp-procedure-return", 3, ["developing-procedures", "calling-procedures"], 3, (r) => {
    const list = ints(r, 6, 1, 30);
    const k = r.int(8, 25);
    const firstIdx = list.findIndex((x) => x > k);
    if (firstIdx < 0 || firstIdx === list.length - 1) throw new Retry();
    const lastVal = [...list].reverse().find((x) => x > k)!;
    return {
      stem: `Consider the following procedure.\n\n${pseudo(`PROCEDURE find(list, limit)\n{\n   FOR EACH item IN list\n   {\n      IF (item > limit)\n      {\n         RETURN (item)\n      }\n   }\n   RETURN (-1)\n}`)}\n\nWhat is returned by ${ic(`find(${plist(list)}, ${k})`)}?`,
      ...options([ic(list[firstIdx]!), "RETURN ends the procedure at the first value greater than the limit."], [
        [ic(lastVal), "RETURN stops the procedure immediately; later values are not checked."],
        [ic(-1), `${list[firstIdx]} is greater than ${k}, so -1 is never reached.`],
        [ic(firstIdx + 1), "The procedure returns the item, not its index."],
        [ic(Math.max(...list)), "It returns the first match, not the largest."],
      ]),
      explanation: `${list[firstIdx]} is the first element greater than ${k}, so RETURN (${list[firstIdx]}) runs and the procedure ends.`,
    };
  }),
  t("csp-boolean-pairs", 3, ["boolean-expressions"], 3, (r) => {
    const A = r.int(3, 9);
    const B = r.int(3, 9);
    const forms: [string, (x: number, y: number) => boolean][] = [
      [`(x > ${A}) AND (NOT (y > ${B}))`, (x, y) => x > A && !(y > B)],
      [`(x = y) OR ((x > ${A}) AND (y > ${B}))`, (x, y) => x === y || (x > A && y > B)],
      [`NOT ((x ≤ ${A}) OR (y MOD 2 = 0))`, (x, y) => !(x <= A || y % 2 === 0)],
    ];
    const [expr, test] = r.pick(forms);
    const all: [number, number][] = [];
    for (let i = 0; i < 40; i++) all.push([r.int(0, 12), r.int(0, 12)]);
    const yes = all.find(([x, y]) => test(x, y));
    const no = all.filter(([x, y]) => !test(x, y)).filter((p, i, arr) => arr.findIndex((q) => q[0] === p[0] && q[1] === p[1]) === i).slice(0, 3);
    if (!yes || no.length < 3) throw new Retry();
    const f = (p: [number, number]) => ic(`x = ${p[0]}, y = ${p[1]}`);
    return {
      stem: `For which of the following values does the expression ${ic(expr)} evaluate to true?`,
      correct: { text: f(yes), why: "Correct. Substituting gives true." },
      wrong: no.map((p) => ({ text: f(p), why: "Substituting these values gives false." })),
      explanation: `With x = ${yes[0]} and y = ${yes[1]}, each part of ${ic(expr)} evaluates so that the whole expression is true.`,
    };
  }),
  t("csp-nested-if", 3, ["nested-conditionals"], 3, (r) => {
    const lo = r.int(10, 30);
    const hi = lo + r.int(15, 40);
    const member = r.next() < 0.5;
    const age = r.int(5, 80);
    const code = `IF (age < ${lo})\n{\n   price ← 5\n}\nELSE\n{\n   IF (member)\n   {\n      price ← 8\n   }\n   ELSE\n   {\n      IF (age ≥ ${hi})\n      {\n         price ← 7\n      }\n      ELSE\n      {\n         price ← 12\n      }\n   }\n}\nDISPLAY (price)`;
    const price = age < lo ? 5 : member ? 8 : age >= hi ? 7 : 12;
    return {
      stem: trace(code, `What is displayed when age is ${age} and member is ${member}?`),
      ...options([ic(price), "Follow the outer condition first, then the nested ones."], ["5", "8", "7", "12"].filter((p) => p !== String(price)).map((p) => [ic(p), "Check each condition in order with the given values."] as [string, string])),
      explanation: `age < ${lo} is ${age < lo}${age < lo ? "" : `; member is ${member}${member ? "" : `; age ≥ ${hi} is ${age >= hi}`}`}. So price is ${price}.`,
    };
  }),
  t("csp-random", 3, ["random-values"], 3, (r) => {
    const v = r.int(0, 1);
    if (v === 0) {
      const a = r.int(1, 5);
      const b = a + r.int(3, 9);
      const k = r.int(a + 1, b - 1);
      const p = b - k + 1;
      const tot = b - a + 1;
      return {
        stem: `What is the probability that the expression ${ic(`RANDOM(${a}, ${b}) ≥ ${k}`)} evaluates to true?`,
        ...options([`${p} out of ${tot}`, `The values ${k} through ${b} (${p} of them) out of ${tot} equally likely values from ${a} to ${b}.`], [
          [`${p - 1} out of ${tot}`, `${k} itself is included by ≥.`],
          [`${p} out of ${tot - 1}`, `RANDOM includes both ${a} and ${b}, so there are ${tot} values.`],
          [`${tot - p} out of ${tot}`, "That is the probability of the expression being false."],
        ]),
        explanation: `RANDOM(${a}, ${b}) has ${tot} equally likely results; ${p} of them are at least ${k}.`,
      };
    }
    const n = r.int(3, 8);
    const k = r.int(1, 10);
    return {
      stem: `Which of the following describes all possible values of ${ic(`RANDOM(1, ${n}) * 2 + ${k}`)}?`,
      ...options([`The ${n} numbers ${k + 2}, ${k + 4}, …, ${2 * n + k}`, `RANDOM gives 1 to ${n}; doubling and adding ${k} gives every second number from ${k + 2} to ${2 * n + k}.`], [
        [`Every integer from ${k + 2} to ${2 * n + k}`, "Doubling skips every other number."],
        [`The ${n} numbers ${k}, ${k + 2}, …, ${2 * n + k - 2}`, "RANDOM(1, n) starts at 1, not 0."],
        [`Every integer from ${k + 1} to ${n + k}`, "The result is doubled before adding."],
      ]),
      explanation: `The random value r is 1 to ${n}, so 2r + ${k} ranges over ${k + 2}, ${k + 4}, …, ${2 * n + k}.`,
    };
  }),
  t("csp-binary-search-checks", 3, ["binary-search", "algorithmic-efficiency"], 3, (r) => {
    const n = r.pick([60, 100, 250, 500, 1000, 4000, 16000, 100000]) + r.int(1, 9);
    const steps = Math.floor(Math.log2(n)) + 1;
    return {
      stem: `A sorted list contains ${n.toLocaleString("en-US")} elements. What is the maximum number of elements that binary search must examine to find a value or determine it is not in the list?`,
      ordered: true,
      ...options([ic(steps), `Each check halves the remaining elements; about ${steps} checks reduce ${n.toLocaleString("en-US")} to none.`], [
        [ic(n), "That is the worst case for linear search."],
        [ic(Math.ceil(n / 2)), "Binary search halves the remaining range at every step."],
        [ic(steps * 3), `2 to the power ${steps} is already more than ${n}.`],
      ]),
      explanation: `2^${steps - 1} = ${2 ** (steps - 1)} is less than ${n} but 2^${steps} = ${2 ** steps} is not, so at most ${steps} checks are needed.`,
    };
  }),
  t("csp-substring", 3, ["strings"], 3, (r) => {
    const words = ["computer", "internet", "algorithm", "variable", "abstract", "database", "software", "keyboard"];
    const w = r.pick(words);
    const s = r.int(1, 4);
    const len = r.int(2, 4);
    const sub = w.substr(s - 1, len);
    const w2 = r.pick(words.filter((x) => x !== w));
    const tail = w2.substr(w2.length - 2, 2);
    return {
      stem: `The procedure ${ic("substring(str, start, length)")} returns ${ic("length")} characters of ${ic("str")} beginning at position ${ic("start")}; the first character is at position 1. The procedure ${ic("concat(a, b)")} returns ${ic("a")} joined to ${ic("b")}. What is displayed?\n\n${pseudo(`word ← "${w}"\nother ← "${w2}"\nDISPLAY (concat(substring(word, ${s}, ${len}), substring(other, ${w2.length - 1}, 2)))`)}`,
      ...options([ic(sub + tail), "Positions start at 1 in AP pseudocode."], [
        [ic(w.substr(s, len) + w2.substr(w2.length - 1, 2)), "The first character is at position 1, not 0."],
        [ic(w.substr(s - 1, len + 1) + tail), `length is ${len}, so ${len} characters are taken.`],
        [ic(tail + sub), "concat joins its arguments in the order given."],
      ]),
      explanation: `substring("${w}", ${s}, ${len}) is "${sub}" and substring("${w2}", ${w2.length - 1}, 2) is "${tail}", so the result is "${sub + tail}".`,
    };
  }),
  t("csp-robot", 3, ["iteration", "developing-algorithms"], 3, (r) => {
    let row = r.int(2, 5);
    let col = r.int(2, 5);
    let dir = r.int(0, 3) as Dir;
    const r0 = row;
    const c0 = col;
    const d0 = dir;
    const k = r.int(2, 3);
    const turn = r.pick(["ROTATE_LEFT", "ROTATE_RIGHT"]);
    const steps = r.int(1, 2);
    const move = () => {
      if (dir === 0) row--;
      else if (dir === 1) col++;
      else if (dir === 2) row++;
      else col--;
    };
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < steps; j++) move();
      dir = ((dir + (turn === "ROTATE_LEFT" ? 3 : 1)) % 4) as Dir;
    }
    if (row < 1 || row > 6 || col < 1 || col > 6) throw new Retry();
    // A common mistake: turning the other way.
    let rr = r0;
    let cc = c0;
    let dd = d0;
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < steps; j++) {
        if (dd === 0) rr--;
        else if (dd === 1) cc++;
        else if (dd === 2) rr++;
        else cc--;
      }
      dd = ((dd + (turn === "ROTATE_LEFT" ? 1 : 3)) % 4) as Dir;
    }
    const fmt = (a: number, b: number, d: number) => `Row ${a}, column ${b}, facing ${DIRS[d]}`;
    return {
      stem: `A robot is on a 6-by-6 grid of squares. Rows are numbered 1 to 6 from top to bottom and columns 1 to 6 from left to right. The robot starts in row ${r0}, column ${c0}, facing ${DIRS[d0]}. ${ic("MOVE_FORWARD()")} moves it one square in the direction it faces; ${ic("ROTATE_LEFT()")} and ${ic("ROTATE_RIGHT()")} turn it 90 degrees in place.\n\n${pseudo(`REPEAT ${k} TIMES\n{\n${Array.from({ length: steps }, () => "   MOVE_FORWARD()").join("\n")}\n   ${turn}()\n}`)}\n\nWhere does the robot end, and which way does it face?`,
      ...options([fmt(row, col, dir), "Trace each move and turn in order."], [
        [fmt(rr, cc, dd), `${turn} turns the robot ${turn === "ROTATE_LEFT" ? "counterclockwise" : "clockwise"}.`],
        [fmt(row, col, d0), "The robot turns in every pass, including the last."],
        [fmt(r0, c0, dir), "The robot moves forward in each pass."],
        [fmt(col, row, dir), "Rows are vertical positions and columns horizontal."],
      ]),
      explanation: `Tracing ${k} passes of ${steps} move${steps > 1 ? "s" : ""} then ${turn} ends at row ${row}, column ${col}, facing ${DIRS[dir]}.`,
    };
  }, ["2", "4"]),
];

/* ---------------- Big Idea 4 ---------------- */

function connected(nodes: string[], edges: [string, string][], a: string, b: string) {
  const seen = new Set([a]);
  const stack = [a];
  while (stack.length) {
    const x = stack.pop()!;
    for (const [p, q] of edges) {
      const y = p === x ? q : q === x ? p : null;
      if (y && !seen.has(y)) {
        seen.add(y);
        stack.push(y);
      }
    }
  }
  return seen.has(b) && nodes.includes(b);
}

export const cspNetworks: McqTemplate[] = [
  t("csp-min-cut", 4, ["fault-tolerance"], 4, (r) => {
    const nodes = ["P", "Q", "R", "S", "T", "U"];
    const edges: [string, string][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) if (r.next() < 0.42) edges.push([nodes[i]!, nodes[j]!]);
    const [a, b] = r.sample(nodes, 2) as [string, string];
    if (!connected(nodes, edges, a, b) || edges.length < 6 || edges.length > 10) throw new Retry();
    let cut = 0;
    for (let k = 1; k <= 4 && !cut; k++) {
      const choose = (start: number, picked: number[]): boolean => {
        if (picked.length === k) return !connected(nodes, edges.filter((_, i) => !picked.includes(i)), a, b);
        for (let i = start; i < edges.length; i++) if (choose(i + 1, [...picked, i])) return true;
        return false;
      };
      if (choose(0, [])) cut = k;
    }
    if (!cut) throw new Retry();
    const degA = edges.filter((e) => e.includes(a)).length;
    const degB = edges.filter((e) => e.includes(b)).length;
    return {
      stem: `A network has computers ${nodes.join(", ")}. The direct connections are: ${edges.map(([p, q]) => `${p}–${q}`).join(", ")}. What is the minimum number of connections that must fail for computer ${a} to be unable to communicate with computer ${b}?`,
      ordered: true,
      ...options([ic(cut), `Removing ${cut} well-chosen connection${cut > 1 ? "s" : ""} separates ${a} from ${b}; removing fewer always leaves a path.`], [
        [ic(cut + 1), `Some set of ${cut} connection${cut > 1 ? "s" : ""} already disconnects them.`],
        [ic(Math.max(degA, degB) === cut ? cut + 2 : Math.max(degA, degB)), "Look for the fewest connections whose failure leaves no path."],
        [ic(cut === 1 ? 0 : cut - 1), "After that many failures a path still remains."],
        [ic(edges.length), "Not every connection needs to fail."],
      ]),
      explanation: `${a} has ${degA} connection${degA === 1 ? "" : "s"} and ${b} has ${degB}. Checking failures systematically shows that ${cut} is the fewest that leaves no path between them.`,
    };
  }, ["5"]),
  t("csp-parallel-time", 4, ["parallel-and-distributed-computing"], 3, (r) => {
    const tasks = ints(r, r.int(3, 4), 10, 60).map((x) => x * 1);
    const total = tasks.reduce((a, b) => a + b, 0);
    let best = Infinity;
    for (let mask = 0; mask < 1 << tasks.length; mask++) {
      let s = 0;
      tasks.forEach((x, i) => {
        if (mask & (1 << i)) s += x;
      });
      best = Math.min(best, Math.max(s, total - s));
    }
    return {
      stem: `A program has ${tasks.length} independent tasks that take ${tasks.join(", ")} seconds. The tasks can run in parallel on two processors, and each task runs entirely on one processor. What is the minimum time to complete all the tasks?`,
      ordered: true,
      ...options([ic(`${best} seconds`), "Split the tasks between the processors as evenly as possible; the time is the busier processor's total."], [
        [ic(`${total} seconds`), "That is the sequential time with one processor."],
        [ic(`${Math.max(...tasks)} seconds`), "The longest task cannot run at the same time as all the others on just two processors."],
        [ic(`${Math.ceil(total / 2)} seconds`), total % 2 === 0 && best === total / 2 ? "Recheck the split." : "Tasks cannot be split in half, so a perfectly even split is not possible."],
        [ic(`${best + 10} seconds`), "A better split exists."],
      ]),
      explanation: `The best split puts ${best} seconds of work on one processor and ${total - best} on the other, so all tasks finish in ${best} seconds (speedup ${(total / best).toFixed(2)}).`,
    };
  }, ["5"]),
];
