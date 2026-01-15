import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { RoleModule } from '../role/role.module';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [SequelizeModule.forFeature([User]), RoleModule, FileModule],
  exports: [UserService, UserRepository],
})
export class UserModule {}
