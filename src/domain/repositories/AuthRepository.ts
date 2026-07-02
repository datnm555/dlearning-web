import type { AuthSession } from '../models/AuthSession';

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  displayName: string;
  password: string;
}

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<void>;
}
