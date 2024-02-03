import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepository.findFirstByUserId(
      userId,
      transactionId,
    );

    if (!isOwner) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
