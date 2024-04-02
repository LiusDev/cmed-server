import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) { }

  private generatePayload(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };
    return payload;
  }

  async getToken(user: User) {
    const payload = this.generatePayload(user);
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async getAccessToken(user: User) {
    const payload = this.generatePayload(user);
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async signUp(authCredentials: AuthCredentialsDto) {
    const { username, password, name, role } = authCredentials;
    const user = await this.userService.create({
      username,
      password: password,
      name,
      role,
    });
    return this.getToken(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // async updateProfile(user: User, attrs: Partial<updateProfileDto>) {
  //   const updatedUser: User = await this.usersRepository.update(user.id, attrs);
  //   return this.getToken(updatedUser);
  // }
}
