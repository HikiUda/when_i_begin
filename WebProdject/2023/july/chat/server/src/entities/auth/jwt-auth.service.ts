import { Injectable } from '@nestjs/common';
import { IJwtAuthService } from './interface/jwtAuthService';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from 'src/models/tokens.model';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class JwtAuthService implements IJwtAuthService {
  constructor(
    @InjectModel(Token) private tokenModel: typeof Token,
    private jwtService: JwtService,
  ) {}
  async generateTokens(payload: UserDto) {
    const accessToken = await this.jwtService.signAsync(
      { ...payload },
      {
        secret: process.env.ACCESS_KEY,
        expiresIn: '15m',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { ...payload },
      {
        secret: process.env.REFRESH_KEY,
        expiresIn: '15d',
      },
    );
    return { accessToken, refreshToken };
  }

  async saveTokenInDB(userId: number, token: string) {
    const [data, created] = await this.tokenModel.findOrCreate({
      where: { userId },
      defaults: { userId, token },
    });
    if (!created) {
      await this.tokenModel.update({ token }, { where: { userId } });
    }

    return created;
  }

  async removeTokenFromDB(userId: number) {
    await this.tokenModel.destroy({ where: { userId } });
  }

  async varifyRefreshToken(refresh: string) {
    const data = await this.jwtService.verify(refresh, {
      secret: process.env.REFRESH_KEY,
    });
    return data;
  }

  async findTokenInDB(userId: number) {
    const data = await this.tokenModel.findOne({ where: { userId } });
    return data;
  }
}
