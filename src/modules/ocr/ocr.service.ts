import { Injectable } from '@nestjs/common';
import * as tesseract from 'node-tesseract-ocr'


@Injectable()
export class OcrService {
      config = {
            lang: 'por',
            oem: 1,
            psm: 4,
      };

      parseImage(imageBuffer) {
            return tesseract
                  .recognize(imageBuffer, this.config)
                  .then((text) => { return text.split(' ') })
                  .catch((erro) => {
                        throw new Error(erro.message);
                  });
      }
}
