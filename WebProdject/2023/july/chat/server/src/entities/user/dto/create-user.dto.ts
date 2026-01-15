import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email', example: 'user1@mail.ru' })
  readonly email: string;
  @ApiProperty({ description: 'Номер телефона', example: '88005553555' })
  readonly phoneNumber: string;
  @ApiProperty({ description: 'Пароль', example: 'user1234' })
  readonly password: string;
}
