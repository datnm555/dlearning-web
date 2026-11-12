import type { AuthSession } from '../../domain/models/AuthSession';

const KEY = 'dlearning.session';

export class TokenStorage {
  save(session: AuthSession, remember: boolean): void {
    const target = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;
    other.removeItem(KEY);
    target.setItem(KEY, JSON.stringify(session));
  }

  /** Returns the stored session, or null when absent, corrupt or expired (expired ones are cleared). */
  load(now: number = Date.now()): AuthSession | null {
    const raw = localStorage.getItem(KEY) ?? sessionStorage.getItem(KEY);
    if (!raw) {
      return null;
    }
    try {
      const session = JSON.parse(raw) as AuthSession;
      if (!session.token) {
        return null;
      }
      if (session.expiresAt && Date.parse(session.expiresAt) <= now) {
        this.clear();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  }
}
