import { Module } from '@nestjs/common';
import { FreindController } from './freind.controller';
import { FreindService } from './freind.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { Freinds } from 'src/models/freinds.model';
import { FreindRepository } from './freind.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [FreindController],
  providers: [FreindService, FreindRepository],
  imports: [SequelizeModule.forFeature([User, Freinds]), UserModule],
})
export class FreindModule {}
