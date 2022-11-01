import { AuthGuard } from '@nestjs/passport';

// this allows us to use JtwGuard in user.controller and pass it in as an
// argument to @UseGuards since passing in strings (magic strings) is error prone
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
