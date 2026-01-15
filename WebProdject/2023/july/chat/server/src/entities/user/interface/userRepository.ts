import { User } from 'src/models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserByDataDto } from '../dto/get-user-by-data.dto';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';

export interface IUserRepository {
  createUser: (dto: CreateUserDto) => Promise<User>;
  getUserById: (id: number) => Promise<User>;
  //getUserByEmailOrPhone: (dto: GetUserByDataDto) => Promise<User>;
  getUserByPhone: (phoneNumber: string) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User>;
  //getFreinds: (addFreindDto: AddFreindDto) => Promise<User[]>;
  updateUserProfile: (
    dto: UpdateUserProfileDto,
    userId: number,
  ) => Promise<User>;
}
