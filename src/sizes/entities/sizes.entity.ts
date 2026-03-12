import { AbstractBaseEntity } from "src/common/entities/abstract-base.entity";
import { ProductVariant } from "src/product_variants/entities/product_variant.entity";
import { ManyToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('jime_sizes')
export class Size extends AbstractBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column({nullable: true})
  description: string;
}