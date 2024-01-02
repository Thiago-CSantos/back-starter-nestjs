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
    createURLTemp(filename: string): Promise<{
        data: {
            signedUrl: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    }>;
    backgroundRemove(url: string, filename: string): Promise<{
        data: {
            path: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    }>;
}
