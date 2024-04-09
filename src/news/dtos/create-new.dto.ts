import {
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  maxLength,
} from 'class-validator';

export class CreateNewDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(255)
  titleJP: string;

  @IsString()
  @MaxLength(255)
  titleEN: string;

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
  @IsNotEmpty()
  content: string;

  @IsString()
  contentJP: string;

  @IsString()
  contentEN: string;

  @IsNumber()
  categoryId: number;
}
