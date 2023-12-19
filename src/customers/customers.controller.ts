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
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CustomerDto } from './dtos/customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Response } from 'express';

@Controller('customers')
@Serialize(CustomerDto)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll() {
    return await this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.customersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateCustomerDto, @GetUser() createdUser: User) {
    return await this.customersService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: UpdateCustomerDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.customersService.update(id, body, modifiedUser);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<UpdateCustomerDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.customersService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.customersService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
