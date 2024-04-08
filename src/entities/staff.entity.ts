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

  @Column("longtext")
  featuredImage: string;

  @Column()
  name: string;

  @Column()
  nameJP: string;

  @Column()
  nameEN: string;

  @Column("longtext")
  description: string;

  @Column("longtext")
  descriptionJP: string;

  @Column("longtext")
  descriptionEN: string;

  @Column()
  position: string;

  @Column()
  positionJP: string;

  @Column()
  positionEN: string;


  @ManyToOne(() => User, (user) => user.createdStaffs)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedStaffs)
  modifiedBy: User;
}
