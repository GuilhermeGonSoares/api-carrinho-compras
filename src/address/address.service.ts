import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly repository: Repository<Address>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async create(createAddressDto: CreateAddressDto, userId: number) {
    await this.userService.findUserById(userId);
    await this.cityService.findOne(createAddressDto.cityId);
    const address = this.repository.create(createAddressDto);
    address.userId = userId;
    return await this.repository.save(address);
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
