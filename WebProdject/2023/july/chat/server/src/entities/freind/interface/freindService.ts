import { FreindsDto } from '../dto/freinds.dto';
import { IsFreindsResponseDto } from '../dto/is-freind-response.dto';
import {
  FreinsListRequestDto,
  FreinsListResponseDto,
} from '../dto/freinds-list.dto';

export interface IFreindService {
  addInFreinds: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  removeFromFreinds: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  isFreind: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  getFreindsList: (dto: FreinsListRequestDto) => Promise<FreinsListResponseDto>;
}
