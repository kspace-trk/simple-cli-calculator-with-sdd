import { describe, it, expect } from 'vitest';
import { isInteger } from './index';

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
