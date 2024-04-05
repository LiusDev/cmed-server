import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

@Entity()
export class Service2 {
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

  @Column({ default: false })
  showInHome: boolean

  @Column("json")
  content: {
    title: string
    content: string
    featuredImage: string;
    featuredImage2: string;
    logo: string
  }[];

  @ManyToOne(() => Category, (category) => category.homeServices)
  category: Category

  @ManyToOne(() => User, (user) => user.createdServices)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedServices)
  modifiedBy: User;
}
