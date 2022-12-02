import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    console.log('in edit user. userId: ', userId);
    const user = await this.prisma.user.update({
      where: {
        id: userId, //locates the user with the correct user ID
      },
      data: {
        ...dto, //Destructures the dto and updates the db
      },
    });
    delete user.hash;
    console.log('editing user: ', user);
    return user;
  }
}
