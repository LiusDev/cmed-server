import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  nameEN: string;

  @IsString()
  @MaxLength(255)
  nameJP: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  
  @IsString()
  @MaxLength(255)
  descriptionEN: string;

  
  @IsString()
  @MaxLength(255)
  descriptionJP: string;

  @IsString()
  @MaxLength(255)
  subtitle: string;

  @IsString()
  @MaxLength(255)
  subtitleEN: string;

  @IsString()
  @MaxLength(255)
  subtitleJP: string;

  @IsString()
  @IsNotEmpty()
  featuredImage: string;

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
