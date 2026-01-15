import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interface/userRepository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from 'src/models/roles.model';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User) private modelUser: typeof User) {}

  async getUserById(id: number) {
    const user = await this.modelUser.findOne({
      where: { id },
      include: [Role],
    });
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.modelUser.create(dto, { include: [Role] });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.modelUser.findOne({
      where: { email },
      include: [Role],
    });
    return user;
  }

  async getUserByPhone(phoneNumber: string) {
    const user = await this.modelUser.findOne({
      where: { phoneNumber },
      include: [Role],
    });
    return user;
  }

  async updateUserProfile(dto: UpdateUserProfileDto, userId: number) {
    await this.modelUser.update(dto, { where: { id: userId } });
    const user = await this.getUserById(userId);
    return user;
  }
}
