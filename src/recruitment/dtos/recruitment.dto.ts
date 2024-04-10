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
  titleJP: string;

  @Expose()
  titleEN: string;

  @Expose()
  deadline: Date;

  @Expose()
  content: string;

  @Expose()
  contentJP: string;

  @Expose()
  contentEN: string;

}
