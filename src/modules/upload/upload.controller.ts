/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Header, HttpCode, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { OcrService } from '../ocr/ocr.service';


@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly orcService: OcrService
  ) { }

  private urlImag: string;

  // fazer pegar o link da image com supabase doc: https://supabase.com/dashboard/project/agcfldqdkvhbvmhaxzlx/api
  @Post('arquivo')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {

    console.log("arquivo enviado para o supabase");
    const result = await this.uploadService.upload(file);

    return { supabase: result };
  }

  @Get('create-url/:filename')
  @HttpCode(200)
  async createURL(@Param('filename') filename: string) {
    console.log(filename);

    const signedUrl = await this.uploadService.createURLTemp(filename);
    this.urlImag = signedUrl.data.signedUrl;
    return signedUrl;
  }

  @Post('remover-fundo/:newFilename')
  @HttpCode(201)
  async backgroundRemove(@Param('newFilename') newFilename: string, imageUrl: string) {
    // const imageUrl = 'https://agcfldqdkvhbvmhaxzlx.supabase.co/storage/v1/object/sign/youtube/jhola.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ5b3V0dWJlL2pob2xhLmpwZWciLCJpYXQiOjE3MDQwMjMyNDMsImV4cCI6MTcwNDYyODA0M30.rIw9F2-8-XXMFxpt8LoGfCV9P_TJcThebior8icRFIU&t=2023-12-31T11%3A47%3A04.138Z';
    imageUrl = this.urlImag;
    return await this.uploadService.backgroundRemove(imageUrl, newFilename);

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
