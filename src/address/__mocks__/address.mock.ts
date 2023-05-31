import { CityMock } from '../../city/__mocks__/city.mock';
import { UserMock } from '../../user/__mocks__/user.mock';
import { Address } from '../entities/address.entity';

export const AddressMock: Address = {
  id: 1,
  complement: '',
  numberAddress: 12,
  cep: '1234124',
  userId: UserMock.id,
  cityId: CityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
