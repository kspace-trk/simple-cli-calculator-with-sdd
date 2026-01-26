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
