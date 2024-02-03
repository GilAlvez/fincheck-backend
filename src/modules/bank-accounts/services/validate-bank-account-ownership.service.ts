import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountRepository: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountRepository.findFirstByUserId(
      userId,
      bankAccountId,
    );

    if (!isOwner) {
      throw new NotFoundException('BankAccount not found');
    }
  }
}
