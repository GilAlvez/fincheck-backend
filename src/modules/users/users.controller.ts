import { Controller, Get } from '@nestjs/common';
import { JwtPayload } from 'src/shared/decorators/jwt-payload';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  profile(@JwtPayload() payload: JwtPayload) {
    return this.usersService.getUserById(payload.sub);
  }
}
