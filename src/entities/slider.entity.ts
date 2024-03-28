import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Slider {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	modifiedAt: Date;

	@Column()
	title: string;

	@Column()
	index: number

	@Column()
	description: string;

	@Column("longtext")
	image: string;

	@Column()
	content: string;
}
