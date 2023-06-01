import { ReturnAddresDto } from '../../address/dto/return-addres.dto';
import { User } from '../entities/user.entity';

export class ReturnUserDto {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public cpf: string;
  public addresses?: ReturnAddresDto[];

  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.addresses = userEntity.adresses
      ? userEntity.adresses.map((address) => new ReturnAddresDto(address))
      : undefined;
  }
}
