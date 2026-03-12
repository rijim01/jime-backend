import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Exclude } from 'class-transformer';

@Entity('jime_customers')
export class Customer extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
 
  @Column({ unique: true, nullable: true })
  phone: string;

  @Exclude()
  @Column({ select: false }) 
  password: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  avatar_url: string;
}