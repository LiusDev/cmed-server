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
  name: string;

  @Expose()
  image: string;
}
