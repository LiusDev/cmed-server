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
  nameJP: string;

  @Expose()
  nameEN: string;

  @Expose()
  description: string;

  @Expose()
  descriptionJP: string;

  @Expose()
  descriptionEN: string;

  @Expose()
  position: string;

  @Expose()
  positionJP: string;

  @Expose()
  positionEN: string;
}
