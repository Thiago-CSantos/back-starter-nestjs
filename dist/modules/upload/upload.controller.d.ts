/// <reference types="multer" />
import { UploadService } from './upload.service';
import { OcrService } from '../ocr/ocr.service';
export declare class UploadController {
    private readonly uploadService;
    private readonly ocrService;
    constructor(uploadService: UploadService, ocrService: OcrService);
    uploadFile(file: Express.Multer.File): Promise<string[]>;
    private extractNumericValues;
}
