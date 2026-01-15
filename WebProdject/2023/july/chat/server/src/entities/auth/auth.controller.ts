import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { IAuthController } from './interface/authController';
import { AuthRegistrationDto } from './dto/auth-registration.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResType } from './types/authType';
import { Response, Request } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { ATokenAuthGuard } from 'src/guards/auth/at-auth.guard';
import { IJwtUserRequest } from './types/jwtUserRequest';

@ApiTags('auth')
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Войти' })
  @ApiResponse({ status: 200, type: AuthResType })
  @Post('login')
  async login(
    @Body() dto: AuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { data, refreshToken } = await this.authService.login(dto);
    res.cookie('refresh', refreshToken, { httpOnly: true });

    return data;
  }

  @ApiOperation({ summary: 'Зарегестрироваться' })
  @ApiResponse({ status: 200, type: AuthResType })
  @Post('registration')
  async registration(
    @Body() dto: AuthRegistrationDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { data, refreshToken } = await this.authService.registration(dto);

    res.cookie('refresh', refreshToken, { httpOnly: true });

    return data;
  }

  @ApiOperation({ summary: 'Выйти' })
  @ApiResponse({ status: 200 })
  @UseGuards(ATokenAuthGuard)
  @Post('logout')
  async logout(
    @Req() req: IJwtUserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.user);
    await this.authService.logout(req.user.id);
    res.cookie('refresh', '', { httpOnly: true });
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiResponse({ status: 200 })
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (req.cookies.refresh) {
      const { data, refreshToken } = await this.authService.refresh(
        req.cookies.refresh,
      );

      res.cookie('refresh', refreshToken, { httpOnly: true });
      return data;
    } else {
      throw new UnauthorizedException();
    }
  }
}
