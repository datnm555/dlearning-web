import { useMemo, useState, type ReactNode } from 'react';
import { container } from '../../di/container';
import type { AuthSession } from '../../domain/models/AuthSession';
import { AuthContext, type AuthContextValue } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(() => container.tokenStorage.load());

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      setSession: (next, remember) => {
        container.tokenStorage.save(next, remember);
        setSessionState(next);
      },
      logout: () => {
        container.tokenStorage.clear();
        setSessionState(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
