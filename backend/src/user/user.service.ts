import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user';
import { UserRepository } from './user.repository';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['expenses', 'categories', 'budgets'],
    });
    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }

  async findExpensesByUserId(userId: number) {
    const user = await this.userRepository.findExpensesByUserId(userId);
    return user;
  }

  async create(newUserInput: CreateUserDto): Promise<CreateUserOutput> {
    const user = new User();
    user.name = newUserInput.name;
    user.email = newUserInput.email;

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    };
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findOne({
      where: { id: updateUserDto.id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
    }

    Object.assign(user, updateUserDto);

    const updatedUser = await this.userRepository.save(user);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.userRepository.delete(userId);
    return result.affected > 0;
  }
}
