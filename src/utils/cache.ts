interface CacheConfig {
  ttl: number;      // Tempo de vida em segundos
  prefix?: string;  // Prefixo para as chaves
}

interface CacheItem<T> {
  data: T;
  expiry: number;
}

export class Cache {
  private store = new Map<string, CacheItem<any>>();
  private prefix: string;

  constructor(private config: CacheConfig) {
    this.prefix = config.prefix || 'cache:';
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, data: T): void {
    const cacheKey = this.getKey(key);
    this.store.set(cacheKey, {
      data,
      expiry: Date.now() + (this.config.ttl * 1000)
    });
  }

  get<T>(key: string): T | null {
    const cacheKey = this.getKey(key);
    const item = this.store.get(cacheKey);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.delete(key);
      return null;
    }

    return item.data as T;
  }

  delete(key: string): void {
    const cacheKey = this.getKey(key);
    this.store.delete(cacheKey);
  }

  clear(): void {
    this.store.clear();
  }
}

// Instância global do cache
export const formCache = new Cache({ 
  ttl: 300,        // 5 minutos
  prefix: 'form:'  // Prefixo para formulários
}); 