/// <reference types="multer" />
export declare class UploadService {
    upload(file: Express.Multer.File): Promise<{
        data: {
            path: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    }>;
}
