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
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsService } from './services/bank-accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @JwtPayload() jwtPayload: JwtPayload,
    @Body() createBankAccountDto: CreateBankAccountDto,
  ) {
    return this.bankAccountsService.create(
      jwtPayload.sub,
      createBankAccountDto,
    );
  }

  @Get()
  findAll(@JwtPayload() jwtPayload: JwtPayload) {
    return this.bankAccountsService.findAllByUserId(jwtPayload.sub);
  }

  @Put(':bankAccountId')
  update(
    @JwtPayload() jwtPayload: JwtPayload,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(
      jwtPayload.sub,
      bankAccountId,
      updateBankAccountDto,
    );
  }

  @Delete(':bankAccountId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @JwtPayload() jwtPayload: JwtPayload,
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
  ) {
    return this.bankAccountsService.remove(jwtPayload.sub, bankAccountId);
  }
}
