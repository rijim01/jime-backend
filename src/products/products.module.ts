import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UploadModule } from 'src/common/upload/upload.module';
import { ProductImage } from 'src/product_images/entities/product_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,ProductImage]),UploadModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
