import { Expose } from 'class-transformer';

export class Service2Dto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  name: string;

  @Expose()
  nameJP: string;

  @Expose()
  nameEN: string

  @Expose()
  description: string;

  @Expose()
  descriptionJP: string;

  @Expose()
  descriptionEN: string;

  @Expose()
  content: object;

  @Expose()
  index: number

  @Expose()
  categoryId: number
}
