import { AbstractBaseEntity } from "src/common/entities/abstract-base.entity";
import { ProductVariant } from "src/product_variants/entities/product_variant.entity";
import { SubCategory } from "src/sub_categories/entities/sub_category.entity";
import { Unit } from "src/units/entities/unit.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('jime_products')
export class Product extends AbstractBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @ManyToOne(() => SubCategory, (sub) => sub.products)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;

  @Column({ name: 'sub_category_id' })
  subCategoryId: number;;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @Column({ name: 'unit_id' })
  unitId: number;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];
}