import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersGateway } from './users.gateway';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersGateway], 
  imports: [
    SequelizeModule.forFeature([User])
  ],
  exports: [UsersService]
})
export class UsersModule {}
