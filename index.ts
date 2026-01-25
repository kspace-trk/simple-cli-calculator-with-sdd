import * as readline from 'readline/promises';

/**
 * readline interface を作成して返却する関数
 * @param rl - readline モジュール
 * @returns readline.Interface インスタンス
 */
function createReadlineInterface(rl: typeof readline): readline.Interface {
  return rl.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * 入力値が整数かどうかを確認する関数
 * @param input - 確認する値
 * @returns 整数の場合は true, そうでない場合は false
 */
function isInteger(input: unknown): boolean {
  return Number.isInteger(input);
}

/**
 * 数字が指定した範囲内かどうかを確認する関数
 * @param params - 確認対象と範囲を含むオブジェクト
 * @param params.num - 確認対象の数値
 * @param params.min - 最小値
 * @param params.max - 最大値
 * @returns 範囲内の場合は true, そうでない場合は false
 */
function isWithinRange({ num, min, max }: { num: number; min: number; max: number }): boolean {
  return num >= min && num <= max;
}

/**
 * バリデーション結果の型定義
 */
type ValidationResult = {
  isValid: boolean;
  message: string;
};

/**
 * 入力値に対して空チェック、整数チェック、範囲チェックを行う関数
 * @param input - 検証する入力値
 * @param min - 最小値
 * @param max - 最大値
 * @returns ValidationResult - バリデーション結果
 */
function validateInput(input: string, min: number, max: number): ValidationResult {
  // 空チェック
  if (input.trim() === '') {
    return {
      isValid: false,
      message: '入力値が空です。',
    };
  }

  // 数値に変換
  const num = Number(input);

  // 整数チェック
  if (!isInteger(num)) {
    return {
      isValid: false,
      message: '整数を入力してください。',
    };
  }

  // 範囲チェック
  if (!isWithinRange({ num, min, max })) {
    return {
      isValid: false,
      message: `${min}から${max}の範囲内で入力してください。`,
    };
  }

  return {
    isValid: true,
    message: 'バリデーション成功',
  };
}

/**
 * readline と prompt を受け取り、正常な値を受け付ける関数
 * @param params - readline と prompt を含むオブジェクト
 * @param params.readline - readline.Interface インスタンス
 * @param params.prompt - ユーザーへの入力プロンプトメッセージ
 * @param params.min - 最小値
 * @param params.max - 最大値
 * @returns Promise<number> - 検証済みの数値
 */
async function getValidNumber({
  readline,
  prompt,
  min,
  max,
}: {
  readline: readline.Interface;
  prompt: string;
  min: number;
  max: number;
}): Promise<number> {
  while (true) {
    const input = await readline.question(prompt);
    const validation = validateInput(input, min, max);

    if (validation.isValid) {
      return Number(input);
    }

    console.log(`エラー: ${validation.message}`);
  }
}

/**
 * num1 と num2 の合計値を返却する関数
 * @param params - num1 と num2 を含むオブジェクト
 * @param params.num1 - 1つ目の数値
 * @param params.num2 - 2つ目の数値
 * @returns number - 合計値
 */
function calculateSum({ num1, num2 }: { num1: number; num2: number }): number {
  return num1 + num2;
}

/**
 * メイン関数
 * ユーザーから2つの数値を入力してもらい、その合計を計算して表示する
 */
async function main(): Promise<void> {
  // readline interface を作成
  const rl = createReadlineInterface(readline);

  try {
    // 1つ目の値を入力
    const num1 = await getValidNumber({
      readline: rl,
      prompt: '一つ目の値を入力してください......\n',
      min: 1,
      max: 999,
    });

    // 2つ目の値を入力
    const num2 = await getValidNumber({
      readline: rl,
      prompt: '二つ目の値を入力してください......\n',
      min: 1,
      max: 999,
    });

    // 合計値を計算
    const sum = calculateSum({ num1, num2 });

    // 結果を表示
    console.log(`合計値は: ${sum} です！`);
  } finally {
    // readline interface をクローズ
    rl.close();
  }
}

// main関数を実行
main().catch((error) => {
  console.error('エラーが発生しました:', error);
  process.exit(1);
});
