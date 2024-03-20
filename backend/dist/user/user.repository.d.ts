import { Repository } from 'typeorm';
import { User } from './entity/user/user';
export declare class UserRepository extends Repository<User> {
    private userRepository;
    constructor(userRepository: Repository<User>);
}
