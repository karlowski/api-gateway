import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  await app.listen(port ?? 3000);
}
bootstrap();
