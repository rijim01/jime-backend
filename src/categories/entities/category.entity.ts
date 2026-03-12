import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Product } from 'src/products/entities/product.entity';
import { Size} from 'src/sizes/entities/sizes.entity';
import { SubCategory } from 'src/sub_categories/entities/sub_category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';

@Entity('jime_categories')
export class Category extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => SubCategory, sub => sub.category,{
    cascade: true
  })
  subcategory: SubCategory[]

  @Column({ nullable: true })
  image_url: string;
}
