import { ApiProperty } from '@nestjs/swagger';

export class IsFreindsResponseDto {
  @ApiProperty({ description: 'Друзья или нет', example: 'true' })
  readonly isFreind: boolean;
}
