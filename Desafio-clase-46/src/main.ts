import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const opt = new DocumentBuilder()
    .setTitle('Mi API con NEST')
    .setDescription('Descripcion de mi API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, opt);

  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
