import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ConstHomeServiceDto {
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
  title: string
  @IsString()
  content: string
  @IsString()
  featuredImage: string;
  @IsString()
  featuredImage2: string;
  @IsString()
  logo: string

  @IsNotEmpty()
  index: number

  @IsNotEmpty()
  categoryId: number
}
