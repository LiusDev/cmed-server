import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { New } from './new.entity';
import { CreateNewDto } from './dtos/create-new.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllNews(
    @Query()
    query: {
      title?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ): Promise<New[]> {
    const { title, page, perPage, sortBy, order } = query;
    return await this.newsService.findAll({
      title,
      page,
      perPage,
      sortBy,
      order,
    });
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
  async createNews(@Body() body: CreateNewDto): Promise<New> {
    return await this.newsService.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateNews(
    @Param('id') id: number,
    @Body() body: CreateNewDto,
  ): Promise<New> {
    return await this.newsService.update(id, body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePartialNews(
    @Param('id') id: number,
    @Body() body: Partial<CreateNewDto>,
  ): Promise<New> {
    return await this.newsService.updatePartial(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNews(@Param('id') id: number): Promise<void> {
    await this.newsService.delete(id);
  }
}
