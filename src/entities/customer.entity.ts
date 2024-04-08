import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  name: string;

  @Column()
  nameJP: string;

  @Column()
  nameEN: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  descriptionJP: string;

  @Column({ nullable: true })
  descriptionEN: string;

  @Column("longtext")
  image: string;

  @Column("longtext")
  logo: string;

  @Column("longtext")
  icon: string

  @ManyToOne(() => User, (user) => user.createdCustomers)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedCustomers)
  modifiedBy: User;
}
