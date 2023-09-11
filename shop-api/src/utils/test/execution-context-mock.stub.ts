import { ExecutionContext } from '@nestjs/common';

export interface ContextOptions {
  url?: string;
  headers?: {
    [key: string]: string;
  };
  [fieldName: string]: any;
}

export class ExecutionContextMock {
  private static default = {
    switchToHttp: () => ({
      getRequest: () => ({
        url: 'auth/login',
        headers: {},
      }),
    }),
    getHandler: () => {},
    getClass: () => {},
  };

  static createContext(options: ContextOptions = {}): ExecutionContext {
    return {
      ...ExecutionContextMock.default,
      switchToHttp: () => ({
        getRequest: () => ({
          ...ExecutionContextMock.default.switchToHttp().getRequest(),
          ...options,
        }),
      }),
    } as ExecutionContext;
  }
}
