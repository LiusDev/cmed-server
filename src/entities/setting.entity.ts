import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['itemId', 'language'])
export class Setting {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	itemId: string;

	@Column()
	language: string;

	@Column({ type: 'json' })
	content: string;
}
