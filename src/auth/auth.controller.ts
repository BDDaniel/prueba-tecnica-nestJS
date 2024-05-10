import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { signInDto } from './interfaces/signIn.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/users')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto.mobile_phone, signInDto.password);
  }
}
