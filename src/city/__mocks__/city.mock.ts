import { StateMock } from '../../state/__mocks__/state.mock';
import { City } from '../entities/city.entity';

export const CityMock: City = {
  id: 1,
  name: 'city test',
  state: StateMock,
  createdAt: new Date(),
  updatedAt: new Date(),
};
