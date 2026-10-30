import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './comum/filters/http-exception.filter.js';
import { TransformInterceptor } from './comum/interceptors/transform.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação Global baseada nos DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro Global de Exceções (Padronização de Erros)
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptor Global de Respostas de Sucesso
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Aplicação a correr em: http://localhost:3000`);
}
bootstrap();