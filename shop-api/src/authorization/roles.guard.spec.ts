import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExecutionContextMock } from 'src/utils/test/execution-context-mock.stub';

import { Role } from './role.enum';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true when requireRoles are Admin, User and user has role Admin', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.Admin, Role.User] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.Admin]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(true);
    });

    it('should return true when requireRole is Prospect and user has role Prospect', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.Moderator] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.Moderator]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(true);
    });

    it('should return true when requireRole is Admin and user has role Admin', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.Admin] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.Admin]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(true);
    });

    it('should return true when requireRole is User and user has role User', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.User] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.User]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(true);
    });

    it('should return false when requireRole is User and user has role Prospect', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.User] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.Moderator]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(false);
    });

    it('should return false when requireRole is Admin and user has role Prospect', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.Admin] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.Moderator]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(false);
    });

    it('should return false when requireRoles are Admin, User and user has role Prospect', async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { roles: [Role.Admin, Role.User] },
      });

      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockImplementation(() => [Role.Moderator]);

      const canActivate = await rolesGuard.canActivate(
        ctxMock as ExecutionContext,
      );
      expect(canActivate).toBe(false);
    });
  });
});
