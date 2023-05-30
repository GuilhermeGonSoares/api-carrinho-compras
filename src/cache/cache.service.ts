import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(key: string, func: () => Promise<T>) {
    let data: T = await this.cacheManager.get(key);

    if (!data) {
      data = await func();
      await this.cacheManager.set(key, data);
    }

    return data;
  }
}
