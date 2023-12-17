import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class UpdateUserDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  role: UserRole;
}
