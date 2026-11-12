import type { AuthSession } from '../../domain/models/AuthSession';
import type { AuthRepository, RegisterInput } from '../../domain/repositories/AuthRepository';

export function makeRegister(repo: AuthRepository) {
  return async (input: RegisterInput): Promise<AuthSession> => {
    await repo.register(input);
    return repo.login({ username: input.username, password: input.password });
  };
}
