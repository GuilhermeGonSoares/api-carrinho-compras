import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { StateService } from '../state/state.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    private readonly stateService: StateService,
    private readonly cacheService: CacheService,
  ) {}

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    return await this.cacheService.getCache<City[]>('allCities', () =>
      this.cityRepository.find(),
    );
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: {
        id,
      },
    });

    if (!city) {
      throw new NotFoundException(`Not found city with this ${id} id`);
    }
    return city;
  }

  async getAllCitiesByStateId(stateId: number): Promise<City[]> {
    return await this.cacheService.getCache<City[]>(
      `allCitiesByStateId-${stateId}`,
      () =>
        this.cityRepository.find({
          where: {
            state: { id: stateId },
          },
          order: {
            name: 'ASC',
          },
        }),
    );
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
