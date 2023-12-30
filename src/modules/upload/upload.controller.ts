import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { OcrService } from '../ocr/ocr.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly orcService: OcrService
  ) { }

// fazer pegar o link da image com supabase doc: https://supabase.com/dashboard/project/agcfldqdkvhbvmhaxzlx/api
  @Post('arquivo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

    console.log("arquivo enviado para o supabase");
    const result = await this.uploadService.upload(file);

    return { supabase: result };
  }





  

  // const ocrResult = await this.orcService.parseImage(file.buffer);
  // console.log('Resultado do OCR:', ocrResult);

  // private extractNumericValues(results: string[]): number[] {
  //   const numericValues: number[] = [];
  //   const regex = /\d+(?:[.,]\d{0,2})?/g;

  //   results.forEach((text) => {
  //     let match;
  //     while ((match = regex.exec(text)) !== null) {
  //       numericValues.push(parseFloat(match[0].replace(',', '.')));
  //     }
  //   });

  //   return numericValues;
  // }
}
