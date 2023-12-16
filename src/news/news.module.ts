import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from './new.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([New]), AuthModule, ImagesModule],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
