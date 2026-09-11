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
    return { isValid: false, message: "値を入力してください。" };
  }

  const num = Number(input);

  // 整数チェック
  if (!isInteger(num)) {
    return { isValid: false, message: "1 ~ 999 の整数を入力してください。" };
  }

  // 範囲チェック (1〜999)
  if (!isWithinRange({ num, min: 1, max: 999 })) {
    return { isValid: false, message: "1 ~ 999 の整数を入力してください。" };
  }

  return { isValid: true, message: "" };
};

export const getValidNumber = async ({
  readline,
  prompt,
}: {
  readline: { question: (query: string) => Promise<string> };
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

export const main = async (): Promise<void> => {
  const rl = createReadlineInterface(readline);

  try {
    const num1 = await getValidNumber({ readline: rl, prompt: "一つ目の数字を入力してください......" });
    const num2 = await getValidNumber({ readline: rl, prompt: "二つ目の数字を入力してください......" });

    const sum = calculateSum({ num1, num2 });
    console.log(`合計値は: ${sum} です！`);
  } finally {
    rl.close();
  }
};

// node index.ts で直接実行した場合のみ起動する（import 時は起動しない）
if (import.meta.main) {
  await main();
}
