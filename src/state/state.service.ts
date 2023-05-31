import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAll(): Promise<State[]> {
    return await this.stateRepository.find();
  }

  async findOne(id: number): Promise<State> {
    const state = await this.stateRepository.findOneBy({ id });
    if (!state) {
      throw new NotFoundException(`Not found state with this ${id} id`);
    }

    return state;
  }

  async existStateWithId(id: number): Promise<boolean> {
    const existState = await this.stateRepository.exist({
      where: {
        id,
      },
    });

    if (!existState) {
      throw new NotFoundException(`Not found state with this ${id} id`);
    }
    return true;
  }
}
