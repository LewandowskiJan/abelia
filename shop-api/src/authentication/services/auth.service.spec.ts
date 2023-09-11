import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PasswordUtil } from 'src/utils/password.util';

import { UsersService } from '../../features/users/users.service';
import { AuthService } from './auth.service';

const returnedToken = 'test-token';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
      imports: [JwtModule, ConfigModule],
    })
      .overrideProvider(JwtService)
      .useValue({
        signAsync: async () => returnedToken,
      })
      .overrideProvider(UsersService)
      .useValue({
        getAllUsers: async () => ({}),
        getUserByProperty: async () => ({ password: 'testPsw' }),
        getUserById: async () => ({}),
        createUser: async () => ({}),
        updateUser: async () => ({}),
      })
      .overrideProvider(ConfigService)
      .useValue({
        get: () => 'jwt_secret',
      })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return accessToken', async () => {
      const result = { accessToken: returnedToken };
      jest
        .spyOn(PasswordUtil, 'comparePassword')
        .mockImplementation(async () => true);

      expect(
        await service.signIn({ email: 'testName', password: 'testPsw' }),
      ).toStrictEqual(result);
    });
  });
});
