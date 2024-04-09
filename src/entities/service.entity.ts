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

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  nameJP: string;

  @Column({ default: "" })
  nameEN: string;

  @Column()
  description: string;

  @Column({ default: "" })
  descriptionJP: string;

  @Column({default: ""})
  descriptionEN: string;

  @Column("longtext")
  featuredImage: string;

  @Column("longtext")
  featuredImage2: string;

  @Column("longtext")
  logo: string;

  @Column({ default: false })
  showInHome: boolean

  @Column()
  content: string;

  @Column()
  contentJP: string;

  @Column()
  contentEN: string;

  @ManyToOne(() => User, (user) => user.createdServices)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedServices)
  modifiedBy: User;
}
