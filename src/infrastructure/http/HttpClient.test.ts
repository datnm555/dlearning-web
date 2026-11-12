import { describe, it, expect, vi, afterEach } from 'vitest';
import { HttpClient } from './HttpClient';
import { ApiError } from './ApiError';

function mockFetch(status: number, body?: unknown) {
  const fn = vi.fn().mockResolvedValue(
    new Response(body === undefined ? null : JSON.stringify(body), { status }),
  );
  vi.stubGlobal('fetch', fn);
  return fn;
}

function client(token: string | null, onUnauthorized = vi.fn()) {
  return { onUnauthorized, http: new HttpClient({ baseUrl: '/api/v1', getToken: () => token, onUnauthorized }) };
}

afterEach(() => vi.unstubAllGlobals());

describe('HttpClient', () => {
  it('prefixes the base url and attaches the Bearer token', async () => {
    const fetchFn = mockFetch(200, [{ id: 1 }]);
    const { http } = client('abc');
    await expect(http.get('/letters')).resolves.toEqual([{ id: 1 }]);
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('/api/v1/letters');
    expect(init.headers.Authorization).toBe('Bearer abc');
  });

  it('sends no Authorization header without a token', async () => {
    const fetchFn = mockFetch(200, {});
    await client(null).http.post('/users/login', { username: 'sam', password: '1' });
    expect(fetchFn.mock.calls[0][1].headers.Authorization).toBeUndefined();
    expect(fetchFn.mock.calls[0][1].body).toBe('{"username":"sam","password":"1"}');
  });

  it('calls onUnauthorized on 401 when a token was sent', async () => {
    mockFetch(401, { title: 'Unauthorized' });
    const { http, onUnauthorized } = client('abc');
    await expect(http.get('/letters')).rejects.toBeInstanceOf(ApiError);
    expect(onUnauthorized).toHaveBeenCalledOnce();
  });

  it('does not redirect on a 401 from login (no token)', async () => {
    mockFetch(401, { title: 'Users.InvalidCredentials', detail: 'bad' });
    const { http, onUnauthorized } = client(null);
    await expect(http.post('/users/login', {})).rejects.toMatchObject({ status: 401, message: 'bad' });
    expect(onUnauthorized).not.toHaveBeenCalled();
  });

  it('maps problem details to ApiError', async () => {
    mockFetch(409, { title: 'Users.UsernameNotUnique', detail: 'taken' });
    await expect(client(null).http.post('/users/register', {})).rejects.toMatchObject({
      status: 409, code: 'Users.UsernameNotUnique', message: 'taken',
    });
  });
});
