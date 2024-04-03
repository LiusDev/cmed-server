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
import { ProjectImage } from './project_image.entity';

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
  subtitle: string;

  @Column()
  description: string;

  @Column("longtext")
  featuredImage: string;

  @Column("longtext")
  content: string;

  @OneToMany(() => ProjectImage, (pi) => pi.project, { cascade: ["insert", "update", "remove"] })
  images: ProjectImage[]

  @ManyToOne(() => User, (user) => user.createdProjects)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedProjects)
  modifiedBy: User;
}
