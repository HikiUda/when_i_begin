import { Injectable } from '@nestjs/common';
import { IFreindService } from './interface/freindService';
import { FreinsListRequestDto } from './dto/freinds-list.dto';
import { FreindsDto } from './dto/freinds.dto';
import { FreindRepository } from './freind.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class FreindService implements IFreindService {
  constructor(
    private freindRepository: FreindRepository,
    private userService: UserService,
  ) {}

  async addInFreinds(dto: FreindsDto) {
    return await this.freindRepository.addInFreinds(dto);
  }
  async removeFromFreinds(dto: FreindsDto) {
    return await this.freindRepository.removeFromFreinds(dto);
  }
  async isFreind(dto: FreindsDto) {
    return await this.freindRepository.isFreind(dto);
  }
  async getFreindsList(dto: FreinsListRequestDto) {
    const { page, limit, userId, search } = dto;
    const offset = limit * (page - 1);
    const { count, freinds } = await this.freindRepository.getFreindsList({
      offset,
      limit,
      userId,
      search: `%${search}%`,
    });

    const freindsDto = await this.userService.toUsersDto(freinds);

    return { count, freinds: freindsDto };
  }
}
