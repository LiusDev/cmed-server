import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  nameJP: string;

  @IsString()
  nameEN: string;

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  descriptionJP: string;

  @IsString()
  descriptionEN: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  position: string;

  @IsString()
  @MaxLength(255)
  positionJP: string;

  @IsString()
  @MaxLength(255)
  positionEN: string;
}
