import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/entities/user/dto/user.dto';
import { User } from 'src/models/user.model';

export class FreinsListResponseDto {
  @ApiProperty({ description: 'Общее число друзей', example: '100' })
  count: number;
  @ApiProperty({ description: 'Список друзей', example: [UserDto] })
  freinds: UserDto[];
}
export class FreinsListDBResponseDto {
  @ApiProperty({ description: 'Общее число друзей', example: '100' })
  count: number;
  @ApiProperty({ description: 'Список друзей', example: [User] })
  freinds: User[];
}

export class FreinsListRequestDto {
  @ApiProperty({ description: 'Страница', example: '1' })
  readonly page: number;
  @ApiProperty({ description: 'Лимит одного зопроса', example: '10' })
  readonly limit: number;
  @ApiProperty({ description: 'id пользователя', example: '3' })
  readonly userId: number;
  @ApiProperty({ description: 'Поиск друзей', example: 'ваня' })
  readonly search: string;
}
export class FreinsListDBRequestDto {
  @ApiProperty({ description: 'Отступ', example: '0' })
  readonly offset: number;
  @ApiProperty({ description: 'Лимит одного зопроса', example: '10' })
  readonly limit: number;
  @ApiProperty({ description: 'id пользователя', example: '3' })
  readonly userId: number;
  @ApiProperty({ description: 'Поиск друзей', example: 'ваня' })
  readonly search: string;
}

export class FreindListQuery {
  page?: number;
  limit?: number;
  search?: string;
}
