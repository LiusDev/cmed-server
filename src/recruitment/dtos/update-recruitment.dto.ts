import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateRecruitmentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  deadline: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
