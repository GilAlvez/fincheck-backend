import { Global, Module } from '@nestjs/common';
import { CategoriesRepository } from '../repositories/categories.repositories';
import { UsersRepository } from '../repositories/users.repositories';
import { PrismaService } from '../services/prisma.service';

@Global()
@Module({
  providers: [PrismaService, UsersRepository, CategoriesRepository],
  exports: [UsersRepository, CategoriesRepository],
})
export class DatabaseModule {}
