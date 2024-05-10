import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { user } from './interfaces/users.dto';
import * as bcrypt from 'bcrypt';
import { Helper } from 'src/shared/Helper';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 53,
      first_name: 'prueba',
      last_name: 'prueba',
      session_active: true,
      date_birth: '1988-03-17',
      email: 'prueba@yopmail.com',
      mobile_phone: '020202',
      password: '$2b$10$l1RclKmogkq36g5WfhKtuOR69HKdhrZM1HGTYZ9zfoGQ3ZkhL2aY6',
      address: 'cl 50 b sur',
    },
  ];

  async findOne(mobilePhone: string): Promise<User | undefined> {
    return this.users.find((user) => user.mobile_phone == mobilePhone);
  }

  getUsers() {
    return Helper.orderObjects(this.users, 'id', 'asc');;
  }

  getUser(id: number) {
    const userFound = this.users.find((e) => e.id == id);
    if (!userFound)
      throw new HttpException(
        `El usuario con id=${id} no se encontró.`,
        HttpStatus.NOT_FOUND,
      );
    return userFound;
  }

  async createUser(user: user) {
    const saltOrRounds = 3;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const id = Helper.nextID(this.users, 'id');

    user.id = id;
    user.password = hash;
    user.session_active = false;
    
    user = Helper.orderFields(user, ["id", "first_name", "last_name", "session_active", "date_birth", "email", "mobile_phone", "password", "address"]) as user
    this.users.push(user);

    return user;
  }

  async updateUser(id: number, user: user) {
    const saltOrRounds = 3;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    const userToUpdate = this.getUser(id);
    const index = this.users.findIndex(objeto => objeto['id'] === id);

    user.id = id;
    user.password = hash;
    user.session_active = userToUpdate.session_active;
    
    user = Helper.orderFields(user, ["id", "first_name", "last_name", "session_active", "date_birth", "email", "mobile_phone", "password", "address"]) as user
    Object.assign(this.users[index], user);

    return user;
  }
}
