import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Sizes } from 'src/sizes/entities/sizes.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('jime_product_variants')
export class ProductVariant extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Sizes)
  @JoinColumn({ name: 'size_id' })
  size: Sizes;

  @Column({ name: 'size_id', nullable: true })
  sizeId: number;

  @Column({ name: 'color_id', nullable: true })
  colorId: number;

  @Column()
  sku: string;

  @Column()
  basePrice: number;

  @Column({ nullable: true })
  discountPercentage: number;

  @Column()
  stock: number;

  get finalPrice(): number {
    const discountAmount = (this.basePrice * this.discountPercentage) / 100;
    return Number((this.basePrice - discountAmount).toFixed(2));
  }
}
