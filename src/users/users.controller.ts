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
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { StandardUserDto } from './dtos/standard-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/entities/user.entity';
import { RequireRolesGuard } from 'src/auth/guards/require-roles.guard';
import { RequireRoles } from 'src/auth/decorators/require-roles.decorator';
import { Response } from 'express';

@Controller('users')
@Serialize(StandardUserDto)
@UseGuards(JwtAuthGuard, RequireRolesGuard)
@RequireRoles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
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
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    this.usersService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
