import { Injectable } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/repositories/bank-accounts.repositories';
import { generateUUID } from 'src/shared/utils/generate-uuid';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsService {
  constructor(private readonly bankAccountRepository: BankAccountsRepository) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountRepository.create({
      data: {
        id: generateUUID(),
        user_id: userId,
        color: createBankAccountDto.color,
        name: createBankAccountDto.name,
        initial_balance: createBankAccountDto.initialBalance,
        type: createBankAccountDto.type,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountRepository.findManyByUserId(userId);
  }

  update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: string) {
    return `This action removes a #${id} bankAccount`;
  }
}
