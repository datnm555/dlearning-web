import type { CountingNumber } from '../models/CountingNumber';
import type { Lang } from './CatalogRepository';

export interface CountingRepository {
  getCounting(lang: Lang): Promise<CountingNumber[]>;
}
