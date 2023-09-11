import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from 'src/authentication/services/auth.service';
import { CredentialsDto } from 'src/core/dtos/credentials.dto';
import { TokenDto } from 'src/core/dtos/token.dto';
import { HttpError } from 'src/core/errors/http-error.dto';
import { Public } from 'src/utils/decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({
    description: 'The user has been successful login',
    type: TokenDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: HttpError,
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials);
  }
}
