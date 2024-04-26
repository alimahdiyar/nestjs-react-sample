import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

export async function setupApp(app: INestApplication) {
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
}

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApp(app);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
}

bootstrap();
