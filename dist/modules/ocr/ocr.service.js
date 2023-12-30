"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const common_1 = require("@nestjs/common");
const tesseract = require("node-tesseract-ocr");
let OcrService = class OcrService {
    constructor() {
        this.config = {
            lang: 'por',
            oem: 1,
            psm: 4,
        };
    }
    parseImage(imageBuffer) {
        return tesseract
            .recognize(imageBuffer, this.config)
            .then((text) => { return text.split(' '); })
            .catch((erro) => {
            throw new Error(erro.message);
        });
    }
};
OcrService = __decorate([
    (0, common_1.Injectable)()
], OcrService);
exports.OcrService = OcrService;
//# sourceMappingURL=ocr.service.js.map