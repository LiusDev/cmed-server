import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateHomeServiceDto {
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

  @IsNotEmpty()
  content: {
    title: string
    content: string
    logo: string
    featuredImage: string
    featuredImage2: string
  }[];
}
