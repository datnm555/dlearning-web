import { describe, it, expect, vi } from 'vitest';
import { ApiAuthRepository } from './ApiAuthRepository';
import type { HttpClient } from '../http/HttpClient';

describe('ApiAuthRepository', () => {
  it('maps the dlearning-api login response to a session', async () => {
    const post = vi.fn().mockResolvedValue({
      accessToken: 'jwt', tokenType: 'Bearer', expiresAt: '2030-01-01T00:00:00Z',
      user: { id: 'u1', username: 'sam', createdAt: '2026-01-01T00:00:00Z' },
    });
    const repo = new ApiAuthRepository({ post } as unknown as HttpClient);

    const session = await repo.login({ username: 'sam', password: '1' });

    expect(post).toHaveBeenCalledWith('/users/login', { username: 'sam', password: '1' });
    expect(session).toEqual({
      token: 'jwt', expiresAt: '2030-01-01T00:00:00Z',
      user: { id: 'u1', username: 'sam', createdAt: '2026-01-01T00:00:00Z' },
    });
  });

  it('registers via /users/register', async () => {
    const post = vi.fn().mockResolvedValue({});
    await new ApiAuthRepository({ post } as unknown as HttpClient).register({ username: 'bean', password: 'abcdefg1' });
    expect(post).toHaveBeenCalledWith('/users/register', { username: 'bean', password: 'abcdefg1' });
  });
});
