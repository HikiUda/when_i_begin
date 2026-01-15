import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { UserModule } from '../user/user.module';
import { Chat } from 'src/models/chats.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { ChatsUsers } from 'src/models/chats_users.model';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  imports: [UserModule, SequelizeModule.forFeature([Chat, User,ChatsUsers])],
})
export class ChatModule {}
