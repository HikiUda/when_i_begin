import { Role } from 'src/models/roles.model';
import { AddRoleDto } from '../dto/add-role.dto';

export interface IRoleController {
  createRole: (dto: AddRoleDto) => Promise<Role>;
}
