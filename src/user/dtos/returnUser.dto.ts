import { User } from '../entities/user.entity';

export class ReturnUserDto {
  private id: number;
  private name: string;
  private email: string;
  private phone: string;
  private cpf: string;
  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
  }
}
