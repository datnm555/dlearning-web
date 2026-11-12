import { describe, it, expect, vi } from 'vitest';
import { makeRegister } from './register';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

describe('register use case', () => {
  it('registers then auto-logs-in using the username', async () => {
    const session = { token: 'T', expiresAt: '2030-01-01T00:00:00Z', user: { id: '1', username: 'bean', createdAt: '2026-01-01T00:00:00Z' } };
    const repo: AuthRepository = {
      register: vi.fn().mockResolvedValue(undefined),
      login: vi.fn().mockResolvedValue(session),
    };

    const result = await makeRegister(repo)({ username: 'bean', password: 'Secret123' });

    expect(repo.register).toHaveBeenCalledWith({ username: 'bean', password: 'Secret123' });
    expect(repo.login).toHaveBeenCalledWith({ username: 'bean', password: 'Secret123' });
    expect(result).toBe(session);
  });
});
