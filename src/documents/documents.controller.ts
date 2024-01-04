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
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DocumentDto } from './dtos/document.dto';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';

@Controller('documents')
@Serialize(DocumentDto)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  async findAll(
    @Query()
    query: {
      name?: string;
      description?: string;
      category?: string;
      page?: string;
      perPage?: string;
      sortBy?: string;
      order?: string;
    },
  ) {
    return await this.documentsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.documentsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateDocumentDto, @GetUser() createdUser: User) {
    return await this.documentsService.create(body, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() body: CreateDocumentDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.documentsService.update(id, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updatePartial(
    @Param('id') id: number,
    @Body() body: CreateDocumentDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.documentsService.update(id, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.documentsService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
