import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
