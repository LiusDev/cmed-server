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
import { Service2Service } from './service2.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateService2Dto } from './dtos/create-service2.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';

@Controller('service2')
export class Service2Controller {
  constructor(private readonly service2Service: Service2Service) { }

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
    const data = await this.service2Service.findAll(query)
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.service2Service.findOne(id);
  }

  @Get("top4")
  async top4() {
    return await this.service2Service.getTop4()
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateService2Dto, @GetUser() createdUser: User) {
    return await this.service2Service.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: CreateService2Dto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.service2Service.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<CreateService2Dto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.service2Service.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.service2Service.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
