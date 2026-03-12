import { ProductVariant } from "src/product_variants/entities/product_variant.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('jime_product_images')
export class ProductImage{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({nullable: true})
  alt_text: string;

  @Column({default: 0})
  sort_order: number;

  @Column({default: false})
  is_primary: boolean;

  @ManyToOne(() => Product,product => product.images,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'product_id'})
  product: Product;
}