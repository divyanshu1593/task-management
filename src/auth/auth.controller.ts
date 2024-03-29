import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<void> {
    return this.authService.signUp(userCredentialsDto);
  }

  @Post('signIn')
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(userCredentialsDto);
  }
}
