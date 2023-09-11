import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/authentication/services/auth.service';

import { AuthController } from './auth.controller';

const returnedToken = 'test-token';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [JwtModule, ConfigModule],
    })
      .overrideProvider(JwtService)
      .useValue({
        signAsync: async () => returnedToken,
      })
      .overrideProvider(AuthService)
      .useValue({
        signIn: async () => ({ accessToken: returnedToken }),
      })
      .compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return accessToken', async () => {
      const result = { accessToken: returnedToken };
      jest.spyOn(service, 'signIn').mockImplementation(async () => result);

      expect(
        await controller.signIn({ email: 'testName', password: 'testPsw' }),
      ).toBe(result);
    });
  });
});
