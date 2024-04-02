import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateHomeServiceDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  content: {
    title: string
    content: string
    featuredImage: string;
    featuredImage2: string;
    logo: string
  }[];

  @IsNotEmpty()
  index: number

  @IsNotEmpty()
  categoryId: number
}
