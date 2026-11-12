import type { Letter } from '../../domain/models/Letter';
import type { AlphabetRepository } from '../../domain/repositories/AlphabetRepository';

export function makeGetAlphabet(repo: AlphabetRepository) {
  return async (): Promise<Letter[]> => {
    const letters = await repo.getAll();
    return [...letters].sort((a, b) => a.displayOrder - b.displayOrder);
  };
}
