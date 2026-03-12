import { Injectable } from "@nestjs/common";
import { LocalStorageProvider } from "./providers/local-storage.provider";

@Injectable()
export class UploadService {

  constructor(
    private readonly storage: LocalStorageProvider
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string
  ) {

    return this.storage.upload(file, folder);

  }

}