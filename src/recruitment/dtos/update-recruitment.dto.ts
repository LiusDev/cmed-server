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

  @IsString()
  @MaxLength(255)
  titleEN: string;

  @IsString()
  @MaxLength(255)
  titleJP: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  contentJP: string;

  @IsString()
  contentEN: string;
}
