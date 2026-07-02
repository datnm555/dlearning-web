import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import type { AlphabetRepository } from '../../domain/repositories/AlphabetRepository';

export function makeGetAlphabet(repo: AlphabetRepository) {
  return (): Promise<AlphabetLetter[]> => repo.getAll();
}
