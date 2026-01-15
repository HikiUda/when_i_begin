import { Request } from 'express';
import { UserDto } from 'src/entities/user/dto/user.dto';

export interface IJwtUserRequest extends Request {
  user: UserDto;
}
