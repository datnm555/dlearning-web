import { describe, it, expect, vi } from 'vitest';
import { makeGetCounting } from './getCounting';
import type { CountingRepository } from '../../domain/repositories/CountingRepository';

describe('getCounting use case', () => {
  it('passes the language through to the repository', async () => {
    const numbers = [{ value: 1, word: 'Một', emoji: '🍎' }];
    const repo: CountingRepository = { getCounting: vi.fn().mockResolvedValue(numbers) };

    const getCounting = makeGetCounting(repo);
    const result = await getCounting('vi');

    expect(repo.getCounting).toHaveBeenCalledWith('vi');
    expect(result).toEqual(numbers);
  });
});
