import * as readline from 'readline/promises';

/**
 * readline interface を作成して返却する
 * @param rl - readline/promises モジュール
 * @returns readline.Interface
 */
const createReadlineInterface = (rl: typeof readline): readline.Interface => {
  return rl.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

/**
 * 入力値が整数かどうかを確認する
 * @param input - 確認する値
 * @returns 整数の場合は true, そうでない場合は false
 */
const isInteger = (input: unknown): boolean => {
  return Number.isInteger(input);
};
