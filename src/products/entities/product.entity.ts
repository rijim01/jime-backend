import { Category } from "src/categories/entities/category.entity";
import { AbstractBaseEntity } from "src/common/entities/abstract-base.entity";
import { ProductImage } from "src/product_images/entities/product_image.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('jime_products')
export class Product extends AbstractBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subcategory: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('text') 
  description: string;

  @OneToMany(() => ProductImage, image => image.product,{
    cascade: true
  })
  images: ProductImage[];
}