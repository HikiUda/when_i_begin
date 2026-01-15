import { IJwtUserRequest } from 'src/entities/auth/types/jwtUserRequest';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UserDto } from '../dto/user.dto';
import { Express } from 'express';

export interface IUserController {
  createUser: (dto: CreateUserDto) => Promise<UserDto>;
  getUserById: (id: number) => Promise<UserDto>;
  updateUserProfile: (
    req: IJwtUserRequest,
    dto: UpdateUserProfileDto,
    image: Express.Multer.File,
  ) => Promise<UserDto>;
}
