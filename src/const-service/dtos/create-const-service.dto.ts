import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateConstServiceDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  index: number

  @IsNotEmpty()
  categoryId: number

  @IsString()
  title: string
  @IsString()
  content: string
  @IsString()
  logo: string
  @IsString()
  featuredImage: string
  @IsString()
  featuredImage2: string
}
