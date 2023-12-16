import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Column()
  token: string;

  @Column()
  expires: Date;

  @Column()
  created: Date;

  @Column()
  createdByIp: string;

  @Column({ nullable: true })
  revoked: Date;

  @Column({ nullable: true })
  revokedByIp: string;

  @Column({ nullable: true })
  replacedByToken: string;
}
