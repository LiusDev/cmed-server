import { Module } from '@nestjs/common';
import { RecruitmentController } from './recruitment.controller';
import { RecruitmentService } from './recruitment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruitment } from 'src/entities/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment])],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
})
export class RecruitmentModule {}
