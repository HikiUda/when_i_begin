import { Body, Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { IChatController } from './interface/chatController';
import { ChatDto } from './dto/chat.dto';
import { CreatePersonChatDto } from './dto/create-person-chat.dto';
import { ChatService } from './chat.service';
import { ChatListQuery, ChatListResponseDto } from './dto/get-chat-list.dto';
import { IJwtUserRequest } from '../auth/types/jwtUserRequest';
import { ATokenAuthGuard } from 'src/guards/auth/at-auth.guard';

@Controller('chat')
export class ChatController implements IChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(ATokenAuthGuard)
  async getChatList(
    @Req() req: IJwtUserRequest,
    @Query() query: ChatListQuery,
  ) {
    const params = {
      userId: req.user.id,
      limit: query.limit && 10,
      page: query.page && 1,
      search: query.search && '',
    };

    return await this.chatService.getChatList(params);
  }

  @Post('person')
  async createPersonChat(@Body() dto: CreatePersonChatDto) {
    return await this.chatService.createPersonChat(dto);
  }
}
