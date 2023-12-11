import { Module } from '@nestjs/common';
import { VotesController } from './vote.controller';
import { VotesService } from './vote.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vote } from './vote.model';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [VotesController],
  providers: [VotesService],
  imports: [
    SequelizeModule.forFeature([Vote]),
    UsersModule,
  ],
  exports: [VotesService]
})
export class VotesModule {}
