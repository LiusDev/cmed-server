import {
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBanner {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;


  @IsString()
  @IsNotEmpty()
  image: string;
}
