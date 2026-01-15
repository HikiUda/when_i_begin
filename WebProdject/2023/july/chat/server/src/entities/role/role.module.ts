import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { Role } from 'src/models/roles.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  imports: [SequelizeModule.forFeature([Role])],
  exports: [RoleService],
})
export class RoleModule {}
