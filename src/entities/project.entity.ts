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
export class Project {
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

  @Column()
  featuredImage: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.createdProjects)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedProjects)
  modifiedBy: User;
}
