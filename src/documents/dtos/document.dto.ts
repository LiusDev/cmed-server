import { Expose } from 'class-transformer';
import { ChildCategoryDto } from 'src/categories/dtos/child-category.dto';

export class DocumentDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  featuredImage: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  document: string;

  @Expose()
  view: number;

  @Expose()
  download: number;

  @Expose()
  pages: number;

  @Expose()
  category: ChildCategoryDto;
}
