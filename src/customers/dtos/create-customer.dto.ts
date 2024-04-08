import { IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class CreateCustomerDto {
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

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
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
