import { Module } from '@nestjs/common';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';
import { TransactionsService } from './services/transactions.service';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { TransactionsController } from './transactions.controller';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
    ValidateTransactionOwnershipService,
  ],
})
export class TransactionsModule {}
