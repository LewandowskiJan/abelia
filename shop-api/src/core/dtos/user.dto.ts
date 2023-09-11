import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Role } from 'src/authorization/role.enum';

export class UserDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  readonly id?: string;

  @ApiProperty({
    type: String,
  })
  readonly email?: string;

  @ApiProperty({
    type: String,
  })
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly lastName: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    enum: Role,
    isArray: true,
    example: [Role.User, Role.Moderator],
  })
  readonly roles?: Role[];
}

export class CreateUserDto extends UserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
  })
  readonly password: string;
}

export class UpdateUserDto extends UserDto {}
