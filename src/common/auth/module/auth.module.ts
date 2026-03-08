import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "../service/auth.service";
import { JwtStrategy } from "../guard/jwt.strategy";
import { Role } from "src/roles/entities/role.entity";
import { RolesModule } from "src/roles/roles.module";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    RolesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION','24h') as any,
        }
      })
    })
  ],
  providers: [AuthService,JwtStrategy,JwtAuthGuard],
  exports: [AuthService,JwtAuthGuard,JwtModule,RolesModule]
})
export class AuthModule{}