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

export type ValidationResult = {
  isValid: boolean;
  message: string;
};

export const validateInput = (input: string): ValidationResult => {
  // 空チェック
  if (input.trim() === "") {
    return { isValid: false, message: "入力が空です" };
  }

  const num = Number(input);

  // 整数チェック
  if (!isInteger(num)) {
    return { isValid: false, message: "整数を入力してください" };
  }

  // 範囲チェック (1〜999)
  if (!isWithinRange({ num, min: 1, max: 999 })) {
    return { isValid: false, message: "1から999の範囲で入力してください" };
  }

  return { isValid: true, message: "" };
};

export const getValidNumber = async ({
  readline,
  prompt,
}: {
  readline: { question: (prompt: string) => Promise<string> };
  prompt: string;
}): Promise<number> => {
  while (true) {
    const input = await readline.question(prompt);
    const result = validateInput(input);

    if (result.isValid) {
      return Number(input);
    }

    console.log(result.message);
  }
};

export const calculateSum = ({
  num1,
  num2,
}: {
  num1: number;
  num2: number;
}): number => {
  return num1 + num2;
};

export const main = async (rl: typeof readline): Promise<void> => {
  const readlineInterface = createReadlineInterface(rl);

  const num1 = await getValidNumber({
    readline: readlineInterface,
    prompt: "一つ目の値を入力してください: ",
  });

  const num2 = await getValidNumber({
    readline: readlineInterface,
    prompt: "二つ目の値を入力してください: ",
  });

  const sum = calculateSum({ num1, num2 });

  console.log(`合計値は: ${sum} です！`);

  readlineInterface.close();
};

// プログラム実行
main(readline);
