import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { params, user } = context.switchToHttp().getRequest();

    if (this.isUserIdsEqual(user?.['id'], params?.['id'])) return true;
    else throw new UnauthorizedException();
  }

  private isUserIdsEqual(
    changedUserId: string|undefined, 
    changingUserId: string|undefined,
  ): boolean {
    if (!changedUserId || !changingUserId) return false;
    return changedUserId === changingUserId;
  }
}
