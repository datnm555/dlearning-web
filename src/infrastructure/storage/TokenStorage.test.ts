import { describe, it, expect, beforeEach } from 'vitest';
import { TokenStorage } from './TokenStorage';

const session = { token: 'T', user: { id: '1', email: 'a@b.vn', username: 'u', displayName: 'U' } };

describe('TokenStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('persists to localStorage when remember=true', () => {
    const storage = new TokenStorage();
    storage.save(session, true);
    expect(localStorage.getItem('dlearning.session')).not.toBeNull();
    expect(sessionStorage.getItem('dlearning.session')).toBeNull();
    expect(storage.load()?.token).toBe('T');
  });

  it('persists to sessionStorage when remember=false', () => {
    const storage = new TokenStorage();
    storage.save(session, false);
    expect(sessionStorage.getItem('dlearning.session')).not.toBeNull();
    expect(localStorage.getItem('dlearning.session')).toBeNull();
  });

  it('clear removes the session from both stores', () => {
    const storage = new TokenStorage();
    storage.save(session, true);
    storage.clear();
    expect(storage.load()).toBeNull();
  });
});
