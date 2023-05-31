import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from '../city.service';
import { Repository } from 'typeorm';
import { City } from '../entities/city.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityMock } from '../__mocks__/city.mock';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let repository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(City),
          useValue: {
            find: jest.fn().mockReturnValue([CityMock]),
            findOne: jest.fn().mockReturnValue(CityMock),
          },
        },
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockReturnValue([CityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    repository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return all cities with findAll', async () => {
    const users = await service.findAll();
    expect(users).toEqual([CityMock]);
  });

  it('should return city findOne with this id', async () => {
    const city = await service.findOne(CityMock.id);
    expect(city).toEqual(CityMock);
  });

  it('should return error findOne if not has city with id', async () => {
    jest.spyOn(repository, 'findOne').mockReturnValue(undefined);
    expect(service.findOne(CityMock.id)).rejects.toThrowError();
  });

  it('should return all cities by state id with getAllCitiesByStateId', async () => {
    const users = await service.getAllCitiesByStateId(CityMock.state.id);
    expect(users).toEqual([CityMock]);
  });
});
