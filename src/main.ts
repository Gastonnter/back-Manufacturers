import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function startApplication() {
  const app = await NestFactory.create(AppModule);

  // Global validation configuration
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS for frontend connections
  app.enableCors({
    origin: true, // Permite cualquier origen (ideal para desarrollo)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true, // Permite cookies y credenciales
  });

  // Swagger documentation setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Vehicle Manufacturers API')
    .setDescription('API para consultar fabricantes de vehículos desde NHTSA')
    .setVersion('1.0')
    .addTag('manufacturers', 'Operaciones de fabricantes de vehículos')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT);

  console.log(`🚀 Application running on: http://localhost:${PORT}`);
  console.log(
    `📚 Swagger docs available at: http://localhost:${PORT}/api/docs`,
  );
}

startApplication();
