import { Expose } from 'class-transformer';
import { ChildCategoryDto } from 'src/categories/dtos/child-category.dto';

export class NewDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  modifiedAt: Date;

  @Expose()
  title: string;

  @Expose()
  titleJP: string

  @Expose()
  titleEN: string

  @Expose()
  description: string;

  @Expose()
  descriptionJP: string;

  @Expose()
  descriptionEN: string;

  @Expose()
  featuredImage: string;

  @Expose()
  content: string;

  @Expose()
  contentJP: string;

  @Expose()
  contentEN: string;

  @Expose()
  view: number;

  @Expose()
  category: ChildCategoryDto;
}
