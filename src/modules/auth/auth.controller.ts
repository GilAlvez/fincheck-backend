import { Body, Controller, Post } from '@nestjs/common';
import { SkipAuthGuard } from 'src/shared/decorators/skip-auth-guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@SkipAuthGuard()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    const accessToken = await this.authService.signIn(signInDto);

    return { access_token: accessToken };
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const accessToken = await this.authService.signUp(signUpDto);

    return { access_token: accessToken };
  }
}
