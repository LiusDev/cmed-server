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
import { BannersService } from './banner.service';
import { CreateBanner } from './dtos/create-banner.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateNewDto } from './dtos/update-banner.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SliderDto } from './dtos/banner';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Banner } from '../../entities/banner.entity';

@Controller('banners')
@Serialize(SliderDto)
export class bannersController {
  constructor(private readonly banner: BannersService) { }

  @Get()
  async getAllSliders(
    @Query()
    query: {
      name?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ): Promise<Banner[]> {
    return await this.banner.findAll(query);
  }

  @Get('count')
  async countAllSliders(
    @Query()
    query: {
      name?: string;
    },
  ): Promise<number> {
    return await this.banner.countAll(query);
  }

  @Get(':id')
  async getOneNews(@Param('id') id: number): Promise<Banner> {
    const result = await this.banner.findOne(id);
    if (!result) {
      throw new NotFoundException('Not found');
    }
    return result;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createNews(
    @Body() body: CreateBanner,
    @GetUser() createdUser: User,
  ): Promise<Banner> {
    return await this.banner.create(body);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateNews(
    @Param('id') id: number,
    @Body() body: UpdateNewDto,
    @GetUser() modifiedUser: User,
  ): Promise<Banner> {
    return await this.banner.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePartialNews(
    @Param('id') id: number,
    @Body() body: Partial<UpdateNewDto>,
    @GetUser() modifiedUser: User,
  ): Promise<Banner> {
    return await this.banner.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNews(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    await this.banner.delete(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
