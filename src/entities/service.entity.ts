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
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("longblob")
  featuredImage: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.createdServices)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedServices)
  modifiedBy: User;
}
