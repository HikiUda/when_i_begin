import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/entities/user/dto/user.dto';

@Injectable()
export class AT_Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: UserDto) {
    return payload;
  }
}
