import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(mobilePhone: string, pass: string) {
    const user = await this.usersService.findOne(mobilePhone);
    if (!user)
      throw new HttpException(
        `Credenciales incorrectas.`,
        HttpStatus.UNAUTHORIZED,
      );
    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { mobilePhone: user.mobilePhone, sub: user.userId };
    const token = await this.jwtService.signAsync(payload);
    await this.updateDataAuth(mobilePhone, { token: token, session: true });
    return {
      user,
      access_token: token,
      token_type: 'bearer',
    };
  }

  async updateDataAuth(mobilePhone: string, dataAuth: any) {
    await this.prisma.user.update({
      where: { mobile_phone: mobilePhone },
      data: {
        token: dataAuth.token,
        session_active: dataAuth.session,
      },
    });
  }
}
