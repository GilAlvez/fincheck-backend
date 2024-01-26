import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { generateUUID } from 'src/shared/utils/generate-uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (emailExists) {
      throw new ConflictException('this email already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = await this.usersRepository.create({
      data: {
        id: generateUUID(),
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              {
                id: generateUUID(),
                name: 'Salário',
                icon: 'salary',
                type: 'income',
              },
              {
                id: generateUUID(),
                name: 'Freelance',
                icon: 'freelance',
                type: 'income',
              },
              {
                id: generateUUID(),
                name: 'Outro',
                icon: 'other',
                type: 'income',
              },
              {
                id: generateUUID(),
                name: 'Casa',
                icon: 'home',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Alimentação',
                icon: 'food',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Educação',
                icon: 'education',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Lazer',
                icon: 'fun',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Mercado',
                icon: 'grocery',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Roupas',
                icon: 'clothes',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Transporte',
                icon: 'transport',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Viagem',
                icon: 'travel',
                type: 'expense',
              },
              {
                id: generateUUID(),
                name: 'Outro',
                icon: 'other',
                type: 'expense',
              },
            ],
          },
        },
      },
    });

    return user;
  }
}
