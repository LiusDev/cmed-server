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
  featuredImage: string;
  @Expose()
  featuredImage2: string;

  @Expose()
  logo: string;

  @Expose()
  content: string;

  @Expose()
  contentJP: string;

  @Expose()
  contentEN: string;
}
