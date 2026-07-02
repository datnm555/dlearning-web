import type { AlphabetLetter } from '../models/AlphabetLetter';

export interface AlphabetRepository {
  getAll(): Promise<AlphabetLetter[]>;
}
