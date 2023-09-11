import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  @ApiProperty({
    type: String,
  })
  accessToken: string;
}
