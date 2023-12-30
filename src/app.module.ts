import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './modules/upload/upload.module';
import { OcrModule } from './modules/ocr/ocr.module';
import { OcrService } from './modules/ocr/ocr.service';
import { UploadController } from './modules/upload/upload.controller';
import { UploadService } from './modules/upload/upload.service';

@Module({
  imports: [UploadModule, OcrModule],
  controllers: [AppController, UploadController],
  providers: [AppService, UploadService, OcrService],
})
export class AppModule { }
