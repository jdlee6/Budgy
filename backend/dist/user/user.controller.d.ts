import { UserService } from './user.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUsers(): Promise<import("src/user/entity/user/user").User[]>;
}
