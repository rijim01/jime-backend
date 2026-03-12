import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Product } from 'src/products/entities/product.entity';


@Entity('jime_sub_categories') 
export class SubCategory extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number; 

  @OneToMany(() => Category, category => category.subcategory,{
    onDelete: 'SET NULL'
  })
  @JoinColumn({name: 'category_id'})
  category: Category;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Product, product => product.subcategory)
  product: Product[];
}