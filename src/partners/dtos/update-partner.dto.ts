import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePartnerDto {
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
  image: string;
}
