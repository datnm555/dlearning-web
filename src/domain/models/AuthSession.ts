import type { User } from './User';

export interface AuthSession {
  token: string;
  /** ISO timestamp the access token stops being valid. */
  expiresAt: string;
  user: User;
}
