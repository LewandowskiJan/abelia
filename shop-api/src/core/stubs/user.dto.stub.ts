import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos';

export const UserDtoStub = (): UserDto => {
  return {
    email: 'email@email.com',
    password: 'string',
    firstName: 'Joe',
    lastName: 'Doe',
    roles: [],
  };
};

export const CreateUserDtoStub = (): CreateUserDto => {
  return {
    email: 'email@email.com',
    password: 'string',
    firstName: 'Joe',
    lastName: 'Doe',
    roles: [],
  };
};

export const UpdateUserDtoStub = (): UpdateUserDto => {
  return {
    email: 'email@email.com',
    password: 'string123',
    firstName: 'Joe1',
    lastName: 'Doe1',
    roles: [],
  };
};
