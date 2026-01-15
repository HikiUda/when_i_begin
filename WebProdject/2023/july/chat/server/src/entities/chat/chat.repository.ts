import { Injectable } from '@nestjs/common';
import { IChatRepository } from './interface/chatRepository';
import { Chat } from 'src/models/chats.model';
import { CreateCommonChatDto } from './dto/create-common-chat.dto';
import { CreatePersonChatDto } from './dto/create-person-chat.dto';
import { UpdateCommonChatDto } from './dto/update-common-chat.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserRepository } from '../user/user.repository';
import {
  ChatListDBRequestDto,
  ChatListDBResponseDto,
} from './dto/get-chat-list.dto';
import { User } from 'src/models/user.model';
import { ChatsUsers } from 'src/models/chats_users.model';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(
    @InjectModel(Chat) private chatModel: typeof Chat,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(ChatsUsers) private chatsUsersModel: typeof ChatsUsers,
    private userRepository: UserRepository,
  ) {}
  async getChatList(dto: ChatListDBRequestDto) {
    const { userId, limit, offset, search } = dto;

    //Доделать поиск
    const data = await this.chatsUsersModel.findAndCountAll({
      where: { userId },
      offset,
      limit,
      include: [{ model: Chat, as: 'chat' }],
    });

    return {} as ChatListDBResponseDto;
  }

  async createPersonChat(dto: CreatePersonChatDto) {
    const chat = await this.chatModel.create({ type: 'person' });
    chat.$add('users', dto.userOneId);
    chat.$add('users', dto.userTwoId);

    const { firstName, lastName, email, avatar } =
      await this.userRepository.getUserById(dto.userTwoId);

    chat.name =
      `${firstName || ''}${firstName && lastName ? ' ' : ''}${
        lastName || ''
      }` || email;
    chat.image = avatar;
    return chat;
  }
  createCommonChat: (dto: CreateCommonChatDto) => Promise<Chat>;
  updateCommonChat: (dto: UpdateCommonChatDto) => Promise<Chat>;
}
