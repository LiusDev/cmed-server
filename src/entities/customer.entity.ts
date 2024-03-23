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

  @Column({ nullable: true })
  description: string;

  @Column("text")
  image: string;

  @Column("text")
  logo: string;

  @Column("text")
  icon: string

  @ManyToOne(() => User, (user) => user.createdCustomers)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedCustomers)
  modifiedBy: User;
}
