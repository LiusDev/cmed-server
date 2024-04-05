import { Expose } from 'class-transformer';

export class ConstServiceDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  content: object;

  @Expose()
  index: number

  @Expose()
  categoryId: number
}
