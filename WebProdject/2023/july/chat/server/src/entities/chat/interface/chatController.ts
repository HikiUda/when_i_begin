import { CreatePersonChatDto } from '../dto/create-person-chat.dto';
import { ChatDto } from '../dto/chat.dto';
import { ChatListQuery, ChatListResponseDto } from '../dto/get-chat-list.dto';
import { IJwtUserRequest } from 'src/entities/auth/types/jwtUserRequest';

export interface IChatController {
  createPersonChat: (dto: CreatePersonChatDto) => Promise<ChatDto>;
  getChatList: (
    req: IJwtUserRequest,
    query: ChatListQuery,
  ) => Promise<ChatListResponseDto>;
}
