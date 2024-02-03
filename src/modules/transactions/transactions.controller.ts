import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { JwtPayload } from 'src/shared/decorators/jwt-payload';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @JwtPayload() jwtPayload: JwtPayload,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(
      jwtPayload.sub,
      createTransactionDto,
    );
  }

  @Get()
  findAll(@JwtPayload() jwtPayload: JwtPayload) {
    return this.transactionsService.findAllByUserId(jwtPayload.sub);
  }

  @Put(':transactionId')
  update(
    @JwtPayload() jwtPayload: JwtPayload,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(
      jwtPayload.sub,
      transactionId,
      updateTransactionDto,
    );
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @JwtPayload() jwtPayload: JwtPayload,
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
  ) {
    return this.transactionsService.remove(jwtPayload.sub, transactionId);
  }
}
