import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.enableCors({
  //   origin: 'http://localhost:5000',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  //   credentials: true,
  // });

  const config = new DocumentBuilder()
    .setTitle("Food Delivery")
    .setDescription("Food Delivery Documentation Rest API")
    .setVersion("1.0.0")
    .addTag("FaceIt")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/food-delivery-docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
