import { describe, it, expect } from 'vitest';
import { toneFor, TONE_BG } from './tones';

describe('toneFor', () => {
  it('rotates through the six tones', () => {
    expect(toneFor(0)).toBe('bg-tile-1');
    expect(toneFor(5)).toBe('bg-tile-6');
    expect(toneFor(6)).toBe('bg-tile-1');
    expect(toneFor(28)).toBe(TONE_BG[4]);
  });
});
