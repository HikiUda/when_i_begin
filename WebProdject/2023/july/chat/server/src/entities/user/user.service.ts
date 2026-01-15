import { Injectable } from '@nestjs/common';
import { IUserService } from './interface/userService';
import { User } from 'src/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { RoleService } from '../role/role.service';
import { GetUserByDataDto } from './dto/get-user-by-data.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private userRepository: UserRepository,
    private roleService: RoleService,
    private fileService: FileService,
  ) {}
  async createUser(dto: CreateUserDto) {
    let user = await this.userRepository.createUser(dto);
    const role = await this.roleService.addRole(user, 'USER');
    user.dataValues.roles = [role];
    return await this.toUserDto(user);
  }
  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);
    return await this.toUserDto(user);
  }

  async getUserByEmailOrPhone(dto: GetUserByDataDto) {
    const userByEmail = await this.userRepository.getUserByEmail(dto.email);
    const userByPhone = await this.userRepository.getUserByPhone(
      dto.phoneNumber,
    );

    const userByEmailDto = userByEmail && new UserDto(userByEmail);
    const userByPhoneDto = userByPhone && new UserDto(userByPhone);

    return { userByEmail: userByEmailDto, userByPhone: userByPhoneDto };
  }

  async toUserDto(user: User) {
    const userDto = new UserDto(user);
    return userDto;
  }
  async toUsersDto(users: User[]) {
    const usersDto = users.map((user) => {
      const usersDto = new UserDto(user);
      return usersDto;
    });
    return usersDto;
  }

  async updateUserProfile(
    dto: UpdateUserProfileDto,
    image: Express.Multer.File,
    userId: number,
  ) {
    let data = dto;
    if (image) {
      let fileName = await this.fileService.saveImage(image);
      data.avatar = fileName;
    }
    const user = await this.userRepository.updateUserProfile(data, userId);

    const userDto = new UserDto(user);

    return userDto;
  }
}
