import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthRegistrationDto } from '../dto/auth-registration.dto';
import { AuthResType } from '../types/authType';
import { Response, Request } from 'express';
import { IJwtUserRequest } from '../types/jwtUserRequest';

export interface IAuthController {
  login: (dto: AuthLoginDto, res: Response) => Promise<AuthResType>;
  registration: (
    dto: AuthRegistrationDto,
    res: Response,
  ) => Promise<AuthResType>;
  logout: (req: IJwtUserRequest, res: Response) => void;
  refresh: (req: Request, res: Response) => Promise<AuthResType>;
}
