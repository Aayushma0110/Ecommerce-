import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { v2 as cloudinary } from 'cloudinary';
import { MulterModule } from '@nestjs/platform-express';
import multer from 'multer';
import config from 'src/config/config';
@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        const isallowed = allowedMimes.includes(file.mimetype);
        cb(isallowed ? null : new Error('invalid file type'), isallowed);
      },
    }),
  ],
  providers: [
    {
      provide: 'CLOUDINARY_CONFIG',
      useFactory: () => {
        cloudinary.config({
          cloud_name: config().cloudinary.cloudName,
          api_key: config().cloudinary.apiKey,
          api_secret:config(). cloudinary.apiSecret,
           
        });
      },
    },
    UploadService,
  ],
  controllers: [UploadController],
})
export class UploadModule {}
