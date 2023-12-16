import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../user.entity';

export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
