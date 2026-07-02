import { createContext } from 'react';
import type { AuthSession } from '../../domain/models/AuthSession';

export interface AuthContextValue {
  session: AuthSession | null;
  setSession: (session: AuthSession, remember: boolean) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
