import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  companyName: string;

  @Column({ default: '' })
  companyNameJP: string;

  @Column({ default: '' })
  companyNameEN: string

  @Column({ default: '' })
  companyPhone: string;

  @Column({ default: '' })
  companyPhoneJP: string;

  @Column({ default: '' })
  companyPhoneEN: string;

  @Column({ default: '' })

  @Column({ default: '' })
  companyEmail: string;

  @Column({ default: '' })
  companyEmailJP: string;

  @Column({ default: '' })
  companyEmailEN: string;

  @Column({ default: '' })
  companyAddress: string;

  @Column({ default: '' })
  companyAddressJP: string;

  @Column({ default: '' })
  companyAddressEN: string;

  @Column("longtext")
  ceoImage: string;

  @Column("longtext")
  quoteImage: string;

}
