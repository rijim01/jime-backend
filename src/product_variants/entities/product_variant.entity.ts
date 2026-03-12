import { Color } from 'src/color/entities/color.entity';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { ProductImage } from 'src/product_images/entities/product_image.entity';
import { Product } from 'src/products/entities/product.entity';
import { Size } from 'src/sizes/entities/sizes.entity';
import { Unit } from 'src/units/entities/unit.entity';
import { VariantImages } from 'src/variant_images/entities/variant_image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('jime_product_variants')
export class ProductVariant extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({unique: true})
  sku: string;

  @Column({nullable: true})
  size: string;

  @Column({nullable: true})
  unit_id: string;

  @Column({nullable: true})
  color: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;
  
  @Column({default: 0})
  discountPercentage: number;

  @Column({default: 0})
  stock: number;
  
  @OneToMany(() => VariantImages, image => image.variant,{
    cascade: true
  })
  images: VariantImages[];
}
