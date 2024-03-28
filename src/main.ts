import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const config = app.get(ConfigService);
  
  app.enableCors();
  
  app.enableVersioning({
    type: VersioningType.URI
  });

  console.log(config)
  await app.listen(parseInt(config.get<string>("SERVER.PORT")));
}
bootstrap();
