import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No authentication token provided');
    }

    try {
      const decoded = this.jwtService.verify(token);
      
      if (decoded.roleId) {
        const role = await this.rolesService.findOne(decoded.roleId);
        
        if (role) {
          request.user = {
            sub: decoded.sub,
            email: decoded.email,
            roleId: decoded.roleId,
            role: role.name,
            permissions: role.permissions,
          };
        } else {
          request.user = {
            sub: decoded.sub,
            email: decoded.email,
            role: decoded.role,
          };
        }
      } else {
        request.user = {
          sub: decoded.sub,
          email: decoded.email,
          role: decoded.role,
        };
      }
      
      return true;
    } catch (error) {
      throw new UnauthorizedException('Authentication failed: ' + error.message);
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}