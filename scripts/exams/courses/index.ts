import type { CourseExamConfig } from "../build";
import { biology } from "./biology";
import { calculusAb } from "./calculus-ab";
import { calculusBc } from "./calculus-bc";
import { comparativeGovernment } from "./comparative-government";
import { businessPersonalFinance, cybersecurity } from "./career-kickstart";
import { chemistry } from "./chemistry";
import { computerSciencePrinciples } from "./computer-science-principles";
import { computerScienceA } from "./computer-science-a";
import { macroeconomics } from "./macroeconomics";
import { microeconomics } from "./microeconomics";
import { physicsCEM, physicsCMechanics } from "./physics-c";
import { statistics } from "./statistics";

export const courseConfigs: CourseExamConfig[] = [calculusAb, calculusBc, macroeconomics, microeconomics, computerScienceA, computerSciencePrinciples, biology, physicsCMechanics, physicsCEM, cybersecurity, businessPersonalFinance, statistics, comparativeGovernment, chemistry];
