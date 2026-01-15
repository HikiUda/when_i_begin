import { Role } from 'src/models/roles.model';
import { AddRoleDto } from '../dto/add-role.dto';

export interface IRoleRepository {
  createRole: (dto: AddRoleDto) => Promise<Role>;
  getRole: (value: string) => Promise<Role | null>;
}
