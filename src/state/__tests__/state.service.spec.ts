import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from '../state.service';
import { Repository } from 'typeorm';
import { State } from '../entities/state.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let repository: Repository<State>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(State),
          useValue: {
            findOneBy: jest.fn().mockReturnValue(StateMock),
            find: jest.fn().mockReturnValue([StateMock]),
            exist: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    repository = module.get<Repository<State>>(getRepositoryToken(State));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return state in findOne method', async () => {
    const state = await service.findOne(StateMock.id);

    expect(state).toEqual(StateMock);
  });

  it('should return error in findOne if there is no user with id', async () => {
    jest.spyOn(repository, 'findOneBy').mockReturnValue(undefined);

    expect(service.findOne(StateMock.id)).rejects.toThrowError();
  });

  it('should return all state in findAll', async () => {
    const state = await service.findAll();

    expect(state).toEqual([StateMock]);
  });
});
