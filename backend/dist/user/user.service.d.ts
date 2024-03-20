import { User } from './entity/user/user';
import { UserRepository } from './user.repository';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly users;
    constructor(userRepository: UserRepository);
    findAll(): Promise<User[]>;
    create(newUserInput: CreateUserDto): Promise<CreateUserOutput>;
    updateUser(updateUserDto: UpdateUserDto): Promise<UpdateUserOutput>;
    deleteUser(userId: number): Promise<boolean>;
}
