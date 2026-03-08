import { Admin } from 'src/admins/entities/admin.entity';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { SubCategory } from 'src/sub_categories/entities/sub_category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('jime_categories')
export class Category extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => SubCategory, (sub) => sub.category)
  subCategories: SubCategory[];
}
