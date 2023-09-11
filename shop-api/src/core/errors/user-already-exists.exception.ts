import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor() {
    super('User with that e-mail already exists!', HttpStatus.BAD_REQUEST);
  }
}
