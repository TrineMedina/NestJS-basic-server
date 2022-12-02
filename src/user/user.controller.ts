import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

// See the strategy set up in strategy/jwt.strategy.ts and JwtGuard is set
// up in auth/guard/jwt.guard.ts to avoid passing a string as an arg to AuthGuard
@UseGuards(JwtGuard) //This will require you to use a guard/token on any endpoint request
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  //@GetUser is a custom decorator set up in auth/decorator
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    console.log('in patch: ', userId);
    return this.userService.editUser(userId, dto);
  }
}
