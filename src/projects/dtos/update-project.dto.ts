import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsArray()
  images: string[]

  @IsString()
  @IsNotEmpty()
  content: string;
}
