import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  create(createStateDto: CreateStateDto) {
    return 'This action adds a new state';
  }

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

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
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
