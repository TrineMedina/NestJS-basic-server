import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // This is needed to use the validation pipes added to auth.dto.ts
  // Setting whitelist to true will ensure that only the data expected is
  // Passed on to the serverside
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3333); //usually React is 3000
}

bootstrap();
