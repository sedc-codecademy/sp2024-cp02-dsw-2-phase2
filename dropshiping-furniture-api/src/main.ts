import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import {
//   DocumentBuilder,
//   SwaggerDocumentOptions,
//   SwaggerModule,
// } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  // const config = new DocumentBuilder()
  //   .setTitle("Dropship Furniture API")
  //   .setDescription("API description for Dropship Furniture")
  //   .setVersion("1.0")
  //   .build();

  // const options: SwaggerDocumentOptions = {
  //   ignoreGlobalPrefix: false,
  // };

  // const document = SwaggerModule.createDocument(app, config, options);
  // SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  await app.listen(3000);
}
bootstrap();
