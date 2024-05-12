import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Helper } from 'src/shared/Helper';
import { PrismaService } from 'src/prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(mobilePhone: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        mobile_phone: mobilePhone,
      },
    });
  }

  async getUsers() {
    const users = Helper.orderObjects(
      await this.prisma.user.findMany(),
      'id',
      'asc',
    );
    const usersFormated = users.map((user) => ({
      ...user,
      date_birth: Helper.formatDate(user.date_birth),
      createdAt: Helper.formatDate(user.createdAt),
      updatedAt: Helper.formatDate(user.updatedAt)
    }));
    return usersFormated;
  }

  async getUser(id: number) {
    const userFound = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userFound)
      throw new HttpException(
        `El usuario con id=${id} no se encontró.`,
        HttpStatus.NOT_FOUND,
      );
    const formattedUser = {
      ...userFound,
      date_birth: Helper.formatDate(userFound.date_birth),
      createdAt: Helper.formatDate(userFound.createdAt),
      updatedAt: Helper.formatDate(userFound.updatedAt)
    };
    return formattedUser;
  }

  async createUser(user: User, token: string) {
    // Verificar si ya existe un usuario con el mismo número de teléfono móvil
    const existingUser = await this.prisma.user.findUnique({
      where: { mobile_phone: user.mobile_phone },
    });

    if (existingUser) {
      throw new HttpException(
        `Ya existe un usuario con el número de teléfono móvil ${user.mobile_phone}`,
        HttpStatus.CONFLICT,
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const id = Helper.nextID(await this.getUsers(), 'id');
    const createdBy = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    const createdUser = await this.prisma.user.create({
      data: {
        id: id,
        first_name: user.first_name,
        last_name: user.last_name,
        date_birth: new Date(user.date_birth),
        address: user.address,
        email: user.email,
        mobile_phone: user.mobile_phone,
        password: hash,
        session_active: false, // Por defecto, la sesión no está activa
        createdBy: createdBy.id,
        updatedBy: createdBy.id,
      },
    });

    return createdUser;
  }

  async updateUser(id: number, user: User, token: string) {
    // Verificar si ya existe otro usuario con el mismo número de teléfono móvil
    const existingUser = await this.prisma.user.findFirst({
      where: { mobile_phone: user.mobile_phone, NOT: { id: id } },
    });

    if (existingUser) {
      throw new HttpException(
        `Ya existe otro usuario con el número de teléfono móvil ${user.mobile_phone}`,
        HttpStatus.CONFLICT,
      );
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);

    // Buscar el usuario a actualizar
    const userToUpdate = await this.getUser(id);
    const updatedBy = await this.prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    // Actualizar los campos relevantes
    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        date_birth: new Date(user.date_birth),
        address: user.address,
        email: user.email,
        mobile_phone: user.mobile_phone,
        password: hash,
        // Mantener el estado de sesión actual
        session_active: userToUpdate.session_active,
        updatedBy: updatedBy.id,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    // Buscar el usuario a eliminar
    const userToDelete = await this.prisma.user.findUnique({
      where: { id: id },
    });

    // Si el usuario no existe, lanzar una excepción
    if (!userToDelete) {
      throw new HttpException(
        `El usuario con id=${id} no se encontró.`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Eliminar el usuario de la base de datos
    await this.prisma.user.delete({
      where: { id: id },
    });

    return userToDelete;
  }
}
