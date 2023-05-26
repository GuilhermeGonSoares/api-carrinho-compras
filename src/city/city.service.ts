import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';
import { StateService } from '../state/state.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private readonly cityRepository: Repository<City>,
    private readonly stateService: StateService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findAll() {
    let cities: City[] = await this.cacheManager.get('allCities');

    if (!cities) {
      cities = await this.cityRepository.find();
      await this.cacheManager.set('allCities', cities);
    }

    return cities;
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepository.findOne({
      where: {
        id,
      },
      relations: {
        state: true,
      },
    });

    if (!city) {
      throw new NotFoundException(`Not found city with this ${id} id`);
    }
    return city;
  }

  async getAllCitiesByStateId(stateId: number): Promise<City[]> {
    let cities: City[] = await this.cacheManager.get(
      `allCitiesByStateId-${stateId}`,
    );

    if (!cities) {
      cities = await this.cityRepository.find({
        where: {
          state: { id: stateId },
        },
        order: {
          name: 'ASC',
        },
      });

      await this.cacheManager.set(`allCitiesByStateId-${stateId}`, cities);
    }

    return cities;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
