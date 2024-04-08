import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
  @IsString()
  nameJP: string;

  @IsString()
  nameEN: string;

  @IsString()
  image: string;

  @IsString()
  logo: string;

  @IsString()
  icon: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @MaxLength(255)
  descriptionJP: string;


  @IsString()
  @MaxLength(255)
  descriptionEN: string;
}
