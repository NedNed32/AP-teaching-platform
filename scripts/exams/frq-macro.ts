/* AP Macroeconomics free-response templates: one long question and two short ones per exam. */
import { COUNTRIES, CURRENCIES, num } from "./econ-lib";
import type { FrqTemplate } from "./types";

export const macroLongMonetary: FrqTemplate = {
  key: "frq-ma-long-monetary",
  topics: ["ad-as-equilibrium", "monetary-policy", "money-market", "fx-and-net-exports", "long-run-self-adjustment"],
  skills: ["1", "2", "4"],
  difficulty: 3,
  calc: false,
  format: "long",
  minutes: 25,
  gen(r) {
    const [home, other] = r.sample(COUNTRIES, 2) as [string, string];
    const c = CURRENCIES[home]!;
    const rec = r.next() < 0.5;
    const nru = r.pick([4, 4.5, 5]);
    const u = rec ? nru + r.pick([2, 2.5, 3]) : nru - r.pick([0.5, 1, 1.5]);
    const tool = rec ? "buy government bonds" : "sell government bonds";
    return {
      title: `Monetary policy in ${home}`,
      stimulus: {
        text: `${home} has an open economy with flexible exchange rates. Its unemployment rate is currently ${u}%, and its natural rate of unemployment is ${nru}%. ${home}'s main trading partner is ${other}.`,
      },
      parts: [
        {
          prompt: `Describe a correctly labeled AD–AS graph for ${home}, showing current output (Y₁), current price level (PL₁) and full-employment output (Yf). Is the economy in a recessionary or an inflationary gap?`,
          rubric: [
            { criterion: "Labels the axes (price level, real GDP) and the AD, SRAS and LRAS curves.", example: "Vertical axis: price level; horizontal axis: real GDP; downward AD, upward SRAS, vertical LRAS." },
            { criterion: `Shows short-run equilibrium ${rec ? "left" : "right"} of LRAS, with Y₁ ${rec ? "below" : "above"} Yf.`, example: `Y₁ ${rec ? "<" : ">"} Yf.` },
            { criterion: "Identifies the gap.", example: rec ? "A recessionary gap, because unemployment is above the natural rate." : "An inflationary gap, because unemployment is below the natural rate." },
          ],
        },
        {
          prompt: `Identify the open market operation the central bank of ${home} should use to restore full employment.`,
          rubric: [{ criterion: "Identifies the correct operation.", example: `The central bank should ${tool}.` }],
        },
        {
          prompt: `Describe a correctly labeled money market graph for ${home} and show the effect of the policy in part (b) on the nominal interest rate.`,
          rubric: [
            { criterion: "Labels the axes (nominal interest rate, quantity of money) with a vertical MS and downward MD.", example: "Vertical axis: nominal interest rate; MS vertical; MD downward-sloping." },
            { criterion: `Shows MS shifting ${rec ? "right" : "left"} and the nominal interest rate ${rec ? "falling" : "rising"}.`, example: `MS₁ to MS₂ ${rec ? "right" : "left"}; i₁ to i₂ ${rec ? "lower" : "higher"}.` },
          ],
        },
        {
          prompt: "Given your answer in part (c), what happens to real GDP and the price level in the short run? Explain.",
          rubric: [
            { criterion: "Real GDP and the price level change in the correct direction.", example: `Both ${rec ? "rise" : "fall"}.` },
            { criterion: "Explains through interest-sensitive spending.", example: `A ${rec ? "lower" : "higher"} interest rate ${rec ? "raises" : "reduces"} investment and consumption, shifting AD ${rec ? "right" : "left"}.` },
          ],
        },
        {
          prompt: `How will the change in the interest rate affect the value of the ${c} relative to ${other}'s currency? Explain, and state the effect on ${home}'s net exports.`,
          rubric: [
            { criterion: "Correct change in the currency's value with explanation.", example: `The ${c} ${rec ? "depreciates" : "appreciates"}, because ${rec ? "lower interest rates reduce foreign demand for" : "higher interest rates increase foreign demand for"} ${home}'s financial assets.` },
            { criterion: "Correct effect on net exports.", example: `Net exports ${rec ? "increase" : "decrease"}.` },
          ],
        },
      ],
    };
  },
};

export const macroLongFiscal: FrqTemplate = {
  key: "frq-ma-long-fiscal",
  topics: ["fiscal-policy", "multipliers", "loanable-funds-market", "crowding-out", "economic-growth"],
  skills: ["1", "2", "3", "4"],
  difficulty: 3,
  calc: false,
  format: "long",
  minutes: 25,
  gen(r) {
    const home = r.pick(COUNTRIES);
    const mpc = r.pick([0.5, 0.75, 0.8, 0.9]);
    const mult = 1 / (1 - mpc);
    const dG = r.int(2, 10) * 10;
    const gap = dG * mult;
    return {
      title: `Fiscal policy in ${home}`,
      stimulus: {
        text: `${home} is currently producing ${num(gap)} billion below its full-employment output. The marginal propensity to consume is ${mpc}. The government plans to close the gap with a change in government purchases, financed by borrowing.`,
      },
      parts: [
        {
          prompt: "Calculate the change in government purchases needed to close the gap, assuming no crowding out. Show your work.",
          rubric: [
            { criterion: "Calculates the spending multiplier.", example: `1 ÷ (1 − ${mpc}) = ${num(mult)}` },
            { criterion: "Gives the change in government purchases.", example: `${num(gap)} ÷ ${num(mult)} = ${num(dG)} billion increase.` },
          ],
        },
        {
          prompt: "If the government instead used a change in taxes, would the change in taxes need to be larger than, smaller than or equal to your answer in part (a)? Explain.",
          rubric: [{ criterion: "Larger, because part of a tax cut is saved, so the tax multiplier is smaller.", example: `The tax multiplier is ${num(mpc * mult)}, less than ${num(mult)}, so a larger tax cut (${num(gap / (mpc * mult))} billion) is needed.` }],
        },
        {
          prompt: "Describe a correctly labeled graph of the loanable funds market and show the effect of the government's borrowing on the real interest rate.",
          rubric: [
            { criterion: "Labels the axes (real interest rate, quantity of loanable funds), with upward supply and downward demand.", example: "Vertical axis: real interest rate." },
            { criterion: "Shows demand shifting right (or supply left) and a higher real interest rate.", example: "D₁ to D₂; r₁ to r₂, higher." },
          ],
        },
        {
          prompt: "Given your answer in part (c), what happens to private investment? Explain how this affects long-run economic growth.",
          rubric: [
            { criterion: "Private investment falls (crowding out).", example: "A higher real interest rate makes borrowing for investment more expensive." },
            { criterion: "Links lower investment to slower growth.", example: "Less investment means slower growth of the capital stock, so LRAS grows more slowly." },
          ],
        },
        {
          prompt: "Assume the policy closes the gap. What happens to the unemployment rate relative to the natural rate?",
          rubric: [{ criterion: "Unemployment falls to the natural rate.", example: "Cyclical unemployment disappears; unemployment equals the natural rate." }],
        },
      ],
    };
  },
};

export const macroShortBanking: FrqTemplate = {
  key: "frq-ma-short-banking",
  topics: ["banking-and-money-supply", "monetary-policy"],
  skills: ["3"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const rr = r.pick([0.1, 0.2, 0.25]);
    const dep = r.int(2, 20) * 1000;
    const excess = dep * (1 - rr);
    const mult = 1 / rr;
    return {
      title: "Banking and the money supply",
      stimulus: { text: `The required reserve ratio is ${rr * 100}%. A customer deposits ${num(dep)} of currency into a checking account at First Bank. Assume banks hold no excess reserves before the deposit.` },
      parts: [
        {
          prompt: "By how much do First Bank's required reserves change? By how much do its excess reserves change?",
          rubric: [
            { criterion: "Required reserves.", example: `${rr} × ${num(dep)} = ${num(dep * rr)}` },
            { criterion: "Excess reserves.", example: `${num(dep)} − ${num(dep * rr)} = ${num(excess)}` },
          ],
        },
        {
          prompt: "What is the maximum amount by which the money supply can increase as a result of this deposit? Show your work.",
          rubric: [{ criterion: "Multiplies excess reserves by the money multiplier.", example: `${num(excess)} × ${mult} = ${num(excess * mult)}` }],
        },
        {
          prompt: "Explain why the actual increase in the money supply is likely to be smaller.",
          rubric: [{ criterion: "Banks may hold excess reserves, or the public may hold some money as cash (leakages).", example: "If banks keep some excess reserves or borrowers withdraw cash, less is re-deposited and lent." }],
        },
        {
          prompt: "If instead the central bank had bought this same amount of bonds from First Bank, would the maximum increase in the money supply be larger, smaller or the same? Explain.",
          rubric: [{ criterion: "Larger: the whole purchase is new excess reserves and new money.", example: `Maximum increase ${num(dep)} × ${mult} = ${num(dep * mult)}.` }],
        },
      ],
    };
  },
};

export const macroShortFx: FrqTemplate = {
  key: "frq-ma-short-fx",
  topics: ["foreign-exchange-market", "fx-policy-effects", "fx-and-net-exports"],
  skills: ["1", "4"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const [home, other] = r.sample(COUNTRIES, 2) as [string, string];
    const ch = CURRENCIES[home]!;
    const co = CURRENCIES[other]!;
    const tastes = r.next() < 0.5;
    return {
      title: "The foreign exchange market",
      stimulus: {
        text: tastes
          ? `Consumers in ${other} develop a strong preference for goods produced in ${home}. ${home}'s currency is the ${ch}; ${other}'s is the ${co}.`
          : `${other}'s central bank raises interest rates sharply while ${home}'s rates are unchanged. ${home}'s currency is the ${ch}; ${other}'s is the ${co}.`,
      },
      parts: [
        {
          prompt: `Describe a correctly labeled graph of the foreign exchange market for the ${ch}, and show the effect of this change.`,
          rubric: [
            { criterion: `Labels the axes: price of the ${ch} (for example ${co}s per ${ch}) and quantity of ${ch}s.`, example: `Vertical axis: ${co}s per ${ch}.` },
            { criterion: "Shows the correct curve shifting in the correct direction.", example: tastes ? `Demand for ${ch}s shifts right.` : `Demand for ${ch}s shifts left (or supply of ${ch}s shifts right) as investors move funds to ${other}.` },
          ],
        },
        {
          prompt: `What happens to the value of the ${ch} relative to the ${co}?`,
          rubric: [{ criterion: "Correct direction.", example: tastes ? `The ${ch} appreciates.` : `The ${ch} depreciates.` }],
        },
        {
          prompt: `Given your answer in part (b), what happens to ${home}'s exports to ${other}? Explain.`,
          rubric: [{ criterion: "Correct effect with reasoning about relative prices.", example: tastes ? `The appreciation makes ${home}'s goods more expensive in ${co}s, so exports tend to fall from what they would otherwise be (partly offsetting the stronger tastes).` : `The depreciation makes ${home}'s goods cheaper for ${other}'s buyers, so exports increase.` }],
        },
      ],
    };
  },
};

export const macroShortPhillips: FrqTemplate = {
  key: "frq-ma-short-phillips",
  topics: ["phillips-curve", "ad-as-short-run-changes"],
  skills: ["1", "4"],
  difficulty: 3,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const nru = r.pick([4, 5, 6]);
    const inf = r.pick([2, 3]);
    const kind = r.pick(["ad", "oil"] as const);
    return {
      title: "The Phillips curve",
      stimulus: { text: `An economy is in long-run equilibrium with an unemployment rate of ${nru}% and inflation of ${inf}%. ${kind === "ad" ? "The government then sharply increases its purchases." : "A sharp, lasting rise in the price of oil then hits the economy."}` },
      parts: [
        {
          prompt: "Describe a correctly labeled graph with the short-run and long-run Phillips curves, labeling the current long-run equilibrium as point A.",
          rubric: [
            { criterion: "Labels the axes (inflation rate, unemployment rate), a downward SRPC and a vertical LRPC.", example: `LRPC vertical at ${nru}%.` },
            { criterion: "Point A where the SRPC crosses the LRPC.", example: `A at (${nru}%, ${inf}%).` },
          ],
        },
        {
          prompt: "Show the short-run effect of the event on the Phillips curve graph, labeling the new point B.",
          rubric: [{ criterion: kind === "ad" ? "Movement up and left along the SRPC to B." : "SRPC shifts right; B has higher inflation and higher unemployment.", example: kind === "ad" ? `B: unemployment below ${nru}%, inflation above ${inf}%.` : `B: unemployment above ${nru}%, inflation above ${inf}%.` }],
        },
        {
          prompt: "In the long run, what happens to the unemployment rate? Explain.",
          rubric: [{ criterion: "Returns to the natural rate, with an explanation based on wage or expectation adjustment.", example: `Unemployment returns to ${nru}%, because nominal wages and inflation expectations adjust, shifting SRAS and the SRPC.` }],
        },
      ],
    };
  },
};

export const macroShortIndicators: FrqTemplate = {
  key: "frq-ma-short-indicators",
  topics: ["unemployment", "real-vs-nominal-gdp", "price-indices-and-inflation"],
  skills: ["3"],
  difficulty: 2,
  calc: false,
  format: "short",
  minutes: 17,
  gen(r) {
    const E = r.int(80, 160);
    const U = r.int(5, 16);
    const NLF = r.int(40, 100);
    const defl1 = 100;
    const defl2 = r.pick([104, 105, 108, 110]);
    const real2 = r.int(50, 90) * 100;
    const nom2 = (real2 * defl2) / 100;
    return {
      title: "Measuring the economy",
      stimulus: { text: `In an economy, ${E} million people are employed, ${U} million are unemployed, and ${NLF} million adults are not in the labor force. Last year (the base year) the GDP deflator was ${defl1}; this year it is ${defl2}, and nominal GDP is ${num(nom2)} billion.` },
      parts: [
        {
          prompt: "Calculate the unemployment rate. Show your work.",
          rubric: [{ criterion: "Divides the unemployed by the labor force.", example: `${U} ÷ (${E} + ${U}) × 100 ≈ ${((100 * U) / (E + U)).toFixed(1)}%` }],
        },
        {
          prompt: "Calculate the labor force participation rate.",
          rubric: [{ criterion: "Divides the labor force by the adult population.", example: `${E + U} ÷ ${E + U + NLF} × 100 ≈ ${((100 * (E + U)) / (E + U + NLF)).toFixed(1)}%` }],
        },
        {
          prompt: "Calculate real GDP this year, in base-year prices.",
          rubric: [{ criterion: "Divides nominal GDP by the deflator over 100.", example: `${num(nom2)} ÷ ${defl2 / 100} = ${num(real2)} billion` }],
        },
        {
          prompt: "Some unemployed workers become discouraged and stop looking for work. What happens to the measured unemployment rate? Explain.",
          rubric: [{ criterion: "It falls, because discouraged workers leave the labor force and are no longer counted as unemployed.", example: "Both the number unemployed and the labor force fall, and the rate decreases." }],
        },
      ],
    };
  },
};

export const macroLong = [macroLongMonetary, macroLongFiscal];
export const macroShort = [macroShortBanking, macroShortFx, macroShortPhillips, macroShortIndicators];
