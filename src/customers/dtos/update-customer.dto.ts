import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;
}
