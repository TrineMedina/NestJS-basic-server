import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes this module available in all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
