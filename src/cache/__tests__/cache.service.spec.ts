import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserMock } from '../../user/__mocks__/user.mock';
import { Cache } from 'cache-manager';

describe('CacheService', () => {
  let cacheService: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => UserMock,
            set: () => jest.fn(),
          },
        },
      ],
    }).compile();

    cacheService = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(cacheService).toBeDefined();
  });

  it('should return data in cache', async () => {
    const user = await cacheService.getCache('key', () => null);
    expect(user).toEqual(UserMock);
  });

  it('should return data in cache and save data', async () => {
    jest.spyOn(cacheManager, 'get').mockReturnValue(undefined);
    const user = await cacheService.getCache('key', async () => UserMock);
    expect(user).toEqual(UserMock);
  });
});
