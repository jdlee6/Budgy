//https://stackoverflow.com/questions/74542474/how-to-create-custom-separate-file-repository-in-nestjs-9-with-typeorm-0-3-x
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  // your other custom methods in your repo...
}
