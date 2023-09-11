import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContextMock } from 'src/utils/test/execution-context-mock.stub';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let userGuard: UserGuard;

  beforeEach(() => {
    userGuard = new UserGuard();
  });

  it('should be defined', () => {
    expect(userGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it("should return true when user's id is equal id from request params", async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { id: 'user_id' },
        params: { id: 'user_id' },
      });

      const canActivate = await userGuard.canActivate(ctxMock);
      expect(canActivate).toBe(true);
    });

    it("should throw UnauthorizedException when user's id is not equal id from request params", async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { id: 'user_id' },
        params: { id: 'other_user_id' },
      });

      const canActivate = userGuard.canActivate(ctxMock);
      await expect(canActivate).rejects.toThrowError(UnauthorizedException);
    });

    it("should throw UnauthorizedException when no user's id", async () => {
      const ctxMock = ExecutionContextMock.createContext({
        user: { id: undefined },
      });

      const canActivate = userGuard.canActivate(ctxMock);
      await expect(canActivate).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException when no user', async () => {
      const ctxMock = ExecutionContextMock.createContext();

      const canActivate = userGuard.canActivate(ctxMock);
      await expect(canActivate).rejects.toThrowError(UnauthorizedException);
    });
  });
});
