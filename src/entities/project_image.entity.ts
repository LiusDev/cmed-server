import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectImage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("longblob")
	image: string;

	@ManyToOne(() => Project, (project) => project.images)
	project: Project
}
