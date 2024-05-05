"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const remove_bg_1 = require("remove.bg");
let UploadService = class UploadService {
    async upload(file) {
        const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
        const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";
        const supabase = (0, supabase_js_1.createClient)(supabaseURL, supabaseKEY, {
            auth: {
                persistSession: false,
            }
        });
        const data = await supabase.storage.from("youtube").upload(file.originalname, file.buffer, {
            upsert: true,
        });
        return data;
    }
    async createURLTemp(filename) {
        const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
        const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";
        const supabase = (0, supabase_js_1.createClient)(supabaseURL, supabaseKEY, {
            auth: {
                persistSession: false,
            }
        });
        const url = await supabase.storage
            .from("youtube")
            .createSignedUrl(filename, 70);
        return url;
    }
    async backgroundRemove(url, filename) {
        const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
        const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";
        const apiKey = 'oajDyBBMXgx6idQuqULCSrNd';
        const result = await (0, remove_bg_1.removeBackgroundFromImageUrl)({
            url,
            apiKey,
            size: 'auto',
            type: 'person',
        });
        const base64img = result.base64img;
        const supabase = (0, supabase_js_1.createClient)(supabaseURL, supabaseKEY, {
            auth: {
                persistSession: false,
            }
        });
        const data = await supabase.storage
            .from("youtube")
            .upload(filename, Buffer.from(base64img, 'base64'), {
            upsert: true,
        });
        console.log('Upload para o Supabase concluído:', data);
        return data;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map