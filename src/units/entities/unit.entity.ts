import { AbstractBaseEntity } from "src/common/entities/abstract-base.entity";
import { ProductVariant } from "src/product_variants/entities/product_variant.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('jime_units')
export class Unit extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., Kilogram, Liter, Piece

  @Column({ unique: true })
  short_name: string; // e.g., kg, ltr, pc
}