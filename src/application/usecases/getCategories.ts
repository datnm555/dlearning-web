import type { Category } from '../../domain/models/Category';
import type { CatalogRepository, Lang } from '../../domain/repositories/CatalogRepository';

export function makeGetCategories(repo: CatalogRepository) {
  return (lang: Lang): Promise<Category[]> => repo.getCategories(lang);
}
