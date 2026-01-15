import { FreindsDto } from '../dto/freinds.dto';
import { IsFreindsResponseDto } from '../dto/is-freind-response.dto';
import {
  FreinsListDBRequestDto,
  FreinsListDBResponseDto,
} from '../dto/freinds-list.dto';

export interface IFreindRepository {
  addInFreinds: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  removeFromFreinds: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  isFreind: (dto: FreindsDto) => Promise<IsFreindsResponseDto>;
  getFreindsList: (
    dto: FreinsListDBRequestDto,
  ) => Promise<FreinsListDBResponseDto>;
}
