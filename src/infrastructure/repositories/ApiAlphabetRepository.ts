import type { Letter } from '../../domain/models/Letter';
import type { AlphabetRepository } from '../../domain/repositories/AlphabetRepository';
import type { HttpClient } from '../http/HttpClient';

export class ApiAlphabetRepository implements AlphabetRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Promise<Letter[]> {
    return this.http.get<Letter[]>('/letters');
  }
}
