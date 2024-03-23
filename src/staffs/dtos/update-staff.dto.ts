import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateStaffDto {
  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  position: string;
}
