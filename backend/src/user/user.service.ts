import { Injectable } from '@nestjs/common';
import { User } from './entity/user/user';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async create(name: string, email: string): Promise<CreateUserDto> {
    const user = new User();
    user.name = name;
    user.email = email;

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }
}
