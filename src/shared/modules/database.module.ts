import { Global, Module } from '@nestjs/common';
import { BankAccountsRepository } from '../repositories/bank-accounts.repositories';
import { CategoriesRepository } from '../repositories/categories.repositories';
import { TransactionsRepository } from '../repositories/transactions.repositories';
import { UsersRepository } from '../repositories/users.repositories';
import { PrismaService } from '../services/prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
  exports: [
    UsersRepository,
    CategoriesRepository,
    BankAccountsRepository,
    TransactionsRepository,
  ],
})
export class DatabaseModule {}
