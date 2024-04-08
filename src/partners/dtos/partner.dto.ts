import { Expose } from 'class-transformer';
import { User } from 'src/entities/user.entity';

export class PartnerDto {
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
  nameEN: string;

  @Expose()
  image: string;
}
