import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'src/models/tokens.model';
import { PassportModule } from '@nestjs/passport';
import { AT_Strategy } from 'src/passport/auth/at-jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, AT_Strategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    SequelizeModule.forFeature([Token]),
  ],
})
export class AuthModule {}
