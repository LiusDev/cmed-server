import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class ConstService {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  name: string;

  @Column("longtext")
  description: string;

  @Column({ default: -1 })
  index: number

  @Column()
  title: string

  @Column("longtext")
  content: string
  @Column()
  featuredImage: string;
  @Column()
  featuredImage2: string;
  @Column()
  logo: string

  @ManyToOne(() => Category, (category) => category.homeServices)
  category: Category

  @ManyToOne(() => User, (user) => user.createdServices)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedServices)
  modifiedBy: User;
}
