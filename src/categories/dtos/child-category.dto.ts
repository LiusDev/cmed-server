import { Expose } from 'class-transformer';

export class ChildCategoryDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  name: string;
}
