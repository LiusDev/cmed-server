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

  @Column("text", { default: "" })
  title: string;

  @Column("text", { default: "" })
  titleJP: string;

  @Column("text", { default: "" })
  titleEN: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })
  descriptionJP: string;

  @Column({ default: "" })
  descriptionEN: string;

  @Column("longtext")
  featuredImage: string;


  @Column("longtext", { default: "" })
  content: string;

  @Column("longtext", { default: "" })
  contentJP: string;

  @Column("longtext", { default: "" })
  contentEN: string;

  @Column({ default: 0 })
  view: number;

  @ManyToOne(() => Category, (category) => category.news)
  category: Category;

  @ManyToOne(() => User, (user) => user.createdNews)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedNews)
  modifiedBy: User;
}
