import { User } from './entity/user/user';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(): Promise<User[]>;
    createUser(newUserInput: CreateUserDto): Promise<CreateUserOutput>;
    updateUser(updateUserInput: UpdateUserDto): Promise<UpdateUserOutput>;
}
