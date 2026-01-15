import { AuthRegistrationDto } from '../dto/auth-registration.dto';
import { AuthDataType } from '../types/authType';
import { AuthLoginDto } from '../dto/auth-login.dto';

export interface IAuthService {
  login: (dto: AuthLoginDto) => Promise<AuthDataType>;
  registration: (dto: AuthRegistrationDto) => Promise<AuthDataType>;
  logout: (userId: number) => void;
  refresh: (refresh: string) => Promise<AuthDataType>;
}
