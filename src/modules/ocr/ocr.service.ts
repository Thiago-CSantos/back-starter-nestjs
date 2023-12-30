import { Injectable } from '@nestjs/common';
import * as tesseract from 'node-tesseract-ocr'


@Injectable()
export class OcrService {
      config = {
            lang: 'eng',
            oem: 1,
            psm: 4,
      };

      parseImage(imageBuffer) {
            return tesseract
                  .recognize(imageBuffer, this.config)
                  .then((text) => { return text.split('\n') })
                  .catch((erro) => {
                        throw new Error(erro.message);
                  });
      }
}
