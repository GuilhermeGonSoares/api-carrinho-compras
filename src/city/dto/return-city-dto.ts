import { ReturnStateDto } from '../../state/dto/return-state-dto';
import { City } from '../entities/city.entity';

export class ReturnCityDto {
  private name: string;
  private state?: ReturnStateDto;

  constructor(city: City) {
    this.name = city.name;
    this.state = city.state ? new ReturnStateDto(city.state) : undefined;
  }
}