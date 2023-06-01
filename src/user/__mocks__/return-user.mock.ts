import { ReturnUserDto } from '../dtos/returnUser.dto';
import { UserMock } from './user.mock';

export const ReturnUserMock: ReturnUserDto = {
  id: 0,
  name: UserMock.name,
  email: UserMock.email,
  phone: UserMock.phone,
  cpf: UserMock.cpf,
};
