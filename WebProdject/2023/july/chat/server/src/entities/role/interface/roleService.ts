import { Role } from 'src/models/roles.model';
import { AddRoleDto } from '../dto/add-role.dto';
import { User } from 'src/models/user.model';

export interface IRoleService {
  createRole: (dto: AddRoleDto) => Promise<Role>;
  getRole: (value: string) => Promise<Role | null>;
  addRole: (user: User, value: string) => Promise<Role | null>;
}
