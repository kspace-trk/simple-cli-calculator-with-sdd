import { describe, expect, it, vi } from "vitest";
import { isInteger, isWithinRange, validateInput, getValidNumber, calculateSum } from "./index";

describe("isInteger", () => {
  it("整数の場合は true を返す", () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-5)).toBe(true);
    expect(isInteger(100)).toBe(true);
  });

  it("小数の場合は false を返す", () => {
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger(-2.3)).toBe(false);
    expect(isInteger(0.1)).toBe(false);
  });

  it("数値以外の場合は false を返す", () => {
    expect(isInteger("1")).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger({})).toBe(false);
    expect(isInteger([])).toBe(false);
    expect(isInteger(NaN)).toBe(false);
    expect(isInteger(Infinity)).toBe(false);
  });
});

describe("isWithinRange", () => {
  it("範囲内の場合は true を返す", () => {
    expect(isWithinRange({ num: 5, min: 1, max: 10 })).toBe(true);
    expect(isWithinRange({ num: 1, min: 1, max: 10 })).toBe(true);
    expect(isWithinRange({ num: 10, min: 1, max: 10 })).toBe(true);
    expect(isWithinRange({ num: 0, min: -5, max: 5 })).toBe(true);
  });

  it("範囲外の場合は false を返す", () => {
    expect(isWithinRange({ num: 0, min: 1, max: 10 })).toBe(false);
    expect(isWithinRange({ num: 11, min: 1, max: 10 })).toBe(false);
    expect(isWithinRange({ num: -1, min: 0, max: 5 })).toBe(false);
  });
});

describe("validateInput", () => {
  it("有効な入力の場合は isValid: true を返す", () => {
    expect(validateInput("1")).toEqual({ isValid: true, message: "" });
    expect(validateInput("500")).toEqual({ isValid: true, message: "" });
    expect(validateInput("999")).toEqual({ isValid: true, message: "" });
  });

  it("空の入力の場合は isValid: false とエラーメッセージを返す", () => {
    expect(validateInput("")).toEqual({ isValid: false, message: "入力が空です" });
    expect(validateInput("   ")).toEqual({ isValid: false, message: "入力が空です" });
  });

  it("整数でない場合は isValid: false とエラーメッセージを返す", () => {
    expect(validateInput("1.5")).toEqual({ isValid: false, message: "整数を入力してください" });
    expect(validateInput("abc")).toEqual({ isValid: false, message: "整数を入力してください" });
  });

  it("範囲外の場合は isValid: false とエラーメッセージを返す", () => {
    expect(validateInput("0")).toEqual({ isValid: false, message: "1から999の範囲で入力してください" });
    expect(validateInput("1000")).toEqual({ isValid: false, message: "1から999の範囲で入力してください" });
    expect(validateInput("-1")).toEqual({ isValid: false, message: "1から999の範囲で入力してください" });
  });
});

describe("getValidNumber", () => {
  it("有効な値が入力されたら数値を返す", async () => {
    const mockQuestion = vi.fn().mockResolvedValue("2");
    const mockReadline = { question: mockQuestion } as any;

    const result = await getValidNumber({ readline: mockReadline, prompt: "入力: " });

    expect(result).toBe(2);
    expect(mockQuestion).toHaveBeenCalledWith("入力: ");
  });

  it("無効な値の後に有効な値が入力されたら再入力を求める", async () => {
    const mockQuestion = vi.fn()
      .mockResolvedValueOnce("invalid")
      .mockResolvedValueOnce("1000")
      .mockResolvedValueOnce("500");
    const mockReadline = { question: mockQuestion } as any;

    const result = await getValidNumber({ readline: mockReadline, prompt: "入力: " });

    expect(result).toBe(500);
    expect(mockQuestion).toHaveBeenCalledTimes(3);
  });
});

describe("calculateSum", () => {
  it("2つの数値の合計を返す", () => {
    expect(calculateSum({ num1: 1, num2: 2 })).toBe(3);
    expect(calculateSum({ num1: 100, num2: 200 })).toBe(300);
    expect(calculateSum({ num1: -5, num2: 10 })).toBe(5);
    expect(calculateSum({ num1: 0, num2: 0 })).toBe(0);
  });
});
