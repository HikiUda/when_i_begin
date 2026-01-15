import { ApiProperty } from '@nestjs/swagger';
import { Role, RolesList } from 'src/models/roles.model';

export class RoleDto {
  @ApiProperty({
    description: 'Описание роли',
    example: 'Администратор',
  })
  description: string;
  @ApiProperty({
    description: 'Строковый уникальный индитификатор роли',
    example: 'ADMIN',
    enum: RolesList,
  })
  value: string;

  constructor(data: Role) {
    this.description = data.description;
    this.value = data.value;
  }
}
