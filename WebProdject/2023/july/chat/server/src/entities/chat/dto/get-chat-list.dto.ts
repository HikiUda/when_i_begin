import { ApiProperty } from '@nestjs/swagger';
import { Chat } from 'src/models/chats.model';
import { ChatDto } from './chat.dto';

export class ChatListResponseDto {
  @ApiProperty({ description: 'Общее число чатов', example: '100' })
  count: number;
  @ApiProperty({ description: 'Список чатов', example: [ChatDto] })
  chats: ChatDto[];
}
export class ChatListDBResponseDto {
  @ApiProperty({ description: 'Общее число чатов', example: '100' })
  count: number;
  @ApiProperty({ description: 'Список чатов', example: [Chat] })
  chats: Chat[];
}

export class ChatListRequestDto {
  @ApiProperty({ description: 'Страница', example: '1' })
  readonly page: number;
  @ApiProperty({ description: 'Лимит одного зопроса', example: '10' })
  readonly limit: number;
  @ApiProperty({ description: 'id пользователя', example: '3' })
  readonly userId: number;
  @ApiProperty({ description: 'Поиск чатов', example: 'ваня' })
  readonly search: string;
}
export class ChatListDBRequestDto {
  @ApiProperty({ description: 'Отступ', example: '0' })
  readonly offset: number;
  @ApiProperty({ description: 'Лимит одного зопроса', example: '10' })
  readonly limit: number;
  @ApiProperty({ description: 'id пользователя', example: '3' })
  readonly userId: number;
  @ApiProperty({ description: 'Поиск чатов', example: 'ваня' })
  readonly search: string;
}

export class ChatListQuery {
  page?: number;
  limit?: number;
  search?: string;
}
