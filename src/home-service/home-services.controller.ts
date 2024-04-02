import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Res,
  UseGuards,
  Param,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { HomeServicesService } from './home-services.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { HomeServiceDto } from './dtos/home-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateHomeServiceDto } from './dtos/create-home-service.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';

@Controller('homeservices')
export class HomeServicesController {
  constructor(private readonly homeServicesService: HomeServicesService) { }

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
    const data = await this.homeServicesService.findAll(query)
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.homeServicesService.findOne(id);
  }

  @Get("top4")
  async top4() {
    return await this.homeServicesService.getTop4()
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateHomeServiceDto, @GetUser() createdUser: User) {
    return await this.homeServicesService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: CreateHomeServiceDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.homeServicesService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<CreateHomeServiceDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.homeServicesService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.homeServicesService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
