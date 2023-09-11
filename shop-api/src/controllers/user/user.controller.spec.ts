import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateUserDtoStub,
  UpdateUserDtoStub,
} from 'src/core/stubs/user.dto.stub';

import { UsersService } from '../../features/users/users.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue({
        getAllUsers: async () => [UpdateUserDtoStub()],
        createUser: async () => CreateUserDtoStub(),
        updateUser: async () => UpdateUserDtoStub(),
        getUserById: async () => UpdateUserDtoStub(),
        deleteUser: async () => UpdateUserDtoStub(),
      })
      .compile();

    controller = app.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return the users', async () => {
      const allUsers = await controller.getAll();
      expect(allUsers[0]).toStrictEqual(UpdateUserDtoStub());
    });
  });

  describe('getById', () => {
    it('should return the user', async () => {
      const foundUser = await controller.getById('1');
      expect(foundUser.email).toBe(UpdateUserDtoStub().email);
    });

    it('should throw BadRequestException when no id', async () => {
      await expect(controller.getById(undefined)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('createUser', () => {
    it('should return the saved object', async () => {
      const createdUser = await controller.createUser(CreateUserDtoStub());
      expect(createdUser.email).toBe(CreateUserDtoStub().email);
    });
  });

  describe('updateUser', () => {
    it('should return the updated object', async () => {
      const createdUser = await controller.updateUser('1', UpdateUserDtoStub());
      expect(createdUser.email).toBe(UpdateUserDtoStub().email);
    });

    it('should throw BadRequestException when no id', async () => {
      await expect(
        controller.updateUser(undefined, UpdateUserDtoStub()),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteUser', () => {
    it('should return the updated object', async () => {
      const deleteUser = await controller.deleteUser('1');
      expect(deleteUser.email).toBe(UpdateUserDtoStub().email);
    });

    it('should throw BadRequestException when no id', async () => {
      await expect(
        controller.updateUser(undefined, UpdateUserDtoStub()),
      ).rejects.toThrowError(BadRequestException);
    });
  });
});
