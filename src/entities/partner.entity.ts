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
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  name: string;

  @Column("longtext")
  image: string;

  @ManyToOne(() => User, (user) => user.createdPartners)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedPartners)
  modifiedBy: User;
}
