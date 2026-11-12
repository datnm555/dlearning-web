// Class names are written out in full so Tailwind can see them. Tokens live in styles/global.css.
export const TONE_BG = ['bg-tile-1', 'bg-tile-2', 'bg-tile-3', 'bg-tile-4', 'bg-tile-5', 'bg-tile-6'] as const;

/** Tile tone class for the n-th letter (rotates through the 6 pastel tones). */
export const toneFor = (index: number) => TONE_BG[index % TONE_BG.length];
