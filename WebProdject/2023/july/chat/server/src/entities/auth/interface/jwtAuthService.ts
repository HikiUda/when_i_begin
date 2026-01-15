import { UserDto } from 'src/entities/user/dto/user.dto';
import { TokensType } from '../types/tokensType';
import { Token } from 'src/models/tokens.model';

export interface IJwtAuthService {
  generateTokens(payload: UserDto): Promise<TokensType>;
  // if true, record was created. Otherwase it was updated
  saveTokenInDB(userId: number, token: string): Promise<boolean>;
  removeTokenFromDB(userId: number): void;
  varifyRefreshToken(refresh: string): Promise<UserDto | null>;
  findTokenInDB(userId: number): Promise<Token | null>;
}
