import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Должно быть строкой' })
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  readonly value: string;
  @IsNumber({}, { message: 'Должно быть числом' })
  @ApiProperty({ example: '1', description: 'ID пользователя' })
  readonly userId: number;
}
