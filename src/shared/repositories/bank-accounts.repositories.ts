import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from 'src/modules/bank-accounts/dto/create-bank-account.dto';
import { UpdateBankAccountDto } from 'src/modules/bank-accounts/dto/update-bank-account.dto';
import { PrismaService } from '../services/prisma.service';
import { generateUUID } from '../utils/generate-uuid';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByUserId(userId: string) {
    return this.prismaService.bankAccount.findMany({
      where: { user_id: userId },
      include: {
        transactions: {
          select: { value: true, type: true },
        },
      },
    });
  }

  findFirstByUserId(userId: string, bankAccountId: string) {
    return this.prismaService.bankAccount.findFirst({
      where: { user_id: userId, id: bankAccountId },
    });
  }

  create(userId: string, createDto: CreateBankAccountDto) {
    return this.prismaService.bankAccount.create({
      data: {
        id: generateUUID(),
        user_id: userId,
        color: createDto.color,
        name: createDto.name,
        initial_balance: createDto.initialBalance,
        type: createDto.type,
      },
    });
  }

  update(bankAccountId: string, updateDto: UpdateBankAccountDto) {
    return this.prismaService.bankAccount.update({
      where: { id: bankAccountId },
      data: {
        color: updateDto.color,
        name: updateDto.name,
        initial_balance: updateDto.initialBalance,
        type: updateDto.type,
      },
    });
  }

  delete(bankAccountId: string) {
    return this.prismaService.bankAccount.delete({
      where: { id: bankAccountId },
    });
  }
}
