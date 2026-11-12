export interface HighlightParts {
  before: string;
  highlight: string;
  after: string;
}

/**
 * Splits a word around its initial letter. `start` is the index (in the NFC form of the text) of the letter
 * to highlight; a following run of combining marks stays attached so decomposed Vietnamese still works.
 * An out-of-range index yields no highlight.
 */
export function splitHighlight(text: string, start: number): HighlightParts {
  const nfc = text.normalize('NFC');
  const chars = Array.from(nfc);
  if (!Number.isInteger(start) || start < 0 || start >= chars.length) {
    return { before: nfc, highlight: '', after: '' };
  }
  let end = start + 1;
  while (end < chars.length && /\p{M}/u.test(chars[end])) {
    end++;
  }
  return {
    before: chars.slice(0, start).join(''),
    highlight: chars.slice(start, end).join(''),
    after: chars.slice(end).join(''),
  };
}
