import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { ProductImage } from 'src/product_images/entities/product_image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>
  ) {}
  async create(createProductDto: CreateProductDto,imageUrls: string[]) {
    const slug = slugify(`${createProductDto.subcategory}-${createProductDto.name}`, { lower: true, strict: true });
    
    const product = this.productRepository.create({
      ...createProductDto,
      slug
    });
    const savedProduct = await this.productRepository.save(product);
    const images = imageUrls.map((url,i) => 
      this.productImageRepository.create({
        url,
        alt_text: slug,
        sort_order: i,
        is_primary: i === 0,
        product: savedProduct
      })
    )
    await this.productImageRepository.save(images);
    return savedProduct;
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
