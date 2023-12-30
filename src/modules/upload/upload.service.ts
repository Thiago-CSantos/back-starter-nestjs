import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {

      async upload(file: Express.Multer.File) {

            const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
            const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk"

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

}
