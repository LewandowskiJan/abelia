import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserGuard } from 'src/authentication/guards/user.guard';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/core/dtos';
import { Public } from 'src/utils/decorators/public';

import { HttpError } from '../../core/errors/http-error.dto';
import { UsersService } from '../../features/users/users.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The users have been successfully returned.',
    type: UserDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.', type: HttpError })
  @Get()
  async getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    description: 'The user has been successfully returned.',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: HttpError,
    status: HttpStatus.BAD_REQUEST,
  })
  @Get(':id')
  async getById(@Param('id') id: any) {
    if (!id) throw new BadRequestException();
    return this.usersService.getUserById(id);
  }

  @ApiOkResponse({
    status: 201,
    description: 'The user has been successfully returned.',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: HttpError,
    status: HttpStatus.BAD_REQUEST,
  })
  @Public()
  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    description: 'The user has been successfully returned.',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: HttpError,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    type: HttpError,
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(UserGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!id) throw new BadRequestException();
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    description: 'The user has been successfully deleted.',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: HttpError,
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    type: HttpError,
    status: HttpStatus.UNAUTHORIZED,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    if (!id) throw new BadRequestException();
    return this.usersService.deleteUser(id);
  }
}
