import { describe, it, expect } from 'vitest';
import { isValidPassword, isValidUsername } from './passwordRule';

describe('password rule', () => {
  it('accepts 8+ chars with a letter and a digit', () => {
    expect(isValidPassword('abcdefg1')).toBe(true);
  });
  it.each(['short1a', 'abcdefghi', '123456789'])('rejects %s', (p) => {
    expect(isValidPassword(p)).toBe(false);
  });
  it('rejects more than 128 chars', () => {
    expect(isValidPassword('a1'.repeat(65))).toBe(false);
  });
  it('validates usernames', () => {
    expect(isValidUsername('sam')).toBe(true);
    expect(isValidUsername('sa')).toBe(false);
    expect(isValidUsername('bad name')).toBe(false);
  });
});
