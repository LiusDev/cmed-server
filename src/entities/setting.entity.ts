import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

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
	content: object;
	@CreateDateColumn()
	createDate: Date;
	@UpdateDateColumn()
	modifiedDate: Date;
	@ManyToOne(() => User, (user) => user.createdSettings)
	createdBy: User
	@ManyToOne(() => User, (user) => user.modifiedSettings)
	modifiedBy: User
}
