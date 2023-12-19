import {
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateNewDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  categoryId: number;
}
