import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../enums/transaction-type';

export class CreateTransactionDto {
  @IsUUID()
  bankAccountId: string;

  @IsUUID()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsISO8601()
  date: string;

  @IsEnum(TransactionType)
  type?: TransactionType;
}
