import { IsNumber, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  nameJP: string;

  @IsString()
  @MaxLength(255)
  nameEN: string;

  @IsString()
  @IsNotEmpty()
  featuredImage: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  descriptionJP: string;

  @IsString()
  descriptionEN: string;

  @IsNotEmpty()
  view:number

  @IsNotEmpty()
  download:number

  @IsNotEmpty()
  categoryId: number;
}
