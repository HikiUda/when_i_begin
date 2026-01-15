import { Injectable } from '@nestjs/common';
import { IRoleService } from './interface/roleService';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleRepository } from './role.repository';
import { User } from 'src/models/user.model';

@Injectable()
export class RoleService implements IRoleService {
  constructor(private roleRepository: RoleRepository) {}

  async createRole(dto: AddRoleDto) {
    const role = await this.roleRepository.createRole(dto);
    return role;
  }
  async getRole(value: string) {
    const role = await this.roleRepository.getRole(value);
    return role;
  }

  async addRole(user: User, value: string) {
    const role = await this.roleRepository.getRole(value);
    if (!role) {
      return null;
    }
    user.$add('roles', role.id);
    return role;
  }
}
