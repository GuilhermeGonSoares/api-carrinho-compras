import { UserMock } from '../../user/__mocks__/user.mock';
import { LoginPayload } from '../dtos/login-payload.dto';

export const LoginPayloadMock: LoginPayload = {
  id: 1,
  typeUser: UserMock.typeUser,
};
