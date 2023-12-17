import {
  IsBase64,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateNewDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsBase64()
  featuredImage: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  categoryId: number;
}
