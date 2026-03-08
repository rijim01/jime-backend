import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AbstractBaseEntity } from 'src/common/entities/abstract-base.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { Permission } from 'src/permissions/entities/permission.entity';


@Entity('jime_roles')
export class Role extends AbstractBaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string; // admin, editor, superAdmin

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable({
    name: 'jime_role_permissions',
  })
  permissions: Permission[];

  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];
}