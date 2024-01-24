import { Expose } from 'class-transformer';

export class RecruitmentDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  title: string;

  @Expose()
  deadline: Date;

  @Expose()
  content: string;
}
