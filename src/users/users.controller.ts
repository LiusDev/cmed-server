import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StandardUserDto } from './dtos/standard-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
@Serialize(StandardUserDto)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Patch('/:id')
  async updatePartial(
    @Param('id') id: number,
    @Body() body: Partial<UpdateUserDto>,
  ) {
    return this.usersService.updatePartial(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
