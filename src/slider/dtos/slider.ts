import { Expose } from 'class-transformer';

export class SliderDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  image: string;

  @Expose()
  content: string;
}
