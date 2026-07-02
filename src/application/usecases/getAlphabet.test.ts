import { describe, it, expect, vi } from 'vitest';
import { makeGetAlphabet } from './getAlphabet';
import type { AlphabetRepository } from '../../domain/repositories/AlphabetRepository';

describe('getAlphabet use case', () => {
  it('returns the letters from the repository', async () => {
    const letters = [{ id: '1', upperCase: 'A', lowerCase: 'a', name: 'a', sound: 'a', exampleWord: 'áo', exampleEmoji: '👕', displayOrder: 1 }];
    const repo: AlphabetRepository = { getAll: vi.fn().mockResolvedValue(letters) };

    const getAlphabet = makeGetAlphabet(repo);
    const result = await getAlphabet();

    expect(result).toEqual(letters);
  });
});
