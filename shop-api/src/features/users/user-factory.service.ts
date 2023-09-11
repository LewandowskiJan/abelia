import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/core/dtos';
import { User } from 'src/core/entities';
import { PasswordUtil } from 'src/utils/password.util';

@Injectable()
export class UserFactoryService {
  async createNewUser(createUserDto: CreateUserDto): Promise<User> {
    return this.mapUser(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    return this.mapUser(updateUserDto);
  }

  private async mapUser(userDto: UserDto): Promise<User> {
    const user = new User();
    if (userDto?.email) user.email = userDto.email;
    if (userDto?.password)
      user.password = await PasswordUtil.hashPassword(userDto.password);
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.roles = userDto.roles;

    return user;
  }
}
