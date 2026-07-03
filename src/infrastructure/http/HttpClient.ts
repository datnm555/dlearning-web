import { ApiError } from './ApiError';

export interface HttpClientOptions {
  baseUrl: string;
  getToken: () => string | null;
  onUnauthorized: () => void;
}

export class HttpClient {
  private readonly options: HttpClientOptions;

  constructor(options: HttpClientOptions) {
    this.options = options;
  }

  post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  get<T>(path: string, query?: Record<string, string>): Promise<T> {
    const qs = query ? `?${new URLSearchParams(query).toString()}` : '';
    return this.request<T>('GET', `${path}${qs}`);
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const token = this.options.getToken();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.options.baseUrl}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (response.status === 401) {
      this.options.onUnauthorized();
    }

    if (!response.ok) {
      throw await this.toError(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const text = await response.text();
    return (text ? JSON.parse(text) : undefined) as T;
  }

  private async toError(response: Response): Promise<ApiError> {
    let message = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
    let code: string | undefined;
    try {
      const data = await response.json();
      message = data.description ?? data.detail ?? data.title ?? message;
      code = data.code ?? data.title;
    } catch {
      // Non-JSON error body — keep the friendly default message.
    }
    return new ApiError(response.status, message, code);
  }
}
