import { Exclude } from 'class-transformer';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ROLE {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  MANAGER = 'manager',
}

@Entity('jime_admins')
export class Admin extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.ADMIN,
  })
  role: ROLE;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  passwordHash: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;
}