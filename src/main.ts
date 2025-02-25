import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { config } from './config/config';
import 'dotenv/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });
  app.use(morgan('dev'));
  await app.listen(process.env.PORT);
}
bootstrap();
