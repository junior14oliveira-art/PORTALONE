import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Segurança - CORS: permite ecommerce e admin panel
  app.enableCors({
    origin: [
      process.env.ECOMMERCE_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:3002',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Validação global de DTOs com class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Remove campos não declarados no DTO
      forbidNonWhitelisted: true, // Retorna erro se campos extras forem enviados
      transform: true,           // Transforma payloads para tipos declarados
    }),
  );

  // Prefix global da API - todas as rotas ficam em /api/*
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 PORTALONE Backend rodando na porta ${port}`);
}
bootstrap();
