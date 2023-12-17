import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}
