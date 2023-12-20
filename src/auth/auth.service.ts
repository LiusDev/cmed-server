import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { updateProfileDto } from './dtos/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

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

  // async signUp(authCredentials: AuthCredentialsDto) {
  //   const { username, password, name, role } = authCredentials;

  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);

  //   const user = await this.usersService.create({
  //     username,
  //     password: hashedPassword,
  //     name,
  //     role,
  //   });

  //   return this.getToken(user);
  // }

  async validateUser(username: string, password: string) {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
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
