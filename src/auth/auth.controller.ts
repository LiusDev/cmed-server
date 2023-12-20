import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StandardUserDto } from 'src/users/dtos/standard-user.dto';
import { User } from 'src/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { updateProfileDto } from './dtos/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  // @Post('profile')
  // @UseGuards(JwtAuthGuard)
  // @Serialize(StandardUserDto)
  // async updateProfile(@Body() body: updateProfileDto, @GetUser() user: User) {
  //   return await this.authService.updateProfile(user, body);
  // }
}
