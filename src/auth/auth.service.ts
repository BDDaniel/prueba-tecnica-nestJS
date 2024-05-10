import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(mobilePhone: string, pass: string) {
    const user = await this.usersService.findOne(mobilePhone);
    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { mobilePhone: user.mobilePhone, sub: user.userId };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'bearer'
    };
  }
}
