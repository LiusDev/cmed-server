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
import { ServicesService } from './services.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ServiceDto } from './dtos/service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateServiceDto } from './dtos/create-service.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';

@Controller('services')
@Serialize(ServiceDto)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

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
    return await this.servicesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.servicesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateServiceDto, @GetUser() createdUser: User) {
    return await this.servicesService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: CreateServiceDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.servicesService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<CreateServiceDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.servicesService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.servicesService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
