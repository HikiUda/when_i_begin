import { Controller, Get, Post, Body } from '@nestjs/common';
import { IRoleController } from './interface/roleController';
import { Role } from 'src/models/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { RoleService } from './role.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('role')
@Controller('role')
export class RoleController implements IRoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Создать роль' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  async createRole(@Body() dto: AddRoleDto) {
    const role = await this.roleService.createRole(dto);
    return role;
  }
}
