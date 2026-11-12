import { describe, it, expect, vi } from 'vitest';
import { makeLogin } from './login';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

describe('login use case', () => {
  it('delegates to the repository', async () => {
    const session = { token: 'T', expiresAt: '2030-01-01T00:00:00Z', user: { id: '1', username: 'sam', createdAt: '2026-01-01T00:00:00Z' } };
    const repo: AuthRepository = { register: vi.fn(), login: vi.fn().mockResolvedValue(session) };

    const result = await makeLogin(repo)({ username: 'sam', password: '1' });

    expect(repo.login).toHaveBeenCalledWith({ username: 'sam', password: '1' });
    expect(result).toBe(session);
  });
});
