import { State } from '../entities/state.entity';

export class ReturnStateDto {
  private name: string;

  constructor(state: State) {
    this.name = state.name;
  }
}
