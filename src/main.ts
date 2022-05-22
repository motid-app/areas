import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { PrismaService } from './services/prisma/prisma.service';

const validationPipe = new ValidationPipe({
  transform: true
})

const swaggerConfig = new DocumentBuilder()
  .setTitle('API example')
  .setDescription('The areas API description')
  .setVersion('1.0')
  .build()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(validationPipe)

  // https://docs.nestjs.com/openapi/introduction
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document)

  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
