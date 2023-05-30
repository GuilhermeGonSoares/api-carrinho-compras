import { User } from '../../user/entities/user.entity';

export class LoginPayload {
  id: number;
  typeUser: number;

  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.typeUser = userEntity.typeUser;
  }
}
