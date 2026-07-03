import type { Category } from '../models/Category';
import type { Product } from '../models/Product';

export type Lang = 'en' | 'vi';

export interface CatalogRepository {
  getCategories(lang: Lang): Promise<Category[]>;
  getProducts(categoryCode: string, lang: Lang): Promise<Product[]>;
}
