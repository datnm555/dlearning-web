import type { Product } from '../../domain/models/Product';
import type { CatalogRepository, Lang } from '../../domain/repositories/CatalogRepository';

export function makeGetProducts(repo: CatalogRepository) {
  return (categoryCode: string, lang: Lang): Promise<Product[]> => repo.getProducts(categoryCode, lang);
}
