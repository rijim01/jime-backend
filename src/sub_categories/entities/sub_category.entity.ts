import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';

@Entity('jime_sub_categories') 
export class SubCategory extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.subCategories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  categoryId: number; 

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: number;

  @ManyToOne(() => Admin)
  @JoinColumn({name: 'created_by'})
  creator: Admin;

}