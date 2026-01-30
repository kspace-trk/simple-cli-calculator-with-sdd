import { describe, expect, it } from "vitest";
import { isInteger, isWithinRange } from "./index";

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
