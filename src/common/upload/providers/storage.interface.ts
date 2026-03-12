export interface StorageProvider {

  upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<string>;

}