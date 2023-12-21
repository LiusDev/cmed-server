import { Expose } from 'class-transformer';

export class MetadataDto {
  @Expose()
  companyName: string;

  @Expose()
  companyPhone: string;

  @Expose()
  companyEmail: string;

  @Expose()
  companyAddress: string;
}
