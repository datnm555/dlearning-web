import { describe, it, expect, vi } from 'vitest';
import { makeGetAnimals } from './getAnimals';
import type { AnimalRepository } from '../../domain/repositories/AnimalRepository';

describe('getAnimals use case', () => {
  it('passes the language through to the repository', async () => {
    const animals = [{ code: 'cat', name: 'Mèo', emoji: '🐱', sound: 'meo meo', displayOrder: 1 }];
    const repo: AnimalRepository = { getAnimals: vi.fn().mockResolvedValue(animals) };

    const getAnimals = makeGetAnimals(repo);
    const result = await getAnimals('vi');

    expect(repo.getAnimals).toHaveBeenCalledWith('vi');
    expect(result).toEqual(animals);
  });
});
