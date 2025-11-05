import {
  Controller,
  UploadedFile,
  Post,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Delete,
  Body,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadImage(file);
    return {
      message: 'file uploadede sucessfully',
      data: result,
    };
  }
  @Post('Multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('no files provided for upload');
    }
    if (files.length > 10) {
      throw new BadRequestException('maximum 10 files are allowed');
    }
    return this.uploadService.uploadMultipleImages(files);
  }
  @Delete('delete')
  delete(@Body('publicId') publicId: string) {
    return this.uploadService.deleteImage(publicId);
  }
}
