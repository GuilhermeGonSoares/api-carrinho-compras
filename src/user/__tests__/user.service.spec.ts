import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserMock } from '../__mocks__/user.mock';
import { CreateUserMock } from '../__mocks__/create-user.mock';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(UserMock),
            save: jest.fn().mockResolvedValue(UserMock),
            create: jest.fn().mockResolvedValue(UserMock),
            count: jest.fn().mockResolvedValue(0),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should be return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(UserMock.email);

    expect(user).toEqual(UserMock);
  });

  it('should return an error in findUserByEmail if there is no user with email', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserByEmail(UserMock.email)).rejects.toThrowError();
  });

  it('should be return user in findUserById', async () => {
    const user = await service.findUserById(UserMock.id);

    expect(user).toEqual(UserMock);
  });

  it('should return an error in findUserById if there is no user with id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserById(UserMock.id)).rejects.toThrowError();
  });

  it('should be return user in findUserWithRelations', async () => {
    const user = await service.findUserWithRelations(UserMock.id);

    expect(user).toEqual(UserMock);
  });

  it('should return an error in findUserWithRelations if there is no user with id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    expect(service.findUserWithRelations(UserMock.id)).rejects.toThrowError();
  });

  it('should be create user', async () => {
    const user = await service.create(CreateUserMock);

    expect(user).toEqual(UserMock);
  });

  it('should return error in create if already exist user with this email', async () => {
    jest.spyOn(repository, 'count').mockResolvedValue(1);

    expect(service.create(CreateUserMock)).rejects.toThrowError();
  });
});
