import { Chat } from 'src/models/chats.model';
import { CreatePersonChatDto } from '../dto/create-person-chat.dto';
import { CreateCommonChatDto } from '../dto/create-common-chat.dto';
import { UpdateCommonChatDto } from '../dto/update-common-chat.dto';
import {
  ChatListDBRequestDto,
  ChatListDBResponseDto,
} from '../dto/get-chat-list.dto';

export interface IChatRepository {
  createPersonChat: (dto: CreatePersonChatDto) => Promise<Chat>;
  createCommonChat: (dto: CreateCommonChatDto) => Promise<Chat>;
  updateCommonChat: (dto: UpdateCommonChatDto) => Promise<Chat>;
  getChatList: (dto: ChatListDBRequestDto) => Promise<ChatListDBResponseDto>;
}
