import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  companyPhone: string;

  @Column()
  companyEmail: string;

  @Column()
  companyAddress: string;
}
