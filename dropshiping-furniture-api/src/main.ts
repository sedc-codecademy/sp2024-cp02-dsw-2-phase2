import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.setGlobalPrefix('api'); 

  const config = new DocumentBuilder()
  .setTitle('Dropship Furniture API')
  .setDescription('API description for Dropship Furniture')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  
  const options: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  // app.enableCors({
  //   origin: 'http://127.0.0.1:5502', 
  //   methods: 'GET,POST,PUT,DELETE',   
  //   allowedHeaders: 'Content-Type',  
  // });


  await app.listen(3000);
}
bootstrap();
