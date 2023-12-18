import { Expose } from 'class-transformer';

export class StaffDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  featuredImage: string;

  @Expose()
  name: string;

  @Expose()
  position: string;
}
