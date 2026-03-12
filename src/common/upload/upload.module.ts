import { Module } from "@nestjs/common";

import { UploadService } from "./upload.service";
import { LocalStorageProvider } from "./providers/local-storage.provider";

@Module({

  providers: [
    UploadService,
    LocalStorageProvider
  ],

  exports: [
    UploadService
  ]

})
export class UploadModule {}