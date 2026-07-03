import type { CountingNumber } from '../../domain/models/CountingNumber';
import type { CountingRepository } from '../../domain/repositories/CountingRepository';
import type { Lang } from '../../domain/repositories/CatalogRepository';

export function makeGetCounting(repo: CountingRepository) {
  return (lang: Lang): Promise<CountingNumber[]> => repo.getCounting(lang);
}
