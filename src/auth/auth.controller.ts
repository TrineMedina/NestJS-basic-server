import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

//Will handle business logic - connecting to db, editing fields, etc.
@Controller('auth')
export class AuthController {
  // Shorthand for setting up the constructor so you don't need .this
  constructor(private authService: AuthService) {}

  // Post request to auth/signup
  @Post('signup')
  // Body allows you to access the body of the request.
  // DTO (data transfer object) specifies what it should look like
  // The DTO interface is set up in dto/auth.dto.ts
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
