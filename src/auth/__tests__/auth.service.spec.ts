import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { UserMock } from '../../user/__mocks__/user.mock';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadMock } from '../__mocks__/login-payload.mock';
import { LoginMock } from '../__mocks__/login.mock';
import { ReturnLoginMock } from '../__mocks__/return-login.mock';
import { token } from '../__mocks__/jwt.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(UserMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockReturnValue(LoginPayloadMock),
            sign: jest.fn().mockReturnValue(token),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should be validate token', () => {
    const payload = authService.validateToken(token);

    expect(payload).toEqual(LoginPayloadMock);
  });

  it('should return user if password and email valid', async () => {
    const login = await authService.login(LoginMock);

    expect(login).toEqual(ReturnLoginMock);
  });

  it('should return error if password invalid and email valid', async () => {
    expect(
      authService.login({ ...LoginMock, password: '12345' }),
    ).rejects.toThrowError();
  });

  it('should return error if password invalid and email valid', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockReturnValue(undefined);
    expect(authService.login(LoginMock)).rejects.toThrowError();
  });
});
