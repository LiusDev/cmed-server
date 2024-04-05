import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  featuredImage: string;

  @IsNotEmpty()
  view:number

  @IsNotEmpty()
  download:number
}
