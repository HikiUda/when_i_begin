import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './interface/roleRepository';
import { Role } from 'src/models/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(@InjectModel(Role) private modelRole: typeof Role) {}

  async createRole(dto: AddRoleDto) {
    const role = await this.modelRole.create(dto);
    return role;
  }

  async getRole(value: string) {
    const role = await this.modelRole.findOne({ where: { value } });
    return role;
  }
}
