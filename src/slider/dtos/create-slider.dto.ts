import {
  IsNotEmpty,
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
  image: string;
}
