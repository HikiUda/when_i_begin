import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IAuthService } from './interface/authService';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from './jwt-auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { User } from 'src/models/user.model';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private userService: UserService,
    private jwtAuthService: JwtAuthService,
    private userRepository: UserRepository,
  ) {}

  async login(dto: AuthLoginDto) {
    let user: User;
    if (dto.email) {
      user = await this.userRepository.getUserByEmail(dto.email);
    } else if (dto.phoneNumber) {
      user = await this.userRepository.getUserByPhone(dto.phoneNumber);
    } else {
      throw new BadRequestException(
        'Для авторизации необходим email или номер телефона.',
      );
    }

    if (!user) {
      throw new BadRequestException(
        `Пользователь с таким ${
          dto.email ? 'email ' : 'номнером телефона'
        }не существует`,
      );
    }

    const isSamePassword = await bcrypt.compare(dto.password, user.password);

    if (!isSamePassword) {
      throw new BadRequestException(`Неверный пароль`);
    }
    const userDto = await this.userService.toUserDto(user);
    const tokens = await this.jwtAuthService.generateTokens(userDto);
    await this.jwtAuthService.saveTokenInDB(user.id, tokens.refreshToken);

    let data = { user: userDto, token: tokens.accessToken };
    return { data, refreshToken: tokens.refreshToken };
  }
  async registration(dto: AuthRegistrationDto) {
    const { userByEmail, userByPhone } =
      await this.userService.getUserByEmailOrPhone(dto);

    if (userByEmail || userByPhone) {
      throw new BadRequestException(
        `Пользователь с таким ${userByEmail ? 'email' : ''}${
          userByEmail && userByPhone ? ' и ' : ''
        }${userByPhone ? 'номнером телефона' : ''} уже существует`,
      );
    }

    const hashPassword = await bcrypt.hash(
      dto.password,
      Number(process.env.SALT),
    );

    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    const tokens = await this.jwtAuthService.generateTokens(user);
    await this.jwtAuthService.saveTokenInDB(user.id, tokens.refreshToken);

    let data = { user, token: tokens.accessToken };
    return { data, refreshToken: tokens.refreshToken };
  }
  async logout(userId: number) {
    await this.jwtAuthService.removeTokenFromDB(userId);
  }
  async refresh(refresh: string) {
    const user = await this.jwtAuthService.varifyRefreshToken(refresh);

    if (!user) {
      throw new UnauthorizedException();
    }
    const tokenFromDB = await this.jwtAuthService.findTokenInDB(user.id);

    if (!tokenFromDB) {
      throw new UnauthorizedException();
    }

    const userDto = await this.userService.toUserDto(user);
    const tokens = await this.jwtAuthService.generateTokens(userDto);
    await this.jwtAuthService.saveTokenInDB(user.id, tokens.refreshToken);

    let data = { user: userDto, token: tokens.accessToken };
    return { data, refreshToken: tokens.refreshToken };
  }
}
