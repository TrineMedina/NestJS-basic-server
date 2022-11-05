import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

// Prisma client allows us to connect to the DB
// You need to add Injectable if you need to use dependency injection
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
    console.log(config.get('DATABASE_URL'));
  }

  cleanDb() {
    return this.$transaction([this.user.deleteMany(), this.race.deleteMany()]); //This will ensure the user is deleted before the race
  }
}
