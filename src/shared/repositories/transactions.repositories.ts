import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/modules/transactions/dto/create-transaction.dto';
import { PrismaService } from '../services/prisma.service';
import { generateUUID } from '../utils/generate-uuid';
import { UpdateTransactionDto } from 'src/modules/transactions/dto/update-transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findManyByUserId(userId: string) {
    return this.prismaService.transaction.findMany({
      where: { user_id: userId },
    });
  }

  findFirstByUserId(userId: string, transactionId: string) {
    return this.prismaService.transaction.findFirst({
      where: { user_id: userId, id: transactionId },
    });
  }

  create(userId: string, createDto: CreateTransactionDto) {
    return this.prismaService.transaction.create({
      data: {
        id: generateUUID(),
        user_id: userId,
        category_id: createDto.categoryId,
        bank_account_id: createDto.bankAccountId,
        date: createDto.date,
        name: createDto.name,
        type: createDto.type,
        value: createDto.value,
      },
    });
  }

  update(transactionId: string, updateDto: UpdateTransactionDto) {
    return this.prismaService.transaction.update({
      where: { id: transactionId },
      data: {
        category_id: updateDto.categoryId,
        bank_account_id: updateDto.bankAccountId,
        date: updateDto.date,
        name: updateDto.name,
        type: updateDto.type,
        value: updateDto.value,
      },
    });
  }

  delete(transactionId: string) {
    return this.prismaService.transaction.delete({
      where: { id: transactionId },
    });
  }
}
