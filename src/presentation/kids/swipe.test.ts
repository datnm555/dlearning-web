import { describe, it, expect } from 'vitest';
import { swipeDirection } from './swipe';

describe('swipeDirection', () => {
  it('detects left and right swipes', () => {
    expect(swipeDirection(-80, 5)).toBe('next');
    expect(swipeDirection(80, 5)).toBe('prev');
  });
  it('ignores short or vertical gestures', () => {
    expect(swipeDirection(20, 0)).toBeNull();
    expect(swipeDirection(60, 90)).toBeNull();
  });
});
