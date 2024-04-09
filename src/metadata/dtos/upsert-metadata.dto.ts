import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpsertMetadataDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  companyNameJP: string;

  @IsString()
  companyNameEN: string;

  @IsString()
  @IsNotEmpty()
  companyPhone: string;

  @IsString()
  companyPhoneJP: string;

  @IsString()
  companyPhoneEN: string;

  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;

  @IsEmail()
  companyEmailJP: string;

  @IsEmail()
  companyEmailEN: string;

  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  @IsString()
  companyAddressJP: string;

  @IsString()
  companyAddressEN: string;

  @IsString()
  ceoImage: string;

  @IsString()
  quoteImage: string;
}
