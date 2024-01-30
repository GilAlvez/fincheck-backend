import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.BankAccountCreateArgs) {
    return this.prismaService.bankAccount.create(createDto);
  }

  findManyByUserId(id: string) {
    return this.prismaService.bankAccount.findMany({
      where: { user_id: id },
    });
  }

  findById(id: string) {
    return this.prismaService.bankAccount.findUnique({
      where: { id },
    });
  }
}
