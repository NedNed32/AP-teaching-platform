/*
 * AP Computer Science A free-response templates. Four question types, one of each
 * per exam: methods and control structures, class design, ArrayList, 2D array.
 * Each part has a rubric with a model solution; examples in the prompt are computed.
 */
import { ic, ints, java, listStr } from "./csa-lib";
import type { Rng } from "./lib";
import { Retry, type FrqTemplate } from "./types";

const fmt = (x: number) => (Number.isInteger(x) ? x.toFixed(1) : String(Math.round(x * 1000) / 1000));

/* ---------------- Question 1: methods and control structures ---------------- */

const randomLetters = (r: Rng, n: number, letters: string) => Array.from({ length: n }, () => r.pick(letters.split(""))).join("");
function longestRun(s: string) {
  let best = s.length ? 1 : 0;
  let cur = 1;
  for (let i = 1; i < s.length; i++) {
    cur = s[i] === s[i - 1] ? cur + 1 : 1;
    best = Math.max(best, cur);
  }
  return best;
}
const doubles = (s: string) => s.split("").filter((c, i) => i + 1 < s.length && c === s[i + 1]).length;

const q1Strings: FrqTemplate = {
  key: "frq-csa-string-runs",
  topics: ["string-algorithms", "for-loops", "writing-methods"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "methods",
  minutes: 23,
  gen(r) {
    const letters = r.pick(["ab", "xyz", "abc", "mn"]);
    const ex = [0, 1, 2].map(() => randomLetters(r, r.int(6, 10), letters));
    if (new Set(ex.map(longestRun)).size < 2) throw new Retry();
    return {
      title: "Letter runs",
      stimulus: {
        text: `The class ${ic("LetterTools")} contains static methods that analyze strings of lowercase letters.\n\n${java(`public class LetterTools {\n    /** Returns the number of indexes i where the character at i equals the character at i + 1. */\n    public static int countDoubles(String s) { /* to be implemented in part (a) */ }\n    /** Returns the length of the longest run of identical adjacent characters. */\n    public static int longestRun(String s) { /* to be implemented in part (b) */ }\n}`)}\n\nExamples: ${ex.map((s) => `${ic(`countDoubles("${s}")`)} returns ${doubles(s)} and ${ic(`longestRun("${s}")`)} returns ${longestRun(s)}`).join("; ")}.`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("countDoubles")}. Assume ${ic("s")} is not null.`,
          rubric: [
            { criterion: "Loops over adjacent pairs without going out of bounds.", example: ic("for (int i = 0; i < s.length() - 1; i++)") },
            { criterion: "Compares the characters at i and i + 1 correctly (substring with equals, or charAt with ==).", example: ic("s.substring(i, i + 1).equals(s.substring(i + 1, i + 2))") },
            { criterion: "Counts and returns the number of matching pairs.", example: java(`public static int countDoubles(String s) {\n    int count = 0;\n    for (int i = 0; i < s.length() - 1; i++) {\n        if (s.substring(i, i + 1).equals(s.substring(i + 1, i + 2))) {\n            count++;\n        }\n    }\n    return count;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("longestRun")}. Assume ${ic("s")} has at least one character.`,
          rubric: [
            { criterion: "Tracks the length of the current run, extending it when a character matches the previous one.", example: "cur++ when s.charAt(i) == s.charAt(i - 1)" },
            { criterion: "Resets the current run to 1 when a character differs.", example: ic("cur = 1;") },
            { criterion: "Keeps and returns the maximum run length, including a run that ends at the last character.", example: java(`public static int longestRun(String s) {\n    int best = 1;\n    int cur = 1;\n    for (int i = 1; i < s.length(); i++) {\n        if (s.charAt(i) == s.charAt(i - 1)) {\n            cur++;\n        } else {\n            cur = 1;\n        }\n        if (cur > best) {\n            best = cur;\n        }\n    }\n    return best;\n}`) },
          ],
        },
      ],
    };
  },
};

const digitSum = (n: number) => String(n).split("").reduce((a, b) => a + Number(b), 0);

const q1Digits: FrqTemplate = {
  key: "frq-csa-digit-sums",
  topics: ["while-loops", "selection-iteration-algorithms", "writing-methods"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "methods",
  minutes: 23,
  gen(r) {
    const k = r.int(3, 7);
    const lo = r.int(10, 80);
    const hi = lo + r.int(15, 40);
    let count = 0;
    for (let x = lo; x <= hi; x++) if (digitSum(x) % k === 0) count++;
    const exN = r.int(100, 9999);
    return {
      title: "Digit sums",
      stimulus: {
        text: `The class ${ic("NumberTools")} contains static methods for working with the digits of positive integers.\n\n${java(`public class NumberTools {\n    /** Returns the sum of the digits of n. Precondition: n > 0 */\n    public static int digitSum(int n) { /* part (a) */ }\n    /** Returns how many integers from lo to hi, inclusive, have a digit sum divisible by k.\n        Precondition: 0 < lo <= hi, k > 0 */\n    public static int countDivisible(int lo, int hi, int k) { /* part (b) */ }\n}`)}\n\nFor example, ${ic(`digitSum(${exN})`)} returns ${digitSum(exN)}, and ${ic(`countDivisible(${lo}, ${hi}, ${k})`)} returns ${count}.`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("digitSum")}. You may not convert n to a String.`,
          rubric: [
            { criterion: "Uses % 10 to get the last digit.", example: ic("sum += n % 10;") },
            { criterion: "Uses / 10 to remove the last digit.", example: ic("n /= 10;") },
            { criterion: "Loops until every digit is processed and returns the sum.", example: java(`public static int digitSum(int n) {\n    int sum = 0;\n    while (n > 0) {\n        sum += n % 10;\n        n /= 10;\n    }\n    return sum;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("countDivisible")}. Assume ${ic("digitSum")} works as specified, regardless of what you wrote in part (a). You must use ${ic("digitSum")} appropriately.`,
          rubric: [
            { criterion: "Loops over every integer from lo to hi, inclusive.", example: ic("for (int x = lo; x <= hi; x++)") },
            { criterion: "Calls digitSum on each value.", example: ic("digitSum(x)") },
            { criterion: "Tests divisibility with % and counts matches.", example: ic("if (digitSum(x) % k == 0) count++;") },
            { criterion: "Returns the count.", example: java(`public static int countDivisible(int lo, int hi, int k) {\n    int count = 0;\n    for (int x = lo; x <= hi; x++) {\n        if (digitSum(x) % k == 0) {\n            count++;\n        }\n    }\n    return count;\n}`) },
          ],
        },
      ],
    };
  },
};

const q1Parking: FrqTemplate = {
  key: "frq-csa-parking-fee",
  topics: ["if-statements", "compound-boolean-expressions", "while-loops", "writing-methods"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "methods",
  minutes: 23,
  gen(r) {
    const free = r.pick([15, 20, 30]);
    const rate = r.int(2, 5);
    const cap = rate * r.int(5, 9);
    const fee = (m: number) => (m <= free ? 0 : Math.min(cap, Math.ceil(m / 60) * rate));
    const exs = [free, free + r.int(1, 50), r.int(2, 4) * 60 + r.int(1, 59), 60 * 14];
    const budget = rate * r.int(1, 4);
    let longest = 0;
    for (let m = 0; m <= 1440; m++) if (fee(m) <= budget) longest = m;
    return {
      title: "Parking fees",
      stimulus: {
        text: `A parking garage charges for each stay as follows.\n\n\n• Stays of ${free} minutes or less are free.\n\n• Otherwise the fee is ${rate} dollars for each hour or part of an hour (so 61 minutes counts as 2 hours).\n\n• No stay costs more than ${cap} dollars.\n\n${java(`public class Garage {\n    /** Returns the fee, in dollars, for a stay of the given length. Precondition: 0 <= minutes <= 1440 */\n    public static int fee(int minutes) { /* part (a) */ }\n    /** Returns the longest stay, in minutes from 0 to 1440, whose fee is at most budget. */\n    public static int longestStay(int budget) { /* part (b) */ }\n}`)}\n\nExamples: ${exs.map((m) => `${ic(`fee(${m})`)} returns ${fee(m)}`).join(", ")}. ${ic(`longestStay(${budget})`)} returns ${longest}.`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("fee")}.`,
          rubric: [
            { criterion: `Returns 0 for stays of ${free} minutes or less.`, example: ic(`if (minutes <= ${free}) return 0;`) },
            { criterion: "Counts hours, rounding any partial hour up.", example: ic("int hours = (minutes + 59) / 60;") },
            { criterion: `Applies the ${cap}-dollar maximum and returns the fee.`, example: java(`public static int fee(int minutes) {\n    if (minutes <= ${free}) {\n        return 0;\n    }\n    int hours = (minutes + 59) / 60;\n    int cost = hours * ${rate};\n    if (cost > ${cap}) {\n        cost = ${cap};\n    }\n    return cost;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("longestStay")}. Assume ${ic("fee")} works as specified, regardless of what you wrote in part (a).`,
          rubric: [
            { criterion: "Examines stay lengths from 0 to 1440 (in either direction).", example: ic("for (int m = 1440; m >= 0; m--)") },
            { criterion: "Calls fee and compares the result with budget.", example: ic("if (fee(m) <= budget)") },
            { criterion: "Returns the longest qualifying length.", example: java(`public static int longestStay(int budget) {\n    for (int m = 1440; m >= 0; m--) {\n        if (fee(m) <= budget) {\n            return m;\n        }\n    }\n    return 0;\n}`) },
          ],
        },
      ],
    };
  },
};

/* ---------------- Question 2: class design ---------------- */

const q2PunchCard: FrqTemplate = {
  key: "frq-csa-punch-card",
  topics: ["anatomy-of-a-class", "constructors", "writing-methods"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "class",
  minutes: 22,
  gen(r) {
    const bonus = r.int(3, 5);
    const start = r.int(2, 6);
    const calls = start + r.int(2, 4);
    let left = start;
    let used = 0;
    const results: boolean[] = [];
    for (let i = 0; i < calls; i++) {
      if (left > 0) {
        left--;
        used++;
        if (used % bonus === 0) left++;
        results.push(true);
      } else results.push(false);
    }
    return {
      title: "Punch card",
      stimulus: {
        text: `A ${ic("PunchCard")} represents a prepaid card for a number of visits. Each successful ${ic("punch")} uses one visit. After every ${bonus} successful punches, the card earns one free visit.\n\n\n• ${ic("PunchCard(int visits)")} creates a card with the given number of visits.\n\n• ${ic("boolean punch()")} uses a visit and returns true if one is available; otherwise it changes nothing and returns false.\n\n• ${ic("int getRemaining()")} returns the number of visits left.\n\nFor example, after ${ic(`PunchCard c = new PunchCard(${start});`)}, calling ${ic("c.punch()")} ${calls} times returns ${results.join(", ")}, and then ${ic("c.getRemaining()")} returns ${left}.`,
      },
      parts: [
        {
          prompt: `Write the complete ${ic("PunchCard")} class, including any instance variables, the constructor and both methods. Your implementation must meet all specifications and match the example.`,
          rubric: [
            { criterion: "Declares private instance variables for the remaining visits and the number of successful punches.", example: ic("private int remaining; private int punches;") },
            { criterion: "Constructor initializes the instance variables from the parameter.", example: ic("remaining = visits; punches = 0;") },
            { criterion: "punch checks availability and returns false without changes when none remain.", example: ic("if (remaining == 0) return false;") },
            { criterion: "punch decrements remaining and counts the punch.", example: ic("remaining--; punches++;") },
            { criterion: `Adds a free visit after every ${bonus} successful punches.`, example: ic(`if (punches % ${bonus} == 0) remaining++;`) },
            { criterion: "getRemaining returns the remaining visits; all methods have the correct headers.", example: java(`public class PunchCard {\n    private int remaining;\n    private int punches;\n    public PunchCard(int visits) {\n        remaining = visits;\n        punches = 0;\n    }\n    public boolean punch() {\n        if (remaining == 0) {\n            return false;\n        }\n        remaining--;\n        punches++;\n        if (punches % ${bonus} == 0) {\n            remaining++;\n        }\n        return true;\n    }\n    public int getRemaining() {\n        return remaining;\n    }\n}`) },
          ],
        },
      ],
    };
  },
};

const q2Thermostat: FrqTemplate = {
  key: "frq-csa-thermostat",
  topics: ["anatomy-of-a-class", "constructors", "writing-methods", "if-statements"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "class",
  minutes: 22,
  gen(r) {
    const lo = r.int(10, 16);
    const hi = lo + r.int(10, 16);
    const start = r.int(lo + 2, hi - 2);
    const a = hi - start + r.int(1, 4);
    const b = r.int(2, 5);
    let temp = start;
    let changes = 0;
    const raise = (x: number) => {
      const n = Math.min(hi, temp + x);
      if (n !== temp) changes++;
      temp = n;
    };
    const lower = (x: number) => {
      const n = Math.max(lo, temp - x);
      if (n !== temp) changes++;
      temp = n;
    };
    raise(a);
    raise(1);
    lower(b);
    return {
      title: "Thermostat",
      stimulus: {
        text: `A ${ic("Thermostat")} keeps a temperature setting between a minimum and a maximum, inclusive.\n\n\n• ${ic("Thermostat(int min, int max, int start)")} creates a thermostat. Precondition: min <= start <= max.\n\n• ${ic("void raise(int amount)")} and ${ic("void lower(int amount)")} change the setting by amount, but never past max or min.\n\n• ${ic("int getSetting()")} returns the current setting.\n\n• ${ic("int getChanges()")} returns how many calls to raise or lower actually changed the setting.\n\nExample:\n\n${java(`Thermostat t = new Thermostat(${lo}, ${hi}, ${start});\nt.raise(${a});      // setting is ${hi}\nt.raise(1);      // still ${hi}: no change\nt.lower(${b});      // setting is ${temp}\nt.getSetting();  // returns ${temp}\nt.getChanges();  // returns ${changes}`)}`,
      },
      parts: [
        {
          prompt: `Write the complete ${ic("Thermostat")} class.`,
          rubric: [
            { criterion: "Private instance variables for the minimum, maximum, setting and change count.", example: ic("private int min, max, setting, changes;") },
            { criterion: "Constructor initializes all instance variables.", example: ic("this.min = min; this.max = max; setting = start; changes = 0;") },
            { criterion: "raise limits the setting to max.", example: ic("int next = Math.min(max, setting + amount);") },
            { criterion: "lower limits the setting to min.", example: ic("int next = Math.max(min, setting - amount);") },
            { criterion: "Counts a change only when the setting actually changes.", example: ic("if (next != setting) changes++;") },
            { criterion: "Accessors return the correct values with correct headers.", example: java(`public class Thermostat {\n    private int min;\n    private int max;\n    private int setting;\n    private int changes;\n    public Thermostat(int min, int max, int start) {\n        this.min = min;\n        this.max = max;\n        setting = start;\n        changes = 0;\n    }\n    public void raise(int amount) {\n        update(Math.min(max, setting + amount));\n    }\n    public void lower(int amount) {\n        update(Math.max(min, setting - amount));\n    }\n    private void update(int next) {\n        if (next != setting) {\n            changes++;\n        }\n        setting = next;\n    }\n    public int getSetting() {\n        return setting;\n    }\n    public int getChanges() {\n        return changes;\n    }\n}`) },
          ],
        },
      ],
    };
  },
};

const q2ScoreKeeper: FrqTemplate = {
  key: "frq-csa-score-keeper",
  topics: ["anatomy-of-a-class", "class-variables-and-methods", "writing-methods", "casting-and-range"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "class",
  minutes: 22,
  gen(r) {
    const s1 = ints(r, 3, 50, 100);
    const s2 = ints(r, 2, 50, 100);
    const avg = s1.reduce((a, b) => a + b, 0) / s1.length;
    const name1 = r.pick(["Ana", "Ben", "Chen", "Dara"]);
    const name2 = r.pick(["Eli", "Farah", "Gus", "Hana"]);
    return {
      title: "Score keeper",
      stimulus: {
        text: `A ${ic("ScoreKeeper")} records the scores of one player. The class also tracks the total number of scores recorded by all ScoreKeeper objects.\n\n\n• ${ic("ScoreKeeper(String name)")} creates a keeper with no scores.\n\n• ${ic("void addScore(int s)")} records a score.\n\n• ${ic("double getAverage()")} returns the average score, or 0.0 if there are none.\n\n• ${ic("int getBest()")} returns the highest score, or -1 if there are none.\n\n• ${ic("static int getTotalScores()")} returns the number of scores recorded by all keepers.\n\nExample:\n\n${java(`ScoreKeeper a = new ScoreKeeper("${name1}");\nScoreKeeper b = new ScoreKeeper("${name2}");\n${s1.map((x) => `a.addScore(${x});`).join("\n")}\n${s2.map((x) => `b.addScore(${x});`).join("\n")}\na.getAverage();               // returns ${fmt(avg)}\na.getBest();                  // returns ${Math.max(...s1)}\nScoreKeeper.getTotalScores(); // returns ${s1.length + s2.length}`)}`,
      },
      parts: [
        {
          prompt: `Write the complete ${ic("ScoreKeeper")} class. You do not need to store every score.`,
          rubric: [
            { criterion: "Private instance variables for the name, the sum, the count and the best score.", example: ic("private String name; private int sum, count, best;") },
            { criterion: "A private static variable counting scores across all objects.", example: ic("private static int totalScores = 0;") },
            { criterion: "Constructor sets the name and initial values (best starts at -1).", example: ic("this.name = name; best = -1;") },
            { criterion: "addScore updates the sum, count, best and the static total.", example: ic("sum += s; count++; totalScores++; if (s > best) best = s;") },
            { criterion: "getAverage returns a double without integer division and handles no scores.", example: ic("return count == 0 ? 0.0 : (double) sum / count;") },
            { criterion: "getBest and the static getTotalScores return the correct values.", example: java(`public class ScoreKeeper {\n    private static int totalScores = 0;\n    private String name;\n    private int sum;\n    private int count;\n    private int best;\n    public ScoreKeeper(String name) {\n        this.name = name;\n        best = -1;\n    }\n    public void addScore(int s) {\n        sum += s;\n        count++;\n        totalScores++;\n        if (s > best) {\n            best = s;\n        }\n    }\n    public double getAverage() {\n        if (count == 0) {\n            return 0.0;\n        }\n        return (double) sum / count;\n    }\n    public int getBest() {\n        return best;\n    }\n    public static int getTotalScores() {\n        return totalScores;\n    }\n}`) },
          ],
        },
      ],
    };
  },
};

/* ---------------- Question 3: ArrayList ---------------- */

const TITLES = ["Morning Light", "River Road", "Static", "Paper Moon", "Echoes", "Slow Train", "Blue Hour", "Northbound", "Glass City", "Afterglow"];
const ARTISTS = ["Nova", "The Pines", "Kai", "Luma"];

const q3Playlist: FrqTemplate = {
  key: "frq-csa-playlist",
  topics: ["arraylist-algorithms", "arraylist-traversals", "arraylist-methods"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "arraylist",
  minutes: 23,
  gen(r) {
    const songs = r.sample(TITLES, 6).map((title) => ({ title, artist: r.pick(ARTISTS.slice(0, 3)), sec: r.int(90, 300) }));
    const artist = songs[r.int(0, 5)]!.artist;
    const total = songs.filter((s) => s.artist === artist).reduce((a, s) => a + s.sec, 0);
    const min = r.int(15, 25) * 10;
    const kept = songs.filter((s) => s.sec >= min);
    if (kept.length === songs.length || kept.length === 0) throw new Retry();
    return {
      title: "Playlist",
      stimulus: {
        text: `A ${ic("Song")} has a title, an artist and a length in seconds.\n\n${java(`public class Song {\n    public String getTitle() { /* implementation not shown */ }\n    public String getArtist() { /* implementation not shown */ }\n    public int getSeconds() { /* implementation not shown */ }\n}\npublic class Playlist {\n    private ArrayList<Song> songs;\n    /** Returns the total length, in seconds, of the songs by the given artist. */\n    public int totalTime(String artist) { /* part (a) */ }\n    /** Removes every song shorter than min seconds and returns the number removed. */\n    public int removeShort(int min) { /* part (b) */ }\n}`)}\n\nSuppose ${ic("songs")} contains, in order: ${songs.map((s) => `"${s.title}" by ${s.artist} (${s.sec} s)`).join("; ")}. Then ${ic(`totalTime("${artist}")`)} returns ${total}, and ${ic(`removeShort(${min})`)} returns ${songs.length - kept.length}, leaving ${kept.map((s) => `"${s.title}"`).join(", ")} in their original order.`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("totalTime")}.`,
          rubric: [
            { criterion: "Traverses every song in the list.", example: ic("for (Song s : songs)") },
            { criterion: "Compares artists with equals, not ==.", example: ic("s.getArtist().equals(artist)") },
            { criterion: "Adds getSeconds for matching songs and returns the total.", example: java(`public int totalTime(String artist) {\n    int total = 0;\n    for (Song s : songs) {\n        if (s.getArtist().equals(artist)) {\n            total += s.getSeconds();\n        }\n    }\n    return total;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("removeShort")}.`,
          rubric: [
            { criterion: "Traverses the list in a way that does not skip elements when one is removed (backward, or not advancing after a removal).", example: ic("for (int i = songs.size() - 1; i >= 0; i--)") },
            { criterion: "Identifies songs shorter than min.", example: ic("songs.get(i).getSeconds() < min") },
            { criterion: "Removes them with remove(i) and does not use an enhanced for loop while removing.", example: ic("songs.remove(i);") },
            { criterion: "Counts and returns the number removed.", example: java(`public int removeShort(int min) {\n    int removed = 0;\n    for (int i = songs.size() - 1; i >= 0; i--) {\n        if (songs.get(i).getSeconds() < min) {\n            songs.remove(i);\n            removed++;\n        }\n    }\n    return removed;\n}`) },
          ],
        },
      ],
    };
  },
};

const q3Readings: FrqTemplate = {
  key: "frq-csa-sensor-log",
  topics: ["arraylist-algorithms", "arraylist-methods", "wrapper-classes"],
  skills: ["1", "3"],
  difficulty: 4,
  calc: false,
  format: "arraylist",
  minutes: 23,
  gen(r) {
    const days = [...new Set(ints(r, 6, 1, 30))].sort((a, b) => a - b);
    if (days.length < 4) throw new Retry();
    const temps = days.map(() => r.int(5, 35));
    const t = r.int(12, 28);
    const above = temps.filter((x) => x > t).length;
    let newDay = r.int(2, 29);
    while (days.includes(newDay)) newDay = r.int(2, 29);
    const after = [...days, newDay].sort((a, b) => a - b);
    return {
      title: "Sensor log",
      stimulus: {
        text: `A ${ic("Reading")} stores the day of the month and a temperature. A ${ic("SensorLog")} keeps readings in increasing order of day, with no two readings on the same day.\n\n${java(`public class Reading {\n    public Reading(int day, int temp) { /* not shown */ }\n    public int getDay() { /* not shown */ }\n    public int getTemp() { /* not shown */ }\n}\npublic class SensorLog {\n    private ArrayList<Reading> readings;\n    /** Returns the number of readings with a temperature greater than t. */\n    public int countAbove(int t) { /* part (a) */ }\n    /** Inserts r so the list stays in increasing order of day.\n        Precondition: no reading in the list has the same day as r. */\n    public void addReading(Reading r) { /* part (b) */ }\n}`)}\n\nIf the readings are (day, temp) ${days.map((d, i) => `(${d}, ${temps[i]})`).join(", ")}, then ${ic(`countAbove(${t})`)} returns ${above}. Adding a reading for day ${newDay} gives the days ${listStr(after)}.`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("countAbove")}.`,
          rubric: [
            { criterion: "Traverses all readings.", example: ic("for (Reading rd : readings)") },
            { criterion: "Compares getTemp() with t using a strict inequality.", example: ic("if (rd.getTemp() > t)") },
            { criterion: "Counts and returns the result.", example: java(`public int countAbove(int t) {\n    int count = 0;\n    for (Reading rd : readings) {\n        if (rd.getTemp() > t) {\n            count++;\n        }\n    }\n    return count;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("addReading")}.`,
          rubric: [
            { criterion: "Finds the first index whose day is greater than r's day, without going out of bounds.", example: ic("while (i < readings.size() && readings.get(i).getDay() < r.getDay()) i++;") },
            { criterion: "Inserts with add(index, r).", example: ic("readings.add(i, r);") },
            { criterion: "Handles inserting at the front and at the end (including an empty list).", example: java(`public void addReading(Reading r) {\n    int i = 0;\n    while (i < readings.size() && readings.get(i).getDay() < r.getDay()) {\n        i++;\n    }\n    readings.add(i, r);\n}`) },
          ],
        },
      ],
    };
  },
};

const ITEMS = ["pencils", "notebooks", "markers", "folders", "erasers", "rulers", "binders", "glue"];

const q3Orders: FrqTemplate = {
  key: "frq-csa-orders",
  topics: ["arraylist-algorithms", "arraylist-traversals", "casting-and-range"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "arraylist",
  minutes: 23,
  gen(r) {
    const orders = r.sample(ITEMS, 5).map((item) => ({ item, qty: r.int(1, 30), price: r.int(1, 9) }));
    const revenue = orders.reduce((a, o) => a + o.qty * o.price, 0);
    const minQty = r.int(8, 20);
    const big = orders.filter((o) => o.qty >= minQty).map((o) => `"${o.item}"`);
    if (big.length === 0 || big.length === orders.length) throw new Retry();
    return {
      title: "Store orders",
      stimulus: {
        text: `An ${ic("Order")} has an item name, a quantity and a price per unit in dollars.\n\n${java(`public class Order {\n    public String getItem() { /* not shown */ }\n    public int getQuantity() { /* not shown */ }\n    public int getPrice() { /* not shown */ }\n}\npublic class OrderBook {\n    private ArrayList<Order> orders;\n    /** Returns the total revenue: the sum of quantity times price for all orders. */\n    public int revenue() { /* part (a) */ }\n    /** Returns a new list of the item names of orders with quantity at least minQty,\n        in the same order. The orders list is not changed. */\n    public ArrayList<String> bigOrders(int minQty) { /* part (b) */ }\n}`)}\n\nWith the orders ${orders.map((o) => `(${o.item}, ${o.qty}, ${o.price})`).join(", ")}, ${ic("revenue()")} returns ${revenue} and ${ic(`bigOrders(${minQty})`)} returns ${ic(listStr(big))}.`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("revenue")}.`,
          rubric: [
            { criterion: "Traverses all orders.", example: ic("for (Order o : orders)") },
            { criterion: "Multiplies quantity by price for each order.", example: ic("o.getQuantity() * o.getPrice()") },
            { criterion: "Accumulates and returns the total.", example: java(`public int revenue() {\n    int total = 0;\n    for (Order o : orders) {\n        total += o.getQuantity() * o.getPrice();\n    }\n    return total;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("bigOrders")}.`,
          rubric: [
            { criterion: "Creates a new ArrayList of String.", example: ic("ArrayList<String> result = new ArrayList<String>();") },
            { criterion: "Checks each order's quantity against minQty (at least).", example: ic("if (o.getQuantity() >= minQty)") },
            { criterion: "Adds the item name, keeps the order, does not change orders, and returns the new list.", example: java(`public ArrayList<String> bigOrders(int minQty) {\n    ArrayList<String> result = new ArrayList<String>();\n    for (Order o : orders) {\n        if (o.getQuantity() >= minQty) {\n            result.add(o.getItem());\n        }\n    }\n    return result;\n}`) },
          ],
        },
      ],
    };
  },
};

/* ---------------- Question 4: 2D array ---------------- */

const gridText = (g: number[][]) => java(g.map((row) => row.map((x) => String(x).padStart(2)).join(" ")).join("\n"));

const q4Seating: FrqTemplate = {
  key: "frq-csa-seating",
  topics: ["2d-array-algorithms", "2d-array-traversals"],
  skills: ["1", "3"],
  difficulty: 4,
  calc: false,
  format: "2d-array",
  minutes: 22,
  gen(r) {
    const R = 4;
    const C = r.int(5, 7);
    const g = Array.from({ length: R }, () => Array.from({ length: C }, () => (r.next() < 0.45 ? 0 : r.int(1, 99))));
    const k = r.int(2, 3);
    const emptyIn = (row: number[]) => row.filter((x) => x === 0).length;
    const block = g.findIndex((row) => {
      let run = 0;
      for (const x of row) {
        run = x === 0 ? run + 1 : 0;
        if (run >= k) return true;
      }
      return false;
    });
    const rr = r.int(0, R - 1);
    return {
      title: "Seating chart",
      stimulus: {
        text: `A ${ic("Theater")} stores its seats in a 2D array of student ID numbers. A value of 0 means the seat is empty.\n\n${java(`public class Theater {\n    private int[][] seats;\n    /** Returns the number of empty seats in the given row. */\n    public int emptyInRow(int row) { /* part (a) */ }\n    /** Returns the index of the first row containing at least k adjacent empty seats,\n        or -1 if there is none. */\n    public int findBlock(int k) { /* part (b) */ }\n}`)}\n\nFor the chart below, ${ic(`emptyInRow(${rr})`)} returns ${emptyIn(g[rr]!)} and ${ic(`findBlock(${k})`)} returns ${block}.\n\n${gridText(g)}`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("emptyInRow")}.`,
          rubric: [
            { criterion: "Traverses every column of the given row.", example: ic("for (int c = 0; c < seats[row].length; c++)") },
            { criterion: "Counts seats equal to 0 and returns the count.", example: java(`public int emptyInRow(int row) {\n    int count = 0;\n    for (int c = 0; c < seats[row].length; c++) {\n        if (seats[row][c] == 0) {\n            count++;\n        }\n    }\n    return count;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("findBlock")}.`,
          rubric: [
            { criterion: "Traverses rows in order from 0.", example: ic("for (int r = 0; r < seats.length; r++)") },
            { criterion: "Tracks the current run of adjacent empty seats, resetting it at an occupied seat and at the start of each row.", example: ic("run = (seats[r][c] == 0) ? run + 1 : 0;") },
            { criterion: "Returns the row index as soon as a run reaches k.", example: ic("if (run >= k) return r;") },
            { criterion: "Returns -1 when no row qualifies.", example: java(`public int findBlock(int k) {\n    for (int r = 0; r < seats.length; r++) {\n        int run = 0;\n        for (int c = 0; c < seats[r].length; c++) {\n            if (seats[r][c] == 0) {\n                run++;\n            } else {\n                run = 0;\n            }\n            if (run >= k) {\n                return r;\n            }\n        }\n    }\n    return -1;\n}`) },
          ],
        },
      ],
    };
  },
};

const q4Terrain: FrqTemplate = {
  key: "frq-csa-terrain-peaks",
  topics: ["2d-array-algorithms", "compound-boolean-expressions"],
  skills: ["1", "3"],
  difficulty: 4,
  calc: false,
  format: "2d-array",
  minutes: 22,
  gen(r) {
    const R = 4;
    const C = 5;
    const g = Array.from({ length: R }, () => ints(r, C, 1, 9));
    const peak = (i: number, j: number) => {
      const v = g[i]![j]!;
      const nb: [number, number][] = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];
      return nb.every(([a, b]) => a < 0 || b < 0 || a >= R || b >= C || g[a]![b]! < v);
    };
    let count = 0;
    for (let i = 0; i < R; i++) for (let j = 0; j < C; j++) if (peak(i, j)) count++;
    const pi = r.int(1, R - 2);
    const pj = r.int(1, C - 2);
    return {
      title: "Terrain peaks",
      stimulus: {
        text: `A ${ic("Terrain")} stores heights in a 2D array. A cell is a **peak** if its height is strictly greater than each of its neighbors above, below, left and right that are inside the grid.\n\n${java(`public class Terrain {\n    private int[][] heights;\n    /** Returns true if the cell at (r, c) is a peak. Precondition: (r, c) is in the grid. */\n    public boolean isPeak(int r, int c) { /* part (a) */ }\n    /** Returns the number of peaks in the grid. */\n    public int countPeaks() { /* part (b) */ }\n}`)}\n\nFor the grid below, ${ic(`isPeak(${pi}, ${pj})`)} returns ${peak(pi, pj)} and ${ic("countPeaks()")} returns ${count}.\n\n${gridText(g)}`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("isPeak")}.`,
          rubric: [
            { criterion: "Checks each of the four neighbors.", example: "above, below, left and right" },
            { criterion: "Checks bounds before reading a neighbor, so edge cells do not cause an exception.", example: ic("r > 0 && heights[r - 1][c] >= h") },
            { criterion: "Uses strict comparison and returns the correct boolean.", example: java(`public boolean isPeak(int r, int c) {\n    int h = heights[r][c];\n    if (r > 0 && heights[r - 1][c] >= h) return false;\n    if (r < heights.length - 1 && heights[r + 1][c] >= h) return false;\n    if (c > 0 && heights[r][c - 1] >= h) return false;\n    if (c < heights[0].length - 1 && heights[r][c + 1] >= h) return false;\n    return true;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("countPeaks")}. Assume ${ic("isPeak")} works as specified, regardless of what you wrote in part (a).`,
          rubric: [
            { criterion: "Traverses every cell with nested loops and correct bounds.", example: ic("for (int r = 0; r < heights.length; r++) for (int c = 0; c < heights[0].length; c++)") },
            { criterion: "Calls isPeak on each cell.", example: ic("if (isPeak(r, c)) count++;") },
            { criterion: "Returns the count.", example: java(`public int countPeaks() {\n    int count = 0;\n    for (int r = 0; r < heights.length; r++) {\n        for (int c = 0; c < heights[0].length; c++) {\n            if (isPeak(r, c)) {\n                count++;\n            }\n        }\n    }\n    return count;\n}`) },
          ],
        },
      ],
    };
  },
};

const q4Gradebook: FrqTemplate = {
  key: "frq-csa-gradebook",
  topics: ["2d-array-algorithms", "2d-array-traversals", "casting-and-range"],
  skills: ["1", "3"],
  difficulty: 3,
  calc: false,
  format: "2d-array",
  minutes: 22,
  gen(r) {
    const R = r.int(3, 4);
    const C = 4;
    const g = Array.from({ length: R }, () => ints(r, C, 50, 100));
    const c0 = r.int(0, C - 1);
    const avg = g.reduce((s, row) => s + row[c0]!, 0) / R;
    const imp = g.map((row) => row[C - 1]! - row[0]!);
    const best = imp.indexOf(Math.max(...imp));
    if (imp.filter((x) => x === imp[best]).length > 1) throw new Retry();
    return {
      title: "Gradebook",
      stimulus: {
        text: `A ${ic("Gradebook")} stores test scores in a 2D array: each row is a student and each column is a test, in the order the tests were given.\n\n${java(`public class Gradebook {\n    private int[][] scores;\n    /** Returns the average score on test c. */\n    public double testAverage(int c) { /* part (a) */ }\n    /** Returns the row index of the student whose last score minus first score is greatest.\n        If there is a tie, returns the smallest such index. */\n    public int mostImproved() { /* part (b) */ }\n}`)}\n\nFor the scores below, ${ic(`testAverage(${c0})`)} returns ${fmt(avg)} and ${ic("mostImproved()")} returns ${best}.\n\n${gridText(g)}`,
      },
      parts: [
        {
          prompt: `Write the method ${ic("testAverage")}.`,
          rubric: [
            { criterion: "Traverses every row of column c.", example: ic("for (int r = 0; r < scores.length; r++) sum += scores[r][c];") },
            { criterion: "Divides by the number of rows without integer division and returns the result.", example: java(`public double testAverage(int c) {\n    int sum = 0;\n    for (int r = 0; r < scores.length; r++) {\n        sum += scores[r][c];\n    }\n    return (double) sum / scores.length;\n}`) },
          ],
        },
        {
          prompt: `Write the method ${ic("mostImproved")}.`,
          rubric: [
            { criterion: "Computes last minus first for each row.", example: ic("scores[r][scores[r].length - 1] - scores[r][0]") },
            { criterion: "Initializes the best from data (row 0), not from 0.", example: ic("int best = 0; int bestDiff = scores[0][last] - scores[0][0];") },
            { criterion: "Updates only on a strictly greater difference (keeps the smallest index in a tie) and returns the index.", example: java(`public int mostImproved() {\n    int last = scores[0].length - 1;\n    int best = 0;\n    int bestDiff = scores[0][last] - scores[0][0];\n    for (int r = 1; r < scores.length; r++) {\n        int diff = scores[r][last] - scores[r][0];\n        if (diff > bestDiff) {\n            bestDiff = diff;\n            best = r;\n        }\n    }\n    return best;\n}`) },
          ],
        },
      ],
    };
  },
};

export const csaMethods = [q1Strings, q1Digits, q1Parking];
export const csaClass = [q2PunchCard, q2Thermostat, q2ScoreKeeper];
export const csaArrayList = [q3Playlist, q3Readings, q3Orders];
export const csa2d = [q4Seating, q4Terrain, q4Gradebook];
