import { Expose } from 'class-transformer';

export class MetadataDto {
  @Expose()
  companyName: string;

  @Expose()
  companyNameJP: string;

  @Expose()
  companyNameEN: string;

  @Expose()
  companyPhone: string;

  @Expose()
  companyPhoneJP: string;

  @Expose()
  companyPhoneEN: string;

  @Expose()
  companyEmail: string;

  @Expose()
  companyEmailJP: string;

  @Expose()
  companyEmailEN: string;

  @Expose()
  companyAddress: string;

  @Expose()
  companyAddressJP: string;

  @Expose()
  companyAddressEN: string;

  @Expose()
  ceoImage: string;

  @Expose()
  quoteImage: string;
}
