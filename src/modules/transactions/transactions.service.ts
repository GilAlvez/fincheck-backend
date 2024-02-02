import { Injectable, NotImplementedException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/repositories/transactions.repositories';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  create(createTransactionDto: CreateTransactionDto) {
    throw new NotImplementedException();
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findManyByUserId(userId);
  }

  update(transactionId: string, updateTransactionDto: UpdateTransactionDto) {
    throw new NotImplementedException();
  }

  remove(transactionId: string) {
    return this.transactionsRepository.delete(transactionId);
  }
}
