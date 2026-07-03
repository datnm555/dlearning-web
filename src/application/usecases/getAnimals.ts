import type { Animal } from '../../domain/models/Animal';
import type { AnimalRepository } from '../../domain/repositories/AnimalRepository';
import type { Lang } from '../../domain/repositories/CatalogRepository';

export function makeGetAnimals(repo: AnimalRepository) {
  return (lang: Lang): Promise<Animal[]> => repo.getAnimals(lang);
}
