import { Category } from "src/categories/entities/category.entity";
import { AbstractBaseEntity } from "src/common/entities/abstract-base.entity";
import { ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('jime_sizes')
export class Sizes extends AbstractBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id' })
  categoryId: number;
}