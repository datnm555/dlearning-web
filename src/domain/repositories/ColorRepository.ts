import type { Color } from '../models/Color';
import type { Lang } from './CatalogRepository';

export interface ColorRepository {
  getColors(lang: Lang): Promise<Color[]>;
}
