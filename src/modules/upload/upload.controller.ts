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


  @Post('arquivo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const ocrResult = await this.orcService.parseImage(file.buffer);
    console.log('Resultado do OCR:', ocrResult);

    // Adiciona a lógica para extrair os valores numéricos
    const numericValues = this.extractNumericValues(ocrResult);
    console.log('Valores Numéricos:', numericValues);

    // Retorne o resultado do OCR ou os valores numéricos conforme necessário
    return { message: 'Deu certo' };

  }

  private extractNumericValues(results: string[]): number[] {
    const numericValues: number[] = [];
    const regex = /\d+(?:[.,]\d{0,2})?/g;

    results.forEach((text) => {
      let match;
      while ((match = regex.exec(text)) !== null) {
        numericValues.push(parseFloat(match[0].replace(',', '.')));
      }
    });

    return numericValues;
  }
}
