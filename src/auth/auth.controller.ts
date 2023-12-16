import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StandardUserDto } from 'src/users/dtos/standard-user.dto';
import { User } from 'src/users/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() authCredentials: AuthCredentialsDto) {
    return await this.authService.signUp(authCredentials);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@GetUser() user: User) {
    return await this.authService.getToken(user);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@GetUser() user: User) {
    return this.authService.getAccessToken(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @Serialize(StandardUserDto)
  async getProfile(@GetUser() user: User) {
    return user;
  }
}
