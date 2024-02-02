import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { AuthModule } from "./auth/auth.module";
import { VotesModule } from "./vote/vote.module";
import { Vote } from './vote/vote.model';
import { UsersGateway } from './users/users.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Vote],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    VotesModule
  ],

})
export class AppModule {}
