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

  @IsString()
  @IsNotEmpty()
  documentUrl: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
