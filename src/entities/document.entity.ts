import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column("longtext")
  featuredImage: string;

  logo: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  document: string;

  @Column({ default: 0 })
  view: number;

  @Column({ default: 0 })
  download: number;

  @Column({ default: 0 })
  pages: number

  @ManyToOne(() => Category, (category) => category.documents)
  category: Category;

  @ManyToOne(() => User, (user) => user.createdDocuments)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedDocuments)
  modifiedBy: User;
}
