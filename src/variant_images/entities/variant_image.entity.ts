import { ProductVariant } from "src/product_variants/entities/product_variant.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('variant_images')
export class VariantImages {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductVariant, variant => variant.images,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'variant_id'})
  variant: ProductVariant;

  @Column()
  url: string;
}