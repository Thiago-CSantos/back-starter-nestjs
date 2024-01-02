/// <reference types="multer" />
import { UploadService } from './upload.service';
import { OcrService } from '../ocr/ocr.service';
export declare class UploadController {
    private readonly uploadService;
    private readonly orcService;
    constructor(uploadService: UploadService, orcService: OcrService);
    uploadFile(file: Express.Multer.File): Promise<{
        supabase: {
            data: {
                path: string;
            };
            error: null;
        } | {
            data: null;
            error: import("@supabase/storage-js").StorageError;
        };
    }>;
    createURL(filename: string): Promise<{
        data: {
            signedUrl: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    }>;
    backgroundRemove(newFilename: string, imageUrl: string): Promise<{
        message: string;
        data: {
            path: string;
        };
    }>;
}
