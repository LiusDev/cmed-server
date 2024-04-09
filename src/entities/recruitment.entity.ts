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

  @Column({ default: "" })
  title: string;

  @Column({ default: "" })
  titleJP: string;

  @Column({ default: "" })

  titleEN: string;

  @Column()
  deadline: Date;

  @Column("longtext", { default: "" })
  content: string;

  @Column("longtext", { default: "" })
  contentJP: string;

  @Column("longtext", { default: "" })
  contentEN: string;


  @ManyToOne(() => User, (user) => user.createdRecruitments)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedRecruitments)
  modifiedBy: User;
}
