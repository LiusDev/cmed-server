import { IsNotEmpty, IsUrl } from 'class-validator';

export class DeleteImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
}
