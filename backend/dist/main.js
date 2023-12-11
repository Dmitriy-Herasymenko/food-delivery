"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const voteScheduler_1 = require("./vote/voteScheduler");
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Food Delivery")
        .setDescription("Food Delivery Documentation Rest API")
        .setVersion("1.0.0")
        .addTag("FaceIt")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("/api/food-delivery-docs", app, document);
    await Promise.resolve((0, voteScheduler_1.startVoteScheduler)());
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
start();
//# sourceMappingURL=main.js.map