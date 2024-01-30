import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { GlobalConstants } from 'src/shared/config/global-constants';
import { UsersRepository } from 'src/shared/repositories/users.repositories';
import { generateUUID } from 'src/shared/utils/generate-uuid';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Sign In
  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.usersRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isValidPassword = await compare(signInDto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    return await this.createAccessToken(user.id);
  }

  // Sign Up
  async signUp(signUpDto: SignUpDto): Promise<string> {
    const emailExists = await this.usersRepository.findByEmail(signUpDto.email);

    if (emailExists) {
      throw new ConflictException('This email already exists');
    }

    const hashedPassword = await hash(
      signUpDto.password,
      GlobalConstants.passwordHashSalt,
    );

    const user = await this.usersRepository.create({
      data: {
        id: generateUUID(),
        name: signUpDto.name,
        email: signUpDto.email,
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

    return await this.createAccessToken(user.id);
  }

  private async createAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }
}
