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
  nameJP: string

  @Expose()
  nameEN: string

  @Expose()
  description: string;

  @Expose()
  descriptionJP: string; 

  @Expose()
  descriptionEN: string;

  @Expose()
  subtitle: string;

  @Expose()
  subtitleJP: string;

  @Expose()
  subtitleEN: string;

  @Expose()
  featuredImage: string;

  @Expose()
  images: string[]

  @Expose()
  content: string;

  @Expose()
  contentJP: string;

  @Expose()
  contentEN: string;
}
