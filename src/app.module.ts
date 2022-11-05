import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RaceModule } from './race/race.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //This is set as true so the prisma.module can access it. Similar to @Global
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    RaceModule,
    PrismaModule,
  ],
})
export class AppModule {}

//This module calls all other modules - kind of like the root module
