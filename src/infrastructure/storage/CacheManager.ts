import { MMKV } from "react-native-mmkv";

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const storage = new MMKV({ id: "mahajal-cache" });

export class CacheManager {
  set<T>(key: string, data: T, ttl = 1000 * 60 * 60): void {
    storage.set(key, JSON.stringify({ data, ttl, timestamp: Date.now() } satisfies CacheEntry<T>));
  }

  get<T>(key: string): CacheEntry<T> | null {
    const raw = storage.getString(key);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry<T>;
  }

  getFresh<T>(key: string): T | null {
    const entry = this.get<T>(key);
    if (!entry) return null;
    return Date.now() - entry.timestamp <= entry.ttl ? entry.data : null;
  }

  getStale<T>(key: string): T | null {
    return this.get<T>(key)?.data ?? null;
  }

  clearAll(): void {
    storage.clearAll();
  }
}
