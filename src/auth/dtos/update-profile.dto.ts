import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class updateProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
