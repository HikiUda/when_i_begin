import { User } from 'src/models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserByDataDto } from '../dto/get-user-by-data.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { Express } from 'express';

export interface IUserService {
  createUser: (dto: CreateUserDto) => Promise<UserDto>;
  getUserById: (id: number) => Promise<UserDto>;
  getUserByEmailOrPhone: (
    dto: GetUserByDataDto,
  ) => Promise<{ userByEmail: UserDto | null; userByPhone: UserDto | null }>;

  toUserDto: (user: User) => Promise<UserDto>;
  toUsersDto: (users: User[]) => Promise<UserDto[]>;
  updateUserProfile: (
    dto: UpdateUserProfileDto,
    image: Express.Multer.File,
    userId: number,
  ) => Promise<UserDto>;
}
