import { Injectable } from "@nestjs/common";
import { StorageProvider } from "./storage.interface";

@Injectable()
export class LocalStorageProvider implements StorageProvider {

  async upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<string> {

    return `/uploads/${folder}/${file.filename}`;
  }

}