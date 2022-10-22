import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // Shorthand for setting up the constructor so you don't need .this
  constructor(private authService: AuthService) {}

  // Post request to auth/signup
  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
