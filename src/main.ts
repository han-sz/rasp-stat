import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('static');
  app.setViewEngine('hbs');
  app.setBaseViewsDir('views');

  await app.listen(process.env.STAT_PORT || 4320);
}
bootstrap();
