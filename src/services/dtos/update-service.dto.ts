import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @IsNotEmpty()
  featuredImage2: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
