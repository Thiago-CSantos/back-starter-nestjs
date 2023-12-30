export declare class OcrService {
    config: {
        lang: string;
        oem: number;
        psm: number;
    };
    parseImage(imageBuffer: any): Promise<string[]>;
}
