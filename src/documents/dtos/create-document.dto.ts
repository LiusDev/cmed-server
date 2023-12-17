import { IsNumber, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateDocumentDto {
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
