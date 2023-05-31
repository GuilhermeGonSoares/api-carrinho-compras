import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AddressService } from '../address.service';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressMock } from '../__mocks__/address.mock';
import { CityService } from '../../city/city.service';
import { CityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressMock } from '../__mocks__/create-address.mock';
import { UserMock } from '../../user/__mocks__/user.mock';

describe('AddressService', () => {
  let service: AddressService;
  let repository: Repository<Address>;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: {
            save: jest.fn().mockReturnValue(AddressMock),
            create: jest.fn().mockReturnValue(CreateAddressMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findOne: jest.fn().mockReturnValue(CityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    cityService = module.get<CityService>(CityService);
    repository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should be create address', async () => {
    const address = await service.create(CreateAddressMock, UserMock.id);
    expect(address).toEqual(AddressMock);
  });

  it('should return error if exception in userService', async () => {
    jest
      .spyOn(cityService, 'findOne')
      .mockRejectedValue(new NotFoundException());

    expect(
      service.create(CreateAddressMock, UserMock.id),
    ).rejects.toThrowError();
  });
});
