import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly repository: Repository<Address>,
    private readonly cityService: CityService,
  ) {}

  async create(createAddressDto: CreateAddressDto, userId: number) {
    await this.cityService.findOne(createAddressDto.cityId);
    const address = this.repository.create(createAddressDto);
    address.userId = userId;
    return await this.repository.save(address);
  }

  async findAllAdressesByUserId(userId: number) {
    const address = await this.repository.find({
      where: {
        userId,
      },
      relations: {
        city: true,
      },
    });
    return address;
  }
}
