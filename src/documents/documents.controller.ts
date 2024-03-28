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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { DocumentDto } from './dtos/document.dto';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Controller('documents')
@Serialize(DocumentDto)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

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

  @Get('count')
  async countAll(
    @Query()
    query: {
      name?: string;
      description?: string;
      category?: string;
    },
  ) {
    return await this.documentsService.countAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Query('download') download?: string) {
    if (download === '1') {
      await this.documentsService.increaseDownloadCount(id);
      return {}
    } else {
      return await this.documentsService.findOne(id);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('document'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateDocumentDto,
    @GetUser() createdUser: User,
  ) {
    return await this.documentsService.create(body, file, createdUser);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('document'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateDocumentDto,
    @GetUser() modifiedUser: User,
  ) {
    return await this.documentsService.update(id, file, body, modifiedUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('document'))
  async updatePartial(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Partial<UpdateDocumentDto>,
    @GetUser() modifiedUser: User,
  ) {
    return await this.documentsService.update(id, file, body, modifiedUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.documentsService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
