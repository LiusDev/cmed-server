import { IsNumber, IsString, IsUrl, MaxLength } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsUrl()
  documentUrl: string;

  @IsNumber()
  categoryId: number;
}