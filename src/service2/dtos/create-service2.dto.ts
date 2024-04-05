import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateService2Dto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
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
    index: number
    featuredImage: string
    featuredImage2: string
  }[];
}
