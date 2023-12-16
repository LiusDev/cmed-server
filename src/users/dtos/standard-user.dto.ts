import { Expose } from 'class-transformer';

export class StandardUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  role: string;
}
