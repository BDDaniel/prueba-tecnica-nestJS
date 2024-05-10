import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { getIdUser } from './pipes/getIdUser.pipe';
import { ApiTags } from '@nestjs/swagger';
import { user } from './interfaces/users.dto';
import { Helper } from 'src/shared/Helper';

@Controller('/api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Public()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id_user')
  getUser(@Param('id_user', getIdUser) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() user: user) {
    const date = user.date_birth;
    if (!Helper.isValidDate(date))
      throw new HttpException(
        'El parámetro *date_birth* debe estar en un formato de fecha válido',
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(
            'Algunos ejemplos de formatos de fecha válidos incluyen:\n' +
              "YYYY-MM-DD (por ejemplo, '2024-04-27')\n" +
              "YYYY/MM/DD (por ejemplo, '2024/04/27')\n" +
              "YYYY-MM-DDTHH:mm:ss (por ejemplo, '2024-04-27T12:00:00')\n" +
              "YYYY-MM-DDTHH:mm:ssZ (por ejemplo, '2024-04-27T12:00:00Z')\n" +
              "YYYY-MM-DDTHH:mm:ss±HH:mm (por ejemplo, '2024-04-27T12:00:00+03:00')",
          ),
        },
      );
    return this.usersService.createUser(user);
  }

  @Put('/:id_user')
  updateUser(@Param('id_user', getIdUser) id: number, @Body() user: user) {
    const date = user.date_birth;
    if (!Helper.isValidDate(date))
      throw new HttpException(
        'El parámetro *date_birth* debe estar en un formato de fecha válido',
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error(
            'Algunos ejemplos de formatos de fecha válidos incluyen:\n' +
              "YYYY-MM-DD (por ejemplo, '2024-04-27')\n" +
              "YYYY/MM/DD (por ejemplo, '2024/04/27')\n" +
              "YYYY-MM-DDTHH:mm:ss (por ejemplo, '2024-04-27T12:00:00')\n" +
              "YYYY-MM-DDTHH:mm:ssZ (por ejemplo, '2024-04-27T12:00:00Z')\n" +
              "YYYY-MM-DDTHH:mm:ss±HH:mm (por ejemplo, '2024-04-27T12:00:00+03:00')",
          ),
        },
      );
    return this.usersService.updateUser(id, user);
  }
}
