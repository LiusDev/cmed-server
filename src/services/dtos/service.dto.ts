import { Expose } from 'class-transformer';

export class ServiceDto {
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
  featuredImage: string;
  @Expose()
  featuredImage2: string;

  @Expose()
  content: string;
}
