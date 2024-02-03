import { Injectable } from '@nestjs/common';
import { TransactionType } from 'src/modules/transactions/enums/transaction-type';
import { BankAccountsRepository } from 'src/shared/repositories/bank-accounts.repositories';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountRepository.create(userId, createBankAccountDto);
  }

  async findAllByUserId(userId: string) {
    const bankAccounts =
      await this.bankAccountRepository.findManyByUserId(userId);

    return bankAccounts.map((account) => {
      const transactionsBalance = account.transactions.reduce(
        (accumulated, transaction) => {
          const income =
            transaction.type === TransactionType.income && transaction.value;
          const expense =
            transaction.type === TransactionType.expense && -transaction.value;

          return accumulated + income + expense;
        },
        0,
      );

      return {
        ...account,
        balance: account.initial_balance + transactionsBalance,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    return this.bankAccountRepository.update(
      bankAccountId,
      updateBankAccountDto,
    );
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountRepository.delete(bankAccountId);
  }
}
