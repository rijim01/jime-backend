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
  passwordHash: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;
}