import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { New } from '../entities/new.entity';
import { CreateNewDto } from './dtos/create-new.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateNewDto } from './dtos/update-new.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { NewDto } from './dtos/new.dto';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('news')
@Serialize(NewDto)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAllNews(
    @Query()
    query: {
      title?: string;
      description?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ): Promise<New[]> {
    return await this.newsService.findAll(query);
  }

  @Get(':id')
  async getOneNews(@Param('id') id: number): Promise<New> {
    const result = await this.newsService.findOne(id);
    if (!result) {
      throw new NotFoundException('Not found');
    }
    return result;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNews(
    @Body() body: CreateNewDto,
    @GetUser() createdUser: User,
  ): Promise<New> {
    return await this.newsService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateNews(
    @Param('id') id: number,
    @Body() body: UpdateNewDto,
    @GetUser() modifiedUser: User,
  ): Promise<New> {
    return await this.newsService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePartialNews(
    @Param('id') id: number,
    @Body() body: Partial<UpdateNewDto>,
    @GetUser() modifiedUser: User,
  ): Promise<New> {
    return await this.newsService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNews(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    await this.newsService.delete(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
