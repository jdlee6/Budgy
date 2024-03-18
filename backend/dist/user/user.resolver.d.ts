import { User } from './entity/user/user';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    users(): Promise<User[]>;
    createUser(name: string, email: string, password: string): Promise<User>;
}
