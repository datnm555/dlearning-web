import type { Animal } from '../../domain/models/Animal';
import type { AnimalRepository } from '../../domain/repositories/AnimalRepository';
import type { Lang } from '../../domain/repositories/CatalogRepository';
import type { HttpClient } from '../http/HttpClient';

export class ApiAnimalRepository implements AnimalRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAnimals(lang: Lang): Promise<Animal[]> {
    return this.http.get<Animal[]>('/animals', { lang });
  }
}
