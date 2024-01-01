import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import { RemoveBgError, RemoveBgResult, removeBackgroundFromImageUrl } from 'remove.bg';
import { DownloadDTO } from './dto/download.dto';

@Injectable()
export class UploadService {

      // upload no supabase
      async upload(file: Express.Multer.File) {
            const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
            const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";

            const supabase = createClient(supabaseURL, supabaseKEY, {
                  auth: {
                        persistSession: false,
                  }
            });
            const data = await supabase.storage.from("youtube").upload(file.originalname, file.buffer, {
                  upsert: true,
            });
            return data;
      }

      // filename é o nome do arquivo la dentro do supabase "youtube/filename"
      async createURLTemp(filename: string) {
            const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
            const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";

            const supabase = createClient(supabaseURL, supabaseKEY, {
                  auth: {
                        persistSession: false,
                  }
            });

            const url = await supabase.storage
                  .from("youtube")
                  .createSignedUrl(filename, 700);

            return url;
      }

      async backgroundRemove(url: string, filename: string) {
            const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
            const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";

            const apiKey = 'kEDXY16aK48wUPRRuNFcPBHz';

            //const outputFile = path.resolve("C:/Users/thiag/Desktop/hahaha/starter-nestjs/src/modules/upload/imagens", 'img-removed-from-file.png');

            try {
                  const result: RemoveBgResult = await removeBackgroundFromImageUrl({
                        url,
                        apiKey,
                        size: 'regular',
                        type: 'person',
                  });

                  const base64img = result.base64img;

                  const supabase = createClient(supabaseURL, supabaseKEY, {
                        auth: {
                              persistSession: false,
                        }
                  });

                  const { data, error } = await supabase.storage.from("youtube").upload(filename, Buffer.from(base64img, 'base64'), {
                        upsert: true,
                  });
                  console.log(data);

                  if (error) {
                        console.error('Erro ao fazer upload para o Supabase:', error);
                        throw new Error('Erro ao remover fundo');
                  }

                  console.log('Upload para o Supabase concluído:', data);
                  return {message: "Remoção concluída do fundo", data};
            } catch (error) {
                  console.error('Erro ao remover fundo:', error);
                  throw new Error('Erro ao remover fundo');
            }

      }

}
