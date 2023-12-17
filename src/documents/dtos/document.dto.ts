import { Expose } from 'class-transformer';
import { CategoryDto } from 'src/categories/dtos/category.dto';

export class DocumentDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  documentUrl: string;

  @Expose()
  view: number;

  @Expose()
  category: CategoryDto;
}
