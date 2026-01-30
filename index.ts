import * as readline from "readline/promises";

export const createReadlineInterface = (rl: typeof readline): readline.Interface => {
  return rl.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

export const isInteger = (input: unknown): boolean => {
  return Number.isInteger(input);
};

export const isWithinRange = ({
  num,
  min,
  max,
}: {
  num: number;
  min: number;
  max: number;
}): boolean => {
  return num >= min && num <= max;
};
