import { Role } from '../../enums/role.enum';
import { User } from '../entities/user.entity';

export const UserMock: User = {
  id: 0,
  name: 'user mock',
  email: 'mock@example.com',
  phone: '12112125',
  cpf: '12314125125',
  password: '12345',
  typeUser: Role.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
