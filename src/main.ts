/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurações CORS globais para todas as rotas
  // const corsOptions: CorsOptions = {
  //   origin: 'http://localhost:3000',
  //   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  //   preflightContinue: true,
  //   optionsSuccessStatus: 204
  // };

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
