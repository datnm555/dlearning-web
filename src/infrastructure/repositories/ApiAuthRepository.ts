import type { AuthSession } from '../../domain/models/AuthSession';
import type { AuthRepository, LoginInput, RegisterInput } from '../../domain/repositories/AuthRepository';
import type { HttpClient } from '../http/HttpClient';

interface LoginResponseDto {
  accessToken: string;
  tokenType: string;
  expiresAt: string;
  user: { id: string; username: string; createdAt: string };
}

export class ApiAuthRepository implements AuthRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async login(input: LoginInput): Promise<AuthSession> {
    const dto = await this.http.post<LoginResponseDto>('/users/login', input);
    return { token: dto.accessToken, expiresAt: dto.expiresAt, user: dto.user };
  }

  async register(input: RegisterInput): Promise<void> {
    await this.http.post('/users/register', input);
  }
}
