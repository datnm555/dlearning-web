import type { Category } from '../../domain/models/Category';
import type { Product } from '../../domain/models/Product';
import type { CatalogRepository, Lang } from '../../domain/repositories/CatalogRepository';
import type { HttpClient } from '../http/HttpClient';

export class ApiCatalogRepository implements CatalogRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getCategories(lang: Lang): Promise<Category[]> {
    return this.http.get<Category[]>('/categories', { lang });
  }

  getProducts(categoryCode: string, lang: Lang): Promise<Product[]> {
    return this.http.get<Product[]>(`/categories/${categoryCode}/products`, { lang });
  }
}
