import { Injectable } from '@nestjs/common';
import { User } from './entity/user/user';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const user = { id: this.users.length + 1, name, email, password };
    this.users.push(user);
    return user;
  }
}
