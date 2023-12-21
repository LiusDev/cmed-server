import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  company: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  @IsNotEmpty()
  isPersonal: boolean;
}
