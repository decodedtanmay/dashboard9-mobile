import { GeoFilter } from "@/domain/entities";

export class ApiClient {
  constructor(private readonly baseUrl: string, private readonly apiKey?: string) {}

  async get<T>(endpoint: string, filters?: GeoFilter): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(filters ?? {}).forEach(([key, value]) => {
      if (value && value !== "All") url.searchParams.set(key, String(value));
    });
    const response = await fetch(url.toString(), {
      headers: this.headers(),
      credentials: "include"
    });
    return this.parse<T>(response);
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { ...this.headers(), "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include"
    });
    return this.parse<T>(response);
  }

  private headers(): Record<string, string> {
    return this.apiKey ? { "X-Api-Key": this.apiKey } : {};
  }

  private async parse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`${response.status}: ${await response.text()}`);
    }
    return response.json() as Promise<T>;
  }
}
