import { Expose } from 'class-transformer';

export class ProjectDto {
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
  subtitle: string;

  @Expose()
  featuredImage: string;

  @Expose()
  images: string[]

  @Expose()
  content: string;
}
