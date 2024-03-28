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
export class Recruitment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  title: string;

  @Column()
  deadline: Date;

  @Column("longtext")
  content: string;

  @ManyToOne(() => User, (user) => user.createdRecruitments)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedRecruitments)
  modifiedBy: User;
}
