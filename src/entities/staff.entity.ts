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
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  featuredImage: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column()
  position: string;

  @ManyToOne(() => User, (user) => user.createdStaffs)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedStaffs)
  modifiedBy: User;
}
