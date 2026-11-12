import type { Letter } from '../models/Letter';

export interface AlphabetRepository {
  getAll(): Promise<Letter[]>;
}
