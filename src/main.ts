import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurações CORS globais para todas as rotas
  // const corsOptions: CorsOptions = {
  //   origin: true,
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   preflightContinue: true,
  //   optionsSuccessStatus: 204
  // };

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
