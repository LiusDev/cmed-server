import { IsString } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  role: UserRole;
}
