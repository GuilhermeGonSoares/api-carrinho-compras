import { UserMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dtos/login.dto';

export const LoginMock: LoginDto = {
  email: UserMock.email,
  password: '1234',
};
