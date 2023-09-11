import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContextMock } from 'src/utils/test/execution-context-mock.stub';

import { AuthGuard } from './auth.guard';

const returnedToken = 'test-token';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;
  let reflector: Reflector;
  let configService: ConfigService;

  beforeEach(() => {
    jwtService = new JwtService();
    reflector = new Reflector();
    configService = new ConfigService();
    authGuard = new AuthGuard(jwtService, reflector, configService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true when isPublic is set as true', async () => {
      const ctxMock = ExecutionContextMock.createContext();
      jest.spyOn(reflector, 'getAllAndOverride').mockImplementation(() => true);

      const canActivate = await authGuard.canActivate(ctxMock);
      expect(canActivate).toBe(true);
    });

    it('should return UnauthorizedException when isPublic is set as false and user is not authenticated', async () => {
      const ctxMock = ExecutionContextMock.createContext();
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => false);
      jest.spyOn(configService, 'get').mockImplementation(() => 'secret_token');

      const canActivate = authGuard.canActivate(ctxMock);
      await expect(canActivate).rejects.toThrowError(UnauthorizedException);
    });

    it('should return true when isPublic is set as false and user is authenticated', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        headers: { authorization: 'Bearer token' },
      });
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockImplementation(async () => ({ accessToken: returnedToken }));
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => false);
      jest.spyOn(configService, 'get').mockImplementation(() => 'secret_token');

      const canActivate = await authGuard.canActivate(ctxMock);
      expect(canActivate).toBe(true);
    });
  });
});
