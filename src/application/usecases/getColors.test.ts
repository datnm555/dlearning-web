import { describe, it, expect, vi } from 'vitest';
import { makeGetColors } from './getColors';
import type { ColorRepository } from '../../domain/repositories/ColorRepository';

describe('getColors use case', () => {
  it('passes the language through to the repository', async () => {
    const colors = [{ code: 'red', name: 'Đỏ', hexValue: '#EF4444', exampleWord: 'quả táo', exampleEmoji: '🍎', displayOrder: 1 }];
    const repo: ColorRepository = { getColors: vi.fn().mockResolvedValue(colors) };

    const getColors = makeGetColors(repo);
    const result = await getColors('vi');

    expect(repo.getColors).toHaveBeenCalledWith('vi');
    expect(result).toEqual(colors);
  });
});
