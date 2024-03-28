import { User } from 'src/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class New {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column("text")
  title: string;

  @Column()
  description: string;

  @Column("longtext")
  featuredImage: string;

  @Column("longtext")
  content: string;

  @Column({ default: 0 })
  view: number;

  @ManyToOne(() => Category, (category) => category.news)
  category: Category;

  @ManyToOne(() => User, (user) => user.createdNews)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedNews)
  modifiedBy: User;
}
