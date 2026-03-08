import { AbstractBaseEntity } from "src/common/entities/abstract-base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jime_units')
export class Unit extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., Kilogram, Liter, Piece

  @Column({ unique: true })
  shortName: string; // e.g., kg, ltr, pc
}