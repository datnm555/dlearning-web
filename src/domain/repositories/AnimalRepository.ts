import type { Animal } from '../models/Animal';
import type { Lang } from './CatalogRepository';

export interface AnimalRepository {
  getAnimals(lang: Lang): Promise<Animal[]>;
}
