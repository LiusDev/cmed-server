import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpsertMetadataDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  companyPhone: string;

  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @IsString()
  @IsNotEmpty()
  companyAddress: string;
}
