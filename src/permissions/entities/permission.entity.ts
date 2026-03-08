import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity('jime_permissions')
export class Permission extends AbstractBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}