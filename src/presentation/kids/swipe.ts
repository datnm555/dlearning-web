/** Returns 'next' (swipe left), 'prev' (swipe right) or null if the gesture is too short or too vertical. */
export function swipeDirection(dx: number, dy: number, threshold = 50): 'next' | 'prev' | null {
  if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.2) {
    return null;
  }
  return dx < 0 ? 'next' : 'prev';
}
