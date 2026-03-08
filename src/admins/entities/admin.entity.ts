import { Exclude } from 'class-transformer';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('jime_admins')
export class Admin extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ select: false })
  passwordHash: string;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.admins)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;
}
