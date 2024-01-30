import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    return {
      name: user.name,
      email: user.email,
    };
  }
}
