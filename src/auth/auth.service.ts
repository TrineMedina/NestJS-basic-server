import { Inject, Injectable } from '@nestjs/common';
import { User, Race } from '@prisma/client';

@Injectable()
export class AuthService {
  signup() {
    return { msg: 'I have signed up' };
  }

  signin() {
    return { msg: 'I have signed in' };
  }
}
