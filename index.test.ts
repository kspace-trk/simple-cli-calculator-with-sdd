import { describe, it, expect } from 'vitest';
import { isInteger, isWithinRange } from './index';

describe('isInteger', () => {
  it('整数の場合はtrueを返す', () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-5)).toBe(true);
  });

  it('小数の場合はfalseを返す', () => {
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger(-0.1)).toBe(false);
  });

  it('数値以外の場合はfalseを返す', () => {
    expect(isInteger('1')).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
    expect(isInteger({})).toBe(false);
  });
});

describe('isWithinRange', () => {
  it('範囲内の場合はtrueを返す', () => {
    expect(isWithinRange({ num: 5, min: 1, max: 10 })).toBe(true);
    expect(isWithinRange({ num: 1, min: 1, max: 10 })).toBe(true);
    expect(isWithinRange({ num: 10, min: 1, max: 10 })).toBe(true);
  });

  it('範囲外の場合はfalseを返す', () => {
    expect(isWithinRange({ num: 0, min: 1, max: 10 })).toBe(false);
    expect(isWithinRange({ num: 11, min: 1, max: 10 })).toBe(false);
    expect(isWithinRange({ num: -5, min: 1, max: 10 })).toBe(false);
  });

  it('負の範囲でも動作する', () => {
    expect(isWithinRange({ num: -5, min: -10, max: 0 })).toBe(true);
    expect(isWithinRange({ num: -15, min: -10, max: 0 })).toBe(false);
  });
});
