import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserController } from './interface/userController';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ATokenAuthGuard } from 'src/guards/auth/at-auth.guard';
import { IJwtUserRequest } from '../auth/types/jwtUserRequest';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController implements IUserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Выйти' })
  @ApiResponse({ status: 200, type: UserDto })
  @UseGuards(ATokenAuthGuard)
  @Put('profile')
  @UseInterceptors(FileInterceptor('image'))
  async updateUserProfile(
    @Req() req: IJwtUserRequest,
    @Body() dto: UpdateUserProfileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const user = await this.userService.updateUserProfile(
      dto,
      image,
      req.user.id,
    );
    return user;
  }

  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: UserDto })
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 200, type: UserDto })
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    return user;
  }
}
