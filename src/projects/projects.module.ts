import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { ImagesModule } from 'src/images/images.module';
import { ProjectImage } from '../entities/project_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectImage]), ImagesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule { }
