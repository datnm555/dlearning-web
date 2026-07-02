import { describe, it, expect, vi } from 'vitest';
import { makeLogin } from './login';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';

describe('login use case', () => {
  it('delegates to the repository', async () => {
    const session = { token: 'T', user: { id: '1', email: 'a@b.vn', username: 'u', displayName: 'U' } };
    const repo: AuthRepository = {
      register: vi.fn(),
      login: vi.fn().mockResolvedValue(session),
    };

    const login = makeLogin(repo);
    const result = await login({ identifier: 'u', password: 'pw' });

    expect(repo.login).toHaveBeenCalledWith({ identifier: 'u', password: 'pw' });
    expect(result).toBe(session);
  });
});
