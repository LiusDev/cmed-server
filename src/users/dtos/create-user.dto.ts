import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(32)
  @IsNotEmpty()
  role: UserRole;
}
