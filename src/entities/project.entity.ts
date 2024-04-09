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

  @Column({ default: "" })
  nameJP: string;

  @Column({ default: "" })
  nameEN: string;

  @Column({ default: "" })
  subtitle: string;

  @Column({ default: "" })
  subtitleJP: string;


  @Column({ default: "" })
  subtitleEN: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })

  descriptionJP: string;

  @Column({ default: "" })

  descriptionEN: string;


  @Column("longtext",{ default: "" })
  featuredImage: string;

  @Column("longtext",{ default: "" })
  content: string;

  @Column("longtext",{ default: "" })
  contentJP: string;

  @Column("longtext", { default: "" })
  contentEN: string;

  @OneToMany(() => ProjectImage, (pi) => pi.project, { cascade: ["insert", "update", "remove"] })
  images: ProjectImage[]

  @ManyToOne(() => User, (user) => user.createdProjects)
  createdBy: User;

  @ManyToOne(() => User, (user) => user.modifiedProjects)
  modifiedBy: User;
}
