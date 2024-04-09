import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
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
  @IsString()
  @IsNotEmpty()
  featuredImage: string;
  

  @IsString()
  subtitle: string;

  @IsString()
  subtitleEN: string;


  @IsString()
  subtitleJP: string;


  @IsArray()
  images: string[]

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  contentJP: string;


  @IsString()
  contentEN: string;
}
