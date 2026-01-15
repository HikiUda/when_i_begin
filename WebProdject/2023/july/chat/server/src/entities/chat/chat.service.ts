import { Injectable } from '@nestjs/common';
import { IChatService } from './interface/chatService';
import { ChatDto } from './dto/chat.dto';
import { CreatePersonChatDto } from './dto/create-person-chat.dto';
import { ChatRepository } from './chat.repository';
import { Chat } from 'src/models/chats.model';
import {
  ChatListRequestDto,
  ChatListResponseDto,
} from './dto/get-chat-list.dto';

@Injectable()
export class ChatService implements IChatService {
  constructor(private chatRepository: ChatRepository) {}
  async getChatList(dto: ChatListRequestDto) {
    const { userId, limit, page, search } = dto;
    const offset = limit * (page - 1);
    const { count, chats } = await this.chatRepository.getChatList({
      userId,
      limit,
      offset,
      search: `%${search}%`,
    });

    const chatsDto = await this.toChatsDto(chats);
    return { count, chats: chatsDto };
  }

  async createPersonChat(dto: CreatePersonChatDto) {
    const chat = await this.chatRepository.createPersonChat(dto);
    return this.toChatDto(chat);
  }

  async toChatDto(chat: Chat) {
    const chatDto = new ChatDto(chat);
    return chatDto;
  }
  async toChatsDto(chats: Chat[]) {
    const chatsDto = chats.map((chat) => {
      const chatDto = new ChatDto(chat);
      return chatDto;
    });
    return chatsDto;
  }
}
