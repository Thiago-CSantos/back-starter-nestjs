"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const ocr_service_1 = require("../ocr/ocr.service");
let UploadController = class UploadController {
    constructor(uploadService, orcService) {
        this.uploadService = uploadService;
        this.orcService = orcService;
    }
    async uploadFile(file) {
        console.log("arquivo enviado para o supabase");
        const result = await this.uploadService.upload(file);
        return { supabase: result };
    }
    createURL(filename) {
        console.log(filename);
        return this.uploadService.createURLTemp(filename);
    }
    backgroundRemove(newFilename, imageUrl) {
        this.uploadService.backgroundRemove(imageUrl, newFilename)
            .then((imageURLBgRemove) => {
            console.log('Resultado da remoção de fundo:', imageURLBgRemove);
            return imageURLBgRemove;
        })
            .catch((error) => {
            console.error('Erro ao remover fundo:', error);
            throw new Error('Erro ao remover fundo');
        });
    }
};
__decorate([
    (0, common_1.Post)('arquivo'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('create-url/:filename'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "createURL", null);
__decorate([
    (0, common_1.Post)('remover-fundo/:newFilename'),
    __param(0, (0, common_1.Param)('newFilename')),
    __param(1, (0, common_1.Body)('imageUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "backgroundRemove", null);
UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        ocr_service_1.OcrService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map