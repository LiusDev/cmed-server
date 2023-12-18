import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsBase64()
  @IsNotEmpty()
  image: string;
}
