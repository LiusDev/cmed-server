import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateService2Dto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  nameJP: string;

  @IsString()
  @MaxLength(255)
  nameEN: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  descriptionJP: string;

  @IsString()
  descriptionEN: string;

  @IsNotEmpty()
  index: number

  @IsNotEmpty()
  categoryId: number

  @IsNotEmpty()
  content: {
    title: string
    titleJP: string
    titleEN: string
    content: string
    contentJP: string
    contentEN: string
    logo: string
    index: number
    featuredImage: string
    featuredImage2: string
  }[];
}
