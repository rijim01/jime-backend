import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../interceptors/upload.interceptor";

export function UploadImages(
  fieldName = "images",
  maxCount = 10,
  folder = "products"
) {

  return applyDecorators(
    UseInterceptors(
      FilesInterceptor(
        fieldName,
        maxCount,
        multerOptions(folder)
      )
    )
  );

}