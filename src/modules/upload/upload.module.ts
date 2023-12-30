import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { OcrModule } from '../ocr/ocr.module';
import { OcrService } from '../ocr/ocr.service';

@Module({
  imports:[OcrModule],
  controllers: [UploadController],
  providers: [UploadService, OcrService]
})
export class UploadModule {}
