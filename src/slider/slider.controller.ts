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
import { SlidersService } from './slider.service';
import { CreateNewDto } from './dtos/create-slider.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateNewDto } from './dtos/update-slider.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SliderDto } from './dtos/slider';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Slider } from '../entities/slider.entity';

@Controller('sliders')
@Serialize(SliderDto)
export class slidersController {
  constructor(private readonly slidersService: SlidersService) { }

  @Get()
  async getAllSliders(
    @Query()
    query: {
      title?: string;
      index?: number;
      description?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ): Promise<Slider[]> {
    return await this.slidersService.findAll(query);
  }

  @Get('count')
  async countAllSliders(
    @Query()
    query: {
      title?: string;
      description?: string;
    },
  ): Promise<number> {
    return await this.slidersService.countAll(query);
  }

  @Get(':id')
  async getOneNews(@Param('id') id: number): Promise<Slider> {
    const result = await this.slidersService.findOne(id);
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
  ): Promise<Slider> {
    return await this.slidersService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateNews(
    @Param('id') id: number,
    @Body() body: UpdateNewDto,
    @GetUser() modifiedUser: User,
  ): Promise<Slider> {
    return await this.slidersService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePartialNews(
    @Param('id') id: number,
    @Body() body: Partial<UpdateNewDto>,
    @GetUser() modifiedUser: User,
  ): Promise<Slider> {
    return await this.slidersService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteNews(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void> {
    await this.slidersService.delete(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
