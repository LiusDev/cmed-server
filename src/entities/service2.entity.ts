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

  @Column()
  nameEN: string

  @Column()
  nameJP: string

  @Column("longtext")
  description: string;

  @Column("longtext")
  descriptionEN: string;

  @Column("longtext")
  descriptionJP: string;


  @Column({ default: -1 })
  index: number

  @Column({ default: false })
  showInHome: boolean

  @Column("json")
  content: {
    title: string
    titleJP: string
    titleEN: string
    content: string
    contentJP: string
    contentEN: string
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
