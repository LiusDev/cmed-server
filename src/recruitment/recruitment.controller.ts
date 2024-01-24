import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { RecruitmentDto } from './dtos/recruitment.dto';
import { RecruitmentService } from './recruitment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateRecruitmentDto } from './dtos/create-recruitment.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { UpdateRecruitmentDto } from './dtos/update-recruitment.dto';
import { Response } from 'express';

@Controller('recruitment')
@Serialize(RecruitmentDto)
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      title?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ) {
    return await this.recruitmentService.findAll(query);
  }

  @Get('count')
  async count(
    @Query()
    query: {
      title?: string;
    },
  ) {
    return await this.recruitmentService.count(query);
  }

  @Get(':id')
  async findOne(id: number) {
    return await this.recruitmentService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateRecruitmentDto,
    @GetUser() createdUser: User,
  ) {
    return await this.recruitmentService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: UpdateRecruitmentDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.recruitmentService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Param('id') id: number,
    @Body() body: Partial<UpdateRecruitmentDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.recruitmentService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.recruitmentService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
