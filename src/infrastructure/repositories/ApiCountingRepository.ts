import type { CountingNumber } from '../../domain/models/CountingNumber';
import type { CountingRepository } from '../../domain/repositories/CountingRepository';
import type { Lang } from '../../domain/repositories/CatalogRepository';
import type { HttpClient } from '../http/HttpClient';

export class ApiCountingRepository implements CountingRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCounting(lang: Lang): Promise<CountingNumber[]> {
    return this.http.get<CountingNumber[]>('/counting', { lang });
  }
}
