import { Module } from '@nestjs/common';
import { VariantImagesService } from './variant_images.service';
import { VariantImagesController } from './variant_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantImages } from './entities/variant_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariantImages])],
  controllers: [VariantImagesController],
  providers: [VariantImagesService],
})
export class VariantImagesModule {}
