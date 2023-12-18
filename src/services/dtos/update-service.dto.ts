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

  @IsBase64()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
