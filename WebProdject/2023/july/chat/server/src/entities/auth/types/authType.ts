import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/entities/user/dto/user.dto';

export class AuthResType {
  @ApiProperty({ description: 'Данные пользователя', example: UserDto })
  user: UserDto;
  @ApiProperty({ description: 'Токен доступа', example: 'token' })
  token: string;
}

export type AuthDataType = {
  data: AuthResType;
  refreshToken: string;
};
