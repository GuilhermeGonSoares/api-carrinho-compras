import { ReturnCityDto } from '../../city/dto/return-city-dto';
import { Address } from '../entities/address.entity';

export class ReturnAddresDto {
  private complement: string;
  private numberAddress: number;
  private cep: string;
  private city?: ReturnCityDto;

  constructor(address: Address) {
    this.complement = address.complement;
    this.numberAddress = address.numberAddress;
    this.cep = address.cep;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
