import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpError {
  @ApiProperty({
    type: String,
  })
  message: string | string[];

  @ApiProperty({
    enum: [
      HttpStatus.BAD_REQUEST,
      HttpStatus.UNAUTHORIZED,
      HttpStatus.FORBIDDEN,
      HttpStatus.NOT_FOUND,
      HttpStatus.INTERNAL_SERVER_ERROR,
    ],
  })
  statusCode: number;

  @ApiProperty({
    type: String,
  })
  error?: string;
}
