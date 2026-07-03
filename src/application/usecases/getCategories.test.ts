import { describe, it, expect, vi } from 'vitest';
import { makeGetCategories } from './getCategories';
import type { CatalogRepository } from '../../domain/repositories/CatalogRepository';

describe('getCategories use case', () => {
  it('passes the language through to the repository', async () => {
    const cats = [{ code: 'preschool', name: 'Mầm non', iconKey: '🧸', displayOrder: 1 }];
    const repo: CatalogRepository = {
      getCategories: vi.fn().mockResolvedValue(cats),
      getProducts: vi.fn(),
    };

    const getCategories = makeGetCategories(repo);
    const result = await getCategories('vi');

    expect(repo.getCategories).toHaveBeenCalledWith('vi');
    expect(result).toEqual(cats);
  });
});
