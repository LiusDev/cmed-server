import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UploadImageDto } from './dtos/upload-image.dto';
import { DeleteImageDto } from './dtos/delete-image.dto';
import { toWebpString } from '../utils';

@Controller('images')
@UseGuards(JwtAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post(':folder')
  async uploadImage(
    @Param('folder') folder: string,
    @Body() body: UploadImageDto,
  ) {
    const result = await this.imagesService.uploadBase64Image(
      folder,
      await toWebpString(body.file),
    );
    return {
      url: result.secure_url
    }
  }

  @Delete()
  async deleteImage(@Body() body: DeleteImageDto) {
    const result = await this.imagesService.deleteImage(body.url);
    console.log(result);
  }
}
