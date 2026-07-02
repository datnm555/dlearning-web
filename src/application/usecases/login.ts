import type { AuthSession } from '../../domain/models/AuthSession';
import type { AuthRepository, LoginInput } from '../../domain/repositories/AuthRepository';

export function makeLogin(repo: AuthRepository) {
  return (input: LoginInput): Promise<AuthSession> => repo.login(input);
}
