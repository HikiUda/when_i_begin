import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({
    description: 'Строковый уникальный индитификатор роли',
    example: 'ADMIN',
  })
  readonly value: string;
  @ApiProperty({ description: 'Описание роли', example: 'Администратор' })
  readonly description: string;
}
