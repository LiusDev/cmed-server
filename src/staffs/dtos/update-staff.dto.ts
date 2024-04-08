import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateStaffDto {
  @IsString()
  @IsNotEmpty()
  featuredImage: string;

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
  description: string;

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
