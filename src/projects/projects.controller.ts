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
import { ProjectsService } from './projects.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ProjectDto } from './dtos/project.dto';
import { CreateProjectDto } from './dtos/create-project.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Response } from 'express';

@Controller('projects')
@Serialize(ProjectDto)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      name?: string;
      description?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ) {
    return await this.projectsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.projectsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateProjectDto, @GetUser() createdUser: User) {
    return await this.projectsService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: UpdateProjectDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.projectsService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<UpdateProjectDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.projectsService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.projectsService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
