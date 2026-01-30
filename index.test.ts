import { describe, expect, it } from "vitest";
import { isInteger, isWithinRange, validateInput } from "./index";

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
    expect(validateInput("2")).toEqual({ isValid: true, message: "" });
    expect(validateInput("3")).toEqual({ isValid: true, message: "" });
    expect(validateInput("4")).toEqual({ isValid: true, message: "" });
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
    expect(validateInput("0")).toEqual({ isValid: false, message: "1から4の範囲で入力してください" });
    expect(validateInput("5")).toEqual({ isValid: false, message: "1から4の範囲で入力してください" });
    expect(validateInput("-1")).toEqual({ isValid: false, message: "1から4の範囲で入力してください" });
  });
});
