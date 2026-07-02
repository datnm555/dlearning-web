import type { AlphabetLetter } from '../../domain/models/AlphabetLetter';
import type { AlphabetRepository } from '../../domain/repositories/AlphabetRepository';
import type { HttpClient } from '../http/HttpClient';

export class ApiAlphabetRepository implements AlphabetRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Promise<AlphabetLetter[]> {
    return this.http.get<AlphabetLetter[]>('/alphabet');
  }
}
