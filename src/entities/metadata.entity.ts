import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  companyName: string;

  @Column({ default: '' })
  companyPhone: string;

  @Column({ default: '' })
  companyEmail: string;

  @Column({ default: '' })
  companyAddress: string;
}
