import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "src/permissions/entities/permission.entity";
import { Role } from "src/roles/entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class SeederService implements OnModuleInit{
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {}
  async onModuleInit() {
    await this.seedPermissions(),
    await this.seedRoles()
  }

  async seedPermissions() {
    const permissions = [{ name: 'CREATE_PRODUCT', description: 'Can create products' }];
    for (const p of permissions) {
      const exists = await this.permissionRepository.findOne({ where: { name: p.name } });
      if (!exists) await this.permissionRepository.save(p);
    }
  }

  async seedRoles() {
    const adminRole = await this.roleRepository.findOne({ where: { name: 'SUPER_ADMIN' } });
    if (!adminRole) {
      const newRole = this.roleRepository.create({ name: 'SUPER_ADMIN' });
      await this.roleRepository.save(newRole);
    }
  }
}