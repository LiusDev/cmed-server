import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinDate,
} from 'class-validator';

export class CreateRecruitmentDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  content: string;
}
