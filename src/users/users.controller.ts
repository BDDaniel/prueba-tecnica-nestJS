import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { getIdUser } from './pipes/getIdUser.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { user } from './interfaces/users.dto';
import { Helper } from 'src/shared/Helper';

@Controller('/api/v1/users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Public()
  @ApiOkResponse({ description: 'Lista de usuarios', type: [user] })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('/:id_user')
  @ApiParam({ name: 'id_user', description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario encontrado', type: user })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  getUser(@Param('id_user', getIdUser) id: number) {
    return this.usersService.getUser(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Usuario creado exitosamente', type: user })
  @ApiBadRequestResponse({ description: 'Fecha de nacimiento inválida' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  createUser(
    @Body() user: user,
    @Headers('authorization') authorization: string,
  ) {
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

    const token = authorization.split(' ')[1];
    return this.usersService.createUser(user, token);
  }

  @Put('/:id_user')
  @ApiParam({ name: 'id_user', description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario actualizado', type: user })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiBadRequestResponse({ description: 'Fecha de nacimiento inválida' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  updateUser(
    @Param('id_user', getIdUser) id: number,
    @Body() user: user,
    @Headers('authorization') authorization: string,
  ) {
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

    const token = authorization.split(' ')[1];
    return this.usersService.updateUser(id, user, token);
  }

  @Delete('/:id_user')
  @ApiParam({ name: 'id_user', description: 'ID del usuario' })
  @ApiOkResponse({ description: 'Usuario eliminado' })
  @ApiNotFoundResponse({ description: 'Usuario no encontrado' })
  @ApiUnauthorizedResponse({ description: 'No autorizado' })
  deleteUser(@Param('id_user', getIdUser) id: number) {
    return this.usersService.deleteUser(id);
  }
}
