import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from '../entities/new.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([New]),
    AuthModule,
    ImagesModule,
    CategoriesModule,
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
