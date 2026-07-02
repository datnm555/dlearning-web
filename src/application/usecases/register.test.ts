import { describe, it, expect, vi } from 'vitest';
import { makeRegister } from './register';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

describe('register use case', () => {
  it('registers then auto-logs-in using the email', async () => {
    const session = { token: 'T', user: { id: '1', email: 'a@b.vn', username: 'u', displayName: 'U' } };
    const repo: AuthRepository = {
      register: vi.fn().mockResolvedValue(undefined),
      login: vi.fn().mockResolvedValue(session),
    };

    const register = makeRegister(repo);
    const result = await register({ email: 'a@b.vn', username: 'u', displayName: 'U', password: 'Secret123' });

    expect(repo.register).toHaveBeenCalledOnce();
    expect(repo.login).toHaveBeenCalledWith({ identifier: 'a@b.vn', password: 'Secret123' });
    expect(result).toBe(session);
  });
});
