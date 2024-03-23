import { Expose } from 'class-transformer';

export class ContactDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  company: string;

  @Expose()
  customerType: string;

  @Expose()
  content: string;
}
