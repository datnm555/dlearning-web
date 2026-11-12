import { describe, it, expect } from 'vitest';
import { splitHighlight } from './highlight';

describe('splitHighlight', () => {
  it('highlights the initial letter', () => {
    expect(splitHighlight('bóng', 0)).toEqual({ before: '', highlight: 'b', after: 'óng' });
  });
  it('highlights a letter in the middle (e.g. "con bò")', () => {
    expect(splitHighlight('con bò', 4)).toEqual({ before: 'con ', highlight: 'b', after: 'ò' });
  });
  it('keeps toned/accented letters whole in decomposed input', () => {
    const decomposed = 'ă'.normalize('NFD') + 'n';
    expect(splitHighlight(decomposed, 0)).toEqual({ before: '', highlight: 'ă', after: 'n' });
  });
  it('returns no highlight for out-of-range or negative index', () => {
    expect(splitHighlight('áo', 9).highlight).toBe('');
    expect(splitHighlight('áo', -1)).toEqual({ before: 'áo', highlight: '', after: '' });
  });
});
