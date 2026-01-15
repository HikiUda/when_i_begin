import { ApiProperty } from '@nestjs/swagger';

export class FreindsDto {
  @ApiProperty({ description: 'id 1 пользователя', example: '1' })
  readonly userOneId: number;
  @ApiProperty({ description: 'id 2 пользователя', example: '2' })
  readonly userTwoId: number;
}
