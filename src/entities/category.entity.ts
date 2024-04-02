import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { New } from './new.entity';
import { Document } from './document.entity';
import { HomeService } from './home-service.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column()
  name: string;

  @OneToMany(() => New, (news) => news.category)
  news: New[];

  @OneToMany(() => Document, (documents) => documents.category)
  documents: Document[];

  @ManyToOne(() => User, (user) => user.createdCategories)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedCategories)
  modifiedBy: User;

  @OneToMany(() => HomeService, (homeServices) => homeServices.category)
  homeServices : HomeService[]
}
