import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IFreindController } from './interface/freindController';
import { FreindListQuery, FreinsListResponseDto } from './dto/freinds-list.dto';
import { FreindsDto } from './dto/freinds.dto';
import { IsFreindsResponseDto } from './dto/is-freind-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
import { FreindService } from './freind.service';

@ApiTags('user')
@Controller('user/freind')
export class FreindController implements IFreindController {
  constructor(private freindService: FreindService) {}

  @ApiOperation({ summary: 'Добавить в друзья' })
  @ApiResponse({ status: 200, type: IsFreindsResponseDto })
  @Post()
  async addInFreinds(@Body() dto: FreindsDto) {
    return await this.freindService.addInFreinds(dto);
  }

  @ApiOperation({ summary: 'Удалить из друзей' })
  @ApiResponse({ status: 200, type: IsFreindsResponseDto })
  @Delete()
  async removeFromFreinds(@Body() dto: FreindsDto) {
    return await this.freindService.removeFromFreinds(dto);
  }

  @ApiOperation({ summary: 'Этот пользователь друг?' })
  @ApiResponse({ status: 200, type: IsFreindsResponseDto })
  @Get('isfreind')
  async isFreind(@Body() dto: FreindsDto) {
    return await this.freindService.isFreind(dto);
  }

  @ApiOperation({ summary: 'Получить список друзей' })
  @ApiResponse({ status: 200, type: FreinsListResponseDto })
  @Get('list/:userId')
  async getFreindsList(
    @Param('userId') userId: number,
    @Query() query: FreindListQuery,
  ) {
    const params = {
      userId,
      limit: query.limit || 10,
      page: query.page || 1,
      search: query.search || '',
    };
    const data = await this.freindService.getFreindsList(params);
    return data;
  }
}
