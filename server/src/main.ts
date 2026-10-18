require('dotenv').config()
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { REDIRECT_METADATA } from '@nestjs/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
