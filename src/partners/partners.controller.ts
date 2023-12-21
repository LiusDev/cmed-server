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
import { PartnersService } from './partners.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { UpdatePartnerDto } from './dtos/update-partner.dto';
import { Response } from 'express';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { PartnerDto } from './dtos/partner.dto';

@Controller('partners')
@Serialize(PartnerDto)
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      name?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ) {
    return await this.partnersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.partnersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreatePartnerDto, @GetUser() createdUser: User) {
    return await this.partnersService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: UpdatePartnerDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.partnersService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<UpdatePartnerDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.partnersService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.partnersService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
