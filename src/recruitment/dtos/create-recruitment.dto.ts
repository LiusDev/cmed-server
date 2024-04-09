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

  @IsString()
  @MaxLength(255)
  titleJP: string;


  @IsString()
  @MaxLength(255)
  titleEN: string;

  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  contentJP: string;

  @IsString()
  contentEN: string;
  
}
