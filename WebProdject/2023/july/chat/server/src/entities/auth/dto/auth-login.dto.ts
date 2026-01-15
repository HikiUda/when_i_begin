import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({ description: 'Email', example: 'user1@mail.ru' })
  @IsOptional()
  @IsEmail()
  readonly email: string | null;

  @ApiProperty({ description: 'Номер телефона', example: '88005553555' })
  @IsOptional()
  @MinLength(11)
  @IsPhoneNumber('RU')
  readonly phoneNumber: string | null;

  @ApiProperty({ description: 'Пароль', example: 'user1234' })
  @MinLength(8)
  @MaxLength(20)
  readonly password: string;
}
