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
import { ConstServicesService } from './const-services.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ConstServiceDto } from './dtos/const-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateConstServiceDto } from './dtos/create-const-service.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';

@Controller('constservices')
export class ConstServicesController {
  constructor(private readonly homeServicesService: ConstServicesService) { }

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
    return await this.homeServicesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.homeServicesService.findOne(id);
    return data;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateConstServiceDto, @GetUser() createdUser: User) {
    return await this.homeServicesService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: CreateConstServiceDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.homeServicesService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<CreateConstServiceDto>,
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
