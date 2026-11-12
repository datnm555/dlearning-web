import { describe, it, expect, vi } from 'vitest';
import { makeGetAlphabet } from './getAlphabet';
import type { AlphabetRepository } from '../../domain/repositories/AlphabetRepository';
import type { Letter } from '../../domain/models/Letter';

const letter = (id: string, displayOrder: number): Letter => ({
  id, upperCase: id.toUpperCase(), lowerCase: id, name: id, displayOrder, examples: [],
});

describe('getAlphabet use case', () => {
  it('returns letters ordered by displayOrder', async () => {
    const repo: AlphabetRepository = { getAll: vi.fn().mockResolvedValue([letter('b', 2), letter('a', 1)]) };
    const result = await makeGetAlphabet(repo)();
    expect(result.map((l) => l.id)).toEqual(['a', 'b']);
  });
});
