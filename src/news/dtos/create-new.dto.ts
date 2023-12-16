import { IsString } from 'class-validator';

export class CreateNewDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
