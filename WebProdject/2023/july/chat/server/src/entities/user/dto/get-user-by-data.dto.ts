import { ApiProperty } from '@nestjs/swagger';

export class GetUserByDataDto {
  @ApiProperty({ description: 'Email', example: 'user1@mail.ru' })
  readonly email?: string | null;
  @ApiProperty({ description: 'Номер телефона', example: '88005553555' })
  readonly phoneNumber?: string | null;
}
