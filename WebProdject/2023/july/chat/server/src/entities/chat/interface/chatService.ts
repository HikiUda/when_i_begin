import { CreatePersonChatDto } from '../dto/create-person-chat.dto';
import { ChatDto } from '../dto/chat.dto';
import { Chat } from 'src/models/chats.model';
import {
  ChatListRequestDto,
  ChatListResponseDto,
} from '../dto/get-chat-list.dto';

export interface IChatService {
  createPersonChat: (dto: CreatePersonChatDto) => Promise<ChatDto>;
  getChatList: (dto: ChatListRequestDto) => Promise<ChatListResponseDto>;
  toChatDto: (chat: Chat) => Promise<ChatDto>;
  toChatsDto: (chats: Chat[]) => Promise<ChatDto[]>;
}
