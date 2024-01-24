import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateRecruitmentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
