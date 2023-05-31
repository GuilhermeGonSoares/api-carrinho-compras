import { CityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressDto } from '../dto/create-address.dto';

export const CreateAddressMock: CreateAddressDto = {
  complement: '',
  numberAddress: 10,
  cep: '12512351',
  cityId: CityMock.id,
};
