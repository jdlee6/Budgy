import { User } from './entity/user';
import { UserRepository } from './user.repository';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User>;
    findExpensesByUserId(userId: number): Promise<User>;
    create(newUserInput: CreateUserDto): Promise<CreateUserOutput>;
    updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserOutput>;
    deleteUser(userId: number): Promise<boolean>;
}
