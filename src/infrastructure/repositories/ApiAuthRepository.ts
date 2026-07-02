import type { AuthSession } from '../../domain/models/AuthSession';
import type { AuthRepository, LoginInput, RegisterInput } from '../../domain/repositories/AuthRepository';
import type { HttpClient } from '../http/HttpClient';

interface LoginResponseDto {
  token: string;
  userId: string;
  email: string;
  username: string;
  displayName: string;
}

export class ApiAuthRepository implements AuthRepository {
  private readonly http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async login(input: LoginInput): Promise<AuthSession> {
    const dto = await this.http.post<LoginResponseDto>('/users/login', input);
    return {
      token: dto.token,
      user: {
        id: dto.userId,
        email: dto.email,
        username: dto.username,
        displayName: dto.displayName,
      },
    };
  }

  async register(input: RegisterInput): Promise<void> {
    await this.http.post<{ id: string }>('/users/register', input);
  }
}
