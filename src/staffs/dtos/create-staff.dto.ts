import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStaffDto {
  @IsBase64()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  position: string;
}
