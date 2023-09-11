import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from 'src/core/dtos/credentials.dto';
import { PasswordUtil } from 'src/utils/password.util';

import { UsersService } from '../../features/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(credentials: CredentialsDto) {
    const { email, password } = credentials;
    const user = await this.usersService.getUserByProperty({ email });

    if (!user) throw new UnauthorizedException();
    if (!PasswordUtil.comparePassword(password, user?.password)) {
      throw new UnauthorizedException();
    }

    const { _id, email: userEmail, firstName, lastName, roles } = user;
    const payload = { id: _id, email: userEmail, firstName, lastName, roles };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByProperty({ email });
    if (user && PasswordUtil.comparePassword(pass, user?.password)) {
      const result = { ...user };
      delete result.password;

      return result;
    }
    return null;
  }
}
