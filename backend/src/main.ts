import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { startVoteScheduler } from "./vote/voteScheduler";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle("Food Delivery")
    .setDescription("Food Delivery Documentation Rest API")
    .setVersion("1.0.0")
    .addTag("FaceIt")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/food-delivery-docs", app, document);
  await Promise.resolve(startVoteScheduler());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();