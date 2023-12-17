import { Expose } from 'class-transformer';

export class NewDto {
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
  featuredImage: string;

  @Expose()
  content: string;

  @Expose()
  view: number;
}
