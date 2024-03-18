import { User } from './entity/user/user';
export declare class UserService {
    private readonly users;
    findAll(): Promise<User[]>;
    create(name: string, email: string, password: string): Promise<User>;
}
