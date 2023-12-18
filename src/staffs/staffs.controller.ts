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
} from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Get()
  async findAll() {
    return await this.staffsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.staffsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateStaffDto, @GetUser() createdUser: User) {
    return await this.staffsService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: CreateStaffDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.staffsService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<CreateStaffDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.staffsService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.staffsService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
