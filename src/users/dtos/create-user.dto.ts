import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
}
