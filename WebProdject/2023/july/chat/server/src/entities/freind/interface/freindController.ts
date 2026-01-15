import { FreindsDto } from '../dto/freinds.dto';
import { IsFreindsResponseDto } from '../dto/is-freind-response.dto';
import {
  FreindListQuery,
  FreinsListResponseDto,
} from '../dto/freinds-list.dto';

export interface IFreindController {
  addInFreinds: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  removeFromFreinds: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  isFreind: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  getFreindsList: (
    userId: number,
    query: FreindListQuery,
  ) => Promise<FreinsListResponseDto>;
}
