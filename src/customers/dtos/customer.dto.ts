import { Expose } from 'class-transformer';
import { User } from 'src/entities/user.entity';

export class CustomerDto {
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
  image: string;

  @Expose()
  logo: string;

  @Expose()
  icon: string;
}
