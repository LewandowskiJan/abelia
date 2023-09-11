import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { User } from 'src/core/entities';
import { PasswordUtil } from 'src/utils/password.util';

import { UserFactoryService } from './user-factory.service';

const userMock = {
  email: 'test@test.com',
  password: '$test',
  firstName: 'TestFirstName',
  lastName: 'TestLastName',
  roles: [],
};

describe('UserFactoryService', () => {
  let userFactoryService: UserFactoryService;

  beforeEach(() => {
    userFactoryService = new UserFactoryService();
  });

  it('should be defined', () => {
    expect(userFactoryService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create new User and return', async () => {
      const createUserDto: CreateUserDto = { ...userMock };
      const result: User = { ...userMock };
      const createdUser = await userFactoryService.createNewUser(createUserDto);
      const isPasswordEqual = await PasswordUtil.comparePassword(
        userMock.password,
        createdUser.password,
      );
      expect(createdUser).not.toEqual(result);
      expect(createdUser).toEqual({
        ...result,
        password: createdUser.password,
      });
      expect(isPasswordEqual).toBe(true);
      expect(createdUser).toBeInstanceOf(User);
    });
  });

  describe('updateUser', () => {
    it('should update new User and return', async () => {
      const updateUserDto: UpdateUserDto = { ...userMock };
      const result: User = { ...userMock };
      const updatedUser = await userFactoryService.updateUser(updateUserDto);
      const isPasswordEqual = await PasswordUtil.comparePassword(
        userMock.password,
        updatedUser.password,
      );
      expect(updatedUser).not.toEqual(result);
      expect(updatedUser).toEqual({
        ...result,
        password: updatedUser.password,
      });
      expect(isPasswordEqual).toBe(true);
      expect(updatedUser).toBeInstanceOf(User);
    });
  });
});
