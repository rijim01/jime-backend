import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permission } from "src/permissions/entities/permission.entity";
import { Role } from "src/roles/entities/role.entity";
import { SeederService } from "./seeder.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Role,Permission]),
  ],
  providers: [SeederService]
})
export class SeederModule {}