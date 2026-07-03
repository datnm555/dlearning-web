import type { Color } from '../../domain/models/Color';
import type { ColorRepository } from '../../domain/repositories/ColorRepository';
import type { Lang } from '../../domain/repositories/CatalogRepository';

export function makeGetColors(repo: ColorRepository) {
  return (lang: Lang): Promise<Color[]> => repo.getColors(lang);
}
