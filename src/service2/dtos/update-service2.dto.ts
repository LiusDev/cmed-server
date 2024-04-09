import {  IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateService2Dto {
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
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @MaxLength(255)
  descriptionJP: string;


  @IsString()
  @MaxLength(255)
  descriptionEN: string;

  @IsNotEmpty()
  content: {
    title: string
    titleJP: string
    titleEN: string
    content: string
    contentJP: string
    contentEN: string
    featuredImage: string;
    featuredImage2: string;
    index: number
    logo: string
  }[];

  @IsNotEmpty()
  index: number

  @IsNotEmpty()
  categoryId: number
}
