import { ReturnUserMock } from '../../user/__mocks__/return-user.mock';
import { ReturnLoginDto } from '../dtos/return-login.dto';
import { token } from './jwt.mock';

export const ReturnLoginMock: ReturnLoginDto = {
  user: ReturnUserMock,
  acessToken: token,
};
