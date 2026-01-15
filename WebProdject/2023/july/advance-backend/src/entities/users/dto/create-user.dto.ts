import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некоректный email' })
  @ApiProperty({ example: 'user1@mail.ru', description: 'Уникальный email' })
  readonly email: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  @ApiProperty({ example: 'useruser', description: 'Пароль' })
  readonly password: string;
}
