import { Injectable } from '@nestjs/common';
import { IDataServices, User } from 'src/core';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';

import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UsersService {
  constructor(
    private dataServices: IDataServices,
    private userFactoryService: UserFactoryService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.dataServices.users.getAll();
  }

  getUserByProperty(query: { [P in keyof User]?: any }): Promise<User> {
    return this.dataServices.users.getByProperty(query);
  }

  getUserById(id: any): Promise<User> {
    return this.dataServices.users.get(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userFactoryService.createNewUser(createUserDto);
    return this.dataServices.users.create(user);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.update(userId, user);
  }

  async deleteUser(userId: string): Promise<User> {
    return this.dataServices.users.delete(userId);
  }
}
