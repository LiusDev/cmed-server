import { IsNumber, IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  categoryId: number;
}
