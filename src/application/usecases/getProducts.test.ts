import { describe, it, expect, vi } from 'vitest';
import { makeGetProducts } from './getProducts';
import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';

describe('getProducts use case', () => {
  it('passes category code and language to the repository', async () => {
    const products = [{ code: 'alphabet', name: 'Alphabet', iconKey: '🔤', displayOrder: 1, isAvailable: true }];
    const repo: CatalogRepository = {
      getCategories: vi.fn(),
      getProducts: vi.fn().mockResolvedValue(products),
    };

    const getProducts = makeGetProducts(repo);
    const result = await getProducts('preschool', 'en');

    expect(repo.getProducts).toHaveBeenCalledWith('preschool', 'en');
    expect(result).toEqual(products);
  });
});
