import { Expose } from 'class-transformer';
import { UserRole } from 'src/entities/user.entity';

export class StandardUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  role: UserRole;
}
