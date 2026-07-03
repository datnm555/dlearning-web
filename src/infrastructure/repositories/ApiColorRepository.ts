import type { Color } from '../../domain/models/Color';
import type { ColorRepository } from '../../domain/repositories/ColorRepository';
import type { Lang } from '../../domain/repositories/CatalogRepository';
import type { HttpClient } from '../http/HttpClient';

export class ApiColorRepository implements ColorRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getColors(lang: Lang): Promise<Color[]> {
    return this.http.get<Color[]>('/colors', { lang });
  }
}
